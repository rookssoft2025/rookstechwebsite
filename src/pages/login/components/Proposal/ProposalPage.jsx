// import React, { useState } from 'react';
// import { Plus, Users, Calendar, FileText, ChevronDown, ChevronUp, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import ReserchLayout from '../../../../components/loginLayout/ReserchLayout';

// const ProposalPage = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('proposal');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogout = async () => {
//     setIsLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 800));
//     navigate('/login');
//     setIsLoading(false);
//   };

//   const teamMembers = [
//     { id: 1, name: "Sajin", role: "Team Lead", image: "data:image/jpeg;base64,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" },
//     { id: 2, name: "Taylor Chen", role: "Research Associate", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor" }
//   ];

//   const initialProposals = [
//     { 
//       id: 1, 
//       paperName: "Quantum Computing Algorithms", 
//       proposalTakenBy: "Alex Morgan",   
//       startDate: "2024-01-15", 
//       endDate: "2024-06-30", 
//       status: "In Progress",
//       details: "Research on quantum algorithms for optimization problems with focus on Grover's and Shor's algorithms. Includes theoretical analysis and simulation results."
//     },
//     { 
//       id: 2, 
//       paperName: "Neural Network Interpretability", 
//       proposalTakenBy: "Taylor Chen", 
//       startDate: "2023-11-10", 
//       endDate: "2024-02-28", 
//       status: "Completed",
//       details: "Developing methods to explain decisions made by deep neural networks. Includes visualization techniques and feature importance analysis."
//     },
//     { 
//       id: 3, 
//       paperName: "Blockchain Scalability Solutions", 
//       proposalTakenBy: "Alex Morgan", 
//       startDate: "2024-03-01", 
//       endDate: "2024-12-15", 
//       status: "In Progress",
//       details: "Investigating layer-2 solutions and sharding techniques to improve blockchain transaction throughput and reduce costs."
//     },
//     { 
//       id: 4, 
//       paperName: "Climate Change Modeling with AI", 
//       proposalTakenBy: "Taylor Chen", 
//       startDate: "2024-02-01", 
//       endDate: "2024-09-30", 
//       status: "Pending",
//       details: "Using machine learning models to predict climate patterns and assess the impact of various environmental factors."
//     }
//   ];

//   // State management
//   const [proposals, setProposals] = useState(initialProposals);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [newPaper, setNewPaper] = useState({
//     paperName: '',
//     proposalTakenBy: '',
//     startDate: '',
//     endDate: '',
//     status: 'Pending',
//     details: ''
//   });

//   // Modal input fields
//   const inputFields = [
//     { id: 'paperName', label: 'Paper Name', type: 'text', placeholder: 'Enter paper name' },
//     { id: 'startDate', label: 'Start Date', type: 'date' },
//     { id: 'endDate', label: 'End Date', type: 'date' },
//     { id: 'details', label: 'Details', type: 'textarea', placeholder: 'Enter paper details' }
//   ];

//   // Status options
//   const statusOptions = [
//     { value: 'Pending', label: 'Pending', color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: Clock },
//     { value: 'In Progress', label: 'In Progress', color: 'text-blue-400', bg: 'bg-blue-400/10', icon: AlertCircle },
//     { value: 'Completed', label: 'Completed', color: 'text-green-400', bg: 'bg-green-400/10', icon: CheckCircle }
//   ];

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setNewPaper(prev => ({ ...prev, [id]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newProposal = {
//       id: proposals.length + 1,
//       ...newPaper
//     };
//     setProposals([...proposals, newProposal]);
//     setIsModalOpen(false);
//     setNewPaper({
//       paperName: '',
//       proposalTakenBy: '',
//       startDate: '',
//       endDate: '',
//       status: 'Pending',
//       details: ''
//     });
//   };

//   // Toggle row expansion
//   const toggleRowExpansion = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <ReserchLayout
//       activeTab={activeTab}
//       setActiveTab={setActiveTab}
//       onLogout={handleLogout}
//       isLoading={isLoading}
//     >
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
//           Research Proposals
//         </h1>
//         <p className="text-gray-400 mt-2">Manage and track all research papers</p>
//       </div>

//       {/* Team Section */}
//       <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
//         <div className="flex items-center mb-4">
//           <Users className="w-6 h-6 text-cyan-400 mr-3" />
//           <h2 className="text-xl font-semibold text-white">Research Team</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {teamMembers.map(member => (
//             <div key={member.id} className="flex items-center p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
//               <img 
//                 src={member.image} 
//                 alt={member.name}
//                 className="w-12 h-12 rounded-full border-2 border-cyan-500/50"
//               />
//               <div className="ml-4">
//                 <h3 className="text-lg font-medium text-white">{member.name}</h3>
//                 <p className="text-cyan-300/70 text-sm">{member.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add New Paper Button */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-white">Proposals</h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02]"
//         >
//           <Plus className="w-5 h-5 mr-2" />
//           Add New Paper
//         </button>
//       </div>

//       {/* Proposals Table */}
//       <div className="glass-card rounded-2xl overflow-hidden border border-gray-800">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-900/80">
//               <tr>
//                 <th className="py-4 px-6 text-left text-gray-300 font-semibold">Paper Name</th>
//                 <th className="py-4 px-6 text-left text-gray-300 font-semibold">Researcher</th>
//                 <th className="py-4 px-6 text-left text-gray-300 font-semibold">Timeline</th>
//                 <th className="py-4 px-6 text-left text-gray-300 font-semibold">Status</th>
//                 <th className="py-4 px-6 text-left text-gray-300 font-semibold">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {proposals.map(proposal => {
//                 const StatusIcon = statusOptions.find(s => s.value === proposal.status)?.icon || Clock;
//                 const statusColor = statusOptions.find(s => s.value === proposal.status)?.color || 'text-yellow-400';
//                 const statusBg = statusOptions.find(s => s.value === proposal.status)?.bg || 'bg-yellow-400/10';
                
//                 return (
//                   <React.Fragment key={proposal.id}>
//                     <tr 
//                       onClick={() => toggleRowExpansion(proposal.id)}
//                       className="border-b border-gray-800 hover:bg-gray-900/50 cursor-pointer transition-colors"
//                     >
//                       <td className="py-4 px-6">
//                         <div className="flex items-center">
//                           <FileText className="w-5 h-5 text-cyan-400 mr-3" />
//                           <span className="text-white font-medium">{proposal.paperName}</span>
//                         </div>
//                       </td>
//                       <td className="py-4 px-6">
//                         <div className="flex items-center">
//                           <img 
//                             src={teamMembers.find(m => m.name === proposal.proposalTakenBy)?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
//                             alt={proposal.proposalTakenBy}
//                             className="w-8 h-8 rounded-full border border-cyan-500/50 mr-3"
//                           />
//                           <span className="text-gray-300">{proposal.proposalTakenBy}</span>
//                         </div>
//                       </td>
//                       <td className="py-4 px-6">
//                         <div className="flex items-center">
//                           <Calendar className="w-4 h-4 text-purple-400 mr-2" />
//                           <span className="text-gray-300">
//                             {formatDate(proposal.startDate)} - {formatDate(proposal.endDate)}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-4 px-6">
//                         <div className={`inline-flex items-center px-3 py-1 rounded-full ${statusBg}`}>
//                           <StatusIcon className={`w-4 h-4 mr-2 ${statusColor}`} />
//                           <span className={`text-sm font-medium ${statusColor}`}>{proposal.status}</span>
//                         </div>
//                       </td>
//                       <td className="py-4 px-6">
//                         <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
//                           {expandedRow === proposal.id ? (
//                             <ChevronUp className="w-5 h-5" />
//                           ) : (
//                             <ChevronDown className="w-5 h-5" />
//                           )}
//                         </button>
//                       </td>
//                     </tr>
//                     {expandedRow === proposal.id && (
//                       <tr className="bg-gray-900/30">
//                         <td colSpan="5" className="p-6">
//                           <div className="glass-inner rounded-xl p-6 border border-gray-800">
//                             <h4 className="text-lg font-semibold text-white mb-3">Paper Details</h4>
//                             <p className="text-gray-300">{proposal.details}</p>
//                             <div className="mt-4 flex flex-wrap gap-4">
//                               <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
//                                 <span className="text-sm text-gray-400">Paper ID:</span>
//                                 <span className="ml-2 text-cyan-300">#{proposal.id}</span>
//                               </div>
//                               <div className="px-4 py-2 bg-gray-800/50 rounded-lg">
//                                 <span className="text-sm text-gray-400">Duration:</span>
//                                 <span className="ml-2 text-purple-300">
//                                   {Math.ceil((new Date(proposal.endDate) - new Date(proposal.startDate)) / (1000 * 60 * 60 * 24))} days
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Add Paper Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//           <div className="glass-card rounded-2xl w-full max-w-lg border border-cyan-500/20">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-bold text-white">Add New Paper</h3>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-400 hover:text-white transition-colors"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="space-y-4">
//                   {inputFields.map(field => (
//                     <div key={field.id}>
//                       <label className="block text-sm font-medium text-cyan-300 mb-2">
//                         {field.label}
//                       </label>
//                       {field.type === 'textarea' ? (
//                         <textarea
//                           id={field.id}
//                           value={newPaper[field.id]}
//                           onChange={handleInputChange}
//                           placeholder={field.placeholder}
//                           required
//                           className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
//                           rows="3"
//                         />
//                       ) : (
//                         <input
//                           type={field.type}
//                           id={field.id}
//                           value={newPaper[field.id]}
//                           onChange={handleInputChange}
//                           placeholder={field.placeholder}
//                           required
//                           className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
//                         />
//                       )}
//                     </div>
//                   ))}

//                   {/* Proposal Taken By - Dropdown */}
//                   <div>
//                     <label className="block text-sm font-medium text-cyan-300 mb-2">
//                       Proposal Taken By
//                     </label>
//                     <select
//                       value={newPaper.proposalTakenBy}
//                       onChange={(e) => setNewPaper(prev => ({ ...prev, proposalTakenBy: e.target.value }))}
//                       required
//                       className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all appearance-none cursor-pointer"
//                     >
//                       <option value="" className="bg-gray-900 text-white">Select a researcher</option>
//                       {teamMembers.map(member => (
//                         <option key={member.id} value={member.name} className="bg-gray-900 text-white">
//                           {member.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-cyan-300 mb-2">
//                       Status
//                     </label>
//                     <div className="flex gap-2">
//                       {statusOptions.map(option => {
//                         const Icon = option.icon;
//                         return (
//                           <button
//                             key={option.value}
//                             type="button"
//                             onClick={() => setNewPaper(prev => ({ ...prev, status: option.value }))}
//                             className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl border transition-all ${
//                               newPaper.status === option.value
//                                 ? `${option.bg} border-${option.color.split('-')[1]}-400/50`
//                                 : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
//                             }`}
//                           >
//                             <Icon className={`w-4 h-4 mr-2 ${option.color}`} />
//                             <span className={`font-medium ${newPaper.status === option.value ? option.color : 'text-gray-400'}`}>
//                               {option.label}
//                             </span>
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-4 mt-8">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg"
//                   >
//                     Add Paper
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       </div>
//     </ReserchLayout>
//   );
// };

// export default ProposalPage;

// src/pages/.../ProposalPage.jsx

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
      image:
        "data:image/jpeg;base64,/9j...yourBase64...",
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
    { value: "Pending", label: "Pending", color: "text-yellow-400", bg: "bg-yellow-400/10", icon: Clock },
    { value: "In Progress", label: "In Progress", color: "text-blue-400", bg: "bg-blue-400/10", icon: AlertCircle },
    { value: "Completed", label: "Completed", color: "text-green-400", bg: "bg-green-400/10", icon: CheckCircle },
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
    <ReserchLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} isLoading={isLoading}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Research Proposals
          </h1>
          <p className="text-gray-400 mt-2">Manage and track all research papers</p>
        </div>

        {/* TEAM */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-cyan-400 mr-3" />
            <h2 className="text-xl font-semibold text-white">Research Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                <img src={member.image} className="w-12 h-12 rounded-full border-2 border-cyan-500/50" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">{member.name}</h3>
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
        <div className="glass-card rounded-2xl overflow-hidden border border-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/80">
                <tr>
                  <th className="py-4 px-6 text-left text-gray-300">Paper Name</th>
                  <th className="py-4 px-6 text-left text-gray-300">Researcher</th>
                  <th className="py-4 px-6 text-left text-gray-300">Timeline</th>
                  <th className="py-4 px-6 text-left text-gray-300">Status</th>
                  <th className="py-4 px-6 text-left text-gray-300">Details</th>
                  <th className="py-4 px-6 text-left text-gray-300">Actions</th>
                </tr>
              </thead>

              <tbody>
                {proposals.map((proposal) => {
                  const statusInfo = statusOptions.find((s) => s.value === proposal.status);
                  const StatusIcon = statusInfo?.icon;

                  return (
                    <React.Fragment key={proposal.id}>
                      <tr
                        onClick={() => toggleRowExpansion(proposal.id)}
                        className="border-b border-gray-800 hover:bg-gray-900/50 cursor-pointer"
                      >
                        <td className="py-4 px-6 flex items-center">
                          <FileText className="w-5 h-5 text-cyan-400 mr-3" />
                          <span className="text-white">{proposal.paperName}</span>
                        </td>

                        <td className="py-4 px-6 flex items-center">
                          <img
                            src={
                              teamMembers.find((t) => t.name === proposal.proposalTakenBy)?.image ||
                              "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                            }
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <span className="text-gray-300">{proposal.proposalTakenBy}</span>
                        </td>

                        <td className="py-4 px-6 text-gray-300">
                          {formatDate(proposal.startDate)} - {formatDate(proposal.endDate)}
                        </td>

                        <td className="py-4 px-6">
                          <div className={`px-3 py-1 rounded-full ${statusInfo.bg} inline-flex items-center`}>
                            <StatusIcon className={`w-4 h-4 mr-2 ${statusInfo.color}`} />
                            <span className={statusInfo.color}>{proposal.status}</span>
                          </div>
                        </td>

                        <td className="py-4 px-6 text-cyan-400">
                          {expandedRow === proposal.id ? <ChevronUp /> : <ChevronDown />}
                        </td>

                        {/* ACTIONS */}
                        <td className="py-4 px-6">
                          <div className="flex gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEdit(proposal);
                              }}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              Edit
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(proposal.id);
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* EXPANDED */}
                      {expandedRow === proposal.id && (
                        <tr className="bg-gray-900/30">
                          <td colSpan={6} className="p-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Paper Details</h4>
                            <p className="text-gray-300">{proposal.details}</p>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="glass-card rounded-2xl w-full max-w-lg border border-cyan-500/20 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editMode ? "Edit Paper" : "Add New Paper"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
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
                    <label className="text-sm text-cyan-300">Proposal Taken By</label>
                    <select
                      value={newPaper.proposalTakenBy}
                      onChange={(e) =>
                        setNewPaper((p) => ({ ...p, proposalTakenBy: e.target.value }))
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
                              setNewPaper((prev) => ({ ...prev, status: option.value }))
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
