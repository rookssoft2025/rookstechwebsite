import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home/Home";
import Services from "./pages/services/Service";
import Solutions from "./pages/solutions/Solutions";
import About from "./pages/about/About";
// import HomePage from "./pages/HomePage"; // create later if needed
// import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
     
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
