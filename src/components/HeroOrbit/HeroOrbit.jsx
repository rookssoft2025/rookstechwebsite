import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroApps = ({ onAppClick }) => {
  const [hoveredApp, setHoveredApp] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);

  // Sample app data
  const apps = [
    { id: 1, name: "Analytics", icon: "/icons/analytics.svg", color: "from-blue-500 to-cyan-400", description: "Real-time data insights" },
    { id: 2, name: "CRM", icon: "/icons/crm.svg", color: "from-purple-500 to-pink-400", description: "Customer management" },
    { id: 3, name: "AI Chat", icon: "/icons/ai.svg", color: "from-emerald-500 to-teal-400", description: "Smart conversations" },
    { id: 4, name: "Cloud", icon: "/icons/cloud.svg", color: "from-orange-500 to-amber-400", description: "Secure storage" },
    { id: 5, name: "Analytics", icon: "/icons/analytics.svg", color: "from-blue-500 to-cyan-400", description: "Real-time data insights" },
    { id: 6, name: "CRM", icon: "/icons/crm.svg", color: "from-purple-500 to-pink-400", description: "Customer management" },
    { id: 7, name: "AI Chat", icon: "/icons/ai.svg", color: "from-emerald-500 to-teal-400", description: "Smart conversations" },
    { id: 8, name: "Cloud", icon: "/icons/cloud.svg", color: "from-orange-500 to-amber-400", description: "Secure storage" },
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Apps</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover our suite of powerful applications designed to transform your workflow
        </p>
      </motion.div>

      {/* Apps Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            onClick={() => {
              setSelectedApp(app.id);
              onAppClick?.(app);
            }}
            onHoverStart={() => setHoveredApp(app.id)}
            onHoverEnd={() => setHoveredApp(null)}
            className={`
              relative bg-[#0F2239]/80 backdrop-blur-xl rounded-2xl p-6 
              border transition-all duration-300 cursor-pointer
              ${hoveredApp === app.id 
                ? 'border-sky-400/60 shadow-[0_0_40px_rgba(56,189,248,0.15)]' 
                : 'border-sky-400/10 hover:border-sky-400/30'
              }
              ${selectedApp === app.id ? 'ring-2 ring-sky-400' : ''}
            `}
          >
            {/* Icon with gradient background */}
            <motion.div
              className={`w-16 h-16 rounded-xl bg-gradient-to-br ${app.color} p-0.5 mb-4`}
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full h-full bg-[#0A1428] rounded-xl flex items-center justify-center">
                <img src={app.icon} alt={app.name} className="w-8 h-8" />
              </div>
            </motion.div>

            {/* App Name */}
            <h3 className="text-white font-semibold text-lg mb-1">
              {app.name}
            </h3>
            
            {/* Description */}
            <p className="text-gray-400 text-sm">
              {app.description}
            </p>

            {/* Glow effect on hover */}
            {hoveredApp === app.id && (
              <motion.div
                layoutId="glow"
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-400/5 to-blue-500/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}

            {/* Arrow indicator */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: hoveredApp === app.id ? 1 : 0,
                x: hoveredApp === app.id ? 0 : -10
              }}
              className="absolute top-4 right-4 text-sky-400"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeroApps;