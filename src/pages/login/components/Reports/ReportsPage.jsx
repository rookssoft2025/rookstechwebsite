import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  FileText,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Filter,
  Download,
  Printer,
  Mail,
  BarChart,
  TrendingUp,
  Target,
  Award,
  Clock3,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  Briefcase,
  User,
  FolderOpen,
  FileCheck,
  GitBranch,
  Code,
  BookOpen,
  Edit2,
  Search,
  MoreVertical,
  Eye,
  DownloadCloud,
  Share2,
  X,
  FileCode,
  CalendarCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";

const ReportsPage = () => {
  const navigate = useNavigate();
  
  const [sidebarTab, setSidebarTab] = useState("reports");
  const [isLoading, setIsLoading] = useState(false);
  
  // Report filter states
  const [timeFilter, setTimeFilter] = useState("weekly");
  const [teamFilter, setTeamFilter] = useState("all");
  const [employeeSearch, setEmployeeSearch] = useState("");
  
  // Date range filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateRange, setShowDateRange] = useState(false);
  
  // Expanded sections
  const [expandedTeams, setExpandedTeams] = useState({});
  const [expandedEmployees, setExpandedEmployees] = useState({});
  
  // Selected employee for detailed view
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewMode, setViewMode] = useState("team"); // 'team' or 'individual'

  const handleLogout = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate("/login");
    setIsLoading(false);
  };

  // Toggle team expansion
  const toggleTeamExpansion = (teamId) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  // Toggle employee expansion
  const toggleEmployeeExpansion = (employeeId) => {
    setExpandedEmployees(prev => ({
      ...prev,
      [employeeId]: !prev[employeeId]
    }));
  };

  // Teams data with employees - Updated team names
  const teams = [
    {
      id: 1,
      name: "Coding Team",
      department: "Software Development",
      color: "bg-blue-500",
      icon: Code,
      teamLeader: "Dr. Alex Chen",
      totalEmployees: 2,
      activeProjects: 4,
      completedProjects: 8,
    },
    {
      id: 2,
      name: "Proposal Team",
      department: "Research Proposals",
      color: "bg-green-500",
      icon: FileText,
      teamLeader: "Dr. James Wilson",
      totalEmployees: 2,
      activeProjects: 2,
      completedProjects: 5,
    },
    {
      id: 3,
      name: "Journal Team",
      department: "Research Publications",
      color: "bg-purple-500",
      icon: BookOpen,
      teamLeader: "Dr. Sarah Johnson",
      totalEmployees: 2,
      activeProjects: 3,
      completedProjects: 6,
    },
    {
      id: 4,
      name: "Writing Team",
      department: "Technical Documentation",
      color: "bg-yellow-500",
      icon: Edit2,
      teamLeader: "Jane Smith",
      totalEmployees: 2,
      activeProjects: 2,
      completedProjects: 4,
    },
  ];

  // Employees data with completed and current projects
  const employees = [
    {
      id: 1,
      name: "Dr. Alex Chen",
      role: "Senior AI Developer",
      email: "alex.chen@research.com",
      phone: "+1 (555) 123-4567",
      department: "Software Development",
      teamId: 1,
      teamName: "Coding Team",
      avatarColor: "bg-blue-500",
      joinDate: "2022-03-15",
      status: "active",
      
      // CURRENT PROJECTS (Active)
      currentProjects: [
        {
          id: "p1",
          title: "Neural Network Optimization",
          type: "coding",
          category: "AI Research",
          status: "in-progress",
          progress: 85,
          startDate: "2024-02-15",
          deadline: "2024-04-15",
          priority: "high",
          hoursSpent: 120,
          hoursEstimated: 150,
          description: "Developing optimized neural network architectures for real-time image processing.",
          technologies: ["Python", "TensorFlow", "PyTorch"],
          teamMembers: ["Dr. Alex Chen", "Sarah Williams", "Mike Johnson"]
        },
        {
          id: "p2",
          title: "Computer Vision Pipeline",
          type: "coding",
          category: "AI Research",
          status: "in-progress",
          progress: 60,
          startDate: "2024-03-01",
          deadline: "2024-06-30",
          priority: "medium",
          hoursSpent: 85,
          hoursEstimated: 200,
          description: "Building an end-to-end computer vision pipeline for object detection.",
          technologies: ["Python", "OpenCV", "Docker"],
          teamMembers: ["Dr. Alex Chen", "Mike Johnson"]
        },
      ],
      
      // COMPLETED PROJECTS (Past)
      completedProjects: [
        {
          id: "cp1",
          title: "AI Chatbot Implementation",
          type: "coding",
          category: "AI Research",
          status: "completed",
          progress: 100,
          startDate: "2023-10-01",
          endDate: "2023-12-15",
          hoursSpent: 180,
          client: "TechCorp Inc.",
          outcome: "Successfully deployed with 95% accuracy",
          achievements: ["Reduced response time by 60%", "Handled 10K+ daily queries"],
          rating: 4.8
        },
        {
          id: "cp2",
          title: "Predictive Analytics Model",
          type: "coding",
          category: "Data Science",
          status: "completed",
          progress: 100,
          startDate: "2023-07-15",
          endDate: "2023-09-30",
          hoursSpent: 220,
          client: "FinanceBank",
          outcome: "Model achieved 92% prediction accuracy",
          achievements: ["Saved $2M in fraud detection", "Published research paper"],
          rating: 4.9
        },
        {
          id: "cp3",
          title: "MLOps Pipeline Setup",
          type: "coding",
          category: "DevOps",
          status: "completed",
          progress: 100,
          startDate: "2023-04-01",
          endDate: "2023-06-30",
          hoursSpent: 160,
          client: "Internal",
          outcome: "Reduced deployment time from days to hours",
          achievements: ["Automated 80% of deployment process", "Trained 5 team members"],
          rating: 4.7
        },
      ],
      
      // Weekly Report
      weeklyReport: {
        period: "Mar 18-24, 2024",
        tasksCompleted: 18,
        tasksPending: 3,
        meetingsAttended: 6,
        codeCommits: 42,
        bugsFixed: 7,
        featuresImplemented: 3,
        notes: "Excellent progress on neural network optimization. Completed integration with new dataset.",
        achievements: ["Optimized training algorithm", "Reduced model size by 30%"]
      },
      
      // Monthly Report
      monthlyReport: {
        period: "March 2024",
        projectsCompleted: 2,
        projectsInProgress: 2,
        tasksCompleted: 65,
        achievements: [
          "Optimized model training time by 40%",
          "Published paper on AI optimization",
          "Mentored 2 junior developers",
        ],
        trainingCompleted: ["Advanced ML Workshop", "Cloud Certification"],
      },
      
      // Yearly Report
      yearlyReport: {
        period: "2023-2024",
        totalProjects: 6,
        successfulDeliveries: 5,
        researchPapers: 3,
        patentsFiled: 1,
        awards: ["Best Researcher 2023", "Innovation Award"],
        trainingHours: 120,
        promotions: 1,
        revenueGenerated: "$2.5M",
        clientRetention: "100%",
      },
    },
    {
      id: 2,
      name: "Raj Patel",
      role: "Blockchain Engineer",
      email: "raj.patel@research.com",
      phone: "+1 (555) 987-6543",
      department: "Software Development",
      teamId: 1,
      teamName: "Coding Team",
      avatarColor: "bg-green-500",
      joinDate: "2021-11-20",
      status: "active",
      
      currentProjects: [
        {
          id: "p3",
          title: "Supply Chain DApp",
          type: "coding",
          category: "Blockchain",
          status: "completed",
          progress: 100,
          startDate: "2024-01-10",
          deadline: "2024-03-30",
          priority: "high",
          hoursSpent: 150,
          hoursEstimated: 150,
          description: "Building a decentralized application for supply chain transparency.",
          technologies: ["Solidity", "Ethereum", "React"],
          teamMembers: ["Raj Patel", "Lisa Wong", "David Kim"]
        },
        {
          id: "p4",
          title: "NFT Marketplace",
          type: "coding",
          category: "Blockchain",
          status: "in-progress",
          progress: 40,
          startDate: "2024-04-01",
          deadline: "2024-07-31",
          priority: "medium",
          hoursSpent: 60,
          hoursEstimated: 300,
          description: "Developing an NFT marketplace with enhanced security features.",
          technologies: ["Solidity", "IPFS", "Next.js"],
          teamMembers: ["Raj Patel", "Emma Davis"]
        },
      ],
      
      completedProjects: [
        {
          id: "cp4",
          title: "DeFi Protocol Audit",
          type: "audit",
          category: "Security",
          status: "completed",
          progress: 100,
          startDate: "2023-11-01",
          endDate: "2023-12-15",
          hoursSpent: 120,
          client: "CryptoFund",
          outcome: "Identified and fixed 3 critical vulnerabilities",
          achievements: ["Prevented potential $5M loss", "Enhanced protocol security"],
          rating: 4.9
        },
        {
          id: "cp5",
          title: "Smart Contract Development",
          type: "coding",
          category: "Blockchain",
          status: "completed",
          progress: 100,
          startDate: "2023-08-15",
          endDate: "2023-10-31",
          hoursSpent: 200,
          client: "FinTech Solutions",
          outcome: "Deployed on mainnet with zero bugs",
          achievements: ["Reduced gas fees by 25%", "Implemented multi-sig security"],
          rating: 4.8
        },
      ],
      
      weeklyReport: {
        period: "Mar 18-24, 2024",
        tasksCompleted: 15,
        tasksPending: 2,
        meetingsAttended: 5,
        codeCommits: 35,
        bugsFixed: 5,
        featuresImplemented: 2,
        notes: "Completed smart contract testing phase. Ready for deployment.",
        achievements: ["Fixed critical security issue", "Optimized gas usage"]
      },
    },
    {
      id: 3,
      name: "Dr. James Wilson",
      role: "Lead Researcher",
      email: "james.wilson@research.com",
      phone: "+1 (555) 456-7890",
      department: "Research Proposals",
      teamId: 2,
      teamName: "Proposal Team",
      avatarColor: "bg-purple-500",
      joinDate: "2020-08-10",
      status: "active",
      
      currentProjects: [
        {
          id: "p5",
          title: "Quantum Computing Research Grant",
          type: "proposal",
          category: "Research",
          status: "in-progress",
          progress: 70,
          startDate: "2024-02-01",
          deadline: "2024-12-31",
          priority: "high",
          hoursSpent: 95,
          hoursEstimated: 400,
          description: "Proposal for quantum computing research focusing on optimization algorithms.",
          technologies: ["Qiskit", "Python", "LaTeX"],
          teamMembers: ["Dr. James Wilson", "Prof. Sarah Miller", "Dr. Robert Chen"]
        },
      ],
      
      completedProjects: [
        {
          id: "cp6",
          title: "Quantum Algorithm Paper",
          type: "journal",
          category: "Research",
          status: "completed",
          progress: 100,
          startDate: "2023-09-01",
          endDate: "2023-12-31",
          hoursSpent: 300,
          client: "Nature Journal",
          outcome: "Published in Nature with high impact factor",
          achievements: ["Breakthrough in quantum speedup", "Cited 50+ times"],
          rating: 5.0
        },
        {
          id: "cp7",
          title: "AI Ethics Framework Proposal",
          type: "proposal",
          category: "Ethics",
          status: "completed",
          progress: 100,
          startDate: "2023-05-01",
          endDate: "2023-08-31",
          hoursSpent: 350,
          client: "Government Agency",
          outcome: "Proposal approved with $500K funding",
          achievements: ["Secured major grant", "Framework adopted as standard"],
          rating: 4.9
        },
      ],
      
      weeklyReport: {
        period: "Mar 18-24, 2024",
        tasksCompleted: 22,
        tasksPending: 4,
        meetingsAttended: 8,
        researchHours: 35,
        sectionsWritten: 15,
        proposalsReviewed: 3,
        notes: "Made significant progress on quantum research proposal. Paper submission ready.",
        achievements: ["Finalized research methodology", "Prepared conference presentation"]
      },
    },
    {
      id: 4,
      name: "Jane Smith",
      role: "Technical Writer",
      email: "jane.smith@research.com",
      phone: "+1 (555) 345-6789",
      department: "Technical Documentation",
      teamId: 4,
      teamName: "Writing Team",
      avatarColor: "bg-yellow-500",
      joinDate: "2022-06-05",
      status: "active",
      
      currentProjects: [
        {
          id: "p6",
          title: "Research Methodology Handbook",
          type: "writing",
          category: "Documentation",
          status: "in-progress",
          progress: 75,
          startDate: "2024-02-20",
          deadline: "2024-04-05",
          priority: "medium",
          hoursSpent: 65,
          hoursEstimated: 100,
          description: "Comprehensive handbook detailing research methodologies.",
          technologies: ["Markdown", "LaTeX", "GitBook"],
          teamMembers: ["Jane Smith", "Robert Brown", "Anna Wilson"]
        },
      ],
      
      completedProjects: [
        {
          id: "cp8",
          title: "Annual Research Report 2023",
          type: "writing",
          category: "Documentation",
          status: "completed",
          progress: 100,
          startDate: "2024-01-05",
          endDate: "2024-03-25",
          hoursSpent: 120,
          client: "Internal",
          outcome: "Published and distributed to all stakeholders",
          achievements: ["Completed 2 weeks ahead of schedule", "Received executive praise"],
          rating: 4.6
        },
        {
          id: "cp9",
          title: "API Documentation",
          type: "writing",
          category: "Technical",
          status: "completed",
          progress: 100,
          startDate: "2023-10-01",
          endDate: "2023-11-30",
          hoursSpent: 90,
          client: "Development Team",
          outcome: "Reduced support queries by 40%",
          achievements: ["Created interactive examples", "Improved developer onboarding"],
          rating: 4.7
        },
      ],
      
      weeklyReport: {
        period: "Mar 18-24, 2024",
        tasksCompleted: 12,
        tasksPending: 5,
        meetingsAttended: 4,
        pagesWritten: 45,
        reviewsCompleted: 8,
        editsMade: 32,
        notes: "Completed 3 chapters of methodology handbook. Awaiting peer review.",
        achievements: ["Improved document structure", "Added visual diagrams"]
      },
    },
    {
      id: 5,
      name: "Dr. Sarah Johnson",
      role: "Research Scientist",
      email: "sarah.johnson@research.com",
      phone: "+1 (555) 234-5678",
      department: "Research Publications",
      teamId: 3,
      teamName: "Journal Team",
      avatarColor: "bg-pink-500",
      joinDate: "2021-09-15",
      status: "active",
      
      currentProjects: [
        {
          id: "p7",
          title: "Quantum Neural Networks Paper",
          type: "journal",
          category: "Research",
          status: "in-review",
          progress: 60,
          startDate: "2024-02-15",
          deadline: "2024-05-15",
          priority: "high",
          hoursSpent: 110,
          hoursEstimated: 200,
          description: "Exploring quantum computing applications in neural networks.",
          technologies: ["Python", "Qiskit", "LaTeX"],
          teamMembers: ["Dr. Sarah Johnson", "Prof. Michael Chen"]
        },
      ],
      
      completedProjects: [
        {
          id: "cp10",
          title: "Sustainable AI in Agriculture",
          type: "journal",
          category: "Research",
          status: "completed",
          progress: 100,
          startDate: "2023-09-01",
          endDate: "2024-01-31",
          hoursSpent: 250,
          client: "Science Advances Journal",
          outcome: "Published in top-tier journal with high citations",
          achievements: ["Cited 100+ times", "Featured in media coverage"],
          rating: 4.9
        },
        {
          id: "cp11",
          title: "Neural Network Optimization Paper",
          type: "journal",
          category: "AI Research",
          status: "completed",
          progress: 100,
          startDate: "2023-04-01",
          endDate: "2023-08-31",
          hoursSpent: 180,
          client: "Nature AI Journal",
          outcome: "Published with impact factor 18.5",
          achievements: ["Breakthrough optimization method", "Adopted by major labs"],
          rating: 4.8
        },
      ],
      
      weeklyReport: {
        period: "Mar 18-24, 2024",
        tasksCompleted: 16,
        tasksPending: 3,
        meetingsAttended: 7,
        researchHours: 32,
        experimentsConducted: 8,
        dataAnalyzed: "15GB",
        notes: "Paper revisions completed. Submitted for journal review.",
        achievements: ["Improved analysis methodology", "Added new datasets"]
      },
    },
    {
      id: 6,
      name: "Emily Brown",
      role: "Proposal Specialist",
      email: "emily.brown@research.com",
      phone: "+1 (555) 789-0123",
      department: "Research Proposals",
      teamId: 2,
      teamName: "Proposal Team",
      avatarColor: "bg-indigo-500",
      joinDate: "2022-02-14",
      status: "active",
      
      currentProjects: [
        {
          id: "p8",
          title: "Sustainable AI in Agriculture Proposal",
          type: "proposal",
          category: "Agriculture",
          status: "in-progress",
          progress: 40,
          startDate: "2024-01-15",
          deadline: "2025-06-30",
          priority: "medium",
          hoursSpent: 60,
          hoursEstimated: 300,
          description: "Proposal for implementing AI solutions in precision agriculture.",
          technologies: ["Python", "IoT", "Data Analysis"],
          teamMembers: ["Emily Brown", "Mark Thompson", "Dr. Lisa Zhang"]
        },
      ],
      
      completedProjects: [
        {
          id: "cp12",
          title: "Renewable Energy Research Grant",
          type: "proposal",
          category: "Energy",
          status: "completed",
          progress: 100,
          startDate: "2023-07-01",
          endDate: "2023-10-31",
          hoursSpent: 220,
          client: "Energy Department",
          outcome: "Secured $750K research grant",
          achievements: ["Largest grant in department history", "Multi-year funding secured"],
          rating: 4.9
        },
      ],
      
      weeklyReport: {
        period: "Mar 18-24, 2024",
        tasksCompleted: 14,
        tasksPending: 3,
        meetingsAttended: 6,
        proposalPages: 25,
        budgetsPrepared: 3,
        grantsResearched: 8,
        notes: "Completed agricultural data analysis section. Preparing budget proposal.",
        achievements: ["Identified new funding opportunities", "Improved proposal structure"]
      },
    },
  ];

  // Time filter options
  const timeFilterOptions = [
    { id: "weekly", label: "Weekly Report", icon: CalendarDays, color: "bg-blue-500" },
    { id: "monthly", label: "Monthly Report", icon: CalendarRange, color: "bg-purple-500" },
    { id: "yearly", label: "Yearly Report", icon: CalendarClock, color: "bg-green-500" },
    { id: "custom", label: "Custom Date Range", icon: CalendarCheck, color: "bg-cyan-500" },
  ];

  // Get employees by team
  const getEmployeesByTeam = useMemo(() => {
    const employeesByTeam = {};
    employees.forEach(employee => {
      if (!employeesByTeam[employee.teamId]) {
        employeesByTeam[employee.teamId] = [];
      }
      employeesByTeam[employee.teamId].push(employee);
    });
    return employeesByTeam;
  }, [employees]);

  // Get filtered teams based on team filter
  const filteredTeams = useMemo(() => {
    if (teamFilter === "all") return teams;
    return teams.filter(team => team.id.toString() === teamFilter);
  }, [teams, teamFilter]);

  // Filter projects by date range
  const filterProjectsByDate = (projects) => {
    if (!showDateRange || !startDate || !endDate) return projects;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return projects.filter(project => {
      const projectDate = new Date(project.startDate || project.uploadedDate);
      return projectDate >= start && projectDate <= end;
    });
  };

  // Get filtered employees based on search and filters
  const filteredEmployees = useMemo(() => {
    let result = employees;
    
    // Filter by team
    if (teamFilter !== "all") {
      result = result.filter(emp => emp.teamId.toString() === teamFilter);
    }
    
    // Filter by search
    if (employeeSearch) {
      const searchLower = employeeSearch.toLowerCase();
      result = result.filter(emp =>
        emp.name.toLowerCase().includes(searchLower) ||
        emp.role.toLowerCase().includes(searchLower) ||
        emp.department.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by date range
    if (showDateRange && startDate && endDate) {
      result = result.map(emp => ({
        ...emp,
        filteredCurrentProjects: filterProjectsByDate(emp.currentProjects),
        filteredCompletedProjects: filterProjectsByDate(emp.completedProjects)
      })).filter(emp => 
        emp.filteredCurrentProjects.length > 0 || 
        emp.filteredCompletedProjects.length > 0
      );
    }
    
    return result;
  }, [employees, teamFilter, employeeSearch, showDateRange, startDate, endDate]);

  // Get current report based on time filter
  const getEmployeeReport = (employee) => {
    switch (timeFilter) {
      case "weekly":
        return employee.weeklyReport;
      case "monthly":
        return employee.monthlyReport;
      case "yearly":
        return employee.yearlyReport;
      default:
        return employee.weeklyReport;
    }
  };

  // Get report title
  const getReportTitle = () => {
    if (showDateRange && startDate && endDate) {
      return `Custom Report (${formatDate(startDate)} - ${formatDate(endDate)})`;
    }
    
    const now = new Date();
    switch (timeFilter) {
      case "weekly":
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
        return `Weekly Report (${formatDate(weekStart)} - ${formatDate(weekEnd)})`;
      case "monthly":
        return `Monthly Report - ${now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
      case "yearly":
        return `Yearly Report - ${now.getFullYear()}`;
      default:
        return "Performance Reports";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return { color: "bg-green-900/30", text: "text-green-400", icon: CheckCircle };
      case "in-progress":
        return { color: "bg-blue-900/30", text: "text-blue-400", icon: Clock };
      case "in-review":
        return { color: "bg-purple-900/30", text: "text-purple-400", icon: Eye };
      case "pending":
        return { color: "bg-yellow-900/30", text: "text-yellow-400", icon: Clock3 };
      default:
        return { color: "bg-gray-900/30", text: "text-gray-400", icon: Clock };
    }
  };

  // Get project type icon
  const getProjectTypeIcon = (type) => {
    switch (type) {
      case "coding": return FileCode;
      case "proposal": return FileText;
      case "journal": return BookOpen;
      case "writing": return Edit2;
      case "audit": return FileCheck;
      default: return FolderOpen;
    }
  };

  // Get paper details for team (for journal and writing teams)
  const getTeamPaperDetails = (teamId) => {
    const teamEmployees = getEmployeesByTeam[teamId] || [];
    const papers = [];
    
    teamEmployees.forEach(employee => {
      // Get current papers
      employee.currentProjects.forEach(project => {
        if (project.type === 'journal' || project.type === 'writing') {
          papers.push({
            ...project,
            employeeName: employee.name,
            employeeRole: employee.role,
            type: 'current'
          });
        }
      });
      
      // Get completed papers
      employee.completedProjects.forEach(project => {
        if (project.type === 'journal' || project.type === 'writing') {
          papers.push({
            ...project,
            employeeName: employee.name,
            employeeRole: employee.role,
            type: 'completed'
          });
        }
      });
    });
    
    return papers;
  };

  // Get employee paper details
  const getEmployeePaperDetails = (employee) => {
    const papers = [];
    
    // Get current papers
    employee.currentProjects.forEach(project => {
      if (project.type === 'journal' || project.type === 'writing') {
        papers.push({
          ...project,
          type: 'current'
        });
      }
    });
    
    // Get completed papers
    employee.completedProjects.forEach(project => {
      if (project.type === 'journal' || project.type === 'writing') {
        papers.push({
          ...project,
          type: 'completed'
        });
      }
    });
    
    return papers;
  };

  // Render team card
  const TeamCard = ({ team }) => {
    const Icon = team.icon;
    const teamEmployees = getEmployeesByTeam[team.id] || [];
    const isExpanded = expandedTeams[team.id];
    const teamPapers = getTeamPaperDetails(team.id);
    
    return (
      <div className="glass-card rounded-2xl border border-gray-800 overflow-hidden mb-6">
        {/* Team Header */}
        <div 
          className="p-6 cursor-pointer hover:bg-gray-900/30 transition-all"
          onClick={() => toggleTeamExpansion(team.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-3 rounded-xl ${team.color} bg-opacity-20 mr-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{team.name}</h3>
                <p className="text-gray-400">{team.department}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{team.totalEmployees}</div>
                <div className="text-sm text-gray-400">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{team.activeProjects}</div>
                <div className="text-sm text-gray-400">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{team.completedProjects}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTeamExpansion(team.id);
                }}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          {/* Team Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Team Leader</span>
                <span className="text-lg font-bold text-white">{team.teamLeader}</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Projects</span>
                <span className="text-lg font-bold text-cyan-400">
                  {team.activeProjects + team.completedProjects}
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-900/50 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Papers/Docs</span>
                <span className="text-lg font-bold text-purple-400">
                  {teamPapers.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Team Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-800"
            >
              <div className="p-6">
                {/* Team Members */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Team Members ({teamEmployees.length})</h4>
                  
                  {teamEmployees.map(employee => (
                    <div key={employee.id} className="mb-4 last:mb-0">
                      <div className="flex items-center p-4 bg-gray-900/30 rounded-xl">
                        <div className={`w-10 h-10 rounded-full ${employee.avatarColor} flex items-center justify-center mr-4`}>
                          <span className="text-white font-bold">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold text-white">{employee.name}</h5>
                              <p className="text-sm text-gray-400">{employee.role}</p>
                              <div className="flex items-center mt-1 text-xs text-gray-500">
                                <Briefcase className="w-3 h-3 mr-1" />
                                {employee.department}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className="text-sm text-gray-400">Projects</div>
                                <div className="text-lg font-bold text-white">
                                  {employee.currentProjects.length + employee.completedProjects.length}
                                </div>
                              </div>
                              <button
                                onClick={() => setSelectedEmployee(employee)}
                                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
                              >
                                View Report
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Paper/Document Details Section */}
                {(team.name === 'Journal Team' || team.name === 'Writing Team') && teamPapers.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">
                      {team.name === 'Journal Team' ? 'Journal Papers' : 'Writing Documents'}
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Author</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamPapers.map((paper, index) => {
                            const statusBadge = getStatusBadge(paper.status);
                            const StatusIcon = statusBadge.icon;
                            
                            return (
                              <tr key={index} className="border-b border-gray-900 hover:bg-gray-900/30">
                                <td className="py-3 px-4">
                                  <div className="font-medium text-white">{paper.title}</div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="text-sm text-gray-300">{paper.employeeName}</div>
                                  <div className="text-xs text-gray-500">{paper.employeeRole}</div>
                                </td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                                    {paper.type === 'current' ? 'Current' : 'Completed'}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="text-sm text-gray-300">
                                    {paper.type === 'current' 
                                      ? formatDate(paper.startDate) 
                                      : formatDate(paper.endDate)}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className={`inline-flex items-center px-2 py-1 rounded-full ${statusBadge.color} ${statusBadge.text}`}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    <span className="text-xs">{paper.status}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div 
                                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                                      style={{ width: `${paper.progress}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-xs text-gray-400 mt-1">{paper.progress}%</div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Coding/Proposal Details for other teams */}
                {(team.name === 'Coding Team' || team.name === 'Proposal Team') && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">
                      {team.name === 'Coding Team' ? 'Recent Coding Projects' : 'Recent Proposals'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teamEmployees.slice(0, 2).map(employee => (
                        employee.currentProjects.slice(0, 1).map(project => (
                          <div key={project.id} className="p-4 bg-gray-900/30 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-semibold text-white">{project.title}</h5>
                              <div className={`inline-flex items-center px-2 py-1 rounded-full ${
                                project.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                                project.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400' :
                                'bg-yellow-900/30 text-yellow-400'
                              }`}>
                                <span className="text-xs">{project.status}</span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 mb-2">By: {employee.name}</div>
                            <div className="text-xs text-gray-500">{project.description.substring(0, 100)}...</div>
                          </div>
                        ))
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Render employee card in list view
  const EmployeeCard = ({ employee }) => {
    const report = getEmployeeReport(employee);
    const isExpanded = expandedEmployees[employee.id];
    const team = teams.find(t => t.id === employee.teamId);
    const employeePapers = getEmployeePaperDetails(employee);
    
    // Use filtered projects if date range is active
    const currentProjects = showDateRange && startDate && endDate 
      ? employee.filteredCurrentProjects || employee.currentProjects
      : employee.currentProjects;
    
    const completedProjects = showDateRange && startDate && endDate
      ? employee.filteredCompletedProjects || employee.completedProjects
      : employee.completedProjects;
    
    return (
      <div className="glass-card rounded-2xl border border-gray-800 overflow-hidden mb-6">
        {/* Employee Header */}
        <div 
          className="p-6 cursor-pointer hover:bg-gray-900/30 transition-all"
          onClick={() => toggleEmployeeExpansion(employee.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full ${employee.avatarColor} flex items-center justify-center mr-4`}>
                <span className="text-white font-bold text-lg">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white">{employee.name}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-400">{employee.role}</span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span className="text-sm text-cyan-400">{team?.name}</span>
                  <span className="mx-2 text-gray-600">•</span>
                  <span className="text-sm text-purple-400">
                    {currentProjects.length} Active, {completedProjects.length} Completed
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Total Projects</div>
                <div className="text-lg font-bold text-white">
                  {currentProjects.length + completedProjects.length}
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEmployeeExpansion(employee.id);
                }}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400">Active Projects</div>
              <div className="text-xl font-bold text-cyan-400">{currentProjects.length}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400">Completed</div>
              <div className="text-xl font-bold text-green-400">{completedProjects.length}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400">Tasks This Week</div>
              <div className="text-xl font-bold text-white">{report.tasksCompleted || 0}</div>
            </div>
            
            <div className="text-center p-3 bg-gray-900/50 rounded-lg">
              <div className="text-sm text-gray-400">Papers/Docs</div>
              <div className="text-xl font-bold text-purple-400">
                {employeePapers.length}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Employee Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-800"
            >
              <div className="p-6">
                {/* Paper/Document Details Section (for Journal and Writing teams) */}
                {(employee.teamName === 'Journal Team' || employee.teamName === 'Writing Team') && employeePapers.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      {employee.teamName === 'Journal Team' ? 'Journal Papers' : 'Writing Documents'}
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                            <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employeePapers.map((paper, index) => {
                            const statusBadge = getStatusBadge(paper.status);
                            const StatusIcon = statusBadge.icon;
                            
                            return (
                              <tr key={index} className="border-b border-gray-900 hover:bg-gray-900/30">
                                <td className="py-3 px-4">
                                  <div className="font-medium text-white">{paper.title}</div>
                                </td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                                    {paper.category}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                                    {paper.type === 'current' ? 'Current' : 'Completed'}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="text-sm text-gray-300">
                                    {paper.type === 'current' 
                                      ? formatDate(paper.startDate) 
                                      : formatDate(paper.endDate)}
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className={`inline-flex items-center px-2 py-1 rounded-full ${statusBadge.color} ${statusBadge.text}`}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    <span className="text-xs">{paper.status}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="w-full bg-gray-800 rounded-full h-2">
                                    <div 
                                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                                      style={{ width: `${paper.progress}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-xs text-gray-400 mt-1">{paper.progress}%</div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Current Projects */}
                {currentProjects.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Current Projects ({currentProjects.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentProjects.map(project => {
                        const statusBadge = getStatusBadge(project.status);
                        const StatusIcon = statusBadge.icon;
                        const ProjectTypeIcon = getProjectTypeIcon(project.type);
                        
                        return (
                          <div key={project.id} className="p-4 bg-gray-900/50 rounded-xl">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-start">
                                <div className="p-2 bg-blue-900/20 rounded-lg mr-3">
                                  <ProjectTypeIcon className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                  <h5 className="font-semibold text-white">{project.title}</h5>
                                  <p className="text-sm text-gray-400">{project.category}</p>
                                </div>
                              </div>
                              <div className={`flex items-center px-3 py-1 rounded-full ${statusBadge.color}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                <span className="text-xs font-medium">{project.status}</span>
                              </div>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-400">Progress</span>
                                <span className="text-white font-medium">{project.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-800 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                              <div>
                                <span className="text-gray-400">Hours:</span>
                                <div className="text-white font-medium">
                                  {project.hoursSpent}/{project.hoursEstimated}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400">Deadline:</span>
                                <div className="text-white font-medium">{formatDate(project.deadline)}</div>
                              </div>
                            </div>
                            
                            <div className="text-xs text-gray-400">
                              {project.description}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Completed Projects */}
                {completedProjects.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">
                      Completed Projects ({completedProjects.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {completedProjects.map(project => {
                        const ProjectTypeIcon = getProjectTypeIcon(project.type);
                        
                        return (
                          <div key={project.id} className="p-4 bg-gray-900/30 rounded-xl border border-green-900/30">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex items-start">
                                <div className="p-2 bg-green-900/20 rounded-lg mr-3">
                                  <ProjectTypeIcon className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                  <h5 className="font-semibold text-white">{project.title}</h5>
                                  <p className="text-sm text-gray-400">{project.category}</p>
                                </div>
                              </div>
                              <div className="flex items-center px-3 py-1 rounded-full bg-green-900/30 text-green-400">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                <span className="text-xs font-medium">Completed</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                              <div>
                                <span className="text-gray-400">Duration:</span>
                                <div className="text-white font-medium">
                                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-400">Hours:</span>
                                <div className="text-white font-medium">{project.hoursSpent}</div>
                              </div>
                            </div>
                            
                            <div className="mb-2">
                              <span className="text-gray-400 text-sm">Outcome:</span>
                              <div className="text-green-400 text-sm">{project.outcome}</div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-yellow-400 text-sm">
                                {"★".repeat(Math.floor(project.rating))}
                                <span className="text-gray-400">{"★".repeat(5 - Math.floor(project.rating))}</span>
                                <span className="ml-2">{project.rating}</span>
                              </div>
                              {project.client && (
                                <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                                  {project.client}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Time-based Report Summary */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-white">
                      {showDateRange && startDate && endDate 
                        ? `Report Summary (${formatDate(startDate)} - ${formatDate(endDate)})`
                        : timeFilter === "weekly" ? "Weekly Performance Summary"
                        : timeFilter === "monthly" ? "Monthly Performance Summary"
                        : "Yearly Performance Summary"
                      }
                    </h4>
                    <button
                      onClick={() => setSelectedEmployee(employee)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
                    >
                      View Full Report
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {Object.entries(report).map(([key, value]) => {
                      if (typeof value === 'string' || Array.isArray(value) || typeof value === 'object') return null;
                      
                      return (
                        <div key={key} className="p-4 bg-gray-900/30 rounded-xl">
                          <div className="text-sm text-gray-400 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/(\d+)/g, ' $1')}
                          </div>
                          <div className="text-2xl font-bold text-white mt-2">
                            {typeof value === 'number' ? value : value.toString()}
                          </div>
                        </div>
                      );
                    }).filter(Boolean)}
                  </div>
                  
                  {/* Report Notes */}
                  {report.notes && (
                    <div className="p-4 bg-gray-900/30 rounded-xl">
                      <div className="text-sm text-gray-400 mb-2">Summary:</div>
                      <p className="text-gray-300">{report.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Render employee detail modal
  const EmployeeDetailModal = () => {
    if (!selectedEmployee) return null;
    
    const report = getEmployeeReport(selectedEmployee);
    const team = teams.find(t => t.id === selectedEmployee.teamId);
    const employeePapers = getEmployeePaperDetails(selectedEmployee);
    
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl w-full max-w-6xl border border-gray-800 max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start">
                <div className={`w-16 h-16 rounded-full ${selectedEmployee.avatarColor} flex items-center justify-center mr-4`}>
                  <span className="text-white font-bold text-2xl">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedEmployee.name}</h3>
                  <div className="flex items-center mt-2">
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-cyan-400 mr-3">
                      {selectedEmployee.role}
                    </span>
                    <span className="px-3 py-1 bg-gray-800 rounded-full text-sm text-purple-400">
                      {team?.name}
                    </span>
                    <span className="ml-3 text-sm text-gray-400">
                      Joined: {formatDate(selectedEmployee.joinDate)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">

                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Report Header */}
            <div className="mb-8 p-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-white">{getReportTitle()}</h4>
                  <p className="text-gray-400">{report.period || `Generated on ${new Date().toLocaleDateString()}`}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Total Projects</div>
                  <div className="text-2xl font-bold text-white">
                    {selectedEmployee.currentProjects.length + selectedEmployee.completedProjects.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Paper/Document Details Section (for Journal and Writing teams) */}
            {(selectedEmployee.teamName === 'Journal Team' || selectedEmployee.teamName === 'Writing Team') && employeePapers.length > 0 && (
              <div className="mb-8">
                <h5 className="text-lg font-semibold text-white mb-4">
                  {selectedEmployee.teamName === 'Journal Team' ? 'Journal Papers' : 'Writing Documents'}
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Title</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeePapers.map((paper, index) => {
                        const statusBadge = getStatusBadge(paper.status);
                        const StatusIcon = statusBadge.icon;
                        
                        return (
                          <tr key={index} className="border-b border-gray-900 hover:bg-gray-900/30">
                            <td className="py-3 px-4">
                              <div className="font-medium text-white">{paper.title}</div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                                {paper.category}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                                {paper.type === 'current' ? 'Current' : 'Completed'}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="text-sm text-gray-300">
                                {paper.type === 'current' 
                                  ? formatDate(paper.startDate) 
                                  : formatDate(paper.endDate)}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className={`inline-flex items-center px-2 py-1 rounded-full ${statusBadge.color} ${statusBadge.text}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                <span className="text-xs">{paper.status}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="w-full bg-gray-800 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                                  style={{ width: `${paper.progress}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-400 mt-1">{paper.progress}%</div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Projects Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Current Projects */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-semibold text-white">Current Projects ({selectedEmployee.currentProjects.length})</h5>
                  <span className="text-sm text-cyan-400">{selectedEmployee.currentProjects.filter(p => p.status === 'in-progress').length} in progress</span>
                </div>
                <div className="space-y-4">
                  {selectedEmployee.currentProjects.map(project => {
                    const statusBadge = getStatusBadge(project.status);
                    const StatusIcon = statusBadge.icon;
                    
                    return (
                      <div key={project.id} className="p-4 bg-gray-900/30 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h6 className="font-semibold text-white">{project.title}</h6>
                          <div className={`flex items-center px-3 py-1 rounded-full ${statusBadge.color} ${statusBadge.text}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            <span className="text-xs font-medium">{project.status}</span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white font-medium">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-400">Hours:</span>
                            <div className="text-white">{project.hoursSpent}/{project.hoursEstimated}</div>
                          </div>
                          <div>
                            <span className="text-gray-400">Deadline:</span>
                            <div className="text-white">{formatDate(project.deadline)}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Completed Projects */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-semibold text-white">Completed Projects ({selectedEmployee.completedProjects.length})</h5>
                </div>
                <div className="space-y-4">
                  {selectedEmployee.completedProjects.map(project => (
                    <div key={project.id} className="p-4 bg-green-900/10 rounded-lg border border-green-900/30">
                      <div className="flex justify-between items-start mb-3">
                        <h6 className="font-semibold text-white">{project.title}</h6>
                        <div className="flex items-center px-3 py-1 rounded-full bg-green-900/30 text-green-400">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          <span className="text-xs font-medium">Completed</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm mb-2">
                        <div>
                          <span className="text-gray-400">Duration:</span>
                          <div className="text-white">{formatDate(project.startDate)} - {formatDate(project.endDate)}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Hours:</span>
                          <div className="text-white">{project.hoursSpent}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-green-400 mb-2">{project.outcome}</div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-yellow-400">
                          {"★".repeat(Math.floor(project.rating))}
                          <span className="text-gray-400">{"★".repeat(5 - Math.floor(project.rating))}</span>
                          <span className="ml-2 text-sm">{project.rating}</span>
                        </div>
                        {project.client && (
                          <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                            {project.client}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Report Metrics */}
            <div className="mb-8">
              <h5 className="text-lg font-semibold text-white mb-4">Performance Metrics</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(report).map(([key, value]) => {
                  if (Array.isArray(value) || typeof value === 'string' || typeof value === 'object') return null;
                  
                  return (
                    <div key={key} className="p-4 bg-gray-900/30 rounded-xl">
                      <div className="text-sm text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/(\d+)/g, ' $1')}
                      </div>
                      <div className="text-2xl font-bold text-white mt-2">
                        {typeof value === 'number' ? value : value.toString()}
                      </div>
                    </div>
                  );
                }).filter(Boolean)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-800">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
              >
                Close
              </button>
            
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // Handle custom date range selection
  const handleCustomDateRange = () => {
    setShowDateRange(true);
    setTimeFilter("custom");
  };

  // Handle preset time filter
  const handleTimeFilter = (filter) => {
    setTimeFilter(filter);
    if (filter !== "custom") {
      setShowDateRange(false);
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <ReserchLayout
      activeTab={sidebarTab}
      setActiveTab={setSidebarTab}
      onLogout={handleLogout}
      isLoading={isLoading}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Employee Performance Reports
              </h1>
              <p className="text-gray-400 mt-2">
                Detailed reports of employee projects, performance metrics, and team contributions
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-900/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("team")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === "team" 
                      ? "bg-gradient-to-r from-cyan-900/30 to-purple-900/30 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Users className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("individual")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === "individual" 
                      ? "bg-gradient-to-r from-cyan-900/30 to-purple-900/30 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <User className="w-5 h-5" />
                </button>
              </div>
              
              
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="glass-card rounded-2xl p-6 mb-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* Time Filter */}
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Report Period
              </label>
              <div className="flex flex-col space-y-2">
                {timeFilterOptions.map(option => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => option.id === "custom" ? handleCustomDateRange() : handleTimeFilter(option.id)}
                      className={`flex items-center px-4 py-3 rounded-xl border transition-all ${
                        timeFilter === option.id
                          ? "bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-cyan-500/30"
                          : "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${option.color} mr-3`}></div>
                      <Icon className="w-4 h-4 text-gray-400 mr-3" />
                      <span className={`font-medium ${
                        timeFilter === option.id ? "text-white" : "text-gray-300"
                      }`}>
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Team Filter */}
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-3">
                <Users className="w-4 h-4 mr-2 inline" />
                Filter by Team
              </label>
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              >
                <option value="all">All Teams</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>

            {/* Date Range Filter - Only shown when custom is selected */}
            {showDateRange && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cyan-300 mb-3">
                  <CalendarCheck className="w-4 h-4 mr-2 inline" />
                  Select Date Range
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    />
                    <div className="text-xs text-gray-400 mt-1">Start Date</div>
                  </div>
                  <div>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                    />
                    <div className="text-xs text-gray-400 mt-1">End Date</div>
                  </div>
                </div>
                {(startDate || endDate) && (
                  <div className="mt-2 text-sm text-cyan-400">
                    Showing reports from {startDate ? formatDate(startDate) : "..."} to {endDate ? formatDate(endDate) : "..."}
                  </div>
                )}
              </div>
            )}

            {/* Stats Summary - Only shown when not in custom date range */}
            {!showDateRange && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-cyan-300 mb-3">
                  <BarChart className="w-4 h-4 mr-2 inline" />
                  Summary Statistics
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-900/30 rounded-lg">
                    <div className="text-sm text-gray-400">Total Employees</div>
                    <div className="text-xl font-bold text-white">{filteredEmployees.length}</div>
                  </div>
                  <div className="p-3 bg-gray-900/30 rounded-lg">
                    <div className="text-sm text-gray-400">Active Projects</div>
                    <div className="text-xl font-bold text-cyan-400">
                      {filteredEmployees.reduce((sum, emp) => sum + emp.currentProjects.length, 0)}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-900/30 rounded-lg">
                    <div className="text-sm text-gray-400">Completed</div>
                    <div className="text-xl font-bold text-green-400">
                      {filteredEmployees.reduce((sum, emp) => sum + emp.completedProjects.length, 0)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Search Bar */}
          <div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={employeeSearch}
                onChange={(e) => setEmployeeSearch(e.target.value)}
                placeholder="Search employees by name, role, or department..."
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Main Content - Team View or Individual View */}
        {viewMode === "team" ? (
          /* Team View */
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Team Performance Reports</h2>
              <div className="text-sm text-gray-400">
                Showing {filteredTeams.length} of {teams.length} teams
              </div>
            </div>
            
            {filteredTeams.length > 0 ? (
              filteredTeams.map(team => (
                <TeamCard key={team.id} team={team} />
              ))
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center border border-gray-800">
                <Users className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-3">
                  No teams found
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  No teams match the current filters. Try adjusting your filter criteria.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Individual View */
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Individual Employee Reports</h2>
              <div className="text-sm text-gray-400">
                Showing {filteredEmployees.length} of {employees.length} employees
              </div>
            </div>
            
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map(employee => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))
            ) : (
              <div className="glass-card rounded-2xl p-12 text-center border border-gray-800">
                <User className="w-20 h-20 text-gray-600 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-3">
                  No employees found
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  No employees match the current filters. Try adjusting your search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setTeamFilter("all");
                    setEmployeeSearch("");
                    setShowDateRange(false);
                    setStartDate("");
                    setEndDate("");
                    setTimeFilter("weekly");
                  }}
                  className="px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-800/50 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Employee Detail Modal */}
        {selectedEmployee && <EmployeeDetailModal />}
      </div>
    </ReserchLayout>
  );
};

export default ReportsPage;