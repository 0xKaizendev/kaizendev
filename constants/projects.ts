export const projects = [
    {
        "title": "Gemach Onchain AI",
        "description": "A modern web3 application that combines AI capabilities with blockchain transactions, enabling smart contract interactions and cross-chain operations through an intuitive chat interface",
        "links": {
            "project": "https://beta.gemach.io"
        },
        "stack": ["Next.js", "TypeScript", "Solidity", "OpenAI"],
        "logo": {
            "src": "/images/projects/gemach ai.png",
            "alt": "Gemach Onchain AI"
        }
    },
    {
        "title": "TokenBound Cross-Chain Forwarder",
        "description": "A cross-chain forwarder enabling 6551 contracts to seamlessly call instances on either Ethereum or zkEVM via the LxLy bridge. Functionality includes bidirectional call forwarding between Ethereum and zkEVM.",
        "links": {
            "github": "https://github.com/example-repo/cross-chain-forwarder"
        },
        "stack": ["Solidity", "Hardhat", "zkEVM"],
        "logo": {
            "src": "https://framerusercontent.com/images/q3buV1XMof499UYXpC264Narjv0.png",
            "alt": "Cross-Chain Forwarder - Ethereum and zkEVM"
        }
    },
    {
        "title": "UChild Template for PoS Portal Tokens with EIP-3009 Support",
        "description": "A new UChild template for PoS Portal Tokens that integrates EIP-3009, allowing ERC-20 transfers with authorization. This upgrade supports meta-transactions, enabling users to delegate gas payments, batch transactions, and transfer tokens via signed authorizations, enhancing transaction flexibility and security.",
        "links": {
            "github": "https://github.com/example-repo/uchild-eip3009"
        },
        "stack": ["Solidity", "Hardhat", "EIP-3009"],
        "logo": {
            "src": "https://framerusercontent.com/images/q3buV1XMof499UYXpC264Narjv0.png",
            "alt": "UChild Template with EIP-3009 Support"
        }
    },
    {
        "title": "GEMACH DAO - GBot Ai Integration with GoPlus Security API",
        "description": "Integration of GoPlus Security's API suite into GBot Ai, enhancing the security infrastructure of Web3 operations. This includes real-time security analysis, malicious address detection, NFT authenticity verification, token approval risk assessment, phishing detection, and more. The upgrade ensures a secure and dependable environment for users.",
        "links": {
            "github": "https://github.com/example-repo/gemach-dao-gbot-goplus-security"
        },
        "stack": ["TypeScript", "Node.js", "GoPlus API"],
        "logo": {
            "src": "https://framerusercontent.com/images/q3buV1XMof499UYXpC264Narjv0.png",
            "alt": "GEMACH DAO - GBot Ai Integration"
        }
    },
    {
        "title": "CDK LxLy x Lido Investment Manager",
        "description": "Enhancement of LxLy bridge contract to enable staking of ETH through Lido. Adds an InvestmentManager role with permissions to manage ETH and ERC-20 assets in LxLy, stake excess ETH in stETH, and manage yield distribution. Key functions include `invest()` for staking ETH based on target percentages, and `redeem()` to adjust balances by redeeming stETH as needed.",
        "links": {
            "project": "https://docs.google.com/document/d/1upSAFVA03k1BL5wRdSejEPcyFs7TyQ2tbIPO-ArhVTg/edit?usp=sharing"
        },
        "stack": ["Solidity", "Hardhat", "Lido"],
        "logo": {
            "src": "https://framerusercontent.com/images/q3buV1XMof499UYXpC264Narjv0.png",
            "alt": "CDK LxLy x Lido Investment Manager"
        }
    },
    {
        "title": "World ID State Bridge on Scroll",
        "description": "Integration of the World ID State Bridge with the Scroll Bridge to enable cross-chain messaging. This integration enables propagation of World ID merkle tree roots from the WorldIDIdentityManager contract on Ethereum mainnet to Scroll, complementing existing support for Optimism, Base, and Polygon PoS. The implementation will use the OP bridge as a reference for Scroll, including xDomain messaging verification and deployment scripts.",
        "links": {
            "github": "https://github.com/worldcoin/world-id-state-bridge",
            "project": "https://github.com/worldcoin/world-id-state-bridge/blob/scroll-integration/docs/spec.md"
        },
        "stack": ["Solidity", "Hardhat", "Scroll"],
        "logo": {
            "src": "https://framerusercontent.com/images/q3buV1XMof499UYXpC264Narjv0.png",
            "alt": "World ID State Bridge on Scroll"
        }
    }
]
