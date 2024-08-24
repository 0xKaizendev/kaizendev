import clsx from 'clsx';

import { SkeletonSm } from './skeletons';
import Image from 'next/image';
import { api } from '@/_trpc/server';
import { Badge } from '../ui/badge';
import { Icons, PreviewArrowIcon } from '../icons';
import Link from 'next/link';
interface GithubWireframeProps {
    project: Awaited<ReturnType<(typeof api)['projects']['getUnique']>>

}

function WebAppWireframe({
    project

}: GithubWireframeProps) {
    return (
        <div
            className={clsx(
                'h-full w-full bg-white p-4 text-sm text-slate-600',
                'dark:bg-slate-900 dark:text-slate-400'
            )}
        >

            {
                project?.imageUrl && <div className="relative flex items-center justify-center h-40">
                    <Image src={project?.imageUrl} alt='djd' width={350}
                        height={170}
                        className="rounded-t-lg object-cover object-center h-full" />
                </div>
            }


            <div
                className={clsx(
                    'border-divider-light mt-4 flex border-b',
                    'dark:border-divider-dark'
                )}
            >
                <div className={clsx('-mb-[2px] flex h-12 ')}>
                    <div
                        className={clsx(
                            'flex items-center gap-1 border-b-[3px] px-6 dark:border-foreground'
                        )}
                    >
                        <SkeletonSm />
                        <SkeletonSm w={32} />
                    </div>
                </div>
                <div className={clsx('-mb-[2px] flex h-12')}>
                    <div
                        className={clsx(
                            'flex items-center gap-1 border-b-[3px] border-transparent px-6'
                        )}
                    >
                        <SkeletonSm />
                        <SkeletonSm w={40} />
                    </div>
                </div>
                <div className={clsx('-mb-[2px] flex h-12')}>
                    <div
                        className={clsx(
                            'flex items-center gap-1 border-b-[3px] border-transparent px-6'
                        )}
                    >
                        <SkeletonSm />
                        <SkeletonSm w={80} />
                    </div>
                </div>

            </div>

            <div className='p-4 space-y-3'>
                <span className='text-foreground font-semibold text-lg'>{project?.title}</span>
                <div className={clsx('mt-2')}>
                    <p>{project?.description}</p>
                </div>
                <div className="flex flex-wrap gap-2  h-20 ">
                    {/* a project shouldnt have more than 10 stack */}
                    {project?.stacks.slice(0, 10).map((stack, index) => (
                        <Badge key={index} variant='secondary' className='bg-background font-medium px-2 py-1 rounded-lg text-[10px] max-h-7'>   {stack.name}</Badge>
                    ))}
                </div>
            </div>

            <div className=' flex gap-5 items-center'>
                {
                    project?.demoUrl && <Link href={project.demoUrl} className='flex gap-2 items-center text-foreground font-medium'>
                        <PreviewArrowIcon width={28} height={28} /> Live Demo
                    </Link>
                }
                {
                    project?.githubUrl && <Link href={project.githubUrl} className='flex gap-2 items-center text-foreground font-medium'>
                        <Icons.gitHub className="h-7 w-7 text-sky-500" />Github
                    </Link>
                }


            </div>
        </div>
    );
}

export default WebAppWireframe;
