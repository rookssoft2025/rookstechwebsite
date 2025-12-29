import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ChevronRight,
  FileText,
  Loader2,
  Search,
  User,
  CheckCircle,
  FolderArchive,
  Filter,
  X,
  Grid,
  List,
} from "lucide-react";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import { fetchAllByTeam } from "../../../../services/MamReviewService";
import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";

const TABS = [
  { key: "all", label: "All Teams", color: "from-gray-400 to-gray-600" },
  { key: "coding", label: "Coding", color: "from-blue-400 to-blue-600" },
  { key: "writing", label: "Writing", color: "from-amber-400 to-amber-600" },
  { key: "proposal", label: "Proposal", color: "from-emerald-400 to-emerald-600" },
];

const TEAM_COLORS = {
  coding: "border-l-blue-500",
  writing: "border-l-amber-500",
  proposal: "border-l-emerald-500",
  journals: "border-l-violet-500",
};

const TEAM_BG_COLORS = {
  coding: "bg-blue-50",
  writing: "bg-amber-50",
  proposal: "bg-emerald-50",
  journals: "bg-violet-50",
};

const getTeamColor = (item) => {
  if (item.type === "coding") return TEAM_COLORS.coding;
  if (item.type === "papers" || item.type === "writing") return TEAM_COLORS.writing;
  if (item.type === "proposals") return TEAM_COLORS.proposal;
  if (item.type === "journals") return TEAM_COLORS.journals;
  return "border-l-gray-400";
};

const getTeamBgColor = (item) => {
  if (item.type === "coding") return TEAM_BG_COLORS.coding;
  if (item.type === "papers" || item.type === "writing") return TEAM_BG_COLORS.writing;
  if (item.type === "proposals") return TEAM_BG_COLORS.proposal;
  if (item.type === "journals") return TEAM_BG_COLORS.journals;
  return "bg-gray-50";
};

const isCompleted = (status) => {
  if (!status) return false;
  const s = String(status).toLowerCase();
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
  const [viewMode, setViewMode] = useState("grid"); // Add view mode state: 'grid' or 'list'

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

  // Get completion count
  const getCompletionStats = () => {
    const totalCompleted = items.length;
    const totalItems = Object.values(teamsData).flat().length;
    return { totalCompleted, totalItems };
  };

  const stats = getCompletionStats();

  // Render Grid View
  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((it, idx) => (
        <div 
          key={`${it.type}-${it.id}-${idx}`} 
          className={`bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group ${getTeamColor(it)} border-l-4`}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle size={12} />
                    Completed
                  </span>
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {it.typeLabel || it.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {it.title || "Untitled"}
                </h3>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <User size={16} className="mr-2 text-gray-400" />
                <span className="font-medium">{it.assignedTo || "Unassigned"}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={16} className="mr-2 text-gray-400" />
                <span>Completed: {formatDate(it.endDate || it.deadline || it.startDate)}</span>
              </div>

              {it.details && (
                <p className="text-sm text-gray-600 line-clamp-2 pt-3 border-t border-gray-100">
                  {it.details}
                </p>
              )}

              <div className="text-xs text-gray-500 pt-2">
                <span className="font-medium">ID:</span> {it.id}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200">
                <span className="font-medium">View Details</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Render List View
  const renderListView = () => (
    <div className="space-y-4">
      {items.map((it, idx) => (
        <div 
          key={`${it.type}-${it.id}-${idx}`} 
          className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group ${getTeamColor(it)} border-l-4`}
        >
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center gap-1.5">
                    <CheckCircle size={14} />
                    Completed
                  </span>
                  <span className={`px-3 py-1 ${getTeamBgColor(it)} text-gray-700 rounded-full text-sm font-medium`}>
                    {it.typeLabel || it.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {it.title || "Untitled"}
                </h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-gray-400" />
                    <span className="font-medium">{it.assignedTo || "Unassigned"}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    <span>Completed: {formatDate(it.endDate || it.deadline || it.startDate)}</span>
                  </div>
                  
                  <div className="text-gray-500">
                    <span className="font-medium">ID:</span> {it.id}
                  </div>
                </div>
                
                {it.details && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {it.details}
                  </p>
                )}
              </div>
              
              {/* Right Section - Actions */}
              <div className="flex flex-col gap-3 md:w-48">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 font-medium">
                  <span>View Details</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="font-medium mb-1">Quick Info</div>
                  <div>Type: {it.type || "N/A"}</div>
                  <div>Status: {it.status || "N/A"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <ReserchLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      isLoading={isLoggingOut}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                    <FolderArchive className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                      Archive
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Completed works repository
                    </p>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-700 text-sm">
                        <span className="font-bold text-gray-900">{stats.totalCompleted}</span> completed works
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <span className="text-gray-700 text-sm">
                      Total items: <span className="font-bold text-gray-900">{stats.totalItems}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-3">
                <div className="bg-white border border-gray-300 rounded-xl p-1 flex">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                      viewMode === "grid" 
                        ? "bg-blue-50 text-blue-700 border border-blue-200" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Grid size={18} />
                    <span className="font-medium">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                      viewMode === "list" 
                        ? "bg-blue-50 text-blue-700 border border-blue-200" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <List size={18} />
                    <span className="font-medium">List</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by title, team, or member..."
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              {/* Quick Filters */}
              <div className="flex gap-2">
                <button
                  onClick={() => setTeamTab("all")}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${teamTab === "all" ? "bg-gradient-to-r from-gray-800 to-gray-900 text-white" : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setTeamTab("coding")}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${teamTab === "coding" ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white" : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"}`}
                >
                  Coding
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTeamTab(t.key)}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 shadow-sm border ${teamTab === t.key ? `bg-gradient-to-r ${t.color} text-white border-transparent shadow-md` : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"}`}
                >
                  {t.label}
                  {teamTab === t.key && (
                    <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {items.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <p className="text-gray-600 mt-4 text-lg">Loading archive data...</p>
            </div>
          )}

          {/* Results Header */}
          {!isLoading && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Completed Works ({items.length})
                </h2>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `Found ${items.length} result${items.length !== 1 ? 's' : ''} for "${searchTerm}"`
                    : `Showing all completed work${items.length !== 1 ? 's' : ''} in ${viewMode} view`
                  }
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                  Sorted by: <span className="font-medium text-gray-800">Completion Date (Newest)</span>
                </div>
                <div className="text-sm text-gray-500">
                  View: <span className="font-medium text-gray-700 capitalize">{viewMode}</span>
                </div>
              </div>
            </div>
          )}

          {/* Items */}
          {!isLoading && items.length > 0 && (
            <>
              {viewMode === "grid" ? renderGridView() : renderListView()}
            </>
          )}

          {/* Empty State */}
          {!isLoading && items.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-block p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl border-2 border-blue-100 max-w-lg">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-30"></div>
                  <FolderArchive size={80} className="relative text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {searchTerm ? "No results found" : "Archive is empty"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? `No completed works match "${searchTerm}". Try different keywords.`
                    : "There are no completed works in the archive yet."
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-5 py-2.5 bg-white text-gray-700 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ReserchLayout>
  );
};

export default ArchivePage;