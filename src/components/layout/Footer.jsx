import React from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import AnimatedButton from "../../uiComponents/AnimatedButton";

export default function Footer() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-[#0b1220]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-[#05253d] to-[#0f614d] opacity-90"></div>

      <div className="relative max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 p-4 sm:p-8 md:p-10 lg:p-12 text-white">
        {/* Left Section */}
        <div>
          <button className="px-4 py-1.5 sm:px-5 sm:py-2 border border-gray-400 rounded-full text-xs sm:text-sm mb-3 sm:mb-4">
            Contact Us
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-snug">
            let’s work together
          </h1>

          <div className="space-y-3 sm:space-y-4">
            {/* Email */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <div>
                  <p className="text-xs sm:text-sm opacity-80">Email Us</p>
                  <p className="text-sm sm:text-base font-semibold break-all">
                    support@rooksitservices.com
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-70" />
            </div>

            {/* Phone */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <div>
                  <p className="text-xs sm:text-sm opacity-80">Call Us</p>
                  <p className="text-sm sm:text-base font-semibold">
                    +91 75987 07071
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-70" />
            </div>

            {/* Location */}
            <div className="flex items-center justify-between bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <div>
                  <p className="text-xs sm:text-sm opacity-80">Our Location</p>
                  <p className="text-sm sm:text-base font-semibold">
                    Ramavarmapuram, Nagercoil
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-70" />
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md">
          <form className="space-y-3 sm:space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2.5 sm:p-3 rounded-lg bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2.5 sm:p-3 rounded-lg bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-2.5 sm:p-3 rounded-lg bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full p-2.5 sm:p-3 rounded-lg bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none text-sm sm:text-base"
            ></textarea>
            <div className="flex items-center justify-end">
              <AnimatedButton label="Submit" />
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 sm:bottom-4 text-center w-full text-gray-400 text-xs sm:text-sm px-2">
        Copyright © 2025 Rooks & Brooks. All rights reserved
      </div>
    </div>
  );
}
