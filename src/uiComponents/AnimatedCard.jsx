import React from "react";
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
  },  {
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
  },  {
    title: "Blockchain Developer",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
    {
    title: "Digital Marketing Specialist",
    circles: ["bg-blue-300", "bg-blue-400", "bg-indigo-500"],
  },
 
];
export default function ServiceCards() {
  return (
    <div className="flex flex-wrap justify-center gap-8 p-5">
      {services.map((service, index) => (
        <div
          key={index}
          className="group perspective w-[220px] h-[120px]" >
          <div className="relative preserve-3d w-full h-full transition-transform duration-500 group-hover:rotate-y-180 rounded-lg shadow-xl">
            <div className="absolute inset-0 backface-hidden rounded-lg bg-neutral-900 text-white overflow-hidden">
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
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="">
                  <p className="text-sm font-bold">{service.title}</p>
                  <p className="text-xs text-gray-300 mt-1">{service.footer}</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-lg bg-neutral-900 flex items-center justify-center text-white">
              <p className="text-center text-lg font-semibold px-4">
                {service.backText}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}