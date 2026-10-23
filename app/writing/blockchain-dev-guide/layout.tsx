import type { Metadata } from "next";
import { notes } from "@/constants/notes";

const note = notes.find((n) => n.href === "/writing/blockchain-dev-guide")!;

// the page itself is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: note.title,
  description: note.summary,
  alternates: { canonical: note.href },
};

export default function NoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
