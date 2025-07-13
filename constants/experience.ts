import { BookIcon, BriefcaseBusinessIcon } from 'lucide-react';
import React from 'react';

export const workExperiences = [
  {
    id: 1,
    name: "RAAC Protocol",
    pos: "Smart Contract Developer",
    duration: "2025 - Present",
    title:
      "Developing complex smart contract systems for real estate tokenization and on-chain lending protocols. Building integration layers between real estate assets and DeFi infrastructure, advanced stablecoin mechanisms, and yield optimization strategies. Working on automated reward distribution systems and cross-protocol composability features with existing DeFi ecosystems like Curve, Convex, and f(x) protocol.",
    icon: "/assets/raac_logo.svg",
    animation: "victory",
  },
  {
    id: 2,
    name: "Gemach DAO",
    pos: "Full Stack Blockchain Developer",
    duration: "2023 - 2024",
    title:
      "Integrated GoPlus Security's API suite into GBot AI, enhancing Web3 security infrastructure with real-time threat detection, NFT authentication, and phishing site recognition",
    icon: "/assets/gemach_logo.svg",
    animation: "victory",
  },
  {
    id: 3,
    name: "THE LLAMAS",
    pos: "Smart Contract Developer",
    duration: "2022 - 2024",
    title:
      "Contributed to multiple bounties for THE LLAMAS community, focusing on cross-chain messaging, token integration, and security enhancements. Worked on integrating the Polygon zkEVM LxLy bridge for cross-chain messaging, developed Scroll support for the World ID State Bridge, and implemented EIP-3009 and permit functionality for PoS Portal tokens.",
    icon: "/assets/framer.svg",
    animation: "clapping",
  },
];

export const experiencesData = [
  {
    title: 'RAAC Protocol',
    location: 'Remote',
    description:
      'Smart Contract Developer. Developing complex smart contract systems for real estate tokenization and on-chain lending protocols that bring real estate on-chain and integrate it within DeFi rails. Building integration layers between real estate assets and DeFi infrastructure, advanced stablecoin mechanisms, and yield optimization strategies. Working on automated reward distribution systems, governance mechanisms, and cross-protocol composability features with existing DeFi ecosystems like Curve, Convex, and f(x) protocol. Focused on creating predictable, low-volatility strategies through real estate-backed lending and borrowing.',
    icon: React.createElement(BriefcaseBusinessIcon),
    date: 'Jul 2025 - Present',
  },
  {
    title: 'Gemach DAO',
    location: 'Remote',
    description:
      'Full Stack Blockchain Developer. Led development of Gemach Onchain AI, a DeFi agent platform that simplifies complex blockchain interactions through an AI-powered interface. Integrated GoPlus Security\'s API suite into GBot AI, enhancing Web3 security infrastructure with real-time threat detection, NFT authentication, and phishing site recognition. Built automated workflows for token swaps, bridging, and liquidity provisioning across multiple blockchains with real-time market analysis and risk assessment capabilities.',
    icon: React.createElement(BriefcaseBusinessIcon),
    date: 'Jun 2024 - Dec 2024',
  },
  {
    title: 'THE LLAMAS',
    location: 'Remote',
    description: `Smart Contract Developer. Contributed to multiple bounties for THE LLAMAS community, focusing on cross-chain messaging, token integration, and security enhancements. Worked on integrating the Polygon zkEVM LxLy bridge for cross-chain messaging, developed Scroll support for the World ID State Bridge, and implemented EIP-3009 and permit functionality for PoS Portal tokens.`,
    icon: React.createElement(BookIcon),
    date: 'Jul 2023 - Oct 2024',
  },
] as const;
