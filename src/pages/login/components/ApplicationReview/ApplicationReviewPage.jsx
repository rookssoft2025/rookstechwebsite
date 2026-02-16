import React, { useState, useEffect } from "react";
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
    GraduationCap,
    FlaskConical,
    FileText,
    TrendingUp,
    Sparkles,
    Clock,
    CheckCircle,
    Circle,
    Download,
    ExternalLink,
    Star,
    Layers,
    Target,
    Cpu,
    Globe,
    Building2
} from "lucide-react";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import { db } from "../../../../firebase";
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from "firebase/firestore";


const ApplicationReviewPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("application-review");
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("applications");
    const [applicationType, setApplicationType] = useState("fellowship"); // 'fellowship' or 'intern'

    useEffect(() => {
        setLoading(true);
        const collectionName = applicationType === "fellowship" ? "Application" : "internships";
        const q = query(collection(db, collectionName), orderBy("submittedAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const apps = [];
            querySnapshot.forEach((doc) => {
                apps.push({ id: doc.id, ...doc.data() });
            });
            setApplications(apps);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching applications: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [applicationType]);

    const filteredApplications = applications.filter(app => {
        const matchesSearch = app.personal?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.personal?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === "shortlisted"
            ? app.status === "shortlisted"
            : app.status !== "shortlisted";

        return matchesSearch && matchesFilter;
    });

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getInitials = (name) => {
        if (!name) return "NA";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const handleUpdateStatus = async (applicationId, newStatus) => {
        try {
            const collectionName = applicationType === "fellowship" ? "Application" : "internships";
            const applicationRef = doc(db, collectionName, applicationId);
            await updateDoc(applicationRef, {
                status: newStatus
            });
            // Update local state if modal is open
            if (selectedApplication && selectedApplication.id === applicationId) {
                setSelectedApplication({ ...selectedApplication, status: newStatus });
            }
        } catch (error) {
            console.error("Error updating status: ", error);
            alert("Failed to update status. Please try again.");
        }
    };

    return (
        <ReserchLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            <div className="space-y-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen p-6 lg:p-8">
                {/* Enhanced Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-lg shadow-indigo-200">
                                <FileText className="text-white" size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-700 bg-clip-text text-transparent">
                                    Application Review
                                </h1>
                                <p className="text-slate-500 text-sm lg:text-base flex items-center gap-2 mt-1">
                                    <Sparkles size={16} className="text-indigo-500" />
                                    Review and manage research fellowship applications
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        {/* Application Type Tabs */}
                        <div className="flex bg-slate-100 p-1 rounded-2xl">
                            <button
                                onClick={() => setApplicationType("fellowship")}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${applicationType === "fellowship" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                Research Fellowship
                            </button>
                            <button
                                onClick={() => setApplicationType("intern")}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${applicationType === "intern" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                Research Intern
                            </button>
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-1.5 shadow-lg shadow-slate-200/50">
                            {["applications", "shortlisted"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-5 py-2.5 text-sm font-medium rounded-xl capitalize transition-all duration-200 ${filterStatus === status
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200"
                                        : "text-slate-600 hover:bg-slate-100"
                                        }`}
                                >
                                    {status === "applications" ? "Applications" : "Shortlisted"}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:w-80 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-lg shadow-slate-200/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StatCard
                        icon={Users}
                        label="Total Applications"
                        value={applications.length}
                        color="from-blue-600 to-blue-700"
                    />
                    <StatCard
                        icon={Star}
                        label="Shortlisted Candidates"
                        value={applications.filter(a => a.status === "shortlisted").length}
                        color="from-violet-500 to-violet-600"
                    />
                </div>

                {/* Applications Grid */}
                {loading ? (
                    <div className="flex justify-center py-32">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-indigo-600"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-8 w-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-32 bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200 shadow-xl"
                    >
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-indigo-700/20 rounded-full blur-3xl"></div>
                            <FileText className="relative text-slate-400 mb-6" size={64} />
                        </div>
                        <p className="text-slate-600 text-xl font-medium">No applications found</p>
                        <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredApplications.map((app, index) => (
                            <ApplicationCard
                                key={app.id}
                                app={app}
                                index={index}
                                formatDate={formatDate}
                                getInitials={getInitials}
                                onSelect={setSelectedApplication}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Enhanced Application Detail Modal */}
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
                            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col border border-white/20">
                                {/* Modal Header with Gradient */}
                                <div className="relative p-8 border-b border-slate-200/80 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-400"></div>
                                    <div className="flex items-start justify-between relative z-10">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl">
                                                <span className="text-2xl font-bold">{getInitials(selectedApplication.personal?.fullName)}</span>
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-bold text-white mb-2">
                                                    {selectedApplication.personal?.fullName}
                                                </h2>
                                                <div className="flex items-center gap-3 text-indigo-100">
                                                    <Mail size={16} />
                                                    <span>{selectedApplication.personal?.email}</span>
                                                    <span className="w-1 h-1 rounded-full bg-indigo-300"></span>
                                                    <Phone size={16} />
                                                    <span>{selectedApplication.personal?.phone}</span>
                                                </div>
                                                <div className="mt-3 flex gap-2">
                                                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30">
                                                        Application ID: {selectedApplication.id.slice(-8)}
                                                    </span>
                                                    <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm border border-white/30">
                                                        Submitted {formatDate(selectedApplication.submittedAt)}
                                                    </span>
                                                    {selectedApplication.research?.policyAgreed && (
                                                        <span className="px-4 py-1.5 bg-emerald-500/20 backdrop-blur-sm rounded-full text-emerald-300 text-sm border border-emerald-500/30 flex items-center gap-1">
                                                            <CheckCircle size={14} />
                                                            Policy Agreed
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedApplication(null)}
                                            className="p-3 hover:bg-white/20 rounded-xl transition-colors text-white"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>
                                </div>

                                {/* Modal Content with Enhanced Sections */}
                                <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-slate-50 to-white">
                                    <div className="space-y-8">
                                        {/* Personal Details - Enhanced */}
                                        <DetailSection
                                            icon={User}
                                            title="Personal Information"
                                            gradient="from-blue-600 to-indigo-600"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                <EnhancedDetailItem
                                                    label="Full Name"
                                                    value={selectedApplication.personal?.fullName}
                                                    icon={User}
                                                />
                                                <EnhancedDetailItem
                                                    label="Email Address"
                                                    value={selectedApplication.personal?.email}
                                                    icon={Mail}
                                                />
                                                <EnhancedDetailItem
                                                    label="Phone Number"
                                                    value={selectedApplication.personal?.phone}
                                                    icon={Phone}
                                                />
                                                <EnhancedDetailItem
                                                    label="Location"
                                                    value={selectedApplication.personal?.location}
                                                    icon={MapPin}
                                                />
                                            </div>
                                        </DetailSection>

                                        {/* Education - Enhanced with Visual Elements */}
                                        <DetailSection
                                            icon={GraduationCap}
                                            title="Educational Background"
                                            gradient="from-emerald-600 to-teal-600"
                                        >
                                            <div className="space-y-6">
                                                {/* Current Education */}
                                                <div className="bg-gradient-to-br from-white to-slate-50/80 rounded-2xl p-6 border border-slate-200 shadow-lg">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-200">
                                                            <GraduationCap size={18} className="text-white" />
                                                        </div>
                                                        <h4 className="text-lg font-semibold text-slate-800">Current Education</h4>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        <EnhancedDetailItem
                                                            label="Institution"
                                                            value={selectedApplication.education?.current?.college}
                                                            icon={Building2}
                                                        />
                                                        <EnhancedDetailItem
                                                            label="Program"
                                                            value={selectedApplication.education?.current?.course}
                                                            icon={BookOpen}
                                                        />
                                                        <EnhancedDetailItem
                                                            label="Department"
                                                            value={selectedApplication.education?.current?.department}
                                                            icon={Layers}
                                                        />
                                                        <EnhancedDetailItem
                                                            label="University"
                                                            value={selectedApplication.education?.current?.university}
                                                            icon={Globe}
                                                        />
                                                        <EnhancedDetailItem
                                                            label="Year of Passing"
                                                            value={selectedApplication.education?.current?.yearOfPassing}
                                                            icon={Calendar}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Secondary Education Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <EducationCard
                                                        title="Secondary Education (10th)"
                                                        school={selectedApplication.education?.tenth?.school}
                                                        board={selectedApplication.education?.tenth?.board}
                                                        percentage={selectedApplication.education?.tenth?.percentage}
                                                        subjects={selectedApplication.education?.tenth?.subjects}
                                                        year={selectedApplication.education?.tenth?.year}
                                                    />
                                                    <EducationCard
                                                        title="Higher Secondary (12th)"
                                                        school={selectedApplication.education?.twelfth?.school}
                                                        board={selectedApplication.education?.twelfth?.board}
                                                        percentage={selectedApplication.education?.twelfth?.percentage}
                                                        subjects={selectedApplication.education?.twelfth?.subjects}
                                                        year={selectedApplication.education?.twelfth?.year}
                                                        stream={selectedApplication.education?.twelfth?.stream}
                                                    />
                                                </div>
                                            </div>
                                        </DetailSection>

                                        {/* Academics - Enhanced with Progress Visualization */}
                                        <DetailSection
                                            icon={Award}
                                            title="Academic Performance"
                                            gradient="from-amber-600 to-orange-600"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                                <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-lg">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="p-2.5 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl">
                                                            <TrendingUp size={18} className="text-white" />
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-600">Overall CGPA</span>
                                                    </div>
                                                    <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                                                        {selectedApplication.academics?.cgpa || "N/A"}
                                                    </p>
                                                </div>
                                                <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-200 shadow-lg">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="p-2.5 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl">
                                                            <Clock size={18} className="text-white" />
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-600">Current Backlogs</span>
                                                    </div>
                                                    <p className="text-4xl font-bold text-slate-700">
                                                        {selectedApplication.academics?.backlogs || "0"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
                                                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                                                    <Layers size={16} />
                                                    Semester-wise Performance
                                                </h4>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                                                    {Object.entries(selectedApplication.academics?.semesterGPAs || {}).map(([sem, gpa]) => (
                                                        <div key={sem} className="relative group">
                                                            <div className="bg-gradient-to-b from-slate-50 to-white p-4 rounded-xl border border-slate-200 text-center hover:border-indigo-300 transition-all duration-300">
                                                                <p className="text-xs font-bold text-slate-400 uppercase mb-2">{sem}</p>
                                                                <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                                                                    {gpa || "N/A"}
                                                                </p>
                                                            </div>
                                                            {gpa && parseFloat(gpa) >= 8.5 && (
                                                                <div className="absolute -top-2 -right-2">
                                                                    <div className="relative">
                                                                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                                                        <div className="absolute inset-0 bg-yellow-500 rounded-full blur-sm animate-pulse"></div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </DetailSection>

                                        {/* Experience & Research - Enhanced */}
                                        <DetailSection
                                            icon={FlaskConical}
                                            title="Research & Professional Experience"
                                            gradient="from-violet-600 to-purple-600"
                                        >
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                <EnhancedExperienceCard
                                                    title="Research Interests"
                                                    items={selectedApplication.research?.interests}
                                                    icon={Target}
                                                    color="violet"
                                                />
                                                <EnhancedExperienceCard
                                                    title="Technical Skills"
                                                    items={selectedApplication.experience?.skills}
                                                    icon={Cpu}
                                                    color="purple"
                                                />
                                                <EnhancedBlock
                                                    label="Internships"
                                                    value={selectedApplication.experience?.internships}
                                                    icon={Briefcase}
                                                />
                                                <EnhancedBlock
                                                    label="Projects"
                                                    value={selectedApplication.experience?.projects}
                                                    icon={BookOpen}
                                                />
                                                <EnhancedBlock
                                                    label="Publications"
                                                    value={selectedApplication.experience?.publications}
                                                    icon={FileText}
                                                />
                                                <EnhancedBlock
                                                    label="Certifications"
                                                    value={selectedApplication.experience?.certifications}
                                                    icon={Award}
                                                />
                                                <EnhancedBlock
                                                    label="Hobbies & Interests"
                                                    value={selectedApplication.research?.hobbies}
                                                    icon={Sparkles}
                                                    className="lg:col-span-2"
                                                />
                                            </div>
                                        </DetailSection>
                                    </div>
                                </div>

                                {/* Modal Footer with Only Shortlist Action */}
                                <div className="p-6 border-t border-slate-200 bg-white/80 backdrop-blur-xl flex justify-center">
                                    {selectedApplication.status !== "shortlisted" && (
                                        <button
                                            onClick={() => {
                                                handleUpdateStatus(selectedApplication.id, "shortlisted");
                                                setSelectedApplication(null); // Close modal after shortlisting as requested by "move" logic
                                            }}
                                            className="px-12 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-200 flex items-center gap-3 scale-110"
                                        >
                                            <Star size={20} fill="currentColor" />
                                            Shortlist Candidate
                                        </button>
                                    )}
                                    {selectedApplication.status === "shortlisted" && (
                                        <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-8 py-4 rounded-2xl border border-emerald-100">
                                            <CheckCircle size={24} />
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

// Enhanced Sub-components
const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
    >
        <div className="flex items-center justify-between">
            <div>
                <p className="text-slate-500 text-sm mb-1">{label}</p>
                <p className="text-2xl lg:text-3xl font-bold text-slate-800">{value}</p>
            </div>
            <div className={`p-4 bg-gradient-to-br ${color} rounded-2xl shadow-lg`}>
                <Icon size={24} className="text-white" />
            </div>
        </div>
    </motion.div>
);

const ApplicationCard = ({ app, index, formatDate, getInitials, onSelect }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:shadow-indigo-200/30 hover:border-indigo-300 transition-all duration-300"
    >
        <div className="flex items-start gap-5">
            <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {getInitials(app.personal?.fullName)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>

            <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1">
                            {app.personal?.fullName}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm">
                            <span className="flex items-center gap-1.5 text-slate-500">
                                <Mail size={14} className="text-indigo-500" />
                                {app.personal?.email}
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-500">
                                <Calendar size={14} className="text-amber-500" />
                                {formatDate(app.submittedAt)}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${app.status === "shortlisted" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                            app.status === "reviewed" ? "bg-indigo-100 text-indigo-700 border-indigo-200" :
                                "bg-amber-100 text-amber-700 border-amber-200"
                            }`}>
                            {app.status || "Pending Review"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                            <GraduationCap size={14} className="text-emerald-500" />
                            {app.education?.current?.course || "N/A"}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-rose-500" />
                            {app.personal?.location}
                        </span>
                    </div>
                    <button
                        onClick={() => onSelect(app)}
                        className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
                    >
                        View Profile
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

const DetailSection = ({ icon: Icon, title, gradient, children }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
            <div className={`p-2.5 bg-gradient-to-br ${gradient} rounded-xl shadow-lg`}>
                <Icon size={20} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
        </div>
        {children}
    </div>
);

const EnhancedDetailItem = ({ label, value, icon: Icon }) => (
    <div className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
            {Icon && <Icon size={14} className="text-indigo-500" />}
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        </div>
        <p className="font-medium text-slate-800">{value || "N/A"}</p>
    </div>
);

const EducationCard = ({ title, school, board, percentage, subjects, year, stream }) => (
    <div className="bg-gradient-to-br from-white to-slate-50/80 rounded-2xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            {title}
        </h4>
        <div className="space-y-4">
            {stream && <EnhancedDetailItem label="Stream" value={stream} icon={BookOpen} />}
            <EnhancedDetailItem label="School/Institute" value={school} icon={Building2} />
            <EnhancedDetailItem label="Board" value={board} icon={Globe} />
            <EnhancedDetailItem label="Percentage/CGPA" value={percentage} icon={TrendingUp} />
            <EnhancedDetailItem label="Subjects" value={subjects} icon={Layers} />
            <EnhancedDetailItem label="Year of Passing" value={year} icon={Calendar} />
        </div>
    </div>
);

const EnhancedExperienceCard = ({ title, items, icon: Icon, color }) => (
    <div className="bg-gradient-to-br from-white to-slate-50/80 rounded-2xl p-6 border border-slate-200 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
            <div className={`p-2.5 bg-gradient-to-br from-${color}-600 to-${color}-700 rounded-xl shadow-lg`}>
                <Icon size={18} className="text-white" />
            </div>
            <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
        </div>
        <div className="flex flex-wrap gap-2">
            {items?.length > 0 ? (
                items.map((item, i) => (
                    <span key={i} className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 text-sm font-medium rounded-xl border border-indigo-200 flex items-center gap-2">
                        <Sparkles size={14} className="text-indigo-500" />
                        {item}
                    </span>
                ))
            ) : (
                <p className="text-slate-400 text-sm">No information provided</p>
            )}
        </div>
    </div>
);

const EnhancedBlock = ({ label, value, icon: Icon, className = "" }) => (
    <div className={`bg-gradient-to-br from-white to-slate-50/80 rounded-2xl p-6 border border-slate-200 shadow-lg ${className}`}>
        <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl">
                <Icon size={16} className="text-white" />
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        </div>
        <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
            {value || "No information provided."}
        </p>
    </div>
);

// Missing icon import
import { Users } from "lucide-react";

export default ApplicationReviewPage;