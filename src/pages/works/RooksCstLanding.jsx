import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import cstImg from "../../assets/work/cst.png";
import {
    Cpu,
    ArrowRight,
    Play,
    Layout,
    Smartphone,
    Users,
    BarChart3,
    FileText,
    Wrench,
    ClipboardCheck,
    TrendingUp,
    Shield,
    Clock,
    Award,
    CheckCircle2,
    Sparkles,
    Zap,
    Globe,
    Layers,
    Menu,
    X,
    Phone
} from "lucide-react";

import phoneImage from "../../assets/work/red_antique_telephone_1773891893640.png";

const RooksCstLanding = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 0.8, 0.8, 0.4]);

    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const fadeInScale = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const stagger = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const floatAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const docName = `Rookscst_${formData.name.replace(/\s+/g, '_')}`;
            await setDoc(doc(db, "Client Enquiry", docName), {
                ...formData,
                source: "Rooks CST Landing",
                "application": "Rooks CST Mobile App",
                timestamp: serverTimestamp()
            });
            setSubmitSuccess(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitSuccess(false);
                setFormData({ name: "", email: "", phone: "", message: "" });
            }, 3000);
        } catch (error) {
            console.error("Error saving Enquiry: ", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#071324] text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0B347030,_transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#1e4a8a20,_transparent_50%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0B3470] to-transparent" />

                {/* Floating Orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-20 left-20 w-64 h-64 bg-[#0B3470]/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute bottom-20 right-20 w-96 h-96 bg-[#0B3470]/10 rounded-full blur-3xl"
                />
            </div>

            {/* ================= HERO ================= */}
            <section ref={heroRef} className="relative pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">

                    {/* LEFT */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate={isHeroInView ? "visible" : "hidden"}
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-[#0B3470]/20 rounded-full border border-[#0B3470]/30"
                        >
                            <Cpu className="w-4 h-4 text-[#4ec9ff]" />
                            <span className="text-[#4ec9ff] text-sm">100% In-House Developed Platform</span>
                            <Sparkles className="w-3 h-3 text-[#4ec9ff] ml-2" />
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                            Digitize & Control Your{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ec9ff] via-[#0B3470] to-[#1e4a8a]">
                                Construction Projects
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-gray-400 mb-8 max-w-xl text-lg">
                            Rooks CST is a powerful construction site tracker designed to manage workforce,
                            expenses, project progress, and financial reporting — all in real time.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(11, 52, 112, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-gradient-to-r from-[#0B3470] to-[#1a4a8a] rounded-xl flex items-center gap-2 font-semibold relative overflow-hidden"
                            >
                                <span className="relative z-10">Contact Us</span>
                                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#1a4a8a] to-[#0B3470]"
                                    initial={{ x: "100%" }}
                                    whileHover={{ x: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>

                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-white/5 backdrop-blur-sm rounded-xl flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all"
                            >
                                <Play className="w-4 h-4 group-hover:text-[#4ec9ff] transition-colors" />
                                <span>Book a Demo</span>
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        {/* <motion.div
                            variants={fadeInUp}
                            className="mt-12 flex gap-8"
                        >
                            {[
                                { value: "500+", label: "Projects" },
                                { value: "98%", label: "Satisfaction" },
                                { value: "24/7", label: "Support" }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-sm text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div> */}
                    </motion.div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        variants={fadeInScale}
                        initial="hidden"
                        animate={isHeroInView ? "visible" : "hidden"}
                        className="relative"
                    >
                        <motion.div
                            animate={floatAnimation}
                            className="relative z-10"
                        >
                            <img src={cstImg} className="max-w-full h-auto rounded-2xl shadow-2xl shadow-[#0B3470]/20" alt="CST Dashboard" />
                        </motion.div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0B3470]/30 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1a4a8a]/20 rounded-full blur-2xl" />
                    </motion.div>
                </div>
            </section>

            {/* ================= FEATURES ================= */}
            <section className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Features</span>
                        <h2 className="text-5xl font-bold mb-4 mt-2">
                            Complete Construction Management
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Everything you need to manage construction sites efficiently in one powerful platform
                        </p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "Workforce Management",
                                desc: "Manage supervisors, contractors, and workers with role-based dashboards.",
                                color: "from-[#0B3470] to-[#1e4a8a]"
                            },
                            {
                                icon: <BarChart3 className="w-8 h-8" />,
                                title: "Expense Tracking",
                                desc: "Track all site, manager, and contractor expenses in real time.",
                                color: "from-[#0B3470] to-[#1a3a6a]"
                            },
                            {
                                icon: <ClipboardCheck className="w-8 h-8" />,
                                title: "Project Monitoring",
                                desc: "Track project stages, milestones, and progress updates.",
                                color: "from-[#0B3470] to-[#2a5a9a]"
                            },
                            {
                                icon: <FileText className="w-8 h-8" />,
                                title: "Reports & Analytics",
                                desc: "Generate financial reports and site summaries instantly.",
                                color: "from-[#0B3470] to-[#1e4a8a]"
                            },
                            {
                                icon: <Wrench className="w-8 h-8" />,
                                title: "Tools & Materials",
                                desc: "Manage inventory and track tool movements across sites.",
                                color: "from-[#0B3470] to-[#1a3a6a]"
                            },
                            {
                                icon: <Layout className="w-8 h-8" />,
                                title: "Approval System",
                                desc: "Approve materials, workforce, and budget requests easily.",
                                color: "from-[#0B3470] to-[#1b4b8b]"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-[#0B3470]/50 transition-all backdrop-blur-sm"
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                                <div className={`mb-4 p-3 bg-gradient-to-br ${item.color} rounded-xl w-fit text-white shadow-lg shadow-[#0B3470]/20`}>
                                    {item.icon}
                                </div>

                                <h3 className="font-bold text-xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#4ec9ff] group-hover:to-white transition-all">
                                    {item.title}
                                </h3>

                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                    {item.desc}
                                </p>

                                {/* Animated line */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#0B3470] to-[#4ec9ff]"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ================= ABOUT ================= */}
            <section className="py-32 px-4 relative">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
                        <h2 className="text-5xl font-bold mb-6 mt-2 leading-tight">
                            Built for Real{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                Construction Workflows
                            </span>
                        </h2>

                        <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                            Rooks CST is designed specifically for construction companies to manage multiple sites,
                            teams, and financial operations from a single platform.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                "Multi-site management with real-time sync",
                                "Role-based dashboards for every team member",
                                "Real-time cloud sync across all devices",
                                "Accurate expense tracking with receipt capture",
                                "Automated reporting and PDF exports"
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                                        <CheckCircle2 className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-gray-300">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all font-semibold flex items-center gap-2 group"
                        >
                            Learn More About Us
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {[
                            { icon: Layout, label: "Site Management", color: "from-blue-500 to-cyan-500" },
                            { icon: Smartphone, label: "Mobile Access", color: "from-purple-500 to-pink-500" },
                            { icon: Cpu, label: "Cloud Platform", color: "from-orange-500 to-red-500" },
                            { icon: ClipboardCheck, label: "Quality Control", color: "from-green-500 to-emerald-500" }
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    className={`p-8 bg-gradient-to-br ${item.color} bg-opacity-10 rounded-2xl border border-white/10 backdrop-blur-sm text-center group cursor-pointer`}
                                >
                                    <div className={`p-4 bg-gradient-to-br ${item.color} rounded-xl inline-block mb-3`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <p className="font-semibold text-white">{item.label}</p>
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-2xl transition-colors" />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                </div>
            </section>

            {/* ================= PROCESS ================= */}
            <section className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Process</span>
                        <h2 className="text-5xl font-bold mb-12 mt-2">
                            How It Works in{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                5 Simple Steps
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-5 gap-4 relative">
                        {/* Connecting line */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 hidden md:block" />

                        {[
                            { step: "01", label: "Register Sites", icon: Layout },
                            { step: "02", label: "Manage Workforce", icon: Users },
                            { step: "03", label: "Track Activities", icon: BarChart3 },
                            { step: "04", label: "Approve Requests", icon: ClipboardCheck },
                            { step: "05", label: "Generate Reports", icon: FileText }
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    className="relative group"
                                >
                                    <div className="p-8 bg-gradient-to-b from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-sm">
                                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                                            {item.step}
                                        </div>
                                        <div className="p-3 bg-white/5 rounded-xl w-fit mx-auto mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 transition-all">
                                            <Icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="font-bold text-lg">{item.label}</h3>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= REPORTS ================= */}
            <section className="py-32 px-4 relative">
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Analytics</span>
                        <h2 className="text-5xl font-bold mb-4 mt-2">
                            Powerful Insights & Reports
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                            Make smarter decisions with real-time construction data and comprehensive analytics
                        </p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            "Weekly Financial Reports",
                            "Site Expense Reports",
                            "Project Status Tracking",
                            "Contractor Performance",
                            "Material Usage Reports",
                            "PDF Export & Sharing"
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                className="p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all backdrop-blur-sm group cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                        <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="font-semibold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                                        {item}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-32 px-4 relative">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative overflow-hidden bg-gradient-to-br from-[#0B3470] via-[#1a4a8a] to-[#0B3470] p-16 rounded-3xl text-center shadow-2xl shadow-[#0B3470]/30"
                    >
                        {/* Animated background */}
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_white_0%,_transparent_50%)] opacity-10" />
                            <motion.div
                                animate={{
                                    x: [0, 100, 0],
                                    y: [0, -100, 0],
                                }}
                                transition={{ duration: 15, repeat: Infinity }}
                                className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
                            />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-5xl font-bold mb-4">
                                Take Full Control of Your Projects
                            </h2>
                            <p className="mb-8 text-xl text-white/90">
                                Replace manual tracking with a smart construction management system.
                            </p>

                            <div className="flex justify-center gap-4 flex-wrap">
                                <motion.button
                                    onClick={() => setIsModalOpen(true)}
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group px-10 py-4 bg-white text-[#0B3470] rounded-xl font-bold text-lg relative overflow-hidden"
                                >
                                    <span className="relative z-10">Contact Us</span>
                                    <motion.div
                                        className="absolute inset-0 bg-gray-100"
                                        initial={{ x: "100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>

                                {/* <motion.button
                                    onClick={() => setIsModalOpen(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group px-10 py-4 border-2 border-white rounded-xl font-bold text-lg hover:bg-white hover:text-[#0B3470] transition-all"
                                >
                                    Book Demo
                                </motion.button> */}
                            </div>

                            {/* Trust badges */}
                            <div className="mt-8 flex justify-center gap-6 text-white/80 text-sm">
                                <span className="flex items-center gap-2">
                                    <Shield className="w-4 h-4" /> Enterprise Security
                                </span>
                                <span className="flex items-center gap-2 text-white">
                                    <Award className="w-4 h-4 text-white" /> Trusted by 500+ Companies
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 py-12 px-4 relative">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-gray-400 text-sm relative z-10">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-blue-400" />
                        <span className="font-bold text-white">Rooks CST</span>
                    </div>
                    <div>© 2024 Rooks CST. All rights reserved.</div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Terms</a>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="hover:text-blue-400 transition-colors"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </footer>

            {/* ================= MODAL ================= */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row min-h-[500px]"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Left Side: Image/Branding */}
                            <div className="md:w-1/2 bg-gray-50 flex flex-col items-center justify-center p-12 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50/30 pointer-events-none" />
                                <motion.img
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    src={phoneImage}
                                    alt="Support"
                                    className="w-full h-auto max-w-[280px] relative z-10 object-contain mix-blend-multiply opacity-80"
                                />
                                <div className="mt-8 text-center relative z-10">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-[#0B3470] animate-pulse" />
                                        <span className="text-[#0B3470] font-bold uppercase tracking-widest text-xs">Customer Service</span>
                                    </div>
                                    <p className="text-gray-400 text-sm max-w-[200px]">Our expert team is here to help you revolutionize your site management.</p>
                                </div>
                                {/* Decorative circle */}
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
                            </div>

                            {/* Right Side: Form */}
                            <div className="md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {submitSuccess ? (
                                        <div className="text-center space-y-4">
                                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                                                <CheckCircle2 className="w-10 h-10" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-[#0B3470]">Thank You!</h3>
                                            <p className="text-gray-500 text-lg">Your enquiry has been received. We'll get back to you soon.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <h3 className="text-4xl font-bold text-[#0B3470] mb-2">Need support?</h3>
                                            <p className="text-gray-500 mb-8">Contact us if you need further assistance.</p>

                                            <form className="space-y-4" onSubmit={handleFormSubmit}>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name and surname</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-4 py-3 bg-blue-50/50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-800"
                                                        placeholder="Enter your name"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                        <input
                                                            required
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            className="w-full px-4 py-3 bg-blue-50/50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-800"
                                                            placeholder="mail@example.com"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
                                                        <input
                                                            required
                                                            type="tel"
                                                            value={formData.phone}
                                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            className="w-full px-4 py-3 bg-blue-50/50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-800"
                                                            placeholder="+1 (234) 567-890"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Please enter the details of your request.</label>
                                                    <textarea
                                                        required
                                                        rows="4"
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        className="w-full px-4 py-3 bg-blue-50/50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-800 resize-none"
                                                        placeholder="How can we help you?"
                                                    />
                                                </div>

                                                <motion.button
                                                    disabled={isSubmitting}
                                                    whileHover={{ scale: 1.02, backgroundColor: "#1e4a8a" }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full py-4 bg-[#0B3470] text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-colors uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        "Submit"
                                                    )}
                                                </motion.button>
                                            </form>
                                        </>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RooksCstLanding;