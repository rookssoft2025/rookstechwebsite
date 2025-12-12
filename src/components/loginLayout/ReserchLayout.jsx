import React, { useState } from "react";
import Sidebar from "./ReserchSidebar";
import Header from "./ReserchHeader";

const ReserchLayout = ({ children, onLogout, isLoading, activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // adjust these widths if your Sidebar component uses a different width
  const sidebarWidth = sidebarOpen ? "w-60" : "w-0";
  const sidebarMargin = sidebarOpen ? "md:ml-80" : "md:ml-5";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Fixed Sidebar */}
      <aside
        className={`${sidebarWidth} fixed left-0 top-0 h-screen z-30`}
        aria-hidden={!sidebarOpen}
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
          isLoading={isLoading}
        />
      </aside>

      {/* Right content (header + scrollable children) */}
      <div className={`${sidebarMargin} flex flex-col min-h-screen`}>
        {/* Header stays visible (sticky) */}
        <header className="sticky top-0 z-20">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onLogout={onLogout}
            isLoading={isLoading}
          />
        </header>

        {/* Scrollable main area */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReserchLayout;