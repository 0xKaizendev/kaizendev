import { getSpotifyPlayingNow } from "@/lib/spotify";
import Vinyl from "./vinyl";

export default async function NowSpinning() {
  const data = await getSpotifyPlayingNow();
  return (
    <Vinyl
      isPlaying={data.isPlaying}
      title={data.title}
      artist={data.artist}
      songUrl={data.songUrl}
      albumImageUrl={data.albumImageUrl}
    />
  );
}
