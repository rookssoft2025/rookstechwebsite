import React, { useState } from "react";
import { Search, Bell, Plus, LogOut, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const ReserchHeader = ({
  sidebarOpen,
  setSidebarOpen,
  onLogout,
  isLoading,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

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
      <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200 lg:hidden"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <motion.div 
              className="relative"
              animate={{
                width: searchFocused ? "420px" : "360px"
              }}
              transition={{ duration: 0.2 }}
            >
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search papers, authors, topics..."
                className="pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 backdrop-blur-sm w-full transition-all duration-200"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </motion.div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors duration-200 group"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
              <div className="absolute -bottom-10 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded-lg whitespace-nowrap">
                  Notifications
                </div>
              </div>
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white rounded-xl transition-all duration-200 shadow-md hover:shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
            >
              <Plus size={18} />
              <span className="font-medium">New Project</span>
            </motion.button>

            <motion.button
              onClick={openConfirm}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-600 rounded-full animate-spin" />
                  <span className="font-medium">Logging out...</span>
                </>
              ) : (
                <>
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md mx-4 border border-gray-300 shadow-2xl"
          >
            <div className="flex items-start mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 border border-red-100 mr-4">
                <LogOut className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Confirm Logout
                </h3>
                <p className="text-gray-600 text-sm mt-1.5">
                  You're about to sign out of your account
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-8 pl-16 text-sm leading-relaxed">
              Are you sure you want to logout? Any unsaved changes in your current session will be lost.
            </p>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <motion.button
                onClick={closeConfirm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleConfirmLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-medium transition-all shadow-md hover:shadow-lg shadow-red-500/20"
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