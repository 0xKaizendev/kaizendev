import { Education } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Heading from "./ui/heading";
import { Badge } from "./ui/badge";

export default function EducationCard({
    classNames,
    props,
}: {
    classNames?: string;
    props: Education;
}): JSX.Element {
    return (
        <div
            className={clsx(
                "mb-4 hover:shadow-lg  transition-all duration-200 relative border-divider-light  flex h-full w-full select-none overflow-hidden rounded-xl border bg-white dark:border-divider-dark dark:bg-slate-900 ",
                classNames
            )}
        >
            <Link href={props.schoolURL} target={"_blank"}>
                <div className="flex items-start rounded p-4 relative">

                    <div>
                        <Heading size='sm' className="mb-0">
                            {props.school}
                        </Heading>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-5">
                            {props.degree}, {props.major} · {props.date}{" "}
                        </p>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-5">
                            {props.schoolLocation}
                        </p>{" "}
                        <p className="leading-5 text-zinc-600 dark:text-zinc-400 mt-2">
                            {props.description}
                        </p>
                        <div className="pt-2 flex md:flex-row flex-wrap">
                            {props.activitiesandsocieties.map((aors, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-background font-medium px-2 py-1 rounded-lg text-[10px] max-h-7"
                                >
                                    {" "}
                                    {aors}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
            <span className="absolute w-[50%] -bottom-px right-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"></span>
            <span className="absolute w-px -left-px top-[40%] h-[40%] bg-gradient-to-b from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"></span>
        </div>
    );
}
