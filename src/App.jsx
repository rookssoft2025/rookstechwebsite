import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Home from "./pages/home/Home";
import Services from "./pages/services/Service";
import Solutions from "./pages/solutions/Solutions";
import About from "./pages/about/About";
import Work from "./pages/works/Works";
import Careers from "./pages/careers/Career";
import JobApplication from "./pages/careers/JobApplication";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/layout/ScrollTop";
import Research from "./pages/reserch/Reserch";
import ScrollToTopButton from "./uiComponents/Watsapp";
import Login from "./pages/login/login";
import Dashboard from "./pages/login/components/Dashboard";
import ProposalPage from "./pages/login/components/Proposal/ProposalPage";
import PaperWritingPage from "./pages/login/components/PaperWriting/PaperWritingPage";
import CodingPage from "./pages/login/components/Coding/CodingPage";
import JournalPage from "./pages/login/components/Journal/JournalPage";
import MamReviewPage from "./pages/login/components/MamReview/MamReviewPage";
import ReportsPage from "./pages/login/components/Reports/ReportsPage";
import ArchivePage from "./pages/login/components/Archive/ArchivePage";
import ApplicationReviewPage from "./pages/login/components/ApplicationReview/ApplicationReviewPage";
import AssessmentDetailsView from "./pages/login/components/AssessmentDetails/AssessmentDetailsView";
import EnergySavingTracker from "./components/EnergySavingTracker";
import CandidateRegistration from "./pages/careers/assesment/CandidateRegistration.jsx";
import AssessmentPage from "./pages/careers/assesment/AssessmentPage.jsx";

export const SplashContext = createContext();

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const isAssessmentPage = location.pathname === "/careers/assessment-test";

  return (
    <SplashContext.Provider value={{ showSplash, setShowSplash }}>
      {showSplash && <SplashScreen />}

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/research" element={<Research />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/apply" element={<JobApplication />} />
        <Route path="/careers/assessment" element={<CandidateRegistration />} />
        <Route path="/careers/assessment-test" element={<AssessmentPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/proposal" element={<ProposalPage />} />
        <Route
          path="/dashboard/paper-writing-page"
          element={<PaperWritingPage />}
        />
        <Route path="/dashboard/coding-page" element={<CodingPage />} />
        <Route path="/dashboard/journal-page" element={<JournalPage />} />
        <Route path="/dashboard/mam-review-page" element={<MamReviewPage />} />
        <Route path="/dashboard/reports-page" element={<ReportsPage />} />
        <Route path="/dashboard/archive-page" element={<ArchivePage />} />
        <Route
          path="/dashboard/application-review"
          element={<ApplicationReviewPage />}
        />
        <Route
          path="/dashboard/assessment-details"
          element={<AssessmentDetailsView />}
        />
      </Routes>
      {!isAssessmentPage && (
        <>
          <EnergySavingTracker />
          <ScrollToTopButton />
        </>
      )}
    </SplashContext.Provider>
  );
}

export default App;
