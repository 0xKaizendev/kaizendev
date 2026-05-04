"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/constants/projects";
import { useSectionInView } from "@/hooks/use-section-in-view";

const ONCHAIN_STACK = ["Solidity", "Foundry", "Hardhat", "Truffle", "EIP-3009", "zkEVM", "Lido", "Scroll"];

const inferCategory = (stack: string[]): "onchain" | "fullstack" => {
  return stack.some((s) => ONCHAIN_STACK.includes(s)) && !stack.includes("Next.js")
    ? "onchain"
    : "fullstack";
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "onchain", label: "Onchain" },
  { id: "fullstack", label: "Fullstack" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const ArrowOut = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

export default function Projects() {
  const { ref } = useSectionInView("projects");
  const [filter, setFilter] = useState<FilterId>("all");

  const decorated = projects.map((p) => {
    const category = inferCategory(p.stack);
    const tag = category === "onchain" ? "Onchain" : "Fullstack";
    return { ...p, category, tag };
  });

  const visible = decorated.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projects" ref={ref} className="kz-section">
      <div className="kz-page">
        <div className="kz-projects-head">
          <div className="h-block">
            <p className="kz-eyebrow">Selected work</p>
            <h2 className="kz-h2">Things I&apos;ve <em>built</em>.</h2>
          </div>
          <div className="kz-projects-filter">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={filter === f.id ? "is-active" : ""}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="kz-projects-list">
          {visible.map((p, i) => (
            <article key={p.title} className="kz-project-row">
              <div className="kz-project-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="kz-project-main">
                <div className="kz-project-meta">
                  <span className={`tag ${p.category === "onchain" ? "is-onchain" : ""}`}>
                    {p.tag}
                  </span>
                </div>
                <h3 className="kz-project-title">{p.title}</h3>
                <p className="kz-project-summary">{p.description}</p>
                <div className="kz-project-stack">
                  {p.stack.map((s) => <span key={s}>{s}</span>)}
                </div>
              </div>
              <div className="kz-project-links">
                {p.links.github && (
                  <Link href={p.links.github} target="_blank" rel="noopener noreferrer">
                    GitHub <ArrowOut />
                  </Link>
                )}
                {p.links.project && (
                  <Link href={p.links.project} target="_blank" rel="noopener noreferrer">
                    Live <ArrowOut />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
