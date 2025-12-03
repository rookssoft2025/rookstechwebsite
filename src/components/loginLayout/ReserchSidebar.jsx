import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    FileText, 
    Code, 
    Edit, 
    Users, 
    BookOpen, 
    Send, 
    User, 
    Award,
    LogOut,
    X,
    BarChart
} from 'lucide-react';
import { motion } from 'framer-motion';

const ReserchSidebar = ({ 
    sidebarOpen, 
    setSidebarOpen, 
    activeTab, 
    setActiveTab,
    onLogout,
    isLoading 
}) => {
    // Exactly 7 sections as requested
    const navigate = useNavigate();
    const navigationItems = [
        { 
            id: 'proposal', 
            label: 'Research Proposal', 
            icon: FileText,
            description: 'Create & manage research proposals',
            route: '/dashboard/proposal'
        },
        { 
            id: 'coding', 
            label: 'Code Repository', 
            icon: Code,
            description: 'Manage research code & algorithms',
            route: '/dashboard/coding-page'
            
        },
        { 
            id: 'writing', 
            label: 'Paper Writing', 
            icon: Edit,
            description: 'Write & edit research papers',
            route: '/dashboard/paper-writing'

        },
        { 
            id: 'main-review', 
            label: 'Main Review', 
            icon: Users,
            description: 'Internal review process'
        },
        { 
            id: 'journal', 
            label: 'Journal Selection', 
            icon: BookOpen,
            description: 'Find suitable journals'
        },
        { 
            id: 'submission', 
            label: 'Paper Submission', 
            icon: Send,
            description: 'Submit to conferences & journals'
        },
        { 
            id: 'overview', 
            label: 'Research Overview', 
            icon: BarChart,
            description: 'Dashboard & analytics',
            route:"/dashboard"
        }
    ];

    const getSectionContent = (sectionId) => {
        const contents = {
            proposal: {
                stats: { drafts: 5, submitted: 12, approved: 8 },
                color: 'from-purple-500 to-purple-600'
            },
            coding: {
                stats: { repositories: 15, commits: 234, languages: 6 },
                color: 'from-blue-500 to-blue-600'
            },
            writing: {
                stats: { drafts: 8, inProgress: 3, completed: 15 },
                color: 'from-green-500 to-green-600'
            },
            'main-review': {
                stats: { pending: 7, inReview: 4, completed: 23 },
                color: 'from-orange-500 to-orange-600'
            },
            journal: {
                stats: { saved: 12, submitted: 8, published: 5 },
                color: 'from-red-500 to-red-600'
            },
            submission: {
                stats: { inProgress: 3, submitted: 15, accepted: 9 },
                color: 'from-indigo-500 to-indigo-600'
            },
            overview: {
                stats: { papers: 24, citations: 156, rating: 4.8 },
                color: 'from-cyan-500 to-cyan-600'
            }
        };
        return contents[sectionId] || contents.overview;
    };

    const currentSection = getSectionContent(activeTab);

    return (
        <motion.div
            initial={{ x: -300 }}
            animate={{ x: sidebarOpen ? 0 : -300 }}
            className="fixed inset-y-0 left-0 w-80 bg-black/40 backdrop-blur-xl border-r border-white/10 z-50 lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 xl:static xl:w-80 xl:translate-x-0"
        >
            <div className="flex flex-col h-full p-6">
                {/* Header with close button for mobile */}
                <div className="flex items-center justify-between mb-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-3"
                    >
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <BookOpen size={18} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">ResearchHub</h1>
                            <p className="text-white/40 text-xs">Academic Publishing Platform</p>
                        </div>
                    </motion.div>
                    
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-white/70 hover:text-white transition-colors duration-300 p-1"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                    <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${currentSection.color}`}>
                            {navigationItems.find(item => item.id === activeTab)?.icon && 
                                React.createElement(navigationItems.find(item => item.id === activeTab).icon, { 
                                    size: 16, 
                                    className: "text-white" 
                                })
                            }
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-sm">
                                {navigationItems.find(item => item.id === activeTab)?.label}
                            </h3>
                            <p className="text-white/40 text-xs">
                                {navigationItems.find(item => item.id === activeTab)?.description}
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {Object.entries(currentSection.stats).map(([key, value], index) => (
                            <div key={key} className="text-center">
                                <p className="text-white font-bold text-sm">{value}</p>
                                <p className="text-white/40 text-xs capitalize">{key}</p>
                            </div>
                        ))}
                    </div>
                </motion.div> */}

                <nav className="space-y-2 flex-1">
                    {navigationItems.map((item, index) => (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            onClick={() => {
                                setActiveTab(item.id);
                                if (item.route) {
                                    navigate(item.route);
                                }
                                if (window.innerWidth < 1024) {
                                    setSidebarOpen(false);
                                }
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group text-left ${
                                activeTab === item.id
                                    ? 'bg-white/10 text-white border border-white/20 shadow-lg shadow-purple-500/10'
                                    : 'text-white/60 hover:text-white hover:bg-white/5 hover:border-white/10'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className={`p-2 rounded-lg transition-all duration-300 ${
                                activeTab === item.id 
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                                    : 'bg-white/5 group-hover:bg-white/10'
                            }`}>
                                <item.icon 
                                    size={18} 
                                    className={activeTab === item.id ? 'text-white' : 'text-white/60'} 
                                />
                            </div>
                            <div className="flex-1">
                                <span className="font-medium block">{item.label}</span>
                                <span className="text-xs text-white/40 block mt-0.5">
                                    {item.description}
                                </span>
                            </div>
                            {activeTab === item.id && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                                />
                            )}
                        </motion.button>
                    ))}
                </nav>

                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-4 pt-4 border-t border-white/10"
                >
                    <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/5 cursor-pointer group">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                    <User size={18} className="text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5 border-2 border-gray-900">
                                    <Award size={10} className="text-white" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm truncate">Dr. Sarah Chen</p>
                                <p className="text-white/60 text-xs truncate">Lead Researcher</p>
                            </div>
                        </div>
                    </div>
                </motion.div> */}
            </div>
        </motion.div>
    );
};

export default ReserchSidebar;