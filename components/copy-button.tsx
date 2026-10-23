"use client";

import { useEffect, useState } from "react";

export default function CopyButton({ value, label = "copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // clipboard refused (permissions, insecure context): the value stays visible to select by hand
    }
  };

  return (
    <button type="button" className="kl-copy" onClick={copy} aria-label={`Copy ${value}`}>
      <span aria-live="polite">{copied ? "copied" : label}</span>
    </button>
  );
}
