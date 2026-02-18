import React, { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReserchHeader = ({
  sidebarOpen,
  setSidebarOpen,
  onLogout,
  isLoading,
}) => {
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
      {/* HEADER */}
      <header className="bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">

          {/* LEFT SECTION */}
          <div className="flex items-center space-x-4">

            {/* Menu button ONLY (no X here) */}
            {!sidebarOpen && (
              <motion.button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu size={22} />
              </motion.button>
            )}

            {/* Optional title */}
            <div className="hidden sm:block">
              <h2 className="text-lg font-semibold text-gray-800">
                Research Dashboard
              </h2>
              <p className="text-xs text-gray-500">
                Manage proposals, journals and research workflow
              </p>
            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center">

            {/* Logout Button */}
            <motion.button
              onClick={openConfirm}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-xl transition shadow-sm hover:shadow disabled:opacity-50"
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

      {/* LOGOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 border border-gray-200 shadow-2xl"
            >

              {/* Header */}
              <div className="flex items-start mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-50 border border-red-100 mr-4">
                  <LogOut className="w-6 h-6 text-red-500" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Confirm Logout
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    You're about to sign out of your account
                  </p>
                </div>
              </div>

              {/* Body */}
              <p className="text-gray-700 mb-8 pl-16 text-sm">
                Are you sure you want to logout? Any unsaved changes will be lost.
              </p>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">

                <motion.button
                  onClick={closeConfirm}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </motion.button>

                <motion.button
                  onClick={handleConfirmLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-medium shadow-md"
                >
                  Yes, Logout
                </motion.button>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReserchHeader;
