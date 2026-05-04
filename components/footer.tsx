import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getNowPlaying, getRecentTrack } from "@/lib/spotify";

interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  album: { name: string; images: Array<{ url: string }> };
  external_urls: { spotify: string };
}

interface SpotifyRecentResponse {
  items: Array<{ track: SpotifyTrack }>;
}

async function getSpotifyPlayingNow() {
  let response = await getNowPlaying();
  let isPlaying = false;
  let title: string | null = null;
  let artist: string | null = null;
  let songUrl: string = "https://open.spotify.com";

  if (response.status === 204 || response.status > 400) {
    try {
      response = await getRecentTrack();
      const recentData = (await response.json()) as SpotifyRecentResponse;
      const track = recentData?.items?.[0]?.track;
      if (!track) {
        return { isPlaying: false, title: "Not playing", artist: "Spotify", songUrl };
      }
      title = track.name;
      artist = track.artists.map((a) => a.name).join(", ");
      songUrl = track.external_urls.spotify;
    } catch {
      return { isPlaying: false, title: "Not playing", artist: "Spotify", songUrl };
    }
  } else {
    const song = await response.json();
    isPlaying = song.is_playing;
    title = song.item.name;
    artist = song.item.artists.map((a: { name: string }) => a.name).join(", ");
    songUrl = song.item.external_urls.spotify;
  }

  return { isPlaying, title, artist, songUrl };
}

const SpotifyGlyph = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

export default async function Footer() {
  const data = await getSpotifyPlayingNow();
  const label = data.isPlaying ? "now playing" : "last played";
  const trackText = `${data.title}${data.artist ? ` — ${data.artist}` : ""}`;

  return (
    <footer className="kz-page">
      <div className="kz-footer">
        <a
          className={`kz-spotify ${data.isPlaying ? "is-playing" : ""}`}
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="kz-spotify-icon">
            <SpotifyGlyph />
          </span>
          <span className="kz-spotify-track">
            <span className="label">{label}</span>
            <span className="name">{trackText}</span>
          </span>
          <span className="kz-spotify-eq"><span /><span /><span /><span /></span>
        </a>
        <div className="kz-foot-credit">
          Built with care by{" "}
          <Link href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
            Rozales
          </Link>{" "}
          · Hosted on{" "}
          <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            Vercel
          </Link>{" "}
          ·{" "}
          <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
            Source
          </Link>
        </div>
      </div>
    </footer>
  );
}
