"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavEntry = { id: string; num: string; label: string };
type NavGroup = { label: string; items: NavEntry[] };

const NAV: NavGroup[] = [
  {
    label: "Setup",
    items: [
      { id: "s0", num: "00", label: "Stack & Structure" },
      { id: "s1", num: "01", label: "Hardhat Config" },
    ],
  },
  {
    label: "Development",
    items: [
      { id: "s2", num: "02", label: "Standards Solidity" },
      { id: "s3", num: "03", label: "Patterns & Sécurité" },
      { id: "s4", num: "04", label: "Optimisation Gas" },
    ],
  },
  {
    label: "Testing",
    items: [
      { id: "s5", num: "05", label: "Stratégie de Tests" },
      { id: "s6", num: "06", label: "Coverage Thresholds" },
      { id: "s7", num: "07", label: "Fork & Fuzz Tests" },
    ],
  },
  {
    label: "Security",
    items: [
      { id: "s8", num: "08", label: "Checklist Audit" },
      { id: "s9", num: "09", label: "Static Analysis" },
    ],
  },
  {
    label: "Deployment",
    items: [
      { id: "s10", num: "10", label: "Scripts & Verify" },
      { id: "s11", num: "11", label: "Checklist Deploy" },
      { id: "s12", num: "12", label: "CI/CD Pipeline" },
    ],
  },
  {
    label: "Post-Deploy",
    items: [
      { id: "s13", num: "13", label: "Monitoring" },
      { id: "s14", num: "14", label: "Incident Response" },
    ],
  },
];

/* Helper components */
function Section({
  id,
  num,
  title,
  tag,
  children,
}: {
  id: string;
  num: string;
  title: string;
  tag?: "required" | "optional" | "best practice";
  children: React.ReactNode;
}) {
  const tagClass =
    tag === "required" ? "dg-tag-required" : tag ? "dg-tag-optional" : "";
  return (
    <section id={id} className="dg-section">
      <div className="dg-section-marker">
        {num}
        {tag && <span className={`dg-section-tag ${tagClass}`}>{tag}</span>}
      </div>
      <h2 className="dg-section-title">{title}</h2>
      {children}
    </section>
  );
}

function Code({ lang, file, html }: { lang: string; file: string; html: string }) {
  return (
    <div className="dg-code-block">
      <div className="dg-code-header">
        <span className="dg-code-lang">{lang}</span>
        <span className="dg-code-file">{file}</span>
      </div>
      <pre dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

function Alert({
  level,
  title,
  children,
}: {
  level: "danger" | "warning" | "info";
  title: string;
  children: React.ReactNode;
}) {
  const icon = level === "danger" ? "⚠" : level === "warning" ? "!" : "ℹ";
  return (
    <div className={`dg-alert ${level}`}>
      <div className="dg-alert-icon">{icon}</div>
      <div className="dg-alert-body">
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

type CheckItem = {
  state?: "done" | "warn" | "";
  body: React.ReactNode;
  tag?: { label: string; level: "critical" | "high" | "med" };
};

function Checklist({ items }: { items: CheckItem[] }) {
  return (
    <ul className="dg-checklist">
      {items.map((it, i) => (
        <li key={i}>
          <div className={`dg-check-box ${it.state ?? ""}`} />
          <div className="dg-check-label">{it.body}</div>
          {it.tag && (
            <span className={`dg-check-tag dg-ct-${it.tag.level}`}>{it.tag.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

/* Code block strings (HTML — rendered via dangerouslySetInnerHTML inside <pre>) */

const CODE_TREE = `
contracts/
├── core/               <span class="cm"># Contrats principaux (VotingEscrow, GaugeController…)</span>
├── periphery/          <span class="cm"># StableSwap, helpers, routers</span>
├── interfaces/         <span class="cm"># IVotingEscrow.sol, IGauge.sol…</span>
├── libraries/          <span class="cm"># Logique partagée (math, epoch…)</span>
├── mocks/              <span class="cm"># Mocks UNIQUEMENT pour tests</span>
└── upgradeable/        <span class="cm"># Proxies UUPS / Beacon</span>

test/
├── unit/               <span class="cm"># 1 fichier de test par contrat</span>
│   ├── VotingEscrow.test.ts
│   ├── GaugeController.test.ts
│   └── StableSwap.test.ts
├── integration/        <span class="cm"># Scénarios multi-contrats</span>
├── fork/               <span class="cm"># Tests sur fork mainnet</span>
└── fuzz/               <span class="cm"># Propriétés invariantes</span>

scripts/
├── deploy/             <span class="cm"># 01_deploy_escrow.ts, 02_deploy_gauge.ts…</span>
├── verify/
└── utils/

deployments/            <span class="cm"># Adresses par réseau (générées par hardhat-deploy)</span>
audits/                 <span class="cm"># Rapports d'audit + réponses équipe</span>
docs/                   <span class="cm"># NatSpec exportée + architecture</span>`;

const CODE_HARDHAT = `
<span class="kw">import</span> { HardhatUserConfig } <span class="kw">from</span> <span class="str">"hardhat/config"</span>;
<span class="kw">import</span> <span class="str">"@nomicfoundation/hardhat-toolbox"</span>;
<span class="kw">import</span> <span class="str">"hardhat-deploy"</span>;
<span class="kw">import</span> <span class="str">"hardhat-gas-reporter"</span>;
<span class="kw">import</span> <span class="str">"solidity-coverage"</span>;
<span class="kw">import</span> <span class="str">"@tenderly/hardhat-tenderly"</span>;

<span class="kw">const</span> config: <span class="ty">HardhatUserConfig</span> = {
  solidity: {
    compilers: [{
      version: <span class="str">"0.8.20"</span>,
      settings: {
        optimizer: { enabled: <span class="kw">true</span>, runs: <span class="num">200</span> },
        viaIR: <span class="kw">true</span>,                   <span class="cm">// active l'optimiseur via IR</span>
        outputSelection: { <span class="str">"*"</span>: { <span class="str">"*"</span>: [<span class="str">"storageLayout"</span>] } }
      }
    }]
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.MAINNET_RPC_URL!,
        blockNumber: <span class="num">19_500_000</span>         <span class="cm">// pin pour reproductibilité</span>
      },
      allowUnlimitedContractSize: <span class="kw">false</span>  <span class="cm">// simuler la limite 24KB</span>
    },
    mainnet:  { url: process.env.MAINNET_RPC_URL!, accounts: [process.env.DEPLOYER_PK!] },
    arbitrum: { url: process.env.ARB_RPC_URL!, accounts: [process.env.DEPLOYER_PK!] },
    sepolia:  { url: process.env.SEPOLIA_RPC_URL!, accounts: [process.env.DEPLOYER_PK!] }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === <span class="str">"true"</span>,
    currency: <span class="str">"USD"</span>, coinmarketcap: process.env.CMC_API_KEY,
    outputFile: <span class="str">"gas-report.txt"</span>, noColors: <span class="kw">true</span>
  },
  coverage: {
    skipFiles: [<span class="str">"mocks/"</span>, <span class="str">"test/"</span>]
  }
};

<span class="kw">export default</span> config;`;

const CODE_ENV = `
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
ARB_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
DEPLOYER_PK=                          <span class="cm"># Jamais la clé du multisig</span>
ETHERSCAN_API_KEY=
CMC_API_KEY=                          <span class="cm"># Pour gas reporter USD</span>
REPORT_GAS=false
TENDERLY_ACCESS_KEY=
TENDERLY_PROJECT=raac-protocol`;

const CODE_NPM_SCRIPTS = `
<span class="str">"compile"</span>:         <span class="str">"hardhat compile"</span>,
<span class="str">"test"</span>:            <span class="str">"hardhat test"</span>,
<span class="str">"test:fork"</span>:       <span class="str">"HARDHAT_FORK=mainnet hardhat test test/fork/**"</span>,
<span class="str">"coverage"</span>:        <span class="str">"hardhat coverage --solcoverjs .solcover.js"</span>,
<span class="str">"gas"</span>:             <span class="str">"REPORT_GAS=true hardhat test"</span>,
<span class="str">"lint"</span>:            <span class="str">"solhint 'contracts/**/*.sol'"</span>,
<span class="str">"slither"</span>:         <span class="str">"slither . --config-file slither.config.json"</span>,
<span class="str">"deploy:testnet"</span>:  <span class="str">"hardhat deploy --network sepolia --tags all"</span>,
<span class="str">"deploy:mainnet"</span>:  <span class="str">"hardhat deploy --network mainnet --tags all"</span>,
<span class="str">"verify"</span>:          <span class="str">"hardhat etherscan-verify --network mainnet"</span>,
<span class="str">"size"</span>:            <span class="str">"hardhat size-contracts"</span>`;

const CODE_TEMPLATE = `
<span class="cm">// SPDX-License-Identifier: MIT</span>
<span class="kw">pragma solidity</span> ^<span class="num">0.8.20</span>;

<span class="cm">/// @title  NomDuContrat
/// @author RAAC Protocol
/// @notice Description courte lisible par les utilisateurs
/// @dev    Détails techniques pour les développeurs. Mentionner
///         les dépendances critiques et les invariants du contrat.</span>
<span class="kw">contract</span> <span class="ty">NomDuContrat</span> <span class="kw">is</span> <span class="ty">Initializable</span>, <span class="ty">AccessControlUpgradeable</span> {

    <span class="cm">// ── ERRORS ────────────────────────────────────────────────</span>
    <span class="kw">error</span> <span class="fn">Unauthorized</span>();
    <span class="kw">error</span> <span class="fn">InvalidAmount</span>(<span class="ty">uint256</span> amount);
    <span class="kw">error</span> <span class="fn">ZeroAddress</span>();

    <span class="cm">// ── EVENTS ────────────────────────────────────────────────</span>
    <span class="cm">/// @notice Emis lors d'un dépôt réussi
    /// @param  user    Adresse du déposant
    /// @param  amount  Montant en wei</span>
    <span class="kw">event</span> <span class="fn">Deposited</span>(<span class="kw">address indexed</span> user, <span class="ty">uint256</span> amount);

    <span class="cm">// ── CONSTANTS ─────────────────────────────────────────────</span>
    <span class="ty">uint256</span> <span class="kw">public constant</span> MAX_LOCK = <span class="num">4 * 365 days</span>;

    <span class="cm">// ── STATE ─────────────────────────────────────────────────</span>
    <span class="cm">/// @notice Total des tokens verrouillés dans le contrat</span>
    <span class="ty">uint256</span> <span class="kw">public</span> totalLocked;

    <span class="cm">// ── CONSTRUCTOR / INITIALIZER ─────────────────────────────</span>
    <span class="cm">/// @custom:oz-upgrades-unsafe-allow constructor</span>
    <span class="kw">constructor</span>() { _disableInitializers(); }

    <span class="cm">/// @notice Initialise le contrat (proxy pattern)
    /// @param  _admin  Adresse qui reçoit DEFAULT_ADMIN_ROLE</span>
    <span class="kw">function</span> <span class="fn">initialize</span>(<span class="kw">address</span> _admin) <span class="kw">external initializer</span> {
        <span class="kw">if</span> (_admin == <span class="kw">address</span>(<span class="num">0</span>)) <span class="kw">revert</span> <span class="fn">ZeroAddress</span>();
        __AccessControl_init();
        _grantRole(<span class="fn">DEFAULT_ADMIN_ROLE</span>, _admin);
    }

    <span class="cm">// ── EXTERNAL ──────────────────────────────────────────────</span>
    <span class="cm">/// @notice Dépose des tokens
    /// @param  amount  Montant à déposer (>0)
    /// @return shares  Nombre de shares créditées</span>
    <span class="kw">function</span> <span class="fn">deposit</span>(<span class="ty">uint256</span> amount) <span class="kw">external returns</span> (<span class="ty">uint256</span> shares) {
        <span class="kw">if</span> (amount == <span class="num">0</span>) <span class="kw">revert</span> <span class="fn">InvalidAmount</span>(amount);
        <span class="cm">// Checks → Effects → Interactions</span>
        shares = _calculateShares(amount);
        totalLocked += amount;
        <span class="fn">IERC20</span>(token).<span class="fn">transferFrom</span>(<span class="fn">msg.sender</span>, <span class="kw">address</span>(<span class="kw">this</span>), amount);
        <span class="kw">emit</span> <span class="fn">Deposited</span>(<span class="fn">msg.sender</span>, amount);
    }
}`;

const CODE_CEI = `
<span class="kw">function</span> <span class="fn">withdraw</span>(<span class="ty">uint256</span> amount) <span class="kw">external nonReentrant</span> {
    <span class="cm">// 1. CHECKS — toutes les validations en premier</span>
    <span class="kw">if</span> (amount == <span class="num">0</span>)                <span class="kw">revert</span> <span class="fn">InvalidAmount</span>(amount);
    <span class="kw">if</span> (balances[<span class="fn">msg.sender</span>] &lt; amount) <span class="kw">revert</span> <span class="fn">InsufficientBalance</span>();

    <span class="cm">// 2. EFFECTS — modifier l'état AVANT tout appel externe</span>
    balances[<span class="fn">msg.sender</span>] -= amount;
    totalLocked -= amount;

    <span class="cm">// 3. INTERACTIONS — appels externes EN DERNIER</span>
    <span class="fn">IERC20</span>(token).<span class="fn">transfer</span>(<span class="fn">msg.sender</span>, amount);
    <span class="kw">emit</span> <span class="fn">Withdrawn</span>(<span class="fn">msg.sender</span>, amount);
}`;

const CODE_ROLES = `
<span class="cm">// Définir les rôles en bytes32 constants — jamais en string direct</span>
<span class="ty">bytes32</span> <span class="kw">public constant</span> OPERATOR_ROLE   = <span class="fn">keccak256</span>(<span class="str">"OPERATOR_ROLE"</span>);
<span class="ty">bytes32</span> <span class="kw">public constant</span> EMERGENCY_ROLE  = <span class="fn">keccak256</span>(<span class="str">"EMERGENCY_ROLE"</span>);
<span class="ty">bytes32</span> <span class="kw">public constant</span> GAUGE_ADMIN     = <span class="fn">keccak256</span>(<span class="str">"GAUGE_ADMIN"</span>);

<span class="cm">// Toujours utiliser le modifier, pas onlyOwner (Ownable déprécié)</span>
<span class="kw">function</span> <span class="fn">addGauge</span>(<span class="kw">address</span> gauge) <span class="kw">external</span> <span class="fn">onlyRole</span>(GAUGE_ADMIN) {
    <span class="cm">// ...</span>
}

<span class="cm">// Pattern emergency pause — le circuit breaker</span>
<span class="kw">function</span> <span class="fn">pause</span>() <span class="kw">external</span> <span class="fn">onlyRole</span>(EMERGENCY_ROLE) { _pause(); }
<span class="kw">function</span> <span class="fn">unpause</span>() <span class="kw">external</span> <span class="fn">onlyRole</span>(DEFAULT_ADMIN_ROLE) { _unpause(); }`;

const CODE_GAS = `
<span class="cm">// ✓ Packer les variables storage (slot de 32 bytes)</span>
<span class="kw">struct</span> <span class="ty">LockData</span> {
    <span class="ty">uint128</span> amount;       <span class="cm">// 16 bytes  ─┐ même slot</span>
    <span class="ty">uint64</span>  lockEnd;      <span class="cm">//  8 bytes  ─┤</span>
    <span class="ty">uint64</span>  lockStart;    <span class="cm">//  8 bytes  ─┘</span>
}

<span class="cm">// ✓ Cache les variables storage dans des variables locales</span>
<span class="kw">function</span> <span class="fn">computeReward</span>() <span class="kw">external view returns</span> (<span class="ty">uint256</span>) {
    <span class="ty">uint256</span> _totalSupply = totalSupply; <span class="cm">// 1 SLOAD</span>
    <span class="ty">uint256</span> _rewardRate  = rewardRate;  <span class="cm">// 1 SLOAD</span>
    <span class="kw">return</span> _totalSupply * _rewardRate / <span class="num">1e18</span>;
}

<span class="cm">// ✓ Custom errors &lt; revert string (économie ~200 gas)</span>
<span class="kw">error</span> <span class="fn">TooEarly</span>(<span class="ty">uint256</span> available);  <span class="cm">// ✓</span>
<span class="kw">require</span>(block.timestamp &gt;= end, <span class="str">"Too early"</span>);  <span class="cm">// ✗ plus cher</span>

<span class="cm">// ✓ unchecked pour les compteurs quand overflow impossible</span>
<span class="kw">unchecked</span> {
    <span class="kw">for</span> (<span class="ty">uint256</span> i; i &lt; length; ++i) { <span class="cm">// ++i &lt; i++</span>
        <span class="cm">// ...</span>
    }
}

<span class="cm">// ✓ immutable &gt; constant &gt; storage pour les valeurs fixes</span>
<span class="kw">address public immutable</span> RAAC_TOKEN;   <span class="cm">// set dans constructor</span>`;

const CODE_GAS_WORKFLOW = `
<span class="cm"># Générer un rapport gas avec prix USD</span>
REPORT_GAS=true npx hardhat test --grep "GaugeController"

<span class="cm"># Vérifier les tailles de contrats (limite: 24KB)</span>
npx hardhat size-contracts

<span class="cm"># Comparer avant/après une optimisation</span>
git stash &amp;&amp; REPORT_GAS=true npx hardhat test &gt; gas-before.txt
git stash pop &amp;&amp; REPORT_GAS=true npx hardhat test &gt; gas-after.txt
diff gas-before.txt gas-after.txt`;

const CODE_TEST = `
<span class="kw">import</span> { expect } <span class="kw">from</span> <span class="str">"chai"</span>;
<span class="kw">import</span> { ethers } <span class="kw">from</span> <span class="str">"hardhat"</span>;
<span class="kw">import</span> { <span class="ty">SignerWithAddress</span> } <span class="kw">from</span> <span class="str">"@nomicfoundation/hardhat-ethers/signers"</span>;
<span class="kw">import</span> { time, loadFixture } <span class="kw">from</span> <span class="str">"@nomicfoundation/hardhat-network-helpers"</span>;

<span class="kw">describe</span>(<span class="str">"VotingEscrow"</span>, <span class="kw">function</span> () {

  <span class="cm">// ── FIXTURE ─────────────────────────────────────────────</span>
  <span class="cm">// Chaque describe réutilise le même fixture pour isolation</span>
  <span class="kw">async function</span> <span class="fn">deployFixture</span>() {
    <span class="kw">const</span> [owner, alice, bob] = <span class="kw">await</span> ethers.<span class="fn">getSigners</span>();
    <span class="kw">const</span> token = <span class="kw">await</span> ethers.<span class="fn">deployContract</span>(<span class="str">"VotingEscrow"</span>);
    <span class="kw">await</span> token.<span class="fn">initialize</span>(owner.address);
    <span class="kw">return</span> { token, owner, alice, bob };
  }

  <span class="kw">describe</span>(<span class="str">"#lockTokens"</span>, <span class="kw">function</span> () {

    <span class="kw">it</span>(<span class="str">"reverts with InvalidAmount on zero"</span>, <span class="kw">async function</span> () {
      <span class="kw">const</span> { token, alice } = <span class="kw">await</span> <span class="fn">loadFixture</span>(deployFixture);
      <span class="kw">await</span> <span class="fn">expect</span>(token.<span class="fn">connect</span>(alice).<span class="fn">lockTokens</span>(<span class="num">0</span>, MAX_LOCK))
        .<span class="fn">to</span>.<span class="fn">be</span>.<span class="fn">revertedWithCustomError</span>(token, <span class="str">"InvalidAmount"</span>);
    });

    <span class="kw">it</span>(<span class="str">"emits Locked event with correct args"</span>, <span class="kw">async function</span> () {
      <span class="kw">const</span> { token, alice } = <span class="kw">await</span> <span class="fn">loadFixture</span>(deployFixture);
      <span class="kw">const</span> amount = ethers.<span class="fn">parseEther</span>(<span class="str">"100"</span>);
      <span class="kw">await</span> <span class="fn">expect</span>(token.<span class="fn">connect</span>(alice).<span class="fn">lockTokens</span>(amount, MAX_LOCK))
        .<span class="fn">to</span>.<span class="fn">emit</span>(token, <span class="str">"Locked"</span>)
        .<span class="fn">withArgs</span>(alice.address, amount, <span class="fn">anyValue</span>);
    });

    <span class="kw">it</span>(<span class="str">"increases totalLocked by amount"</span>, <span class="kw">async function</span> () {
      <span class="kw">const</span> { token, alice } = <span class="kw">await</span> <span class="fn">loadFixture</span>(deployFixture);
      <span class="kw">const</span> amount = ethers.<span class="fn">parseEther</span>(<span class="str">"100"</span>);
      <span class="kw">const</span> before = <span class="kw">await</span> token.<span class="fn">totalLocked</span>();
      <span class="kw">await</span> token.<span class="fn">connect</span>(alice).<span class="fn">lockTokens</span>(amount, MAX_LOCK);
      <span class="fn">expect</span>(<span class="kw">await</span> token.<span class="fn">totalLocked</span>()).<span class="fn">to</span>.<span class="fn">equal</span>(before + amount);
    });
  });
});`;

const CODE_SOLCOVER = `
module.exports = {
  skipFiles: [<span class="str">'mocks/'</span>, <span class="str">'test/'</span>, <span class="str">'interfaces/'</span>],
  configureYulOptimizer: <span class="kw">true</span>,
  <span class="cm">// Seuils minimum — le CI échoue si non atteints</span>
  istanbulReporter: [<span class="str">'html'</span>, <span class="str">'lcov'</span>, <span class="str">'text'</span>],
  mocha: { timeout: <span class="num">120_000</span> }
};`;

const CODE_NYC = `
<span class="str">"nyc"</span>: {
  <span class="str">"check-coverage"</span>: <span class="kw">true</span>,
  <span class="str">"lines"</span>: <span class="num">95</span>,
  <span class="str">"functions"</span>: <span class="num">100</span>,
  <span class="str">"branches"</span>: <span class="num">90</span>,
  <span class="str">"statements"</span>: <span class="num">95</span>
}`;

const CODE_FORK = `
<span class="kw">import</span> { ethers } <span class="kw">from</span> <span class="str">"hardhat"</span>;
<span class="kw">import</span> { impersonateAccount, setBalance } <span class="kw">from</span>
  <span class="str">"@nomicfoundation/hardhat-network-helpers"</span>;

<span class="kw">describe</span>(<span class="str">"StableSwap — Mainnet Fork"</span>, <span class="kw">function</span> () {
  <span class="kw">this</span>.timeout(<span class="num">120_000</span>); <span class="cm">// Fork tests sont lents</span>

  <span class="kw">it</span>(<span class="str">"swaps USDC → DAI via Curve 3pool"</span>, <span class="kw">async function</span> () {
    <span class="cm">// Impersonate un whale USDC réel</span>
    <span class="kw">const</span> whale = <span class="str">"0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503"</span>;
    <span class="kw">await</span> <span class="fn">impersonateAccount</span>(whale);
    <span class="kw">await</span> <span class="fn">setBalance</span>(whale, ethers.<span class="fn">parseEther</span>(<span class="str">"10"</span>));
    <span class="kw">const</span> signer = <span class="kw">await</span> ethers.<span class="fn">getSigner</span>(whale);

    <span class="kw">const</span> usdc = <span class="kw">await</span> ethers.<span class="fn">getContractAt</span>(<span class="str">"IERC20"</span>, USDC_ADDRESS);
    <span class="kw">const</span> pool = <span class="kw">await</span> ethers.<span class="fn">getContractAt</span>(<span class="str">"ICurvePool"</span>, CURVE_3POOL);

    <span class="kw">const</span> amountIn = ethers.<span class="fn">parseUnits</span>(<span class="str">"1000"</span>, <span class="num">6</span>); <span class="cm">// 1000 USDC</span>
    <span class="kw">await</span> usdc.<span class="fn">connect</span>(signer).<span class="fn">approve</span>(pool.target, amountIn);

    <span class="cm">// Curve exchange(i, j, dx, min_dy) — 3pool: 0=DAI, 1=USDC, 2=USDT</span>
    <span class="kw">const</span> out = <span class="kw">await</span> pool.<span class="fn">connect</span>(signer).<span class="fn">exchange</span>(<span class="num">1</span>, <span class="num">0</span>, amountIn, <span class="num">0</span>);
    <span class="cm">// Vérifier le peg: 1 USDC ~ 1 DAI (± 0.1%)</span>
    <span class="fn">expect</span>(out).<span class="fn">to</span>.<span class="fn">be</span>.<span class="fn">closeTo</span>(
      ethers.<span class="fn">parseEther</span>(<span class="str">"1000"</span>),
      ethers.<span class="fn">parseEther</span>(<span class="str">"1"</span>)  <span class="cm">// 0.1% de tolérance</span>
    );
  });
});`;

const CODE_FUZZ = `
<span class="kw">import</span> fc <span class="kw">from</span> <span class="str">"fast-check"</span>; <span class="cm">// npm i -D fast-check</span>

<span class="kw">it</span>(<span class="str">"totalVotingPower &gt;= 0 for any lock config"</span>, <span class="kw">async function</span> () {
  <span class="kw">await</span> fc.<span class="fn">assert</span>(
    fc.<span class="fn">asyncProperty</span>(
      fc.<span class="fn">bigInt</span>({ min: <span class="num">1n</span>, max: ethers.<span class="fn">parseEther</span>(<span class="str">"1000000"</span>) }),
      fc.<span class="fn">integer</span>({ min: <span class="num">1</span>, max: <span class="num">4 * 365</span> }), <span class="cm">// durée en jours</span>
      <span class="kw">async</span> (amount, days) =&gt; {
        <span class="kw">const</span> power = <span class="kw">await</span> escrow.<span class="fn">computeVotingPower</span>(amount, days);
        <span class="fn">expect</span>(power).<span class="fn">to</span>.<span class="fn">be</span>.<span class="fn">gte</span>(<span class="num">0</span>);
        <span class="fn">expect</span>(power).<span class="fn">to</span>.<span class="fn">be</span>.<span class="fn">lte</span>(amount); <span class="cm">// toujours &lt;= amount</span>
      }
    ),
    { numRuns: <span class="num">500</span> }
  );
});`;

const CODE_SLITHER = `
{
  <span class="str">"filter_paths"</span>: <span class="str">"node_modules,contracts/mocks,contracts/test"</span>,
  <span class="str">"exclude_dependencies"</span>: <span class="kw">true</span>,
  <span class="str">"checklist"</span>: <span class="kw">true</span>,
  <span class="str">"sarif"</span>: <span class="str">"slither-report.sarif"</span>,
  <span class="str">"detectors_to_exclude"</span>: <span class="str">"tautology,boolean-equality"</span>,
  <span class="str">"printers_to_run"</span>: <span class="str">"human-summary,inheritance-graph,contract-summary"</span>
}`;

const CODE_SOLHINT = `
{
  <span class="str">"extends"</span>: <span class="str">"solhint:recommended"</span>,
  <span class="str">"rules"</span>: {
    <span class="str">"compiler-version"</span>: [<span class="str">"error"</span>, <span class="str">"^0.8.20"</span>],
    <span class="str">"func-visibility"</span>: [<span class="str">"error"</span>, { <span class="str">"ignoreConstructors"</span>: <span class="kw">true</span> }],
    <span class="str">"no-unused-vars"</span>: <span class="str">"error"</span>,
    <span class="str">"no-empty-blocks"</span>: <span class="str">"warn"</span>,
    <span class="str">"custom-errors"</span>: <span class="str">"warn"</span>,
    <span class="str">"named-parameters-mapping"</span>: <span class="str">"warn"</span>,
    <span class="str">"avoid-call-value"</span>: <span class="str">"error"</span>
  }
}`;

const CODE_DEPLOY = `
<span class="kw">import</span> { HardhatRuntimeEnvironment } <span class="kw">from</span> <span class="str">"hardhat/types"</span>;
<span class="kw">import</span> { <span class="ty">DeployFunction</span> } <span class="kw">from</span> <span class="str">"hardhat-deploy/types"</span>;

<span class="kw">const</span> deploy: <span class="ty">DeployFunction</span> = <span class="kw">async function</span> (hre: <span class="ty">HardhatRuntimeEnvironment</span>) {
  <span class="kw">const</span> { deployments, getNamedAccounts, network } = hre;
  <span class="kw">const</span> { deploy, get } = deployments;
  <span class="kw">const</span> { deployer, multisig } = <span class="kw">await</span> <span class="fn">getNamedAccounts</span>();

  <span class="cm">// Récupérer les dépendances déployées précédemment</span>
  <span class="kw">const</span> raacToken = <span class="kw">await</span> get(<span class="str">"RAACToken"</span>);

  <span class="kw">const</span> result = <span class="kw">await</span> <span class="fn">deploy</span>(<span class="str">"VotingEscrow"</span>, {
    <span class="kw">from</span>: deployer,
    proxy: {
      proxyContract: <span class="str">"UUPS"</span>,
      execute: {
        methodName: <span class="str">"initialize"</span>,
        args: [raacToken.address, multisig]  <span class="cm">// admin = multisig</span>
      }
    },
    log: <span class="kw">true</span>,
    autoMine: <span class="kw">true</span>,
    waitConfirmations: network.name === <span class="str">"mainnet"</span> ? <span class="num">5</span> : <span class="num">1</span>
  });

  <span class="cm">// Vérifier sur Etherscan automatiquement</span>
  <span class="kw">if</span> (result.newlyDeployed &amp;&amp; network.name !== <span class="str">"hardhat"</span>) {
    <span class="kw">await</span> hre.run(<span class="str">"verify:verify"</span>, {
      address: result.address,
      constructorArguments: []
    });
  }
};

deploy.tags = [<span class="str">"escrow"</span>, <span class="str">"all"</span>];
deploy.dependencies = [<span class="str">"token"</span>];  <span class="cm">// Hardhat-deploy gère l'ordre</span>
<span class="kw">export default</span> deploy;`;

const CODE_CI = `
<span class="kw">name</span>: CI — Smart Contracts

<span class="kw">on</span>:
  push: { branches: [main, develop] }
  pull_request: { branches: [main, develop] }

<span class="kw">jobs</span>:
  <span class="fn">lint-and-compile</span>:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: <span class="str">'20'</span>, cache: <span class="str">'npm'</span> }
      - run: npm ci
      - run: npm run lint
      - run: npm run compile

  <span class="fn">test-and-coverage</span>:
    needs: lint-and-compile
    runs-on: ubuntu-latest
    env:
      MAINNET_RPC_URL: \${{ secrets.MAINNET_RPC_URL }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: <span class="str">'20'</span>, cache: <span class="str">'npm'</span> }
      - run: npm ci
      - run: npm run coverage
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with: { token: \${{ secrets.CODECOV_TOKEN }} }
      - name: Fail if coverage below threshold
        run: npx istanbul check-coverage --lines 95 --functions 100

  <span class="fn">slither</span>:
    needs: lint-and-compile
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Slither
        uses: crytic/slither-action@v0.4.0
        with:
          sarif: results.sarif
          fail-on: high
      - uses: github/codeql-action/upload-sarif@v3
        with: { sarif_file: results.sarif }

  <span class="fn">gas-report</span>:
    needs: test-and-coverage
    runs-on: ubuntu-latest
    env:
      MAINNET_RPC_URL: \${{ secrets.MAINNET_RPC_URL }}
      REPORT_GAS: <span class="str">"true"</span>
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: <span class="str">'20'</span>, cache: <span class="str">'npm'</span> }
      - run: npm ci &amp;&amp; npm run gas
      - uses: actions/upload-artifact@v4
        with: { name: gas-report, path: gas-report.txt }`;

/* PIPELINE STEPS */
const PIPELINE = [
  { icon: "⬡", name: "Dev", desc: "Write + NatSpec" },
  { icon: "⊙", name: "Lint", desc: "Slither + Solhint" },
  { icon: "◈", name: "Test", desc: "Unit + Fork" },
  { icon: "◉", name: "Coverage", desc: ">= 95%" },
  { icon: "⬨", name: "Audit", desc: "Internal + Externe" },
  { icon: "▲", name: "Deploy", desc: "Testnet → Mainnet" },
  { icon: "◎", name: "Monitor", desc: "Tenderly + Alerts" },
];

const TOOLS = [
  { name: "Slither", desc: "Trail of Bits — détecteur de patterns dangereux" },
  { name: "Solhint", desc: "Linter de style + règles de sécurité" },
  { name: "Mythril", desc: "Analyse symbolique approfondie" },
  { name: "solc-select", desc: "Gestion des versions Solidity pour Slither" },
  { name: "Semgrep", desc: "Règles custom sur patterns RAAC" },
  { name: "eth-security-toolbox", desc: "Image Docker Trail of Bits complète" },
];

const MONITOR_TOOLS = [
  { name: "Tenderly", desc: "Alertes + simulation de tx" },
  { name: "OpenZeppelin Defender", desc: "Autotasks + Sentinels" },
  { name: "Dune Analytics", desc: "Dashboards metrics protocol" },
];

export default function BlockchainDevGuide() {
  const [activeId, setActiveId] = useState<string>("s0");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const ids = NAV.flatMap((g) => g.items.map((i) => i.id));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.4] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Reading-progress bar
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      h.style.setProperty("--dg-progress", `${Math.min(pct, 100)}%`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setTocOpen(false);
  };

  // Flat list for the rail (with group dividers)
  const railEntries: Array<
    | { kind: "label"; text: string }
    | { kind: "item"; id: string; num: string; label: string }
  > = NAV.flatMap((g) => [
    { kind: "label" as const, text: g.label },
    ...g.items.map((i) => ({ kind: "item" as const, ...i })),
  ]);

  return (
    <div className="dg-page">
      <div className="dg-progress" />

      <aside className="dg-rail" aria-label="Document outline">
        {railEntries.map((e, i) =>
          e.kind === "label" ? (
            <div key={`l-${i}`} className="dg-rail-group-label">
              {e.text}
            </div>
          ) : (
            <a
              key={e.id}
              href={`#${e.id}`}
              className={`dg-rail-item ${activeId === e.id ? "is-active" : ""}`}
              onClick={(ev) => onNavClick(ev, e.id)}
              title={e.label}
            >
              <span className="dg-rail-num">{e.num}</span>
              <span className="dg-rail-dot" />
              <span className="dg-rail-label">{e.label}</span>
            </a>
          )
        )}
      </aside>

      <article className="dg-article">
        <Link href="/#writing" className="dg-back">
          ← Back to portfolio
        </Link>

        <header className="dg-hero">
          <div className="dg-hero-eyebrow">RAAC Protocol · Blockchain Dev Process · v1.0</div>
          <h1>
            Smart Contract <em>Dev Process</em>.
          </h1>
          <p className="dg-hero-lede">
            Guide de référence exhaustif pour le développement, le testing,
            l&apos;audit et le déploiement de smart contracts sur RAAC Protocol —
            la source de vérité pour tout déploiement en production.
          </p>
          <div className="dg-hero-meta">
            <span className="dg-meta-pill">Hardhat <strong>2.x</strong></span>
            <span className="dg-meta-pill">Solidity <strong>^0.8.20</strong></span>
            <span className="dg-meta-pill">Coverage <strong>&gt;= 95%</strong></span>
            <span className="dg-meta-pill">EVM <strong>mainnet + L2</strong></span>
          </div>
        </header>

        <div className="dg-pipeline">
          {PIPELINE.map((p) => (
            <div key={p.name} className="dg-pipe-step">
              <div className="dg-pipe-icon">{p.icon}</div>
              <div className="dg-pipe-name">{p.name}</div>
              <div className="dg-pipe-desc">{p.desc}</div>
            </div>
          ))}
        </div>

          {/* SECTION 0 */}
          <Section id="s0" num="00" title="Stack & Structure de Projet" tag="required">
            <div className="dg-card-grid">
              <div className="dg-card accent-blue">
                <h4>Framework</h4>
                <p>Hardhat · ethers.js v6 · TypeScript · Chai / Mocha</p>
              </div>
              <div className="dg-card accent-green">
                <h4>Sécurité</h4>
                <p>Slither · Mythril · solhint · hardhat-gas-reporter</p>
              </div>
              <div className="dg-card accent-amber">
                <h4>Coverage</h4>
                <p>solidity-coverage · lcov · Istanbul thresholds</p>
              </div>
              <div className="dg-card accent-purple">
                <h4>Déploiement</h4>
                <p>hardhat-deploy · Tenderly · Safe Multisig</p>
              </div>
            </div>

            <h3>Structure de répertoires</h3>
            <Code lang="shell" file="arborescence" html={CODE_TREE} />

            <Alert level="info" title="Règle absolue — mocks hors production">
              Aucun contrat dans <code>contracts/mocks/</code> ne doit jamais être
              référencé dans un script de déploiement production. Vérifier via{" "}
              <code>grep -r &quot;Mock&quot; scripts/</code> avant chaque deploy.
            </Alert>
          </Section>

          {/* SECTION 1 */}
          <Section id="s1" num="01" title="Hardhat Configuration" tag="required">
            <Code lang="typescript" file="hardhat.config.ts" html={CODE_HARDHAT} />

            <h3>
              Variables d&apos;environnement requises (<code>.env</code>)
            </h3>
            <Code lang="shell" file=".env.example" html={CODE_ENV} />

            <Alert level="danger" title="Sécurité des clés privées">
              Le <code>DEPLOYER_PK</code> ne doit JAMAIS être la clé propriétaire du
              multisig. Utiliser un hot wallet dédié avec des fonds minimaux. Les
              transactions importantes passent TOUJOURS par Safe Multisig.
            </Alert>

            <h3>Scripts NPM standards</h3>
            <Code lang="json" file="package.json — scripts" html={CODE_NPM_SCRIPTS} />
          </Section>

          {/* SECTION 2 */}
          <Section id="s2" num="02" title="Standards Solidity" tag="required">
            <div className="dg-phase-badge dg-pb-dev">Phase développement</div>

            <h3>Règles de nommage</h3>
            <table className="dg-data-table">
              <thead>
                <tr>
                  <th>Élément</th>
                  <th>Convention</th>
                  <th>Exemple</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Contract", "PascalCase", "VotingEscrow"],
                  ["Interface", "I + PascalCase", "IVotingEscrow"],
                  ["Library", "PascalCase + Lib", "EpochLib"],
                  ["Event", "PascalCase", "GaugeAdded"],
                  ["Error custom", "PascalCase", "InsufficientBalance"],
                  ["Function publique", "camelCase", "lockTokens"],
                  ["Variable private", "_camelCase", "_totalLocked"],
                  ["Constante", "UPPER_SNAKE", "MAX_LOCK_DURATION"],
                  ["Immutable", "UPPER_SNAKE", "START_TIME"],
                  ["Storage slot", "UPPER_SNAKE_SLOT", "STORAGE_SLOT"],
                ].map(([a, b, c]) => (
                  <tr key={a}>
                    <td>{a}</td>
                    <td>{b}</td>
                    <td>
                      <code>{c}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Template de contrat avec NatSpec obligatoire</h3>
            <Code lang="solidity" file="ContractTemplate.sol" html={CODE_TEMPLATE} />

            <Alert level="warning" title="NatSpec est obligatoire">
              Toute fonction <code>external</code> ou <code>public</code> doit avoir{" "}
              <code>@notice</code> + <code>@param</code> + <code>@return</code>. Les
              contrats sans NatSpec complète ne passent pas la revue de code. Générer
              la doc via <code>hardhat docgen</code>.
            </Alert>
          </Section>

          {/* SECTION 3 */}
          <Section id="s3" num="03" title="Patterns & Règles de Sécurité" tag="required">
            <h3>Checks-Effects-Interactions (CEI) — obligatoire</h3>
            <Code lang="solidity" file="CEI Pattern" html={CODE_CEI} />

            <h3>Règles d&apos;accès aux rôles (OpenZeppelin AccessControl)</h3>
            <Code lang="solidity" file="Rôles RAAC" html={CODE_ROLES} />

            <h3>Patterns obligatoires par type de contrat</h3>
            <div className="dg-card-grid">
              <div className="dg-card accent-green">
                <h4>Token ERC-20 (RAAC)</h4>
                <p>
                  ERC20Permit · ERC20Votes · nonReentrant sur mint/burn · cap sur supply
                </p>
              </div>
              <div className="dg-card accent-blue">
                <h4>veToken (VotingEscrow)</h4>
                <p>
                  Lock / unlock avec timestamps · checkpoint obligatoire · lecture
                  bias/slope
                </p>
              </div>
              <div className="dg-card accent-amber">
                <h4>Gauge</h4>
                <p>
                  Epoch-based · lazy checkpoint · overflow sur intégrale de reward
                  protégé
                </p>
              </div>
              <div className="dg-card accent-purple">
                <h4>Upgradeable (proxy)</h4>
                <p>
                  UUPS ou Transparent · storage gap 50 slots ·
                  _disableInitializers() constructor
                </p>
              </div>
            </div>

            <h3>Interdictions absolues</h3>
            <Checklist
              items={[
                {
                  state: "warn",
                  body: (
                    <>
                      Utiliser <code>tx.origin</code> pour les permissions
                    </>
                  ),
                  tag: { label: "INTERDIT", level: "critical" },
                },
                {
                  state: "warn",
                  body: (
                    <>
                      Utiliser <code>block.timestamp</code> seul pour l&apos;aléatoire
                    </>
                  ),
                  tag: { label: "INTERDIT", level: "critical" },
                },
                {
                  state: "warn",
                  body: <>Appel externe avant mise à jour d&apos;état (reentrancy)</>,
                  tag: { label: "INTERDIT", level: "critical" },
                },
                {
                  state: "warn",
                  body: <>Division avant multiplication (précision perdue)</>,
                  tag: { label: "INTERDIT", level: "critical" },
                },
                {
                  state: "warn",
                  body: (
                    <>
                      Déléguer à une adresse non validée <code>delegatecall</code>
                    </>
                  ),
                  tag: { label: "INTERDIT", level: "critical" },
                },
                {
                  state: "warn",
                  body: <>Selfdestruct (déprécié EIP-6049)</>,
                  tag: { label: "INTERDIT", level: "critical" },
                },
                {
                  state: "warn",
                  body: <>Modifier le storage layout d&apos;un proxy sans migration</>,
                  tag: { label: "INTERDIT", level: "critical" },
                },
                {
                  state: "warn",
                  body: (
                    <>
                      Déployer sans <code>nonReentrant</code> sur toute fonction payable
                    </>
                  ),
                  tag: { label: "HIGH", level: "high" },
                },
              ]}
            />
          </Section>

          {/* SECTION 4 */}
          <Section id="s4" num="04" title="Optimisation Gas" tag="best practice">
            <h3>Règles d&apos;optimisation de base</h3>
            <Code lang="solidity" file="Gas patterns" html={CODE_GAS} />

            <h3>Workflow gas reporting</h3>
            <Code lang="shell" file="terminal" html={CODE_GAS_WORKFLOW} />

            <Alert level="info" title="Seuil de taille de contrat">
              Vérifier <code>npx hardhat size-contracts</code> sur chaque PR. Tout
              contrat dépassant <strong>20 KB</strong> doit être réarchitecturé (split
              en libraries, proxy pattern, Diamond EIP-2535).
            </Alert>
          </Section>

          {/* SECTION 5 */}
          <Section id="s5" num="05" title="Stratégie de Tests" tag="required">
            <div className="dg-phase-badge dg-pb-test">Phase testing</div>

            <h3>Template de test unitaire</h3>
            <Code lang="typescript" file="test/unit/VotingEscrow.test.ts" html={CODE_TEST} />

            <h3>Règles de test à respecter</h3>
            <Checklist
              items={[
                {
                  state: "done",
                  body: (
                    <>
                      Utiliser <code>loadFixture</code> pour l&apos;isolation des tests
                      (pas de <code>beforeEach</code> avec déploiement)
                    </>
                  ),
                  tag: { label: "CRITICAL", level: "high" },
                },
                {
                  state: "done",
                  body: (
                    <>
                      1 <code>describe</code> par fonction publique, 1 <code>it</code>{" "}
                      par scénario distinct
                    </>
                  ),
                  tag: { label: "HIGH", level: "high" },
                },
                {
                  state: "done",
                  body: (
                    <>
                      Tester TOUS les chemins d&apos;erreur avec{" "}
                      <code>revertedWithCustomError</code>
                    </>
                  ),
                  tag: { label: "HIGH", level: "high" },
                },
                {
                  state: "done",
                  body: (
                    <>
                      Tester les événements avec <code>emit</code> + <code>withArgs</code>
                    </>
                  ),
                  tag: { label: "MED", level: "med" },
                },
                {
                  state: "done",
                  body: <>Tester les limites: 0, max, max-1, overflow potentiel</>,
                  tag: { label: "HIGH", level: "high" },
                },
                {
                  state: "done",
                  body: <>Tester les transitions d&apos;état avant et après chaque action</>,
                  tag: { label: "MED", level: "med" },
                },
                {
                  state: "done",
                  body: (
                    <>
                      Tester le contrôle d&apos;accès pour TOUS les rôles sur chaque
                      fonction protégée
                    </>
                  ),
                  tag: { label: "HIGH", level: "high" },
                },
                {
                  state: "done",
                  body: <>Tester les scénarios de reentrancy si contrat payable</>,
                  tag: { label: "HIGH", level: "high" },
                },
              ]}
            />
          </Section>

          {/* SECTION 6 */}
          <Section id="s6" num="06" title="Coverage Thresholds" tag="required">
            <h3>Seuils minimums par type de métrique</h3>
            <div className="dg-threshold-grid">
              {[
                { l: "Lines",      pct: 95,  bar: "green", val: "green" },
                { l: "Functions",  pct: 100, bar: "green", val: "green" },
                { l: "Branches",   pct: 90,  bar: "amber", val: "amber" },
                { l: "Statements", pct: 95,  bar: "green", val: "green" },
              ].map((r) => (
                <div key={r.l} className="dg-threshold-row">
                  <span className="dg-threshold-label">{r.l}</span>
                  <div className="dg-threshold-bar-bg">
                    <div className={`dg-threshold-bar dg-bar-${r.bar}`} style={{ width: `${r.pct}%` }} />
                  </div>
                  <span className={`dg-threshold-val dg-val-${r.val}`}>{r.pct}%</span>
                </div>
              ))}
            </div>

            <Code lang="javascript" file=".solcover.js" html={CODE_SOLCOVER} />
            <Code lang="json" file="package.json — coverage thresholds (nyc)" html={CODE_NYC} />

            <Alert level="danger" title="Coverage insuffisant = PR bloquée">
              Aucune PR ne peut être mergée si la coverage tombe en dessous des
              seuils. Exceptions uniquement pour les fichiers explicitement exclus
              dans <code>.solcover.js</code>.
            </Alert>
          </Section>

          {/* SECTION 7 */}
          <Section id="s7" num="07" title="Fork Tests & Fuzz Testing" tag="required">
            <h3>Fork test — intégration contre le mainnet réel</h3>
            <Code lang="typescript" file="test/fork/StableSwap.fork.test.ts" html={CODE_FORK} />

            <h3>Fuzz / Propriétés invariantes</h3>
            <Code lang="typescript" file="test/fuzz/VotingEscrow.invariants.ts" html={CODE_FUZZ} />
          </Section>

          {/* SECTION 8 */}
          <Section id="s8" num="08" title="Checklist Pré-Audit" tag="required">
            <div className="dg-phase-badge dg-pb-audit">Phase audit</div>

            <h3>Vulnérabilités à vérifier manuellement</h3>
            <Checklist
              items={[
                {
                  body: (
                    <>
                      <strong>Reentrancy</strong> — toutes les fonctions avec appels
                      externes ont <code>nonReentrant</code> ou suivent CEI strict
                    </>
                  ),
                  tag: { label: "CRITICAL", level: "critical" },
                },
                {
                  body: (
                    <>
                      <strong>Access Control</strong> — chaque fonction sensible a le
                      bon modifier de rôle, testé
                    </>
                  ),
                  tag: { label: "CRITICAL", level: "critical" },
                },
                {
                  body: (
                    <>
                      <strong>Integer overflow</strong> — opérations arithmétiques
                      protégées (Solidity 0.8+ ou unchecked justifié)
                    </>
                  ),
                  tag: { label: "CRITICAL", level: "critical" },
                },
                {
                  body: (
                    <>
                      <strong>Price oracle manipulation</strong> — pas d&apos;utilisation
                      de spot price sans TWAP ou Chainlink
                    </>
                  ),
                  tag: { label: "CRITICAL", level: "critical" },
                },
                {
                  body: (
                    <>
                      <strong>Front-running</strong> — les fonctions sensibles (swap,
                      liquidate) utilisent des slippage params
                    </>
                  ),
                  tag: { label: "HIGH", level: "high" },
                },
                {
                  body: (
                    <>
                      <strong>Flash loan attack</strong> — les fonctions qui lisent des
                      balances vérifient l&apos;état du même block
                    </>
                  ),
                  tag: { label: "HIGH", level: "high" },
                },
                {
                  body: (
                    <>
                      <strong>Donation attack (ERC4626)</strong> — protection contre la
                      manipulation du exchange rate au premier dépôt
                    </>
                  ),
                  tag: { label: "HIGH", level: "high" },
                },
                {
                  body: (
                    <>
                      <strong>Storage collision</strong> — les proxies utilisent des
                      storage slots isolés via <code>ERC7201</code>
                    </>
                  ),
                  tag: { label: "HIGH", level: "high" },
                },
                {
                  body: (
                    <>
                      <strong>Initialization</strong> — tous les contrats upgradeables
                      ont <code>_disableInitializers()</code>
                    </>
                  ),
                  tag: { label: "HIGH", level: "high" },
                },
                {
                  body: (
                    <>
                      <strong>Precision loss</strong> — les divisions sont en dernier,
                      pas de truncation prématurée
                    </>
                  ),
                  tag: { label: "HIGH", level: "high" },
                },
                {
                  body: (
                    <>
                      <strong>Timestamp dependency</strong> — aucune logique critique
                      dépend de <code>block.timestamp</code> seul
                    </>
                  ),
                  tag: { label: "MED", level: "med" },
                },
                {
                  body: (
                    <>
                      <strong>Gas griefing</strong> — les boucles ont des limites ou
                      sont unbounded sur des arrays contrôlés
                    </>
                  ),
                  tag: { label: "MED", level: "med" },
                },
                {
                  body: (
                    <>
                      <strong>Events</strong> — chaque modification d&apos;état émet un
                      event avec les données indexées
                    </>
                  ),
                  tag: { label: "MED", level: "med" },
                },
              ]}
            />

            <h3>Checklist documentation audit</h3>
            <Checklist
              items={[
                { body: <>NatSpec complète sur tous les contrats, fonctions, events et erreurs</> },
                { body: <>Diagramme d&apos;architecture à jour (draw.io ou Mermaid)</> },
                { body: <>Liste des adresses de dépendances externes (oracles, tokens, multisigs)</> },
                { body: <>Rapport de coverage lcov disponible et &gt; seuils</> },
                { body: <>Gas report généré et joint</> },
                { body: <>CHANGELOG des modifications depuis le dernier audit</> },
                { body: <>Inventaire complet des trusted roles et leurs permissions</> },
              ]}
            />
          </Section>

          {/* SECTION 9 */}
          <Section id="s9" num="09" title="Analyse Statique" tag="required">
            <div className="dg-tool-list">
              {TOOLS.map((t) => (
                <div key={t.name} className="dg-tool-item">
                  <div className="dg-tool-name">{t.name}</div>
                  <div className="dg-tool-desc">{t.desc}</div>
                </div>
              ))}
            </div>

            <Code lang="json" file="slither.config.json" html={CODE_SLITHER} />
            <Code lang="shell" file=".solhint.json" html={CODE_SOLHINT} />

            <Alert level="warning" title="Zéro warning High/Critical de Slither">
              Le CI est configuré pour échouer si Slither détecte des issues de
              sévérité <code>high</code> ou <code>critical</code>. Les warnings Medium
              doivent être documentés et triés avant chaque déploiement.
            </Alert>
          </Section>

          {/* SECTION 10 */}
          <Section id="s10" num="10" title="Scripts de Déploiement" tag="required">
            <div className="dg-phase-badge dg-pb-deploy">Phase déploiement</div>

            <h3>Ordre de déploiement RAAC Protocol</h3>
            <table className="dg-data-table">
              <thead>
                <tr>
                  <th>Étape</th>
                  <th>Contrat</th>
                  <th>Dépendances</th>
                  <th>Tag hardhat-deploy</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["01", "RAACToken", "—", "token"],
                  ["02", "VotingEscrow", "RAACToken", "escrow"],
                  ["03", "GaugeController", "VotingEscrow", "gauge-ctrl"],
                  ["04", "GaugeRewardsDistributor", "GaugeController", "distributor"],
                  ["05", "StableSwap", "RAACToken + Oracle", "pool"],
                  ["06", "Setup Roles", "Tous ci-dessus", "setup"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td>{r[0]}</td>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                    <td>
                      <code>{r[3]}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Code lang="typescript" file="scripts/deploy/02_deploy_escrow.ts" html={CODE_DEPLOY} />
          </Section>

          {/* SECTION 11 */}
          <Section id="s11" num="11" title="Checklist de Déploiement" tag="required">
            <h3>Avant le déploiement (pre-flight)</h3>
            <Checklist
              items={[
                { body: <>Tests complets passent sur le réseau cible (fork au bon block)</>, tag: { label: "CRITICAL", level: "critical" } },
                { body: <>Coverage &gt;= seuils sur tous les contrats à déployer</>, tag: { label: "CRITICAL", level: "critical" } },
                { body: <>Slither 0 warning high/critical sur le scope de déploiement</>, tag: { label: "CRITICAL", level: "critical" } },
                { body: <>Taille des contrats vérifiée (&lt; 24KB via <code>hardhat size-contracts</code>)</>, tag: { label: "HIGH", level: "high" } },
                { body: <>Déploiement testé sur Sepolia/testnet avec le même script</>, tag: { label: "HIGH", level: "high" } },
                { body: <>Adresses multisig Safe vérifiées (<code>getNamedAccounts</code> pointe vers le bon Safe)</>, tag: { label: "CRITICAL", level: "critical" } },
                { body: <>Gas limit et gas price estimés — solde deployer suffisant</>, tag: { label: "HIGH", level: "high" } },
                { body: <>Variables d&apos;environnement production définies et vérifiées</>, tag: { label: "HIGH", level: "high" } },
              ]}
            />

            <h3>Après le déploiement (post-deploy)</h3>
            <Checklist
              items={[
                { body: <>Vérification Etherscan réussie sur tous les contrats et implémentations proxy</>, tag: { label: "HIGH", level: "high" } },
                { body: <>Adresses enregistrées dans <code>deployments/mainnet/</code> via hardhat-deploy</> },
                { body: <>Transfert admin vers Safe Multisig exécuté et confirmé on-chain</>, tag: { label: "CRITICAL", level: "critical" } },
                { body: <>Smoke tests post-déploiement (appels en lecture, 1 transaction test)</>, tag: { label: "HIGH", level: "high" } },
                { body: <>Alertes Tenderly configurées sur les contrats déployés</>, tag: { label: "HIGH", level: "high" } },
                { body: <>Mise à jour du fichier README avec les nouvelles adresses</> },
                { body: <>Tag git créé: <code>git tag deploy/mainnet/v1.x.x -a</code></> },
              ]}
            />
          </Section>

          {/* SECTION 12 */}
          <Section id="s12" num="12" title="CI/CD Pipeline (GitHub Actions)" tag="required">
            <Code lang="yaml" file=".github/workflows/ci.yml" html={CODE_CI} />

            <div className="dg-card-grid">
              <div className="dg-card accent-green">
                <h4>Branch protection rules</h4>
                <p>
                  Toutes les branches <code>main</code> et <code>develop</code>{" "}
                  requièrent: lint ✓ tests ✓ coverage ✓ slither ✓ avant merge.
                </p>
              </div>
              <div className="dg-card accent-amber">
                <h4>Secrets GitHub requis</h4>
                <p>
                  <code>MAINNET_RPC_URL</code> · <code>CODECOV_TOKEN</code> ·{" "}
                  <code>ETHERSCAN_API_KEY</code> · <code>CMC_API_KEY</code>
                </p>
              </div>
            </div>
          </Section>

          {/* SECTION 13 */}
          <Section id="s13" num="13" title="Monitoring Post-Déploiement" tag="required">
            <h3>Alertes Tenderly à configurer</h3>
            <table className="dg-data-table">
              <thead>
                <tr>
                  <th>Trigger</th>
                  <th>Sévérité</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Transfer admin role", "CRITICAL", "PagerDuty immédiat"],
                  ["Pause / Unpause", "HIGH", "Slack + équipe"],
                  ["Gauge added/killed", "HIGH", "Slack"],
                  ["Large pool swap (> $100k)", "HIGH", "Slack"],
                  ["Transaction failed on contract", "MED", "Slack"],
                  ["Gas usage anomaly (>50% baseline)", "MED", "Slack"],
                  ["Escrow totalLocked change > 5%", "INFO", "Dashboard"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <td>{r[0]}</td>
                    <td>{r[1]}</td>
                    <td>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Outils de monitoring</h3>
            <div className="dg-tool-list">
              {MONITOR_TOOLS.map((t) => (
                <div key={t.name} className="dg-tool-item">
                  <div className="dg-tool-name">{t.name}</div>
                  <div className="dg-tool-desc">{t.desc}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* SECTION 14 */}
          <Section id="s14" num="14" title="Incident Response" tag="required">
            <h3>Circuit Breaker — procédure d&apos;urgence</h3>
            <Checklist
              items={[
                {
                  state: "warn",
                  body: (
                    <>
                      <strong>Pause immédiate</strong> — Appeler <code>pause()</code>{" "}
                      via Safe Multisig si exploitation détectée
                    </>
                  ),
                  tag: { label: "STEP 1", level: "critical" },
                },
                {
                  state: "warn",
                  body: (
                    <>
                      <strong>Notifier</strong> — Annoncer le problème sur
                      Discord/Twitter + contact avec auditeur
                    </>
                  ),
                  tag: { label: "STEP 2", level: "critical" },
                },
                {
                  state: "warn",
                  body: (
                    <>
                      <strong>Analyser</strong> — Reproduire sur fork local, quantifier
                      l&apos;impact, identifier la root cause
                    </>
                  ),
                  tag: { label: "STEP 3", level: "critical" },
                },
                {
                  state: "warn",
                  body: (
                    <>
                      <strong>Patch</strong> — Développer le fix, tests, audit rapide
                      (si possible) sur le correctif
                    </>
                  ),
                  tag: { label: "STEP 4", level: "critical" },
                },
                {
                  state: "warn",
                  body: (
                    <>
                      <strong>Upgrade ou Migration</strong> — Si proxy: upgrade via
                      Safe. Sinon: migration vers nouveau contrat
                    </>
                  ),
                  tag: { label: "STEP 5", level: "critical" },
                },
                {
                  state: "warn",
                  body: (
                    <>
                      <strong>Post-mortem</strong> — Rapport post-incident public dans
                      48h (root cause, impact, mesures prises)
                    </>
                  ),
                  tag: { label: "STEP 6", level: "high" },
                },
              ]}
            />

            <Alert level="danger" title="Bug Bounty">
              Maintenir un programme de bug bounty actif sur Immunefi ou HackerOne.
              Tout report de sévérité Critical ou High doit être traité en &lt; 24h.
              Les fonds de récompense sont pré-approuvés par le multisig.
            </Alert>

            <hr className="dg-divider" />

            <div className="dg-foot">
              <div className="v">RAAC Protocol · Blockchain Dev Process · v1.0</div>
              <div className="sub">
                Hardhat · Solidity ^0.8.20 · Ce document est la source de vérité pour
                tout déploiement en production.
              </div>
            </div>
          </Section>
      </article>

      {/* Mobile TOC button + sheet */}
      <button
        type="button"
        className="dg-toc-fab"
        aria-label="Open table of contents"
        aria-expanded={tocOpen}
        onClick={() => setTocOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M3 12h12M3 18h18" />
        </svg>
        On this page
      </button>

      {tocOpen && (
        <div className="kz-sheet-backdrop is-open" onClick={() => setTocOpen(false)} aria-hidden />
      )}
      <div className={`dg-toc-sheet ${tocOpen ? "is-open" : ""}`} role="dialog" aria-label="Table of contents">
        <div className="dg-toc-sheet-head">
          <span className="dg-toc-sheet-title">On this page</span>
          <button
            type="button"
            className="dg-toc-sheet-close"
            aria-label="Close"
            onClick={() => setTocOpen(false)}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="dg-toc-sheet-list">
          {NAV.map((group) => (
            <div key={group.label}>
              <div className="dg-toc-sheet-group">{group.label}</div>
              {group.items.map((it) => (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  className={activeId === it.id ? "is-active" : ""}
                  onClick={(e) => onNavClick(e, it.id)}
                >
                  <span className="dg-toc-num">{it.num}</span>
                  {it.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
