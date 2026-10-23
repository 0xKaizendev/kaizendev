import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Seal } from "@/components/seal";

export default function Footer() {
  return (
    <footer className="kl-footer">
      <div className="kl-page kl-footer-in">
        <p className="kl-footer-end">
          <Seal size="sm" />
          End of ledger.
        </p>
        <p className="kl-footer-meta">
          Written in Lomé by Rozales Assimpah ·{" "}
          <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>{" "}
          ·{" "}
          <Link href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
            X
          </Link>{" "}
          ·{" "}
          <Link href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </Link>{" "}
          ·{" "}
          <Link href="https://github.com/0xKaizendev/kaizendev" target="_blank" rel="noopener noreferrer">
            Source
          </Link>
        </p>
      </div>
    </footer>
  );
}
