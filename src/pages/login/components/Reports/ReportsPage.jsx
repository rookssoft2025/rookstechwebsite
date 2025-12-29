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
  ChevronLeft,
  ChevronRight,
  Filter,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import {
  getWeeklyReports,
  getMonthlyReports,
  getYearlyReports,
  getCustomReports,
  getMonthlyReportsByMonth,
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
    id: "1",
    key: "coding",
    name: "Coding Team",
    department: "Software Development",
    color: "bg-blue-100 text-blue-600",
    icon: Code,
    borderColor: "border-blue-200",
  },
  {
    id: "2",
    key: "proposal",
    name: "Proposal Team",
    department: "Research Proposals",
    color: "bg-emerald-100 text-emerald-600",
    icon: FileText,
    borderColor: "border-emerald-200",
  },
  {
    id: "3",
    key: "journal",
    name: "Journal Team",
    department: "Research Publications",
    color: "bg-violet-100 text-violet-600",
    icon: BookOpen,
    borderColor: "border-violet-200",
  },
  {
    id: "4",
    key: "writing",
    name: "Writing Team",
    department: "Technical Documentation",
    color: "bg-amber-100 text-amber-600",
    icon: Edit2,
    borderColor: "border-amber-200",
  },
];

const timeFilterOptions = [
  {
    id: "weekly",
    label: "Weekly Report",
    icon: CalendarDays,
    color: "bg-blue-500",
    textColor: "text-blue-600",
  },
  {
    id: "monthly",
    label: "Monthly Report",
    icon: CalendarRange,
    color: "bg-violet-500",
    textColor: "text-violet-600",
  },
  {
    id: "yearly",
    label: "Yearly Report",
    icon: CalendarClock,
    color: "bg-emerald-500",
    textColor: "text-emerald-600",
  },
  {
    id: "custom",
    label: "Custom Date Range",
    icon: CalendarCheck,
    color: "bg-cyan-500",
    textColor: "text-cyan-600",
  },
];

// Month names for display
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Get current year and month
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth(); // 0-11

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
  if (item.startDate) return item.startDate;
  if (teamKey === "journal" && item.uploadedDate) return item.uploadedDate;
  if (item.createdAt) return item.createdAt;
  return null;
}

function getEndDate(item, teamKey) {
  if ((teamKey === "coding" || teamKey === "writing") && item.deadline)
    return item.deadline;
  if (teamKey === "proposal" && item.endDate) return item.endDate;
  if (teamKey === "journal" && item.dateOfReview) return item.dateOfReview;
  if (item.deadline) return item.deadline;
  if (item.endDate) return item.endDate;
  return null;
}

// Helper function to get default team structure
const getDefaultTeamStructure = () => ({
  total: 0,
  active: 0,
  completed: 0,
  createdInPeriod: 0,
  finishedInPeriod: 0,
  itemsInPeriod: [],
});

// Helper function to safely get team data
const getTeamData = (reportData, teamKey) => {
  if (!reportData || !reportData.teams) {
    return getDefaultTeamStructure();
  }

  const teamData = reportData.teams[teamKey];
  if (!teamData) {
    console.warn(`Team data not found for key: ${teamKey}`);
    return getDefaultTeamStructure();
  }

  return {
    total: Number(teamData.total || 0),
    active: Number(teamData.active || 0),
    completed: Number(teamData.completed || 0),
    createdInPeriod: Number(teamData.createdInPeriod || 0),
    finishedInPeriod: Number(teamData.finishedInPeriod || 0),
    itemsInPeriod: Array.isArray(teamData.itemsInPeriod) ? teamData.itemsInPeriod : [],
  };
};

// Helper to check if a date is in the current period (simplified)
const isInPeriod = (date) => {
  if (!date) return false;
  const d = new Date(date);
  if (isNaN(d.getTime())) return false;
  return true; // For now, include all items
};

// TeamCard component
const TeamCard = ({ meta, teamData, isExpanded, onToggle, memberFilter }) => {
  const Icon = meta.icon;
  // Helper to normalize 'takenBy' or similar fields into a display string
  const getTakenByString = (item) => {
    const raw = item?.takenBy || item?.assignedTo || item?.author || item?.createdBy || item?.assignee || item?.uploadedBy || item?.responsiblePerson;
    if (!raw) return "Unassigned";
    if (typeof raw === "string") return raw;
    if (typeof raw === "object") {
      // Prefer common name fields
      return raw.name || raw.fullName || raw.displayName || JSON.stringify(raw);
    }
    return String(raw);
  };

  // Filter items by selected member if any (safely handle objects)
  const filteredItems = useMemo(() => {
    const items = teamData.itemsInPeriod || [];
    if (!memberFilter) return items;
    return items.filter(item => {
      const takenByStr = getTakenByString(item);
      return takenByStr.toLowerCase().includes(String(memberFilter).toLowerCase());
    });
  }, [teamData.itemsInPeriod, memberFilter]);

  // Get unique members from items (normalized)
  const uniqueMembers = useMemo(() => {
    const items = teamData.itemsInPeriod || [];
    if (items.length === 0) return [];
    const members = new Set();
    items.forEach(item => {
      const takenByStr = getTakenByString(item);
      if (takenByStr && takenByStr !== "Unassigned") members.add(takenByStr);
    });
    return Array.from(members).sort();
  }, [teamData.itemsInPeriod]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6 hover:shadow-md transition-shadow">
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-all"
        onClick={() => onToggle(meta.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`p-3 rounded-xl ${meta.color.split(' ')[0]} ${meta.borderColor} border mr-4`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{meta.name}</h3>
              <p className="text-gray-600">{meta.department}</p>
              {memberFilter && (
                <div className="flex items-center mt-1">
                  <User className="w-3 h-3 text-cyan-600 mr-1" />
                  <span className="text-xs text-cyan-700">
                    Filtered by: {memberFilter}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {teamData.total || 0}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">
                {teamData.active || 0}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">
                {teamData.completed || 0}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(meta.id);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Team Members Section */}
        {uniqueMembers.length > 0 && (
          <div className="mt-6">
            <div className="text-sm text-gray-600 mb-2 flex items-center">
              <Users className="w-3 h-3 mr-2" />
              Team Members ({uniqueMembers.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {uniqueMembers.map(member => {
                const userImg = getAvatarForName(member) ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(member)}`;
                
                return (
                  <div
                    key={member}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all cursor-pointer ${
                      memberFilter === member
                        ? `${meta.color.split(' ')[0]} ${meta.borderColor} border`
                        : 'bg-gray-50 border border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.dispatchEvent(new CustomEvent('filterByMember', { 
                        detail: { teamId: meta.id, member: memberFilter === member ? null : member } 
                      }));
                    }}
                  >
                    <img
                      src={userImg}
                      alt={member}
                      className="w-5 h-5 rounded-full mr-2 object-cover border border-gray-300"
                    />
                    <span className={`text-sm ${
                      memberFilter === member ? 'text-gray-800 font-medium' : 'text-gray-700'
                    }`}>
                      {member}
                    </span>
                    {memberFilter === member && (
                      <span className="ml-2 text-xs bg-cyan-100 text-cyan-700 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">All Items</span>
              <span className="text-lg font-bold text-gray-800">
                {teamData.total || 0}
              </span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Completed</span>
              <span className="text-lg font-bold text-cyan-600">
                {teamData.completed || 0}
              </span>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active</span>
              <span className="text-lg font-bold text-violet-600">
                {teamData.active || 0}
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
            className="border-t border-gray-200"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  {memberFilter ? `${memberFilter}'s Items` : 'All Items'} (
                  {filteredItems.length})
                </h4>
                {memberFilter && (
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('filterByMember', { 
                        detail: { teamId: meta.id, member: null } 
                      }));
                    }}
                    className="text-sm text-cyan-600 hover:text-cyan-700 flex items-center"
                  >
                    Clear Filter
                    <X className="ml-1 w-4 h-4" />
                  </button>
                )}
              </div>

              {filteredItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">
                          Title
                        </th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">
                          Taken By
                        </th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">
                          Start Date
                        </th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">
                          End Date/Deadline
                        </th>
                        <th className="text-left py-3 px-4 text-gray-600 font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => {
                        const title =
                          item.title ||
                          item.projectName ||
                          item.proposalTitle ||
                          item.paperTitle ||
                          item.journalTitle ||
                          item.name ||
                          item.documentTitle ||
                          item.id ||
                          "Untitled";

                        const status = item.status || item.state || "-";
                        const takenByStr = getTakenByString(item);

                        const startDateValue = getStartDate(item, meta.key);
                        const endDateValue = getEndDate(item, meta.key);

                        const userImg =
                          getAvatarForName(takenByStr) ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                            String(takenByStr)
                          )}`;

                        return (
                          <tr
                            key={item.id || title}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-800">{title}</div>
                              {item.details && (
                                <div className="text-xs text-gray-600 truncate max-w-xs">{item.details}</div>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center text-sm text-gray-700">
                                <img
                                  src={userImg}
                                  alt={takenByStr}
                                  className="w-6 h-6 rounded-full mr-2 object-cover border border-gray-300"
                                />
                                <span>{takenByStr}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center text-sm text-gray-700">
                                <CalendarIcon className="w-3 h-3 mr-2 text-cyan-600" />
                                {formatDate(startDateValue)}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center text-sm text-gray-700">
                                <Clock className="w-3 h-3 mr-2 text-violet-600" />
                                {formatDate(endDateValue)}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 rounded text-xs ${
                                  String(status).toLowerCase() === "completed" ||
                                  String(status).toLowerCase() === "complete" ||
                                  String(status).toLowerCase() === "done" ||
                                  String(status).toLowerCase() === "published"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : String(status).toLowerCase() === "active" ||
                                      String(status).toLowerCase() === "in progress" ||
                                      String(status).toLowerCase() === "ongoing" ||
                                      String(status).toLowerCase() === "started"
                                    ? "bg-cyan-100 text-cyan-700"
                                    : String(status).toLowerCase() === "on review" ||
                                      String(status).toLowerCase() === "review"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-gray-100 text-gray-700"
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
                <div className="p-6 bg-gray-50 rounded-xl text-center border border-gray-200">
                  <CheckCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <div className="text-gray-600">
                    {memberFilter 
                      ? `No items found for ${memberFilter} in this period.`
                      : "No items found in this collection."}
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

const ReportsPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("reports");
  const [isLoading, setIsLoading] = useState(false);

  const [timeFilter, setTimeFilter] = useState("weekly");
  const [teamFilter, setTeamFilter] = useState("all");
  const [memberFilter, setMemberFilter] = useState(null); // Store teamId:memberName mapping

  // Month selection state
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateRange, setShowDateRange] = useState(false);

  const [expandedTeams, setExpandedTeams] = useState({});

  const [reportData, setReportData] = useState({
    period: "",
    teams: {
      coding: getDefaultTeamStructure(),
      proposal: getDefaultTeamStructure(),
      journal: getDefaultTeamStructure(),
      writing: getDefaultTeamStructure(),
    },
    overall: { totals: { total: 0, active: 0, completed: 0 } },
  });
  
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);

    try {
      await signOut(auth);
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberMe");
      sessionStorage.removeItem("isLoggedIn");
      console.log("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert(`Logout failed: ${error.message}`);
      setIsLoggingOut(false);
    }
  };

  const handleCustomDateRange = () => {
    setShowDateRange(true);
    setShowMonthPicker(false);
    setTimeFilter("custom");
  };

  const handleTimeFilter = (filter) => {
    setTimeFilter(filter);
    if (filter !== "custom") {
      setShowDateRange(false);
      setStartDate("");
      setEndDate("");
    }
    if (filter === "monthly") {
      setShowMonthPicker(true);
    } else {
      setShowMonthPicker(false);
    }
  };

  // Navigate to previous month
  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  // Navigate to next month
  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Reset to current month
  const handleCurrentMonth = () => {
    setSelectedMonth(currentMonth);
    setSelectedYear(currentYear);
  };

  // Format month-year for display
  const getMonthYearDisplay = () => {
    return `${months[selectedMonth]} ${selectedYear}`;
  };

  const filteredTeams = useMemo(() => {
    if (teamFilter === "all") return teamsMeta;
    return teamsMeta.filter((t) => t.id === teamFilter);
  }, [teamFilter]);

  const toggleTeamExpansion = (teamId) => {
    setExpandedTeams((prev) => ({ ...prev, [teamId]: !prev[teamId] }));
  };

  const getReportTitle = () => {
    if (reportData?.period) {
      if (timeFilter === "monthly" && showMonthPicker) {
        return `Monthly Report (${getMonthYearDisplay()})`;
      }
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

  // Get the selected team meta
  const getSelectedTeamMeta = () => {
    if (teamFilter === "all") return null;
    return teamsMeta.find(team => team.id === teamFilter);
  };

  // Handle member filter from child component
  useEffect(() => {
    const handleMemberFilter = (event) => {
      const { teamId, member } = event.detail;
      if (member) {
        setMemberFilter({ teamId, member });
      } else {
        setMemberFilter(null);
      }
    };

    window.addEventListener('filterByMember', handleMemberFilter);
    
    return () => {
      window.removeEventListener('filterByMember', handleMemberFilter);
    };
  }, []);

  // Reset member filter when team changes
  useEffect(() => {
    setMemberFilter(null);
  }, [teamFilter]);

  // Helper functions to process each team's data
  const processCodingTeamData = (rawData) => {
    console.log("Processing Coding Team:", rawData);
    
    // If rawData already has the expected structure, use it
    if (rawData.itemsInPeriod && Array.isArray(rawData.itemsInPeriod)) {
      return {
        total: Number(rawData.total || 0),
        active: Number(rawData.active || 0),
        completed: Number(rawData.completed || 0),
        createdInPeriod: Number(rawData.createdInPeriod || 0),
        finishedInPeriod: Number(rawData.finishedInPeriod || 0),
        itemsInPeriod: rawData.itemsInPeriod.map(item => ({
          ...item,
          id: item.id || Math.random().toString(),
          title: item.title || item.projectName || "Untitled",
          status: item.status || "Active",
          startDate: item.startDate,
          deadline: item.deadline || item.endDate,
          takenBy: item.takenBy || item.assignedTo || "Unassigned"
        }))
      };
    }
    
    // Handle array directly (if the API returns just an array of items)
    if (Array.isArray(rawData)) {
      const items = rawData.filter(item => !item.isDeleted);
      return {
        total: items.length,
        active: items.filter(item => 
          ['active', 'in progress', 'started', 'hold'].includes(
            (item.status || '').toLowerCase()
          )).length,
        completed: items.filter(item => 
          ['completed', 'complete', 'done'].includes(
            (item.status || '').toLowerCase()
          )).length,
        createdInPeriod: items.filter(item => {
          const created = new Date(item.createdAt || item.startDate);
          return isInPeriod(created);
        }).length,
        finishedInPeriod: items.filter(item => {
          const finished = new Date(item.updatedAt || item.deadline);
          return isInPeriod(finished) && 
            ['completed', 'complete', 'done'].includes((item.status || '').toLowerCase());
        }).length,
        itemsInPeriod: items.map(item => ({
          ...item,
          id: item.id || Math.random().toString(),
          title: item.title || "Untitled",
          status: item.status || "Active",
          startDate: item.startDate,
          deadline: item.deadline,
          takenBy: item.takenBy || "Unassigned"
        }))
      };
    }
    
    // Fallback for empty or unexpected data
    return getDefaultTeamStructure();
  };

  const processProposalTeamData = (rawData) => {
    console.log("Processing Proposal Team:", rawData);
    
    if (rawData.itemsInPeriod && Array.isArray(rawData.itemsInPeriod)) {
      return {
        total: Number(rawData.total || 0),
        active: Number(rawData.active || 0),
        completed: Number(rawData.completed || 0),
        createdInPeriod: Number(rawData.createdInPeriod || 0),
        finishedInPeriod: Number(rawData.finishedInPeriod || 0),
        itemsInPeriod: rawData.itemsInPeriod.map(item => ({
          ...item,
          id: item.id || Math.random().toString(),
          title: item.title || item.proposalTitle || "Untitled",
          status: item.status || "Active",
          startDate: item.startDate,
          endDate: item.endDate,
          takenBy: item.takenBy || item.author || "Unassigned"
        }))
      };
    }
    
    if (Array.isArray(rawData)) {
      const items = rawData.filter(item => !item.isDeleted);
      return {
        total: items.length,
        active: items.filter(item => 
          ['active', 'in progress', 'started', 'under review'].includes(
            (item.status || '').toLowerCase()
          )).length,
        completed: items.filter(item => 
          ['completed', 'complete', 'done', 'approved'].includes(
            (item.status || '').toLowerCase()
          )).length,
        createdInPeriod: items.filter(item => {
          const created = new Date(item.createdAt || item.startDate);
          return isInPeriod(created);
        }).length,
        finishedInPeriod: items.filter(item => {
          const finished = new Date(item.updatedAt || item.endDate);
          return isInPeriod(finished) && 
            ['completed', 'complete', 'done', 'approved'].includes((item.status || '').toLowerCase());
        }).length,
        itemsInPeriod: items.map(item => ({
          ...item,
          id: item.id || Math.random().toString(),
          title: item.title || "Untitled",
          status: item.status || "Active",
          startDate: item.startDate,
          endDate: item.endDate,
          takenBy: item.takenBy || "Unassigned"
        }))
      };
    }
    
    return getDefaultTeamStructure();
  };

  const processJournalTeamData = (rawData) => {
    console.log("Processing Journal Team:", rawData);
    
    if (rawData.itemsInPeriod && Array.isArray(rawData.itemsInPeriod)) {
      return {
        total: Number(rawData.total || 0),
        active: Number(rawData.active || 0),
        completed: Number(rawData.completed || 0),
        createdInPeriod: Number(rawData.createdInPeriod || 0),
        finishedInPeriod: Number(rawData.finishedInPeriod || 0),
        itemsInPeriod: rawData.itemsInPeriod.map(item => ({
          ...item,
          id: item.id || Math.random().toString(),
          title: item.title || item.paperTitle || item.journalTitle || "Untitled",
          status: item.status || item.reviewStatus || "Active",
          startDate: item.uploadedDate || item.createdAt,
          endDate: item.dateOfReview || item.deadline,
          takenBy: item.takenBy || item.author || item.uploadedBy || "Unassigned"
        }))
      };
    }
    
    if (Array.isArray(rawData)) {
      const items = rawData.filter(item => !item.isDeleted);
      return {
        total: items.length,
        active: items.filter(item => 
          ['in progress', 'under review', 'submitted', 'started'].includes(
            (item.status || item.reviewStatus || '').toLowerCase()
          )).length,
        completed: items.filter(item => 
          ['published', 'accepted', 'completed', 'done'].includes(
            (item.status || item.reviewStatus || '').toLowerCase()
          )).length,
        createdInPeriod: items.filter(item => {
          const created = new Date(item.uploadedDate || item.createdAt);
          return isInPeriod(created);
        }).length,
        finishedInPeriod: items.filter(item => {
          const finished = new Date(item.dateOfReview || item.updatedAt);
          return isInPeriod(finished) && 
            ['published', 'accepted', 'completed', 'done'].includes(
              (item.status || item.reviewStatus || '').toLowerCase()
            );
        }).length,
        itemsInPeriod: items.map(item => ({
          ...item,
          id: item.id || Math.random().toString(),
          title: item.title || "Untitled",
          status: item.status || item.reviewStatus || "Active",
          startDate: item.uploadedDate,
          endDate: item.dateOfReview,
          takenBy: item.takenBy || "Unassigned"
        }))
      };
    }
    
    return getDefaultTeamStructure();
  };

  const processWritingTeamData = (rawData) => {
    console.log("Processing Writing Team:", rawData);
    
    if (rawData.itemsInPeriod && Array.isArray(rawData.itemsInPeriod)) {
      return {
        total: Number(rawData.total || 0),
        active: Number(rawData.active || 0),
        completed: Number(rawData.completed || 0),
        createdInPeriod: Number(rawData.createdInPeriod || 0),
        finishedInPeriod: Number(rawData.finishedInPeriod || 0),
        itemsInPeriod: rawData.itemsInPeriod.map(item => ({
          ...item,
          id: item.id || Math.random().toString(),
          title: item.title || item.documentTitle || "Untitled",
          status: item.status || "Active",
          startDate: item.startDate || item.createdAt,
          endDate: item.deadline || item.endDate,
          takenBy: item.takenBy || item.author || "Unassigned"
        }))
      };
    }
    
    if (Array.isArray(rawData)) {
      const items = rawData.filter(item => !item.isDeleted);
      return {
        total: items.length,
        active: items.filter(item => 
          ['active', 'in progress', 'started', 'draft'].includes(
            (item.status || '').toLowerCase()
          )).length,
        completed: items.filter(item => 
          ['completed', 'complete', 'done', 'published', 'finalized'].includes(
            (item.status || '').toLowerCase()
          )).length,
        createdInPeriod: items.filter(item => {
          const created = new Date(item.createdAt || item.startDate);
          return isInPeriod(created);
        }).length,
        finishedInPeriod: items.filter(item => {
          const finished = new Date(item.updatedAt || item.deadline);
          return isInPeriod(finished) && 
            ['completed', 'complete', 'done', 'published', 'finalized'].includes((item.status || '').toLowerCase());
        }).length,
        itemsInPeriod: items.map(item => ({
          ...item,
          id: item.id || Math.random().toString(),
          title: item.title || "Untitled",
          status: item.status || "Active",
          startDate: item.startDate,
          endDate: item.deadline || item.endDate,
          takenBy: item.takenBy || "Unassigned"
        }))
      };
    }
    
    return getDefaultTeamStructure();
  };

  const getDefaultReportData = () => ({
    period: "Error loading data",
    teams: {
      coding: getDefaultTeamStructure(),
      proposal: getDefaultTeamStructure(),
      journal: getDefaultTeamStructure(),
      writing: getDefaultTeamStructure(),
    },
    overall: { totals: { total: 0, active: 0, completed: 0 } },
  });

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
          if (showMonthPicker) {
            // Use month-specific API call
            data = await getMonthlyReportsByMonth(selectedYear, selectedMonth + 1);
          } else {
            data = await getMonthlyReports();
          }
        } else if (timeFilter === "yearly") {
          console.log("📅 Yearly report selected");
          data = await getYearlyReports();
        } else {
          console.log("📅 Default: Weekly report");
          data = await getWeeklyReports();
        }

        if (isMounted && data) {
          console.log("✅ Reports loaded successfully!");
          console.log("📊 Raw Data:", data);

          // Process data for each team based on their structure
          const processedData = {
            period: data.period || "",
            teams: {
              coding: processCodingTeamData(data.teams?.coding || data.coding || []),
              proposal: processProposalTeamData(data.teams?.proposal || data.proposal || []),
              journal: processJournalTeamData(data.teams?.journal || data.journal || []),
              writing: processWritingTeamData(data.teams?.writing || data.writing || []),
            },
            overall: data.overall || { totals: { total: 0, active: 0, completed: 0 } },
          };

          console.log("🔄 Processed Teams Data:", processedData.teams);
          setReportData(processedData);
          
          // If a specific team is selected, expand it by default
          if (teamFilter !== "all") {
            const team = teamsMeta.find(t => t.id === teamFilter);
            if (team) {
              setExpandedTeams({ [team.id]: true });
            }
          }
        }
      } catch (error) {
        console.error("❌ Error loading reports:", error);
        if (isMounted) {
          setReportData(getDefaultReportData());
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadReports();

    return () => {
      isMounted = false;
    };
  }, [timeFilter, showDateRange, startDate, endDate, selectedMonth, selectedYear, showMonthPicker, teamFilter]);

  // Handle team filter change
  const handleTeamFilterChange = (teamId) => {
    setTeamFilter(teamId);
    
    // Expand the selected team by default
    if (teamId !== "all") {
      setExpandedTeams({ [teamId]: true });
    } else {
      // If "All Teams" is selected, collapse all teams
      setExpandedTeams({});
    }
  };

  // Clear member filter
  const clearMemberFilter = () => {
    setMemberFilter(null);
  };

  // Get current member filter for a specific team
  const getMemberFilterForTeam = (teamId) => {
    if (memberFilter && memberFilter.teamId === teamId) {
      return memberFilter.member;
    }
    return null;
  };

  // Render team statistics based on filter
  const renderTeamStatistics = () => {
    const selectedTeam = getSelectedTeamMeta();
    
    if (teamFilter === "all") {
      // Show statistics for all teams
      return (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Total Items</div>
            <div className="text-xl font-bold text-gray-800">
              {reportData.overall?.totals?.total ?? 0}
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Active</div>
            <div className="text-xl font-bold text-cyan-600">
              {reportData.overall?.totals?.active ?? 0}
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Completed</div>
            <div className="text-xl font-bold text-emerald-600">
              {reportData.overall?.totals?.completed ?? 0}
            </div>
          </div>
        </div>
      );
    } else if (selectedTeam) {
      // Show statistics for the selected team only
      const teamData = getTeamData(reportData, selectedTeam.key);

      const currentMemberFilter = getMemberFilterForTeam(selectedTeam.id);
      const filteredItems = currentMemberFilter 
        ? (teamData.itemsInPeriod || []).filter(item => {
            const takenBy = item.takenBy ||
              item.assignedTo ||
              item.author ||
              item.createdBy ||
              item.assignee ||
              item.uploadedBy ||
              item.responsiblePerson ||
              "Unassigned";
            return takenBy.toLowerCase().includes(currentMemberFilter.toLowerCase());
          })
        : teamData.itemsInPeriod || [];

      return (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Total Items</div>
            <div className="text-xl font-bold text-gray-800">
              {filteredItems.length}
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Active</div>
            <div className="text-xl font-bold text-cyan-600">
              {filteredItems.filter(item => 
                ['active', 'in progress', 'ongoing', 'started'].includes(
                  (item.status || item.state || '').toLowerCase()
                )
              ).length}
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Completed</div>
            <div className="text-xl font-bold text-emerald-600">
              {filteredItems.filter(item => 
                ['completed', 'complete', 'done', 'published'].includes(
                  (item.status || item.state || '').toLowerCase()
                )
              ).length}
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <ReserchLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      isLoading={isLoggingOut}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
                Reports Overview
              </h1>
              <p className="text-gray-600 mt-2">{getReportTitle()}</p>
              {teamFilter !== "all" && (
                <div className="flex items-center mt-2">
                  <Filter className="w-4 h-4 text-cyan-600 mr-2" />
                  <span className="text-sm text-cyan-700">
                    Showing reports for: {getSelectedTeamMeta()?.name}
                  </span>
                  {memberFilter && memberFilter.teamId === teamFilter && (
                    <>
                      <span className="mx-2 text-gray-400">•</span>
                      <User className="w-3 h-3 text-cyan-600 mr-1" />
                      <span className="text-sm text-cyan-700">
                        Member: {memberFilter.member}
                      </span>
                      <button
                        onClick={clearMemberFilter}
                        className="ml-2 text-xs text-red-600 hover:text-red-700"
                      >
                        (clear)
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
                <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50">
                  <Users className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="text-sm font-medium text-cyan-700 mb-3 flex items-center">
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
                          ? "bg-gradient-to-r from-cyan-50 to-violet-50 border-cyan-200"
                          : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full ${option.color} mr-3`}
                      ></div>
                      <Icon className={`w-4 h-4 ${option.textColor} mr-3`} />
                      <span
                        className={`font-medium ${
                          timeFilter === option.id
                            ? "text-gray-800"
                            : "text-gray-700"
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
              <label className="block text-sm font-medium text-cyan-700 mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Filter by Team
              </label>
              
              {/* Team filter buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTeamFilterChange("all")}
                  className={`px-4 py-3 text-sm rounded-xl transition-colors flex items-center ${
                    teamFilter === "all"
                      ? "bg-gradient-to-r from-cyan-50 to-violet-50 text-cyan-700 border border-cyan-200"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  All Teams
                </button>
                {teamsMeta.map((team) => {
                  const Icon = team.icon;
                  return (
                    <button
                      key={team.id}
                      onClick={() => handleTeamFilterChange(team.id)}
                      className={`px-4 py-3 text-sm rounded-xl transition-colors flex items-center ${
                        teamFilter === team.id
                          ? `${team.color.split(' ')[0]} text-gray-800 border ${team.borderColor}`
                          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {team.name.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Month Picker Section */}
            {showMonthPicker && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cyan-700 mb-3">
                  <CalendarRange className="w-4 h-4 mr-2 inline" />
                  Select Month
                </label>
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-800">
                        {getMonthYearDisplay()}
                      </div>
                      <button
                        onClick={handleCurrentMonth}
                        className="text-xs text-cyan-600 hover:text-cyan-700 mt-1"
                      >
                        Go to Current Month
                      </button>
                    </div>
                    
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {months.slice(0, 4).map((month, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMonth(index)}
                        className={`p-2 text-center rounded-lg transition-colors border ${
                          selectedMonth === index
                            ? "bg-cyan-50 text-cyan-700 border-cyan-200"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-xs font-medium">{month.substring(0, 3)}</div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {months.slice(4, 8).map((month, index) => (
                      <button
                        key={index + 4}
                        onClick={() => setSelectedMonth(index + 4)}
                        className={`p-2 text-center rounded-lg transition-colors border ${
                          selectedMonth === index + 4
                            ? "bg-cyan-50 text-cyan-700 border-cyan-200"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-xs font-medium">{month.substring(0, 3)}</div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {months.slice(8, 12).map((month, index) => (
                      <button
                        key={index + 8}
                        onClick={() => setSelectedMonth(index + 8)}
                        className={`p-2 text-center rounded-lg transition-colors border ${
                          selectedMonth === index + 8
                            ? "bg-cyan-50 text-cyan-700 border-cyan-200"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <div className="text-xs font-medium">{month.substring(0, 3)}</div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Year</div>
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setSelectedYear(prev => prev - 1)}
                        className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                        className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-gray-800 text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                      >
                        {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => setSelectedYear(prev => prev + 1)}
                        className="p-2 hover:bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Date Range Section */}
            {showDateRange && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cyan-700 mb-3">
                  <CalendarCheck className="w-4 h-4 mr-2 inline" />
                  Select Date Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    />
                    <div className="text-xs text-gray-600 mt-1">Start Date</div>
                  </div>
                  <div>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    />
                    <div className="text-xs text-gray-600 mt-1">End Date</div>
                  </div>
                </div>
                {(startDate || endDate) && (
                  <div className="mt-2 text-sm text-cyan-600">
                    Showing reports from{" "}
                    {startDate ? formatDate(startDate) : "..."} to{" "}
                    {endDate ? formatDate(endDate) : "..."}
                  </div>
                )}
              </div>
            )}

            {!showMonthPicker && !showDateRange && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cyan-700 mb-3 flex items-center">
                  <BarChart className="w-4 h-4 mr-2" />
                  {teamFilter === "all" ? "Summary Statistics" : "Team Statistics"}
                </label>
                {renderTeamStatistics()}
              </div>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 text-center shadow-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <div className="text-gray-600">
              Loading reports from Firebase...
            </div>
          </div>
        )}

        {!isLoading && (
          <div>
            {teamFilter === "all" ? (
              // Show all teams when "All Teams" is selected
              filteredTeams.map((team) => {
                const teamData = getTeamData(reportData, team.key);
                console.log(`Rendering ${team.name} with data:`, teamData);
                
                return (
                  <TeamCard 
                    key={team.id} 
                    meta={team} 
                    teamData={teamData}
                    isExpanded={expandedTeams[team.id] || false}
                    onToggle={toggleTeamExpansion}
                    memberFilter={getMemberFilterForTeam(team.id)}
                  />
                );
              })
            ) : (
              // Show only the selected team
              (() => {
                const selectedTeam = getSelectedTeamMeta();
                if (!selectedTeam) return null;
                
                const teamData = getTeamData(reportData, selectedTeam.key);
                console.log(`Rendering selected team ${selectedTeam.name} with data:`, teamData);
                
                return (
                  <TeamCard 
                    key={selectedTeam.id} 
                    meta={selectedTeam} 
                    teamData={teamData}
                    isExpanded={expandedTeams[selectedTeam.id] || true}
                    onToggle={toggleTeamExpansion}
                    memberFilter={getMemberFilterForTeam(selectedTeam.id)}
                  />
                );
              })()
            )}
          </div>
        )}
      </div>
    </ReserchLayout>
  );
};

export default ReportsPage;