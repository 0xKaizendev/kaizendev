"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";
import { smoothScrollTo } from "@/lib/utils";

const SOLIDITY_HIGHLIGHTED = `<span class="cm">// SPDX-License-Identifier: MIT</span>
<span class="kw">pragma</span> <span class="kw">solidity</span> <span class="num">^0.8.0</span>;

<span class="kw">contract</span> <span class="ty">MerkleVerifier</span> {
    <span class="ty">bytes32</span> <span class="kw">public</span> merkleRoot;

    <span class="kw">constructor</span>(<span class="ty">bytes32</span> _root) {
        merkleRoot = _root;
    }

    <span class="kw">function</span> <span class="fn">verify</span>(<span class="ty">bytes32</span>[] proof, <span class="ty">bytes32</span> leaf)
        <span class="kw">public view returns</span> (<span class="ty">bool</span>)
    {
        <span class="ty">bytes32</span> hash = leaf;
        <span class="kw">for</span> (<span class="ty">uint256</span> i = <span class="num">0</span>; i &lt; proof.length; i++) {
            hash = hash &lt;= proof[i]
                ? <span class="fn">keccak256</span>(<span class="fn">abi.encodePacked</span>(hash, proof[i]))
                : <span class="fn">keccak256</span>(<span class="fn">abi.encodePacked</span>(proof[i], hash));
        }
        <span class="kw">return</span> hash == merkleRoot;
    }
}`;

const HeroLeft = () => (
  <div>
    <p className="kz-hero-greet">
      <span className="wave" role="img" aria-label="wave">👋</span>
      Hello world, I&apos;m
    </p>
    <h1 className="kz-hero-name">
      <span className="accent">Rozales</span>
      <span className="alias">a.k.a, <strong>Kaizendev</strong></span>
    </h1>
    <p className="kz-hero-bio">
      Full-stack engineer & smart-contract developer building practical web3 solutions.
      I work in <strong>Solidity</strong>, <strong>TypeScript</strong>, and the spaces between chains.
    </p>
    <div className="kz-cta-row">
      <a
        className="kz-btn kz-btn-primary"
        href="#contact"
        onClick={(e) => smoothScrollTo({ e, id: "contact" })}
      >
        Get in touch <span className="arrow">→</span>
      </a>
      <a
        className="kz-btn kz-btn-ghost"
        href="#projects"
        onClick={(e) => smoothScrollTo({ e, id: "projects" })}
      >
        View work
      </a>
      <span className="kz-status-pill">
        <span className="pulse" />
        Available for hire
      </span>
    </div>
  </div>
);

const HeroIDE = () => (
  <div className="kz-ide">
    <div className="kz-ide-bar">
      <div className="lights"><span /><span /><span /></div>
      <div className="filename">~/contracts/MerkleVerifier.sol</div>
      <div className="lang">SOLIDITY</div>
    </div>
    <div className="kz-ide-body">
      <pre dangerouslySetInnerHTML={{ __html: SOLIDITY_HIGHLIGHTED + '<span class="kz-ide-cursor"></span>' }} />
    </div>
  </div>
);

export default function Hero() {
  const { ref } = useSectionInView("home");
  return (
    <section id="home" ref={ref} className="kz-hero">
      <div className="kz-dots" />
      <div className="kz-page" style={{ width: "100%" }}>
        <div className="kz-hero-grid">
          <HeroLeft />
          <HeroIDE />
        </div>
      </div>
    </section>
  );
}
