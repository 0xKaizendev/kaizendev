"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ledgerSections } from "@/config/nav-links";
import { Seal } from "@/components/seal";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  // the section crossing the middle of the viewport is the one being read
  useEffect(() => {
    const sections = ledgerSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="kl-header">
      <div className="kl-page kl-header-in">
        <Link href="/" className="kl-brand" aria-label="Kaizendev, back to the top">
          <Seal size="sm" />
          <span>kaizendev</span>
        </Link>
        <nav className="kl-nav" aria-label="Ledger sections">
          {ledgerSections.map((s) => (
            <a key={s.id} href={`/#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
              <i lang="ja">{s.numeral}</i>
              {s.title}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="kl-mode"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label={isDark ? "Switch to paper" : "Switch to sumi night"}
          title={isDark ? "Paper" : "Sumi night"}
        >
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden>
            <circle cx="10" cy="10" r="7.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 2.75a7.25 7.25 0 0 1 0 14.5z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>
  );
}
