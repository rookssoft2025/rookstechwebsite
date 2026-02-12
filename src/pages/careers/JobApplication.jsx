import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { motion } from "framer-motion";
import { Check, ChevronDown, Upload } from "lucide-react";

export default function JobApplication() {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [submitted, setSubmitted] = useState(false);

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
        mark10: "",
        mark12: "",
        currentCourse: "",
        department: "",
        yearOfPassing: "",
        currentSemester: "",
        semesterGPA: "",
        cgpa: "",
        certificationCourses: "",
        partTimeCourses: "",
        internshipDetails: "",
        projects: "",
        hobbies: "",
        researchInterests: [],
    });

    const researchOptions = [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Deep Learning",
        "Computer Vision",
        "NLP (Natural Language Processing)",
        "Cyber Security",
        "Cloud Computing",
        "Bioinformatics",
        "IoT",
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate mandatory fields and logic here if needed
        console.log("Form Data Submitted:", formData);
        setSubmitted(true);
        window.scrollTo(0, 0);
    };

    const handleReset = () => {
        setFormData({
            fullName: "",
            phone: "",
            email: "",
            location: "",
            mark10: "",
            mark12: "",
            currentCourse: "",
            department: "",
            yearOfPassing: "",
            currentSemester: "",
            semesterGPA: "",
            cgpa: "",
            certificationCourses: "",
            partTimeCourses: "",
            internshipDetails: "",
            projects: "",
            hobbies: "",
            researchInterests: [],
        });
        setSubmitted(false);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#071730] text-white flex flex-col items-center justify-center p-4">
                <Navbar />
                <div className="bg-[#112240] p-8 rounded-2xl shadow-2xl text-center max-w-lg w-full mt-20 border border-[#233554]">
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
                </div>
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Sidebar - Job Responsibilities */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <div className="bg-[#112240] p-6 rounded-2xl border border-[#233554] shadow-lg sticky top-32">
                            <h3 className="text-2xl font-bold text-white mb-6 border-b border-[#233554] pb-4">Key Responsibilities</h3>
                            <ul className="space-y-4 text-sm leading-relaxed text-gray-400">
                                {[
                                    "Conduct literature review related to the research problem",
                                    "Explore research needs in related domains",
                                    "Collect, preprocess, and analyze experimental or survey data",
                                    "Maintain proper research records and datasets",
                                    "Prepare technical reports, progress updates, and project documentation",
                                    "Assist in writing research articles",
                                    "Help in drafting project proposals",
                                    "Present research outcomes in group meetings, client meetings, and seminars",
                                ].map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-3 text-[#64ffda] mt-1">▹</span>
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

                            {/* Personal Details */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-sm">01</span>
                                    Personal Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Full Name <span className="text-red-400">*</span></label>
                                        <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Phone Number <span className="text-red-400">*</span></label>
                                        <input required type="tel" pattern="[0-9]{10}" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" placeholder="9876543210" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Email Address <span className="text-red-400">*</span></label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Location <span className="text-red-400">*</span></label>
                                        <input required type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" placeholder="City, State" />
                                    </div>
                                </div>
                            </section>

                            <hr className="border-[#233554]" />

                            {/* Academic Records */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-sm">02</span>
                                    Academic Records
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">10th Mark (% / CGPA) <span className="text-red-400">*</span></label>
                                        <input required type="number" step="0.01" name="mark10" value={formData.mark10} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" placeholder="95.5" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">12th Mark (% / CGPA) <span className="text-red-400">*</span></label>
                                        <input required type="number" step="0.01" name="mark12" value={formData.mark12} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" placeholder="94.2" />
                                    </div>
                                </div>
                            </section>

                            <hr className="border-[#233554]" />

                            {/* Current Education */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-sm">03</span>
                                    Current Education
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Current Course <span className="text-red-400">*</span></label>
                                        <input required type="text" name="currentCourse" value={formData.currentCourse} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" placeholder="B.Tech" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Department <span className="text-red-400">*</span></label>
                                        <input required type="text" name="department" value={formData.department} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" placeholder="Computer Science" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Year of Passing <span className="text-red-400">*</span></label>
                                        <input required type="month" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Current Semester <span className="text-red-400">*</span></label>
                                        <select required name="currentSemester" value={formData.currentSemester} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white appearance-none">
                                            <option value="">Select Semester</option>
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => <option key={sem} value={sem}>{sem}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Semester GPA <span className="text-red-400">*</span></label>
                                        <input required type="number" step="0.01" max="10" name="semesterGPA" value={formData.semesterGPA} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" placeholder="8.5" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Overall CGPA <span className="text-red-400">*</span></label>
                                        <input required type="number" step="0.01" max="10" name="cgpa" value={formData.cgpa} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white" placeholder="8.7" />
                                    </div>
                                </div>
                            </section>

                            <hr className="border-[#233554]" />

                            {/* Additional Qualification & Experience */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-sm">04</span>
                                    Qualifications & Experience
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Certification Courses</label>
                                        <textarea name="certificationCourses" value={formData.certificationCourses} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-24 resize-none" placeholder="List any relevant certifications..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Part Time Courses</label>
                                        <textarea name="partTimeCourses" value={formData.partTimeCourses} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-24 resize-none" placeholder="List any part-time courses..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Internship Details</label>
                                        <textarea name="internshipDetails" value={formData.internshipDetails} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-24 resize-none" placeholder="Describe your internships..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-400">Projects with Description</label>
                                        <textarea name="projects" value={formData.projects} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-32 resize-none" placeholder="Describe your academic or personal projects..." />
                                    </div>
                                </div>
                            </section>

                            <hr className="border-[#233554]" />

                            {/* Research Interests */}
                            <section className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <span className="w-8 h-8 rounded-full bg-[#64ffda]/10 text-[#64ffda] flex items-center justify-center mr-3 text-sm">05</span>
                                    Research Interests <span className="ml-2 text-sm font-normal text-gray-500">(Max 3)</span>
                                </h3>
                                <div className="space-y-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {researchOptions.map((option) => (
                                            <label key={option} className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${formData.researchInterests.includes(option) ? "bg-[#64ffda]/10 border-[#64ffda]" : "bg-[#0a192f] border-[#233554] hover:border-gray-500"}`}>
                                                <input
                                                    type="checkbox"
                                                    value={option}
                                                    checked={formData.researchInterests.includes(option)}
                                                    onChange={() => handleCheckboxChange(option)}
                                                    className="mr-3 w-4 h-4 accent-[#64ffda]"
                                                />
                                                <span className="text-sm text-gray-300">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    <div className="space-y-2 mt-4">
                                        <label className="text-sm font-medium text-gray-400">Hobbies</label>
                                        <textarea name="hobbies" value={formData.hobbies} onChange={handleInputChange} className="w-full bg-[#0a192f] border border-[#233554] rounded-lg px-4 py-3 focus:outline-none focus:border-[#64ffda] transition-colors text-white h-20 resize-none" placeholder="Reading, Gaming, Travelling..." />
                                    </div>
                                </div>
                            </section>

                            {/* Form Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button type="submit" className="flex-1 bg-[#64ffda] text-[#0a192f] font-bold py-4 rounded-lg hover:bg-[#52dcb8] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#64ffda]/20">
                                    Submit Application
                                </button>
                                <button type="button" onClick={handleReset} className="flex-1 bg-transparent border border-[#64ffda] text-[#64ffda] font-bold py-4 rounded-lg hover:bg-[#64ffda]/10 transition-colors">
                                    Reset Form
                                </button>
                            </div>

                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
