import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      className="relative p-6 rounded-2xl overflow-hidden bg-[#0F2239] border border-[#FFFFFF1A] shadow-md cursor-pointer"
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    >
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-6 text-white flex items-center">
          {title}
        </h3>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 bg-sky-500"></div>
              <span className="text-white/80 text-sm">{feature.text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onButtonClick}
          className="group flex items-center text-sky-300 font-medium text-sm hover:text-sky-100 transition-colors duration-300"
        >
          {buttonLabel}
        </button>
      </div>
    </motion.div>
  );

};

const OurServices = () => {
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
        whileInView="visible"
        viewport={{ once: true }}
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
              onClick={() => navigate("/solutions")}
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
              onClick={() => navigate("/services")}
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
              onClick={() => navigate("/research")}
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
              variant="left"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OurServices;
