import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import CareerHero from "./CareerHero";
import CoreValues from "./CareersCard";
// import ServiceCards from "./AnimatedCard";

export default function Careers() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowNavbar(false);
      else setShowNavbar(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <div className="relative bg-[#071730] px-4 sm:px-6 lg:px-15 overflow-hidden pb-10 min-h-screen">

        {/* Static Stars */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 40px 70px, #FFFFFF, transparent),
              radial-gradient(2px 2px at 80px 130px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 90px 160px, #FFFFFF, transparent),
              radial-gradient(1.5px 1.5px at 120px 40px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 160px 90px, #FFFFFF, transparent),
              radial-gradient(2px 2px at 200px 60px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 220px 120px, #FFFFFF, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
          }}
        ></div>

        {/* Moving Stars Right to Left */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(3px 2px at 150px 150px, #FFFFFF, transparent),
              radial-gradient(3px 3px at 100px 250px, #FFFFFF, transparent),
              radial-gradient(3px 2px at 150px 180px, #FFFFFF, transparent),
              radial-gradient(3px 3px at 200px 180px, #FFFFFF, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "250px 250px",
            animation: "moveStarsRightToLeft 40s linear infinite",
          }}
        ></div>

        {/* Moving Stars Top to Bottom */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 50px 50px, #FFFFFF, transparent),
              radial-gradient(1.5px 1.5px at 120px 80px, #FFFFFF, transparent),
              radial-gradient(2.5px 2.5px at 180px 120px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 240px 200px, #FFFFFF, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
            animation: "moveStarsTopToBottom 45s linear infinite",
          }}
        ></div>

        {/* Diagonal Moving Stars */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 80px 200px, #FFFFFF, transparent),
              radial-gradient(1.5px 1.5px at 150px 100px, #FFFFFF, transparent),
              radial-gradient(2px 2px at 220px 180px, #FFFFFF, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "350px 350px",
            animation: "moveStarsDiagonal 75s linear infinite",
          }}
        ></div>

        {/* Blinking Stars */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 30px 200px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 70px 100px, #FFFFFF, transparent),
              radial-gradient(2px 2px at 130px 220px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 180px 50px, #FFFFFF, transparent),
              radial-gradient(1.5px 1.5px at 230px 150px, #FFFFFF, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "280px 280px",
          }}
        >
          <div className="absolute top-[10%] left-[10%] w-1 h-1 bg-[#FFFFFF] rounded-full animate-pulseStar" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-[25%] left-[75%] w-0.5 h-0.5 bg-[#FFFFFF] rounded-full animate-pulseStar" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-[40%] left-[30%] w-1 h-1 bg-[#FFFFFF] rounded-full animate-pulseStar" style={{ animationDelay: '0.7s' }}></div>
          <div className="absolute top-[60%] left-[60%] w-0.5 h-0.5 bg-[#FFFFFF] rounded-full animate-pulseStar" style={{ animationDelay: '2.2s' }}></div>
          <div className="absolute top-[80%] left-[20%] w-1 h-1 bg-[#FFFFFF] rounded-full animate-pulseStar" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-[15%] left-[50%] w-0.5 h-0.5 bg-[#FFFFFF] rounded-full animate-pulseStar" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-[70%] left-[85%] w-1 h-1 bg-[#FFFFFF] rounded-full animate-pulseStar" style={{ animationDelay: '1.8s' }}></div>
        </div>

        {/* Navbar */}
        <div className={`fixed left-0 w-full z-20 transition-transform duration-500 ease-in-out
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}
          ${initialLoad ? "-translate-y-full" : ""}`}>
          <div className="mt-4 mx-4 z-50">
            <Navbar />
          </div>
        </div>

        {/* Content */}
        <div className="pt-[calc(80px+24px)]">
          <CareerHero />

          <div className="flex flex-col items-center justify-center text-white my-10 border border-white">
            <h1 className="text-[20px] md:text-[30px]">Let’s Build the Future Together</h1>
            <a href="/careers/apply" className="mt-6 px-8 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-full hover:bg-[#52dcb8] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#64ffda]/20">
              Apply Now
            </a>
          </div>

          <CoreValues />
        </div>

        {/* <div className="">

          <div className="mt-10">
            <ServiceCards />
          </div>
        </div> */}

      </div>

      <Footer />
    </div>
  );
}
