import React, { useState } from "react";

const services = [
  {
    title: "Frontend Developer (React)",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "Backend Developer (Java)",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "Full Stack Developer",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "Mobile App Developer (Android, iOS, Flutter, React Native)",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "UI/UX Designer",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "Machine Learning Engineer",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "AI/ML Researcher",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "Research Analyst",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "DevOps Engineer (CI/CD, Kubernetes, Docker, Jenkins)",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "Network Engineer",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "Automation Tester (Selenium, Cypress, Playwright)",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "Blockchain Developer",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
  {
    title: "Digital Marketing Specialist",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
];

export default function ServiceCards() {
  const [isHovered, setIsHovered] = useState(false);

  const handleApply = (title) => {
    window.open(formLink, "_blank");
  };

  const duplicatedServices = [...services, ...services];


  const formLink = "https://docs.google.com/forms/d/e/1FAIpQLSe23_Z8nM45Gd4Fx2jxUvpCBGdS_4kTP6FuNd_nq5X4c_Kfsw/viewform?usp=header";


  return (
    <>
      <style>{`
        .flip-card {
          // perspective: 1200px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 0.5rem;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${services.length * 250}px); }
        }
        
        .carousel-track {
          display: flex;
          animation: scroll 30s linear infinite;
          width: ${duplicatedServices.length * 250}px;
        }
        
        .carousel-track.paused {
          animation-play-state: paused;
        }
        
        .carousel-container {
          overflow: hidden;
          width: 100%;
          margin: 0 auto;
        }
      `}</style>

      <div className="carousel-container p-5">
        <div
          className={`carousel-track ${isHovered ? 'paused' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedServices.map((service, index) => (
            <div
              key={index}
              className="flip-card w-[220px] h-[80px] mx-4 flex-shrink-0"
            >
              <div className="flip-card-inner shadow-xl">
                <div className="flip-card-front bg-neutral-900 text-white overflow-hidden">
                  <div className="absolute inset-0">
                    <div
                      className={`absolute w-24 h-24 rounded-full ${service.circles[0]} blur-xl animate-bounce`}
                    ></div>
                    <div
                      className={`absolute w-36 h-36 top-10 left-10 rounded-full ${service.circles[1]} blur-2xl animate-pulse`}
                    ></div>
                    <div
                      className={`absolute w-16 h-16 bottom-10 right-6 rounded-full ${service.circles[2]} blur-lg animate-float`}
                    ></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div>
                      <p className="text-sm font-bold">{service.title}</p>
                      <p className="text-xs text-gray-300 mt-1">{service.footer}</p>
                    </div>
                  </div>
                </div>
                <div className="flip-card-back bg-neutral-900 flex flex-col items-center justify-center text-white p-4">
                  <button
                    onClick={() => handleApply(service.title)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors duration-200"
                  >
                    Apply Now
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}