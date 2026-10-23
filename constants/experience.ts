export type BlockId = "llamas" | "gemach" | "raac";

export type Block = {
  id: BlockId;
  /** Year the block opened. Stands in for a block number. */
  number: number;
  org: string;
  url?: string;
  role: string;
  /** "YYYY-MM". `to` stays null while the block is still being written. */
  from: string;
  to: string | null;
  location: string;
  summary: string;
  description: string;
};

// Oldest first: the chain reads left to right and the last block is the head.
export const blocks: Block[] = [
  {
    id: "llamas",
    number: 2023,
    org: "The Llamas",
    role: "Smart Contract Developer",
    from: "2023-07",
    to: "2024-10",
    location: "Remote",
    summary: "Bounties for the community: cross-chain messaging, token integrations and security work.",
    description:
      "Contributed to multiple bounties for THE LLAMAS community, focusing on cross-chain messaging, token integration, and security enhancements. Worked on integrating the Polygon zkEVM LxLy bridge for cross-chain messaging, developed Scroll support for the World ID State Bridge, and implemented EIP-3009 and permit functionality for PoS Portal tokens.",
  },
  {
    id: "gemach",
    number: 2024,
    org: "Gemach DAO",
    url: "https://gemach.io/",
    role: "Full Stack Blockchain Developer",
    from: "2024-06",
    to: "2024-12",
    location: "Remote",
    summary:
      "Led Gemach Onchain AI, a DeFi agent that turns chat into onchain actions, and brought GoPlus security checks into GBot AI.",
    description:
      "Led development of Gemach Onchain AI, a DeFi agent platform that simplifies complex blockchain interactions through an AI-powered interface. Integrated GoPlus Security's API suite into GBot AI, enhancing Web3 security infrastructure with real-time threat detection, NFT authentication, and phishing site recognition. Built automated workflows for token swaps, bridging, and liquidity provisioning across multiple blockchains with real-time market analysis and risk assessment capabilities.",
  },
  {
    id: "raac",
    number: 2025,
    org: "RAAC Protocol",
    url: "https://raac.io/",
    role: "Smart Contract Developer",
    from: "2025-07",
    to: null,
    location: "Remote",
    summary: "Smart contracts for real-estate tokenization and onchain lending, wired into Curve, Convex and f(x) protocol.",
    description:
      "Developing complex smart contract systems for real estate tokenization and on-chain lending protocols that bring real estate on-chain and integrate it within DeFi rails. Building integration layers between real estate assets and DeFi infrastructure, advanced stablecoin mechanisms, and yield optimization strategies. Working on automated reward distribution systems, governance mechanisms, and cross-protocol composability features with existing DeFi ecosystems like Curve, Convex, and f(x) protocol. Focused on creating predictable, low-volatility strategies through real estate-backed lending and borrowing.",
  },
];
