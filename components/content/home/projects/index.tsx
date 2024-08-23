"use client"
import React, { useState } from 'react'
import { api } from "@/_trpc/client"
import ProjetCard from './project-card'
import InfoButton from '@/components/ui/info-button'
import clsx from 'clsx'
import AppWindow from '@/components/wireframes/appWindow'
import { GitHubIcon, NpmIcon } from '@/components/icons'
import GitHubWireframe from '@/components/wireframes/github'
const Projects = () => {
    const { data: projects, isLoading } = api.projects.get.useQuery({ limit: 4 })
    console.log(projects)
    const [currentState, setCurrentState] = useState<'npm' | 'github'>('github');
    return (
        <div>
            <InfoButton title='Latest projects' />
            {/* {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='flex gap-4'>
                        {projects?.map(project => (
                            <ProjetCard key={project.id} project={project} />
                        ))}
                    </div>
                )
            } */}
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='flex gap-4 flex-wrap'>
                        {projects?.map(project => (
                            <div className='lg:max-w-xl max-w-md'>
                                <AppWindow
                                    type="browser"
                                    browserTabs={[
                                        {
                                            icon: <GitHubIcon className="h-4 w-4" />,
                                            title: 'kaizendev/tailwindcss-accent - GitHub',
                                            isActive: currentState === 'github',
                                        },
                                    ]}
                                >
                                    {currentState === 'github' && (
                                        <GitHubWireframe
                                            author="kaizendev"
                                            license="MIT"
                                            repository="zkevm-bridge-investment-manager"
                                            description="A smart contract suite for optimizing hosted ETH on LxLy investments using RocketPool. Features an InvestmentManager role, reserve/target percentages, and seamless ETH to rETH conversions "
                                        />
                                    )}

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