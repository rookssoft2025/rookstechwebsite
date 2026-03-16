import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Check if user is already logged in
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to dashboard
                navigate('/dashboard/proposal');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    // Star background animation with continuous movement
    const StarBackground = () => {
        const [stars, setStars] = useState([]);

        useEffect(() => {
            const generateStars = () => {
                const newStars = [];
                for (let i = 0; i < 150; i++) {
                    newStars.push({
                        id: i,
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        size: Math.random() * 3 + 1,
                        opacity: Math.random() * 0.7 + 0.3,
                        duration: Math.random() * 10 + 5,
                        delay: Math.random() * 5,
                        moveX: (Math.random() - 0.5) * 2,
                        moveY: (Math.random() - 0.5) * 2,
                        moveDuration: Math.random() * 20 + 20,
                    });
                }
                setStars(newStars);
            };

            generateStars();
        }, []);

        return (
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {stars.map(star => (
                    <motion.div
                        key={star.id}
                        className="absolute bg-white rounded-full"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            opacity: star.opacity,
                        }}
                        animate={{
                            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                            scale: [1, 1.2, 1],
                            x: [0, star.moveX * 10, 0],
                            y: [0, star.moveY * 10, 0],
                        }}
                        transition={{
                            duration: star.moveDuration,
                            delay: star.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Animated shooting stars */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/80 rounded-full"
                        style={{
                            width: '2px',
                            height: '2px',
                            filter: 'blur(1px)',
                        }}
                        animate={{
                            x: [Math.random() * -100, window.innerWidth + 100],
                            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 1,
                            delay: i * 3,
                            repeat: Infinity,
                            repeatDelay: Math.random() * 5,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>
        );
    };

    // Floating planets/animated elements
    const FloatingElements = () => {
        return (
            <>
                <motion.div
                    className="absolute -left-32 top-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-500/10"
                    animate={{
                        y: [0, -40, 0, 20, 0],
                        x: [0, 15, 0, -10, 0],
                        rotate: [0, 5, -3, 2, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute right-20 top-1/3 w-8 h-8 rounded-full bg-blue-400/20 blur-sm"
                    animate={{
                        y: [0, -50, 30, -20, 0],
                        x: [0, 25, -15, 10, 0],
                        scale: [1, 1.3, 0.8, 1.2, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute left-1/4 bottom-1/4 w-6 h-6 rounded-full bg-blue-400/20 blur-sm"
                    animate={{
                        y: [0, 60, -30, 40, 0],
                        x: [0, -25, 20, -15, 0],
                        scale: [1, 1.4, 0.7, 1.3, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3,
                    }}
                />

                <motion.div
                    className="absolute right-1/3 top-1/2 w-4 h-4 rounded-full bg-cyan-400/20 blur-sm"
                    animate={{
                        y: [0, -30, 50, -40, 10, 0],
                        x: [0, 20, -30, 25, -15, 0],
                        scale: [1, 1.5, 0.6, 1.4, 0.9, 1],
                    }}
                    transition={{
                        duration: 28,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 7,
                    }}
                />

                <motion.div
                    className="absolute left-1/2 top-1/5 w-5 h-5 rounded-full bg-pink-400/15 blur-sm"
                    animate={{
                        y: [0, 40, -20, 30, -10, 0],
                        x: [0, -20, 35, -25, 15, 0],
                        scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 5,
                    }}
                />
            </>
        );
    };

    // Nebula pulse effect
    const NebulaEffect = () => {
        return (
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-900/10 to-transparent"
                    animate={{
                        opacity: [0.05, 0.2, 0.05, 0.15, 0.05],
                        scale: [1, 1.1, 0.95, 1.05, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-blue-900/10 to-transparent"
                    animate={{
                        opacity: [0.1, 0.25, 0.1, 0.2, 0.1],
                        scale: [1, 1.05, 0.98, 1.02, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />

                <motion.div
                    className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-pink-900/5 to-transparent"
                    animate={{
                        opacity: [0.03, 0.12, 0.03, 0.08, 0.03],
                        x: [0, 10, -5, 8, 0],
                        y: [0, -8, 5, -6, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4,
                    }}
                />
            </div>
        );
    };

    // Updated validation for email/password
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    // Updated login handler with Firebase and Remember Me
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});
        setSuccess('');

        try {
            // Firebase authentication
            await signInWithEmailAndPassword(auth, formData.email, formData.password);

            setSuccess('Login successful! Redirecting...');

            // Optionally save session data (not recommended for sensitive data)
            sessionStorage.setItem('isLoggedIn', 'true');

            // Redirect to dashboard
            setTimeout(() => {
                navigate('/dashboard/proposal');
            }, 1500);

        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Login failed. Please check your credentials.';

            // Firebase error handling
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    errorMessage = 'Invalid email or password.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address.';
                    break;
                case 'auth/user-disabled':
                    errorMessage = 'This account has been disabled.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many failed attempts. Please try again later.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Please check your connection.';
                    break;
            }

            setErrors({ submit: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            <StarBackground />
            <FloatingElements />
            <NebulaEffect />

            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-blue-900/5"></div>

            <div className="max-w-md w-full relative z-10">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/')}
                    className="flex items-center text-white/70 hover:text-white mb-8 transition-colors duration-300 backdrop-blur-sm bg-white/5 rounded-xl px-4 py-2 border border-white/10 hover:border-white/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10 shadow-blue-500/10 relative overflow-hidden"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-blue-600/20 rounded-3xl blur-sm opacity-50"></div>

                    <div className="relative">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                            >
                                Welcome Back
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white/60"
                            >
                                Sign in to your account to continue
                            </motion.p>
                        </div>

                        {/* Success Message */}
                        <AnimatePresence>
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                    className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center backdrop-blur-sm"
                                >
                                    <CheckCircle2 size={20} className="text-green-400 mr-2" />
                                    <span className="text-green-400 text-sm">{success}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Error Message */}
                        <AnimatePresence>
                            {errors.submit && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                    className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center backdrop-blur-sm"
                                >
                                    <AlertCircle size={20} className="text-red-400 mr-2" />
                                    <span className="text-red-400 text-sm">{errors.submit}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail
                                        size={20}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"
                                    />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-3 bg-white/5 border backdrop-blur-sm ${errors.email ? 'border-red-500/50' : 'border-white/10'
                                            } rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300`}
                                        placeholder="Enter your email"
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-400 text-sm mt-2 flex items-center"
                                    >
                                        <AlertCircle size={16} className="mr-1" />
                                        {errors.email}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock
                                        size={20}
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40"
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className={`w-full pl-10 pr-12 py-3 bg-white/5 border backdrop-blur-sm ${errors.password ? 'border-red-500/50' : 'border-white/10'
                                            } rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300`}
                                        placeholder="Enter your password"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-300"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>

                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-400 text-sm mt-2 flex items-center"
                                    >
                                        <AlertCircle size={16} className="mr-1" />
                                        {errors.password}
                                    </motion.p>
                                )}
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center relative overflow-hidden group"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </motion.button>
                        </form>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;