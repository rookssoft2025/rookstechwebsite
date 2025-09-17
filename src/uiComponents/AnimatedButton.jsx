import React, { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
const AnimatedButton = ({
  label = "Let's Work Together",
  primaryIcon = <ArrowUpRight size={16} />,
  secondaryIcon = <ArrowRight size={16} />,
  onClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    if (onClick) onClick();
  };
  return (
    <div
      className={`relative group w-full sm:w-[300px] h-[48px] overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Default State - Only text button visible, primary button separate */}
      <div
        className={`absolute inset-0 flex items-center justify-center sm:justify-end space-x-3 transition-all duration-500 ease-out ${
          isHovered ? "opacity-100" : "opacity-100"
        }`}
      >
        {/* Primary Icon Button - hides on hover */}
        <button
          onClick={handleClick}
          className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 bg-[#0B3470] text-white hover:bg-[#0A2E63] transition-all duration-300 ${
            isHovered ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        >
          {primaryIcon}
        </button>
        {/* Text Button - base position */}
        <button
          onClick={handleClick}
          className={`relative overflow-hidden px-4 py-3 rounded-full bg-[#0B3470] text-white text-sm font-semibold hover:bg-[#0A2E63] transition-all duration-500 whitespace-nowrap ${
            isHovered ? "pl-12" : "pl-4"
          }`}
        >
          {/* Primary icon that slides in from right with background and rotation */}
          <span
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ease-out ${
              isHovered
                ? "opacity-100 translate-x-0 bg-black rotate-45"
                : "opacity-0 translate-x-8 bg-transparent rotate-0"
            }`}
          >
            <span className={`transition-transform duration-500 ${isHovered ? "rotate-0" : "rotate-0"}`}>
              {primaryIcon}
            </span>
          </span>
          {/* Button text */}
          <span className={`transition-all duration-500 ${isHovered ? "ml-2" : "ml-0"}`}>
            {label}
          </span>
        </button>
      </div>
      {/* Click ripple effect */}
      {isClicked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/20 animate-ping"></div>
        </div>
      )}
    </div>
  );
};
export default AnimatedButton;