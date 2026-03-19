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
} from "lucide-react";

import charityImage from "../../assets/work/charity_support_visual_1773897282767.png";

const RookscharityLandingAlt = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [activeStep, setActiveStep] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const docName = `Charity_${formData.name.replace(/\s+/g, '_')}_${Date.now()}`;
      await setDoc(doc(db, "Client Enquiry", docName), {
        ...formData,
        application: "Rooks Charity Management System",
        source: "Charity Landing",
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

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-[#071324] text-white overflow-hidden font-sans">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#4ec9ff] to-[#0B3470] z-50"
        style={{ width: progressWidth }}
      />

      {/* Scroll indicator dots - right side */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {["Hero", "Features", "About", "Process", "Analytics", "CTA"].map(
          (_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/20 hover:bg-[#4ec9ff] transition-colors cursor-pointer"
            />
          ),
        )}
      </div>

      {/* ================= HERO — Split diagonal layout ================= */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center"
      >
        {/* Left solid dark panel */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#071324]" />
          {/* Diagonal split */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(115deg, #071324 55%, #0B3470 55%)",
            }}
          />
          {/* Grid texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#4ec9ff 1px, transparent 1px), linear-gradient(90deg, #4ec9ff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full pt-20">
          <div className="grid lg:grid-cols-12 gap-0 items-center min-h-[80vh]">
            {/* LEFT — Main copy (7 cols) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="lg:col-span-7 pr-0 lg:pr-12 py-20"
            >
              {/* Label pill */}
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                animate={isHeroInView ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="inline-flex items-center gap-2 mb-10"
              >
                <div className="w-8 h-[2px] bg-[#4ec9ff]" />
                <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                  Charitable Trust Financial Platform
                </span>
              </motion.div>

              {/* Giant headline */}
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  delay: 0.3,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tight mb-2">
                  MANAGE
                </h1>
                <h1
                  className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tight mb-2 text-transparent"
                  style={{ WebkitTextStroke: "2px #4ec9ff" }}
                >
                  & SERVE
                </h1>
                <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-tight">
                  WITH TRUST
                  <span className="text-[#4ec9ff]">.</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="text-gray-400 mt-8 mb-10 max-w-lg text-lg leading-relaxed border-l-2 border-[#0B3470] pl-4"
              >
                A dedicated application for Krishna Bhagtha Seva Trust —
                managing donations, expenses, and generating accurate financial
                reports with complete transparency.
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.65, duration: 0.7 }}
                className="flex items-center gap-6 flex-wrap"
              >
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-3 px-8 py-4 bg-[#4ec9ff] text-[#071324] font-black text-sm uppercase tracking-wider rounded-none relative overflow-hidden"
                >
                  <span className="relative z-10">Contact Us</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT — Floating card stack (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative h-[520px] hidden lg:block"
            >
              {/* Main dashboard card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-8 right-0 w-80 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-wider text-gray-400">
                    Total Donations
                  </span>
                  <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                    +23% ↑
                  </span>
                </div>
                <div className="text-4xl font-black text-white mb-4">₹1.0L</div>
                {/* Mini bar chart */}
                <div className="flex items-end gap-1.5 h-14">
                  {[40, 60, 45, 80, 55, 90, 70, 95, 65, 85, 75, 100].map(
                    (h, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={isHeroInView ? { scaleY: 1 } : {}}
                        transition={{ delay: 0.8 + i * 0.05 }}
                        style={{ height: `${h}%` }}
                        className={`flex-1 rounded-sm origin-bottom ${i === 11 ? "bg-[#4ec9ff]" : "bg-[#0B3470]"}`}
                      />
                    ),
                  )}
                </div>
              </motion.div>

              {/* Fund allocation card */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-52 left-0 w-56 bg-[#0B3470]/80 backdrop-blur-xl rounded-2xl border border-[#4ec9ff]/20 p-5 shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <PieChart className="w-4 h-4 text-[#4ec9ff]" />
                  <span className="text-xs font-bold text-[#4ec9ff]">
                    Fund Allocation
                  </span>
                </div>
                {[
                  { label: "Annadhanam", pct: 45, color: "#4ec9ff" },
                  { label: "Temple Maintenance", pct: 30, color: "#0B3470" },
                  { label: "Medical Camp", pct: 25, color: "#1e4a8a" },
                ].map((f, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-gray-400">{f.label}</span>
                      <span className="text-white font-bold">{f.pct}%</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isHeroInView ? { width: `${f.pct}%` } : {}}
                        transition={{ delay: 1 + i * 0.15, duration: 0.8 }}
                        style={{ backgroundColor: f.color }}
                        className="h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Alert card */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-16 right-6 w-52 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] text-green-400 font-bold uppercase">
                    Live
                  </span>
                </div>
                <p className="text-xs text-gray-300">
                  New donation received:{" "}
                  <strong className="text-white">₹5,200</strong>
                </p>
                <p className="text-[10px] text-gray-500 mt-1">2 seconds ago</p>
              </motion.div>

              {/* Decorative ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-[#0B3470]/30 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#0B3470]/20 pointer-events-none" />
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ================= MARQUEE STRIP ================= */}
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
              "Receipt Generation",
              "Admin Dashboard",
              "Devotee Portal",
              "Financial Reports",
              "Category Management",
              "PDF Export",
            ].map((t, i) => (
              <span
                key={`${ri}-${i}`}
                className="text-xs uppercase tracking-[0.3em] text-white/60 flex items-center gap-4"
              >
                {t} <span className="text-[#4ec9ff]">✦</span>
              </span>
            )),
          )}
        </motion.div>
      </div>

      {/* ================= FEATURES — Tabbed/numbered list layout ================= */}
      <section className="py-28 px-6 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Sticky left heading */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-[2px] bg-[#4ec9ff]" />
                  <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                    Features
                  </span>
                </div>
                <h2 className="text-5xl font-black leading-tight mb-6">
                  Everything
                  <br />
                  You Need
                  <br />
                  <span
                    className="text-transparent"
                    style={{ WebkitTextStroke: "2px #0B3470" }}
                  >
                    to Manage
                  </span>
                </h2>
                <p className="text-gray-400 text-base leading-relaxed">
                  One platform for the complete financial lifecycle of Krishna
                  Bhagtha Seva Trust.
                </p>
              </motion.div>
            </div>

            {/* Right features numbered list */}
            <div className="lg:col-span-8 space-y-0">
              {[
                {
                  num: "01",
                  icon: <DollarSign className="w-6 h-6" />,
                  title: "Donation Tracking",
                  desc: "Record and manage all donor contributions with auto-generated receipts, donor details, categories like Annadhanam or Temple Maintenance, and payment types.",
                  tags: ["PDF Receipts", "Donor Details", "Categories"],
                },
                {
                  num: "02",
                  icon: <BarChart3 className="w-6 h-6" />,
                  title: "Expense Management",
                  desc: "Track all trust-related expenditures in real time. Devotees and Admins can log expenses with category, receiver, date, and amount.",
                  tags: ["Real-time", "Categories", "Admin Review"],
                },
                {
                  num: "03",
                  icon: <FileText className="w-6 h-6" />,
                  title: "Financial Reporting",
                  desc: "Generate income, expense, or overall reports filtered by daily, monthly, or yearly range. Download as PDF for auditing or record keeping.",
                  tags: ["PDF Export", "Date Filters", "Overall Reports"],
                },
                {
                  num: "04",
                  icon: <PieChart className="w-6 h-6" />,
                  title: "Category Configuration",
                  desc: "Admin can create and manage donation and expense categories such as Annadhanam, Medical Camp, or Charity Fund for organized fund tracking.",
                  tags: ["Custom Categories", "Edit & Delete", "Admin Control"],
                },
                {
                  num: "05",
                  icon: <Users className="w-6 h-6" />,
                  title: "Role-Based Access",
                  desc: "Separate logins for Trust Admin and Devotees. Admin oversees all records and reports; Devotees handle data entry without access to management features.",
                  tags: ["Admin", "Devotee", "Access Control"],
                },
                {
                  num: "06",
                  icon: <Bell className="w-6 h-6" />,
                  title: "Referral Reports",
                  desc: "Track income and expenses grouped by referral name. Measure contribution impact and monitor how funds are channeled through different referrers.",
                  tags: ["Referral Tracking", "Impact", "Grouped Reports"],
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="group border-b border-white/5 py-8 flex gap-8 items-start hover:bg-white/[0.02] -mx-4 px-4 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-black text-[#0B3470] mt-1 w-8 shrink-0 group-hover:text-[#4ec9ff] transition-colors">
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-[#0B3470]/40 rounded-lg text-[#4ec9ff] group-hover:bg-[#0B3470] transition-colors">
                        {item.icon}
                      </div>
                      <h3 className="font-black text-xl group-hover:text-[#4ec9ff] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">
                      {item.desc}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {item.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className="text-[10px] uppercase tracking-wider border border-[#0B3470]/50 text-[#4ec9ff]/60 px-2 py-0.5 rounded group-hover:border-[#4ec9ff]/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT — Full-bleed with offset card ================= */}
      <section className="py-28 relative overflow-hidden">
        {/* Background band */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3470]/30 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #4ec9ff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left: Big visual block */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main block */}
              <div className="bg-gradient-to-br from-[#0B3470] to-[#071324] rounded-3xl p-10 border border-[#0B3470]/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#4ec9ff]/5 rounded-full blur-3xl" />

                <Heart className="w-10 h-10 text-[#4ec9ff] mb-6" />
                <h3 className="text-3xl font-black mb-4">Built for Seva</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  The Charity Application is built to make managing donations
                  and expenses simple and stress-free for Krishna Bhagtha Seva
                  Trust — replacing paperwork with a secure, transparent digital
                  system.
                </p>

                <div className="space-y-3">
                  {[
                    "Auto-generated PDF receipts for every donation",
                    "Real-time income and expense tracking",
                    "Role-based access for Admin and Devotees",
                    "Detailed referral and category reports",
                    "Daily, monthly, and yearly financial summaries",
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

              {/* Offset card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 -right-8 bg-[#4ec9ff] text-[#071324] p-6 rounded-2xl shadow-2xl w-48"
              >
                <TrendingUp className="w-6 h-6 mb-2" />
                <div className="text-3xl font-black">100%</div>
                <div className="text-xs font-bold uppercase tracking-wider opacity-70">
                  Transparent
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Icon grid + text */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-[2px] bg-[#4ec9ff]" />
                <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                  About Us
                </span>
              </div>
              <h2 className="text-5xl font-black leading-tight mb-6">
                Designed for{" "}
                <span className="text-[#4ec9ff]">Charitable Trust</span>{" "}
                Operations
              </h2>
              <p className="text-gray-400 leading-relaxed mb-10">
                We believe every donated rupee deserves accountability. This
                application gives Krishna Bhagtha Seva Trust the tools to
                operate with clarity — from the first donation entry to the
                final financial report.
              </p>

              {/* 2x2 icon grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  {
                    icon: DollarSign,
                    label: "Devotee Portal",
                    sub: "Easy donation & expense entry",
                  },
                  {
                    icon: Smartphone,
                    label: "Mobile-Ready",
                    sub: "Access from any device",
                  },
                  {
                    icon: ShieldCheck,
                    label: "Secure Records",
                    sub: "All data stored safely",
                  },
                  {
                    icon: Globe,
                    label: "PDF Reports",
                    sub: "Shareable & audit-ready",
                  },
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

      {/* ================= PROCESS — Horizontal timeline ================= */}
      <section className="py-28 px-6 lg:px-12 relative overflow-hidden">
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
                Process
              </span>
            </div>
            <h2 className="text-5xl font-black leading-tight">
              How It Works in <span className="text-[#4ec9ff]">5 Steps</span>
            </h2>
          </motion.div>

          {/* Steps with vertical connecting line on mobile, horizontal on desktop */}
          <div className="relative">
            {/* Horizontal line desktop */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0B3470] to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
              {[
                {
                  step: "01",
                  label: "Select Login Role",
                  icon: Layout,
                  desc: "Choose Trust Admin or Devotee login to access your dashboard",
                },
                {
                  step: "02",
                  label: "Record Donations",
                  icon: DollarSign,
                  desc: "Enter donor name, category, amount, and generate instant PDF receipts",
                },
                {
                  step: "03",
                  label: "Log Expenses",
                  icon: BarChart3,
                  desc: "Add expense details with category, receiver, and date for full accountability",
                },
                {
                  step: "04",
                  label: "Manage Categories",
                  icon: PieChart,
                  desc: "Admin configures income and expense categories like Annadhanam, Medical Camp",
                },
                {
                  step: "05",
                  label: "Generate Reports",
                  icon: FileText,
                  desc: "Export income, expense, or overall PDF reports filtered by day, month, or year",
                },
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
                    {/* Circle */}
                    <motion.div
                      animate={{ scale: isActive ? 1.15 : 1 }}
                      transition={{ duration: 0.3 }}
                      className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-[#4ec9ff] border-[#4ec9ff] shadow-lg shadow-[#4ec9ff]/20"
                          : "bg-[#071324] border-[#0B3470] group-hover:border-[#4ec9ff]/50"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 transition-colors ${isActive ? "text-[#071324]" : "text-[#4ec9ff]"}`}
                      />
                    </motion.div>

                    <div className="text-center">
                      <div
                        className={`text-xs font-black uppercase tracking-wider mb-1 transition-colors ${isActive ? "text-[#4ec9ff]" : "text-gray-600"}`}
                      >
                        Step {item.step}
                      </div>
                      <h3
                        className={`font-black text-lg mb-2 transition-colors ${isActive ? "text-white" : "text-gray-300"}`}
                      >
                        {item.label}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed max-w-[160px] mx-auto transition-colors ${isActive ? "text-gray-300" : "text-gray-600"}`}
                      >
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

      {/* ================= ANALYTICS — Bento grid ================= */}
      <section className="py-28 px-6 lg:px-12 relative">
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
                  Analytics
                </span>
              </div>
              <h2 className="text-5xl font-black leading-tight">
                Powerful Insights
                <br />& <span className="text-[#4ec9ff]">Accountability</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-xs leading-relaxed text-sm">
              Make informed decisions with real-time financial data, detailed
              donor records, and comprehensive trust analytics.
            </p>
          </motion.div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Large card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 lg:col-span-2 row-span-2 bg-gradient-to-br from-[#0B3470] to-[#071324] rounded-3xl border border-[#0B3470]/50 p-8 relative overflow-hidden group hover:border-[#4ec9ff]/30 transition-all"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#4ec9ff]/5 rounded-full blur-3xl" />
              <TrendingUp className="w-8 h-8 text-[#4ec9ff] mb-4" />
              <h3 className="text-2xl font-black mb-2">
                Annual Donation Growth
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Year-over-year donor contributions and trust fund growth metrics
              </p>
              {/* Fake line chart */}
              <div className="relative h-32">
                <svg
                  viewBox="0 0 300 100"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
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
                  <div className="text-2xl font-black text-[#4ec9ff]">+34%</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                    YoY Growth
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">
                    All Records
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Tracked & Stored
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Small cards */}
            {[
              {
                title: "Annadhanam Fund",
                val: "Active",
                icon: BarChart3,
                color: "#4ec9ff",
              },
              {
                title: "Expense Categories",
                val: "Custom",
                icon: PieChart,
                color: "#4ec9ff",
              },
              {
                title: "Financial Transparency",
                val: "A+",
                icon: ShieldCheck,
                color: "#4ec9ff",
              },
              {
                title: "PDF Report Export",
                val: "Instant",
                icon: FileText,
                color: "#4ec9ff",
              },
              {
                title: "Referral Tracking",
                val: "Enabled",
                icon: CheckCircle2,
                color: "#4ec9ff",
              },
              {
                title: "Report Periods",
                val: "3 Types",
                icon: Globe,
                color: "#4ec9ff",
              },
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

      {/* ================= CTA — Full width editorial ================= */}
      <section className="py-28 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B3470]/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #4ec9ff 1px, transparent 1px), linear-gradient(-45deg, #4ec9ff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-8 h-[2px] bg-[#4ec9ff]" />
                <span className="text-[#4ec9ff] text-xs font-bold uppercase tracking-[0.3em]">
                  Get Started
                </span>
              </div>
              <h2 className="text-6xl font-black leading-tight mb-6">
                Empower Your
                <br />
                Trust with <span className="text-[#4ec9ff]">Clarity</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                Replace manual records with a smart charity management system
                built for transparency and accountability. Trusted by Krishna
                Bhagtha Seva Trust.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex gap-4 flex-wrap items-center px-8 py-4 border border-white/20 font-bold text-sm uppercase tracking-wider hover:border-[#4ec9ff] hover:text-[#4ec9ff] transition-all"
                >
                  Contact Us
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="mt-10 flex gap-8 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#0B3470]" /> Secure &
                  Reliable
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0B3470]" /> Built for
                  Charitable Trusts
                </span>
              </div>
            </motion.div>

            {/* Right: Feature check list visual */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3"
            >
              {[
                { label: "Admin & Devotee role-based access", checked: true },
                { label: "Instant PDF receipt generation", checked: true },
                { label: "Daily, monthly & yearly reports", checked: true },
                {
                  label: "Income & expense category management",
                  checked: true,
                },
                { label: "Referral-based reporting", checked: true },
                { label: "Secure cloud-based record storage", checked: true },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#0B3470]/50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0B3470]/60 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#4ec9ff]" />
                  </div>
                  <span className="font-semibold text-gray-200">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-xs relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0B3470] rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#4ec9ff]" />
            </div>
            <span className="font-black text-white text-sm uppercase tracking-wider">
              Krishna Bhagtha Seva Trust
            </span>
          </div>
          <div className="uppercase tracking-widest">
            © 2024 Rooks & Brooks Technologies Pvt Ltd. All rights reserved.
          </div>
          <div className="flex gap-8 uppercase tracking-widest">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="hover:text-[#4ec9ff] transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ================= CONTACT MODAL ================= */}
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

              {/* Left Side: Illustration Area */}
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
                    <span className="text-[#4ec9ff] font-bold uppercase tracking-widest text-[10px]">Giving & Seva Hub</span>
                  </div>
                  <h4 className="heading-font text-xl text-white mb-2">Empowering Your Mission</h4>
                  <p className="text-white/40 text-xs italic text-center mx-auto max-w-[200px]">"Digitizing trust and transparency for the Krishna Bhagtha Seva Trust."</p>
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#0B3470]/5 rounded-full blur-3xl" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
              </div>

              {/* Right Side: Form Content */}
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
                      <h3 className="heading-font text-3xl font-bold text-white mb-4">Request Sent</h3>
                      <p className="text-white/40 text-sm">Your enquiry has been received. Our trust management expert will contact you shortly.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-[#4ec9ff]" />
                        <span className="text-[#4ec9ff] font-bold text-xs tracking-widest uppercase">Trust Support</span>
                      </div>
                      <h3 className="heading-font text-4xl font-bold text-white mb-3">Get in Touch</h3>
                      <p className="text-white/40 mb-8 text-sm">Complete the form below to reach out to our trust administration team.</p>

                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        <div>
                          <label className="block text-[10px] font-bold text-white/30 mb-1.5 uppercase tracking-widest">Full Name</label>
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
                            <label className="block text-[10px] font-bold text-white/30 mb-1.5 uppercase tracking-widest">Email Address</label>
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
                            <label className="block text-[10px] font-bold text-white/30 mb-1.5 uppercase tracking-widest">Phone Number</label>
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
                          <label className="block text-[10px] font-bold text-white/30 mb-1.5 uppercase tracking-widest">Message</label>
                          <textarea
                            required
                            rows="3"
                            placeholder="Tell us how we can help Krishna Bhagtha Seva Trust..."
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
