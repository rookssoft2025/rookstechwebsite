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
  Eye,
  Filter,
  ThumbsUp,
  ThumbsDown,
  FileCheck,
  Upload,
  CheckSquare,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import DataTable from "../../../../components/ResearchLayout/DataTable";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";

const JournalPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("review");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate("/login");
    setIsLoading(false);
  };

  // Team members data - Lead researcher first
  const leadResearcher = {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Review Lead",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isLead: true,
  };

  const teamMembers = [
    {
      id: 2,
      name: "Prof. Michael Chen",
      role: "Reviewer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      isLead: false,
    },
    {
      id: 3,
      name: "Dr. Emma Wilson",
      role: "Reviewer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      isLead: false,
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      role: "Review Assistant",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      isLead: false,
    },
  ];

  // Initial papers data - UPDATED STRUCTURE
  const initialPapers = [
    {
      id: 1,
      title: "Quantum Neural Networks",
      status: "In Progress",
      reviewStatus: "On Review",
      uploadedDate: "2024-02-15",
      dateOfReview: "2024-05-15",
      details:
        "Exploring the intersection of quantum computing and neural networks for optimization problems in machine learning.",
    },
    {
      id: 2,
      title: "Sustainable AI in Agriculture",
      status: "Completed",
      reviewStatus: "Reviewed",
      uploadedDate: "2024-01-10",
      dateOfReview: "2024-04-20",
      details:
        "Investigating AI applications for sustainable farming practices and resource optimization in precision agriculture.",
    },
    {
      id: 3,
      title: "Blockchain for Supply Chain Transparency",
      status: "In Progress",
      reviewStatus: "Rejected",
      uploadedDate: "2024-03-01",
      dateOfReview: "2024-07-15",
      details:
        "Developing a blockchain-based solution for enhancing transparency and traceability in global supply chains.",
    },
    {
      id: 4,
      title: "AI Ethics in Healthcare",
      status: "In Progress",
      reviewStatus: "On Review",
      uploadedDate: "2024-02-20",
      dateOfReview: "2024-06-10",
      details:
        "Examining ethical considerations and regulatory frameworks for AI applications in healthcare diagnostics.",
    },
    {
      id: 5,
      title: "Climate Data Analysis with ML",
      status: "Completed",
      reviewStatus: "Reviewed",
      uploadedDate: "2024-03-10",
      dateOfReview: "2024-08-30",
      details:
        "Using machine learning models to analyze climate data and predict environmental trends.",
    },
  ];

  // State management
  const [papers, setPapers] = useState(initialPapers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingPaper, setEditingPaper] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [newPaper, setNewPaper] = useState({
    title: "",
    status: "In Progress",
    reviewStatus: "On Review",
    uploadedDate: "",
    dateOfReview: "",
    details: "",
  });

  // Status options
  const statusOptions = [
    {
      value: "all",
      label: "All Papers",
      color: "text-gray-400",
      bg: "bg-gray-400/10",
      icon: Filter,
      count: 0,
    },
    {
      value: "In Progress",
      label: "In Progress",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
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

  // UPDATED: Review status options with three options
  const reviewStatusOptions = [
    {
      value: "all",
      label: "All Reviews",
      color: "text-gray-400",
      bg: "bg-gray-400/10",
      icon: Eye,
      count: 0,
    },
    {
      value: "On Review",
      label: "On Review",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      icon: Clock,
      count: 0,
    },
    {
      value: "Reviewed",
      label: "Reviewed",
      color: "text-green-400",
      bg: "bg-green-400/10",
      icon: CheckSquare,
      count: 0,
    },
    {
      value: "Rejected",
      label: "Rejected",
      color: "text-red-400",
      bg: "bg-red-400/10",
      icon: XCircle,
      count: 0,
    },
  ];

  // Current filter for review status
  const [reviewStatusFilter, setReviewStatusFilter] = useState("all");

  // Filter papers based on selected filters
  const filteredPapers = useMemo(() => {
    let filtered = papers;

    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((paper) => paper.status === statusFilter);
    }

    if (reviewStatusFilter && reviewStatusFilter !== "all") {
      filtered = filtered.filter((paper) => paper.reviewStatus === reviewStatusFilter);
    }

    return filtered;
  }, [papers, statusFilter, reviewStatusFilter]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewPaper((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const paperToSubmit = editingPaper
      ? { ...editingPaper, ...newPaper }
      : {
          id: papers.length + 1,
          ...newPaper,
        };

    if (editingPaper) {
      setPapers(
        papers.map((p) => (p.id === editingPaper.id ? paperToSubmit : p))
      );
    } else {
      setPapers([...papers, paperToSubmit]);
    }

    setIsModalOpen(false);
    setEditingPaper(null);
    setNewPaper({
      title: "",
      status: "In Progress",
      reviewStatus: "On Review",
      uploadedDate: "",
      dateOfReview: "",
      details: "",
    });
  };

  // Handle edit
  const handleEdit = (paper) => {
    setEditingPaper(paper);
    setNewPaper({
      title: paper.title,
      status: paper.status,
      reviewStatus: paper.reviewStatus,
      uploadedDate: paper.uploadedDate,
      dateOfReview: paper.dateOfReview,
      details: paper.details,
    });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this paper?")) {
      setPapers(papers.filter((paper) => paper.id !== id));
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Prepare data for DataTable component - UPDATED COLUMNS
  const tableColumns = [
    { key: "title", label: "Paper Title", width: "30%" },
    { key: "status", label: "Status", width: "15%" },
    { key: "reviewStatus", label: "Review Status", width: "15%" },
    { key: "uploadedDate", label: "Uploaded", width: "15%" },
    { key: "dateOfReview", label: "Date of Review", width: "15%" },
    { key: "actions", label: "Actions", width: "10%" },
  ];

  // Transform papers data for DataTable
  const tableData = papers.map((paper) => {
    const statusOption =
      statusOptions.find((s) => s.value === paper.status) || statusOptions[1];
    const StatusIcon = statusOption.icon;
    const statusColor = statusOption.color;
    const statusBg = statusOption.bg;

    const reviewOption =
      reviewStatusOptions.find((s) => s.value === paper.reviewStatus) || reviewStatusOptions[1];
    const ReviewIcon = reviewOption.icon;
    const reviewColor = reviewOption.color;
    const reviewBg = reviewOption.bg;

    return {
      id: paper.id,
      _paperData: paper,
      renderRow: (item, onRowExpand) => {
        const paperData = item._paperData;
        const paperStatusOption =
          statusOptions.find((s) => s.value === paperData.status) ||
          statusOptions[1];
        const PaperStatusIcon = paperStatusOption.icon;
        const paperStatusColor = paperStatusOption.color;
        const paperStatusBg = paperStatusOption.bg;

        const paperReviewOption =
          reviewStatusOptions.find((s) => s.value === paperData.reviewStatus) ||
          reviewStatusOptions[1];
        const PaperReviewIcon = paperReviewOption.icon;
        const paperReviewColor = paperReviewOption.color;
        const paperReviewBg = paperReviewOption.bg;

        return (
          <tr className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
            <td className="py-4 px-6">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-cyan-400 mr-3" />
                <div>
                  <div className="text-white font-medium">
                    {paperData.title}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {paperData.details.substring(0, 60)}...
                  </div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div
                className={`inline-flex items-center px-3 py-1.5 rounded-full ${paperStatusBg}`}
              >
                <PaperStatusIcon
                  className={`w-4 h-4 mr-2 ${paperStatusColor}`}
                />
                <span className={`text-sm font-medium ${paperStatusColor}`}>
                  {paperData.status}
                </span>
              </div>
            </td>
            <td className="py-4 px-6">
              <div
                className={`inline-flex items-center px-3 py-1.5 rounded-full ${paperReviewBg}`}
              >
                <PaperReviewIcon
                  className={`w-4 h-4 mr-2 ${paperReviewColor}`}
                />
                <span className={`text-sm font-medium ${paperReviewColor}`}>
                  {paperData.reviewStatus}
                </span>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center text-sm">
                <Upload className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-gray-300">
                  {formatDate(paperData.uploadedDate)}
                </span>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 text-purple-400 mr-2" />
                <span className="text-gray-300">
                  {formatDate(paperData.dateOfReview)}
                </span>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleRowExpansion(paperData.id)}
                  className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {expandedRow === paperData.id ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(paperData)}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(paperData.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        );
      },
      // UPDATED: Simplified expand content - only Paper Details
      expandContent: (
        <div className="glass-inner rounded-xl p-6 border border-gray-800">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-4">
              Paper Details
            </h4>
            <p className="text-gray-300 bg-gray-800/50 p-4 rounded-lg">
              {paper.details}
            </p>
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
            Paper Review Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Manage paper reviews, track status, and monitor review progress
          </p>
        </div>

        {/* Team Section */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Review Team</h2>
            </div>
            <span className="text-cyan-300/70 text-sm">
              {1 + teamMembers.length} Members
            </span>
          </div>

          {/* Lead Researcher Card */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              Team Lead
            </h3>
            <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-yellow-900/20 transition-all duration-300">
              <img
                src={leadResearcher.image}
                alt={leadResearcher.name}
                className="w-12 h-12 rounded-full border-2 border-yellow-500/50"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-white">
                    {leadResearcher.name}
                  </h3>
                  <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                    Lead
                  </span>
                </div>
                <p className="text-yellow-300/70 text-sm">
                  {leadResearcher.role}
                </p>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">
                  {papers.length} Papers
                </div>
                <div className="text-yellow-400 text-xs">Total in System</div>
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
                      Active
                    </div>
                    <div className="text-green-400 text-xs">Available</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FILTER SECTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Status Filter */}
          <div className="glass-card rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Filter className="w-5 h-5 text-cyan-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">
                  Filter by Status
                </h3>
              </div>
              <div className="text-sm text-gray-400">
                {statusFilter === "all" || !statusFilter
                  ? "All papers"
                  : papers.filter((p) => p.status === statusFilter).length + " papers"}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                const isActive = statusFilter === option.value;
                const count = papers.filter(
                  (p) => p.status === option.value
                ).length;

                return (
                  <button
                    key={option.value}
                    onClick={() => setStatusFilter(option.value === "all" ? null : option.value)}
                    className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                      isActive || (option.value === "all" && statusFilter === null)
                        ? `${option.bg} border-cyan-500 shadow-lg shadow-cyan-500/20`
                        : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mr-3 ${
                        isActive || (option.value === "all" && statusFilter === null)
                          ? option.color
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive || (option.value === "all" && statusFilter === null)
                          ? option.color
                          : "text-gray-300"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        isActive || (option.value === "all" && statusFilter === null)
                          ? "bg-gray-800 text-white"
                          : "bg-gray-800/70 text-gray-400"
                      }`}
                    >
                      {option.value === "all" ? papers.length : count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Status Filter */}
          <div className="glass-card rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Eye className="w-5 h-5 text-cyan-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">
                  Filter by Review Status
                </h3>
              </div>
              <div className="text-sm text-gray-400">
                {reviewStatusFilter === "all" || !reviewStatusFilter
                  ? "All reviews"
                  : papers.filter((p) => p.reviewStatus === reviewStatusFilter).length + " papers"}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {reviewStatusOptions.map((option) => {
                const Icon = option.icon;
                const isActive = reviewStatusFilter === option.value;
                const count = papers.filter(
                  (p) => p.reviewStatus === option.value
                ).length;

                return (
                  <button
                    key={option.value}
                    onClick={() => setReviewStatusFilter(option.value === "all" ? null : option.value)}
                    className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                      isActive || (option.value === "all" && reviewStatusFilter === null)
                        ? `${option.bg} border-cyan-500 shadow-lg shadow-cyan-500/20`
                        : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mr-3 ${
                        isActive || (option.value === "all" && reviewStatusFilter === null)
                          ? option.color
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive || (option.value === "all" && reviewStatusFilter === null)
                          ? option.color
                          : "text-gray-300"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        isActive || (option.value === "all" && reviewStatusFilter === null)
                          ? "bg-gray-800 text-white"
                          : "bg-gray-800/70 text-gray-400"
                      }`}
                    >
                      {option.value === "all" ? papers.length : count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add New Paper Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Review Papers</h2>
            <p className="text-gray-400 text-sm mt-1">
              Showing {filteredPapers.length} of {papers.length} papers
              {(statusFilter || reviewStatusFilter) && (
                <>
                  {" "}
                  (filtered)
                </>
              )}
            </p>
          </div>
          <button
            onClick={() => {
              setEditingPaper(null);
              setNewPaper({
                title: "",
                status: "In Progress",
                reviewStatus: "On Review",
                uploadedDate: "",
                dateOfReview: "",
                details: "",
              });
              setIsModalOpen(true);
            }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Paper
          </button>
        </div>

        {/* DataTable Component */}
        <DataTable
          columns={tableColumns}
          data={tableData.filter((item) => {
            const paper = item._paperData;
            const statusMatch = !statusFilter || statusFilter === "all" || paper.status === statusFilter;
            const reviewMatch = !reviewStatusFilter || reviewStatusFilter === "all" || paper.reviewStatus === reviewStatusFilter;
            return statusMatch && reviewMatch;
          })}
          expandedRow={expandedRow}
          onRowExpand={toggleRowExpansion}
          rowKey="id"
        />

        {/* Empty State */}
        {filteredPapers.length === 0 && (
          <div className="glass-card rounded-2xl p-8 text-center border border-gray-800">
            <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No papers found
            </h3>
            <p className="text-gray-400 mb-6">
              No papers match the current filters. Try changing the filters or add new papers.
            </p>
            {(statusFilter || reviewStatusFilter) && (
              <button
                onClick={() => {
                  setStatusFilter(null);
                  setReviewStatusFilter(null);
                }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Add/Edit Paper Modal */}
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
                    {editingPaper ? "Edit Paper" : "Add New Paper"}
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
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Paper Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={newPaper.title}
                        onChange={handleInputChange}
                        placeholder="Enter paper title"
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Status
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {statusOptions.slice(1).map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              type="button"
                              key={option.value}
                              onClick={() =>
                                setNewPaper((prev) => ({
                                  ...prev,
                                  status: option.value,
                                }))
                              }
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                newPaper.status === option.value
                                  ? `${option.bg} border-${
                                      option.color.split("-")[1]
                                    }-400/50`
                                  : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 mb-1 ${
                                  newPaper.status === option.value
                                    ? option.color
                                    : "text-gray-400"
                                }`}
                              />
                              <span
                                className={`text-xs font-medium ${
                                  newPaper.status === option.value
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

                    <div>
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Review Status
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {reviewStatusOptions.slice(1).map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              type="button"
                              key={option.value}
                              onClick={() =>
                                setNewPaper((prev) => ({
                                  ...prev,
                                  reviewStatus: option.value,
                                }))
                              }
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                newPaper.reviewStatus === option.value
                                  ? `${option.bg} border-${
                                      option.color.split("-")[1]
                                    }-400/50`
                                  : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                              }`}
                            >
                              <Icon
                                className={`w-5 h-5 mb-1 ${
                                  newPaper.reviewStatus === option.value
                                    ? option.color
                                    : "text-gray-400"
                                }`}
                              />
                              <span
                                className={`text-xs font-medium ${
                                  newPaper.reviewStatus === option.value
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

                    <div className="relative">
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Uploaded Date
                      </label>
                      <div className="relative">
                        <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400 pointer-events-none" />
                        <input
                          type="date"
                          id="uploadedDate"
                          value={newPaper.uploadedDate}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Date of Review
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                        <input
                          type="date"
                          id="dateOfReview"
                          value={newPaper.dateOfReview}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Paper Details
                    </label>
                    <textarea
                      id="details"
                      value={newPaper.details}
                      onChange={handleInputChange}
                      placeholder="Enter paper description and details..."
                      rows="4"
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    />
                  </div>

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
                      {editingPaper ? (
                        <>
                          <Save size={20} className="mr-2" />
                          Update Paper
                        </>
                      ) : (
                        <>
                          <Plus size={20} className="mr-2" />
                          Add Paper
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

export default JournalPage;