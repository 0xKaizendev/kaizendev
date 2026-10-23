"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";

type Segment = { x1: number; y1: number; x2: number; y2: number; w: number; t: number; life: number };

export type EnsoOptions = {
  /** Time for the brush to travel the whole circle, in ms. */
  duration?: number;
  /** Time until the ink has fully evaporated, in ms. */
  life?: number;
  /** Peak brush width, in px. */
  weight?: number;
  /** Circle radius in px. Defaults to just outside the target's longest side. */
  radius?: number;
};

type Ink = {
  /** Brush an ensō around an element. Resolves once the circle closes. */
  enso: (target: Element, options?: EnsoOptions) => Promise<void>;
};

const InkContext = createContext<Ink>({ enso: () => Promise.resolve() });

export const useInk = () => useContext(InkContext);

const TRAIL_LIFE = 2000;
const TRAIL_MAX_WIDTH = 12;

/**
 * One fixed canvas behind the page. A mouse leaves a water-brush trail that
 * evaporates, and components can brush an ensō while they wait on something.
 * Strokes are stored in page coordinates so the ink stays on the paper when it scrolls.
 */
export default function InkProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const segments = useRef<Segment[]>([]);
  const reduced = useRef(false);
  const start = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = motion.matches;
    const onMotion = (e: MediaQueryListEvent) => {
      reduced.current = e.matches;
    };

    let width = 0;
    let height = 0;
    let frame = 0;
    let rgb = "24,20,15";

    const readInk = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue("--ink-rgb").trim();
      if (value) rgb = value.split(/\s+/).join(",");
    };
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = (now: number) => {
      const list = segments.current;
      for (let i = list.length - 1; i >= 0; i--) {
        if (now - list[i].t > list[i].life) list.splice(i, 1);
      }
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      const sx = window.scrollX;
      const sy = window.scrollY;
      for (const s of list) {
        const age = now - s.t;
        if (age < 0) continue;
        const a = 1 - age / s.life;
        ctx.strokeStyle = `rgba(${rgb},${(0.86 * a * a).toFixed(3)})`;
        ctx.lineWidth = Math.max(0.5, s.w * (0.55 + 0.45 * a));
        ctx.beginPath();
        ctx.moveTo(s.x1 - sx, s.y1 - sy);
        ctx.lineTo(s.x2 - sx, s.y2 - sy);
        ctx.stroke();
      }
      frame = list.length ? requestAnimationFrame(draw) : 0;
    };
    start.current = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    let last: { x: number; y: number; t: number } | null = null;
    let brush = 5;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduced.current) return;
      const p = { x: e.pageX, y: e.pageY, t: performance.now() };
      if (last && p.t - last.t < 100) {
        const distance = Math.hypot(p.x - last.x, p.y - last.y);
        const speed = distance / Math.max(1, p.t - last.t);
        // slow strokes load the brush, fast ones thin it out
        const target = Math.max(1.2, Math.min(TRAIL_MAX_WIDTH, TRAIL_MAX_WIDTH - speed * 6));
        brush += (target - brush) * 0.3;
        if (distance > 0.6) {
          segments.current.push({ x1: last.x, y1: last.y, x2: p.x, y2: p.y, w: brush, t: p.t, life: TRAIL_LIFE });
        }
      }
      last = p;
      start.current();
    };
    const onLeave = () => {
      last = null;
    };

    readInk();
    resize();
    const themeWatch = new MutationObserver(readInk);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    motion.addEventListener("change", onMotion);

    return () => {
      cancelAnimationFrame(frame);
      themeWatch.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  const enso = useCallback<Ink["enso"]>((target, options = {}) => {
    const { duration = 1100, life = 4200, weight = 14 } = options;
    if (reduced.current) return Promise.resolve();

    const rect = target.getBoundingClientRect();
    const radius = options.radius ?? Math.max(rect.width, rect.height) / 2 + 12;
    if (radius < 8) return Promise.resolve();

    // keep the circle on screen horizontally
    const viewport = document.documentElement.clientWidth;
    const centerX = Math.min(Math.max(rect.left + rect.width / 2, radius + 12), viewport - radius - 12);
    const cx = centerX + window.scrollX;
    const cy = rect.top + rect.height / 2 + window.scrollY;

    const steps = Math.max(40, Math.round(radius * 0.9));
    const from = -Math.PI * (0.5 + Math.random() * 0.2);
    const sweep = Math.PI * 1.84;
    const t0 = performance.now() + 40;
    let prev: [number, number] | null = null;
    for (let i = 0; i <= steps; i++) {
      const f = i / steps;
      const angle = from + sweep * f;
      const r = radius * (1 + 0.035 * Math.sin(f * 9));
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      // heavy where the brush lands, dry at the tail
      const w = 1.5 + weight * Math.sin(Math.PI * Math.min(1, f * 1.1)) * (1 - f * 0.55);
      if (prev) {
        segments.current.push({ x1: prev[0], y1: prev[1], x2: x, y2: y, w: Math.max(1.5, w), t: t0 + duration * f, life });
      }
      prev = [x, y];
    }
    start.current();
    return new Promise((resolve) => window.setTimeout(resolve, duration + 40));
  }, []);

  const value = useMemo(() => ({ enso }), [enso]);

  return (
    <InkContext.Provider value={value}>
      <canvas ref={canvasRef} className="kl-ink" aria-hidden />
      {children}
    </InkContext.Provider>
  );
}
