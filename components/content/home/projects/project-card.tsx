import React from 'react';
import { api } from '@/_trpc/server';
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
const ProjectCard = ({ project }: {
    project: Awaited<ReturnType<(typeof api)['projects']['getUnique']>>
}) => {
    if (!project) return null;

    return (

        <div className=" p-8 rounded-lg max-w-md bg-secondary/50 relative overflow-hidden space-y-4">

            <h2 className="text-2xl font-bold ">{project.title}</h2>
            <p className=" mb-6 text-sm font-medium">
                {project.description}
            </p>
            <div className="relative">
                <Image src={project.imageUrl} alt={project.title} width={800} height={400} className="rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-lg"></div>
            </div>
            {/* <Image src={project.imageUrl} alt={project.title} width={800} height={400} className="rounded-lg" /> */}
            <div className="flex flex-wrap gap-2">
                {project.stacks.map((stack, index) => (
                    <Badge key={index} variant='secondary' className='bg-background font-medium px-3 py-1.5 rounded-lg text-xs'>   {stack.name}</Badge>
                ))}
            </div>
            <div className="flex space-x-4">
                {project.githubUrl && (
                    <Link href={project.githubUrl} className={cn(
                        buttonVariants({
                            size: "sm",
                            variant: "link",
                        },
                        ), "transition-all duration-300 dark:text-teal-500 hover:dark:text-teal-400 font-medium"
                    )} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </Link>
                )}
                {project.demoUrl && (
                    <Link href={project.demoUrl} className={cn(
                        buttonVariants({
                            size: "sm",
                            variant: "link",
                        }), "font-medium"
                    )} target="_blank" rel="noopener noreferrer">
                        Demo
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
