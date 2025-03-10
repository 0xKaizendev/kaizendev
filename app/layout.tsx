import "@/styles/globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import ActiveSectionContextProvider from '@/hooks/use-active-section';
import {
  Roboto_Mono as FontCode,
  Plus_Jakarta_Sans,
  Poppins,
} from "next/font/google";
import { siteConfig } from "@/config/site";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import { ScrollBar } from "@/components/progress-bar";
import Footer from "@/components/footer";
import { Container } from "@/components/container";
import { ModeToggle } from '@/components/theme-toggle';
import Header from "@/components/header";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  adjustFontFallback: false,
});

const fontCode = FontCode({
  subsets: ["latin"],
  variable: "--font-code",
  adjustFontFallback: false,
});
const fontPoppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  adjustFontFallback: false,
});

const fontLogo = localFont({
  src: "../assets/fonts/AquataDisplay-SemiBold.woff2",
  variable: "--font-logo",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "Rozales Assimpah",
      url: "https://kaizendev.me",
    },
  ],
  creator: "Rozales ASSIMPAH",
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: siteConfig.ogImage,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.handle,
  },
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
  // manifest: `${siteConfig.url}/site.webmanifest`,
};
// TODO: add notfound page
export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Providing all messages to the client
  // side is the easiest way to get started

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          'relative antialiased flex items-center justify-center antialiase background-grid background-grid--fade-out font-sans',

          fontSans.variable,
          fontCode.variable,
          fontPoppins.variable,
          fontLogo.variable,
        )}
      >

        <div className="flex min-h-screen w-full flex-col">
          <ActiveSectionContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
              <Container className="mt-10 ">
                <Footer />
              </Container>
              <div className="fixed left-1 right-auto top-1 z-[99] sm:bottom-6 sm:left-6 sm:top-auto">
                <ModeToggle />
              </div>
            </ThemeProvider>
          </ActiveSectionContextProvider>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
