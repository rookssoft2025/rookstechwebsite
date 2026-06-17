import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
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
  Award,
  CheckCircle2,
  Sparkles,
  X,
  Phone,
  Building2,
  Briefcase,
  Package,
  DollarSign,
  HardHat,
  Car,
  Users2,
  Palette,
  PieChart,
  Zap,
  Globe,
} from "lucide-react";

import phoneImage from "../../assets/work/red_antique_telephone_1773891893640.png";
import ebricksLogo from "../../assets/mobile_apps_asstes/ebricks.png";
import EBricksNavbar from "../../components/layout/eBricksNavbar";
import EBricksFooter from "../../components/layout/eBricksFooter";

const RooksCstLanding = () => {
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
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
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
      const docName = `Rookscst_${formData.name.replace(/\s+/g, "_")}`;
      await setDoc(doc(db, "Client Enquiry", docName), {
        ...formData,
        source: "Rooks CST Landing",
        application: "Rooks CST Mobile App",
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

  return (
    <div className="min-h-screen bg-[#071324] text-white overflow-hidden">
      {/* eBricks Navbar */}
      <EBricksNavbar onCTAClick={() => setIsModalOpen(true)} />

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
      <section id="hero" ref={heroRef} className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* LEFT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isHeroInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={fadeInUp}
              className="mb-8 flex items-center gap-4"
            >
              {/* <img
                src={ebricksLogo}
                alt="eBricks Logo"
                className="h-16 w-auto object-contain"
              />
              <div className="h-12 w-px bg-white/20" />
              <div className="flex flex-col">
                <span className="text-[#4ec9ff] font-bold text-xl tracking-tight">
                  eBricks
                </span>
                <span className="text-gray-400 text-xs uppercase tracking-widest">
                  Construction Suite
                </span>
              </div> */}
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Transform Your Construction Business with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ec9ff] via-[#0B3470] to-[#1e4a8a]">
                Smart Project Management
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-gray-400 mb-8 max-w-xl text-lg"
            >
              Streamline projects, manage teams, track materials, and keep
              clients informed — all from one powerful, customizable platform.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-4 flex-wrap">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(11, 52, 112, 0.5)",
                }}
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

              {/* <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white/5 backdrop-blur-sm rounded-xl flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all"
              >
                <Play className="w-4 h-4 group-hover:text-[#4ec9ff] transition-colors" />
                <span>Book a Demo</span>
              </motion.button> */}
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
            <motion.div animate={floatAnimation} className="relative z-10">
              <img
                src={cstImg}
                className="max-w-full h-auto rounded-2xl shadow-2xl shadow-[#0B3470]/20"
                alt="CST Dashboard"
              />
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#0B3470]/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#1a4a8a]/20 rounded-full blur-2xl" />
          </motion.div>
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
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-5xl font-bold mb-4 mt-2">
              Key Features of eBricks
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage construction projects from start to
              finish
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
                icon: <Layout className="w-8 h-8" />,
                title: "Complete Project Management",
                desc: "Plan and track every stage of your construction projects, with real-time status updates.",
                color: "from-[#0B3470] to-[#1e4a8a]",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Team & Labor Management",
                desc: "Worker onboarding, attendance tracking, labor scheduling, and incentive calculation.",
                color: "from-[#0B3470] to-[#1a3a6a]",
              },
              {
                icon: <Package className="w-8 h-8" />,
                title: "Materials & Inventory Control",
                desc: "Material request and approval workflow, real-time inventory tracking, and availability management.",
                color: "from-[#0B3470] to-[#2a5a9a]",
              },
              {
                icon: <DollarSign className="w-8 h-8" />,
                title: "Financial Management",
                desc: "Expense tracking, financial status reports, site payment management, and project-wise insights.",
                color: "from-[#0B3470] to-[#1e4a8a]",
              },
              {
                icon: <HardHat className="w-8 h-8" />,
                title: "Site Supervision",
                desc: "Daily site reports with photo documentation, site status updates, and manager approval workflows.",
                color: "from-[#0B3470] to-[#1a3a6a]",
              },
              {
                icon: <Users2 className="w-8 h-8" />,
                title: "Contractor Management",
                desc: "Contractor onboarding and tracking, performance reports, and work order management.",
                color: "from-[#0B3470] to-[#2a5a9a]",
              },
              {
                icon: <Wrench className="w-8 h-8" />,
                title: "Tools & Equipment",
                desc: "Tools inventory management, movement tracking, vehicle fleet management, and driver assignment.",
                color: "from-[#0B3470] to-[#1e4a8a]",
              },
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Client Portal",
                desc: "Customer dashboard with project visibility, real-time status reports, and financial status sharing.",
                color: "from-[#0B3470] to-[#1a3a6a]",
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "White-label Branding",
                desc: "Customizable app name and logo, brand color customization, and fully branded experience for your clients.",
                color: "from-[#0B3470] to-[#2a5a9a]",
              },
              {
                icon: <PieChart className="w-8 h-8" />,
                title: "Insights & Analytics",
                desc: "Comprehensive dashboards with real-time insights, project stage analytics, and PDF report generation.",
                color: "from-[#0B3470] to-[#1e4a8a]",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-[#0B3470]/50 transition-all backdrop-blur-sm"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />

                <div
                  className={`mb-4 p-3 bg-gradient-to-br ${item.color} rounded-xl w-fit text-white shadow-lg shadow-[#0B3470]/20`}
                >
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

      {/* ================= WHY CHOOSE US ================= */}
      <section id="why-choose" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-5xl font-bold mb-4 mt-2">
              Why eBricks is the Best Choice
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Layout className="w-8 h-8" />,
                title: "All-in-One Platform",
                desc: "No need for multiple tools — manage everything from project planning to client communication in one place.",
                color: "from-[#0B3470] to-[#1e4a8a]",
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "White-label Ready",
                desc: "Brand the app as your own and deliver a seamless experience to your clients.",
                color: "from-[#0B3470] to-[#1a3a6a]",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Role-based Access",
                desc: "Different dashboards for Organizations, Managers, Supervisors, Workers, and Clients.",
                color: "from-[#0B3470] to-[#2a5a9a]",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Real-time Updates",
                desc: "Everyone stays on the same page with instant notifications and updates.",
                color: "from-[#0B3470] to-[#1e4a8a]",
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Professional Reports",
                desc: "Generate professional PDF reports for clients, stakeholders, and internal use.",
                color: "from-[#0B3470] to-[#1a3a6a]",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Cloud-based",
                desc: "Access from anywhere, anytime — no installation required.",
                color: "from-[#0B3470] to-[#2a5a9a]",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-[#0B3470]/50 transition-all backdrop-blur-sm"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />

                <div
                  className={`mb-4 p-3 bg-gradient-to-br ${item.color} rounded-xl w-fit text-white shadow-lg shadow-[#0B3470]/20`}
                >
                  {item.icon}
                </div>

                <h3 className="font-bold text-xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#4ec9ff] group-hover:to-white transition-all">
                  {item.title}
                </h3>

                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {item.desc}
                </p>

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

      {/* ================= PRICING PLANS ================= */}
      <section id="pricing" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Pricing Plans
            </span>
            <h2 className="text-5xl font-bold mb-4 mt-2">
              Choose the Perfect Plan for You
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                title: "Free Trial",
                desc: "Get started with 1 project and 2 users for 14 days",
                price: "Free",
                color: "from-[#0B3470] to-[#1e4a8a]",
                features: [
                  "1 Project",
                  "2 Users",
                  "14 Days Free",
                  "All Core Features",
                ],
              },
              {
                title: "Silver Plan",
                desc: "Up to 3 projects, 5 users — perfect for small teams",
                price: "Custom",
                color: "from-[#0B3470] to-[#1a3a6a]",
                features: [
                  "3 Projects",
                  "5 Users",
                  "Priority Support",
                  "Custom Branding",
                ],
              },
              {
                title: "Gold Plan",
                desc: "Scalable project capacity for businesses of any size",
                price: "Custom",
                color: "from-[#0B3470] to-[#2a5a9a]",
                features: [
                  "Unlimited Projects",
                  "Unlimited Users",
                  "Dedicated Manager",
                  "Advanced Reports",
                ],
              },
              {
                title: "Platinum Plan",
                desc: "Unlimited projects and users — enterprise-grade solution",
                price: "Custom",
                color: "from-[#0B3470] to-[#1e4a8a]",
                features: [
                  "Everything in Gold",
                  "API Access",
                  "Custom Integrations",
                  "SLA Support",
                ],
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-[#0B3470]/50 transition-all backdrop-blur-sm"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
                />

                <div
                  className={`mb-4 p-3 bg-gradient-to-br ${plan.color} rounded-xl w-fit text-white shadow-lg shadow-[#0B3470]/20`}
                >
                  <div className="w-6 h-6 bg-white rounded-full" />
                </div>

                <h3 className="font-bold text-2xl mb-2 text-white">
                  {plan.title}
                </h3>
                <p className="text-gray-400 mb-6">{plan.desc}</p>

                <div className="text-4xl font-bold text-white mb-6">
                  {plan.price}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#4ec9ff]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#0B3470] to-[#1a4a8a] rounded-xl font-semibold text-white"
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= APP CTA ================= */}
      <section id="app-cta" className="py-32 px-4 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#4B6CB7] via-[#6B8DD4] to-[#4B6CB7] p-16 rounded-3xl text-center shadow-2xl shadow-[#4B6CB7]/30"
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
                    id="grid"
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
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <img
                    src={ebricksLogo}
                    alt="eBricks"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">
                  eBricks
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold mb-4 text-white"
              >
                Experience the Future of Management
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 text-xl text-white/90"
              >
                Access our powerful construction management platform directly
                from your browser.
              </motion.p>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="https://rooksbrooksit.github.io/cst_white_label_app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#4B6CB7] rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
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
                Open Web App
              </motion.a>

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

      {/* ================= CTA ================= */}
      {/* <section id="cta" className="py-32 px-4 relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden bg-gradient-to-br from-[#0B3470] via-[#1a4a8a] to-[#0B3470] p-16 rounded-3xl text-center shadow-2xl shadow-[#0B3470]/30"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_white_0%,_transparent_50%)] opacity-10" />
                <motion.div
                  animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
                  transition={{ duration: 15, repeat: Infinity }}
                  className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
                />
              </div>

              <div className="relative z-10">
                <h2 className="text-5xl font-bold mb-4">
                  Ready to Transform Your Construction Business?
                </h2>
                <p className="mb-8 text-xl text-white/90">
                  Streamline projects, manage teams, track materials, and keep
                  clients informed — all from one powerful, customizable platform.
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-10 py-4 bg-white text-[#0B3470] rounded-xl font-bold text-lg relative overflow-hidden"
                  >
                    <span className="relative z-10">
                      Create Your Free Account Today
                    </span>
                  </motion.button>
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-10 py-4 border-2 border-white rounded-xl font-bold text-lg hover:bg-white hover:text-[#0B3470] transition-all"
                  >
                    Login to Your Dashboard
                  </motion.button>
                  <motion.button
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-10 py-4 bg-[#0B3470]/30 backdrop-blur-sm border border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                  >
                    Join Organization
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section> */}

      <EBricksFooter />

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
                    <span className="text-[#0B3470] font-bold uppercase tracking-widest text-xs">
                      Customer Service
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm max-w-[200px]">
                    Our expert team is here to help you revolutionize your site
                    management.
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
                      <h3 className="text-3xl font-bold text-[#0B3470]">
                        Thank You!
                      </h3>
                      <p className="text-gray-500 text-lg">
                        Your enquiry has been received. We'll get back to you
                        soon.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-4xl font-bold text-[#0B3470] mb-2">
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
                            backgroundColor: "#1e4a8a",
                          }}
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
