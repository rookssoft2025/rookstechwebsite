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
  Download,
  Share2,
  Eye,
  Clock as ClockIcon,
  Crown,
  Filter,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import DataTable from "../../../../components/ResearchLayout/DataTable";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import {
  fetchPaperWritings,
  addPaperWriting,
  updatePaperWriting,
  deletePaperWriting,
} from "../../../../services/PaperWritingService";

const PaperWritingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("writing");
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
    role: "Team Lead",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isLead: true,
  };

  const teamMembers = [
    {
      id: 2,
      name: "Prof. Michael Chen",
      role: "Member",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      isLead: false,
    },
    {
      id: 3,
      name: "Dr. Emma Wilson",
      role: "Member",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      isLead: false,
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      role: "Member",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      isLead: false,
    },
  ];

  // State management - load from Firestore
  const [papers, setPapers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingPaper, setEditingPaper] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [newPaper, setNewPaper] = useState({
    title: "",
    takenBy: "",
    startDate: "",
    deadline: "",
    status: "Started",
    details: "",
    completionMeter: 0,
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPaperWritings();
        if (mounted) {
          // Map Firestore results to expected paper shape if needed
          const mapped = data.map((d, idx) => ({
            ...d,
            serialNo: d.serialNo || idx + 1,
            progress: d.progress || d.completionMeter || 0,
          }));
          setPapers(mapped);
        }
      } catch (err) {
        console.error("Failed to load papers:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Status options: Started, Reviewing, Completed, On Hold
  const statusOptions = [
    {
      value: "Started",
      label: "Started",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      icon: Clock,
      count: 0,
    },
    {
      value: "Reviewing",
      label: "Reviewing",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      icon: Eye,
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
    {
      value: "On Hold",
      label: "On Hold",
      color: "text-red-400",
      bg: "bg-red-400/10",
      icon: AlertCircle,
      count: 0,
    },
  ];

  // Filter papers based on selected filter
  const filteredPapers = useMemo(() => {
    if (statusFilter === null) {
      return papers;
    }
    return papers.filter((paper) => paper.status === statusFilter);
  }, [papers, statusFilter]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewPaper((prev) => ({ ...prev, [id]: value }));
  };

  // Handle completion meter change
  const handleCompletionMeterChange = (value) => {
    setNewPaper((prev) => ({
      ...prev,
      completionMeter: parseInt(value),
      progress: parseInt(value), // Update progress as well
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingPaper) {
        const paperToSubmit = {
          ...editingPaper,
          ...newPaper,
          progress: newPaper.completionMeter,
        };

        await updatePaperWriting(paperToSubmit);
        setPapers((prev) => prev.map((p) => (p.id === paperToSubmit.id ? { ...p, ...paperToSubmit } : p)));
      } else {
        // compute serialNo locally
        const nextSerialNo = papers.length > 0 ? Math.max(...papers.map((p) => p.serialNo || 0)) + 1 : 1;
        const paperToSubmit = {
          serialNo: nextSerialNo,
          progress: newPaper.completionMeter,
          sections: ["Abstract", "Introduction"],
          ...newPaper,
        };

        const created = await addPaperWriting(paperToSubmit);
        setPapers((prev) => [...prev, { ...created, serialNo: created.serialNo || paperToSubmit.serialNo, progress: created.progress || paperToSubmit.progress }]);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save paper. Check console for details.");
    } finally {
      setIsModalOpen(false);
      setEditingPaper(null);
      setNewPaper({
        title: "",
        takenBy: "",
        startDate: "",
        deadline: "",
        status: "Started",
        details: "",
        completionMeter: 0,
      });
      setIsLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (paper) => {
    setEditingPaper(paper);
    setNewPaper({
      title: paper.title,
      takenBy: paper.takenBy,
      startDate: paper.startDate,
      deadline: paper.deadline,
      status: paper.status,
      details: paper.details,
      completionMeter: paper.completionMeter || paper.progress,
    });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this paper?")) return;
    try {
      setIsLoading(true);
      await deletePaperWriting(id);
      const deletedPaper = papers.find((p) => p.id === id);
      const deletedSerialNo = deletedPaper?.serialNo;

      const updatedPapers = papers
        .filter((paper) => paper.id !== id)
        .map((paper) => {
          if (deletedSerialNo && paper.serialNo > deletedSerialNo) {
            return { ...paper, serialNo: paper.serialNo - 1 };
          }
          return paper;
        });

      setPapers(updatedPapers);
    } catch (err) {
      console.error("Failed to delete paper:", err);
      alert("Failed to delete paper. Check console for details.");
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate days remaining
  const calculateDaysRemaining = (deadline) => {
    if (!deadline) return 0;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Prepare data for DataTable component
  const tableColumns = [
    { key: "serialNo", label: "S.No", width: "8%" },
    { key: "title", label: "Paper Title", width: "27%" },
    { key: "takenBy", label: "Taken By", width: "15%" },
    { key: "progress", label: "Progress", width: "20%" },
    { key: "deadline", label: "Deadline", width: "15%" },
    { key: "status", label: "Status", width: "10%" },
    { key: "actions", label: "Actions", width: "10%" },
  ];

  // Transform papers data for DataTable
  const tableData = papers.map((paper) => {
    const paperDaysRemaining = calculateDaysRemaining(paper.deadline);
    const paperStatusOption = statusOptions.find((s) => s.value === paper.status) || statusOptions[0];
    const PaperStatusIcon = paperStatusOption.icon;
    const paperStatusColor = paperStatusOption.color;
    const paperStatusBg = paperStatusOption.bg;
    
    return {
      id: paper.id,
      _paperData: paper,
      renderRow: (item, onRowExpand) => {
        const paperData = item._paperData;
        return (
          <tr className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
            <td className="py-4 px-4 text-center">
              <div className="text-cyan-400 font-bold text-lg">
                {paperData.serialNo}
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-cyan-400 mr-3" />
                <div>
                  <div className="text-white font-medium">
                    {paperData.title}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Started: {formatDate(paperData.startDate)}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="flex items-center">
                <img
                  src={
                    paperData.takenBy === leadResearcher.name
                      ? leadResearcher.image
                      : teamMembers.find((m) => m.name === paperData.takenBy)?.image ||
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                  }
                  alt={paperData.takenBy}
                  className="w-8 h-8 rounded-full border border-cyan-500/50 mr-3"
                />
                <div>
                  <div className="text-gray-300">{paperData.takenBy}</div>
                  {paperData.takenBy === leadResearcher.name && (
                    <div className="text-xs flex items-center text-yellow-400">
                      Team Lead
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{paperData.progress}%</span>
                  <span className="text-cyan-300">
                    {paperDaysRemaining > 0 ? `${paperDaysRemaining} days left` : paperDaysRemaining < 0 ? `${Math.abs(paperDaysRemaining)} days overdue` : "Due today"}
                  </span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      paperData.progress < 30
                        ? "bg-gradient-to-r from-red-500 to-orange-500"
                        : paperData.progress < 70
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                    style={{ width: `${paperData.progress}%` }}
                  ></div>
                </div>
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-purple-400 mr-2" />
                <div>
                  <div className="text-gray-300">
                    {formatDate(paperData.deadline)}
                  </div>
                  <div
                    className={`text-xs ${
                      paperDaysRemaining <= 7 ? "text-red-400" : "text-gray-500"
                    }`}
                  >
                    {paperDaysRemaining > 0
                      ? `${paperDaysRemaining} days remaining`
                      : paperDaysRemaining < 0
                      ? "Overdue"
                      : "Due today"}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-4 px-4">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full ${paperStatusBg}`}
              >
                <PaperStatusIcon
                  className={`w-4 h-4 mr-2 ${paperStatusColor}`}
                />
                <span className={`text-sm font-medium ${paperStatusColor}`}>
                  {paperData.status}
                </span>
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleRowExpansion(paper.id)}
                  className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {expandedRow === paper.id ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(paper)}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(paper.id)}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold text-white mb-4">
                Paper Details
              </h4>
              <p className="text-gray-300 mb-6 bg-gray-800/50 p-4 rounded-lg">
                {paper.details}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Timeline & Progress
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                    Start Date
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatDate(paper.startDate)}
                  </div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                    Deadline
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatDate(paper.deadline)}
                  </div>
                  <div className={`text-sm mt-1 ${
                    calculateDaysRemaining(paper.deadline) <= 7
                      ? "text-red-400"
                      : "text-cyan-400"
                  }`}>
                    {calculateDaysRemaining(paper.deadline) > 0
                      ? `${calculateDaysRemaining(paper.deadline)} days remaining`
                      : calculateDaysRemaining(paper.deadline) < 0
                      ? `${Math.abs(calculateDaysRemaining(paper.deadline))} days overdue`
                      : "Due today"}
                  </div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 flex items-center mb-2">
                    <BarChart3 className="w-4 h-4 mr-2 text-green-400" />
                    Completion
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {paper.progress}%
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        paper.progress < 30
                          ? "bg-gradient-to-r from-red-500 to-orange-500"
                          : paper.progress < 70
                          ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                          : "bg-gradient-to-r from-green-500 to-emerald-500"
                      }`}
                      style={{ width: `${paper.progress}%` }}
                    ></div>
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
            Paper Writing Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your research papers, track progress, and collaborate with
            team members
          </p>
        </div>

        {/* Team Section */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">Writing Team</h2>
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
                  {
                    papers.filter((p) => p.takenBy === leadResearcher.name)
                      .length
                  }{" "}
                  Papers
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
                      {papers.filter((p) => p.takenBy === member.name).length}
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
              Showing{" "}
              {statusFilter === null
                ? papers.length
                : papers.filter((p) => p.status === statusFilter).length}{" "}
              of {papers.length} papers
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
                All Papers
              </span>
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  statusFilter === null
                    ? "bg-gray-800 text-white"
                    : "bg-gray-800/70 text-gray-400"
                }`}
              >
                {papers.length}
              </span>
            </button>

            {statusOptions.map((option) => {
              const Icon = option.icon;
              const isActive = statusFilter === option.value;
              const count = papers.filter(
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

        {/* Add New Paper Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Active Papers</h2>
            <p className="text-gray-400 text-sm mt-1">
              {statusFilter === null
                ? "Showing all papers"
                : `Showing ${statusFilter} papers only`}
            </p>
          </div>
          <button
            onClick={() => {
              setEditingPaper(null);
              setNewPaper({
                title: "",
                takenBy: "",
                startDate: "",
                deadline: "",
                status: "Started",
                details: "",
                completionMeter: 0,
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
          data={tableData.filter((item) =>
            statusFilter === null
              ? true
              : item._paperData.status === statusFilter
          )}
          expandedRow={expandedRow}
          onRowExpand={toggleRowExpansion}
          rowKey="id"
        />

        {/* Empty State */}
        {filteredPapers.length === 0 && statusFilter !== null && (
          <div className="glass-card rounded-2xl p-8 text-center border border-gray-800">
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No papers found
            </h3>
            <p className="text-gray-400 mb-6">
              No {statusFilter.toLowerCase()} papers found. Try changing the
              filter or add new papers.
            </p>
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
                    <div>
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
                        Taken By
                      </label>
                      <select
                        id="takenBy"
                        value={newPaper.takenBy}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                      >
                        <option value="">Select researcher</option>
                        <optgroup label="Team lead">
                          <option value={leadResearcher.name}>
                            {leadResearcher.name} (Lead)
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

                    <div className="relative">
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Start Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" />
                        <input
                          type="date"
                          id="startDate"
                          value={newPaper.startDate}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all appearance-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-cyan-300 mb-2">
                        Deadline
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                        <input
                          type="date"
                          id="deadline"
                          value={newPaper.deadline}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all appearance-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Status
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {statusOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              setNewPaper((prev) => ({
                                ...prev,
                                status: option.value,
                              }))
                            }
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                              newPaper.status === option.value
                                ? `${option.bg} border-cyan-500/50 shadow-lg shadow-cyan-500/10`
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

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Completion Meter
                    </label>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-white font-bold text-lg">
                          {newPaper.completionMeter}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={newPaper.completionMeter}
                        onChange={(e) => handleCompletionMeterChange(e.target.value)}
                        className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-cyan-500 [&::-webkit-slider-thumb]:to-purple-600"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
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
                      rows="3"
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

export default PaperWritingPage;