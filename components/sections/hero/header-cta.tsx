"use client";
import { ResumeIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { useActiveSectionContext } from "@/hooks/use-active-section";
import clsx from "clsx";
import { motion as m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { smoothScrollTo } from "@/lib/utils";

const animation = {
  hide: {
    x: -16,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
};

interface HeaderCtaProps {
  isFree?: boolean;
  isFreeAnimationDuration?: number;
}

function ButtonContactMe() {
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  return (
    <a
      className={`${buttonVariants({ variant: "solid", size: "default" })} cursor-pointer`}
      onClick={(e) => {
        smoothScrollTo({ e, id: "contact" });
        setActiveSection("contact");
        setTimeOfLastClick(Date.now());
      }}
    >
      Get in Touch
    </a>
  );
}

function ButtonResume() {
  return (
    <a
      target="_blank"
      rel="noreferrer nofollow"
      href="files/resume.pdf"
      className={buttonVariants({ variant: "secondary", size: "default" })}
    >
      <ResumeIcon className={clsx("h-5 w-5")} />
      RESUME
    </a>
  );
}

function AvailableForHire() {
  return (
    <div className={clsx("button")}>
      <span className={clsx("relative flex h-2 w-2")}>
        <span
          className={clsx(
            "bg-accent-600 absolute -top-1 -left-1 inline-flex h-4 w-4 animate-ping rounded-full opacity-75",
            "dark:bg-accent-300",
          )}
        />
        <span
          className={clsx(
            "bg-accent-500 relative inline-flex h-2 w-2 rounded-full",
            "dark:bg-accent-400",
          )}
        />
      </span>
      AVAILABLE FOR HIRE
    </div>
  );
}

function HeaderCta({
  isFree = true,
  isFreeAnimationDuration = 4,
}: HeaderCtaProps) {
  const shouldReduceMotion = useReducedMotion();

  let isFreeVariants = {
    hide: {
      x: 0,
      opacity: 1,
    },
    show: {
      x: -48,
      opacity: 0,
    },
  };

  if (shouldReduceMotion) {
    isFreeVariants = {
      hide: {
        x: 0,
        opacity: 1,
      },
      show: {
        x: 0,
        opacity: 0,
      },
    };
  }

  return (
    <m.div className={clsx("flex gap-2")} initial="hide" animate="show">
      <m.div
        className={clsx("relative z-20")}
        variants={animation}
        transition={{ delay: 0.4 }}
      >
        <ButtonContactMe />
      </m.div>
      {isFree ? (
        <m.div
          variants={animation}
          transition={{ delay: 2.8 }}
          className={clsx("relative z-10")}
        >
          <m.div
            variants={isFreeVariants}
            transition={{ delay: isFreeAnimationDuration + 1.5, duration: 0.4 }}
          >
            <AvailableForHire />
          </m.div>
          <m.div
            className={clsx("absolute top-0 left-0")}
            initial={{ x: -48, opacity: 0, pointerEvents: "none" }}
            animate={{ x: 0, opacity: 1, pointerEvents: "auto" }}
            transition={{ delay: isFreeAnimationDuration + 1.6, duration: 0.4 }}
          >
            <ButtonResume />
          </m.div>
        </m.div>
      ) : (
        <m.div variants={animation} transition={{ delay: 0.5 }}>
          <ButtonResume />
        </m.div>
      )}
    </m.div>
  );
}

export default HeaderCta;
