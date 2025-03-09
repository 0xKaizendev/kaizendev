"use client";
import { projects } from "@/constants/projects";
import PageHeader from "@/components/page-header";
import ProjectCard from "./project-card";
import { useSectionInView } from "@/hooks/use-section-in-view";

const Projects = () => {
    const { ref } = useSectionInView("projects");
    return (
        <div className="relative flex scroll-mt-0 h-screen flex-col items-center justify-center container" id="projects" ref={ref}>
            <div>
                <PageHeader title={"Things I've made trying to put my dent in the universe."} caption="Projects" />
                <ul
                    role="list"
                    className="flex flex-wrap gap-8 justify-center items-center"
                >
                    {projects.map((project, index) => (
                        <li key={index} className="group relative flex flex-col items-center">
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                links={project.links}
                                logo={project.logo}
                                stack={project.stack}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Projects;