import { ImageResponse } from "next/og";
import { notes } from "@/constants/notes";
import { LedgerCard, OG_SIZE, loadOgFonts } from "@/components/og/ledger-card";

const note = notes.find((n) => n.href === "/writing/blockchain-dev-guide")!;

export const alt = `${note.title}, a note by Rozales Assimpah`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <LedgerCard
        numeral="肆"
        eyebrow={`NotePublished · ${note.year}${note.lang === "fr" ? " · written in French" : ""}`}
        title={["Smart Contract", "Dev Process"]}
        titleSize={104}
        lede={note.tags.join(" · ")}
        footer="kaizendev.me/writing · Rozales Assimpah"
      />
    ),
    { ...OG_SIZE, fonts: await loadOgFonts() },
  );
}
