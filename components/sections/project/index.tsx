"use client";
import { projects } from "@/constants/projects";
import PageHeader from "@/components/page-header";
import ProjectCard from "@/components/project/project-card";

const Projects = () => {
    return (
        <div className="max-w-5xl mt-4">
            <PageHeader title={"Things I’ve made trying to put my dent in the universe."} caption="Projects" />
            <ul
                role="list"
                className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 mt-10"
            >
                {projects.map((project) => (
                    <ProjectCard  project={project} key={project.title} />
                ))}
            </ul>
        </div>
    )
}

export default Projects