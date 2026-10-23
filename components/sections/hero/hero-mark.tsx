"use client";

import { useEffect, useRef } from "react";
import { useInk } from "@/components/ink/ink-provider";
import { Seal } from "@/components/seal";

/** The vertical 改善, brushed in on arrival and circled by an ensō, with the seal that leads to hire(). */
export default function HeroMark() {
  const kanji = useRef<HTMLParagraphElement>(null);
  const { enso } = useInk();

  useEffect(() => {
    const el = kanji.current;
    if (!el) return;
    // wait for the brush-in of the second character before closing the circle around both
    const t = window.setTimeout(() => {
      const { width, height } = el.getBoundingClientRect();
      // on narrow screens the characters sit side by side and a circle would cross them
      if (width > height) return;
      enso(el, { radius: Math.min(width * 0.8, height * 0.44), duration: 1200, life: 5200, weight: 24 });
    }, 700);
    return () => window.clearTimeout(t);
  }, [enso]);

  return (
    <div className="kl-hero-mark">
      <p ref={kanji} className="kl-hero-kanji" lang="ja" aria-label="Kaizen: continuous improvement">
        <span>改</span>
        <span>善</span>
      </p>
      <a href="#write" className="kl-hero-seal" aria-label="Call hire(): get in touch">
        <Seal size="lg" />
        <span>hire()</span>
      </a>
    </div>
  );
}
