import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

export default function CandidateRegistration() {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    stream: "",
    semester: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (showRulesModal || showSuccessModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRulesModal, showSuccessModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = "Name is required";
        } else if (value.trim().length < 2) {
          newErrors.name = "Name must be at least 2 characters";
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case 'stream':
        if (!value) {
          newErrors.stream = "Please select your stream";
        } else {
          delete newErrors.stream;
        }
        break;

      case 'semester':
        if (!value) {
          newErrors.semester = "Please select your semester";
        } else {
          delete newErrors.semester;
        }
        break;

      case 'number':
        const cleaned = value.replace(/\D/g, '');
        if (!value.trim()) {
          newErrors.number = "Phone number is required";
        } else if (!/^\d{10}$/.test(cleaned)) {
          newErrors.number = "Please enter a valid 10-digit phone number";
        } else {
          delete newErrors.number;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.stream) {
      newErrors.stream = "Please select your stream";
      isValid = false;
    }

    if (!formData.semester) {
      newErrors.semester = "Please select your semester";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.number.trim()) {
      newErrors.number = "Phone number is required";
      isValid = false;
    } else {
      const cleaned = formData.number.replace(/\D/g, '');
      if (!/^\d{10}$/.test(cleaned)) {
        newErrors.number = "Please enter a valid 10-digit phone number";
        isValid = false;
      }
    }

    setErrors(newErrors);

    const allTouched = {};
    Object.keys(formData).forEach(key => allTouched[key] = true);
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowRulesModal(true);
      setModalStep(1);
      setRulesAccepted(false);
    }
  };

  const handleRulesAccept = () => {
    setModalStep(2);
  };

  const handleFinalAccept = () => {
    setRulesAccepted(true);
    setShowRulesModal(false);
    setShowSuccessModal(true);

    console.log("Form submitted with rules acceptance:", {
      ...formData,
      acceptedAt: new Date().toISOString()
    });
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    navigate("/careers/assessment-test");
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 10) {
      return cleaned;
    }
    return cleaned.slice(0, 10);
  };

  // Rules array as specified
  const rules = [
    {
      title: "Tab Monitoring",
      desc: "Do not switch tabs or minimize the browser window. Any tab switch will be recorded.",
      icon: "🖥️"
    },
    {
      title: "Warning System",
      desc: "First switch triggers a warning; the second switch automatically terminates the exam.",
      icon: "⚠️"
    },
    {
      title: "Time Limit",
      desc: "You have exactly 90 minutes to complete all sections. Timer cannot be paused.",
      icon: "⏱️"
    },
    {
      title: "Environment",
      desc: "Ensure you are in a quiet room with a stable internet connection and proper lighting.",
      icon: "🌍"
    },
    {
      title: "No External Aids",
      desc: "Use of mobile phones, books, or external resources is strictly prohibited.",
      icon: "🚫"
    }
  ];

  return (
    <div className="min-h-screen bg-[#071730] flex flex-col font-sans selection:bg-[#64ffda] selection:text-[#0a192f]">
      {/* Background with Stars and Animations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 40px 70px, #FFFFFF, transparent),
              radial-gradient(2px 2px at 80px 130px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 90px 160px, #FFFFFF, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
          }}
        ></div>

        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#64ffda]/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      {/* <Navbar showNavbar={showNavbar} /> */}

      <main className="relative z-10 flex-grow pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className={`text-center mb-16 transition-all duration-1000 ${initialLoad ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-goodtimes tracking-wider">
              CANDIDATE <span className="text-[#64ffda]">REGISTRATION</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Please register your details carefully. Your information will be used to monitor your assessment progress and for future communications.
            </p>
          </div>

          <div className="max-w-3xl mx-auto items-center">
            {/* Registration Form */}
            <div className={`bg-[#0a192f]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative transition-all duration-700 ${initialLoad ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-white tracking-tight">Candidate Information</h2>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div key={step} className={`w-2 h-2 rounded-full transition-all duration-300 ${Object.keys(touched).length >= step ? 'bg-[#64ffda]' : 'bg-white/20'
                        }`}></div>
                    ))}
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Name Field */}
                  <div className="relative">
                    <label className="block text-slate-300 text-sm font-bold mb-2 ml-1 flex items-center gap-2">
                      <span>Full Name</span>
                      {touched.name && !errors.name && <span className="text-green-500 text-xs">✓</span>}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        👤
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Enter your full name"
                        className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : touched.name && !errors.name ? 'border-green-500' : 'border-white/10'} focus:border-[#64ffda] rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-600 outline-none transition-all hover:bg-white/10`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <label className="block text-slate-300 text-sm font-bold mb-2 ml-1 flex items-center gap-2">
                      <span>Email Address</span>
                      {touched.email && !errors.email && <span className="text-green-500 text-xs">✓</span>}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        📧
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="your.email@example.com"
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : touched.email && !errors.email ? 'border-green-500' : 'border-white/10'} focus:border-[#64ffda] rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-600 outline-none transition-all hover:bg-white/10`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Engineering Stream Field */}
                    <div className="relative">
                      <label className="block text-slate-300 text-sm font-bold mb-2 ml-1 flex items-center gap-2">
                        <span>Engineering Stream</span>
                        {touched.stream && !errors.stream && <span className="text-green-500 text-xs">✓</span>}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10">
                          ⚙️
                        </span>
                        <select
                          name="stream"
                          value={formData.stream}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full bg-white/5 border ${errors.stream ? 'border-red-500' : touched.stream && !errors.stream ? 'border-green-500' : 'border-white/10'} focus:border-[#64ffda] rounded-xl pl-12 pr-4 py-4 text-white outline-none transition-all appearance-none hover:bg-white/10`}
                        >
                          <option value="" className="bg-[#0a192f] text-slate-400">Select Stream</option>
                          <option value="CSC" className="bg-[#0a192f]">Computer Science & Engineering (CSC)</option>
                          <option value="IT" className="bg-[#0a192f]">Information Technology (IT)</option>
                          <option value="ECE" className="bg-[#0a192f]">Electronics & Communication (ECE)</option>
                          <option value="EEE" className="bg-[#0a192f]">Electrical & Electronics (EEE)</option>
                          <option value="Mech" className="bg-[#0a192f]">Mechanical Engineering</option>
                          <option value="Civil" className="bg-[#0a192f]">Civil Engineering</option>
                          <option value="Other" className="bg-[#0a192f]">Other Available Streams</option>
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">▼</span>
                      </div>
                      {errors.stream && (
                        <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                          <span>⚠️</span>
                          {errors.stream}
                        </p>
                      )}
                    </div>

                    {/* Semester Field */}
                    <div className="relative">
                      <label className="block text-slate-300 text-sm font-bold mb-2 ml-1 flex items-center gap-2">
                        <span>Current Semester</span>
                        {touched.semester && !errors.semester && <span className="text-green-500 text-xs">✓</span>}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10">
                          🗓️
                        </span>
                        <select
                          name="semester"
                          value={formData.semester}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full bg-white/5 border ${errors.semester ? 'border-red-500' : touched.semester && !errors.semester ? 'border-green-500' : 'border-white/10'} focus:border-[#64ffda] rounded-xl pl-12 pr-4 py-4 text-white outline-none transition-all appearance-none hover:bg-white/10`}
                        >
                          <option value="" className="bg-[#0a192f] text-slate-400">Select semester</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                            <option key={sem} value={sem} className="bg-[#0a192f]">Semester {sem}</option>
                          ))}
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">▼</span>
                      </div>
                      {errors.semester && (
                        <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                          <span>⚠️</span>
                          {errors.semester}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="relative">
                    <label className="block text-slate-300 text-sm font-bold mb-2 ml-1 flex items-center gap-2">
                      <span>Phone Number</span>
                      {touched.number && !errors.number && <span className="text-green-500 text-xs">✓</span>}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        📱
                      </span>
                      <input
                        type="tel"
                        name="number"
                        value={formData.number}
                        onChange={(e) => {
                          const formatted = formatPhoneNumber(e.target.value);
                          handleInputChange({ target: { name: 'number', value: formatted } });
                        }}
                        onBlur={handleBlur}
                        placeholder="10-digit mobile number"
                        maxLength="10"
                        className={`w-full bg-white/5 border ${errors.number ? 'border-red-500' : touched.number && !errors.number ? 'border-green-500' : 'border-white/10'} focus:border-[#64ffda] rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-600 outline-none transition-all hover:bg-white/10`}
                      />
                    </div>
                    {errors.number && (
                      <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.number}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#64ffda] to-[#4fd1b5] text-[#0a192f] font-black text-lg py-5 rounded-[1.5rem] mt-8 transition-all transform hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(100,255,218,0.3)] active:scale-95 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    START ASSESSMENT
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>

                <div className="mt-4 text-center text-sm text-slate-500">
                  {Object.keys(touched).length} of 5 fields completed
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Rules Confirmation Modal */}
      {showRulesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowRulesModal(false)}
          ></div>

          <div className="relative bg-gradient-to-b from-[#0a192f] to-[#071730] border border-[#64ffda]/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-modalSlide">
            <div className="p-8 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="p-2 bg-[#64ffda]/10 rounded-lg text-[#64ffda]">
                    {modalStep === 1 ? '📋' : '✅'}
                  </span>
                  {modalStep === 1 ? 'Assessment Rules' : 'Confirm Agreement'}
                </h2>
                <button
                  onClick={() => setShowRulesModal(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-8 overflow-y-auto max-h-[60vh]">
              {modalStep === 1 ? (
                <div className="space-y-6">
                  <div className="flex justify-center gap-2 mb-8">
                    {[1, 2].map((step) => (
                      <div
                        key={step}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${step === modalStep ? 'w-8 bg-[#64ffda]' : 'bg-white/20'
                          }`}
                      ></div>
                    ))}
                  </div>

                  {/* Rules in Modal - Exactly as specified */}
                  <div className="space-y-4">
                    {rules.map((rule, idx) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-[#64ffda]/30 transition-all">
                        <div className="flex gap-4">
                          <span className="text-2xl">{rule.icon}</span>
                          <div>
                            <h3 className="text-white font-bold mb-1">{rule.title}</h3>
                            <p className="text-slate-400 text-sm">{rule.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 mt-6">
                    <p className="text-red-400 text-sm flex gap-3">
                      <span className="text-xl">⚠️</span>
                      <span className="font-medium">Important: Any violation of these rules will result in immediate disqualification from the assessment.</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Terms of Agreement</h3>
                    <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                      <p>
                        By proceeding with the assessment, you acknowledge and agree to the following:
                      </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Your browser activity will be monitored in real-time</li>
                        <li>Tab switching will be recorded and may lead to termination</li>
                        <li>You have 90 minutes to complete the assessment</li>
                        <li>You must be in a quiet environment with stable internet</li>
                        <li>No external aids or resources are permitted</li>
                      </ul>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rulesAccepted}
                      onChange={(e) => setRulesAccepted(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-[#64ffda] focus:ring-[#64ffda]"
                    />
                    <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                      I have read and agree to all the proctoring rules and terms mentioned above.
                      I understand that any violation will lead to immediate disqualification.
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-white/10 bg-gradient-to-t from-[#0a192f] to-transparent">
              <div className="flex gap-4">
                {modalStep === 1 ? (
                  <>
                    <button
                      onClick={() => setShowRulesModal(false)}
                      className="flex-1 px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRulesAccept}
                      className="flex-1 px-6 py-3 bg-[#64ffda] text-[#0a192f] font-bold rounded-xl hover:bg-[#4fd1b5] transition-colors"
                    >
                      Continue →
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setModalStep(1)}
                      className="flex-1 px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleFinalAccept}
                      disabled={!rulesAccepted}
                      className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${rulesAccepted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                        : 'bg-white/10 text-white/50 cursor-not-allowed'
                        }`}
                    >
                      Confirm & Start
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleCloseSuccess}
          ></div>

          <div className="relative bg-gradient-to-b from-[#0a192f] to-[#071730] border border-[#64ffda]/20 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl animate-modalSlide">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">Registration Successful!</h2>
            <p className="text-slate-400 mb-6">
              You have successfully agreed to the proctoring rules. You can now proceed to your assessment.
            </p>

            <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
              <h3 className="text-[#64ffda] font-bold mb-3">Registration Summary:</h3>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-slate-400">Name:</span>
                  <span className="text-white font-medium">{formData.name}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-white font-medium">{formData.email}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Stream:</span>
                  <span className="text-white font-medium">{formData.stream}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Semester:</span>
                  <span className="text-white font-medium">Semester {formData.semester}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleCloseSuccess}
              className="w-full bg-gradient-to-r from-[#64ffda] to-[#4fd1b5] text-[#0a192f] font-bold py-4 rounded-xl hover:from-[#4fd1b5] hover:to-[#3bb89a] transition-all transform hover:scale-[1.02]"
            >
              Start Assessment
            </button>

            <p className="text-xs text-slate-500 mt-4">
              You will be redirected to the assessment dashboard
            </p>
          </div>
        </div>
      )}

      {/* <Footer /> */}

      <style jsx>{`
        @keyframes modalSlide {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modalSlide {
          animation: modalSlide 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}