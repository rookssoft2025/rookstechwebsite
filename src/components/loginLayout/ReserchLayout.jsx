// src/components/layout/Layout.jsx

import React, { useState } from "react";
import Sidebar from "./ReserchSidebar";
import Header from "./ReserchHeader";

const ReserchLayout = ({ children, onLogout, isLoading, activeTab, setActiveTab }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex relative overflow-hidden">
            
            <Sidebar 
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={onLogout}
                isLoading={isLoading}
            />

            <div className="flex-1 flex flex-col min-h-screen relative z-10">
                
                <Header 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    onLogout={onLogout}
                    isLoading={isLoading}
                />

                <main className="flex-1 p-6 overflow-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ReserchLayout;