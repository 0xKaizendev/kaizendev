"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export interface IRedoTextAnimationProps {
  delay: number;
}

export default function RedoTextAnimation({ delay }: IRedoTextAnimationProps) {
  const textIndex = useMotionValue(0);

  const texts = [
    "Building the decentralized future, one block at a time!",
    "Continuous improvement through Kaizen, in code and life.",
    "Where blockchain meets philosophy, innovation thrives.",
    "Small steps daily, lead to remarkable transformations.",
    "Bridging Web2 and Web3 with elegant solutions.",
    "Kaizen: The art of making great and lasting change through small steps.",
    "Transforming ideas into decentralized realities.",
    "Every line of code is an opportunity for improvement.",
    "Philosophy teaches us to question, code lets us answer.",
    "Building trustless systems with mindful precision.",
  ];

  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest),
  );
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    animate(count, 60, {
      type: "tween",
      delay: delay,
      duration: 3,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.span className="h-32 max-w-96 bg-sky-400  dark:bg-darkBeige md:text-[1.5rem] font-semibold lowercase">
      {displayText}
    </motion.span>
  );
}
