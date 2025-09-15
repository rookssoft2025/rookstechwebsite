import React from "react";
import { motion } from "framer-motion";
import gearImg1 from "../../assets/about/aboutHolo.svg";
import ServiceCards from "../../uiComponents/AnimatedCard";

export default function WorkHero() {

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
                <div className="w-full flex flex-col justify-center text-white relative">
                    <div className="flex items-center justify-center relative">
                        <motion.h1
                            className="text-center font-goodtimes text-[50px] sm:text-[100px] md:text-[140px] lg:text-[170px] leading-tight whitespace-nowrap text-white relative blur-fade"
                            initial={{ opacity: 0, y: -60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                           WORKS
                        </motion.h1>

                        <motion.img
                            src={gearImg1}
                            alt="gear"
                            className="hidden md:block absolute right-30 z-50 top-80 -translate-y-1/2 w-full md:w-[400px] object-cover animate-[spin_20s_linear_infinite]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        />
                    </div>

                    <motion.p
                        className="mt-8 font-semibold text-start text-[20px] md:text-[50px] leading-snug max-w-4xl relative z-10"
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9 }}
                    >
                      FROM STARTUPS TO ENTERPRISES <br /> WE CRAFT DIGITAL SOLUTIONS <br /> THAT DRIVE IMPACT.
                    </motion.p>

                    <div
                        className="absolute inset-0 block md:hidden bg-center bg-no-repeat bg-contain animate-[spin_20s_linear_infinite] opacity-60"
                        style={{ backgroundImage: `url(${gearImg1})` }}
                    ></div>
                </div>
                {/* <div>
                    <ServiceCards/>
                </div> */}
            </motion.div>
        </>
    )
}