import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, Calendar, FileText, ChevronDown, ChevronUp, X, CheckCircle, Clock, AlertCircle, Edit, Trash2, Save, Download, Share2, Eye, Clock as ClockIcon, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import DataTable from "../../../../components/ResearchLayout/DataTable";
import ReserchLayout from '../../../../components/loginLayout/ReserchLayout';

const PaperWritingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('writing');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate('/login');
    setIsLoading(false);
  };
  
  // Team members data - Lead researcher first
  const leadResearcher = {
    id: 1, 
    name: "Dr. Sarah Johnson", 
    role: "Team Lead", 
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isLead: true
  };
  
  const teamMembers = [
    { id: 2, name: "Prof. Michael Chen", role: "Member", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael", isLead: false },
    { id: 3, name: "Dr. Emma Wilson", role: "Member", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma", isLead: false },
    { id: 4, name: "Alex Rodriguez", role: "Member", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", isLead: false }
  ];

  // Initial papers data
  const initialPapers = [
    { 
      id: 1, 
      title: "Quantum Neural Networks", 
      takenBy: "Dr. Sarah Johnson", 
      startDate: "2024-02-15", 
      deadline: "2024-05-30", 
      status: "Drafting",
      progress: 65,
      sections: ["Abstract", "Introduction", "Methodology", "Results", "Conclusion"],
      details: "Exploring the intersection of quantum computing and neural networks for optimization problems in machine learning."
    },
    { 
      id: 2, 
      title: "Sustainable AI in Agriculture", 
      takenBy: "Prof. Michael Chen", 
      startDate: "2024-01-10", 
      deadline: "2024-04-20", 
      status: "Reviewing",
      progress: 85,
      sections: ["Abstract", "Introduction", "Literature Review", "Case Studies", "Discussion"],
      details: "Investigating AI applications for sustainable farming practices and resource optimization in precision agriculture."
    },
    { 
      id: 3, 
      title: "Blockchain for Supply Chain Transparency", 
      takenBy: "Dr. Sarah Johnson", 
      startDate: "2024-03-01", 
      deadline: "2024-07-15", 
      status: "Writing",
      progress: 45,
      sections: ["Abstract", "Introduction", "System Design", "Implementation", "Evaluation"],
      details: "Developing a blockchain-based solution for enhancing transparency and traceability in global supply chains."
    },
    { 
      id: 4, 
      title: "AI Ethics in Healthcare", 
      takenBy: "Dr. Emma Wilson", 
      startDate: "2024-02-20", 
      deadline: "2024-06-10", 
      status: "Planning",
      progress: 25,
      sections: ["Abstract", "Introduction", "Ethical Framework", "Case Analysis", "Recommendations"],
      details: "Examining ethical considerations and regulatory frameworks for AI applications in healthcare diagnostics."
    },
    { 
      id: 5, 
      title: "Climate Data Analysis with ML", 
      takenBy: "Alex Rodriguez", 
      startDate: "2024-03-10", 
      deadline: "2024-08-30", 
      status: "Writing",
      progress: 40,
      sections: ["Abstract", "Introduction", "Data Collection", "Model Development", "Analysis"],
      details: "Using machine learning models to analyze climate data and predict environmental trends."
    }
  ];

  // State management
  const [papers, setPapers] = useState(initialPapers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editingPaper, setEditingPaper] = useState(null);
  const [newPaper, setNewPaper] = useState({
    title: '',
    takenBy: '',
    startDate: '',
    deadline: '',
    status: 'Planning',
    details: ''
  });

  // Status options
  const statusOptions = [
    { value: 'Planning', label: 'Planning', color: 'text-gray-400', bg: 'bg-gray-400/10', icon: Clock },
    { value: 'Drafting', label: 'Drafting', color: 'text-blue-400', bg: 'bg-blue-400/10', icon: Edit },
    { value: 'Writing', label: 'Writing', color: 'text-cyan-400', bg: 'bg-cyan-400/10', icon: FileText },
    { value: 'Reviewing', label: 'Reviewing', color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: Eye },
    { value: 'Completed', label: 'Completed', color: 'text-green-400', bg: 'bg-green-400/10', icon: CheckCircle }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewPaper(prev => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const paperToSubmit = editingPaper 
      ? { ...editingPaper, ...newPaper }
      : {
          id: papers.length + 1,
          progress: 0,
          sections: ["Abstract", "Introduction"],
          ...newPaper
        };
    
    if (editingPaper) {
      setPapers(papers.map(p => p.id === editingPaper.id ? paperToSubmit : p));
    } else {
      setPapers([...papers, paperToSubmit]);
    }
    
    setIsModalOpen(false);
    setEditingPaper(null);
    setNewPaper({
      title: '',
      takenBy: '',
      startDate: '',
      deadline: '',
      status: 'Planning',
      details: ''
    });
  };

  // Handle edit
  const handleEdit = (paper) => {
    setEditingPaper(paper);
    setNewPaper({
      title: paper.title,
      takenBy: paper.takenBy,
      startDate: paper.startDate,
      deadline: paper.deadline,
      status: paper.status,
      details: paper.details
    });
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      setPapers(papers.filter(paper => paper.id !== id));
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate days remaining
  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Prepare data for DataTable component
  const tableColumns = [
    { key: 'title', label: 'Paper Title', width: '30%' },
    { key: 'takenBy', label: 'Taken By', width: '15%' },
    { key: 'progress', label: 'Progress', width: '20%' },
    { key: 'deadline', label: 'Deadline', width: '15%' },
    { key: 'status', label: 'Status', width: '15%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];

  // Transform papers data for DataTable
  const tableData = papers.map(paper => {
    const statusOption = statusOptions.find(s => s.value === paper.status) || statusOptions[0];
    const StatusIcon = statusOption.icon;
    const statusColor = statusOption.color;
    const statusBg = statusOption.bg;
    const daysRemaining = calculateDaysRemaining(paper.deadline);

    return {
      id: paper.id,
      // Store the original paper data
      _paperData: paper,
      renderRow: (item, onRowExpand) => {
        // Use the original paper data, not the transformed item
        const paperData = item._paperData;
        const paperDaysRemaining = calculateDaysRemaining(paperData.deadline);
        const paperStatusOption = statusOptions.find(s => s.value === paperData.status) || statusOptions[0];
        const PaperStatusIcon = paperStatusOption.icon;
        const paperStatusColor = paperStatusOption.color;
        const paperStatusBg = paperStatusOption.bg;

        return (
          <tr className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
            <td className="py-4 px-6">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-cyan-400 mr-3" />
                <div>
                  <div className="text-white font-medium">{paperData.title}</div>
                  <div className="text-gray-400 text-sm">Started: {formatDate(paperData.startDate)}</div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center">
                <img 
                  src={
                    paperData.takenBy === leadResearcher.name 
                      ? leadResearcher.image 
                      : teamMembers.find(m => m.name === paperData.takenBy)?.image || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
                  }
                  alt={paperData.takenBy}
                  className="w-8 h-8 rounded-full border border-cyan-500/50 mr-3"
                />
                <div>
                  <div className="text-gray-300">{paperData.takenBy}</div>
                  {paperData.takenBy === leadResearcher.name && (
                    <div className="text-xs flex items-center text-yellow-400">
                      {/* <Crown size={10} className="mr-1" /> */}
                      Team Lead
                    </div>
                  )}
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{paperData.progress}%</span>
                  <span className="text-cyan-300">{paperDaysRemaining} days left</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                    style={{ width: `${paperData.progress}%` }}
                  ></div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-purple-400 mr-2" />
                <div>
                  <div className="text-gray-300">{formatDate(paperData.deadline)}</div>
                  <div className={`text-xs ${paperDaysRemaining <= 7 ? 'text-red-400' : 'text-gray-500'}`}>
                    {paperDaysRemaining > 0 ? `${paperDaysRemaining} days remaining` : 'Overdue'}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className={`inline-flex items-center px-3 py-1 rounded-full ${paperStatusBg}`}>
                <PaperStatusIcon className={`w-4 h-4 mr-2 ${paperStatusColor}`} />
                <span className={`text-sm font-medium ${paperStatusColor}`}>{paperData.status}</span>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleRowExpansion(paperData.id)}
                  className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {expandedRow === paperData.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <button
                  onClick={() => handleEdit(paperData)}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(paperData.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        );
      },
      expandContent: (
        <div className="glass-inner rounded-xl p-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paper Details Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Paper Details</h4>
              <p className="text-gray-300 mb-6 bg-gray-800/50 p-4 rounded-lg">{paper.details}</p>
            </div>
            
            {/* Dates Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Timeline</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-cyan-400" />
                    Start Date
                  </div>
                  <div className="text-xl font-bold text-white">{formatDate(paper.startDate)}</div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                    Deadline
                  </div>
                  <div className="text-xl font-bold text-white">{formatDate(paper.deadline)}</div>
                  <div className={`text-sm mt-1 ${calculateDaysRemaining(paper.deadline) <= 7 ? 'text-red-400' : 'text-cyan-400'}`}>
                    {calculateDaysRemaining(paper.deadline) > 0 
                      ? `${calculateDaysRemaining(paper.deadline)} days remaining` 
                      : 'Overdue'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    };
  });

  return (
    <ReserchLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} isLoading={isLoading}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Paper Writing Dashboard
        </h1>
        <p className="text-gray-400 mt-2">Manage your research papers, track progress, and collaborate with team members</p>
      </div>

      {/* Team Section - Separated Lead and Team Members */}
      <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-cyan-400 mr-3" />
            <h2 className="text-xl font-semibold text-white">Writing Team</h2>
          </div>
          <span className="text-cyan-300/70 text-sm">{1 + teamMembers.length} Members</span>
        </div>
        
        {/* Lead Researcher Card */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-white mb-3 flex items-center">
            {/* <Crown className="w-5 h-5 text-yellow-400 mr-2" /> */}
            Team Lead 
          </h3>
          <div className="flex items-center p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-yellow-900/20 transition-all duration-300">
            <img 
              src={leadResearcher.image} 
              alt={leadResearcher.name}
              className="w-12 h-12 rounded-full border-2 border-yellow-500/50"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center">
                <h3 className="text-lg font-medium text-white">{leadResearcher.name}</h3>
                <span className="ml-2 px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">Lead</span>
              </div>
              <p className="text-yellow-300/70 text-sm">{leadResearcher.role}</p>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">
                {papers.filter(p => p.takenBy === leadResearcher.name).length} Papers
              </div>
              <div className="text-yellow-400 text-xs">Lead</div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-10 h-10 rounded-full border-2 border-cyan-500/50"
                />
                <div className="ml-3 flex-1">
                  <h3 className="text-white font-medium">{member.name}</h3>
                  <p className="text-cyan-300/70 text-xs">{member.role}</p>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">
                    {papers.filter(p => p.takenBy === member.name).length}
                  </div>
                  <div className="text-gray-400 text-xs">Papers</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add New Paper Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Active Papers</h2>
        <button
          onClick={() => {
            setEditingPaper(null);
            setNewPaper({
              title: '',
              takenBy: '',
              startDate: '',
              deadline: '',
              status: 'Planning',
              details: ''
            });
            setIsModalOpen(true);
          }}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 hover:scale-[1.02]"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Paper
        </button>
      </div>

      {/* DataTable Component */}
      <DataTable
        columns={tableColumns}
        data={tableData}
        expandedRow={expandedRow}
        onRowExpand={toggleRowExpansion}
        rowKey="id"
      />

      {/* Add/Edit Paper Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl w-full max-w-2xl border border-gray-800 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editingPaper ? 'Edit Paper' : 'Add New Paper'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Paper Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={newPaper.title}
                      onChange={handleInputChange}
                      placeholder="Enter paper title"
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Taken By
                    </label>
                    <select
                      id="takenBy"
                      value={newPaper.takenBy}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    >
                      <option value="">Select researcher</option>
                      <optgroup label="Team lead">
                        <option value={leadResearcher.name}>{leadResearcher.name} (Lead)</option>
                      </optgroup>
                      <optgroup label="Team Members">
                        {teamMembers.map(member => (
                          <option key={member.id} value={member.name}>{member.name} ({member.role})</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" />
                      <input
                        type="date"
                        id="startDate"
                        value={newPaper.startDate}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      Deadline
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 pointer-events-none" />
                      <input
                        type="date"
                        id="deadline"
                        value={newPaper.deadline}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Status
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {statusOptions.map(option => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setNewPaper(prev => ({ ...prev, status: option.value }))}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                            newPaper.status === option.value
                              ? `${option.bg} border-${option.color.split('-')[1]}-400/50`
                              : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mb-1 ${newPaper.status === option.value ? option.color : 'text-gray-400'}`} />
                          <span className={`text-xs font-medium ${newPaper.status === option.value ? option.color : 'text-gray-400'}`}>
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Paper Details
                  </label>
                  <textarea
                    id="details"
                    value={newPaper.details}
                    onChange={handleInputChange}
                    placeholder="Enter paper description and details..."
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                  />
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center"
                  >
                    {editingPaper ? (
                      <>
                        <Save size={20} className="mr-2" />
                        Update Paper
                      </>
                    ) : (
                      <>
                        <Plus size={20} className="mr-2" />
                        Add Paper
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
      </div>
    </ReserchLayout>
  );
};

export default PaperWritingPage;