import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Lock, ArrowRight, ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";

const AssessmentLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const VALID_USERNAME = "rooksbrooks";
        const VALID_PASSWORD = "rook123";

        setTimeout(() => {
            if (formData.username === VALID_USERNAME && formData.password === VALID_PASSWORD) {
                navigate("/careers/assessment/register", { replace: true });
            } else {
                setError("Invalid username or password. Please try again.");
                setIsLoading(false);
            }
        }, 1000);
    };

    // Background animation component (reusing space aesthetic)
    const BackgroundEffects = () => (
        <div className="fixed inset-0 bg-[#0a192f] overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 relative font-sans text-white">
            <BackgroundEffects />

            {/* Back to Careers */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/careers')}
                className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-[#64ffda] transition-colors group z-10"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Careers</span>
            </motion.button>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo / Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#112240] to-[#0a192f] border border-white/10 rounded-2xl flex items-center justify-center text-4xl shadow-2xl relative group">
                        <div className="absolute inset-0 bg-[#64ffda]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <ShieldCheck size={40} className="text-[#64ffda]" />
                    </div>
                </div>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-2">Assessment Login</h1>
                    <p className="text-slate-400">Please enter your credentials to begin the test</p>
                </div>

                {/* Login Form */}
                <div className="bg-[#112240]/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#64ffda]/50 to-transparent"></div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm"
                                >
                                    <AlertCircle size={18} />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Username Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#64ffda] transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    placeholder="Enter your username"
                                    className="w-full bg-[#0a192f]/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-[#64ffda]/50 focus:ring-1 focus:ring-[#64ffda]/50 transition-all placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#64ffda] transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Enter your password"
                                    className="w-full bg-[#0a192f]/50 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-[#64ffda]/50 focus:ring-1 focus:ring-[#64ffda]/50 transition-all placeholder:text-slate-600"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-[#64ffda] text-[#0a192f] font-black rounded-xl hover:bg-[#52dcb8] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#64ffda]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-3 border-[#0a192f]/30 border-t-[#0a192f] rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    LOG IN TO START
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Info Text */}
                <p className="text-center mt-8 text-slate-500 text-sm">
                    Protected assessment environment. Unauthorized access is prohibited.
                </p>
            </motion.div>
        </div>
    );
};

export default AssessmentLogin;
