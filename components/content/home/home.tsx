import React from "react";
import Header from "./header/";
import Skills from "./skills";
import AboutKaizen from "./about-kaizen";
import Projects from "./projects";
import WorkExperience from "../experience";
const IndexContents = () => {
  return (
    <div className="overflow-auto space-y-8 ">
      <Header />
      <Skills />
      <AboutKaizen />
      <Projects />
      {/* <WorkExperience /> */}
    </div>
  );
};

export default IndexContents;
