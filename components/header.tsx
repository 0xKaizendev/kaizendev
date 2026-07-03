"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { navbarLinks } from "@/config/nav-links";
import { smoothScrollTo } from "@/lib/utils";
import { useActiveSectionContext } from "@/hooks/use-active-section";

const NAV_LABELS: Record<string, string> = {
  home: "HOME",
  kaizen: "改善",
  about: "ABOUT",
  projects: "WORK",
  experience: "PATH",
  skills: "STACK",
  writing: "NOTES",
  contact: "HIRE",
};

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { resolvedTheme, setTheme } = useTheme();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen]);

  const isDark = mounted && resolvedTheme === "dark";

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    smoothScrollTo({ e, id });
    setActiveSection(id as SectionName);
    setTimeOfLastClick(Date.now());
    setSheetOpen(false);
  };

  const SunIcon = (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
  const MoonIcon = (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  return (
    <>
      <motion.nav
        className="kz-header"
        aria-label="Primary"
        initial={reduced ? false : { y: -72, opacity: 0, x: "-50%" }}
        animate={{ y: 0, opacity: 1, x: "-50%" }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {navbarLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`kz-header-link ${activeSection === link.id ? "is-active" : ""}`}
            onClick={(e) => handleNavClick(e, link.id)}
          >
            {activeSection === link.id && (
              <motion.span
                layoutId="header-active-pill"
                className="kz-header-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="kz-header-label">
              {NAV_LABELS[link.id] ?? link.title.toUpperCase()}
            </span>
          </a>
        ))}

        <button
          type="button"
          className="kz-header-toggle"
          aria-label="Open menu"
          aria-expanded={sheetOpen}
          onClick={() => setSheetOpen((v) => !v)}
        >
          {sheetOpen ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>

        <button
          className="kz-header-mode"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle dark mode"
          type="button"
        >
          {mounted && isDark ? SunIcon : MoonIcon}
        </button>
      </motion.nav>

      <div
        className={`kz-sheet-backdrop ${sheetOpen ? "is-open" : ""}`}
        onClick={() => setSheetOpen(false)}
        aria-hidden
      />
      <div className={`kz-sheet ${sheetOpen ? "is-open" : ""}`} role="dialog" aria-label="Site navigation">
        <div className="kz-sheet-head">
          <span className="kz-sheet-brand">改善 · Kaizendev</span>
        </div>
        <div className="kz-sheet-list">
          {navbarLinks.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeSection === link.id ? "is-active" : ""}
              onClick={(e) => handleNavClick(e, link.id)}
            >
              <span className="kz-sheet-num">{String(i).padStart(2, "0")}</span>
              <span className="kz-sheet-label">
                {NAV_LABELS[link.id] ?? link.title.toUpperCase()}
              </span>
              <span className="kz-sheet-arrow">→</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
