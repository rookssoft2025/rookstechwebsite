import React from "react";
import { motion } from "framer-motion";
import gearImg1 from "../../assets/about/3Dabout.svg";
import InfoBlock from "../../uiComponents/InfoComponent";
import HandShack from "../../uiComponents/animations/HandShack";
import Growth from "../../uiComponents/animations/Growth";
import Puzzle from "../../uiComponents/animations/Puzzle";
import Monitor from "../../uiComponents/animations/Monitor";
import FloatingElement from "../../uiComponents/FloatImg";

export default function AboutHero() {
  const info1 = [
    {
      title: "Vision",
      description:
        "To become a global leader in delivering innovative, human-centered digital experiences that transform businesses and inspire growth.",
    },
    {
      title: "Mission",
      description:
        "To empower businesses with design, technology, and strategy that drives growth.",
    },
  ];

  const info2 = [
    {
      title: "Growth",
      description: "To craft scalable & user-focused digital products.",
      image: <Growth />,
    },
    {
      title: "Puzzle",
      description:
        "To combine design, technology and strategy for measurable impact.",
      image: <Puzzle />,
    },
    {
      title: "Handshake",
      description:
        "To build long-term partnerships through trust, transparency, and results.",
      image: <HandShack />,
    },
    {
      title: "Monitor",
      description:
        "To deliver continuous innovation that keeps our clients future-ready.",
      image: <Monitor />,
    },
  ];

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
              ABOUT
            </motion.h1>
          </div>

          <div className="flex items-center justify-around flex-col md:flex-row md:space-x-6 px-4">
            <motion.p
              className="mt-8 font-semibold text-center text-[20px] md:text-[36px] leading-snug max-w-4xl relative z-10"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              WE CREATE DIGITAL EXPERIENCES THAT HELP BRANDS GROW THROUGH DESIGN, TECHNOLOGY, AND INNOVATION.
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

      <motion.div
        className="mt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        variants={fadeUp}
      >
        {info1.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            variants={fadeUp}
          >
            <InfoBlock title={item.title} description={item.description} />
          </motion.div>
        ))}
      </motion.div>

      {/* Values Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8 sm:mx-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.25 } },
        }}
      >
        {info2.map((item, index) => (
          <motion.div
            key={index}
            className="bg-[#0F2239] rounded-2xl text-white p-5 shadow-md border border-[#FFFFFF1A] "
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <div className="flex flex-col items-center justify-center">
              <div>{item.image}</div>
              <p className="text-[20px] font-semibold mt-4 mb-2">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
