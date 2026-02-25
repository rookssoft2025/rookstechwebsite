import React from "react";
import { motion } from "framer-motion";
import jothiVideo from "../../assets/videos/jothi.mp4";
import parkInsight from "../../assets/videos/parkInsight.mp4";
import rooks from "../../assets/videos/rooks.mp4";
import { div } from "framer-motion/client";
import jothiImg from  "../../assets/work/jothi.jpg";
import constructionImg from "../../assets/work/construction.jpg";
import FunitureImg from "../../assets/work/furImg.jpg";
import ServiceImg from "../../assets/work/serImg.jpg";
import charityImg from "../../assets/work/charity.jpg";
import hmsimg from "../../assets/work/hmsImg.jpg";

export default function WorkCards() {
    const workCards = [
    {
    title: "Jothi",
    description:
        "Designed and developed jothidecor.in, a website for Jothi Rajalekshmi curtains and furnishing shop, offering a wide range of elegant curtains, fabrics, and home decor solutions.",
    video: jothiVideo,
    img:jothiImg,
},
{
    title: "Construction",
    description:
        "We developed Rooks CST, a mobile application for construction site management, helping teams streamline tasks, track progress, and manage resources efficiently.",
    video: rooks,
    img:constructionImg,
},
    {
    title: "Servnex - Service Management Application",
    description:
        "Servnex is a mobile application designed to track and manage computer hardware, biometric devices, and other technical service operations. It helps monitor service requests, technician assignments, repair status, maintenance history, and customer records, ensuring efficient service delivery and real-time tracking..",
    video: jothiVideo,
    img:ServiceImg,
},
{
    title: "Factory Management System",
    description:
        "Factory Management System is a software solution designed to monitor and manage all manufacturing processes within a factory. For a furniture manufacturing unit, it tracks raw materials, production stages, labor, inventory, orders, and dispatch, ensuring efficient workflow, cost control, and streamlined operations from start to finish..",
    video: rooks,
    img:FunitureImg,
},
    {
    title: "Charity Financial Management System",
    description:
        "Charity Financial Management System is a software solution that helps nonprofit organizations track donations, income, and expenses efficiently. It ensures financial transparency, proper fund utilization, accurate reporting, and compliance with regulatory requirements.",
    video: jothiVideo,
    img:charityImg,
},
{
    title: "Hospital Management System",
    description:
        "Hospital Management System is a software solution designed to manage and streamline hospital operations such as patient registration, appointments, billing, medical records, and staff management. It improves efficiency, ensures accurate data handling, and enhances overall patient care and administrative control..",
    video: rooks,
    img:hmsimg,
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
                        {/* <video
                            src={card.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full object-cover"
                        /> */}
                        {/* <img src={card.img} alt=""  className="w-full object-cover"/> */}
                        <img
  src={card.img}
  alt={card.title}
  className="w-full h-64 object-cover"
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

