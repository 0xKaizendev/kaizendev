export type Game = {
  title: string;
  studio: string;
  year: number;
  cover?: string; // optional — drop a file in /public/images/games/ and reference it here
  note?: string;
  link?: string;
};

// Only real entries: the shelf stays off the page while both lists are empty.
export const games: Game[] = [];
