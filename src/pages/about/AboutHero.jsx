import React from "react";
import { motion } from "framer-motion";
import gearImg1 from "../../assets/services/serviceHolo.svg";
import InfoBlock from "../../uiComponents/InfoComponent";
import HandShack from "../../uiComponents/animations/HandShack";
import Growth from "../../uiComponents/animations/Growth";
import Puzzle from "../../uiComponents/animations/Puzzle";
import Monitor from "../../uiComponents/animations/Monitor";

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

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <>
      {/* Hero Section */}
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
              className="text-center font-goodtimes text-[38px] sm:text-[80px] md:text-[140px]  leading-tight whitespace-nowrap text-white relative blur-fade"
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              ABOUT US
            </motion.h1>

            <motion.img
              src={gearImg1}
              alt="gear"
              className="hidden md:block absolute right-30 z-50 top-70 -translate-y-1/2 w-full md:w-[400px] object-cover animate-[spin_20s_linear_infinite] opacity-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}   // 👈 stays at 40% opacity
              transition={{ duration: 1, delay: 0.3 }}
            />

          </div>

          {/* ✅ Fixed Paragraph Animation */}
          <motion.p
            className="mt-8 font-semibold text-center md:text-start text-[20px] md:text-[36px] leading-snug max-w-4xl relative z-10"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            WE CREATE DIGITAL EXPERIENCES<br />  THAT HELP BRANDS GROW
            THROUGH <br />  DESIGN, TECHNOLOGY, AND <br /> INNOVATION.
          </motion.p>

          <div
            className="absolute inset-0 block md:hidden bg-center bg-no-repeat bg-contain animate-[spin_20s_linear_infinite] opacity-60"
            style={{ backgroundImage: `url(${gearImg1})` }}
          ></div>
        </div>
      </motion.div>

      {/* Vision / Mission */}
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
