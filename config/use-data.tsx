import { RiNextjsFill } from "react-icons/ri";
import { FaHardHat, FaDocker } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import {
  FaReact,
  FaFire,
  FaNodeJs,
  FaBolt,
  FaCss3Alt,
  FaTools,
} from "react-icons/fa";
import {
  SiChakraui,
  SiSemanticuireact,
  SiAntdesign,
  SiFramer,
  SiMongodb,
} from "react-icons/si";
import {

  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiNuxtdotjs,
  SiPrisma,
  SiPwa,
  SiRedux,
  SiRemix,
  SiSocketdotio,
  SiStorybook,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiIpfs 
} from "react-icons/si";
import Image from "next/image";
import { SiVercel, SiSolidity } from "react-icons/si";
import { BsFillBootstrapFill, BsRobot } from "react-icons/bs";
const iconSize = 24; // Define your icon size here
export const skills = [
  { name: "Solidity", icon: <SiSolidity className="text-black" /> },
  { name: "HardHat", icon: <FaHardHat className="text-[#fff100]" /> },
  { name: "Foundry", icon: <Image src='https://github.com/foundry-rs.png' alt="foundry-logo" className="text-[#fff100]" width={24} height={24} /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "Next.js", icon: <SiNextdotjs size={iconSize} /> },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss size={iconSize} className="text-cyan-300" />,
  },
  { name: "IPFS", icon: <SiIpfs size={iconSize} /> },
];
// create an array of all these colors
export const colors = [
  "text-black",
  "text-[#31648c]",
  "text-[#1d63ed]",
  "text-sky-500",
  "text-[#fff100]",
  "text-purple-400",
  "text-black",
];
