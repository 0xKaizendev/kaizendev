"use client";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollBar() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <div className="kz-progress" aria-hidden>
      <motion.div className="kz-progress-fill" style={{ scaleX }} />
    </div>
  );
}
