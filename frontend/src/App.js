import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Intro from "./pages/Intro";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Achievements from "./pages/Achievements";
import Gallery from "./pages/Gallery";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import Faculty from "./pages/Faculty";

function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [introCompleted, setIntroCompleted] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenIntro");
    if (!hasSeen) {
      setShowIntro(true);
      sessionStorage.setItem("hasSeenIntro", "true");
    } else {
      setIntroCompleted(true);
    }
    setLoading(false);
  }, []);

  const handleIntroDone = () => {
    setShowIntro(false);
    setIntroCompleted(true);
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {showIntro && <Intro onDone={handleIntroDone} />}
      {!showIntro && (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Home key={introCompleted ? "home-viewed" : "home-first"} />
              }
            />
            <Route path="/intro" element={<Intro onDone={() => {}} />} />
            <Route path="/About" element={<About />} />
            <Route path="/Programs" element={<Programs />} />
            <Route path="/Achievements" element={<Achievements />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/Admissions" element={<Admissions />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Faculty" element={<Faculty />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
