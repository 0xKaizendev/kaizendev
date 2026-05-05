"use client";

import Image from "next/image";
import Link from "next/link";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { about } from "@/constants/about";
import GamesShelf from "./games-shelf";
import BooksShelf from "./books-shelf";

const SOCIAL_BY_NAME: Record<string, JSX.Element> = {
  github: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  ),
  twitter: (
    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c-.002-.249 1.51-2.772 1.818-4.013z" />
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
};

const EMAIL_ICON = (
  <>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </>
);

export default function About({
  nowSpinning,
}: {
  nowSpinning?: React.ReactNode;
}) {
  const { ref } = useSectionInView("about", 0.4);

  const socials = [
    ...about.socialLinks,
    { name: "email", url: "mailto:rozales@kaizendev.me" },
  ];

  return (
    <section id="about" ref={ref} className="kz-section">
      <div className="kz-page">
        <p className="kz-eyebrow">About me</p>
        <h2 className="kz-h2">A bit about <em>who I am</em>.</h2>
        <p className="kz-section-lede">
          Background, current focus, and why I do what I do.
        </p>
        <div className="kz-about-grid">
          <div className="kz-about-photo">
            <Image
              src="/images/me.png"
              alt="Rozales"
              width={720}
              height={720}
              priority
            />
            <div className="kz-about-photo-corner">
              <span className="pulse" />
              Lomé, TG
            </div>
          </div>
          <div className="kz-about-body">
            <p>
              I&apos;m a <strong>Full-stack Blockchain Developer</strong> currently at <strong>RAAC Protocol</strong>,
              building real-estate tokenization and onchain lending. Before that, I led
              development of <strong>Gemach Onchain AI</strong> &mdash; a DeFi agent that
              translates chat into onchain actions across chains.
            </p>
            <p>
              My focus is the unglamorous stuff: solid smart contracts, careful integration
              layers, and frontends that don&apos;t lie about what&apos;s happening underneath.
              I care about practice over polish, reps over rhetoric.
            </p>
            <p>
              Looking for product-minded teams where I can ship things that compound.
            </p>
            <div className="kz-about-stats">
              <div className="kz-stat">
                <div className="kz-stat-num"><em>4+</em></div>
                <div className="kz-stat-label">Years onchain</div>
              </div>
              <div className="kz-stat">
                <div className="kz-stat-num"><em>20+</em></div>
                <div className="kz-stat-label">Projects shipped</div>
              </div>
              <div className="kz-stat">
                <div className="kz-stat-num"><em>3</em></div>
                <div className="kz-stat-label">Continents collab&apos;d</div>
              </div>
            </div>
            <div className="kz-about-socials">
              {socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.url}
                  target={s.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="kz-social"
                  title={s.name}
                  aria-label={s.name}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.name === "email" ? EMAIL_ICON : SOCIAL_BY_NAME[s.name]}
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="kz-about-extra">
          <p className="kz-about-eyebrow">On the shelf</p>
          <div className="kz-about-shelves">
            <GamesShelf />
            <BooksShelf />
          </div>
        </div>

        {nowSpinning && (
          <div className="kz-about-extra">
            <p className="kz-about-eyebrow">Now spinning</p>
            {nowSpinning}
          </div>
        )}
      </div>
    </section>
  );
}
