import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import jothiVideo from "../../assets/videos/jothi.mp4";
import parkInsight from "../../assets/videos/parkInsight.mp4";
import rooks from "../../assets/videos/rooks.mp4";
import jothiImg from "../../assets/work/jothi.jpg";
import constructionImg from "../../assets/work/construction.jpg";
import FunitureImg from "../../assets/work/furImg.jpg";
import ServiceImg from "../../assets/work/serImg.jpg";
import charityImg from "../../assets/work/charity.jpg";
import hmsimg from "../../assets/work/hmsImg.jpg";
import tmsimg from "../../assets/work/tsm.jpg"
export default function WorkCards() {
    const workCards = [
        {
            title: "Jothi Decor",
            category: "E-commerce Website",
            description:
                "Designed and developed jothidecor.in, a website for Jothi Rajalekshmi curtains and furnishing shop, offering a wide range of elegant curtains, fabrics, and home decor solutions.",
            video: jothiVideo,
            link: "https://jothidecor.in",
            img: jothiImg,
            tags: ["React", "Landing Page", "UI/UX"]
        },
        {
            title: "Rooks CST",
            category: "Construction Management App",
            description:
                "We developed Rooks CST, a mobile application for construction site management, helping teams streamline tasks, track progress, and manage resources efficiently.",
            video: rooks,
            link: "/work/rooks-cst",
            img: constructionImg,
            tags: ["Mobile App", "Construction", "Project Management"]
        },
        {
            title: "ServNex",
            category: "Service Management Platform",
            description:
                "Servnex is a mobile application designed to track and manage computer hardware, biometric devices, and other technical service operations. It helps monitor service requests, technician assignments, repair status, maintenance history, and customer records, ensuring efficient service delivery and real-time tracking.",
            video: jothiVideo,
            link: "/work/servnex",
            img: ServiceImg,
            tags: ["Service Management", "Mobile App", "IoT"]
        },
        {
            title: "Factory Management System",
            category: "Manufacturing Solution",
            description:
                "Factory Management System is a software solution designed to monitor and manage all manufacturing processes within a factory. For a furniture manufacturing unit, it tracks raw materials, production stages, labor, inventory, orders, and dispatch, ensuring efficient workflow, cost control, and streamlined operations from start to finish.",
            video: rooks,
            link: "/work/fms",
            img: FunitureImg,
            tags: ["Manufacturing", "ERP", "Inventory"]
        },
        {
            title: "Charity Financial Management",
            category: "Non-Profit Solution",
            description:
                "Charity Financial Management System is a software solution that helps nonprofit organizations track donations, income, and expenses efficiently. It ensures financial transparency, proper fund utilization, accurate reporting, and compliance with regulatory requirements.",
            video: jothiVideo,
            link: "/work/charity-financial",
            img: charityImg,
            tags: ["Financial", "Non-Profit", "Compliance"]
        },
        {
            title: "Hospital Management System",
            category: "Healthcare Platform",
            description:
                "Hospital Management System is a software solution designed to manage and streamline hospital operations such as patient registration, appointments, billing, medical records, and staff management. It improves efficiency, ensures accurate data handling, and enhances overall patient care and administrative control.",
            video: rooks,
            link: "/work/rooks-hms",
            img: hmsimg,
            tags: ["Healthcare", "Management", "Patient Care"]
        },
        {
            title: "Task Management Application",
            category: "Productivity Platform",
            description:
                "Task Management Application is a software solution designed to organize and manage daily activities such as personal tasks, study plans, and teamwork assignments. In this system, an admin can create workspaces and assign tasks to multiple members. Each workspace allows collaboration, tracking progress, and ensuring timely task completion, improving productivity, coordination, and overall task management efficiency.",
            video: rooks,
            link: "/work/task-management",
            img: tmsimg,
            tags: ["Productivity", "Task Management", "Collaboration"]
        }
    ];

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    return (
        <section className="py-10 px-4 md:px-6 lg:px-4">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto text-center mb-16"
            >
                <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wider mb-4">
                    OUR PORTFOLIO
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                    Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Discover our innovative solutions that help businesses transform and grow in the digital age
                </p>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8"
            >
                {workCards.map((card, index) => {
                    const isExternal = card.link.startsWith("http");

                    const CardContent = (
                        <>
                            {/* Image Container */}
                            <div className="relative overflow-hidden h-56">
                                <img
                                    src={card.img}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                {/* Category Badge */}
                                <span className="absolute top-4 left-4 px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                    {card.category}
                                </span>

                                {/* Hover Overlay with Icons */}
                                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 px-6 py-2 bg-white text-gray-900 rounded-full font-semibold text-sm hover:bg-blue-500 hover:text-white">
                                        View Project
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col items-center text-center">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                    {card.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                    {card.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap justify-center gap-2 mb-4">
                                    {card.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Link */}
                                <div className="flex items-center justify-center text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-colors duration-300">
                                    <span>Learn More</span>
                                    <svg
                                        className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </>
                    );

                    const cardClassName = "group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 block w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]";

                    return (
                        <motion.div
                            key={index}
                            variants={fadeUp}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className={cardClassName}
                        >
                            {isExternal ? (
                                <a
                                    href={card.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block h-full"
                                >
                                    {CardContent}
                                </a>
                            ) : (
                                <Link
                                    to={card.link}
                                    className="block h-full"
                                >
                                    {CardContent}
                                </Link>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* View All Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center mt-16"
            >
                {/* <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    View All Projects
                </button> */}
            </motion.div>
        </section>
    );
}