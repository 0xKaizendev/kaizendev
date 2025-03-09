"use client";
import Hero from "@/components/sections/hero";
import Skills from "@/components/sections/skills";
import AboutKaizen from "@/components/sections/kaizen";
import Projects from "@/components/sections/project";
import About from "@/components/sections/about";


export default function Index() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-0 overflow-auto space-y-8 ">
      <Hero />
      <Skills />
      <AboutKaizen />
      <Projects />
      <About />
    </main>
  );
}

