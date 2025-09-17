import React, { useState, useEffect } from "react";
import Services from "./Services";
import InfoBlock from "../../uiComponents/InfoComponent";

// Counter Component
const Counter = ({ end, duration = 1000, suffix = "", start = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return; // Only animate when start = true

    let startVal = 0;
    const increment = end / (duration / 16); // ~60fps
    const step = () => {
      startVal += increment;
      if (startVal < end) {
        setCount(Math.floor(startVal));
        requestAnimationFrame(step);
      } else {
        setCount(end); // ensure exact end
      }
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

export default function Info() {
  const [hovered, setHovered] = useState(false);

  const info1 = [
    {
      title: "Who We Are ?",
      description:
        "At Rooks & Brooks, we provide innovative solutions for businesses and individuals, delivering AI-powered applications built on top industry-standard technologies. As a trusted software company, we combine cutting-edge development with deep research to create intelligent, reliable, and future-ready solutions that drive growth and innovation.",
    },
    {
      title: "Key Statistics",
      description:
        "Backed by years of expertise and strong client relationships, our statistics highlight the impactful results we deliver with consistency.",
    },
  ];

  const info2 = [
    {
      title: "Crafted with Passion, Delivered with Precision",
      description:
        "A glimpse into our projects that blend creativity, innovation, and technology to drive real business results.",
    },
    {
      title: "End-to-End IT Expertise",
      description:
        "From strategy to execution, we provide a wide range of IT services tailored to meet your business needs.",
    },
  ];

  return (
    <div className="w-full">
      {info1.map((item, index) => (
        <InfoBlock
          key={index}
          title={item.title}
          description={item.description}
        />
      ))}
      <div className="flex justify-center mt-10">
        <div
          className="bg-[#0F2239] rounded-2xl border border-[#FFFFFF1A] p-6 sm:p-10 shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 text-center">
            <div className="p-6 sm:p-10 border-b border-[#FFFFFF1A]">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                <Counter end={2} duration={1000} start={hovered} />+ Years
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl mt-1">
                Experience in IT
              </p>
            </div>
            <div className="p-6 sm:p-10 border-b border-[#FFFFFF1A]">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                <Counter end={75} duration={1000} start={hovered} />+
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl mt-1">
                Clients Served
              </p>
            </div>
            <div className="p-6 sm:p-10 border-b sm:border-b-0 border-[#FFFFFF1A]">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                <Counter end={95} duration={1000} start={hovered} />%
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl mt-1">
                Client Satisfaction
              </p>
            </div>
            <div className="p-6 sm:p-10">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
                <Counter end={125} duration={1000} start={hovered} />+
              </h1>
              <p className="text-gray-300 text-lg sm:text-xl mt-1">
                Projects Delivered
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row justify-center items-center mt-10 px-4"></div>

      <div className="mt-10">
        {info2.map((item, index) => (
          <InfoBlock
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
