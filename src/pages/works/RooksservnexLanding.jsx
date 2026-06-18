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
  Cloud,
  ArrowRight,
  Play,
  Lock,
  Users,
  BarChart3,
  Zap,
  Settings,
  Palette,
  CreditCard,
  Code,
  Globe,
  CheckCircle2,
  Sparkles,
  Shield,
  TrendingUp,
  Award,
  Layers,
  Database,
  Smartphone,
  Webhook,
  Menu,
  X,
  Star,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ChevronRight,
  Clock,
  DollarSign,
  Cpu,
  Network,
  HardDrive,
  MapPin,
  FileText,
  ShoppingCart,
  UserCheck,
  Target,
  Briefcase,
} from "lucide-react";

import cloudImage from "../../assets/work/cloud_support_servnex_1773896047966.png";
import ServnexNavbar from "../../components/layout/ServnexNavbar";
import ServnexFooter from "../../components/layout/ServnexFooter";
import servnexLogo from "../../assets/mobile_apps_asstes/servnex.png";
import servnexPageImage from "../../assets/mobile_apps_asstes/servnexpage.jpg";

// Import new images for enhanced visual sections
// Note: These would be actual image imports in a real project
// For demo, we'll use placeholder SVGs or descriptive content
// In production, replace with actual images from assets folder

const RooksservnexLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 0.8, 0.8, 0.4],
  );

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
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const docName = `Servnex_${formData.name.replace(/\s+/g, "_")}_${Date.now()}`;
      await setDoc(doc(db, "Client Enquiry", docName), {
        ...formData,
        application: "Rooks Servnex",
        source: "Servnex Landing",
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
      icon: <Palette className="w-8 h-8" />,
      title: "White-Label Customization",
      desc: "Fully customize branding, colors, logos, and domain names for your clients with complete design freedom.",
      color: "from-[#2d5a9b] to-[#5e72e4]",
      stats: "100% Customizable",
      gradient: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      image: "https://via.placeholder.com/400x300/2d5a9b/FFFFFF?text=White+Label+Dashboard",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Tenant Architecture",
      desc: "Isolate data and workspaces for each client with complete privacy, security, and independent scaling.",
      color: "from-[#2d5a9b] to-[#1a3a6a]",
      stats: "Enterprise Grade",
      gradient: "bg-gradient-to-br from-indigo-500/20 to-blue-500/20",
      image: "https://via.placeholder.com/400x300/1a3a6a/FFFFFF?text=Multi-Tenant+Architecture",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Role-Based Access Control",
      desc: "Granular permissions with admin, manager, and user roles for each organization with audit logs.",
      color: "from-[#2d5a9b] to-[#4a6a9a]",
      stats: "SOC2 Compliant",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      image: "https://via.placeholder.com/400x300/4a6a9a/FFFFFF?text=Role-Based+Access",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Subscription Management",
      desc: "Built-in billing, payment processing, and subscription tier management with automated invoicing.",
      color: "from-[#2d5a9b] to-[#5e72e4]",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      image: "https://via.placeholder.com/400x300/5e72e4/FFFFFF?text=Subscription+Management",
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Powerful API & Webhooks",
      desc: "RESTful API with comprehensive documentation and real-time webhooks for seamless integration.",
      color: "from-[#2d5a9b] to-[#1a3a6a]",
      stats: "99.9% Uptime",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      image: "https://via.placeholder.com/400x300/1a3a6a/FFFFFF?text=API+Integration",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      desc: "Real-time dashboards and insights for each client organization with custom report generation.",
      color: "from-[#2d5a9b] to-[#4a6a9a]",
      stats: "Real-time Data",
      gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
      image: "https://via.placeholder.com/400x300/4a6a9a/FFFFFF?text=Analytics+Dashboard",
    },
  ];

  // Enhanced feature data with specific Votto business icons
  const enhancedFeatures = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dealer Management",
      desc: "Complete dealer lifecycle management with onboarding, KYC verification, and performance tracking.",
      color: "from-[#2d5a9b] to-[#5e72e4]",
      gradient: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      image: "https://via.placeholder.com/400x300/2d5a9b/FFFFFF?text=Dealer+Management",
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Procurement & Orders",
      desc: "Streamlined procurement workflows with automated order processing and inventory synchronization.",
      color: "from-[#2d5a9b] to-[#1a3a6a]",
      gradient: "bg-gradient-to-br from-indigo-500/20 to-blue-500/20",
      image: "https://via.placeholder.com/400x300/1a3a6a/FFFFFF?text=Procurement+Orders",
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Real-time Location Tracking",
      desc: "Track dealer locations, deliveries, and field operations with GPS-enabled real-time monitoring.",
      color: "from-[#2d5a9b] to-[#4a6a9a]",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      image: "https://via.placeholder.com/400x300/4a6a9a/FFFFFF?text=Location+Tracking",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics & Reporting",
      desc: "Comprehensive analytics dashboards with custom reports for sales performance, dealer insights, and market trends.",
      color: "from-[#2d5a9b] to-[#5e72e4]",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      image: "https://via.placeholder.com/400x300/5e72e4/FFFFFF?text=Analytics+Reporting",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "PDF Generation",
      desc: "Automated PDF report generation for invoices, purchase orders, delivery receipts, and business documents.",
      color: "from-[#2d5a9b] to-[#1a3a6a]",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      image: "https://via.placeholder.com/400x300/1a3a6a/FFFFFF?text=PDF+Generation",
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Role-based Access Control",
      desc: "Granular permissions for admins, dealers, salesmen, and marketing teams with enterprise-grade security.",
      color: "from-[#2d5a9b] to-[#4a6a9a]",
      gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20",
      image: "https://via.placeholder.com/400x300/4a6a9a/FFFFFF?text=Access+Control",
    },
  ];

  // Process steps with visual content
  const processSteps = [
    {
      step: "01",
      label: "Dealer Onboarding",
      icon: UserCheck,
      desc: "Seamless registration and KYC verification",
      image: "https://via.placeholder.com/200x150/2d5a9b/FFFFFF?text=Onboarding",
    },
    {
      step: "02",
      label: "Order Placement",
      icon: ShoppingCart,
      desc: "Streamlined procurement and ordering",
      image: "https://via.placeholder.com/200x150/1a3a6a/FFFFFF?text=Order+Placement",
    },
    {
      step: "03",
      label: "Inventory Tracking",
      icon: Database,
      desc: "Real-time stock and inventory management",
      image: "https://via.placeholder.com/200x150/4a6a9a/FFFFFF?text=Inventory",
    },
    {
      step: "04",
      label: "Sales Recording",
      icon: TrendingUp,
      desc: "Automated sales logging and tracking",
      image: "https://via.placeholder.com/200x150/5e72e4/FFFFFF?text=Sales",
    },
    {
      step: "05",
      label: "Reporting & Analytics",
      icon: BarChart3,
      desc: "Comprehensive insights and analytics",
      image: "https://via.placeholder.com/200x150/2d5a9b/FFFFFF?text=Analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1f] text-white overflow-hidden font-sans">
      {/* Servnex Navbar */}
      <ServnexNavbar onCTAClick={() => setIsModalOpen(true)} />

      {/* Custom Cursor Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-screen">
        <div
          className="absolute w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{ left: "50%", top: "50%" }}
        />
      </div>

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#2d5a9b30,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#5e72e420,_transparent_50%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2d5a9b] to-transparent" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-64 h-64 bg-[#2d5a9b]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#5e72e4]/10 rounded-full blur-3xl"
        />
      </div>

      {/* ================= HERO ================= */}
      <section id="hero" ref={heroRef} className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
            >
              <motion.div
                variants={fadeInUp}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2d5a9b]/20 to-[#5e72e4]/20 rounded-full border border-[#2d5a9b]/30 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-[#6dd5ff]" />
                <span className="text-[#6dd5ff] text-sm font-medium">
                  Introducing Servnex 1.0
                </span>
                <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs text-white">
                  New
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                The Complete{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dd5ff] via-[#2d5a9b] to-[#5e72e4]">
                  White-Label SaaS
                </span>
                <br />
                Platform for Scale
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-gray-400 mb-8 max-w-xl text-lg leading-relaxed"
              >
                Deploy multi-tenant subscription services with enterprise-grade
                security, complete customization, and seamless integration.
                Built for companies that need to scale fast.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex justify-center gap-4"
              >
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#2d5a9b] to-[#5e72e4] rounded-xl flex items-center gap-2 font-semibold overflow-hidden"
                >
                  <span className="relative z-10">Contact Us</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#5e72e4] to-[#2d5a9b]"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* RIGHT - Enhanced with premium device mockup */}
            <motion.div
              variants={fadeInScale}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
              className="relative"
            >
              <motion.div animate={floatAnimation} className="relative z-10">
                <div className="relative rounded-2xl shadow-2xl shadow-[#2d5a9b]/20 overflow-hidden border border-white/10 backdrop-blur-sm">
                  <img
                    src={servnexPageImage}
                    alt="Servnex Platform"
                    className="w-full h-auto"
                  />
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1f]/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2d5a9b]/30 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#5e72e4]/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider px-4 py-2 bg-cyan-400/10 rounded-full">
              Enterprise Features
            </span>
            <h2 className="text-5xl font-bold mb-6 mt-4">
              Everything You Need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6dd5ff] to-[#5e72e4]">
                Scale Your Business
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Comprehensive enterprise features designed for scalable SaaS
              deployment, multi-tenant management, and complete operational
              control
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {enhancedFeatures.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-[#2d5a9b]/50 transition-all backdrop-blur-sm overflow-hidden"
                onHoverStart={() => setActiveFeature(i)}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${item.gradient}`}
                />

                {/* Image/Illustration */}
                <div className="relative z-10 mb-6 rounded-xl overflow-hidden border border-white/10 group-hover:border-[#2d5a9b]/30 transition-all">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1f]/60 via-transparent to-transparent" />
                </div>

                <div
                  className={`mb-4 p-3 bg-gradient-to-br ${item.color} rounded-xl w-fit text-white shadow-lg shadow-[#2d5a9b]/20 relative z-10`}
                >
                  {item.icon}
                </div>

                <div className="flex justify-between items-start mb-2 relative z-10">
                  <h3 className="font-bold text-xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#6dd5ff] group-hover:to-white transition-all">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-400 group-hover:text-gray-300 transition-colors relative z-10">
                  {item.desc}
                </p>

                {/* Animated line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#2d5a9b] to-[#6dd5ff]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= USER ROLES ================= */}
      <section id="roles" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider px-4 py-2 bg-cyan-400/10 rounded-full">
              User Management
            </span>
            <h2 className="text-5xl font-bold mb-4 mt-4">
              Flexible Role-Based Access
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Control who sees what with granular permission settings for every
              user role
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                role: "Administrator",
                color: "from-red-500 to-pink-500",
                icon: Shield,
                image: "https://via.placeholder.com/400x200/2d5a9b/FFFFFF?text=Admin+Dashboard",
                permissions: [
                  "Full system access",
                  "User management",
                  "Billing & payments",
                  "Custom branding",
                  "API keys",
                  "Security settings",
                ],
              },
              {
                role: "Dealer",
                color: "from-blue-500 to-cyan-500",
                icon: Users,
                image: "https://via.placeholder.com/400x200/1a3a6a/FFFFFF?text=Dealer+Portal",
                permissions: [
                  "Inventory management",
                  "Order processing",
                  "Dealer analytics",
                  "Sales reporting",
                  "Customer management",
                  "Location tracking",
                ],
              },
              {
                role: "Salesman",
                color: "from-green-500 to-emerald-500",
                icon: Star,
                image: "https://via.placeholder.com/400x200/4a6a9a/FFFFFF?text=Sales+App",
                permissions: [
                  "View dashboards",
                  "Submit requests",
                  "Access assigned tools",
                  "Profile management",
                  "Limited reports",
                  "Basic operations",
                ],
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className={`relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-sm group overflow-hidden`}
                >
                  {/* Role Image */}
                  <div className="relative mb-6 rounded-xl overflow-hidden border border-white/10">
                    <img 
                      src={item.image} 
                      alt={item.role}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1f]/80 via-transparent to-transparent" />
                  </div>

                  {/* Role Icon */}
                  <div
                    className={`p-4 bg-gradient-to-br ${item.color} rounded-xl inline-block mb-4 text-white relative z-10`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 relative z-10">
                    {item.role}
                  </h3>

                  <ul className="space-y-3 relative z-10">
                    {item.permissions.map((perm, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.05 }}
                        className="flex items-center gap-2 text-gray-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                        {perm}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Role Badge */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span
                      className={`text-xs px-3 py-1 bg-gradient-to-r ${item.color} bg-opacity-20 rounded-full text-white`}
                    >
                      {item.role} Access Level
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider px-4 py-2 bg-cyan-400/10 rounded-full">
              Simple Process
            </span>
            <h2 className="text-5xl font-bold mb-4 mt-4">
              Launch in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                5 Simple Steps
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
              Get your white-label SaaS platform up and running in no time
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4 relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 hidden md:block" />

            {processSteps.map((item, i) => {
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
                  <div className="p-6 bg-gradient-to-b from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="relative mb-4">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 opacity-20">
                        {item.step}
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Step Image */}
                    <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                      <img 
                        src={item.image} 
                        alt={item.label}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2">{item.label}</h3>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section id="benefits" className="py-32 px-4 relative">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider px-4 py-2 bg-cyan-400/10 rounded-full inline-block mb-6">
              Why Choose Servnex
            </span>
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              Scale Your Business{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Without the Complexity
              </span>
            </h2>

            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              Servnex handles all the heavy lifting — infrastructure, security,
              scaling, and compliance. Focus on growing your business while we
              handle the technology.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Launch in days, not months",
                "99.9% uptime guarantee with enterprise SLA",
                "Bank-level security and encryption",
                "Automatic scaling for unlimited growth",
                "Multi-language and multi-currency support",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="p-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main dashboard image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-[#2d5a9b]/20">
              <img 
                src="https://via.placeholder.com/800x600/2d5a9b/FFFFFF?text=Business+Analytics+Dashboard"
                alt="Business Analytics Dashboard"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1f]/60 via-transparent to-transparent" />
            </div>
            
            {/* Floating metric cards */}
            <div className="absolute -top-4 -right-4 bg-[#0a0f1f]/90 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">+47.8%</p>
                  <p className="text-xs text-gray-400">Revenue Growth</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-[#0a0f1f]/90 backdrop-blur-sm p-4 rounded-xl border border-white/10 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2,847</p>
                  <p className="text-xs text-gray-400">Active Dealers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section id="cta" className="py-32 px-4 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#2d5a9b] via-[#5e72e4] to-[#2d5a9b] p-16 rounded-3xl text-center shadow-2xl shadow-[#2d5a9b]/30"
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
              <motion.div
                animate={{
                  x: [0, -100, 0],
                  y: [0, 100, 0],
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10">
              {/* Premium App Mockup */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-48 h-96 bg-white/5 rounded-2xl border border-white/20 backdrop-blur-sm shadow-2xl overflow-hidden">
                    <div className="p-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
                        <img
                          src={servnexLogo}
                          alt="Servnex"
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
                  {/* Glow effects */}
                  <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-3xl -z-10" />
                </div>
              </div>

              {/* Original Logo */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <img
                    src={servnexLogo}
                    alt="Servnex"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                <span className="font-bold text-xl text-white">Servnex</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Experience the Future of Management
              </h2>
              <p className="mb-8 text-xl text-white/90">
                Our app is now available on the Google Play Store.
              </p>

              <div className="flex flex-col items-center gap-6">
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.rooks.subscription&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-4 bg-white text-[#2d5a9b] rounded-xl font-bold text-lg flex items-center gap-3 shadow-xl transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="24px"
                    height="24px"
                  >
                    <path
                      fill="#4caf50"
                      d="M10,4.5c-0.2,0.2-0.4,0.6-0.4,1.1v36.8c0,0.5,0.2,0.9,0.4,1.1l0.1,0.1L30.2,24l-20.1-20.1L10,4.5z"
                    />
                    <path
                      fill="#ffeb3b"
                      d="M36.2,30l-6-6l-6,6l0.1,0.1l7.1,4.1C33.2,35.3,34.9,35.3,36.2,30.7L36.2,30z"
                    />
                    <path
                      fill="#f44336"
                      d="M10.1,43.4c0.1,0.1,0.3,0.1,0.5,0.1c0.7,0,1.4-0.2,1.9-0.5l23.7-13.6L30.2,24L10.1,43.4z"
                    />
                    <path
                      fill="#2196f3"
                      d="M10.1,4.6l20.1,20.1l6-6L12.5,5.1C11.9,4.8,11.2,4.6,10.6,4.6C10.4,4.6,10.2,4.6,10.1,4.6z"
                    />
                  </svg>
                  <span>Get it on Google Play</span>
                </motion.a>

                <a
                  href="https://sites.google.com/view/rooks-white-label-app/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white text-sm underline underline-offset-4 transition-colors"
                >
                  Privacy Policy
                </a>
              </div>

              {/* Trust badges */}
              <div className="mt-12 flex justify-center gap-8 text-white/80 text-sm flex-wrap border-t border-white/10 pt-8">
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

      {/* ================= CONTACT MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0f1419] w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(45,90,155,0.3)] relative flex flex-col md:flex-row min-h-[500px] border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Side: Branding/Visual */}
              <div className="md:w-1/2 bg-[#1a1f2e] flex flex-col items-center justify-center p-12 relative overflow-hidden border-r border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2d5a9b]/20 to-transparent pointer-events-none" />
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  src={cloudImage}
                  alt="Servnex Cloud"
                  className="w-full h-auto max-w-[300px] relative z-10 object-contain rounded-2xl shadow-2xl"
                />
                <div className="mt-8 text-center relative z-10 w-full">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">
                      Enterprise Cloud Node
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm max-w-[240px] mx-auto italic">
                    "Unlocking global scalability with white-label simplicity."
                  </p>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
              </div>

              {/* Right Side: Form */}
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
                          Our enterprise solutions team will reach out to you
                          within 24 hours.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <Cloud className="w-5 h-5 text-[#2d5a9b]" />
                        <span className="text-[#2d5a9b] font-bold text-sm tracking-widest uppercase">
                          Servnex Support
                        </span>
                      </div>
                      <h3 className="text-4xl font-bold text-white mb-2">
                        Get in touch
                      </h3>
                      <p className="text-gray-400 mb-8">
                        Ready to scale? Let's discuss your white-label SaaS
                        needs.
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
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#2d5a9b] focus:ring-1 focus:ring-[#2d5a9b] transition-all outline-none text-white placeholder:text-gray-600"
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
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#2d5a9b] focus:ring-1 focus:ring-[#2d5a9b] transition-all outline-none text-white placeholder:text-gray-600"
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
                              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#2d5a9b] focus:ring-1 focus:ring-[#2d5a9b] transition-all outline-none text-white placeholder:text-gray-600"
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
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#2d5a9b] focus:ring-1 focus:ring-[#2d5a9b] transition-all outline-none text-white resize-none placeholder:text-gray-600"
                          />
                        </div>

                        <motion.button
                          disabled={isSubmitting}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 20px rgba(45,90,155,0.4)",
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 bg-gradient-to-r from-[#2d5a9b] to-[#5e72e4] text-white font-bold rounded-xl transition-all uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <ServnexFooter />
    </div>
  );
};

export default RooksservnexLanding;