import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Code,
  Edit,
  Users,
  BookOpen,
  Send,
  User,
  Award,
  LogOut,
  X,
  BarChart,
  WineIcon,
  ArchiveIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const ReserchSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
  onLogout,
  isLoading,
}) => {
 
  const navigate = useNavigate();
  const navigationItems = [
    {
      id: "proposal",
      label: "Proposal Team",
      icon: FileText,
      description: "Create & manage research proposals",
      route: "/dashboard/proposal",
    },
    {
      id: "coding",
      label: "Coding Team",
      icon: Code,
      description: "Manage research code & algorithms",
      route: "/dashboard/coding-page",
    },
    {
      id: "writing",
      label: "Writing Team",
      icon: Edit,
      description: "Write & edit research papers",
      route: "/dashboard/paper-writing-page",
    },
    {
      id: "journal",
      label: "Journal Team",
      icon: BookOpen,
      description: "Find suitable journals",
      route: "/dashboard/journal-page",

    },
    {
      id: "main-review",
      label: "Mam Review",
      icon: Users,
      description: "Internal review process",
      route: "/dashboard/mam-review-page",

    },

    {
      id: "overview",
      label: "Reports",
      icon: BarChart,
      description: "Dashboard & analytics",
      route: "/dashboard/reports-page",
    },
     {
      id: "archive",
      label: "Archive",
    icon: ArchiveIcon,
    description: "Completed & archived records",
      route: "/dashboard/archive-page",
    },
  ];

  const getSectionContent = (sectionId) => {
    const contents = {
      proposal: {
        stats: { drafts: 5, submitted: 12, approved: 8 },
        color: "from-purple-500 to-purple-600",
      },
      coding: {
        stats: { repositories: 15, commits: 234, languages: 6 },
        color: "from-blue-500 to-blue-600",
      },
      writing: {
        stats: { drafts: 8, inProgress: 3, completed: 15 },
        color: "from-green-500 to-green-600",
      },
      journal: {
        stats: { saved: 12, submitted: 8, published: 5 },
        color: "from-red-500 to-red-600",
      },
      "main-review": {
        stats: { pending: 7, inReview: 4, completed: 23 },
        color: "from-orange-500 to-orange-600",
      },

      overview: {
        stats: { papers: 24, citations: 156, rating: 4.8 },
        color: "from-cyan-500 to-cyan-600",
      },
    };
    return contents[sectionId] || contents.overview;
  };

  const currentSection = getSectionContent(activeTab);

  return (
    <div
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -300 }}
      className="fixed inset-y-0 left-0 w-80 bg-black/40 backdrop-blur-xl border-r border-white/10 z-50 lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 xl:static xl:w-80 xl:translate-x-0"
    >
      <div className="flex flex-col h-full p-6">
        {/* Header with close button for mobile */}
        <div className="flex items-center justify-between mb-8">
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Rooks and Brooks</h1>
              <p className="text-white/40 text-xs">
                journal Publishing Platform
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white transition-colors duration-300 p-1"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2 flex-1">
          {navigationItems.map((item, index) => (
            <button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => {
                setActiveTab(item.id);
                if (item.route) {
                  navigate(item.route);
                }
                if (window.innerWidth < 1024) {
                  setSidebarOpen(false);
                }
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group text-left ${
                activeTab === item.id
                  ? "bg-white/10 text-white border border-white/20 shadow-lg shadow-purple-500/10"
                  : "text-white/60 hover:text-white hover:bg-white/5 hover:border-white/10"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-2 rounded-lg transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600"
                    : "bg-white/5 group-hover:bg-white/10"
                }`}
              >
                <item.icon
                  size={18}
                  className={
                    activeTab === item.id ? "text-white" : "text-white/60"
                  }
                />
              </div>
              <div className="flex-1">
                <span className="font-medium block">{item.label}</span>
                <span className="text-xs text-white/40 block mt-0.5">
                  {item.description}
                </span>
              </div>
              {activeTab === item.id && (
                <div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ReserchSidebar;