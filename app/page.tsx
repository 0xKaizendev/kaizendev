import Hero from "@/components/sections/hero";
import Blocks from "@/components/sections/blocks";
import Transactions from "@/components/sections/transactions";
import Read from "@/components/sections/read";
import Notes from "@/components/sections/notes";

export default function Index() {
  return (
    <main className="kl-main">
      <Hero />
      <Blocks />
      <Transactions />
      <Read />
      <Notes />
    </main>
  );
}
