import React from "react";
import gearImg from "../../assets/serviceimg.svg";
import gearImg1 from "../../assets/services/3Dservice.svg";
import securityImg from "../../assets/services/lock.svg";
import cloudImg from "../../assets/services/cloud.svg";
import officeImg from "../../assets/services/office.svg";
import supportImg from "../../assets/services/support.svg";
import managementImg from "../../assets/services/management.svg";
import backupImg from "../../assets/services/backup.svg";
import shieldImg from "../../assets/services/Security.svg";
import systemImg from "../../assets/services/system.svg";
import { motion } from "framer-motion";
import FloatingElement from "../../uiComponents/FloatImg";
import ServiceAnimation from "../../uiComponents/animations/Service";

export default function ServicesHero() {
  const services = [
    { title: "CCTV & Security Systems", img: securityImg },
    { title: "Remote & Onsite Support", img: supportImg },
    { title: "Hardware Procurement & Maintenance", img: systemImg },
    { title: "Cloud & Network Solutions", img: cloudImg },
    { title: "Data Backup & Recovery", img: backupImg },
    { title: "IT Infrastructure Management", img: managementImg },
    { title: "Smart Office & IoT Solutions", img: officeImg },
    { title: "Cybersecurity & Firewall Management", img: shieldImg },
  ];
  const fadeUp = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

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
            IT SERVICES
          </motion.h1>
        </div>
        <div className="flex items-center justify-around flex-col gap-10 md:flex-row md:space-x-6 px-4">
          <motion.p
            className="mt-8 font-semibold text-center text-[20px] md:text-[36px] leading-snug max-w-4xl relative z-10"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            WE MANAGE YOUR TECHNOLOGY, SO YOU CAN FOCUS ON WHAT MATTERS
          </motion.p>
          <div className=" relative">
            <FloatingElement className="">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-blue-500/10 rounded-[40%] blur-lg animate-pulse"></div>
              <img src={gearImg1} alt="gear" className="w-[250px] md:w-[300px]" />
              {/* <ServiceAnimation/> */}
            </FloatingElement>
          </div>
        </div>      </div>
      <div className="sm:mt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={`
        bg-[#0F2239]
        p-6 rounded-2xl shadow-lg flex flex-col justify-between 
        transition-transform duration-300 hover:scale-97
        ${service.title === "Remote & Onsite Support" ? "lg:row-span-2 lg:col-start-2" : ""}
      `}
          >
            <div
              className={`text-white ${service.title === "Remote & Onsite Support"
                ? "flex items-center justify-between sm:block"
                : "flex items-center justify-between"
                }`}
            >
              {service.title === "Remote & Onsite Support" && (
                <div className="hidden sm:flex justify-center">
                  <img src={service.img} alt={service.title} className="w-70 mb-4" />
                </div>
              )}
              <h3 className="text-[24px] font-semibold mb-2">{service.title}</h3>
              {service.title !== "Remote & Onsite Support" ? (
                <img src={service.img} alt={service.title} className="w-30 mb-4" />
              ) : (
                <img
                  src={service.img}
                  alt={service.title}
                  className="slock sm:hidden w-30 mb-4"
                />
              )}
            </div>
            <p className="text-md text-gray-300">
              {service.title === "CCTV & Security Systems" &&
                "Comprehensive installation, monitoring, and maintenance to secure your premises."}
              {service.title === "Cloud & Network Solutions" &&
                "Reliable cloud integration, secure networks, and scalable connectivity for your business."}
              {service.title === "Smart Office & IoT Solutions" &&
                "Automate and optimize office operations with IoT-driven smart technologies."}
              {service.title === "Remote & Onsite Support" &&
                "Quick troubleshooting, technical support, and hands-on assistance whenever you need it."}
              {service.title === "IT Infrastructure Management" &&
                "End-to-end management of servers, networks, and systems ensuring peak performance."}
              {service.title === "Hardware Procurement & Maintenance" &&
                "Supply, installation, and maintenance of computers, servers, and IT equipment."}
              {service.title === "Data Backup & Recovery" &&
                "Ensure data backup solutions and disaster recovery to minimize downtime."}
              {service.title === "Cybersecurity & Firewall Management" &&
                "Protect your business with advanced firewall monitoring and cybersecurity systems."}
            </p>
          </div>
        ))}
      </div>
    </motion.div>

  );
}
