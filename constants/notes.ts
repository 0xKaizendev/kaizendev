export type Note = {
  title: string;
  summary: string;
  year: number;
  /** Language the note is written in, when it isn't English. */
  lang?: "fr";
  tags: string[];
  href: string;
};

export const notes: Note[] = [
  {
    title: "Smart Contract Dev Process",
    summary:
      "Reference guide for the development, testing, audit and deployment workflow on RAAC Protocol: Hardhat config, Solidity standards, security patterns, gas optimisation, coverage thresholds, audit checklist and deployment pipeline.",
    year: 2025,
    lang: "fr",
    tags: ["Solidity", "Hardhat", "Process"],
    href: "/writing/blockchain-dev-guide",
  },
];
