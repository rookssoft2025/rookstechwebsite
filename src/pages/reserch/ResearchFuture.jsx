import React, { useState } from "react";
import { Cpu, Cloud, Leaf, Zap, Eye, Clock } from 'lucide-react';

export default function FutureWork() {
  const [activeTab, setActiveTab] = useState(0);
  
  const highlights = [
    {
      title: 'AI-Powered Adaptive Systems',
      desc: 'Self-learning pipelines that personalize user experiences and automate complex decision flows across enterprise workloads.',
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      title: 'Industry-Custom Models',
      desc: 'Tailored DL/ML models for healthcare, finance, manufacturing and education with regulatory-ready pipelines and explainability.',
      icon: <Eye className="w-6 h-6" />,
    },
    {
      title: 'Edge + Cloud Hybrid Intelligence',
      desc: 'Low-latency inference at the edge with cloud-backed training and lifecycle orchestration for scalable deployments.',
      icon: <Cloud className="w-6 h-6" />,
    },
    {
      title: 'Green & Sustainable ML',
      desc: 'Research into energy-efficient architectures, model pruning, and hardware-aware training to reduce carbon footprint.',
      icon: <Leaf className="w-6 h-6" />,
    },
    {
      title: 'Realtime Trust & Safety',
      desc: 'Robust anomaly detection, bias auditing, and privacy-first approaches to ensure safe AI in production.',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: 'Latency-Optimized Pipelines',
      desc: 'End-to-end optimization to minimize inference time and cost while maintaining high accuracy and reliability.',
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  const technologies = [
    { name: 'AutoML', description: 'Automated machine learning platforms that enable rapid model development', category: 'AI/ML' },
    { name: 'Serverless AI', description: 'Cloud-based AI services that scale automatically with usage', category: 'Cloud' },
    { name: 'MLOps', description: 'Machine learning operations for deploying and maintaining ML models', category: 'DevOps' },
    { name: 'AI Code Assistants', description: 'Tools that suggest code completions and generate code snippets', category: 'AI/ML' },
    { name: 'Quantum Machine Learning', description: 'Combining quantum computing with ML algorithms', category: 'AI/ML' },
    { name: 'Edge AI', description: 'Running ML models on edge devices for lower latency', category: 'AI/ML' },
  ];

  const mlFutureItems = [
    {
      number: 1,
      title: 'AI-Generated Applications',
      description: 'Natural language descriptions will be transformed into functional applications through advanced ML models, dramatically reducing development time.'
    },
    {
      number: 2,
      title: 'Self-Optimizing Software',
      description: 'Applications that continuously monitor their own performance and use reinforcement learning to optimize their code and resource usage in real-time.'
    },
    {
      number: 3,
      title: 'Predictive User Interfaces',
      description: 'Interfaces that adapt to user behavior patterns, anticipating needs and streamlining workflows before the user even realizes what they need.'
    }
  ];

  const timelineData = [
    { year: '2023', value: 35, description: 'Basic ML integration in development tools' },
    { year: '2025', value: 60, description: 'Widespread use of AI-assisted coding' },
    { year: '2028', value: 85, description: 'ML-powered development becomes standard' },
    { year: '2030', value: 95, description: 'Fully autonomous development for certain applications' },
  ];

  const applications = [
    {
      emoji: '🏥',
      title: 'Healthcare Revolution',
      description: 'ML-powered diagnostic tools that can detect diseases earlier and with greater accuracy than human doctors.',
      features: [
        'Personalized treatment plans',
        'Drug discovery acceleration',
        'Predictive health analytics'
      ]
    },
    {
      emoji: '🚗',
      title: 'Autonomous Systems',
      description: 'Self-driving cars, drones, and robotics that can navigate complex environments safely and efficiently.',
      features: [
        'Real-time decision making',
        'Adaptive learning from new scenarios',
        'Predictive maintenance'
      ]
    },
    {
      emoji: '🎓',
      title: 'Personalized Education',
      description: 'Adaptive learning platforms that customize educational content based on individual student needs and learning styles.',
      features: [
        'Custom learning paths',
        'Automated assessment',
        'Early intervention systems'
      ]
    },
    {
      emoji: '🏭',
      title: 'Smart Industries',
      description: 'Intelligent systems that optimize manufacturing, logistics, and energy consumption across industries.',
      features: [
        'Predictive supply chain management',
        'Quality control automation',
        'Energy efficiency optimization'
      ]
    }
  ];

  return (
    <div className=" text-white">
      {/* Hero Section */}
      <section className="relative px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Deep Learning</span> & AI
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              At <span className="font-semibold text-cyan-300">Rooks and Brooks Tech</span>, we're pioneering the next generation of machine learning technologies that will transform industries and redefine what's possible.
            </p>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </section>

      <section className=" relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Research Focus</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our next-phase roadmap blends research and production to deliver responsible, realtime, and energy-efficient AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/30 to-slate-800/20 backdrop-blur-md border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-400/20 shadow-lg shadow-cyan-500/5">
                      <div className="text-cyan-400">{item.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-100">{item.title}</h3>
                  <p className="text-slate-400 flex-grow">{item.desc}</p>
                </div>
                
                {/* Liquid glass effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/5 to-cyan-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="technologies" className="py-10  relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Emerging <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Technologies</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Explore the cutting-edge technologies shaping the future of AI and machine learning.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'AI/ML', 'Cloud', 'DevOps'].map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === index 
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-lg shadow-blue-500/30' 
                    : 'bg-slate-800/50 hover:bg-slate-700/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies
              .filter(item => activeTab === 0 || item.category === ['All', 'AI/ML', 'Cloud', 'DevOps'][activeTab])
              .map((tech, index) => (
                <div 
                  key={index} 
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/30 to-slate-800/20 backdrop-blur-md border border-slate-700/50 hover:border-purple-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  <h3 className="text-xl font-semibold mb-4 text-slate-100">{tech.name}</h3>
                  <p className="text-slate-400 mb-6">{tech.description}</p>
                  <span className="inline-block px-4 py-2 bg-slate-800/50 text-sm rounded-full border border-slate-700/50">
                    {tech.category}
                  </span>
                  
                  {/* Liquid glass effect overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/5 to-blue-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section id="ml-future" className="py-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center pb-5">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Machine Learning: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">The Future</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              How ML will continue to revolutionize software development in the coming years
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              {mlFutureItems.map((item) => (
                <div 
                  key={item.number}
                  className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/30 to-slate-800/20 backdrop-blur-md border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300"
                >
                  <h3 className="text-2xl font-semibold mb-4 flex items-center">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-4 shadow-lg shadow-blue-500/30">
                      {item.number}
                    </span>
                    {item.title}
                  </h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/30 to-slate-800/20 backdrop-blur-md border border-slate-700/50">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-semibold">ML Adoption Timeline</h3>
                <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">Projected Growth</span>
              </div>
              
              <div className="space-y-6">
                {timelineData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{item.year}</span>
                      <span className="text-cyan-400 font-semibold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="applications" className="py-10  relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center pb-5">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Applications</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover how machine learning will transform various industries in the near future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/30 to-slate-800/20 backdrop-blur-md border border-slate-700/50 hover:border-purple-400/30 transition-all duration-300 group"
              >
                <div className="text-5xl mb-6">{app.emoji}</div>
                <h3 className="text-2xl font-semibold mb-4 text-slate-100">{app.title}</h3>
                <p className="text-slate-400 mb-6">{app.description}</p>
                
                <ul className="space-y-3">
                  {app.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Liquid glass effect overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}