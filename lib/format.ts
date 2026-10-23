const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-07" → "Jul 2025". Spelled out by hand so server and client always agree. */
export function formatMonth(yearMonth: string) {
  const [year, month] = yearMonth.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatPeriod(from: string, to: string | null) {
  return `${formatMonth(from)} → ${to ? formatMonth(to) : "now"}`;
}

// Daiji (大字), the numerals of Japanese account books and cheques: unlike 一 二 三,
// they can't be turned into another number by adding a stroke.
const DIGITS = ["", "壱", "弐", "参", "肆", "伍", "陸", "漆", "捌", "玖"];

/** Entry numbers as written in the margin of a ledger: 1 → 壱, 12 → 拾弐, 40 → 肆拾. */
export function kanjiNumeral(n: number): string {
  if (n < 10) return DIGITS[n];
  const tens = Math.floor(n / 10);
  return `${tens > 1 ? DIGITS[tens] : ""}拾${DIGITS[n % 10]}`;
}

/** 0x1234…abcd */
export function shortHex(hex: string) {
  return `${hex.slice(0, 6)}…${hex.slice(-4)}`;
}
