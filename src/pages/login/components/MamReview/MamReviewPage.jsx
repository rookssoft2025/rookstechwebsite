import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  FileCode,
  FileText,
  BookOpen,
  Edit2,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  Filter,
  X,
  Target,
  User,
  BarChart,
  Briefcase,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import {
  fetchMemberTasks,
  fetchAllByTeam,
} from "../../../../services/MamReviewService";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase"; // Make sure this path is correct
import imgAbinesh from "../../assets/abinesh.jpg";
import imgMahesh from "../../assets/mahesh.jpg";
import imgArun from "../../assets/arun.jpg";
import imgAkash from "../../assets/akash.jpg";
import imgSanthiya from "../../assets/santhiya.jpg";
import imgAshika from "../../assets/ashika.jpg";
import imgAshmi from "../../assets/ashmi.jpg";
import imgAncy from "../../assets/ancy.jpg";
import imgCanute from "../../assets/canute.jpg";
import imgShajini from "../../assets/shajini.jpg";

const MamReviewPage = () => {
  const navigate = useNavigate();

  // Separate states: sidebarTab for sidebar navigation, contentTab for page tabs
  const [sidebarTab, setSidebarTab] = useState("main-review");
  const [contentTab, setContentTab] = useState("coding");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Separate state for logout loading
  const [expandedItems, setExpandedItems] = useState({});
  const [selectedWorkDetails, setSelectedWorkDetails] = useState(null);
  const [isWorkDetailsModalOpen, setIsWorkDetailsModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  // Enhanced logout function with Firebase
  const handleLogout = async () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);
    
    try {
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear any local storage/session storage if needed
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberMe');
      sessionStorage.removeItem('isLoggedIn');
      
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

  // Employee selection state
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [memberTasks, setMemberTasks] = useState({
    coding: [],
    papers: [],
    proposals: [],
    all: [],
  });
  const [memberLoading, setMemberLoading] = useState(false);
  const [memberCounts, setMemberCounts] = useState({});
  const [teamData, setTeamData] = useState({
    coding: [],
    journals: [],
    papers: [],
    proposals: [],
  });
  const [teamLoading, setTeamLoading] = useState(true);
  const toggleExpansion = (type, id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${type}-${id}`]: !prev[`${type}-${id}`],
    }));
  };

  // Date helpers and format
  const toJsDate = (value) => {
    if (!value) return null;
    if (typeof value?.toDate === "function") return value.toDate();
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  };

  const formatDate = (value) => {
    const d = toJsDate(value);
    if (!d) return "Not set";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status mapping helpers for unified badge/progress in employee works
  const mapStatusToDashboard = (type, status) => {
    if (!status) return "started";
    const s = String(status).toLowerCase();
    // Journal & Paper mapping (similar behaviour)
    if (type === "journal" || type === "paper") {
      if (s === "completed") return "completed";
      if (s === "rejected" || s === "rejected") return "rejected";
      if (s.includes("review")) return "review";
      if (s === "on hold" || s === "hold") return "on-hold";
      return "started";
    }

    if (type === "proposal") {
      if (s === "completed") return "completed";
      if (s.includes("review")) return "review";
      if (s === "on hold" || s === "hold") return "on-hold";
      if (s === "in progress" || s === "started" || s === "in-progress")
        return "started";
      return "started";
    }

    // coding default
    if (s === "completed") return "completed";
    if (s === "hold" || s === "on hold") return "on-hold";
    if (s.includes("review")) return "review";
    return "started";
  };

  // Status options for filtering (base set)
  const baseStatusOptions = [
    {
      value: "all",
      label: "All",
      color: "text-gray-400",
      bg: "bg-gray-400/10",
      icon: Filter,
    },
    {
      value: "started",
      label: "Started",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      icon: Clock,
    },
    {
      value: "completed",
      label: "Completed",
      color: "text-green-400",
      bg: "bg-green-400/10",
      icon: CheckCircle,
    },
    {
      value: "on-hold",
      label: "On Hold",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      icon: Clock,
    },
    {
      value: "review",
      label: "Review",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      icon: Eye,
    },
  ];

  // Extra option to show only for journals
  const journalRejectedOption = {
    value: "rejected",
    label: "Rejected",
    color: "text-red-400",
    bg: "bg-red-400/10",
    icon: AlertCircle,
  };

  const statusOptions = useMemo(() => {
    if (contentTab === "journal") {
      return [...baseStatusOptions, journalRejectedOption];
    }
    return baseStatusOptions;
  }, [contentTab]);

  // Employees Data (aligned with Coding, PaperWriting, Proposal pages)
  const employees = [
    {
      id: 1,
      name: "Abinesh",
      role: "Senior Researcher",
      email: "abinesh@research.com",
      phone: "N/A",
      department: "Research",
      avatarColor: "bg-blue-500",
      image: imgAbinesh,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
    },
    {
      id: 2,
      name: "Mahesh",
      role: "Programmer",
      email: "mahesh@research.com",
      phone: "N/A",
      department: "Coding",
      avatarColor: "bg-green-500",
      image: imgMahesh,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
    },
    {
      id: 3,
      name: "Arun",
      role: "Programmer",
      email: "arun@research.com",
      phone: "N/A",
      department: "Coding",
      avatarColor: "bg-purple-500",
      image: imgArun,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
    },
    {
      id: 4,
      name: "Akash",
      role: "Programmer",
      email: "akash@research.com",
      phone: "N/A",
      department: "Coding",
      avatarColor: "bg-pink-500",
      image: imgAkash,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
    },
    {
      id: 5,
      name: "Santhiya",
      role: "Senior Writer",
      email: "santhiya@research.com",
      phone: "N/A",
      department: "Writing",
      avatarColor: "bg-indigo-500",
      image: imgSanthiya,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
    },
    {
      id: 6,
      name: "Ashika",
      role: "Senior Writer",
      email: "ashika@research.com",
      phone: "N/A",
      department: "Writing",
      avatarColor: "bg-yellow-500",
      image: imgAshika,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
    },
    {
      id: 7,
      name: "Ashmi",
      role: "Writer",
      email: "ashmi@research.com",
      phone: "N/A",
      department: "Writing",
      avatarColor: "bg-red-500",
      image: imgAshmi,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
    },
    {
      id: 8,
      name: "Ancy",
      role: "Writer",
      email: "ancy@research.com",
      phone: "N/A",
      department: "Writing",
      avatarColor: "bg-teal-500",
      image: imgAncy,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
    },
    {
      id: 9,
      name: "Canute",
      role: "Writer",
      email: "canute@research.com",
      phone: "N/A",
      department: "Writing",
      avatarColor: "bg-cyan-500",
      image: imgCanute,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
    },
    {
      id: 10,
      name: "Shajini",
      role: "Researcher",
      email: "shajini@research.com",
      phone: "N/A",
      department: "Proposals",
      avatarColor: "bg-emerald-500",
      image: imgShajini,
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
    },
  ];

  // Load tasks for the selected employee from Firestore
  React.useEffect(() => {
    let active = true;
    const load = async () => {
      if (!selectedEmployee) return;
      try {
        setMemberLoading(true);
        const res = await fetchMemberTasks(selectedEmployee.name);
        if (active) setMemberTasks(res);
      } catch (e) {
        console.error("Failed to load member tasks:", e);
        if (active)
          setMemberTasks({ coding: [], papers: [], proposals: [], all: [] });
      } finally {
        if (active) setMemberLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [selectedEmployee]);

  // Load counts for all employees to display on cards (total, active, completed)
  React.useEffect(() => {
    let active = true;
    const loadCounts = async () => {
      try {
        const results = await Promise.all(
          employees.map(async (e) => {
            const res = await fetchMemberTasks(e.name);
            const normalized = (res.all || []).map((t) =>
              mapStatusToDashboard(t.type, t.status)
            );
            const completed = normalized.filter(
              (s) => s === "completed"
            ).length;
            const total = (res.all || []).length;
            const activeCount = total - completed;
            return [e.name, { total, active: activeCount, completed }];
          })
        );
        if (!active) return;
        const obj = {};
        for (const [name, counts] of results) obj[name] = counts;
        setMemberCounts(obj);
      } catch (err) {
        console.error("Failed to load member counts:", err);
      }
    };
    loadCounts();
    return () => {
      active = false;
    };
  }, [employees]);

  // Load team-wide data for Current Works by Team
  React.useEffect(() => {
    let active = true;
    const loadTeam = async () => {
      try {
        setTeamLoading(true);
        const res = await fetchAllByTeam();
        const withUi = (arr) =>
          (arr || []).map((t) => ({
            ...t,
            uiStatus: mapStatusToDashboard(t.type, t.status),
          }));
        if (!active) return;
        const coding = withUi(res.coding);
        const journals = withUi(res.journals);
        const papers = withUi(res.papers);
        const proposalsRaw = withUi(res.proposals);
        // Normalize proposals to ensure new field names are present
        const proposals = proposalsRaw.map((p) => ({
          ...p,
          title:
            p.title ||
            p.paperTitle ||
            p.projectTitle ||
            p.document ||
            p.name ||
            p.id,
          takenBy:
            p.takenBy ||
            p.researcher ||
            p.assignedTo ||
            p.writer ||
            p.owner ||
            p.createdBy,
          startDate: p.startDate || p.createdAt || p.uploadedDate,
          endDate: p.endDate || p.deadline || p.updatedAt,
          status: p.status || p.reviewStatus || "Started",
        }));
        setTeamData({ coding, journals, papers, proposals });
      } catch (e) {
        console.error("Failed to load team data:", e);
        if (active)
          setTeamData({ coding: [], journals: [], papers: [], proposals: [] });
      } finally {
        if (active) setTeamLoading(false);
      }
    };
    loadTeam();
    return () => {
      active = false;
    };
  }, []);

  // Coding Teams Data - Updated with results taken
  const [codingTeams, setCodingTeams] = useState([]);

  // Proposal Teams Data
  const [proposalTeams, setProposalTeams] = useState([]);

  // Journal Teams Data - Fixed: Added researcherId for Dr. Sarah Johnson
  const [journalTeams, setJournalTeams] = useState([]);

  // Writing Teams Data
  const [writingTeams, setWritingTeams] = useState([]);

  // State for editing and filters per tab
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filters, setFilters] = useState({
    coding: "all",
    proposal: "all",
    journal: "all",
    paper: "all",
  });

  // Handle view work details
  const handleViewWorkDetails = (work) => {
    setSelectedWorkDetails(work);
    setIsWorkDetailsModalOpen(true);
  };

  // Handle edit start from details modal
  const handleEditFromDetails = () => {
    if (!selectedWorkDetails) return;
    setIsWorkDetailsModalOpen(false);
    handleEditStart(selectedWorkDetails.type, selectedWorkDetails);
  };

  // Handle edit start
  const handleEditStart = (type, item) => {
    setEditingItem({ type, id: item.id });
    setEditForm({ ...item });
  };

  // Handle edit save
  const handleEditSave = () => {
    // Update the appropriate state based on type
    switch (editingItem.type) {
      case "coding":
        setCodingTeams(
          codingTeams.map((item) =>
            item.id === editingItem.id ? { ...item, ...editForm } : item
          )
        );
        break;
      case "proposal":
        setProposalTeams(
          proposalTeams.map((item) =>
            item.id === editingItem.id ? { ...item, ...editForm } : item
          )
        );
        break;
      case "journal":
        setJournalTeams(
          journalTeams.map((item) =>
            item.id === editingItem.id ? { ...item, ...editForm } : item
          )
        );
        break;
      case "writing":
        setWritingTeams(
          writingTeams.map((item) =>
            item.id === editingItem.id ? { ...item, ...editForm } : item
          )
        );
        break;
    }

    setEditingItem(null);
    setEditForm({});
    alert("Changes saved successfully!");
  };

  // Handle edit cancel
  const handleEditCancel = () => {
    setEditingItem(null);
    setEditForm({});
  };

  // Handle input change in edit form
  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle filter change
  const handleFilterChange = (tab, value) => {
    setFilters((prev) => ({ ...prev, [tab]: value }));
  };

  // Filter teams based on active filter for each tab
  const filteredCodingTeams = useMemo(() => {
    if (filters.coding === "all") return teamData.coding;
    return teamData.coding.filter((team) => team.uiStatus === filters.coding);
  }, [teamData, filters.coding]);

  const filteredProposalTeams = useMemo(() => {
    if (filters.proposal === "all") return teamData.proposals;
    return teamData.proposals.filter(
      (team) => team.uiStatus === filters.proposal
    );
  }, [teamData, filters.proposal]);

  const filteredJournalTeams = useMemo(() => {
    if (filters.journal === "all") return teamData.journals;
    return teamData.journals.filter(
      (team) => team.uiStatus === filters.journal
    );
  }, [teamData, filters.journal]);

  const filteredPaperTeams = useMemo(() => {
    if (filters.paper === "all") return teamData.papers;
    return teamData.papers.filter((team) => team.uiStatus === filters.paper);
  }, [teamData, filters.paper]);

  // Get current teams based on active content tab
  const getCurrentTeams = () => {
    switch (contentTab) {
      case "coding":
        return filteredCodingTeams;
      case "journal":
        return filteredJournalTeams;
      case "paper":
        return filteredPaperTeams;
      case "proposal":
        return filteredProposalTeams;
      default:
        return [];
    }
  };

  // Get current filter value for active content tab
  const getCurrentFilter = () => {
    return filters[contentTab];
  };

  // Get filtered employees based on search
  const filteredEmployees = useMemo(() => {
    // Define required order groups
    const groups = [
      ["Abinesh", "Shajini"],
      ["Santhiya", "Ashika", "Ashmi", "Ancy", "Canute"],
      ["Mahesh", "Arun", "Akash"],
    ];

    // Build priority map: name -> { group, index }
    const priority = new Map();
    groups.forEach((names, g) => {
      names.forEach((n, i) => priority.set(n.toLowerCase(), { g, i }));
    });

    const search = (employeeSearch || "").toLowerCase();
    const base = employees.filter((e) => {
      if (!search) return true;
      return (
        e.name.toLowerCase().includes(search) ||
        e.role.toLowerCase().includes(search) ||
        e.department.toLowerCase().includes(search)
      );
    });

    // Sort by group priority then within-group index, fallback to end
    const sorted = base.slice().sort((a, b) => {
      const pa = priority.get(a.name.toLowerCase()) || { g: 99, i: 999 };
      const pb = priority.get(b.name.toLowerCase()) || { g: 99, i: 999 };
      if (pa.g !== pb.g) return pa.g - pb.g;
      if (pa.i !== pb.i) return pa.i - pb.i;
      return a.name.localeCompare(b.name);
    });

    return sorted;
  }, [employees, employeeSearch]);

  // Get current works for selected employee from Firestore-backed service
  const getEmployeeCurrentWorks = useMemo(() => {
    if (!selectedEmployee) return [];

    const items = (memberTasks.all || []).map((task) => {
      const type = task.type;
      const normalizedStatus = mapStatusToDashboard(type, task.status);

      let icon, color, bgColor, typeLabel;
      if (type === "coding") {
        icon = FileCode;
        color = "text-blue-400";
        bgColor = "bg-blue-900/20";
        typeLabel = "Coding Project";
      } else if (type === "paper") {
        icon = Edit2;
        color = "text-yellow-400";
        bgColor = "bg-yellow-900/20";
        typeLabel = "Paper Writing";
      } else {
        icon = FileText;
        color = "text-green-400";
        bgColor = "bg-green-900/20";
        typeLabel = "Research Proposal";
      }

      return {
        id: task.id,
        type,
        typeLabel,
        icon,
        color,
        bgColor,
        status: normalizedStatus,
        reviewStatus: task.status,
        details: task.details,
        projectTitle: task.title,
        startDate: task.startDate,
        deadline: task.deadline,
        endDate: task.endDate,
      };
    });

    return items;
  }, [selectedEmployee, memberTasks]);

  // Render Employee Card
  const EmployeeCard = ({ employee }) => {
    const isSelected = selectedEmployee?.id === employee.id;

    return (
      <div
        onClick={() => {
          setSelectedEmployee(employee);
          setIsEmployeeModalOpen(true);
        }}
        className={`p-4 rounded-xl border transition-all cursor-pointer ${
          isSelected
            ? "bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
            : "bg-gray-900/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
        }`}
      >
        <div className="flex items-center">
          {employee.image ? (
            <img
              src={employee.image}
              alt={employee.name}
              className="w-12 h-12 rounded-full border-2 border-cyan-500/50 mr-4 object-cover"
            />
          ) : (
            <div
              className={`w-12 h-12 rounded-full ${employee.avatarColor} flex items-center justify-center mr-4`}
            >
              <span className="text-white font-bold text-lg">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          )}
          <div className="flex-1">
            <h4 className="font-semibold text-white">{employee.name}</h4>
            <p className="text-sm text-gray-400">{employee.role}</p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <Briefcase className="w-3 h-3 mr-1" />
              {employee.department}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <Target className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-sm font-semibold text-white">
                {memberCounts[employee.name]?.active ?? 0}
              </span>
            </div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
        </div>
      </div>
    );
  };

  // Render Work Item for Employee
  const EmployeeWorkItem = ({ work }) => {
    const Icon = work.icon;
    const statusOption =
      statusOptions.find((s) => s.value === work.status) || statusOptions[0];
    const StatusIcon = statusOption.icon;

    return (
      <div className="glass-card rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start">
            <div className={`p-2 rounded-lg ${work.bgColor} mr-3`}>
              <Icon className={`w-5 h-5 ${work.color}`} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white">
                {work.projectTitle ||
                  work.title ||
                  work.paperTitle ||
                  work.document}
              </h4>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                {work.typeLabel}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full ${statusOption.bg}`}>
              <div className="flex items-center">
                <StatusIcon className={`w-3 h-3 mr-1 ${statusOption.color}`} />
                <span className={`text-xs font-medium ${statusOption.color}`}>
                  {work.reviewStatus}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleViewWorkDetails(work)}
              className="p-1.5 text-gray-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-900/20"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-between text-xs text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(work.startDate || work.uploadedDate)}
          </div>
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(work.deadline || work.dateOfReview || work.endDate)}
          </div>
        </div>
      </div>
    );
  };

  // Render Work Details Modal
  const renderWorkDetailsModal = () => {
    if (!selectedWorkDetails) return null;

    const Icon = selectedWorkDetails.icon;
    const statusOption =
      statusOptions.find((s) => s.value === selectedWorkDetails.status) ||
      statusOptions[0];
    const StatusIcon = statusOption.icon;

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl w-full max-w-2xl border border-gray-800 max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start">
                <div
                  className={`p-3 rounded-xl ${selectedWorkDetails.bgColor} mr-4`}
                >
                  <Icon className={`w-6 h-6 ${selectedWorkDetails.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedWorkDetails.projectTitle ||
                      selectedWorkDetails.title ||
                      selectedWorkDetails.paperTitle ||
                      selectedWorkDetails.document}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="px-3 py-1 rounded-full bg-gray-800 text-sm text-gray-300">
                      {selectedWorkDetails.typeLabel}
                    </span>
                    <div
                      className={`ml-3 px-3 py-1 rounded-full ${statusOption.bg}`}
                    >
                      <div className="flex items-center">
                        <StatusIcon
                          className={`w-3 h-3 mr-1 ${statusOption.color}`}
                        />
                        <span
                          className={`text-xs font-medium ${statusOption.color}`}
                        >
                          {selectedWorkDetails.reviewStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsWorkDetailsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-cyan-400" />
                    Assigned To
                  </h4>
                  <p className="text-white font-medium">
                    {selectedWorkDetails.takenBy ||
                      selectedWorkDetails.assignedTo ||
                      selectedWorkDetails.researcher ||
                      selectedWorkDetails.writer}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                    Timeline
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-400">Start Date:</span>
                      <p className="text-white font-medium">
                        {formatDate(
                          selectedWorkDetails.startDate ||
                            selectedWorkDetails.uploadedDate
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">
                        {selectedWorkDetails.type === "proposal"
                          ? "End Date"
                          : selectedWorkDetails.type === "journal"
                          ? "Review Date"
                          : "Deadline"}
                      </span>
                      <p className="text-white font-medium">
                        {formatDate(
                          selectedWorkDetails.deadline ||
                            selectedWorkDetails.dateOfReview ||
                            selectedWorkDetails.endDate
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Type Specific Information */}
              <div className="space-y-4">
                {selectedWorkDetails.type === "coding" && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <BarChart className="w-5 h-5 mr-2 text-blue-400" />
                      Project Metrics
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-blue-900/20 rounded-lg">
                        <div className="text-sm text-blue-400">
                          Results Taken
                        </div>
                        <div className="text-xl font-bold text-white">
                          {selectedWorkDetails.resultsTaken || 0}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-900/50 rounded-lg">
                        <div className="text-sm text-gray-400">Test Cases</div>
                        <div className="text-xl font-bold text-white">
                          {selectedWorkDetails.testCases || 0}
                        </div>
                      </div>
                      <div className="p-3 bg-gray-900/50 rounded-lg">
                        <div className="text-sm text-gray-400">Features</div>
                        <div className="text-xl font-bold text-white">
                          {selectedWorkDetails.featuresImplemented || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedWorkDetails.type === "journal" &&
                  selectedWorkDetails.journal && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                        Journal Details
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-400">
                            Journal:
                          </span>
                          <p className="text-white font-medium">
                            {selectedWorkDetails.journal}
                          </p>
                        </div>
                        {selectedWorkDetails.impactFactor && (
                          <div>
                            <span className="text-sm text-gray-400">
                              Impact Factor:
                            </span>
                            <p className="text-white font-medium">
                              {selectedWorkDetails.impactFactor}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {selectedWorkDetails.type === "writing" &&
                  selectedWorkDetails.wordCount && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <Edit2 className="w-5 h-5 mr-2 text-yellow-400" />
                        Document Details
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm text-gray-400">
                            Word Count:
                          </span>
                          <p className="text-white font-medium">
                            {selectedWorkDetails.wordCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-3">
                Description
              </h4>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="text-gray-300">{selectedWorkDetails.details}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-800">
              <button
                onClick={() => setIsWorkDetailsModalOpen(false)}
                className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
              >
                Close
              </button>
              <button
                onClick={handleEditFromDetails}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all flex items-center justify-center"
              >
                <Edit2 size={20} className="mr-2" />
                Edit Details
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Render Employee Details Modal
  const renderEmployeeModal = () => {
    if (!selectedEmployee) return null;

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl w-full max-w-3xl border border-gray-800 max-h-[90vh] overflow-y-auto"
        >
          <div className="p-8">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-start">
                {selectedEmployee.image ? (
                  <img
                    src={selectedEmployee.image}
                    alt={selectedEmployee.name}
                    className="w-20 h-20 rounded-full border-3 border-cyan-500/50 mr-6 object-cover"
                  />
                ) : (
                  <div
                    className={`w-20 h-20 rounded-full ${selectedEmployee.avatarColor} flex items-center justify-center mr-6`}
                  >
                    <span className="text-white font-bold text-3xl">
                      {selectedEmployee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {selectedEmployee.name}
                  </h2>
                  <div className="flex items-center mt-3 space-x-3">
                    <span className="px-4 py-2 bg-cyan-900/30 text-cyan-400 rounded-full text-sm font-medium">
                      {selectedEmployee.role}
                    </span>
                    <span className="px-4 py-2 bg-purple-900/30 text-purple-400 rounded-full text-sm font-medium">
                      {selectedEmployee.department}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-3 mb-8 pb-8 border-b border-gray-700">
              <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Total Works</div>
                <div className="text-3xl font-bold text-white">
                  {memberCounts[selectedEmployee.name]?.total ?? 0}
                </div>
              </div>
              <div className="p-4 bg-cyan-900/20 rounded-lg border border-cyan-700/30">
                <div className="text-sm text-cyan-400 mb-2">Active</div>
                <div className="text-3xl font-bold text-cyan-400">
                  {memberCounts[selectedEmployee.name]?.active ?? 0}
                </div>
              </div>
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                <div className="text-sm text-green-400 mb-2">Completed</div>
                <div className="text-3xl font-bold text-green-400">
                  {memberCounts[selectedEmployee.name]?.completed ?? 0}
                </div>
              </div>
            </div>

            {/* Current Works Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-cyan-400" />
                Current Works
              </h3>

              {memberLoading ? (
                <div className="text-center py-12 bg-gray-900/30 rounded-xl border border-gray-800">
                  <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-3 animate-pulse" />
                  <p className="text-gray-400">Loading tasks...</p>
                </div>
              ) : getEmployeeCurrentWorks.length > 0 ? (
                <div className="space-y-4">
                  {getEmployeeCurrentWorks.map((work, index) => {
                    const Icon = work.icon;
                    const statusOption =
                      statusOptions.find((s) => s.value === work.status) ||
                      statusOptions[0];
                    const StatusIcon = statusOption.icon;

                    return (
                      <div
                        key={index}
                        className="p-4 bg-gray-900/30 rounded-lg border border-gray-700 hover:border-cyan-500/30 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start">
                            <div
                              className={`p-2 rounded-lg ${work.bgColor} mr-3`}
                            >
                              <Icon className={`w-5 h-5 ${work.color}`} />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                {work.projectTitle ||
                                  work.title ||
                                  work.paperTitle ||
                                  work.document}
                              </h4>
                              <span className="text-xs text-gray-400 mt-1 inline-block">
                                {work.typeLabel}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full ${statusOption.bg}`}
                          >
                            <div className="flex items-center">
                              <StatusIcon
                                className={`w-3 h-3 mr-1 ${statusOption.color}`}
                              />
                              <span
                                className={`text-xs font-medium ${statusOption.color}`}
                              >
                                {work.reviewStatus}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="ml-10">
                          <div className="flex justify-between text-xs text-gray-400">
                            <div>
                              Start:{" "}
                              {formatDate(work.startDate || work.uploadedDate)}
                            </div>
                            <div>
                              Due:{" "}
                              {formatDate(
                                work.deadline ||
                                  work.dateOfReview ||
                                  work.endDate
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-900/30 rounded-xl border border-gray-800">
                  <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-white mb-2">
                    No Current Works
                  </h4>
                  <p className="text-gray-400">
                    This employee has no active projects or assignments.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-800">
              <button
                onClick={() => setIsEmployeeModalOpen(false)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Render team card component - PROGRESS BAR REMOVED
  const TeamCard = ({ team, type }) => {
    const isExpanded = expandedItems[`${type}-${team.id}`];

    const statusOption =
      statusOptions.find((s) => s.value === team.uiStatus) || statusOptions[0];
    const StatusIcon = statusOption.icon;

    // Get icon and color based on team type
    const getTeamTypeConfig = () => {
      switch (type) {
        case "coding":
          return {
            icon: FileCode,
            color: "bg-blue-900/20",
            textColor: "text-blue-400",
          };
        case "journal":
          return {
            icon: BookOpen,
            color: "bg-purple-900/20",
            textColor: "text-purple-400",
          };
        case "paper":
          return {
            icon: Edit2,
            color: "bg-yellow-900/20",
            textColor: "text-yellow-400",
          };
        case "proposal":
          return {
            icon: FileText,
            color: "bg-green-900/20",
            textColor: "text-green-400",
          };
        default:
          return {
            icon: Users,
            color: "bg-gray-900/20",
            textColor: "text-gray-400",
          };
      }
    };

    const { icon: Icon, color: iconColor, textColor } = getTeamTypeConfig();

    // Calculate days remaining
    const calculateDaysRemaining = () => {
      const deadline = team.deadline || team.endDate || team.dateOfReview;
      if (!deadline) return "N/A";

      const deadlineDate = toJsDate(deadline);
      if (!deadlineDate) return "N/A";

      const today = new Date();
      const timeDiff = deadlineDate.getTime() - today.getTime();
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysRemaining < 0) return "Overdue";
      if (daysRemaining === 0) return "Today";
      return `${daysRemaining} days remaining`;
    };

    const daysRemainingText = calculateDaysRemaining();

    return (
      <div className="glass-card rounded-2xl p-6 mb-6 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start">
            <div className={`p-3 rounded-xl ${iconColor} mr-4`}>
              <Icon className={`w-6 h-6 ${textColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">
                {team.projectTitle ||
                  team.title ||
                  team.paperTitle ||
                  team.document}
              </h3>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center text-sm text-gray-400">
                  <User className="w-4 h-4 mr-2" />
                  {`Taken By: ${
                    team.takenBy ||
                    team.assignedTo ||
                    team.researcher ||
                    team.writer ||
                    "N/A"
                  }`}
                </div>
                {type === "coding" && team.resultsTaken !== undefined && (
                  <div className="flex items-center text-sm text-gray-400">
                    <BarChart className="w-4 h-4 mr-2" />
                    Results Taken: {team.resultsTaken || 0}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className={`px-4 py-2 rounded-full ${statusOption.bg}`}>
              <div className="flex items-center">
                <StatusIcon className={`w-4 h-4 mr-2 ${statusOption.color}`} />
                <span className={`text-sm font-medium ${statusOption.color}`}>
                  {team.reviewStatus || team.status || "N/A"}
                </span>
              </div>
            </div>
            <button
              onClick={() => toggleExpansion(type, team.id)}
              className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors rounded-lg hover:bg-cyan-900/20"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        {/* Timeline Section - Like in the image */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
            Project Timeline
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                Start Date
              </div>
              <div className="text-xl font-bold text-white mt-2">
                {formatDate(team.startDate || team.uploadedDate)}
              </div>
            </div>

            <div className="p-3 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                {type === "proposal"
                  ? "End Date"
                  : type === "journal"
                  ? "Review Date"
                  : "Deadline"}
              </div>
              <div className="text-xl font-bold text-white mt-2">
                {formatDate(team.deadline || team.dateOfReview || team.endDate)}
              </div>
            </div>

            <div className="p-3 bg-cyan-900/20 rounded-lg">
              <div className="text-sm text-cyan-400 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Time Remaining
              </div>
              <div className="text-xl font-bold text-cyan-400 mt-2">
                {daysRemainingText}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content - Show paper details, start date, deadline like in image */}
        {isExpanded && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="space-y-6">
              {/* Project Details Section - Main content like in image */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-cyan-400" />
                  Project Details
                </h4>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-300">
                    {team.details || "No details provided."}
                  </p>
                </div>
              </div>

              {/* Additional Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Type-specific Information */}
                {type === "coding" && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <BarChart className="w-5 h-5 mr-2 text-blue-400" />
                      Project Statistics
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                        <span className="text-gray-400">Results Taken</span>
                        <span className="text-white font-bold">
                          {team.resultsTaken || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                        <span className="text-gray-400">Test Cases</span>
                        <span className="text-white font-bold">
                          {team.testCases || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                        <span className="text-gray-400">Features</span>
                        <span className="text-white font-bold">
                          {team.featuresImplemented || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {type === "journal" && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                      Journal Information
                    </h4>
                    <div className="space-y-3">
                      {team.journal && (
                        <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                          <span className="text-gray-400">Journal</span>
                          <span className="text-white font-bold">
                            {team.journal}
                          </span>
                        </div>
                      )}
                      {team.impactFactor && (
                        <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-lg">
                          <span className="text-gray-400">Impact Factor</span>
                          <span className="text-white font-bold">
                            {team.impactFactor}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Timeline Details (Expanded version) */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-green-400" />
                    Timeline Details
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-sm text-gray-400 mb-2">
                        Start Date
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                        <span className="text-white font-bold">
                          {formatDate(team.startDate || team.uploadedDate)}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-sm text-gray-400 mb-2">
                        {type === "proposal"
                          ? "End Date"
                          : type === "journal"
                          ? "Review Date"
                          : "Deadline"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                        <span className="text-white font-bold">
                          {formatDate(
                            team.deadline || team.dateOfReview || team.endDate
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-cyan-900/20 rounded-lg">
                      <div className="text-sm text-cyan-400 mb-2">
                        Time Remaining
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-cyan-400 font-bold">
                          {daysRemainingText}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members Section */}
              {team.members && team.members.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-cyan-400" />
                    Team Members
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {team.members.map((member, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cyan-900/20 text-cyan-400 rounded-full text-sm"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Tab configurations for content tabs (computed from teamData so counts stay in sync)
  const tabs = useMemo(
    () => [
      {
        id: "proposal",
        label: "Research Proposals",
        icon: FileText,
        count: (teamData?.proposals || []).length,
      },
      {
        id: "coding",
        label: "Coding Projects",
        icon: FileCode,
        count: (teamData?.coding || []).length,
      },
      {
        id: "paper",
        label: "Writing",
        icon: Edit2,
        count: (teamData?.papers || []).length,
      },
      {
        id: "journal",
        label: "Journals",
        icon: BookOpen,
        count: (teamData?.journals || []).length,
      },
    ],
    [teamData]
  );

  return (
    <ReserchLayout
      activeTab={sidebarTab}
      setActiveTab={setSidebarTab}
      onLogout={handleLogout}
      isLoading={isLoggingOut} // Pass logout loading state to layout
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Manager Review Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Review and manage all team works - Coding, Proposals, Journals, and
            Writing
          </p>
        </div>

        {/* Current Works Section */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                Current Works by Employee
              </h2>
            </div>
          </div>

          {/* Employee Selection and Search */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  placeholder="Search employees by name, role, or department..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Employee Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>

            {/* Instructions when no employee is selected */}
            {!selectedEmployee && (
              <div className="text-center py-12 bg-gray-900/30 rounded-xl border border-gray-800">
                <h4 className="text-xl font-semibold text-white mb-2">
                  Select an Employee
                </h4>
                <p className="text-gray-400">
                  Click on an employee card above to view their current works
                  and assignments.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="glass-card rounded-2xl p-2 mb-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                Current Works by Team
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = contentTab === tab.id;
              const currentTeams = getCurrentTeams();

              return (
                <button
                  key={tab.id}
                  onClick={() => setContentTab(tab.id)}
                  className={`flex items-center px-6 py-4 rounded-xl transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-500/30"
                      : "bg-gray-900/50 hover:bg-gray-800/50"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? "text-cyan-400" : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`font-semibold ${
                      isActive ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                      isActive
                        ? "bg-cyan-900/50 text-cyan-300"
                        : "bg-gray-800/70 text-gray-400"
                    }`}
                  >
                    {currentTeams.length}/{tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Section (Without Add Button) */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <Filter className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                {contentTab === "coding" && "Filter Coding Projects"}
                {contentTab === "journal" && "Filter Journal Papers"}
                {contentTab === "paper" && "Filter Paper Writings"}
                {contentTab === "proposal" && "Filter Research Proposals"}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {statusOptions.map((option) => {
              const Icon = option.icon;
              const isActive = getCurrentFilter() === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange(contentTab, option.value)}
                  className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                    isActive
                      ? `${option.bg} border-cyan-500 shadow-lg shadow-cyan-500/20`
                      : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 ${
                      isActive ? option.color : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      isActive ? option.color : "text-gray-300"
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Cards Section */}
        <div>
          {teamLoading ? (
            <div className="glass-card rounded-2xl p-12 text-center border border-gray-800">
              <Briefcase className="w-20 h-20 text-gray-600 mx-auto mb-6 animate-pulse" />
              <h3 className="text-xl font-semibold text-white">
                Loading team works...
              </h3>
            </div>
          ) : getCurrentTeams().length > 0 ? (
            getCurrentTeams().map((team) => (
              <TeamCard
                key={`${contentTab}-${team.id}`}
                team={team}
                type={contentTab}
              />
            ))
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center border border-gray-800">
              {contentTab === "coding" && (
                <FileCode className="w-20 h-20 text-gray-600 mx-auto mb-6" />
              )}
              {contentTab === "journal" && (
                <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-6" />
              )}
              {contentTab === "paper" && (
                <Edit2 className="w-20 h-20 text-gray-600 mx-auto mb-6" />
              )}
              {contentTab === "proposal" && (
                <FileText className="w-20 h-20 text-gray-600 mx-auto mb-6" />
              )}

              <h3 className="text-2xl font-semibold text-white mb-3">
                No {contentTab} teams found
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                No {contentTab} teams match the current filter. Try selecting a
                different filter option.
              </p>
              {getCurrentFilter() !== "all" && (
                <button
                  onClick={() => handleFilterChange(contentTab, "all")}
                  className="px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
                >
                  Show All
                </button>
              )}
            </div>
          )}
        </div>

        {/* Work Details Modal */}
        {isWorkDetailsModalOpen && renderWorkDetailsModal()}

        {/* Employee Details Modal */}
        {isEmployeeModalOpen && renderEmployeeModal()}
      </div>
    </ReserchLayout>
  );
};

export default MamReviewPage;