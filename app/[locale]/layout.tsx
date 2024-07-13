import "@/styles/globals.css"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Metadata } from "next"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Roboto_Mono as FontCode, Inter as FontSans, } from "next/font/google"
import { siteConfig } from "@/config/site";
import localFont from "next/font/local"
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import MainNavbar from "@/components/layout/main-nav";
// Can be imported from a shared config
// const locales = ['en', 'de'];

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }
const fontSans = FontSans({
  subsets: ["cyrillic"],
  variable: "--font-sans",
})

const fontCode = FontCode({
  subsets: ["latin"],
  variable: "--font-code",
})

// const fontHeading = localFont({
//   src: "../assets/fonts/CalSans-SemiBold.woff2",
//   variable: "--font-heading",
// })
const fontLogo = localFont({
  src: "../../assets/fonts/AquataDisplay-SemiBold.woff2",
  variable: "--font-logo",
})


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
      url: "https://taitd.io.vn",
    },
  ],
  creator: "Trịnh Đình Tài",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}
export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen font-sans antialiased background-grid--fade-out background-grid",
          fontSans.variable,
          fontCode.variable,
          // fontHeading.variable
          fontLogo.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-md">
                <div className="container lg:max-w-4xl xl:max-w-6xl">
                  <div className="flex h-20 items-center space-x-8 py-6">
                    <Logo />
                    <MainNavbar />
                  </div>
                </div>
              </header>
              <main className="container flex-1 py-6 md:py-10 lg:max-w-4xl xl:max-w-6xl">
                {children}
              </main>
              {/* <Footer /> */}
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}