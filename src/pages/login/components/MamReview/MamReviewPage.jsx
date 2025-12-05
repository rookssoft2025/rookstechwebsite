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
  Save,
  X,
  Target,
  Code,
  GitBranch,
  FileCheck,
  User,
  BarChart,
  Search,
  Mail,
  Phone,
  Briefcase,
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

  // Employee selection state
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeSearch, setEmployeeSearch] = useState("");

  // Work details modal state
  const [isWorkDetailsModalOpen, setIsWorkDetailsModalOpen] = useState(false);
  const [selectedWorkDetails, setSelectedWorkDetails] = useState(null);

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

  // Employees Data
  const employees = [
    {
      id: 1,
      name: "Dr. Alex Chen",
      role: "Senior Developer",
      email: "alex.chen@research.com",
      phone: "+1 (555) 123-4567",
      department: "AI Research",
      avatarColor: "bg-blue-500",
      totalProjects: 4,
      activeProjects: 2,
      completedProjects: 2
    },
    {
      id: 2,
      name: "Raj Patel",
      role: "Blockchain Engineer",
      email: "raj.patel@research.com",
      phone: "+1 (555) 987-6543",
      department: "Blockchain",
      avatarColor: "bg-green-500",
      totalProjects: 3,
      activeProjects: 1,
      completedProjects: 2
    },
    {
      id: 3,
      name: "Dr. James Wilson",
      role: "Lead Researcher",
      email: "james.wilson@research.com",
      phone: "+1 (555) 456-7890",
      department: "Quantum Computing",
      avatarColor: "bg-purple-500",
      totalProjects: 3,
      activeProjects: 2,
      completedProjects: 1
    },
    {
      id: 4,
      name: "Dr. Emily Brown",
      role: "AI Researcher",
      email: "emily.brown@research.com",
      phone: "+1 (555) 789-0123",
      department: "AI & Agriculture",
      avatarColor: "bg-pink-500",
      totalProjects: 2,
      activeProjects: 1,
      completedProjects: 1
    },
    {
      id: 5,
      name: "Dr. Sarah Johnson",
      role: "Research Scientist",
      email: "sarah.johnson@research.com",
      phone: "+1 (555) 234-5678",
      department: "Quantum AI",
      avatarColor: "bg-indigo-500",
      totalProjects: 2,
      activeProjects: 1,
      completedProjects: 1
    },
    {
      id: 6,
      name: "Jane Smith",
      role: "Technical Writer",
      email: "jane.smith@research.com",
      phone: "+1 (555) 345-6789",
      department: "Documentation",
      avatarColor: "bg-yellow-500",
      totalProjects: 2,
      activeProjects: 1,
      completedProjects: 1
    },
    {
      id: 7,
      name: "Dr. Thomas Lee",
      role: "Research Director",
      email: "thomas.lee@research.com",
      phone: "+1 (555) 456-7890",
      department: "Management",
      avatarColor: "bg-red-500",
      totalProjects: 1,
      activeProjects: 0,
      completedProjects: 1
    },
    {
      id: 8,
      name: "Sarah Williams",
      role: "Software Engineer",
      email: "sarah.williams@research.com",
      phone: "+1 (555) 567-8901",
      department: "AI Development",
      avatarColor: "bg-teal-500",
      totalProjects: 1,
      activeProjects: 1,
      completedProjects: 0
    }
  ];

  // Coding Teams Data - Updated with results taken
  const [codingTeams, setCodingTeams] = useState([
    {
      id: 1,
      projectTitle: "Neural Network Optimization",
      assignedTo: "Dr. Alex Chen",
      assignedToId: 1,
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
      assignedToId: 2,
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
    {
      id: 3,
      projectTitle: "Computer Vision Pipeline",
      assignedTo: "Dr. Alex Chen",
      assignedToId: 1,
      startDate: "2024-03-01",
      deadline: "2024-06-30",
      resultsTaken: 45,
      status: "development",
      reviewStatus: "In Progress",
      progress: 60,
      details: "Building an end-to-end computer vision pipeline for object detection and classification.",
      members: ["Dr. Alex Chen", "Mike Johnson"],
      testCases: 75,
      bugsFixed: 12,
      featuresImplemented: 6
    },
  ]);

  // Proposal Teams Data
  const [proposalTeams, setProposalTeams] = useState([
    {
      id: 1,
      title: "Quantum Computing Research Grant",
      researcher: "Dr. James Wilson",
      researcherId: 3,
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
      researcherId: 4,
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
    {
      id: 3,
      title: "AI Ethics Framework",
      researcher: "Dr. James Wilson",
      researcherId: 3,
      startDate: "2024-03-10",
      endDate: "2024-09-30",
      budget: "$120,000",
      status: "completed",
      reviewStatus: "Completed",
      progress: 100,
      details: "Developing an ethical framework for AI development and deployment in sensitive applications.",
      objectives: ["Create ethical guidelines", "Develop auditing tools", "Train 100+ AI ethics professionals"],
      methodology: "Literature review, workshops, and framework development",
      members: ["Dr. James Wilson", "Ethics Committee"]
    },
  ]);

  // Journal Teams Data - Fixed: Added researcherId for Dr. Sarah Johnson
  const [journalTeams, setJournalTeams] = useState([
    {
      id: 1,
      paperTitle: "Quantum Neural Networks",
      researcher: "Dr. Sarah Johnson",
      researcherId: 5,
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
      researcherId: 9, // Add a new employee ID for Dr. Emma Wilson
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
      writerId: 6,
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
      writerId: 7,
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

  // Handle view work details
  const handleViewWorkDetails = (work) => {
    setSelectedWorkDetails(work);
    setIsWorkDetailsModalOpen(true);
  };

  // Handle edit start from details modal
  const handleEditFromDetails = () => {
    if (!selectedWorkDetails) return;
    setIsWorkDetailsModalOpen(false);
    handleEditStart(selectedWorkDetails.type, selectedWorkDetails);
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

  // Get filtered employees based on search
  const filteredEmployees = useMemo(() => {
    if (!employeeSearch) return employees;
    return employees.filter(employee =>
      employee.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      employee.role.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      employee.department.toLowerCase().includes(employeeSearch.toLowerCase())
    );
  }, [employees, employeeSearch]);

  // Get current works for selected employee
  const getEmployeeCurrentWorks = useMemo(() => {
    if (!selectedEmployee) return [];
    
    const employeeWorks = [];
    
    // Get coding projects
    const codingWorks = codingTeams.filter(team => 
      team.assignedToId === selectedEmployee.id
    ).map(team => ({
      ...team,
      type: 'coding',
      typeLabel: 'Coding Project',
      icon: FileCode,
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20'
    }));
    
    // Get proposals
    const proposalWorks = proposalTeams.filter(team => 
      team.researcherId === selectedEmployee.id
    ).map(team => ({
      ...team,
      type: 'proposal',
      typeLabel: 'Research Proposal',
      icon: FileText,
      color: 'text-green-400',
      bgColor: 'bg-green-900/20'
    }));
    
    // Get journal papers
    const journalWorks = journalTeams.filter(team => 
      team.researcherId === selectedEmployee.id
    ).map(team => ({
      ...team,
      type: 'journal',
      typeLabel: 'Journal Paper',
      icon: BookOpen,
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20'
    }));
    
    // Get writing documents
    const writingWorks = writingTeams.filter(team => 
      team.writerId === selectedEmployee.id
    ).map(team => ({
      ...team,
      type: 'writing',
      typeLabel: 'Writing Document',
      icon: Edit2,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-900/20'
    }));
    
    return [...codingWorks, ...proposalWorks, ...journalWorks, ...writingWorks];
  }, [selectedEmployee, codingTeams, proposalTeams, journalTeams, writingTeams]);

  // Render Employee Card
  const EmployeeCard = ({ employee }) => {
    const isSelected = selectedEmployee?.id === employee.id;
    
    return (
      <div 
        onClick={() => setSelectedEmployee(employee)}
        className={`p-4 rounded-xl border transition-all cursor-pointer ${
          isSelected 
            ? "bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
            : "bg-gray-900/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
        }`}
      >
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full ${employee.avatarColor} flex items-center justify-center mr-4`}>
            <span className="text-white font-bold text-lg">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white">{employee.name}</h4>
            <p className="text-sm text-gray-400">{employee.role}</p>
            <div className="flex items-center mt-2 text-xs text-gray-500">
              <Briefcase className="w-3 h-3 mr-1" />
              {employee.department}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <Target className="w-4 h-4 text-cyan-400 mr-2" />
              <span className="text-sm font-semibold text-white">
                {employee.activeProjects}
              </span>
            </div>
            <span className="text-xs text-gray-500">Active</span>
          </div>
        </div>
      </div>
    );
  };

  // Render Work Item for Employee
  const EmployeeWorkItem = ({ work }) => {
    const Icon = work.icon;
    const statusOption = statusOptions.find(s => s.value === work.status) || statusOptions[0];
    const StatusIcon = statusOption.icon;
    
    return (
      <div className="glass-card rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start">
            <div className={`p-2 rounded-lg ${work.bgColor} mr-3`}>
              <Icon className={`w-5 h-5 ${work.color}`} />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white">
                {work.projectTitle || work.title || work.paperTitle || work.document}
              </h4>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300">
                {work.typeLabel}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full ${statusOption.bg}`}>
              <div className="flex items-center">
                <StatusIcon className={`w-3 h-3 mr-1 ${statusOption.color}`} />
                <span className={`text-xs font-medium ${statusOption.color}`}>
                  {work.reviewStatus}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleViewWorkDetails(work)}
              className="p-1.5 text-gray-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-900/20"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs font-medium text-white">{work.progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-purple-600 h-1.5 rounded-full"
              style={{ width: `${work.progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-400">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(work.startDate || work.uploadedDate)}
          </div>
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(work.deadline || work.dateOfReview || work.endDate)}
          </div>
        </div>
      </div>
    );
  };

  // Render Work Details Modal
  const renderWorkDetailsModal = () => {
    if (!selectedWorkDetails) return null;
    
    const Icon = selectedWorkDetails.icon;
    const statusOption = statusOptions.find(s => s.value === selectedWorkDetails.status) || statusOptions[0];
    const StatusIcon = statusOption.icon;
    
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl w-full max-w-2xl border border-gray-800 max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start">
                <div className={`p-3 rounded-xl ${selectedWorkDetails.bgColor} mr-4`}>
                  <Icon className={`w-6 h-6 ${selectedWorkDetails.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedWorkDetails.projectTitle || selectedWorkDetails.title || selectedWorkDetails.paperTitle || selectedWorkDetails.document}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span className="px-3 py-1 rounded-full bg-gray-800 text-sm text-gray-300">
                      {selectedWorkDetails.typeLabel}
                    </span>
                    <div className={`ml-3 px-3 py-1 rounded-full ${statusOption.bg}`}>
                      <div className="flex items-center">
                        <StatusIcon className={`w-3 h-3 mr-1 ${statusOption.color}`} />
                        <span className={`text-xs font-medium ${statusOption.color}`}>
                          {selectedWorkDetails.reviewStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsWorkDetailsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Overall Progress</span>
                <span className="text-lg font-semibold text-white">{selectedWorkDetails.progress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${selectedWorkDetails.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-cyan-400" />
                    Assigned To
                  </h4>
                  <p className="text-white font-medium">
                    {selectedWorkDetails.assignedTo || selectedWorkDetails.researcher || selectedWorkDetails.writer}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                    Timeline
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-400">Start Date:</span>
                      <p className="text-white font-medium">
                        {formatDate(selectedWorkDetails.startDate || selectedWorkDetails.uploadedDate)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">
                        {selectedWorkDetails.type === 'proposal' ? 'End Date' : 
                         selectedWorkDetails.type === 'journal' ? 'Review Date' : 'Deadline'}
                      </span>
                      <p className="text-white font-medium">
                        {formatDate(selectedWorkDetails.deadline || selectedWorkDetails.dateOfReview || selectedWorkDetails.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Type Specific Information */}
              <div className="space-y-4">
                {selectedWorkDetails.type === 'coding' && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <BarChart className="w-5 h-5 mr-2 text-blue-400" />
                      Project Metrics
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-blue-900/20 rounded-lg">
                        <div className="text-sm text-blue-400">Results Taken</div>
                        <div className="text-xl font-bold text-white">{selectedWorkDetails.resultsTaken || 0}</div>
                      </div>
                      <div className="p-3 bg-gray-900/50 rounded-lg">
                        <div className="text-sm text-gray-400">Test Cases</div>
                        <div className="text-xl font-bold text-white">{selectedWorkDetails.testCases || 0}</div>
                      </div>
                      <div className="p-3 bg-gray-900/50 rounded-lg">
                        <div className="text-sm text-gray-400">Features</div>
                        <div className="text-xl font-bold text-white">{selectedWorkDetails.featuresImplemented || 0}</div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedWorkDetails.type === 'journal' && selectedWorkDetails.journal && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-purple-400" />
                      Journal Details
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-400">Journal:</span>
                        <p className="text-white font-medium">{selectedWorkDetails.journal}</p>
                      </div>
                      {selectedWorkDetails.impactFactor && (
                        <div>
                          <span className="text-sm text-gray-400">Impact Factor:</span>
                          <p className="text-white font-medium">{selectedWorkDetails.impactFactor}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedWorkDetails.type === 'writing' && selectedWorkDetails.wordCount && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Edit2 className="w-5 h-5 mr-2 text-yellow-400" />
                      Document Details
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-400">Word Count:</span>
                        <p className="text-white font-medium">{selectedWorkDetails.wordCount}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="text-gray-300">{selectedWorkDetails.details}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-800">
              <button
                onClick={() => setIsWorkDetailsModalOpen(false)}
                className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
              >
                Close
              </button>
              <button
                onClick={handleEditFromDetails}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all flex items-center justify-center"
              >
                <Edit2 size={20} className="mr-2" />
                Edit Details
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
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
    const reviewStatus = team.reviewStatus || 'Pending';

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

        {/* Current Works Section */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                Current Works by Employee
              </h2>
            </div>
          </div>

          {/* Employee Selection and Search */}
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  placeholder="Search employees by name, role, or department..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Employee Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {filteredEmployees.map(employee => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>

            {/* Selected Employee Details */}
            {selectedEmployee && (
              <div className="mb-6">
                <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-xl p-6 border border-cyan-500/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className={`w-16 h-16 rounded-full ${selectedEmployee.avatarColor} flex items-center justify-center mr-4`}>
                        <span className="text-white font-bold text-2xl">
                          {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{selectedEmployee.name}</h3>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-cyan-400">
                            {selectedEmployee.role}
                          </span>
                          <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-purple-400">
                            {selectedEmployee.department}
                          </span>
                        </div>
                        <div className="flex items-center space-x-6 mt-4">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-gray-300">{selectedEmployee.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-gray-300">{selectedEmployee.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">{selectedEmployee.totalProjects}</div>
                        <div className="text-sm text-gray-400">Total</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-cyan-400">{selectedEmployee.activeProjects}</div>
                        <div className="text-sm text-gray-400">Active</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400">{selectedEmployee.completedProjects}</div>
                        <div className="text-sm text-gray-400">Completed</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employee's Current Works */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Current Works ({getEmployeeCurrentWorks.length})</h4>
                  {getEmployeeCurrentWorks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getEmployeeCurrentWorks.map((work, index) => (
                        <EmployeeWorkItem key={index} work={work} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-900/30 rounded-xl border border-gray-800">
                      <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-white mb-2">No Current Works</h4>
                      <p className="text-gray-400 mb-4">This employee has no active projects or assignments.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Instructions when no employee is selected */}
            {!selectedEmployee && (
              <div className="text-center py-12 bg-gray-900/30 rounded-xl border border-gray-800">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Select an Employee</h4>
                <p className="text-gray-400">Click on an employee card above to view their current works and assignments.</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="glass-card rounded-2xl p-2 mb-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Briefcase className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                Current Works by Team
              </h2>
            </div>
          </div>
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

        {/* Filter Section (Without Add Button) */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <Filter className="w-6 h-6 text-cyan-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">
                {contentTab === 'coding' && 'Filter Coding Projects'}
                {contentTab === 'proposal' && 'Filter Research Proposals'}
                {contentTab === 'journal' && 'Filter Journal Papers'}
                {contentTab === 'writing' && 'Filter Writing Documents'}
              </h2>
            </div>
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
                No {contentTab} teams match the current filter. Try selecting a different filter option.
              </p>
              {getCurrentFilter() !== "all" && (
                <button
                  onClick={() => handleFilterChange(contentTab, "all")}
                  className="px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
                >
                  Show All
                </button>
              )}
            </div>
          )}
        </div>

        {/* Work Details Modal */}
        {isWorkDetailsModalOpen && renderWorkDetailsModal()}
      </div>
    </ReserchLayout>
  );
};

export default MamReviewPage;