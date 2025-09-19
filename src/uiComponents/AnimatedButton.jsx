import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function AnimatedButton({
  label = "Click Me",
  onClick,
  className = "",
  disabled = false
}) {
  return (
    <div
      className={`
        relative inline-flex items-center group 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} 
        ${className}
      `}
      onClick={!disabled ? onClick : undefined} // prevent click if disabled
    >
      {/* Background hover effect */}
      <div
        className={`absolute -left-2 right-0 h-12 bg-[#0B3470] rounded-full transition-all duration-400 
          ${disabled ? "opacity-30" : "opacity-0 group-hover:opacity-100"}
        `}
      />

      {/* Arrow Icon */}
      <div
        className={`relative z-10 rounded-full p-2 transition-all duration-500 
          ${disabled ? "bg-gray-500" : "bg-[#0B3470] group-hover:bg-black group-hover:rotate-45"}
        `}
      >
        <ArrowUpRight className="text-white" />
      </div>

      <div className="w-4" />

      {/* Label */}
      <div
        className={`text-white relative z-10 rounded-full px-4 py-2 h-12 flex items-center text-center transition 
          ${disabled ? "bg-gray-500" : "bg-[#0B3470]"}
        `}
      >
        {label}
      </div>
    </div>
  );
}
