import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import "../styles/About.scss";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function About() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState("story");
  const navigate = useNavigate();

  // Animation refs for CTA section
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });

  const stats = [
    { number: "15+", label: "Years of Excellence" },
    { number: "50+", label: "Students Graduated" },
    { number: "10+", label: "Huffal" },
    { number: "8+", label: "Expert Faculty" },
  ];

  const values = [
    {
      icon: "knowledge",
      title: "Authentic Knowledge",
      description:
        "Commitment to classical Islamic scholarship with proper understanding and context",
    },
    {
      icon: "discipline",
      title: "Academic Discipline",
      description:
        "Structured learning environment fostering consistency, focus, and dedication",
    },
    {
      icon: "character",
      title: "Character Building",
      description:
        "Holistic development emphasizing moral values, ethics, and spiritual growth",
    },
    {
      icon: "community",
      title: "Community Service",
      description:
        "Preparing students to contribute positively to society and the Ummah",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <ScrollReveal as="section" className="About-page">
        <div className="container">
          <ScrollReveal as="section" className="about-hero">
            <div className="hero-content">
              <div className="breadcrumbs">
                <a href="/">Home</a> <span>/ About</span>
              </div>
              <h1>About Zainussunna Academy</h1>
              <p>
                Nurturing minds, building character, and preserving authentic
                Islamic scholarship for the next generation of leaders
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

          {/* Story Tabs Section */}
          <ScrollReveal as="section" className="story-section">
            <div className="container">
              <div className="section-header">
                <h2>Our Journey</h2>
                <p>Discover the story behind our commitment to excellence</p>
              </div>

              <div className="story-tabs">
                <button
                  className={`tab-btn ${activeTab === "story" ? "active" : ""}`}
                  onClick={() => setActiveTab("story")}
                >
                  Our Story
                </button>
                <button
                  className={`tab-btn ${activeTab === "mission" ? "active" : ""}`}
                  onClick={() => setActiveTab("mission")}
                >
                  Mission & Vision
                </button>
                <button
                  className={`tab-btn ${activeTab === "approach" ? "active" : ""}`}
                  onClick={() => setActiveTab("approach")}
                >
                  Our Approach
                </button>
              </div>

              <div className="story-content">
                {activeTab === "story" && (
                  <div className="story-panel">
                    <div className="story-image">
                      <img
                        src={require("../assets/images/IMG_0072.jpeg")}
                        alt="Academy"
                      />
                      <div className="image-accent"></div>
                    </div>
                    <div className="story-text">
                      <h3>A Legacy of Learning</h3>
                      <p>
                        Zainussunna Academy was founded with a singular vision:
                        to provide authentic Islamic education that combines
                        classical scholarship with contemporary relevance. Since
                        our establishment, we have remained committed to
                        nurturing students who embody knowledge, character, and
                        service.
                      </p>
                      <p>
                        Our institution stands as a beacon of traditional
                        Islamic learning, where students engage with classical
                        texts under the guidance of experienced scholars. We
                        believe in education that transforms not just the mind,
                        but the heart and character.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "mission" && (
                  <div className="mission-panel">
                    <div className="mission-card">
                      <div className="mission-icon">
                        <img
                          src={require("../assets/icons/book-wh.png")}
                          alt=""
                        />
                      </div>
                      <h3>Our Mission</h3>
                      <p>
                        To provide structured Islamic education that develops
                        knowledgeable, righteous, and socially responsible
                        individuals who contribute positively to the Ummah and
                        humanity at large.
                      </p>
                    </div>
                    <div className="mission-card">
                      <div className="mission-icon">
                        <img
                          src={require("../assets/icons/holy-wh.png")}
                          alt=""
                        />
                      </div>
                      <h3>Our Vision</h3>
                      <p>
                        To be a leading institution in Islamic education,
                        recognized for academic excellence, moral integrity, and
                        the holistic development of students who become beacons
                        of knowledge and guidance.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "approach" && (
                  <div className="approach-panel">
                    <div className="approach-header">
                      <h3>Educational Philosophy</h3>
                      <p>
                        Our approach combines traditional methods with modern
                        pedagogical insights to create an effective learning
                        environment
                      </p>
                    </div>
                    <div className="approach-grid">
                      <div className="approach-item">
                        <span className="approach-number">01</span>
                        <h4>Classical Foundation</h4>
                        <p>
                          Study of authentic classical Islamic texts with proper
                          understanding
                        </p>
                      </div>
                      <div className="approach-item">
                        <span className="approach-number">02</span>
                        <h4>Research Orientation</h4>
                        <p>
                          Encouraging critical thinking and deep analysis of
                          subjects
                        </p>
                      </div>
                      <div className="approach-item">
                        <span className="approach-number">03</span>
                        <h4>Practical Application</h4>
                        <p>
                          Connecting knowledge with real-world implementation
                        </p>
                      </div>
                      <div className="approach-item">
                        <span className="approach-number">04</span>
                        <h4>Mentorship</h4>
                        <p>
                          Personal guidance from experienced scholars and
                          teachers
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Values Section */}
          <ScrollReveal as="section" className="values-section">
            <div className="container">
              <div className="section-header">
                <h2>Our Core Values</h2>
                <p>The principles that guide everything we do</p>
              </div>
              <div className="values-grid">
                {values.map((value, index) => (
                  <div className="value-card" key={index}>
                    <div className="value-icon">
                      <img
                        src={require(`../assets/icons/${value.icon}.png`)}
                        alt=""
                      />
                    </div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>

      {/* Gallery Section - Outside ScrollReveal to avoid nesting issues */}
      <section className="gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>Campus Life</h2>
            <p>Glimpses of our learning environment</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item large">
              <img
                src={require("../assets/images/IMG_0072.jpeg")}
                alt="Campus"
              />
            </div>
            <div className="gallery-item">
              <img
                src={require("../assets/images/IMG_0097.jpeg")}
                alt="Classroom"
              />
            </div>
            <div className="gallery-item">
              <img
                src={require("../assets/images/IMG_0113.jpeg")}
                alt="Students"
              />
            </div>
            <div className="gallery-item">
              <img
                src={require("../assets/images/IMG_0122.jpeg")}
                alt="Study"
              />
            </div>
            <div className="gallery-item">
              <img
                src={require("../assets/images/IMG_0130.jpeg")}
                alt="Activities"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Outside wrapper, properly structured */}
      <div className="container">
        <section
          className={`cta-section ${ctaVisible ? "animate-in" : ""}`}
          ref={ctaRef}
        >
          {/* Live Floating Geometry Patterns */}
          <img
            src={require("../assets/images/geomtric.png")}
            className="geo-shape geo-1"
            alt=""
          />
          <img
            src={require("../assets/images/geomtric.png")}
            className="geo-shape geo-4"
            alt=""
          />

          <div className="container">
            <div className="cta-content">
              <h2>Join Our Community</h2>
              <p>
                Be part of a tradition of excellence in Islamic education. Your
                journey towards knowledge and character begins here.
              </p>
              <button
                className="btn btn-primary-invert"
                onClick={() => navigate("/Admissions")}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src={
                    isHovered
                      ? require("../assets/icons/arrow-in.svg").default
                      : require("../assets/icons/arrow-pr.svg").default
                  }
                  alt="Arrow"
                  className="enquire-arrow"
                />
                Start Your Journey
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default About;
