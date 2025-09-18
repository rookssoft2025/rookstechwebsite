import React from "react";
import { motion } from "framer-motion";
import jothiVideo from "../../assets/videos/jothi.mp4";
import parkInsight from "../../assets/videos/parkInsight.mp4";
import rooks from "../../assets/videos/rooks.mp4";
import { div } from "framer-motion/client";

export default function WorkCards() {
    const workCards = [
        {
            title: "Jothi",
            description:
                "Jothi is a mobile application that helps you find the best deals on cars, motorcycles, and bicycles.",
            video: jothiVideo,
        },
        {
            title: "Rooks",
            description:
                "Rooks is a mobile application that helps you find the best deals on cars, motorcycles, and bicycles.",
            video: rooks,
        },
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <div className="">
            <div className="">
                <h1 className="text-center font-semibold text-white text-[46px]">Latest Projects</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mx-auto">
                {workCards.map((card, index) => (
                    <motion.div
                        key={index}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-2xl overflow-hidden shadow-lg bg-[#0F2239] text-white"
                    >
                        <video
                            src={card.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full object-cover"
                        />

                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-sm text-gray-300 mt-1">{card.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

    );
}

