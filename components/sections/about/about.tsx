import React, { Suspense } from "react";
import AboutPlaceholder from "@/components/skeleton/about-placeholder";
import About from "@/components/about";
import Educations from "@/components/education";
import EducationsPlaceholder from "@/components/skeleton/education-placeholder";
const page = () => {
    return (
        <div className="">
            <Suspense fallback={<AboutPlaceholder />}>
                <About />
            </Suspense>
            <Suspense fallback={<EducationsPlaceholder />}>
                <Educations />
            </Suspense>
        </div>);
};

export default page;