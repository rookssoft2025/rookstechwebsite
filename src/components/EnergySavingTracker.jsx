import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Leaf, X } from "lucide-react";
import { db } from "../firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  increment,
  getDoc,
  setDoc,
} from "firebase/firestore";

const EnergySavingTracker = ({ position = "fixed", className = "" }) => {
  const [clicks, setClicks] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Energy saved per click in milliwatts (mW)
  const ENERGY_PER_CLICK = 0.5; // Wh (watt-hours) saved per interaction on dark theme

  useEffect(() => {
    // Reference to the global energy stats document
    const statsRef = doc(db, "stats", "energy_tracker");

    // Initialize the document if it doesn't exist
    const initStats = async () => {
      const docSnap = await getDoc(statsRef);
      if (!docSnap.exists()) {
        await setDoc(statsRef, { totalInteractions: 0 });
      }
    };
    initStats();

    // Listen for real-time updates from Firebase
    const unsubscribe = onSnapshot(statsRef, (doc) => {
      if (doc.exists()) {
        setClicks(doc.data().totalInteractions || 0);
      }
    });

    // Function to update global interactions in Firebase
    const updateGlobalInteractions = async () => {
      try {
        await updateDoc(statsRef, {
          totalInteractions: increment(1),
        });
      } catch (error) {
        console.error("Error updating energy stats:", error);
      }
    };

    // Track user interactions locally and sync occasionally
    let localBuffer = 0;
    const syncInterval = 5000; // Sync every 5 seconds if there are changes

    const handleInteraction = () => {
      localBuffer++;
    };

    const syncWithFirebase = async () => {
      if (localBuffer > 0) {
        try {
          await updateDoc(statsRef, {
            totalInteractions: increment(localBuffer),
          });
          localBuffer = 0;
        } catch (error) {
          console.error("Error syncing energy stats:", error);
        }
      }
    };

    const intervalId = setInterval(syncWithFirebase, syncInterval);

    // Track clicks and one-time scroll
    window.addEventListener("click", handleInteraction);

    const scrollHandler = () => {
      handleInteraction();
      window.removeEventListener("scroll", scrollHandler);
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      unsubscribe();
      clearInterval(intervalId);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("scroll", scrollHandler);
      syncWithFirebase(); // Final sync on unmount
    };
  }, []);

  // Calculate energy saved
  const energySavedWh = (clicks * ENERGY_PER_CLICK).toFixed(2);
  const co2Saved = (energySavedWh * 0.0005).toFixed(3);

  if (!isVisible) return null;

  // choose container classes based on position prop
  const positionClasses =
    position === "fixed"
      ? "fixed bottom-6 left-6 z-50"
      : position === "relative"
        ? "relative"
        : position; // allow custom class expression if provided

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className={`${positionClasses} ${className}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Compact View
          <motion.div
            key="compact"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative group cursor-pointer"
          >
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-4 shadow-2xl shadow-emerald-500/30 border border-emerald-400/30 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Leaf className="text-white animate-pulse" size={24} />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
                <div className="text-white">
                  <p className="text-xs font-medium opacity-90">Energy Saved</p>
                  <p className="text-lg font-bold">{energySavedWh} Wh</p>
                </div>
              </div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                Hover to see details
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </motion.div>
        ) : (
          // Expanded View
          <motion.div
            key="expanded"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-emerald-900/95 via-teal-900/95 to-emerald-900/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl shadow-emerald-500/30 border border-emerald-400/30 min-w-[280px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Leaf className="text-emerald-400" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Eco Impact</h3>
                  <p className="text-emerald-300 text-[10px]">
                    Dark Mode Savings
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="text-white/70" size={16} />
              </button>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <StatRow
                icon={<Zap size={14} className="text-yellow-400" />}
                label="Interactions"
                value={clicks.toLocaleString()}
              />
              <StatRow
                icon={<Zap size={14} className="text-blue-400" />}
                label="Energy Saved"
                value={`${energySavedWh} Wh`}
              />
              <StatRow
                icon={<Leaf size={14} className="text-emerald-400" />}
                label="CO₂ Reduced"
                value={`${co2Saved} kg`}
              />
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <p className="text-emerald-200 text-[10px] text-center leading-relaxed">
                🌍 Every interaction on our dark theme saves energy compared to
                white backgrounds
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const StatRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between bg-white/5 rounded-lg p-2 border border-white/10">
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-white/80 text-xs">{label}</span>
    </div>
    <span className="text-white font-bold text-sm">{value}</span>
  </div>
);

export default EnergySavingTracker;
