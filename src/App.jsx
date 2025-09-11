import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home/Home";
// import HomePage from "./pages/HomePage"; // create later if needed
// import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
     
      <Routes>
        <Route path="/" element={ <Home/>} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        
      </Routes>
    </>
  );
}

export default App;
