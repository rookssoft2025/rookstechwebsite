import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import group1 from "../assets/group1.svg";
import group2 from "../assets/group2.svg";
import holo from "../assets/holo.svg";

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="relative min-h-screen 
      bg-[linear-gradient(360deg,hsla(216,82%,24%,1)_0%,hsla(225,100%,6%,1)_100%)] 
      overflow-hidden">

      {/* ✨ Stars Layer */}
      <div className="absolute inset-0 
        bg-[radial-gradient(2px_2px_at_20px_30px,white,transparent),radial-gradient(1px_1px_at_40px_70px,white,transparent),radial-gradient(2px_2px_at_80px_130px,white,transparent),radial-gradient(1px_1px_at_90px_160px,white,transparent)] 
        bg-repeat bg-[length:200px_200px] animate-moveStars">
      </div>

      {/* 🌌 Content */}
      <div className="relative z-10 p-4">
        <Navbar />
      </div>

      <div className="relative z-10 flex justify-center items-center mx-auto mt-5">
        <div className=" bg-white/10 backdrop-blur text-white px-6 py-3 rounded-full border border-[#FFFFFF1A] shadow-md ">
          <p className="text-center text-[36px] font-bold">Next-Gen IT, Today</p>
        </div>
      </div>

      <div className="relative z-10 mt-6">
        <p className="font-goodtimes text-[45px] text-center text-white">
          Complete IT Solutions Under One Roof
          Web, Apps, Cloud & Security
        </p>
      </div>

      <div className="relative z-10 mt-10 flex gap-5 justify-center items-center">
        <div className="relative group w-[250px] h-[48px] overflow-hidden">
          <div className="cursor-pointer absolute inset-0 flex items-center justify-end space-x-3 transition-all duration-300 group-hover:opacity-0">
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 bg-[#0B3470] text-white hover:bg-[#0A2E63] transition-colors duration-200">
              <ArrowUpRight size={16} />
            </button>
            <button className="px-4 py-2 rounded-full bg-[#0B3470] text-white text-sm font-semibold hover:bg-[#0A2E63] transition-colors duration-200 text-nowrap">
              Let's Work Together
            </button>
          </div>

          <button className="cursor-pointer absolute inset-0 flex items-center justify-center gap-2 bg-[#0B3470] text-white pl-1 pr-6 py-1 rounded-full font-medium shadow-lg hover:shadow-xl
                          transform translate-x-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            <div className="bg-black p-2 rounded-full">
              <ArrowRight size={16} />
            </div>
            <span>Let's Work Together</span>
          </button>
        </div>

        <div className="cursor-pointer inset-0 flex items-center justify-end space-x-3 transition-all duration-300 group-hover:opacity-0">
          <button className="px-4 py-2 rounded-full hover:bg-[#0B3470] bg-white text-black hover:text-white text-sm font-semibold hover:bg-[#0A2E63] transition-colors duration-200">
            Explore Our Services
          </button>
        </div>
      </div>

      <div className="relative z-10 flex justify-center items-center">
        <div
          className={`transition-all duration-1000 ease-in-out ${
            show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <img src={group1} alt="group1" className="w-full h-full" />
        </div>
        <div className="animate-[spin_20s_linear_infinite]">
          <img src={holo} alt="holo" />
        </div>
        <div
          className={`transition-all duration-1000 ease-in-out ${
            show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <img src={group2} alt="group2" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
