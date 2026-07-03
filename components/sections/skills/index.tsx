"use client";

import { motion } from "framer-motion";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { Reveal, Stagger, StaggerItem, staggerItemPop } from "@/components/motion/primitives";

type Chip = { n: string; c: string; l: string; dark?: boolean };

const SKILL_GROUPS: { title: string; items: Chip[] }[] = [
  {
    title: "Frontend",
    items: [
      { n: "Next.js", c: "#0a0a0a", l: "▲" },
      { n: "React", c: "#0ea5e9", l: "⚛" },
      { n: "TypeScript", c: "#1d63ed", l: "TS" },
      { n: "Tailwind", c: "#06b6d4", l: "≈" },
    ],
  },
  {
    title: "Onchain",
    items: [
      { n: "Solidity", c: "#0a0a0a", l: "S" },
      { n: "Foundry", c: "#dc2626", l: "F" },
      { n: "Hardhat", c: "#facc15", l: "🎩", dark: true },
      { n: "Viem", c: "#0ea5e9", l: "V" },
    ],
  },
  {
    title: "Backend",
    items: [
      { n: "Node.js", c: "#16a34a", l: "N" },
      { n: "PostgreSQL", c: "#0369a1", l: "P" },
      { n: "MongoDB", c: "#16a34a", l: "M" },
      { n: "GraphQL", c: "#e91e63", l: "G" },
    ],
  },
  {
    title: "Infra",
    items: [
      { n: "Docker", c: "#0ea5e9", l: "D" },
      { n: "Redis", c: "#dc2626", l: "R" },
      { n: "Vercel", c: "#0a0a0a", l: "▲" },
      { n: "Linux", c: "#0a0a0a", l: "L" },
    ],
  },
];

export default function Skills() {
  const { ref } = useSectionInView("skills");
  return (
    <section id="skills" ref={ref} className="kz-section">
      <div className="kz-page">
        <Reveal>
          <p className="kz-eyebrow">Stack</p>
          <h2 className="kz-h2">Tools I <em>reach for</em>.</h2>
          <p className="kz-section-lede">
            Curated, not exhaustive — these are the ones I&apos;m fluent in.
          </p>
        </Reveal>
        <Stagger className="kz-skills" stagger={0.1}>
          {SKILL_GROUPS.map((g, gi) => (
            <StaggerItem key={g.title} className="kz-skill-group">
              <div className="kz-skill-head">
                <span>{g.title}</span>
                <span className="num">
                  {String(gi + 1).padStart(2, "0")}/0{SKILL_GROUPS.length}
                </span>
              </div>
              <Stagger className="kz-skill-list" stagger={0.06} delay={0.15}>
                {g.items.map((it) => (
                  <motion.span key={it.n} className="kz-chip" variants={staggerItemPop}>
                    <span
                      className="kz-chip-mark"
                      style={{ background: it.c, color: it.dark ? "#0a0a0a" : "white" }}
                    >
                      {it.l}
                    </span>
                    {it.n}
                  </motion.span>
                ))}
              </Stagger>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
