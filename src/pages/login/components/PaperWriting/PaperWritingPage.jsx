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
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
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
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";

import img1 from "../../assets/santhiya.jpg";
import img2 from "../../assets/ashika.jpg";
import img3 from "../../assets/ashmi.jpg";
import img4 from "../../assets/ancy.jpg";
import img5 from "../../assets/canute.jpg";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase";

// SearchableDropdown Component (Light Theme)
const SearchableDropdown = ({ value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchTitles = async () => {
      if (!isOpen || searchTerm.length === 0) {
        setOptions([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const q = query(
          collection(db, 'researchProposals'),
          where('status', '!=', 'completed')
        );
        
        const snapshot = await getDocs(q);
        const titles = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          if (data.title && data.title.toLowerCase().startsWith(searchTerm.toLowerCase())) {
            titles.push({
              id: doc.id,
              title: data.title,
              status: data.status || 'unknown'
            });
          }
        });
        setOptions(titles);
      } catch (error) {
        console.error('Error fetching research proposals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchTerm.length > 0) {
        fetchTitles();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, isOpen]);

  const filteredOptions = useMemo(() => {
    return options.filter(option =>
      option.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (title) => {
    onChange(title);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onChange('');
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          required
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Type to filter paper titles..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 outline-none"
                autoFocus
              />
            </div>
          </div>
          
          <div className="py-1">
            {isLoading ? (
              <div className="px-4 py-3 text-center text-gray-600">Loading paper titles...</div>
            ) : (
              <>
                <div className="px-4 py-2 text-xs text-gray-600 border-b border-gray-200">
                  {filteredOptions.length} paper{filteredOptions.length !== 1 ? 's' : ''} found (excluding completed papers)
                </div>
                {filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.title)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-800 truncate">{option.title}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2 ${
                      option.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 
                      option.status === 'reviewing' ? 'bg-amber-100 text-amber-700' :
                      option.status === 'started' ? 'bg-blue-100 text-blue-700' :
                      option.status === 'on-hold' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {option.status}
                    </span>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {isOpen && !isLoading && searchTerm.length > 0 && filteredOptions.length === 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg p-4">
          <div className="text-center">
            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <div className="text-gray-600">
              No research papers found starting with "{searchTerm}"
            </div>
            <div className="text-gray-500 text-xs mt-1">
              Try a different search term
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PaperWritingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("writing");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Team members data
  const leadResearcher = {
    id: 1,
    name: "Santhiya",
    role: "Senior Writer",
    image: img1,
    isLead: true,
  };

  const teamMembers = [
    { id: 2, name: "Ashika", role: "Senior Writer", image: img2, isLead: false },
    { id: 3, name: "Ashmi", role: "Writer", image: img3, isLead: false },
    { id: 4, name: "Ancy", role: "Writer", image: img4, isLead: false },
    { id: 5, name: "Canute", role: "Writer", image: img5, isLead: false },
  ];

  // State management
  const [papers, setPapers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingPaper, setEditingPaper] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  // Refs for date inputs
  const startDateRef = useRef(null);
  const deadlineRef = useRef(null);
  
  const [newPaper, setNewPaper] = useState({
    title: "",
    takenBy: "",
    startDate: "",
    deadline: "",
    status: "Started",
    details: "",
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPaperWritings();
        if (mounted) {
          const mapped = data.map((d, idx) => ({
            ...d,
            serialNo: d.serialNo || idx + 1,
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

  // Status options (Light Theme)
  const statusOptions = [
    { 
      value: "Started", 
      label: "Started", 
      color: "text-blue-600", 
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: Clock, 
      count: 0 
    },
    { 
      value: "Reviewing", 
      label: "Reviewing", 
      color: "text-amber-600", 
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: Eye, 
      count: 0 
    },
    { 
      value: "Completed", 
      label: "Completed", 
      color: "text-emerald-600", 
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: CheckCircle, 
      count: 0 
    },
    { 
      value: "On Hold", 
      label: "On Hold", 
      color: "text-red-600", 
      bg: "bg-red-50",
      border: "border-red-200",
      icon: AlertCircle, 
      count: 0 
    },
  ];

  // Filter papers based on selected filter
  const filteredPapers = useMemo(() => {
    if (statusFilter === null) return papers;
    return papers.filter((paper) => paper.status === statusFilter);
  }, [papers, statusFilter]);

  // Calculate pagination data
  const totalItems = filteredPapers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

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

  // Calculate deadline (start date + 4 days)
  const calculateAutoDeadline = (startDate) => {
    if (!startDate) return "";
    const date = new Date(startDate);
    date.setDate(date.getDate() + 4);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Get due status considering paper status (Light Theme)
  const getDueStatus = (deadline, paperStatus) => {
    if (!deadline) return null;
    
    if (paperStatus !== "Started") {
      return null;
    }
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        status: "overdue",
        label: "Overdue",
        color: "text-red-600",
        bg: "bg-red-100",
        borderColor: "border-red-300",
      };
    } else if (diffDays === 0) {
      return {
        status: "today",
        label: "Due Today",
        color: "text-orange-600",
        bg: "bg-orange-100",
        borderColor: "border-orange-300",
      };
    } else if (diffDays <= 2) {
      return {
        status: "urgent",
        label: `Due in ${diffDays} day${diffDays === 1 ? "" : "s"}`,
        color: "text-amber-600",
        bg: "bg-amber-100",
        borderColor: "border-amber-300",
      };
    } else {
      return {
        status: "ontrack",
        label: `${diffDays} days remaining`,
        color: "text-emerald-600",
        bg: "bg-emerald-100",
        borderColor: "border-emerald-300",
      };
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "startDate" && value) {
      const autoDeadline = calculateAutoDeadline(value);
      setNewPaper((prev) => ({
        ...prev,
        [id]: value,
        deadline: autoDeadline,
      }));
    } else {
      setNewPaper((prev) => ({ ...prev, [id]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingPaper) {
        const paperToSubmit = { ...editingPaper, ...newPaper };
        await updatePaperWriting(paperToSubmit);
        setPapers((prev) =>
          prev.map((p) =>
            p.id === paperToSubmit.id ? { ...p, ...paperToSubmit } : p
          )
        );
      } else {
        const nextSerialNo = papers.length > 0
          ? Math.max(...papers.map((p) => p.serialNo || 0)) + 1
          : 1;
        const paperToSubmit = { serialNo: nextSerialNo, ...newPaper };
        const created = await addPaperWriting(paperToSubmit);
        setPapers((prev) => [
          ...prev,
          { ...created, serialNo: created.serialNo || paperToSubmit.serialNo },
        ]);
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
      });
      setIsSaving(false);
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
    { key: "serialNo", label: "S.No", width: "8%" },
    { key: "title", label: "Paper Title", width: "32%" },
    { key: "takenBy", label: "Taken By", width: "15%" },
    { key: "deadline", label: "Deadline", width: "20%" },
    { key: "status", label: "Status", width: "10%" },
    { key: "actions", label: "Actions", width: "15%" },
  ];

  // Transform current page papers data for DataTable
  const tableData = currentItems.map((paper) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + paper.serialNo;
    const paperStatusOption = statusOptions.find((s) => s.value === paper.status) || statusOptions[0];
    const PaperStatusIcon = paperStatusOption.icon;
    const paperStatusColor = paperStatusOption.color;
    const paperStatusBg = paperStatusOption.bg;
    const paperStatusBorder = paperStatusOption.border;

    return {
      id: paper.id,
      _paperData: paper,
      renderRow: (item, onRowExpand) => {
        const paperData = item._paperData;
        const dueStatus = getDueStatus(paperData.deadline, paperData.status);

        return (
          <tr key={paperData.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <td className="py-4 px-4 text-center">
              <div className="text-indigo-600 font-bold text-lg">
                {globalIndex}
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-indigo-600 mr-3" />
                <div>
                  <div className="text-gray-800 font-medium">
                    {paperData.title}
                  </div>
                  <div className="text-gray-600 text-sm">
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
                  className="w-8 h-8 rounded-full border-2 border-indigo-300 mr-3"
                />
                <div>
                  <div className="text-gray-700">{paperData.takenBy}</div>
                  {paperData.takenBy === leadResearcher.name && (
                    <div className="text-xs flex items-center text-amber-600">
                      Team Lead
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-purple-600 mr-2" />
                <div>
                  <div className="text-gray-700">
                    {formatDate(paperData.deadline)}
                  </div>
                  {paperData.status === "Started" && dueStatus && (
                    <div className={`text-xs font-medium ${dueStatus.color}`}>
                      {dueStatus.label}
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td className="py-4 px-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full ${paperStatusBg} border ${paperStatusBorder}`}>
                <PaperStatusIcon className={`w-4 h-4 mr-2 ${paperStatusColor}`} />
                <span className={`text-sm font-medium ${paperStatusColor}`}>
                  {paperData.status}
                </span>
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleRowExpansion(paper.id)}
                  className="p-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {expandedRow === paper.id ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(paper)}
                  className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(paper.id)}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        );
      },
      expandContent: (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Paper Details
              </h4>
              <p className="text-gray-700 mb-6 bg-white p-4 rounded-lg border border-gray-200">
                {paper.details}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Timeline & Progress
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    Start Date
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {formatDate(paper.startDate)}
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg border ${(() => {
                    const dueStatus = getDueStatus(paper.deadline, paper.status);
                    return dueStatus
                      ? `${dueStatus.bg} ${dueStatus.borderColor}`
                      : "bg-white border-gray-200";
                  })()}`}
                >
                  <div className="text-sm text-gray-600 flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                    Deadline
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {formatDate(paper.deadline)}
                  </div>
                  {paper.status === "Started" && (() => {
                    const dueStatus = getDueStatus(paper.deadline, paper.status);
                    return dueStatus ? (
                      <div className={`text-sm mt-1 font-medium ${dueStatus.color}`}>
                        {dueStatus.label}
                      </div>
                    ) : null;
                  })()}
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
      isLoading={isLoggingOut}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Research Paper Writing 
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your research papers, track progress, and collaborate with team members
          </p>
        </div>

        {/* Team Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Writing Team</h2>
            </div>
            <span className="text-indigo-500/70 text-sm font-medium">
              {1 + teamMembers.length} Members
            </span>
          </div>

          {/* Lead Researcher Card */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
              Team Lead
            </h3>
            <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 transition-all duration-300">
              <img
                src={leadResearcher.image}
                alt={leadResearcher.name}
                className="w-12 h-12 rounded-full border-2 border-amber-400"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {leadResearcher.name}
                  </h3>
                  <span className="ml-2 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                    Lead
                  </span>
                </div>
                <p className="text-amber-600 text-sm">
                  {leadResearcher.role}
                </p>
              </div>
              <div className="text-right">
                <div className="text-gray-800 font-semibold">
                  {papers.filter((p) => p.takenBy === leadResearcher.name).length} Papers
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Team Members</h3>
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
                      {papers.filter((p) => p.takenBy === member.name).length}
                    </div>
                    <div className="text-gray-600 text-xs">Papers</div>
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
              <h3 className="text-lg font-semibold text-gray-800">Filter by Status</h3>
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Showing {statusFilter === null ? papers.length : papers.filter((p) => p.status === statusFilter).length} of {papers.length} papers
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setStatusFilter(null)}
              className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                statusFilter === null
                  ? `bg-gray-100 border-indigo-400 shadow-md shadow-indigo-500/10`
                  : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <Filter className={`w-5 h-5 mr-3 ${statusFilter === null ? "text-gray-700" : "text-gray-500"}`} />
              <span className={`font-medium ${statusFilter === null ? "text-gray-800" : "text-gray-600"}`}>
                All Papers
              </span>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                statusFilter === null ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600"
              }`}>
                {papers.length}
              </span>
            </button>

            {statusOptions.map((option) => {
              const Icon = option.icon;
              const isActive = statusFilter === option.value;
              const count = papers.filter((p) => p.status === option.value).length;

              return (
                <button
                  key={option.value}
                  onClick={() => setStatusFilter(option.value)}
                  className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                    isActive
                      ? `${option.bg} ${option.border} border-indigo-400 shadow-md shadow-indigo-500/10`
                      : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? option.color : "text-gray-500"}`} />
                  <span className={`font-medium ${isActive ? option.color : "text-gray-600"}`}>
                    {option.label}
                  </span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                    isActive ? "bg-gray-200 text-gray-800" : "bg-gray-100 text-gray-600"
                  }`}>
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
            <h2 className="text-2xl font-bold text-gray-800">Active Papers</h2>
            <p className="text-gray-600 text-sm mt-1">
              {statusFilter === null ? "Showing all papers" : `Showing ${statusFilter} papers only`}
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
              });
              setIsModalOpen(true);
            }}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
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
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mt-6 border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Items per page selector */}
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700 text-sm font-medium">Items per page:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    >
                      <option value={5} className="bg-white">5</option>
                      <option value={10} className="bg-white">10</option>
                      <option value={20} className="bg-white">20</option>
                      <option value={50} className="bg-white">50</option>
                    </select>
                    <span className="text-gray-600 text-sm">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} papers
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
                                ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md shadow-indigo-500/20'
                                : 'bg-white border border-gray-300 text-gray-700 hover:border-indigo-400 hover:bg-gray-50'
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
                    Page {currentPage} of {totalPages} • {totalItems} total papers
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-200 shadow-sm">
            <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No papers found</h3>
            <p className="text-gray-600 mb-6">
              {statusFilter === null
                ? "No papers have been added yet. Click 'New Paper' to get started."
                : `No ${statusFilter.toLowerCase()} papers found. Try changing the filter or add new papers.`}
            </p>
            {statusFilter !== "all" && statusFilter !== null && (
              <button
                onClick={() => setStatusFilter(null)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                Show All Papers
              </button>
            )}
          </div>
        )}

        {/* Add/Edit Paper Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl w-full max-w-2xl border border-gray-300 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingPaper ? "Edit Paper" : "Add New Paper"}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-2">Paper Title</label>
                      <SearchableDropdown
                        value={newPaper.title}
                        onChange={(value) => setNewPaper(prev => ({ ...prev, title: value }))}
                        placeholder="Search research paper titles..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-2">Taken By</label>
                      <select
                        id="takenBy"
                        value={newPaper.takenBy}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                      >
                        <option value="">Select researcher</option>
                        <optgroup label="Team lead">
                          <option value={leadResearcher.name}>{leadResearcher.name} (Lead)</option>
                        </optgroup>
                        <optgroup label="Team Members">
                          {teamMembers.map((member) => (
                            <option key={member.id} value={member.name}>{member.name} ({member.role})</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-indigo-700 mb-2">Start Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-600 pointer-events-none" />
                        <input
                          type="date"
                          id="startDate"
                          ref={startDateRef}
                          value={newPaper.startDate}
                          onChange={handleInputChange}
                          onFocus={() => startDateRef.current?.showPicker?.()}
                          onClick={() => startDateRef.current?.showPicker?.()}
                          onTouchStart={() => startDateRef.current?.showPicker?.()}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-indigo-700 mb-2">Deadline</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-600 pointer-events-none" />
                        <input
                          type="date"
                          id="deadline"
                          ref={deadlineRef}
                          value={newPaper.deadline}
                          onChange={handleInputChange}
                          onFocus={() => deadlineRef.current?.showPicker?.()}
                          onClick={() => deadlineRef.current?.showPicker?.()}
                          onTouchStart={() => deadlineRef.current?.showPicker?.()}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Status</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {statusOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setNewPaper((prev) => ({ ...prev, status: option.value }))}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                              newPaper.status === option.value
                                ? `${option.bg} ${option.border} border-indigo-400 shadow-md shadow-indigo-500/10`
                                : "bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                            }`}
                          >
                            <Icon className={`w-5 h-5 mb-1 ${newPaper.status === option.value ? option.color : "text-gray-500"}`} />
                            <span className={`text-xs font-medium ${newPaper.status === option.value ? option.color : "text-gray-600"}`}>
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-indigo-700 mb-2">Paper Details</label>
                    <textarea
                      id="details"
                      value={newPaper.details}
                      onChange={handleInputChange}
                      placeholder="Enter paper description and details..."
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    />
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
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

export default PaperWritingPage;