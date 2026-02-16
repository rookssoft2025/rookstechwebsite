import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Check, ChevronDown, Search, X, Award, GraduationCap, BookOpen, Briefcase, ChevronRight, ChevronLeft, ClipboardList } from "lucide-react";

// Add custom styles for dimmer placeholders
const styles = `
    input::placeholder,
    textarea::placeholder,
    select::placeholder {
        opacity: 1 !important;
        color: #8c8d904d !important;
    }
    
    input:focus::placeholder,
    textarea:focus::placeholder {
        opacity: 1 !important;
        color: #a8b2d1 !important;
    }

    input[type="month"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
        cursor: pointer;
    }
`;


export default function JobApplication() {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [jobType, setJobType] = useState("Junior Research Fellow");
    const [activeTab, setActiveTab] = useState("personal");
    const [showAllResearch, setShowAllResearch] = useState(false);
    const [researchSearch, setResearchSearch] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

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
        coverLetter: null,

        // Policy Agreement
        policyAgreed: false
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

        if (name === "phone") {
            // Allow only numbers and max length 10
            if (/^\d*$/.test(value) && value.length <= 10) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
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

    // Validation function for each tab
    const validateTab = (tab) => {
        const errors = {};

        if (tab === "personal") {
            if (!formData.fullName.trim()) errors.fullName = "Full name is required";
            if (!formData.phone.trim()) errors.phone = "Phone number is required";
            else if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Enter a valid 10-digit number";
            if (!formData.email.trim()) errors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Enter a valid email address";
            if (!formData.location.trim()) errors.location = "Location is required";
        }

        if (tab === "education") {
            // 10th validation
            if (!formData.tenthBoard) errors.tenthBoard = "10th Board is required";
            if (!formData.tenthSchool.trim()) errors.tenthSchool = "10th School is required";
            if (!formData.tenthYear) errors.tenthYear = "10th Year is required";
            if (!formData.tenthPercentage) errors.tenthPercentage = "10th Percentage is required";

            // 12th validation
            if (!formData.twelfthBoard) errors.twelfthBoard = "12th Board is required";
            if (!formData.twelfthSchool.trim()) errors.twelfthSchool = "12th School is required";
            if (!formData.twelfthYear) errors.twelfthYear = "12th Year is required";
            if (!formData.twelfthPercentage) errors.twelfthPercentage = "12th Percentage is required";
            if (!formData.twelfthStream) errors.twelfthStream = "12th Stream is required";

            // Current education validation
            if (!formData.currentCourse.trim()) errors.currentCourse = "Current course is required";
            if (!formData.department.trim()) errors.department = "Department is required";
            if (!formData.collegeName.trim()) errors.collegeName = "College name is required";
            if (!formData.university.trim()) errors.university = "University name is required";
            if (!formData.yearOfPassing) errors.yearOfPassing = "Passing year is required";
        }

        if (tab === "academics") {
            if (!formData.cgpa) errors.cgpa = "Overall CGPA is required";
        }

        if (tab === "research") {
            if (formData.researchInterests.length === 0) {
                errors.researchInterests = "Please select at least one research interest";
            }
            if (!formData.policyAgreed) {
                errors.policyAgreed = "You must agree to the policies to submit the application";
            }
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Handle tab change with validation
    const handleTabChange = (newTab) => {
        const tabOrder = ["personal", "education", "academics", "experience", "research", "preview"];
        const currentIndex = tabOrder.indexOf(activeTab);
        const newIndex = tabOrder.indexOf(newTab);

        // Only validate if moving forward
        if (newIndex > currentIndex) {
            // Validate all tabs between currentIndex and newIndex-1
            for (let i = currentIndex; i < newIndex; i++) {
                if (!validateTab(tabOrder[i])) {
                    setActiveTab(tabOrder[i]);
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                    return;
                }
            }
        }

        setValidationErrors({});
        setActiveTab(newTab);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateTab(activeTab)) {
            window.scrollTo({ top: 300, behavior: 'smooth' });
            return;
        }

        try {
            const applicationId = `${formData.fullName}_${formData.phone}_${jobType.replace(/\s+/g, '')}`;

            const applicationData = {
                jobType: jobType,
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
                    semesterGPAs: Object.fromEntries(
                        Object.entries(formData.semesterGPAs).map(([key, value]) => [key, value || "N/A"])
                    ),
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
                    hobbies: formData.hobbies,
                    policyAgreed: formData.policyAgreed
                },
                submittedAt: new Date().toISOString()
            };

            const collectionName = jobType === "Research Intern" ? "internships" : "Application";
            await setDoc(doc(db, collectionName, applicationId), applicationData);

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
            coverLetter: null,
            policyAgreed: false
        });
        setSubmitted(false);
        setActiveTab("personal");
    };

    const tabs = [
        { id: "personal", label: "Personal", icon: "👤" },
        { id: "education", label: "Education", icon: "🎓" },
        { id: "academics", label: "Academics", icon: "📚" },
        { id: "experience", label: "Experience", icon: "💼" },
        { id: "research", label: "Research", icon: "🔬" },
        { id: "preview", label: "Review", icon: <ClipboardList className="w-5 h-5" /> }
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
                        Thank you for applying for the {jobType} position. We have received your application and will review it shortly.
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
            {/* Custom Styles for Dimmer Placeholders */}
            <style>{styles}</style>

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
                    <div className="flex justify-center space-x-4 mb-6">
                        <button
                            onClick={() => setJobType("Junior Research Fellow")}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${jobType === "Junior Research Fellow"
                                ? "bg-[#64ffda] text-[#0a192f] shadow-lg shadow-[#64ffda]/20"
                                : "bg-[#112240] text-gray-400 border border-[#233554] hover:text-white hover:border-[#64ffda]"
                                }`}
                        >
                            Junior Research Fellow
                        </button>
                        <button
                            onClick={() => setJobType("Research Intern")}
                            className={`px-6 py-2 rounded-full font-bold transition-all ${jobType === "Research Intern"
                                ? "bg-[#64ffda] text-[#0a192f] shadow-lg shadow-[#64ffda]/20"
                                : "bg-[#112240] text-gray-400 border border-[#233554] hover:text-white hover:border-[#64ffda]"
                                }`}
                        >
                            Research Intern
                        </button>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                        {jobType} Application
                    </h1>
                    <p className="text-xl text-[#64ffda] font-medium">
                        {jobType === "Junior Research Fellow"
                            ? "Position: Junior Research Fellow | Experience: 0 – 1 Year"
                            : "Final year students are eligible to apply"}
                    </p>
                </motion.div>

                {/* Progress Tabs */}
                <div className="mb-8 flex justify-center overflow-x-auto">
                    <div className="flex space-x-8 min-w-max p-1 bg-[#112240] rounded-5xl border border-[#233554]">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
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
                                        const checkTabCompletion = (tabId) => {
                                            switch (tabId) {
                                                case "personal":
                                                    return (
                                                        formData.fullName?.trim() &&
                                                        formData.phone?.trim() &&
                                                        /^\d{10}$/.test(formData.phone) &&
                                                        formData.email?.trim() &&
                                                        formData.location?.trim()
                                                    );
                                                case "education":
                                                    return (
                                                        formData.tenthBoard &&
                                                        formData.tenthSchool?.trim() &&
                                                        formData.tenthYear &&
                                                        formData.tenthPercentage &&
                                                        formData.twelfthBoard &&
                                                        formData.twelfthSchool?.trim() &&
                                                        formData.twelfthYear &&
                                                        formData.twelfthPercentage &&
                                                        formData.twelfthStream &&
                                                        formData.currentCourse?.trim() &&
                                                        formData.department?.trim() &&
                                                        formData.collegeName?.trim() &&
                                                        formData.university?.trim() &&
                                                        formData.yearOfPassing
                                                    );
                                                case "academics":
                                                    return !!formData.cgpa;
                                                case "experience":
                                                    return !!(
                                                        formData.certificationCourses ||
                                                        formData.internshipDetails ||
                                                        formData.projects ||
                                                        formData.publications ||
                                                        formData.patents
                                                    );
                                                case "research":
                                                    return formData.researchInterests.length > 0 && formData.policyAgreed;
                                                case "preview":
                                                    return submitted;
                                                default:
                                                    return false;
                                            }
                                        };

                                        const isCompleted = checkTabCompletion(tab.id);

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
                                {(jobType === "Junior Research Fellow" ? [
                                    "Conduct literature review and systematic research analysis",
                                    "Design and implement experimental methodologies",
                                    "Develop algorithms and optimize existing solutions",
                                    "Write and publish research papers in peer-reviewed journals",
                                    "Present findings at national and international conferences",
                                    "Collaborate with industry partners and academic institutions",
                                    "Mentor undergraduate research assistants",
                                    "Contribute to grant writing and research proposals"
                                ] : [
                                    "Conduct literature review and systematic research analysis",
                                    "Assist in designing and implementing experiments",
                                    "Implement algorithms and test existing solutions",
                                    "Assist in writing research papers and documentation",
                                    "Attend team meetings and present weekly progress",
                                    "Collaborate with senior researchers and mentors",
                                    "Learn and apply new technologies and tools",
                                    "Contribute to project codebases and datasets"
                                ]).map((item, index) => (
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
                                                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                                                    className={`w-full bg-[#0a192f] border ${validationErrors.fullName ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                    placeholder="John Doe" />
                                                {validationErrors.fullName && <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Phone Number <span className="text-red-400">*</span></label>
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                                    className={`w-full bg-[#0a192f] border ${validationErrors.phone ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                    placeholder="9876543210" />
                                                {validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Email Address <span className="text-red-400">*</span></label>
                                                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                                                    className={`w-full bg-[#0a192f] border ${validationErrors.email ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                    placeholder="john@example.com" />
                                                {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-400">Location <span className="text-red-400">*</span></label>
                                                <input type="text" name="location" value={formData.location} onChange={handleInputChange}
                                                    className={`w-full bg-[#0a192f] border ${validationErrors.location ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                    placeholder="City, State" />
                                                {validationErrors.location && <p className="text-red-500 text-xs mt-1">{validationErrors.location}</p>}
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-6">
                                            <button type="button" onClick={() => handleTabChange("education")}
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
                                                    <select name="tenthBoard" value={formData.tenthBoard} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.tenthBoard ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}>
                                                        <option value="">Select Board</option>
                                                        {boardsOptions.map(board => (
                                                            <option key={board} value={board}>{board}</option>
                                                        ))}
                                                    </select>
                                                    {validationErrors.tenthBoard && <p className="text-red-500 text-xs mt-1">{validationErrors.tenthBoard}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">School Name <span className="text-red-400">*</span></label>
                                                    <input type="text" name="tenthSchool" value={formData.tenthSchool} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.tenthSchool ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="School name" />
                                                    {validationErrors.tenthSchool && <p className="text-red-500 text-xs mt-1">{validationErrors.tenthSchool}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Year of Passing <span className="text-red-400">*</span></label>
                                                    <input type="number" name="tenthYear" value={formData.tenthYear} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.tenthYear ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="2020" min="2000" max="2030" />
                                                    {validationErrors.tenthYear && <p className="text-red-500 text-xs mt-1">{validationErrors.tenthYear}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Percentage/CGPA <span className="text-red-400">*</span></label>
                                                    <input type="number" step="0.01" name="tenthPercentage" value={formData.tenthPercentage} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.tenthPercentage ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="95.5" />
                                                    {validationErrors.tenthPercentage && <p className="text-red-500 text-xs mt-1">{validationErrors.tenthPercentage}</p>}
                                                </div>
                                                {/* <div className="space-y-2 md:col-span-2">
                                                    <label className="text-sm font-medium text-gray-400">Main Subjects</label>
                                                    <input type="text" name="tenthSubjects" value={formData.tenthSubjects} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="Science, Mathematics, Social Studies, English, Hindi" />
                                                </div> */}
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
                                                    <select name="twelfthBoard" value={formData.twelfthBoard} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.twelfthBoard ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}>
                                                        <option value="">Select Board</option>
                                                        {boardsOptions.map(board => (
                                                            <option key={board} value={board}>{board}</option>
                                                        ))}
                                                    </select>
                                                    {validationErrors.twelfthBoard && <p className="text-red-500 text-xs mt-1">{validationErrors.twelfthBoard}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">School/College Name <span className="text-red-400">*</span></label>
                                                    <input type="text" name="twelfthSchool" value={formData.twelfthSchool} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.twelfthSchool ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="School/College name" />
                                                    {validationErrors.twelfthSchool && <p className="text-red-500 text-xs mt-1">{validationErrors.twelfthSchool}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Year of Passing <span className="text-red-400">*</span></label>
                                                    <input type="number" name="twelfthYear" value={formData.twelfthYear} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.twelfthYear ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="2022" min="2000" max="2030" />
                                                    {validationErrors.twelfthYear && <p className="text-red-500 text-xs mt-1">{validationErrors.twelfthYear}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Percentage/CGPA <span className="text-red-400">*</span></label>
                                                    <input type="number" step="0.01" name="twelfthPercentage" value={formData.twelfthPercentage} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.twelfthPercentage ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="94.2" />
                                                    {validationErrors.twelfthPercentage && <p className="text-red-500 text-xs mt-1">{validationErrors.twelfthPercentage}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Stream <span className="text-red-400">*</span></label>
                                                    <select name="twelfthStream" value={formData.twelfthStream} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.twelfthStream ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}>
                                                        <option value="">Select Stream</option>
                                                        {streamOptions.map(stream => (
                                                            <option key={stream} value={stream}>{stream}</option>
                                                        ))}
                                                    </select>
                                                    {validationErrors.twelfthStream && <p className="text-red-500 text-xs mt-1">{validationErrors.twelfthStream}</p>}
                                                </div>
                                                {/* <div className="space-y-2 md:col-span-2">
                                                    <label className="text-sm font-medium text-gray-400">Main Subjects</label>
                                                    <input type="text" name="twelfthSubjects" value={formData.twelfthSubjects} onChange={handleInputChange}
                                                        className="w-full bg-[#112240] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white"
                                                        placeholder="Physics, Chemistry, Mathematics, Computer Science" />
                                                </div> */}
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
                                                    <input type="text" name="currentCourse" value={formData.currentCourse} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.currentCourse ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="B.Tech" />
                                                    {validationErrors.currentCourse && <p className="text-red-500 text-xs mt-1">{validationErrors.currentCourse}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Department <span className="text-red-400">*</span></label>
                                                    <input type="text" name="department" value={formData.department} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.department ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="Computer Science" />
                                                    {validationErrors.department && <p className="text-red-500 text-xs mt-1">{validationErrors.department}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">College/Institute <span className="text-red-400">*</span></label>
                                                    <input type="text" name="collegeName" value={formData.collegeName} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.collegeName ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="College name" />
                                                    {validationErrors.collegeName && <p className="text-red-500 text-xs mt-1">{validationErrors.collegeName}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">University <span className="text-red-400">*</span></label>
                                                    <input type="text" name="university" value={formData.university} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.university ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="University name" />
                                                    {validationErrors.university && <p className="text-red-500 text-xs mt-1">{validationErrors.university}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-400">Expected Year of Passing <span className="text-red-400">*</span></label>
                                                    <input type="month" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleInputChange}
                                                        onClick={(e) => {
                                                            try {
                                                                e.target.showPicker();
                                                            } catch (error) {
                                                                console.warn("Browser does not support showPicker", error);
                                                            }
                                                        }}
                                                        className={`w-full bg-[#112240] border ${validationErrors.yearOfPassing ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white cursor-pointer`} />
                                                    {validationErrors.yearOfPassing && <p className="text-red-500 text-xs mt-1">{validationErrors.yearOfPassing}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-6">
                                            <button type="button" onClick={() => handleTabChange("personal")}
                                                className="px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-bold rounded-lg hover:bg-[#64ffda]/10 transition-colors flex items-center space-x-2">
                                                <ChevronLeft className="w-4 h-4" />
                                                <span>Previous</span>
                                            </button>
                                            <button type="button" onClick={() => handleTabChange("academics")}
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
                                                    <input type="number" step="0.01" max="10" name="cgpa" value={formData.cgpa} onChange={handleInputChange}
                                                        className={`w-full bg-[#112240] border ${validationErrors.cgpa ? 'border-red-500' : 'border-[#233554]'} rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white`}
                                                        placeholder="8.7" />
                                                    {validationErrors.cgpa && <p className="text-red-500 text-xs mt-1">{validationErrors.cgpa}</p>}
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
                                            <button type="button" onClick={() => handleTabChange("education")}
                                                className="px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-bold rounded-lg hover:bg-[#64ffda]/10 transition-colors flex items-center space-x-2">
                                                <ChevronLeft className="w-4 h-4" />
                                                <span>Previous</span>
                                            </button>
                                            <button type="button" onClick={() => handleTabChange("experience")}
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
                                            <button type="button" onClick={() => handleTabChange("academics")}
                                                className="px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-bold rounded-lg hover:bg-[#64ffda]/10 transition-colors flex items-center space-x-2">
                                                <ChevronLeft className="w-4 h-4" />
                                                <span>Previous</span>
                                            </button>
                                            <button type="button" onClick={() => handleTabChange("research")}
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
                                                    {validationErrors.researchInterests && <p className="text-red-500 text-xs mb-2">{validationErrors.researchInterests}</p>}
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

                                            {/* Policy Agreement Checkbox */}
                                            <div className="mt-6 pt-6 border-t border-[#233554]">
                                                <label className="flex items-start space-x-3 cursor-pointer group">
                                                    <div className="relative flex items-center mt-1">
                                                        <input
                                                            type="checkbox"
                                                            name="policyAgreed"
                                                            checked={formData.policyAgreed}
                                                            onChange={(e) => setFormData({ ...formData, policyAgreed: e.target.checked })}
                                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-500 bg-[#112240] transition-all checked:border-[#64ffda] checked:bg-[#64ffda]"
                                                        />
                                                        <Check className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-[#0a192f] opacity-0 peer-checked:opacity-100" />
                                                    </div>
                                                    <span className={`text-sm ${validationErrors.policyAgreed ? 'text-red-400' : 'text-gray-300'} group-hover:text-white transition-colors`}>
                                                        If I am selected, I assure to abide by the policies of the organization. <span className="text-red-400">*</span>
                                                    </span>
                                                </label>
                                                {validationErrors.policyAgreed && (
                                                    <p className="text-red-500 text-xs mt-2 ml-8">{validationErrors.policyAgreed}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-6">
                                            <button type="button" onClick={() => handleTabChange("experience")}
                                                className="px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-bold rounded-lg hover:bg-[#64ffda]/10 transition-colors flex items-center space-x-2">
                                                <ChevronLeft className="w-4 h-4" />
                                                <span>Previous</span>
                                            </button>
                                            <button type="button" onClick={() => handleTabChange("preview")}
                                                className="px-6 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#52dcb8] transition-colors flex items-center space-x-2 shadow-lg shadow-[#64ffda]/20">
                                                <span>Review Application</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.section>
                                )}

                                {/* Preview Tab */}
                                {activeTab === "preview" && (
                                    <motion.section
                                        key="preview"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <h3 className="text-2xl font-bold text-white flex items-center">
                                            <span className="w-10 h-10 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-lg">
                                                <ClipboardList className="w-5 h-5" />
                                            </span>
                                            Review Your Application
                                        </h3>

                                        <div className="space-y-6">
                                            {/* Personal Details Review */}
                                            <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554]">
                                                <h4 className="text-lg font-semibold text-[#64ffda] mb-4 flex items-center">
                                                    <span className="mr-2">👤</span> Personal Details
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-400 block">Full Name</span>
                                                        <span className="text-white">{formData.fullName}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400 block">Phone</span>
                                                        <span className="text-white">{formData.phone}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400 block">Email</span>
                                                        <span className="text-white">{formData.email}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-400 block">Location</span>
                                                        <span className="text-white">{formData.location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Education Review */}
                                            <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554]">
                                                <h4 className="text-lg font-semibold text-[#64ffda] mb-4 flex items-center">
                                                    <span className="mr-2">🎓</span> Education
                                                </h4>
                                                <div className="space-y-4 text-sm">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-[#233554]">
                                                        <div className="col-span-2 font-medium text-white">Class 10</div>
                                                        <div><span className="text-gray-400">Board:</span> <span className="text-white">{formData.tenthBoard}</span></div>
                                                        <div><span className="text-gray-400">School:</span> <span className="text-white">{formData.tenthSchool}</span></div>
                                                        <div><span className="text-gray-400">Year:</span> <span className="text-white">{formData.tenthYear}</span></div>
                                                        <div><span className="text-gray-400">Percentage:</span> <span className="text-white">{formData.tenthPercentage}%</span></div>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-[#233554]">
                                                        <div className="col-span-2 font-medium text-white">Class 12</div>
                                                        <div><span className="text-gray-400">Board:</span> <span className="text-white">{formData.twelfthBoard}</span></div>
                                                        <div><span className="text-gray-400">School:</span> <span className="text-white">{formData.twelfthSchool}</span></div>
                                                        <div><span className="text-gray-400">Year:</span> <span className="text-white">{formData.twelfthYear}</span></div>
                                                        <div><span className="text-gray-400">Percentage:</span> <span className="text-white">{formData.twelfthPercentage}%</span></div>
                                                        <div><span className="text-gray-400">Stream:</span> <span className="text-white">{formData.twelfthStream}</span></div>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="col-span-2 font-medium text-white">Current Education</div>
                                                        <div><span className="text-gray-400">Course:</span> <span className="text-white">{formData.currentCourse}</span></div>
                                                        <div><span className="text-gray-400">Department:</span> <span className="text-white">{formData.department}</span></div>
                                                        <div><span className="text-gray-400">College:</span> <span className="text-white">{formData.collegeName}</span></div>
                                                        <div><span className="text-gray-400">University:</span> <span className="text-white">{formData.university}</span></div>
                                                        <div><span className="text-gray-400">Expected Subs:</span> <span className="text-white">{formData.yearOfPassing}</span></div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Academics Review */}
                                            <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554]">
                                                <h4 className="text-lg font-semibold text-[#64ffda] mb-4 flex items-center">
                                                    <span className="mr-2">📚</span> Academics
                                                </h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                                                    <div><span className="text-gray-400">Overall CGPA:</span> <span className="text-white font-bold">{formData.cgpa}</span></div>
                                                    <div><span className="text-gray-400">Backlogs:</span> <span className="text-white">{formData.backlogs || "None"}</span></div>
                                                </div>
                                                <div className="grid grid-cols-4 gap-2 text-xs">
                                                    {Object.entries(formData.semesterGPAs).map(([sem, gpa]) => (
                                                        <div key={sem} className="bg-[#112240] p-2 rounded border border-[#233554]">
                                                            <span className="text-gray-400 block uppercase">{sem}</span>
                                                            <span className="text-white">{gpa || "N/A"}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Experience & Research Review */}
                                            <div className="bg-[#0a192f] p-6 rounded-xl border border-[#233554]">
                                                <h4 className="text-lg font-semibold text-[#64ffda] mb-4 flex items-center">
                                                    <span className="mr-2">💼</span> Experience & Research
                                                </h4>
                                                <div className="space-y-4 text-sm">
                                                    {formData.internshipDetails && (
                                                        <div>
                                                            <span className="text-gray-400 block mb-1">Internships</span>
                                                            <p className="text-white bg-[#112240] p-3 rounded-lg">{formData.internshipDetails}</p>
                                                        </div>
                                                    )}
                                                    {formData.projects && (
                                                        <div>
                                                            <span className="text-gray-400 block mb-1">Projects</span>
                                                            <p className="text-white bg-[#112240] p-3 rounded-lg">{formData.projects}</p>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <span className="text-gray-400 block mb-2">Research Interests</span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {formData.researchInterests.map(interest => (
                                                                <span key={interest} className="px-2 py-1 bg-[#64ffda]/20 text-[#64ffda] rounded text-xs">
                                                                    {interest}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-8">
                                            <button type="button" onClick={() => handleTabChange("research")}
                                                className="px-6 py-3 bg-transparent border border-[#64ffda] text-[#64ffda] font-bold rounded-lg hover:bg-[#64ffda]/10 transition-colors flex items-center space-x-2">
                                                <ChevronLeft className="w-4 h-4" />
                                                <span>Edit Details</span>
                                            </button>
                                            <button type="submit"
                                                className="px-8 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-lg hover:bg-[#52dcb8] transition-colors transform hover:-translate-y-1 shadow-lg shadow-[#64ffda]/20 flex items-center space-x-2">
                                                <span>Submit Application</span>
                                                <Check className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.section>
                                )}



                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div >
    );
}