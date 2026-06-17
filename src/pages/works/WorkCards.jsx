import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import workCardsData from "../../json/WorkCards.json";
import jothiVideo from "../../assets/videos/jothi.mp4";
import rooks from "../../assets/videos/rooks.mp4";
import jothiImg from "../../assets/work/jothi.jpg";
import constructionImg from "../../assets/work/construction.jpg";
import FunitureImg from "../../assets/work/furImg.jpg";
import ServiceImg from "../../assets/work/serImg.jpg";
import charityImg from "../../assets/work/charity.jpg";
import hmsimg from "../../assets/work/hmsImg.jpg";
import tmsimg from "../../assets/work/tsm.jpg";
import imsimg from "../../assets/work/ims.jpg";
import vottoimg from "../../assets/work/votto.jpg";
import rookserviceapp from "../../assets/mobile_apps_asstes/RooksServiceApp.jpg";



// Map image and video names to imported assets
const assetMap = {
  images: {
    "jothi.jpg": jothiImg,
    "construction.jpg": constructionImg,
    "furImg.jpg": FunitureImg,
    "serImg.jpg": ServiceImg,
    "charity.jpg": charityImg,
    "hmsImg.jpg": hmsimg,
    "tsm.jpg": tmsimg,
    "ims.jpg": imsimg,
    "RooksServiceApp.jpg": rookserviceapp,
    "votto.jpg": vottoimg,
  },
  videos: {
    jothi: jothiVideo,
    rooks: rooks,
  },
};

export default function WorkCards() {
  // Process workCardsData to replace image/video string keys with actual assets
  const workCards = workCardsData.map((card) => ({
    ...card,
    img: assetMap.images[card.img],
    video: assetMap.videos[card.video],
  }));

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Applications" },
    { id: "mobile", label: "Mobile Applications" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? workCards
      : workCards.filter((card) => card.type === activeCategory);

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
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wider mb-4">
          OUR PORTFOLIO
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Latest{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Projects
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Discover our innovative solutions that help businesses transform and
          grow in the digital age
        </p>
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/20"
                  : "bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-blue-500/50 hover:text-blue-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8"
        >
          {filteredProjects.map((card, index) => {
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
                  {/* <div className="flex items-center justify-center text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-colors duration-300">
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
                  </div> */}
                </div>
              </>
            );

            const cardClassName =
              "group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 block w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)]";

            return (
              <motion.div
                key={card.id}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={cardClassName}
              >
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {CardContent}
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
