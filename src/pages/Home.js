import { useState } from "react";
import "../styles/Home.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useCountUp } from "../hooks/useCountUp";

// --- Data Configuration ---

const featuresList = [
  {
    title: "Structured Mukhtasar based curriculum",
    iconDefault: require("../assets/icons/book-pr.png"),
    iconHover: require("../assets/icons/book-wh.png"),
  },
  {
    title: "Research-oriented teaching approach",
    iconDefault: require("../assets/icons/search-pr.png"),
    iconHover: require("../assets/icons/search-wh.png"),
  },
  {
    title: "Holistic student development",
    iconDefault: require("../assets/icons/holy-pr.png"),
    iconHover: require("../assets/icons/holy-wh.png"),
  },
  {
    title: "Student-friendly learning environment",
    iconDefault: require("../assets/icons/campus-pr.png"),
    iconHover: require("../assets/icons/campus-wh.png"),
  },
];

const programsList = [
  {
    title: "Integrated Sharee'a",
    desc: "A well-rounded program covering Fiqh, Aqeedah, Seerah, and more, designed for comprehensive Islamic knowledge.",
    image: require("../assets/images/hifl.jpg"),
  },
  {
    title: "Thahfeelul Qur'an",
    desc: "A focused Hifz program with emphasis on accuracy, discipline, and consistent revision.",
    image: require("../assets/images/dars.jpg"),
  },
];

const tutorsList = [
  {
    name: "Zabair Sa-adi Al-Arshadi",
    role: "Director - Zainussunna Academy",
    image: require("../assets/images/zubair.png"),
  },
  {
    name: "Shihab Rahmani",
    role: "Asst. Instructor - Integrated Sharee'a",
    image: require("../assets/images/shihab.png"),
  },
  {
    name: "Hafiz Abdul Nasar Latheefi",
    role: "Lead Instructor - Qur'anic Studies",
    image: require("../assets/images/nasar.png"),
  },
];

function Home() {
  const [ctaHovered, setCtaHovered] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const navigate = useNavigate();

  // Animation refs and states for ALL sections including hero (scroll-based)
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.3 });
  const [metricsRef, metricsVisible] = useScrollAnimation({ threshold: 0.3 });
  const [aboutRef, aboutVisible] = useScrollAnimation({ threshold: 0.3 });
  const [featuresRef, featuresVisible] = useScrollAnimation({ threshold: 0.2 });
  const [programsRef, programsVisible] = useScrollAnimation({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });
  const [tutorsRef, tutorsVisible] = useScrollAnimation({ threshold: 0.2 });
  const [contactRef, contactVisible] = useScrollAnimation({ threshold: 0.3 });

  // Animated counters
  const studentsCount = useCountUp(50, {
    duration: 2000,
    startWhen: metricsVisible,
  });
  const hifzCount = useCountUp(10, {
    duration: 2000,
    startWhen: metricsVisible,
  });
  const facultyCount = useCountUp(8, {
    duration: 2000,
    startWhen: metricsVisible,
  });
  const yearsCount = useCountUp(15, {
    duration: 2000,
    startWhen: metricsVisible,
  });

  return (
    <>
      <Navbar />

      <section
        className={`hero container ${heroVisible ? "animate-in" : ""}`}
        ref={heroRef}
      >
        {/* Live Floating Geometry Patterns */}
        <img
          src={require("../assets/images/geomtric.png")}
          className="geo-shape geo-1"
          alt=""
        />
        <img
          src={require("../assets/images/geomtric.png")}
          className="geo-shape geo-2"
          alt=""
        />
        <img
          src={require("../assets/images/geomtric.png")}
          className="geo-shape geo-3"
          alt=""
        />

        <div className="left">
          <span
            className={`overline animate-item delay-1 ${heroVisible ? "animate-in" : ""}`}
          >
            Zainussunna Academy
          </span>
          <h1
            className={`mb-md animate-item delay-2 ${heroVisible ? "animate-in" : ""}`}
          >
            Shaping Minds through Structured Islamic Education
          </h1>
          <p
            className={`animate-item delay-3 ${heroVisible ? "animate-in" : ""}`}
          >
            An offline academy committed to structured Islamic education and the
            thoughtful development of students.
          </p>

          <div
            className={`cta animate-item delay-4 ${heroVisible ? "animate-in" : ""}`}
          >
            <button
              onClick={() => navigate("/Admissions")}
              className="btn btn-primary-invert"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
            >
              <img
                src={
                  ctaHovered
                    ? require("../assets/icons/arrow-in.svg").default
                    : require("../assets/icons/arrow-pr.svg").default
                }
                alt="Enquire Icon"
                className="enquire-arrow"
              />
              Enquire Now
            </button>

            <button
              onClick={() => navigate("/About")}
              className="btn btn-secondary-invert"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section
        className={`metrics container ${metricsVisible ? "animate-in" : ""}`}
        ref={metricsRef}
      >
        <div
          className={`metric animate-item delay-1 ${metricsVisible ? "animate-in" : ""}`}
        >
          <h1>{studentsCount}+</h1>
          <p>Students Enrolled</p>
        </div>
        <div
          className={`metric animate-item delay-2 ${metricsVisible ? "animate-in" : ""}`}
        >
          <h1>{hifzCount}+</h1>
          <p>Hifz Completed</p>
        </div>
        <div
          className={`metric animate-item delay-3 ${metricsVisible ? "animate-in" : ""}`}
        >
          <h1>{facultyCount}+</h1>
          <p>Qualified Faculties</p>
        </div>
        <div
          className={`metric animate-item delay-4 ${metricsVisible ? "animate-in" : ""}`}
        >
          <h1>{yearsCount}+</h1>
          <p>Years of Excellence</p>
        </div>
      </section>

      {/* About */}
      <section
        className={`about section-muted container ${aboutVisible ? "animate-in" : ""}`}
        ref={aboutRef}
      >
        <div
          className={`about-left animate-item delay-1 ${aboutVisible ? "animate-in" : ""}`}
        >
          <img src={require("../assets/images/IMG_0072.jpeg")} alt="About Us" />
        </div>

        <div
          className={`about-right animate-item delay-2 ${aboutVisible ? "animate-in" : ""}`}
        >
          <span className="overline">About Us</span>
          <h2>Committed to Excellence in Islamic Education</h2>
          <p>
            At Zainussunna Academy, we believe in nurturing minds through a
            structured curriculum that emphasizes both knowledge and character
            development. Our dedicated faculty and student-centric approach
            ensure a holistic learning experience.
          </p>

          <button className="btn-text" onClick={() => navigate("/About")}>
            Learn More
            <img
              src={require("../assets/icons/arrow-right-pr.svg").default}
              alt="Arrow Icon"
              className="arrow-icon"
            />
          </button>
        </div>
      </section>

      {/* Features */}
      <section
        className={`features container ${featuresVisible ? "animate-in" : ""}`}
        ref={featuresRef}
      >
        <div className="top">
          <div className="divider">
            <hr />
            <span className="overline">Why Choose Us</span>
            <hr />
          </div>
          <h2>Our Key Features</h2>
        </div>

        <div className="features-grid">
          {featuresList.map((item, index) => (
            <div
              key={index}
              className={`feature animate-item delay-${index + 1} ${featuresVisible ? "animate-in" : ""}`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <img
                src={
                  hoveredFeature === index ? item.iconHover : item.iconDefault
                }
                alt={item.title}
              />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Section */}
      <section
        className={`programs-section ${programsVisible ? "animate-in" : ""}`}
        ref={programsRef}
      >
        <div className="container">
          <span className="overline">Our Programs</span>
          <h2>Explore Our Educational Offerings</h2>
          <p>Explore our comprehensive range of Islamic education programs</p>
          <div className="pattern-container">
            <img
              src={require("../assets/images/geomtric.png")}
              className="pattern-left"
              alt="Pattern"
            />
            <div className="programs-grid">
              {programsList.map((prog, index) => (
                <div
                  key={index}
                  className={`program-card animate-item delay-${index + 1} ${programsVisible ? "animate-in" : ""}`}
                >
                  <div className="img-container">
                    <img
                      src={prog.image}
                      className="prog-img"
                      alt={prog.title}
                    />
                  </div>
                  <div className="content">
                    <h3>{prog.title}</h3>
                    <p>{prog.desc}</p>

                    <button
                      className="btn-text"
                      onClick={() => navigate("/Programs")}
                    >
                      Learn More
                      <img
                        src={
                          require("../assets/icons/arrow-right-pr.svg").default
                        }
                        alt="Arrow Icon"
                        className="arrow-icon"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <img
              src={require("../assets/images/geomtric.png")}
              className="pattern-right"
              alt="Pattern"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`cta-section container ${ctaVisible ? "animate-in" : ""}`}
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

        <h2>Ready to Start Your Islamic Journey?</h2>
        <p>
          Join hundreds of students who have found their path through our
          structured curriculum.
        </p>
        <button
          onClick={() => navigate("/Admissions")}
          className="btn btn-primary-invert"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
        >
          <img
            src={
              ctaHovered
                ? require("../assets/icons/arrow-in.svg").default
                : require("../assets/icons/arrow-pr.svg").default
            }
            alt="Enquire Icon"
            className="enquire-arrow"
          />
          Enquire Now
        </button>
      </section>

      {/* Tutors Section */}
      <section
        className={`tutors-section ${tutorsVisible ? "animate-in" : ""}`}
        ref={tutorsRef}
      >
        <div className="container">
          <span className="overline">Our Faculty</span>
          <h2>Meet Our Experienced Tutors</h2>
          <p>Dedicated educators committed to your Islamic learning journey</p>

          <div className="tutors-grid">
            {tutorsList.map((tutor, index) => (
              <div
                key={index}
                className={`tutor-card animate-item delay-${index + 1} ${tutorsVisible ? "animate-in" : ""}`}
              >
                <div className="tutor-photo">
                  <img src={tutor.image} alt="Tutor" />
                </div>
                <h3>{tutor.name}</h3>
                <p className="role">{tutor.role}</p>
              </div>
            ))}
          </div>

          <button className="btn-text" onClick={() => navigate("/Faculty")}>
            View all faculty
            <img
              src={require("../assets/icons/arrow-right-pr.svg").default}
              alt="Arrow Icon"
              className="arrow-icon"
            />
          </button>
        </div>
      </section>

      {/* Contact Strip */}
      <section
        className={`contact-strip ${contactVisible ? "animate-in" : ""}`}
        ref={contactRef}
      >
        <div className="container">
          <div
            className={`contact-intro animate-item delay-1 ${contactVisible ? "animate-in" : ""}`}
          >
            <h2>
              Get in Touch with <br /> <b>Zainussunna Academy</b>
            </h2>
          </div>
          <a
            href="tel:+919876543210"
            className={`contact-item animate-item delay-2 ${contactVisible ? "animate-in" : ""}`}
          >
            <img
              src={require("../assets/icons/call-pr.svg").default}
              alt="Phone Icon"
              className="contact-icon"
            />
            <div className="contact-text">
              <p className="label">Call Us</p>
              <p className="value">+91 90376 01403</p>
            </div>
          </a>

          <a
            href="https://wa.me/919037601403"
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-item animate-item delay-3 ${contactVisible ? "animate-in" : ""}`}
          >
            <img
              src={require("../assets/icons/whatsapp-pr.svg").default}
              alt="WhatsApp Icon"
              className="contact-icon"
            />
            <div className="contact-text">
              <p className="label">WhatsApp</p>
              <p className="value">+91 90376 01403</p>
            </div>
          </a>

          <a
            href="https://maps.app.goo.gl/tcLKkQi1e9d59TS7A"
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-item animate-item delay-4 ${contactVisible ? "animate-in" : ""}`}
          >
            <img
              src={require("../assets/icons/location-pr.svg").default}
              alt="Location Icon"
              className="contact-icon"
            />
            <div className="contact-text">
              <p className="label">Visit Us</p>
              <p className="value">Nhamanghat, Vadakkekkad</p>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}

      <Footer />
    </>
  );
}

export default Home;
