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
import img4 from "../../assets/arun.jpg";
import img5 from "../../assets/akash.jpg";

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
  });

  // Refs for date inputs so we can open native picker on touch/click
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // Research team
  // Team Leader (Abinesh)
  const teamLeader = {
    id: 0,
    name: "Abinesh",
    role: "Senior Researcher",
    image: img1,
  };

  // Team Members (excluding leader)
  const teamMembers = [
    {
      id: 1,
      name: "Shajini",
      role: "Researcher",
      image: img2,
    },
    {
      id: 2,
      name: "Mahesh",
      role: "Programmer",
      image: img3,
    },
    {
      id: 3,
      name: "Arun",
      role: "Programmer",
      image: img4,
    },
    {
      id: 4,
      name: "Akash",
      role: "Programmer",
      image: img5,
    },
  ];

  // Lead researcher reference (first member)
  const leadResearcher = teamMembers[0];

  // Status options for filter and display - UPDATED: Removed "In Progress"
  const initialStatusOptions = [
    {
      value: "all",
      label: "All Proposals",
      color: "text-gray-400",
      bg: "bg-gray-400/10",
      icon: Filter,
      count: 0,
    },
    {
      value: "Started",
      label: "Started",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      icon: Clock,
      count: 0,
    },
    {
      value: "On Hold",
      label: "On Hold",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      icon: AlertCircle,
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

  // State for status options with dynamic counts
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

  // Calculate counts for each status filter - UPDATED: Removed "In Progress"
  useEffect(() => {
    if (proposals.length > 0) {
      // Calculate counts for each status
      const counts = {
        all: proposals.length,
        Started: proposals.filter((p) => p.status === "Started").length,
        "On Hold": proposals.filter((p) => p.status === "On Hold").length,
        Completed: proposals.filter((p) => p.status === "Completed").length,
      };

      // Update status options with counts - Create new array to trigger re-render
      const updatedOptions = initialStatusOptions.map((option) => ({
        ...option,
        count: counts[option.value] || 0,
      }));

      setStatusOptions(updatedOptions);
    } else {
      // Reset counts if no proposals
      setStatusOptions(
        initialStatusOptions.map((option) => ({ ...option, count: 0 }))
      );
    }
  }, [proposals]);

  // Filter proposals based on selected filter
  const filteredProposals = useMemo(() => {
    if (statusFilter === "all") {
      return proposals;
    }
    return proposals.filter((proposal) => proposal.status === statusFilter);
  }, [proposals, statusFilter]);

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

    // Calculate difference in days
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

  // Logout
  const handleLogout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate("/login");
    setIsLoading(false);
  };

  // Input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "startDate" && value) {
      // Auto-calculate end date when start date changes
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

    const updated = { ...newPaper, id: editingId };
    await updateProposal(updated);

    setProposals((prev) => prev.map((p) => (p.id === editingId ? updated : p)));

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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <ReserchLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      isLoading={isLoading}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Research Proposals
          </h1>
          <p className="text-gray-400 mt-2">
            Manage and track all research papers
          </p>
        </div>

        {/* TEAM */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                Research Proposal Team
              </h2>
            </div>
            <span className="text-cyan-300/70 text-sm">
              {1 + teamMembers.length} Members
            </span>
          </div>

          {/* Team Leader Card - Abinesh at top */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-3 flex items-center">
              Team Leader
            </h3>
            <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-yellow-900/20 transition-all duration-300">
              <img
                src={teamLeader.image}
                alt={teamLeader.name}
                className="w-12 h-12 rounded-full border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-600 to-amber-600"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-white">
                    {teamLeader.name}
                  </h3>
                  <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                    Leader
                  </span>
                </div>
                <p className="text-yellow-300/70 text-sm">{teamLeader.role}</p>
              </div>
              <div className="text-right">
                <div className="text-white font-semibold">
                  {
                    proposals.filter(
                      (p) => p.takenBy === teamLeader.name
                    ).length
                  }{" "}
                  Papers
                </div>
                <div className="text-yellow-400 text-xs">Leader</div>
              </div>
            </div>
          </div>

          {/* Team Members Section - all except leader */}
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
                      {
                        proposals.filter(
                          (p) => p.takenBy === member.name
                        ).length
                      }
                    </div>
                    <div className="text-gray-400 text-xs">Papers</div>
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
            <h2 className="text-2xl font-bold text-white">Proposals</h2>
            <p className="text-gray-400 text-sm mt-1">
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
            className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" /> Add New Paper
          </button>
        </div>

        {/* TABLE - UPDATED COLUMN ORDER */}
        <DataTable
          columns={[
            { key: "serialNo", label: "S.No" },
            { key: "title", label: "Paper Name" },
            { key: "takenBy", label: "Researcher" },
            { key: "timeline", label: "Timeline" },
            { key: "deadline", label: "Deadline" },
            { key: "status", label: "Status" },
            { key: "details", label: "Details" },
            { key: "actions", label: "Actions" },
          ]}
          data={filteredProposals.map((proposal, index) => {
            const statusInfo = statusOptions.find(
              (s) => s.value === proposal.status
            );
            const StatusIcon = statusInfo?.icon;
            const deadlineStatus = checkDeadlineStatus(proposal.endDate);

            return {
              ...proposal,

              // properly passed!
              renderRow: (item, onRowExpand) => (
                <tr
                  onClick={() => onRowExpand(item.id)}
                  className="border-b border-gray-800 hover:bg-gray-900/50 cursor-pointer transition-colors"
                >
                  {/* Serial No Column - 1st */}
                  <td className="py-4 px-6 text-center">
                    <div className="text-white font-semibold">{index + 1}</div>
                  </td>

                  {/* Paper Name Column - 2nd */}
                  <td className="py-4 px-6 text-white font-medium">
                    {item.title}
                  </td>

                  {/* Researcher Column - 2nd */}
                  <td className="py-4 px-6 text-gray-300">
                    {item.takenBy}
                  </td>

                  {/* Timeline Column - 3rd */}
                  <td className="py-4 px-6 text-gray-300">
                    <div className="flex flex-col">
                      <span>{formatDate(item.startDate)}</span>
                      <span className="text-sm text-gray-400">to</span>
                      <span
                        className={
                          deadlineStatus?.status === "overdue" ||
                          deadlineStatus?.status === "today"
                            ? "text-red-400 font-medium"
                            : deadlineStatus?.status === "approaching"
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        {formatDate(item.endDate)}
                      </span>
                    </div>
                  </td>

                  {/* Deadline Indicator Column - 4th */}
                  <td className="py-4 px-4 text-center">
                    {deadlineStatus && (
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full mb-1 ${
                            deadlineStatus.status === "overdue"
                              ? "bg-red-500 animate-pulse"
                              : deadlineStatus.status === "today"
                              ? "bg-red-500"
                              : deadlineStatus.status === "approaching"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          }`}
                        />
                        {deadlineStatus && (
                          <span
                            className={`text-xs ${
                              deadlineStatus.status === "overdue"
                                ? "text-red-400"
                                : deadlineStatus.status === "today"
                                ? "text-red-400"
                                : deadlineStatus.status === "approaching"
                                ? "text-yellow-400"
                                : "text-green-400"
                            }`}
                          >
                            {deadlineStatus.text}
                          </span>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Status Column - 5th */}
                  <td className="py-4 px-6">
                    <div
                      className={`px-3 py-1 rounded-full ${statusInfo?.bg} inline-flex items-center border border-gray-700`}
                    >
                      <StatusIcon
                        className={`w-4 h-4 mr-2 ${statusInfo?.color}`}
                      />
                      <span className={`${statusInfo?.color} font-medium`}>
                        {item.status}
                      </span>
                    </div>
                  </td>

                  {/* Details Column - 6th */}
                  <td className="py-4 px-6 text-cyan-400">
                    {expandedRow === item.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </td>

                  {/* Actions Column - 7th */}
                  <td className="py-4 px-6">
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(item);
                        }}
                        className="px-4 py-1.5 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                        className="px-4 py-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ),

              expandContent: (
                <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-semibold text-white">
                      Paper Details
                    </h4>
                    {deadlineStatus && (
                      <div
                        className={`px-3 py-1.5 rounded-full ${
                          deadlineStatus.status === "overdue"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : deadlineStatus.status === "today"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : deadlineStatus.status === "approaching"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-green-500/20 text-green-400 border border-green-500/30"
                        }`}
                      >
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">
                            {deadlineStatus.text}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 mb-4">{proposal.details}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-900/30 p-3 rounded-lg">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 text-cyan-400 mr-2" />
                        <span className="text-cyan-400 font-medium">
                          Start Date:
                        </span>
                      </div>
                      <div className="text-gray-300 ml-6">
                        {formatDate(proposal.startDate)}
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        deadlineStatus?.status === "overdue" ||
                        deadlineStatus?.status === "today"
                          ? "bg-red-500/10"
                          : "bg-gray-900/30"
                      }`}
                    >
                      <div className="flex items-center mb-1">
                        <CalendarDays
                          className={`w-4 h-4 mr-2 ${
                            deadlineStatus?.status === "overdue" ||
                            deadlineStatus?.status === "today"
                              ? "text-red-400"
                              : "text-cyan-400"
                          }`}
                        />
                        <span
                          className={
                            deadlineStatus?.status === "overdue" ||
                            deadlineStatus?.status === "today"
                              ? "text-red-400 font-medium"
                              : "text-cyan-400 font-medium"
                          }
                        >
                          End Date:
                        </span>
                      </div>
                      <div
                        className={`ml-6 ${
                          deadlineStatus?.status === "overdue" ||
                          deadlineStatus?.status === "today"
                            ? "text-red-400 font-medium"
                            : "text-gray-300"
                        }`}
                      >
                        {formatDate(proposal.endDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            };
          })}
          expandedRow={expandedRow}
          onRowExpand={toggleRowExpansion}
        />

        {/* Empty state when no proposals match filter */}
        {filteredProposals.length === 0 && (
          <div className="glass-card rounded-2xl p-8 text-center border border-gray-800">
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No proposals found
            </h3>
            <p className="text-gray-400 mb-6">
              {statusFilter === "all"
                ? "No proposals have been added yet. Click 'Add New Paper' to get started."
                : `No ${statusFilter.toLowerCase()} proposals found. Try changing the filter or add new proposals.`}
            </p>
            {statusFilter !== "all" && (
              <button
                onClick={() => setStatusFilter("all")}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                Show All Proposals
              </button>
            )}
          </div>
        )}

        {/* MODAL - UPDATED VISIBLE UI WITH WHITE ICONS */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl w-full max-w-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 animate-fadeIn">
              {/* Modal Header */}
              <div className="relative p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mr-4">
                      {editMode ? (
                        <FileEdit className="w-8 h-8 text-white" />
                      ) : (
                        <Plus className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {editMode
                          ? "Edit Research Paper"
                          : "Add New Research Paper"}
                      </h3>
                      <p className="text-gray-400 mt-1">
                        {editMode
                          ? "Update the research paper details below"
                          : "Fill in the details to add a new research paper"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-6 h-6 text-white hover:text-gray-300" />
                  </button>
                </div>
              </div>

              <form onSubmit={editMode ? handleUpdate : handleSubmit}>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  {/* Form Fields Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Paper Name */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-white">
                        <FileText className="w-4 h-4 mr-2 text-white" />
                        Paper Name
                      </label>
                      <div className="relative">
                        <input
                          id="title"
                          value={newPaper.title}
                          onChange={handleInputChange}
                          className="w-full px-4 pl-10 py-3 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                          placeholder="Enter paper title"
                          required
                        />
                        <FileText className="absolute left-3 top-3.5 w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Researcher */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-white">
                        <User className="w-4 h-4 mr-2 text-white" />
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
                          className="w-full px-4 pl-10 py-3 bg-gray-900/70 border border-gray-700 rounded-xl text-white appearance-none focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        >
                          <option value="" className="bg-gray-900">
                            Select researcher
                          </option>
                          <optgroup label="Team lead">
                            <option
                              value={teamLeader.name}
                              className="bg-gray-900"
                            >
                              {teamLeader.name} (Lead)
                            </option>
                          </optgroup>
                          <optgroup label="Team Members">
                            {teamMembers.map((m) => (
                              <option
                                key={m.id}
                                value={m.name}
                                className="bg-gray-900"
                              >
                                {m.name} ({m.role})
                              </option>
                            ))}
                          </optgroup>
                        </select>
                        <User className="absolute left-3 top-3.5 w-4 h-4 text-white" />
                        <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Start Date */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-white">
                        <Calendar className="w-4 h-4 mr-2 text-white" />
                        Start Date
                      </label>
                     
                      <div className="relative">
                        <input
                          type="date"
                          id="startDate"
                          ref={startDateRef}
                          value={newPaper.startDate}
                          onChange={handleInputChange}
                          onFocus={() => startDateRef.current?.showPicker?.()}
                          onClick={() => startDateRef.current?.showPicker?.()}
                          onTouchStart={() =>
                            startDateRef.current?.showPicker?.()
                          }
                          required
                          className="w-full px-4 pl-10 py-3 bg-gray-900/70 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                        <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* End Date */}
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-white">
                        <CalendarDays className="w-4 h-4 mr-2 text-white" />
                        End Date
                      </label>
                     
                      <div className="relative">
                        <input
                          type="date"
                          id="endDate"
                          ref={endDateRef}
                          value={newPaper.endDate}
                          onChange={handleInputChange}
                          onFocus={() => endDateRef.current?.showPicker?.()}
                          onClick={() => endDateRef.current?.showPicker?.()}
                          onTouchStart={() =>
                            endDateRef.current?.showPicker?.()
                          }
                          required
                          className="w-full px-4 pl-10 py-3 bg-gray-900/70 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        />
                        <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-white" />
                      </div>
                      {newPaper.endDate &&
                        checkDeadlineStatus(newPaper.endDate) && (
                          <div
                            className={`mt-2 flex items-center text-sm px-3 py-2 rounded-lg ${
                              checkDeadlineStatus(newPaper.endDate).status ===
                              "overdue"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : checkDeadlineStatus(newPaper.endDate)
                                    .status === "today"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : checkDeadlineStatus(newPaper.endDate)
                                    .status === "approaching"
                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                : "bg-green-500/20 text-green-400 border border-green-500/30"
                            }`}
                          >
                            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 text-white" />
                            <span>
                              {checkDeadlineStatus(newPaper.endDate).text}
                            </span>
                          </div>
                        )}
                    </div>

                    {/* Status - Full Width - UPDATED: Only 3 options now */}
                    <div className="md:col-span-2 space-y-3">
                      <label className="flex items-center text-sm font-medium text-white">
                        <CalendarClock className="w-4 h-4 mr-2 text-white" />
                        Status
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Filter out "all" option and show only status options */}
                        {statusOptions
                          .filter(option => option.value !== "all")
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
                                    ? `${option.bg} border-cyan-500 shadow-lg shadow-cyan-500/20`
                                    : "bg-gray-900/70 border-gray-700 hover:border-gray-600"
                                }`}
                              >
                                <Icon className={`w-5 h-5 mr-3 text-white`} />
                                <span className={`font-medium text-white`}>
                                  {option.label}
                                </span>
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* Details - Full Width */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="flex items-center text-sm font-medium text-white">
                        <FileEdit className="w-4 h-4 mr-2 text-white" />
                        Paper Details
                      </label>
                      <textarea
                        id="details"
                        value={newPaper.details}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                        rows={4}
                        placeholder="Enter paper description, objectives, methodology..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-gray-700 bg-gray-900/50 rounded-b-2xl">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3.5 border border-gray-700 text-white hover:text-gray-300 hover:border-gray-600 hover:bg-gray-800/50 rounded-xl font-medium transition-all flex items-center justify-center"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : editMode ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2 text-white" />
                          Update Paper
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 mr-2 text-white" />
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

        {/* Add animation styles */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>
      </div>
    </ReserchLayout>
  );
};

export default ProposalPage;