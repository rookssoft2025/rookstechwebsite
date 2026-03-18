import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
    Factory,
    ArrowRight,
    Play,
    Package,
    Truck,
    Users,
    BarChart3,
    FileText,
    Wrench,
    ClipboardCheck,
    TrendingUp,
    Shield,
    Award,
    CheckCircle2,
    Sparkles,
    Layers,
    DollarSign,
    Calendar,
    ShoppingCart,
    Box,
    Hammer,
    Mail,
    Phone,
    MapPin,
    ChevronRight,
    Activity,
    Boxes,
    Clock,
    Wallet,
    SendHorizontal,
} from "lucide-react";

const FmsLanding = () => {
    const { scrollYProgress } = useScroll();
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    };

    const fadeInScale = {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    };

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    const modules = [
        { icon: <Package className="w-7 h-7" />, title: "Raw Material Inward", desc: "Track every raw material entering the factory — quantity, supplier, quality checks, and stock levels in real time.", accent: "#F59E0B" },
        { icon: <Boxes className="w-7 h-7" />, title: "Stock Management", desc: "Monitor inventory across all stages — raw, WIP, and finished goods — with low-stock alerts and movement history.", accent: "#10B981" },
        { icon: <ShoppingCart className="w-7 h-7" />, title: "Order Handling", desc: "Manage customer orders end-to-end from receipt to delivery, with status tracking and priority queues.", accent: "#3B82F6" },
        { icon: <Hammer className="w-7 h-7" />, title: "Manufacturing Process", desc: "Track each furniture piece through every production stage — cutting, assembly, finishing, and QC.", accent: "#8B5CF6" },
        { icon: <Truck className="w-7 h-7" />, title: "Dispatch Management", desc: "Plan and record deliveries, assign vehicles, and keep customers informed with dispatch confirmations.", accent: "#EF4444" },
        { icon: <Users className="w-7 h-7" />, title: "Employee & Attendance", desc: "Manage employee profiles, daily attendance, shift timings, and leaves with one unified module.", accent: "#EC4899" },
        { icon: <Wrench className="w-7 h-7" />, title: "Vehicle Management", desc: "Track factory vehicles, assign drivers, log trips, and monitor fuel and maintenance costs.", accent: "#F97316" },
        { icon: <Wallet className="w-7 h-7" />, title: "Profits & Expenses", desc: "Get a complete financial picture — record daily expenses, calculate profits, and generate P&L reports.", accent: "#14B8A6" },
    ];

    const steps = [
        { step: "01", label: "Raw Material In", icon: Package },
        { step: "02", label: "Stock Allocation", icon: Boxes },
        { step: "03", label: "Manufacturing", icon: Hammer },
        { step: "04", label: "Quality Check", icon: ClipboardCheck },
        { step: "05", label: "Dispatch", icon: Truck },
        { step: "06", label: "Reports", icon: BarChart3 },
    ];

    const reports = [
        "Daily Production Summary",
        "Raw Material Consumption",
        "Order Fulfilment Status",
        "Employee Attendance Report",
        "Vehicle Trip Log",
        "Monthly Profit & Loss",
        "Stock Audit Report",
        "Dispatch & Delivery Report",
        "PDF Export & Sharing",
    ];

    return (
        <div className="min-h-screen bg-[#0A0F1C] text-white overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
                .heading-font { font-family: 'Syne', sans-serif; }
                .amber-glow { text-shadow: 0 0 40px rgba(245,158,11,0.4); }
                .card-hover:hover .card-accent-line { width: 100%; }
                .stat-card { background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%); }
            `}</style>

            {/* ─── ANIMATED BG ─── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,_rgba(245,158,11,0.08),_transparent)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,_rgba(59,130,246,0.06),_transparent)]" />
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "80px 80px"
                }} />
                <motion.div
                    animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-32 left-16 w-72 h-72 bg-amber-500/8 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
                    transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/6 rounded-full blur-3xl"
                />
            </div>

            {/* ─── NAVBAR ─── */}
            <nav className="relative z-50 flex items-center justify-between px-6 lg:px-16 py-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
                        <Factory className="w-5 h-5 text-black" />
                    </div>
                    <span className="heading-font text-xl font-bold tracking-tight">FMS</span>
                    <span className="text-white/30 text-sm ml-1">Factory Management System</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
                    {["Features", "Process", "Reports", "Contact"].map(nav => (
                        <a key={nav} href={`#${nav.toLowerCase()}`} className="hover:text-amber-400 transition-colors">{nav}</a>
                    ))}
                </div>
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-5 py-2.5 bg-amber-500 text-black rounded-lg text-sm font-700 font-semibold hidden md:block"
                >
                    Request Demo
                </motion.button>
            </nav>

            {/* ─── HERO ─── */}
            <section ref={heroRef} className="relative z-10 pt-24 pb-20 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate={isHeroInView ? "visible" : "hidden"}
                        className="max-w-4xl"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-400 text-sm font-medium">100% In-House Built · End-to-End Factory Control</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="heading-font text-6xl lg:text-8xl font-bold leading-[0.95] mb-8 tracking-tight">
                            <span className="text-white">Manage Every</span>
                            <br />
                            <span className="text-amber-400 amber-glow">Factory Floor</span>
                            <br />
                            <span className="text-white/70">Operation.</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-white/50 text-xl max-w-2xl mb-10 leading-relaxed">
                            From raw material inward to final dispatch — FMS gives furniture manufacturers a single platform to track workforce, production, orders, vehicles, and financials in real time.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(245,158,11,0.35)" }}
                                whileTap={{ scale: 0.96 }}
                                className="group px-8 py-4 bg-amber-500 text-black rounded-xl font-bold text-base flex items-center gap-2"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="group px-8 py-4 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl font-medium flex items-center gap-2 transition-all"
                            >
                                <Play className="w-4 h-4 text-amber-400" />
                                Watch Demo
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Stat strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
                    >
                        {[
                            { value: "8+", label: "Core Modules" },
                            { value: "Real-Time", label: "Data Sync" },
                            { value: "Multi-Role", label: "Access Control" },
                            { value: "PDF", label: "Report Exports" },
                        ].map((stat, i) => (
                            <div key={i} className="stat-card px-8 py-7 text-center">
                                <div className="heading-font text-3xl font-bold text-amber-400 mb-1">{stat.value}</div>
                                <div className="text-white/40 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section id="features" className="relative z-10 py-32 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Modules</span>
                        <h2 className="heading-font text-5xl lg:text-6xl font-bold mt-3 mb-4">Everything Under One Roof</h2>
                        <p className="text-white/40 text-lg max-w-2xl">Built specifically for furniture manufacturers — every module mirrors your real factory workflow.</p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
                    >
                        {modules.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -6 }}
                                className="card-hover group relative p-7 bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden transition-all hover:border-white/15 cursor-default"
                                style={{ borderColor: "rgba(255,255,255,0.06)" }}
                            >
                                {/* accent glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `radial-gradient(circle at top left, ${item.accent}12, transparent 60%)` }} />

                                <div className="mb-5 w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ background: `${item.accent}18`, color: item.accent }}>
                                    {item.icon}
                                </div>

                                <h3 className="font-bold text-base mb-2 text-white">{item.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>

                                {/* bottom accent line */}
                                <div className="card-accent-line absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500"
                                    style={{ background: `linear-gradient(to right, ${item.accent}, transparent)` }} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── ABOUT / WHY ─── */}
            <section className="relative z-10 py-32 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        variants={slideInLeft}
                        initial="hidden"
                        whileInView="visible"
                    >
                        <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Why FMS</span>
                        <h2 className="heading-font text-5xl font-bold mt-3 mb-6 leading-tight">
                            Built for the Furniture Manufacturing Floor
                        </h2>
                        <p className="text-white/50 text-lg mb-10 leading-relaxed">
                            FMS is not a generic ERP — it mirrors the exact workflow of a furniture factory, from the moment raw wood arrives to the day the finished sofa leaves the gate.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Real-time production stage tracking per order",
                                "Unified workforce & attendance module",
                                "Integrated vehicle & logistics management",
                                "Live profit & expense dashboard",
                                "Role-based access for owners, managers & workers",
                                "Instant PDF reports & digital records",
                            ].map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                                    </div>
                                    <span className="text-white/70 text-sm">{f}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        variants={slideInRight}
                        initial="hidden"
                        whileInView="visible"
                        className="grid grid-cols-2 gap-5"
                    >
                        {[
                            { icon: Activity, label: "Live Production Tracking", color: "text-amber-400", bg: "bg-amber-500/10" },
                            { icon: DollarSign, label: "Financial Visibility", color: "text-green-400", bg: "bg-green-500/10" },
                            { icon: Calendar, label: "Attendance Module", color: "text-blue-400", bg: "bg-blue-500/10" },
                            { icon: Truck, label: "Vehicle & Dispatch", color: "text-purple-400", bg: "bg-purple-500/10" },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.04 }}
                                    className={`p-8 ${item.bg} border border-white/8 rounded-2xl text-center`}
                                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                                >
                                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.bg} mb-4`}>
                                        <Icon className={`w-6 h-6 ${item.color}`} />
                                    </div>
                                    <p className="text-sm font-semibold text-white/80">{item.label}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ─── PROCESS ─── */}
            <section id="process" className="relative z-10 py-32 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Workflow</span>
                        <h2 className="heading-font text-5xl font-bold mt-3 mb-4">End-to-End Factory Flow</h2>
                        <p className="text-white/40 text-lg">One system tracking every step of your manufacturing journey.</p>
                    </motion.div>

                    <div className="relative">
                        {/* connector line */}
                        <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent hidden lg:block" />

                        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {steps.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -8 }}
                                        className="group text-center"
                                    >
                                        <div className="relative inline-block mb-5">
                                            <div className="w-24 h-24 mx-auto rounded-2xl bg-white/[0.04] border border-white/8 flex items-center justify-center group-hover:border-amber-500/40 group-hover:bg-amber-500/8 transition-all duration-300"
                                                style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                                                <Icon className="w-7 h-7 text-white/40 group-hover:text-amber-400 transition-colors" />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                                <span className="text-black text-[10px] font-bold">{item.step}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">{item.label}</h3>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── REPORTS ─── */}
            <section id="reports" className="relative z-10 py-32 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Analytics</span>
                            <h2 className="heading-font text-5xl font-bold mt-3 mb-6">Insights That Drive Better Decisions</h2>
                            <p className="text-white/40 text-lg mb-8">Every report you need — available instantly, exportable as PDF, and designed for factory management.</p>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="px-7 py-3.5 bg-amber-500 text-black rounded-xl font-semibold text-sm flex items-center gap-2"
                            >
                                View Sample Reports <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </motion.div>

                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="visible"
                            className="grid grid-cols-1 gap-3"
                        >
                            {reports.map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    whileHover={{ x: 6 }}
                                    className="group flex items-center gap-4 px-6 py-4 bg-white/[0.03] border border-white/6 rounded-xl hover:border-amber-500/30 hover:bg-amber-500/5 transition-all cursor-default"
                                    style={{ borderColor: "rgba(255,255,255,0.05)" }}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">{item}</span>
                                    <ChevronRight className="w-4 h-4 text-white/20 ml-auto group-hover:text-amber-400 transition-colors" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── CTA BANNER ─── */}
            <section className="relative z-10 py-20 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        className="relative overflow-hidden rounded-3xl px-12 py-16 text-center"
                        style={{
                            background: "linear-gradient(135deg, #1a1000 0%, #1f1400 40%, #0f1a2e 100%)",
                            border: "1px solid rgba(245,158,11,0.15)"
                        }}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.12),transparent_60%)]" />
                        <motion.div
                            animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
                            transition={{ duration: 18, repeat: Infinity }}
                            className="absolute -top-10 -right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl"
                        />
                        <div className="relative z-10">
                            <h2 className="heading-font text-5xl font-bold mb-4">Take Full Control of Your Factory</h2>
                            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">Replace spreadsheets and guesswork with a system built for how furniture factories actually work.</p>
                            <div className="flex justify-center gap-4 flex-wrap">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,158,11,0.4)" }}
                                    whileTap={{ scale: 0.96 }}
                                    className="px-10 py-4 bg-amber-500 text-black rounded-xl font-bold text-base"
                                >
                                    Get a Quote
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="px-10 py-4 border border-white/20 rounded-xl font-semibold text-base hover:border-amber-500/50 hover:bg-amber-500/8 transition-all"
                                >
                                    Book a Demo
                                </motion.button>
                            </div>
                            <div className="mt-10 flex justify-center gap-8 text-white/40 text-sm">
                                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-amber-400/60" /> Enterprise-Grade Security</span>
                                <span className="flex items-center gap-2"><Award className="w-4 h-4 text-amber-400/60" /> Dedicated Onboarding Support</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── CONTACT ─── */}
            <section id="contact" className="relative z-10 py-32 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Contact</span>
                        <h2 className="heading-font text-5xl font-bold mt-3 mb-4">Let's Get You Started</h2>
                        <p className="text-white/40 text-lg">Reach out for a live demo, pricing, or any questions about FMS.</p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Info */}
                        <motion.div
                            variants={slideInLeft}
                            initial="hidden"
                            whileInView="visible"
                            className="space-y-6"
                        >
                            <div className="p-8 bg-white/[0.03] border border-white/6 rounded-2xl space-y-7"
                                style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                                <div>
                                    <p className="text-white/40 text-sm mb-5 uppercase tracking-widest font-semibold">Get in Touch</p>
                                    <div className="space-y-5">
                                        {[
                                            { icon: <Phone className="w-5 h-5" />, label: "Call Us", value: "+91 98765 43210", sub: "Mon–Sat, 9 AM – 6 PM IST" },
                                            { icon: <Mail className="w-5 h-5" />, label: "Email Us", value: "support@fms-platform.in", sub: "We respond within 24 hours" },
                                            { icon: <MapPin className="w-5 h-5" />, label: "Our Office", value: "Coimbatore, Tamil Nadu", sub: "On-site visits available on request" },
                                        ].map((c, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                                                    {c.icon}
                                                </div>
                                                <div>
                                                    <p className="text-white/40 text-xs mb-0.5">{c.label}</p>
                                                    <p className="text-white font-semibold text-sm">{c.value}</p>
                                                    <p className="text-white/30 text-xs">{c.sub}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-6">
                                    <p className="text-white/40 text-xs mb-3 uppercase tracking-widest font-semibold">Demo Available For</p>
                                    <div className="flex flex-wrap gap-2">
                                        {["Furniture Factories", "Wood Works", "Interior Firms", "Manufacturing Units"].map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            variants={slideInRight}
                            initial="hidden"
                            whileInView="visible"
                        >
                            <div className="p-8 bg-white/[0.03] border border-white/6 rounded-2xl"
                                style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                                <p className="text-white font-semibold mb-6">Send Us a Message</p>
                                <div className="space-y-4">
                                    {[
                                        { label: "Full Name", type: "text", placeholder: "Your name" },
                                        { label: "Phone Number", type: "tel", placeholder: "+91 00000 00000" },
                                        { label: "Email Address", type: "email", placeholder: "you@company.com" },
                                        { label: "Company / Factory Name", type: "text", placeholder: "Your company name" },
                                    ].map((field, i) => (
                                        <div key={i}>
                                            <label className="text-white/40 text-xs block mb-1.5">{field.label}</label>
                                            <input
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-amber-500/40 focus:bg-amber-500/5 transition-all"
                                                style={{ borderColor: "rgba(255,255,255,0.07)" }}
                                            />
                                        </div>
                                    ))}
                                    <div>
                                        <label className="text-white/40 text-xs block mb-1.5">Message (optional)</label>
                                        <textarea
                                            rows={3}
                                            placeholder="Tell us about your factory size, current challenges..."
                                            className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-amber-500/40 focus:bg-amber-500/5 transition-all resize-none"
                                            style={{ borderColor: "rgba(255,255,255,0.07)" }}
                                        />
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(245,158,11,0.3)" }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full py-4 bg-amber-500 text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                                    >
                                        <SendHorizontal className="w-4 h-4" />
                                        Send Message & Request Demo
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="relative z-10 border-t border-white/5 py-10 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white/30 text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                            <Factory className="w-4 h-4 text-black" />
                        </div>
                        <span className="heading-font font-bold text-white">FMS</span>
                        <span className="text-white/20">— Factory Management System</span>
                    </div>
                    <div>© 2025 FMS Platform. All rights reserved.</div>
                    <div className="flex gap-6">
                        {["Privacy", "Terms", "Support"].map(link => (
                            <a key={link} href="#" className="hover:text-amber-400 transition-colors">{link}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FmsLanding;