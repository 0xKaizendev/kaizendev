import Link from "next/link";
import { about } from "@/constants/about";
import { books } from "@/constants/books";
import { games } from "@/constants/games";
import { projects } from "@/constants/projects";
import { stack } from "@/constants/stack";
import { kanjiNumeral } from "@/lib/format";
import Folio from "../folio";
import HasUsed, { type ToolRecord } from "./has-used";
import NowSpinning from "./now-spinning";

type ReadFunction = { name: string; args?: string; returns: string; result: React.ReactNode };

/** Everything hasUsed() can answer for: the curated stack, plus whatever the projects list. */
function toolRecords(): ToolRecord[] {
  const usedIn = (name: string) => projects.filter((p) => p.stack.includes(name)).map((p) => p.title);
  const curated = stack.flatMap((g) => g.items.map((name) => ({ name, group: g.group, projects: usedIn(name) })));
  const known = new Set<string>(curated.map((t) => t.name));
  const fromProjects = Array.from(new Set(projects.flatMap((p) => p.stack)))
    .filter((name) => !known.has(name))
    .map((name) => ({ name, projects: usedIn(name) }));
  return [...curated, ...fromProjects];
}

export default function Read() {
  const reading = books.find((b) => b.current);

  // View functions answer on their own, as on an explorer's Read tab; only hasUsed takes an argument.
  const functions: ReadFunction[] = [
    {
      name: "role",
      returns: "string",
      result: (
        <p className="kl-ret-line">
          {about.role} @{" "}
          <Link href={about.company.url} target="_blank" rel="noopener noreferrer">
            {about.company.name}
          </Link>
        </p>
      ),
    },
    {
      name: "about",
      returns: "string",
      result: (
        <div className="kl-ret-prose">
          {about.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      ),
    },
    {
      name: "stack",
      returns: "string[]",
      result: (
        <dl className="kl-stackrows">
          {stack.map((g) => (
            <div key={g.group}>
              <dt>{g.group}</dt>
              <dd>{g.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    { name: "hasUsed", args: "string tool", returns: "bool", result: <HasUsed tools={toolRecords()} /> },
    ...(reading
      ? [
          {
            name: "currentlyReading",
            returns: "Book",
            result: (
              <p className="kl-ret-line">
                {reading.title}, {reading.author} <span className="kl-ret-meta">{reading.year}</span>
              </p>
            ),
          },
        ]
      : []),
    {
      name: "shelf",
      returns: "(Book[], Game[])",
      result: (
        <div className="kl-shelf">
          <div>
            <h3>Books</h3>
            <ul>
              {books.map((b) => (
                <li key={b.title}>
                  <span className="kl-shelf-title">{b.title}</span>
                  <span className="kl-shelf-meta">
                    {b.author} · {b.year}
                  </span>
                  {b.note && <span className="kl-shelf-note">{b.note}</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Games</h3>
            <ul>
              {games.map((g) => (
                <li key={g.title}>
                  {g.link ? (
                    <Link className="kl-shelf-title" href={g.link} target="_blank" rel="noopener noreferrer">
                      {g.title} ↗
                    </Link>
                  ) : (
                    <span className="kl-shelf-title">{g.title}</span>
                  )}
                  <span className="kl-shelf-meta">
                    {g.studio} · {g.year}
                  </span>
                  {g.note && <span className="kl-shelf-note">{g.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    { name: "nowSpinning", returns: "Track", result: <NowSpinning /> },
    {
      name: "availability",
      returns: "string",
      result: (
        <p className="kl-ret-line kl-ret-line--long">
          {about.availability}{" "}
          <a href={about.resume} target="_blank" rel="noopener noreferrer">
            resume.pdf ↗
          </a>
        </p>
      ),
    },
  ];

  return (
    <Folio
      id="read"
      title="Read the contract."
      lede="View functions answer on their own, no wallet needed. The one that takes an argument needs a query."
    >
      <ol className="kl-entries">
        {functions.map((fn, i) => (
          <li key={fn.name} className="kl-entry">
            <span className="kl-entry-no" aria-hidden>
              <span lang="ja">{kanjiNumeral(i + 1)}</span>
            </span>
            <div className="kl-entry-body">
              <p className="kl-sig">
                <code>
                  {fn.name}({fn.args ?? ""})
                </code>{" "}
                <em>→ {fn.returns}</em>
              </p>
              <div className="kl-entry-result">{fn.result}</div>
            </div>
          </li>
        ))}
      </ol>
    </Folio>
  );
}
