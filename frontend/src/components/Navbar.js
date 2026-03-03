import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/Navbar.scss";

function Navbar() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={scrolled ? "scrolled" : ""}>
        <div className="container">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={require("../assets/logos/logo.png")} alt="Logo" />
            <div className="academy-name">
              <h1>Zainussunna</h1>
              <h2>Academy</h2>
            </div>
          </div>

          <nav>
            <ul>
              <li>
                <a
                  className={`nav-a ${location.pathname === "/" ? "active" : ""}`}
                  href="/"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className={`nav-a ${location.pathname === "/About" ? "active" : ""}`}
                  href="/About"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className={`nav-a ${location.pathname === "/Programs" ? "active" : ""}`}
                  href="/Programs"
                >
                  Programs
                </a>
              </li>
              <li>
                <a
                  className={`nav-a ${location.pathname === "/Achievements" ? "active" : ""}`}
                  href="/Achievements"
                >
                  Achievements
                </a>
              </li>
              <li>
                <a
                  className={`nav-a ${location.pathname === "/Gallery" ? "active" : ""}`}
                  href="/Gallery"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  className={`nav-a ${location.pathname === "/Admissions" ? "active" : ""}`}
                  href="/Admissions"
                >
                  Admissions
                </a>
              </li>
              <li>
                <a
                  className={`nav-a ${location.pathname === "/Contact" ? "active" : ""}`}
                  href="/Contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <button
            className="btn btn-primary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate("/Admissions")}
          >
            {isHovered ? (
              <img
                src={require("../assets/icons/arrow-pr.svg").default}
                alt="Enquire Icon"
                className="enquire-arrow"
              />
            ) : (
              <img
                src={require("../assets/icons/arrow-in.svg").default}
                alt="Enquire Icon"
                className="enquire-arrow"
              />
            )}
            Enquire Now
          </button>
        </div>
      </header>
    </>
  );
}

export default Navbar;
