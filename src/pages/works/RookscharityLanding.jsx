import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  Heart,
  ArrowRight,
  Play,
  Layout,
  Smartphone,
  Users,
  BarChart3,
  FileText,
  DollarSign,
  PieChart,
  ShieldCheck,
  Bell,
  Globe,
  CheckCircle2,
  Shield,
  Award,
  TrendingUp,
  Sparkles,
  ChevronDown,
  Zap,
  X,
  SendHorizontal,
  Menu,
  UserCog,
  Database,
  Cloud,
  Activity,
  Calendar,
  AlertCircle,
  HelpCircle,
  Check,
  Mail,
  Phone,
  MapPin,
  Rocket,
  Headphones,
  Lock,
} from "lucide-react";

import charityImage from "../../assets/mobile_apps_asstes/CHARITY/1 CTA.png";
import logo from "../../assets/mobile_apps_asstes/CHARITY/charity logo-06.svg"
// Feature screen images
import imgDashboard from "../../assets/mobile_apps_asstes/CHARITY/Dashboard Overview.png";
import imgDonation from "../../assets/mobile_apps_asstes/CHARITY/Donation Tracking.png";
import imgExpense from "../../assets/mobile_apps_asstes/CHARITY/Expense Management.png";
import imgCategory from "../../assets/mobile_apps_asstes/CHARITY/Category Configuration.png";
import imgReports from "../../assets/mobile_apps_asstes/CHARITY/Financial Reporting.png";
import imgAccess from "../../assets/mobile_apps_asstes/CHARITY/Role-Based Access.png";

import imgCta from "../../assets/mobile_apps_asstes/CHARITY/last Cta.png"
const RookscharityLandingAlt = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [activeStep, setActiveStep] = useState(0);
  const [activeDashboardCard, setActiveDashboardCard] = useState(0);
  const dashboardCarouselTimerRef = useRef(null);

  const startDashboardCarouselTimer = () => {
    if (dashboardCarouselTimerRef.current) clearInterval(dashboardCarouselTimerRef.current);
    dashboardCarouselTimerRef.current = setInterval(() => {
      setActiveDashboardCard((prev) => (prev + 1) % 6);
    }, 5000);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2000);
    startDashboardCarouselTimer();
    return () => {
      clearInterval(interval);
      if (dashboardCarouselTimerRef.current) clearInterval(dashboardCarouselTimerRef.current);
    };
  }, []);

  // ✅ Add this function
  const scrollToContact = () => {
    setIsModalOpen(true);
  };

  const handleDashboardCardClick = (i) => {
    setActiveDashboardCard(i);
    startDashboardCarouselTimer();
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:support@rookstechnologies.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+917598707071";
  };

  const handleLocationClick = (address) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, "_blank");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const docName = `Charity_${formData.name.replace(/\s+/g, "_")}_${Date.now()}`;
      await setDoc(doc(db, "Client Enquiry", docName), {
        ...formData,
        application: "Rooks Charity Management System",
        source: "Charity Landing",
        timestamp: serverTimestamp(),
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

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const navItems = ["Features", "Workflow", "Reports", "Benefits", "Contact"];

  const colors = ["#4ec9ff", "#0ea5e9", "#6366f1", "#14b8a6", "#8b5cf6", "#10b981"];

  const features = [
    {
      num: "01",
      icon: <DollarSign className="w-6 h-6" />,
      title: "Donation Management",
      desc: "Record every donation with complete donor information, payment method, referral tracking, and auto-generated receipt numbers. Search, filter, and download PDF receipts instantly.",
      tags: ["Donor Database", "PDF Receipts", "Referral Tracking"],
      img: imgDonation,
    },
    {
      num: "02",
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Expense Management",
      desc: "Track all trust-related expenditures with detailed categories, item descriptions, quantities, and remarks. Maintain a complete spending history for every activity.",
      tags: ["Categories", "Item Tracking", "Date Management"],
      img: imgExpense,
    },
    {
      num: "03",
      icon: <Users className="w-6 h-6" />,
      title: "Member Management",
      desc: "Manage devotees and staff with role-based access. Create members, assign roles (Admin / Devotee), and maintain secure credentials.",
      tags: ["User Management", "Role Assignment", "Password Protection"],
      img: imgDashboard,
    },
    {
      num: "04",
      icon: <PieChart className="w-6 h-6" />,
      title: "Income Categories",
      desc: "Organize donations into customizable categories for better reporting and analysis. Add, edit, or delete categories as needed.",
      tags: ["Custom Categories", "Configuration", "Reporting"],
      img: imgCategory,
    },
    {
      num: "05",
      icon: <FileText className="w-6 h-6" />,
      title: "Financial Reports",
      desc: "Generate detailed income, expense, overall, referral, daily, monthly, and yearly reports. Export any report as a PDF with one click.",
      tags: ["PDF Export", "Date Filters", "Overall Reports"],
      img: imgReports,
    },
    {
      num: "06",
      icon: <Bell className="w-6 h-6" />,
      title: "Role-Based Access",
      desc: "Trust Admin has full control over all records, members, categories, and reports. Devotees can only add donations and expenses without accessing management features.",
      tags: ["Admin", "Devotee", "Access Control"],
      img: imgAccess,
    },
  ];

  const dashboardHighlights = [
    { icon: Activity, label: "Live Donation Status", color: "text-[#4ec9ff]", bg: "bg-[#4ec9ff]/10", img: imgDonation },
    { icon: Layout, label: "Fund Overview", color: "text-emerald-400", bg: "bg-emerald-500/10", img: imgDashboard },
    { icon: Users, label: "Devotee Activity", color: "text-blue-400", bg: "bg-blue-500/10", img: imgAccess },
    { icon: PieChart, label: "Category Breakdown", color: "text-purple-400", bg: "bg-purple-500/10", img: imgCategory },
    { icon: DollarSign, label: "Expense Tracking", color: "text-rose-400", bg: "bg-rose-500/10", img: imgExpense },
    { icon: FileText, label: "Operational Reports", color: "text-cyan-400", bg: "bg-cyan-500/10", img: imgReports },
  ];

  return (
    <div className="min-h-screen bg-[#071324] text-white overflow-hidden font-sans">
      <style>{`
        /* ── Premium Feature Cards ── */
        .feature-premium-card {
            background: linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%);
            border: 1px solid rgba(255,255,255,0.08);
            backdrop-filter: blur(12px);
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
            box-shadow: 0 0 32px var(--card-color, rgba(78,201,255,0.35));
        }
      `}</style>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#4ec9ff] to-[#0B3470] z-50"
        style={{ width: progressWidth }}
      />

      {/* ─── HEADER ─── */}
      <header className="fixed top-0 left-0 w-full z-50">
        <nav className="flex items-center justify-between px-6 lg:px-12 py-5 border-b border-white/5 bg-[#071324]/80 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="CharityApp Logo"
              className="w-11 h-11 object-contain"
            />

            <span className="font-black text-2xl tracking-tight text-white">
              CharityApp
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link text-white/50 hover:text-[#4ec9ff] transition-colors text-sm font-medium"
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
              className="hidden md:flex px-6 py-2.5 bg-[#4ec9ff] text-[#071324] font-bold rounded-xl text-sm items-center gap-2 shadow-lg shadow-[#4ec9ff]/25 hover:shadow-[#4ec9ff]/40 transition-shadow"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </motion.button>
            {/* Mobile Toggle */}
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
              className="md:hidden bg-[#0B1A33] border-b border-white/5 overflow-hidden"
            >
              <div className="flex flex-col px-6 py-6 gap-4">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white/60 hover:text-[#4ec9ff] transition-colors text-sm font-medium py-2 border-b border-white/5"
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
                  className="w-full py-3 bg-[#4ec9ff] text-[#071324] font-bold rounded-xl text-sm flex items-center justify-center gap-2 mt-2"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section ref={heroRef} className="relative pt-36 pb-24 px-5 md:px-8 lg:px-12 z-10">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#071324]" />
          {/* Subtle radial gradients */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,rgba(11,52,112,0.4),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(78,201,255,0.06),transparent_70%)] pointer-events-none" />
          <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,rgba(11,52,112,0.25),transparent_70%)] pointer-events-none" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(#4ec9ff 1px, transparent 1px), linear-gradient(90deg, #4ec9ff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="space-y-7"
            >
              {/* Premium glass pill badge */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={isHeroInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B3470]/20 border border-[#4ec9ff]/20 backdrop-blur-md text-[#4ec9ff] text-sm font-medium tracking-wide">
                  <motion.span
                    animate={{ rotate: [0, 15, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.span>
                  Complete Charity & Trust Management Platform
                </span>
              </motion.div>

              {/* Heading with gradient accent */}
              <motion.h1
                initial={{ y: 60, opacity: 0 }}
                animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.08] tracking-[-0.02em]"
              >
                Manage Your
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #b8e6ff 0%, #4ec9ff 30%, #0ea5e9 65%, #0B3470 100%)",
                    backgroundSize: "200% 100%",
                  }}
                >
                  <motion.span
                    className="inline-block"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundImage: "inherit",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      backgroundSize: "200% 100%",
                    }}
                  >
                    Donations With Clarity
                  </motion.span>
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-gray-400 text-lg leading-relaxed max-w-[520px]"
              >
                Simplify charity operations with a centralized platform for donation tracking, expense management, member administration, financial reporting, and complete transparency.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="flex flex-wrap gap-3.5 pt-1"
              >
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 32px 4px rgba(11,52,112,0.55)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group px-8 py-3.5 rounded-xl font-semibold text-sm overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #0B3470 0%, #1e5aa8 60%, #4ec9ff 100%)",
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    Get Started
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="flex items-center gap-5 pt-2"
              >
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B3470] to-[#4ec9ff] border-2 border-[#071324] flex items-center justify-center text-[10px] font-bold shadow-md"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  Trusted by <span className="text-white font-semibold">Krishna Bhagtha Seva Trust</span>
                </p>
              </motion.div>
            </motion.div>

            {/* RIGHT — Product Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: 0.4,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative hidden lg:flex items-center justify-center overflow-visible"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[800px] rounded-full bg-[#4ec9ff]/10 blur-[140px]" />
              </div>

              {/* Main Phone Mockup */}
              <div className="relative flex items-center justify-center h-[760px] xl:h-[820px] w-full">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 w-[780px] xl:w-[900px] 2xl:w-[980px]"
                >
                  <img
                    src={charityImage}
                    alt="Charity App"
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              </div>

              {/* Growth Card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-[12%] right-[2%] bg-[#071324]/90 backdrop-blur-xl px-5 py-4 rounded-2xl border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/15 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Growth Rate
                    </p>
                    <p className="font-bold text-xl text-white">+23%</p>
                  </div>
                </div>
              </motion.div>

              {/* Donation Card */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-[18%] left-[2%] bg-[#071324]/90 backdrop-blur-xl px-5 py-4 rounded-2xl border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#4ec9ff]/15 rounded-lg">
                    <DollarSign className="w-5 h-5 text-[#4ec9ff]" />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500">
                      Total Donations
                    </p>
                    <p className="font-bold text-xl text-white">₹1.0L</p>
                  </div>
                </div>
              </motion.div>

              {/* Live Card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[8%] right-[4%] bg-[#071324]/90 backdrop-blur-xl px-5 py-4 rounded-2xl border border-white/10 shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold text-green-400">
                    Live
                  </span>
                </div>

                <p className="text-sm text-gray-300">
                  New donation received:
                  <span className="font-bold text-white"> ₹5,200</span>
                </p>

                <p className="text-[10px] text-gray-500 mt-1">
                  2 seconds ago
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="py-4 bg-[#0B3470] overflow-hidden border-y border-[#1e4a8a]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {[...Array(2)].map((_, ri) =>
            [
              "Donation Tracking",
              "Expense Management",
              "Member Management",
              "Financial Reports",
              "PDF Receipts",
              "Role-Based Access",
              "Secure Cloud Storage",
              "Complete Transparency",
            ].map((t, i) => (
              <span
                key={`${ri}-${i}`}
                className="text-xs uppercase tracking-[0.3em] text-white/60 flex items-center gap-4"
              >
                {t} <span className="text-[#4ec9ff]">✦</span>
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* ─── PROBLEMS WE SOLVE ─── */}
      <section className="py-28 px-6 lg:px-12 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-[#4ec9ff]" />
              <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                Challenges
              </span>
            </div>
            <h2 className="text-5xl font-black leading-tight mb-6">
              Most Charities Still Rely on <br />
              <span className="text-[#4ec9ff]">Manual Bookkeeping</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, label: "Manual Donation Registers", desc: "Hard to maintain and prone to errors" },
              { icon: AlertCircle, label: "Difficult Expense Tracking", desc: "No clear view of where money goes" },
              { icon: Shield, label: "Lack of Financial Transparency", desc: "Donors demand visibility" },
              { icon: Calendar, label: "Time-consuming Reports", desc: "Reports take days to compile" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[#4ec9ff]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B3470]/40 flex items-center justify-center mb-4 group-hover:bg-[#0B3470] transition-colors">
                  <item.icon className="w-6 h-6 text-[#4ec9ff]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.label}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOLUTION (About) ─── */}
      <section className="py-28 px-6 lg:px-12 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3470]/30 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #4ec9ff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-[#0B3470] to-[#071324] rounded-3xl p-10 border border-[#0B3470]/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#4ec9ff]/5 rounded-full blur-3xl" />
                <Heart className="w-10 h-10 text-[#4ec9ff] mb-6" />
                <h3 className="text-3xl font-black mb-4">The Digital Solution</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  The Charity App digitizes your entire charity management process in one secure platform.
                  Track every donation, record every expense, generate reports instantly, and store all financial records securely.
                </p>

                <div className="space-y-3">
                  {[
                    "Track donations with full donor details",
                    "Record expenses with categories and receipts",
                    "Generate reports instantly in PDF",
                    "Manage members with role-based access",
                    "Ensure complete financial transparency",
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#4ec9ff] shrink-0" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-8 bg-[#4ec9ff] text-[#071324] p-6 rounded-2xl shadow-2xl w-48"
              >
                <TrendingUp className="w-6 h-6 mb-2" />
                <div className="text-3xl font-black">100%</div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-70">
                  Transparency
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-[2px] bg-[#4ec9ff]" />
                <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-5xl font-black leading-tight mb-6">
                Designed for{" "}
                <span className="text-[#4ec9ff]">Charitable Trusts</span> & NGOs
              </h2>
              <p className="text-gray-400 leading-relaxed mb-10">
                Replace manual records with a smart charity management system built for transparency and accountability.
                Trusted by Krishna Bhagtha Seva Trust.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: DollarSign, label: "Donation Tracking", sub: "Every contribution recorded" },
                  { icon: Smartphone, label: "Mobile-Ready", sub: "Access from any device" },
                  { icon: ShieldCheck, label: "Secure Records", sub: "Data stored safely" },
                  { icon: Globe, label: "PDF Reports", sub: "Shareable & audit-ready" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4 }}
                      className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-[#0B3470]/60 transition-all"
                    >
                      <div className="w-10 h-10 bg-[#0B3470]/50 rounded-xl flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-[#4ec9ff]" />
                      </div>
                      <p className="font-bold text-sm">{item.label}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── KEY FEATURES (Premium Showcase Cards) ─── */}
      <section id="features" className="py-28 px-6 lg:px-12 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Centered Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-[#4ec9ff]" />
              <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                Core Capabilities
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-4 text-white">
              Key Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base lg:text-lg">
              Everything you need to manage your charitable trust and ensure complete operational transparency.
            </p>
          </motion.div>

          {/* Premium Showcase Grid */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } }
            }}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {features.map((item, i) => {
              const color = colors[i % colors.length];
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className="feature-premium-card group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 bg-[#071324]"
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

                  {/* Dashboard screenshot preview - ~65-70% visual dominance */}
                  <div className="relative w-full overflow-hidden h-[260px] md:h-[275px]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-contain object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient fade to card body */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to bottom, transparent 40%, #071324 100%)" }}
                    />
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col p-8 pt-4 flex-1">
                    {/* Icon — below preview, top left of content */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="feature-icon-box w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:scale-110"
                        style={{ background: `${color}20`, color, boxShadow: `0 0 20px ${color}20` }}
                      >
                        {item.icon}
                      </div>
                      <span className="text-[11px] font-black text-white/20 tracking-widest uppercase">
                        {item.num}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-black text-xl mb-2 text-white leading-snug group-hover:text-[#4ec9ff] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
                      {item.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap mt-auto">
                      {item.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className="text-[10px] uppercase tracking-wider border border-white/5 bg-white/[0.01] text-gray-500 px-2 py-0.5 rounded transition-all duration-300 group-hover:border-[#4ec9ff]/20 group-hover:text-[#4ec9ff]/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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

      {/* ─── DASHBOARD PREVIEW ─── */}
      <section className="py-28 px-6 lg:px-12 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-[#4ec9ff]" />
              <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                Dashboard
              </span>
            </div>
            <h2 className="text-5xl font-black leading-tight mb-6">
              Everything You Need <br />
              in <span className="text-[#4ec9ff]">One Dashboard</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Monitor donations, expenses, members, categories, reports, and financial summaries from one centralized view.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: DollarSign, label: "Total Donations", value: "₹1.0L" },
              { icon: BarChart3, label: "Total Expenses", value: "₹42K" },
              { icon: PieChart, label: "Categories", value: "8" },
              { icon: Users, label: "Members", value: "12" },
              { icon: FileText, label: "Reports", value: "24" },
              { icon: Activity, label: "Recent Activity", value: "Live" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-center hover:border-[#4ec9ff]/30 transition-all"
                >
                  <Icon className="w-6 h-6 text-[#4ec9ff] mx-auto mb-2" />
                  <div className="text-2xl font-black text-white">{item.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{item.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WORKFLOW ─── */}
      <section id="workflow" className="py-28 px-6 lg:px-12 relative overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-[#4ec9ff]" />
              <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                Workflow
              </span>
            </div>
            <h2 className="text-5xl font-black leading-tight">
              How It Works <span className="text-[#4ec9ff]">in 6 Steps</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0B3470] to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4">
              {[
                { step: "01", label: "Login", icon: Layout, desc: "Trust Admin or Devotee login" },
                { step: "02", label: "Create Members", icon: Users, desc: "Add devotees and staff" },
                { step: "03", label: "Configure Categories", icon: PieChart, desc: "Set up donation & expense categories" },
                { step: "04", label: "Record Donations", icon: DollarSign, desc: "Enter donor details & amount" },
                { step: "05", label: "Log Expenses", icon: BarChart3, desc: "Add expense entries" },
                { step: "06", label: "Generate Reports", icon: FileText, desc: "View & export PDF reports" },
              ].map((item, i) => {
                const Icon = item.icon;
                const isActive = activeStep === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    onClick={() => setActiveStep(i)}
                    className="relative cursor-pointer group"
                  >
                    <motion.div
                      animate={{ scale: isActive ? 1.15 : 1 }}
                      transition={{ duration: 0.3 }}
                      className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-2 transition-all duration-300 ${isActive
                        ? "bg-[#4ec9ff] border-[#4ec9ff] shadow-lg shadow-[#4ec9ff]/20"
                        : "bg-[#071324] border-[#0B3470] group-hover:border-[#4ec9ff]/50"
                        }`}
                    >
                      <Icon className={`w-8 h-8 transition-colors ${isActive ? "text-[#071324]" : "text-[#4ec9ff]"}`} />
                    </motion.div>

                    <div className="text-center">
                      <div
                        className={`text-xs font-black uppercase tracking-wider mb-1 transition-colors ${isActive ? "text-[#4ec9ff]" : "text-gray-600"}`}
                      >
                        Step {item.step}
                      </div>
                      <h3 className={`font-black text-lg mb-2 transition-colors ${isActive ? "text-white" : "text-gray-300"}`}>
                        {item.label}
                      </h3>
                      <p className={`text-xs leading-relaxed max-w-[140px] mx-auto transition-colors ${isActive ? "text-gray-300" : "text-gray-600"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ROLE-BASED ACCESS ─── */}
      <section className="py-28 px-6 lg:px-12 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-[#4ec9ff]" />
              <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                Access Control
              </span>
            </div>
            <h2 className="text-5xl font-black leading-tight mb-6">
              Role-Based <span className="text-[#4ec9ff]">Access</span> for Secure Operations
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#0B3470]/20 border border-[#4ec9ff]/20 rounded-3xl p-8 hover:border-[#4ec9ff]/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#4ec9ff]/20 flex items-center justify-center">
                  <UserCog className="w-6 h-6 text-[#4ec9ff]" />
                </div>
                <h3 className="text-2xl font-black">Trust Admin</h3>
              </div>
              <ul className="space-y-3">
                {["Manage Donations", "Manage Expenses", "Create Members", "Configure Categories", "View Dashboard", "Generate Reports", "Export PDF", "Monitor Financial Activities"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#4ec9ff]" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/[0.03] border border-white/5 rounded-3xl p-8 hover:border-[#4ec9ff]/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#4ec9ff]" />
                </div>
                <h3 className="text-2xl font-black">Devotee</h3>
              </div>
              <ul className="space-y-3">
                {["Add Donations", "Add Expenses", "Submit Data", "View Assigned Screens"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-[#4ec9ff]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-[#0B3470]/30 rounded-xl border border-[#4ec9ff]/10">
                <p className="text-xs text-gray-400">
                  <span className="text-[#4ec9ff] font-bold">Note:</span> Devotees cannot access management or reporting features.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── REPORTING & ANALYTICS ─── */}
      <section id="reports" className="py-28 px-6 lg:px-12 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-[2px] bg-[#4ec9ff]" />
                <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                  Reporting
                </span>
              </div>
              <h2 className="text-5xl font-black leading-tight">
                Powerful Reporting
                <br />
                <span className="text-[#4ec9ff]">Engine</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-xs leading-relaxed text-sm">
              Generate comprehensive reports to understand your organization's financial health at a glance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-[#0B3470] to-[#071324] rounded-3xl border border-[#0B3470]/50 p-8 relative overflow-hidden group hover:border-[#4ec9ff]/30 transition-all"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#4ec9ff]/5 rounded-full blur-3xl" />
              <TrendingUp className="w-8 h-8 text-[#4ec9ff] mb-4" />
              <h3 className="text-2xl font-black mb-2">All Reports Available</h3>
              <p className="text-gray-400 text-sm mb-6">Income, Expense, Overall, Referral, Daily, Monthly, Yearly</p>
              <div className="relative h-32">
                <svg viewBox="0 0 300 100" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ec9ff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#4ec9ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 C50,70 80,50 120,40 C160,30 200,55 250,20 L300,15"
                    fill="none"
                    stroke="#4ec9ff"
                    strokeWidth="2"
                  />
                  <path
                    d="M0,80 C50,70 80,50 120,40 C160,30 200,55 250,20 L300,15 L300,100 L0,100 Z"
                    fill="url(#lineGrad)"
                  />
                </svg>
              </div>
              <div className="mt-4 flex gap-6">
                <div>
                  <div className="text-2xl font-black text-[#4ec9ff]">PDF</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">One‑click export</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">All Records</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Tracked & Stored</div>
                </div>
              </div>
            </motion.div>

            {[
              { title: "Income Analytics", val: "₹1.0L", icon: DollarSign, color: "#4ec9ff" },
              { title: "Expense Analytics", val: "₹42K", icon: BarChart3, color: "#4ec9ff" },
              { title: "Referral Analytics", val: "Active", icon: Users, color: "#4ec9ff" },
              { title: "Date-wise Reports", val: "Daily/Monthly", icon: Calendar, color: "#4ec9ff" },
              { title: "Annual Reports", val: "2025", icon: Globe, color: "#4ec9ff" },
              { title: "PDF Export", val: "Instant", icon: FileText, color: "#4ec9ff" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="bg-white/[0.03] hover:bg-white/[0.06] rounded-3xl border border-white/5 hover:border-[#0B3470]/60 p-6 transition-all cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-[#4ec9ff] mb-3 opacity-70" />
                  <div className="text-2xl font-black mb-1">{item.val}</div>
                  <div className="text-xs text-gray-500">{item.title}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS (Dashboard Highlights Showcase) ─── */}
      <section id="benefits" className="py-28 px-6 lg:px-12 relative border-t border-white/5 bg-[#071324]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side: Selector Nav */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 mb-6 text-left">
                <div className="w-8 h-[2px] bg-[#4ec9ff]" />
                <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                  Dashboard
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black mt-3 mb-6 leading-tight text-white">
                Real-Time <span className="text-[#4ec9ff]">Trust Insights</span>
              </h2>
              <p className="text-gray-400 text-base lg:text-lg mb-10 leading-relaxed">
                Get a bird's-eye view of your entire operation with live donation status, category breakdown, and financial metrics.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {dashboardHighlights.map((item, i) => {
                  const Icon = item.icon;
                  const isActive = activeDashboardCard === i;
                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleDashboardCardClick(i)}
                      animate={isActive ? { scale: 1.03 } : { scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`relative flex flex-col items-center gap-2 p-5 rounded-2xl text-center cursor-pointer transition-all duration-400 overflow-hidden ${isActive
                        ? `${item.bg} border-current/30`
                        : "bg-white/[0.02] border-white/6 hover:border-white/15 hover:bg-white/[0.04]"
                        }`}
                      style={
                        isActive
                          ? {
                            borderColor: "currentColor",
                            boxShadow: `0 0 24px -4px ${item.color.replace("text-", "").replace("[", "").replace("]", "")}40`,
                          }
                          : {}
                      }
                    >
                      {/* Active progress bar */}
                      {isActive && (
                        <motion.div
                          key={`bar-${i}-${activeDashboardCard}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 5, ease: "linear" }}
                          className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
                          style={{
                            backgroundColor:
                              item.color === "text-[#4ec9ff]" ? "#4ec9ff" :
                                item.color === "text-emerald-400" ? "#10b981" :
                                  item.color === "text-blue-400" ? "#3b82f6" :
                                    item.color === "text-purple-400" ? "#8b5cf6" :
                                      item.color === "text-rose-400" ? "#f43f5e" : "#06b6d4"
                          }}
                        />
                      )}
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all ${isActive ? item.bg : "bg-white/5"}`}>
                        <Icon className={`w-5 h-5 transition-colors ${isActive ? item.color : "text-white/30"}`} />
                      </div>
                      <p className={`text-xs font-semibold transition-colors ${isActive ? "text-white" : "text-white/50"}`}>
                        {item.label}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Right side: Mockup Crossfade Panel */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Ambient glow */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-[#4ec9ff]/10 via-transparent to-blue-500/8 rounded-3xl blur-3xl pointer-events-none" />

              {/* Image Frame with rotation perspective */}
              <div
                className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50"
                style={{ transform: "perspective(1100px) rotateY(-4deg) rotateX(2deg)", transition: "transform 0.8s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "perspective(1100px) rotateY(-4deg) rotateX(2deg)")}
              >
                <div className="relative" style={{ aspectRatio: "16/10" }}>
                  {dashboardHighlights.map((item, i) => (
                    <img
                      key={i}
                      src={item.img}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700"
                      style={{
                        opacity: activeDashboardCard === i ? 1 : 0,
                        transform: activeDashboardCard === i ? "scale(1)" : "scale(1.04)",
                        zIndex: activeDashboardCard === i ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
                {/* Bottom edge gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071324]/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Active label badge */}
              <div className="absolute -bottom-4 -left-4 flex items-center gap-2 px-4 py-2.5 bg-[#071324]/90 backdrop-blur-md border border-[#4ec9ff]/25 rounded-xl shadow-lg z-20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white/70">
                  {dashboardHighlights[activeDashboardCard].label}
                </span>
              </div>

              {/* Dot navigation */}
              <div className="absolute -bottom-4 right-0 flex items-center gap-1.5 z-20">
                {dashboardHighlights.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDashboardCardClick(i)}
                    className={`rounded-full transition-all duration-300 ${activeDashboardCard === i ? "w-5 h-2 bg-[#4ec9ff]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ─── INDUSTRIES ─── */}
      <section className="py-20 px-6 lg:px-12 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-[2px] bg-[#4ec9ff]" />
              <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                Perfect For
              </span>
            </div>
            <h2 className="text-5xl font-black mt-3 mb-4">
              Who We <span className="text-[#4ec9ff]">Serve</span>
            </h2>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { transition: { staggerChildren: 0.05 } },
            }}
            whileInView="visible"
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              "Charitable Trusts",
              "Religious Trusts",
              "NGOs",
              "Foundations",
              "Community Organizations",
              "Welfare Associations",
              "Non-Profit Organizations",
            ].map((item, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ y: -3 }}
                className="px-6 py-3 glass-card border border-white/6 rounded-full text-white/60 text-sm font-medium hover:bg-[#0B3470]/30 hover:border-[#4ec9ff]/30 transition-all"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section id="contact" className="py-24 px-6 lg:px-12 relative overflow-hidden border-t border-white/5 bg-[#071324]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[3rem] overflow-hidden border border-white/5 bg-[#0b1a33]/20 backdrop-blur-xl"
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_15%_50%,rgba(78,201,255,0.08),transparent_70%)] pointer-events-none" />
            <motion.div
              animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-80 h-80 bg-[#4ec9ff]/4 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-center min-h-[480px]">
              {/* Left Column: Content */}
              <div className="px-8 py-16 lg:px-16 lg:py-20 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4ec9ff]/10 border border-[#4ec9ff]/20 rounded-full mb-8 self-start">
                  <Rocket className="w-4 h-4 text-[#4ec9ff]" />
                  <span className="text-[#4ec9ff] text-sm font-medium">Start Your Digital Transformation</span>
                </div>

                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black mb-5 leading-tight text-white">
                  Manage Your Trust <span className="text-[#4ec9ff]">Smarter, Faster, Better</span>
                </h2>

                <p className="text-gray-400 text-base lg:text-lg mb-10 leading-relaxed max-w-md">
                  Digitize your charity workflow, improve operational efficiency, and gain complete visibility across your trust with CharityApp.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(78,201,255,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-[#4ec9ff] text-[#071324] rounded-xl font-bold text-base flex items-center gap-2 shadow-xl shadow-[#4ec9ff]/20"
                  >
                    <SendHorizontal className="w-4 h-4" />
                    Get Started
                  </motion.button>
                </div>

                <div className="flex flex-wrap gap-5 text-white/30 text-sm">
                  <span className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-[#4ec9ff]/60" /> Dedicated Support
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#4ec9ff]/60" /> Enterprise Security
                  </span>
                  <span className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-[#4ec9ff]/60" /> Fast Onboarding
                  </span>
                </div>
              </div>

              {/* Right Column: Mockup */}
              <div className="hidden lg:flex items-center justify-center relative px-8 py-12 overflow-hidden">
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(78,201,255,0.1),transparent_75%)] pointer-events-none" />

                {/* Mockup with Perspective */}
                <motion.div
                  initial={{ opacity: 0, x: 60, rotateY: -8 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  style={{ perspective: "1200px" }}
                  className="relative"
                >
                  <img
                    src={imgCta}
                    alt="CharityApp on laptop and tablet"
                    className="w-full max-w-[540px] h-auto object-contain"
                    style={{
                      filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(78,201,255,0.12))"
                    }}
                  />

                  {/* Floating Stat Badge 1 (Top Left) */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    animate={{ y: [0, -6, 0] }}
                    style={{ animationDuration: "3s", animationIterationCount: "infinite", animationTimingFunction: "ease-in-out" }}
                    className="absolute -top-4 -left-4 bg-[#071324]/90 backdrop-blur-md border border-[#4ec9ff]/25 rounded-2xl px-4 py-3 shadow-xl"
                  >
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Donation Accuracy</div>
                    <div className="font-bold text-xl text-[#4ec9ff]">
                      100% <span className="text-xs text-emerald-400 font-normal">↑ Audit Ready</span>
                    </div>
                  </motion.div>

                  {/* Floating Stat Badge 2 (Bottom Right) */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    animate={{ y: [0, 6, 0] }}
                    style={{ animationDuration: "4s", animationIterationCount: "infinite", animationTimingFunction: "ease-in-out" }}
                    className="absolute -bottom-4 -right-4 bg-[#071324]/90 backdrop-blur-md border border-[#4ec9ff]/20 rounded-2xl px-4 py-3 shadow-xl"
                  >
                    <div className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Receipts Generated</div>
                    <div className="font-bold text-xl text-[#4ec9ff]">
                      10k+ <span className="text-xs text-emerald-400 font-normal">this year</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/5 bg-[#071324]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-white/5">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="CharityApp Logo"
                  className="w-11 h-11 object-contain"
                />

                <span className="font-black text-2xl tracking-tight text-white">
                  CharityApp
                </span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed max-w-xs">
                Smart charity management for trusts, NGOs, and non-profits. Built for transparency and accountability.
              </p>

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
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#4ec9ff] to-[#4ec9ff]/60 rounded-full" />
                Quick Links
              </motion.h3>
              <motion.ul className="space-y-3">
                {["Features", "Workflow", "Reports", "Benefits", "Contact"].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-white/30 hover:text-[#4ec9ff] text-sm transition-colors">
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
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#4ec9ff] to-[#4ec9ff]/60 rounded-full" />
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
                  <div className="flex-shrink-0 w-9 h-9 bg-[#4ec9ff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#4ec9ff]/20 transition-all duration-300">
                    <Mail className="w-4 h-4 text-[#4ec9ff]" />
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
                  <div className="flex-shrink-0 w-9 h-9 bg-[#4ec9ff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#4ec9ff]/20 transition-all duration-300">
                    <Phone className="w-4 h-4 text-[#4ec9ff]" />
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
                <span className="w-1.5 h-6 bg-gradient-to-b from-[#4ec9ff] to-[#4ec9ff]/60 rounded-full" />
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
                  <div className="flex-shrink-0 w-9 h-9 bg-[#4ec9ff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#4ec9ff]/20 transition-all duration-300">
                    <MapPin className="w-4 h-4 text-[#4ec9ff]" />
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
                  <div className="flex-shrink-0 w-9 h-9 bg-[#4ec9ff]/10 rounded-lg flex items-center justify-center group-hover:bg-[#4ec9ff]/20 transition-all duration-300">
                    <MapPin className="w-4 h-4 text-[#4ec9ff]" />
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
            <div>© 2025 CharityApp. All rights reserved. Built for the future of giving.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#4ec9ff] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#4ec9ff] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#4ec9ff] transition-colors">
                Cookie Policy
              </a>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/70"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="bg-[#0f141c] w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(78,201,255,0.15)] relative flex flex-col md:flex-row min-h-[550px] border border-white/5"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Side: Illustration */}
              <div className="md:w-1/2 bg-[#161b26] flex flex-col items-center justify-center p-12 relative overflow-hidden border-r border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(78,201,255,0.1),transparent)]" />
                <motion.img
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  src={charityImage}
                  alt="Charity Support"
                  className="w-full h-auto max-w-[320px] relative z-10 object-contain rounded-2xl shadow-2xl"
                />
                <div className="mt-10 text-center relative z-10 w-full">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4ec9ff] animate-pulse" />
                    <span className="text-[#4ec9ff] font-bold uppercase tracking-widest text-[10px]">
                      Giving & Seva Hub
                    </span>
                  </div>
                  <h4 className="font-black text-xl text-white mb-2">Empowering Your Mission</h4>
                  <p className="text-white/40 text-xs italic text-center mx-auto max-w-[200px]">
                    "Digitizing trust and transparency for charitable trusts."
                  </p>
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#0B3470]/5 rounded-full blur-3xl" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
              </div>

              {/* Right Side: Form */}
              <div className="md:w-1/2 p-10 md:p-14 bg-[#0f141c] flex flex-col justify-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {submitSuccess ? (
                    <div className="text-center py-10">
                      <div className="w-20 h-20 bg-[#0B3470]/10 rounded-full flex items-center justify-center mx-auto text-[#4ec9ff] border border-[#4ec9ff]/20 mb-8">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="font-black text-3xl text-white mb-4">Request Sent</h3>
                      <p className="text-white/40 text-sm">
                        Your enquiry has been received. Our trust management expert will contact you shortly.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-[#4ec9ff]" />
                        <span className="text-[#4ec9ff] font-bold text-xs tracking-widest uppercase">
                          Trust Support
                        </span>
                      </div>
                      <h3 className="font-black text-4xl text-white mb-3">Get in Touch</h3>
                      <p className="text-white/40 mb-8 text-sm">
                        Complete the form below to reach out to our trust administration team.
                      </p>

                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        <div>
                          <label className="block text-[10px] font-bold text-white/30 mb-1.5 uppercase tracking-widest">
                            Full Name
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Anil Sharma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:bg-white/[0.06] focus:border-[#4ec9ff]/50 focus:ring-1 focus:ring-[#4ec9ff]/50 transition-all outline-none text-white placeholder:text-white/10"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-[10px] font-bold text-white/30 mb-1.5 uppercase tracking-widest">
                              Email Address
                            </label>
                            <input
                              required
                              type="email"
                              placeholder="anil@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:bg-white/[0.06] focus:border-[#4ec9ff]/50 focus:ring-1 focus:ring-[#4ec9ff]/50 transition-all outline-none text-white placeholder:text-white/10"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-white/30 mb-1.5 uppercase tracking-widest">
                              Phone Number
                            </label>
                            <input
                              required
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:bg-white/[0.06] focus:border-[#4ec9ff]/50 focus:ring-1 focus:ring-[#4ec9ff]/50 transition-all outline-none text-white placeholder:text-white/10"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-white/30 mb-1.5 uppercase tracking-widest">
                            Message
                          </label>
                          <textarea
                            required
                            rows="3"
                            placeholder="Tell us how we can help your trust..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:bg-white/[0.06] focus:border-[#4ec9ff]/50 focus:ring-1 focus:ring-[#4ec9ff]/50 transition-all outline-none text-white resize-none placeholder:text-white/10"
                          />
                        </div>

                        <motion.button
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(78,201,255,0.4)" }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-[#4ec9ff] text-[#071324] font-black rounded-xl transition-all uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-[#071324]/20 border-t-[#071324] rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <SendHorizontal className="w-4 h-4" />
                              Submit
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

export default RookscharityLandingAlt;