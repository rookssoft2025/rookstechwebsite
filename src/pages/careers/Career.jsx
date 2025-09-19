import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import CareerHero from "./CareerHero";
import CoreValues from "./CareersCard";
import ServiceCards from "./AnimatedCard";


export default function Careers() {
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
                    <div className="absolute top-[10%] left-[10%] w-1 h-1 bg-white rounded-full animate-pulseStar" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute top-[25%] left-[75%] w-0.5 h-0.5 bg-white rounded-full animate-pulseStar" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute top-[40%] left-[30%] w-1 h-1 bg-white rounded-full animate-pulseStar" style={{ animationDelay: '0.7s' }}></div>
                    <div className="absolute top-[60%] left-[60%] w-0.5 h-0.5 bg-white rounded-full animate-pulseStar" style={{ animationDelay: '2.2s' }}></div>
                    <div className="absolute top-[80%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulseStar" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-[15%] left-[50%] w-0.5 h-0.5 bg-white rounded-full animate-pulseStar" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-[70%] left-[85%] w-1 h-1 bg-white rounded-full animate-pulseStar" style={{ animationDelay: '1.8s' }}></div>
                </div>
                <div
                    className={`
          fixed left-0 w-full z-20 transition-transform duration-500 ease-in-out
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}
          ${initialLoad ? "-translate-y-full" : ""}
        `}
                >
                    <div className="mt-4 mx-4 z-50">
                        <Navbar />
                    </div>
                </div>
                <div className={`pt-[calc(80px+24px)]`}>
                    <CareerHero />
                    <CoreValues />
                </div>
                <div className="">
                    <div className="flex items-center justify-center text-white text-[20px] md:text-[30px] my-5">
                        <h1>Let’s Build the Future Together</h1>
                    </div>
                    <div className="mt-10">
                        <ServiceCards />
                    </div>
                </div>

            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}