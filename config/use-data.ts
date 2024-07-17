import { UseData } from "@/types";
import { RiNextjsFill } from "react-icons/ri";
import { FaHardHat, FaDocker } from "react-icons/fa";
import { BiLogoPostgresql, } from "react-icons/bi";
import { FaReact, FaFire, FaNodeJs, FaBolt, FaCss3Alt, FaTools } from 'react-icons/fa';
import { SiNextdotjs, SiChakraui, SiSemanticuireact, SiAntdesign, SiGraphql, SiFramer, SiStyledcomponents, SiApollographql } from 'react-icons/si';

import {

    SiVercel,
    SiVisualstudiocode, SiSolidity, SiTypescript
} from "react-icons/si"


export const skills = [
    { name: "Next.js", icon: RiNextjsFill, bgColor: 'text-black' },
    { name: "Solidity", icon: SiSolidity, bgColor: 'text-black' },
    { name: "TypeScript", icon: SiTypescript, bgColor: 'text-blue-500' },
    { name: 'Postgresql', icon: BiLogoPostgresql, bgColor: 'text-[#31648c]' },
    { name: 'Docker', icon: FaDocker, bgColor: 'text-[#1d63ed]' },
    { name: 'Tailwind CSS', icon: FaCss3Alt, bgColor: 'text-sky-500' },
    { name: 'HardHat', icon: FaHardHat, bgColor: 'text-[#fff100]' },
    { name: 'Framer Motion', icon: SiFramer, bgColor: 'text-purple-400' },
    { name: 'Vercel', icon: SiVercel, bgColor: 'text-black' },
];