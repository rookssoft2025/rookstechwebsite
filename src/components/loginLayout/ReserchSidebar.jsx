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
      initial={{ x: -400 }}
      animate={{ x: sidebarOpen ? 0 : -400 }}
      transition={{ type: "spring", damping: 20, stiffness: 260 }}
      className="fixed inset-y-0 left-0 w-full sm:w-96 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border-r border-slate-700 shadow-2xl z-50 overflow-hidden"
    >
      <div className="flex flex-col h-full p-6 sm:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-3 mb-8"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <BookOpen size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Rooks & Brooks</h1>
            <p className="text-indigo-200 text-sm">Research Platform</p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-6"></div>

        <nav className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * index }}
              onClick={() => {
                setActiveTab(item.id);
                if (item.route) {
                  navigate(item.route);
                }
              }}
              className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl transition-all duration-300 group text-left relative overflow-hidden ${
                activeTab === item.id
                  ? `bg-gradient-to-r ${item.color.replace(
                      "text-",
                      "from-"
                    )} to-opacity-10 shadow-lg border border-slate-600 text-white`
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50 border border-transparent"
              }`}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Active indicator */}
              {activeTab === item.id && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-blue-500 rounded-r-full"
                />
              )}

              <div
                className={`p-3 rounded-lg transition-all duration-300 flex-shrink-0 ${
                  activeTab === item.id
                    ? `bg-white/10 ${item.color}`
                    : "bg-slate-700 text-slate-400 group-hover:bg-slate-600 group-hover:text-slate-300"
                }`}
              >
                <item.icon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-semibold block text-base tracking-wide">
                  {item.label}
                </span>
                <span
                  className={`text-xs block mt-1 truncate ${
                    activeTab === item.id ? "text-indigo-200" : "text-slate-400"
                  }`}
                >
                  {item.description}
                </span>
              </div>
              {activeTab === item.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full flex-shrink-0 ring-2 ring-white/20"
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
          className="mt-auto pt-6 border-t border-slate-700"
        >
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gradient-to-r from-indigo-900/40 to-blue-900/40 border border-indigo-700/50 backdrop-blur-sm">
            <div className="w-11 h-11 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
              <Users size={18} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">Research Team</p>
              <p className="text-xs text-indigo-200">Active now</p>
            </div>
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-emerald-300 animate-pulse flex-shrink-0"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReserchSidebar;
