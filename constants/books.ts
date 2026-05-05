export type Book = {
  title: string;
  author: string;
  year: number;
  cover?: string; // optional — drop a file in /public/images/books/ and reference it here
  note?: string;
};

// Placeholder list — replace with real entries.
export const books: Book[] = [
  {
    title: "L'Étranger",
    author: "Albert Camus",
    year: 1942,
    note: "absurdism, paragraph by paragraph",
  },
  {
    title: "Pensées pour moi-même",
    author: "Marc Aurèle",
    year: 180,
    note: "currently re-reading",
  },
  {
    title: "Ainsi parlait Zarathoustra",
    author: "Friedrich Nietzsche",
    year: 1883,
  },
  {
    title: "La Nausée",
    author: "Jean-Paul Sartre",
    year: 1938,
  },
  {
    title: "La Société de la fatigue",
    author: "Byung-Chul Han",
    year: 2010,
    note: "must-read for anyone shipping",
  },
];
