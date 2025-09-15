import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function AnimatedButton({
  label = "View All Services",
  primaryIcon = <ArrowUpRight size={16} />,
  secondaryIcon = <ArrowRight size={16} />,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center rounded-full bg-[#0B3470] text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
    >
      <div
        className="w-10 h-10 flex items-center justify-center bg-black rounded-full transition-all duration-300 group-hover:translate-x"
      >
        <span className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          {primaryIcon}
        </span>
        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {secondaryIcon}
        </span>
      </div>

      <div className="flex items-center pl-3 pr-6 py-3">
        <span className="text-sm font-semibold whitespace-nowrap transition-all duration-300 group-hover:pl-5">
          {label}
        </span>
      </div>
    </button>
  );
}
