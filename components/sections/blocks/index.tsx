import { blocks } from "@/constants/experience";
import { projects } from "@/constants/projects";
import Folio from "../folio";
import BlockChain from "./block-chain";

export default function Blocks() {
  const chain = blocks.map((b) => ({
    ...b,
    txs: projects.filter((p) => p.block === b.id).map((p) => ({ slug: p.slug, title: p.title })),
  }));

  return (
    <Folio
      id="blocks"
      title="Three blocks, one chain."
      lede="Each job is a block, oldest first. The head is the one I'm building now; the next one is still open."
    >
      <BlockChain blocks={chain} />
    </Folio>
  );
}
