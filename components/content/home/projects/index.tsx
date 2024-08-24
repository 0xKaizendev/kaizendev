"use client"
import React, { useState } from 'react'
import { api } from "@/_trpc/client"
import ProjetCard from './project-card'
import InfoButton from '@/components/ui/info-button'
import clsx from 'clsx'
import AppWindow from '@/components/wireframes/appWindow'
import { GitHubIcon, NpmIcon } from '@/components/icons'
import GitHubWireframe from '@/components/wireframes/github'
import WebAppWireframe from '@/components/wireframes/webapp'
const Projects = () => {
    const { data: projects, isLoading } = api.projects.get.useQuery({ limit: 4 })
    return (
        <div>
            <InfoButton title='Latest projects' />
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='flex gap-4 flex-wrap items-center justify-center'>
                        {projects?.map(project => (
                            <div className='lg:max-w-md max-w-md' key={project.id}>
                                <AppWindow
                                    // type={project.demoUrl ? "app" : "browser"}
                                    type="app"
                                    // browserTabs={!project.demoUrl ? [
                                    //     {
                                    //         icon: <GitHubIcon className="h-4 w-4" />,
                                    //         title: `0xKaizendev/${project.title}`,
                                    //         isActive: true
                                    //     },
                                    // ] : undefined}

                                >
                                    {
                                        project.demoUrl ? <WebAppWireframe
                                            project={project}
                                        /> : <GitHubWireframe
                                            project={project}
                                        />
                                    }

                                </AppWindow>
                            </div>
                        ))}
                    </div>
                )
            }

        </div>
    )
}

export default Projects