// import React from "react";
// import { motion } from "framer-motion";
// import Navbar from "../../components/layout/Navbar";
// import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
// import group1 from "../../assets/group1.svg";
// import group2 from "../../assets/group2.svg";
// import holo from "../../assets/holo.svg";
// import AnimatedButton from "../../uiComponents/AnimatedButton";
// import GlassCard from "../../uiComponents/GlassCard";
// import { useNavigate } from "react-router-dom";

// export default function Hero() {

//     const navigate = useNavigate();
//     // Variants for animations
//     const fadeInUp = {
//         hidden: { opacity: 0, y: 40 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.8,
//                 ease: [0.25, 0.46, 0.45, 0.94]
//             }
//         },
//     };

//     const fadeInLeft = {
//         hidden: { opacity: 0, x: -40 },
//         visible: {
//             opacity: 1,
//             x: 0,
//             transition: {
//                 duration: 1,
//                 ease: [0.25, 0.46, 0.45, 0.94]
//             }
//         },
//     };

//     const fadeInRight = {
//         hidden: { opacity: 0, x: 40 },
//         visible: {
//             opacity: 1,
//             x: 0,
//             transition: {
//                 duration: 1,
//                 ease: [0.25, 0.46, 0.45, 0.94]
//             }
//         },
//     };

//     const staggerContainer = {
//         visible: {
//             transition: {
//                 staggerChildren: 0.15,
//                 delayChildren: 0.3
//             }
//         }
//     };

//     const techFeatures = [
//         { text: "Web & Mobile Apps", color: "bg-yellow-400" },
//         { text: "E-Commerce Platforms", color: "bg-cyan-400" },
//         { text: "UI/UX Designing", color: "bg-pink-400" },
//         { text: "Custom Software Development", color: "bg-purple-400" },
//         { text: "Product Maintenance & Support", color: "bg-blue-400" },
//     ];

//     const itservices = [
//         { text: "Cloud Deployment & Management", color: "bg-purple-400" },
//         { text: "Cybersecurity & Secure Transactions", color: "bg-green-400" },
//         { text: "IT Infrastructure & Support", color: "bg-yellow-400" },
//         { text: "System Integration & IoT", color: "bg-pink-400" },
//         { text: "AI/ML & Data Solutions", color: "bg-cyan-400" },
//     ];

//     const research = [
//         { text: "AI, ML & Deep Learning Research", color: "bg-blue-400" },
//         { text: "Blockchain & Emerging Technologies", color: "bg-purple-400" },
//         { text: "Simulation & Robotics", color: "bg-green-400" },
//         { text: "Federated Learning & Privacy Solutions", color: "bg-yellow-400" },
//         { text: "Prototyping & Product Innovation", color: "bg-pink-400" },
//     ];

//     return (
//         <>
//             <div className="relative z-10 px-4 mt-10 max-w-7xl mx-auto">
//                 {/* Mobile Holo Background */}
//                 <div className="sm:hidden absolute inset-0 -z-10 overflow-hidden">
//                     <img
//                         src={holo}
//                         alt="holo background"
//                         className="w-full h-full object-cover animate-[spin_20s_linear_infinite] opacity-15"
//                     />
//                 </div>

//                 {/* Main Content */}
//                 <motion.div
//                     className="flex flex-col lg:flex-row justify-between items-center gap-10"
//                     initial="hidden"
//                     animate="visible"
//                     variants={staggerContainer}
//                 >
//                     {/* Left Side Content */}
//                     <motion.div
//                         className="flex-1 max-w-2xl"
//                         variants={fadeInUp}
//                     >
//                         <motion.div
//                             className="relative z-10 flex items-center mt-5"
//                             variants={fadeInUp}
//                         >
//                             <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-[#FFFFFF1A] shadow-lg">
//                                 <Sparkles className="w-5 h-5 text-cyan-400" />
//                                 <p className="text-center text-base font-medium whitespace-nowrap">
//                                     Next-Gen IT, Today
//                                 </p>
//                             </div>
//                         </motion.div>

//                         <motion.h1
//                             className="relative z-10 mt-8"
//                             variants={fadeInUp}
//                         >
//                             <span className="font-goodtimes text-3xl md:text-4xl lg:text-5xl text-white leading-tight block">
//                                 Complete IT Solutions
//                             </span>
//                             <span className="font-goodtimes text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 leading-tight block mt-2">
//                                 Under One Roof
//                             </span>
//                         </motion.h1>

//                         <motion.div
//                             className="relative z-10 mt-6"
//                             variants={fadeInUp}
//                         >
//                             <p className="font-goodtimes text-xl md:text-2xl text-white/90 leading-relaxed">
//                                 Smart IT, Seamless Research, and Scalable Products Built for You.
//                                 From Web, Apps, and Cloud to Security, Research, and Product Innovation.
//                             </p>
//                         </motion.div>
//                             <motion.div
//                                 className="relative z-10 mt-12 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center md:items-start"
//                                 variants={fadeInUp}
//                             >

//                                 <button onClick={() => navigate("/services")} className="h-11.5 w-fit cursor-pointer px-6 py-1 rounded-full bg-white text-black hover:bg-[#0B3470] hover:text-white text-sm font-semibold transition-colors duration-300 whitespace-nowrap border border-transparent hover:border-white/20">
//                                     Explore Our Services
//                                 </button>
//                                 <AnimatedButton label="Let's Work Together" />
//                             </motion.div>

//                     </motion.div>

//                     {/* Right Side Holo Image */}
//                     <motion.div
//                         className="hidden lg:block flex-1 max-w-md xl:max-w-lg"
//                         variants={fadeInRight}
//                     >
//                         <div className="relative">
//                             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//                             <img
//                                 className=" relative z-10 animate-[spin_30s_linear_infinite]"
//                                 src={holo}
//                                 alt="Holographic technology visualization"
//                             />
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             </div>

//             {/* Cards Section */}
//             <div className="relative z-10 mt-20 px-4 max-w-7xl mx-auto">
//                 <div className="flex items-center justify-center text-white mb-10">
//                     <p className="text-2xl md:text-[36px]">Our Services</p>
//                 </div>
//                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
//                     <div className="w-[300px] sm:w-[400px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[700px] rounded-full bg-gradient-radial from-cyan-400/30 via-blue-500/20 to-transparent blur-[80px] sm:blur-[100px]"></div>
//                 </div>

//                 <motion.div
//                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                     initial="hidden"
//                     animate="visible"
//                     variants={staggerContainer}
//                 >
//                     <motion.div variants={fadeInLeft}>
//                         <GlassCard
//                             title="Software & Tech Solutions"
//                             features={techFeatures}
//                             buttonLabel="Explore"
//                             onButtonClick={() => console.log("Tech Solutions explored")}
//                         />
//                     </motion.div>

//                     <motion.div variants={fadeInUp}>
//                         <GlassCard
//                             title="IT Services"
//                             features={itservices}
//                             buttonLabel="Explore"
//                             onButtonClick={() => console.log("IT Services explored")}
//                         />
//                     </motion.div>

//                     <motion.div variants={fadeInRight}>
//                         <GlassCard
//                             title="Research & Innovation"
//                             features={research}
//                             buttonLabel="Explore"
//                             onButtonClick={() => console.log("R&D explored")}
//                         />
//                     </motion.div>
//                 </motion.div>
//             </div>
//         </>
//     );
// }

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import group1 from "../../assets/group1.svg";
import group2 from "../../assets/group2.svg";
import holo from "../../assets/holo.svg";
import AnimatedButton from "../../uiComponents/AnimatedButton";
import { useNavigate } from "react-router-dom";

// New GlassCard component with neon effects
const GlassCard = ({ title, features, buttonLabel, onButtonClick, variant = "left" }) => {
  const getGradient = () => {
    switch (title) {
      case "Software & Tech Solutions":
        return "from-sky-500/10 to-blue-600/10";
      case "IT Services":
        return "from-blue-500/10 to-indigo-600/10";
      case "Research & Innovation":
        return "from-green-500/10 to-emerald-600/10";
      default:
        return "from-sky-500/10 to-blue-600/10";
    }
  };

  const getNeonColor = () => {
    switch (title) {
      case "Software & Tech Solutions":
        return "sky";
      case "IT Services":
        return "purple";
      case "Research & Innovation":
        return "green";
      default:
        return "sky";
    }
  };

  const neonColor = getNeonColor();
  
  return (
    <motion.div 
      className="glass-card relative p-6 rounded-2xl overflow-hidden border border-white/10"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-sky-500/10 to-blue-600/10 opacity-50`}></div>
      <div className={`absolute -inset-1 rounded-2xl bg-sky-500/40 opacity-20 blur-lg transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <h3 className={`text-xl font-bold mb-6 text-white flex items-center`}>
          <span className={`inline-block w-3 h-3 rounded-full mr-3 bg-sky-500 shadow-lg shadow-sky-500/50`}></span>
          {title}
        </h3>
        
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 bg-sky-500`}></div>
              <span className="text-white/80 text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
        
        <button
          onClick={onButtonClick}
          className={`group flex items-center text-sky-300 font-medium text-sm hover:text-sky-100 transition-colors duration-300`}
        >
          {buttonLabel}
          <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const navigate = useNavigate();
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const techFeatures = [
    { text: "Web & Mobile Apps", color: "bg-yellow-400" },
    { text: "E-Commerce Platforms", color: "bg-sky-400" },
    { text: "UI/UX Designing", color: "bg-blue-400" },
    { text: "Custom Software Development", color: "bg-purple-400" },
    { text: "Product Maintenance & Support", color: "bg-blue-400" },
  ];

  const itservices = [
    { text: "Cloud Deployment & Management", color: "bg-purple-400" },
    { text: "Cybersecurity & Secure Transactions", color: "bg-green-400" },
    { text: "IT Infrastructure & Support", color: "bg-yellow-400" },
    { text: "System Integration & IoT", color: "bg-blue-400" },
    { text: "AI/ML & Data Solutions", color: "bg-sky-400" },
  ];

  const research = [
    { text: "AI, ML & Deep Learning Research", color: "bg-blue-400" },
    { text: "Blockchain & Emerging Technologies", color: "bg-purple-400" },
    { text: "Simulation & Robotics", color: "bg-green-400" },
    { text: "Federated Learning & Privacy Solutions", color: "bg-yellow-400" },
    { text: "Prototyping & Product Innovation", color: "bg-blue-400" },
  ];

  return (
    <>
      <div className="relative z-10 px-4 mt-10 max-w-7xl mx-auto">
        <div className="sm:hidden absolute inset-0 -z-10 overflow-hidden">
          <img
            src={holo}
            alt="holo background"
            className="w-full h-full object-cover animate-[spin_20s_linear_infinite] opacity-15"
          />
        </div>
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-center gap-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            className="flex-1 max-w-2xl"
            variants={fadeInUp}
          >
            <motion.div
              className="relative z-10 flex items-center mt-5"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-[#FFFFFF1A] shadow-lg">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <p className="text-center text-base font-medium whitespace-nowrap">
                  Next-Gen IT, Today
                </p>
              </div>
            </motion.div>

            <motion.h1
              className="relative z-10 mt-8"
              variants={fadeInUp}
            >
              <span className="font-goodtimes text-3xl md:text-4xl  text-white leading-tight block">
                Complete IT Solutions
              </span>
              <span className="font-goodtimes text-4xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 leading-tight block mt-2">
                Under One Roof
              </span>
            </motion.h1>

            <motion.div
              className="relative z-10 mt-6"
              variants={fadeInUp}
            >
              <p className=" text-xl md:text-2xl text-white/90 leading-relaxed">
                Smart IT, Seamless Research, and Scalable Products Built for You.
                From Web, Apps, and Cloud to Security, Research, and Product Innovation
              </p>
            </motion.div>
            <motion.div
              className="relative z-10 mt-12 flex flex-col sm:flex-row gap-4 items-start"
              variants={fadeInUp}
            >

              <button onClick={() => navigate("/services")} className="h-11.5 cursor-pointer px-6 py-1 rounded-full bg-white text-black hover:bg-[#0B3470] hover:text-white text-sm font-semibold transition-colors duration-300 whitespace-nowrap border border-transparent hover:border-white/20">
                Explore Our Services
              </button>
              <AnimatedButton label="Let's Work Together" />
            </motion.div>

          </motion.div>
          <motion.div
            className="hidden lg:block flex-1 max-w-md xl:max-w-lg"
            variants={fadeInRight}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
              <img
                className=" relative z-10 animate-[spin_30s_linear_infinite]"
                src={holo}
                alt="Holographic technology visualization"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="relative z-10 mt-20 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-center text-white mb-10">
          <p className="text-2xl md:text-[36px] font-goodtimes">Our Services</p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
          <div className="w-[300px] sm:w-[400px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[700px] rounded-full bg-gradient-radial from-sky-400/10 via-blue-500/5 to-transparent blur-[80px] sm:blur-[100px]"></div>
        </div>

        <motion.div
          className="flex flex-col gap-8 lg:gap-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
            variants={fadeInLeft}
          >
            <div className="lg:pr-10">
              <h3 className="text-2xl font-bold text-sky-300 mb-4">Innovative Development</h3>
              <p className="text-white/80 mb-6">
                We create cutting-edge software solutions tailored to your business needs, 
                from intuitive web and mobile applications to robust e-commerce platforms.
              </p>
              <button 
                onClick={() => navigate("/services/software")}
                className="flex items-center text-sky-300 font-medium group"
              >
                Discover our tech solutions
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            <div>
              <GlassCard
                title="Software & Tech Solutions"
                features={techFeatures}
                buttonLabel="Explore"
                onButtonClick={() => navigate("/services/software")}
                variant="left"
              />
            </div>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
            variants={fadeInRight}
          >
            <div className="lg:order-2 lg:pl-10">
              <h3 className="text-2xl font-bold text-sky-300 mb-4">Infrastructure & Security</h3>
              <p className="text-white/80 mb-6">
                Our comprehensive IT services ensure your systems are secure, scalable, 
                and optimized for performance in today's digital landscape.
              </p>
              <button 
                onClick={() => navigate("/services/it")}
                className="flex items-center text-sky-300 font-medium group"
              >
                Explore IT services
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            <div className="lg:order-1">
              <GlassCard
                title="IT Services"
                features={itservices}
                buttonLabel="Explore"
                onButtonClick={() => navigate("/services/it")}
                variant="right"
              />
            </div>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
            variants={fadeInLeft}
          >
            <div className="lg:pr-10">
              <h3 className="text-2xl font-bold text-sky-300 mb-4">Future Technologies</h3>
              <p className="text-white/80 mb-6">
                Our R&D division explores emerging technologies to keep you at the forefront 
                of innovation, from AI and blockchain to robotics and privacy solutions.
              </p>
              <button 
                onClick={() => navigate("/services/research")}
                className="flex items-center text-sky-300 font-medium group"
              >
                See our research
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
            <div>
              <GlassCard
                title="Research & Innovation"
                features={research}
                buttonLabel="Explore"
                onButtonClick={() => navigate("/services/research")}
                variant="left"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}