import Hero from "@/components/sections/hero";
import Blocks from "@/components/sections/blocks";
import Transactions from "@/components/sections/transactions";

export default function Index() {
  return (
    <main className="kl-main">
      <Hero />
      <Blocks />
      <Transactions />
    </main>
  );
}
