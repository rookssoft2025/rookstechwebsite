import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../../../../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import {
  Calendar,
  Mail,
  Phone,
  BookOpen,
  ChevronRight,
  FileText,
  Building2,
  Hash,
  X,
  Search,
  Award,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Filter,
  Download,
  Eye,
  Star,
  BarChart3,
  PieChart,
  Target,
  Sparkles,
  Brain,
  Code,
  PenTool,
  MessageSquare,
  ChevronDown,
  MoreVertical,
  Users,
  GraduationCap,
  Medal,
  Zap,
  Shield,
  TrendingDown
} from "lucide-react";

// Helper function to get initials
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Section icons mapping
const sectionIcons = {
  "Quantitative Aptitude": Brain,
  "Logical Reasoning": Target,
  "Computational Thinking": Code,
  "Python Programming": PenTool,
  "English Proficiency": MessageSquare,
  "Narrative Round": Sparkles
};

// Color mapping for sections
const sectionColors = {
  "Quantitative Aptitude": "from-blue-500 to-cyan-400",
  "Logical Reasoning": "from-purple-500 to-pink-400",
  "Computational Thinking": "from-emerald-500 to-teal-400",
  "Python Programming": "from-orange-500 to-amber-400",
  "English Proficiency": "from-rose-500 to-pink-400",
  "Narrative Round": "from-indigo-500 to-violet-400"
};

const AssessmentDetailsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("percentage");
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    qualified: 0,
    disqualified: 0,
    averageScore: 0
  });

  useEffect(() => {
    const q = query(collection(db, "interview"), orderBy("registeredAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const studentsData = querySnapshot.docs.map(doc => {
        const data = doc.data();

        // Convert sectionScores map to the array structure UI expects
        const sectionMap = data.sectionScores || {};
        const sections = [
          { name: "Quantitative Aptitude", score: sectionMap[1] || 0, max: 10 },
          { name: "Logical Reasoning", score: sectionMap[2] || 0, max: 10 },
          { name: "Computational Thinking", score: sectionMap[3] || 0, max: 10 },
          { name: "Python Programming", score: sectionMap[4] || 0, max: 10 },
          { name: "English Proficiency", score: sectionMap[5] || 0, max: 10 },
        ];

        const totalScore = sections.reduce((acc, s) => acc + s.score, 0);
        const maxTotal = sections.reduce((acc, s) => acc + s.max, 0);
        const percentage = maxTotal > 0 ? Math.round((totalScore / maxTotal) * 100) : 0;

        return {
          id: doc.id,
          name: data.name || "Unknown",
          date: data.registeredAt?.toDate().toLocaleDateString() || "No Date",
          dept: data.stream || "N/A",
          sem: data.semester || "N/A",
          number: data.phone || "N/A",
          mail: data.email || "N/A",
          sections: sections,
          isDisqualified: data.isDisqualified || false,
          disqualifiedReason: data.disqualifiedReason || "",
          status: data.status || "registered",
          score: totalScore,
          maxScore: maxTotal,
          percentage: percentage,
          detailedSummary: data.detailedSummary || {}
        };
      });

      setStudents(studentsData);
      
      // Calculate stats
      const qualified = studentsData.filter(s => !s.isDisqualified).length;
      const disqualified = studentsData.filter(s => s.isDisqualified).length;
      const avgScore = studentsData.reduce((acc, s) => acc + s.percentage, 0) / studentsData.length || 0;
      
      setStats({
        total: studentsData.length,
        qualified,
        disqualified,
        averageScore: Math.round(avgScore)
      });
    });

    return () => unsubscribe();
  }, []);

  const filteredAndSortedStudents = students
    .filter((student) => {
      // Search filter
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.dept.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      if (filterStatus === "qualified") return matchesSearch && !student.isDisqualified;
      if (filterStatus === "disqualified") return matchesSearch && student.isDisqualified;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "percentage") return b.percentage - a.percentage;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return b.percentage - a.percentage;
    });

  // Helper function to get performance color
  const getPerformanceColor = (percentage) => {
    if (percentage >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (percentage >= 60) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  // Helper function to get performance badge
  const getPerformanceBadge = (percentage) => {
    if (percentage >= 80) return { text: "Excellent", icon: Medal, color: "text-emerald-600 bg-emerald-50" };
    if (percentage >= 60) return { text: "Good", icon: TrendingUp, color: "text-blue-600 bg-blue-50" };
    if (percentage >= 40) return { text: "Average", icon: BarChart3, color: "text-amber-600 bg-amber-50" };
    return { text: "Needs Improvement", icon: TrendingDown, color: "text-rose-600 bg-rose-50" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-indigo-200">
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Assessments Dashboard
                </h1>
                <p className="text-sm text-slate-500 mt-1">Track and evaluate student performance</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
                <p className="text-xs text-slate-500">Total Students</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
                <p className="text-xs text-slate-500">Qualified</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.qualified}</p>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-slate-200">
                <p className="text-xs text-slate-500">Avg. Score</p>
                <p className="text-2xl font-bold text-indigo-600">{stats.averageScore}%</p>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm shadow-sm"
              >
                <option value="all">All Status</option>
                <option value="qualified">Qualified</option>
                <option value="disqualified">Disqualified</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm shadow-sm"
              >
                <option value="percentage">Sort by Score</option>
                <option value="name">Sort by Name</option>
                <option value="date">Sort by Date</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 flex items-center justify-between"
        >
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-700">{filteredAndSortedStudents.length}</span> of {students.length} students
          </p>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Download size={16} />
            Export Results
          </button>
        </motion.div>

        {/* Student List */}
        {filteredAndSortedStudents.length === 0 && searchTerm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-2xl border border-slate-200"
          >
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <p className="text-lg font-medium text-slate-800 mb-1">No results found</p>
            <p className="text-sm text-slate-500">
              No students matching "{searchTerm}"
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedStudents.map((student, idx) => {
              const performance = getPerformanceBadge(student.percentage);
              const PerformanceIcon = performance.icon;
              
              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`group bg-white rounded-xl border hover:shadow-lg transition-all duration-300 ${
                    student.isDisqualified 
                      ? 'border-red-200 hover:border-red-300 hover:shadow-red-100' 
                      : 'border-slate-200 hover:border-indigo-200 hover:shadow-indigo-100'
                  }`}
                >
                  <div className="p-5">
                    {/* Main Row */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Student Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                            student.isDisqualified
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600'
                          }`}>
                            {getInitials(student.name)}
                          </div>
                          {student.isDisqualified && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                              <span className="text-white text-[8px]">!</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-800">{student.name}</h3>
                            {!student.isDisqualified && (
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${performance.color}`}>
                                <PerformanceIcon size={10} className="inline mr-1" />
                                {performance.text}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Hash size={12} />
                              {student.id}
                            </span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="flex items-center gap-1">
                              <Building2 size={12} />
                              {student.dept}
                            </span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {student.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Score Overview */}
                      <div className="flex items-center gap-6 flex-wrap lg:flex-nowrap">
                        {/* Score Circle */}
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14">
                            <svg className="w-14 h-14 transform -rotate-90">
                              <circle
                                cx="28"
                                cy="28"
                                r="24"
                                stroke="#e2e8f0"
                                strokeWidth="3"
                                fill="none"
                              />
                              {!student.isDisqualified && (
                                <circle
                                  cx="28"
                                  cy="28"
                                  r="24"
                                  stroke={student.percentage >= 80 ? "#10b981" : student.percentage >= 60 ? "#3b82f6" : "#f59e0b"}
                                  strokeWidth="3"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeDasharray={`${2 * Math.PI * 24}`}
                                  strokeDashoffset={`${2 * Math.PI * 24 * (1 - student.percentage / 100)}`}
                                  className="transition-all duration-1000"
                                />
                              )}
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className={`text-sm font-bold ${student.isDisqualified ? 'text-red-500' : 'text-slate-700'}`}>
                                {student.isDisqualified ? '0' : student.percentage}%
                              </span>
                            </div>
                          </div>
                          <div className="lg:hidden">
                            <p className="text-xs text-slate-500">Total Score</p>
                            <p className="text-sm font-semibold text-slate-700">{student.score}/{student.maxScore}</p>
                          </div>
                        </div>

                        {/* Section Pills - Hidden on mobile, shown on desktop */}
                        <div className="hidden lg:flex items-center gap-2">
                          {student.sections.slice(0, 4).map((section, i) => {
                            const Icon = sectionIcons[section.name] || FileText;
                            return (
                              <div
                                key={i}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200"
                                title={`${section.name}: ${section.score}/${section.max}`}
                              >
                                <Icon size={12} className="text-slate-500" />
                                <span className="text-xs font-medium text-slate-600">
                                  {section.score}/{section.max}
                                </span>
                              </div>
                            );
                          })}
                          {student.sections.length > 4 && (
                            <div className="px-2.5 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
                              <span className="text-xs font-medium text-slate-600">
                                +{student.sections.length - 4} more
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setModalOpen(true);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium group"
                          >
                            <Eye size={16} />
                            <span className="hidden sm:inline">View Details</span>
                            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                          </button>
                          
                          {student.isDisqualified && (
                            <div className="px-3 py-2 bg-red-50 text-red-600 rounded-lg border border-red-200 text-xs font-medium flex items-center gap-1">
                              <Shield size={14} />
                              <span className="hidden sm:inline">Disqualified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Mobile Section Scores - Only visible on mobile */}
                    <div className="mt-4 lg:hidden">
                      <div className="flex flex-wrap gap-2">
                        {student.sections.map((section, i) => {
                          const Icon = sectionIcons[section.name] || FileText;
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-lg border border-slate-200"
                            >
                              <Icon size={12} className="text-slate-500" />
                              <span className="text-xs font-medium text-slate-600">
                                {section.score}/{section.max}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedStudent && (
          <StudentModal
            student={selectedStudent}
            onClose={() => {
              setModalOpen(false);
              setSelectedStudent(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Student Modal
const StudentModal = ({ student, onClose }) => {
  const total = student.score;
  const maxTotal = student.maxScore;
  const percentage = student.percentage;

  // Extract narrative response
  const narrativeKey = Object.keys(student.detailedSummary || {}).find(k => k.startsWith('6-'));
  const narrativeResponse = narrativeKey ? student.detailedSummary[narrativeKey] : null;

  // Get performance color
  const getPerformanceGradient = (percentage) => {
    if (percentage >= 80) return "from-emerald-500 to-teal-400";
    if (percentage >= 60) return "from-blue-500 to-cyan-400";
    if (percentage >= 40) return "from-amber-500 to-orange-400";
    return "from-rose-500 to-pink-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl"
      >
        {/* Header with Gradient */}
        <div className={`p-6 bg-gradient-to-r ${getPerformanceGradient(percentage)} rounded-t-2xl`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center border-2 border-white/30">
                <span className="text-2xl font-bold text-white">
                  {getInitials(student.name)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-1">{student.name}</h2>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <span className="flex items-center gap-1">
                    <Hash size={14} />
                    {student.id}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Building2 size={14} />
                    {student.dept}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur rounded-xl p-3">
              <p className="text-white/70 text-xs mb-1">Overall Score</p>
              <p className="text-2xl font-bold text-white">{percentage}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3">
              <p className="text-white/70 text-xs mb-1">Total Marks</p>
              <p className="text-2xl font-bold text-white">{total}/{maxTotal}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-3">
              <p className="text-white/70 text-xs mb-1">Sections</p>
              <p className="text-2xl font-bold text-white">{student.sections.length}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-6">
          {/* Disqualified Alert */}
          {student.isDisqualified && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle size={18} className="text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-red-800">Application Disqualified</p>
                <p className="text-sm text-red-600 mt-1">{student.disqualifiedReason || "Candidate breached assessment guidelines."}</p>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg">
                <Mail size={18} className="text-indigo-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Email Address</p>
                <p className="text-sm font-medium text-slate-700">{student.mail}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg">
                <Phone size={18} className="text-indigo-500" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Phone Number</p>
                <p className="text-sm font-medium text-slate-700">{student.number}</p>
              </div>
            </div>
          </div>

          {/* Section Performance */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-500" />
              Section-wise Performance
            </h3>
            <div className="space-y-4">
              {student.sections.map((section, index) => {
                const Icon = sectionIcons[section.name] || FileText;
                const percentage = (section.score / section.max) * 100;
                
                return (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg bg-gradient-to-r ${sectionColors[section.name] || 'from-slate-500 to-slate-400'}`}>
                          <Icon size={14} className="text-white" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{section.name}</span>
                      </div>
                      <span className="text-sm font-bold text-indigo-600">
                        {section.score}/{section.max}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${sectionColors[section.name] || 'from-indigo-500 to-purple-500'}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Narrative Response */}
          {narrativeResponse && (
            <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-purple-100 rounded-lg">
                  <MessageSquare size={16} className="text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-800">Narrative Response</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3 italic">
                "{narrativeResponse.questionText}"
              </p>
              <div className="p-4 bg-white rounded-lg border border-purple-200">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {narrativeResponse.selectedAnswer || "No response provided."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Download size={16} />
            Download Report
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AssessmentDetailsPage;