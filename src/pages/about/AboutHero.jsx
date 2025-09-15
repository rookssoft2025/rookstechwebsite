import React from "react";
import gearImg1 from "../../assets/about/aboutHolo.svg";
import InfoBlock from "../../uiComponents/InfoComponent";
import HandShack from "../../uiComponents/animations/HandShack";
import Growth from "../../uiComponents/animations/Growth";
import Puzzle from "../../uiComponents/animations/Puzzle";
import Monitor from "../../uiComponents/animations/Monitor";
import { desc } from "framer-motion/client";

export default function AboutHero() {

    const info1 = [
        {
            title: "Vision",
            description:
                "To become a global leader in delivering innovative, human-centered digital experiences that transform businesses and inspire growth.",
        },
        {
            title: "Mission",

        },
    ];

    const info2 = [
        {
            title: "Growth",
            description: "To craft scalable & user-focused digital products.",
            image: <Growth />
        },
        {
            title: "Puzzle",
            description: "To combine design, technology and strategy for measurable impact.",
            image: <Puzzle />
        },
        {
            title: "Handshake",
            description: "To build long-term partnerships through trust, transparency, and results.",
            image: <HandShack />
        },
        {
            title: "Monitor",
            description: "To deliver continuous innovation that keeps our clients future-ready.",
            image: <Monitor />
        },
    ];
    return (
        <>
            <div className="relative overflow-hidden">
                <div className="w-full flex flex-col justify-center text-white relative ">
                    <div className="flex items-center justify-center relative">
                        <h1 className="text-center font-goodtimes text-[50px] sm:text-[100px] md:text-[140px] lg:text-[170px] leading-tight whitespace-nowrap text-white relative blur-fade">
                            ABOUT US
                        </h1>

                        <img
                            src={gearImg1}
                            alt="gear"
                            className="hidden  md:block absolute right-30 z-50 top-80 -translate-y-1/2 w-full  md:w-[400px] object-cover animate-[spin_20s_linear_infinite]"
                        />
                    </div>

                    <p className="mt-8 font-semibold text-start text-[20px] md:text-[50px] leading-snug max-w-4xl relative z-10">
                        WE CREATE DIGITAL <br /> EXPERIENCES THAT HELP <br /> BRANDS GROW THROUGH <br /> DESIGN, TECHNOLOGY, AND <br /> INNOVATION.
                    </p>
                    <div
                        className="absolute inset-0 block md:hidden bg-center bg-no-repeat bg-contain animate-[spin_20s_linear_infinite] opacity-60"
                        style={{ backgroundImage: `url(${gearImg1})` }}
                    ></div>

                </div>
            </div>
            <div className="mt-10">
                {info1.map((item, index) => (
                    <InfoBlock
                        key={index}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 sm:mx-20 ">
                    {info2.map((item, index) => (

                        <div className="bg-[#0F2239] rounded-2xl text-white p-5 shadow-md border border-[#FFFFFF1A]">
                            <div className="flex flex-col items-center justify-center">
                                <div>
                                    {item.image}
                                </div>
                                <p className="text-[24px] font-semibold mt-4 mb-2">
                                    {item.description}
                                </p>
                            </div>
                        </div>))}
                </div>
            </div>
        </>
    )
}