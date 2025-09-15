import React, { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
export default function AnimatedButton({
  label = "Let's Work Together",
  primaryIcon = <ArrowUpRight size={16} />,
  secondaryIcon = <ArrowRight size={16} />,
  onClick,
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className={`relative group w-full sm:w-[250px] h-[48px] overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* First State (default view) */}
      <div className={`absolute inset-0 flex items-center justify-center sm:justify-end space-x-3 transition-all duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <button
          onClick={onClick}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 bg-[#0B3470] text-white hover:bg-[#0A2E63] transition-colors duration-200"
        >
          {primaryIcon}
        </button>
        <button
          onClick={onClick}
          className="px-4 py-3 rounded-full bg-[#0B3470] text-white text-sm font-semibold hover:bg-[#0A2E63] transition-colors duration-200 whitespace-nowrap"
        >
          {label}
        </button>
      </div>
      {/* Hover State (right-to-left animation) */}
      <button
        onClick={onClick}
        className={`absolute right-0 flex items-center justify-evenly gap-2 bg-[#0B3470] text-white pr-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-700 ease-in-out overflow-hidden h-full ${isHovered ? 'w-[200px] opacity-100' : 'w-0 opacity-0'}`}
        style={{
          transformOrigin: 'right center',
          transitionProperty: 'width, opacity'
        }}
      >
        <div className="bg-black p-3 rounded-full flex-shrink-0">{secondaryIcon}</div>
        <span className="whitespace-nowrap">{label}</span>
      </button>
    </div>
  );
}
