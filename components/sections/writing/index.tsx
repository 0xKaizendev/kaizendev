"use client";

import Link from "next/link";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";

type Entry = {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  href: string;
  external?: boolean;
};

const ENTRIES: Entry[] = [
  {
    title: "Smart Contract Dev Process",
    summary:
      "Reference guide for the development, testing, audit and deployment workflow on RAAC Protocol — Hardhat config, Solidity standards, security patterns, gas optimisation, coverage thresholds, audit checklist and deployment pipeline.",
    date: "2025",
    tags: ["Solidity", "Hardhat", "Process"],
    href: "/writing/blockchain-dev-guide",
    external: false,
  },
];

const ArrowOut = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default function Writing() {
  const { ref } = useSectionInView("writing");

  return (
    <section id="writing" ref={ref} className="kz-section">
      <div className="kz-page">
        <Reveal>
          <p className="kz-eyebrow">Notes</p>
          <h2 className="kz-h2">
            Things I&apos;ve <em>written</em>.
          </h2>
          <p className="kz-section-lede">
            Process docs, deep-dives, references — the kind of thing I wish I&apos;d had on day one.
          </p>
        </Reveal>
        <Stagger className="kz-projects-list" stagger={0.1}>
          {ENTRIES.map((e, i) => (
            <StaggerItem key={e.title} className="kz-project-row">
              <div className="kz-project-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="kz-project-main">
                <div className="kz-project-meta">
                  <span className="tag">{e.date}</span>
                </div>
                <h3 className="kz-project-title">{e.title}</h3>
                <p className="kz-project-summary">{e.summary}</p>
                <div className="kz-project-stack">
                  {e.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="kz-project-links">
                <Link
                  href={e.href}
                  target={e.external ? "_blank" : undefined}
                  rel={e.external ? "noopener noreferrer" : undefined}
                >
                  Read <ArrowOut />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
