import React from "react";
import { motion } from "framer-motion";
import gearImg1 from "../../assets/careers/3Dcareer.svg";
import ServiceCards from "./AnimatedCard";
import FloatingElement from "../../uiComponents/FloatImg";
import CareersAnimation from "../../uiComponents/animations/Careers";
import { useNavigate } from 'react-router-dom';


export default function CareerHero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        className="relative overflow-hidden"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
        variants={fadeUp}
      >
        <div className="w-full flex flex-col justify-center text-white relative mb-10">
          <div className="flex items-center justify-center relative">
            <motion.h1
              className="text-center font-goodtimes text-[38px] sm:text-[80px] md:text-[130px]  leading-tight whitespace-nowrap text-white relative blur-fade"
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              CAREERS
            </motion.h1>
          </div>
          <div className="flex flex-col items-center justify-center text-white my-10 p-8 rounded-3xl w-[95%] lg:w-max mx-auto text-center bg-[#112240]/40 backdrop-blur-md border border-white/5 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between w-full mb-8 gap-6 md:gap-12">
              <h1 className="text-[28px] sm:text-[34px] md:text-[44px] font-bold leading-tight text-white whitespace-nowrap">Let’s Build the Future Together</h1>
            </div>

            <a href="/careers/apply" className="px-12 py-4 bg-[#64ffda] text-[#0a192f] font-extrabold rounded-full hover:bg-[#52dcb8] transition-all transform hover:-translate-y-1 shadow-xl shadow-[#64ffda]/20 text-lg">
              Apply Now
            </a>
          </div>

          {/* Assessment Test Section */}
          <section id="assessment" className="my-16 md:my-28 w-[95%] md:w-[90%] mx-auto relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#112240]/70 to-[#0a192f]/70 backdrop-blur-xl border border-white/10 p-8 md:p-14 shadow-2xl group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#64ffda]/10 rounded-full blur-[120px] -mr-40 -mt-40 group-hover:bg-[#64ffda]/15 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] -ml-40 -mb-40 group-hover:bg-blue-600/15 transition-all duration-700"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-14">
              <div className="flex-1 space-y-8 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#64ffda]/10 border border-[#64ffda]/20 text-[#64ffda] text-xs font-bold tracking-[0.2em] uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#64ffda] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#64ffda]"></span>
                  </span>
                  College Student Program
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-[1.1]">Assessment Test for <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64ffda] to-blue-400">College Students</span></h2>
                <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                  Take the first step towards your career at Rooks and Brooks. Our technical assessment identifies top student talent for our specialized internships and roles.
                </p>
              </div>
              <div className="flex-shrink-0 w-full lg:w-auto">
                <div className="p-10 rounded-3xl bg-[#0a192f]/90 border border-white/10 shadow-2xl relative overflow-hidden group/card hover:border-[#64ffda]/40 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#64ffda]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#112240] to-[#0a192f] border border-white/10 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto shadow-xl group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-500">
                      📝
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Start Journey</h3>
                    <p className="text-slate-400 text-base mb-8 px-4">Evaluate your skills in <br />under 90 minutes</p>
                    <button
                     onClick={() => navigate('/careers/assessment')}
                     className="w-full px-12 py-5 bg-[#64ffda] text-[#0a192f] font-black rounded-2xl hover:bg-[#52dcb8] transition-all transform hover:scale-[1.05] active:scale-95 shadow-2xl shadow-[#64ffda]/20 cursor-pointer">
                      BEGIN ASSESSMENT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="flex items-center justify-around flex-col md:flex-row md:space-x-6 px-4">
            <motion.p
              className="mt-8 font-semibold text-center text-[20px] md:text-[36px] leading-snug max-w-4xl relative z-10"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              WE’RE BUILDING DIGITAL SOLUTIONS THAT SHAPE THE FUTURE — AND WE’D LOVE YOU TO BE PART OF IT
            </motion.p>
            {/* <div className="mt-10 sm:mt-0 relative">
              <FloatingElement className="">
                 <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-blue-500/10 rounded-[40%] blur-lg animate-pulse"></div>
                <img src={gearImg1} alt="gear" className="w-[250px] md:w-[300px]" />
              </FloatingElement> */}
            <CareersAnimation />
            {/* </div> */}
          </div>
        </div>
      </motion.div>
    </>
  );
}