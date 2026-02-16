import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const SECTIONS = [
    { id: 1, title: "Quantitative Aptitude & Analytical Ability Test", questionsCount: 10 },
    { id: 2, title: "Logical & Critical Reasoning Evaluation", questionsCount: 10 },
    { id: 3, title: "Application Systems & Computational Thinking Assessment", questionsCount: 10 },
    { id: 4, title: "Python Programming & Algorithmic Problem-Solving Round", questionsCount: 10 },
    { id: 5, title: "English Proficiency & Academic Grammar Assessment & Research Writing", questionsCount: 10 },
    { id: 6, title: "Personal Reflection & Narrative Assessment", questionsCount: 1 },
];

const ASSESSMENT_DATA = {
    1: [
        {
            id: 1,
            question: "A sum of ₹20,000 is invested at 10% compound interest for 2 years. Find the amount.",
            options: ["₹23,800", "₹24,000", "₹24,200", "₹24,400"],
            answer: "₹24,200"
        },
        {
            id: 2,
            question: "A and B together complete work in 8 days. A alone in 12 days. How many days does B alone take?",
            options: ["20 days", "24 days", "18 days", "16 days"],
            answer: "24 days"
        },
        {
            id: 3,
            question: "If log₁₀2 = 0.3010, find log₁₀8.",
            options: ["0.903", "0.602", "1.204", "0.301"],
            answer: "0.903"
        },
        {
            id: 4,
            question: "Find the next number in the sequence: 2, 6, 12, 20, ___",
            options: ["28", "30", "32", "26"],
            answer: "30"
        },
        {
            id: 5,
            question: "A train 150m long crosses 350m platform in 25 sec. Find the speed.",
            options: ["20 m/s", "18 m/s", "22 m/s", "25 m/s"],
            answer: "20 m/s"
        },
        {
            id: 6,
            question: "Revenue increases 15% then decreases 10%. What is the net percentage change?",
            options: ["5% increase", "3.5% increase", "4% increase", "1.5% increase"],
            answer: "3.5% increase"
        },
        {
            id: 7,
            question: "Solve for x: 3x² − 5x − 2 = 0",
            options: ["x=2, -1/3", "x=1, -2", "x=2, -1", "x=3, -2/3"],
            answer: "x=2, -1/3"
        },
        {
            id: 8,
            question: "What is the probability of drawing a red face card from a standard deck of 52 cards?",
            options: ["1/13", "3/26", "1/26", "1/52"],
            answer: "3/26"
        },
        {
            id: 9,
            question: "If Mean = 50 and SD = 5, what percentage of values lie within 1 SD in a normal distribution?",
            options: ["50%", "68%", "75%", "95%"],
            answer: "68%"
        },
        {
            id: 10,
            question: "What is the maximum number of edges in a simple graph with 6 vertices?",
            options: ["12", "15", "18", "10"],
            answer: "15"
        }
    ],
    2: [
        {
            id: 1,
            question: "Statements: All researchers are programmers. Some programmers are data scientists. Conclusion: Which is definitely true?",
            options: ["All researchers are data scientists", "Some researchers are data scientists", "No researcher is a data scientist", "Some data scientists may be programmers"],
            answer: "Some data scientists may be programmers"
        },
        {
            id: 2,
            question: "In how many ways can 5 books be arranged if two specific books must always remain together?",
            options: ["24", "48", "120", "60"],
            answer: "48"
        },
        {
            id: 3,
            question: "If f(n) = 2f(n−1) + 1 and f(1) = 1, find f(3).",
            options: ["5", "6", "7", "9"],
            answer: "7"
        },
        {
            id: 4,
            question: "If 8 people shake hands with each other exactly once, what is the total number of handshakes?",
            options: ["28", "32", "24", "30"],
            answer: "28"
        },
        {
            id: 5,
            question: "A clock shows 7:20. What is the angle between the hour and minute hand?",
            options: ["100°", "110°", "120°", "130°"],
            answer: "110°"
        },
        {
            id: 6,
            question: "If P → Q is false, which statement must be true?",
            options: ["P is true and Q is false", "P is false and Q is true", "Both are true", "Both are false"],
            answer: "P is true and Q is false"
        },
        {
            id: 7,
            question: "A researcher selects 3 samples from 8. What is the number of combinations?",
            options: ["336", "56", "48", "64"],
            answer: "56"
        },
        {
            id: 8,
            question: "If T(n) = T(n/2) + 1, what is the time complexity?",
            options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
            answer: "O(log n)"
        },
        {
            id: 9,
            question: "In a circular arrangement of 6 people, how many distinct seatings are possible?",
            options: ["120", "720", "60", "240"],
            answer: "120"
        },
        {
            id: 10,
            question: "A is taller than B, B is taller than C, C is taller than D. Who is the shortest?",
            options: ["A", "B", "C", "D"],
            answer: "D"
        }
    ],
    3: [
        {
            id: 1,
            question: "A researcher wants to compare two sorting algorithms fairly. What must remain constant?",
            options: ["Developer’s coding style", "Input dataset and hardware conditions", "Programming language comments", "IDE theme"],
            answer: "Input dataset and hardware conditions"
        },
        {
            id: 2,
            question: "If an algorithm performs well on training data but poorly on new test data, this is called:",
            options: ["Underfitting", "Overfitting", "Optimization", "Normalization"],
            answer: "Overfitting"
        },
        {
            id: 3,
            question: "While conducting an experiment, increasing sample size mainly helps to:",
            options: ["Reduce bias", "Increase screen resolution", "Improve statistical reliability", "Reduce algorithm complexity"],
            answer: "Improve statistical reliability"
        },
        {
            id: 4,
            question: "If time complexity of an algorithm is O(n²), when input size doubles, execution time approximately becomes:",
            options: ["2 times", "3 times", "4 times", "Same"],
            answer: "4 times"
        },
        {
            id: 5,
            question: "In research, a “baseline model” is used to:",
            options: ["Replace final system", "Provide a reference for comparison", "Increase hardware speed", "Reduce dataset size"],
            answer: "Provide a reference for comparison"
        },
        {
            id: 6,
            question: "Which metric is most appropriate for evaluating classification models with imbalanced data?",
            options: ["Accuracy only", "Precision and Recall", "File size", "Execution speed only"],
            answer: "Precision and Recall"
        },
        {
            id: 7,
            question: "If experimental results cannot be reproduced by others, the research lacks:",
            options: ["Documentation", "Reproducibility", "Complexity", "Scalability"],
            answer: "Reproducibility"
        },
        {
            id: 8,
            question: "In computational experiments, controlling variables ensures:",
            options: ["Faster coding", "Valid comparison of results", "More complex algorithms", "Shorter research papers"],
            answer: "Valid comparison of results"
        },
        {
            id: 9,
            question: "When designing a scalable system, which factor is most important?",
            options: ["Color scheme", "Server brand", "Ability to handle increased load", "File naming style"],
            answer: "Ability to handle increased load"
        },
        {
            id: 10,
            question: "A research model has very high bias and low variance. This usually indicates:",
            options: ["Overfitting", "Underfitting", "Perfect optimization", "Data leakage"],
            answer: "Underfitting"
        }
    ],
    4: [
        {
            id: 1,
            question: "What is the output? \na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)",
            options: ["[1, 2, 3]", "[1, 2, 3, 4]", "Error", "None"],
            answer: "[1, 2, 3, 4]"
        },
        {
            id: 2,
            question: "What is the output? \nprint(type((1)))",
            options: ["<class 'int'>", "<class 'tuple'>", "<class 'list'>", "Error"],
            answer: "<class 'int'>"
        },
        {
            id: 3,
            question: "What is the time complexity of Binary Search?",
            options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
            answer: "O(log n)"
        },
        {
            id: 4,
            question: "What will be the output? \nfor i in range(3):\n    print(i)",
            options: ["1 2 3", "0 1 2", "0 1 2 3", "1 2"],
            answer: "0 1 2"
        },
        {
            id: 5,
            question: "What does the len() function return?",
            options: ["Number of elements", "Memory size", "Data type", "Index value"],
            answer: "Number of elements"
        },
        {
            id: 6,
            question: "What is the purpose of __init__ in Python?",
            options: ["Destructor", "Constructor", "Loop method", "Sorting method"],
            answer: "Constructor"
        },
        {
            id: 7,
            question: "What is the output? \nx = 5\nif x > 3:\n    print(\"A\")\nelse:\n    print(\"B\")",
            options: ["B", "A", "Error", "Nothing"],
            answer: "A"
        },
        {
            id: 8,
            question: "Which data structure does a recursive function internally use?",
            options: ["Queue", "Stack", "List", "Array"],
            answer: "Stack"
        },
        {
            id: 9,
            question: "What will be the output? \nprint(2 ** 3)",
            options: ["6", "8", "9", "5"],
            answer: "8"
        },
        {
            id: 10,
            question: "Which of the following is mutable in Python?",
            options: ["Tuple", "String", "List", "Integer"],
            answer: "List"
        }
    ],
    5: [
        {
            id: 1,
            question: "Choose the grammatically correct sentence:",
            options: [
                "Neither the manager nor the employees was aware of the policy change.",
                "Neither the manager nor the employees were aware of the policy change.",
                "Neither the manager nor the employees are aware of the policy change.",
                "Neither the manager nor the employees have aware of the policy change."
            ],
            answer: "Neither the manager nor the employees were aware of the policy change."
        },
        {
            id: 2,
            question: "Identify the correct usage:",
            options: [
                "The results was significantly better than expected.",
                "The result were significantly better than expected.",
                "The results were significantly better than expected.",
                "The results has been significantly better."
            ],
            answer: "The results were significantly better than expected."
        },
        {
            id: 3,
            question: "Choose the word that best completes the sentence: His explanation was so ______ that everyone understood the concept immediately.",
            options: ["ambiguous", "concise", "redundant", "irrelevant"],
            answer: "concise"
        },
        {
            id: 4,
            question: "Select the sentence with correct subject–verb agreement:",
            options: [
                "A series of experiments were conducted.",
                "A series of experiments was conducted.",
                "A series of experiment were conducted.",
                "A series of experiment was conducted."
            ],
            answer: "A series of experiments was conducted."
        },
        {
            id: 5,
            question: "Choose the correct option: Hardly ______ the meeting begun when the power failed.",
            options: ["had", "has", "did", "was"],
            answer: "had"
        },
        {
            id: 6,
            question: "Identify the correct sentence:",
            options: [
                "She is more smarter than her colleagues.",
                "She is smarter than her colleagues.",
                "She is the most smarter than her colleagues.",
                "She is smart than her colleagues."
            ],
            answer: "She is smarter than her colleagues."
        },
        {
            id: 7,
            question: "Choose the most appropriate word: The new policy aims to ______ unnecessary delays in processing applications.",
            options: ["mitigate", "exaggerate", "initiate", "fluctuate"],
            answer: "mitigate"
        },
        {
            id: 8,
            question: "Select the grammatically correct sentence:",
            options: [
                "Each of the candidates have completed their task.",
                "Each of the candidates has completed his or her task.",
                "Each of the candidate has completed their task.",
                "Each candidates has completed his task."
            ],
            answer: "Each of the candidates has completed his or her task."
        },
        {
            id: 9,
            question: "Choose the correct transformation of: 'If I were you, I will accept the offer.'",
            options: [
                "If I was you, I would accept the offer.",
                "If I were you, I would accept the offer.",
                "If I were you, I will accept the offer.",
                "If I was you, I will accept the offer."
            ],
            answer: "If I were you, I would accept the offer."
        },
        {
            id: 10,
            question: "Identify the sentence with correct parallel structure:",
            options: [
                "The role requires analytical thinking, problem-solving, and to communicate effectively.",
                "The role requires analytical thinking, problem-solving, and effective communication.",
                "The role requires analytical thinking, solving problems, and communication effectively.",
                "The role requires analytical thinking, to solve problems, and effective communication."
            ],
            answer: "The role requires analytical thinking, problem-solving, and effective communication."
        }
    ],
    6: [
        {
            id: 1,
            question: "Imagine that you take a flying cab facility and reached your grandfather's house. Narrate the technologies that operate this innovation.",
            type: "text"
        },
        {
            id: 2,
            question: "Imagine you are a scientist responsible for finding solutions to stop children from social media addiction. Narrate how do you act on this.",
            type: "text"
        },
        {
            id: 3,
            question: "Imagine a forest that caught fire. Narrate how you could have stopped this fire using technology.",
            type: "text"
        },
        {
            id: 4,
            question: "Imagine a school without a single human teacher. Narrate how robots are replaced here.",
            type: "text"
        }
    ]
};

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default function AssessmentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const candidateId = location.state?.candidateId;
    const [activeSection, setActiveSection] = useState(1);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90 * 60);
    const [answers, setAnswers] = useState({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [tabSwitchCount, setTabSwitchCount] = useState(() => {
        return parseInt(localStorage.getItem("assessment_tabSwitches") || "0");
    });
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showDisqualifiedModal, setShowDisqualifiedModal] = useState(() => {
        return parseInt(localStorage.getItem("assessment_tabSwitches") || "0") >= 2;
    });
    const [showHalfwayModal, setShowHalfwayModal] = useState(false);
    const [showFinalWarningModal, setShowFinalWarningModal] = useState(false);
    const [showTimeoutModal, setShowTimeoutModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Shuffle assessments for each candidate
    const shuffledData = useMemo(() => {
        const data = {};
        Object.keys(ASSESSMENT_DATA).forEach((sectionIdStr) => {
            const sectionId = parseInt(sectionIdStr);
            // Shuffle questions within the section
            let sectionQuestions = shuffleArray(ASSESSMENT_DATA[sectionId]);

            // For section 6, only pick 1 random question
            if (sectionId === 6) {
                sectionQuestions = sectionQuestions.slice(0, 1);
            }

            // Shuffle options within each question (if it's not a text type)
            data[sectionId] = sectionQuestions.map(q => {
                if (q.options) {
                    return {
                        ...q,
                        options: shuffleArray(q.options)
                    };
                }
                return q;
            });
        });
        return data;
    }, []);

    // Sync switch count to localStorage
    useEffect(() => {
        localStorage.setItem("assessment_tabSwitches", tabSwitchCount.toString());
    }, [tabSwitchCount]);

    // Tab switch detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                setTabSwitchCount((prev) => {
                    const newCount = prev + 1;
                    if (newCount === 1) {
                        setShowWarningModal(true);
                    } else if (newCount >= 2) {
                        setShowDisqualifiedModal(true);
                        setShowWarningModal(false);

                        // Save progress on disqualification
                        if (candidateId) {
                            try {
                                const { totalScore, sectionScores, detailedAnswers } = calculateDetailedResults(answers);
                                const candidateRef = doc(db, "interview", candidateId);
                                updateDoc(candidateRef, {
                                    status: "disqualified",
                                    isDisqualified: true,
                                    disqualifiedReason: "Tab switching limit exceeded",
                                    disqualifiedAt: new Date().toISOString(),
                                    answers: answers,
                                    detailedSummary: detailedAnswers,
                                    score: totalScore,
                                    sectionScores: sectionScores
                                });
                            } catch (error) {
                                console.error("Error syncing disqualification data:", error);
                            }
                        }
                    }
                    return newCount;
                });
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [navigate]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleFinalSubmit(true);
            return;
        }

        // Time warnings
        if (timeLeft === 45 * 60) {
            setShowHalfwayModal(true);
        } else if (timeLeft === 10 * 60) {
            setShowFinalWarningModal(true);
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft, navigate]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const currentQuestions = shuffledData[activeSection];
    const currentQuestion = currentQuestions[currentQuestionIdx];
    const answerKey = `${activeSection}-${currentQuestion.id}`;
    const calculateDetailedResults = (currentAnswers) => {
        let totalScore = 0;
        const sectionScores = {};
        const detailedAnswers = {};

        // Calculate score for each section (1-6)
        Object.keys(ASSESSMENT_DATA).forEach((sIdStr) => {
            const sId = parseInt(sIdStr);
            const questions = ASSESSMENT_DATA[sId];
            let sectionScore = 0;

            questions.forEach(q => {
                const key = `${sId}-${q.id}`;
                const userAnswer = currentAnswers[key];

                // Only process if the user has answered this question
                if (userAnswer !== undefined) {
                    let isCorrect = false;
                    let correctAnswer = "N/A";

                    if (sId <= 5) {
                        // MCQ Logic
                        isCorrect = userAnswer === q.answer;
                        correctAnswer = q.answer;

                        if (isCorrect) {
                            sectionScore += 1;
                            totalScore += 1;
                        }
                    } else {
                        // Subjective Logic (Section 6)
                        // No auto-grading based on string match for subjective
                        isCorrect = null; // Mark as pending review
                        correctAnswer = "Subjective Review Required";
                    }

                    // Update detailedAnswers map
                    detailedAnswers[key] = {
                        questionId: q.id,
                        sectionId: sId,
                        questionText: q.question,
                        selectedAnswer: userAnswer,
                        correctAnswer: correctAnswer,
                        isCorrect: isCorrect,
                        type: q.type || "mcq"
                    };
                }
            });
            sectionScores[sId] = sectionScore;
        });

        return { totalScore, sectionScores, detailedAnswers };
    };

    const handleOptionSelect = (option) => {
        const newAnswers = { ...answers, [answerKey]: option };
        setAnswers(newAnswers);
    };

    const handleFinalSubmit = async (auto = false) => {
        if (auto) {
            // Auto-submit logic
            if (candidateId) {
                try {
                    const { totalScore, sectionScores, detailedAnswers } = calculateDetailedResults(answers);
                    const candidateRef = doc(db, "interview", candidateId);
                    await updateDoc(candidateRef, {
                        status: "timeout_submitted",
                        isDisqualified: true,
                        disqualifiedReason: "Time limit exceeded", // Adding reason for timeout as well for clarity
                        submittedAt: new Date().toISOString(),
                        answers: answers,
                        detailedSummary: detailedAnswers,
                        score: totalScore,
                        sectionScores: sectionScores
                    });
                } catch (error) {
                    console.error("Error in timeout submission sync:", error);
                }
            }
            // Clear security persistence
            localStorage.removeItem("assessment_tabSwitches");
            console.log("Auto-submitting assessment due to timeout:", answers);
            setShowTimeoutModal(true);
        } else {
            setShowConfirmModal(true);
        }
    };

    const executeSubmit = async () => {
        // Final update with status for manual submission
        if (candidateId) {
            try {
                const { totalScore, sectionScores, detailedAnswers } = calculateDetailedResults(answers);
                const candidateRef = doc(db, "interview", candidateId);
                await updateDoc(candidateRef, {
                    status: "submitted",
                    submittedAt: new Date().toISOString(),
                    answers: answers,
                    detailedSummary: detailedAnswers,
                    score: totalScore,
                    sectionScores: sectionScores
                });
                console.log("Final submission synced to Firestore");
            } catch (error) {
                console.error("Error in manual submission sync:", error);
            }
        }
        // Clear security persistence
        localStorage.removeItem("assessment_tabSwitches");
        console.log("Manual assessment submission:", answers);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
    };

    const handleNext = () => {
        if (currentQuestionIdx < currentQuestions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        } else if (activeSection < SECTIONS.length) {
            setActiveSection(activeSection + 1);
            setCurrentQuestionIdx(0);
        }
    };

    const handlePrev = () => {
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(currentQuestionIdx - 1);
        } else if (activeSection > 1) {
            setActiveSection(activeSection - 1);
            setCurrentQuestionIdx(shuffledData[activeSection - 1].length - 1);
        }
    };

    return (
        <div className="min-h-screen bg-[#071730] text-slate-300 font-sans flex overflow-hidden">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#64ffda]/5 rounded-full blur-[120px]"></div>
            </div>

            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? "320px" : "0px", opacity: isSidebarOpen ? 1 : 0 }}
                className="relative z-20 bg-[#0a192f]/80 backdrop-blur-xl border-r border-white/5 flex flex-col h-screen overflow-hidden"
            >
                <div className="p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-[#64ffda]">R&B</span> Assessment
                    </h2>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-6 custom-scrollbar">
                    {SECTIONS.map((section) => (
                        <div key={section.id} className="space-y-3">
                            <button
                                onClick={() => {
                                    setActiveSection(section.id);
                                    setCurrentQuestionIdx(0);
                                }}
                                className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${activeSection === section.id
                                    ? "bg-[#64ffda]/10 border border-[#64ffda]/30 text-[#64ffda]"
                                    : "hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`w-2 h-2 rounded-full ${activeSection === section.id ? "bg-[#64ffda] animate-pulse" : "bg-slate-600"}`}></span>
                                    <span className="text-xs font-bold uppercase tracking-wider truncate max-w-[180px]">
                                        Section {section.id}
                                    </span>
                                </div>
                                <span className="text-[10px] opacity-60">
                                    {shuffledData[section.id].filter(q => answers[`${section.id}-${q.id}`]).length}/{section.questionsCount}
                                </span>
                            </button>

                            {activeSection === section.id && (
                                <div className="grid grid-cols-5 gap-2 px-2">
                                    {shuffledData[section.id].map((q, idx) => (
                                        <button
                                            key={q.id}
                                            onClick={() => setCurrentQuestionIdx(idx)}
                                            className={`h-8 w-8 rounded-lg text-[10px] font-bold flex items-center justify-center transition-all ${currentQuestionIdx === idx
                                                ? "ring-2 ring-[#64ffda] bg-[#64ffda] text-[#0a192f]"
                                                : answers[`${section.id}-${q.id}`]
                                                    ? "bg-[#64ffda]/20 text-[#64ffda] hover:bg-[#64ffda]/30"
                                                    : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                                                }`}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-white/5 bg-[#0a192f]/40">
                    <button
                        onClick={() => handleFinalSubmit()}
                        className="w-full py-4 bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20"
                    >
                        Finish & Submit
                    </button>
                </div>
            </motion.aside>

            <main className="flex-grow flex flex-col h-screen relative z-10 overflow-hidden">
                <header className="h-20 bg-[#0a192f]/40 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-[#64ffda]"
                        >
                            {isSidebarOpen ? "⇠" : "⇢"}
                        </button>
                        <div className="hidden md:block">
                            <h1 className="text-white font-bold truncate max-w-[400px]">
                                {SECTIONS.find(s => s.id === activeSection).title}
                            </h1>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                                Question {currentQuestionIdx + 1} of {currentQuestions.length}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl border transition-all duration-500 ${timeLeft < 300 ? "bg-red-500/10 border-red-500/30 text-red-500 animate-pulse" : "bg-[#64ffda]/5 border-[#64ffda]/20 text-[#64ffda]"
                            }`}>
                            <span className="text-sm font-bold tracking-tighter">Time Left:</span>
                            <span className="text-2xl font-mono font-bold leading-none">{formatTime(timeLeft)}</span>
                        </div>
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto custom-scrollbar p-8 md:p-12 lg:p-20 flex justify-center">
                    <div className="max-w-4xl w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeSection}-${currentQuestionIdx}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-12"
                            >
                                <div className="space-y-6">
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#64ffda]/10 border border-[#64ffda]/20 text-[#64ffda] text-[10px] font-bold tracking-widest uppercase">
                                        Question {currentQuestionIdx + 1}
                                    </div>
                                    <div className="space-y-6">
                                        {(() => {
                                            const parts = currentQuestion.question.split('\n');
                                            const mainQuestion = parts[0];
                                            const codeSnippet = parts.slice(1).join('\n');
                                            return (
                                                <>
                                                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                                        {mainQuestion}
                                                    </h3>
                                                    {codeSnippet && (
                                                        <div className="relative group">
                                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#64ffda]/20 to-blue-500/20 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                                                            <pre className="relative bg-[#0d1e3a] p-6 rounded-2xl font-mono text-lg text-[#64ffda] border border-white/10 overflow-x-auto shadow-2xl custom-scrollbar leading-relaxed">
                                                                <code className="block">{codeSnippet}</code>
                                                            </pre>
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>

                                {currentQuestion.options ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {currentQuestion.options.map((option, idx) => (
                                            <motion.button
                                                key={idx}
                                                whileHover={{ scale: 1.01 }}
                                                whileTap={{ scale: 0.99 }}
                                                onClick={() => handleOptionSelect(option)}
                                                className={`group relative p-6 rounded-2xl text-left transition-all duration-300 border ${answers[answerKey] === option
                                                    ? "bg-[#64ffda]/10 border-[#64ffda]/50 shadow-[0_0_20px_rgba(100,255,218,0.1)]"
                                                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all ${answers[answerKey] === option
                                                        ? "bg-[#64ffda] text-[#0a192f]"
                                                        : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                                                        }`}>
                                                        {String.fromCharCode(65 + idx)}
                                                    </div>
                                                    <span className={`text-lg transition-colors ${answers[answerKey] === option ? "text-[#64ffda] font-bold" : "text-slate-300"
                                                        }`}>
                                                        {option}
                                                    </span>
                                                </div>
                                                {answers[answerKey] === option && (
                                                    <motion.div
                                                        layoutId="activeGlow"
                                                        className="absolute inset-0 rounded-2xl ring-2 ring-[#64ffda]/30 pointer-events-none"
                                                    />
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="relative group">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-[#64ffda]/10 to-blue-500/10 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
                                            <textarea
                                                value={answers[answerKey] || ""}
                                                onChange={(e) => handleOptionSelect(e.target.value)}
                                                placeholder="Type your response here (approx. 100 words)..."
                                                className="relative w-full h-64 bg-[#0d1e3a] border border-white/10 rounded-3xl p-8 text-white placeholder-slate-600 outline-none focus:border-[#64ffda]/50 transition-all resize-none font-sans text-lg leading-relaxed custom-scrollbar shadow-2xl"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center px-4 text-sm text-slate-500">
                                            <span>Word count: {(answers[answerKey] || "").trim().split(/\s+/).filter(Boolean).length} / 100</span>
                                            {((answers[answerKey] || "").trim().split(/\s+/).filter(Boolean).length < 100) && (
                                                <span className="text-[#64ffda]/50 italic">Aim for roughly 100 words</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <footer className="h-24 bg-[#0a192f]/60 backdrop-blur-md border-t border-white/5 px-8 flex items-center justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={activeSection === 1 && currentQuestionIdx === 0}
                        className="px-8 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed transition-all"
                    >
                        ← Previous
                    </button>

                    <div className="flex gap-2">
                        {currentQuestions.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-500 ${currentQuestionIdx === idx ? "w-8 bg-[#64ffda]" : "w-3 bg-white/10"
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (currentQuestionIdx === currentQuestions.length - 1 && activeSection === SECTIONS.length) {
                                handleFinalSubmit();
                            } else {
                                handleNext();
                            }
                        }}
                        className={`px-10 py-3 rounded-xl font-bold transition-all transform active:scale-95 ${answers[answerKey]
                            ? "bg-[#64ffda] text-[#0a192f] hover:bg-[#52dcb8] shadow-lg shadow-[#64ffda]/20"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed"
                            }`}
                    >
                        {currentQuestionIdx === currentQuestions.length - 1 && activeSection === SECTIONS.length
                            ? "Submit All"
                            : "Save & Next →"}
                    </button>
                </footer>
            </main>

            {/* Warning Modal */}
            <AnimatePresence>
                {showWarningModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a192f]/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="max-w-md w-full bg-[#112240] border border-red-500/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>

                            <div className="mb-6 flex justify-center">
                                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                                    <span className="text-4xl text-red-500">⚠️</span>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-white text-center mb-4">
                                Tab Switch Detected
                            </h2>
                            <p className="text-slate-400 text-center mb-8 leading-relaxed">
                                If you switch the tab one more time, you will be disqualified from the assessment. Please stay on this page to complete your test.
                            </p>

                            <button
                                onClick={() => setShowWarningModal(false)}
                                className="w-full py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95"
                            >
                                I Understand
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Disqualified Modal */}
            <AnimatePresence>
                {showDisqualifiedModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0a192f]/95 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full bg-[#0a192f] border border-red-500 rounded-3xl p-10 shadow-[0_0_50px_rgba(239,68,68,0.2)] relative text-center"
                        >
                            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500 mx-auto mb-8 animate-bounce">
                                <span className="text-5xl text-red-500">🚫</span>
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-6">
                                Disqualified
                            </h2>
                            <p className="text-slate-400 mb-10 leading-relaxed text-lg">
                                You have been disqualified from this assessment due to multiple tab switches. Your progress has been terminated.
                            </p>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("assessment_tabSwitches"); // Reset on close if you want them to be able to try again later, or leave it to keep them banned
                                    navigate("/");
                                }}
                                className="w-full py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-extrabold rounded-2xl hover:from-red-500 hover:to-red-600 transition-all shadow-xl shadow-red-500/20 uppercase tracking-widest active:scale-95"
                            >
                                Close Exam
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Halfway Warning Modal */}
            <AnimatePresence>
                {showHalfwayModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0a192f]/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full bg-[#112240] border border-[#64ffda]/30 rounded-3xl p-8 shadow-2xl relative text-center"
                        >
                            <div className="w-20 h-20 bg-[#64ffda]/10 rounded-full flex items-center justify-center border border-[#64ffda]/20 mx-auto mb-6">
                                <span className="text-4xl text-[#64ffda]">⏰</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Halfway Stage!</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                You have 45 minutes remaining. You've reached the half-way point of the assessment. Keep going!
                            </p>
                            <button
                                onClick={() => setShowHalfwayModal(false)}
                                className="w-full py-4 bg-[#64ffda] text-[#0a192f] font-bold rounded-xl hover:bg-[#52dcb8] transition-all active:scale-95"
                            >
                                Continue Assessment
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Final 10 Min Warning Modal */}
            <AnimatePresence>
                {showFinalWarningModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0a192f]/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full bg-[#112240] border border-orange-500/30 rounded-3xl p-8 shadow-2xl relative text-center"
                        >
                            <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center border border-orange-500/20 mx-auto mb-6">
                                <span className="text-4xl text-orange-500">⚡</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Time is running out!</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed text-lg font-bold">
                                GO FAST! Only 10 minutes remaining!
                            </p>
                            <button
                                onClick={() => setShowFinalWarningModal(false)}
                                className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all animate-pulse"
                            >
                                I'm On It!
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Timeout Modal */}
            <AnimatePresence>
                {showTimeoutModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-[#0a192f]/95 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-2xl w-full bg-[#0a192f] border border-[#64ffda]/30 rounded-[40px] p-16 shadow-[0_0_100px_rgba(100,255,218,0.15)] relative text-center"
                        >
                            <div className="w-24 h-24 bg-[#64ffda]/10 rounded-full flex items-center justify-center border-2 border-[#64ffda] mx-auto mb-8 animate-pulse">
                                <span className="text-5xl text-[#64ffda]">⌛</span>
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-6">
                                Time's Up!
                            </h2>
                            <p className="text-slate-400 mb-4 leading-relaxed text-lg">
                                Sorry, you are so late!
                            </p>
                            <p className="text-[#64ffda]/80 mb-10 text-md italic">
                                Automatically submitting all your answers...<br />
                                Sorry, better luck next time!
                            </p>

                            <button
                                onClick={() => navigate("/")}
                                className="w-full py-5 bg-[#64ffda] text-[#0a192f] font-extrabold rounded-2xl hover:bg-[#52dcb8] transition-all shadow-xl shadow-[#64ffda]/20 uppercase tracking-widest active:scale-95"
                            >
                                Close Exam
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Confirm Submission Modal */}
            <AnimatePresence>
                {showConfirmModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-[#0a192f]/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-md w-full bg-[#112240] border border-[#64ffda]/30 rounded-3xl p-8 shadow-2xl relative text-center"
                        >
                            <div className="w-20 h-20 bg-[#64ffda]/10 rounded-full flex items-center justify-center border border-[#64ffda]/20 mx-auto mb-6">
                                <span className="text-4xl text-[#64ffda]">❓</span>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">Confirm Submission</h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Are you sure you want to submit the exam? Once submitted, you cannot change your answers.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="flex-1 py-4 bg-transparent border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all"
                                >
                                    No, Stay
                                </button>
                                <button
                                    onClick={executeSubmit}
                                    className="flex-1 py-4 bg-[#64ffda] text-[#0a192f] font-bold rounded-xl hover:bg-[#52dcb8] transition-all"
                                >
                                    Yes, Submit
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-[#0a192f]/95 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="max-w-2xl w-full bg-[#0a192f] border border-[#64ffda]/30 rounded-[40px] p-16 shadow-[0_0_100px_rgba(100,255,218,0.2)] relative text-center"
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    rotate: [0, 15, -15, 0],
                                    y: [0, -10, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="w-32 h-32 bg-[#64ffda]/10 rounded-full flex items-center justify-center border-2 border-[#64ffda] mx-auto mb-10"
                            >
                                <span className="text-6xl">🥳</span>
                            </motion.div>

                            <h2 className="text-4xl font-bold text-white mb-6">
                                Assessment Completed!
                            </h2>
                            <p className="text-slate-300 mb-4 text-xl">
                                We've successfully received your responses.
                            </p>
                            <p className="text-[#64ffda] text-2xl font-bold mb-12 animate-pulse">
                                Thank you for your time, and we wish you all the best!
                            </p>

                            <button
                                onClick={() => navigate("/")}
                                className="w-full py-6 bg-gradient-to-r from-[#64ffda] to-blue-500 text-[#0a192f] font-extrabold rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-[#64ffda]/20 uppercase tracking-widest text-lg"
                            >
                                Back to Home
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 255, 218, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 255, 218, 0.3);
        }
      `}</style>
        </div >
    );
}
