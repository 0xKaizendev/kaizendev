import Hero from "@/components/sections/hero";
import Skills from "@/components/sections/skills";
import AboutKaizen from "@/components/sections/kaizen";
import Projects from "@/components/sections/project";
import About from "@/components/sections/about/about";
import NowSpinning from "@/components/sections/about/now-spinning";
import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import Writing from "@/components/sections/writing";

export default function Index() {
  return (
    <main>
      <Hero />
      <AboutKaizen />
      <About nowSpinning={<NowSpinning />} />
      <Projects />
      <Experience />
      <Skills />
      <Writing />
      <Contact />
    </main>
  );
}
