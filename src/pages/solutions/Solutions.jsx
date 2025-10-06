import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Hero from "../home/Hero";
import SolutionsInfo from "./SolutionsInfo";

export default function Solutions() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  const navbarHeight = 80;
  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <div className="relative bg-[#071730] px-4 sm:px-6 lg:px-15 overflow-hidden pb-10">
        {/* Static Stars Layer */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, #65a6db, transparent),
              radial-gradient(1px 1px at 40px 70px, #65a6db, transparent),
              radial-gradient(2px 2px at 80px 130px, #65a6db, transparent),
              radial-gradient(1px 1px at 90px 160px, #65a6db, transparent),
              radial-gradient(1.5px 1.5px at 120px 40px, #65a6db, transparent),
              radial-gradient(1px 1px at 160px 90px, #65a6db, transparent),
              radial-gradient(2px 2px at 200px 60px, #65a6db, transparent),
              radial-gradient(1px 1px at 220px 120px, #65a6db, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
          }}
        ></div>

        {/* Moving Stars Layer - Right to Left */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(3px 2px at 150px 150px, #65a6db, transparent),
              radial-gradient(3px 3px at 100px 250px, #65a6db, transparent),
              radial-gradient(3px 2px at 150px 180px, #65a6db, transparent),
              radial-gradient(3px 3px at 200px 180px, #65a6db, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "250px 250px",
            animation: "moveStarsRightToLeft 40s linear infinite",
          }}
        ></div>

        {/* Moving Stars Layer - Top to Bottom */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 50px 50px, #65a6db, transparent),
              radial-gradient(1.5px 1.5px at 120px 80px, #65a6db, transparent),
              radial-gradient(2.5px 2.5px at 180px 120px, #65a6db, transparent),
              radial-gradient(1px 1px at 240px 200px, #65a6db, transparent)
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
              radial-gradient(2px 2px at 80px 200px, #65a6db, transparent),
              radial-gradient(1.5px 1.5px at 150px 100px, #65a6db, transparent),
              radial-gradient(2px 2px at 220px 180px, #65a6db, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "350px 350px",
            animation: "moveStarsDiagonal 75s linear infinite",
          }}
        ></div>

        {/* Blinking Stars Layer */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 30px 200px, #65a6db, transparent),
              radial-gradient(1px 1px at 70px 100px, #65a6db, transparent),
              radial-gradient(2px 2px at 130px 220px, #65a6db, transparent),
              radial-gradient(1px 1px at 180px 50px, #65a6db, transparent),
              radial-gradient(1.5px 1.5px at 230px 150px, #65a6db, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "280px 280px",
          }}
        >
          {/* Individual moving blinking stars */}
          <div className="absolute top-[10%] left-[10%] w-1 h-1 bg-[#65a6db] rounded-full animate-pulseStar moveStarHorizontal" style={{ animationDelay: "0s" }}></div>
          <div className="absolute top-[25%] left-[75%] w-0.5 h-0.5 bg-[#65a6db] rounded-full animate-pulseStar moveStarVertical" style={{ animationDelay: "1.5s" }}></div>
          <div className="absolute top-[40%] left-[30%] w-1 h-1 bg-[#65a6db] rounded-full animate-pulseStar moveStarDiagonal" style={{ animationDelay: "0.7s" }}></div>
          <div className="absolute top-[60%] left-[60%] w-0.5 h-0.5 bg-[#65a6db] rounded-full animate-pulseStar moveStarHorizontal" style={{ animationDelay: "2.2s" }}></div>
          <div className="absolute top-[80%] left-[20%] w-1 h-1 bg-[#65a6db] rounded-full animate-pulseStar moveStarVertical" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-[15%] left-[50%] w-0.5 h-0.5 bg-[#65a6db] rounded-full animate-pulseStar moveStarDiagonal" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute top-[70%] left-[85%] w-1 h-1 bg-[#65a6db] rounded-full animate-pulseStar moveStarHorizontal" style={{ animationDelay: "1.8s" }}></div>
        </div>

        {/* Navbar */}
        <div
          className={`
          fixed left-0 w-full z-20 transition-transform duration-500 ease-in-out
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}
          ${initialLoad ? "-translate-y-full" : ""}
        `}
        >
          <div className="mt-4 mx-4">
            <Navbar />
          </div>
        </div>

        {/* Content */}
        <div className={`pt-[calc(80px+24px)]`}>
          <SolutionsInfo />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
