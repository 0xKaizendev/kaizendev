import { ImageResponse } from "next/og";
import { OgSeal, loadOgFonts } from "@/components/og/ledger-card";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<OgSeal size={180} />, { ...size, fonts: await loadOgFonts() });
}
