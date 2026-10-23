"use client";

import { useEffect, useRef, useState } from "react";
import { hire, type HireField, type HireResult } from "@/actions/hire";
import { useInk } from "@/components/ink/ink-provider";
import { Seal } from "@/components/seal";

type Receipt =
  | { state: "idle" }
  | { state: "pending"; call: string }
  | { state: "done"; call: string; replyTo: string; result: HireResult; tilt: number };

const quote = (value: string, max = 28) => JSON.stringify(value.length > max ? `${value.slice(0, max)}…` : value);

export default function HireForm({ email }: { email: string }) {
  const form = useRef<HTMLFormElement>(null);
  const mark = useRef<HTMLSpanElement>(null);
  const [receipt, setReceipt] = useState<Receipt>({ state: "idle" });
  const [invalid, setInvalid] = useState<HireField | null>(null);
  const { enso } = useInk();

  // arriving from the hero seal or the #next block: put the cursor in the form,
  // on pointer devices only so a phone doesn't throw its keyboard up
  useEffect(() => {
    const focus = () => {
      if (window.location.hash !== "#write" || !window.matchMedia("(pointer: fine)").matches) return;
      window.setTimeout(() => form.current?.querySelector("input")?.focus({ preventScroll: true }), 400);
    };
    focus();
    window.addEventListener("hashchange", focus);
    return () => window.removeEventListener("hashchange", focus);
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (receipt.state === "pending") return;
    const data = new FormData(e.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "").trim();
    const replyTo = text("replyTo");
    const call = `hire(${quote(text("team") || "anon")}, ${quote(replyTo)}, ${quote(text("message"))})`;

    setInvalid(null);
    setReceipt({ state: "pending", call });

    // the ensō turns where the seal will land, while Resend answers
    const circle = mark.current
      ? enso(mark.current, { radius: 50, weight: 10, duration: 1100, life: 4200 })
      : Promise.resolve();

    let result: HireResult;
    try {
      [result] = await Promise.all([hire(data), circle]);
    } catch {
      result = { ok: false, error: "the call never reached the server" };
    }

    setReceipt({ state: "done", call, replyTo, result, tilt: Math.random() * 16 - 8 });
    if (result.ok) {
      form.current?.reset();
    } else if (result.field) {
      setInvalid(result.field);
      const input = form.current?.elements.namedItem(result.field);
      if (input instanceof HTMLElement) input.focus();
    }
  };

  const pending = receipt.state === "pending";

  return (
    <div className="kl-write">
      <form ref={form} className="kl-hire" onSubmit={submit} aria-describedby="hire-receipt">
        <p className="kl-sig">
          <code>hire(string team, string replyTo, string message)</code> <em>→ receipt</em>
        </p>
        <div className="kl-field">
          <label htmlFor="hire-team">
            team <em>(string, optional)</em>
          </label>
          <input id="hire-team" name="team" maxLength={120} autoComplete="organization" placeholder="Your team or protocol" />
        </div>
        <div className="kl-field">
          <label htmlFor="hire-reply">
            replyTo <em>(string)</em>
          </label>
          <input
            id="hire-reply"
            name="replyTo"
            type="email"
            required
            maxLength={320}
            autoComplete="email"
            placeholder="you@team.xyz"
            aria-invalid={invalid === "replyTo" || undefined}
          />
        </div>
        <div className="kl-field">
          <label htmlFor="hire-message">
            message <em>(string)</em>
          </label>
          <textarea
            id="hire-message"
            name="message"
            required
            rows={5}
            maxLength={5000}
            placeholder="What are you building, and where do I fit?"
            aria-invalid={invalid === "message" || undefined}
          />
        </div>
        {/* honeypot: hidden from people and assistive tech, filled by bots */}
        <div className="kl-hp" aria-hidden>
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <div className="kl-hire-row">
          <button type="submit" className="kl-btn" disabled={pending}>
            {pending ? "Writing…" : "Write"} <span lang="ja">書</span>
          </button>
          <span className="kl-hire-value">msg.value: 0 ETH · asking is free</span>
        </div>
      </form>

      <div id="hire-receipt" className="kl-receipt" aria-live="polite">
        <p className="kl-receipt-title">
          Receipt · <span lang="ja">受領</span>
        </p>
        {receipt.state === "idle" ? (
          <p className="kl-receipt-note">No transaction yet. Fill in hire() and press Write.</p>
        ) : (
          <ul>
            <li className="kl-receipt-call">{receipt.call}</li>
            {receipt.state === "pending" ? (
              <li className="kl-receipt-pending">
                <span className="kl-live" aria-hidden /> Sending through Resend…
              </li>
            ) : receipt.result.ok ? (
              <>
                <li className="kl-receipt-ok">
                  ✓ Delivered{receipt.result.id ? ` · id ${receipt.result.id.slice(0, 8)}…` : ""}
                </li>
                <li className="kl-receipt-note">I&apos;ll answer at {receipt.replyTo}, usually within a day.</li>
              </>
            ) : (
              <>
                <li className="kl-receipt-err">✕ Reverted: {receipt.result.error}</li>
                <li className="kl-receipt-note">
                  Nothing was sent. Fix it and write again, or email {email} directly.
                </li>
              </>
            )}
          </ul>
        )}
        <span ref={mark} className="kl-receipt-mark" aria-hidden>
          {receipt.state === "done" && receipt.result.ok && (
            <span className="kl-receipt-stamp" style={{ "--r": `${receipt.tilt}deg` } as React.CSSProperties}>
              <Seal size="lg" />
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
