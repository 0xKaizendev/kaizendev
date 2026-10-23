import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Images rendered by next/og (Satori): flexbox only, inline styles, and literal colours,
// since CSS variables don't reach it. These match the paper theme in styles/globals.css.
export const PAPER = "#eae7df";
export const INK = "#17140f";
export const INK_2 = "#48433a";
export const INK_3 = "#6b655a";
export const SEAL = "#b4262d";
export const SEAL_INK = "#f5ecdf";
const RULE = "rgba(180, 38, 45, 0.34)";

export const OG_SIZE = { width: 1200, height: 630 };

/** Subsets fetched by scripts/fetch-og-fonts.mjs: every glyph drawn here must be in them. */
export async function loadOgFonts() {
  const font = (file: string) => readFile(join(process.cwd(), "assets/fonts/og", file));
  const [mincho, minchoBold, mono] = await Promise.all([
    font("ShipporiMincho-Regular.ttf"),
    font("ShipporiMincho-ExtraBold.ttf"),
    font("MartianMono-Regular.ttf"),
  ]);
  return [
    { name: "Mincho", data: mincho, weight: 400 as const, style: "normal" as const },
    { name: "Mincho", data: minchoBold, weight: 800 as const, style: "normal" as const },
    { name: "Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

/** The square 改善 hanko, drawn with boxes since Satori has no inset shadows. */
export function OgSeal({ size, chars = ["改", "善"] }: { size: number; chars?: string[] }) {
  const ring = Math.max(1.5, size * 0.035);
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: SEAL,
        borderRadius: size * 0.05,
      }}
    >
      <div
        style={{
          width: size * 0.84,
          height: size * 0.84,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: `${ring}px solid ${SEAL_INK}`,
          color: SEAL_INK,
          fontFamily: "Mincho",
          fontWeight: 800,
          fontSize: size * (chars.length > 1 ? 0.3 : 0.56),
          lineHeight: 1.05,
        }}
      >
        {chars.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </div>
  );
}

type LedgerCardProps = {
  /** Entry numeral for the margin, as on the site's sections. */
  numeral?: string;
  eyebrow: string;
  title: string[];
  titleSize: number;
  lede?: string;
  footer: string;
  /** The vertical 改善 and the seal, for the home card. */
  mark?: boolean;
};

/** A page of the ledger at 1200×630: margin, vermilion rules, Mincho for people, mono for the machine. */
export function LedgerCard({ numeral, eyebrow, title, titleSize, lede, footer, mark }: LedgerCardProps) {
  return (
    <div style={{ ...OG_SIZE, display: "flex", background: PAPER, color: INK, fontFamily: "Mincho" }}>
      <div
        style={{
          width: 120,
          display: "flex",
          justifyContent: "center",
          paddingTop: 58,
          borderRight: `2px solid ${RULE}`,
          color: SEAL,
          fontSize: 56,
          fontWeight: 800,
        }}
      >
        {numeral ?? ""}
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 64px 54px",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Mono", fontSize: 21, color: INK_3 }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: titleSize,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
            }}
          >
            {title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
          {lede && (
            <div style={{ display: "flex", maxWidth: 640, marginTop: 26, fontSize: 28, lineHeight: 1.5, color: INK_2 }}>
              {lede}
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 18,
            borderTop: `2px solid ${RULE}`,
            fontFamily: "Mono",
            fontSize: 19,
            color: INK_3,
          }}
        >
          <span>{footer}</span>
          {!mark && <OgSeal size={44} />}
        </div>
      </div>

      {mark && (
        <div
          style={{
            width: 290,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 168,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            <span>改</span>
            <span>善</span>
          </div>
          <div style={{ display: "flex", marginTop: 34 }}>
            <OgSeal size={92} />
          </div>
        </div>
      )}
    </div>
  );
}
