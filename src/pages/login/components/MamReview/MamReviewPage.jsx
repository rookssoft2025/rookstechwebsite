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
  Plus,
  Save,
  X,
  Target,
  Code,
  GitBranch,
  FileCheck,
  User,
  BarChart,
} from "lucide-react";
import { motion } from "framer-motion";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";

const MamReviewPage = () => {
  const navigate = useNavigate();
  
  // Separate states: sidebarTab for sidebar navigation, contentTab for page tabs
  const [sidebarTab, setSidebarTab] = useState("main-review");
  const [contentTab, setContentTab] = useState("coding");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("coding");

  const handleLogout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate("/login");
    setIsLoading(false);
  };

  // Toggle expansion for items
  const toggleExpansion = (type, id) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${type}-${id}`]: !prev[`${type}-${id}`]
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status options for filtering
  const statusOptions = [
    { value: "all", label: "All", color: "text-gray-400", bg: "bg-gray-400/10", icon: Filter },
    { value: "pending", label: "Pending", color: "text-yellow-400", bg: "bg-yellow-400/10", icon: Clock },
    { value: "in-progress", label: "In Progress", color: "text-blue-400", bg: "bg-blue-400/10", icon: Clock },
    { value: "in-review", label: "In Review", color: "text-purple-400", bg: "bg-purple-400/10", icon: Eye },
    { value: "completed", label: "Completed", color: "text-green-400", bg: "bg-green-400/10", icon: CheckCircle },
    { value: "rejected", label: "Rejected", color: "text-red-400", bg: "bg-red-400/10", icon: AlertCircle },
  ];

  // Coding Teams Data - Updated with results taken
  const [codingTeams, setCodingTeams] = useState([
    {
      id: 1,
      projectTitle: "Neural Network Optimization",
      assignedTo: "Dr. Alex Chen",
      startDate: "2024-02-15",
      deadline: "2024-04-15",
      resultsTaken: 85,
      status: "development",
      reviewStatus: "In Review",
      progress: 85,
      details: "Developing optimized neural network architectures for real-time image processing. Implementing novel optimization algorithms.",
      members: ["Dr. Alex Chen", "Sarah Williams", "Mike Johnson", "Emma Davis"],
      testCases: 150,
      bugsFixed: 24,
      featuresImplemented: 12
    },
    {
      id: 2,
      projectTitle: "Supply Chain DApp",
      assignedTo: "Raj Patel",
      startDate: "2024-01-10",
      deadline: "2024-03-30",
      resultsTaken: 120,
      status: "deployed",
      reviewStatus: "Completed",
      progress: 100,
      details: "Building a decentralized application for supply chain transparency using Ethereum smart contracts.",
      members: ["Raj Patel", "Lisa Wong", "David Kim"],
      testCases: 85,
      bugsFixed: 15,
      featuresImplemented: 8
    },
  ]);

  // Proposal Teams Data
  const [proposalTeams, setProposalTeams] = useState([
    {
      id: 1,
      title: "Quantum Computing Research Grant",
      researcher: "Dr. James Wilson",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
      budget: "$250,000",
      status: "in-progress",
      reviewStatus: "Under Review",
      progress: 70,
      details: "Proposal for quantum computing research focusing on optimization algorithms and quantum machine learning applications.",
      objectives: ["Develop quantum algorithms", "Build quantum simulation platform", "Publish 5 research papers"],
      methodology: "Experimental research with quantum simulators",
      members: ["Dr. James Wilson", "Prof. Sarah Miller", "Dr. Robert Chen"]
    },
    {
      id: 2,
      title: "Sustainable AI in Agriculture",
      researcher: "Dr. Emily Brown",
      startDate: "2024-01-15",
      endDate: "2025-06-30",
      budget: "$180,000",
      status: "pending",
      reviewStatus: "Awaiting Review",
      progress: 40,
      details: "Proposal for implementing AI solutions in precision agriculture to optimize resource usage and increase yields.",
      objectives: ["Reduce water usage by 30%", "Increase crop yield by 20%", "Develop AI monitoring system"],
      methodology: "Field experiments with IoT sensors and AI models",
      members: ["Dr. Emily Brown", "Mark Thompson", "Dr. Lisa Zhang"]
    },
  ]);

  // Journal Teams Data
  const [journalTeams, setJournalTeams] = useState([
    {
      id: 1,
      paperTitle: "Quantum Neural Networks",
      researcher: "Dr. Sarah Johnson",
      uploadedDate: "2024-02-15",
      dateOfReview: "2024-05-15",
      status: "in-review",
      reviewStatus: "On Review",
      progress: 60,
      details: "Exploring the intersection of quantum computing and neural networks for optimization problems in machine learning.",
      journal: "Nature AI",
      impactFactor: "18.5",
      keywords: ["Quantum Computing", "Neural Networks", "Optimization"],
      members: ["Dr. Sarah Johnson", "Prof. Michael Chen"]
    },
    {
      id: 2,
      paperTitle: "Sustainable AI in Agriculture",
      researcher: "Dr. Emma Wilson",
      uploadedDate: "2024-01-10",
      dateOfReview: "2024-04-20",
      status: "reviewed",
      reviewStatus: "Reviewed",
      progress: 100,
      details: "Investigating AI applications for sustainable farming practices and resource optimization in precision agriculture.",
      journal: "Science Advances",
      impactFactor: "14.5",
      keywords: ["AI", "Agriculture", "Sustainability"],
      members: ["Dr. Emma Wilson", "Alex Rodriguez"]
    },
  ]);

  // Writing Teams Data
  const [writingTeams, setWritingTeams] = useState([
    {
      id: 1,
      document: "Research Methodology Handbook",
      writer: "Jane Smith",
      startDate: "2024-02-20",
      deadline: "2024-04-05",
      status: "drafting",
      reviewStatus: "Content Review",
      progress: 75,
      details: "Comprehensive handbook detailing research methodologies for AI and machine learning projects.",
      wordCount: "15,000",
      sections: ["Introduction", "Methodologies", "Case Studies", "Best Practices"],
      format: "PDF/EPUB",
      members: ["Jane Smith", "Robert Brown", "Anna Wilson"]
    },
    {
      id: 2,
      document: "Annual Research Report",
      writer: "Dr. Thomas Lee",
      startDate: "2024-01-05",
      deadline: "2024-03-25",
      status: "completed",
      reviewStatus: "Approved",
      progress: 100,
      details: "Annual report summarizing research achievements, publications, and future directions.",
      wordCount: "25,000",
      sections: ["Executive Summary", "Research Highlights", "Publications", "Future Plans"],
      format: "PDF",
      members: ["Dr. Thomas Lee", "Sarah Miller", "Mike Davis"]
    },
  ]);

  // State for editing and filters per tab
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filters, setFilters] = useState({
    coding: "all",
    proposal: "all",
    journal: "all",
    writing: "all"
  });

  // Modal form states
  const [newCodingProject, setNewCodingProject] = useState({
    projectTitle: "",
    assignedTo: "",
    startDate: "",
    deadline: "",
    resultsTaken: "",
    status: "planning",
    details: "",
  });

  const [newProposal, setNewProposal] = useState({
    title: "",
    researcher: "",
    startDate: "",
    endDate: "",
    budget: "",
    status: "pending",
    details: "",
    objectives: "",
    methodology: ""
  });

  const [newJournalPaper, setNewJournalPaper] = useState({
    paperTitle: "",
    researcher: "",
    uploadedDate: "",
    dateOfReview: "",
    status: "pending",
    details: "",
    journal: "",
    keywords: ""
  });

  const [newWritingDocument, setNewWritingDocument] = useState({
    document: "",
    writer: "",
    startDate: "",
    deadline: "",
    status: "planning",
    details: "",
    wordCount: "",
    format: "PDF"
  });

  // Open modal for adding new item
  const openAddModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    
    // Reset form based on type
    switch(type) {
      case 'coding':
        setNewCodingProject({
          projectTitle: "",
          assignedTo: "",
          startDate: "",
          deadline: "",
          resultsTaken: "",
          status: "planning",
          details: "",
        });
        break;
      case 'proposal':
        setNewProposal({
          title: "",
          researcher: "",
          startDate: "",
          endDate: "",
          budget: "",
          status: "pending",
          details: "",
          objectives: "",
          methodology: ""
        });
        break;
      case 'journal':
        setNewJournalPaper({
          paperTitle: "",
          researcher: "",
          uploadedDate: "",
          dateOfReview: "",
          status: "pending",
          details: "",
          journal: "",
          keywords: ""
        });
        break;
      case 'writing':
        setNewWritingDocument({
          document: "",
          writer: "",
          startDate: "",
          deadline: "",
          status: "planning",
          details: "",
          wordCount: "",
          format: "PDF"
        });
        break;
    }
  };

  // Handle adding new items
  const handleAddCodingProject = (e) => {
    e.preventDefault();
    const newProject = {
      id: codingTeams.length + 1,
      projectTitle: newCodingProject.projectTitle,
      assignedTo: newCodingProject.assignedTo,
      startDate: newCodingProject.startDate,
      deadline: newCodingProject.deadline,
      resultsTaken: parseInt(newCodingProject.resultsTaken) || 0,
      status: newCodingProject.status,
      reviewStatus: getReviewStatusForStatus(newCodingProject.status),
      progress: getProgressForStatus(newCodingProject.status),
      details: newCodingProject.details,
      members: [newCodingProject.assignedTo],
      testCases: 0,
      bugsFixed: 0,
      featuresImplemented: 0
    };
    setCodingTeams([...codingTeams, newProject]);
    setIsModalOpen(false);
  };

  const handleAddProposal = (e) => {
    e.preventDefault();
    const newProposalItem = {
      id: proposalTeams.length + 1,
      title: newProposal.title,
      researcher: newProposal.researcher,
      startDate: newProposal.startDate,
      endDate: newProposal.endDate,
      budget: newProposal.budget,
      status: newProposal.status,
      reviewStatus: getReviewStatusForStatus(newProposal.status),
      progress: getProgressForStatus(newProposal.status),
      details: newProposal.details,
      objectives: newProposal.objectives.split(',').map(o => o.trim()),
      methodology: newProposal.methodology,
      members: [newProposal.researcher]
    };
    setProposalTeams([...proposalTeams, newProposalItem]);
    setIsModalOpen(false);
  };

  const handleAddJournalPaper = (e) => {
    e.preventDefault();
    const newPaper = {
      id: journalTeams.length + 1,
      paperTitle: newJournalPaper.paperTitle,
      researcher: newJournalPaper.researcher,
      uploadedDate: newJournalPaper.uploadedDate,
      dateOfReview: newJournalPaper.dateOfReview,
      status: newJournalPaper.status,
      reviewStatus: getReviewStatusForStatus(newJournalPaper.status),
      progress: getProgressForStatus(newJournalPaper.status),
      details: newJournalPaper.details,
      journal: newJournalPaper.journal,
      impactFactor: "N/A",
      keywords: newJournalPaper.keywords.split(',').map(k => k.trim()),
      members: [newJournalPaper.researcher]
    };
    setJournalTeams([...journalTeams, newPaper]);
    setIsModalOpen(false);
  };

  const handleAddWritingDocument = (e) => {
    e.preventDefault();
    const newDocument = {
      id: writingTeams.length + 1,
      document: newWritingDocument.document,
      writer: newWritingDocument.writer,
      startDate: newWritingDocument.startDate,
      deadline: newWritingDocument.deadline,
      status: newWritingDocument.status,
      reviewStatus: getReviewStatusForStatus(newWritingDocument.status),
      progress: getProgressForStatus(newWritingDocument.status),
      details: newWritingDocument.details,
      wordCount: newWritingDocument.wordCount,
      sections: ["Introduction"],
      format: newWritingDocument.format,
      members: [newWritingDocument.writer]
    };
    setWritingTeams([...writingTeams, newDocument]);
    setIsModalOpen(false);
  };

  // Helper functions
  const getReviewStatusForStatus = (status) => {
    switch(status) {
      case 'planning':
      case 'pending':
        return 'Awaiting Review';
      case 'in-progress':
      case 'drafting':
      case 'writing':
      case 'development':
        return 'In Progress';
      case 'in-review':
      case 'reviewing':
        return 'In Review';
      case 'completed':
      case 'deployed':
        return 'Completed';
      case 'reviewed':
        return 'Reviewed';
      default:
        return 'Pending';
    }
  };

  const getProgressForStatus = (status) => {
    switch(status) {
      case 'planning':
      case 'pending':
        return 20;
      case 'in-progress':
      case 'drafting':
      case 'writing':
      case 'development':
        return 50;
      case 'in-review':
      case 'reviewing':
      case 'testing':
        return 75;
      case 'completed':
      case 'deployed':
      case 'reviewed':
        return 100;
      default:
        return 0;
    }
  };

  // Handle edit start
  const handleEditStart = (type, item) => {
    setEditingItem({ type, id: item.id });
    setEditForm({ ...item });
  };

  // Handle edit save
  const handleEditSave = () => {
    // Update the appropriate state based on type
    switch(editingItem.type) {
      case 'coding':
        setCodingTeams(codingTeams.map(item => 
          item.id === editingItem.id ? { ...item, ...editForm } : item
        ));
        break;
      case 'proposal':
        setProposalTeams(proposalTeams.map(item => 
          item.id === editingItem.id ? { ...item, ...editForm } : item
        ));
        break;
      case 'journal':
        setJournalTeams(journalTeams.map(item => 
          item.id === editingItem.id ? { ...item, ...editForm } : item
        ));
        break;
      case 'writing':
        setWritingTeams(writingTeams.map(item => 
          item.id === editingItem.id ? { ...item, ...editForm } : item
        ));
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
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // Handle filter change
  const handleFilterChange = (tab, value) => {
    setFilters(prev => ({ ...prev, [tab]: value }));
  };

  // Filter teams based on active filter for each tab
  const filteredCodingTeams = useMemo(() => {
    if (filters.coding === "all") return codingTeams;
    return codingTeams.filter(team => team.status === filters.coding);
  }, [codingTeams, filters.coding]);

  const filteredProposalTeams = useMemo(() => {
    if (filters.proposal === "all") return proposalTeams;
    return proposalTeams.filter(team => team.status === filters.proposal);
  }, [proposalTeams, filters.proposal]);

  const filteredJournalTeams = useMemo(() => {
    if (filters.journal === "all") return journalTeams;
    return journalTeams.filter(team => team.status === filters.journal);
  }, [journalTeams, filters.journal]);

  const filteredWritingTeams = useMemo(() => {
    if (filters.writing === "all") return writingTeams;
    return writingTeams.filter(team => team.status === filters.writing);
  }, [writingTeams, filters.writing]);

  // Get current teams based on active content tab
  const getCurrentTeams = () => {
    switch (contentTab) {
      case "coding": return filteredCodingTeams;
      case "proposal": return filteredProposalTeams;
      case "journal": return filteredJournalTeams;
      case "writing": return filteredWritingTeams;
      default: return [];
    }
  };

  // Get current filter value for active content tab
  const getCurrentFilter = () => {
    return filters[contentTab];
  };

  // Render team card component
  const TeamCard = ({ team, type }) => {
    const isExpanded = expandedItems[`${type}-${team.id}`];
    const isEditing = editingItem?.type === type && editingItem?.id === team.id;
    
    const statusOption = statusOptions.find(s => s.value === team.status) || statusOptions[0];
    const StatusIcon = statusOption.icon;

    // Get icon and color based on team type
    const getTeamTypeConfig = () => {
      switch (type) {
        case 'coding': return { icon: FileCode, color: 'bg-blue-900/20', textColor: 'text-blue-400' };
        case 'proposal': return { icon: FileText, color: 'bg-green-900/20', textColor: 'text-green-400' };
        case 'journal': return { icon: BookOpen, color: 'bg-purple-900/20', textColor: 'text-purple-400' };
        case 'writing': return { icon: Edit2, color: 'bg-yellow-900/20', textColor: 'text-yellow-400' };
        default: return { icon: Users, color: 'bg-gray-900/20', textColor: 'text-gray-400' };
      }
    };

    const { icon: Icon, color: iconColor } = getTeamTypeConfig();

    // Get status-specific review status
    const reviewStatus = team.reviewStatus || getReviewStatusForStatus(team.status);

    return (
      <div className="glass-card rounded-2xl p-6 mb-6 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start">
            <div className={`p-3 rounded-xl ${iconColor} mr-4`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">
                {type === 'coding' && team.projectTitle}
                {type === 'proposal' && team.title}
                {type === 'journal' && team.paperTitle}
                {type === 'writing' && team.document}
              </h3>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center text-sm text-gray-400">
                  <User className="w-4 h-4 mr-2" />
                  {type === 'coding' && `Assigned To: ${team.assignedTo}`}
                  {type === 'proposal' && `Researcher: ${team.researcher}`}
                  {type === 'journal' && `Researcher: ${team.researcher}`}
                  {type === 'writing' && `Writer: ${team.writer}`}
                </div>
                {type === 'coding' && team.resultsTaken !== undefined && (
                  <div className="flex items-center text-sm text-gray-400">
                    <BarChart className="w-4 h-4 mr-2" />
                    Results Taken: {team.resultsTaken}
                  </div>
                )}
                {type === 'proposal' && team.budget && (
                  <div className="flex items-center text-sm text-gray-400">
                    <FileText className="w-4 h-4 mr-2" />
                    Budget: {team.budget}
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
                  {reviewStatus}
                </span>
              </div>
            </div>
            <button
              onClick={() => toggleExpansion(type, team.id)}
              className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        {/* Status and Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm font-medium text-white">{team.progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${team.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-3 bg-gray-900/50 rounded-lg">
            <div className="text-sm text-gray-400 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
              Start Date
            </div>
            <div className="text-xl font-bold text-white">
              {formatDate(team.startDate || team.uploadedDate)}
            </div>
          </div>

          <div className="p-3 bg-gray-900/50 rounded-lg">
            <div className="text-sm text-gray-400 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-purple-400" />
              {type === 'proposal' ? 'End Date' : 
               type === 'journal' ? 'Review Date' : 'Deadline'}
            </div>
            <div className="text-xl font-bold text-white">
              {formatDate(team.deadline || team.dateOfReview || team.endDate)}
            </div>
          </div>

          {/* Results Taken for Coding Teams */}
          {type === 'coding' && (
            <div className="p-3 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400 flex items-center">
                <BarChart className="w-4 h-4 mr-2 text-green-400" />
                Results Taken
              </div>
              <div className="text-xl font-bold text-white">
                {team.resultsTaken || 0}
              </div>
            </div>
          )}

          {type === 'journal' && team.journal && (
            <div className="p-3 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400">Journal</div>
              <div className="text-xl font-bold text-white">{team.journal}</div>
            </div>
          )}

          {type === 'writing' && team.wordCount && (
            <div className="p-3 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400">Word Count</div>
              <div className="text-xl font-bold text-white">{team.wordCount}</div>
            </div>
          )}

          {/* Additional info for coding teams */}
          {type === 'coding' && (
            <div className="p-3 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400">Test Cases</div>
              <div className="text-xl font-bold text-white">{team.testCases || 0}</div>
            </div>
          )}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-gray-800"
          >
            {isEditing ? (
              // Edit Form
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Status
                    </label>
                    <select
                      value={editForm.status}
                      onChange={(e) => handleEditChange("status", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    >
                      {type === 'coding' && (
                        <>
                          <option value="planning">Planning</option>
                          <option value="development">Development</option>
                          <option value="testing">Testing</option>
                          <option value="review">Review</option>
                          <option value="deployed">Deployed</option>
                        </>
                      )}
                      {type === 'proposal' && (
                        <>
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </>
                      )}
                      {type === 'journal' && (
                        <>
                          <option value="pending">Pending</option>
                          <option value="in-review">In Review</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="rejected">Rejected</option>
                        </>
                      )}
                      {type === 'writing' && (
                        <>
                          <option value="planning">Planning</option>
                          <option value="drafting">Drafting</option>
                          <option value="writing">Writing</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="completed">Completed</option>
                        </>
                      )}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Review Status
                    </label>
                    <select
                      value={editForm.reviewStatus}
                      onChange={(e) => handleEditChange("reviewStatus", e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    >
                      <option value="Awaiting Review">Awaiting Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="In Review">In Review</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Results Taken field for coding teams in edit mode */}
                {type === 'coding' && (
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Results Taken
                    </label>
                    <input
                      type="number"
                      value={editForm.resultsTaken || 0}
                      onChange={(e) => handleEditChange("resultsTaken", parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Details
                  </label>
                  <textarea
                    value={editForm.details}
                    onChange={(e) => handleEditChange("details", e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleEditSave}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all flex items-center justify-center"
                  >
                    <Save size={20} className="mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Read-only Details
              <>
                <h4 className="text-lg font-semibold text-white mb-4">Details</h4>
                <p className="text-gray-300 mb-6 bg-gray-800/50 p-4 rounded-lg">
                  {team.details}
                </p>

                {/* Coding Teams Stats */}
                {type === 'coding' && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Project Statistics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-blue-900/20 rounded-lg">
                        <div className="text-sm text-blue-400">Results Taken</div>
                        <div className="text-2xl font-bold text-white">{team.resultsTaken || 0}</div>
                      </div>
                      <div className="p-4 bg-gray-900/50 rounded-lg">
                        <div className="text-sm text-gray-400">Test Cases</div>
                        <div className="text-2xl font-bold text-white">{team.testCases || 0}</div>
                      </div>
                      <div className="p-4 bg-gray-900/50 rounded-lg">
                        <div className="text-sm text-gray-400">Features</div>
                        <div className="text-2xl font-bold text-white">{team.featuresImplemented || 0}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Team Members</h4>
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
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditStart(type, team)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all flex items-center"
                    >
                      <Edit2 size={18} className="mr-2" />
                      Review & Edit
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    );
  };

  // Tab configurations for content tabs
  const tabs = [
    { id: "coding", label: "Coding Teams", icon: FileCode, count: codingTeams.length },
    { id: "proposal", label: "Proposal Teams", icon: FileText, count: proposalTeams.length },
    { id: "journal", label: "Journal Teams", icon: BookOpen, count: journalTeams.length },
    { id: "writing", label: "Writing Teams", icon: Edit2, count: writingTeams.length },
  ];

  // Render the appropriate modal based on type
  const renderModal = () => {
    switch(modalType) {
      case 'coding':
        return (
          <form onSubmit={handleAddCodingProject}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={newCodingProject.projectTitle}
                  onChange={(e) => setNewCodingProject({...newCodingProject, projectTitle: e.target.value})}
                  placeholder="Enter project title"
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Assigned To
                </label>
                <select
                  value={newCodingProject.assignedTo}
                  onChange={(e) => setNewCodingProject({...newCodingProject, assignedTo: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                >
                  <option value="">Select developer</option>
                  <option value="Dr. Alex Chen">Dr. Alex Chen</option>
                  <option value="Raj Patel">Raj Patel</option>
                  <option value="Sarah Williams">Sarah Williams</option>
                  <option value="Mike Johnson">Mike Johnson</option>
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
                    value={newCodingProject.startDate}
                    onChange={(e) => setNewCodingProject({...newCodingProject, startDate: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
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
                    value={newCodingProject.deadline}
                    onChange={(e) => setNewCodingProject({...newCodingProject, deadline: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Results Taken
                </label>
                <input
                  type="number"
                  value={newCodingProject.resultsTaken}
                  onChange={(e) => setNewCodingProject({...newCodingProject, resultsTaken: e.target.value})}
                  placeholder="Number of test cases"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['planning', 'development', 'testing', 'review', 'deployed'].map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setNewCodingProject({...newCodingProject, status})}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                        newCodingProject.status === status
                          ? "bg-blue-900/20 border-blue-400/50"
                          : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <span className={`text-xs font-medium ${
                        newCodingProject.status === status ? "text-blue-400" : "text-gray-400"
                      }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Project Details
              </label>
              <textarea
                value={newCodingProject.details}
                onChange={(e) => setNewCodingProject({...newCodingProject, details: e.target.value})}
                placeholder="Enter project description, objectives, and technical details..."
                rows="4"
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
            </div>
          </form>
        );

      case 'proposal':
        return (
          <form onSubmit={handleAddProposal}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Paper Name
                </label>
                <input
                  type="text"
                  value={newProposal.title}
                  onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
                  placeholder="Enter paper title"
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Researcher
                </label>
                <select
                  value={newProposal.researcher}
                  onChange={(e) => setNewProposal({...newProposal, researcher: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                >
                  <option value="">Select researcher</option>
                  <option value="Dr. James Wilson">Dr. James Wilson</option>
                  <option value="Dr. Emily Brown">Dr. Emily Brown</option>
                  <option value="Prof. Sarah Miller">Prof. Sarah Miller</option>
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
                    value={newProposal.startDate}
                    onChange={(e) => setNewProposal({...newProposal, startDate: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                  <input
                    type="date"
                    value={newProposal.endDate}
                    onChange={(e) => setNewProposal({...newProposal, endDate: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Budget
                </label>
                <input
                  type="text"
                  value={newProposal.budget}
                  onChange={(e) => setNewProposal({...newProposal, budget: e.target.value})}
                  placeholder="$"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['pending', 'in-progress', 'completed'].map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setNewProposal({...newProposal, status})}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                        newProposal.status === status
                          ? "bg-green-900/20 border-green-400/50"
                          : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <span className={`text-xs font-medium ${
                        newProposal.status === status ? "text-green-400" : "text-gray-400"
                      }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Paper Details
              </label>
              <textarea
                value={newProposal.details}
                onChange={(e) => setNewProposal({...newProposal, details: e.target.value})}
                placeholder="Enter paper description, objectives, methodology..."
                rows="4"
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
            </div>
          </form>
        );

      case 'journal':
        return (
          <form onSubmit={handleAddJournalPaper}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Paper Title
                </label>
                <input
                  type="text"
                  value={newJournalPaper.paperTitle}
                  onChange={(e) => setNewJournalPaper({...newJournalPaper, paperTitle: e.target.value})}
                  placeholder="Enter paper title"
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Researcher
                </label>
                <select
                  value={newJournalPaper.researcher}
                  onChange={(e) => setNewJournalPaper({...newJournalPaper, researcher: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                >
                  <option value="">Select researcher</option>
                  <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                  <option value="Dr. Emma Wilson">Dr. Emma Wilson</option>
                  <option value="Prof. Michael Chen">Prof. Michael Chen</option>
                </select>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Uploaded Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400 pointer-events-none" />
                  <input
                    type="date"
                    value={newJournalPaper.uploadedDate}
                    onChange={(e) => setNewJournalPaper({...newJournalPaper, uploadedDate: e.target.value})}
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
                    value={newJournalPaper.dateOfReview}
                    onChange={(e) => setNewJournalPaper({...newJournalPaper, dateOfReview: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Journal
                </label>
                <input
                  type="text"
                  value={newJournalPaper.journal}
                  onChange={(e) => setNewJournalPaper({...newJournalPaper, journal: e.target.value})}
                  placeholder="Enter journal name"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Status
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['pending', 'in-review', 'reviewed', 'rejected'].map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setNewJournalPaper({...newJournalPaper, status})}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                        newJournalPaper.status === status
                          ? "bg-purple-900/20 border-purple-400/50"
                          : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <span className={`text-xs font-medium ${
                        newJournalPaper.status === status ? "text-purple-400" : "text-gray-400"
                      }`}>
                        {status === 'in-review' ? 'On Review' : 
                         status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Paper Details
              </label>
              <textarea
                value={newJournalPaper.details}
                onChange={(e) => setNewJournalPaper({...newJournalPaper, details: e.target.value})}
                placeholder="Enter paper description and details..."
                rows="4"
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
            </div>
          </form>
        );

      case 'writing':
        return (
          <form onSubmit={handleAddWritingDocument}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Document Title
                </label>
                <input
                  type="text"
                  value={newWritingDocument.document}
                  onChange={(e) => setNewWritingDocument({...newWritingDocument, document: e.target.value})}
                  placeholder="Enter document title"
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Writer
                </label>
                <select
                  value={newWritingDocument.writer}
                  onChange={(e) => setNewWritingDocument({...newWritingDocument, writer: e.target.value})}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                >
                  <option value="">Select writer</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Dr. Thomas Lee">Dr. Thomas Lee</option>
                  <option value="Robert Brown">Robert Brown</option>
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
                    value={newWritingDocument.startDate}
                    onChange={(e) => setNewWritingDocument({...newWritingDocument, startDate: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
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
                    value={newWritingDocument.deadline}
                    onChange={(e) => setNewWritingDocument({...newWritingDocument, deadline: e.target.value})}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Word Count
                </label>
                <input
                  type="number"
                  value={newWritingDocument.wordCount}
                  onChange={(e) => setNewWritingDocument({...newWritingDocument, wordCount: e.target.value})}
                  placeholder="Enter word count"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Status
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {['planning', 'drafting', 'writing', 'reviewing', 'completed'].map((status) => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setNewWritingDocument({...newWritingDocument, status})}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                        newWritingDocument.status === status
                          ? "bg-yellow-900/20 border-yellow-400/50"
                          : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <span className={`text-xs font-medium ${
                        newWritingDocument.status === status ? "text-yellow-400" : "text-gray-400"
                      }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Document Details
              </label>
              <textarea
                value={newWritingDocument.details}
                onChange={(e) => setNewWritingDocument({...newWritingDocument, details: e.target.value})}
                placeholder="Enter document description and details..."
                rows="4"
                required
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
            </div>
          </form>
        );
    }
  };

  return (
    <ReserchLayout
      activeTab={sidebarTab}
      setActiveTab={setSidebarTab}
      onLogout={handleLogout}
      isLoading={isLoading}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Manager Review Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Review and manage all team works - Coding, Proposals, Journals, and Writing
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="glass-card rounded-2xl p-2 mb-6 border border-gray-800">
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
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-cyan-400" : "text-gray-400"}`} />
                  <span className={`font-semibold ${isActive ? "text-white" : "text-gray-300"}`}>
                    {tab.label}
                  </span>
                  <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                    isActive ? "bg-cyan-900/50 text-cyan-300" : "bg-gray-800/70 text-gray-400"
                  }`}>
                    {currentTeams.length}/{tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Section and Add Button */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Filter className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                {contentTab === 'coding' && 'Filter Coding Projects'}
                {contentTab === 'proposal' && 'Filter Research Proposals'}
                {contentTab === 'journal' && 'Filter Journal Papers'}
                {contentTab === 'writing' && 'Filter Writing Documents'}
              </h2>
            </div>
            
            <button
              onClick={() => openAddModal(contentTab)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02]"
            >
              <Plus className="w-5 h-5 mr-2" />
              {contentTab === 'coding' && 'Add New Project'}
              {contentTab === 'proposal' && 'Add New Proposal'}
              {contentTab === 'journal' && 'Add New Paper'}
              {contentTab === 'writing' && 'Add New Document'}
            </button>
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
          {getCurrentTeams().length > 0 ? (
            getCurrentTeams().map(team => (
              <TeamCard
                key={`${contentTab}-${team.id}`}
                team={team}
                type={contentTab}
              />
            ))
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center border border-gray-800">
              {contentTab === 'coding' && <FileCode className="w-20 h-20 text-gray-600 mx-auto mb-6" />}
              {contentTab === 'proposal' && <FileText className="w-20 h-20 text-gray-600 mx-auto mb-6" />}
              {contentTab === 'journal' && <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-6" />}
              {contentTab === 'writing' && <Edit2 className="w-20 h-20 text-gray-600 mx-auto mb-6" />}
              
              <h3 className="text-2xl font-semibold text-white mb-3">
                No {contentTab} teams found
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                No {contentTab} teams match the current filter. Try selecting a different filter option or add a new one.
              </p>
              <div className="flex gap-4 justify-center">
                {getCurrentFilter() !== "all" && (
                  <button
                    onClick={() => handleFilterChange(contentTab, "all")}
                    className="px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
                  >
                    Show All
                  </button>
                )}
                <button
                  onClick={() => openAddModal(contentTab)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Add New {contentTab.charAt(0).toUpperCase() + contentTab.slice(1)} Item
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Add Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl w-full max-w-4xl border border-gray-800 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {modalType === 'coding' && 'Add New Project'}
                      {modalType === 'proposal' && 'Add New Research Paper'}
                      {modalType === 'journal' && 'Add New Paper'}
                      {modalType === 'writing' && 'Add New Document'}
                    </h3>
                    <p className="text-gray-400 mt-2">
                      {modalType === 'coding' && 'Fill in the details to add a new project'}
                      {modalType === 'proposal' && 'Fill in the details to add a new research paper'}
                      {modalType === 'journal' && 'Fill in the details to add a new paper'}
                      {modalType === 'writing' && 'Fill in the details to add a new document'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {renderModal()}

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
                    onClick={(e) => {
                      if (modalType === 'coding') handleAddCodingProject(e);
                      if (modalType === 'proposal') handleAddProposal(e);
                      if (modalType === 'journal') handleAddJournalPaper(e);
                      if (modalType === 'writing') handleAddWritingDocument(e);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center"
                  >
                    <Plus size={20} className="mr-2" />
                    {modalType === 'coding' && 'Add Project'}
                    {modalType === 'proposal' && 'Add Paper'}
                    {modalType === 'journal' && 'Add Paper'}
                    {modalType === 'writing' && 'Add Document'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ReserchLayout>
  );
};

export default MamReviewPage;