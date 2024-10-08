import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Logo from "./logo";
interface footerProps {
  className?: React.HtmlHTMLAttributes<Element>;
  dictionary: {
    built_by: string;
    hosted_on: string;
    source_code: string;
  };
}
const Footer = ({ className, dictionary }: footerProps) => {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose md:text-left">
            {/* {dictionary.built_by}{" "} */}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium animated-link"
            >
              Rozales
            </a>
            . {dictionary.hosted_on}{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium animated-link"
            >
              Vercel
            </a>
            . {dictionary.source_code}{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium animated-link "
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
