"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { EASE, Reveal } from "@/components/motion/primitives";

export default function AboutKaizen() {
  const { ref } = useSectionInView("kaizen");
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const glyphY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const glyphScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <section
      id="kaizen"
      ref={(node) => {
        ref(node);
        sectionRef.current = node;
      }}
      className="kz-quote-section"
    >
      <div className="kz-page" style={{ display: "grid", placeItems: "center", width: "100%" }}>
        <Reveal style={{ width: "100%", display: "grid", placeItems: "center" }}>
          <blockquote className="kz-quote">
            <motion.div
              className="kz-quote-glyph"
              style={reduced ? undefined : { y: glyphY, scale: glyphScale }}
            >
              改善
            </motion.div>
            <motion.p
              className="kz-quote-text"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
            >
              A philosophy of <em>continuous</em> improvement of working{" "}
              <em>practices</em> that underlies total quality{" "}
              <em>management</em> &mdash; the steady, deliberate pursuit of <strong>better</strong>.
            </motion.p>
            <motion.p
              className="kz-quote-attrib"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              改善 · KAI · ZEN · the way of work
            </motion.p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
