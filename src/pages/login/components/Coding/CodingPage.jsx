import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Users,
  Calendar,
  FileText,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Edit,
  Trash2,
  Save,
  Filter,
  Code,
  Terminal,
  Crown,
  BarChart,
  Eye,
  Server,
  Percent,
  Search,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import DataTable from "../../../../components/ResearchLayout/DataTable";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import {
  fetchCodingProjects,
  addCodingProject,
  updateCodingProject,
  deleteCodingProject,
  fetchResearchPaperTitles,
} from "../../../../services/CodingService";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase"; // Make sure this path is correct

import img1 from "../../assets/abinesh.jpg";
import img2 from "../../assets/mahesh.jpg";
import img3 from "../../assets/arun.jpg";
import img4 from "../../assets/aakash.png";

// SearchableDropdown Component (remains the same)
const SearchableDropdown = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch research paper titles from Firestore
  useEffect(() => {
    const fetchTitles = async () => {
      if (!isOpen) {
        setOptions([]);
        return;
      }
      
      setIsLoading(true);
      try {
        // Use the service function instead of direct Firestore query
        const titles = await fetchResearchPaperTitles();
        
        // Filter based on search term
        const filtered = titles.filter(title => 
          title.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setOptions(filtered);
      } catch (error) {
        console.error('Error fetching research proposals:', error);
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchTitles();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, isOpen]);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    return options.filter(option =>
      option.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (title) => {
    onChange(title);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onChange('');
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 border-b border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to filter titles..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 outline-none"
                autoFocus
              />
            </div>
          </div>
          
          <div className="py-1">
            {isLoading ? (
              <div className="px-4 py-3 text-center text-gray-400">Loading titles...</div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.title)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-800/50 transition-colors flex items-center justify-between"
                >
                  <span className="text-white truncate">{option.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    option.status === 'active' ? 'bg-green-400/10 text-green-400' : 
                    option.status === 'in-progress' ? 'bg-blue-400/10 text-blue-400' :
                    'bg-yellow-400/10 text-yellow-400'
                  }`}>
                    {option.status}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {isOpen && !isLoading && searchTerm.length > 0 && filteredOptions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-4">
          <div className="text-center text-gray-400">
            No research papers found
          </div>
        </div>
      )}

      {isOpen && !isLoading && searchTerm.length === 0 && filteredOptions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-4">
          <div className="text-center text-gray-400">
            No research papers available
          </div>
        </div>
      )}
    </div>
  );
};

const CodingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("coding");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  // Team members data - Lead developer first
  const leadDeveloper = {
    id: 1,
    name: "Abinesh",
    role: "Senior Researcher",
    image: img1,
    isLead: true,
  };

  const teamMembers = [
    {
      id: 2,
      name: "Mahesh",
      role: "Programmer",
      image: img2,
      isLead: false,
    },
    {
      id: 3,
      name: "Arun",
      role: "Programmer",
      image: img3,
      isLead: false,
    },
    {
      id: 4,
      name: "Akash",
      role: "Programmer",
      image: img4,
      isLead: false,
    },
  ];

  // State management
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  // Ref for date inputs so we can open native picker on touch/click
  const startDateRef = useRef(null);
  const deadlineRef = useRef(null);
  const [newProject, setNewProject] = useState({
    title: "",
    takenBy: "",
    startDate: "",
    deadline: "",
    status: "Started",
    resultsTaken: "",
    details: "",
  });

  // Load projects on component mount
  useEffect(() => {
    let mounted = true;
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCodingProjects();
        if (mounted) {
          setProjects(data);
          console.log("Loaded projects:", data);
        }
      } catch (err) {
        console.error("Failed to load coding projects:", err);
        // Set empty array if fetch fails
        if (mounted) setProjects([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadProjects();
    return () => {
      mounted = false;
    };
  }, []);

  // Status options - Updated with Started, Hold, Completed
  const statusOptions = [
    {
      value: "Started",
      label: "Started",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      icon: Code,
      count: 0,
    },
    {
      value: "Hold",
      label: "Hold",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      icon: Clock,
      count: 0,
    },
    {
      value: "Completed",
      label: "Completed",
      color: "text-green-400",
      bg: "bg-green-400/10",
      icon: CheckCircle,
      count: 0,
    },
  ];

  // Updated getDueStatus function to consider task status
  const getDueStatus = (deadline, taskStatus) => {
    if (!deadline) return null;
     if (taskStatus === "Hold") {
        return null;
    }
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // If task is already completed, show different status
    if (taskStatus === "Completed") {
        return {
            status: "completed",
            label: "Completed",
            color: "text-green-400",
            bg: "bg-green-400/10",
            borderColor: "border-green-400/30",
            icon: CheckCircle,
        };
    }
    
    // Only calculate overdue/urgent status for "Started" tasks
    if (diffDays < 0) {
        return {
            status: "overdue",
            label: "Overdue",
            color: "text-red-400",
            bg: "bg-red-400/10",
            borderColor: "border-red-400/30",
            icon: AlertCircle,
        };
    } else if (diffDays === 0) {
        return {
            status: "today",
            label: "Due Today",
            color: "text-orange-400",
            bg: "bg-orange-400/10",
            borderColor: "border-orange-400/30",
            icon: AlertCircle,
        };
    } else if (diffDays <= 2) {
        return {
            status: "urgent",
            label: `Due in ${diffDays} day${diffDays === 1 ? "" : "s"}`,
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
            borderColor: "border-yellow-400/30",
            icon: Clock,
        };
    } else {
        return {
            status: "ontrack",
            label: `${diffDays} days remaining`,
            color: "text-green-400",
            bg: "bg-green-400/10",
            borderColor: "border-green-400/30",
            icon: CheckCircle,
        };
    }
  };

  // Helper function to get appropriate icon for due status
  const getDueStatusIcon = (dueStatus) => {
    if (!dueStatus) return Calendar;
    return dueStatus.icon || Calendar;
  };

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    if (statusFilter === null) {
      return projects;
    }
    return projects.filter((project) => project.status === statusFilter);
  }, [projects, statusFilter]);

  // Calculate deadline (start date + 3 days)
  const calculateAutoDeadline = (startDate) => {
    if (!startDate) return "";
    const date = new Date(startDate);
    date.setDate(date.getDate() + 3);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "startDate" && value) {
      // Auto-calculate deadline when start date changes
      const autoDeadline = calculateAutoDeadline(value);
      setNewProject((prev) => ({
        ...prev,
        [id]: value,
        deadline: autoDeadline,
      }));
    } else {
      setNewProject((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingProject) {
        const projectToSubmit = {
          ...editingProject,
          ...newProject,
          resultsTaken: parseInt(newProject.resultsTaken) || 0,
        };

        // Remove React-specific properties
        delete projectToSubmit.renderRow;
        delete projectToSubmit.expandContent;
        delete projectToSubmit._projectData;
        delete projectToSubmit.progress;

        const updated = await updateCodingProject(projectToSubmit);
        setProjects((prev) =>
          prev.map((p) =>
            p.id === projectToSubmit.id ? { ...p, ...updated } : p
          )
        );
      } else {
        const projectToSubmit = {
          ...newProject,
          resultsTaken: parseInt(newProject.resultsTaken) || 0,
        };

        const created = await addCodingProject(projectToSubmit);
        setProjects((prev) => [...prev, created]);
      }

      // Show success message
     
    } catch (err) {
      console.error(err);
      alert("Failed to save project. Check console for details.");
    } finally {
      setIsModalOpen(false);
      setEditingProject(null);
      setNewProject({
        title: "",
        takenBy: "",
        startDate: "",
        deadline: "",
        status: "Started",
        resultsTaken: "",
        details: "",
      });
      setIsLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      takenBy: project.takenBy,
      startDate: project.startDate,
      deadline: project.deadline,
      status: project.status,
      resultsTaken: project.resultsTaken?.toString() || "",
      details: project.details,
    });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      setIsLoading(true);
      await deleteCodingProject(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      alert("Project deleted successfully!");
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  // Calculate days remaining
  const calculateDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Prepare data for DataTable component
  const tableColumns = [
    { key: "serial", label: "S.No", width: "8%" },
    { key: "title", label: "Project Title", width: "25%" },
    { key: "takenBy", label: "Developer", width: "15%" },
    { key: "resultsTaken", label: "Results Taken", width: "15%" },
    { key: "deadline", label: "Deadline", width: "17%" },
    { key: "status", label: "Status", width: "12%" },
    { key: "actions", label: "Actions", width: "8%" },
  ];

  // Transform projects data for DataTable
  const tableData = projects.map((project, index) => {
    const statusOption =
      statusOptions.find((s) => s.value === project.status) || statusOptions[0];
    const StatusIcon = statusOption.icon;

    return {
      id: project.id,
      _projectData: project,
      serial: index + 1,
      renderRow: (item, onRowExpand) => {
        const projectData = item._projectData;
        const projectStatusOption =
          statusOptions.find((s) => s.value === projectData.status) ||
          statusOptions[0];
        const ProjectStatusIcon = projectStatusOption.icon;
        const projectStatusColor = projectStatusOption.color;
        const projectStatusBg = projectStatusOption.bg;
        
        // Pass task status to getDueStatus
        const dueStatus = getDueStatus(projectData.deadline, projectData.status);
        const DueStatusIcon = dueStatus ? getDueStatusIcon(dueStatus) : Calendar;

        return (
          <tr key={projectData.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
            <td className="py-4 px-6 text-center">
              <div className="text-white font-semibold">{item.serial}</div>
            </td>
            <td className="py-4 px-6">
              <div>
                <div className="text-white font-medium">
                  {projectData.title || "Untitled Project"}
                </div>
                <div className="text-gray-400 text-sm">
                  Started: {formatDate(projectData.startDate)}
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center">
                <img
                  src={
                    projectData.takenBy === leadDeveloper.name
                      ? leadDeveloper.image
                      : teamMembers.find((m) => m.name === projectData.takenBy)
                          ?.image ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                  }
                  alt={projectData.takenBy}
                  className="w-8 h-8 rounded-full border border-cyan-500/50 mr-3"
                />
                <div>
                  <div className="text-gray-300">{projectData.takenBy || "Unassigned"}</div>
                  {projectData.takenBy === leadDeveloper.name && (
                    <div className="text-xs flex items-center text-yellow-400">
                      Lead Developer
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center justify-center">
                <div>
                  <div className="text-white font-semibold text-center">
                    {projectData.resultsTaken || 0}
                  </div>
                  <div className="text-gray-400 text-xs text-center">
                    results
                  </div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center">
                <DueStatusIcon className="w-4 h-4 text-purple-400 mr-2" />
                <div>
                  <div className="text-gray-300">
                    {formatDate(projectData.deadline)}
                  </div>
                  {dueStatus && (
                    <div className={`text-xs font-medium ${dueStatus.color}`}>
                      {dueStatus.label}
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full ${projectStatusBg}`}
              >
                <ProjectStatusIcon
                  className={`w-4 h-4 mr-2 ${projectStatusColor}`}
                />
                <span className={`text-sm font-medium ${projectStatusColor}`}>
                  {projectData.status || "Started"}
                </span>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleRowExpansion(projectData.id)}
                  className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {expandedRow === projectData.id ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(projectData)}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(projectData.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        );
      },
      expandContent: (
        <div className="glass-inner rounded-xl p-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Details Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Project Details
              </h4>
              <p className="text-gray-300 mb-6 bg-gray-800/50 p-4 rounded-lg">
                {project.details || "No details provided"}
              </p>
            </div>

            {/* Dates Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Timeline
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                    Start Date
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatDate(project.startDate)}
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg border ${(() => {
                    const dueStatus = getDueStatus(project.deadline, project.status);
                    return dueStatus
                      ? `${dueStatus.bg} ${dueStatus.borderColor}`
                      : "bg-gray-800/50 border-gray-700";
                  })()}`}
                >
                  <div className="text-sm text-gray-400 flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                    Deadline
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatDate(project.deadline)}
                  </div>
                  {(() => {
                    const dueStatus = getDueStatus(project.deadline, project.status);
                    return dueStatus ? (
                      <div
                        className={`text-sm mt-1 font-medium ${dueStatus.color}`}
                      >
                        {dueStatus.label}
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <ReserchLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      isLoading={isLoggingOut} // Pass logout loading state to layout
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Research Coding Section
          </h1>
          <p className="text-gray-400 mt-2">
            Manage Research projects, track progress, and monitor team
            performance
          </p>
        </div>

        {/* Team Section */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                Research Coding Team
              </h2>
            </div>
            <span className="text-cyan-300/70 text-sm">
              {1 + teamMembers.length} Members
            </span>
          </div>

          {/* Lead Developer Card */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              Team Lead
            </h3>
            <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-yellow-900/20 transition-all duration-300">
              <img
                src={leadDeveloper.image}
                alt={leadDeveloper.name}
                className="w-12 h-12 rounded-full border-2 border-yellow-500/50"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-white">
                    {leadDeveloper.name}
                  </h3>
                  <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                    Lead
                  </span>
                </div>
                <p className="text-yellow-300/70 text-sm">
                  {leadDeveloper.role}
                </p>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">
                  {
                    projects.filter((p) => p.takenBy === leadDeveloper.name)
                      .length
                  }{" "}
                  Projects
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">
              Team Members
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-10 h-10 rounded-full border-2 border-cyan-500/50"
                  />
                  <div className="ml-3 flex-1">
                    <h3 className="text-white font-medium">{member.name}</h3>
                    <p className="text-cyan-300/70 text-xs">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">
                      {projects.filter((p) => p.takenBy === member.name).length}
                    </div>
                    <div className="text-gray-400 text-xs">Projects</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATUS FILTER SECTION */}
        <div className="glass-card rounded-2xl p-4 mb-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-cyan-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">
                Filter by Status
              </h3>
            </div>
            <div className="text-sm text-gray-400">
              Showing{" "}
              {statusFilter === null
                ? projects.length
                : projects.filter((p) => p.status === statusFilter).length}{" "}
              of {projects.length} projects
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {/* Show All Button */}
            <button
              onClick={() => setStatusFilter(null)}
              className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                statusFilter === null
                  ? `bg-gray-400/10 border-cyan-500 shadow-lg shadow-cyan-500/20`
                  : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
              }`}
            >
              <Filter
                className={`w-5 h-5 mr-3 ${
                  statusFilter === null ? "text-gray-400" : "text-gray-400"
                }`}
              />
              <span
                className={`font-medium ${
                  statusFilter === null ? "text-gray-400" : "text-gray-300"
                }`}
              >
                All Projects
              </span>
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  statusFilter === null
                    ? "bg-gray-800 text-white"
                    : "bg-gray-800/70 text-gray-400"
                }`}
              >
                {projects.length}
              </span>
            </button>

            {statusOptions.map((option) => {
              const Icon = option.icon;
              const isActive = statusFilter === option.value;
              const count = projects.filter(
                (p) => p.status === option.value
              ).length;

              return (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
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
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "bg-gray-800/70 text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Add New Project Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Active Projects</h2>
            <p className="text-gray-400 text-sm mt-1">
              {statusFilter === null
                ? "Showing all projects"
                : `Showing ${statusFilter} projects only`}
            </p>
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setNewProject({
                title: "",
                takenBy: "",
                startDate: "",
                deadline: "",
                status: "Started",
                resultsTaken: "",
                details: "",
              });
              setIsModalOpen(true);
            }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Project
          </button>
        </div>

        {/* DataTable Component */}
        {projects.length > 0 ? (
          <DataTable
            columns={tableColumns}
            data={tableData.filter((item) =>
              statusFilter === null
                ? true
                : item._projectData.status === statusFilter
            )}
            expandedRow={expandedRow}
            onRowExpand={toggleRowExpansion}
            rowKey="id"
          />
        ) : (
          <div className="glass-card rounded-2xl p-8 text-center border border-gray-800">
            <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {isLoading ? "Loading projects..." : "No projects found"}
            </h3>
            <p className="text-gray-400 mb-6">
              {isLoading 
                ? "Fetching data from Firebase..." 
                : "Start by adding your first coding project."}
            </p>
            {!isLoading && (
              <button
                onClick={() => {
                  setEditingProject(null);
                  setNewProject({
                    title: "",
                    takenBy: "",
                    startDate: "",
                    deadline: "",
                    status: "Started",
                    resultsTaken: "",
                    details: "",
                  });
                  setIsModalOpen(true);
                }}
                className="flex items-center justify-center mx-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add First Project
              </button>
            )}
          </div>
        )}

        {/* Add/Edit Project Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl w-full max-w-2xl border border-gray-800 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {editingProject ? "Edit Project" : "Add New Project"}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Title - NOW USING SEARCHABLE DROPDOWN */}
                    <div>
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Project Title
                      </label>
                      <SearchableDropdown
                        value={newProject.title}
                        onChange={(value) => setNewProject(prev => ({ ...prev, title: value }))}
                        placeholder="Search research paper titles..."
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Type to search existing research papers
                      </p>
                    </div>

                    {/* Taken By */}
                    <div>
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Assigned To
                      </label>
                      <select
                        id="takenBy"
                        value={newProject.takenBy}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                      >
                        <option value="">Select developer</option>
                        <optgroup label="Team lead">
                          <option value={leadDeveloper.name}>
                            {leadDeveloper.name} (Lead)
                          </option>
                        </optgroup>
                        <optgroup label="Team Members">
                          {teamMembers.map((member) => (
                            <option key={member.id} value={member.name}>
                              {member.name} ({member.role})
                            </option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    {/* Start Date */}
                    <div>
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Start Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" />
                        <input
                          type="date"
                          id="startDate"
                          ref={startDateRef}
                          value={newProject.startDate}
                          onChange={handleInputChange}
                          onFocus={() => startDateRef.current?.showPicker?.()}
                          onClick={() => startDateRef.current?.showPicker?.()}
                          onTouchStart={() =>
                            startDateRef.current?.showPicker?.()
                          }
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all appearance-none"
                        />
                      </div>
                    </div>

                    {/* Deadline */}
                    <div>
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Deadline
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                        <input
                          type="date"
                          id="deadline"
                          ref={deadlineRef}
                          value={newProject.deadline}
                          onChange={handleInputChange}
                          onFocus={() => deadlineRef.current?.showPicker?.()}
                          onClick={() => deadlineRef.current?.showPicker?.()}
                          onTouchStart={() =>
                            deadlineRef.current?.showPicker?.()
                          }
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all appearance-none"
                        />
                      </div>
                    </div>

                    {/* Results Taken */}
                    <div>
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Results Taken
                      </label>
                      <div className="relative">
                        <BarChart className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400 pointer-events-none" />
                        <input
                          type="number"
                          id="resultsTaken"
                          value={newProject.resultsTaken}
                          onChange={handleInputChange}
                          placeholder="How many results"
                          min="0"
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Status - Full Width */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Status
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {statusOptions.map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                setNewProject((prev) => ({
                                  ...prev,
                                  status: option.value,
                                }))
                              }
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                newProject.status === option.value
                                  ? `${option.bg} border-${
                                      option.color.split("-")[1]
                                    }-400/50`
                                  : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 mb-1 ${
                                  newProject.status === option.value
                                    ? option.color
                                    : "text-gray-400"
                                }`}
                              />
                              <span
                                className={`text-xs font-medium ${
                                  newProject.status === option.value
                                    ? option.color
                                    : "text-gray-400"
                                }`}
                              >
                                {option.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Project Details
                    </label>
                    <textarea
                      id="details"
                      value={newProject.details}
                      onChange={handleInputChange}
                      placeholder="Enter project description, objectives, and technical details..."
                      rows="4"
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    />
                  </div>

                  {/* Form Buttons */}
                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : editingProject ? (
                        <>
                          <Save size={20} className="mr-2" />
                          Update Project
                        </>
                      ) : (
                        <>
                          <Plus size={20} className="mr-2" />
                          Add Project
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ReserchLayout>
  );
};

export default CodingPage;