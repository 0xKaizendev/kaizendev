"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { smoothScrollTo } from "@/lib/utils";
import { EASE, Magnetic, SplitText, Tilt } from "@/components/motion/primitives";

const SOLIDITY_LINES = [
  '<span class="cm">// SPDX-License-Identifier: MIT</span>',
  '<span class="kw">pragma</span> <span class="kw">solidity</span> <span class="num">^0.8.0</span>;',
  "",
  '<span class="kw">contract</span> <span class="ty">MerkleVerifier</span> {',
  '    <span class="ty">bytes32</span> <span class="kw">public</span> merkleRoot;',
  "",
  '    <span class="kw">constructor</span>(<span class="ty">bytes32</span> _root) {',
  "        merkleRoot = _root;",
  "    }",
  "",
  '    <span class="kw">function</span> <span class="fn">verify</span>(<span class="ty">bytes32</span>[] proof, <span class="ty">bytes32</span> leaf)',
  '        <span class="kw">public view returns</span> (<span class="ty">bool</span>)',
  "    {",
  '        <span class="ty">bytes32</span> hash = leaf;',
  '        <span class="kw">for</span> (<span class="ty">uint256</span> i = <span class="num">0</span>; i &lt; proof.length; i++) {',
  "            hash = hash &lt;= proof[i]",
  '                ? <span class="fn">keccak256</span>(<span class="fn">abi.encodePacked</span>(hash, proof[i]))',
  '                : <span class="fn">keccak256</span>(<span class="fn">abi.encodePacked</span>(proof[i], hash));',
  "        }",
  '        <span class="kw">return</span> hash == merkleRoot;',
  "    }",
  "}",
];

const MARQUEE_STACK = [
  "Solidity",
  "TypeScript",
  "Next.js",
  "Foundry",
  "React",
  "Viem",
  "Node.js",
  "PostgreSQL",
  "Hardhat",
  "Tailwind",
  "GraphQL",
  "Docker",
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, delay, ease: EASE },
});

const HeroLeft = () => {
  const reduced = useReducedMotion();
  const anim = (delay: number) => (reduced ? {} : fadeUp(delay));

  return (
    <div>
      <motion.p className="kz-hero-greet" {...anim(0.1)}>
        <span className="wave" role="img" aria-label="wave">
          👋
        </span>
        Hello world, I&apos;m
      </motion.p>
      <h1 className="kz-hero-name">
        <SplitText text="Rozales" className="accent" delay={0.25} />
        <motion.span className="alias" {...anim(0.65)}>
          a.k.a, <strong>Kaizendev</strong>
        </motion.span>
      </h1>
      <motion.p className="kz-hero-bio" {...anim(0.75)}>
        Full-stack engineer &amp; smart-contract developer building practical web3 solutions.
        I work in <strong>Solidity</strong>, <strong>TypeScript</strong>, and the spaces between chains.
      </motion.p>
      <motion.div className="kz-cta-row" {...anim(0.85)}>
        <Magnetic>
          <a
            className="kz-btn kz-btn-primary"
            href="#contact"
            onClick={(e) => smoothScrollTo({ e, id: "contact" })}
          >
            Get in touch <span className="arrow">→</span>
          </a>
        </Magnetic>
        <Magnetic>
          <a
            className="kz-btn kz-btn-ghost"
            href="#projects"
            onClick={(e) => smoothScrollTo({ e, id: "projects" })}
          >
            View work
          </a>
        </Magnetic>
        <a
          className="kz-status-pill"
          href="https://raac.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="pulse" />
          Currently @ RAAC
        </a>
      </motion.div>
    </div>
  );
};

const HeroIDE = () => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
    >
      <Tilt max={5}>
        <div className="kz-ide kz-ide-glow">
          <div className="kz-ide-bar">
            <div className="lights">
              <span />
              <span />
              <span />
            </div>
            <div className="filename">~/contracts/MerkleVerifier.sol</div>
            <div className="lang">SOLIDITY</div>
          </div>
          <div className="kz-ide-body">
            <pre>
              {SOLIDITY_LINES.map((line, i) => (
                <motion.span
                  key={i}
                  style={{ display: "block", minHeight: "1.65em" }}
                  initial={reduced ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.09, ease: "easeOut" }}
                  dangerouslySetInnerHTML={{
                    __html:
                      line +
                      (i === SOLIDITY_LINES.length - 1 ? '<span class="kz-ide-cursor"></span>' : ""),
                  }}
                />
              ))}
            </pre>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const StackMarquee = () => {
  const items = [...MARQUEE_STACK, ...MARQUEE_STACK];
  return (
    <div className="kz-marquee" aria-hidden>
      <div className="kz-marquee-track">
        {items.map((s, i) => (
          <span key={i} className="kz-marquee-item">
            {s}
            <span className="kz-marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default function Hero() {
  const { ref } = useSectionInView("home");
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={(node) => {
        ref(node);
        sectionRef.current = node;
      }}
      className="kz-hero"
    >
      <div className="kz-aurora" aria-hidden>
        <span className="kz-aurora-blob kz-aurora-a" />
        <span className="kz-aurora-blob kz-aurora-b" />
        <span className="kz-aurora-blob kz-aurora-c" />
      </div>
      <div className="kz-dots" />
      <motion.div
        className="kz-page"
        style={{
          width: "100%",
          y: reduced ? 0 : contentY,
          opacity: reduced ? 1 : contentOpacity,
        }}
      >
        <div className="kz-hero-grid">
          <HeroLeft />
          <HeroIDE />
        </div>
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <StackMarquee />
        </motion.div>
      </motion.div>
      <motion.a
        className="kz-scroll-hint"
        href="#kaizen"
        onClick={(e) => smoothScrollTo({ e, id: "kaizen" })}
        aria-label="Scroll down"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ opacity: reduced ? 1 : contentOpacity }}
      >
        <span className="kz-scroll-hint-label">scroll</span>
        <span className="kz-scroll-hint-line" />
      </motion.a>
    </section>
  );
}
