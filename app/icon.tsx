import { ImageResponse } from "next/og";
import { OgSeal, loadOgFonts } from "@/components/og/ledger-card";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// at 32px two characters turn to mush: the favicon keeps only 改
export default async function Icon() {
  return new ImageResponse(<OgSeal size={32} chars={["改"]} />, { ...size, fonts: await loadOgFonts() });
}
