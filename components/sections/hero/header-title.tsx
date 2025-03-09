"use client";
import clsx from "clsx";
import { motion as m } from "framer-motion";
import HeaderCta from "./header-cta";
import TextAnimation from "./text-animation";
const animation = {
  hide: { x: -32, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

function HeaderTitle() {
  return (
    <div className="">
      <m.div
        className={clsx(
          "mb-1 flex items-center gap-1 text-2xl ",
          "md:mb-0 md:gap-2 md:text-4xl",
        )}
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        Hello World, I&apos;m
      </m.div>
      <div>
        <TextAnimation delay={1} baseText="Rozales" />
        <m.h1
          className={clsx("block text-base", "md:text-lg")}
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.3 }}
        >
          <strong className={clsx("font-semibold lowercase ")}>
            a Full-stack software engineer, Gamer and occasional blogger
          </strong>{" "}
          with a focus on blockchain development and building practical web3 solutions.
        </m.h1>
        <m.div
          className="mt-4"
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.3 }}
        >
          <HeaderCta isFree={false} />
        </m.div>
      </div>
    </div>
  );
}

export default HeaderTitle;
