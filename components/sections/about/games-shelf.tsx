import Link from "next/link";
import Image from "next/image";
import { games } from "@/constants/games";

export default function GamesShelf() {
  return (
    <div className="kz-shelf">
      <div className="kz-shelf-head">
        <span className="kz-shelf-label">Games</span>
        <span className="kz-shelf-count">
          {String(games.length).padStart(2, "0")}
        </span>
      </div>
      <ul className="kz-shelf-list">
        {games.map((g, i) => {
          const initials = g.title
            .replace(/[^A-Za-z0-9 ]/g, "")
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join("");
          const RowInner = (
            <>
              <span className="kz-shelf-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="kz-shelf-cover" aria-hidden>
                {g.cover ? (
                  <Image src={g.cover} alt="" width={64} height={48} unoptimized />
                ) : (
                  <span className="kz-shelf-tile">{initials}</span>
                )}
              </span>
              <span className="kz-shelf-meta">
                <span className="kz-shelf-title">{g.title}</span>
                <span className="kz-shelf-sub">
                  {g.studio} · {g.year}
                  {g.note && <em> — {g.note}</em>}
                </span>
              </span>
              {g.link && <span className="kz-shelf-arrow">↗</span>}
            </>
          );

          return (
            <li key={g.title} className="kz-shelf-row">
              {g.link ? (
                <Link href={g.link} target="_blank" rel="noopener noreferrer">
                  {RowInner}
                </Link>
              ) : (
                <span className="kz-shelf-static">{RowInner}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
