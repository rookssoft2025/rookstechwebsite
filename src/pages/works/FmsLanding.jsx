import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
    Factory, ArrowRight, Play, Package, Truck, Users, BarChart3, FileText, Wrench, ClipboardCheck, TrendingUp, Shield, Award, CheckCircle2, Sparkles, Layers, DollarSign, Calendar, ShoppingCart,
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
    X,
    Building2,
    Warehouse,
    CircleGauge as Gauge,
    PieChart,
    UserCog,
    Fuel,
    Settings,
    Lock,
    Key,
    Fingerprint,
    Database,
    Cog,
    Globe,
    Zap,
    Target,
    Eye,
    LayoutDashboard,
    LineChart,
    UsersRound,
    TruckIcon,
    Store,
    Component,
    ClipboardList,
    ChartColumn,
    CircleCheck,
    Trophy,
    Rocket,
    Headphones,
    ChevronDown,
    Menu
} from "lucide-react";

// Hero image
import factoryImage from "../../assets/mobile_apps_asstes/FMS/front 1.png";
import logo from "../../assets/mobile_apps_asstes/FMS/FMS logoo-04.svg"
// Feature screen images
import imgInventory from "../../assets/mobile_apps_asstes/FMS/Stock Management.png";
import imgProduction from "../../assets/mobile_apps_asstes/FMS/Manufacturing Process.png";
import imgOrder from "../../assets/mobile_apps_asstes/FMS/Order Handling.png";
import imgVendor from "../../assets/mobile_apps_asstes/FMS/Raw Material Inward.png";
import imgEmployee from "../../assets/mobile_apps_asstes/FMS/Employee & Attendance.png";
import imgVehicle from "../../assets/mobile_apps_asstes/FMS/Vehicle Management.png";
import imgFinancial from "../../assets/mobile_apps_asstes/FMS/Profits & Expenses.png";
import imgReports from "../../assets/mobile_apps_asstes/FMS/Dispatch Management.png";
import ctaImage from "../../assets/mobile_apps_asstes/FMS/cta last.png";

const FmsLanding = () => {
    const { scrollYProgress } = useScroll();
    const heroRef = useRef(null);
    const ctaRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeCard, setActiveCard] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    // ── Dashboard carousel auto-rotate ──
    const carouselTimerRef = useRef(null);
    const startCarouselTimer = () => {
        if (carouselTimerRef.current) clearInterval(carouselTimerRef.current);
        carouselTimerRef.current = setInterval(() => {
            setActiveCard(prev => (prev + 1) % 6);
        }, 5000);
    };
    useEffect(() => {
        startCarouselTimer();
        return () => clearInterval(carouselTimerRef.current);
    }, []);
    const handleCardClick = (i) => {
        setActiveCard(i);
        startCarouselTimer();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToContact = () => {
        ctaRef.current?.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            const userAgent = navigator.userAgent;
            const isMobileDevice =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    userAgent,
                );
            const isTablet = /iPad|Android.*Tablet|Tablet/i.test(userAgent);
            setIsMobile(isMobileDevice || isTablet);
        };

        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    const handleEmailClick = () => {
        const email = "support@rookstechnologies.com";
        if (isMobile) {
            window.location.href = `mailto:${email}`;
        } else {
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                email,
            )}`;
            window.open(gmailUrl, "_blank");
        }
    };

    const handlePhoneClick = () => {
        if (isMobile) {
            window.location.href = `tel:+917598707071`;
        }
    };

    const handleLocationClick = (location) => {
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            location,
        )}`;
        window.open(mapsUrl, "_blank");
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const docName = `Fms_${formData.name.replace(/\s+/g, '_')}_${Date.now()}`;
            await setDoc(doc(db, "Client Enquiry", docName), {
                ...formData,
                application: "FMS (Factory Management System)",
                source: "FMS Landing",
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

    // ─── Animation Variants ───
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
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } }
    };

    const slideInLeft = {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    const slideInRight = {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    };

    // ─── Data ───
    const features = [
        { icon: <Package className="w-6 h-6" />, title: "Inventory Management", desc: "Track raw materials, WIP, and finished goods with real-time stock visibility and low-stock alerts.", img: imgInventory },
        { icon: <Hammer className="w-6 h-6" />, title: "Production Tracking", desc: "Monitor every production stage — from cutting to assembly — with live status updates per order.", img: imgProduction },
        { icon: <ShoppingCart className="w-6 h-6" />, title: "Order Management", desc: "Manage customer orders end-to-end with priority queues, status tracking, and delivery scheduling.", img: imgOrder },
        { icon: <Users className="w-6 h-6" />, title: "Vendor Management", desc: "Maintain supplier records, track purchase orders, and manage procurement workflows seamlessly.", img: imgVendor },
        { icon: <UserCog className="w-6 h-6" />, title: "Employee Management", desc: "Handle profiles, attendance, shift scheduling, and leaves with a unified workforce module.", img: imgEmployee },
        { icon: <Truck className="w-6 h-6" />, title: "Vehicle Management", desc: "Assign vehicles, log trips, track fuel usage, and monitor maintenance costs for your fleet.", img: imgVehicle },
        { icon: <Wallet className="w-6 h-6" />, title: "Financial Tracking", desc: "Record daily expenses, track profits, and generate P&L reports for complete financial clarity.", img: imgFinancial },
        { icon: <BarChart3 className="w-6 h-6" />, title: "Reports & Analytics", desc: "Access production, inventory, financial, and operational reports — exportable as PDF.", img: imgReports },
    ];

    const workflowSteps = [
        { label: "Material Procurement", icon: Package },
        { label: "Inventory Management", icon: Boxes },
        { label: "Production Planning", icon: ClipboardList },
        { label: "Material Cutting", icon: Scissors },
        { label: "Material Consumption", icon: Component },
        { label: "Product Manufacturing", icon: Hammer },
        { label: "Goods Dispatch", icon: Truck },
        { label: "Reports & Analytics", icon: ChartColumn },
    ];

    // Scissors icon helper
    function Scissors(props) {
        return (
            <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
            </svg>
        );
    }

    const dashboardHighlights = [
        { icon: Gauge, label: "Live Production Status", color: "text-[#BED39D]", bg: "bg-[#BED39D]/10", img: imgProduction },
        { icon: Warehouse, label: "Inventory Overview", color: "text-emerald-400", bg: "bg-emerald-500/10", img: imgInventory },
        { icon: Clock, label: "Pending Orders", color: "text-blue-400", bg: "bg-blue-500/10", img: imgOrder },
        { icon: UsersRound, label: "Employee Activity", color: "text-purple-400", bg: "bg-purple-500/10", img: imgEmployee },
        { icon: DollarSign, label: "Expense Tracking", color: "text-rose-400", bg: "bg-rose-500/10", img: imgFinancial },
        { icon: FileText, label: "Operational Reports", color: "text-cyan-400", bg: "bg-cyan-500/10", img: imgReports },
    ];


    const modules = [
        { icon: <Store className="w-7 h-7" />, title: "Vendor Management", accent: "#BED39D" },
        { icon: <Users className="w-7 h-7" />, title: "Customer Management", accent: "#10B981" },
        { icon: <Package className="w-7 h-7" />, title: "Inventory Management", accent: "#3B82F6" },
        { icon: <Hammer className="w-7 h-7" />, title: "Production Management", accent: "#8B5CF6" },
        { icon: <Target className="w-7 h-7" />, title: "Product Tracking", accent: "#EF4444" },
        { icon: <Truck className="w-7 h-7" />, title: "Vehicle Management", accent: "#EC4899" },
        { icon: <Wallet className="w-7 h-7" />, title: "Financial Management", accent: "#F97316" },
        { icon: <BarChart3 className="w-7 h-7" />, title: "Reports & Analytics", accent: "#14B8A6" },
    ];

    const benefits = [
        "Reduce Manual Work",
        "Improve Production Efficiency",
        "Real-Time Inventory Visibility",
        "Better Workforce Management",
        "Accurate Cost Tracking",
        "Faster Decision Making",
        "Enhanced Operational Control",
        "Increased Productivity",
    ];

    const securityItems = [
        { icon: <Lock className="w-5 h-5" />, label: "Secure Login" },
        { icon: <Key className="w-5 h-5" />, label: "User Authentication" },
        { icon: <Fingerprint className="w-5 h-5" />, label: "Role-Based Access" },
        { icon: <Shield className="w-5 h-5" />, label: "Data Protection" },
    ];

    const industries = [
        "Furniture Manufacturing",
        "Fabrication Units",
        "Production Facilities",
        "Assembly Industries",
        "Industrial Workshops",
        "Manufacturing Plants",
    ];

    const navItems = ["Features", "Workflow", "Modules", "Benefits", "Contact"];

    // ─── Render ───
    return (
        <div className="min-h-screen bg-[#080D1A] text-white overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800;900&display=swap');
                .heading-font { font-family: 'Syne', sans-serif; }
                .brand-glow { text-shadow: 0 0 60px rgba(190, 211, 157, 0.3); }
                .card-hover:hover .card-accent-line { width: 100%; }
                .stat-card { background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%); }
                .workflow-connector { background: linear-gradient(to right, rgba(190,211,157,0.2), rgba(190,211,157,0.05)); }
                .glass-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(4px); border: 1px solid rgba(255,255,255,0.06); }
                .module-grid-item { transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
                .module-grid-item:hover { transform: translateY(-8px); border-color: rgba(190,211,157,0.3); }
                .benefit-check { background: linear-gradient(135deg, rgba(190,211,157,0.15), rgba(190,211,157,0.05)); }
                .industry-pill { transition: all 0.3s ease; }
                .industry-pill:hover { background: rgba(190,211,157,0.15); border-color: rgba(190,211,157,0.3); transform: translateY(-2px); }
                .nav-link { position: relative; }
                .nav-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: #BED39D; transition: width 0.3s ease; }
                .nav-link:hover::after { width: 100%; }
                .hero-image-container { perspective: 1200px; }
                .hero-image-inner { transform: rotateY(-4deg) rotateX(2deg); transition: transform 0.8s ease; }
                .hero-image-inner:hover { transform: rotateY(0deg) rotateX(0deg); }
                .scroll-indicator { animation: bounce 2s infinite; }
                @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(8px); } }

                /* ── Premium Feature Cards ── */
                .feature-premium-card {
                    background: linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%);
                    border: 1px solid rgba(255,255,255,0.08);
                    backdrop-filter: blur(12px);
                    min-height: 260px;
                    box-shadow: 0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
                    transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .feature-premium-card:hover {
                    border-color: rgba(255,255,255,0.16);
                    box-shadow: 0 12px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08);
                }
                .feature-icon-box {
                    transition: box-shadow 0.4s ease, transform 0.4s ease;
                }
                .feature-premium-card:hover .feature-icon-box {
                    box-shadow: 0 0 32px var(--card-color, rgba(190,211,157,0.35));
                }
            `}</style>

            {/* ─── ANIMATED BG ─── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(190,211,157,0.06),transparent)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,rgba(59,130,246,0.04),transparent)]" />
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "100px 100px"
                }} />
                <motion.div
                    animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 w-80 h-80 bg-[#BED39D]/6 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/4 rounded-full blur-3xl"
                />
            </div>

            {/* ─── HEADER ─── */}
            <header
                className={`z-50 w-full top-0 left-0 transition-all duration-300 ${isScrolled
                    ? "fixed shadow-lg shadow-black/30"
                    : "relative"
                    }`}
            >
                <nav className={`flex items-center justify-between px-6 lg:px-16 py-5 border-b border-white/5 backdrop-blur-xl transition-all duration-300 ${isScrolled ? "bg-[#080D1A]/95 py-3" : "bg-[#080D1A]/80"
                    }`}>
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden">
                            <img
                                src={logo}
                                alt="FMS Logo"
                                className="w-14 h-14 object-contain"
                            />
                        </div>

                        <span className="heading-font text-2xl font-bold tracking-tight text-white">
                            FMS
                        </span>


                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8 text-sm">
                        {navItems.map(item => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="nav-link text-white/50 hover:text-[#BED39D] transition-colors text-sm font-medium"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={() => setIsModalOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex px-6 py-2.5 bg-[#BED39D] text-black rounded-xl text-sm font-bold items-center gap-2 shadow-lg shadow-[#BED39D]/25 hover:shadow-[#BED39D]/40 transition-shadow"
                        >
                            <Mail className="w-4 h-4" />
                            Contact Us
                        </motion.button>
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-[#0D1225] border-b border-white/5 overflow-hidden"
                        >
                            <div className="flex flex-col px-6 py-6 gap-4">
                                {navItems.map(item => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-white/60 hover:text-[#BED39D] transition-colors text-sm font-medium py-2 border-b border-white/5"
                                    >
                                        {item}
                                    </a>
                                ))}
                                <motion.button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        setIsModalOpen(true);
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 bg-[#BED39D] text-black rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    Contact Us
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ─── HERO ─── */}
            <section ref={heroRef} className="relative z-10 pt-16 pb-24 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate={isHeroInView ? "visible" : "hidden"}
                        >
                            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-[#BED39D]/10 border border-[#BED39D]/20 rounded-full mb-6">
                                <Zap className="w-4 h-4 text-[#BED39D]" />
                                <span className="text-[#BED39D] text-sm font-medium">Next-Gen Factory Operations</span>
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="heading-font text-5xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
                                <span className="text-white">Smart Factory</span>
                                <br />
                                <span className="text-[#BED39D] brand-glow">Management</span>
                                <br />
                                <span className="text-white/60">for Modern Manufacturing</span>
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="text-white/40 text-lg max-w-xl mb-10 leading-relaxed">
                                Manage inventory, production, vendors, employees, orders, vehicles, and factory operations from a single centralized platform.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                                <motion.button
                                    onClick={scrollToContact}
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(190,211,157,0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group px-8 py-4 bg-[#BED39D] text-black rounded-xl font-bold text-base flex items-center gap-2 shadow-xl shadow-[#BED39D]/20"
                                >
                                    Get Started
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                                {/* <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/30 transition-all flex items-center gap-2"
                                >
                                    <Play className="w-4 h-4" />
                                    Watch Demo
                                </motion.button> */}
                            </motion.div>

                            {/* Trust indicators */}
                            <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-8 text-white/30 text-sm">
                                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#BED39D]/60" /> Enterprise Grade</span>
                                <span className="flex items-center gap-2"><Award className="w-4 h-4 text-[#BED39D]/60" /> 100% In-House</span>
                            </motion.div>
                        </motion.div>

                        {/* Hero Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                            className="hero-image-container"
                        >
                            <div className="hero-image-inner relative">
                                <div className="absolute -inset-4  blur-2xl" />
                                <div className="relative rounded-2xl overflow-hidden ">
                                    <img
                                        src={factoryImage}
                                        alt="Factory Management System Dashboard"
                                        className="w-full h-auto object-cover"
                                    />

                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="flex justify-center mt-16"
                    >
                        <div className="scroll-indicator flex flex-col items-center gap-2 text-white/20 text-xs uppercase tracking-widest">
                            <span>Scroll to explore</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── VALUE PROPOSITION ─── */}
            <section className="relative z-10 py-20 px-6 lg:px-16 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[#BED39D] text-sm font-semibold uppercase tracking-widest">Value Proposition</span>
                        <h2 className="heading-font text-4xl lg:text-5xl font-bold mt-4 mb-6">
                            Everything Your Factory Needs <br className="hidden sm:block" />
                            <span className="text-[#BED39D]">in One Platform</span>
                        </h2>
                        <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                            FMS brings together production, inventory, workforce, vendors, logistics, and financial operations into one integrated system.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── KEY FEATURES ─── */}
            <section id="features" className="relative z-10 py-24 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#BED39D] text-sm font-semibold uppercase tracking-widest">Core Capabilities</span>
                        <h2 className="heading-font text-4xl lg:text-5xl font-bold mt-3 mb-4">Key Features</h2>
                        <p className="text-white/40 text-lg max-w-2xl mx-auto">Everything you need to run a modern factory floor.</p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
                    >
                        {features.map((item, i) => {
                            const colors = [
                                "#BED39D", "#10B981", "#3B82F6", "#8B5CF6",
                                "#EC4899", "#EF4444", "#F97316", "#14B8A6"
                            ];
                            const color = colors[i % colors.length];
                            return (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    whileHover={{ y: -8, scale: 1.015 }}
                                    className="feature-premium-card group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500"
                                    style={{ "--card-color": color }}
                                >
                                    {/* Background glow on hover */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                        style={{ background: `radial-gradient(ellipse at top left, ${color}1A 0%, transparent 65%)` }}
                                    />
                                    {/* Subtle top border glow */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: `linear-gradient(to right, transparent, ${color}80, transparent)` }}
                                    />

                                    {/* Dashboard screenshot preview */}
                                    <div className="relative w-full overflow-hidden" style={{ height: "200px" }}>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Gradient fade to card body */}
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(12,16,30,0.95) 100%)" }}
                                        />
                                    </div>

                                    {/* Card body */}
                                    <div className="flex flex-col p-7 pt-5 flex-1">
                                        {/* Icon — top left */}
                                        <div
                                            className="feature-icon-box mb-5 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:scale-110"
                                            style={{ background: `${color}20`, color, boxShadow: `0 0 20px ${color}20` }}
                                        >
                                            {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                                        </div>

                                        {/* Title */}
                                        <h3 className="font-bold text-xl mb-2 text-white leading-snug">{item.title}</h3>

                                        {/* Description */}
                                        <p className="text-white/45 text-sm leading-relaxed flex-1">{item.desc}</p>
                                    </div>

                                    {/* Bottom accent line */}
                                    <div
                                        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-600"
                                        style={{ background: `linear-gradient(to right, ${color}, ${color}00)` }}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ─── FACTORY WORKFLOW ─── */}
            <section id="workflow" className="relative z-10 py-24 px-6 lg:px-16 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#BED39D] text-sm font-semibold uppercase tracking-widest">Process</span>
                        <h2 className="heading-font text-4xl lg:text-5xl font-bold mt-3 mb-4">Factory Workflow</h2>
                        <p className="text-white/40 text-lg max-w-2xl mx-auto">End-to-end visibility from procurement to dispatch.</p>
                    </motion.div>

                    <div className="relative">
                        {/* Connector line (desktop) */}
                        <div className="absolute top-14 left-0 right-0 h-px workflow-connector hidden lg:block" />

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
                            {workflowSteps.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        whileHover={{ y: -6 }}
                                        className="group text-center"
                                    >
                                        <div className="relative inline-block mb-3">
                                            <div className="w-14 h-14 lg:w-20 lg:h-20 mx-auto rounded-2xl bg-white/[0.03] border border-white/6 flex items-center justify-center group-hover:border-[#BED39D]/30 group-hover:bg-[#BED39D]/8 transition-all duration-300">
                                                <Icon className="w-5 h-5 lg:w-7 lg:h-7 text-white/30 group-hover:text-[#BED39D] transition-colors" />
                                            </div>
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#BED39D] rounded-full flex items-center justify-center text-[8px] font-bold text-black">
                                                {i + 1}
                                            </div>
                                        </div>
                                        <span className="text-[10px] lg:text-xs text-white/50 group-hover:text-white/80 transition-colors leading-tight block">
                                            {item.label}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── DASHBOARD HIGHLIGHTS ─── */}
            <section className="relative z-10 py-24 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* ── Left: feature card nav ── */}
                        <motion.div variants={slideInLeft} initial="hidden" whileInView="visible">
                            <span className="text-[#BED39D] text-sm font-semibold uppercase tracking-widest">Dashboard</span>
                            <h2 className="heading-font text-4xl lg:text-5xl font-bold mt-3 mb-6 leading-tight">
                                Real-Time <span className="text-[#BED39D]">Factory Insights</span>
                            </h2>
                            <p className="text-white/40 text-lg mb-10 leading-relaxed">
                                Get a bird's-eye view of your entire operation with live production status, inventory levels, and financial metrics.
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                {dashboardHighlights.map((item, i) => {
                                    const Icon = item.icon;
                                    const isActive = activeCard === i;
                                    return (
                                        <motion.button
                                            key={i}
                                            onClick={() => handleCardClick(i)}
                                            animate={isActive ? { scale: 1.03 } : { scale: 1 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl  text-center cursor-pointer transition-all duration-400 overflow-hidden ${isActive
                                                ? `${item.bg} border-current/30`
                                                : "bg-white/[0.02] border-white/6 hover:border-white/15 hover:bg-white/[0.04]"
                                                }`}
                                            style={isActive ? { borderColor: "currentColor", boxShadow: `0 0 24px -4px ${item.color.replace("text-", "").replace("[", "").replace("]", "")}40` } : {}}
                                        >
                                            {/* Active progress bar */}
                                            {isActive && (
                                                <motion.div
                                                    key={`bar-${i}-${activeCard}`}
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 5, ease: "linear" }}
                                                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
                                                    style={{
                                                        background: item.color.replace("text-", "") === "[#BED39D]" ? "#BED39D" : undefined,
                                                        backgroundColor: item.color === "text-[#BED39D]" ? "#BED39D" : item.color === "text-emerald-400" ? "#34d399" : item.color === "text-blue-400" ? "#60a5fa" : item.color === "text-purple-400" ? "#a78bfa" : item.color === "text-rose-400" ? "#fb7185" : "#22d3ee"
                                                    }}
                                                />
                                            )}
                                            <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${isActive ? item.bg : "bg-white/5"}`}>
                                                <Icon className={`w-5 h-5 transition-colors ${isActive ? item.color : "text-white/30"}`} />
                                            </div>
                                            <p className={`text-xs font-semibold transition-colors ${isActive ? "text-white" : "text-white/50"}`}>{item.label}</p>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* ── Right: crossfade image panel ── */}
                        <motion.div variants={slideInRight} initial="hidden" whileInView="visible" className="relative">
                            {/* Ambient glow */}
                            <div className="absolute -inset-6 bg-gradient-to-tr from-[#BED39D]/10 via-transparent to-blue-500/8 rounded-3xl blur-3xl pointer-events-none" />

                            {/* Image frame */}
                            <div
                                className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
                                style={{ transform: "perspective(1100px) rotateY(-4deg) rotateX(2deg)", transition: "transform 0.8s ease" }}
                                onMouseEnter={e => e.currentTarget.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "perspective(1100px) rotateY(-4deg) rotateX(2deg)"}
                            >
                                {/* Stack all images, only active one is visible */}
                                <div className="relative" style={{ aspectRatio: "16/10" }}>
                                    {dashboardHighlights.map((item, i) => (
                                        <img
                                            key={i}
                                            src={item.img}
                                            alt={item.label}
                                            className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700"
                                            style={{
                                                opacity: activeCard === i ? 1 : 0,
                                                transform: activeCard === i ? "scale(1)" : "scale(1.04)",
                                                zIndex: activeCard === i ? 1 : 0,
                                            }}
                                        />
                                    ))}
                                </div>
                                {/* Bottom edge gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A]/30 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Active label badge */}
                            <div className="absolute -bottom-4 -left-4 flex items-center gap-2 px-4 py-2.5 bg-[#0D1225]/90 backdrop-blur-md border border-[#BED39D]/25 rounded-xl shadow-lg">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs font-semibold text-white/70">{dashboardHighlights[activeCard].label}</span>
                            </div>

                            {/* Dot navigation */}
                            <div className="absolute -bottom-4 right-0 flex items-center gap-1.5">
                                {dashboardHighlights.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleCardClick(i)}
                                        className={`rounded-full transition-all duration-300 ${activeCard === i ? "w-5 h-2 bg-[#BED39D]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── MODULES ─── */}
            <section id="modules" className="relative z-10 py-24 px-6 lg:px-16 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#BED39D] text-sm font-semibold uppercase tracking-widest">Modules</span>
                        <h2 className="heading-font text-4xl lg:text-5xl font-bold mt-3 mb-4">Complete <span className="text-[#BED39D]">Module Suite</span></h2>
                        <p className="text-white/40 text-lg max-w-2xl mx-auto">Eight integrated modules covering every aspect of factory operations.</p>
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
                                className="module-grid-item relative p-6 glass-card rounded-2xl border border-white/6 hover:border-[#BED39D]/30 cursor-default text-center"
                            >
                                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                                    style={{ background: `radial-gradient(circle at center, ${item.accent}08, transparent 70%)` }} />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4"
                                        style={{ background: `${item.accent}15`, color: item.accent }}>
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-sm text-white">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── BENEFITS ─── */}
            <section id="benefits" className="relative z-10 py-24 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            variants={slideInLeft}
                            initial="hidden"
                            whileInView="visible"
                            className="order-2 lg:order-1"
                        >
                            <span className="text-[#BED39D] text-sm font-semibold uppercase tracking-widest">Why FMS</span>
                            <h2 className="heading-font text-4xl lg:text-5xl font-bold mt-3 mb-6 leading-tight">
                                Transform Your <span className="text-[#BED39D]">Factory Operations</span>
                            </h2>
                            <p className="text-white/40 text-lg mb-10 leading-relaxed">
                                FMS delivers measurable improvements across every aspect of your manufacturing business.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {benefits.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        className="benefit-check flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-[#BED39D]/15 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#BED39D]" />
                                        </div>
                                        <span className="text-white/70 text-sm">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            variants={slideInRight}
                            initial="hidden"
                            whileInView="visible"
                            className="order-1 lg:order-2"
                        >
                            <div className="relative">
                                <div className="absolute -inset-6 bg-gradient-to-br from-[#BED39D]/5 to-blue-500/5 rounded-3xl blur-2xl" />
                                <div className="relative glass-card rounded-2xl p-8 border border-white/10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Trophy className="w-5 h-5 text-[#BED39D]" />
                                        <span className="text-white/80 font-bold text-sm">Impact at a Glance</span>
                                    </div>
                                    <div className="space-y-5">
                                        {[
                                            { label: "Productivity Increase", value: "40%", color: "text-emerald-400" },
                                            { label: "Operational Cost Reduction", value: "25%", color: "text-[#BED39D]" },
                                            { label: "Inventory Accuracy", value: "99%", color: "text-blue-400" },
                                            { label: "Decision-Making Speed", value: "3x", color: "text-purple-400" },
                                        ].map((stat, i) => (
                                            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                                <span className="text-white/50 text-sm">{stat.label}</span>
                                                <span className={`heading-font text-xl font-bold ${stat.color}`}>{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ─── SECURITY ─── */}
            <section className="relative z-10 py-20 px-6 lg:px-16 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="text-[#BED39D] text-sm font-semibold uppercase tracking-widest">Security</span>
                        <h2 className="heading-font text-4xl font-bold mt-3 mb-4">Enterprise-Grade <span className="text-[#BED39D]">Protection</span></h2>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        className="flex flex-wrap justify-center gap-6"
                    >
                        {securityItems.map((item, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -4 }}
                                className="flex items-center gap-3 px-6 py-4 glass-card rounded-xl border border-white/6"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#BED39D]/10 flex items-center justify-center text-[#BED39D]">
                                    {item.icon}
                                </div>
                                <span className="text-white/70 text-sm font-medium">{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── INDUSTRIES ─── */}
            <section className="relative z-10 py-20 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <span className="text-[#BED39D] text-sm font-semibold uppercase tracking-widest">Industries</span>
                        <h2 className="heading-font text-4xl font-bold mt-3 mb-4">Built for <span className="text-[#BED39D]">Manufacturing</span></h2>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {industries.map((item, i) => (
                            <motion.span
                                key={i}
                                variants={fadeInUp}
                                whileHover={{ y: -3 }}
                                className="industry-pill px-6 py-3 glass-card border border-white/6 rounded-full text-white/60 text-sm font-medium"
                            >
                                {item}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section ref={ctaRef} id="contact" className="relative z-10 py-24 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="relative overflow-hidden rounded-3xl"
                        style={{
                            background: "linear-gradient(135deg, rgba(190,211,157,0.10) 0%, rgba(190,211,157,0.04) 45%, rgba(10,14,28,0.95) 100%)",
                            border: "1px solid rgba(190,211,157,0.14)"
                        }}
                    >
                        {/* Background radial glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_15%_50%,rgba(190,211,157,0.10),transparent_70%)] pointer-events-none" />
                        <motion.div
                            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 left-0 w-80 h-80 bg-[#BED39D]/6 rounded-full blur-3xl pointer-events-none"
                        />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-center min-h-[480px]">

                            {/* ─ Left: copy + CTAs ─ */}
                            <div className="px-10 py-16 lg:px-16 lg:py-20">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#BED39D]/10 border border-[#BED39D]/20 rounded-full mb-8">
                                    <Rocket className="w-4 h-4 text-[#BED39D]" />
                                    <span className="text-[#BED39D] text-sm font-medium">Start Your Digital Transformation</span>
                                </div>

                                <h2 className="heading-font text-3xl lg:text-4xl xl:text-5xl font-bold mb-5 leading-tight">
                                    Run Your Factory <span className="text-[#BED39D]">Smarter, Faster, Better</span>

                                </h2>

                                <p className="text-white/45 text-lg mb-10 leading-relaxed max-w-md">
                                    Digitize your manufacturing workflow, improve operational efficiency, and gain complete visibility across your factory with FMS.
                                </p>


                                <div className="flex flex-wrap gap-4 mb-10">
                                    <motion.button
                                        onClick={() => setIsModalOpen(true)}
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(190,211,157,0.35)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-[#BED39D] text-black rounded-xl font-bold text-base flex items-center gap-2 shadow-xl shadow-[#BED39D]/20"
                                    >
                                        <SendHorizontal className="w-4 h-4" />
                                        Get Started
                                    </motion.button>

                                </div>

                                <div className="flex flex-wrap gap-5 text-white/30 text-sm">
                                    <span className="flex items-center gap-2"><Headphones className="w-4 h-4 text-[#BED39D]/60" /> Dedicated Support</span>
                                    <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#BED39D]/60" /> Enterprise Security</span>
                                    <span className="flex items-center gap-2"><Rocket className="w-4 h-4 text-[#BED39D]/60" /> Fast Onboarding</span>
                                </div>
                            </div>

                            {/* ─ Right: device mockup image ─ */}
                            <div className="hidden lg:flex items-center justify-center relative px-8 py-12 overflow-hidden">
                                {/* Glow behind image */}
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(190,211,157,0.12),transparent_75%)] pointer-events-none" />

                                {/* Image with perspective */}
                                <motion.div
                                    initial={{ opacity: 0, x: 60, rotateY: -8 }}
                                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ perspective: "1200px" }}
                                    className="relative"
                                >
                                    <img
                                        src={ctaImage}
                                        alt="FMS on laptop and tablet"
                                        className="w-full max-w-[540px] h-auto object-contain drop-shadow-2xl"
                                        style={{
                                            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(190,211,157,0.12))"
                                        }}
                                    />

                                    {/* Floating stat badge – top left */}
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        animate={{ y: [0, -6, 0] }}
                                        style={{ animationDuration: "3s", animationIterationCount: "infinite", animationTimingFunction: "ease-in-out" }}
                                        className="absolute -top-4 -left-4 bg-[#0D1225]/90 backdrop-blur-md border border-[#BED39D]/25 rounded-2xl px-4 py-3 shadow-xl"
                                    >
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Production Rate</div>
                                        <div className="heading-font text-xl font-bold text-[#BED39D]">87% <span className="text-xs text-emerald-400 font-normal">↑ +12%</span></div>
                                    </motion.div>

                                    {/* Floating stat badge – bottom right */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        animate={{ y: [0, 6, 0] }}
                                        style={{ animationDuration: "4s", animationIterationCount: "infinite", animationTimingFunction: "ease-in-out" }}
                                        className="absolute -bottom-4 -right-4 bg-[#0D1225]/90 backdrop-blur-md border border-emerald-500/20 rounded-2xl px-4 py-3 shadow-xl"
                                    >
                                        <div className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Orders Fulfilled</div>
                                        <div className="heading-font text-xl font-bold text-emerald-400">240+ <span className="text-xs text-white/30 font-normal">this week</span></div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="relative z-10 border-t border-white/5 bg-[#080D1A]">
                <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12">
                    <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/5">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-15 h-15 rounded-xl flex items-center justify-center overflow-hidden">
                                    <img
                                        src={logo}
                                        alt="FMS Logo"
                                        className="w-15 h-15 object-contain"
                                    />
                                </div>

                                <span className="heading-font text-xl font-bold text-white">
                                    FMS
                                </span>
                            </div>
                            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
                                Smart Factory Management for modern manufacturing. Built for furniture, fabrication, and assembly industries.
                            </p>
                            {/* <div className="flex gap-4 mt-5">
                                {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
                                    <a key={i} href="#" className="text-white/20 hover:text-[#BED39D] transition-colors">
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div> */}
                        </div>

                        {/* Quick Links */}
                        <div>
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-white font-semibold mb-6 flex items-center gap-2"
                            >
                                <span className="w-1.5 h-6 bg-gradient-to-b from-[#BED39D] to-[#BED39D]/60 rounded-full" />
                                Quick Links
                            </motion.h3>
                            <motion.ul className="space-y-3">
                                {["Features", "Workflow ", "Modules", "Benefits", "Contact"].map(item => (
                                    <li key={item}>
                                        <a href={`#${item.toLowerCase()}`} className="text-white/30 hover:text-[#BED39D] text-sm transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </motion.ul>
                        </div>

                        {/* Contact Us */}
                        <div>
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-white font-semibold mb-6 flex items-center gap-2"
                            >
                                <span className="w-1.5 h-6 bg-gradient-to-b from-[#BED39D] to-[#BED39D]/60 rounded-full" />
                                Contact Us
                            </motion.h3>

                            <motion.ul
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="space-y-4"
                            >
                                <motion.li
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.35 }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-start gap-3 cursor-pointer group"
                                    onClick={handleEmailClick}
                                >
                                    <div className="flex-shrink-0 w-9 h-9 bg-[#BED39D]/10 rounded-lg flex items-center justify-center group-hover:bg-[#BED39D]/20 transition-all duration-300">
                                        <Mail className="w-4 h-4 text-[#BED39D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                            Email
                                        </p>
                                        <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                                            support@rookstechnologies.com
                                        </p>
                                    </div>
                                </motion.li>

                                <motion.li
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-start gap-3 cursor-pointer group"
                                    onClick={handlePhoneClick}
                                >
                                    <div className="flex-shrink-0 w-9 h-9 bg-[#BED39D]/10 rounded-lg flex items-center justify-center group-hover:bg-[#BED39D]/20 transition-all duration-300">
                                        <Phone className="w-4 h-4 text-[#BED39D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                            Phone
                                        </p>
                                        <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                                            +91 75987 07071
                                        </p>
                                    </div>
                                </motion.li>
                            </motion.ul>
                        </div>

                        {/* Locations */}
                        <div>
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-white font-semibold mb-6 flex items-center gap-2"
                            >
                                <span className="w-1.5 h-6 bg-gradient-to-b from-[#BED39D] to-[#BED39D]/60 rounded-full" />
                                Locations
                            </motion.h3>

                            <motion.ul
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="space-y-4"
                            >
                                <motion.li
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.45 }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-start gap-3 cursor-pointer group"
                                    onClick={() =>
                                        handleLocationClick(
                                            "First Floor, 17, Jawahar St, Ramavarmapuram, Nagercoil, Tamil Nadu 629001",
                                        )
                                    }
                                >
                                    <div className="flex-shrink-0 w-9 h-9 bg-[#BED39D]/10 rounded-lg flex items-center justify-center group-hover:bg-[#BED39D]/20 transition-all duration-300">
                                        <MapPin className="w-4 h-4 text-[#BED39D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                            Nagercoil
                                        </p>
                                        <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                                            Ramavarmapuram, Tamil Nadu
                                        </p>
                                    </div>
                                </motion.li>

                                <motion.li
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.5 }}
                                    whileHover={{ x: 5 }}
                                    className="flex items-start gap-3 cursor-pointer group"
                                    onClick={() =>
                                        handleLocationClick(
                                            "Industrial Estate P.O, Thiruvananthapuram, Kerala",
                                        )
                                    }
                                >
                                    <div className="flex-shrink-0 w-9 h-9 bg-[#BED39D]/10 rounded-lg flex items-center justify-center group-hover:bg-[#BED39D]/20 transition-all duration-300">
                                        <MapPin className="w-4 h-4 text-[#BED39D]" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                            Thiruvananthapuram
                                        </p>
                                        <p className="text-gray-300 text-sm group-hover:text-white transition-colors">
                                            Industrial Estate P.O, Kerala
                                        </p>
                                    </div>
                                </motion.li>
                            </motion.ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/20 text-xs">
                        <div>© 2025 FMS Platform. All rights reserved. Built for the future of manufacturing.</div>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-[#BED39D] transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-[#BED39D] transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-[#BED39D] transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ─── CONTACT MODAL ─── */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setIsModalOpen(false);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            className="bg-[#0D1225] w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(190,211,157,0.12)] relative flex flex-col md:flex-row min-h-[560px] border border-white/5"
                        >
                            {/* Close */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Left: Image */}
                            <div className="md:w-1/2 bg-[#111827] flex flex-col items-center justify-center p-10 relative overflow-hidden border-r border-white/5">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(190,211,157,0.08),transparent)]" />
                                <motion.img
                                    initial={{ scale: 0.85, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    src={factoryImage}
                                    alt="FMS Factory"
                                    className="w-full h-auto max-w-[300px] relative z-10 object-contain rounded-2xl shadow-2xl"
                                />
                                <div className="mt-8 text-center relative z-10">
                                    <div className="flex items-center justify-center gap-2 mb-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#BED39D] animate-pulse" />
                                        <span className="text-[#BED39D] font-bold uppercase tracking-widest text-[10px]">Industrial Control Hub</span>
                                    </div>
                                    <h4 className="heading-font text-xl text-white mb-1">Powering Your Factory Floor</h4>
                                    <p className="text-white/30 text-xs italic">"Transforming manufacturing with digital precision."</p>
                                </div>
                            </div>

                            {/* Right: Form */}
                            <div className="md:w-1/2 p-8 md:p-12 bg-[#0D1225] flex flex-col justify-center">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {submitSuccess ? (
                                        <div className="text-center py-10">
                                            <div className="w-20 h-20 bg-[#BED39D]/10 rounded-full flex items-center justify-center mx-auto text-[#BED39D] border border-[#BED39D]/20 mb-8">
                                                <CheckCircle2 className="w-10 h-10" />
                                            </div>
                                            <h3 className="heading-font text-3xl font-bold text-white mb-4">Request Sent!</h3>
                                            <p className="text-white/40 text-sm">Our team will contact you shortly to schedule a demo.</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center gap-2 mb-2">
                                                <Factory className="w-5 h-5 text-[#BED39D]" />
                                                <span className="text-[#BED39D] font-bold text-[10px] tracking-widest uppercase">Factory Ops</span>
                                            </div>
                                            <h3 className="heading-font text-3xl font-bold text-white mb-2">Get in Touch</h3>
                                            <p className="text-white/40 text-sm mb-6">Complete the form and we'll help you digitize your factory floor.</p>

                                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                                <div>
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Full Name *"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:bg-white/[0.06] focus:border-[#BED39D]/50 focus:ring-1 focus:ring-[#BED39D]/50 transition-all outline-none text-white placeholder:text-white/10 text-sm"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <input
                                                        required
                                                        type="email"
                                                        placeholder="Email *"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:bg-white/[0.06] focus:border-[#BED39D]/50 focus:ring-1 focus:ring-[#BED39D]/50 transition-all outline-none text-white placeholder:text-white/10 text-sm"
                                                    />
                                                    <input
                                                        required
                                                        type="tel"
                                                        placeholder="Phone *"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:bg-white/[0.06] focus:border-[#BED39D]/50 focus:ring-1 focus:ring-[#BED39D]/50 transition-all outline-none text-white placeholder:text-white/10 text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <textarea
                                                        required
                                                        rows="3"
                                                        placeholder="Your message *"
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:bg-white/[0.06] focus:border-[#BED39D]/50 focus:ring-1 focus:ring-[#BED39D]/50 transition-all outline-none text-white resize-none placeholder:text-white/10 text-sm"
                                                    />
                                                </div>
                                                <motion.button
                                                    disabled={isSubmitting}
                                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(190,211,157,0.5)" }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full py-4 bg-[#BED39D] text-black font-bold rounded-xl transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <SendHorizontal className="w-4 h-4" />
                                                            Submit Request
                                                        </>
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

export default FmsLanding;