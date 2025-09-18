import React from "react";
import { motion } from "framer-motion";
import gearImg1 from "../../assets/careers/3Dcareer.svg";
import ServiceCards from "../../uiComponents/AnimatedCard";
import FloatingElement from "../../uiComponents/FloatImg";

export default function CareerHero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

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

          <div className="flex items-center justify-around flex-col md:flex-row md:space-x-6 px-4">
            <motion.p
              className="mt-8 font-semibold text-center text-[20px] md:text-[36px] leading-snug max-w-4xl relative z-10"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
             WE’RE BUILDING DIGITAL SOLUTIONS THAT SHAPE THE FUTURE — AND WE’D LOVE YOU TO BE PART OF IT
            </motion.p>
            <div className="mt-10 sm:mt-0 relative">
              <FloatingElement className="">
                 <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-blue-500/10 rounded-[40%] blur-lg animate-pulse"></div>
                <img src={gearImg1} alt="gear" className="w-[250px] md:w-[300px]" />
              </FloatingElement>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
