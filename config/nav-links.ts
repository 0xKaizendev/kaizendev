// The ledger's sections, in reading order. The numeral is the entry number written
// in the margin, in daiji (大字): see kanjiNumeral in lib/format.ts.
export const ledgerSections = [
  { id: "blocks", numeral: "壱", title: "Blocks" },
  { id: "transactions", numeral: "弐", title: "Transactions" },
  { id: "read", numeral: "参", title: "Read" },
  { id: "notes", numeral: "肆", title: "Notes" },
  { id: "write", numeral: "伍", title: "Write" },
] as const;

export type LedgerSectionId = (typeof ledgerSections)[number]["id"];
