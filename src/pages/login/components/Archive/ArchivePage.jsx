import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ChevronRight,
  FileText,
  Loader2,
  Search,
  User,
} from "lucide-react";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import { fetchAllByTeam } from "../../../../services/MamReviewService";
import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";

const TABS = [
  { key: "all", label: "All Teams" },
  { key: "coding", label: "Coding Teams" },
  { key: "writing", label: "Writing Teams" },
  { key: "proposal", label: "Proposal Teams" },
];

const isCompleted = (status) => {
  if (!status) return false;
  const s = String(status).toLowerCase();
  // Treat common completion terms as complete
  return ["completed", "complete", "done", "published", "finished"].some((k) =>
    s.includes(k)
  );
};

const ArchivePage = () => {
  const navigate = useNavigate();

  // Layout state
  const [activeTab, setActiveTab] = useState("archive");

  // Page state
  const [teamTab, setTeamTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Data state
  const [teamsData, setTeamsData] = useState({
    coding: [],
    journals: [],
    papers: [],
    proposals: [],
  });

  // Logout handler
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);
    try {
      await signOut(auth);
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberMe");
      sessionStorage.removeItem("isLoggedIn");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert(`Logout failed: ${error.message}`);
      setIsLoggingOut(false);
    }
  };

  // Fetch from backend
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllByTeam();
        if (mounted) setTeamsData(data);
      } catch (e) {
        console.error("Failed to load archive data", e);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Build list by selected tab
  const items = useMemo(() => {
    let list = [];
    if (teamTab === "all") {
      list = [
        ...teamsData.coding,
        ...teamsData.papers,
        ...teamsData.proposals,
        ...teamsData.journals,
      ];
    } else if (teamTab === "coding") {
      list = teamsData.coding;
    } else if (teamTab === "writing") {
      list = teamsData.papers;
    } else if (teamTab === "proposal") {
      list = teamsData.proposals;
    }

    // Only show completed
    list = list.filter((i) => isCompleted(i.status));

    // Optional search
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter(
        (i) =>
          (i.title && i.title.toLowerCase().includes(q)) ||
          (i.typeLabel && i.typeLabel.toLowerCase().includes(q)) ||
          (i.assignedTo && String(i.assignedTo).toLowerCase().includes(q))
      );
    }

    // Sort by end/deadline/start date desc if exists, else by title
    const parseDate = (d) => (d ? new Date(d) : null);
    list.sort((a, b) => {
      const bDate = parseDate(b.endDate || b.deadline || b.startDate);
      const aDate = parseDate(a.endDate || a.deadline || a.startDate);
      if (bDate && aDate) return bDate - aDate;
      if (bDate) return 1;
      if (aDate) return -1;
      return String(a.title || "").localeCompare(String(b.title || ""));
    });

    return list;
  }, [teamTab, teamsData, searchTerm]);

  const formatDate = (d) => {
    if (!d) return "-";
    try {
      return new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return String(d);
    }
  };

  return (
    <ReserchLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      isLoading={isLoggingOut}
    >
      <div className="min-h-screen bg-gradient-to-br from-black-900 via-white-900 to-white-900 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
                  Archive
                </h1>
                <p className="text-blue-200">Only completed works are listed</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-white-800/30 backdrop-blur-sm rounded-xl border border-blue-700/30">
                  <span className="text-blue-200 text-sm">Updated: Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTeamTab(t.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    teamTab === t.key
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "bg-blue-900/30 text-blue-200 hover:bg-blue-800/30 border border-blue-700/30"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300" size={20} />
              <input
                type="text"
                placeholder="Search by title, team or member"
                className="w-full pl-12 pr-4 py-3 bg-blue-900/30 backdrop-blur-sm border-2 border-blue-700/30 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-16 text-blue-200">
              <Loader2 className="animate-spin mr-3" /> Loading...
            </div>
          )}

          {/* Results Count */}
          {!isLoading && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-blue-200 text-lg">
                Showing <span className="font-semibold text-white">{items.length}</span>
              </p>
            </div>
          )}

          {/* Items */}
          {!isLoading && (
            <div className="space-y-6">
              {items.map((it, idx) => (
                <div key={`${it.type}-${it.id}-${idx}`} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-blue-900/40 via-blue-900/30 to-indigo-900/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30 rounded-full text-sm font-medium">
                                Completed
                              </span>
                              <span className="px-3 py-1 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-blue-200 rounded-full text-sm border border-blue-500/30">
                                {it.typeLabel || it.type}
                              </span>
                              <span className="flex items-center text-blue-300 text-sm">
                                <Calendar size={14} className="mr-1" />
                                {formatDate(it.endDate || it.deadline || it.startDate)}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                              {it.title || "Untitled"}
                            </h3>
                            <div className="flex items-center text-blue-200">
                              <User size={16} className="mr-2" />
                              <span>{it.assignedTo || "-"}</span>
                            </div>
                          </div>
                        </div>

                        {it.details && (
                          <p className="text-blue-100 mb-4 line-clamp-2">{it.details}</p>
                        )}

                        <div className="flex items-center gap-6 text-sm text-blue-300">
                          <span className="flex items-center">
                            <FileText size={14} className="mr-1" />
                            ID: {it.id}
                          </span>
                        </div>
                      </div>

                      <div className="flex lg:flex-col items-center lg:items-end gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-blue-900/30 text-blue-200 border-2 border-blue-700/30 rounded-xl hover:bg-blue-800/30 hover:border-blue-500/50 transition-all duration-300 min-w-[140px] justify-center">
                          <span>View Details</span>
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && items.length === 0 && (
            <div className="text-center py-16">
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-30"></div>
                <div className="relative bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-xl p-8 rounded-3xl border border-blue-700/30">
                  <FileText size={64} className="mx-auto text-blue-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">No completed works found</h3>
                  <p className="text-blue-200 max-w-md mx-auto mb-6">
                    Try switching tabs or clearing the search.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ReserchLayout>
  );
};

export default ArchivePage;
