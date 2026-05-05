import Image from "next/image";
import { books } from "@/constants/books";

export default function BooksShelf() {
  return (
    <div className="kz-shelf">
      <div className="kz-shelf-head">
        <span className="kz-shelf-label">Books</span>
        <span className="kz-shelf-count">
          {String(books.length).padStart(2, "0")}
        </span>
      </div>
      <ul className="kz-shelf-list">
        {books.map((b, i) => {
          const initials = b.title
            .replace(/[^A-Za-zÀ-ÿ0-9 ]/g, "")
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join("");
          return (
            <li key={b.title} className="kz-shelf-row">
              <span className="kz-shelf-static">
                <span className="kz-shelf-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="kz-shelf-cover kz-shelf-cover--book" aria-hidden>
                  {b.cover ? (
                    <Image
                      src={b.cover}
                      alt=""
                      width={48}
                      height={64}
                      unoptimized
                    />
                  ) : (
                    <span className="kz-shelf-tile">{initials}</span>
                  )}
                </span>
                <span className="kz-shelf-meta">
                  <span className="kz-shelf-title">{b.title}</span>
                  <span className="kz-shelf-sub">
                    {b.author} · {b.year}
                    {b.note && <em> — {b.note}</em>}
                  </span>
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
