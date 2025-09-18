import React from "react";
import { motion } from "framer-motion";
import { BookOpenCheck, Notebook, NotebookPen, SquarePen } from "lucide-react";
import { i } from "framer-motion/client";

const services = [
  {
    title: "Research Paper Writing Services",
    subtitle: "100% Original Research Papers Crafted from Scratch, Tailored to Meet Your Objectives",
    bullets: ["Handled by Research Professionals with Domain Expertise", "Plagiarism-Free Manuscript"],
    cta: "View Details",
    icon: <NotebookPen />
  },
  {
    title: "Thesis Writing Services",
    subtitle: "Well-Structured, Original Thesis Documents",
    bullets: ["Developed with Academic Rigor and Depth", "Personalized Content Based on Your University Syllabus"],
    cta: "View Details",
    icon: <SquarePen />
  },
  {
    title: "Journal Publication Support",
    subtitle: "Complete Guidance for Journal Submission",
    bullets: ["Publication in High-Impact, Indexed Journals", "Support for SCI, Scopus, Elsevier, UGC, and More"],
    cta: "View Details",
    icon: <Notebook />
  },
  {
    title: "Implementation Support",
    subtitle: "Real-Time Code Execution with Live Demos",
    bullets: ["Tailored Implementation for Research Projects", "Get support in Python, MATLAB, Java, NS2, Blockchain & more"],
    cta: "View Details",
    icon: <BookOpenCheck />
  },
];

export default function ResearchServiceCards() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-white">Our Services</h2>

        <div className="grid gap-6 sm:grid-cols-2 ">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.5, ease: "easeOut" }}
              whileHover={{ translateY: -6, scale: 1.01 }}
              className="relative rounded-2xl p-6 sm:p-8  bg-white/5 border border-white/10 shadow-lg shadow-black/30 overflow-hidden"
              aria-labelledby={`service-${i}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/3 via-white/6 to-transparent opacity-30"
              />

              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 id={`service-${i}`} className="text-lg sm:text-xl font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80 leading-snug">{s.subtitle}</p>
                  </div>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-white/6 border border-white/8 text-white">
                    {s.icon}
                  </div>

                </div>

                <ul className="mt-4 space-y-2 flex-1">
                  {s.bullets.map((b, idx) => (
                    <li key={idx} className="text-sm text-white/75 flex items-start gap-3">
                      <span className="mt-1 inline-block shrink-0 w-2 h-2 rounded-full bg-white/80" />
                      <span className="leading-tight">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-white/6 flex items-center justify-between">
                  <span className="text-xs text-white/65">Tailored • Confidential • Academic</span>
                  <button
                    type="button"
                    className="cursor-pointer  inline-flex items-center gap-2  px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none hover:translate-x-1"
                  >
                    <span
                      onClick={() => window.open("https://rooks.in/", "_blank")}
                      className="cursor-pointer bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent hover:opacity-80 transition"
                    >
                      {s.cta}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
