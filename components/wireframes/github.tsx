import clsx from "clsx";

import { SkeletonSm } from "./skeletons";
import { api } from "@/_trpc/server";
import { truncateText } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Icons, PreviewArrowIcon } from "../icons";

interface GithubWireframeProps {
  project: Awaited<ReturnType<(typeof api)["projects"]["getUnique"]>>;
}

function GitHubWireframe({ project }: GithubWireframeProps) {
  console.log("repository ", project);
  return (
    <div
      className={clsx(
        "h-full w-full bg-white p-4 text-sm text-slate-600",
        "dark:bg-slate-900 dark:text-slate-400",
      )}
    >
      <div className="h-40">
        <div className={clsx("flex items-center gap-1")}>
          <div className={clsx("mr-1")}>
            <SkeletonSm />
          </div>

          <div className={clsx("-mt-0.5", "dark:text-sky-500")}>Kaizendev/</div>
          <div
            className={clsx(
              "-mt-0.5 font-bold",
              "dark:font-semibold text-sky-500",
            )}
          >
            {project?.repository && truncateText(project?.repository, 20)}
          </div>
        </div>
        <div className={clsx("mt-6 flex flex-col gap-3")}>
          <div className={clsx("flex items-center gap-2")}>
            <SkeletonSm />
            {project?.repository ? (
              <div className={clsx("")}>
                <p>MIT license</p>
              </div>
            ) : (
              <SkeletonSm w={64} />
            )}
          </div>
          <div className={clsx("flex items-center gap-3")}>
            <div className={clsx("flex items-center gap-1")}>
              <SkeletonSm />
              <SkeletonSm w={48} />
            </div>
            <div className={clsx("flex items-center gap-1")}>
              <SkeletonSm />
              <SkeletonSm w={56} />
            </div>
          </div>
        </div>
        <div className={clsx("mt-6 flex gap-2")}>
          <div
            className={clsx(
              "border-divider-light flex h-8 flex-1 items-center justify-center rounded-lg border",
              "dark:border-divider-dark",
            )}
          >
            <div className={clsx("flex items-center gap-1")}>
              <SkeletonSm />
              <SkeletonSm w={48} />
            </div>
          </div>
          <div
            className={clsx(
              "border-divider-light flex h-8 flex-1 items-center justify-center rounded-lg border",
              "dark:border-divider-dark",
            )}
          >
            <div className={clsx("flex items-center gap-1")}>
              <SkeletonSm />
              <SkeletonSm w={64} />
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "border-divider-light mt-4 flex border-b",
          "dark:border-divider-dark",
        )}
      >
        <div className={clsx("-mb-[2px] flex h-12")}>
          <div
            className={clsx(
              "flex items-center gap-1 border-b-[3px] px-6 dark:border-red-500",
            )}
          >
            <SkeletonSm />
            <SkeletonSm w={32} />
          </div>
        </div>
        <div className={clsx("-mb-[2px] flex h-12")}>
          <div
            className={clsx(
              "flex items-center gap-1 border-b-[3px] border-transparent px-6",
            )}
          >
            <SkeletonSm />
            <SkeletonSm w={40} />
          </div>
        </div>
        <div className={clsx("-mb-[2px] flex h-12")}>
          <div
            className={clsx(
              "flex items-center gap-1 border-b-[3px] border-transparent px-6",
            )}
          >
            <SkeletonSm />
            <SkeletonSm w={80} />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <span className="text-foreground font-semibold text-lg">
          {project?.title}
        </span>
        <div className={clsx("mt-2")}>
          <p>{project?.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 h-20">
          {project?.stacks.map((stack, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-background font-medium px-2 py-1 rounded-lg text-[10px] max-h-7"
            >
              {" "}
              {stack.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className=" flex gap-5 items-center">
        {project?.demoUrl && (
          <Link
            href={project.demoUrl}
            className="flex gap-2 items-center text-foreground font-medium"
          >
            <PreviewArrowIcon /> Live Demo
          </Link>
        )}
        {project?.githubUrl && (
          <Link
            href={project.githubUrl}
            className="flex gap-2 items-center text-foreground font-medium"
          >
            <Icons.gitHub className="h-7 w-7 text-sky-500" />
            Github
          </Link>
        )}
      </div>
    </div>
  );
}

export default GitHubWireframe;
