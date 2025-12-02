import React, { useState, useEffect } from "react";
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

const ProposalPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("proposal");
  const [isLoading, setIsLoading] = useState(false);

  // Firestore state
  const [proposals, setProposals] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Modal + form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [newPaper, setNewPaper] = useState({
    paperName: "",
    proposalTakenBy: "",
    startDate: "",
    endDate: "",
    status: "Pending",
    details: "",
  });

  // Research team
  const teamMembers = [
    {
      id: 1,
      name: "Sajin",
      role: "Team Lead",
      image: "data:image/jpeg;base64,/9j...yourBase64...",
    },
    {
      id: 2,
      name: "Taylor Chen",
      role: "Research Associate",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    },
  ];

  // Status options
  const statusOptions = [
    {
      value: "Pending",
      label: "Pending",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      icon: Clock,
    },
    {
      value: "In Progress",
      label: "In Progress",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      icon: AlertCircle,
    },
    {
      value: "Completed",
      label: "Completed",
      color: "text-green-400",
      bg: "bg-green-400/10",
      icon: CheckCircle,
    },
  ];

  // Load proposals
  useEffect(() => {
    const load = async () => {
      const data = await fetchProposals();
      setProposals(data);
      setLoadingData(false);
    };
    load();
  }, []);

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
    setNewPaper((prev) => ({ ...prev, [id]: value }));
  };

  // Add new proposal
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProposal = await addProposal(newPaper);
    setProposals((prev) => [...prev, newProposal]);

    setIsModalOpen(false);
    setNewPaper({
      paperName: "",
      proposalTakenBy: "",
      startDate: "",
      endDate: "",
      status: "Pending",
      details: "",
    });
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

    const updated = { ...newPaper, id: editingId };
    await updateProposal(updated);

    setProposals((prev) => prev.map((p) => (p.id === editingId ? updated : p)));

    setEditMode(false);
    setEditingId(null);
    setIsModalOpen(false);
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
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-cyan-400 mr-3" />
            <h2 className="text-xl font-semibold text-white">Research Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center p-4 rounded-xl bg-gray-900/50 border border-gray-800"
              >
                <img
                  src={member.image}
                  className="w-12 h-12 rounded-full border-2 border-cyan-500/50"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">
                    {member.name}
                  </h3>
                  <p className="text-cyan-300/70 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADD BUTTON */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Proposals</h2>
          <button
            onClick={() => {
              setEditMode(false);
              setIsModalOpen(true);
            }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl"
          >
            <Plus className="w-5 h-5 mr-2" /> Add New Paper
          </button>
        </div>

        {/* TABLE */}
        <DataTable
  columns={[
    { key: "paperName", label: "Paper Name" },
    { key: "proposalTakenBy", label: "Researcher" },
    { key: "timeline", label: "Timeline" },
    { key: "status", label: "Status" },
    { key: "details", label: "Details" },
    { key: "actions", label: "Actions" },
  ]}
  data={proposals.map((proposal) => {
    const statusInfo = statusOptions.find((s) => s.value === proposal.status);
    const StatusIcon = statusInfo?.icon;

    return {
      ...proposal,

      // properly passed!
      renderRow: (item, onRowExpand) => (
        <tr
          onClick={() => onRowExpand(item.id)}
          className="border-b border-gray-800 hover:bg-gray-900/50 cursor-pointer"
        >
          <td className="py-4 px-6 text-white">{item.paperName}</td>

          <td className="py-4 px-6 text-gray-300">
            {item.proposalTakenBy}
          </td>

          <td className="py-4 px-6 text-gray-300">
            {formatDate(item.startDate)} - {formatDate(item.endDate)}
          </td>

          <td className="py-4 px-6">
            <div
              className={`px-3 py-1 rounded-full ${statusInfo.bg} inline-flex items-center`}
            >
              <StatusIcon className={`w-4 h-4 mr-2 ${statusInfo.color}`} />
              <span className={statusInfo.color}>{item.status}</span>
            </div>
          </td>

          <td className="py-4 px-6 text-cyan-400">
            {expandedRow === item.id ? <ChevronUp /> : <ChevronDown />}
          </td>

          <td className="py-4 px-6">
            <div className="flex gap-3">

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEdit(item);
                }}
                className="text-blue-400 hover:text-blue-300"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id);
                }}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ),

      expandContent: (
        <>
          <h4 className="text-lg font-semibold text-white mb-3">
            Paper Details
          </h4>
          <p className="text-gray-300">{proposal.details}</p>
        </>
      ),
    };
  })}
  expandedRow={expandedRow}
  onRowExpand={toggleRowExpansion}
/>


        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="glass-card rounded-2xl w-full max-w-lg border border-cyan-500/20 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editMode ? "Edit Paper" : "Add New Paper"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={editMode ? handleUpdate : handleSubmit}>
                {/* FORM INPUTS */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-cyan-300">Paper Name</label>
                    <input
                      id="paperName"
                      value={newPaper.paperName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm text-cyan-300">Start Date</label>
                    <input
                      type="date"
                      id="startDate"
                      value={newPaper.startDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border-gray-700 border rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-cyan-300">End Date</label>
                    <input
                      type="date"
                      id="endDate"
                      value={newPaper.endDate}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border-gray-700 border rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-cyan-300">Details</label>
                    <textarea
                      id="details"
                      value={newPaper.details}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border-gray-700 rounded-xl text-white"
                      rows={3}
                    ></textarea>
                  </div>

                  {/* Researcher */}
                  <div>
                    <label className="text-sm text-cyan-300">
                      Proposal Taken By
                    </label>
                    <select
                      value={newPaper.proposalTakenBy}
                      onChange={(e) =>
                        setNewPaper((p) => ({
                          ...p,
                          proposalTakenBy: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border-gray-700 rounded-xl text-white"
                    >
                      <option value="">Select researcher</option>
                      {teamMembers.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-sm text-cyan-300">Status</label>
                    <div className="flex gap-2">
                      {statusOptions.map((option) => {
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
                            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl border ${
                              newPaper.status === option.value
                                ? `${option.bg} border-cyan-500`
                                : "bg-gray-900/50 border-gray-700"
                            }`}
                          >
                            <Icon className={`w-4 h-4 mr-2 ${option.color}`} />
                            <span className={option.color}>{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-xl"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl"
                  >
                    {editMode ? "Update" : "Add Paper"}
                  </button>
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
