"use client";
import clsx from 'clsx';
import { motion as m } from "framer-motion";

import type { ReactNode } from 'react';

const animation = {
  hide: { x: -32, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

interface PageHeaderProps {
  title: string;
  description?: string;
  caption?: string;
  headerImage?: ReactNode;
}

function PageHeader({
  title,
  description,
  caption = '',
}: PageHeaderProps) {
  return (
    <header
      id="page-header"
      className={clsx(
        'z-[900] mb-5 ',
      )}
    >
      <div >
        {caption && (
          <m.div
            initial={animation.hide}
            animate={animation.show}
            transition={{ delay: 0 }}
          >
            <span
              className={clsx(
                'text-accent-600 mb-1 block text-lg font-extrabold capitalize leading-none',
                'md:mb-0 md:text-2xl',
                'dark:text-accent-400'
              )}
            >
              {caption}
            </span>
          </m.div>
        )}
        <m.div
          initial={animation.hide}
          animate={animation.show}
          transition={{ delay: 0.1 }}
        >
          <h1
            className={clsx(
              'text-[2.5rem] font-extrabold leading-tight text-slate-700',
              'md:text-4xl md:leading-snug',
              'dark:text-slate-300'
            )}
          >
            {title}
          </h1>
        </m.div>
      </div>
    </header>
  );
}

export default PageHeader;
