import type { BlockId } from "./experience";

export type Project = {
  slug: string;
  title: string;
  /** The contract and entry point a caller hits, as named in the repo. Omitted for apps. */
  contract?: string;
  method?: string;
  summary: string;
  description: string;
  chain: string;
  block: BlockId;
  stack: string[];
  links: { repo?: string; live?: string };
};

export const projects: Project[] = [
  {
    slug: "gemach-onchain-ai",
    title: "Gemach Onchain AI",
    summary: "Chat in, transactions out: an AI interface for contract calls and cross-chain operations.",
    description:
      "A modern web3 application that combines AI capabilities with blockchain transactions, enabling smart contract interactions and cross-chain operations through an intuitive chat interface.",
    chain: "Multichain",
    block: "gemach",
    stack: ["Next.js", "TypeScript", "OpenAI", "Symbiosis", "Curve", "LI.FI"],
    links: { live: "https://beta.gemach.io" },
  },
  {
    slug: "tokenbound-cross-chain-forwarder",
    title: "TokenBound Cross-Chain Forwarder",
    contract: "CrossChainForwarder",
    method: "onMessageReceived()",
    summary:
      "Lets ERC-6551 token-bound accounts call contracts on Ethereum or zkEVM through the LxLy bridge, in both directions.",
    description:
      "A cross-chain forwarder enabling 6551 contracts to seamlessly call instances on either Ethereum or zkEVM via the LxLy bridge. Functionality includes bidirectional call forwarding between Ethereum and zkEVM.",
    chain: "Ethereum ↔ zkEVM",
    block: "llamas",
    stack: ["Solidity", "Hardhat", "zkEVM"],
    links: { repo: "https://github.com/0xKaizendev/zkevm-call-forwarder" },
  },
  {
    slug: "eip-3009-pos-portal-token",
    title: "EIP-3009 PoS Portal Token Template",
    contract: "UChildEIP3009",
    method: "transferWithAuthorization()",
    summary: "A UChild template for Polygon PoS tokens with transfers by signed authorization, so someone else can pay the gas.",
    description:
      "A new UChild template for PoS Portal Tokens that integrates EIP-3009, allowing ERC-20 transfers with authorization. This upgrade supports meta-transactions, enabling users to delegate gas payments, batch transactions, and transfer tokens via signed authorizations, enhancing transaction flexibility and security.",
    chain: "Polygon PoS",
    block: "llamas",
    stack: ["Solidity", "Truffle", "EIP-3009"],
    links: { repo: "https://github.com/0xKaizendev/pos-portal/tree/UChildERC20Permit" },
  },
  {
    slug: "cdk-lxly-lido-investment-manager",
    title: "CDK LxLy × Lido Investment Manager",
    contract: "InvestmentManager",
    method: "invest()",
    summary: "Stakes the bridge's excess ETH as stETH toward a target share, and redeems it when balances need it back.",
    description:
      "Enhancement of LxLy bridge contract to enable staking of ETH through Lido. Adds an InvestmentManager role with permissions to manage ETH and ERC-20 assets in LxLy, stake excess ETH in stETH, and manage yield distribution. Key functions include invest() for staking ETH based on target percentages, and redeem() to adjust balances by redeeming stETH as needed.",
    chain: "Ethereum ↔ zkEVM",
    block: "llamas",
    stack: ["Solidity", "Foundry", "Lido"],
    links: { repo: "https://github.com/0xKaizendev/zkevm-bridge-investment-manager" },
  },
  {
    slug: "world-id-state-bridge-scroll",
    title: "World ID State Bridge on Scroll",
    contract: "ScrollStateBridge",
    method: "propagateRoot()",
    summary: "Relays World ID Merkle roots from Ethereum mainnet to Scroll, alongside the Optimism, Base and Polygon bridges.",
    description:
      "Integration of the World ID State Bridge with the Scroll Bridge to enable cross-chain messaging. This integration enables propagation of World ID merkle tree roots from the WorldIDIdentityManager contract on Ethereum mainnet to Scroll, complementing existing support for Optimism, Base, and Polygon PoS. The implementation uses the OP bridge as a reference for Scroll, including xDomain messaging verification and deployment scripts.",
    chain: "Ethereum → Scroll",
    block: "llamas",
    stack: ["Solidity", "Foundry", "Scroll"],
    links: { repo: "https://github.com/0xKaizendev/world-id-state-bridge/tree/scroll-integration" },
  },
];
