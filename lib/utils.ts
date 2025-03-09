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

export const smoothScrollTo = ({
  e,
  id,
}: {
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  id: string
}) => {
  e.preventDefault()
  const element = document.getElementById(id) as HTMLElement
  element?.scrollIntoView({
    block: 'start',
  })
}