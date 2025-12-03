import React, { useState, useMemo, useRef } from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";
import DataTable from "../../../../components/ResearchLayout/DataTable";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";

const CodingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("coding");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate("/login");
    setIsLoading(false);
  };

  // Team members data - Lead developer first
  const leadDeveloper = {
    id: 1,
    name: "Alex Chen",
    role: "Team Lead",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    isLead: true,
  };

  const teamMembers = [
    {
      id: 2,
      name: "Sarah Miller",
      role: "Member",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      isLead: false,
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Member",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      isLead: false,
    },
    {
      id: 4,
      name: "Emma Davis",
      role: "Member",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      isLead: false,
    },
  ];

  // Initial coding projects data
  const initialProjects = [
    {
      id: 1,
      title: "AI Model Deployment Pipeline",
      takenBy: "Alex Chen",
      startDate: "2024-02-15",
      deadline: "2024-05-30",
      status: "Development",
      progress: 75,
      resultsTaken: 12,
      details:
        "Building an automated pipeline for deploying and monitoring machine learning models in production with CI/CD integration.",
    },
    {
      id: 2,
      title: "Real-time Analytics Dashboard",
      takenBy: "Sarah Miller",
      startDate: "2024-01-10",
      deadline: "2024-04-20",
      status: "Testing",
      progress: 90,
      resultsTaken: 8,
      details:
        "Developing a real-time dashboard for monitoring system metrics and user analytics with interactive visualizations.",
    },
    {
      id: 3,
      title: "Microservices Authentication System",
      takenBy: "James Wilson",
      startDate: "2024-03-01",
      deadline: "2024-07-15",
      status: "Development",
      progress: 60,
      resultsTaken: 15,
      details:
        "Creating a secure authentication and authorization system for microservices architecture with OAuth2 and JWT.",
    },
    {
      id: 4,
      title: "Data Pipeline Optimization",
      takenBy: "Emma Davis",
      startDate: "2024-02-20",
      deadline: "2024-06-10",
      status: "Planning",
      progress: 30,
      resultsTaken: 5,
      details:
        "Optimizing existing data pipelines for better performance and scalability, reducing processing time by 40%.",
    },
    {
      id: 5,
      title: "Cloud Migration Automation",
      takenBy: "Alex Chen",
      startDate: "2024-03-10",
      deadline: "2024-08-30",
      status: "Development",
      progress: 55,
      resultsTaken: 10,
      details:
        "Automating migration of legacy applications to cloud infrastructure with zero downtime deployment strategy.",
    },
  ];

  // State management
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    takenBy: "",
    startDate: "",
    deadline: "",
    status: "Planning",
    resultsTaken: "",
    details: "",
  });

  // Status options
  const statusOptions = [
    {
      value: "Planning",
      label: "Planning",
      color: "text-gray-400",
      bg: "bg-gray-400/10",
      icon: Clock,
      count: 0,
    },
    {
      value: "Development",
      label: "Development",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      icon: Code,
      count: 0,
    },
    {
      value: "Testing",
      label: "Testing",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      icon: Terminal,
      count: 0,
    },
    {
      value: "Review",
      label: "Review",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      icon: Eye,
      count: 0,
    },
    {
      value: "Deployed",
      label: "Deployed",
      color: "text-green-400",
      bg: "bg-green-400/10",
      icon: CheckCircle,
      count: 0,
    },
  ];

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    if (statusFilter === null) {
      return projects;
    }
    return projects.filter((project) => project.status === statusFilter);
  }, [projects, statusFilter]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewProject((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const projectToSubmit = editingProject
      ? {
          ...editingProject,
          ...newProject,
          resultsTaken: parseInt(newProject.resultsTaken) || 0,
        }
      : {
          id: projects.length + 1,
          progress: 0,
          ...newProject,
          resultsTaken: parseInt(newProject.resultsTaken) || 0,
        };

    if (editingProject) {
      setProjects(
        projects.map((p) => (p.id === editingProject.id ? projectToSubmit : p))
      );
    } else {
      setProjects([...projects, projectToSubmit]);
    }

    setIsModalOpen(false);
    setEditingProject(null);
    setNewProject({
      title: "",
      takenBy: "",
      startDate: "",
      deadline: "",
      status: "Planning",
      resultsTaken: "",
      details: "",
    });
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
      resultsTaken: project.resultsTaken.toString(),
      details: project.details,
    });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days remaining
  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Prepare data for DataTable component
  const tableColumns = [
    { key: "title", label: "Project Title", width: "25%" },
    { key: "takenBy", label: "Developer", width: "12%" },
    { key: "progress", label: "Progress", width: "15%" },
    { key: "resultsTaken", label: "Results Taken", width: "13%" },
    { key: "deadline", label: "Deadline", width: "15%" },
    { key: "status", label: "Status", width: "10%" },
    { key: "actions", label: "Actions", width: "10%" },
  ];

  // Transform projects data for DataTable
  const tableData = projects.map((project) => {
    const statusOption =
      statusOptions.find((s) => s.value === project.status) || statusOptions[0];
    const StatusIcon = statusOption.icon;
    const daysRemaining = calculateDaysRemaining(project.deadline);

    return {
      id: project.id,
      _projectData: project,
      renderRow: (item, onRowExpand) => {
        const projectData = item._projectData;
        const projectDaysRemaining = calculateDaysRemaining(
          projectData.deadline
        );
        const projectStatusOption =
          statusOptions.find((s) => s.value === projectData.status) ||
          statusOptions[0];
        const ProjectStatusIcon = projectStatusOption.icon;
        const projectStatusColor = projectStatusOption.color;
        const projectStatusBg = projectStatusOption.bg;

        return (
          <tr className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
            <td className="py-4 px-6">
              <div className="flex items-center">
                <Code className="w-5 h-5 text-cyan-400 mr-3" />
                <div>
                  <div className="text-white font-medium">
                    {projectData.title}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Started: {formatDate(projectData.startDate)}
                  </div>
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
                  <div className="text-gray-300">{projectData.takenBy}</div>
                  {projectData.takenBy === leadDeveloper.name && (
                    <div className="text-xs flex items-center text-yellow-400">
                      Lead Developer
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{projectData.progress}%</span>
                  <span className="text-cyan-300">
                    {projectDaysRemaining} days left
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${projectData.progress}%` }}
                  ></div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center justify-center">
                <BarChart className="w-4 h-4 text-green-400 mr-2" />
                <div>
                  <div className="text-white font-semibold text-center">
                    {projectData.resultsTaken}
                  </div>
                  <div className="text-gray-400 text-xs text-center">tests</div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-purple-400 mr-2" />
                <div>
                  <div className="text-gray-300">
                    {formatDate(projectData.deadline)}
                  </div>
                  <div
                    className={`text-xs ${
                      projectDaysRemaining <= 7
                        ? "text-red-400"
                        : "text-gray-500"
                    }`}
                  >
                    {projectDaysRemaining > 0
                      ? `${projectDaysRemaining} days remaining`
                      : "Overdue"}
                  </div>
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
                  {projectData.status}
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
                {project.details}
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
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                    Deadline
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatDate(project.deadline)}
                  </div>
                  <div
                    className={`text-sm mt-1 ${
                      calculateDaysRemaining(project.deadline) <= 7
                        ? "text-red-400"
                        : "text-cyan-400"
                    }`}
                  >
                    {calculateDaysRemaining(project.deadline) > 0
                      ? `${calculateDaysRemaining(
                          project.deadline
                        )} days remaining`
                      : "Overdue"}
                  </div>
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
      isLoading={isLoading}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Coding Projects Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Manage development projects, track progress, and monitor team
            performance
          </p>
        </div>

        {/* Team Section */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                Development Team
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
                {/* <div className="text-yellow-400 text-xs">Lead Developer</div> */}
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
                status: "Planning",
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

        {/* Empty State */}
        {filteredProjects.length === 0 && statusFilter !== null && (
          <div className="glass-card rounded-2xl p-8 text-center border border-gray-800">
            <Code className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-400 mb-6">
              No {statusFilter.toLowerCase()} projects found. Try changing the
              filter or add new projects.
            </p>
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
                    {/* Project Title */}
                    <div>
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Project Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newProject.title}
                        onChange={handleInputChange}
                        placeholder="Enter project title"
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                      />
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
                    <div className="relative">
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Start Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" />
                        <input
                          type="date"
                          id="startDate"
                          value={newProject.startDate}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="relative">
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Deadline
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                        <input
                          type="date"
                          id="deadline"
                          value={newProject.deadline}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
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
                          placeholder="Number of test cases"
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
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
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
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center"
                    >
                      {editingProject ? (
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
