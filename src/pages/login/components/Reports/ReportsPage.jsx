import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Calendar,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  CalendarCheck,
  BarChart,
  Code,
  FileText,
  BookOpen,
  Edit2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar as CalendarIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import {
  getWeeklyReports,
  getMonthlyReports,
  getYearlyReports,
  getCustomReports,
} from "../../../../services/ReportService";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";
// Load local avatar images from src/pages/login/assets and map by base filename
const localAvatars = import.meta.glob("../../assets/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default",
});
const avatarMap = Object.fromEntries(
  Object.entries(localAvatars).map(([path, url]) => {
    const file = path.split("/").pop();
    const base = file
      ? file.split(".").slice(0, -1).join(".").toLowerCase()
      : "";
    return [base, url];
  })
);

function getAvatarForName(name) {
  const raw = String(name || "").trim();
  if (!raw) return null;
  const base1 = raw.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (avatarMap[base1]) return avatarMap[base1];
  const first = raw.split(/\s+/)[0].toLowerCase();
  if (avatarMap[first]) return avatarMap[first];
  return null;
}

const teamsMeta = [
  {
    id: 1,
    key: "coding",
    name: "Coding Team",
    department: "Software Development",
    color: "bg-blue-500",
    icon: Code,
  },
  {
    id: 2,
    key: "proposal",
    name: "Proposal Team",
    department: "Research Proposals",
    color: "bg-green-500",
    icon: FileText,
  },
  {
    id: 3,
    key: "journal",
    name: "Journal Team",
    department: "Research Publications",
    color: "bg-purple-500",
    icon: BookOpen,
  },
  {
    id: 4,
    key: "writing",
    name: "Writing Team",
    department: "Technical Documentation",
    color: "bg-yellow-500",
    icon: Edit2,
  },
];

const timeFilterOptions = [
  {
    id: "weekly",
    label: "Weekly Report",
    icon: CalendarDays,
    color: "bg-blue-500",
  },
  {
    id: "monthly",
    label: "Monthly Report",
    icon: CalendarRange,
    color: "bg-purple-500",
  },
  {
    id: "yearly",
    label: "Yearly Report",
    icon: CalendarClock,
    color: "bg-green-500",
  },
  {
    id: "custom",
    label: "Custom Date Range",
    icon: CalendarCheck,
    color: "bg-cyan-500",
  },
];

function formatDate(date) {
  if (!date) return "-";
  const d =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;
  if (!(d instanceof Date) || isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Helper function to extract date based on team type
function getStartDate(item, teamKey) {
  // Check for startDate first (common for coding, writing, proposal)
  if (item.startDate) return item.startDate;

  // For journals, check uploadedDate
  if (teamKey === "journal" && item.uploadedDate) return item.uploadedDate;

  // Fallback to createdAt
  if (item.createdAt) return item.createdAt;

  return null;
}

function getEndDate(item, teamKey) {
  // For coding and writing, check deadline
  if ((teamKey === "coding" || teamKey === "writing") && item.deadline)
    return item.deadline;

  // For proposal, check endDate
  if (teamKey === "proposal" && item.endDate) return item.endDate;

  // For journal, check dateOfReview
  if (teamKey === "journal" && item.dateOfReview) return item.dateOfReview;

  // Fallback for all
  if (item.deadline) return item.deadline;
  if (item.endDate) return item.endDate;

  return null;
}

const ReportsPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("reports");
  const [isLoading, setIsLoading] = useState(false);

  const [timeFilter, setTimeFilter] = useState("weekly");
  const [teamFilter, setTeamFilter] = useState("all");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateRange, setShowDateRange] = useState(false);

  const [expandedTeams, setExpandedTeams] = useState({});

  const [reportData, setReportData] = useState({
    period: "",
    teams: {
      coding: {
        total: 0,
        active: 0,
        completed: 0,
        createdInPeriod: 0,
        finishedInPeriod: 0,
        itemsInPeriod: [],
      },
      proposal: {
        total: 0,
        active: 0,
        completed: 0,
        createdInPeriod: 0,
        finishedInPeriod: 0,
        itemsInPeriod: [],
      },
      journal: {
        total: 0,
        active: 0,
        completed: 0,
        createdInPeriod: 0,
        finishedInPeriod: 0,
        itemsInPeriod: [],
      },
      writing: {
        total: 0,
        active: 0,
        completed: 0,
        createdInPeriod: 0,
        finishedInPeriod: 0,
        itemsInPeriod: [],
      },
    },
    overall: { totals: { total: 0, active: 0, completed: 0 } },
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);

    try {
      // Sign out from Firebase
      await signOut(auth);

      // Clear any local storage/session storage if needed
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberMe");
      sessionStorage.removeItem("isLoggedIn");

      // Show success message
      console.log("Logout successful");

      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Show error message to user
      alert(`Logout failed: ${error.message}`);
      setIsLoggingOut(false);
    }
  };

  const handleCustomDateRange = () => {
    setShowDateRange(true);
    setTimeFilter("custom");
  };

  const handleTimeFilter = (filter) => {
    setTimeFilter(filter);
    if (filter !== "custom") {
      setShowDateRange(false);
      setStartDate("");
      setEndDate("");
    }
  };

  const filteredTeams = useMemo(() => {
    if (teamFilter === "all") return teamsMeta;
    return teamsMeta.filter((t) => t.id.toString() === teamFilter);
  }, [teamFilter]);

  const toggleTeamExpansion = (teamId) => {
    setExpandedTeams((prev) => ({ ...prev, [teamId]: !prev[teamId] }));
  };

  const getReportTitle = () => {
    if (reportData?.period) {
      const label = showDateRange
        ? "Custom"
        : timeFilter === "weekly"
        ? "Weekly"
        : timeFilter === "monthly"
        ? "Monthly"
        : "Yearly";
      return `${label} Report (${reportData.period})`;
    }
    return "Performance Reports";
  };

  useEffect(() => {
    let isMounted = true;

    const loadReports = async () => {
      try {
        setIsLoading(true);
        console.log("🔄 Starting to load reports...");

        let data;
        if (showDateRange && startDate && endDate) {
          console.log("📅 Custom range selected");
          data = await getCustomReports(startDate, endDate);
        } else if (timeFilter === "weekly") {
          console.log("📅 Weekly report selected");
          data = await getWeeklyReports();
        } else if (timeFilter === "monthly") {
          console.log("📅 Monthly report selected");
          data = await getMonthlyReports();
        } else if (timeFilter === "yearly") {
          console.log("📅 Yearly report selected");
          data = await getYearlyReports();
        } else {
          console.log("📅 Default: Weekly report");
          data = await getWeeklyReports();
        }

        if (isMounted && data) {
          console.log("✅ Reports loaded successfully!");
          console.log("📊 Coding Team:", {
            total: data.teams?.coding?.total || 0,
            itemsCount: data.teams?.coding?.itemsInPeriod?.length || 0,
          });
          console.log("📊 Writing Team:", {
            total: data.teams?.writing?.total || 0,
            itemsCount: data.teams?.writing?.itemsInPeriod?.length || 0,
          });

          // Log first few items for debugging
          if (data.teams?.coding?.itemsInPeriod?.length > 0) {
            console.log(
              "📝 Coding Team items:",
              data.teams.coding.itemsInPeriod.slice(0, 3)
            );
          }
          if (data.teams?.writing?.itemsInPeriod?.length > 0) {
            console.log(
              "📝 Writing Team items:",
              data.teams.writing.itemsInPeriod.slice(0, 3)
            );
          }

          setReportData(data);
        }
      } catch (error) {
        console.error("❌ Error loading reports:", error);
        if (isMounted) {
          setReportData({
            period: "Error loading data",
            teams: {
              coding: {
                total: 0,
                active: 0,
                completed: 0,
                createdInPeriod: 0,
                finishedInPeriod: 0,
                itemsInPeriod: [],
              },
              proposal: {
                total: 0,
                active: 0,
                completed: 0,
                createdInPeriod: 0,
                finishedInPeriod: 0,
                itemsInPeriod: [],
              },
              journal: {
                total: 0,
                active: 0,
                completed: 0,
                createdInPeriod: 0,
                finishedInPeriod: 0,
                itemsInPeriod: [],
              },
              writing: {
                total: 0,
                active: 0,
                completed: 0,
                createdInPeriod: 0,
                finishedInPeriod: 0,
                itemsInPeriod: [],
              },
            },
            overall: { totals: { total: 0, active: 0, completed: 0 } },
          });
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadReports();

    return () => {
      isMounted = false;
    };
  }, [timeFilter, showDateRange, startDate, endDate]);

  const TeamCard = ({ meta }) => {
    const Icon = meta.icon;
    const isExpanded = expandedTeams[meta.id];
    const teamData = reportData.teams[meta.key] || {
      total: 0,
      active: 0,
      completed: 0,
      createdInPeriod: 0,
      finishedInPeriod: 0,
      itemsInPeriod: [],
    };

    console.log(`🎯 Rendering ${meta.name} card:`, {
      total: teamData.total,
      itemsCount: teamData.itemsInPeriod?.length || 0,
      isExpanded,
    });

    return (
      <div className="glass-card rounded-2xl border border-gray-800 overflow-hidden mb-6">
        <div
          className="p-6 cursor-pointer hover:bg-gray-900/30 transition-all"
          onClick={() => toggleTeamExpansion(meta.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`p-3 rounded-xl ${meta.color} bg-opacity-20 mr-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{meta.name}</h3>
                <p className="text-gray-400">{meta.department}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {teamData.total}
                </div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {teamData.active}
                </div>
                <div className="text-sm text-gray-400">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {teamData.completed}
                </div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTeamExpansion(meta.id);
                }}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">All Items</span>
                <span className="text-lg font-bold text-white">
                  {teamData.total}
                </span>
              </div>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Completed</span>
                <span className="text-lg font-bold text-cyan-400">
                  {teamData.completed}
                </span>
              </div>
            </div>
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active</span>
                <span className="text-lg font-bold text-purple-400">
                  {teamData.active}
                </span>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-800"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-white">
                    All Items in Collection (
                    {teamData.itemsInPeriod?.length || 0})
                  </h4>
                </div>

                {teamData.itemsInPeriod && teamData.itemsInPeriod.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">
                            Title
                          </th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">
                            Taken By
                          </th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">
                            Start Date
                          </th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">
                            End Date/Deadline
                          </th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamData.itemsInPeriod.map((item) => {
                          // Extract data
                          let title =
                            item.title ||
                            item.projectName ||
                            item.proposalTitle ||
                            item.paperTitle ||
                            item.journalTitle ||
                            item.name ||
                            item.documentTitle ||
                            item.id ||
                            "Untitled";

                          let status = item.status || item.state || "-";
                          let takenBy =
                            item.takenBy ||
                            item.assignedTo ||
                            item.author ||
                            item.createdBy ||
                            item.assignee ||
                            item.uploadedBy ||
                            item.responsiblePerson ||
                            "Unassigned";

                          // Get dates based on team type
                          const startDateValue = getStartDate(item, meta.key);
                          const endDateValue = getEndDate(item, meta.key);

                          const userImg =
                            getAvatarForName(takenBy) ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                              String(takenBy)
                            )}`;

                          return (
                            <tr
                              key={item.id}
                              className="border-b border-gray-900 hover:bg-gray-900/30"
                            >
                              <td className="py-3 px-4">
                                <div className="font-medium text-white">
                                  {title}
                                </div>
                                {item.details && (
                                  <div className="text-xs text-gray-400 truncate max-w-xs">
                                    {item.details}
                                  </div>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center text-sm text-gray-300">
                                  <img
                                    src={userImg}
                                    alt="user"
                                    className="w-6 h-6 rounded-full mr-2 object-cover border border-gray-700"
                                  />
                                  <span>{takenBy}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center text-sm text-gray-300">
                                  <CalendarIcon className="w-3 h-3 mr-2 text-cyan-400" />
                                  {formatDate(startDateValue)}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center text-sm text-gray-300">
                                  <Clock className="w-3 h-3 mr-2 text-purple-400" />
                                  {formatDate(endDateValue)}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span
                                  className={`px-2 py-1 rounded text-xs ${
                                    status.toLowerCase() === "completed" ||
                                    status.toLowerCase() === "complete" ||
                                    status.toLowerCase() === "done" ||
                                    status.toLowerCase() === "published"
                                      ? "bg-green-900/30 text-green-400"
                                      : status.toLowerCase() === "active" ||
                                        status.toLowerCase() ===
                                          "in progress" ||
                                        status.toLowerCase() === "ongoing" ||
                                        status.toLowerCase() === "started"
                                      ? "bg-cyan-900/30 text-cyan-400"
                                      : status.toLowerCase() === "on review" ||
                                        status.toLowerCase() === "review"
                                      ? "bg-yellow-900/30 text-yellow-400"
                                      : "bg-gray-800 text-gray-300"
                                  }`}
                                >
                                  {status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 bg-gray-900/30 rounded-xl text-center">
                    <CheckCircle className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                    <div className="text-gray-400">
                      No items found in this collection.
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <ReserchLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      isLoading={isLoggingOut} // Pass logout loading state to layout
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Reports Overview
              </h1>
              <p className="text-gray-400 mt-2">{getReportTitle()}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-900/50 rounded-xl p-1">
                <button className="px-4 py-2 rounded-lg text-white">
                  <Users className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="text-sm font-medium text-cyan-300 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Report Period
              </label>
              <div className="flex flex-col space-y-2">
                {timeFilterOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() =>
                        option.id === "custom"
                          ? handleCustomDateRange()
                          : handleTimeFilter(option.id)
                      }
                      className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                        timeFilter === option.id
                          ? "bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-cyan-500/30"
                          : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${option.color} mr-3`}
                      ></div>
                      <Icon className="w-4 h-4 text-gray-400 mr-3" />
                      <span
                        className={`font-medium ${
                          timeFilter === option.id
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-3">
                <Users className="w-4 h-4 mr-2 inline" />
                Filter by Team
              </label>
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              >
                <option value="all">All Teams</option>
                {teamsMeta.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            {showDateRange && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cyan-300 mb-3">
                  <CalendarCheck className="w-4 h-4 mr-2 inline" />
                  Select Date Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    />
                    <div className="text-xs text-gray-400 mt-1">Start Date</div>
                  </div>
                  <div>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    />
                    <div className="text-xs text-gray-400 mt-1">End Date</div>
                  </div>
                </div>
                {(startDate || endDate) && (
                  <div className="mt-2 text-sm text-cyan-400">
                    Showing reports from{" "}
                    {startDate ? formatDate(startDate) : "..."} to{" "}
                    {endDate ? formatDate(endDate) : "..."}
                  </div>
                )}
              </div>
            )}

            {!showDateRange && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cyan-300 mb-3">
                  <BarChart className="w-4 h-4 mr-2 inline" />
                  Summary Statistics
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-900/30 rounded-lg">
                    <div className="text-sm text-gray-400">Total Items</div>
                    <div className="text-xl font-bold text-white">
                      {reportData.overall?.totals?.total ?? 0}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-900/30 rounded-lg">
                    <div className="text-sm text-gray-400">Active</div>
                    <div className="text-xl font-bold text-cyan-400">
                      {reportData.overall?.totals?.active ?? 0}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-900/30 rounded-lg">
                    <div className="text-sm text-gray-400">Completed</div>
                    <div className="text-xl font-bold text-green-400">
                      {reportData.overall?.totals?.completed ?? 0}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="glass-card rounded-2xl p-6 mb-6 border border-gray-800 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <div className="text-gray-400">
              Loading reports from Firebase...
            </div>
          </div>
        )}

        {!isLoading && (
          <div>
            {filteredTeams.map((t) => (
              <TeamCard key={t.id} meta={t} />
            ))}
          </div>
        )}
      </div>
    </ReserchLayout>
  );
};

export default ReportsPage;
