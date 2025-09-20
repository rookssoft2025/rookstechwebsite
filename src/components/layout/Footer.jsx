import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    setSubmitted(true);
    console.log("Form submitted:", formData);
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSubmitted(false);
    }, 3000);
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

  const handlePhoneClick = () => {
    if (isMobile) {
      window.location.href = `tel:+917598707071`;
    }
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "";

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#071730] flex items-center justify-center overflow-hidden py-12">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl w-full flex flex-col lg:flex-row gap-12 p-6 md:p-8 text-white z-10">
        {/* Left Column - Contact Information */}
        <motion.div
          className="w-full lg:w-2/5 space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="flex flex-col">
            <div className="inline-flex items-center space-x-2 text-blue-400 mb-4">
              <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
              <span className="text-sm font-medium tracking-wider">GET IN TOUCH</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Let's create something <span className="text-blue-400">amazing</span> together
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div 
              onClick={handleEmailClick}
              className="flex items-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-colors">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-slate-300">Email Us</p>
                <p className="text-white font-medium">support@rooksitservices.com</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>

            <div 
              onClick={handlePhoneClick}
              className="flex items-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mr-4 group-hover:bg-green-500/20 transition-colors">
                <Phone className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-slate-300">Call Us</p>
                <p className="text-white font-medium">+91 75987 07071</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>

            <div 
              onClick={handleLocationClick}
              className="flex items-center p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mr-4 group-hover:bg-amber-500/20 transition-colors">
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-slate-300">Our Location</p>
                <p className="text-white font-medium">Ramavarmapuram, Nagercoil</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6 border-t border-white/10">
            <p className="text-slate-400 text-sm">
              We typically respond to all inquiries within 24 hours during business days.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div 
          className="w-full lg:w-3/5"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full -translate-y-20 translate-x-20 blur-2xl"></div>
            
            <div className="relative">
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mr-3">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Send us a message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={() => handleBlur("name")}
                      className="w-full h-12 px-4 pt-3 pb-1 rounded-lg backdrop-blur-sm bg-white/5 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50 transition-all duration-300 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none text-slate-400 peer-focus:text-blue-400 peer-focus:text-xs peer-focus:top-1 ${
                        focusedField === "name" || formData.name
                          ? "top-1 text-xs text-blue-400"
                          : "top-3 text-base"
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
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      className="w-full h-12 px-4 pt-3 pb-1 rounded-lg backdrop-blur-sm bg-white/5 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50 transition-all duration-300 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none text-slate-400 peer-focus:text-blue-400 peer-focus:text-xs peer-focus:top-1 ${
                        focusedField === "email" || formData.email
                          ? "top-1 text-xs text-blue-400"
                          : "top-3 text-base"
                      }`}
                    >
                      Email *
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("phone")}
                    onBlur={() => handleBlur("phone")}
                    className="w-full h-12 px-4 pt-3 pb-1 rounded-lg backdrop-blur-sm bg-white/5 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50 transition-all duration-300 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none text-slate-400 peer-focus:text-blue-400 peer-focus:text-xs peer-focus:top-1 ${
                      focusedField === "phone" || formData.phone
                        ? "top-1 text-xs text-blue-400"
                        : "top-3 text-base"
                    }`}
                  >
                    Phone Number *
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                    className="w-full px-4 pt-4 pb-2 rounded-lg backdrop-blur-sm bg-white/5 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50 transition-all duration-300 resize-none peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none text-slate-400 peer-focus:text-blue-400 peer-focus:text-xs peer-focus:top-2 ${
                      focusedField === "message" || formData.message
                        ? "top-2 text-xs text-blue-400"
                        : "top-4 text-base"
                    }`}
                  >
                    Message
                  </label>
                </div>

                {submitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                  >
                    Your message has been sent successfully! We'll get back to you soon.
                  </motion.div>
                )}

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={!isFormValid}
                    whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                    whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                    className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-300 ${
                      isFormValid 
                        ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                        : "bg-white/10 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </form>
            </div>
          </div>

          {/* Office Timings Section */}
          <motion.div 
            className="mt-8 backdrop-blur-2xl bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full -translate-x-16 -translate-y-16 blur-2xl"></div>
            
            <div className="relative">
              {/* <div className="flex items-center mb-6">
                
              </div> */}

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 ">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center mr-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold">Office Hours</h2>
                  <span className="text-slate-300">Monday - Saturday</span>
                  <span className="font-medium">9:00 AM - 5:30 PM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-6 text-center w-full mt-10 z-10">
        <p className="text-slate-400 text-sm">
          Copyright © 2023 Rooks and Brooks Technologies Pvt. Ltd - All Rights Reserved.
        </p>
      </div>
    </div>
  );
}