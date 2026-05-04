"use client";

import Image from "next/image";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { workExperiences } from "@/constants/experience";

export default function Experience() {
  const { ref } = useSectionInView("experience");

  return (
    <section id="experience" ref={ref} className="kz-section">
      <div className="kz-page">
        <p className="kz-eyebrow" style={{ justifyContent: "center", display: "flex" }}>
          Career
        </p>
        <h2 className="kz-h2" style={{ textAlign: "center" }}>
          The <em>path</em> so far.
        </h2>
        <p className="kz-section-lede" style={{ textAlign: "center", margin: "0 auto 56px" }}>
          A few teams, a lot of contracts.
        </p>
        <div className="kz-xp">
          {workExperiences.map((x) => {
            const isCurrent = /present/i.test(x.duration);
            return (
              <div key={x.id} className="kz-xp-row">
                <div className="kz-xp-dot" data-current={isCurrent ? "1" : "0"}>
                  {x.icon ? (
                    <Image src={x.icon} alt="" width={22} height={22} />
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--kz-fg-2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="6" width="18" height="14" rx="2" />
                      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    </svg>
                  )}
                </div>
                <div className="kz-xp-card">
                  <div className="kz-xp-meta">
                    <span>{x.duration}</span>
                    {isCurrent && <span className="current">CURRENT</span>}
                  </div>
                  <h3 className="kz-xp-title">{x.name}</h3>
                  <p className="kz-xp-role">{x.pos}</p>
                  <p className="kz-xp-text">{x.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
