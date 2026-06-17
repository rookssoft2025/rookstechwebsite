import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  Users,
  BookOpen,
  UserCheck,
  CalendarCheck,
  CreditCard,
  FileCheck,
  Star,
  X,
  Menu,
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
  Award,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import phoneImage from "../../assets/work/red_antique_telephone_1773891893640.png";
// import imsLogo from "../../assets/mobile_apps_asstes/ims-logo.svg"; // Update with actual logo path

// Color palette from Flutter app
const colors = {
  primaryBlue: "#3B82F6",
  background: "#000000",
  cardBackground: "#111111",
  inputBackground: "#1A1A1A",
  border: "#2A2A2A",
  textPrimary: "#FFFFFF",
  textSecondary: "#A1A1AA",
  error: "#EF4444",
  success: "#22C55E",
};

const EASE = [0.22, 1, 0.36, 1];

// Animations
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE, delay: i * 0.08 },
  }),
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

/* ─── Navbar ────────────────────────────────────────────────────────────────── */
const ImsNavbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", sectionId: "home" },
    { label: "Features", sectionId: "features" },
    { label: "Why Choose Us", sectionId: "why-choose" },
    { label: "Contact", sectionId: "contact" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(59,130,246,0.3)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2.5 cursor-pointer select-none"
              onClick={() => scrollToSection("home")}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563eb] flex items-center justify-center shadow-lg shadow-[#3B82F6]/40">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-white">
                  IMS
                </span>
              </div>
            </motion.div>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={i}
                  onClick={() => scrollToSection(link.sectionId)}
                  whileHover={{ color: "#fff" }}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                onClick={onOpenModal}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 24px 4px rgba(59,130,246,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-5 py-2.5 rounded-lg font-semibold text-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #2563eb 100%)",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Get Started</span>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg border border-white/[0.08] bg-white/[0.04] text-gray-400 hover:text-white transition-colors"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-0 top-[70px] z-40 bg-black/98 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl lg:hidden"
          >
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={i}
                  onClick={() => scrollToSection(link.sectionId)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all text-sm font-medium"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-3">
                <button
                  onClick={onOpenModal}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-white text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #3B82F6 0%, #2563eb 100%)",
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Footer ────────────────────────────────────────────────────────────────── */
const ImsFooter = () => {
  return (
    <footer className="relative z-10 border-t border-white/[0.06]">
      {/* Bottom bar */}
      <div className="border-t border-white/[0.05] bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-500">
              <span>
                © 2025 Institute Management System. All rights reserved.
              </span>
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(
                (item, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ color: "#9ca3af" }}
                    className="hover:text-gray-400 transition-colors"
                  >
                    {item}
                  </motion.a>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─── Main component ────────────────────────────────────────────────────────── */
const ImsLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const docName = `Ims_${formData.name.replace(/\s+/g, "_")}_${Date.now()}`;
      await setDoc(doc(db, "Client Enquiry", docName), {
        ...formData,
        source: "IMS Landing",
        application: "Institute Management System",
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

  const features = [
    {
      icon: <Users className="w-5 h-5" />,
      title: "Student Management",
      desc: "Complete student lifecycle management from admission to graduation with automated workflows.",
      color: "from-[#3B82F6] to-[#2563eb]",
      metrics: "100% Customizable",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Course Management",
      desc: "Create and manage courses, modules, and curriculum with drag-and-drop simplicity.",
      color: "from-[#3B82F6] to-[#1d4ed8]",
      metrics: "Enterprise Grade",
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "Faculty & Staff Management",
      desc: "Streamline faculty profiles, attendance tracking, payroll, and performance reviews.",
      color: "from-[#3B82F6] to-[#1e3a8a]",
      metrics: "SOC2 Compliant",
    },
    {
      icon: <CalendarCheck className="w-5 h-5" />,
      title: "Attendance Tracking",
      desc: "Real-time digital attendance with biometric integration and detailed analytics.",
      color: "from-[#3B82F6] to-[#2563eb]",
      metrics: "40% Faster",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Fee & Finance Management",
      desc: "Automated fee collection, expense tracking, and comprehensive financial reporting.",
      color: "from-[#3B82F6] to-[#1d4ed8]",
      metrics: "Zero Stockouts",
    },
    {
      icon: <FileCheck className="w-5 h-5" />,
      title: "Exam & Result Management",
      desc: "Digital exam scheduling, online assessments, and real-time result generation.",
      color: "from-[#3B82F6] to-[#1e3a8a]",
      metrics: "Real-time",
    },
  ];

  const benefits = [
    "Centralized student data with secure role-based access",
    "Real-time updates across all institute departments",
    "Automated fee and finance management",
    "Comprehensive academic and operational analytics",
    "Secure architecture with audit trails",
    "24/7 dedicated support and regular updates",
  ];

  const processSteps = [
    {
      number: "01",
      title: "Student Registration",
      desc: "Quick digital intake with complete demographic details",
    },
    {
      number: "02",
      title: "Course Enrollment",
      desc: "Easy course selection and enrollment management",
    },
    {
      number: "03",
      title: "Attendance Tracking",
      desc: "Digital attendance with real-time monitoring",
    },
    {
      number: "04",
      title: "Fee Collection",
      desc: "Automated invoicing and payment processing",
    },
    {
      number: "05",
      title: "Reporting & Analytics",
      desc: "Comprehensive insights and regulatory compliance reports",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white antialiased overflow-x-hidden">
      {/* ══ Global ambient background ══════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,_#3B82F628,_transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_90%,_#2563eb18,_transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          animate={{ x: [0, 90, -40, 0], y: [0, -80, 60, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[10%] w-[480px] h-[480px] bg-[#3B82F6]/25 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -70, 50, 0], y: [0, 100, -60, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 right-[8%] w-[560px] h-[560px] bg-[#1e3a8a]/20 rounded-full blur-[140px]"
        />
      </div>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <ImsNavbar onOpenModal={() => setIsModalOpen(true)} />

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        ref={heroRef}
        className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="space-y-7"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/30 backdrop-blur-md text-[#60a5fa] text-sm font-medium tracking-wide">
                <motion.span
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
                Institute Management Solution
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.08] tracking-[-0.02em]"
            >
              Transform Your
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #60a5fa 0%, #3B82F6 30%, #2563eb 65%, #1e3a8a 100%)",
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
                  Institute Management
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-gray-400 text-lg leading-relaxed max-w-[520px]"
            >
              Streamline admissions, courses, students, faculty, staff,
              finances, and more with our powerful, user-friendly Institute
              Management System.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-3.5 pt-1"
            >
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 32px 4px rgba(59,130,246,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-8 py-3.5 rounded-xl font-semibold text-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #2563eb 100%)",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center gap-2">
                  Contact Us
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
          </motion.div>

          {/* Right – dashboard mockup */}
          <motion.div
            variants={fadeScale}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="absolute inset-[-20px] bg-gradient-to-br from-[#3B82F6]/30 to-[#2563eb]/10 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-[#111111]/95 to-[#020617]/95 rounded-2xl p-6 border border-[#3B82F6]/30 backdrop-blur-sm shadow-2xl shadow-[#3B82F6]/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#2563eb] rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      IMS Dashboard
                    </div>
                    <div className="text-gray-500 text-xs">
                      Institute Overview
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="text-xs text-gray-500">Total Students</div>
                  <div className="text-xl font-bold">2,847</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="text-xs text-gray-500">Faculty</div>
                  <div className="text-xl font-bold">156</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Recent Activity</span>
                  <span className="text-blue-400">View all</span>
                </div>
                {[
                  "New admission – John Doe",
                  "Fee payment received",
                  "Exam scheduled",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs group hover:bg-white/5 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-gray-400">{item}</span>
                    </div>
                    <span className="text-gray-600">{i + 1}m ago</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════════════════ */}
      <section
        id="features"
        className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-[70px]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#3B82F6]/20 border border-[#3B82F6]/15 rounded-full text-[#60a5fa] text-xs font-semibold uppercase tracking-widest mb-5">
              Powerful Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] mb-5">
              Everything You Need to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#3B82F6] to-[#2563eb]">
                Manage Your Institute
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              A complete suite of tools designed to streamline operations,
              enhance productivity, and improve efficiency.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: EASE },
                }}
                className="group relative p-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden cursor-default"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 rounded-2xl`}
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#3B82F6] via-[#60a5fa] to-[#3B82F6]"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#60a5fa]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`p-2.5 bg-gradient-to-br ${feat.color} rounded-xl shadow-lg shadow-[#3B82F6]/30`}
                    >
                      <motion.span
                        className="block"
                        whileHover={{ scale: 1.2, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {feat.icon}
                      </motion.span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#60a5fa] bg-[#3B82F6]/30 border border-[#3B82F6]/15 px-2.5 py-1 rounded-full">
                      {feat.metrics}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-white/90 group-hover:text-white transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ════════════════════════════════════════════════════ */}
      <section
        id="why-choose"
        className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-[70px]"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: EASE }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 bg-[#3B82F6]/20 border border-[#3B82F6]/15 rounded-full text-[#60a5fa] text-xs font-semibold uppercase tracking-widest">
              Why Choose Our IMS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em]">
              Built for Modern
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#3B82F6] to-[#2563eb]">
                Institute Workflows
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-lg">
              Our Institute Management System is designed to simplify
              administrative tasks, enhance communication, and improve overall
              efficiency for educational institutions of all sizes.
            </p>
            <div className="space-y-3.5 pt-2">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="mt-0.5 flex-shrink-0 p-0.5 bg-gradient-to-br from-[#3B82F6] to-[#60a5fa] rounded-full"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors leading-relaxed">
                    {b}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: EASE }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                label: "Students",
                value: "10K+",
                color: "from-blue-500/20 to-cyan-500/10",
                border: "border-blue-500/20",
              },
              {
                label: "Institutes",
                value: "500+",
                color: "from-blue-500/20 to-indigo-500/10",
                border: "border-blue-500/20",
              },
              {
                label: "Active Users",
                value: "5K+",
                color: "from-blue-500/20 to-sky-500/10",
                border: "border-blue-500/20",
              },
              {
                label: "Data Points",
                value: "1M+",
                color: "from-blue-500/20 to-blue-600/10",
                border: "border-blue-500/20",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className={`relative p-7 rounded-2xl border ${item.border} bg-gradient-to-br ${item.color} backdrop-blur-sm overflow-hidden group cursor-default`}
              >
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="relative">
                  <div className="text-3xl font-bold mb-1 tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ PROCESS ═════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-[70px]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#3B82F6]/20 border border-[#3B82F6]/15 rounded-full text-[#60a5fa] text-xs font-semibold uppercase tracking-widest mb-5">
              Simple Workflow
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] mb-5">
              How It Works in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60a5fa] via-[#3B82F6] to-[#2563eb]">
                5 Simple Steps
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              From student registration to graduation, streamline your entire
              workflow with our intuitive platform.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute top-[3.5rem] left-[10%] w-[80%] h-px hidden lg:block overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[#3B82F6]/30 via-[#60a5fa]/40 to-[#3B82F6]/30"
              />
            </div>
            <div className="grid lg:grid-cols-5 gap-7">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.65, ease: EASE }}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3, ease: EASE },
                  }}
                  className="group text-center relative"
                >
                  <div className="relative inline-flex items-center justify-center mb-5">
                    <div className="w-14 h-14 rounded-full bg-black border border-[#3B82F6]/50 flex items-center justify-center shadow-lg shadow-[#3B82F6]/20 group-hover:border-[#60a5fa]/50 group-hover:shadow-[#60a5fa]/20 transition-all duration-400">
                      <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#60a5fa] to-[#2563eb]">
                        {step.number}
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#60a5fa]/10 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 text-white/90">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ APP CTA ═══════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="py-28 px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#3B82F6] via-[#2563eb] to-[#3B82F6] p-16 rounded-3xl text-center shadow-2xl shadow-[#3B82F6]/30"
          >
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2" />
              {/* Grid pattern */}
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 opacity-10"
              >
                <defs>
                  <pattern
                    id="grid-ims"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-ims)" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Logo/Icon */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">
                  IMS
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold mb-4 text-white"
              >
                Experience the Future of Institute Management
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 text-xl text-white/90"
              >
                Streamline admissions, courses, students, faculty, and finances
                - all from one powerful platform.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#3B82F6] rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                    fill="currentColor"
                  />
                </svg>
                Get In Touch
              </motion.button>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-8 text-white/80 text-sm"
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
                      fill="currentColor"
                    />
                  </svg>
                  Secure & Encrypted
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                      fill="currentColor"
                    />
                  </svg>
                  Optimized Performance
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L1 21H23L12 2ZM12 6L19.53 19H4.47L12 6ZM11 10V16H13V10H11ZM11 18V20H13V18H11Z"
                      fill="currentColor"
                    />
                  </svg>
                  Enterprise Grade
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <ImsFooter />

      {/* ══ CONTACT MODAL ════════════════════════════════════════════════════ */}
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/30 pointer-events-none" />
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
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                    <span className="text-[#3B82F6] font-bold uppercase tracking-widest text-xs">
                      Customer Service
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm max-w-[200px]">
                    Our expert team is here to help you revolutionize your
                    institute management.
                  </p>
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
                      <h3 className="text-3xl font-bold text-[#3B82F6]">
                        Thank You!
                      </h3>
                      <p className="text-gray-500 text-lg">
                        Your enquiry has been received. We'll get back to you
                        soon.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-4xl font-bold text-[#3B82F6] mb-2">
                        Need support?
                      </h3>
                      <p className="text-gray-500 mb-8">
                        Contact us if you need further assistance.
                      </p>

                      <form className="space-y-4" onSubmit={handleFormSubmit}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name and surname
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-blue-50/50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-800"
                            placeholder="Enter your name"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email
                            </label>
                            <input
                              required
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-blue-50/50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-800"
                              placeholder="mail@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone number
                            </label>
                            <input
                              required
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-blue-50/50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-800"
                              placeholder="+1 (234) 567-890"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Please enter the details of your request.
                          </label>
                          <textarea
                            required
                            rows="4"
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                message: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 bg-blue-50/50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none text-gray-800 resize-none"
                            placeholder="How can we help you?"
                          />
                        </div>

                        <motion.button
                          disabled={isSubmitting}
                          whileHover={{
                            scale: 1.02,
                            backgroundColor: "#2563eb",
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-[#3B82F6] text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-colors uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

export default ImsLanding;
