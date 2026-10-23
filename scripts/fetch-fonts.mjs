// Downloads the Shippori Mincho and Martian Mono subsets the site is drawn with.
//
// Shippori Mincho is a Japanese font: served whole by next/font/google it arrives as a hundred
// unicode-range slices per weight, all preloaded (7.5 MB on the home page). The site needs Latin,
// accents, punctuation and a handful of kanji, so it ships a subset holding just that.
//   assets/fonts/web/  woff2 files for the pages (next/font/local in app/layout.tsx)
//   assets/fonts/og/   ttf files for the images rendered by next/og (Satori reads only ttf/otf)
//
// The kanji come from scanning the source, so run this again after writing new ones:
//   node scripts/fetch-fonts.mjs
// Both fonts are under the SIL Open Font License.

import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => String.fromCodePoint(from + i)).join("");

const LATIN =
  range(0x20, 0x7e) + // ASCII
  range(0xa0, 0x17f) + // Latin-1 and Latin Extended-A: French and friends
  range(0x2010, 0x2027) + // dashes, quotes, bullet, ellipsis
  range(0x2030, 0x203a) + // per mille, primes, guillemets
  "→←↔↗×✓✕";

async function sourceKanji() {
  const found = new Set();
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (/\.(tsx?|css)$/.test(entry.name)) {
        for (const ch of (await readFile(path, "utf8")).match(/[　-ヿ㐀-鿿豈-﫿]/g) ?? []) {
          found.add(ch);
        }
      }
    }
  };
  for (const dir of ["app", "components", "config", "constants", "lib", "styles"]) await walk(dir);
  return [...found].sort().join("");
}

// Google Fonts answers with woff2 for a browser, ttf for anything else
const BROWSER = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

async function download(family, text, format, out) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`;
  const headers = format === "woff2" ? { "User-Agent": BROWSER } : {};
  const css = await (await fetch(cssUrl, { headers })).text();
  const pattern = format === "woff2" ? /src: url\((.+?)\) format\('woff2'\)/ : /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/;
  const url = css.match(pattern)?.[1];
  if (!url) throw new Error(`Google Fonts sent no ${format} for ${family}:\n${css}`);
  const data = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(out, data);
  console.log(`${out}: ${(data.length / 1024).toFixed(1)} KB`);
}

const kanji = await sourceKanji();
console.log(`kanji found in the source: ${kanji}`);
await mkdir("assets/fonts/web", { recursive: true });
await mkdir("assets/fonts/og", { recursive: true });

for (const weight of [400, 600, 800]) {
  await download(`Shippori+Mincho:wght@${weight}`, LATIN + kanji, "woff2", `assets/fonts/web/ShipporiMincho-${weight}.woff2`);
}
await download("Shippori+Mincho:wght@400", LATIN, "ttf", "assets/fonts/og/ShipporiMincho-Regular.ttf");
await download("Shippori+Mincho:wght@800", LATIN + kanji, "ttf", "assets/fonts/og/ShipporiMincho-ExtraBold.ttf");
await download("Martian+Mono:wght@400", LATIN, "ttf", "assets/fonts/og/MartianMono-Regular.ttf");
