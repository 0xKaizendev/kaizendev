import { UseData } from "@/types";
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
  SiAngular,
  SiApollographql,
  SiCss3,
  SiExpress,
  SiGatsby,
  SiGraphql,
  SiJest,
  SiJquery,
  SiMui,
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
  SiVite,
  SiVuedotjs,
  SiWebpack,
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
  { name: "GraphQL", icon: <SiGraphql size={iconSize} className="text-pink-600" /> },
  { name: "Apollo", icon: <SiApollographql size={iconSize} /> },
  { name: "Artificial Intelligence", icon: <BsRobot size={iconSize} className="text-rose-500" /> },

  { name: "Redux", icon: <SiRedux size={iconSize} className="text-purple-500" /> },
  { name: "Webpack", icon: <SiWebpack size={iconSize} className="text-blue-500" /> },
  { name: "PWA", icon: <SiPwa size={iconSize} className="text-amber-600" /> },
  { name: "Nginx", icon: <SiNginx size={iconSize} className="text-green-500" /> },
  { name: "Storybook", icon: <SiStorybook size={iconSize} className="text-amber-500" /> },
  { name: "CSS", icon: <SiCss3 size={iconSize} className="text-blue-300" /> },
  { name: "Socket", icon: <SiSocketdotio size={iconSize} /> },
  { name: "Remix", icon: <SiRemix size={iconSize} /> },
  { name: "Express", icon: <SiExpress size={iconSize} /> },
  { name: "Jquery", icon: <SiJquery size={iconSize} /> },
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
