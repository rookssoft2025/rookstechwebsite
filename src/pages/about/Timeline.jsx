import React from 'react';
import { Monitor, Users, TrendingUp, Globe, Handshake } from 'lucide-react';

const Timeline = () => {
  const timelineData = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Expertise across web, mobile and cloud platforms",
      description: "End-to-end solutions (from design to deployment)"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dedicated support and long-term partnerships",
      description: "User-centric design and seamless functionality"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Proven results with innovative strategies",
      description: "Proven results with innovative strategies"
    }
  ];

  const bottomIcons = [
    { icon: <Globe className="w-12 h-12" />, position: "left-1/4" },
    { icon: <Handshake className="w-12 h-12" />, position: "right-1/4" }
  ];

  return (
    <div className=" min-h-screen flex items-center justify-center p-4 overflow-x-auto">
      <div className="relative" style={{ minWidth: '1000px', width: '1000px' }}>
        <div className="relative py-20">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-600 transform -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center transform -translate-y-1/2">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className={`w-4 h-4 rounded-full border-2 border-gray-400 ${
                  i === 0 || i === 5 ? 'bg-gray-600' : 'bg-white'
                }`}
                style={{ 
                  left: `${i * 20}%`,
                  position: 'absolute'
                }}
              ></div>
            ))}
          </div>
          <div className="relative">
            {timelineData.map((item, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2"
                style={{ 
                  left: `${20 + (index * 20)}%`,
                  top: index % 2 === 0 ? '-160px' : '60px'
                }} >
                <div className="flex flex-col items-center text-center max-w-xs">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 border border-gray-600">
                    <div className="text-gray-300">
                      {item.icon}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-gray-300 font-medium text-sm leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute" style={{ top: '200px' }}>
            {bottomIcons.map((item, index) => (
              <div
                key={index}
                className={`absolute transform -translate-x-1/2 ${item.position}`}
              >
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border border-gray-600">
                  <div className="text-gray-300">
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
            <div className="w-48 h-48 rounded-full border-2 border-gray-600 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-400 text-sm font-medium">WHY CHOOSE</p>
                <p className="text-gray-400 text-sm font-medium">US ?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;