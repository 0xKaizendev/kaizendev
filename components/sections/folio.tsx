import { ledgerSections, type LedgerSectionId } from "@/config/nav-links";

type FolioProps = {
  id: LedgerSectionId;
  title: string;
  lede?: string;
  children: React.ReactNode;
};

/** A page of the ledger: the entry numeral sits in the margin, behind a vermilion rule. */
export default function Folio({ id, title, lede, children }: FolioProps) {
  const section = ledgerSections.find((s) => s.id === id)!;

  return (
    <section id={id} className="kl-folio" aria-labelledby={`${id}-title`}>
      <div className="kl-page kl-folio-grid">
        <div className="kl-folio-margin" aria-hidden>
          <span lang="ja">{section.numeral}</span>
        </div>
        <div className="kl-folio-body">
          <header className="kl-folio-head">
            <p className="kl-folio-label">{section.title}</p>
            <h2 id={`${id}-title`} className="kl-folio-title">
              {title}
            </h2>
            {lede && <p className="kl-folio-lede">{lede}</p>}
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}
