import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Check, ChevronDown, Search, X, Award, GraduationCap, BookOpen, Briefcase, ChevronRight, ChevronLeft } from "lucide-react";

export default function JobApplication() {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState("personal");
    const [showAllResearch, setShowAllResearch] = useState(false);
    const [researchSearch, setResearchSearch] = useState("");

    // Scroll effect for Navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) setShowNavbar(false);
            else setShowNavbar(true);
            setLastScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        location: "",

        // 10th Details
        tenthBoard: "",
        tenthSchool: "",
        tenthYear: "",
        tenthPercentage: "",
        tenthSubjects: "",

        // 12th Details
        twelfthBoard: "",
        twelfthSchool: "",
        twelfthYear: "",
        twelfthPercentage: "",
        twelfthStream: "",
        twelfthSubjects: "",

        // Current Education
        currentCourse: "",
        department: "",
        collegeName: "",
        university: "",
        yearOfPassing: "",

        // Semester-wise GPA (for 8 semesters)
        semesterGPAs: {
            sem1: "",
            sem2: "",
            sem3: "",
            sem4: "",
            sem5: "",
            sem6: "",
            sem7: "",
            sem8: ""
        },
        cgpa: "",

        // Additional Qualifications
        certificationCourses: "",
        partTimeCourses: "",
        internshipDetails: "",
        projects: "",
        publications: "",
        patents: "",
        hobbies: "",

        // Research Interests
        researchInterests: [],
        backlogs: "",

        // Resume Upload
        resume: null,
        coverLetter: null
    });

    const researchOptions = [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
        "Computer Vision",
        "Natural Language Processing",
        "Speech Recognition",
        "Robotics",
        "Autonomous Systems",
        "Reinforcement Learning",
        "Generative AI",
        "Large Language Models",
        "Data Science",
        "Big Data Analytics",
        "Business Intelligence",
        "Data Visualization",
        "Cyber Security",
        "Network Security",
        "Cryptography",
        "Ethical Hacking",
        "Cloud Computing",
        "Edge Computing",
        "Distributed Systems",
        "DevOps",
        "Bioinformatics",
        "Computational Biology",
        "Health Informatics",
        "Medical Imaging",
        "Internet of Things",
        "Embedded Systems",
        "Wireless Networks",
        "5G/6G Networks",
        "Blockchain",
        "Web3",
        "Quantum Computing",
        "Augmented Reality",
        "Virtual Reality",
        "Mixed Reality",
        "Human-Computer Interaction",
        "Software Engineering",
        "Agile Methodologies",
        "Software Testing",
        "Computer Graphics",
        "Game Development",
        "Theoretical Computer Science",
        "Algorithms",
        "Computational Complexity",
        "Formal Methods",
        "High Performance Computing",
        "Parallel Computing"
    ];

    const boardsOptions = [
        "CBSE",
        "ICSE",
        "State Board - Maharashtra",
        "State Board - Tamil Nadu",
        "State Board - Karnataka",
        "State Board - Andhra Pradesh",
        "State Board - Telangana",
        "State Board - Uttar Pradesh",
        "State Board - Bihar",
        "State Board - West Bengal",
        "State Board - Gujarat",
        "State Board - Rajasthan",
        "State Board - Madhya Pradesh",
        "State Board - Punjab",
        "State Board - Haryana",
        "State Board - Kerala",
        "International Baccalaureate",
        "Cambridge IGCSE",
        "NIOS",
        "Others"
    ];

    const streamOptions = [
        "Science - PCM",
        "Science - PCB",
        "Science - PCMB",
        "Commerce",
        "Arts/Humanities",
        "Vocational",
        "IB Diploma",
        "Other"
    ];

    const filteredResearchOptions = researchOptions.filter(option =>
        option.toLowerCase().includes(researchSearch.toLowerCase())
    );

    const displayedResearchOptions = showAllResearch
        ? filteredResearchOptions
        : filteredResearchOptions.slice(0, 12);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSemesterGPAChange = (semester, value) => {
        setFormData({
            ...formData,
            semesterGPAs: {
                ...formData.semesterGPAs,
                [semester]: value
            }
        });
    };

    const handleCheckboxChange = (option) => {
        let updatedInterests = [...formData.researchInterests];
        if (updatedInterests.includes(option)) {
            updatedInterests = updatedInterests.filter((item) => item !== option);
        } else {
            if (updatedInterests.length < 3) {
                updatedInterests.push(option);
            }
        }
        setFormData({ ...formData, researchInterests: updatedInterests });
    };

    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        setFormData({ ...formData, [type]: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const applicationId = `${formData.fullName}_${formData.phone}`;

            const applicationData = {
                personal: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    email: formData.email,
                    location: formData.location
                },
                education: {
                    tenth: {
                        board: formData.tenthBoard,
                        school: formData.tenthSchool,
                        year: formData.tenthYear,
                        percentage: formData.tenthPercentage,
                        subjects: formData.tenthSubjects
                    },
                    twelfth: {
                        board: formData.twelfthBoard,
                        school: formData.twelfthSchool,
                        year: formData.twelfthYear,
                        percentage: formData.twelfthPercentage,
                        stream: formData.twelfthStream,
                        subjects: formData.twelfthSubjects
                    },
                    current: {
                        course: formData.currentCourse,
                        department: formData.department,
                        college: formData.collegeName,
                        university: formData.university,
                        yearOfPassing: formData.yearOfPassing
                    }
                },
                academics: {
                    semesterGPAs: formData.semesterGPAs,
                    cgpa: formData.cgpa,
                    backlogs: formData.backlogs || "0"
                },
                experience: {
                    certifications: formData.certificationCourses,
                    internships: formData.internshipDetails,
                    projects: formData.projects,
                    publications: formData.publications,
                    patents: formData.patents
                },
                research: {
                    interests: formData.researchInterests,
                    hobbies: formData.hobbies
                },
                submittedAt: new Date().toISOString()
            };

            await setDoc(doc(db, "Application", applicationId), applicationData);

            setSubmitted(true);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Error submitting application: ", error);
            alert("Failed to submit application. Please try again.");
        }
    };

    const handleReset = () => {
        setFormData({
            fullName: "",
            phone: "",
            email: "",
            location: "",
            tenthBoard: "",
            tenthSchool: "",
            tenthYear: "",
            tenthPercentage: "",
            tenthSubjects: "",
            twelfthBoard: "",
            twelfthSchool: "",
            twelfthYear: "",
            twelfthPercentage: "",
            twelfthStream: "",
            twelfthSubjects: "",
            currentCourse: "",
            department: "",
            collegeName: "",
            university: "",
            yearOfPassing: "",
            semesterGPAs: {
                sem1: "", sem2: "", sem3: "", sem4: "",
                sem5: "", sem6: "", sem7: "", sem8: ""
            },
            cgpa: "",
            certificationCourses: "",
            partTimeCourses: "",
            internshipDetails: "",
            projects: "",
            publications: "",
            patents: "",
            hobbies: "",
            researchInterests: [],
            backlogs: "",
            resume: null,
            coverLetter: null
        });
        setSubmitted(false);
        setActiveTab("personal");
    };

    const tabs = [
        { id: "personal", label: "Personal", icon: "👤" },
        { id: "education", label: "Education", icon: "🎓" },
        { id: "academics", label: "Academics", icon: "📚" },
        { id: "experience", label: "Experience", icon: "💼" },
        { id: "research", label: "Research", icon: "🔬" }
    ];

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#071730] text-white flex flex-col items-center justify-center p-4">
                <Navbar />
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#112240] p-8 rounded-2xl shadow-2xl text-center max-w-lg w-full mt-20 border border-[#233554]"
                >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-[#64ffda]">Application Submitted!</h2>
                    <p className="text-gray-300 mb-8">
                        Thank you for applying for the Junior Research Fellow position. We have received your application and will review it shortly.
                    </p>
                    <button
                        onClick={() => window.location.href = "/careers"}
                        className="px-6 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#52dcb8] transition-colors"
                    >
                        Back to Careers
                    </button>
                </motion.div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-[#071730] min-h-screen text-gray-300 font-sans selection:bg-[#64ffda] selection:text-[#0a192f]">
            {/* Navbar */}
            <div
                className={`fixed left-0 w-full z-50 transition-transform duration-500 ease-in-out ${showNavbar ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="mt-4 mx-4">
                    <Navbar />
                </div>
            </div>

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Job Details Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        Junior Research Fellow Application
                    </h1>
                    <p className="text-xl text-[#64ffda] font-medium">Position: Junior Research Fellow | Experience: 0 – 1 Year</p>
                </motion.div>

                {/* Progress Tabs */}
                <div className="mb-8 flex justify-center overflow-x-auto">
                    <div className="flex space-x-8 min-w-max p-1 bg-[#112240] rounded-5xl border border-[#233554]">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${activeTab === tab.id
                                    ? "bg-[#64ffda] text-[#0a192f] font-medium"
                                    : "text-gray-400 hover:text-white hover:bg-[#1a2f4a]"
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                                {index < tabs.length - 1 && (
                                    <ChevronRight className="w-4 h-4 ml-2 text-gray-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar - Job Responsibilities & Progress */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <div className="bg-[#112240] p-6 rounded-2xl border border-[#233554] shadow-lg sticky top-32">
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-4">Application Progress</h3>
                                <div className="space-y-3">
                                    {tabs.map((tab) => {
                                        let isCompleted = false;
                                        switch (tab.id) {
                                            case "personal":
                                                isCompleted = formData.fullName && formData.email;
                                                break;
                                            case "education":
                                                isCompleted = formData.tenthPercentage && formData.twelfthPercentage;
                                                break;
                                            case "academics":
                                                isCompleted = formData.cgpa && formData.semesterGPAs.sem1;
                                                break;
                                            case "research":
                                                isCompleted = formData.researchInterests.length > 0;
                                                break;
                                            default:
                                                isCompleted = false;
                                        }
                                        return (
                                            <div key={tab.id} className="flex items-center justify-between">
                                                <span className="text-gray-400">{tab.label}</span>
                                                {isCompleted ? (
                                                    <span className="text-[#64ffda] text-sm">✓ Completed</span>
                                                ) : (
                                                    <span className="text-gray-600 text-sm">Pending</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <hr className="border-[#233554] my-6" />

                            <h3 className="text-2xl font-bold text-white mb-6">Key Responsibilities</h3>
                            <ul className="space-y-4 text-sm leading-relaxed text-gray-400">
                                {[
                                    "Conduct literature review and systematic research analysis",
                                    "Design and implement experimental methodologies",
                                    "Develop algorithms and optimize existing solutions",
                                    "Write and publish research papers in peer-reviewed journals",
                                    "Present findings at national and international conferences",
                                    "Collaborate with industry partners and academic institutions",
                                    "Mentor undergraduate research assistants",
                                    "Contribute to grant writing and research proposals"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start group hover:text-white transition-colors">
                                        <span className="mr-3 text-[#64ffda] mt-1 group-hover:scale-110 transition-transform">▹</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Main Application Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <form onSubmit={handleSubmit} className="bg-[#112240] p-8 rounded-2xl border border-[#233554] shadow-xl space-y-8">

                            {/* Personal Details Tab */}
                            <AnimatePresence mode="wait">
                                {activeTab === "personal" && (
                                    <motion.section
                                        key="personal"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-2xl font-bold text-white flex items-center">
                                            <span className="w-10 h-10 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-lg">👤</span>
                                            Personal Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Full Name <span className="text-red-400">*</span></label>
                                                <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                                                    className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                    placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Phone Number <span className="text-red-400">*</span></label>
                                                <input required type="tel" pattern="[0-9]{10}" name="phone" value={formData.phone} onChange={handleInputChange}
                                                    className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                    placeholder="9876543210" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Email Address <span className="text-red-400">*</span></label>
                                                <input required type="email" name="email" value={formData.email} onChange={handleInputChange}
                                                    className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                    placeholder="john@example.com" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Location <span className="text-red-400">*</span></label>
                                                <input required type="text" name="location" value={formData.location} onChange={handleInputChange}
                                                    className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                    placeholder="City, State" />
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-6">
                                            <button type="button" onClick={() => setActiveTab("education")}
                                                className="px-6 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#52dcb8] transition-colors flex items-center space-x-2">
                                                <span>Next: Education</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.section>
                                )}

                                {/* Education Tab - 10th & 12th with detailed board info */}
                                {activeTab === "education" && (
                                    <motion.section
                                        key="education"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-2xl font-bold text-white flex items-center">
                                            <span className="w-10 h-10 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-lg">🎓</span>
                                            Educational Background
                                        </h3>

                                        {/* 10th Details */}
                                        <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554]">
                                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                                <Award className="w-5 h-5 mr-2 text-[#64ffda]" />
                                                Secondary Education (Class 10)
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Board/University <span className="text-red-400">*</span></label>
                                                    <select required name="tenthBoard" value={formData.tenthBoard} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white">
                                                        <option value="">Select Board</option>
                                                        {boardsOptions.map(board => (
                                                            <option key={board} value={board}>{board}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">School Name <span className="text-red-400">*</span></label>
                                                    <input required type="text" name="tenthSchool" value={formData.tenthSchool} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="School name" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Year of Passing <span className="text-red-400">*</span></label>
                                                    <input required type="number" name="tenthYear" value={formData.tenthYear} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="2020" min="2000" max="2030" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Percentage/CGPA <span className="text-red-400">*</span></label>
                                                    <input required type="number" step="0.01" name="tenthPercentage" value={formData.tenthPercentage} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="95.5" />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <label className="text-sm font-medium text-gray-400">Main Subjects</label>
                                                    <input type="text" name="tenthSubjects" value={formData.tenthSubjects} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="Science, Mathematics, Social Studies, English, Hindi" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* 12th Details */}
                                        <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554]">
                                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                                <GraduationCap className="w-5 h-5 mr-2 text-[#64ffda]" />
                                                Higher Secondary Education (Class 12)
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Board/University <span className="text-red-400">*</span></label>
                                                    <select required name="twelfthBoard" value={formData.twelfthBoard} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white">
                                                        <option value="">Select Board</option>
                                                        {boardsOptions.map(board => (
                                                            <option key={board} value={board}>{board}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">School/College Name <span className="text-red-400">*</span></label>
                                                    <input required type="text" name="twelfthSchool" value={formData.twelfthSchool} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="School/College name" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Year of Passing <span className="text-red-400">*</span></label>
                                                    <input required type="number" name="twelfthYear" value={formData.twelfthYear} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="2022" min="2000" max="2030" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Percentage/CGPA <span className="text-red-400">*</span></label>
                                                    <input required type="number" step="0.01" name="twelfthPercentage" value={formData.twelfthPercentage} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="94.2" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Stream <span className="text-red-400">*</span></label>
                                                    <select required name="twelfthStream" value={formData.twelfthStream} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white">
                                                        <option value="">Select Stream</option>
                                                        {streamOptions.map(stream => (
                                                            <option key={stream} value={stream}>{stream}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <label className="text-sm font-medium text-gray-400">Main Subjects</label>
                                                    <input type="text" name="twelfthSubjects" value={formData.twelfthSubjects} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="Physics, Chemistry, Mathematics, Computer Science" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Current Education */}
                                        <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554]">
                                            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                                                <BookOpen className="w-5 h-5 mr-2 text-[#64ffda]" />
                                                Current Education
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-300">Course/Degree <span className="text-red-400">*</span></label>
                                                    <input required type="text" name="currentCourse" value={formData.currentCourse} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="B.Tech" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Department <span className="text-red-400">*</span></label>
                                                    <input required type="text" name="department" value={formData.department} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="Computer Science" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">College/Institute <span className="text-red-400">*</span></label>
                                                    <input required type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="College name" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">University <span className="text-red-400">*</span></label>
                                                    <input required type="text" name="university" value={formData.university} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="University name" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Expected Year of Passing <span className="text-red-400">*</span></label>
                                                    <input required type="month" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-6">
                                            <button type="button" onClick={() => setActiveTab("personal")}
                                                className="px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-bold rounded-lg hover:bg-[#64ffda]/10 transition-colors flex items-center space-x-2">
                                                <ChevronLeft className="w-4 h-4" />
                                                <span>Previous</span>
                                            </button>
                                            <button type="button" onClick={() => setActiveTab("academics")}
                                                className="px-6 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#52dcb8] transition-colors flex items-center space-x-2">
                                                <span>Next: Academics</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.section>
                                )}

                                {/* Academics Tab - Semester-wise GPA */}
                                {activeTab === "academics" && (
                                    <motion.section
                                        key="academics"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-2xl font-bold text-white flex items-center">
                                            <span className="w-10 h-10 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-lg">📊</span>
                                            Academic Performance
                                        </h3>

                                        {/* Semester-wise GPA */}
                                        <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554]">
                                            <h4 className="text-lg font-semibold text-white mb-4">Semester-wise GPA Details</h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                                    <div key={sem} className="space-y-2">
                                                        <label className="text-xs font-medium text-gray-400">Semester {sem}</label>
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            max="10"
                                                            value={formData.semesterGPAs[`sem${sem}`]}
                                                            onChange={(e) => handleSemesterGPAChange(`sem${sem}`, e.target.value)}
                                                            className="w-full bg-[#112240] border border-[#233554] rounded-lg px-3 py-2 focus:outline-none focus:border-[#64ffda] transition-colors text-white text-sm"
                                                            placeholder="0.00"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Overall CGPA */}
                                        <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554]">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Overall CGPA <span className="text-red-400">*</span></label>
                                                    <input required type="number" step="0.01" max="10" name="cgpa" value={formData.cgpa} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="8.7" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Current Backlogs (if any)</label>
                                                    <input type="number" name="backlogs" value={formData.backlogs} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="0" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-6">
                                            <button type="button" onClick={() => setActiveTab("education")}
                                                className="px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-bold rounded-lg hover:bg-[#64ffda]/10 transition-colors flex items-center space-x-2">
                                                <ChevronLeft className="w-4 h-4" />
                                                <span>Previous</span>
                                            </button>
                                            <button type="button" onClick={() => setActiveTab("experience")}
                                                className="px-6 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#52dcb8] transition-colors flex items-center space-x-2">
                                                <span>Next: Experience</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.section>
                                )}

                                {/* Experience Tab */}
                                {activeTab === "experience" && (
                                    <motion.section
                                        key="experience"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-2xl font-bold text-white flex items-center">
                                            <span className="w-10 h-10 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-lg">💼</span>
                                            Qualifications & Experience
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554] space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Certification Courses</label>
                                                    <textarea name="certificationCourses" value={formData.certificationCourses} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-24 resize-none"
                                                        placeholder="• Deep Learning Specialization - Coursera&#10;• AWS Certified Cloud Practitioner&#10;• Google Data Analytics Professional Certificate" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Internship Details</label>
                                                    <textarea name="internshipDetails" value={formData.internshipDetails} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-24 resize-none"
                                                        placeholder="Company: XYZ Corp | Role: ML Intern | Duration: 6 months&#10;• Developed CNN model achieving 95% accuracy&#10;• Deployed models using Flask and AWS EC2" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Projects</label>
                                                    <textarea name="projects" value={formData.projects} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-32 resize-none"
                                                        placeholder="• AI-Powered Resume Analyzer - NLP, Flask, BERT&#10;• E-commerce Recommendation System - Collaborative Filtering&#10;• Real-time Face Mask Detection - YOLOv4, OpenCV" />
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-400">Publications (if any)</label>
                                                        <textarea name="publications" value={formData.publications} onChange={handleInputChange}
                                                            className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-20 resize-none"
                                                            placeholder="Conference papers, journal articles..." />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-gray-400">Patents (if any)</label>
                                                        <textarea name="patents" value={formData.patents} onChange={handleInputChange}
                                                            className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-20 resize-none"
                                                            placeholder="Patent title and status..." />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-6">
                                            <button type="button" onClick={() => setActiveTab("academics")}
                                                className="px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-bold rounded-lg hover:bg-[#64ffda]/10 transition-colors flex items-center space-x-2">
                                                <ChevronLeft className="w-4 h-4" />
                                                <span>Previous</span>
                                            </button>
                                            <button type="button" onClick={() => setActiveTab("research")}
                                                className="px-6 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#52dcb8] transition-colors flex items-center space-x-2">
                                                <span>Next: Research</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.section>
                                )}

                                {/* Research Interests Tab - Advanced with search and hidden */}
                                {activeTab === "research" && (
                                    <motion.section
                                        key="research"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-2xl font-bold text-white flex items-center">
                                            <span className="w-10 h-10 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-lg">🔬</span>
                                            Research Interests
                                        </h3>

                                        <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554] space-y-4">
                                            {/* Search Bar */}
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                                <input
                                                    type="text"
                                                    placeholder="Search research areas..."
                                                    value={researchSearch}
                                                    onChange={(e) => setResearchSearch(e.target.value)}
                                                    className="w-full bg-[#112240] border border-[#233554] rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                />
                                                {researchSearch && (
                                                    <button
                                                        onClick={() => setResearchSearch("")}
                                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Selected Interests */}
                                            {formData.researchInterests.length > 0 && (
                                                <div className="bg-[#64ffda]/10 p-4 rounded-lg border border-[#64ffda]/30">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium text-[#64ffda]">
                                                            Selected Interests ({formData.researchInterests.length}/3)
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {formData.researchInterests.map((interest) => (
                                                            <span
                                                                key={interest}
                                                                className="inline-flex items-center px-3 py-1 bg-[#64ffda] text-[#0a192f] text-sm rounded-full"
                                                            >
                                                                {interest}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleCheckboxChange(interest)}
                                                                    className="ml-2 hover:text-red-600"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Research Options Grid */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                                {displayedResearchOptions.map((option) => (
                                                    <label
                                                        key={option}
                                                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${formData.researchInterests.includes(option)
                                                            ? "bg-[#64ffda]/10 border-[#64ffda]"
                                                            : "bg-[#112240] border-[#233554] hover:border-gray-500"
                                                            } ${formData.researchInterests.length >= 3 && !formData.researchInterests.includes(option)
                                                                ? "opacity-50 cursor-not-allowed"
                                                                : ""
                                                            }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={option}
                                                            checked={formData.researchInterests.includes(option)}
                                                            onChange={() => handleCheckboxChange(option)}
                                                            disabled={formData.researchInterests.length >= 3 && !formData.researchInterests.includes(option)}
                                                            className="mr-3 w-4 h-4 accent-[#64ffda]"
                                                        />
                                                        <span className="text-sm text-gray-300">{option}</span>
                                                    </label>
                                                ))}
                                            </div>

                                            {/* Show More/Less Button */}
                                            {filteredResearchOptions.length > 12 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setShowAllResearch(!showAllResearch)}
                                                    className="mt-4 text-[#64ffda] hover:text-[#52dcb8] text-sm font-medium flex items-center"
                                                >
                                                    {showAllResearch ? "Show Less" : `Show ${filteredResearchOptions.length - 12} More Options`}
                                                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${showAllResearch ? "rotate-180" : ""}`} />
                                                </button>
                                            )}

                                            {/* Hobbies */}
                                            <div className="space-y-2 mt-6 pt-6 border-t border-[#233554]">
                                                <label className="text-sm font-medium text-gray-400">Hobbies & Interests</label>
                                                <textarea
                                                    name="hobbies"
                                                    value={formData.hobbies}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-20 resize-none"
                                                    placeholder="Reading, Gaming, Travelling, Chess, Photography..."
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-6">
                                            <button type="button" onClick={() => setActiveTab("experience")}
                                                className="px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-bold rounded-lg hover:bg-[#64ffda]/10 transition-colors flex items-center space-x-2">
                                                <ChevronLeft className="w-4 h-4" />
                                                <span>Previous</span>
                                            </button>
                                            <button type="submit"
                                                className="px-6 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#52dcb8] transition-colors transform hover:-translate-y-1 shadow-lg shadow-[#64ffda]/20">
                                                Submit Application
                                            </button>
                                        </div>
                                    </motion.section>
                                )}



                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}