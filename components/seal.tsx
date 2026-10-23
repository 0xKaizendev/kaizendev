import { cn } from "@/lib/utils";

type SealProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

/** The square 改善 hanko. Decorative: wrap it in a link or button when it does something. */
export function Seal({ size = "md", className }: SealProps) {
  return (
    <span className={cn("kl-seal", `kl-seal--${size}`, className)} lang="ja" aria-hidden>
      <span>
        改<br />善
      </span>
    </span>
  );
}

/** 検, the round inspection seal stamped on checked records. Stands in for a "verified" badge. */
export function Kenin({ label = "Verified", className }: { label?: string; className?: string }) {
  return (
    <span className={cn("kl-kenin", className)} lang="ja" role="img" aria-label={label} title={label}>
      検
    </span>
  );
}
