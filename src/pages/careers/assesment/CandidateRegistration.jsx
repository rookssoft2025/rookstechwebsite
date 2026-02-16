import React, { useState, useEffect } from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

export default function CandidateRegistration() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    email: "",
    number: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }
    if (!formData.year.trim()) {
      newErrors.year = "Year is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.number.trim()) {
      newErrors.number = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.number.replace(/\D/g, ""))) {
      newErrors.number = "Phone number must be valid";
    }
    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Registration successful! You can now proceed to the exam.");
    }
  };

  return (
    <div>
      <div className="relative bg-[#071730] px-4 sm:px-6 lg:px-15 overflow-hidden pb-10">
        {/* Static Stars Layer */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 40px 70px, #FFFFFF, transparent),
              radial-gradient(2px 2px at 80px 130px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 90px 160px, #FFFFFF, transparent),
              radial-gradient(1.5px 1.5px at 120px 40px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 160px 90px, #FFFFFF, transparent),
              radial-gradient(2px 2px at 200px 60px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 220px 120px, #FFFFFF, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
          }}
        ></div>

        {/* Moving Stars Layer - Right to Left */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(3px 2px at 150px 150px, #FFFFFF, transparent),
              radial-gradient(3px 3px at 100px 250px, #FFFFFF, transparent),
              radial-gradient(3px 2px at 150px 180px, #FFFFFF, transparent),
              radial-gradient(3px 3px at 200px 180px, #FFFFFF, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "250px 250px",
            animation: "moveStarsRightToLeft 40s linear infinite",
          }}
        ></div>

        {/* Moving Stars Layer - Top to Bottom */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 50px 50px, #FFFFFF, transparent),
              radial-gradient(1.5px 1.5px at 120px 80px, #FFFFFF, transparent),
              radial-gradient(2.5px 2.5px at 180px 120px, #FFFFFF, transparent),
              radial-gradient(1px 1px at 240px 200px, #FFFFFF, transparent)
            `,
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
            animation: "moveStarsTopToBottom 35s linear infinite",
          }}
        ></div>

        <Navbar showNavbar={showNavbar} />

        <div className="relative z-10 pt-20 pb-20">
          <div className="">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-12 font-goodtimes">
              Candidate Assessment Registration
            </h1>
            <div className="flex gap-10">
              {/* Instructions Section */}
              <div className="glass-card mb-10 p-6 rounded-xl border border-white border-opacity-20">
                <div className="glass-card-inner rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Important Instructions</h2>
                  <p className="text-white text-opacity-90 mb-4">
                    <strong>Please read the following guidelines carefully before starting your assessment:</strong>
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="text-white text-opacity-80 flex items-start">
                      <span className="text-green-400 mr-3 font-bold">✓</span>
                      <span>
                        <strong>Tab Navigation:</strong> Do not navigate to any other tabs or browsers during the exam. This is strictly monitored.
                      </span>
                    </li>
                    <li className="text-white text-opacity-80 flex items-start">
                      <span className="text-green-400 mr-3 font-bold">✓</span>
                      <span>
                        <strong>First Violation:</strong> If you switch tabs or browsers, you will receive a warning notification at the first instance.
                      </span>
                    </li>
                    <li className="text-white text-opacity-80 flex items-start">
                      <span className="text-green-400 mr-3 font-bold">✓</span>
                      <span>
                        <strong>Second Violation:</strong> On the second occurrence, your form will automatically close and you will not be able to continue or resume the exam.
                      </span>
                    </li>
                    <li className="text-white text-opacity-80 flex items-start">
                      <span className="text-green-400 mr-3 font-bold">✓</span>
                      <span>
                        <strong>Exam Duration:</strong> The total exam duration is <strong>90 minutes</strong>. Please ensure you have enough time before starting.
                      </span>
                    </li>
                    <li className="text-white text-opacity-80 flex items-start">
                      <span className="text-green-400 mr-3 font-bold">✓</span>
                      <span>
                        <strong>Browser Features:</strong> Do not use developer tools, right-click menus, or any external aids during the assessment.
                      </span>
                    </li>
                    <li className="text-white text-opacity-80 flex items-start">
                      <span className="text-green-400 mr-3 font-bold">✓</span>
                      <span>
                        <strong>Network Connection:</strong> Ensure you have a stable internet connection throughout the exam.
                      </span>
                    </li>
                    <li className="text-white text-opacity-80 flex items-start">
                      <span className="text-green-400 mr-3 font-bold">✓</span>
                      <span>
                        <strong>Honest Attempt:</strong> Attempt the exam honestly. Any suspicious activity will result in disqualification.
                      </span>
                    </li>
                  </ul>
                  <p className="bg-yellow-400 bg-opacity-20 border border-yellow-400 border-opacity-40 rounded-lg p-4 text-yellow-100">
                    ⚠️ By proceeding, you agree to follow all the rules mentioned above. Violating these rules will result in immediate disqualification.
                  </p>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="glass-card p-8 rounded-xl border border-white border-opacity-20">
                <div className="glass-card-inner rounded-lg p-6">
                  {/* Full Name */}
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-white font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-green-400 focus:border-opacity-60 transition ${errors.name ? "border-red-500 border-opacity-60" : ""
                        }`}
                    />
                    {errors.name && <span className="text-red-400 text-sm mt-1 block">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-white font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-green-400 focus:border-opacity-60 transition ${errors.email ? "border-red-500 border-opacity-60" : ""
                        }`}
                    />
                    {errors.email && <span className="text-red-400 text-sm mt-1 block">{errors.email}</span>}
                  </div>

                  {/* Department and Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="department" className="block text-white font-semibold mb-2">
                        Department *
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-30 text-white focus:outline-none focus:border-green-400 focus:border-opacity-60 transition ${errors.department ? "border-red-500 border-opacity-60" : ""
                          }`}
                      >
                        <option value="" className="bg-gray-800 text-white">
                          Select Department
                        </option>
                        <option value="Engineering" className="bg-gray-800 text-white">
                          Engineering
                        </option>
                        <option value="Finance" className="bg-gray-800 text-white">
                          Finance
                        </option>
                        <option value="Marketing" className="bg-gray-800 text-white">
                          Marketing
                        </option>
                        <option value="Human Resources" className="bg-gray-800 text-white">
                          Human Resources
                        </option>
                        <option value="Operations" className="bg-gray-800 text-white">
                          Operations
                        </option>
                        <option value="Sales" className="bg-gray-800 text-white">
                          Sales
                        </option>
                        <option value="Other" className="bg-gray-800 text-white">
                          Other
                        </option>
                      </select>
                      {errors.department && <span className="text-red-400 text-sm mt-1 block">{errors.department}</span>}
                    </div>

                    <div>
                      <label htmlFor="year" className="block text-white font-semibold mb-2">
                        Year *
                      </label>
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-30 text-white focus:outline-none focus:border-green-400 focus:border-opacity-60 transition ${errors.year ? "border-red-500 border-opacity-60" : ""
                          }`}
                      >
                        <option value="" className="bg-gray-800 text-white">
                          Select Year
                        </option>
                        <option value="1st Year" className="bg-gray-800 text-white">
                          1st Year
                        </option>
                        <option value="2nd Year" className="bg-gray-800 text-white">
                          2nd Year
                        </option>
                        <option value="3rd Year" className="bg-gray-800 text-white">
                          3rd Year
                        </option>
                        <option value="4th Year" className="bg-gray-800 text-white">
                          4th Year
                        </option>
                        <option value="Experience" className="bg-gray-800 text-white">
                          Already Experienced
                        </option>
                      </select>
                      {errors.year && <span className="text-red-400 text-sm mt-1 block">{errors.year}</span>}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="mb-6">
                    <label htmlFor="number" className="block text-white font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="number"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      placeholder="Enter your 10-digit phone number"
                      className={`w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:border-green-400 focus:border-opacity-60 transition ${errors.number ? "border-red-500 border-opacity-60" : ""
                        }`}
                    />
                    {errors.number && <span className="text-red-400 text-sm mt-1 block">{errors.number}</span>}
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="mb-8 p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-20">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agree"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleInputChange}
                        className="mt-1 mr-3 w-5 h-5 rounded border-white border-opacity-40 accent-green-400"
                      />
                      <label htmlFor="agree" className="text-white text-opacity-90 flex-1 cursor-pointer">
                        I agree to all the terms and conditions mentioned above and I understand the consequences of violating any rule.
                      </label>
                    </div>
                    {errors.agree && <span className="text-red-400 text-sm mt-2 block">{errors.agree}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-400/50 transition transform hover:scale-105 active:scale-95"
                  >
                    Start Assessment
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}