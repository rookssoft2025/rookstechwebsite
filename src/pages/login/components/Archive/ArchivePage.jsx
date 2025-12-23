import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  FileText, 
  Download, 
  ChevronRight, 
  Star,
  ChevronDown
} from 'lucide-react';
import ReserchLayout from '../../../../components/loginLayout/ReserchLayout';

const ArchivePage = () => {
  // Mock data for completed papers
  const initialPapers = [
    {
      id: 1,
      title: "Machine Learning Applications in Healthcare",
      author: "Dr. Sarah Johnson",
      completionDate: "2024-03-15",
      category: "AI/ML",
      tags: ["Healthcare", "Machine Learning", "AI"],
      rating: 4.5,
      downloadCount: 245,
      fileSize: "2.4 MB",
      abstract: "This paper explores the transformative potential of machine learning algorithms in diagnosing diseases through medical imaging and patient data analysis.",
      status: "published"
    },
    {
      id: 2,
      title: "Quantum Computing: The Next Frontier",
      author: "Prof. Michael Chen",
      completionDate: "2024-02-28",
      category: "Quantum Computing",
      tags: ["Quantum", "Physics", "Computation"],
      rating: 4.8,
      downloadCount: 189,
      fileSize: "3.1 MB",
      abstract: "An in-depth analysis of quantum computing principles and their practical applications in cryptography and complex simulations.",
      status: "published"
    },
    {
      id: 3,
      title: "Sustainable Energy Solutions for Urban Areas",
      author: "Dr. Elena Rodriguez",
      completionDate: "2024-03-10",
      category: "Environmental Science",
      tags: ["Renewable Energy", "Sustainability", "Urban Planning"],
      rating: 4.3,
      downloadCount: 312,
      fileSize: "1.8 MB",
      abstract: "Exploring innovative renewable energy solutions tailored for metropolitan environments with case studies from leading cities.",
      status: "published"
    },
    {
      id: 4,
      title: "Blockchain Technology in Financial Services",
      author: "Dr. James Wilson",
      completionDate: "2024-01-22",
      category: "Blockchain",
      tags: ["Finance", "Blockchain", "Security"],
      rating: 4.6,
      downloadCount: 421,
      fileSize: "2.7 MB",
      abstract: "A comprehensive study on blockchain implementation in modern financial systems and its impact on transaction security.",
      status: "archived"
    },
    {
      id: 5,
      title: "Neural Networks for Image Recognition",
      author: "Dr. Lisa Zhang",
      completionDate: "2024-03-05",
      category: "AI/ML",
      tags: ["Neural Networks", "Computer Vision", "Deep Learning"],
      rating: 4.7,
      downloadCount: 298,
      fileSize: "3.5 MB",
      abstract: "Advanced neural network architectures for high-accuracy image classification in real-world applications.",
      status: "published"
    },
    {
      id: 6,
      title: "Climate Change Impact on Coastal Cities",
      author: "Dr. Robert Kim",
      completionDate: "2024-02-14",
      category: "Environmental Science",
      tags: ["Climate", "Coastal", "Environment"],
      rating: 4.4,
      downloadCount: 178,
      fileSize: "2.1 MB",
      abstract: "Analyzing the effects of climate change on coastal urban centers worldwide and proposing mitigation strategies.",
      status: "archived"
    },
  ];

  const [papers, setPapers] = useState(initialPapers);
  const [filteredPapers, setFilteredPapers] = useState(initialPapers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const categories = ['All', 'AI/ML', 'Quantum Computing', 'Environmental Science', 'Blockchain'];
  const statusOptions = ['all', 'published', 'archived'];

  // Filter and sort papers
  useEffect(() => {
    let result = papers;

    // Search filter
    if (searchTerm) {
      result = result.filter(paper =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        paper.abstract.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(paper => paper.category === selectedCategory);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(paper => paper.status === statusFilter);
    }

    // Date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      result = result.filter(paper => {
        const paperDate = new Date(paper.completionDate);
        const diffDays = (now - paperDate) / (1000 * 60 * 60 * 24);
        
        switch (dateRange) {
          case 'week': return diffDays <= 7;
          case 'month': return diffDays <= 30;
          case 'quarter': return diffDays <= 90;
          case 'year': return diffDays <= 365;
          default: return true;
        }
      });
    }

    // Sorting
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.completionDate) - new Date(a.completionDate);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        default:
          return 0;
      }
    });

    setFilteredPapers(result);
  }, [searchTerm, selectedCategory, sortBy, dateRange, statusFilter, papers]);

  const handleDownload = (paperId) => {
    const paper = papers.find(p => p.id === paperId);
    alert(`Downloading: ${paper.title}`);
    // In a real app, you would initiate file download here
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < Math.floor(rating) 
              ? "text-yellow-400 fill-yellow-400" 
              : "text-gray-400"
            }
          />
        ))}
        <span className="ml-2 text-sm text-blue-100">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <ReserchLayout
    //   activeTab={activeTab}
    //   setActiveTab={setActiveTab}
    //   onLogout={handleLogout}
    //   isLoading={isLoggingOut}
    >
    <div className="min-h-screen bg-gradient-to-br from-black-900 via-white-900 to-white-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-300 to-white bg-clip-text text-transparent">
                Research Archive
              </h1>
              <p className="text-blue-200">
                Browse through {papers.length} completed research papers
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="px-4 py-2 bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-700/30">
                <span className="text-blue-200 text-sm">
                  Last updated: Today
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-800/20 to-indigo-800/20 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-blue-700/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Search and Status */}
              <div className="space-y-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
                  <input
                    type="text"
                    placeholder="Search papers, authors, or tags..."
                    className="w-full pl-12 pr-4 py-3 bg-blue-900/30 backdrop-blur-sm border-2 border-blue-700/30 rounded-xl text-white placeholder-blue-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Status Filter */}
                <div className="flex space-x-2">
                  {statusOptions.map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        statusFilter === status
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/30'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center">
                    <Filter className="absolute left-3 text-blue-300 z-10" size={18} />
                    <select
                      className="w-full pl-10 pr-8 py-3 bg-blue-900/30 backdrop-blur-sm border-2 border-blue-700/30 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(category => (
                        <option key={category} value={category} className="bg-blue-900">
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 text-blue-300" size={18} />
                  </div>
                </div>

                {/* Sort By */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <select
                    className="relative w-full px-4 py-3 bg-blue-900/30 backdrop-blur-sm border-2 border-blue-700/30 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date" className="bg-blue-900">Newest First</option>
                    <option value="title" className="bg-blue-900">Title A-Z</option>
                    <option value="rating" className="bg-blue-900">Highest Rated</option>
                    <option value="downloads" className="bg-blue-900">Most Downloads</option>
                  </select>
                </div>

                {/* Date Range Filter */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <select
                    className="relative w-full px-4 py-3 bg-blue-900/30 backdrop-blur-sm border-2 border-blue-700/30 rounded-xl text-white appearance-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="all" className="bg-blue-900">All Time</option>
                    <option value="year" className="bg-blue-900">Past Year</option>
                    <option value="quarter" className="bg-blue-900">Past 3 Months</option>
                    <option value="month" className="bg-blue-900">Past Month</option>
                    <option value="week" className="bg-blue-900">Past Week</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count and Clear Filters */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-blue-200 text-lg">
            Showing <span className="font-semibold text-white">{filteredPapers.length}</span> of {papers.length} papers
          </p>
          {(searchTerm || selectedCategory !== 'All' || statusFilter !== 'all' || dateRange !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setStatusFilter('all');
                setDateRange('all');
              }}
              className="text-sm text-blue-300 hover:text-white transition-colors duration-300"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Papers Grid */}
        <div className="space-y-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="group relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Paper Card */}
              <div className="relative bg-gradient-to-br from-blue-900/40 via-blue-900/30 to-indigo-900/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-700/30 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Content */}
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            paper.status === 'published'
                              ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30'
                              : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
                          </span>
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 text-blue-200 rounded-full text-sm border border-blue-500/30">
                            {paper.category}
                          </span>
                          <span className="flex items-center text-blue-300 text-sm">
                            <Calendar size={14} className="mr-1" />
                            {formatDate(paper.completionDate)}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                          {paper.title}
                        </h3>
                        
                        <div className="flex items-center text-blue-200">
                          <User size={16} className="mr-2" />
                          <span>{paper.author}</span>
                        </div>
                      </div>
                      
                      {/* Desktop Rating */}
                      <div className="hidden lg:block">
                        {renderStars(paper.rating)}
                      </div>
                    </div>

                    {/* Abstract */}
                    <p className="text-blue-100 mb-4 line-clamp-2">
                      {paper.abstract}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-800/30 text-blue-200 rounded-lg text-sm border border-blue-700/30 hover:border-blue-500/50 transition-colors duration-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Mobile Rating and Stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="lg:hidden">
                        {renderStars(paper.rating)}
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-6 text-sm text-blue-300">
                        <span className="flex items-center">
                          <FileText size={14} className="mr-1" />
                          {paper.fileSize}
                        </span>
                        <span className="flex items-center">
                          <Download size={14} className="mr-1" />
                          {paper.downloadCount.toLocaleString()} downloads
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col items-center lg:items-end gap-4">
                    <button
                      onClick={() => handleDownload(paper.id)}
                      className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl min-w-[140px] justify-center"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <span className="relative flex items-center gap-2">
                        <Download size={18} />
                        Download
                      </span>
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-900/30 text-blue-200 border-2 border-blue-700/30 rounded-xl hover:bg-blue-800/30 hover:border-blue-500/50 transition-all duration-300 min-w-[140px] justify-center">
                      <span>View Details</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPapers.length === 0 && (
          <div className="text-center py-16">
            <div className="relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-30"></div>
              <div className="relative bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-xl p-8 rounded-3xl border border-blue-700/30">
                <FileText size={64} className="mx-auto text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  No papers found
                </h3>
                <p className="text-blue-200 max-w-md mx-auto mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setStatusFilter('all');
                    setDateRange('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </ReserchLayout>
  );
};

export default ArchivePage;