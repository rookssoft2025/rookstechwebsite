import { Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home/Home";
import Services from "./pages/services/Service";
import Solutions from "./pages/solutions/Solutions";
import About from "./pages/about/About";
import Work from "./pages/works/Works";
import Careers from "./pages/careers/Career";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/layout/ScrollTop";
import Research from "./pages/reserch/Reserch";
import ScrollToTopButton from "./uiComponents/Watsapp";

export const SplashContext = createContext();

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

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
      </Routes>
      <ScrollToTopButton/>
    </SplashContext.Provider>
  );
}

export default App;
