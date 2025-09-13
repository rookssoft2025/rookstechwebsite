import React, { useState, useEffect } from "react";
import cloudImg from "../../assets/services/cloud.svg";
import supportImg from "../../assets/services/support.svg";
import systemImg from "../../assets/services/system.svg";
import pencilImg from "../../assets/solutions/pencil.svg";
import softwareImg from "../../assets/solutions/software.svg";
import cartImg from "../../assets/solutions/cart.svg";
import botImg from "../../assets/solutions/bot.svg";
import strategyImg from "../../assets/solutions/strategy.svg";
import gearImg1 from "../../assets/serviceimg2.svg";

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
    return (
            <div className="relative overflow-hidden">
              <div className="w-full flex flex-col justify-center text-white relative ">
                <div className="flex items-center justify-center relative">
                  <h1 className="text-center font-goodtimes text-[50px] sm:text-[100px] md:text-[140px] lg:text-[170px] leading-tight whitespace-nowrap text-white relative blur-fade">
                    TECH <br /> SOLUTIONS
                  </h1>
        
                  <img
                    src={gearImg1}
                    alt="gear"
                    className="hidden md:block absolute right-30 z-50 top-130 -translate-y-1/2 w-full  md:w-[400px] object-cover animate-[spin_20s_linear_infinite]"
                  />
                </div>
        
                <p className="mt-8 font-semibold text-start text-[20px] md:text-[50px] leading-snug max-w-4xl relative z-10">
                 WE BUILD DIGITAL SOLUTIONS <br /> THAT DRIVE GROWTH, BOOST <br /> EFFICIENCY, AND GIVE YOUR <br /> BUSINESS A COMPETITIVE EDGE.
                </p>
                <div
                  className="absolute inset-0 block md:hidden bg-center bg-no-repeat bg-contain animate-[spin_20s_linear_infinite] opacity-60"
                  style={{ backgroundImage: `url(${gearImg1})` }}
                ></div>
               
              </div>
        
              <div className="mt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`
                 bg-[#0F2239]
                p-6 rounded-2xl shadow-lg flex flex-col jusstify-between 
                transition-transform duration-300 hover:scale-105
                ${service.title === "UI/UX Designs" ? "lg:row-span-2 lg:col-start-2" : ""}
              `}
                  >
                    <div className={`text-white ${service.title === "UI/UX Designs" ? "flex items-center justify-between sm:block" : "flex items-center justify-between"}`}>
        
                      {service.title === "UI/UX Designs" && <div className="hidden  sm:flex justify-center"> <img src={service.img} alt={service.title} className="w-70  mb-4" /></div>}
                      <h3 className="text-[24px] font-semibold mb-2">{service.title}</h3>
                      {service.title != "UI/UX Designs" ? <img src={service.img} alt={service.title} className="w-30  mb-4" /> :
                        <img src={service.img} alt={service.title} className=" slock sm:hidden w-30  mb-4" />
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
            </div>
    );
}