
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  MapPin,
  Calendar,
  Search,
  X,
  Mail,
  Phone,
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  FlaskConical,
  FileText,
  TrendingUp,
  Sparkles,
  Clock,
  CheckCircle,
  Star,
  Layers,
  Target,
  Cpu,
  Globe,
  Building2,
  ChevronDown,
  Filter,
  Users,
} from "lucide-react";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import { db } from "../../../../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";

const LAST_VISIT_KEY = "applicationPageLastVisit";
const VIEWED_KEY = "viewedApplicationIds";

// Records the current time as "last visit" — called once on page load
const recordLastVisit = () => {
  // Only set if not already set (first ever visit sets the baseline)
  if (!localStorage.getItem(LAST_VISIT_KEY)) {
    localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
  }
};

// After recording, update to now so next visit has a fresh baseline
const updateLastVisit = () => {
  localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
};

const getLastVisitTime = () => {
  const val = localStorage.getItem(LAST_VISIT_KEY);
  return val ? new Date(val) : null;
};

const getViewedIds = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(VIEWED_KEY) || "[]"));
  } catch {
    return new Set();
  }
};

const markAsViewed = (id) => {
  const viewed = getViewedIds();
  viewed.add(id);
  localStorage.setItem(VIEWED_KEY, JSON.stringify([...viewed]));
};

const ApplicationReviewPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("application-review");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("applications");
  const [applicationType, setApplicationType] = useState("fellowship");
  const [genderFilter, setGenderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewedIds, setViewedIds] = useState(getViewedIds);
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const dateInputRef = useRef(null);
  const [lastVisitTime] = useState(() => {
    recordLastVisit();
    return getLastVisitTime();
  });
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    return () => updateLastVisit();
  }, []);

  useEffect(() => {
    setLoading(true);
    const collectionName =
      applicationType === "fellowship" ? "Application" : "internships";
    const q = query(
      collection(db, collectionName),
      orderBy("submittedAt", "desc"),
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const apps = [];
        querySnapshot.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() });
        });
        setApplications(apps);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching applications: ", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [applicationType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, applicationType, genderFilter, dateFilter, selectedDate]);

  const handleViewApplication = (app) => {
    markAsViewed(app.id);
    setViewedIds((prev) => new Set([...prev, app.id]));
    setSelectedApplication(app);
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.personal?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.personal?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "shortlisted"
        ? app.status === "shortlisted"
        : app.status !== "shortlisted";
    const matchesGender =
      genderFilter === "all" || app.personal?.gender === genderFilter;

    // Date filtering
    const submittedAtDate = app.submittedAt ? new Date(app.submittedAt) : null;
    const getDateRange = () => {
      if (dateFilter === "all") return null;
      const now = new Date();
      const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const dayMs = 24 * 60 * 60 * 1000;
      let start, end;
      if (dateFilter === "today") {
        start = startOfDay(now);
        end = new Date(start.getTime() + dayMs - 1);
      } else if (dateFilter === "yesterday") {
        start = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
        end = new Date(start.getTime() + dayMs - 1);
      } else if (dateFilter === "this-week") {
        const startWeek = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()));
        start = startWeek;
        end = new Date(start.getTime() + 7 * dayMs - 1);
      } else if (dateFilter === "this-month") {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime() - 1;
        end = new Date(end);
      } else if (dateFilter === "select") {
        if (!selectedDate) return null;
        start = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        end = new Date(start.getTime() + dayMs - 1);
      }
      return { start, end };
    };

    const range = getDateRange();
    const matchesDate =
      !range || (submittedAtDate && submittedAtDate >= range.start && submittedAtDate <= range.end);

    return matchesSearch && matchesFilter && matchesGender && matchesDate;
  });

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name) => {
    if (!name) return "NA";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      const collectionName =
        applicationType === "fellowship" ? "Application" : "internships";
      const applicationRef = doc(db, collectionName, applicationId);
      await updateDoc(applicationRef, { status: newStatus });
      if (selectedApplication && selectedApplication.id === applicationId) {
        setSelectedApplication({ ...selectedApplication, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status: ", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const openDatePicker = () => {
    dateInputRef.current?.click();
  };

  const handleDateChange = (dateStr) => {
    if (!dateStr) {
      setSelectedDate(null);
      setDateFilter("all");
      return;
    }
    const d = new Date(dateStr + "T00:00:00");
    setSelectedDate(d);
    setDateFilter("select");
  };

  const clearSelectedDate = () => {
    setSelectedDate(null);
    setDateFilter("all");
    if (dateInputRef.current) dateInputRef.current.value = "";
  };

  return (
    <ReserchLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="space-y-6 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-200">
            <FileText className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 bg-clip-text text-transparent">
              Application Review
            </h1>
            <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-0.5">
              <Sparkles size={13} className="text-indigo-500" />
              Review and manage research fellowship applications
            </p>
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 flex-wrap">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setApplicationType("fellowship")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${applicationType === "fellowship" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Research Fellowship
            </button>
            <button
              onClick={() => setApplicationType("intern")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${applicationType === "intern" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Research Intern
            </button>
          </div>

          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {["applications", "shortlisted"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${filterStatus === status
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                {status === "applications" ? "Applications" : "Shortlisted"}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-200 rounded-xl pl-8 pr-8 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-sm cursor-pointer"
            >
              <option value="all">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm text-xs">
              {[
                { key: 'all', label: 'All' },
                { key: 'today', label: 'Today' },
                { key: 'yesterday', label: 'Yesterday' },
                { key: 'this-week', label: 'This Week' },
                { key: 'this-month', label: 'This Month' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => {
                    if (opt.key === 'all') {
                      clearSelectedDate();
                    } else {
                      setDateFilter(opt.key);
                      setSelectedDate(null);
                    }
                  }}
                  className={`px-2 py-1 rounded-md ${dateFilter === opt.key ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {opt.label}
                </button>
              ))}
              <button
                onClick={openDatePicker}
                className={`px-3 py-1 rounded-md ml-1 ${dateFilter === 'select' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Select Date
              </button>
            </div>

            {dateFilter === 'select' && selectedDate && (
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-sm text-xs">
                <span className="text-slate-600">{formatDate(selectedDate)}</span>
                <button onClick={clearSelectedDate} className="p-1 text-slate-400 hover:text-slate-600">
                  <X size={14} />
                </button>
              </div>
            )}
            <input ref={dateInputRef} type="date" className="hidden" onChange={(e) => handleDateChange(e.target.value)} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard icon={Users} label="Total Applications" value={applications.length} color="from-blue-600 to-blue-700" />
          <StatCard icon={Star} label="Shortlisted" value={applications.filter((a) => a.status === "shortlisted").length} color="from-violet-500 to-violet-600" />
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-indigo-600"></div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <FileText className="text-slate-300 mx-auto mb-3" size={48} />
            <p className="text-slate-500 font-medium">No applications found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Table Header */}
            <div className="bg-slate-700 rounded-xl px-5 py-3 grid grid-cols-12 gap-3 text-xs font-semibold text-slate-200 uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-3">Applicant</div>
              <div className="col-span-2">Contact</div>
              <div className="col-span-2">Education</div>
              <div className="col-span-1">Gender</div>
              <div className="col-span-1">Submitted</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-2">
              {paginatedApplications.map((app, index) => {
                const submittedAt = app.submittedAt ? new Date(app.submittedAt) : null;
                const isNewByTime = lastVisitTime && submittedAt && submittedAt > lastVisitTime;
                const isNew = isNewByTime && !viewedIds.has(app.id);
                const serialNumber = startIndex + index + 1;

                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`bg-white border rounded-xl px-5 py-3.5 grid grid-cols-12 gap-3 items-center hover:shadow-md transition-all duration-200 group ${
                      isNew
                        ? "border-indigo-300 shadow-sm shadow-indigo-100"
                        : "border-slate-200 hover:border-indigo-300 hover:shadow-indigo-100/50"
                    }`}
                  >
                    {/* Index with NEW badge */}
                    <div className="col-span-1 flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-medium">{serialNumber}</span>
                      {isNew && (
                        <motion.span
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-600 text-white leading-none shadow-sm shadow-indigo-300 uppercase tracking-wide"
                        >
                          New
                        </motion.span>
                      )}
                    </div>

                    {/* Applicant */}
                    <div className="col-span-3 flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-sm ${
                        isNew
                          ? "bg-gradient-to-br from-indigo-500 to-indigo-700 ring-2 ring-indigo-300"
                          : "bg-gradient-to-br from-indigo-500 to-indigo-700"
                      }`}>
                        {getInitials(app.personal?.fullName)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {app.personal?.fullName || "N/A"}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          ID: {app.id.slice(-6)}
                        </p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 min-w-0">
                      <p className="text-xs text-slate-600 truncate flex items-center gap-1">
                        <Mail size={11} className="text-indigo-400 flex-shrink-0" />
                        {app.personal?.email || "N/A"}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <Phone size={11} className="text-slate-400 flex-shrink-0" />
                        {app.personal?.phone || "N/A"}
                      </p>
                    </div>

                    {/* Education */}
                    <div className="col-span-2 min-w-0">
                      <p className="text-xs font-medium text-slate-700 truncate">
                        {app.education?.current?.course || "N/A"}
                      </p>
                      <p className="text-xs text-slate-400 truncate mt-0.5 flex items-center gap-1">
                        <Building2 size={10} className="flex-shrink-0" />
                        {app.education?.current?.college || "N/A"}
                      </p>
                    </div>

                    {/* Gender */}
                    <div className="col-span-1">
                      <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        {app.personal?.gender || "N/A"}
                      </span>
                    </div>

                    {/* Submitted Date */}
                    <div className="col-span-1">
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar size={11} className="text-amber-400 flex-shrink-0" />
                        {formatDate(app.submittedAt)}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${
                        app.status === "shortlisted"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : app.status === "reviewed"
                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}>
                        {app.status === "shortlisted" && <CheckCircle size={10} />}
                        {app.status || "Pending"}
                      </span>
                    </div>

                    {/* Action */}
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => handleViewApplication(app)}
                        className={`px-2.5 py-1.5 text-white text-xs font-medium rounded-lg transition-all flex items-center gap-1 shadow-sm ${
                          isNew
                            ? "bg-indigo-700 hover:bg-indigo-800 shadow-indigo-300"
                            : "bg-indigo-600 hover:bg-indigo-700 group-hover:shadow-indigo-200"
                        }`}
                      >
                        View
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center pt-4">
                <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-1.5 rounded-lg transition-all ${currentPage === 1 ? "text-slate-300 cursor-not-allowed" : "text-slate-400 hover:bg-slate-50 hover:text-indigo-600"}`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {(() => {
                    const pages = [];
                    if (totalPages <= 7) {
                      for (let i = 1; i <= totalPages; i++) pages.push(i);
                    } else if (currentPage <= 4) {
                      for (let i = 1; i <= 5; i++) pages.push(i);
                      pages.push("...");
                      pages.push(totalPages);
                    } else if (currentPage >= totalPages - 3) {
                      pages.push(1); pages.push("...");
                      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
                    } else {
                      pages.push(1); pages.push("...");
                      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                      pages.push("..."); pages.push(totalPages);
                    }
                    return pages.map((page, i) =>
                      page === "..." ? (
                        <span key={`e-${i}`} className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">…</span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === page ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:bg-slate-50"}`}
                        >
                          {page}
                        </button>
                      )
                    );
                  })()}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-1.5 rounded-lg transition-all ${currentPage === totalPages ? "text-slate-300 cursor-not-allowed" : "text-slate-400 hover:bg-slate-50 hover:text-indigo-600"}`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApplication && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[60]"
              onClick={() => setSelectedApplication(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-[70] p-4 pointer-events-none"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col border border-white/20">
                {/* Modal Header */}
                <div className="relative p-3 border-b border-slate-200/80 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center text-white border border-white/30 shadow-lg">
                        <span className="text-lg font-bold">
                          {getInitials(selectedApplication.personal?.fullName)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">
                          {selectedApplication.personal?.fullName}
                        </h2>
                        <div className="mt-2 flex gap-1.5 flex-wrap">
                          <span className="px-2.5 py-1 bg-white/20 rounded-full text-white text-xs border border-white/30">
                            ID: {selectedApplication.id.slice(-8)}
                          </span>
                          <span className="px-2.5 py-1 bg-white/20 rounded-full text-white text-xs border border-white/30">
                            {formatDate(selectedApplication.submittedAt)}
                          </span>
                          {selectedApplication.research?.policyAgreed && (
                            <span className="px-2.5 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-xs border border-emerald-500/30 flex items-center gap-1">
                              <CheckCircle size={11} /> Policy Agreed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedApplication(null)} className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white">
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                  <div className="space-y-5">
                    <SectionTable title="Personal Information" icon={User} gradient="from-blue-600 to-indigo-600">
                      <TableRow label="Full Name" value={selectedApplication.personal?.fullName} />
                      <TableRow label="Email" value={selectedApplication.personal?.email} />
                      <TableRow label="Phone" value={selectedApplication.personal?.phone} />
                      <TableRow label="Gender" value={selectedApplication.personal?.gender} />
                      <TableRow label="Location" value={selectedApplication.personal?.location} />
                    </SectionTable>

                    <SectionTable title="Current Education" icon={GraduationCap} gradient="from-emerald-600 to-teal-600">
                      <TableRow label="Institution" value={selectedApplication.education?.current?.college} />
                      <TableRow label="University" value={selectedApplication.education?.current?.university} />
                      <TableRow label="Program" value={selectedApplication.education?.current?.course} />
                      <TableRow label="Department" value={selectedApplication.education?.current?.department} />
                      <TableRow label="Year of Passing" value={selectedApplication.education?.current?.yearOfPassing} />
                    </SectionTable>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SectionTable title="Secondary (10th)" icon={BookOpen} gradient="from-sky-600 to-cyan-600">
                        <TableRow label="School" value={selectedApplication.education?.tenth?.school} />
                        <TableRow label="Board" value={selectedApplication.education?.tenth?.board} />
                        <TableRow label="Percentage/CGPA" value={selectedApplication.education?.tenth?.percentage} />
                        <TableRow label="Subjects" value={selectedApplication.education?.tenth?.subjects} />
                        <TableRow label="Year" value={selectedApplication.education?.tenth?.year} />
                      </SectionTable>
                      <SectionTable title="Higher Secondary (12th)" icon={BookOpen} gradient="from-violet-600 to-purple-600">
                        <TableRow label="School" value={selectedApplication.education?.twelfth?.school} />
                        <TableRow label="Board" value={selectedApplication.education?.twelfth?.board} />
                        <TableRow label="Stream" value={selectedApplication.education?.twelfth?.stream} />
                        <TableRow label="Percentage/CGPA" value={selectedApplication.education?.twelfth?.percentage} />
                        <TableRow label="Year" value={selectedApplication.education?.twelfth?.year} />
                      </SectionTable>
                    </div>

                    <SectionTable title="Academic Performance" icon={Award} gradient="from-amber-600 to-orange-600">
                      <TableRow label="Overall CGPA" value={selectedApplication.academics?.cgpa} highlight />
                      <TableRow label="Current Backlogs" value={selectedApplication.academics?.backlogs || "0"} />
                      {selectedApplication.academics?.semesterGPAs && (
                        <tr>
                          <td className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase bg-slate-50 w-40 border-b border-slate-100">Semester GPAs</td>
                          <td className="px-4 py-3 border-b border-slate-100">
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(selectedApplication.academics.semesterGPAs).map(([sem, gpa]) => (
                                <div key={sem} className="text-center bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5">
                                  <p className="text-xs text-slate-500 font-medium">{sem}</p>
                                  <p className="text-sm font-bold text-indigo-700">{gpa || "N/A"}</p>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </SectionTable>

                    <SectionTable title="Research & Experience" icon={FlaskConical} gradient="from-rose-600 to-pink-600">
                      <TableRow label="Research Interests" value={selectedApplication.research?.interests?.join(", ")} />
                      <TableRow label="Technical Skills" value={selectedApplication.experience?.skills?.join(", ")} />
                      <TableRow label="Internships" value={selectedApplication.experience?.internships} />
                      <TableRow label="Projects" value={selectedApplication.experience?.projects} />
                      <TableRow label="Publications" value={selectedApplication.experience?.publications} />
                      <TableRow label="Certifications" value={selectedApplication.experience?.certifications} />
                      <TableRow label="Hobbies" value={selectedApplication.research?.hobbies} />
                    </SectionTable>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
                  >
                    Close
                  </button>
                  {selectedApplication.status !== "shortlisted" ? (
                    <button
                      onClick={() => {
                        handleUpdateStatus(selectedApplication.id, "shortlisted");
                        setSelectedApplication(null);
                      }}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-emerald-200 flex items-center gap-2"
                    >
                      <Star size={15} fill="currentColor" />
                      Shortlist Candidate
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 text-sm">
                      <CheckCircle size={16} />
                      Already Shortlisted
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ReserchLayout>
  );
};

// Sub-components
const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-xs mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
      <div className={`p-3 bg-gradient-to-br ${color} rounded-xl shadow-md`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  </motion.div>
);

const SectionTable = ({ title, icon: Icon, gradient, children }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
    <div className={`flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r ${gradient}`}>
      <Icon size={16} className="text-white" />
      <h3 className="text-sm font-semibold text-white">{title}</h3>
    </div>
    <table className="w-full">
      <tbody>{children}</tbody>
    </table>
  </div>
);

const TableRow = ({ label, value, highlight }) => (
  <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
    <td className="px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide bg-slate-50/80 w-44 border-r border-slate-100">
      {label}
    </td>
    <td className={`px-4 py-2.5 text-sm ${highlight ? "font-bold text-indigo-700" : "text-slate-700"}`}>
      {value || <span className="text-slate-400 italic text-xs">Not provided</span>}
    </td>
  </tr>
);

export default ApplicationReviewPage;