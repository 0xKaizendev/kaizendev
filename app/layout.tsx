import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Martian_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import InkProvider from "@/components/ink/ink-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Brush serif for people: names, titles, answers, seals. A subset (Latin, accents and the
// kanji the site uses) made by scripts/fetch-fonts.mjs: the full Japanese font is megabytes.
const fontMincho = localFont({
  src: [
    { path: "../assets/fonts/web/ShipporiMincho-400.woff2", weight: "400" },
    { path: "../assets/fonts/web/ShipporiMincho-600.woff2", weight: "600" },
    { path: "../assets/fonts/web/ShipporiMincho-800.woff2", weight: "800" },
  ],
  variable: "--font-mincho",
  display: "swap",
});

// Mono for the machine: addresses, hashes, function signatures, block numbers.
const fontMono = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["Rozales Assimpah", "Kaizendev", "smart contract developer", "Solidity", "DeFi", "TypeScript", "Lomé"],
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.handle,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eae7df" },
    { media: "(prefers-color-scheme: dark)", color: "#14120f" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // the font variables live on <html> so the tokens on :root can reference them
    <html lang="en" className={cn(fontMincho.variable, fontMono.variable)} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <InkProvider>
            <Header />
            {children}
            <Footer />
          </InkProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
