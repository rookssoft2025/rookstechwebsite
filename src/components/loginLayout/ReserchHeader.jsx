import React, { useState } from "react";
import { Search, Bell, Plus, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const ReserchHeader = ({ sidebarOpen, setSidebarOpen, onLogout, isLoading }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const openConfirm = () => setShowConfirm(true);
  const closeConfirm = () => setShowConfirm(false);

  const handleConfirmLogout = async () => {
    setShowConfirm(false);
    if (onLogout) {
      await onLogout();
    }
  };

  return (
    <>
      <header className="bg-black/40 backdrop-blur-xl border-b border-white/10 p-6">
        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white/70 hover:text-white transition-colors duration-300 lg:hidden"
            >
              <span className="text-xl">☰</span>
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Search papers, authors, topics..."
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent backdrop-blur-sm w-80"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-white/70 hover:text-white transition-colors duration-300">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <motion.button
              onClick={openConfirm}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Logging out...</span>
                </>
              ) : (
                <>
                  <LogOut size={20} />
                  <span>Logout</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Confirmation Modal - Outside of header for proper centering */}
      {showConfirm && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 w-full max-w-md mx-4 border border-white/10 shadow-2xl"
          >
            <div className="flex items-start mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/20 mr-3">
                <LogOut className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Confirm Logout</h3>
                <p className="text-white/60 text-sm mt-1">You're about to sign out of your account</p>
              </div>
            </div>

            <p className="text-white/70 mb-6 pl-13">Are you sure you want to logout? Any unsaved changes will be lost.</p>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <motion.button
                onClick={closeConfirm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleConfirmLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 transition-all shadow-lg"
              >
                Yes, Logout
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ReserchHeader;