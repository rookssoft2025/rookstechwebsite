import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import AnimatedButton from "../../uiComponents/AnimatedButton";
import { motion } from "framer-motion";


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

const handleEmailClick = () => {
  const email = "support@rooksitservices.com";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = `mailto:${email}`;
  } else {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    window.open(gmailUrl, "_blank");
  }
};

  const handleLocationClick = () => {
    const location = 'First Floor, 17, Jawahar St, Ramavarmapuram, Nagercoil, Tamil Nadu 629001';
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android.*Tablet|Tablet/i.test(userAgent);
      setIsMobile(isMobileDevice || isTablet);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      window.location.href = `tel:+917598707071`;
    }
  };


  return (
    <div className="relative w-full min-h-screen  bg-[#0F2239] flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-[#05253d] to-[#0b3470] opacity-90"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#071730]/30 "></div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-blue-900/50 to-[#000]/85 "></div>

      <div className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, white, transparent),
              radial-gradient(1px 1px at 40px 70px, white, transparent),
              radial-gradient(2px 2px at 80px 130px, white, transparent),
              radial-gradient(1px 1px at 90px 160px, white, transparent),
              radial-gradient(1.5px 1.5px at 120px 40px, white, transparent),
              radial-gradient(1px 1px at 160px 90px, white, transparent),
              radial-gradient(2px 2px at 200px 60px, white, transparent),
              radial-gradient(1px 1px at 220px 120px, white, transparent)
            `,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
        }}>
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none animate-moveStars"
        style={{
          backgroundImage: `
              radial-gradient(2px 2px at 50px 150px, white, transparent),
              radial-gradient(1px 1px at 100px 250px, white, transparent),
              radial-gradient(2px 2px at 150px 80px, white, transparent),
              radial-gradient(1px 1px at 200px 180px, white, transparent)
            `,
          backgroundRepeat: "repeat",
          backgroundSize: "250px 250px",
        }}>
      </div>


      <div className="relative max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 text-white z-10 mb-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="w-[120px] h-[60px] flex items-center justify-center border border-slate-500/50 rounded-full text-[18px] text-white  backdrop-blur-sm bg-white/5">
            Contact Us
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            let's work together
          </h1>

          <div className="space-y-4 mt-12">
            <div onClick={handleEmailClick} className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/10 p-2 sm:p-5 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer shadow-sm shadow-slate-600">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 backdrop-blur-sm bg-white/10 rounded-xl flex items-center justify-center">
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
            <div
              className={`flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/10 p-2 sm:p-5 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer shadow-sm shadow-slate-600 ${isMobile ? "active:bg-white/15" : ""
                }`}
              onClick={handleClick}
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 sm:w-12 h-10 backdrop-blur-sm bg-white/10 rounded-xl flex items-center justify-center">
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

            <div
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/search/?api=1&query=First+Floor,+17,+Jawahar+St,+Ramavarmapuram,+Nagercoil,+Tamil+Nadu+629001",
                  "_blank"
                )
              }
              className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/10 p-2 sm:p-5 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer shadow-sm shadow-slate-600">
              <div className="flex items-center space-x-4">
                <div className="w-10 sm:w-12 h-10 backdrop-blur-sm bg-white/10 rounded-xl flex items-center justify-center">
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
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="backdrop-blur-3xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3 rounded-3xl"></div>
            <div className="relative space-y-6">
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
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || formData.name
                    ? 'top-1.5 text-xs text-blue-400 font-medium'
                    : 'top-4 text-base text-slate-400'
                    }`}
                >
                  Name *
                </label>
              </div>
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
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || formData.email
                    ? 'top-1.5 text-xs text-blue-400 font-medium'
                    : 'top-4 text-base text-slate-400'
                    }`}
                >
                  Email*
                </label>
              </div>
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
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'phone' || formData.phone
                    ? 'top-1.5 text-xs text-blue-400 font-medium'
                    : 'top-4 text-base text-slate-400'
                    }`}
                >
                  Phone Number*
                </label>
              </div>
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
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message
                    ? 'top-1.5 text-xs text-blue-400 font-medium'
                    : 'top-4 text-base text-slate-400'
                    }`}
                >
                  Message
                </label>
              </div>

              <div className="flex justify-end pt-4">
                <AnimatedButton label="Save" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 text-center w-full mt-5 z-10">
        <p className="text-white text-sm">
          Copyright © 2023 Rooks and Brooks Technologies Pvt. Ltd - All Rights Reserved.
        </p>
      </div>
    </div>
  );
}