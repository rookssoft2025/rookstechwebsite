import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Mail,
  Phone,
  BookOpen,
  ChevronRight,
  FileText,
  Building2,
  Hash,
  X,
  Search,
} from "lucide-react";

// Helper function to get initials
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const AssessmentDetailsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dummyResponses = [
    {
      id: 1,
      response:
        "India is poised to become a technological powerhouse through innovation in AI, cloud computing, and renewable energy. With a young demographic dividend and strong educational institutions, the country can lead in space exploration and quantum computing.",
    },
  ];

  const studentDetailsList = [
    {
      id: "STU-2026-001",
      date: "2026-02-15",
      name: "John Doe",
      dept: "Computer Science",
      year: "3rd Year",
      sem: "6th Semester",
      number: "+91-9876543210",
      mail: "john.doe@university.edu",
      sections: [
        { name: "Quantitative Aptitude", score: 9, max: 10 },
        { name: "Logical Reasoning", score: 8, max: 10 },
        { name: "Computational Thinking", score: 9, max: 10 },
        { name: "Python Programming", score: 8, max: 10 },
        { name: "English Proficiency", score: 4, max: 10 },
      ],
    },
    {
      id: "STU-2026-002",
      date: "2026-02-14",
      name: "Sarah Johnson",
      dept: "Electronics Engineering",
      year: "2nd Year",
      sem: "4th Semester",
      number: "+91-8765432109",
      mail: "sarah.johnson@university.edu",
      sections: [
        { name: "Quantitative Aptitude", score: 8, max: 10 },
        { name: "Logical Reasoning", score: 7, max: 10 },
        { name: "Computational Thinking", score: 9, max: 10 },
        { name: "Python Programming", score: 9, max: 10 },
        { name: "English Proficiency", score: 4, max: 10 },
      ],
    },
    {
      id: "STU-2026-003",
      date: "2026-02-13",
      name: "Raj Patel",
      dept: "Information Technology",
      year: "4th Year",
      sem: "8th Semester",
      number: "+91-7654321098",
      mail: "raj.patel@university.edu",
      sections: [
        { name: "Quantitative Aptitude", score: 8, max: 10 },
        { name: "Logical Reasoning", score: 7, max: 10 },
        { name: "Computational Thinking", score: 8, max: 10 },
        { name: "Python Programming", score: 7, max: 10 },
        { name: "English Proficiency", score: 3, max: 10 },
      ],
    },
    {
  id: "STU-2026-004",
  date: "2026-02-12",
  name: "Emily Chen",
  dept: "Computer Science",
  year: "1st Year",
  sem: "2nd Semester",
  number: "+91-9123456780",
  mail: "emily.chen@university.edu",
  sections: [
    { name: "Quantitative Aptitude", score: 7, max: 10 },
    { name: "Logical Reasoning", score: 8, max: 10 },
    { name: "Computational Thinking", score: 7, max: 10 },
    { name: "Python Programming", score: 6, max: 10 },
    { name: "English Proficiency", score: 8, max: 10 },
  ],
},
{
  id: "STU-2026-005",
  date: "2026-02-11",
  name: "Arjun Nair",
  dept: "Information Technology",
  year: "3rd Year",
  sem: "6th Semester",
  number: "+91-9234567812",
  mail: "arjun.nair@university.edu",
  sections: [
    { name: "Quantitative Aptitude", score: 9, max: 10 },
    { name: "Logical Reasoning", score: 9, max: 10 },
    { name: "Computational Thinking", score: 8, max: 10 },
    { name: "Python Programming", score: 9, max: 10 },
    { name: "English Proficiency", score: 7, max: 10 },
  ],
},
{
  id: "STU-2026-006",
  date: "2026-02-10",
  name: "Priya Sharma",
  dept: "Electronics Engineering",
  year: "4th Year",
  sem: "8th Semester",
  number: "+91-9345678123",
  mail: "priya.sharma@university.edu",
  sections: [
    { name: "Quantitative Aptitude", score: 6, max: 10 },
    { name: "Logical Reasoning", score: 7, max: 10 },
    { name: "Computational Thinking", score: 6, max: 10 },
    { name: "Python Programming", score: 5, max: 10 },
    { name: "English Proficiency", score: 8, max: 10 },
  ],
},
{
  id: "STU-2026-007",
  date: "2026-02-09",
  name: "Michael Brown",
  dept: "Computer Science",
  year: "2nd Year",
  sem: "4th Semester",
  number: "+91-9456781234",
  mail: "michael.brown@university.edu",
  sections: [
    { name: "Quantitative Aptitude", score: 8, max: 10 },
    { name: "Logical Reasoning", score: 8, max: 10 },
    { name: "Computational Thinking", score: 9, max: 10 },
    { name: "Python Programming", score: 8, max: 10 },
    { name: "English Proficiency", score: 7, max: 10 },
  ],
},
{
  id: "STU-2026-008",
  date: "2026-02-08",
  name: "Sneha Reddy",
  dept: "Information Technology",
  year: "1st Year",
  sem: "2nd Semester",
  number: "+91-9567812345",
  mail: "sneha.reddy@university.edu",
  sections: [
    { name: "Quantitative Aptitude", score: 7, max: 10 },
    { name: "Logical Reasoning", score: 6, max: 10 },
    { name: "Computational Thinking", score: 7, max: 10 },
    { name: "Python Programming", score: 6, max: 10 },
    { name: "English Proficiency", score: 9, max: 10 },
  ],
},
{
  id: "STU-2026-009",
  date: "2026-02-07",
  name: "David Wilson",
  dept: "Mechanical Engineering",
  year: "3rd Year",
  sem: "6th Semester",
  number: "+91-9678123456",
  mail: "david.wilson@university.edu",
  sections: [
    { name: "Quantitative Aptitude", score: 6, max: 10 },
    { name: "Logical Reasoning", score: 7, max: 10 },
    { name: "Computational Thinking", score: 5, max: 10 },
    { name: "Python Programming", score: 4, max: 10 },
    { name: "English Proficiency", score: 6, max: 10 },
  ],
},
{
  id: "STU-2026-010",
  date: "2026-02-06",
  name: "Aisha Khan",
  dept: "Computer Science",
  year: "4th Year",
  sem: "8th Semester",
  number: "+91-9781234567",
  mail: "aisha.khan@university.edu",
  sections: [
    { name: "Quantitative Aptitude", score: 10, max: 10 },
    { name: "Logical Reasoning", score: 9, max: 10 },
    { name: "Computational Thinking", score: 10, max: 10 },
    { name: "Python Programming", score: 9, max: 10 },
    { name: "English Proficiency", score: 8, max: 10 },
  ],
}

  ];

  // Helper function to get abbreviated section name
  const getAbbreviatedName = (name) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return words.map(word => word[0]).join('').toUpperCase();
    }
    // For single word, take first 3 letters
    return name.substring(0, 3).toUpperCase();
  };

  const filteredAndSortedStudents = studentDetailsList
    .filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.dept.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aTotal = a.sections.reduce((acc, s) => acc + s.score, 0);
      const aMaxTotal = a.sections.reduce((acc, s) => acc + s.max, 0);
      const aPercentage = Math.round((aTotal / aMaxTotal) * 100);

      const bTotal = b.sections.reduce((acc, s) => acc + s.score, 0);
      const bMaxTotal = b.sections.reduce((acc, s) => acc + s.max, 0);
      const bPercentage = Math.round((bTotal / bMaxTotal) * 100);

      return bPercentage - aPercentage;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <FileText size={20} className="text-indigo-600" />
          </div>
          <div>
            <h1 className="text-xl font-medium text-slate-800">Assessments</h1>
            <p className="text-sm text-slate-500">Student performance overview</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <span className="text-sm text-slate-500">
            {filteredAndSortedStudents.length} students
          </span>
        </div>
      </div>

      {/* No Results */}
      {filteredAndSortedStudents.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-sm text-slate-500">
            No students found matching "{searchTerm}"
          </p>
        </div>
      )}

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedStudents.map((student, idx) => {
          const total = student.sections.reduce((acc, s) => acc + s.score, 0);
          const maxTotal = student.sections.reduce((acc, s) => acc + s.max, 0);
          const percentage = Math.round((total / maxTotal) * 100);

          return (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">
                        {getInitials(student.name)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-slate-800">
                        {student.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">{student.id}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="text-xs text-slate-500">{student.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800">
                      {percentage}%
                    </div>
                    <div className="text-xs text-slate-500">overall</div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Building2 size={14} className="text-slate-400" />
                    <span className="text-slate-600">{student.dept}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <BookOpen size={14} className="text-slate-400" />
                    <span className="text-slate-600">{student.sem}</span>
                  </div>
                </div>

                {/* All Section Score Pills - Showing as fractions */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {student.sections.map((section, i) => {
                    return (
                      <div
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 rounded-md"
                        title={section.name}
                      >
                        <span className="text-xs font-medium text-indigo-700">
                          {getAbbreviatedName(section.name)}
                        </span>
                        <span className="text-xs font-medium text-indigo-600">
                          {section.score}/{section.max}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <button
                  onClick={() => {
                    setSelectedStudent(student);
                    setModalOpen(true);
                  }}
                  className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <span>View details</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && selectedStudent && (
          <StudentModal
            student={selectedStudent}
            onClose={() => {
              setModalOpen(false);
              setSelectedStudent(null);
            }}
            responses={dummyResponses}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Simple Info Item
const InfoItem = ({ icon: Icon, label, value, className = "" }) => (
  <div className={`flex items-start gap-2 ${className} `}>
    <div className="p-1.5 bg-white rounded-lg border border-slate-200">
      <Icon size={14} className="text-slate-400" />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm font-medium text-slate-700 truncate">{value}</p>
    </div>
  </div>
);

// Student Modal
const StudentModal = ({ student, onClose, responses }) => {
  const total = student.sections.reduce((acc, s) => acc + s.score, 0);
  const maxTotal = student.sections.reduce((acc, s) => acc + s.max, 0);
  const percentage = Math.round((total / maxTotal) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-indigo-600">
                {getInitials(student.name)}
              </span>
            </div>
            <div>
              <h2 className="text-sm font-medium text-slate-800">{student.name}</h2>
              <p className="text-xs text-slate-500">{student.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-slate-400" />
              <span className="text-slate-600 text-xs">{student.mail}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-slate-400" />
              <span className="text-slate-600 text-xs">{student.number}</span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="text-xs font-medium text-slate-700 mb-3">
              Student Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <InfoItem
                icon={Building2}
                label="Department"
                value={student.dept}
              />
              <InfoItem icon={BookOpen} label="Semester" value={student.sem} />
            </div>
          </div>

          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-indigo-600 font-medium">Overall Performance</p>
                <p className="text-xs text-indigo-500 mt-1">{total} out of {maxTotal} points</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-indigo-600">{percentage}%</p>
              </div>
            </div>
          </div>

          {/* Section Scores */}
          <div>
            <h3 className="text-xs font-medium text-slate-700 mb-3">Section Scores</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {student.sections.map((section, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <p className="text-xs text-slate-500 mb-1 truncate">{section.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800">
                      {section.score}/{section.max}
                    </span>
                    <span className="text-xs text-indigo-600 font-medium">
                      {Math.round((section.score / section.max) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Written Response */}
          <div>
            <h3 className="text-xs font-medium text-slate-700 mb-3">Written Response</h3>
            <div className="bg-white rounded-lg p-4 border border-slate-200">
              <p className="text-xs text-slate-500 mb-2">Question: What is the future of India?</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {responses[0].response}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AssessmentDetailsPage;