"use client"
import clsx from 'clsx';
import React from 'react'
import HeaderTitle from './header-title'
import { CodeEditor } from './code-editor';
import { motion as m, } from 'framer-motion';
const animation = {
    hide: { x: 32, opacity: 0 },
    show: {
        x: 0,
        opacity: 1,
    },
};

const Header = () => {
    return (
        <header
            id="page-header"
        >
            <div className={clsx('')}>
                <div className={clsx('relative')}>
                    <div className={clsx('relative z-10 flex flex-col  lg:flex-row ')}>
                        <HeaderTitle />
                        <m.div
                            initial={animation.hide}
                            animate={animation.show}
                            transition={{ delay: 0.1 }}
                            className='lg:w-3/6 pl-20 pt-20'
                        >
                            <CodeEditor code={`type WelcomeMessage = 
  | "explore blockchain tech"
  | "showcase Web3 projects"
  | "connect with the community"
  | "find collaboration"
  | "share my Web3 journey";

function generateWelcomeMessage(uses: WelcomeMessage): string {
  return [
    "Welcome to my Web3 Space!",
    "This site is for " + uses + ".",
    "Feel free to explore!"
  ].join('\n');
}

// Example usage
const welcomeText = generateWelcomeMessage("explore blockchain tech");
console.log(welcomeText);


`} language="tsx" />
                        </m.div>
                        {/*  */}


                    </div>
                    {/* <div className={clsx('mt-6 md:mt-8')}>
                        <HeaderCta isFree={false} />
                    </div> */}
                    {/* <div className={clsx('mt-20 lg:mt-36')}>
                        <HeaderTechStack />
                    </div> */}
                    {/* <div
                        className={clsx(
                            'pointer-events-none absolute -top-36 right-0 z-0 hidden select-none',
                            'lg:block'
                        )}
                    >
                        <HeaderImage />
                    </div> */}
                </div>
            </div>
        </header>
    )
}
// background-grid--fade-out background-grid
export default Header