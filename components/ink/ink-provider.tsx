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
// Steps of the evaporation fade. Too few and the fading tail shows bands.
const OPACITY_LEVELS = 14;

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

    // Strokes are laid down one opacity level at a time: each level is painted opaque on a
    // scratch layer, then copied once at that level's opacity. Overlapping segments merge
    // into one shape instead of stacking their transparency into darker beads.
    const scratch = document.createElement("canvas");
    const sctx = scratch.getContext("2d");
    // everything inked so far this frame
    const cover = document.createElement("canvas");
    const cctx = cover.getContext("2d");
    if (!sctx || !cctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let rgb = "24,20,15";

    const readInk = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue("--ink-rgb").trim();
      if (value) rgb = value.split(/\s+/).join(",");
    };
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      for (const c of [canvas, scratch, cover]) {
        c.width = Math.round(width * dpr);
        c.height = Math.round(height * dpr);
      }
    };

    type Level = { lines: number[]; x0: number; y0: number; x1: number; y1: number };
    const draw = (now: number) => {
      const list = segments.current;
      for (let i = list.length - 1; i >= 0; i--) {
        if (now - list[i].t > list[i].life) list.splice(i, 1);
      }

      const sx = window.scrollX;
      const sy = window.scrollY;
      const levels: (Level | undefined)[] = [];
      for (const s of list) {
        const age = now - s.t;
        if (age < 0) continue;
        const a = 1 - age / s.life;
        const level = Math.ceil(0.86 * a * a * OPACITY_LEVELS);
        if (level < 1) continue;
        const w = Math.max(0.5, s.w * (0.55 + 0.45 * a));
        const x1 = s.x1 - sx;
        const y1 = s.y1 - sy;
        const x2 = s.x2 - sx;
        const y2 = s.y2 - sy;
        const pad = w / 2 + 2;
        const box = levels[level] ?? (levels[level] = { lines: [], x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity });
        box.lines.push(x1, y1, x2, y2, w);
        box.x0 = Math.min(box.x0, x1 - pad, x2 - pad);
        box.y0 = Math.min(box.y0, y1 - pad, y2 - pad);
        box.x1 = Math.max(box.x1, x1 + pad, x2 + pad);
        box.y1 = Math.max(box.y1, y1 + pad, y2 + pad);
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cctx.clearRect(0, 0, cover.width, cover.height);
      // most opaque first: each level gives up the pixels a darker one already inked,
      // so no pixel is inked twice where two levels meet
      for (let level = levels.length - 1; level >= 1; level--) {
        const box = levels[level];
        if (!box) continue;
        // only the part of the layer this level touches, clipped to the screen, in device pixels
        const x = Math.max(0, Math.floor(box.x0 * dpr));
        const y = Math.max(0, Math.floor(box.y0 * dpr));
        const w = Math.min(canvas.width, Math.ceil(box.x1 * dpr)) - x;
        const h = Math.min(canvas.height, Math.ceil(box.y1 * dpr)) - y;
        if (w <= 0 || h <= 0) continue;

        sctx.setTransform(1, 0, 0, 1, 0, 0);
        sctx.clearRect(x, y, w, h);
        sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        sctx.strokeStyle = `rgb(${rgb})`;
        sctx.lineCap = "round";
        for (let i = 0; i < box.lines.length; i += 5) {
          sctx.lineWidth = box.lines[i + 4];
          sctx.beginPath();
          sctx.moveTo(box.lines[i], box.lines[i + 1]);
          sctx.lineTo(box.lines[i + 2], box.lines[i + 3]);
          sctx.stroke();
        }
        sctx.setTransform(1, 0, 0, 1, 0, 0);
        sctx.globalCompositeOperation = "destination-out";
        sctx.drawImage(cover, x, y, w, h, x, y, w, h);
        sctx.globalCompositeOperation = "source-over";

        ctx.globalAlpha = level / OPACITY_LEVELS;
        ctx.drawImage(scratch, x, y, w, h, x, y, w, h);
        cctx.drawImage(scratch, x, y, w, h, x, y, w, h);
      }
      ctx.globalAlpha = 1;

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
    const point = (f: number, offset: number) => {
      const angle = from + sweep * f;
      const r = radius * (1 + 0.035 * Math.sin(f * 9)) + offset;
      return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
    };
    const brush = (f0: number, f: number, w: number, offset = 0) => {
      const [x1, y1] = point(f0, offset);
      const [x2, y2] = point(f, offset);
      segments.current.push({ x1, y1, x2, y2, w, t: t0 + duration * f, life });
    };

    // as the ink runs out, the last stretch splits into a few dry bristles
    const spread = Math.max(2, weight * 0.18);
    const bristles = [-1, 0, 1].map((side) => ({ offset: side * spread, end: 0.94 + Math.random() * 0.06 }));
    for (let i = 1; i <= steps; i++) {
      const f0 = (i - 1) / steps;
      const f = i / steps;
      if (f <= 0.92) {
        // heavy where the brush lands, thinning as it travels
        const w = 1.5 + weight * Math.sin(Math.PI * Math.min(1, f * 1.1)) * (1 - f * 0.55);
        brush(f0, f, Math.max(1.5, w));
      }
      if (f >= 0.8) {
        for (const b of bristles) if (f <= b.end) brush(f0, f, 1.1, b.offset);
      }
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
