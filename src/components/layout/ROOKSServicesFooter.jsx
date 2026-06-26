import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin, } from "lucide-react";
import { FaXTwitter as Twitter, FaFacebook as Facebook, FaInstagram as Instagram } from "react-icons/fa6";
import rookserviceappLogo from "../../assets/mobile_apps_asstes/rooks services Stroke.png";

const ROOKSServicesFooter = () => {
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
    <footer className="bg-[#071730] border-t border-blue-500/20 py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={rookserviceappLogo}
                alt="Rooks Services App"
                className="h-10 w-auto object-contain"
              />
              <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Rooks Services App
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Comprehensive service management platform for businesses of all sizes.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
           <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white font-semibold mb-6 flex items-center gap-2"
            >
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#0B3470] to-[#0B3490]/60 rounded-full" />
              Quick Links
            </motion.h3>
            <motion.ul className="space-y-2">
              {[
                "Home",
                "Features",
                "How It Works",
                "Designed For",
                "Benefits",
                "FAQ"
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact Us */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white font-semibold mb-6 flex items-center gap-2"
            >
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#0B3470] to-[#0B3490]/60 rounded-full" />
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
                  <Mail className="w-4 h-4 text-[#0B3470]" />
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
                  <Phone className="w-4 h-4 text-[#0B3470]" />
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
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#0B3470] to-[#0B3490]/60 rounded-full" />
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
                  <MapPin className="w-4 h-4 text-[#0B3470]" />
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
                  <MapPin className="w-4 h-4 text-[#0B3470]" />
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

        {/* Social Links & Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Rooks Technologies. All rights reserved.
          </div>

          {/* <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Instagram size={20} />
            </a>
          </div> */}

          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default ROOKSServicesFooter;
