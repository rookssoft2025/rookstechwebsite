import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function AnimatedButton({
  label = "Let's Work Together",
  primaryIcon = <ArrowUpRight size={16} />,
  secondaryIcon = <ArrowRight size={16} />,
  onClick,
  className = "",
}) {
  return (
    <div
      className={`relative group w-full sm:w-[250px] h-[48px] overflow-hidden ${className}`}
    >
      {/* First State (default view) */}
      <div className="cursor-pointer absolute inset-0 flex items-center justify-center sm:justify-end space-x-3 transition-all duration-300 group-hover:opacity-0">
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

      {/* Hover State (slide-in animation) */}
      <button
        onClick={onClick}
        className="cursor-pointer absolute inset-0 flex items-center justify-center gap-2 bg-[#0B3470] text-white pr-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform translate-x-full opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
      >
        <div className="bg-black p-3 rounded-full">{secondaryIcon}</div>
        <span className="whitespace-nowrap">{label}</span>
      </button>
    </div>
  );
}
