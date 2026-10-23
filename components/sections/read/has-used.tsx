"use client";

import { useRef, useState } from "react";
import { useInk } from "@/components/ink/ink-provider";

export type ToolRecord = {
  name: string;
  /** Stack group, when the tool is part of the curated stack. */
  group?: string;
  /** Projects on the ledger that use it. */
  projects: string[];
};

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// common spellings that point at a tool already on the record
const ALIASES: Record<string, string> = {
  ts: "typescript",
  js: "typescript",
  javascript: "typescript",
  next: "nextjs",
  node: "nodejs",
  postgres: "postgresql",
  tailwindcss: "tailwind",
  sol: "solidity",
};

const SUGGESTIONS = ["Foundry", "Curve", "zkEVM"];

type Answer = { asked: string; record: ToolRecord | null };

function describe(record: ToolRecord) {
  const parts = [record.name];
  if (record.group) parts.push(`${record.group.toLowerCase()} stack`);
  if (record.projects.length) parts.push(`used in ${record.projects.join(", ")}`);
  return parts.join(" · ");
}

/** hasUsed(string tool) → bool: the one read function that takes an argument. */
export default function HasUsed({ tools }: { tools: ToolRecord[] }) {
  const [tool, setTool] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [busy, setBusy] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const { enso } = useInk();

  const query = async (value: string) => {
    const asked = value.trim();
    if (!asked || busy) return;
    setBusy(true);
    setAnswer(null);
    // the ensō closes when the answer comes back
    if (button.current) await enso(button.current, { weight: 5, duration: 600, life: 2600 });
    const key = normalize(asked);
    const target = ALIASES[key] ?? key;
    setAnswer({ asked, record: tools.find((t) => normalize(t.name) === target) ?? null });
    setBusy(false);
  };

  return (
    <div className="kl-arg">
      <form
        className="kl-arg-form"
        onSubmit={(e) => {
          e.preventDefault();
          query(tool);
        }}
      >
        <label htmlFor="has-used-tool">
          tool <em>(string)</em>
        </label>
        <input
          id="has-used-tool"
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          placeholder="Foundry"
          autoComplete="off"
          spellCheck={false}
        />
        <button ref={button} type="submit" className="kl-q" disabled={busy || !tool.trim()}>
          {busy ? "Querying…" : "Query"}
        </button>
      </form>
      <p className="kl-arg-try">
        <span>try</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            disabled={busy}
            onClick={() => {
              setTool(s);
              query(s);
            }}
          >
            {s}
          </button>
        ))}
      </p>
      <div className="kl-arg-out" aria-live="polite">
        {answer &&
          (answer.record ? (
            <p className="kl-ret ink-reveal">
              <b className="kl-bool">true</b>
              <span>{describe(answer.record)}</span>
            </p>
          ) : (
            <p className="kl-ret ink-reveal">
              <b className="kl-bool is-false">false</b>
              <span>
                “{answer.asked}” isn&apos;t on the record, and the record isn&apos;t exhaustive. Ask me through{" "}
                <a href="#write">hire()</a>.
              </span>
            </p>
          ))}
      </div>
    </div>
  );
}
