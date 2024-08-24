import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, length: number = 50) {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
}
