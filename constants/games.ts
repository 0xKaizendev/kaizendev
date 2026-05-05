export type Game = {
  title: string;
  studio: string;
  year: number;
  cover?: string; // optional — drop a file in /public/images/games/ and reference it here
  note?: string;
  link?: string;
};

// Placeholder list — replace with real entries.
export const games: Game[] = [
  {
    title: "Disco Elysium",
    studio: "ZA/UM",
    year: 2019,
    note: "the dialogue tree as moral mirror",
    link: "https://discoelysium.com/",
  },
  {
    title: "Hollow Knight",
    studio: "Team Cherry",
    year: 2017,
    note: "metroidvania, beautifully unforgiving",
  },
  {
    title: "Outer Wilds",
    studio: "Mobius Digital",
    year: 2019,
    note: "knowledge as the only progression",
  },
  {
    title: "The Witcher 3",
    studio: "CD Projekt Red",
    year: 2015,
  },
  {
    title: "Death Stranding",
    studio: "Kojima Productions",
    year: 2019,
    note: "favorite",
  },
];
