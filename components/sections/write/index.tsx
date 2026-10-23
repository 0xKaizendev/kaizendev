import Link from "next/link";
import { about } from "@/constants/about";
import { siteConfig } from "@/config/site";
import CopyButton from "@/components/copy-button";
import Folio from "../folio";
import HireForm from "./hire-form";

export default function Write() {
  const email = siteConfig.links.mail;

  return (
    <Folio
      id="write"
      title="Call hire()."
      lede="The ledger's only write function. No wallet, no gas: it sends me an email, and I read everything."
    >
      <HireForm email={email} />
      <dl className="kl-direct">
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${email}`}>{email}</a>
            <CopyButton value={email} />
          </dd>
        </div>
        <div>
          <dt>Telegram</dt>
          <dd>
            <Link href="https://t.me/xKaizendev" target="_blank" rel="noopener noreferrer">
              @xKaizendev
            </Link>
          </dd>
        </div>
        <div>
          <dt>Based in</dt>
          <dd>
            {about.location} · {about.timezone}
          </dd>
        </div>
      </dl>
    </Folio>
  );
}
