"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SpotifyPlayingNow } from "@/lib/spotify";
import { useInk } from "@/components/ink/ink-provider";

type State = "waiting" | "querying" | "done" | "failed";

/** nowSpinning() → Track: a real query, to Spotify, run when the entry scrolls into view. */
export default function NowSpinning() {
  const [state, setState] = useState<State>("waiting");
  const [track, setTrack] = useState<SpotifyPlayingNow | null>(null);
  const art = useRef<HTMLDivElement>(null);
  const { enso } = useInk();

  const query = useCallback(async () => {
    setState("querying");
    const circle = art.current ? enso(art.current, { weight: 7, duration: 900, life: 3200 }) : Promise.resolve();
    try {
      const [res] = await Promise.all([fetch("/api/now-spinning", { cache: "no-store" }), circle]);
      if (!res.ok) throw new Error(`now-spinning answered ${res.status}`);
      setTrack(await res.json());
      setState("done");
    } catch {
      setState("failed");
    }
  }, [enso]);

  useEffect(() => {
    const el = art.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        query();
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [query]);

  return (
    <div className="kl-spin" aria-busy={state === "querying"}>
      <div ref={art} className="kl-spin-art">
        {track?.albumImageUrl ? (
          // Spotify's CDN hosts vary per album: a plain <img> keeps next/image config out of it
          // eslint-disable-next-line @next/next/no-img-element
          <img src={track.albumImageUrl} alt="" width={72} height={72} />
        ) : (
          <span aria-hidden />
        )}
      </div>
      <div className="kl-spin-body" aria-live="polite">
        {state === "done" && track ? (
          <>
            <p className="kl-spin-state">
              {track.isPlaying ? (
                <>
                  <span className="kl-live" aria-hidden /> spinning now
                </>
              ) : (
                "last spun"
              )}
            </p>
            <a className="kl-spin-title" href={track.songUrl} target="_blank" rel="noopener noreferrer">
              {track.title}
            </a>
            <p className="kl-spin-artist">{track.artist}</p>
          </>
        ) : state === "done" ? (
          <p className="kl-spin-empty">Nothing on the turntable right now.</p>
        ) : state === "failed" ? (
          <p className="kl-spin-empty">Spotify didn&apos;t answer this time.</p>
        ) : (
          <p className="kl-spin-empty">Querying Spotify…</p>
        )}
      </div>
      <button type="button" className="kl-q" onClick={query} disabled={state === "querying" || state === "waiting"}>
        Query again
      </button>
    </div>
  );
}
