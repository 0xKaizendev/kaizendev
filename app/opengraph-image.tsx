import { ImageResponse } from "next/og";
import { about } from "@/constants/about";
import { LedgerCard, OG_SIZE, loadOgFonts } from "@/components/og/ledger-card";

export const alt = `${about.name}, smart contract developer in Lomé`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <LedgerCard
        eyebrow={`${about.ens} · ${about.location} · ${about.timezone}`}
        title={["Rozales", "Assimpah"]}
        titleSize={112}
        lede={`${about.role} at ${about.company.name}. One improvement a day, onchain.`}
        footer="kaizendev.me · Kaizen Ledger 改善帳"
        mark
      />
    ),
    { ...OG_SIZE, fonts: await loadOgFonts() },
  );
}
