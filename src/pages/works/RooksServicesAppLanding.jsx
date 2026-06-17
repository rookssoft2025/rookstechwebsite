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
} from "lucide-react";
import ROOKSServicesNavbar from "../../components/layout/ROOKSServicesNavbar";
import ROOKSServicesFooter from "../../components/layout/ROOKSServicesFooter";
import rookserviceappLogo from "../../assets/mobile_apps_asstes/rookserviceapp (1).png";
import tmsimg from "../../assets/mobile_apps_asstes/RooksServiceApp.jpg";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
`;

const FEATURES = [
  {
    icon: <CheckSquare size={24} />,
    color: "#0B3470",
    title: "Multi-User Role System",
    desc: "Three distinct user types: Customer, Admin, and Engineer with tailored experiences for each.",
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
    subFeatures: ["Ticket Creation", "Status Tracking", "Engineer Assignment"],
  },
  {
    icon: <Barcode size={24} />,
    color: "#8B5CF6",
    title: "Barcode Integration",
    desc: "Scan and identify barcodes for quick device management and tracking.",
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
  },
  {
    num: "02",
    title: "Login/Sign Up",
    desc: "Secure login with phone number and OTP verification.",
  },
  {
    num: "03",
    title: "Create & Manage Tickets",
    desc: "Create service tickets, assign to engineers, or track your service requests.",
  },
  {
    num: "04",
    title: "Complete Service",
    desc: "Engineers update status, upload images, and mark tickets as complete.",
  },
];

const DESIGNED_FOR = [
  {
    title: "Service Customers",
    desc: "Request and track services effortlessly.",
  },
  {
    title: "AMC Customers",
    desc: "Annual Maintenance Contract holders with dedicated support.",
  },
  {
    title: "Service Managers",
    desc: "Full control over operations and staff.",
  },
  {
    title: "Service Engineers",
    desc: "Manage assigned tickets and provide updates on the go.",
  },
  { title: "Businesses", desc: "Scale your service operations efficiently." },
];

const BENEFITS = [
  {
    title: "Real-Time Updates",
    desc: "Instant notifications and live ticket status.",
  },
  {
    title: "Multi-Platform Support",
    desc: "Available on Android, iOS, Web, Windows, Linux, macOS.",
  },
  {
    title: "Professional Reports",
    desc: "Generate detailed reports in PDF format.",
  },
  {
    title: "Secure & Reliable",
    desc: "Firebase-powered backend with enterprise-grade security.",
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
    return () => clearInterval(id);
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
      <div className="min-h-screen bg-[#051020] text-white font-['Inter'] overflow-x-hidden relative selection:bg-[#0B3470]/30">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] z-[200]"
          style={{ width: progressWidth }}
        />

        {/* Rooks Services Navbar */}
        <ROOKSServicesNavbar onCTAClick={() => setIsModalOpen(true)} />

        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen flex items-center pt-32 pb-20 px-4 sm:px-6"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-[#0B3470]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-[#1a5a9a]/10 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <Chip className="mb-6">
                <Zap size={14} /> Next-Gen Service Management
              </Chip>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Streamline Your Service Operations
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a]">
                  {" "}
                  With Rooks Services App
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                A comprehensive multi-platform service management solution built
                with Flutter and Firebase. Perfect for service businesses of all
                sizes.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <PrimaryButton onClick={() => setIsModalOpen(true)}>
                  Contact Us
                  <ArrowRight size={18} />
                </PrimaryButton>
                {/* <SecondaryButton onClick={() => setIsModalOpen(true)}>
                    Book a Demo
                  </SecondaryButton> */}
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                {[
                  {
                    icon: <Smartphone size={16} />,
                    label: "Multi-Platform Support",
                  },
                  { icon: <Users size={16} />, label: "3 User Roles" },
                  {
                    icon: <Bell size={16} />,
                    label: "Real-Time Notifications",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="text-[#0B3470]">{item.icon}</div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-2 backdrop-blur-xl">
                <img
                  src={tmsimg}
                  alt="Rooks Services App Dashboard"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 bg-[#0a1a3a] border border-[#0B3470]/30 rounded-2xl p-4 shadow-xl backdrop-blur-xl"
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
            </motion.div>
          </div>
        </section>

        {/* Why Choose Rooks Services App */}
        <section className="py-24 bg-gradient-to-b from-transparent to-white/[0.02] px-4 sm:px-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Why Choose Us</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a]">
                  Rooks Services App
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Powerful features designed to simplify service management,
                enhance collaboration, and boost productivity.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Server size={28} />,
                  title: "Firebase Backend",
                  color: "#0B3470",
                },
                {
                  icon: <Users size={28} />,
                  title: "Multi-Role System",
                  color: "#10B981",
                },
                {
                  icon: <Bell size={28} />,
                  title: "Push Notifications",
                  color: "#8B5CF6",
                },
                {
                  icon: <Lock size={28} />,
                  title: "Secure & Reliable",
                  color: "#F59E0B",
                },
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#0B3470]/30 transition-all duration-300"
                >
                  <div
                    style={{ background: `${benefit.color}20` }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  >
                    <div style={{ color: benefit.color }}>{benefit.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Powerful Features */}
        <section id="features" className="py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Features</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Powerful Features
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#0B3470]/30 transition-all duration-300"
                >
                  <div
                    style={{ background: `${feature.color}20` }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-white/10"
                  >
                    <div style={{ color: feature.color }}>{feature.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 mb-6">{feature.desc}</p>
                  <div className="space-y-2">
                    {feature.subFeatures.map((subFeature, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-2 text-gray-300 text-sm"
                      >
                        <Check
                          size={14}
                          className="text-[#0B3470] flex-shrink-0"
                        />
                        {subFeature}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-24 bg-gradient-to-b from-white/[0.02] to-transparent px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">How It Works</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                How Rooks Services App Works
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {STEPS.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    onClick={() => setActiveStep(i)}
                    className={`flex gap-6 p-6 rounded-2xl cursor-pointer transition-all duration-300 ${activeStep === i ? "bg-[#0B3470]/10 border border-[#0B3470]/30" : "bg-white/5 border border-white/10 hover:bg-white/10"}`}
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[#0B3470] to-[#1a5a9a] flex items-center justify-center text-2xl font-bold">
                      {step.num}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative bg-gradient-to-br from-[#0B3470]/20 to-[#1a5a9a]/20 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B3470]/5 to-[#1a5a9a]/5 rounded-3xl"></div>
                <div className="relative">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0B3470] to-[#1a5a9a] mb-6">
                    {STEPS[activeStep].num}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    {STEPS[activeStep].title}
                  </h3>
                  <p className="text-xl text-gray-200">
                    {STEPS[activeStep].desc}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Designed For */}
        <section id="designed-for" className="py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Designed For</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Designed For Everyone
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DESIGNED_FOR.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#0B3470]/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits That Drive Results */}
        <section
          id="benefits"
          className="py-24 bg-gradient-to-b from-transparent to-white/[0.02] px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Benefits</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Benefits That Drive Results
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-[#0B3470]/10 to-[#1a5a9a]/10 border border-white/10 rounded-3xl p-8 hover:from-[#0B3470]/15 hover:to-[#1a5a9a]/15 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Technology Stack</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Built With Modern Technology
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Leveraging the best tools to deliver a fast, reliable, and
                beautiful service management experience.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Smartphone size={28} />,
                  title: "Flutter",
                  desc: "Cross-platform UI framework",
                },
                {
                  icon: <Server size={28} />,
                  title: "Firebase",
                  desc: "Backend-as-a-Service (Auth, Firestore, Storage, Messaging)",
                },
                {
                  icon: <Globe size={28} />,
                  title: "Multi-Platform",
                  desc: "Android, iOS, Web, Windows, Linux, macOS",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#0B3470]/20 flex items-center justify-center">
                    <div className="text-[#0B3470]">{item.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Summary */}
        <section className="py-24 bg-gradient-to-b from-white/[0.02] to-transparent px-4 sm:px-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">Key Features</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Key Features at a Glance
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "✅ Multi-user role system (Customer, Admin, Engineer)",
                "✅ Customer account creation and login (Phone/Password)",
                "✅ AMC and Normal customer types",
                "✅ Ticket creation (Service and Delivery)",
                "✅ Ticket status tracking",
                "✅ Ticket assignment to engineers",
                "✅ Engineer dashboard with assigned tickets",
                "✅ Barcode scanning and identification",
                "✅ Device brand and model management",
                "✅ FCM push notifications",
                "✅ Local notifications",
                "✅ Image upload and storage",
                "✅ PDF generation and printing",
                "✅ Reports generation (Engineer, Customer)",
                "✅ Persistent login state",
                "✅ Real-time Firestore updates",
                "✅ Professional, responsive UI",
                "✅ Multi-platform support",
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Star size={20} className="text-yellow-400" />
                  </div>
                  <span className="text-lg font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Chip className="mb-4 mx-auto">FAQ</Chip>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {FAQs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full px-6 py-6 flex items-center justify-between text-left font-semibold text-lg hover:bg-white/10 transition-colors"
                  >
                    {faq.question}
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${openFAQ === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFAQ === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-gray-300"
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

        {/* Download App */}
        <section id="cta" className="py-32 px-4 relative">
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden bg-gradient-to-br from-[#0B3470] via-[#1a5a9a] to-[#0B3470] p-16 rounded-3xl text-center shadow-2xl shadow-[#0B3470]/30"
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
                {/* Rooks Services App Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <img
                      src={rookserviceappLogo}
                      alt="Rooks Services App"
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <span className="font-bold text-xl text-white">
                    Rooks Services App
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Experience the Future of Service Management
                </h2>
                <p className="mb-8 text-xl text-white/90">
                  Our app is now available on the Google Play Store.
                </p>

                <div className="flex flex-col items-center gap-6">
                  <motion.a
                    href="https://play.google.com/store/apps/details?id=com.rooks.rooks_services_app&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-10 py-4 bg-white text-[#0B3470] rounded-xl font-bold text-lg flex items-center gap-3 shadow-xl transition-all"
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
                </div>

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

        {/* Contact Modal */}
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
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Left Side: Branding/Visual */}
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
                  {/* Decorative elements */}
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#0B3470]/10 rounded-full blur-3xl" />
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#1a5a9a]/10 rounded-full blur-3xl" />
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
                            Our team will reach out to you
                            within 24 hours.
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

export default RooksServicesAppLanding;
