import React from "react";
import { InfoButtonIcon } from "../icons";
import Link from "next/link";
import { buttonVariants } from "./button";

const InfoButton = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-center gap-3  py-2">
      <span className="bg-sky-500 p-3 rounded-full text-white">
        <InfoButtonIcon className="w-5 h-5" />
      </span>
      <Link
        href="/work/contact"
        // className={clsx('button button--solid min-w-[128px]', 'md:button--big')}
        className={`${buttonVariants({ variant: "solid", size: "default" })} text-[18px]`}
      >
        {title}
      </Link>
      {/* <div className='w-32 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-lg font-medium'>{title} </div> */}
    </div>
  );
};

export default InfoButton;
