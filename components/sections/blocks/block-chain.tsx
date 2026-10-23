"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Block } from "@/constants/experience";
import { formatPeriod } from "@/lib/format";
import { Kenin } from "@/components/seal";

type ChainBlock = Block & { txs: { slug: string; title: string }[] };

export default function BlockChain({ blocks }: { blocks: ChainBlock[] }) {
  const head = blocks.length - 1;
  const [selected, setSelected] = useState(head);
  const detail = useRef<HTMLDivElement>(null);

  const select = (i: number) => {
    setSelected(i);
    // on narrow screens the details sit below every block: bring them up if they're out of sight
    const panel = detail.current;
    if (panel && panel.getBoundingClientRect().top > window.innerHeight * 0.75) {
      panel.scrollIntoView({ block: "start" });
    }
  };

  return (
    <div>
      <ol className="kl-chain" aria-label="Blocks, oldest first">
        {blocks.map((b, i) => (
          <li key={b.id} className="kl-chain-item">
            <button
              type="button"
              className="kl-block"
              aria-pressed={i === selected}
              aria-controls="block-detail"
              onClick={() => select(i)}
            >
              <span className="kl-block-no">#{b.number}</span>
              <span className="kl-block-org">{b.org}</span>
              <span className="kl-block-role">{b.role}</span>
              <span className="kl-block-period">{formatPeriod(b.from, b.to)}</span>
              <span className="kl-block-sum">{b.summary}</span>
              <span className={i === head ? "kl-block-state is-head" : "kl-block-state"}>
                {i === head ? "Head" : "Finalized"} · {b.txs.length} {b.txs.length === 1 ? "tx" : "txs"}
              </span>
            </button>
          </li>
        ))}
        <li className="kl-chain-item">
          <a href="#write" className="kl-block kl-block--next">
            <span className="kl-block-no">#next</span>
            <span className="kl-block-org">Your team?</span>
            <span className="kl-block-sum">The next block is open. Call hire() to propose it.</span>
          </a>
        </li>
      </ol>

      <div id="block-detail" ref={detail} className="kl-blockinfo">
        {blocks.map((b, i) => (
          <article key={b.id} hidden={i !== selected} aria-label={`Block #${b.number}, ${b.org}`}>
            <header className="kl-blockinfo-head">
              <p className="kl-blockinfo-no">Block #{b.number}</p>
              <h3>
                {b.url ? (
                  <Link href={b.url} target="_blank" rel="noopener noreferrer">
                    {b.org}
                  </Link>
                ) : (
                  b.org
                )}
              </h3>
              {i === head ? (
                <p className="kl-blockinfo-state is-head">
                  <span className="kl-live" aria-hidden />
                  Head · still being written
                </p>
              ) : (
                <p className="kl-blockinfo-state">
                  <Kenin label="Finalized" />
                  Finalized
                </p>
              )}
            </header>
            <dl className="kl-fields">
              <div>
                <dt>Role</dt>
                <dd>{b.role}</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>{formatPeriod(b.from, b.to)}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{b.location}</dd>
              </div>
            </dl>
            <p className="kl-blockinfo-desc">{b.description}</p>
            <div className="kl-blockinfo-txs">
              <span>Transactions in this block</span>
              {b.txs.length ? (
                b.txs.map((t) => (
                  <a key={t.slug} href={`#tx-${t.slug}`} className="kl-txchip">
                    {t.title}
                  </a>
                ))
              ) : (
                <span className="kl-blockinfo-none">Nothing public yet.</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
