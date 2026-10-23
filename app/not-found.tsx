import Link from "next/link";

export default function NotFound() {
  return (
    <main className="kl-main">
      <section className="kl-page kl-404" aria-labelledby="not-found-title">
        <p className="kl-404-mark" lang="ja" aria-hidden>
          無
        </p>
        <div>
          <p className="kl-folio-label">404 · mu, nothing</p>
          <h1 id="not-found-title" className="kl-folio-title">
            Block not found.
          </h1>
          <p className="kl-folio-lede">This entry isn&apos;t in the ledger. It moved, or it was never written.</p>
          <Link href="/" className="kl-btn kl-404-back">
            Back to the ledger
          </Link>
        </div>
      </section>
    </main>
  );
}
