import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import ebricksLogo from "../../assets/mobile_apps_asstes/ebricks.png";

const EBricksNavbar = ({ onCTAClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  // Nav items based on landing content
  const navItems = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features" },
    { id: "why-choose", label: "Why Us" },
    { id: "pricing", label: "Pricing" },
    { id: "cta", label: "Get Started" },
  ];

  // Handle scroll for navbar style and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map((item) => document.getElementById(item.id));

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Smooth scroll to section
  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#071324]/90 backdrop-blur-lg border-b border-[#0B3470]/30 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* eBricks Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick("hero")}
          >
            <img
              src={ebricksLogo}
              alt="eBricks"
              className="h-12 w-auto object-contain"
            />
            <span className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              eBricks
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-[#4ec9ff] drop-shadow-[0_0_8px_rgba(78,201,255,0.5)]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCTAClick}
              className="group relative px-6 py-3 bg-gradient-to-r from-[#0B3470] to-[#1a4a8a] rounded-xl flex items-center gap-2 font-semibold overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1a4a8a] to-[#0B3470]"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="bg-[#11192a]/95 backdrop-blur-xl rounded-2xl border border-[#0B3470]/30 p-6">
                <ul className="space-y-3">
                  {navItems.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.indexOf(item) * 0.05 }}
                    >
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200 ${
                          activeSection === item.id
                            ? "bg-[#0B3470]/20 text-[#4ec9ff] border border-[#0B3470]/50"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </button>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 + 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onCTAClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-[#0B3470] to-[#1a4a8a] rounded-xl font-semibold text-white"
                >
                  Get Started Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default EBricksNavbar;
