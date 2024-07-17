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
            <div className={"w-full  overflow-hidden"}>
                <div className={clsx('relative w-full overflow-hidden')}>
                    <div className={clsx('relative z-10 flex flex-col  lg:flex-row gap-10 overflow-hidden')}>
                        <HeaderTitle />
                        <m.div
                            initial={animation.hide}
                            animate={animation.show}
                            transition={{ delay: 0.1 }}
                            className='overflow-hidden md:w-full'
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
                </div>
            </div>
        </header>
    )
}
// background-grid--fade-out background-grid
export default Header