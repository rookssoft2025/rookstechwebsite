import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const OrbitNode = ({
  app,
  orbitRadius,
  isPaused,
  onHover,
  onLeave,
  onClick,
  orbitRotation,
  orbitAngle,
}) => {
  const nodeRef = useRef(null);
  const floatTweenRef = useRef(null);

  useEffect(() => {
    floatTweenRef.current = gsap.to(nodeRef.current, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      if (floatTweenRef.current) {
        floatTweenRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    if (floatTweenRef.current) {
      if (isPaused) {
        floatTweenRef.current.pause();
      } else {
        floatTweenRef.current.play();
      }
    }
  }, [isPaused]);

  const angleInRadians = (app.angle * Math.PI) / 180;
  const x = Math.cos(angleInRadians) * orbitRadius;
  const y = Math.sin(angleInRadians) * orbitRadius;

  return (
    <div
      ref={nodeRef}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-orbitRotation}deg) rotateX(${-orbitAngle.rotateX}deg) rotateY(${-orbitAngle.rotateY}deg)`,
      }}
      onMouseEnter={() => onHover(app.id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(app)}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{
          scale: 1.2,
          boxShadow: "0 0 30px rgba(56, 189, 248, 0.6)",
        }}
        transition={{ duration: 0.3 }}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center relative group"
        style={{ transformStyle: "preserve-3d" }}
      >
        <img
          src={app.icon}
          alt={app.name}
          className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full"
        />
        <div className="absolute -bottom-10 whitespace-nowrap text-white text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
          {app.name}
        </div>
      </motion.div>
    </div>
  );
};

export default OrbitNode;
