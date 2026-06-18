import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import appShowcaseData from "../../json/AppShowcase.json";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAppShowcase } from "../../context/AppShowcaseContext";

const AppShowcaseCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { selectedAppId, setSelectedAppId } = useAppShowcase();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 10000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  // Handle selected app from FloatingAppShowcase
  useEffect(() => {
    if (selectedAppId && emblaApi) {
      const index = appShowcaseData.findIndex(
        (item) => item.id === selectedAppId,
      );
      if (index !== -1) {
        emblaApi.scrollTo(index);
        setSelectedAppId(null); // Reset after using
      }
    }
  }, [selectedAppId, emblaApi, appShowcaseData, setSelectedAppId]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const activeItem = appShowcaseData[activeIndex];

  return (
    <div
      data-app-portfolio
      className="relative z-10 mt-24 px-4 max-w-7xl mx-auto"
    >
      <div className="flex flex-col items-center text-center mb-16">
        <motion.p
          className="text-2xl md:text-[36px] font-goodtimes text-white mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          APPLICATION PORTFOLIO
        </motion.p>
        <motion.p
          className="text-white/80 text-lg md:text-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          variants={fadeInUp}
        >
          Transforming ideas into powerful digital experiences.
        </motion.p>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
          <div className="w-[300px] sm:w-[400px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[700px] rounded-full bg-gradient-radial from-sky-400/10 via-blue-500/5 to-transparent blur-[80px] sm:blur-[100px]"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-center">
              {appShowcaseData.map((item, index) => (
                <div
                  key={item.id}
                  className="min-w-0 shrink-0 grow-0 basis-[70%] sm:basis-[60%] lg:basis-[50%] px-4"
                >
                  <motion.div
                    className={`
        relative rounded-3xl overflow-hidden border transition-all duration-500
        ${
          item.id === 3
            ? "bg-[#0F2239] border-sky-400/30"
            : "bg-white border-slate-200"
        }
        ${
          index === activeIndex
            ? "scale-100 shadow-[0_0_40px_rgba(56,189,248,0.25)]"
            : "scale-85 opacity-70"
        }
      `}
                  >
                    <div className="aspect-[3/4] flex items-center justify-center p-8">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-[75%] max-h-[75%] object-contain"
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-[#0F2239] border border-[#FFFFFF1A] text-white hover:bg-sky-500/20 hover:border-sky-400/50 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-[#0F2239] border border-[#FFFFFF1A] text-white hover:bg-sky-500/20 hover:border-sky-400/50 transition-all duration-300 flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {activeItem.title}
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              {activeItem.description}
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {activeItem.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[#0F2239] border border-[#FFFFFF1A] text-sky-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={() => navigate(activeItem.link)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-sky-400 hover:text-white transition-all duration-300 group"
            >
              View Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AppShowcaseCarousel;
