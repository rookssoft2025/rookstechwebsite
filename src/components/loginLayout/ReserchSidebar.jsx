import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Code,
  Edit,
  Users,
  BookOpen,
  BarChart,
  ArchiveIcon,
  CheckCircle,
  X,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

const ReserchSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
}) => {
  const navigate = useNavigate();

  const navigationItems = [
    {
      id: "proposal",
      label: "Proposal Team",
      icon: FileText,
      description: "Create & manage research proposals",
      route: "/dashboard/proposal",
      color: "text-indigo-600",
    },
    {
      id: "coding",
      label: "Coding Team",
      icon: Code,
      description: "Manage research code & algorithms",
      route: "/dashboard/coding-page",
      color: "text-emerald-600",
    },
    {
      id: "writing",
      label: "Writing Team",
      icon: Edit,
      description: "Write & edit research papers",
      route: "/dashboard/paper-writing-page",
      color: "text-amber-600",
    },
    {
      id: "journal",
      label: "Journal Team",
      icon: BookOpen,
      description: "Find suitable journals",
      route: "/dashboard/journal-page",
      color: "text-rose-600",
    },
    {
      id: "main-review",
      label: "Main Review",
      icon: Users,
      description: "Internal review process",
      route: "/dashboard/mam-review-page",
      color: "text-violet-600",
    },
    {
      id: "overview",
      label: "Reports",
      icon: BarChart,
      description: "Dashboard & analytics",
      route: "/dashboard/reports-page",
      color: "text-cyan-600",
    },
    {
      id: "archive",
      label: "Archive",
      icon: ArchiveIcon,
      description: "Completed & archived records",
      route: "/dashboard/archive-page",
      color: "text-slate-600",
    },
    {
      id: "application-review",
      label: "Application Review",
      icon: CheckCircle,
      description: "Review job applications",
      route: "/dashboard/application-review",
      color: "text-pink-600",
    },
    {
      id: "assessment",
      label: "Assessment Details",
      icon: FileText,
      description: "View assessment details",
      route: "/dashboard/assessment-details",
      color: "text-teal-600",
    },
    {
      id: "client-enquiry",
      label: "Client Enquiry",
      icon: Mail,
      description: "View website enquiries",
      route: "/dashboard/client-enquiry",
      color: "text-[#0b3470]",
    },
  ];

  return (
    <motion.div
      initial={{ x: -400 }}
      animate={{ x: sidebarOpen ? 0 : -400 }}
      transition={{ type: "spring", damping: 20, stiffness: 260 }}
      className="fixed inset-y-0 left-0 w-full sm:w-80 bg-slate-900 border-r border-slate-700 shadow-xl z-50 overflow-hidden"
    >
      <div className="flex flex-col h-full p-4 sm:p-6">

        {/* ================= HEADER ================= */}
        <div className="relative flex items-center mb-8">

          {/* Logo + Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <BookOpen size={22} className="text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                Rooks & Brooks
              </h1>
              <p className="text-indigo-200 text-xs">
                Research Platform
              </p>
            </div>
          </motion.div>

          {/* CLOSE BUTTON — visible on ALL devices */}
          <motion.button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-0 top-0 p-2 hover:bg-slate-700/50 rounded-lg transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={22} className="text-white" />
          </motion.button>

        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6" />

        {/* ================= NAVIGATION ================= */}
        <nav className="space-y-2 flex-1 overflow-y-auto">

          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * index }}
              onClick={() => {
                setActiveTab(item.id);
                navigate(item.route);
              }}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 text-left relative
              
              ${activeTab === item.id
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }
              
              `}
            >
              {/* Active indicator */}
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full"
                />
              )}

              {/* Icon */}
              <div
                className={`p-2 rounded-lg
                
                ${activeTab === item.id
                    ? "bg-white/20 text-white"
                    : "bg-slate-700 text-slate-400"
                  }
                
                `}
              >
                <item.icon size={20} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="font-semibold text-sm">
                  {item.label}
                </div>

                <div className="text-xs text-slate-400">
                  {item.description}
                </div>
              </div>

              {/* Active dot */}
              {activeTab === item.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-indigo-400 rounded-full"
                />
              )}

            </motion.button>
          ))}

        </nav>

        {/* ================= FOOTER ================= */}
        <div className="pt-4 border-t border-slate-700 text-center text-xs text-slate-400">
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-white">
            Terms
          </a>
        </div>

      </div>
    </motion.div>
  );
};

export default ReserchSidebar;
