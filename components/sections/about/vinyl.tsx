"use client";

import Link from "next/link";

type VinylProps = {
  isPlaying: boolean;
  title: string;
  artist: string;
  songUrl: string;
  albumImageUrl: string | null;
};

export default function Vinyl({
  isPlaying,
  title,
  artist,
  songUrl,
  albumImageUrl,
}: VinylProps) {
  return (
    <div className={`kz-vinyl ${isPlaying ? "is-playing" : "is-paused"}`}>
      <div className="kz-vinyl-stage">
        <div className="kz-vinyl-platter">
          <div className="kz-vinyl-grooves" aria-hidden />
          <div className="kz-vinyl-label">
            {albumImageUrl ? (
              // Plain <img> so next/image config is irrelevant for arbitrary Spotify CDN
              // eslint-disable-next-line @next/next/no-img-element
              <img src={albumImageUrl} alt="" />
            ) : (
              <span className="kz-vinyl-label-fallback" aria-hidden>
                ◉
              </span>
            )}
            <span className="kz-vinyl-spindle" aria-hidden />
          </div>
        </div>
        <svg
          className="kz-vinyl-tonearm"
          viewBox="0 0 100 100"
          aria-hidden
        >
          {/* base */}
          <circle cx="86" cy="14" r="6" fill="currentColor" opacity="0.5" />
          {/* arm — pivots from upper right corner */}
          <g
            style={{
              transformOrigin: "86px 14px",
              transform: isPlaying ? "rotate(-30deg)" : "rotate(-55deg)",
              transition: "transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <line
              x1="86"
              y1="14"
              x2="50"
              y2="58"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <circle cx="50" cy="58" r="3" fill="currentColor" />
          </g>
        </svg>
      </div>

      <div className="kz-now-caption">
        <span className="kz-now-eyebrow">
          <span className={`kz-now-dot ${isPlaying ? "is-live" : ""}`} />
          {isPlaying ? "Now spinning" : "Last spun"}
        </span>
        <Link
          href={songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="kz-now-track"
        >
          {title}
        </Link>
        <span className="kz-now-artist">{artist}</span>
        <Link
          href={songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="kz-now-link"
        >
          Open in Spotify <span aria-hidden>↗</span>
        </Link>
      </div>
    </div>
  );
}
