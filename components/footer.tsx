import * as React from "react";
import SpotifyPlayingNow from "./spotify-playing-now";
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
    <footer className={cn(className,)}>
      <div className="flex flex-col items-center md:items-start justify-center gap-4 md:h-24 ">
      <SpotifyPlayingNow />
        <div className="flex flex-col items-center h-28 gap-4 px-8 md:flex-row md:gap-2 md:px-0 justify-center">
          <Logo />
          <p className="text-center text-sm  md:text-left">
            {dictionary.built_by}{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium animated-link"
            >
              Rozales Assimpah
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
