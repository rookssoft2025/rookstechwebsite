import React, { useState } from "react";

const GlassCard = ({ 
  title = "Product Development", 
  features = [], 
  buttonLabel = "Learn More", 
  onButtonClick 
}) => {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = (y / rect.height - 0.5) * 10;
    const tiltY = (x / rect.width - 0.5) * -10;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    });
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="glass-card w-[370px] rounded-2xl overflow-hidden relative transition-transform duration-300"
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Liquid glass effect elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-20 blur-xl"></div>

        <div className="glass-card-inner h-full flex flex-col p-6 relative overflow-hidden">
          <div className="absolute top-1/3 right-0 w-12 h-12 rounded-full opacity-10 blur-lg"></div>
          
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {title}
          </h2>

          <div className="flex-1 grid grid-cols-1 gap-3">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                text={feature.text}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text, color }) => {
  return (
    <div className="feature-item flex items-center p-2 rounded-lg">
      <div className={`w-2 h-2 ${color} rounded-full mr-3 flex-shrink-0`}></div>
      <span className="text-white/90 text-sm font-medium">{text}</span>
    </div>
  );
};

export default GlassCard;
