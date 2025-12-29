import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Code,
  Edit,
  Users,
  BookOpen,
  X,
  BarChart,
  ArchiveIcon,
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
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
    {
      id: "coding",
      label: "Coding Team",
      icon: Code,
      description: "Manage research code & algorithms",
      route: "/dashboard/coding-page",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      id: "writing",
      label: "Writing Team",
      icon: Edit,
      description: "Write & edit research papers",
      route: "/dashboard/paper-writing-page",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      id: "journal",
      label: "Journal Team",
      icon: BookOpen,
      description: "Find suitable journals",
      route: "/dashboard/journal-page",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
    },
    {
      id: "main-review",
      label: "Main Review",
      icon: Users,
      description: "Internal review process",
      route: "/dashboard/mam-review-page",
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
    },
    {
      id: "overview",
      label: "Reports",
      icon: BarChart,
      description: "Dashboard & analytics",
      route: "/dashboard/reports-page",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
    },
    {
      id: "archive",
      label: "Archive",
      icon: ArchiveIcon,
      description: "Completed & archived records",
      route: "/dashboard/archive-page",
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      borderColor: "border-slate-200",
    },
  ];

  const getSectionContent = (sectionId) => {
    const contents = {
      proposal: {
        stats: { drafts: 5, submitted: 12, approved: 8 },
        color: "from-indigo-400 to-indigo-500",
      },
      coding: {
        stats: { repositories: 15, commits: 234, languages: 6 },
        color: "from-emerald-400 to-emerald-500",
      },
      writing: {
        stats: { drafts: 8, inProgress: 3, completed: 15 },
        color: "from-amber-400 to-amber-500",
      },
      journal: {
        stats: { saved: 12, submitted: 8, published: 5 },
        color: "from-rose-400 to-rose-500",
      },
      "main-review": {
        stats: { pending: 7, inReview: 4, completed: 23 },
        color: "from-violet-400 to-violet-500",
      },
      overview: {
        stats: { papers: 24, citations: 156, rating: 4.8 },
        color: "from-cyan-400 to-cyan-500",
      },
    };
    return contents[sectionId] || contents.overview;
  };

  const currentSection = getSectionContent(activeTab);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -300 }}
      transition={{ type: "spring", damping: 20 }}
      className="fixed inset-y-0 left-0 w-80 bg-gradient-to-b from-white to-gray-50 backdrop-blur-lg border-r border-gray-200 shadow-xl z-50 lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 xl:static xl:w-80 xl:translate-x-0"
    >
      <div className="flex flex-col h-full p-6">
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Rooks and Brooks</h1>
              <p className="text-gray-500 text-xs">
                Journal Publishing Platform
              </p>
            </div>
          </motion.div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors duration-300 p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto">
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => {
                setActiveTab(item.id);
                if (item.route) {
                  navigate(item.route);
                }
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 group text-left relative overflow-hidden ${
                activeTab === item.id
                  ? `${item.bgColor} ${item.borderColor} border-2 shadow-md shadow-gray-200/50 text-gray-900`
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-100 border border-transparent"
              }`}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active indicator */}
              {activeTab === item.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute left-0 top-0 bottom-0 w-1 ${item.bgColor.replace('bg-', 'bg-').replace('50', '400')} rounded-r-full`}
                />
              )}
              
              <div
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  activeTab === item.id
                    ? `${item.bgColor.replace('50', '100')} ${item.color}`
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700"
                }`}
              >
                <item.icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold block text-sm tracking-wide">
                  {item.label}
                </span>
                <span className="text-xs text-gray-500 block mt-0.5 truncate">
                  {item.description}
                </span>
              </div>
              {activeTab === item.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`w-2.5 h-2.5 ${item.bgColor.replace('bg-', 'bg-').replace('50', '400')} rounded-full ring-2 ring-white`}
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Footer/User section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-auto pt-6 border-t border-gray-100"
        >
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100">
            <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center shadow">
              <Users size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Research Team</p>
              <p className="text-xs text-gray-600">Active now</p>
            </div>
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-emerald-100 animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReserchSidebar;