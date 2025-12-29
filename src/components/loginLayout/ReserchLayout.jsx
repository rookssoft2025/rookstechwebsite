import React, { useState } from "react";
import { motion } from "framer-motion"; // Add this import
import Sidebar from "./ReserchSidebar";
import Header from "./ReserchHeader";

const ReserchLayout = ({ children, onLogout, isLoading, activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Adjust these widths if your Sidebar component uses a different width
  const sidebarWidth = sidebarOpen ? "w-80" : "w-0";
  const sidebarMargin = sidebarOpen ? "md:ml-80" : "md:ml-0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Fixed Sidebar with shadow */}
      <aside
        className={`${sidebarWidth} fixed left-0 top-0 h-screen z-30 transition-all duration-300 ease-in-out`}
        aria-hidden={!sidebarOpen}
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </aside>

      {/* Right content (header + scrollable children) */}
      <div className={`${sidebarMargin} flex flex-col min-h-screen transition-all duration-300 ease-in-out`}>
        {/* Header stays visible (sticky) */}
        <header className="sticky top-0 z-20 shadow-sm">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onLogout={onLogout}
            isLoading={isLoading}
          />
        </header>

        {/* Scrollable main area */}
        <main className="flex-1 overflow-auto p-6 bg-gradient-to-b from-white to-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Optional footer */}
        <footer className="py-4 px-6 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-600">
            <div>
              <span className="font-medium">Rooks and Brooks</span>
              <span className="mx-2">•</span>
              <span>Journal Publishing Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Help</a>
              <span className="text-gray-400">v1.0.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ReserchLayout;