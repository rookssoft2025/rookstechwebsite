import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
    CheckSquare, ArrowRight, Play, Users, BarChart3,
    Clock, Zap, Shield, ChevronDown, Layers, Target, Activity,
    PlusCircle, ArrowUpRight, Check
} from "lucide-react";
import tmsimg from "../../assets/work/tsm.jpg";

/* ─── Design Tokens ─────────────────────────────────────────── */
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;400;500;600&display=swap');
`;

/* ─── Data ─────────────────────────────────────────────────── */
const FEATURES = [
    { icon: <Layers size={20} />, color: "#1D6EF0", label: "Workspace Isolation", desc: "Dedicated environments for every project. Separate contexts, separate teams — no noise bleeding through." },
    { icon: <PlusCircle size={20} />, color: "#8B5CF6", label: "Dynamic Task Engine", desc: "Spin up tasks, link dependencies, and set priorities in seconds with a keyboard-first interface." },
    { icon: <Users size={20} />, color: "#059669", label: "Smart Assignment", desc: "Role-based member allocation ensures accountability is never ambiguous across the organisation." },
    { icon: <Clock size={20} />, color: "#D97706", label: "Deadline Intelligence", desc: "Automated alerts and timeline views that surface risk before it becomes a crisis." },
    { icon: <Target size={20} />, color: "#DC2626", label: "Progress Analytics", desc: "Real-time dashboards and velocity metrics that turn guesswork into data-driven decisions." },
    { icon: <Shield size={20} />, color: "#0D9488", label: "Enterprise Security", desc: "SOC 2 compliant. Role-based access controls, end-to-end encryption, and full audit trails." },
];

const STEPS = [
    { n: "01", title: "Create a Workspace", body: "Define your project boundary. Invite stakeholders, set the scope, assign an owner." },
    { n: "02", title: "Build Your Task Graph", body: "Break work into atomic tasks. Link dependencies. Visualise the critical path instantly." },
    { n: "03", title: "Assign & Prioritise", body: "Distribute work intelligently. Balanced loads. Clear owners. Zero ambiguity." },
    { n: "04", title: "Track in Real Time", body: "Watch progress on a live dashboard. Catch bottlenecks before they cascade." },
    { n: "05", title: "Analyse & Improve", body: "Close the loop with retrospective insights. Ship faster with every iteration." },
];

const METRICS = [
    { value: "+28%", label: "Avg. efficiency gain", sub: "Measured across enterprise clients" },
    { value: "0 ms", label: "Deadline misses", sub: "With proactive alerting enabled" },
    { value: "4.9★", label: "User satisfaction", sub: "Based on 2 400+ reviews" },
    { value: "99.9%", label: "Uptime SLA", sub: "Guaranteed enterprise tier" },
];

/* ─── Nav items ───────────────────────── */
const NAV_LINKS = [
    { label: "Features",   id: "features"   },
    { label: "Workflows",  id: "workflows"  },
    { label: "Analytics",  id: "analytics"  },
    { label: "Pricing",    id: "cta"        },
];

const TaskManagementLanding = () => {
    const { scrollYProgress } = useScroll();
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const [activeStep, setActiveStep] = useState(0);
    const [activeNav, setActiveNav] = useState("");
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const offset = 72;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveNav(id);
    };

    useEffect(() => {
        const handler = () => {
            const scrollY = window.scrollY + 100;
            for (const link of [...NAV_LINKS].reverse()) {
                const el = document.getElementById(link.id);
                if (el && el.offsetTop <= scrollY) {
                    setActiveNav(link.id);
                    return;
                }
            }
            setActiveNav("");
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        const id = setInterval(() => setActiveStep(p => (p + 1) % STEPS.length), 3200);
        return () => clearInterval(id);
    }, []);

    // Helper components to keep JSX cleaner
    const Chip = ({ children }) => (
        <span className="inline-flex items-center gap-x-1.5 bg-blue-500/10 border border-blue-500/20 text-[#7BAFF5] text-[11px] font-bold tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full">
            {children}
        </span>
    );

    const PrimaryButton = ({ children, className = "" }) => (
        <button className={`inline-flex items-center gap-2.5 bg-[#1D6EF0] hover:bg-[#1a5fd6] text-white font-medium text-sm tracking-wide px-7 py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 ${className}`}>
            {children}
        </button>
    );

    const GhostButton = ({ children, className = "" }) => (
        <button className={`inline-flex items-center gap-2.5 bg-transparent text-white/60 hover:text-white font-medium text-sm px-7 py-3.5 rounded-xl border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all ${className}`}>
            {children}
        </button>
    );

    const noiseFilter = `data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E`;

    return (
        <>
            <style>{FONTS}</style>
            <div className={`min-h-screen bg-[#0A0C0F] text-white font-['DM_Sans'] overflow-x-hidden relative selection:bg-blue-500/30 before:content-[''] before:fixed before:inset-0 before:z-0 before:bg-[url("${noiseFilter}")] before:pointer-events-none before:opacity-[0.03]`}>
                
                {/* ── Progress Bar ── */}
                <motion.div 
                    className="fixed top-0 left-0 h-0.5 bg-gradient-to-r from-[#1D6EF0] to-[#7BAFF5] z-[200]" 
                    style={{ width: progressWidth }} 
                />

                {/* ── Nav ── */}
                <nav className="fixed top-0 left-0 right-0 h-16 px-5 md:px-12 flex items-center justify-between bg-[#0A0C0F]/70 backdrop-blur-2xl border-b border-white/5 z-[100]">
                    <div className="flex items-center gap-2.5 group cursor-pointer">
                        <div className="w-8 h-8 bg-[#1D6EF0] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <CheckSquare size={16} color="#fff" />
                        </div>
                        <span className="font-bold text-base tracking-tight">Rooks Task</span>
                    </div>
                    
                    <div className="hidden md:flex gap-8">
                        {NAV_LINKS.map(({ label, id }) => (
                            <button
                                key={id}
                                className={`text-[13px] font-medium transition-colors relative py-1 ${activeNav === id ? "text-white after:scale-x-100" : "text-gray-500 hover:text-white after:scale-x-0"} after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-blue-500 after:transition-transform after:duration-300 after:origin-left`}
                                onClick={() => scrollToSection(id)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <PrimaryButton className="!py-2.5 !px-5 !text-[13px]">
                            Start free <ArrowRight size={14} />
                        </PrimaryButton>
                    </div>
                </nav>

                {/* ══════════════ HERO ══════════════ */}
                <section ref={heroRef} className="relative min-h-screen flex items-center pt-16">
                    {/* Gradient Mesh Background */}
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_40%,rgba(29,110,240,0.12)_0%,transparent_70%),radial-gradient(ellipse_40%_60%_at_10%_80%,rgba(201,168,76,0.05)_0%,transparent_60%)]" />

                    {/* Vertical Rule */}
                    <div className="hidden md:block absolute left-12 top-0 bottom-0 w-px bg-white/5" />

                    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 relative z-10 w-full py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7 }}
                            className="flex-1"
                        >
                            <div className="flex flex-wrap items-center gap-3 mb-9">
                                <Chip><Zap size={10} className="mr-1" />Next-Gen Productivity</Chip>
                                <span className="text-xs text-gray-500 font-medium">— Trusted by 12,000+ teams</span>
                            </div>

                            <h1 className="text-[clamp(42px,6vw,84px)] font-light leading-[1.1] tracking-tighter mb-8">
                                The operating system<br />
                                <span className="font-['Instrument_Serif'] italic text-[#3B82F6]">for high-output teams.</span>
                            </h1>

                            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mb-12">
                                Centralise every workspace, task, and deadline in one place. Move from scattered threads to a single source of truth.
                            </p>

                            <div className="flex flex-wrap items-center gap-4">
                                <PrimaryButton>Contact Us <ArrowRight size={15} /></PrimaryButton>
                            </div>
                        </motion.div>

                        {/* Mockup Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 48 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.35, duration: 0.9 }}
                            className="flex-1 relative w-full lg:max-w-2xl"
                        >
                            <div className="relative p-[1px] rounded-[22px] bg-gradient-to-br from-blue-500/30 via-blue-500/5 to-transparent">
                                <div className="bg-[#1A1D24] rounded-[21px] overflow-hidden border border-white/5 shadow-2xl shadow-black/60">
                                    <div className="bg-[#1A1D24] border-b border-white/5 px-5 py-3 flex items-center gap-2">
                                        {[ "#FF5F57", "#FFBD2E", "#28C840" ].map(c => (
                                            <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                                        ))}
                                        <div className="flex-1 flex justify-center">
                                            <div className="bg-[#2C3040] rounded-md px-4 py-1 text-[10px] text-gray-500 font-medium tracking-wide">
                                                app.rookstask.io/workspace
                                            </div>
                                        </div>
                                    </div>
                                    <img src={tmsimg} alt="Platform Preview" className="w-[85%] mx-auto block opacity-90 transition-opacity hover:opacity-100 duration-500" />
                                </div>
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-4 md:right-12 bg-[#0A0C0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5 shadow-2xl min-w-[160px] hidden sm:block"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22C55E] animate-pulse" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sprint Velocity</span>
                                </div>
                                <div className="text-3xl font-bold tracking-tight">87%</div>
                                <div className="mt-2.5 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#1D6EF0] rounded-full" style={{ width: '87%' }} />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 14, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute -bottom-6 -left-4 md:left-8 bg-[#0A0C0F]/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-4 md:p-5 shadow-2xl hidden sm:block"
                            >
                                <div className="text-[11px] font-bold text-[#3B82F6] mb-3 uppercase tracking-wide">Team Collaborative</div>
                                <div className="flex -space-x-2">
                                    {[ "#1D6EF0", "#8B5CF6", "#059669", "#D97706" ].map((c, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0C0F] shadow-sm" style={{ background: c }} />
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-[#0A0C0F] bg-[#1A1D24] flex items-center justify-center text-[10px] font-bold">+12</div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Scroll Cue */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-gray-600">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Explore</span>
                        <ChevronDown size={14} className="animate-bounce" />
                    </div>
                </section>

                {/* ══════════════ MARQUEE ══════════════ */}
                <div className="border-y border-white/5 py-3.5 overflow-hidden bg-white/[0.01]">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="flex whitespace-nowrap"
                    >
                        {[...Array(2)].map((_, ri) => (
                            <div key={ri} className="flex">
                                {["Workspace Automation", "Deadline Intelligence", "Role-Based Access", "Real-Time Analytics", "Dependency Mapping", "Team Velocity Reports", "Daily Stand-up Digest", "SOC 2 Compliant"].map((t, i) => (
                                    <span key={i} className="flex items-center gap-9 px-9 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/20">
                                        {t} <span className="text-[#1D6EF0] h-1.5 w-1.5 rounded-full bg-current" />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ══════════════ METRICS ══════════════ */}
                <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {METRICS.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 border border-white/5 hover:border-blue-500/20 rounded-2xl p-8 transition-colors group"
                            >
                                <div className="text-4xl font-bold tracking-tighter mb-2 group-hover:text-blue-400 transition-colors">{m.value}</div>
                                <div className="text-[13px] font-semibold text-gray-400 mb-1">{m.label}</div>
                                <div className="text-[11px] text-gray-600 font-medium">{m.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <hr className="border-none h-px bg-white/5 m-0" />

                {/* ══════════════ FEATURES ══════════════ */}
                <section id="features" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-20 lg:gap-32 items-start">
                        {/* Sticky Label Section */}
                        <div className="lg:sticky lg:top-32">
                            <Chip>Platform</Chip>
                            <h2 className="text-[clamp(32px,4vw,48px)] font-light leading-[1.2] tracking-tight my-6">
                                Every tool<br />
                                <span className="font-['Instrument_Serif'] italic text-[#3B82F6]">your team needs.</span>
                            </h2>
                            <p className="text-gray-500 text-[15px] leading-relaxed max-w-[280px] mb-8">
                                Built for teams who ship. Six core modules that integrate seamlessly into how you already work.
                            </p>
                           
                        </div>

                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-2 gap-5">
                            {FEATURES.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="bg-white/[0.02] border border-white/5 rounded-[22px] p-9 transition-all hover:translate-y-[-4px] hover:bg-blue-500/[0.04] hover:border-blue-500/20 group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div 
                                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 border transition-colors group-hover:bg-opacity-20"
                                        style={{ background: `${f.color}15`, borderColor: `${f.color}30`, color: f.color }}
                                    >
                                        {f.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 tracking-tight">{f.label}</h3>
                                    <p className="text-gray-500 text-[13.5px] leading-relaxed">{f.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <hr className="border-none h-px bg-white/5 m-0" />

                {/* ══════════════ HOW IT WORKS ══════════════ */}
                <section id="workflows" className="py-32 px-6 md:px-12 bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-20 max-w-xl">
                            <Chip>Workflows</Chip>
                            <h2 className="text-[clamp(32px,4vw,48px)] font-light leading-[1.2] tracking-tight my-6">
                                From chaos<br />
                                <span className="font-['Instrument_Serif'] italic text-[#3B82F6]">to clarity in five steps.</span>
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                            {/* Steps List */}
                            <div className="flex flex-col">
                                {STEPS.map((s, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setActiveStep(i)}
                                        className={`flex gap-6 py-7 border-b border-white/5 cursor-pointer group transition-all duration-300 ${activeStep === i ? "opacity-100" : "opacity-40 hover:opacity-100"}`}
                                    >
                                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-[13px] font-bold flex-shrink-0 transition-all ${activeStep === i ? "border-blue-500 text-blue-500 bg-blue-500/10" : "border-white/10 text-gray-500"}`}>
                                            {s.n}
                                        </div>
                                        <div>
                                            <h4 className={`text-base font-bold transition-colors ${activeStep === i ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                                                {s.title}
                                            </h4>
                                            {activeStep === i && (
                                                <motion.p 
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    className="text-gray-500 text-sm leading-relaxed mt-3 overflow-hidden"
                                                >
                                                    {s.body}
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Visual Preview */}
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-[#1A1D24] rounded-3xl border border-white/10 p-10 md:p-12 shadow-2xl"
                            >
                                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-8">
                                    Step {STEPS[activeStep].n} — {STEPS[activeStep].title}
                                </div>
                                
                                <div className="flex flex-col gap-4">
                                    {[90, 65, 40, 80, 55].map((w, i) => (
                                        <div key={i} className="flex items-center gap-5">
                                            <div 
                                                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                                                style={{ background: ["#1D6EF0","#8B5CF6","#059669","#D97706","#DC2626"][i] + "30" }}
                                            >
                                                <div className="w-2 h-2 rounded-full" style={{ background: ["#1D6EF0","#8B5CF6","#059669","#D97706","#DC2626"][i] }} />
                                            </div>
                                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${w}%` }}
                                                    className="h-full rounded-full"
                                                    style={{ background: ["#1D6EF0","#8B5CF6","#059669","#D97706","#DC2626"][i] }}
                                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-gray-500 w-8 text-right">{w}%</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 p-5 bg-blue-500/[0.04] border border-blue-500/10 rounded-xl">
                                    <div className="text-xs font-bold text-blue-400 mb-1.5">{STEPS[activeStep].title}</div>
                                    <p className="text-xs text-gray-500 leading-relaxed">{STEPS[activeStep].body}</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <hr className="border-none h-px bg-white/5 m-0" />

                {/* ══════════════ ANALYTICS ══════════════ */}
                <section id="analytics" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Chip><Activity size={10} className="mr-1.5" />Insights</Chip>
                            <h2 className="text-[clamp(32px,4vw,48px)] font-light leading-[1.2] tracking-tight my-6">
                                Data that<br />
                                <span className="font-['Instrument_Serif'] italic text-[#3B82F6]">drives decisions.</span>
                            </h2>
                            <p className="text-gray-500 text-[15px] leading-relaxed max-w-md mb-10">
                                Our analytics engine surfaces velocity trends, completion rates, and individual performance scores — transforming guesswork into evidence-based leadership.
                            </p>
                            
                            <div className="flex flex-col gap-4">
                                {["Completion velocity per sprint", "Individual contributor heatmaps", "Bottleneck detection with root-cause tags", "Executive-ready PDF exports"].map((t, i) => (
                                    <div key={i} className="flex items-center gap-3.5">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                            <Check size={11} className="text-blue-500" strokeWidth={4} />
                                        </div>
                                        <span className="text-[14px] text-gray-300 font-medium">{t}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 32 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#1A1D24] rounded-[28px] border border-white/5 p-10 md:p-12 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <span className="text-sm font-bold tracking-tight">Sprint Completion — Q3</span>
                                <BarChart3 size={20} className="text-blue-400" />
                            </div>

                            {[
                                { name: "Frontend", pct: 92, color: "#1D6EF0" },
                                { name: "Backend",  pct: 78, color: "#8B5CF6" },
                                { name: "Design",   pct: 100, color: "#059669" },
                                { name: "QA",       pct: 55, color: "#D97706" },
                            ].map((r, i) => (
                                <div key={i} className="mb-7 last:mb-0">
                                    <div className="flex justify-between mb-2 text-[13px] font-bold">
                                        <span className="text-gray-500">{r.name}</span>
                                        <span className={r.pct === 100 ? "text-green-500" : "text-white"}>{r.pct}%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${r.pct}%` }}
                                            transition={{ duration: 1.2, delay: i * 0.1 }}
                                            className="h-full rounded-full"
                                            style={{ background: r.color }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="mt-10 p-5 bg-green-500/5 border border-green-500/20 rounded-2xl flex items-center gap-4">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0 shadow-[0_0_8px_#22C55E]" />
                                <span className="text-[12.5px] text-green-300/90 font-medium leading-tight">
                                    Design team hit 100% capacity — sprint velocity up 14% YoY
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <hr className="border-none h-px bg-white/5 m-0" />

                {/* ══════════════ CTA ══════════════ */}
                <section id="cta" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-[#0D2A5C] via-[#0A1628] to-[#0D1F40] rounded-[40px] p-10 md:p-20 relative overflow-hidden border border-blue-500/20 shadow-2xl"
                    >
                        {/* Decorative Background Circles */}
                        <div className="absolute top-[-80px] right-[-80px] w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(29,110,240,0.12)_0%,transparent_70%)] pointer-events-none" />
                        <div className="absolute bottom-[-60px] left-[-60px] w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_70%)] pointer-events-none" />

                        <div className="relative z-10 max-w-2xl">
                            <Chip>Get Started Today</Chip>
                            <h2 className="text-[clamp(36px,5.5vw,68px)] font-light leading-[1.05] tracking-tight mt-7 mb-7">
                                Ready to run a<br />
                                <span className="font-['Instrument_Serif'] italic text-blue-400">tighter operation?</span>
                            </h2>
                            <p className="text-white/50 text-lg leading-relaxed mb-12 max-w-lg">
                                Start with a free workspace. No credit card, no time limit on the free tier. Upgrade when your team is ready to scale.
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <PrimaryButton className="!px-10 !py-4.5 !text-[15px]">
                                    Launch first workspace <ArrowRight size={17} />
                                </PrimaryButton>
                                
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ══════════════ FOOTER ══════════════ */}
                <footer className="border-t border-white/5 py-12 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="flex items-center gap-3 font-bold group">
                            <div className="w-8 h-8 bg-[#1D6EF0] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                                <CheckSquare size={15} color="#fff" />
                            </div>
                            <span className="text-[15px]">Rooks Task</span>
                        </div>
                        
                        <div className="text-[12px] text-gray-500 font-medium">
                            © 2024 Rooks & Brooks Technologies. All rights reserved.
                        </div>

                        <div className="flex gap-8">
                            {["Twitter", "LinkedIn", "GitHub"].map(n => (
                                <a key={n} href="#" className="text-[13px] font-semibold text-gray-500 hover:text-white transition-colors">
                                    {n}
                                </a>
                            ))}
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
};

export default TaskManagementLanding;