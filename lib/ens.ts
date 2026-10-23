import { unstable_cache } from "next/cache";
import { createPublicClient, http, type Address } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.MAINNET_RPC_URL || undefined),
});

// Errors are not cached, so a flaky RPC at build time is retried on the next revalidation.
const lookup = unstable_cache(
  async (name: string) => client.getEnsAddress({ name: normalize(name) }),
  ["ens-address"],
  { revalidate: 60 * 60 * 24 },
);

export async function resolveEns(name: string): Promise<Address | null> {
  try {
    return await lookup(name);
  } catch {
    return null;
  }
}
