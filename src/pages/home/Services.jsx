import React from "react";
import appsImg from "../../assets/apps.svg";
import websitesImg from "../../assets/dev.svg";
import uiImg from "../../assets/uiux.svg";
import ecommerceImg from "../../assets/eCom.svg";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import AnimatedButton from "../../uiComponents/AnimatedButton";

export default function Services() {
  const services = [
    {
      title: "Software & Mobile Apps",
      img: appsImg,
      description:
        "From concept to launch, we build secure, scalable, and user-friendly software and mobile apps aligned with your business goals.",
    },
    {
      title: "Websites & Web Apps",
      img: websitesImg,
      description:
        "We design and develop responsive, high-performance websites and web apps that deliver seamless experiences and results.",
    },
    {
      title: "UI/UX Design",
      img: uiImg,
      description:
        "Our creative design team crafts intuitive interfaces and engaging experiences that keep users connected and satisfied.",
    },
    {
      title: "E-commerce",
      img: ecommerceImg,
      description:
        "We build e-commerce platforms with easy navigation, secure payments, and designs that boost conversions.",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-8 ">
        {services.map((item, index) => (
          <div
            key={index}
            className="bg-[#0F2239] rounded-2xl p-10 shadow-md border border-[#FFFFFF1A] 
          hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-white font-semibold text-[26px] md:text-[36px]  sm:text-xl md:text-2xl">
                {item.title}
              </h1>
              <img
                src={item.img}
                alt={item.title}
                className="w-30 h-30 object-contain"
              />
            </div>
            <p className="text-gray-300 mt-15 md:text-[24px]  font-semibold text-sm sm:text-base leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <AnimatedButton label="View All Services" />
      </div>
    </>
  );
}
