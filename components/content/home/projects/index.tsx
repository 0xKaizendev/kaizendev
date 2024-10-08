"use client";
import React from "react";
import { api } from "@/_trpc/client";
import InfoButton from "@/components/ui/info-button";
import AppWindow from "@/components/wireframes/appWindow";
import GitHubWireframe from "@/components/wireframes/github";
import WebAppWireframe from "@/components/wireframes/webapp";
const Projects = () => {
  const { data: projects, isLoading } = api.projects.get.useQuery({ limit: 4 });
  return (
    <div className="space-y-4">
      <InfoButton title="Latest projects" />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex gap-4 flex-wrap items-center">
          {projects?.map((project) => (
            <div className="lg:max-w-md max-w-md" key={project.id}>
              <AppWindow type="app">
                {project.demoUrl ? (
                  <WebAppWireframe project={project} />
                ) : (
                  <GitHubWireframe project={project} />
                )}
              </AppWindow>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
