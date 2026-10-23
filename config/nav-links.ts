// The ledger's sections, in reading order. The numeral is the entry number
// written in the margin, as in a Japanese account book.
export const ledgerSections = [
  { id: "blocks", numeral: "一", title: "Blocks" },
  { id: "transactions", numeral: "二", title: "Transactions" },
  { id: "read", numeral: "三", title: "Read" },
  { id: "notes", numeral: "四", title: "Notes" },
  { id: "write", numeral: "五", title: "Write" },
] as const;

export type LedgerSectionId = (typeof ledgerSections)[number]["id"];
