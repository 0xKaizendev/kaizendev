# Kaizen Ledger 改善帳

The portfolio of Rozales Assimpah (Kaizendev), smart contract developer in Lomé: [kaizendev.me](https://kaizendev.me).

The site is a ledger written in ink. Washi paper, sumi ink and one vermilion seal give it its look; a block explorer gives it its structure. Jobs are blocks, projects are transactions, and the contact form is the one write function, `hire()`.

## Sections

| Section | What it holds | Where the content lives |
| --- | --- | --- |
| Hero | name, `kaizendev.eth` (resolved server-side), the 改善 mark | `constants/about.ts` |
| 壱 Blocks | experience, one block per job, oldest first | `constants/experience.ts` |
| 弐 Transactions | projects, searchable (`/` focuses the search) | `constants/projects.ts` |
| 参 Read | view functions: `role()`, `about()`, `stack()`, `hasUsed(tool)`, `nowSpinning()` (live Spotify), `availability()` | `constants/about.ts`, `constants/stack.ts`, `constants/books.ts`, `constants/games.ts` |
| 肆 Notes | long-form notes, listed as `NotePublished` events | `constants/notes.ts`, `app/writing/` |
| 伍 Write | `hire(team, replyTo, message)`, sent by email through Resend | `actions/hire.ts` |

## Updating the content

- **A project**: add an entry to `constants/projects.ts`. `contract` and `method` are the real names from the repo, never invented; leave them out for an app (it shows as "dApp"). `block` attaches it to a job.
- **A job**: add a block to `constants/experience.ts`, keeping the list oldest first. The last block is the head.
- **A note**: add it to `constants/notes.ts` and its page under `app/writing/`.
- **Books and games**: `currentlyReading()` and `shelf()` stay off the page while `books.ts` and `games.ts` are empty. Only real entries.
- **New kanji anywhere**: run `node scripts/fetch-fonts.mjs` (see Fonts below), or the new characters fall back to a system font.

## Design rules

- Tokens live at the top of `styles/globals.css`: paper, ink, seal, and the vermilion ruling (朱罫) of account paper. The dark theme, "sumi night", turns the paper to ink and keeps the seal red. Use the tokens, never literal colours.
- Brush serif (Shippori Mincho) for people: names, titles, answers. Mono (Martian Mono) for the machine: addresses, hashes, signatures, block numbers.
- The seal red is the only accent.
- Section and entry numerals are daiji (壱 弐 参 肆 伍), the tamper-proof numerals of account books (`kanjiNumeral` in `lib/format.ts`).
- Site styles use the `kl-` prefix; the dev guide's use `dg-` (`styles/writing.css`).
- The ink layer (`components/ink/ink-provider.tsx`) is one canvas behind the page: a mouse leaves a trail that evaporates, and `useInk().enso(element)` brushes an ensō while something loads. Both are off with `prefers-reduced-motion`.

## Fonts

Shippori Mincho is a Japanese font; served whole it weighs megabytes. `scripts/fetch-fonts.mjs` downloads subsets holding Latin, accents, punctuation and the kanji it finds in the source:

- `assets/fonts/web/`: woff2 files loaded by `next/font/local` in `app/layout.tsx`
- `assets/fonts/og/`: ttf files for the images rendered by `next/og` (share cards and icons)

Both fonts are under the SIL Open Font License.

## Stack

Next.js 14 (App Router), TypeScript, viem (ENS resolution, keccak ids), zod, Resend, `next/og` for share images and icons. Tailwind only provides the CSS reset.

## Running it

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

| Variable | Used for |
| --- | --- |
| `RESEND_API_KEY` | `hire()`. Without it, the form answers "not configured" and sends nothing. |
| `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` | `nowSpinning()`, through `/api/now-spinning` |
| `MAINNET_RPC_URL` | resolving `kaizendev.eth`; optional, viem's public RPC is used otherwise |
| `SITE_URL`, `NEXT_PUBLIC_APP_URL` | absolute URLs |

`pnpm build` builds for production, `pnpm lint` runs ESLint. The site is deployed on Vercel.
