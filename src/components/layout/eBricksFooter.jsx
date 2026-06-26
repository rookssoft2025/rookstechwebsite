import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaXTwitter as Twitter, FaLinkedin as Linkedin, FaGithub as Github } from "react-icons/fa6";
import ebricksLogo from "../../assets/mobile_apps_asstes/ebrickslogog.png";
import { useNavigate } from "react-router-dom";

const EBricksFooter = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent,
        );
      const isTablet = /iPad|Android.*Tablet|Tablet/i.test(userAgent);
      setIsMobile(isMobileDevice || isTablet);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleEmailClick = () => {
    const email = "support@rookstechnologies.com";
    if (isMobile) {
      window.location.href = `mailto:${email}`;
    } else {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        email,
      )}`;
      window.open(gmailUrl, "_blank");
    }
  };

  const handlePhoneClick = () => {
    if (isMobile) {
      window.location.href = `tel:+917598707071`;
    }
  };

  const handleLocationClick = (location) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location,
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <footer className="relative pt-24 pb-12 px-4 bg-gradient-to-b from-[#071324] to-[#050812] border-t border-[#0B3470]/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0B3470]/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#1a4a8a]/10 rounded-full blur-3xl translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={ebricksLogo}
                  alt="eBricks"
                  className="h-15 w-auto object-contain"
                />
                 <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  eBricks
                </span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Transform your construction business with smart project
                management, team collaboration, and real-time tracking — all in
                one powerful platform.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <motion.a
                    key={i}
                    whileHover={{ y: -3 }}
                    className="w-9 h-9 bg-white/5 border border-[#0B3470]/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#4ec9ff] hover:border-[#4ec9ff]/50 transition-all duration-300"
                    href="#"
                    aria-label="Social Link"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white font-semibold mb-6 flex items-center gap-2"
            >
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#0B3470] to-[#1a4a8a] rounded-full" />
              Quick Links
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-3"
            >
              {[
                { name: "Features", id: "features" },
                { name: "Why Choose Us", id: "why-choose" },
                { name: "Pricing Plans", id: "pricing" },
                { name: "Get Started", id: "cta" },
              ].map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={`#${link.id}`}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-[#4ec9ff]">•</span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Us */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white font-semibold mb-6 flex items-center gap-2"
            >
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#0B3470] to-[#1a4a8a] rounded-full" />
              Contact Us
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 cursor-pointer group"
                onClick={handleEmailClick}
              >
                <div className="flex-shrink-0 w-9 h-9 bg-[#0B3470]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0B3470]/20 transition-all duration-300">
                  <Mail className="w-4 h-4 text-[#4ec9ff]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    support@rookstechnologies.com
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 cursor-pointer group"
                onClick={handlePhoneClick}
              >
                <div className="flex-shrink-0 w-9 h-9 bg-[#0B3470]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0B3470]/20 transition-all duration-300">
                  <Phone className="w-4 h-4 text-[#4ec9ff]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    +91 75987 07071
                  </p>
                </div>
              </motion.li>
            </motion.ul>
          </div>

          {/* Locations */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white font-semibold mb-6 flex items-center gap-2"
            >
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#0B3470] to-[#1a4a8a] rounded-full" />
              Locations
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() =>
                  handleLocationClick(
                    "First Floor, 17, Jawahar St, Ramavarmapuram, Nagercoil, Tamil Nadu 629001",
                  )
                }
              >
                <div className="flex-shrink-0 w-9 h-9 bg-[#0B3470]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0B3470]/20 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-[#4ec9ff]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Nagercoil
                  </p>
                  <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    Ramavarmapuram, Tamil Nadu
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 cursor-pointer group"
                onClick={() =>
                  handleLocationClick(
                    "Industrial Estate P.O, Thiruvananthapuram, Kerala",
                  )
                }
              >
                <div className="flex-shrink-0 w-9 h-9 bg-[#0B3470]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0B3470]/20 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-[#4ec9ff]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Thiruvananthapuram
                  </p>
                  <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                    Industrial Estate P.O, Kerala
                  </p>
                </div>
              </motion.li>
            </motion.ul>
          </div>
        </div>

        {/* Bottom Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#0B3470]/30 to-transparent mb-8"
        />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-sm"
          >
            © {new Date().getFullYear()} eBricks by Rooks & Brooks Technologies.
            All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6"
          >
            <button
              onClick={() => navigate("/privacypolicy")}
              className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
            >
              Back to Main Site
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default EBricksFooter;
