export type Book = {
  title: string;
  author: string;
  year: number;
  cover?: string; // optional — drop a file in /public/images/books/ and reference it here
  note?: string;
  /** The one on the nightstand right now. */
  current?: boolean;
};

// Only real entries: the shelf stays off the page while both lists are empty.
export const books: Book[] = [];
