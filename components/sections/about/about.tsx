'use client';

import { useSectionInView } from '@/hooks/use-section-in-view';
// import portfolioImg from '@/../public/images/photo.jpg';
import { smoothScrollTo } from '@/lib/utils';
import SectionDivider from '@/components/section-divider';
import SectionHeading from '@/components/section-heading';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import Link from 'next/link';
import { about } from "@/constants/about";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@/components/social-icons';
import { ResumeIcon } from '@/components/icons';

function SocialLink({
  icon: Icon,
  href,
  ...props
}: {
  [key: string]: any;
}): JSX.Element {
  return (
      <a href={href} className="group -m-1 p-1" target={"_blank"} rel="noreferrer nofollow" {...props}>
          <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      </a>
  );
}

export default function About() {
  const { ref } = useSectionInView('about', 0.4);
  const divRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ['0 1', '1.33 1'],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.section
      className="z-50 flex h-[1000px] w-full flex-col items-center justify-start leading-8 dark:bg-darkBg dark:text-white md:scroll-mt-4 lg:h-[1100px] lg:scroll-mt-24"
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175, ease: 'easeInOut' }}
      id="about"
    >
      <div className="flex w-full flex-col items-center pt-8">
        <SectionHeading>About Me</SectionHeading>
        <motion.div
          className="w-full overflow-hidden px-4 py-12 sm:w-[60%] sm:text-center lg:h-[700px] lg:w-[1040px] xl:w-[1180px]"
          ref={divRef}
          style={{
            scale: scaleProgess,
            opacity: opacityProgess,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
        >
          <div className="antialiased group relative w-full">
            <div className="text-md relative z-40 flex flex-col gap-3 font-semibold tracking-wide text-primary lg:absolute lg:right-0 lg:top-[27%] lg:block lg:max-w-[580px] lg:text-start lg:text-lg xl:top-1/3 xl:h-[442px] xl:max-w-[650px]">
              <div className="flex h-full flex-col justify-center gap-6">
                <span>
                  I&apos;m a Fullstack Blockchain Developer at GemachDAO, where I work on decentralized solutions that drive innovation in the blockchain space. With a deep understanding of smart contracts, DeFi protocols, and Web3 technologies, I focus on creating efficient and scalable decentralized applications. My work spans the full development lifecycle, from smart contract development to front-end integration, ensuring seamless user experiences in decentralized ecosystems.
                </span>
                <span>
                  Seeking for Web Development opportunities where I can leverage
                  my skills to create meaningful connections between products
                  and users.
                </span>

                <div className="flex flex-col items-start gap-4 sm:items-center lg:items-start">
                  <div className="flex items-center gap-4">
                    {about.socialLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group -m-1 p-1"
                      >
                        {link.name === 'github' && (
                          <GitHubIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
                        )}
                        {link.name === 'linkedin' && (
                          <LinkedInIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
                        )}
                        {link.name === 'twitter' && (
                          <TwitterIcon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
                        )}
                      </Link>
                    ))}
                         <SocialLink
                        href={about.resume}
                        title="Download Resume"
                        icon={ResumeIcon}
                        download
                    />
                  </div>
                  <Link
                    href={'contact'}
                    onClick={(e) => {
                      smoothScrollTo({ e, id: 'contact' });
                    }}
                    className="w-52 lg:w-40"
                  >
                    <span className="bg-sky-500 text-2xl font-bold uppercase lg:normal-case">
                      Contact me!
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute z-30 hidden lg:left-0 lg:top-1/4 lg:block">
              <div className="relative h-72 w-72 lg:h-[380px] lg:w-[380px] xl:h-[470px] xl:w-[470px]">
                <div className="absolute inset-0 z-20 rounded-full " />
                <div className="absolute inset-0">
                  <Image
                    src={'/images/me.jpg'}
                    alt="portfolio image"
                    // placeholder="blur"
                    fill
                    // width={470}
                    // height={470}
                    className="z-10 rounded-full lg:h-[380px] lg:w-[380px] xl:h-[470px] xl:w-[470px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <SectionDivider />
    </motion.section>
  );
}
