import React, { useState, useEffect } from "react";
import cloudImg from "../../assets/services/cloud.svg";
import supportImg from "../../assets/services/support.svg";
import systemImg from "../../assets/services/system.svg";
import pencilImg from "../../assets/solutions/pencil.svg";
import softwareImg from "../../assets/solutions/software.svg";
import cartImg from "../../assets/solutions/cart.svg";
import botImg from "../../assets/solutions/bot.svg";
import strategyImg from "../../assets/solutions/strategy.svg";
import gearImg1 from "../../assets/solutions/3Dtech.svg";
import { motion } from "framer-motion";
import FloatingElement from "../../uiComponents/FloatImg";
import InfoBlock from "../../uiComponents/InfoComponent";

export default function SolutionsInfo() {

  const services = [
    { title: "Websites & Web Applications", img: systemImg },
    { title: "UI/UX Designs", img: pencilImg },
    { title: "Software & Mobile Applications", img: softwareImg },
    { title: "E-commerce Solutions", img: cartImg },
    { title: "Enterprise & Cloud Solutions", img: cloudImg },
    { title: "AI & Machine Learning Solutions", img: botImg },
    { title: "Digital Consulting & Strategy", img: strategyImg },
    { title: "Maintenance & Support", img: supportImg },
  ];
  const fadeUp = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };
  const reasons = [
    {
      title: "Expert Team",
      desc: "Skilled professionals with proven expertise across multiple domains.",
    },
    {
      title: "Tailored Solutions",
      desc: "Custom-built strategies that align with your unique goals.",
    },
    {
      title: "End-to-End Support",
      desc: "From planning to execution, we cover the entire lifecycle.",
    },
  ];
  const info = [
    {
      title: "Why Choose Rooks Tech?",
      description:
        "At Rooks Tech, we go beyond delivering solutions — we build lasting partnerships. With a team of experts, innovative strategies, and customer-first approach, we ensure every project drives measurable growth, efficiency, and long-term success for your business.",
    },
  ];

  const caseStudies = [
    {
      title: "E-Commerce Growth",
      desc: "Helped a retail brand increase online sales by 250% with a scalable e-commerce platform.",
    },
    {
      title: "AI-powered Analytics",
      desc: "Delivered predictive insights for a logistics company, cutting costs by 30%.",
    },
    {
      title: "Cloud Migration",
      desc: "Migrated enterprise infrastructure to cloud, improving uptime and reducing maintenance.",
    },
  ];


  return (
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
            TECHNOLOGY
          </motion.h1>
        </div>

        <div className="flex items-center justify-around flex-col md:flex-row md:space-x-6 px-4">
          <motion.p
            className="mt-8 font-semibold text-center text-[20px] md:text-[36px] leading-snug max-w-4xl relative z-10"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            WE BUILD DIGITAL SOLUTIONS THAT DRIVE GROWTH, BOOST EFFICIENCY, AND GIVE YOUR BUSINESS A COMPETITIVE EDGE.
          </motion.p>
          <div className="mt-10 sm:mt-0 relative">
            <FloatingElement className="">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-blue-500/10 rounded-[40%] blur-lg animate-pulse"></div>
              <img src={gearImg1} alt="gear" className="w-[250px] md:w-[300px]" />
            </FloatingElement>
          </div>
        </div>
      </div>
      <div className="mt-10 sm:mt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`
                 bg-[#0F2239]
                p-6 rounded-2xl shadow-lg flex flex-col jusstify-between 
                transition-transform duration-300 hover:scale-97
                ${service.title === "UI/UX Designs" ? "lg:row-span-2 lg:col-start-2" : ""}
              `}
          >
            <div className={`text-white ${service.title === "UI/UX Designs" ? "flex items-center justify-between md:block" : "flex items-center justify-between"}`}>

              {service.title === "UI/UX Designs" && <div className="hidden  md:flex justify-center"> <img src={service.img} alt={service.title} className="w-70  mb-4" /></div>}
              <h3 className="text-[24px] font-semibold mb-2">{service.title}</h3>
              {service.title != "UI/UX Designs" ? <img src={service.img} alt={service.title} className="w-30  mb-4" /> :
                <img src={service.img} alt={service.title} className=" block md:hidden w-30  mb-4" />
              }
            </div>
            <p className="text-md text-gray-300">
              {service.title === "Websites & Web Applications" &&
                "Modern, responsive websites, portals, and web apps designed for performance and scalability."}
              {service.title === "E-commerce Solutions" &&
                "Secure and scalable online stores with payment integration, catalog management, and marketplaces."}
              {service.title === "AI & Machine Learning Solutions" &&
                "Intelligent tools for predictive analytics, process automation, and smarter decision-making."}
              {service.title === "UI/UX Designs" &&
                "User-focused design and prototyping to create intuitive, engaging, and seamless digital experiences ."}
              {service.title === "Digital Consulting & Strategy" &&
                "Expert guidance on product planning, technology adoption, and digital transformation."}
              {service.title === "Software & Mobile Applications" &&
                "Custom software solutions and iOS/Android apps that align with your business goals."}
              {service.title === "Enterprise & Cloud Solutions" &&
                "SaaS platforms, cloud-native apps, and API integrations for smarter business operations."}
              {service.title === "Maintenance & Support" &&
                "Continuous monitoring, updates, and optimization to ensure smooth, reliable performance."}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <p className="text-3xl font-semibold text-white">Proven Results</p>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {caseStudies.map((study, idx) => (
          <div
            key={idx}
            className="bg-[#0F2239] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-semibold text-white mb-3">{study.title}</h3>
            <p className="text-gray-300 text-sm">{study.desc}</p>
          </div>
        ))}
      </div>

      <div className="">
        {info.map((item, index) => (
          <InfoBlock
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((reason, idx) => (
          <div
            key={idx}
            className="bg-[#0F2239] p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{reason.title}</h3>
            <p className="text-gray-300 text-sm">{reason.desc}</p>
          </div>
        ))}
      </div>

    </motion.div>
  );
}