"use client";

import { useEffect, useState } from "react";
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
  contact: "HIRE",
};

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <nav className="kz-header" aria-label="Primary">
      {navbarLinks.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={activeSection === link.id ? "is-active" : ""}
          onClick={(e) => {
            smoothScrollTo({ e, id: link.id });
            setActiveSection(link.id as SectionName);
            setTimeOfLastClick(Date.now());
          }}
        >
          {NAV_LABELS[link.id] ?? link.title.toUpperCase()}
        </a>
      ))}
      <button
        className="kz-header-mode"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle dark mode"
        type="button"
      >
        {mounted && isDark ? (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </nav>
  );
}
