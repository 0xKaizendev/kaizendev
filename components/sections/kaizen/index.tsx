"use client";

import { useSectionInView } from "@/hooks/use-section-in-view";

export default function AboutKaizen() {
  const { ref } = useSectionInView("kaizen");
  return (
    <section id="kaizen" ref={ref} className="kz-quote-section">
      <div className="kz-page" style={{ display: "grid", placeItems: "center", width: "100%" }}>
        <blockquote className="kz-quote">
          <div className="kz-quote-glyph">改善</div>
          <p className="kz-quote-text">
            A philosophy of <em>continuous</em> improvement of working{" "}
            <em>practices</em> that underlies total quality{" "}
            <em>management</em> &mdash; the steady, deliberate pursuit of <strong>better</strong>.
          </p>
          <p className="kz-quote-attrib">改善 · KAI · ZEN · the way of work</p>
        </blockquote>
      </div>
    </section>
  );
}
