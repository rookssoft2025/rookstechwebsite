import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/rook brooks logo-01.png";
import { useAppShowcase } from "../context/AppShowcaseContext";

const appData = [
  {
    id: 1,
    src: "/mobile_apps_asstes/servnex.png",
    name: "Servnex",
    delay: 0,
    isVotto: false,
    angle: 0,
  },
  {
    id: 2,
    src: "/mobile_apps_asstes/ebricks.png",
    name: "Ebricks",
    delay: 0.2,
    isVotto: false,
    angle: 72,
  },
  {
    id: 3,
    src: "/mobile_apps_asstes/votto.png",
    name: "Votto",
    delay: 0.4,
    isVotto: true,
    angle: 144,
  },
  {
    id: 4,
    src: "/mobile_apps_asstes/rookserviceapp (1).png",
    name: "RookService",
    delay: 0.6,
    isVotto: false,
    angle: 216,
  },
  {
    id: 5,
    src: "/mobile_apps_asstes/rookstodo.png",
    name: "RookTodo",
    delay: 0.8,
    isVotto: false,
    angle: 288,
  },
];

const FloatingAppShowcase = () => {
  const [hoveredAppId, setHoveredAppId] = useState(null);
  const { setSelectedAppId } = useAppShowcase();

  const handleAppClick = (appId) => {
    setSelectedAppId(appId);
    // Scroll to AppShowcaseCarousel section
    const portfolioSection = document.querySelector("[data-app-portfolio]");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center">
      {/* Center Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: "easeOut",
        }}
        className="absolute z-20 w-[140px] md:w-[160px] rounded-full overflow-hidden border-2 border-sky-400/30 bg-white shadow-[0_0_30px_rgba(0,174,255,0.4)]"
      >
        <img
          src={logo}
          alt="Rooks & Brooks"
          className="w-full h-full object-contain p-2"
        />
      </motion.div>

      {/* Main orbit container - this will rotate */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full z-10"
        animate={{ rotate: 360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Connecting Lines (rotate with the orbit) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {appData.map((app) => {
            const radian = (app.angle * Math.PI) / 180;
            const radius = 170;
            const centerX = 190; // Half of 380
            const centerY = 190; // Half of 380
            const xPos = centerX + Math.cos(radian) * radius;
            const yPos = centerY + Math.sin(radian) * radius;

            return (
              <g key={`line-${app.id}`}>
                <motion.line
                  x1={centerX}
                  y1={centerY}
                  x2={xPos}
                  y2={yPos}
                  stroke="rgba(0, 174, 255, 0.8)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5,
                    ease: "easeOut",
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Apps positioned around the circle */}
        {appData.map((app, index) => {
          // Calculate X and Y positions for perfect circle placement
          const radian = (app.angle * Math.PI) / 180;
          const radius = 170; // Larger radius for proper spacing
          const xPos = Math.cos(radian) * radius;
          const yPos = Math.sin(radian) * radius;
          const isHovered = hoveredAppId === app.id;

          return (
            <div
              key={app.id}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(${xPos}px, ${yPos}px)`,
              }}
            >
              {/* Counter-rotate the app so it stays upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative"
              >
                {/* Hoverable container */}
                <div
                  className="relative cursor-pointer"
                  onMouseEnter={() => setHoveredAppId(app.id)}
                  onMouseLeave={() => setHoveredAppId(null)}
                  onClick={() => handleAppClick(app.id)}
                >
                  {/* App Container */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: [0, -6, 0, 6, 0],
                    }}
                    whileHover={{
                      scale: 1.2,
                      boxShadow: "0 0 30px rgba(0, 174, 255, 0.6)",
                      transition: { duration: 0.3 },
                    }}
                    transition={{
                      duration: 0.8,
                      delay: app.delay,
                      y: {
                        duration: 3 + index * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className={`relative z-10 w-[85px] md:w-[95px] rounded-2xl overflow-hidden border-2 border-sky-400/30 bg-white shadow-[0_0_20px_rgba(0,174,255,0.3)] cursor-pointer ${isHovered ? "z-50" : "z-10"}`}
                  >
                    <img
                      src={app.src}
                      alt={app.name}
                      className="w-full h-auto object-cover"
                      style={
                        app.isVotto
                          ? {
                              filter:
                                "brightness(0.7) sepia(1) saturate(8) hue-rotate(-10deg)",
                            }
                          : {}
                      }
                    />
                  </motion.div>

                  {/* App Name Label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 10 : 10,
                      scale: isHovered ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap z-50"
                    style={{ top: "100%", marginTop: "12px" }}
                  >
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-sky-400/40 rounded-xl text-white text-sm md:text-base font-bold shadow-lg shadow-sky-400/20">
                      {app.name}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default FloatingAppShowcase;
