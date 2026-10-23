import type { Metadata } from "next";
import { notes } from "@/constants/notes";
import { siteConfig } from "@/config/site";

const note = notes.find((n) => n.href === "/writing/blockchain-dev-guide")!;

// the page itself is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: note.title,
  description: note.summary,
  alternates: { canonical: note.href },
  // set in full: a segment's openGraph replaces the root one rather than merging with it
  openGraph: {
    type: "article",
    title: note.title,
    description: note.summary,
    url: note.href,
    locale: "fr_FR",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: note.title,
    description: note.summary,
    creator: siteConfig.handle,
  },
};

export default function NoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
