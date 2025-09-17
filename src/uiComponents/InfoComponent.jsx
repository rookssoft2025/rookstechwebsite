import React,{ useState, useEffect } from "react";

export default function InfoBlock({ title, description, className = "" }) {
  return (
    <div className={`mt-10 ${className}`}>
      {/* Title Badge */}
      <div className="bg-white/10 backdrop-blur text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-[#FFFFFF1A] shadow-md w-fit">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-[24px]">
          {title}
        </h1>
      </div>

      {/* Description */}
      <div className="mt-5 text-justify">
        <h1 className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-[20px] leading-snug">
          {description}
        </h1>
      </div>
    </div>
  );
}
