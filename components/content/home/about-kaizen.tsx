import { QuoteIcon } from "@/components/icons";
import clsx from "clsx";
import React from "react";

const AboutKaizen = () => {
  return (
    <blockquote className="border flex justify-center items-center bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-400 rounded-xl text-2xl md:text-3xl lg:pt-0 lg:text-4xl mb-10">
      <div className="p-6  mx-auto">
        <div className="relative flex items-center mb-4">
          <QuoteIcon
            className={clsx(
              "-mt-1 h-10 text-slate-600 dark:text-slate-400",
              "md:-mt-3 md:h-16 lg:h-24",
            )}
          />
          <div className="absolute inset-0 flex justify-center items-center">
            <strong className="font-medium font-logo text-4xl text-sky-500">
              改善
            </strong>
          </div>
        </div>

        <p>
          A philosophy of{" "}
          <span className="text-sky-500 font-semibold">continuous</span>{" "}
          improvement of working{" "}
          <span className="text-sky-500 font-semibold">practices</span> that
          underlies total quality{" "}
          <span className="text-sky-500 font-semibold">management</span> and
          just-in-time{" "}
          <span className="text-sky-500 font-semibold">business technique</span>
        </p>
        <div className="flex items-center mt-4 justify-end ">
          <QuoteIcon
            className={clsx(
              "-mt-1 h-10  -rotate-180 text-slate-600 dark:text-slate-400",
              "md:-mt-3 md:h-16 lg:h-24",
            )}
          />

          {/* <h2 className="text-sm bg-blue-500 text-white px-4 py-2 rounded-full">About Kaizen</h2> */}
        </div>
      </div>
    </blockquote>
  );
};

export default AboutKaizen;
