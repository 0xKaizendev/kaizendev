import Link from "next/link";
import { about } from "@/constants/about";
import { resolveEns } from "@/lib/ens";
import { shortHex } from "@/lib/format";
import { Kenin } from "@/components/seal";
import CopyButton from "@/components/copy-button";
import HeroMark from "./hero-mark";

export default async function Hero() {
  const address = await resolveEns(about.ens);

  return (
    <section id="top" className="kl-hero" aria-label="Rozales Assimpah">
      <div className="kl-page kl-hero-grid">
        <div className="kl-hero-id">
          <p className="kl-hero-addr">
            <span className="kl-hero-ens">{about.ens}</span>
            {address && (
              <>
                <Link
                  href={`https://etherscan.io/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={address}
                >
                  {shortHex(address)}
                </Link>
                <CopyButton value={address} />
              </>
            )}
          </p>
          <h1 className="kl-hero-name">
            <span>
              Rozales
              <br />
              Assimpah
            </span>
            <Kenin label="Verified" />
          </h1>
          <p className="kl-hero-line">{about.tagline}</p>
          <dl className="kl-hero-stats">
            {about.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
            <div>
              <dt>Status</dt>
              <dd>
                <Link href={about.company.url} target="_blank" rel="noopener noreferrer">
                  Building @ RAAC
                </Link>
              </dd>
            </div>
          </dl>
        </div>
        <HeroMark />
      </div>
    </section>
  );
}
