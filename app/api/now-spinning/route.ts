import { NextResponse } from "next/server";
import { getSpotifyPlayingNow } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  const track = await getSpotifyPlayingNow();
  return NextResponse.json(track, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
  });
}
