"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { workExperiences } from "@/constants/experience";
import { EASE, Reveal } from "@/components/motion/primitives";

export default function Experience() {
  const { ref } = useSectionInView("experience");
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <section id="experience" ref={ref} className="kz-section">
      <div className="kz-page">
        <Reveal>
          <p className="kz-eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            Career
          </p>
          <h2 className="kz-h2" style={{ textAlign: "center" }}>
            The <em>path</em> so far.
          </h2>
          <p className="kz-section-lede" style={{ textAlign: "center", margin: "0 auto 56px" }}>
            A few teams, a lot of contracts.
          </p>
        </Reveal>
        <div className="kz-xp" ref={listRef}>
          <motion.span
            className="kz-xp-line"
            aria-hidden
            style={reduced ? undefined : { scaleY: lineScale }}
          />
          {workExperiences.map((x, i) => {
            const isCurrent = /present/i.test(x.duration);
            return (
              <motion.div
                key={x.id}
                className="kz-xp-row"
                initial={reduced ? false : { opacity: 0, x: 32, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.08 * (i % 3), ease: EASE }}
              >
                <motion.div
                  className="kz-xp-dot"
                  data-current={isCurrent ? "1" : "0"}
                  initial={reduced ? false : { scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 }}
                >
                  {x.icon ? (
                    <Image src={x.icon} alt="" width={22} height={22} />
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--kz-fg-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="6" width="18" height="14" rx="2" />
                      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    </svg>
                  )}
                </motion.div>
                <div className="kz-xp-card">
                  <div className="kz-xp-meta">
                    <span>{x.duration}</span>
                    {isCurrent && <span className="current">CURRENT</span>}
                  </div>
                  <h3 className="kz-xp-title">{x.name}</h3>
                  <p className="kz-xp-role">{x.pos}</p>
                  <p className="kz-xp-text">{x.title}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
