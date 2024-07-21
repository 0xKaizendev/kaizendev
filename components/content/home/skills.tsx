import { skills } from '@/config/use-data';
import React from 'react';
const Skills = () => {
    const colors = ["text-black", "text-[#31648c]", "text-[#1d63ed]", "text-sky-500", "text-[#fff100]", "text-purple-400", "text-black","text-[#00ed64]","text-blue-500"];
    return (
        <div className='w-full py-10'>
            <div className='container mx-auto text-center'>
                <button className='bg-secondary px-4 py-2 rounded shadow mb-4'>
                    Skills
                </button>
                <p className='mb-8 '>
                    The skills, tools and technologies I am really good at:
                </p>
                <div className='flex flex-wrap justify-center'>
                    {skills.map((skill, index) => (
                        <div key={index} className={`flex items-center m-2 p-4 rounded-xl shadow bg-secondary/50 `}>
                            <skill.icon className={`text-2xl mr-2 w-6 h-6 ${skill.bgColor}` }/>
                            <span className='text-lg'>{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Skills;
