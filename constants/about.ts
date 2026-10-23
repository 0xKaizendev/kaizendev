import { server } from "@/config";

export const about = {
  name: "Rozales Assimpah",
  alias: "Kaizendev",
  ens: "kaizendev.eth",
  role: "Smart Contract Developer",
  company: {
    name: "RAAC Protocol",
    url: "https://raac.io/",
  },
  location: "Lomé, Togo",
  timezone: "UTC+0",
  tagline:
    "Smart contract developer in Lomé. One improvement a day, onchain. Right now: lending contracts for tokenized real estate at RAAC.",
  stats: [
    { label: "Onchain", value: "4+ years" },
    { label: "Shipped", value: "20+ projects" },
    { label: "Based in", value: "Lomé · UTC+0" },
  ],
  resume: `${server}/files/resume.pdf`,
} as const;
