import React, { useState, useEffect, useRef, useMemo } from "react";
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
  AlertTriangle,
  User,
  CalendarDays,
  FileEdit,
  CalendarClock,
  Filter,
  CheckCheck,
  AlertOctagon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import DataTable from "../../../../components/ResearchLayout/DataTable";
// Firestore service
import {
  fetchProposals,
  addProposal,
  updateProposal,
  deleteProposal,
} from "../../../../services/ProposalService";

import img1 from "../../assets/abinesh.jpg";
import img2 from "../../assets/shajini.jpg";
import img3 from "../../assets/mahesh.jpg";
// import img4 from "../../assets/arun.jpg";
import img5 from "../../assets/akash.png";

import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

const ProposalPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("proposal");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Firestore state
  const [proposals, setProposals] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Filter state
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Modal + form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newPaper, setNewPaper] = useState({
    title: "",
    takenBy: "",
    startDate: "",
    endDate: "",
    status: "Started",
    details: "",
    completedDate: "",
  });

  // Refs for date inputs so we can open native picker on touch/click
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // Research team
  const teamLeader = {
    id: 0,
    name: "Abinesh",
    role: "Senior Researcher",
    image: img1,
  };

  const teamMembers = [
    { id: 1, name: "Shajini", role: "Researcher", image: img2 },
    { id: 2, name: "Mahesh", role: "Programmer", image: img3 },
    // { id: 3, name: "Arun", role: "Programmer", image: img4 },
    { id: 4, name: "Akash", role: "Programmer", image: img5 },
  ];

  const initialStatusOptions = [
    {
      value: "all",
      label: "All Proposals",
      color: "text-gray-600",
      bg: "bg-gray-100",
      border: "border-gray-200",
      icon: Filter,
      count: 0,
    },
    {
      value: "Started",
      label: "Started",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: Clock,
      count: 0,
    },
    {
      value: "On Hold",
      label: "On Hold",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: AlertCircle,
      count: 0,
    },
    {
      value: "Completed",
      label: "Completed",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: CheckCircle,
      count: 0,
    },
  ];

  const [statusOptions, setStatusOptions] = useState(initialStatusOptions);

  // Load proposals
  useEffect(() => {
    const load = async () => {
      const data = await fetchProposals();
      setProposals(data);
      setLoadingData(false);
    };
    load();
  }, []);

  // Calculate counts for each status filter
  useEffect(() => {
    if (proposals.length > 0) {
      const counts = {
        all: proposals.length,
        Started: proposals.filter((p) => p.status === "Started").length,
        "On Hold": proposals.filter((p) => p.status === "On Hold").length,
        Completed: proposals.filter((p) => p.status === "Completed").length,
      };

      const updatedOptions = initialStatusOptions.map((option) => ({
        ...option,
        count: counts[option.value] || 0,
      }));

      setStatusOptions(updatedOptions);
    } else {
      setStatusOptions(
        initialStatusOptions.map((option) => ({ ...option, count: 0 })),
      );
    }
  }, [proposals]);

  // Filter proposals based on selected filter and sort by end date
  const filteredProposals = useMemo(() => {
    let list;
    if (statusFilter === "all") {
      list = proposals;
    } else {
      list = proposals.filter((proposal) => proposal.status === statusFilter);
    }

    // sort by end date (newest first)
    return [...list].sort((a, b) => {
      const da = a.endDate ? new Date(a.endDate) : new Date(0);
      const db = b.endDate ? new Date(b.endDate) : new Date(0);
      return db - da; // descending
    });
  }, [proposals, statusFilter]);

  // Calculate pagination data
  const totalItems = filteredProposals.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProposals.slice(startIndex, endIndex);
  }, [filteredProposals, currentPage, itemsPerPage]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // In the middle
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Calculate deadline (start date + 2 days)
  const calculateAutoDeadline = (startDate) => {
    if (!startDate) return "";
    const date = new Date(startDate);
    date.setDate(date.getDate() + 2);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Check if deadline is today or passed
  const checkDeadlineStatus = (endDate) => {
    if (!endDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadline = new Date(endDate);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: "overdue", days: diffDays, text: "Overdue" };
    } else if (diffDays === 0) {
      return { status: "today", days: 0, text: "Due today" };
    } else if (diffDays <= 3) {
      return {
        status: "approaching",
        days: diffDays,
        text: `Due in ${diffDays} days`,
      };
    }

    return null;
  };

  // Calculate how many days it took to complete
  const calculateCompletionTiming = (startDate, completedDate) => {
    if (!startDate || !completedDate) return "";

    const start = new Date(startDate);
    const completed = new Date(completedDate);

    const diffTime = completed - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} days`;
  };

  // Check if completion was overdue
  const checkIfOverdue = (endDate, completedDate) => {
    if (!endDate || !completedDate) return false;

    const deadline = new Date(endDate);
    const completed = new Date(completedDate);

    deadline.setHours(0, 0, 0, 0);
    completed.setHours(0, 0, 0, 0);

    return completed > deadline;
  };

  // Calculate how many days overdue or early
  const calculateOverdueDays = (endDate, completedDate) => {
    if (!endDate || !completedDate) return 0;

    const deadline = new Date(endDate);
    const completed = new Date(completedDate);

    deadline.setHours(0, 0, 0, 0);
    completed.setHours(0, 0, 0, 0);

    const diffTime = completed - deadline;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Logout
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

  // Input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "startDate" && value) {
      const autoEndDate = calculateAutoDeadline(value);
      setNewPaper((prev) => ({
        ...prev,
        [id]: value,
        endDate: autoEndDate,
      }));
    } else {
      setNewPaper((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Add new proposal
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const newProposal = await addProposal(newPaper);
    setProposals((prev) => [...prev, newProposal]);

    setIsModalOpen(false);
    setNewPaper({
      title: "",
      takenBy: "",
      startDate: "",
      endDate: "",
      status: "Started",
      details: "",
      completedDate: "",
    });
    setIsSaving(false);
  };

  // Edit proposal (open modal)
  const openEdit = (proposal) => {
    setEditMode(true);
    setEditingId(proposal.id);
    setNewPaper(proposal);
    setIsModalOpen(true);
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const originalProposal = proposals.find((p) => p.id === editingId);
    let updatedData = { ...newPaper, id: editingId };

    if (
      originalProposal?.status !== "Completed" &&
      newPaper.status === "Completed"
    ) {
      updatedData.completedDate = new Date().toISOString().split("T")[0];
    } else if (
      originalProposal?.status === "Completed" &&
      newPaper.status !== "Completed"
    ) {
      updatedData.completedDate = "";
    }

    await updateProposal(updatedData);
    setProposals((prev) =>
      prev.map((p) => (p.id === editingId ? updatedData : p)),
    );

    setEditMode(false);
    setEditingId(null);
    setIsModalOpen(false);
    setIsSaving(false);
  };

  // Delete
  const handleDelete = async (id) => {
    await deleteProposal(id);
    setProposals((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
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

  return (
    <ReserchLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      isLoading={isLoggingOut}
    >
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Research Proposals
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and track all research papers
          </p>
        </div>

        {/* TEAM */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">
                Research Proposal Team
              </h2>
            </div>
            <span className="text-indigo-500/70 text-sm font-medium">
              {1 + teamMembers.length} Members
            </span>
          </div>

          {/* Team Leader Card */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Team Leader
            </h3>
            <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 transition-all duration-300">
              <img
                src={teamLeader.image}
                alt={teamLeader.name}
                className="w-12 h-12 rounded-full border-2 border-amber-400"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {teamLeader.name}
                  </h3>
                  <span className="ml-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                    Leader
                  </span>
                </div>
                <p className="text-amber-600 text-sm">{teamLeader.role}</p>
              </div>
              <div className="text-right">
                <div className="text-gray-800 font-semibold">
                  {
                    proposals.filter((p) => p.takenBy === teamLeader.name)
                      .length
                  }{" "}
                  Papers
                </div>
                <div className="text-amber-600 text-xs font-medium">Leader</div>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Team Members
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center p-4 rounded-xl bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-10 h-10 rounded-full border-2 border-indigo-400"
                  />
                  <div className="ml-3 flex-1">
                    <h3 className="text-gray-800 font-medium">{member.name}</h3>
                    <p className="text-indigo-600 text-xs">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-800 font-semibold text-sm">
                      {
                        proposals.filter((p) => p.takenBy === member.name)
                          .length
                      }
                    </div>
                    <div className="text-gray-500 text-xs">Papers</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATUS FILTER SECTION */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                Filter by Status
              </h3>
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Showing {filteredProposals.length} of {proposals.length} proposals
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {statusOptions.map((option) => {
              const Icon = option.icon;
              const isActive = statusFilter === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                    isActive
                      ? `${option.bg} border-indigo-400 shadow-md shadow-indigo-500/10`
                      : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 ${isActive ? option.color : "text-gray-500"}`}
                  />
                  <span
                    className={`font-medium ${isActive ? option.color : "text-gray-700"}`}
                  >
                    {option.label}
                  </span>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      isActive
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {option.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ADD BUTTON */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Proposals</h2>
            <p className="text-gray-600 text-sm mt-1">
              {statusFilter === "all"
                ? "Showing all proposals"
                : `Showing ${statusFilter} proposals only`}
            </p>
          </div>
          <button
            onClick={() => {
              setEditMode(false);
              setIsModalOpen(true);
            }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5 mr-2" /> Add New Paper
          </button>
        </div>

        {/* TABLE - UPDATED COLUMNS TO INCLUDE COMPLETION DATE */}
        <DataTable
          columns={[
            { key: "serialNo", label: "S.No" },
            { key: "title", label: "Paper Name" },
            { key: "takenBy", label: "Researcher" },
            { key: "timeline", label: "Timeline" },
            { key: "deadline", label: "Deadline Status" },
            { key: "status", label: "Status" },
            { key: "details", label: "Details" },
            { key: "actions", label: "Actions" },
          ]}
          data={currentItems.map((proposal, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;
            const statusInfo = statusOptions.find(
              (s) => s.value === proposal.status,
            );
            const StatusIcon = statusInfo?.icon;
            const deadlineStatus = checkDeadlineStatus(proposal.endDate);
            const isOverdue = checkIfOverdue(
              proposal.endDate,
              proposal.completedDate,
            );
            const overdueDays = calculateOverdueDays(
              proposal.endDate,
              proposal.completedDate,
            );

            return {
              ...proposal,
              renderRow: (item, onRowExpand) => (
                <tr
                  onClick={() => onRowExpand(item.id)}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="p-3 text-center">
                    <div className="text-gray-800 font-semibold">
                      {globalIndex}
                    </div>
                  </td>

                  <td className="p-3 text-gray-800 font-medium">
                    {item.title}
                  </td>

                  <td className="p-3 text-gray-700">{item.takenBy}</td>

                  <td className="p-3 text-gray-700">
                    <div className="flex flex-col">
                      <span>{formatDate(item.startDate)}</span>
                      <span className="text-sm text-gray-500">to</span>
                      <span className="text-gray-700">
                        {formatDate(item.endDate)}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    {item.status === "Completed" ? (
                      <div className="flex flex-col items-center">
                        {isOverdue ? (
                          <>
                            <AlertOctagon className="w-4 h-4 text-red-500 mb-1" />
                            <span className="text-xs text-red-600 font-medium">
                              Overdue
                            </span>
                            <span className="text-xs text-red-500">
                              {overdueDays} days late
                            </span>
                          </>
                        ) : (
                          <>
                            <CheckCheck className="w-4 h-4 text-emerald-500 mb-1" />
                            <span className="text-xs text-emerald-600 font-medium">
                              On Time
                            </span>
                          </>
                        )}
                      </div>
                    ) : deadlineStatus ? (
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full mb-1 ${
                            deadlineStatus.status === "overdue"
                              ? "bg-red-500 animate-pulse"
                              : deadlineStatus.status === "today"
                                ? "bg-red-500"
                                : deadlineStatus.status === "approaching"
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium ${
                            deadlineStatus.status === "overdue"
                              ? "text-red-600"
                              : deadlineStatus.status === "today"
                                ? "text-red-600"
                                : deadlineStatus.status === "approaching"
                                  ? "text-amber-600"
                                  : "text-emerald-600"
                          }`}
                        >
                          {deadlineStatus.text}
                        </span>
                      </div>
                    ) : null}
                  </td>

                  <td className="p-3">
                    <div
                      className={`px-3 py-1.5 rounded-full ${statusInfo?.bg} border ${statusInfo?.border} inline-flex items-center`}
                    >
                      <StatusIcon
                        className={`w-4 h-4 mr-2 ${statusInfo?.color}`}
                      />
                      <span className={`${statusInfo?.color} font-medium`}>
                        {item.status}
                      </span>
                    </div>
                  </td>

                  <td className="p-3 text-indigo-600">
                    {expandedRow === item.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(item);
                        }}
                        className="px-4 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium rounded-lg transition-colors hover:shadow-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="px-4 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 font-medium rounded-lg transition-colors hover:shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ),
              expandContent: (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      Paper Details
                    </h4>
                    {proposal.status === "Completed" ? (
                      <div
                        className={`px-3 py-1.5 rounded-full ${isOverdue ? "bg-red-100 text-red-700 border border-red-200" : "bg-emerald-100 text-emerald-700 border border-emerald-200"}`}
                      >
                        <div className="flex items-center">
                          {isOverdue ? (
                            <AlertOctagon className="w-4 h-4 mr-2" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-2" />
                          )}
                          <span className="text-sm font-medium">
                            {isOverdue
                              ? `Completed ${overdueDays} days overdue`
                              : "Completed on time"}
                          </span>
                        </div>
                      </div>
                    ) : deadlineStatus ? (
                      <div
                        className={`px-3 py-1.5 rounded-full ${
                          deadlineStatus.status === "overdue"
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : deadlineStatus.status === "today"
                              ? "bg-red-100 text-red-700 border border-red-200"
                              : deadlineStatus.status === "approaching"
                                ? "bg-amber-100 text-amber-700 border border-amber-200"
                                : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">
                            {deadlineStatus.text}
                          </span>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <p className="text-gray-700 mb-4">{proposal.details}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 text-indigo-600 mr-2" />
                        <span className="text-indigo-600 font-medium">
                          Start Date:
                        </span>
                      </div>
                      <div className="text-gray-700 ml-6 font-medium">
                        {formatDate(proposal.startDate)}
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-1">
                        <CalendarDays className="w-4 h-4 text-indigo-600 mr-2" />
                        <span className="text-indigo-600 font-medium">
                          Due Date:
                        </span>
                      </div>
                      <div className="text-gray-700 ml-6 font-medium">
                        {formatDate(proposal.endDate)}
                      </div>
                    </div>

                    {proposal.status === "Completed" ? (
                      <div
                        className={`p-3 rounded-lg border ${isOverdue ? "bg-red-50 border-red-200" : "bg-emerald-50 border-emerald-200"}`}
                      >
                        <div className="flex items-center mb-1">
                          <CheckCircle
                            className={`w-4 h-4 mr-2 ${isOverdue ? "text-red-600" : "text-emerald-600"}`}
                          />
                          <span
                            className={`font-medium ${isOverdue ? "text-red-600" : "text-emerald-600"}`}
                          >
                            Completion Date:
                          </span>
                        </div>
                        <div
                          className={`ml-6 font-medium ${isOverdue ? "text-red-700" : "text-emerald-700"}`}
                        >
                          {formatDate(proposal.completedDate)}
                        </div>
                        {proposal.completedDate && (
                          <div
                            className={`text-xs mt-2 ml-6 ${isOverdue ? "text-red-600" : "text-emerald-600"}`}
                          >
                            {isOverdue ? (
                              <span className="font-medium">
                                Overdue by {overdueDays} days
                              </span>
                            ) : (
                              <span className="font-medium">
                                Completed in{" "}
                                {calculateCompletionTiming(
                                  proposal.startDate,
                                  proposal.completedDate,
                                )}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex items-center mb-1">
                          <Clock className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-gray-600 font-medium">
                            Completion:
                          </span>
                        </div>
                        <div className="text-gray-500 ml-6 italic font-medium">
                          Pending
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ),
            };
          })}
          expandedRow={expandedRow}
          onRowExpand={toggleRowExpansion}
        />

        {/* Pagination Controls */}
        {totalItems > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mt-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Items per page selector */}
              <div className="flex items-center gap-3">
                <span className="text-gray-700 text-sm font-medium">
                  Items per page:
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value={5} className="bg-white">
                    5
                  </option>
                  <option value={10} className="bg-white">
                    10
                  </option>
                  <option value={20} className="bg-white">
                    20
                  </option>
                  <option value={50} className="bg-white">
                    50
                  </option>
                </select>
                <span className="text-gray-600 text-sm">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                  {totalItems} proposals
                </span>
              </div>

              {/* Pagination buttons */}
              <div className="flex items-center gap-2">
                {/* First page button */}
                <button
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-400 hover:bg-gray-50 transition-colors"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>

                {/* Previous page button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-400 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                <div className="flex gap-1 mx-2">
                  {getPageNumbers().map((pageNum, index) =>
                    pageNum === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-3 py-2 text-gray-500"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-colors ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md shadow-indigo-500/20"
                            : "bg-white border border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ),
                  )}
                </div>

                {/* Next page button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-400 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Last page button */}
                <button
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-white border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-400 hover:bg-gray-50 transition-colors"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Page info */}
            <div className="flex items-center justify-center mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600 font-medium">
                Page {currentPage} of {totalPages} • {totalItems} total
                proposals
              </span>
            </div>
          </div>
        )}

        {/* Empty state when no proposals match filter */}
        {filteredProposals.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No proposals found
            </h3>
            <p className="text-gray-600 mb-6">
              {statusFilter === "all"
                ? "No proposals have been added yet. Click 'Add New Paper' to get started."
                : `No ${statusFilter.toLowerCase()} proposals found. Try changing the filter or add new proposals.`}
            </p>
            {statusFilter !== "all" && (
              <button
                onClick={() => setStatusFilter("all")}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
              >
                Show All Proposals
              </button>
            )}
          </div>
        )}

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl border border-indigo-200 shadow-2xl shadow-indigo-500/10">
              <div className="relative p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-100 to-blue-100 mr-4">
                      {editMode ? (
                        <FileEdit className="w-8 h-8 text-indigo-600" />
                      ) : (
                        <Plus className="w-8 h-8 text-indigo-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {editMode
                          ? "Edit Research Paper"
                          : "Add New Research Paper"}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {editMode
                          ? "Update the research paper details below"
                          : "Fill in the details to add a new research paper"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                  </button>
                </div>
              </div>

              <form onSubmit={editMode ? handleUpdate : handleSubmit}>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                        Paper Name
                      </label>
                      <div className="relative">
                        <input
                          id="title"
                          value={newPaper.title}
                          onChange={handleInputChange}
                          className="w-full px-4 pl-10 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                          placeholder="Enter paper title"
                          required
                        />
                        <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        <User className="w-4 h-4 mr-2 text-indigo-600" />
                        Researcher
                      </label>
                      <div className="relative">
                        <select
                          value={newPaper.takenBy}
                          onChange={(e) =>
                            setNewPaper((p) => ({
                              ...p,
                              takenBy: e.target.value,
                            }))
                          }
                          required
                          className="w-full px-4 pl-10 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 appearance-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        >
                          <option value="" className="bg-white">
                            Select researcher
                          </option>
                          <optgroup label="Team lead" className="bg-white">
                            <option
                              value={teamLeader.name}
                              className="bg-white"
                            >
                              {teamLeader.name} (Lead)
                            </option>
                          </optgroup>
                          <optgroup label="Team Members" className="bg-white">
                            {teamMembers.map((m) => (
                              <option
                                key={m.id}
                                value={m.name}
                                className="bg-white"
                              >
                                {m.name} ({m.role})
                              </option>
                            ))}
                          </optgroup>
                        </select>
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                        Start Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="startDate"
                          ref={startDateRef}
                          value={newPaper.startDate}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 pl-10 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                        <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        <CalendarDays className="w-4 h-4 mr-2 text-indigo-600" />
                        End Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="endDate"
                          ref={endDateRef}
                          value={newPaper.endDate}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 pl-10 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                        <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                      </div>
                      {newPaper.endDate &&
                        checkDeadlineStatus(newPaper.endDate) && (
                          <div
                            className={`mt-2 flex items-center text-sm px-3 py-2 rounded-lg ${
                              checkDeadlineStatus(newPaper.endDate).status ===
                              "overdue"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : checkDeadlineStatus(newPaper.endDate)
                                      .status === "today"
                                  ? "bg-red-100 text-red-700 border border-red-200"
                                  : checkDeadlineStatus(newPaper.endDate)
                                        .status === "approaching"
                                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                                    : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                            }`}
                          >
                            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>
                              {checkDeadlineStatus(newPaper.endDate).text}
                            </span>
                          </div>
                        )}
                    </div>

                    <div className="md:col-span-2 space-y-3">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        <CalendarClock className="w-4 h-4 mr-2 text-indigo-600" />
                        Status
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {statusOptions
                          .filter((option) => option.value !== "all")
                          .map((option) => {
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
                                className={`flex items-center justify-center px-4 py-4 rounded-xl border transition-all ${
                                  newPaper.status === option.value
                                    ? `${option.bg} ${option.border} border-indigo-400 shadow-md shadow-indigo-500/10`
                                    : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                                }`}
                              >
                                <Icon
                                  className={`w-5 h-5 mr-3 ${newPaper.status === option.value ? option.color : "text-gray-600"}`}
                                />
                                <span
                                  className={`font-medium ${newPaper.status === option.value ? option.color : "text-gray-700"}`}
                                >
                                  {option.label}
                                </span>
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-800">
                        <FileEdit className="w-4 h-4 mr-2 text-indigo-600" />
                        Paper Details
                      </label>
                      <textarea
                        id="details"
                        value={newPaper.details}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        rows={4}
                        placeholder="Enter paper description, objectives, methodology..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50/50 rounded-b-2xl">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3.5 border border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-100 rounded-xl font-medium transition-all flex items-center justify-center"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </span>
                      ) : editMode ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Update Paper
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 mr-2" />
                          Add Paper
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ReserchLayout>
  );
};

export default ProposalPage;
