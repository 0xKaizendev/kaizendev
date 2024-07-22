"use client"
import React from 'react'
import { api } from "@/_trpc/client"
import ProjetCard from './project-card'
const Projects = () => {
    const { data: projects, isLoading } = api.projects.get.useQuery({ limit: 4 })
    console.log(projects)
    return (
        <div>
            <h1>Projects</h1>


            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='flex '>
                        {projects?.map(project => (
                            <ProjetCard key={project.id} project={project} />
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default Projects