import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    User,
    MapPin,
    Calendar,
    ExternalLink,
    ChevronRight,
    Search,
    Filter,
    X,
    Mail,
    Phone,
    Award,
    BookOpen,
    Briefcase
} from "lucide-react";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";

const ApplicationReviewPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("application-review");
    const [selectedApplication, setSelectedApplication] = useState(null);

    // Dummy Data based on the Job Application Form
    const applications = [
        {
            id: "APP-001",
            fullName: "John Doe",
            position: "Junior Research Fellow",
            status: "Pending Review",
            date: "Feb 12, 2026",
            email: "john@example.com",
            phone: "9876543210",
            location: "New York, USA",
            cgpa: "8.7",
            researchInterests: ["Artificial Intelligence", "Machine Learning", "Deep Learning"],
            experience: "Intern at Google (3 months)",
            academicRecords: {
                mark10: "95.5%",
                mark12: "94.2%",
                currentCourse: "B.Tech",
                department: "Computer Science",
                yearOfPassing: "2026",
                currentSemester: "8",
                semesterGPA: "8.5",
                overallCGPA: "8.7"
            },
            additionalInfo: {
                certificationCourses: "AWS Certified Solutions Architect, Google Data Analytics",
                partTimeCourses: "None",
                internshipDetails: "Worked as a Data Science Intern at Google for 3 months. Developed a predictive model for customer churn.",
                projects: "Built a Smart Home Automation System using IoT and AI. Published a paper on 'AI in Healthcare'.",
                hobbies: "Reading, Gaming, Travelling"
            }
        },
        {
            id: "APP-002",
            fullName: "Sarah Smith",
            position: "Junior Research Fellow",
            status: "Shortlisted",
            date: "Feb 11, 2026",
            email: "sarah.smith@example.com",
            phone: "9876541230",
            location: "London, UK",
            cgpa: "9.2",
            researchInterests: ["Bioinformatics", "Data Science"],
            experience: "Research Assistant at Oxford",
            academicRecords: {
                mark10: "98.0%",
                mark12: "96.5%",
                currentCourse: "M.Sc",
                department: "Bioinformatics",
                yearOfPassing: "2025",
                currentSemester: "4",
                semesterGPA: "9.4",
                overallCGPA: "9.2"
            },
            additionalInfo: {
                certificationCourses: "Genomic Data Science Specialization",
                partTimeCourses: "French Language C1",
                internshipDetails: "Research Assistant at Oxford University Genomics Lab.",
                projects: "Genome Sequence Analysis tool using Python.",
                hobbies: "Violin, Painting"
            }
        },
        {
            id: "APP-003",
            fullName: "Michael Chen",
            position: "Junior Research Fellow",
            status: "Rejected",
            date: "Feb 10, 2026",
            email: "michael.c@example.com",
            phone: "9123456789",
            location: "Singapore",
            cgpa: "7.8",
            researchInterests: ["Cyber Security", "Cloud Computing", "IoT"],
            experience: "Freelance Developer",
            academicRecords: {
                mark10: "88.0%",
                mark12: "85.0%",
                currentCourse: "B.E",
                department: "Information Technology",
                yearOfPassing: "2026",
                currentSemester: "8",
                semesterGPA: "7.9",
                overallCGPA: "7.8"
            },
            additionalInfo: {
                certificationCourses: "Certified Ethical Hacker (CEH)",
                partTimeCourses: "None",
                internshipDetails: "Freelance Penetration Testing for local businesses.",
                projects: "Secure File Storage System using Aes-256.",
                hobbies: "CTF Challenges, Coding"
            }
        },
        {
            id: "APP-004",
            fullName: "Emily Davis",
            position: "Junior Research Fellow",
            status: "Pending Review",
            date: "Feb 09, 2026",
            email: "emily.d@example.com",
            phone: "9988776655",
            location: "Toronto, Canada",
            cgpa: "8.5",
            researchInterests: ["NLP", "Computer Vision"],
            experience: "Project Lead in Final Year",
            academicRecords: {
                mark10: "92.0%",
                mark12: "90.0%",
                currentCourse: "B.Tech",
                department: "Artificial Intelligence",
                yearOfPassing: "2026",
                currentSemester: "8",
                semesterGPA: "8.8",
                overallCGPA: "8.5"
            },
            additionalInfo: {
                certificationCourses: "Deep Learning Specialization (Coursera)",
                partTimeCourses: "None",
                internshipDetails: "Project Lead for University AI Club projects.",
                projects: "Real-time Object Detection System for Traffic Monitoring.",
                hobbies: "Photography, Hiking"
            }
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending Review":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "Shortlisted":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Rejected":
                return "bg-rose-100 text-rose-700 border-rose-200";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    const filteredApplications = applications.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ReserchLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Application Review</h1>
                        <p className="text-gray-500">Review and manage job applications</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search applicants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-gray-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all w-64 shadow-sm"
                            />
                        </div>
                        <button className="p-2 bg-white border border-gray-300 rounded-xl text-gray-600 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 transition-colors shadow-sm">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                {/* List of Applications */}
                <div className="grid gap-4">
                    {filteredApplications.map((app, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={app.id}
                            className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-md transition-all"
                        >
                            <div className="flex flex-col lg:flex-row gap-6">

                                {/* Main Info */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(app.status)}`}>
                                                {app.status}
                                            </span>
                                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium border border-indigo-100">
                                                {app.position}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                            {app.fullName}
                                            <span className="text-sm font-normal text-gray-500">({app.id})</span>
                                        </h3>

                                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <Mail size={14} className="text-indigo-500" />
                                                {app.email}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={14} className="text-emerald-500" />
                                                {app.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-amber-500" />
                                                Applied: {app.date}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        <span className="text-gray-800 font-medium">Research Interests:</span> {app.researchInterests.join(", ")}
                                    </p>
                                </div>

                                {/* Actions & Quick Stats */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:w-1/3 lg:border-l lg:border-gray-100 lg:pl-6">

                                    <div className="flex-1 w-full space-y-2">
                                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-500">CGPA</span>
                                                <span className="text-gray-800 font-bold">{app.cgpa}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Experience</span>
                                                <span className="text-gray-800 font-bold truncate max-w-[150px]" title={app.experience}>{app.experience}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedApplication(app)}
                                        className="w-full sm:w-auto px-4 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        View Details
                                        <ChevronRight size={16} />
                                    </button>

                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Application Detail Modal */}
            <AnimatePresence>
                {selectedApplication && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                            onClick={() => setSelectedApplication(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col">

                                {/* Modal Header */}
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{selectedApplication.fullName}</h2>
                                        <p className="text-indigo-600 text-sm font-medium">{selectedApplication.id} • {selectedApplication.position}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedApplication(null)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Modal Content - Scrollable */}
                                <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">

                                    {/* Personal & Contact */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                                                <Mail size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</p>
                                                <p className="text-gray-800 font-medium">{selectedApplication.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                                                <Phone size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Phone</p>
                                                <p className="text-gray-800 font-medium">{selectedApplication.phone}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                                                <MapPin size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Location</p>
                                                <p className="text-gray-800 font-medium">{selectedApplication.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-indigo-600">
                                                <Calendar size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Applied On</p>
                                                <p className="text-gray-800 font-medium">{selectedApplication.date}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Academic Records */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                            <BookOpen size={20} className="text-indigo-600" />
                                            Academic Records
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                                <p className="text-xs text-gray-500">10th Mark</p>
                                                <p className="text-lg font-bold text-gray-800">{selectedApplication.academicRecords.mark10}</p>
                                            </div>
                                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                                <p className="text-xs text-gray-500">12th Mark</p>
                                                <p className="text-lg font-bold text-gray-800">{selectedApplication.academicRecords.mark12}</p>
                                            </div>
                                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                                <p className="text-xs text-gray-500">Semester GPA</p>
                                                <p className="text-lg font-bold text-gray-800">{selectedApplication.academicRecords.semesterGPA}</p>
                                            </div>
                                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                                <p className="text-xs text-gray-500">Overall CGPA</p>
                                                <p className="text-lg font-bold text-gray-800">{selectedApplication.academicRecords.overallCGPA}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl border border-gray-100 bg-white">
                                                <p className="text-xs text-gray-500">Current Course</p>
                                                <p className="font-medium text-gray-800">{selectedApplication.academicRecords.currentCourse} in {selectedApplication.academicRecords.department}</p>
                                            </div>
                                            <div className="p-4 rounded-xl border border-gray-100 bg-white">
                                                <p className="text-xs text-gray-500">Education Details</p>
                                                <p className="font-medium text-gray-800">Passing {selectedApplication.academicRecords.yearOfPassing} • Semester {selectedApplication.academicRecords.currentSemester}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Research & Qualifications */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <Award size={20} className="text-indigo-600" />
                                                Qualifications
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="bg-white p-4 rounded-xl border border-gray-200">
                                                    <p className="text-xs text-gray-500 mb-1">Certification Courses</p>
                                                    <p className="text-gray-800 font-medium">{selectedApplication.additionalInfo.certificationCourses}</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-xl border border-gray-200">
                                                    <p className="text-xs text-gray-500 mb-1">Part Time Courses</p>
                                                    <p className="text-gray-800 font-medium">{selectedApplication.additionalInfo.partTimeCourses || "None"}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                                <Briefcase size={20} className="text-indigo-600" />
                                                Experience & Projects
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="bg-white p-4 rounded-xl border border-gray-200">
                                                    <p className="text-xs text-gray-500 mb-1">Internships</p>
                                                    <p className="text-gray-800 font-medium text-sm leading-relaxed">{selectedApplication.additionalInfo.internshipDetails}</p>
                                                </div>
                                                <div className="bg-white p-4 rounded-xl border border-gray-200">
                                                    <p className="text-xs text-gray-500 mb-1">Projects</p>
                                                    <p className="text-gray-800 font-medium text-sm leading-relaxed">{selectedApplication.additionalInfo.projects}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hobbies & Interests */}
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-4">Interests & Hobbies</h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {selectedApplication.researchInterests.map(interest => (
                                                <span key={interest} className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-medium border border-indigo-100">
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-gray-600 italic border-l-4 border-indigo-200 pl-4 py-1">
                                            "{selectedApplication.additionalInfo.hobbies}"
                                        </p>
                                    </div>

                                </div>

                                {/* Model Footer */}
                                <div className="p-6 border-t border-gray-100 flex gap-4 justify-end bg-gray-50/50">
                                    <button className="px-6 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                        Download Resume
                                    </button>
                                    <button className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">
                                        Shortlist Candidate
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </ReserchLayout>
    );
};

export default ApplicationReviewPage;
