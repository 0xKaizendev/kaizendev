import "@/styles/globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  Roboto_Mono as FontCode,
  Plus_Jakarta_Sans,
  Poppins,
} from "next/font/google";
import { siteConfig } from "@/config/site";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import MainNavbar from "@/components/layout/main-nav";
import { ScrollBar } from "@/components/progress-bar";
import Footer from "@/components/footer";
import { TRPCReactProvider } from "@/_trpc/client";
import { Container } from "@/components/container";

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
          "min-h-screen font-sans antialiased background-grid--fade-out background-grid",
          fontSans.variable,
          fontCode.variable,
          fontPoppins.variable,
          fontLogo.variable,
        )}
      >
        <TRPCReactProvider>
          {/* <SessionProvider> */}
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {/* <MainNavbar /> */}
              <p className="text-center font-medium my-4">
                🚧 Work in Progress! My portfolio is currently under
                construction. Stay tuned! 🚧
              </p>
              <ScrollBar />
              <header className="sticky top-2 z-40 w-full border-b bg-background/90 backdrop-blur-md">
                <Container>
                  <div className="flex h-20 items-center space-x-8 py-6">
                    <Logo />
                    <MainNavbar />
                  </div>
                </Container>
              </header>
              {/* <main className="content-wrapper flex-1 py-6 md:py-10 lg:max-w-4xl xl:max-w-6xl "> */}
              <main className="relative">
                <Container className="mt-10">

                  {children}

                </Container>
                <Container className="mt-10 ">
                  <Footer
                    dictionary={{
                      built_by: "Built by",
                      hosted_on: "Hosted on",
                      source_code: "Source code on",
                    }}
                  />
                </Container>
              </main>
            </ThemeProvider>
          {/* </SessionProvider> */}
        </TRPCReactProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
