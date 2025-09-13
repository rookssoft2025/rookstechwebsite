import React, { useState, useEffect } from "react";
import Services from "./Services";
import InfoBlock from "../../uiComponents/InfoComponent";

export default function Info() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const info1 = [
        {
            title: "Who We Are ?",
            description:
                "Built on innovation, collaboration, and trust, Rooks & Brooks is a dynamic team of tech experts. We craft reliable digital solutions that simplify challenges and accelerate business growth.",
        },
        {
            title: "Key Statistics",
            description:
                "Backed by years of expertise and strong client relationships, our statistics highlight the impactful results we deliver with consistency.",
        },
       
    ];
    const info2 = [
        {
            title: "End-to-End IT Expertise",
            description:
               "From strategy to execution, we provide a wide range of IT services tailored to meet your business needs.",
        },
        // {
        //     title: "Key Statistics",
        //     description:
        //         "Backed by years of expertise and strong client relationships, our statistics highlight the impactful results we deliver with consistency.",
        // },
       
    ];

    return (
        <div className="w-full ">
           {info1.map((item, index) => (
                <InfoBlock 
                    key={index} 
                    title={item.title} 
                    description={item.description} 
                />
                ))}
            {/* Stats Section */}
            <div className="flex justify-center mt-10">
                <div className="bg-[#0F2239] rounded-2xl border border-[#FFFFFF1A] p-6 sm:p-10 shadow-md w-full max-w-4xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 text-center">
                        {/* Top Row */}
                        <div className="p-6 sm:p-10 md:px-10 md:py-15 border-b  border-[#FFFFFF1A]">
                            <h1 className="text-4xl sm:text-5xl font-bold text-white">2+ Years</h1>
                            <p className="text-gray-300 text-lg sm:text-xl mt-1">Experience in IT</p>
                        </div>
                        <div className="p-6 sm:p-10 md:px-10 md:py-15 border-b  border-[#FFFFFF1A]">
                            <h1 className="text-4xl sm:text-5xl font-bold text-white">15+</h1>
                            <p className="text-gray-300 text-lg sm:text-xl mt-1">Clients Served</p>
                        </div>

                        {/* Bottom Row */}
                        <div className="p-6 sm:p-10 md:px-10 md:py-15 border-b sm:border-b-0 border-[#FFFFFF1A]">
                            <h1 className="text-4xl sm:text-5xl font-bold text-white">95%</h1>
                            <p className="text-gray-300 text-lg sm:text-xl mt-1">Client Satisfaction</p>
                        </div>
                        <div className="p-6  sm:p-10 md:px-10 md:py-15">
                            <h1 className="text-4xl sm:text-5xl font-bold text-white">25+</h1>
                            <p className="text-gray-300 text-lg sm:text-xl mt-1">Projects Delivered</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Section */}
            <div className="mt-10">
                <div className="bg-white/10 backdrop-blur text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-[#FFFFFF1A] shadow-md w-fit">
                    <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px]">
                        Crafted with Passion, Delivered with Precision
                    </h1>
                </div>

                <div className="mt-5 text-justify">
                    <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-[36px] leading-snug">
                        A glimpse into our projects that blend creativity, innovation, and
                        technology to drive real business results.
                    </h1>
                </div>
            </div>
            {/* <div>
            -------------------------------------------------- section need to added ---------------------------------------------------
      </div> */}
            <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center mt-10 px-4">
                {/* <div className="absolute top-1 left-1/2 -translate-x-1/2">
                    <div className="w-[300px] sm:w-[400px] lg:w-[500px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full 
        bg-[radial-gradient(ellipse,rgba(0,180,255,1)_0%,transparent_100%)] 
        blur-[80px] sm:blur-[100px] lg:blur-[120px]">
                    </div>
                </div> */}
            </div>
            <div className="mt-10">
               {info2.map((item, index) => (
                <InfoBlock 
                    key={index} 
                    title={item.title} 
                    description={item.description} 
                />
                ))}
            </div>
           
        </div>
    );
}
