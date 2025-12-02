import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FileText, Edit, Code, BookOpen, CheckCircle, Clock, AlertCircle,
    Users, TrendingUp, MessageSquare, Filter, Upload
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ReserchLayout from "../../../components/loginLayout/ReserchLayout";

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [isLoading, setIsLoading] = useState(false);


    const handleLogout = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        navigate("/login");
        setIsLoading(false);
    };

    const researchStats = [
        {
            label: "Papers Published",
            value: "1,234",
            change: "+12.3%",
            icon: FileText,
            color: "from-purple-600 to-purple-700",
        },
        {
            label: "Under Review",
            value: "89",
            change: "+5.2%",
            icon: Clock,
            color: "from-blue-600 to-blue-700",
        },
        {
            label: "Acceptance Rate",
            value: "68.5%",
            change: "+3.1%",
            icon: TrendingUp,
            color: "from-green-600 to-green-700",
        },
        {
            label: "Active Researchers",
            value: "456",
            change: "+8.7%",
            icon: Users,
            color: "from-orange-600 to-orange-700",
        },
    ];

    const recentSubmissions = [
        {
            title: "Machine Learning in Healthcare",
            author: "Dr. Sarah Chen",
            status: "under_review",
            date: "2 hours ago",
            reviewers: 3,
            progress: 65,
        },
        {
            title: "Quantum Computing Advances",
            author: "Prof. Michael Rodriguez",
            status: "revisions",
            date: "1 day ago",
            reviewers: 2,
            progress: 40,
        },
        {
            title: "Climate Change Modeling",
            author: "Dr. Emily Watson",
            status: "accepted",
            date: "2 days ago",
            reviewers: 4,
            progress: 100,
        },
        {
            title: "Blockchain Security Protocols",
            author: "Dr. James Kim",
            status: "rejected",
            date: "3 days ago",
            reviewers: 3,
            progress: 0,
        },
    ];

    const upcomingDeadlines = [
        { conference: "International AI Conference", deadline: "2024-03-15", papers: 23 },
        { conference: "Journal of Computer Science", deadline: "2024-03-20", papers: 15 },
        { conference: "Neural Networks Symposium", deadline: "2024-03-25", papers: 18 },
        { conference: "Data Mining Workshop", deadline: "2024-04-01", papers: 12 },
    ];

    const reviewRequests = [
        { paper: "Deep Learning Applications", authors: "Chen & Li", expertise: "AI/ML", daysLeft: 2 },
        { paper: "Cybersecurity Framework", authors: "Patel et al.", expertise: "Security", daysLeft: 5 },
        { paper: "Bioinformatics Tool", authors: "Garcia & Smith", expertise: "BioTech", daysLeft: 7 },
    ];

    const getStatusColor = (s) =>
        ({
            accepted: "bg-green-500/20 text-green-400 border-green-500/30",
            under_review: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            revisions: "bg-orange-500/20 text-orange-400 border-orange-500/30",
            rejected: "bg-red-500/20 text-red-400 border-red-500/30",
        }[s] || "bg-gray-500/20 text-gray-400 border-gray-500/30");

    const getStatusIcon = (s) =>
        ({
            accepted: <CheckCircle size={16} className="text-green-400" />,
            under_review: <Clock size={16} className="text-blue-400" />,
            revisions: <Edit size={16} className="text-orange-400" />,
            rejected: <AlertCircle size={16} className="text-red-400" />,
        }[s] || <FileText size={16} />);

    const renderOverview = () => (
        <>
            {/* Welcome */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-white mb-2">Research Dashboard 🎓</h1>
                <p className="text-white/60">
                    Track your publications, reviews, and research progress in one place.
                </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {researchStats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-black/40 p-6 border border-white/10 rounded-2xl relative"
                    >
                        <div className={`absolute -inset-1 bg-gradient-to-r ${stat.color} blur-sm opacity-20 rounded-2xl`} />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                                    <stat.icon size={20} className="text-white" />
                                </div>
                                <span className="text-green-400 text-sm">{stat.change}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                            <p className="text-white/60 text-sm">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Section */}
                <div className="xl:col-span-2 space-y-8">
                    {/* Recent Submissions */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-black/40 p-6 border border-white/10 rounded-2xl"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl text-white font-semibold">Recent Submissions</h2>
                            <Filter className="text-white/70" size={20} />
                        </div>

                        <div className="space-y-4">
                            {recentSubmissions.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="p-4 bg-white/5 border border-white/5 rounded-xl"
                                >
                                    <div className="flex justify-between mb-2">
                                        <h3 className="text-white">{item.title}</h3>
                                        <div
                                            className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full border ${getStatusColor(
                                                item.status
                                            )}`}
                                        >
                                            {getStatusIcon(item.status)}
                                            <span>{item.status.replace("_", " ")}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-white/60 text-sm">
                                        <span>
                                            By {item.author} • {item.date}
                                        </span>

                                        <div className="flex items-center space-x-2">
                                            <span>{item.reviewers} reviewers</span>
                                            <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                                                    style={{ width: `${item.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs">{item.progress}%</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Tools */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-black/40 p-6 border border-white/10 rounded-2xl"
                    >
                        <h2 className="text-xl text-white mb-4">Research Tools</h2>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Submit Paper", icon: Upload, color: "from-purple-600 to-purple-700" },
                                { label: "Write Proposal", icon: Edit, color: "from-blue-600 to-blue-700" },
                                { label: "Code Repo", icon: Code, color: "from-green-600 to-green-700" },
                                { label: "Peer Review", icon: MessageSquare, color: "from-orange-600 to-orange-700" },
                            ].map((tool) => (
                                <motion.button
                                    key={tool.label}
                                    whileHover={{ scale: 1.05 }}
                                    className={`bg-gradient-to-r ${tool.color} p-4 text-white rounded-xl`}
                                >
                                    <tool.icon size={22} />
                                    <p className="mt-2 text-sm">{tool.label}</p>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">
                    {/* Deadlines */}
                    <div className="bg-black/40 p-6 border border-white/10 rounded-2xl">
                        <h2 className="text-xl text-white mb-4">Upcoming Deadlines</h2>

                        <div className="space-y-4">
                            {upcomingDeadlines.map((d, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="p-3 rounded-xl bg-white/5 border border-white/5"
                                >
                                    <div className="flex justify-between mb-1">
                                        <h3 className="text-white text-sm">{d.conference}</h3>
                                        <span className="text-red-400 text-xs">Due {d.deadline}</span>
                                    </div>
                                    <p className="text-white/50 text-xs">{d.papers} papers submitted</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Review Requests */}
                    <div className="bg-black/40 p-6 border border-white/10 rounded-2xl">
                        <h2 className="text-xl text-white mb-4">Review Requests</h2>

                        {reviewRequests.map((req, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 + i * 0.1 }}
                                className="p-3 rounded-xl bg-white/5 border border-white/5"
                            >
                                <div className="flex justify-between mb-1">
                                    <h3 className="text-white text-sm">{req.paper}</h3>
                                    <span
                                        className={`text-xs ${
                                            req.daysLeft <= 3 ? "text-red-400" : "text-orange-400"
                                        }`}
                                    >
                                        {req.daysLeft} days left
                                    </span>
                                </div>

                                <p className="text-white/60 text-xs mb-1">By {req.authors}</p>
                                <div className="flex justify-between">
                                    <span className="text-purple-400 text-xs">{req.expertise}</span>
                                    <button className="text-blue-400 text-xs hover:text-blue-300">
                                        Start Review
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <ReserchLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
            isLoading={isLoading}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                >
                    {renderOverview()}
                </motion.div>
            </AnimatePresence>
        </ReserchLayout>
    );
};

export default Dashboard;
