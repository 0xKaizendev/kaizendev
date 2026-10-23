"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/constants/projects";
import { useInk } from "@/components/ink/ink-provider";
import { kanjiNumeral, shortHex } from "@/lib/format";
import { cn } from "@/lib/utils";

export type TxRow = Project & { id: string; blockLabel: string };

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

export default function TxLedger({ rows }: { rows: TxRow[] }) {
  const [query, setQuery] = useState("");
  const [lit, setLit] = useState<string | null>(null);
  const search = useRef<HTMLInputElement>(null);
  const { enso } = useInk();

  const entries = useMemo(
    () =>
      rows.map((r, i) => ({
        row: r,
        numeral: kanjiNumeral(i + 1),
        haystack: [r.title, r.summary, r.description, r.chain, r.blockLabel, r.method, r.contract, ...r.stack]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      })),
    [rows],
  );
  const q = query.trim().toLowerCase();
  const visible = q ? entries.filter((e) => e.haystack.includes(q)) : entries;

  // "/" jumps to the search, as on most explorers
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || isTyping(e.target)) return;
      e.preventDefault();
      search.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // #tx-<slug> links (from a block, or shared): clear the search, bring the entry up and circle it
  useEffect(() => {
    const reveal = () => {
      const slug = window.location.hash.match(/^#tx-(.+)$/)?.[1];
      if (!slug) return;
      setQuery("");
      setLit(slug);
      window.setTimeout(() => {
        const entry = document.getElementById(`tx-${slug}`);
        if (!entry) return;
        entry.scrollIntoView({ block: "center" });
        // the cell stretches to the row's height: circle the numeral itself
        const mark = entry.querySelector(".kl-tx-no > span");
        if (mark) enso(mark, { radius: 24, weight: 6, duration: 700, life: 3200 });
      }, 60);
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [enso]);

  useEffect(() => {
    if (!lit) return;
    const t = window.setTimeout(() => setLit(null), 2600);
    return () => window.clearTimeout(t);
  }, [lit]);

  return (
    <div>
      <div className="kl-txbar">
        <label className="kl-search">
          <span aria-hidden>⌕</span>
          <input
            ref={search}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search the ledger: zkevm, lido, ai…"
            aria-label="Search projects by name, chain or tool"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd aria-hidden>/</kbd>
        </label>
        <p className="kl-txcount" aria-live="polite">
          {q ? `${visible.length} of ${rows.length}` : `${rows.length} entries`}
        </p>
      </div>

      <div className="kl-txhead" aria-hidden>
        <span>No.</span>
        <span>Call</span>
        <span>Project</span>
        <span>Chain · block</span>
      </div>

      {visible.length ? (
        <ol className="kl-txs">
          {visible.map(({ row: r, numeral }) => (
            <li key={r.slug} id={`tx-${r.slug}`} className={cn("kl-tx", lit === r.slug && "is-lit")}>
              <span className="kl-tx-no" aria-hidden>
                <span lang="ja">{numeral}</span>
              </span>
              <div className="kl-tx-call">
                {r.method ? <code className="kl-tx-method">{r.method}</code> : <span className="kl-tx-kind">dApp</span>}
                {r.contract && <span className="kl-tx-contract">{r.contract}</span>}
                <span className="kl-tx-id" title={`keccak256("${r.slug}")`}>
                  {shortHex(r.id)}
                </span>
              </div>
              <div className="kl-tx-main">
                <h3 className="kl-tx-title">{r.title}</h3>
                <p className="kl-tx-sum">{r.summary}</p>
                <details className="kl-tx-input">
                  <summary>Input data</summary>
                  <p>{r.description}</p>
                </details>
                <p className="kl-tx-stack">{r.stack.join(" · ")}</p>
              </div>
              <div className="kl-tx-meta">
                <span className="kl-tx-chain">{r.chain}</span>
                <a href="#blocks" className="kl-tx-block">
                  Block {r.blockLabel}
                </a>
                <span className="kl-tx-links">
                  {r.links.repo && (
                    <Link href={r.links.repo} target="_blank" rel="noopener noreferrer">
                      repo ↗
                    </Link>
                  )}
                  {r.links.live && (
                    <Link href={r.links.live} target="_blank" rel="noopener noreferrer">
                      live ↗
                    </Link>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="kl-txempty">
          Nothing in the ledger matches “{query.trim()}”.{" "}
          <button type="button" onClick={() => setQuery("")}>
            Clear the search
          </button>
        </p>
      )}

      <p className="kl-txnote">
        Ids are keccak256 of each project&apos;s slug, not transaction hashes. Methods are the real entry points, as
        named in each repo.
      </p>
    </div>
  );
}
