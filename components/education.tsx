"use client";
import { Container } from "@/components/container";
import EducationCard from "@/components/education-card";
import { ChevronDownIcon, ChevronUpIcon } from "@/components/icons";
import { useRef, useState } from "react";
import { educations } from "@/constants/educations";
import Heading from "./ui/heading";
export default function Educations(): JSX.Element {
    let [isExpanded, setIsExpanded] = useState(false);
    const parentRef = useRef();

    return (
        <>
            {educations.length > 0 && (
                <div className="max-w-3xl mt-9">
                    <Heading>
                        Educations
                    </Heading>

                    {educations.slice(0, 2).map((education: any, index: any) => (
                        <EducationCard key={index} props={education} />
                    ))}
                    {educations.slice(2).map((education: any, index: any) => (
                        <div
                            key={index}
                            className={
                                "h-0 overflow-hidden transition-height ease-in-out duration-500 "
                            }
                            ref={parentRef as any}
                            style={{
                                height: isExpanded
                                    ? (parentRef.current as any).scrollHeight
                                    : 0,
                            }}
                        >
                            <EducationCard key={index} props={education} />
                        </div>
                    ))}
                    {educations.length > 2 && (
                        <div className="flex justify-center">
                            <button
                                className="group flex items-center text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-teal-500 dark:hover:text-teal-500"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? (
                                    <>
                                        Show less
                                        <ChevronUpIcon className="ml-3 h-auto w-[10px] stroke-zinc-500 group-hover:stroke-teal-500 dark:group-hover:stroke-teal-500" />
                                    </>
                                ) : (
                                    <>
                                        Show more
                                        <ChevronDownIcon className="ml-3 h-auto w-[10px] stroke-zinc-500 group-hover:stroke-teal-500 dark:group-hover:stroke-teal-500" />
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
