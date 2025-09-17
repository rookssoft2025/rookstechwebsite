import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import Navbar from "../../components/layout/Navbar";
import Info from "./Info";
import Clients from "./Clients";
import Services from "./Services";
import Footer from "../../components/layout/Footer";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  const navbarHeight = 80; // approximate height of navbar

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <div className="relative min-h-screen bg-[#071730] px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Stars Background with multiple layers */}
        <div className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, white, transparent),
              radial-gradient(1px 1px at 40px 70px, white, transparent),
              radial-gradient(2px 2px at 80px 130px, white, transparent),
              radial-gradient(1px 1px at 90px 160px, white, transparent),
              radial-gradient(1.5px 1.5px at 120px 40px, white, transparent),
              radial-gradient(1px 1px at 160px 90px, white, transparent),
              radial-gradient(2px 2px at 200px 60px, white, transparent),
              radial-gradient(1px 1px at 220px 120px, white, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
          }}>
        </div>
        
        {/* Moving Stars Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none animate-moveStars"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 50px 150px, white, transparent),
              radial-gradient(1px 1px at 100px 250px, white, transparent),
              radial-gradient(2px 2px at 150px 80px, white, transparent),
              radial-gradient(1px 1px at 200px 180px, white, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "250px 250px",
          }}>
        </div>
        
        {/* Blinking Stars Layer */}
        <div className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 30px 200px, white, transparent),
              radial-gradient(1px 1px at 70px 100px, white, transparent),
              radial-gradient(2px 2px at 130px 220px, white, transparent),
              radial-gradient(1px 1px at 180px 50px, white, transparent),
              radial-gradient(1.5px 1.5px at 230px 150px, white, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "280px 280px",
          }}>
          {/* Individual blinking stars with different animation delays */}
          <div className="absolute top-[10%] left-[10%] w-1 h-1 bg-white rounded-full animate-pulseStar" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-[25%] left-[75%] w-0.5 h-0.5 bg-white rounded-full animate-pulseStar" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-[40%] left-[30%] w-1 h-1 bg-white rounded-full animate-pulseStar" style={{animationDelay: '0.7s'}}></div>
          <div className="absolute top-[60%] left-[60%] w-0.5 h-0.5 bg-white rounded-full animate-pulseStar" style={{animationDelay: '2.2s'}}></div>
          <div className="absolute top-[80%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulseStar" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-[15%] left-[50%] w-0.5 h-0.5 bg-white rounded-full animate-pulseStar" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-[70%] left-[85%] w-1 h-1 bg-white rounded-full animate-pulseStar" style={{animationDelay: '1.8s'}}></div>
        </div>

        {/* Navbar */}
        <div
          className={`
          fixed left-0 w-full z-20 transition-transform duration-500 ease-in-out
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}
          ${initialLoad ? "-translate-y-full" : ""}
        `}
        >
          <div className="mt-4 mx-4"> {/* gap from top */}
            <Navbar />
          </div>
        </div>

        {/* Hero Section */}
        <div className={`pt-[calc(80px+24px)]`}> {/* padding top = navbar height + gap */}
          <Hero />
        </div>
        <div className="sm:px-10">
          <Info />
        </div>
        <div className="sm:px-10">
          <Services />
        </div>
        <div >
          <Clients />
        </div>
      </div>
      <Footer />
    </div>
  );
}