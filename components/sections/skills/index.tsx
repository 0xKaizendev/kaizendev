import InfoButton from "@/components/ui/info-button";
import { skills } from "@/config/use-data";
import React from "react";
import { useSectionInView } from "@/hooks/use-section-in-view";
const Skills = () => {
  const { ref } = useSectionInView("skills");
  const colors = [
    "text-black",
    "text-[#31648c]",
    "text-[#1d63ed]",
    "text-sky-500",
    "text-[#fff100]",
    "text-purple-400",
    "text-black",
    "text-[#00ed64]",
    "text-blue-500",
    "text-rose-500",
    "text-red-600",
    "text-green-600",
    "text-cyan-300",
  ];
  return (
    <section id="skills" ref={ref} className="relative flex scroll-mt-0 h-screen flex-col items-center justify-center container ">
      <div className="container mx-auto text-center space-y-4">
        <InfoButton title="Skills & Tools" />

        <p>The skills, tools and technologies I am really good at:</p>
        <div className="flex flex-wrap justify-center">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`flex items-center m-2 p-4 rounded-xl shadow bg-secondary gap-2 `}
            >
              {skill.icon}
              <span className="text-lg">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
