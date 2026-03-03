import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import "../styles/Achievements.scss";
import api from "../services/api";

const PER_PAGE = 6;

function Achievements() {
  const [page, setPage] = useState(1);
  const [active, setActive] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const totalPages =
    achievements.length > 0 ? Math.ceil(achievements.length / PER_PAGE) : 1;
  const start = (page - 1) * PER_PAGE;
  const items = achievements.slice(start, start + PER_PAGE);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const data = await api.getAchievements();
        if (data.results) {
          setAchievements(data.results);
        } else if (Array.isArray(data)) {
          setAchievements(data);
        }
      } catch (err) {
        console.error("Error fetching achievements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const stats = [
    { number: "500+", label: "Graduates" },
    { number: "50+", label: "Hafiz Completed" },
    { number: "15+", label: "Years of Excellence" },
    { number: "100%", label: "Success Rate" },
  ];

  const categories = [
    { id: "all", label: "All Achievements" },
    { id: "academic", label: "Academic" },
    { id: "hifz", label: "Hifz Completion" },
    { id: "competition", label: "Competitions" },
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading achievements...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <ScrollReveal as="section" className="achievements-hero">
        <div className="container">
          <ScrollReveal as="section" className="achievements-header">
            <div className="hero-content">
              <div className="breadcrumbs">
                <a href="/">Home</a> <span>/ Achievements</span>
              </div>
              <h1>Our Achievements</h1>
              <p>
                Celebrating excellence in Islamic education and the remarkable
                accomplishments of our students and institution
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Section */}
          <ScrollReveal as="section" className="stats-section">
            <div className="container">
              {stats.map((stat, index) => (
                <div className="stat-card" key={index}>
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Filter Section */}
          <ScrollReveal as="section" className="filter-section">
            <div className="container">
              <div className="filter-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`filter-btn ${filter === cat.id ? "active" : ""}`}
                    onClick={() => setFilter(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Achievements Grid */}
          <ScrollReveal as="section" className="achievements-content">
            <div className="container">
              <div className="achievements-grid">
                {items.map((item, i) => (
                  <div
                    key={item.id || i}
                    className="achievement-card"
                    data-reveal
                    onClick={() => setActive(item)}
                  >
                    <div className="card-image">
                      <img src={item.image || item.images} alt={item.title} />
                      <div className="card-overlay">
                        <span className="view-btn">View Details</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <span className="card-category">Academic</span>
                      <h3>{item.title}</h3>
                      <p>{item.description?.substring(0, 100)}...</p>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="no-data">
                    <img
                      src={require("../assets/icons/search-pr.png")}
                      alt=""
                    />
                    <p>No achievements to display.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {achievements.length > PER_PAGE && (
                <div className="pagination">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="page-btn"
                  >
                    ← Previous
                  </button>

                  <div className="page-numbers">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        className={page === i + 1 ? "active" : ""}
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="page-btn"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Featured Achievement */}
          <ScrollReveal as="section" className="featured-section">
            <div className="container">
              <div className="featured-content">
                <div className="featured-text">
                  <span className="featured-label">Featured Achievement</span>
                  <h2>Excellence in Hifz Program</h2>
                  <p>
                    Our Thahfeel-ul-Qur'an program has produced over 50 Huffaz
                    who have memorized the entire Qur'an with proper Tajweed.
                    Many have gone on to become Imams, teachers, and community
                    leaders.
                  </p>
                  <ul className="achievement-list">
                    <li>Complete Qur'an memorization in 3-4 years</li>
                    <li>Strong emphasis on Tajweed and pronunciation</li>
                    <li>Regular revision schedule for retention</li>
                    <li>Mentorship from experienced Huffaz</li>
                  </ul>
                </div>
                <div className="featured-image">
                  <img
                    src={require("../assets/images/hifl.jpg")}
                    alt="Hifz Program"
                  />
                  <div className="image-badge">
                    <span className="badge-number">50+</span>
                    <span className="badge-text">Huffaz</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Modal */}
          {active && (
            <div className="modal-overlay" onClick={() => setActive(null)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setActive(null)}>
                  <img
                    src={require("../assets/icons/close.svg").default}
                    alt="Close"
                  />
                </button>
                <div className="modal-image">
                  <img src={active.image || active.images} alt={active.title} />
                </div>
                <div className="modal-content">
                  <span className="modal-category">Achievement</span>
                  <h2>{active.title}</h2>
                  <p>{active.description}</p>
                  <div className="modal-meta">
                    <span className="meta-item">
                      <strong>Date:</strong> {active.date || "2024"}
                    </span>
                    <span className="meta-item">
                      <strong>Category:</strong> {active.category || "Academic"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>

      <Footer />
    </>
  );
}

export default Achievements;
