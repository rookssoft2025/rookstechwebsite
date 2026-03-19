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
  Cpu,
  ArrowRight,
  Play,
  Layout,
  Smartphone,
  Users,
  FileText,
  Shield,
  Clock,
  CheckCircle2,
  Sparkles,
  Activity,
  Calendar,
  DollarSign,
  Pill,
  BedDouble,
  FileBarChart,
  UserCog,
  HeartPulse,
  TrendingUp,
  Zap,
  Globe,
  Menu,
  X,
  ChevronDown,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Heart,
  SendHorizontal,
} from "lucide-react";
import hmsImg from "../../assets/work/hmsImg.jpg";
import hospitalImage from "../../assets/work/hospital_hms_support_1773896875537.png";

const EASE = [0.22, 1, 0.36, 1];

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
const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features", sectionId: "features" },
    { label: "Solutions", sectionId: "solutions" },
    { label: "Resources", sectionId: "resources" },
    { label: "About", sectionId: "about" },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[#060f1e]/90 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(11,52,112,0.3)]"
          : "bg-transparent"
          }`}
      >
        <div className="w-full px-5 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B3470] to-[#2563eb] flex items-center justify-center shadow-lg shadow-[#0B3470]/40">
                  <HeartPulse className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl bg-[#4ec9ff]/30 blur-sm"
                />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-white">
                  Rooks
                </span>
                <span className="font-bold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4ec9ff] to-[#2563eb]">
                  {" "}
                  HMS
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
                  boxShadow: "0 0 24px 4px rgba(11,52,112,0.5)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-5 py-2.5 rounded-lg font-semibold text-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #0B3470 0%, #1e4a8a 60%, #2563eb 100%)",
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
            className="fixed inset-x-0 top-[70px] z-40 bg-[#060f1e]/98 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl lg:hidden"
          >
            <div className="w-full px-5 py-6 space-y-1">
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
                      "linear-gradient(135deg, #0B3470 0%, #2563eb 100%)",
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
const Footer = () => {
  const noiseSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`;

  const footerLinks = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap", "Security"],
    Solutions: [
      "Hospitals",
      "Clinics",
      "Diagnostics",
      "Pharmacy",
      "Telemedicine",
    ],
    Resources: [
      "Documentation",
      "API Reference",
      "Blog",
      "Case Studies",
      "Support Center",
    ],
    Company: ["About Us", "Careers", "Press Kit", "Partners", "Contact"],
  };

  const socials = [
    { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
    { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
    { icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
    { icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: "hello@rookshms.com" },
    { icon: <Phone className="w-4 h-4" />, text: "+1 (800) 765-4321" },
    { icon: <MapPin className="w-4 h-4" />, text: "San Francisco, CA 94105" },
  ];

  return (
    <footer className="relative z-10 border-t border-white/[0.06]">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4ec9ff]/30 to-transparent" />

      {/* Main footer */}
      <div className="bg-[#040d19]">
        {/* Bottom bar */}
        <div className="border-t border-white/[0.05]">
          <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-600">
                <span>© 2025 Rooks HMS. All rights reserved.</span>
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "HIPAA Notice",
                ].map((item, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ color: "#9ca3af" }}
                    className="hover:text-gray-400 transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Made with</span>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-3.5 h-3.5 text-red-400/70 fill-current" />
                </motion.span>
                <span>for healthcare</span>
                <span className="mx-1 text-white/10">·</span>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                  <span className="text-emerald-400/80">
                    All systems operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─── Main component ────────────────────────────────────────────────────────── */
const RooksHmsLanding = () => {
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

  const heroImgY = useTransform(smoothProgress, [0, 0.35], [0, -60]);
  const heroBgY = useTransform(smoothProgress, [0, 0.4], [0, 120]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0.6]);

  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const docName = `Hms_${formData.name.replace(/\s+/g, "_")}_${Date.now()}`;
      await setDoc(doc(db, "Client Enquiry", docName), {
        ...formData,
        source: "Rooks HMS Landing",
        application: "Rooks HMS (Hospital Management System)",
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
      title: "Patient Management",
      desc: "Comprehensive EHR with medical history, admissions, discharge records, and real-time patient tracking.",
      color: "from-[#0B3470] to-[#1e4a8a]",
      metrics: "50K+ records",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Appointment Scheduling",
      desc: "Intelligent scheduling with automated reminders, wait time optimization, and resource allocation.",
      color: "from-[#0B3470] to-[#1a3a6a]",
      metrics: "98% efficiency",
    },
    {
      icon: <Pill className="w-5 h-5" />,
      title: "Pharmacy Management",
      desc: "Real-time inventory tracking, expiry alerts, automated reordering, and prescription management.",
      color: "from-[#0B3470] to-[#2a5a9a]",
      metrics: "Zero stockouts",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: "Billing & Insurance",
      desc: "Automated invoicing, insurance claim processing, payment tracking, and financial reporting.",
      color: "from-[#0B3470] to-[#1e4a8a]",
      metrics: "40% faster",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Security & Compliance",
      desc: "HIPAA-compliant architecture, role-based access, audit trails, and data encryption.",
      color: "from-[#0B3470] to-[#1a3a6a]",
      metrics: "100% compliant",
    },
    {
      icon: <BedDouble className="w-5 h-5" />,
      title: "Ward Management",
      desc: "Real-time bed availability, staff scheduling, resource allocation, and occupancy tracking.",
      color: "from-[#0B3470] to-[#1b4b8b]",
      metrics: "Real-time",
    },
    {
      icon: <HeartPulse className="w-5 h-5" />,
      title: "Clinical Documentation",
      desc: "Digital clinical notes, treatment plans, progress tracking, and voice-to-text integration.",
      color: "from-[#0B3470] to-[#1e4a8a]",
      metrics: "50% time saved",
    },
    {
      icon: <FileBarChart className="w-5 h-5" />,
      title: "Analytics & Reports",
      desc: "Customizable dashboards, predictive analytics, and automated regulatory reporting.",
      color: "from-[#0B3470] to-[#1a3a6a]",
      metrics: "Real-time insights",
    },
    {
      icon: <UserCog className="w-5 h-5" />,
      title: "Staff Management",
      desc: "HR tools for scheduling, payroll, performance tracking, and credential management.",
      color: "from-[#0B3470] to-[#1b4b8b]",
      metrics: "500+ staff",
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Patient Registration",
      desc: "Quick digital intake with demographic and insurance details",
    },
    {
      number: "02",
      title: "Appointment Scheduling",
      desc: "Real-time booking with automated reminders",
    },
    {
      number: "03",
      title: "Clinical Assessment",
      desc: "Digital documentation and treatment planning",
    },
    {
      number: "04",
      title: "Billing & Claims",
      desc: "Automated invoice generation and insurance processing",
    },
    {
      number: "05",
      title: "Reporting & Analytics",
      desc: "Comprehensive insights and compliance reports",
    },
  ];

  const benefits = [
    "Centralized patient data with secure role-based access",
    "Real-time updates across all hospital departments",
    "Automated billing and insurance claim processing",
    "Comprehensive clinical and operational analytics",
    "HIPAA-compliant architecture with audit trails",
    "24/7 dedicated support and regular updates",
  ];

  const noiseSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`;

  return (
    <div
      className="min-h-screen bg-[#060f1e] text-white antialiased overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
    >
      {/* ══ Global ambient background ══════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: noiseSvg }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,_#0B347028,_transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_90%,_#1e4a8a18,_transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(78,201,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(78,201,255,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          animate={{ x: [0, 90, -40, 0], y: [0, -80, 60, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[10%] w-[480px] h-[480px] bg-[#0B3470]/25 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -70, 50, 0], y: [0, 100, -60, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 right-[8%] w-[560px] h-[560px] bg-[#0d2a5e]/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -50, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#4ec9ff]/4 rounded-full blur-[100px]"
        />
      </div>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative pt-36 pb-24 px-5 md:px-8 lg:px-12 z-10"
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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B3470]/20 border border-[#4ec9ff]/20 backdrop-blur-md text-[#4ec9ff] text-sm font-medium tracking-wide">
                <motion.span
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
                Enterprise Healthcare Solution
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.08] tracking-[-0.02em]"
            >
              Complete Hospital
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #7dd3fc 0%, #4ec9ff 30%, #2563eb 65%, #1e4a8a 100%)",
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
                  Management System
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-gray-400 text-lg leading-relaxed max-w-[520px]"
            >
              Streamline patient records, appointments, billing, and staff
              operations with our comprehensive healthcare platform. Trusted by
              500+ medical institutions worldwide.
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
                  boxShadow: "0 0 32px 4px rgba(11,52,112,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-8 py-3.5 rounded-xl font-semibold text-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #0B3470 0%, #1e4a8a 60%, #2563eb 100%)",
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

            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex items-center gap-5 pt-2"
            >
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B3470] to-[#2563eb] border-2 border-[#060f1e] flex items-center justify-center text-[10px] font-bold shadow-md"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-semibold">10,000+</span>{" "}
                healthcare professionals
              </p>
            </motion.div>
          </motion.div>

          {/* Right – image with parallax */}
          <motion.div
            variants={fadeScale}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            style={{ y: heroImgY, opacity: heroOpacity }}
            className="relative"
          >
            <div className="absolute inset-[-20px] bg-gradient-to-br from-[#0B3470]/30 to-[#4ec9ff]/10 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_30px_80px_-10px_rgba(11,52,112,0.5)] bg-[#0B3470]/20 h-80 flex items-center justify-center">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_30px_80px_-10px_rgba(11,52,112,0.5)]">
                <img
                  src={hmsImg}
                  alt="HMS Dashboard"
                  className="w-full h-auto block"
                />
                {/* Overlay shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -24, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="absolute -bottom-5 -left-5 bg-[#060f1e]/90 backdrop-blur-xl px-4 py-3.5 rounded-xl border border-white/[0.08] shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/15 rounded-lg border border-emerald-500/20">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </motion.span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Active Patients
                  </p>
                  <p className="font-bold text-lg leading-tight">2,847</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24, y: -12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7, ease: EASE }}
              whileHover={{ scale: 1.05, y: 2 }}
              className="absolute -top-5 -right-5 bg-[#060f1e]/90 backdrop-blur-xl px-4 py-3.5 rounded-xl border border-white/[0.08] shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/15 rounded-lg border border-blue-500/20">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Avg. Wait Time
                  </p>
                  <p className="font-bold text-lg leading-tight">12 min</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════════════════ */}
      <section id="features" className="relative py-28 px-5 md:px-8 lg:px-12 z-10 scroll-mt-[70px]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#0B3470]/20 border border-[#4ec9ff]/15 rounded-full text-[#4ec9ff] text-xs font-semibold uppercase tracking-widest mb-5">
              Comprehensive Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] mb-5">
              Everything You Need to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#4ec9ff] to-[#2563eb]">
                Manage Your Hospital
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              A complete suite of tools designed to streamline operations,
              improve patient care, and increase efficiency.
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
                  className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#0B3470] via-[#4ec9ff] to-[#0B3470]"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#4ec9ff]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`p-2.5 bg-gradient-to-br ${feat.color} rounded-xl shadow-lg shadow-[#0B3470]/30`}
                    >
                      <motion.span
                        className="block"
                        whileHover={{ scale: 1.2, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {feat.icon}
                      </motion.span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#4ec9ff] bg-[#0B3470]/30 border border-[#4ec9ff]/15 px-2.5 py-1 rounded-full">
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

      {/* ══ ABOUT ════════════════════════════════════════════════════════════ */}
      <section id="solutions" className="relative py-28 px-5 md:px-8 lg:px-12 z-10 scroll-mt-[70px]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: EASE }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-1.5 bg-[#0B3470]/20 border border-[#4ec9ff]/15 rounded-full text-[#4ec9ff] text-xs font-semibold uppercase tracking-widest">
              Why Choose Rooks HMS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em]">
              Built for Modern
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#4ec9ff] to-[#2563eb]">
                Healthcare Workflows
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-lg">
              Our platform is designed to adapt to your hospital's unique needs,
              providing a seamless experience for administrators, doctors, and
              patients alike.
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
                    className="mt-0.5 flex-shrink-0 p-0.5 bg-gradient-to-br from-[#0B3470] to-[#4ec9ff] rounded-full"
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
                label: "Patient Records",
                value: "500K+",
                color: "from-blue-500/20 to-cyan-500/10",
                border: "border-blue-500/20",
              },
              {
                label: "Daily Transactions",
                value: "10K+",
                color: "from-purple-500/20 to-pink-500/10",
                border: "border-purple-500/20",
              },
              {
                label: "Active Users",
                value: "5K+",
                color: "from-orange-500/20 to-red-500/10",
                border: "border-orange-500/20",
              },
              {
                label: "Data Points",
                value: "1M+",
                color: "from-green-500/20 to-emerald-500/10",
                border: "border-green-500/20",
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
      <section id="resources" className="relative py-28 px-5 md:px-8 lg:px-12 z-10 scroll-mt-[70px]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#0B3470]/20 border border-[#4ec9ff]/15 rounded-full text-[#4ec9ff] text-xs font-semibold uppercase tracking-widest mb-5">
              Simple Workflow
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] mb-5">
              How It Works in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#4ec9ff] to-[#2563eb]">
                5 Simple Steps
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              From patient registration to discharge, streamline your entire
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
                className="h-full bg-gradient-to-r from-[#0B3470]/30 via-[#4ec9ff]/40 to-[#0B3470]/30"
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
                    <div className="w-14 h-14 rounded-full bg-[#060f1e] border border-[#0B3470]/50 flex items-center justify-center shadow-lg shadow-[#0B3470]/20 group-hover:border-[#4ec9ff]/50 group-hover:shadow-[#4ec9ff]/20 transition-all duration-400">
                      <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#7dd3fc] to-[#2563eb]">
                        {step.number}
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#4ec9ff]/10 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md" />
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

      {/* ══ REPORTS & ANALYTICS ═════════════════════════════════════════════ */}
      <section id="about" className="relative py-28 px-5 md:px-8 lg:px-12 z-10 scroll-mt-[70px]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#0B3470]/20 border border-[#4ec9ff]/15 rounded-full text-[#4ec9ff] text-xs font-semibold uppercase tracking-widest mb-5">
              Analytics & Insights
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] mb-5">
              Data-Driven Decisions with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#4ec9ff] to-[#2563eb]">
                Real-Time Reports
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Make informed decisions with comprehensive analytics and
              customizable reports.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="space-y-4"
            >
              {[
                "Real-time dashboard with key performance indicators",
                "Customizable reports for different departments",
                "Predictive analytics for patient inflow and resource allocation",
                "Automated regulatory compliance reporting",
                "Multi-format export (PDF, Excel, CSV)",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09, duration: 0.6, ease: EASE }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="mt-0.5 flex-shrink-0 p-0.5 bg-gradient-to-br from-[#0B3470] to-[#4ec9ff] rounded-full"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors leading-relaxed">
                    {item}
                  </span>
                </motion.div>
              ))}

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                {
                  label: "Patient Inflow",
                  icon: <Users className="w-7 h-7" />,
                },
                {
                  label: "Revenue Analytics",
                  icon: <DollarSign className="w-7 h-7" />,
                },
                {
                  label: "Inventory Status",
                  icon: <Pill className="w-7 h-7" />,
                },
                {
                  label: "Bed Occupancy",
                  icon: <BedDouble className="w-7 h-7" />,
                },
                {
                  label: "Staff Performance",
                  icon: <UserCog className="w-7 h-7" />,
                },
                {
                  label: "Discharge Summary",
                  icon: <FileText className="w-7 h-7" />,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
                  whileHover={{ scale: 1.07, y: -4 }}
                  className="group p-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] text-center cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4ec9ff]/0 to-[#0B3470]/0 group-hover:from-[#4ec9ff]/8 group-hover:to-[#0B3470]/20 transition-all duration-400 rounded-2xl" />
                  <div className="relative z-10">
                    <motion.span
                      className="inline-block mb-2.5 text-[#4ec9ff]"
                      whileHover={{ scale: 1.2, rotate: -8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.span>
                    <p className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors leading-snug">
                      {item.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-5 md:px-8 lg:px-12 z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative overflow-hidden rounded-3xl p-[1px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(11,52,112,0.8), rgba(78,201,255,0.3), rgba(11,52,112,0.8))",
            }}
          >
            <div
              className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0B3470 0%, #14326a 40%, #1a4a8a 70%, #0d2a5e 100%)",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08),_transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(78,201,255,0.08),_transparent_60%)]" />
              <motion.div
                animate={{ x: [0, 80, 0], y: [0, -80, 0] }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-20 -right-20 w-64 h-64 bg-white/[0.06] rounded-full blur-3xl"
              />
              <motion.div
                animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#4ec9ff]/10 rounded-full blur-3xl"
              />
              <div
                className="absolute inset-0 opacity-30"
                style={{ backgroundImage: noiseSvg }}
              />
              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="text-4xl md:text-5xl font-bold mb-4 tracking-[-0.02em]"
                >
                  Ready to Transform Your Hospital?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                  className="text-lg text-white/75 mb-10 max-w-xl mx-auto leading-relaxed"
                >
                  Join 500+ healthcare institutions already using Rooks HMS to
                  streamline operations and improve patient care.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                  className="flex flex-wrap justify-center gap-4"
                >
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{
                      scale: 1.06,
                      boxShadow: "0 0 36px 6px rgba(255,255,255,0.25)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="relative group px-10 py-4 bg-white text-[#0B3470] rounded-xl font-bold text-base shadow-lg overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4ec9ff]/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600" />
                    <span className="relative">Contact Us</span>
                  </motion.button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-10 flex flex-wrap justify-center gap-7 text-sm text-white/60"
                >
                  {[
                    {
                      icon: <Shield className="w-4 h-4" />,
                      text: "HIPAA Compliant",
                    },
                    {
                      icon: <Globe className="w-4 h-4" />,
                      text: "24/7 Support",
                    },
                    {
                      icon: <Clock className="w-4 h-4" />,
                      text: "99.9% Uptime",
                    },
                  ].map((b, i) => (
                    <motion.span
                      key={i}
                      whileHover={{
                        color: "rgba(255,255,255,0.9)",
                        scale: 1.05,
                      }}
                      className="flex items-center gap-2 transition-colors cursor-default"
                    >
                      {b.icon} {b.text}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <Footer />

      {/* ══ CONTACT MODAL ════════════════════════════════════════════════════ */}
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
              className="bg-[#0f141c] w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(11,52,112,0.15)] relative flex flex-col md:flex-row min-h-[550px] border border-white/5"
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
                  src={hospitalImage}
                  alt="HMS Healthcare Support"
                  className="w-full h-auto max-w-[320px] relative z-10 object-contain rounded-2xl shadow-2xl"
                />
                <div className="mt-10 text-center relative z-10 w-full">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4ec9ff] animate-pulse" />
                    <span className="text-[#4ec9ff] font-bold uppercase tracking-widest text-[10px]">Medical Command Center</span>
                  </div>
                  <h4 className="heading-font text-xl text-white mb-2">Empowering Digital Healthcare</h4>
                  <p className="text-white/40 text-xs italic text-center mx-auto max-w-[200px]">"Streamlining clinic and hospital operations with intelligent automation."</p>
                </div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#0B3470]/5 rounded-full blur-3xl" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
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
                      <h3 className="heading-font text-3xl font-bold text-white mb-4">Enquiry Received</h3>
                      <p className="text-white/40 text-sm">Our healthcare transformation specialist will contact you shortly to discuss your institution's needs.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <HeartPulse className="w-5 h-5 text-[#4ec9ff]" />
                        <span className="text-[#4ec9ff] font-bold text-xs tracking-widest uppercase">HMS Support</span>
                      </div>
                      <h3 className="heading-font text-4xl font-bold text-white mb-3">Partner with Us</h3>
                      <p className="text-white/40 mb-8 text-sm">Please fill out the form below and we'll help digitize your healthcare facility.</p>

                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        <div>
                          <label className="block text-[10px] font-bold text-white/30 mb-1.5 uppercase tracking-widest">Full Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Dr. Rajesh Patel"
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
                              placeholder="admin@hospital.com"
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
                            placeholder="Tell us about your facility (e.g., number of beds, specialty, key requirements)..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-5 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:bg-white/[0.06] focus:border-[#4ec9ff]/50 focus:ring-1 focus:ring-[#4ec9ff]/50 transition-all outline-none text-white resize-none placeholder:text-white/10"
                          />
                        </div>

                        <motion.button
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(11,52,112,0.5)" }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-gradient-to-r from-[#0B3470] to-[#2563eb] text-white font-bold rounded-xl transition-all uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                              Processing...
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

export default RooksHmsLanding;
