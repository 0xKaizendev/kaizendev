"use client"
import { useTranslations } from 'next-intl';
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const t = useTranslations('Index');
    return (
        <div className='fixed top-0 left-0 right-0 h-2 origin-left bg-background z-50 backdrop-blur-md'>
            <motion.div className="top-0 left-0 right-0 h-2 origin-left bg-sky-500" style={{ scaleX }} />
        </div>
    )
}