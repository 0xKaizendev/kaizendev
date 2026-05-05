import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="kz-page">
      <div className="kz-footer">
        <div className="kz-foot-credit">
          Built with care by{" "}
          <Link href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer">
            Rozales
          </Link>{" "}
          · Hosted on{" "}
          <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer">
            Vercel
          </Link>{" "}
          ·{" "}
          <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">
            Source
          </Link>
        </div>
      </div>
    </footer>
  );
}
