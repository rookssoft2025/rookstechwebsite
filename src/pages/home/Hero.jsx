import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import group1 from "../../assets/group1.svg";
import group2 from "../../assets/group2.svg";
import holo from "../../assets/holo.svg";
import AnimatedButton from "../../uiComponents/AnimatedButton";

export default function Hero() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <>
            <div className="relative z-10 px-4">
                <div className="sm:hidden absolute inset-0 -z-10">
                    <img
                        src={holo}
                        alt="holo"
                        className="w-full h-full object-cover animate-[spin_20s_linear_infinite] opacity-20"
                    />
                </div>
                {/* Hero Badge */}
               
                <div className="relative z-10 flex justify-center items-center mx-auto mt-5">
                    <div className=" flex items-center gap-3 bg-white/10 backdrop-blur text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full border border-[#FFFFFF1A] shadow-md">
                     <Sparkles className="w-12 text-cyan-400" />
                        <p className="text-center text-lg sm:text-2xl md:text-3xl lg:text-[36px] font-bold whitespace-nowrap">
                            Next-Gen IT, Today
                        </p>
                    </div>
                </div>

                {/* Main Heading */}
                <div className="relative z-10 mt-6">
                    <p className="font-goodtimes text-2xl sm:text-3xl md:text-4xl lg:text-[45px] text-center text-white leading-tight">
                        <span className="block sm:inline">Complete IT Solutions Under One Roof</span>
                        <br className="hidden sm:block" />
                        <span className="block sm:inline mt-2 sm:mt-0 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Web, Apps, Cloud & Security</span>
                    </p>
                </div>

                {/* Action Buttons  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"*/}
                <div className="relative z-10 mt-10 flex flex-col sm:flex-row gap-5 justify-center items-center">
                    <AnimatedButton label="Let's Work Together" />
                    {/* Secondary Button */}
                    <div className="cursor-pointer flex items-center justify-center transition-all duration-300">
                        <button className="h-[48px]  px-4 py-2 rounded-full hover:bg-[#0B3470] bg-white text-black hover:text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap">
                            Explore Our Services
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero images and background for larger screens */}
            <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center mt-10 px-4">
                <div className="absolute top-1 left-1/2 -translate-x-1/2">
                    <div className="w-[300px] sm:w-[400px] lg:w-[500px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full 
        bg-[radial-gradient(ellipse,rgba(100,220,255,1)_0%,rgba(0,180,255,0.6)_40%,transparent_100%)] 
        blur-[80px] sm:blur-[100px] lg:blur-[120px]">
                    </div>
                </div>
                <div className={`transition-all duration-2500 ease-in-out order-1 lg:order-1 mb-6 lg:mb-0 ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>
                    <img src={group1} alt="group1" className="w-full sm:mb-10" />
                </div>
                <div className="hidden sm:block animate-[spin_20s_linear_infinite] order-2 lg:order-2 mb-6 lg:mb-0">
                    <img className="w-full block" src={holo} alt="holo" />
                </div>

                <div className={`transition-all duration-2500 ease-in-out order-3 lg:order-3 ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
                    <img src={group2} alt="group2" className="w-full sm:mb-10 block" />
                </div>
            </div>

        </>
    );
}
