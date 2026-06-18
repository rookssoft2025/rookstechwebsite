import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { db } from "../../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  CheckSquare,
  ArrowRight,
  Play,
  Users,
  BarChart3,
  Clock,
  Zap,
  Shield,
  ChevronDown,
  Layers,
  Target,
  Activity,
  PlusCircle,
  ArrowUpRight,
  Check,
  X,
  SendHorizontal,
  Mail,
  Phone,
  MessageCircle,
  Bell,
  Briefcase,
  Globe,
  Lock,
  Star,
  Calendar,
  Smartphone,
  TrendingUp,
  Award,
  Server,
  Wrench,
  Barcode,
  Printer,
  CreditCard,
  CheckCircle2,
  Cloud,
  Hexagon,
  LayoutGrid,
  PanelTop,
  Circle,
  ArrowRightCircle,
  MessageSquare,
  PieChart,
  Database,
  GitBranch,
  Layers3,
  Sparkles,
  Gauge,
  UserCheck,
  FileText,
  Scan,
  RefreshCw,
  Settings,
  Workflow,
  Link,
  Cpu,
  HardDrive,
  Network,
  Radio,
  Monitor,
  Laptop,
  Tablet,
  AppWindow,
} from "lucide-react";
import ROOKSServicesNavbar from "../../components/layout/ROOKSServicesNavbar";
import ROOKSServicesFooter from "../../components/layout/ROOKSServicesFooter";
import rookserviceappLogo from "../../assets/mobile_apps_asstes/rookserviceapp (1).png";
import tmsimg from "../../assets/mobile_apps_asstes/RooksServiceApp.jpg";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
`;

const FEATURES = [
  {
    icon: <CheckSquare size={24} />,
    color: "#0B3470",
    title: "Multi-User Role System",
    desc: "Three distinct user types: Customer, Admin, and Engineer with tailored experiences for each.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=350&fit=crop",
    subFeatures: [
      "Customer - Normal & AMC",
      "Admin - Full Control",
      "Engineer - Service Management",
    ],
  },
  {
    icon: <Wrench size={24} />,
    color: "#10B981",
    title: "Ticket Management",
    desc: "Create, track, and assign service/delivery tickets with real-time updates.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=350&fit=crop",
    subFeatures: ["Ticket Creation", "Status Tracking", "Engineer Assignment"],
  },
  {
    icon: <Barcode size={24} />,
    color: "#8B5CF6",
    title: "Barcode Integration",
    desc: "Scan and identify barcodes for quick device management and tracking.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=350&fit=crop",
    subFeatures: [
      "Barcode Scanner",
      "Barcode Identifier",
      "Device Identification",
    ],
  },
  {
    icon: <Printer size={24} />,
    color: "#F59E0B",
    title: "Reports & Documentation",
    desc: "Generate and print comprehensive reports for customers and engineers.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=600&h=350&fit=crop",
    subFeatures: [
      "PDF Generation",
      "Report Printing",
      "Customer & Engineer Reports",
    ],
  },
];

const STEPS = [
  {
    num: "01",
    title: "Get Started",
    desc: "Download the app and choose your user role: Customer, Admin, or Engineer.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
  },
  {
    num: "02",
    title: "Login/Sign Up",
    desc: "Secure login with phone number and OTP verification for trusted authentication.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop",
  },
  {
    num: "03",
    title: "Create & Manage Tickets",
    desc: "Create service tickets, assign to engineers, or track your service requests.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=250&fit=crop",
  },
  {
    num: "04",
    title: "Complete Service",
    desc: "Engineers update status, upload images, and mark tickets as complete.",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=250&fit=crop",
  },
];

const DESIGNED_FOR = [
  {
    title: "Service Customers",
    desc: "Request and track services effortlessly.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
  },
  {
    title: "AMC Customers",
    desc: "Annual Maintenance Contract holders with dedicated support.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop",
  },
  {
    title: "Service Managers",
    desc: "Full control over operations and staff.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop",
  },
  {
    title: "Service Engineers",
    desc: "Manage assigned tickets and provide updates on the go.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop",
  },
  { 
    title: "Businesses", 
    desc: "Scale your service operations efficiently.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop",
  },
];

const BENEFITS = [
  {
    title: "Real-Time Updates",
    desc: "Instant notifications and live ticket status.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
  },
  {
    title: "Multi-Platform Support",
    desc: "Available on Android, iOS, Web, Windows, Linux, macOS.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
  },
  {
    title: "Professional Reports",
    desc: "Generate detailed reports in PDF format.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=250&fit=crop",
  },
  {
    title: "Secure & Reliable",
    desc: "Firebase-powered backend with enterprise-grade security.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop",
  },
];

const FAQs = [
  {
    question: "What platforms is Rooks Services App available on?",
    answer:
      "Rooks Services App is a multi-platform solution available on Android, iOS, Web, Windows, Linux, and macOS.",
  },
  {
    question: "What user roles are supported?",
    answer:
      "The app supports three main roles: Customers (Normal & AMC), Admins, and Service Engineers.",
  },
  {
    question: "Does it support barcode scanning?",
    answer:
      "Yes! The app includes a barcode scanner and identifier for quick device management.",
  },
  {
    question: "How is the data stored?",
    answer:
      "All data is securely stored in Firebase Cloud Firestore, with Firebase Storage for images and files.",
  },
];

const RooksServicesAppLanding = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [activeStep, setActiveStep] = useState(0);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [openFAQ, setOpenFAQ] = useState(null);
  const [activeFeature, setActiveFeature] = useState(0);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const docName = `RooksServicesApp_${formData.name.replace(/\s+/g, "_")}_${Date.now()}`;
      await setDoc(doc(db, "Client Enquiry", docName), {
        ...formData,
        application: "Rooks Services App",
        source: "Rooks Services App Landing",
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

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = setInterval(
      () => setActiveStep((p) => (p + 1) % STEPS.length),
      4000,
    );
    const featureId = setInterval(
      () => setActiveFeature((p) => (p + 1) % FEATURES.length),
      5000,
    );
    return () => {
      clearInterval(id);
      clearInterval(featureId);
    };
  }, []);

  const Chip = ({ children, className = "" }) => (
    <span
      className={`inline-flex items-center gap-x-2 bg-[#0B3470]/10 border border-[#0B3470]/20 text-[#0B3470] text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full ${className}`}
    >
      {children}
    </span>
  );

  const PrimaryButton = ({ children, className = "", onClick }) => (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-3 bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] hover:from-[#092a5a] hover:to-[#154a8a] text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#0B3470]/30 hover:shadow-[#0B3470]/50 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  const SecondaryButton = ({ children, className = "", onClick }) => (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <>
      <style>{FONTS}</style>
      <div className="min-h-screen bg-[#050a15] text-white font-['Inter'] overflow-x-hidden relative selection:bg-[#0B3470]/30">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] z-[200]"
          style={{ width: progressWidth }}
        />

        {/* Rooks Services Navbar */}
        <ROOKSServicesNavbar onCTAClick={() => setIsModalOpen(true)} />

        {/* ============================================ */}
        {/* 1. HERO SECTION - Premium Split Screen */}
        {/* ============================================ */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen flex items-center pt-32 pb-20 px-4 sm:px-6 overflow-hidden"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#0B3470]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-[#1a5a9a]/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0B3470]/[0.02] rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center py-10 w-full">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Chip className="mb-2">
                <Sparkles size={14} className="text-[#0B3470]" /> Next-Gen Service Management
              </Chip>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Streamline Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] block">
                  Service Operations
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                A comprehensive multi-platform service management solution built
                with Flutter and Firebase. Perfect for service businesses of all
                sizes.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <PrimaryButton onClick={() => setIsModalOpen(true)}>
                  Contact Us
                  <ArrowRight size={18} />
                </PrimaryButton>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400 pt-4">
                {[
                  {
                    icon: <Smartphone size={16} />,
                    label: "Multi-Platform",
                  },
                  { icon: <Users size={16} />, label: "3 User Roles" },
                  {
                    icon: <Bell size={16} />,
                    label: "Real-Time",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="text-[#0B3470]">{item.icon}</div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Enhanced with premium visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center items-center"
            >
              {/* Main Phone Mockup with Glassmorphism */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/0 border border-white/20 rounded-3xl p-3 backdrop-blur-xl shadow-2xl shadow-[#0B3470]/30">
                  <div className="relative rounded-2xl overflow-hidden bg-[#0a0f1a]">
                    <img
                      src={tmsimg}
                      alt="Rooks Services App Dashboard"
                      className="w-[320px] h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050a15]/60 via-transparent to-transparent" />
                    {/* Status Bar Simulation */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/50 to-transparent flex items-center justify-between px-4">
                      <span className="text-white/80 text-xs font-medium">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
                        <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
                        <div className="w-6 h-2 bg-white/60 rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Widget Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -top-8 -right-8 bg-[#0a1a3a]/95 backdrop-blur-xl border border-[#0B3470]/30 rounded-2xl p-4 shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B3470]/20 flex items-center justify-center">
                    <Check size={20} className="text-[#0B3470]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1000+</div>
                    <div className="text-xs text-gray-400">Tickets Managed</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-6 -left-8 bg-[#0a1a3a]/95 backdrop-blur-xl border border-[#10B981]/30 rounded-2xl p-3 shadow-xl z-20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                    <Users size={16} className="text-[#10B981]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">3 Roles</div>
                    <div className="text-[10px] text-gray-400">Customer · Admin · Engineer</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0 }}
                className="absolute top-1/2 -right-12 -translate-y-1/2 bg-[#0a1a3a]/95 backdrop-blur-xl border border-[#8B5CF6]/30 rounded-xl p-3 shadow-xl z-20 hidden lg:block"
              >
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">
                    <Bell size={14} className="text-[#8B5CF6]" />
                  </div>
                  <span className="text-[10px] text-gray-400">Real-Time</span>
                </div>
              </motion.div>

              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-[#0B3470]/5 blur-3xl rounded-full -z-10" />
            </motion.div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 2. FEATURES SECTION - Enhanced with Images */}
        {/* ============================================ */}
        <section id="features" className="py-24 px-4 sm:px-6 bg-[#050a15]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Features</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Powerful Features for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] block">
                  Every Operation
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore how Rooks Services App transforms service management with intelligent, role-based tools.
              </p>
            </div>

            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center py-16 border-b border-white/5 last:border-0`}
              >
                {/* Content Side */}
                <div className="lg:w-1/2 space-y-6">
                  <div
                    style={{ background: `${feature.color}20` }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10"
                  >
                    <div style={{ color: feature.color }} className="text-2xl">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">{feature.title}</h3>
                  <p className="text-lg text-gray-300">{feature.desc}</p>
                  <div className="space-y-3">
                    {feature.subFeatures.map((sub, j) => (
                      <div key={j} className="flex items-center gap-3 text-gray-300">
                        <Check size={18} className="text-[#0B3470] flex-shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Side - Enhanced */}
                <div className="lg:w-1/2">
                  <div className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-4 backdrop-blur-xl hover:border-[#0B3470]/30 transition-all duration-500 group">
                    <div className="relative rounded-2xl overflow-hidden bg-[#0a0f1a]">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050a15]/80 via-transparent to-transparent" />
                      {/* Feature-specific overlay badge */}
                      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-3 border border-white/10">
                        <div className="flex items-center gap-3">
                          <div style={{ color: feature.color }} className="text-xl">{feature.icon}</div>
                          <span className="text-sm font-medium text-white">{feature.title}</span>
                        </div>
                      </div>
                    </div>
                    {/* Glow effect */}
                    <div
                      className="absolute -inset-1 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ background: feature.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* 3. WHY CHOOSE US - Enhanced with Images */}
        {/* ============================================ */}
        <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#050a15] to-[#0a1020]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Why Choose Us</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Built for Scale,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] block">
                  Powered by Data
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Statistics */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "1000+", label: "Tickets Managed", icon: <CheckSquare size={20} /> },
                    { value: "99.9%", label: "Uptime", icon: <Gauge size={20} /> },
                    { value: "3", label: "User Roles", icon: <Users size={20} /> },
                    { value: "6", label: "Platforms", icon: <Globe size={20} /> },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-[#0B3470]/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#0B3470]/20 flex items-center justify-center text-[#0B3470]">
                        {stat.icon}
                      </div>
                      <div className="text-3xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-400">Growth</span>
                    <span className="text-[#10B981] text-sm font-bold">+24%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] rounded-full"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Q1</span>
                    <span>Q2</span>
                    <span>Q3</span>
                    <span>Q4</span>
                  </div>
                </div>
              </motion.div>

              {/* Right: Dashboard Preview - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-4 backdrop-blur-xl">
                  <div className="rounded-2xl overflow-hidden bg-[#0a0f1a]">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop" 
                      alt="Dashboard" 
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050a15]/60 via-transparent to-transparent" />
                  </div>
                  {/* Floating analytics card */}
                  <div className="absolute -bottom-4 -left-4 bg-[#0a1a3a]/95 backdrop-blur-xl border border-[#F59E0B]/30 rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                        <BarChart3 size={18} className="text-[#F59E0B]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold">Analytics</div>
                        <div className="text-[10px] text-gray-400">Real-time insights</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 4. HOW IT WORKS - Visual Workflow with Images */}
        {/* ============================================ */}
        <section id="how-it-works" className="py-24 px-4 sm:px-6 bg-[#050a15]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">How It Works</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                From Start to Service
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] block">
                  In 4 Simple Steps
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#0B3470]/20 via-[#1a5a9a]/20 to-[#0B3470]/20 -translate-y-1/2 hidden md:block" />

              {STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative group"
                >
                  <div
                    className={`bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#0B3470]/30 transition-all duration-300 relative z-10`}
                  >
                    {/* Image */}
                    <div className="relative h-32 overflow-hidden">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050a15]/80 via-transparent to-transparent" />
                      <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-gradient-to-br from-[#0B3470] to-[#1a5a9a] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {step.num}
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-400 text-sm">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

           
          </div>
        </section>

        {/* ============================================ */}
        {/* 5. BENEFITS - Enhanced with Images */}
        {/* ============================================ */}
     
<section id="benefits" className="py-24 px-4 sm:px-6 bg-[#050a15]">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <Chip className="mb-4 mx-auto">Benefits</Chip>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Benefits That
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] block">
          Drive Results
        </span>
      </h2>
    </div>

    {/* Custom Bento Grid Layout */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Row 1 */}
      {/* Card 1 - 75% width (3 columns) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="md:col-span-3 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl overflow-hidden hover:border-[#0B3470]/30 transition-all duration-300 group"
      >
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img 
            src={BENEFITS[0].image} 
            alt={BENEFITS[0].title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a15]/80 via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0B3470]/20 flex items-center justify-center flex-shrink-0">
              <Bell size={18} className="text-[#0B3470]" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{BENEFITS[0].title}</h3>
              <p className="text-gray-400 text-sm">{BENEFITS[0].desc}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 2 - 25% width (1 column) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="md:col-span-1 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl overflow-hidden hover:border-[#0B3470]/30 transition-all duration-300 group"
      >
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img 
            src={BENEFITS[1].image} 
            alt={BENEFITS[1].title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a15]/80 via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0B3470]/20 flex items-center justify-center flex-shrink-0">
              <Globe size={18} className="text-[#0B3470]" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{BENEFITS[1].title}</h3>
              <p className="text-gray-400 text-sm">{BENEFITS[1].desc}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Row 2 */}
      {/* Card 3 - 25% width (1 column) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="md:col-span-1 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl overflow-hidden hover:border-[#0B3470]/30 transition-all duration-300 group"
      >
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img 
            src={BENEFITS[2].image} 
            alt={BENEFITS[2].title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a15]/80 via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0B3470]/20 flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-[#0B3470]" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{BENEFITS[2].title}</h3>
              <p className="text-gray-400 text-sm">{BENEFITS[2].desc}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 4 - 75% width (3 columns) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="md:col-span-3 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl overflow-hidden hover:border-[#0B3470]/30 transition-all duration-300 group"
      >
        <div className="relative h-48 md:h-56 overflow-hidden">
          <img 
            src={BENEFITS[3].image} 
            alt={BENEFITS[3].title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a15]/80 via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0B3470]/20 flex items-center justify-center flex-shrink-0">
              <Shield size={18} className="text-[#0B3470]" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">{BENEFITS[3].title}</h3>
              <p className="text-gray-400 text-sm">{BENEFITS[3].desc}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

        {/* ============================================ */}
        {/* 6. DESIGNED FOR - Enhanced with Images */}
        {/* ============================================ */}
        <section id="designed-for" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#050a15] to-[#0a1020]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Designed For</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                One App for
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] block">
                  Every Role
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {DESIGNED_FOR.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-[#0B3470]/30 transition-all duration-300 group"
                >
                  <div className="relative h-32 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050a15]/80 via-transparent to-transparent" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 7. TECHNOLOGY - Architecture Diagram with Images */}
        {/* ============================================ */}
        <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#050a15] to-[#0a1020]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Technology Stack</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Built With
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] block">
                  Modern Architecture
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Architecture Diagram */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="flex flex-col items-center gap-3">
                    {/* Flutter */}
                    <div className="w-full bg-[#0B3470]/10 border border-[#0B3470]/20 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Smartphone size={24} className="text-[#0B3470]" />
                        <span className="font-bold text-lg">Flutter App</span>
                      </div>
                      <span className="text-xs text-gray-400">Cross-platform UI</span>
                    </div>

                    {/* Arrow */}
                    <ArrowDownIcon className="text-[#0B3470]/40" />

                    {/* Firebase */}
                    <div className="w-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Server size={24} className="text-[#F59E0B]" />
                        <span className="font-bold text-lg">Firebase</span>
                      </div>
                      <span className="text-xs text-gray-400">Backend-as-a-Service</span>
                    </div>

                    {/* Arrow */}
                    <ArrowDownIcon className="text-[#F59E0B]/40" />

                    {/* Firestore */}
                    <div className="w-full bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Database size={24} className="text-[#10B981]" />
                        <span className="font-bold text-lg">Firestore</span>
                      </div>
                      <span className="text-xs text-gray-400">Real-time Database</span>
                    </div>

                    {/* Arrow */}
                    <ArrowDownIcon className="text-[#10B981]/40" />

                    {/* Multi-Platform */}
                    <div className="w-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-xl p-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Globe size={24} className="text-[#8B5CF6]" />
                        <span className="font-bold text-lg">Multi-Platform</span>
                      </div>
                      <div className="flex justify-center gap-2 mt-2 text-xs text-gray-400">
                        <span>Android</span>
                        <span>iOS</span>
                        <span>Web</span>
                        <span>Windows</span>
                        <span>Linux</span>
                        <span>macOS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Tech Details with Images */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" 
                    alt="Technology Stack" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a15]/80 via-transparent to-transparent" />
                </div>
                
                {[
                  { icon: <Smartphone size={20} />, title: "Flutter", desc: "Cross-platform UI framework with native performance" },
                  { icon: <Cloud size={20} />, title: "Firebase", desc: "Auth, Firestore, Storage, and Cloud Messaging" },
                  { icon: <Bell size={20} />, title: "FCM Notifications", desc: "Push notifications for real-time updates" },
                  { icon: <Layers3 size={20} />, title: "Provider State", desc: "Efficient state management across the app" },
                ].map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#0B3470]/20 flex items-center justify-center flex-shrink-0 text-[#0B3470]">
                      {tech.icon}
                    </div>
                    <div>
                      <h4 className="font-bold">{tech.title}</h4>
                      <p className="text-sm text-gray-400">{tech.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 8. KEY FEATURES SUMMARY - Enhanced */}
        {/* ============================================ */}
        <section className="py-24 px-4 sm:px-6 bg-[#050a15]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Key Features</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] block">
                  In One Platform
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { icon: <Users size={18} />, label: "Multi-User Roles", color: "#0B3470" },
                { icon: <Wrench size={18} />, label: "Ticket Management", color: "#10B981" },
                { icon: <Scan size={18} />, label: "Barcode Scanning", color: "#8B5CF6" },
                { icon: <FileText size={18} />, label: "PDF Reports", color: "#F59E0B" },
                { icon: <Bell size={18} />, label: "Notifications", color: "#EF4444" },
                { icon: <Camera size={18} />, label: "Image Upload", color: "#06B6D4" },
                { icon: <CheckSquare size={18} />, label: "Status Tracking", color: "#10B981" },
                { icon: <Globe size={18} />, label: "Multi-Platform", color: "#8B5CF6" },
                { icon: <Lock size={18} />, label: "Secure Auth", color: "#F59E0B" },
                { icon: <RefreshCw size={18} />, label: "Real-Time", color: "#0B3470" },
                { icon: <Printer size={18} />, label: "Print Reports", color: "#EF4444" },
                { icon: <Star size={18} />, label: "AMC Support", color: "#06B6D4" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ scale: 1.05, backgroundColor: `rgba(11,52,112,0.15)` }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center cursor-pointer transition-all duration-300"
                >
                  <div 
                    className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center"
                    style={{ background: `${feature.color}20` }}
                  >
                    <div style={{ color: feature.color }}>{feature.icon}</div>
                  </div>
                  <span className="text-xs font-medium">{feature.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 9. FAQ SECTION - Enhanced */}
        {/* ============================================ */}
        <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-[#050a15] to-[#0a1020]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">FAQ</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Frequently Asked
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] block">
                  Questions
                </span>
              </h2>
            </div>

            <div className="space-y-3">
              {FAQs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[#0B3470]/30 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-lg hover:bg-white/5 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFAQ === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full bg-[#0B3470]/10 flex items-center justify-center flex-shrink-0"
                    >
                      <ChevronDown size={18} className="text-[#0B3470]" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFAQ === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-5 text-gray-300 border-t border-white/5"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* 10. CTA SECTION - Premium Product Showcase */}
        {/* ============================================ */}
        <section id="cta" className="py-32 px-4 relative">
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden bg-gradient-to-br from-[#0B3470] via-[#1a5a9a] to-[#0B3470] p-12 md:p-16 rounded-3xl text-center shadow-2xl shadow-[#0B3470]/30"
            >
              {/* Animated background */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_white_0%,_transparent_50%)] opacity-5" />
                <motion.div
                  animate={{
                    x: [0, 150, 0],
                    y: [0, -150, 0],
                  }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    x: [0, -150, 0],
                    y: [0, 150, 0],
                  }}
                  transition={{ duration: 25, repeat: Infinity }}
                  className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
                />
              </div>

              <div className="relative z-10">
                {/* Floating App Mockup */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="flex justify-center mb-8"
                >
                  <div className="relative">
                    <div className="w-48 h-96 bg-white/5 rounded-2xl border border-white/20 backdrop-blur-sm shadow-2xl overflow-hidden">
                      <div className="p-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
                          <img
                            src={rookserviceappLogo}
                            alt="Rooks Services App"
                            className="h-8 w-auto object-contain"
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="h-4 bg-white/10 rounded w-3/4 mx-auto"></div>
                          <div className="h-20 bg-white/5 rounded"></div>
                          <div className="h-10 bg-white/10 rounded"></div>
                          <div className="h-10 bg-white/10 rounded"></div>
                          <div className="h-10 bg-white/20 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-3xl -z-10" />
                  </div>
                </motion.div>

                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <img
                      src={rookserviceappLogo}
                      alt="Rooks Services App"
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <span className="font-bold text-xl text-white">
                    Rooks Services App
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Experience the Future of Service Management
                </h2>
                <p className="mb-8 text-xl text-white/90 max-w-2xl mx-auto">
                  Our app is now available on the Google Play Store. Download today and transform your service operations.
                </p>

                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.rooks.rooks_services_app&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center px-10 py-4 bg-white text-[#0B3470] rounded-xl font-bold text-lg gap-3 shadow-xl hover:shadow-2xl transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                    <path fill="#4caf50" d="M10,4.5c-0.2,0.2-0.4,0.6-0.4,1.1v36.8c0,0.5,0.2,0.9,0.4,1.1l0.1,0.1L30.2,24l-20.1-20.1L10,4.5z" />
                    <path fill="#ffeb3b" d="M36.2,30l-6-6l-6,6l0.1,0.1l7.1,4.1C33.2,35.3,34.9,35.3,36.2,30.7L36.2,30z" />
                    <path fill="#f44336" d="M10.1,43.4c0.1,0.1,0.3,0.1,0.5,0.1c0.7,0,1.4-0.2,1.9-0.5l23.7-13.6L30.2,24L10.1,43.4z" />
                    <path fill="#2196f3" d="M10.1,4.6l20.1,20.1l6-6L12.5,5.1C11.9,4.8,11.2,4.6,10.6,4.6C10.4,4.6,10.2,4.6,10.1,4.6z" />
                  </svg>
                  Get it on Google Play
                </motion.a>

                {/* Trust badges */}
                <div className="mt-12 flex justify-center gap-8 text-white/80 text-sm flex-wrap border-t border-white/20 pt-8">
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Secure & Encrypted
                  </span>
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Optimized Performance
                  </span>
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4" /> Enterprise Grade
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Rooks Services Footer */}
        <ROOKSServicesFooter />

        {/* ============================================ */}
        {/* CONTACT MODAL - Enhanced */}
        {/* ============================================ */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsModalOpen(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-[#0f1419] w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(11,52,112,0.3)] relative flex flex-col md:flex-row min-h-[500px] border border-white/10"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="md:w-1/2 bg-[#1a1f2e] flex flex-col items-center justify-center p-12 relative overflow-hidden border-r border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0B3470]/20 to-transparent pointer-events-none" />
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    src={tmsimg}
                    alt="Rooks Services App"
                    className="w-full h-auto max-w-[300px] relative z-10 object-contain rounded-2xl shadow-2xl"
                  />
                  <div className="mt-8 text-center relative z-10 w-full">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-[#0B3470] animate-pulse" />
                      <span className="text-[#0B3470] font-bold uppercase tracking-widest text-[10px]">
                        Service Management Cloud
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm max-w-[240px] mx-auto italic">
                      "Streamlining service operations with powerful simplicity."
                    </p>
                  </div>
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#0B3470]/10 rounded-full blur-3xl" />
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#1a5a9a]/10 rounded-full blur-3xl" />
                </div>

                <div className="md:w-1/2 p-8 md:p-12 bg-[#0f1419] flex flex-col justify-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {submitSuccess ? (
                      <div className="text-center space-y-6">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-400 border border-green-500/20">
                          <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">
                            Request Received
                          </h3>
                          <p className="text-gray-400">
                            Our team will reach out to you within 24 hours.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <Cloud className="w-5 h-5 text-[#0B3470]" />
                          <span className="text-[#0B3470] font-bold text-sm tracking-widest uppercase">
                            Rooks Services Support
                          </span>
                        </div>
                        <h3 className="text-4xl font-bold text-white mb-2">
                          Get in touch
                        </h3>
                        <p className="text-gray-400 mb-8">
                          Ready to streamline your service operations? Let's discuss your needs.
                        </p>

                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                              Full Name
                            </label>
                            <input
                              required
                              type="text"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#0B3470] focus:ring-1 focus:ring-[#0B3470] transition-all outline-none text-white placeholder:text-gray-600"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                                Email Address
                              </label>
                              <input
                                required
                                type="email"
                                placeholder="mail@enterprise.com"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#0B3470] focus:ring-1 focus:ring-[#0B3470] transition-all outline-none text-white placeholder:text-gray-600"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                                Phone Number
                              </label>
                              <input
                                required
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    phone: e.target.value,
                                  })
                                }
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#0B3470] focus:ring-1 focus:ring-[#0B3470] transition-all outline-none text-white placeholder:text-gray-600"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                              Message
                            </label>
                            <textarea
                              required
                              rows="3"
                              placeholder="Tell us about your project or business needs..."
                              value={formData.message}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  message: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#0B3470] focus:ring-1 focus:ring-[#0B3470] transition-all outline-none text-white resize-none placeholder:text-gray-600"
                            />
                          </div>

                          <motion.button
                            disabled={isSubmitting}
                            whileHover={{
                              scale: 1.02,
                              boxShadow: "0 0 20px rgba(11,52,112,0.4)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] text-white font-bold rounded-xl transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Submit Request"
                            )}
                          </motion.button>
                        </form>
                      </>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Helper Components
const ArrowDownIcon = ({ className = "" }) => (
  <div className={`flex justify-center py-1 ${className}`}>
    <ArrowRight className="rotate-90 w-5 h-5" />
  </div>
);

// Missing icon imports
const Camera = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

export default RooksServicesAppLanding;