import { keccak256, toHex } from "viem";
import { blocks } from "@/constants/experience";
import { projects } from "@/constants/projects";
import Folio from "../folio";
import TxLedger, { type TxRow } from "./tx-ledger";

export default function Transactions() {
  // hashed here so viem stays on the server
  const rows: TxRow[] = projects.map((p) => {
    const block = blocks.find((b) => b.id === p.block)!;
    return { ...p, id: keccak256(toHex(p.slug)), blockLabel: `#${block.number} · ${block.org}` };
  });

  return (
    <Folio
      id="transactions"
      title="What I've shipped."
      lede="A selection from 20+ projects. Each one is a transaction on the ledger: search by name, chain or tool."
    >
      <TxLedger rows={rows} />
    </Folio>
  );
}
