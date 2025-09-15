import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import AnimatedButton from "../../uiComponents/AnimatedButton";
export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [focusedField, setFocusedField] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };
  const handleBlur = (fieldName) => {
    if (!formData[fieldName]) {
      setFocusedField(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#05253D] to-[#4AFA67] opacity-90"></div>
      {/* Gradient overlay that matches the image */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-blue-900/60 to-[#3DF252]"></div>
      {/* Additional atmospheric gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-800/30"></div>
      <div className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 text-white z-10">
        {/* Left Section */}
        <div className="space-y-8">
          <div className="w-[120px] h-[60px] flex items-center justify-center border border-slate-500/50 rounded-full text-[18px] text-white  backdrop-blur-sm bg-white/5">
            Contact Us
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            let's work together
          </h1>
          <div className="space-y-4 mt-12">
            {/* Email */}
            <div className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer shadow-sm shadow-slate-600">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 backdrop-blur-sm bg-white/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-300 mb-1">Email Us</p>
                  <p className="text-base font-medium text-white">
                    support@rooksitservices.com
                  </p>
                </div>
              </div>
              <div className="w-[50px] h-[50px] rounded-[50%] flex items-center justify-center border border-slate-400 /10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
                <ArrowUpRight className="w-7 h-7  text-slate-400 group-hover:text-white group-hover:group-hover:rotate-45 transition-all duration-300" />
              </div>
                          </div>
            {/* Phone */}
            <div className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer shadow-sm shadow-slate-600">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 backdrop-blur-sm bg-white/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-300 mb-1">Call Us</p>
                  <p className="text-base font-medium text-white">
                    +91 75987 07071
                  </p>
                </div>
              </div>
                <div className="w-[50px] h-[50px] rounded-[50%] flex items-center justify-center border border-slate-400 /10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
                <ArrowUpRight className="w-7 h-7  text-slate-400 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
              </div>
            </div>
            {/* Location */}
            <div className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer shadow-sm shadow-slate-600">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 backdrop-blur-sm bg-white/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-slate-300 mb-1">Our Location</p>
                  <p className="text-base font-medium text-white">
                    Ramavarmapuram, Nagercoil
                  </p>
                </div>
              </div>
               <div className="w-[50px] h-[50px] rounded-[50%] flex items-center justify-center border border-slate-400 /10 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300">
                <ArrowUpRight className="w-7 h-7  text-slate-400 group-hover:text-white group-hover:rotate-45 transition-all duration-300" />
              </div>
            </div>
          </div>
        </div>
        {/* Right Section - Ultra Glassy Form Container */}
        <div className="relative">
          {/* Glass container with heavy blur and transparency */}
          <div className="backdrop-blur-3xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Additional inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3 rounded-3xl"></div>
            <div className="relative space-y-6">
              {/* Name Field */}
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  className="w-full h-14 px-4 pt-6 pb-2 rounded-xl backdrop-blur-sm bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'name' || formData.name
                      ? 'top-1.5 text-xs text-blue-400 font-medium'
                      : 'top-4 text-base text-slate-400'
                  }`}
                >
                  Name *
                </label>
              </div>
              {/* Email Field */}
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="w-full h-14 px-4 pt-6 pb-2 rounded-xl backdrop-blur-sm bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'email' || formData.email
                      ? 'top-1.5 text-xs text-blue-400 font-medium'
                      : 'top-4 text-base text-slate-400'
                  }`}
                >
                  Email*
                </label>
              </div>
              {/* Phone Field */}
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('phone')}
                  onBlur={() => handleBlur('phone')}
                  className="w-full h-14 px-4 pt-6 pb-2 rounded-xl backdrop-blur-sm bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
                  placeholder=" "
                />
                <label
                  htmlFor="phone"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'phone' || formData.phone
                      ? 'top-1.5 text-xs text-blue-400 font-medium'
                      : 'top-4 text-base text-slate-400'
                  }`}
                >
                  Phone Number*
                </label>
              </div>
              {/* Message Field */}
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  className="w-full px-4 pt-7 pb-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-blue-400/50 focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300 resize-none"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' || formData.message
                      ? 'top-1.5 text-xs text-blue-400 font-medium'
                      : 'top-4 text-base text-slate-400'
                  }`}
                >
                  Message
                </label>
              </div>
              <div className="flex justify-end pt-4">
                 <AnimatedButton label="Get Started" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="absolute bottom-6 text-center w-full z-10">
        <p className="text-white text-sm">
          Copyright © 2025 Rooks & Brooks. All rights reserved
        </p>
      </div>
    </div>
  );
}