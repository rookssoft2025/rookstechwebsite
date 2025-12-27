import React, { useState, useMemo, useEffect, useRef } from "react";
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
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { motion } from "framer-motion";
import DataTable from "../../../../components/ResearchLayout/DataTable";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import {
  fetchJournals,
  addJournal,
  updateJournal,
  deleteJournal,
} from "../../../../services/JournalService";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

const JournalPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("review");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Enhanced logout function with Firebase
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);
    
    try {
      await signOut(auth);
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberMe');
      sessionStorage.removeItem('isLoggedIn');
      console.log("Logout successful");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert(`Logout failed: ${error.message}`);
      setIsLoggingOut(false);
    }
  };

  // State management
  const [papers, setPapers] = useState([]);
  const [loadingPapers, setLoadingPapers] = useState(true);

  // Load papers from Firebase
  useEffect(() => {
    const loadPapers = async () => {
      try {
        setLoadingPapers(true);
        const data = await fetchJournals();
        setPapers(data);
      } catch (err) {
        console.error("Error loading journals:", err);
      } finally {
        setLoadingPapers(false);
      }
    };

    loadPapers();
  }, []);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingPaper, setEditingPaper] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [newPaper, setNewPaper] = useState({
    title: "",
    status: "In Progress",
    reviewStatus: "",
    uploadedDate: "",
    dateOfReview: "",
    details: "",
  });

  // Refs for date inputs
  const uploadedDateRef = useRef(null);
  const dateOfReviewRef = useRef(null);

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

  // Review status options with three options
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
      filtered = filtered.filter(
        (paper) => paper.reviewStatus === reviewStatusFilter
      );
    }

    return filtered;
  }, [papers, statusFilter, reviewStatusFilter]);

  // Calculate pagination data
  const totalItems = filteredPapers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, reviewStatusFilter]);

  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPapers.slice(startIndex, endIndex);
  }, [filteredPapers, currentPage, itemsPerPage]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewPaper((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPaper.reviewStatus === "On Review" && !newPaper.dateOfReview) {
      alert("Date of Review is required when review status is 'On Review'.");
      return;
    }
    
    setIsLoading(true);
    try {
      const paperToSubmit = editingPaper
        ? { ...editingPaper, ...newPaper }
        : newPaper;

      if (editingPaper) {
        await updateJournal(paperToSubmit);
        setPapers(
          papers.map((p) => (p.id === editingPaper.id ? paperToSubmit : p))
        );
      } else {
        const addedPaper = await addJournal(paperToSubmit);
        setPapers([...papers, addedPaper]);
      }

      setIsModalOpen(false);
      setEditingPaper(null);
      setNewPaper({
        title: "",
        status: "In Progress",
        reviewStatus: "",
        uploadedDate: "",
        dateOfReview: "",
        details: "",
      });
    } catch (err) {
      console.error("Error submitting journal:", err);
      alert("Failed to save paper. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this paper?")) {
      setIsLoading(true);
      try {
        await deleteJournal(id);
        setPapers(papers.filter((paper) => paper.id !== id));
      } catch (err) {
        console.error("Error deleting journal:", err);
        alert("Failed to delete paper. Please try again.");
      } finally {
        setIsLoading(false);
      }
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

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const goToFirstPage = () => goToPage(1);
  const goToLastPage = () => goToPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  // Prepare data for DataTable component
  const tableColumns = [
    { key: "title", label: "Paper Title", width: "30%" },
    { key: "status", label: "Status", width: "15%" },
    { key: "reviewStatus", label: "Review Status", width: "15%" },
    { key: "uploadedDate", label: "Uploaded", width: "15%" },
    { key: "dateOfReview", label: "Date of Review", width: "15%" },
    { key: "actions", label: "Actions", width: "10%" },
  ];

  // Transform current page papers data for DataTable
  const tableData = currentItems.map((paper, index) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
    const statusOption =
      statusOptions.find((s) => s.value === paper.status) || statusOptions[1];
    const StatusIcon = statusOption.icon;
    const statusColor = statusOption.color;
    const statusBg = statusOption.bg;

    const reviewOption =
      reviewStatusOptions.find((s) => s.value === paper.reviewStatus) ||
      reviewStatusOptions[1];
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
                <div className="text-cyan-400 font-bold text-lg mr-3">
                  {globalIndex}
                </div>
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
      isLoading={isLoggingOut}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Journal Section
          </h1>
          <p className="text-gray-400 mt-2">
            Manage paper reviews, track status, and monitor review progress
          </p>
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
                  : papers.filter((p) => p.status === statusFilter).length +
                    " papers"}
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
                    onClick={() =>
                      setStatusFilter(
                        option.value === "all" ? null : option.value
                      )
                    }
                    className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                      isActive ||
                      (option.value === "all" && statusFilter === null)
                        ? `${option.bg} border-cyan-500 shadow-lg shadow-cyan-500/20`
                        : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mr-3 ${
                        isActive ||
                        (option.value === "all" && statusFilter === null)
                          ? option.color
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive ||
                        (option.value === "all" && statusFilter === null)
                          ? option.color
                          : "text-gray-300"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        isActive ||
                        (option.value === "all" && statusFilter === null)
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
                  : papers.filter((p) => p.reviewStatus === reviewStatusFilter)
                      .length + " papers"}
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
                    onClick={() =>
                      setReviewStatusFilter(
                        option.value === "all" ? null : option.value
                      )
                    }
                    className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                      isActive ||
                      (option.value === "all" && reviewStatusFilter === null)
                        ? `${option.bg} border-cyan-500 shadow-lg shadow-cyan-500/20`
                        : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mr-3 ${
                        isActive ||
                        (option.value === "all" && reviewStatusFilter === null)
                          ? option.color
                          : "text-gray-400"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive ||
                        (option.value === "all" && reviewStatusFilter === null)
                          ? option.color
                          : "text-gray-300"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                        isActive ||
                        (option.value === "all" && reviewStatusFilter === null)
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
              {(statusFilter || reviewStatusFilter) && <> (filtered)</>}
            </p>
          </div>
          <button
            onClick={() => {
              setEditingPaper(null);
              setNewPaper({
                title: "",
                status: "In Progress",
                reviewStatus: "",
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
        {filteredPapers.length > 0 ? (
          <>
            <DataTable
              columns={tableColumns}
              data={tableData}
              expandedRow={expandedRow}
              onRowExpand={toggleRowExpansion}
              rowKey="id"
            />

            {/* Pagination Controls */}
            {totalItems > 0 && (
              <div className="glass-card rounded-2xl p-6 mt-6 border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Items per page selector */}
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm">Items per page:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-3 py-2 bg-gray-900/70 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value={5} className="bg-gray-900">5</option>
                      <option value={10} className="bg-gray-900">10</option>
                      <option value={20} className="bg-gray-900">20</option>
                      <option value={50} className="bg-gray-900">50</option>
                    </select>
                    <span className="text-gray-400 text-sm">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} papers
                    </span>
                  </div>

                  {/* Pagination buttons */}
                  <div className="flex items-center gap-2">
                    {/* First page button */}
                    <button
                      onClick={goToFirstPage}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-gray-900/70 border border-gray-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500/50 hover:bg-gray-800/50 transition-colors"
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>

                    {/* Previous page button */}
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg bg-gray-900/70 border border-gray-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500/50 hover:bg-gray-800/50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page numbers */}
                    <div className="flex gap-1 mx-2">
                      {getPageNumbers().map((pageNum, index) => (
                        pageNum === '...' ? (
                          <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                            ...
                          </span>
                        ) : (
                          <button
                            key={pageNum}
                            onClick={() => goToPage(pageNum)}
                            className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                              currentPage === pageNum
                                ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20'
                                : 'bg-gray-900/70 border border-gray-700 text-white hover:border-cyan-500/50 hover:bg-gray-800/50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      ))}
                    </div>

                    {/* Next page button */}
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg bg-gray-900/70 border border-gray-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500/50 hover:bg-gray-800/50 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Last page button */}
                    <button
                      onClick={goToLastPage}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg bg-gray-900/70 border border-gray-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-500/50 hover:bg-gray-800/50 transition-colors"
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Page info */}
                <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-800">
                  <span className="text-sm text-gray-400">
                    Page {currentPage} of {totalPages} • {totalItems} total papers
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="glass-card rounded-2xl p-8 text-center border border-gray-800">
            <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {loadingPapers ? "Loading papers..." : "No papers found"}
            </h3>
            <p className="text-gray-400 mb-6">
              {loadingPapers 
                ? "Fetching data from Firebase..." 
                : "No papers match the current filters. Try changing the filters or add new papers."}
            </p>
            {!loadingPapers && (statusFilter || reviewStatusFilter) && (
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
                          ref={uploadedDateRef}
                          value={newPaper.uploadedDate}
                          onChange={handleInputChange}
                          onFocus={() =>
                            uploadedDateRef.current?.showPicker?.()
                          }
                          onClick={() =>
                            uploadedDateRef.current?.showPicker?.()
                          }
                          onTouchStart={() =>
                            uploadedDateRef.current?.showPicker?.()
                          }
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all appearance-none"
                        />
                      </div>
                    </div>

                    {newPaper.reviewStatus === "On Review" && (
                      <div className="relative">
                        <label className="block text-sm font-medium text-cyan-300 mb-2">
                          Date of Review
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                          <input
                            type="date"
                            id="dateOfReview"
                            ref={dateOfReviewRef}
                            value={newPaper.dateOfReview}
                            onChange={handleInputChange}
                            onFocus={() =>
                              dateOfReviewRef.current?.showPicker?.()
                            }
                            onClick={() =>
                              dateOfReviewRef.current?.showPicker?.()
                            }
                            onTouchStart={() =>
                              dateOfReviewRef.current?.showPicker?.()
                            }
                            required
                            className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all appearance-none"
                          />
                        </div>
                      </div>
                    )}
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
                      disabled={isLoading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {editingPaper ? "Updating..." : "Adding..."}
                        </span>
                      ) : editingPaper ? (
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