import Link from "next/link";
import { notes } from "@/constants/notes";
import { kanjiNumeral } from "@/lib/format";
import Folio from "../folio";

const LANGUAGES = { fr: "written in French" } as const;

export default function Notes() {
  return (
    <Folio id="notes" title="Things I wrote down." lede="Process docs and references: the kind of thing I wish I'd had on day one.">
      <ol className="kl-entries">
        {notes.map((n, i) => (
          <li key={n.href} className="kl-entry">
            <span className="kl-entry-no" aria-hidden>
              <span lang="ja">{kanjiNumeral(i + 1)}</span>
            </span>
            <article className="kl-entry-body kl-note">
              <p className="kl-note-event">
                <code>NotePublished</code> · {n.year}
                {n.lang && <> · {LANGUAGES[n.lang]}</>}
              </p>
              <h3 className="kl-note-title">
                <Link href={n.href} hrefLang={n.lang}>
                  {n.title}
                </Link>
              </h3>
              <p className="kl-note-sum">{n.summary}</p>
              <p className="kl-note-foot">
                <span>{n.tags.join(" · ")}</span>
                <Link href={n.href} hrefLang={n.lang} className="kl-note-read">
                  Read the note<span className="sr-only">: {n.title}</span> →
                </Link>
              </p>
            </article>
          </li>
        ))}
      </ol>
    </Folio>
  );
}
