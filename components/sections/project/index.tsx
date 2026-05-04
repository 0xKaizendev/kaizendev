"use client";

import { useState } from "react";
import Image from "next/image";
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
        <div className="kz-projects-grid">
          {visible.map((p) => (
            <article key={p.title} className="kz-project">
              <div className="kz-project-cover">
                <Image
                  src={p.logo.src}
                  alt={p.logo.alt || p.title}
                  width={640}
                  height={360}
                />
                <span className={`kz-project-tag ${p.category === "onchain" ? "is-onchain" : ""}`}>{p.tag}</span>
              </div>
              <div className="kz-project-body">
                <h3 className="kz-project-title">{p.title}</h3>
                <p className="kz-project-summary">{p.description}</p>
                <div className="kz-project-stack">
                  {p.stack.map((s) => <span key={s}>{s}</span>)}
                </div>
                <div className="kz-project-foot">
                  {p.links.github && (
                    <Link href={p.links.github} target="_blank" rel="noopener noreferrer">
                      GitHub <span>↗</span>
                    </Link>
                  )}
                  {p.links.project && (
                    <Link href={p.links.project} target="_blank" rel="noopener noreferrer">
                      Live <span>↗</span>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
