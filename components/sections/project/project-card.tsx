"use client";
import Image from "next/image";
import React from "react";
import { LinkIcon, GitHubIcon } from "@/components/icons";
import Link from 'next/link';

interface ProjectCardProps {
    title: string;
    description: string;
    links: {
        github?: string;
        project?: string;
    };
    logo: {
        src: string;
        alt: string;
    };
    stack: string[];
}

const ProjectCard = ({ title, description, links, logo, stack }: ProjectCardProps) => {
    return (
        <div className="group relative flex flex-col w-56 bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-400 rounded-lg p-4">
            <div className="relative w-full h-32 overflow-hidden rounded-lg mb-4">
                <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="w-full">
                <h3 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 min-h-[2.5rem] line-clamp-2">
                    {title}
                </h3>
                <div className="flex flex-wrap gap-1 mt-2">
                    {stack.map((tech, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
                    {description}
                </p>
            </div>

            <div className="relative mt-4 flex items-center gap-3 text-sm font-medium self-start">
                {links.github && (
                    <Link
                        href={links.github}
                        className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                        target="_blank"
                    >
                        <GitHubIcon className="h-5 w-5" />
                    </Link>
                )}
                {links.project && (
                    <Link
                        href={links.project}
                        className="flex items-center text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                        target="_blank"
                    >
                        <span>View Project</span>
                        <LinkIcon className="ml-1 h-4 w-4 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
