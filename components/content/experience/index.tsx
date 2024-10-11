import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// import Developer from '../components/Developer.jsx';
import { workExperiences } from "@/constants/experience";
import CanvasLoader from "@/components/loading";
import Image from "next/image";
import Heading from "@/components/ui/heading";

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState("idle");

  return (
    <section className="c-space my-20" id="work">
      <div className="w-full" >
        <Heading >
          My Work Experience
        </Heading>

        <div className=" grid lg:grid-cols-3 grid-cols-1 gap-5 mt-12">
          <div className="col-span-1 rounded-lg bg-black-200 border border-black-300 ">
            <Suspense fallback={<CanvasLoader />}>
              <Image
                src={"/astronaut-skateboarding-different-planets-space.jpg"}
                alt="me"
                width={150}
                height={100}
                className="w-full h-full rounded-lg"
              />
            </Suspense>
          </div>

          <div className="col-span-2 rounded-lg bg-black-200 border border-black-300">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setAnimationName(item.animation.toLowerCase())}
                  onPointerOver={() =>
                    setAnimationName(item.animation.toLowerCase())
                  }
                  onPointerOut={() => setAnimationName("idle")}
                  className="grid grid-cols-[auto_1fr] items-start gap-5  transition-all ease-in-out duration-500 cursor-pointer hover:bg-black-300 rounded-lg sm:px-5 px-2.5 group"
                >
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="rounded-3xl w-16 h-16 p-2 bg-black-600">
                      <img className="w-full h-full" src={item.icon} alt="" />
                    </div>

                    <div className="flex-1 w-0.5 mt-4 h-full bg-slate-900 group-hover:bg-black-500 group-last:hidden" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <p className="font-bold text-white-800">{item.name}</p>
                    <p className="text-sm mb-5">
                      {item.pos} -- <span>{item.duration}</span>
                    </p>
                    <p className="group-hover:text-white transition-all ease-in-out duration-500">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
