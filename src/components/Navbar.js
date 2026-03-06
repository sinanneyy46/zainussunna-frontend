import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Award,
  Image,
  GraduationCap,
  Phone,
  Info,
  MessageCircle,
} from "lucide-react";

import "../styles/Navbar.scss";

function Navbar() {
  const [isHovered, setIsHovered] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [menuInitialized, setMenuInitialized] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initialize menu state on first render
  React.useEffect(() => {
    setMenuInitialized(true);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/About", icon: Info },
    { name: "Programs", path: "/Programs", icon: BookOpen },
    { name: "Achievements", path: "/Achievements", icon: Award },
    { name: "Gallery", path: "/Gallery", icon: Image },
    { name: "Admissions", path: "/Admissions", icon: GraduationCap },
    { name: "Contact", path: "/Contact", icon: Phone },
  ];

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={require("../assets/logos/logo.png")} alt="Logo" />
          <div className="academy-name">
            <h1>Zainussunna</h1>
            <h2>Academy</h2>
          </div>
        </div>

        <nav className="nav-menu">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  className={`nav-a ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  href={item.path}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="btn btn-primary desktop-only"
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

        {/* Mobile Menu Toggle Button */}
        <button
          className={`mobile-menu-toggle ${menuInitialized && mobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
          <span className="hamburger-line line-3"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${menuInitialized && mobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Mobile Menu Panel */}
      <div
        className={`mobile-menu-panel ${menuInitialized && mobileMenuOpen ? "active" : ""}`}
      >
        <nav className="mobile-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  className={`nav-a ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  href={item.path}
                >
                  {item.icon && <item.icon size={20} className="nav-icon" />}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="btn btn-primary mobile-enquire-btn"
          onClick={() => navigate("/Admissions")}
        >
          <MessageCircle size={18} className="btn-icon" />
          Enquire Now
        </button>
      </div>
    </header>
  );
}

export default Navbar;
