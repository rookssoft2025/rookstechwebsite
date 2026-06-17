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
  Building2,
  ShoppingCart,
  UserCheck,
  MapPin,
  FileText,
  Users,
  TrendingUp,
  Zap,
  Shield,
  ArrowRight,
  Sparkles,
  X,
  Menu,
  CheckCircle2,
  DollarSign,
  Truck,
  BarChart3,
  CreditCard,
  Award,
} from "lucide-react";
import phoneImage from "../../assets/work/red_antique_telephone_1773891893640.png";
import vottoLogo from "../../assets/mobile_apps_asstes/votto.png";
import vottoPageImage from "../../assets/mobile_apps_asstes/vottopage.png";

// Votto color palette from Flutter app
const colors = {
  primary: "#D97732",
  primaryLight: "#E8984F",
  primaryDark: "#B8611F",
  backgroundDark: "#0A0E1A",
  surfaceDark: "#111827",
  cardDark: "#1A2035",
  borderDark: "#2A3148",
  textPrimary: "#FFFFFF",
  textSecondary: "#B0B0B0",
  textTertiary: "#6B7280",
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  info: "#3B82F6",
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
const VottoNavbar = ({ onOpenModal }) => {
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
    { label: "Roles", sectionId: "roles" },
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
            ? "bg-[#0A0E1A]/95 backdrop-blur-2xl border-b border-[#2A3148] shadow-[0_4px_40px_rgba(217,119,50,0.25)]"
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
              <img src={vottoLogo} alt="Votto" className="h-40 w-auto" />
            </motion.div>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={i}
                  onClick={() => scrollToSection(link.sectionId)}
                  whileHover={{ color: "#fff" }}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-[#B0B0B0] hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
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
                  boxShadow: "0 0 32px 4px rgba(217,119,50,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-5 py-2.5 rounded-xl font-semibold text-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #D97732 0%, #E8984F 100%)",
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
              className="lg:hidden p-2 rounded-lg border border-[#2A3148] bg-white/[0.04] text-[#B0B0B0] hover:text-white transition-colors"
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
            className="fixed inset-x-0 top-[70px] z-40 bg-[#0A0E1A]/98 backdrop-blur-2xl border-b border-[#2A3148] shadow-2xl lg:hidden"
          >
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={i}
                  onClick={() => scrollToSection(link.sectionId)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#B0B0B0] hover:text-white hover:bg-white/[0.04] transition-all text-sm font-medium"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-4 border-t border-[#2A3148] flex flex-col gap-3">
                <button
                  onClick={onOpenModal}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-white text-center"
                  style={{
                    background:
                      "linear-gradient(135deg, #D97732 0%, #E8984F 100%)",
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
const VottoFooter = () => {
  return (
    <footer className="relative z-10 border-t border-[#2A3148]">
      {/* Bottom bar */}
      <div className="border-t border-[#1F2937] bg-[#0A0E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-[#6B7280]">
              <span>© 2025 Votto Sanitary Ware. All rights reserved.</span>
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(
                (item, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ color: "#9ca3af" }}
                    className="hover:text-[#B0B0B0] transition-colors"
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
const VottoLanding = () => {
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
      const docName = `Votto_${formData.name.replace(/\s+/g, "_")}_${Date.now()}`;
      await setDoc(doc(db, "Client Enquiry", docName), {
        ...formData,
        source: "Votto Landing",
        application: "Votto Sanitary Ware Management System",
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
      title: "Dealer Management",
      desc: "Complete dealer lifecycle management from onboarding to performance tracking with automated workflows.",
      color: "from-[#D97732] to-[#E8984F]",
      metrics: "100% Customizable",
    },
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: "Procurement & Orders",
      desc: "Track orders, approve requests, and manage fulfillment with real-time status updates and admin remarks.",
      color: "from-[#D97732] to-[#B8611F]",
      metrics: "Enterprise Grade",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Real-time Location Tracking",
      desc: "GPS-based tracking for field teams with territory mapping and route optimization capabilities.",
      color: "from-[#D97732] to-[#E8984F]",
      metrics: "40% Faster",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Analytics & Reporting",
      desc: "Interactive charts and visualizations for sales metrics, performance analytics, and territory analysis.",
      color: "from-[#D97732] to-[#B8611F]",
      metrics: "Real-time",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "PDF Generation & Printing",
      desc: "Generate invoices, reports, and documents with printing and sharing capabilities.",
      color: "from-[#D97732] to-[#E8984F]",
      metrics: "Zero Stockouts",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Role-based Access Control",
      desc: "Secure multi-role system with custom permissions for Admin, Dealer, Salesman, and Marketing teams.",
      color: "from-[#D97732] to-[#B8611F]",
      metrics: "SOC2 Compliant",
    },
  ];

  const roles = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Admin",
      desc: "Full system access, dealer and staff management, order processing, global inventory, and performance analytics.",
      color: "from-orange-500/20 to-amber-500/10",
      border: "border-orange-500/20",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Dealer",
      desc: "Inventory management, procurement, salesman tracking, performance analytics, and service ticket management.",
      color: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/20",
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Salesman",
      desc: "Record sales, view personal performance, leaderboard rankings, and submit service requests for customers.",
      color: "from-orange-500/20 to-red-500/10",
      border: "border-orange-500/20",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Marketing",
      desc: "Field visit tracking, order capture, territory analytics, location tracking, and conversion rate analysis.",
      color: "from-amber-500/20 to-yellow-500/10",
      border: "border-amber-500/20",
    },
  ];

  const benefits = [
    "Centralized data with secure role-based access",
    "Real-time updates across all departments",
    "Automated procurement and inventory management",
    "Comprehensive sales and operational analytics",
    "Secure architecture with audit trails",
    "24/7 dedicated support and regular updates",
  ];

  const processSteps = [
    {
      number: "01",
      title: "Dealer Onboarding",
      desc: "Quick digital intake with complete business details",
    },
    {
      number: "02",
      title: "Order Placement",
      desc: "Easy order creation and fulfillment tracking",
    },
    {
      number: "03",
      title: "Inventory Tracking",
      desc: "Real-time stock management and updates",
    },
    {
      number: "04",
      title: "Sales Recording",
      desc: "Field sales capture and leaderboard updates",
    },
    {
      number: "05",
      title: "Reporting & Analytics",
      desc: "Comprehensive insights and business performance reports",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white antialiased overflow-x-hidden">
      {/* ══ Global ambient background ══════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,_#D9773228,_transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_90%,_#B8611F18,_transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(217,119,50,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,50,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <motion.div
          animate={{ x: [0, 90, -40, 0], y: [0, -80, 60, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-[10%] w-[480px] h-[480px] bg-[#D97732]/25 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -70, 50, 0], y: [0, 100, -60, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 right-[8%] w-[560px] h-[560px] bg-[#E8984F]/20 rounded-full blur-[140px]"
        />
      </div>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <VottoNavbar onOpenModal={() => setIsModalOpen(true)} />

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
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D97732]/20 border border-[#D97732]/30 backdrop-blur-md text-[#E8984F] text-sm font-medium tracking-wide">
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
                Sanitary Ware Management Solution
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
                    "linear-gradient(135deg, #E8984F 0%, #D97732 30%, #B8611F 65%, #300808 100%)",
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
                  Sanitary Ware Business
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-[#B0B0B0] text-lg leading-relaxed max-w-[520px]"
            >
              Streamline your entire sanitary ware business with our powerful,
              user-friendly Management System designed for dealers, salesmen,
              and marketing teams.
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
                  boxShadow: "0 0 32px 4px rgba(217,119,50,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative group px-8 py-3.5 rounded-xl font-semibold text-sm overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #D97732 0%, #E8984F 100%)",
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

          {/* Right – Votto Page Image */}
          <motion.div
            variants={fadeScale}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="absolute inset-[-20px] bg-gradient-to-br from-[#D97732]/30 to-[#B8611F]/10 rounded-3xl blur-2xl" />
            <img
              src={vottoPageImage}
              alt="Votto Platform"
              className="w-full h-auto rounded-2xl shadow-2xl shadow-[#D97732]/20 relative z-10"
            />
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
            <span className="inline-block px-4 py-1.5 bg-[#D97732]/20 border border-[#D97732]/15 rounded-full text-[#E8984F] text-xs font-semibold uppercase tracking-widest mb-5">
              Powerful Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] mb-5">
              Everything You Need to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8984F] via-[#D97732] to-[#B8611F]">
                Manage Your Business
              </span>
            </h2>
            <p className="text-[#B0B0B0] text-base leading-relaxed">
              A complete suite of tools designed to streamline operations,
              enhance productivity, and improve efficiency for your sanitary
              ware business.
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
                className="group relative p-6 rounded-2xl border border-[#2A3148] bg-white/[0.025] backdrop-blur-sm overflow-hidden cursor-default"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 rounded-2xl`}
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#D97732] via-[#E8984F] to-[#D97732]"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E8984F]/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`p-2.5 bg-gradient-to-br ${feat.color} rounded-xl shadow-lg shadow-[#D97732]/30`}
                    >
                      <motion.span
                        className="block"
                        whileHover={{ scale: 1.2, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {feat.icon}
                      </motion.span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#E8984F] bg-[#D97732]/30 border border-[#D97732]/15 px-2.5 py-1 rounded-full">
                      {feat.metrics}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-white/90 group-hover:text-white transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed group-hover:text-[#B0B0B0] transition-colors">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ ROLES ════════════════════════════════════════════════════════ */}
      <section
        id="roles"
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
            <span className="inline-block px-4 py-1.5 bg-[#D97732]/20 border border-[#D97732]/15 rounded-full text-[#E8984F] text-xs font-semibold uppercase tracking-widest mb-5">
              User Roles
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] mb-5">
              Designed for Every
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8984F] via-[#D97732] to-[#B8611F]">
                Role in Your Business
              </span>
            </h2>
            <p className="text-[#B0B0B0] text-base leading-relaxed">
              Our system provides tailored experiences for Admin, Dealers,
              Salesmen, and Marketing teams.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {roles.map((role, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: EASE },
                }}
                className={`group relative p-6 rounded-2xl border ${role.border} bg-gradient-to-br ${role.color} backdrop-blur-sm overflow-hidden cursor-default`}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D97732]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="mb-5 p-3 bg-gradient-to-br from-[#D97732] to-[#E8984F] rounded-xl w-fit shadow-lg shadow-[#D97732]/30">
                    <motion.span
                      className="block"
                      whileHover={{ scale: 1.2, rotate: 8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {role.icon}
                    </motion.span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-white/90 group-hover:text-white transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-[#B0B0B0] text-sm leading-relaxed group-hover:text-[#D0D0D0] transition-colors">
                    {role.desc}
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
            <span className="inline-block px-4 py-1.5 bg-[#D97732]/20 border border-[#D97732]/15 rounded-full text-[#E8984F] text-xs font-semibold uppercase tracking-widest">
              Why Choose Votto
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em]">
              Built for Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8984F] via-[#D97732] to-[#B8611F]">
                Sanitary Ware Business
              </span>
            </h2>
            <p className="text-[#B0B0B0] text-base leading-relaxed max-w-lg">
              Our system is designed specifically for the sanitary ware industry
              to simplify operations, enhance communication, and boost your
              overall efficiency.
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
                    className="mt-0.5 flex-shrink-0 p-0.5 bg-gradient-to-br from-[#D97732] to-[#E8984F] rounded-full"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                  <span className="text-[#B0B0B0] text-sm group-hover:text-[#D0D0D0] transition-colors leading-relaxed">
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
                label: "Dealers",
                value: "500+",
                color: "from-orange-500/20 to-amber-500/10",
                border: "border-orange-500/20",
              },
              {
                label: "Salesmen",
                value: "2K+",
                color: "from-amber-500/20 to-orange-500/10",
                border: "border-amber-500/20",
              },
              {
                label: "Orders/Day",
                value: "1K+",
                color: "from-orange-500/20 to-red-500/10",
                border: "border-orange-500/20",
              },
              {
                label: "Transactions",
                value: "1M+",
                color: "from-amber-500/20 to-yellow-500/10",
                border: "border-amber-500/20",
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
                  <div className="text-sm text-[#B0B0B0]">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ PROCESS ═════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 z-10 scroll-mt-[70px]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-[#D97732]/20 border border-[#D97732]/15 rounded-full text-[#E8984F] text-xs font-semibold uppercase tracking-widest mb-5">
              Simple Workflow
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-[-0.02em] mb-5">
              How It Works in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8984F] via-[#D97732] to-[#B8611F]">
                5 Simple Steps
              </span>
            </h2>
            <p className="text-[#B0B0B0] text-base leading-relaxed">
              From dealer onboarding to transaction recording, streamline your
              entire workflow with our intuitive platform.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute top-[3.5rem] left-[10%] w-[80%] h-px hidden lg:block overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-[#D97732]/30 via-[#E8984F]/40 to-[#D97732]/30"
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
                    <div className="w-14 h-14 rounded-full bg-[#0A0E1A] border border-[#D97732]/50 flex items-center justify-center shadow-lg shadow-[#D97732]/20 group-hover:border-[#E8984F]/50 group-hover:shadow-[#E8984F]/20 transition-all duration-400">
                      <span className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#E8984F] to-[#B8611F]">
                        {step.number}
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-[#E8984F]/10 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-md" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2 text-white/90">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">
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
            className="relative overflow-hidden bg-gradient-to-br from-[#050A19] via-[#D97732]/20 to-[#300808] p-16 rounded-3xl text-center shadow-2xl shadow-[#D97732]/30 border border-[#2A3148]"
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
                    id="grid-votto"
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
                <rect width="100%" height="100%" fill="url(#grid-votto)" />
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
                <img src={vottoLogo} alt="Votto" className="h-24 w-auto" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold mb-4 text-white"
              >
                Experience the Future of Sanitary Ware Management
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 text-xl text-white/90"
              >
                Streamline orders, inventory, sales, and your entire team - all
                from one powerful platform.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#D97732] rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
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
      <VottoFooter />

      {/* ══ CONTACT MODAL ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#111827] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl shadow-[#D97732]/30 relative flex flex-col md:flex-row min-h-[500px]"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#B0B0B0] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Side: Image/Branding */}
              <div className="md:w-1/2 bg-gradient-to-br from-[#1A2035] to-[#111827] flex flex-col items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#D97732/20,_transparent_50%)] pointer-events-none" />
                <motion.img
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  src={phoneImage}
                  alt="Support"
                  className="w-full h-auto max-w-[280px] relative z-10 object-contain opacity-90"
                />
                <div className="mt-8 text-center relative z-10">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#D97732] animate-pulse" />
                    <span className="text-[#E8984F] font-bold uppercase tracking-widest text-xs">
                      Customer Service
                    </span>
                  </div>
                  <p className="text-[#B0B0B0] text-sm max-w-[200px]">
                    Our expert team is here to help you revolutionize your
                    sanitary ware business.
                  </p>
                </div>
                {/* Decorative circle */}
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#D97732]/20 rounded-full blur-3xl" />
              </div>

              {/* Right Side: Form */}
              <div className="md:w-1/2 p-8 md:p-12 bg-[#111827] flex flex-col justify-center">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {submitSuccess ? (
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto text-[#10B981] border border-[#10B981]/20">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">
                        Thank You!
                      </h3>
                      <p className="text-[#B0B0B0] text-lg">
                        Your enquiry has been received. We'll get back to you
                        soon.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E8984F] to-[#D97732] mb-2">
                        Need support?
                      </h3>
                      <p className="text-[#B0B0B0] mb-8">
                        Contact us if you need further assistance.
                      </p>

                      <form className="space-y-4" onSubmit={handleFormSubmit}>
                        <div>
                          <label className="block text-sm font-medium text-[#D0D0D0] mb-1">
                            Name and surname
                          </label>
                          <input
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-[#1A2035] border border-[#2A3148] rounded-xl focus:bg-[#1A2035] focus:ring-2 focus:ring-[#D97732] transition-all outline-none text-white"
                            placeholder="Enter your name"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-[#D0D0D0] mb-1">
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
                              className="w-full px-4 py-3 bg-[#1A2035] border border-[#2A3148] rounded-xl focus:bg-[#1A2035] focus:ring-2 focus:ring-[#D97732] transition-all outline-none text-white"
                              placeholder="mail@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#D0D0D0] mb-1">
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
                              className="w-full px-4 py-3 bg-[#1A2035] border border-[#2A3148] rounded-xl focus:bg-[#1A2035] focus:ring-2 focus:ring-[#D97732] transition-all outline-none text-white"
                              placeholder="+1 (234) 567-890"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#D0D0D0] mb-1">
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
                            className="w-full px-4 py-3 bg-[#1A2035] border border-[#2A3148] rounded-xl focus:bg-[#1A2035] focus:ring-2 focus:ring-[#D97732] transition-all outline-none text-white resize-none"
                            placeholder="How can we help you?"
                          />
                        </div>

                        <motion.button
                          disabled={isSubmitting}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 30px rgba(217,119,50,0.5)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-gradient-to-r from-[#D97732] to-[#E8984F] text-white font-bold rounded-xl shadow-lg shadow-[#D97732]/30 transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

export default VottoLanding;
