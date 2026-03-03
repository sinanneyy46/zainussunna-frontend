import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import "../styles/Programs.scss";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function Programs() {
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });
  const [activeProgram, setActiveProgram] = useState("integrated");
  const [isHovered, setIsHovered] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const programsData = {
    integrated: {
      id: "integrated",
      title: "Integrated Sharee'a",
      subtitle: "Da'wa Dars Program",
      description:
        "A comprehensive Islamic studies program centered on classical learning and guidance-oriented education. Designed to help students develop sound understanding, clarity of thought, and responsible engagement with Islamic knowledge.",
      image: require("../assets/images/dars.jpg"),
      gallery: [
        require("../assets/images/IMG_0072.jpeg"),
        require("../assets/images/IMG_0097.jpeg"),
        require("../assets/images/IMG_0113.jpeg"),
      ],
      features: [
        {
          icon: "book",
          title: "Classical Text Study",
          description:
            "In-depth study of core classical Islamic texts with proper understanding and context",
        },
        {
          icon: "structure",
          title: "Mukhtasar-Based Curriculum",
          description:
            "Structured curriculum following traditional Mukhtasar methodology for systematic learning",
        },
        {
          icon: "guidance",
          title: "Guided Learning",
          description:
            "Personal guidance under experienced Ustads with regular evaluation and feedback",
        },
        {
          icon: "community",
          title: "Scholarly Environment",
          description:
            "Immersive learning environment fostering academic excellence and character development",
        },
      ],
      curriculum: [
        "Fiqh (Islamic Jurisprudence)",
        "Aqeedah (Islamic Creed)",
        "Seerah (Prophetic Biography)",
        "Hadith Studies",
        "Arabic Language",
        "Usul al-Fiqh (Principles of Jurisprudence)",
      ],
      outcomes: [
        "Strong foundational knowledge in Islamic sciences",
        "Ability to understand and explain classical texts",
        "Critical thinking and analytical skills",
        "Preparation for advanced Islamic studies",
        "Character development and spiritual growth",
      ],
    },
    quran: {
      id: "quran",
      title: "Qur'anic Studies",
      subtitle: "Thahfeel-ul-Qur'an Program",
      description:
        "A focused Hifz program dedicated to Qur'an memorization with accuracy, discipline, and consistent revision. The program supports students through structured routines and guided supervision to achieve complete memorization.",
      image: require("../assets/images/hifl.jpg"),
      gallery: [
        require("../assets/images/IMG_0122.jpeg"),
        require("../assets/images/IMG_0130.jpeg"),
        require("../assets/images/IMG_0190.jpeg"),
      ],
      features: [
        {
          icon: "memorization",
          title: "Systematic Memorization",
          description:
            "Structured approach to Qur'an memorization with personalized pacing for each student",
        },
        {
          icon: "tajweed",
          title: "Tajweed Mastery",
          description:
            "Strong emphasis on accurate pronunciation and application of tajweed rules",
        },
        {
          icon: "revision",
          title: "Daily Revision",
          description:
            "Consistent revision schedule to ensure strong retention and long-term memorization",
        },
        {
          icon: "discipline",
          title: "Disciplined Environment",
          description:
            "Structured daily routine fostering discipline, focus, and spiritual connection",
        },
      ],
      curriculum: [
        "Complete Qur'an Memorization (Hifz)",
        "Tajweed Rules and Application",
        "Qur'anic Recitation (Tilawah)",
        "Memorization Techniques",
        "Revision and Retention Methods",
        "Spiritual Development",
      ],
      outcomes: [
        "Complete memorization of the Holy Qur'an",
        "Mastery of tajweed rules and proper recitation",
        "Strong retention through systematic revision",
        "Disciplined study habits and time management",
        "Spiritual connection with the Qur'an",
      ],
    },
  };

  const faqData = [
    {
      q: "Who can apply for these programs?",
      a: "Students who are committed to disciplined Islamic study and have completed basic Islamic education. Both programs welcome sincere learners dedicated to gaining authentic knowledge.",
    },
    {
      q: "What is the medium of instruction?",
      a: "Primary instruction is in Arabic with guided explanation in English/Malayalam to ensure proper understanding of concepts and texts.",
    },
    {
      q: "How are students assessed?",
      a: "Regular evaluation through oral examinations, written tests, and practical application. Progress is monitored continuously with feedback from instructors.",
    },
    {
      q: "What is the duration of each program?",
      a: "Integrated Sharee'a is a multi-year program with progressive levels. Thahfeel-ul-Qur'an typically takes 3-4 years depending on individual pace and memorization capacity.",
    },
    {
      q: "Are there any fees for the programs?",
      a: "The academy operates on a donation-based system. There are no fixed fees, but families are encouraged to contribute according to their capacity to support the institution.",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <ScrollReveal as="section" className="program-page">
        <div className="container">
          <ScrollReveal as="section" className="programs-header">
            <div className="hero-content">
              <div className="breadcrumbs">
                <a href="/">Home</a> <span>/ Programs</span>
              </div>
              <h1>Our Academic Programs</h1>
              <p>
                Discover structured Islamic education programs designed to
                nurture knowledge, character, and spiritual growth through
                authentic learning.
              </p>
            </div>
          </ScrollReveal>

          {/* Program Selector Tabs */}
          <ScrollReveal as="section" className="program-tabs">
            <div className="container">
              <button
                className={`tab-btn ${activeProgram === "integrated" ? "active" : ""}`}
                onClick={() => setActiveProgram("integrated")}
              >
                <img
                  src={
                    activeProgram === "integrated"
                      ? require("../assets/icons/shareea-wh.png")
                      : require("../assets/icons/shareea-pr.png")
                  }
                  alt=""
                />
                <span>Integrated Sharee'a</span>
              </button>
              <button
                className={`tab-btn ${activeProgram === "quran" ? "active" : ""}`}
                onClick={() => setActiveProgram("quran")}
              >
                <img
                  src={
                    activeProgram === "quran"
                      ? require("../assets/icons/quran-wh.png")
                      : require("../assets/icons/quran-pr.png")
                  }
                  alt=""
                />
                <span>Qur'anic Studies</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Active Program Detail Section */}
          <ScrollReveal as="section" className="program-detail">
            <div className="container">
              {activeProgram === "integrated" && (
                <div className="detail-content">
                  <div className="detail-header">
                    <div className="detail-text">
                      <span className="subtitle">
                        {programsData.integrated.subtitle}
                      </span>
                      <h2>{programsData.integrated.title}</h2>
                      <p className="description">
                        {programsData.integrated.description}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => (window.location.href = "/Admissions")}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <img
                          src={
                            isHovered
                              ? require("../assets/icons/arrow-pr.svg").default
                              : require("../assets/icons/arrow-in.svg").default
                          }
                          alt="Arrow"
                          className="enquire-arrow"
                        />
                        Apply Now
                      </button>
                    </div>
                    <div className="detail-image">
                      <img
                        src={programsData.integrated.image}
                        alt="Integrated Sharee'a"
                      />
                      <div className="image-accent"></div>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="features-section">
                    <h3>Program Features</h3>
                    <div className="features-grid">
                      {programsData.integrated.features.map(
                        (feature, index) => (
                          <div className="feature-card" key={index}>
                            <div className="feature-icon">
                              <img
                                src={require("../assets/icons/book-wh.png")}
                                alt=""
                              />
                            </div>
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Gallery */}
                  <div className="gallery-section">
                    <h3>Classroom Moments</h3>
                    <div className="gallery-grid">
                      {programsData.integrated.gallery.map((img, index) => (
                        <div className="gallery-item" key={index}>
                          <img src={img} alt={`Classroom ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Curriculum & Outcomes */}
                  <div className="two-column">
                    <div className="column">
                      <h3>Curriculum</h3>
                      <ul className="curriculum-list">
                        {programsData.integrated.curriculum.map(
                          (item, index) => (
                            <li key={index}>
                              <span className="check-icon">✓</span>
                              {item}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="column">
                      <h3>Learning Outcomes</h3>
                      <ul className="outcomes-list">
                        {programsData.integrated.outcomes.map((item, index) => (
                          <li key={index}>
                            <span className="check-icon">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeProgram === "quran" && (
                <div className="detail-content">
                  <div className="detail-header">
                    <div className="detail-text">
                      <span className="subtitle">
                        {programsData.quran.subtitle}
                      </span>
                      <h2>{programsData.quran.title}</h2>
                      <p className="description">
                        {programsData.quran.description}
                      </p>
                      <button
                        className="btn btn-primary"
                        onClick={() => (window.location.href = "/Admissions")}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      >
                        <img
                          src={
                            isHovered
                              ? require("../assets/icons/arrow-pr.svg").default
                              : require("../assets/icons/arrow-in.svg").default
                          }
                          alt="Arrow"
                          className="enquire-arrow"
                        />
                        Apply Now
                      </button>
                    </div>
                    <div className="detail-image">
                      <img
                        src={programsData.quran.image}
                        alt="Qur'anic Studies"
                      />
                      <div className="image-accent"></div>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="features-section">
                    <h3>Program Features</h3>
                    <div className="features-grid">
                      {programsData.quran.features.map((feature, index) => (
                        <div className="feature-card" key={index}>
                          <div className="feature-icon">
                            <img
                              src={require("../assets/icons/holy-wh.png")}
                              alt=""
                            />
                          </div>
                          <h4>{feature.title}</h4>
                          <p>{feature.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery */}
                  <div className="gallery-section">
                    <h3>Hifz Journey</h3>
                    <div className="gallery-grid">
                      {programsData.quran.gallery.map((img, index) => (
                        <div className="gallery-item" key={index}>
                          <img src={img} alt={`Hifz ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Curriculum & Outcomes */}
                  <div className="two-column">
                    <div className="column">
                      <h3>Curriculum</h3>
                      <ul className="curriculum-list">
                        {programsData.quran.curriculum.map((item, index) => (
                          <li key={index}>
                            <span className="check-icon">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="column">
                      <h3>Learning Outcomes</h3>
                      <ul className="outcomes-list">
                        {programsData.quran.outcomes.map((item, index) => (
                          <li key={index}>
                            <span className="check-icon">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* FAQ Section */}
          <ScrollReveal as="section" className="faq-section">
            <div className="container">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {faqData.map((item, i) => (
                  <div
                    key={i}
                    className={`faq-item ${openFaq === i ? "open" : ""}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <div className="faq-question">
                      <span>{item.q}</span>
                      <span className="faq-toggle">
                        {openFaq === i ? "−" : "+"}
                      </span>
                    </div>
                    <div className="faq-answer">{item.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTA Section */}
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
              <h2>Ready to Begin Your Journey?</h2>
              <p>
                Take the first step towards authentic Islamic education. Apply
                now and join our community of dedicated learners.
              </p>
              <button
                className="btn btn-primary-invert"
                onClick={() => (window.location.href = "/Admissions")}
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
                Start Your Application
              </button>
            </div>
          </section>
        </div>
      </ScrollReveal>
      <Footer />
    </>
  );
}

export default Programs;
