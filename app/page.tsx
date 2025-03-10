"use client";
import Hero from "@/components/sections/hero";
import Skills from "@/components/sections/skills";
import AboutKaizen from "@/components/sections/kaizen";
import Projects from "@/components/sections/project";
import About from "@/components/sections/about/about";
// import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";

export default function Index() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-0">
      <Hero />
      <About />
      <AboutKaizen />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </main>
  );
}

