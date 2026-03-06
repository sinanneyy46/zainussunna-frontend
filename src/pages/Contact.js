import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";
import "../styles/Contact.scss";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const WHATSAPP_NUMBER = "919037601403";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: "",
    message: "",
  });
  const [activeFaq, setActiveFaq] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Submit enquiry to backend
      await api.createEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || "",
        program_interest: formData.program || null,
        message: formData.message,
        tagged_programs: formData.program
          ? [formData.program.toLowerCase().replace(/ /g, "-")]
          : [],
      });

      setSubmitSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        program: "",
        message: "",
      });

      // Also open WhatsApp for immediate contact
      const message = `*New Enquiry - Zainussunna Academy*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Program:* ${formData.program || "Not specified"}
*Message:* ${formData.message}

Please contact me regarding admission.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      window.open(whatsappURL, "_blank");
    } catch (err) {
      console.error("Failed to submit enquiry:", err);
      setSubmitError(
        "Failed to submit enquiry. Please try again or contact us directly via WhatsApp.",
      );
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: "call-pr",
      tag: "Phone",
      title: "Call Us",
      value: "+91 90376 01403",
      note: "Mon-Sat, 8:00 AM - 6:00 PM",
      href: "tel:+919037601403",
      highlight: false,
    },
    {
      icon: "whatsapp-wh",
      tag: "WhatsApp",
      title: "WhatsApp",
      value: "+91 90376 01403",
      note: "Quick response guaranteed",
      href: "https://wa.me/919037601403",
      highlight: true,
    },
    {
      icon: "location-pr",
      tag: "Visit",
      title: "Visit Campus",
      value: "Nhamanghat, Vadakkekkad",
      note: "Thrissur, Kerala, India",
      href: "https://maps.app.goo.gl/tcLKkQi1e9d59TS7A",
      highlight: false,
    },
  ];

  const workingHours = [
    { day: "Monday - Friday", time: "8:00 AM - 6:00 PM" },
    { day: "Saturday", time: "8:00 AM - 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  const faqs = [
    {
      question: "What is the admission process?",
      answer:
        "The admission process includes a simple application form submission, followed by a brief interview with the student and parents. We assess the student's basic Islamic knowledge and commitment to learning.",
    },
    {
      question: "What are the fees for the programs?",
      answer:
        "Our programs are designed to be affordable. Please contact us via WhatsApp or phone for detailed fee structure. We also offer scholarships for deserving students.",
    },
    {
      question: "Do you provide hostel facilities?",
      answer:
        "Currently, we are a day-academy. However, we can assist outstation students in finding suitable accommodation nearby.",
    },
    {
      question: "What is the duration of the Hifz program?",
      answer:
        "The Thahfeel-ul-Qur'an (Hifz) program typically takes 3-4 years to complete, depending on the student's dedication and prior knowledge.",
    },
    {
      question: "Are there any age restrictions?",
      answer:
        "We accept students from age 10 onwards for the Integrated Sharee'a program and age 8 onwards for the Hifz program. Mature students are also welcome.",
    },
  ];

  const socialLinks = [
    {
      icon: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/zainussunna_academy",
    },
    {
      icon: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/zainussunna_academy",
    },
    {
      icon: "youtube",
      label: "YouTube",
      href: "https://youtube.com/@zainussunnamedia",
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="contact-page" data-reveal>
        <div className="container">
          <section className="contact-hero" data-reveal>
            <div className="hero-content">
              <div className="breadcrumbs">
                <a href="/">Home</a> <span>/ Contact</span>
              </div>
              <h1>Get in Touch</h1>
              <p>
                We'd love to hear from you. Reach out to us for admissions,
                inquiries, or just to learn more about Zainussunna Academy.
              </p>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="contact-methods-section" data-reveal>
            <div className="container">
              <div className="methods-grid">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    target={
                      method.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`method-card ${method.highlight ? "highlight" : ""}`}
                    data-reveal
                  >
                    <div className="card-icon">
                      <img
                        src={require(`../assets/icons/${method.icon}.svg`)}
                        alt={method.tag}
                      />
                    </div>
                    <span className="card-tag">{method.tag}</span>
                    <h3>{method.title}</h3>
                    <p className="card-value">{method.value}</p>
                    <span className="card-note">{method.note}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Main Content Grid */}
          <section className="contact-main" data-reveal>
            <div className="container">
              <div className="main-grid">
                {/* Left Column - Form */}
                <div className="form-column">
                  <div className="form-wrapper">
                    <div className="form-header">
                      <h2>Send us a Message</h2>
                      <p>
                        Fill out the form below and we'll get back to you
                        shortly
                      </p>
                    </div>

                    {submitSuccess && (
                      <div className="success-message">
                        Enquiry submitted successfully! We'll get back to you
                        soon.
                      </div>
                    )}
                    {submitError && (
                      <div className="error-message">{submitError}</div>
                    )}
                    <form className="contact-form" onSubmit={handleSubmit}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                          />
                        </div>
                        <div className="form-group">
                          <label>Program Interest</label>
                          <select
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                          >
                            <option value="">Select a program</option>
                            <option>Integrated Sharee'a</option>
                            <option>Thahfeel-ul-Qur'an</option>
                            <option>Both Programs</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group full">
                        <label>Message</label>
                        <textarea
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your inquiry..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                      >
                        <img
                          src={
                            require("../assets/icons/whatsapp-wh.svg").default
                          }
                          alt="WhatsApp"
                        />
                        {loading ? "Submitting..." : "Send via WhatsApp"}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right Column - Info */}
                <div className="info-column">
                  {/* Working Hours */}
                  <div className="info-card">
                    <h3>Working Hours</h3>
                    <ul className="hours-list">
                      {workingHours.map((item, index) => (
                        <li key={index}>
                          <span className="day">{item.day}</span>
                          <span
                            className={`time ${item.time === "Closed" ? "closed" : ""}`}
                          >
                            {item.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Connect */}
                  <div className="info-card connect-card">
                    <h3>Connect With Us</h3>
                    <p>
                      Follow us on social media for updates and announcements
                    </p>
                    <div className="social-links">
                      {socialLinks.map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          className="social-btn"
                          aria-label={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={require(`../assets/icons/${social.icon}.svg`)}
                            alt={social.label}
                          />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="info-card emergency-card">
                    <div className="emergency-icon">!</div>
                    <div className="emergency-content">
                      <h4>Urgent Inquiries?</h4>
                      <p>Call us directly for immediate assistance</p>
                      <a href="tel:+919037601403" className="emergency-link">
                        +91 90376 01403
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="map-section" data-reveal>
            <div className="container">
              <div className="section-header">
                <h2>Find Us on the Map</h2>
                <p>
                  Visit our campus to experience the learning environment
                  firsthand
                </p>
              </div>
              <div className="map-wrapper">
                <iframe
                  title="Zainussunna Academy Location"
                  src="https://www.google.com/maps?q=Nhamanghat%2C%20Vadakkekkad%2C%20Thrissur&output=embed"
                  loading="lazy"
                ></iframe>
                <div className="map-overlay">
                  <div className="location-badge">
                    <img
                      src={require("../assets/icons/location-pr.svg").default}
                      alt="Location"
                    />
                    <div>
                      <strong>Zainussunna Academy</strong>
                      <span>Nhamanghat, Vadakkekkad</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="faq-section" data-reveal>
            <div className="container">
              <div className="section-header">
                <h2>Frequently Asked Questions</h2>
                <p>
                  Find answers to common questions about admissions and programs
                </p>
              </div>

              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`faq-item ${activeFaq === index ? "active" : ""}`}
                    onClick={() =>
                      setActiveFaq(activeFaq === index ? null : index)
                    }
                  >
                    <div className="faq-question">
                      <h4>{faq.question}</h4>
                      <span className="faq-toggle">
                        {activeFaq === index ? "−" : "+"}
                      </span>
                    </div>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section
            className={`cta-section ${ctaVisible ? "animate-in" : ""}`}
            ref={ctaRef}
          >
            {/* Livex Floating Geometry Patterns */}
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
                <h2>Ready to Start Your Journey?</h2>
                <p>
                  Take the first step towards quality Islamic education. Our
                  team is here to guide you through the admission process.
                </p>
                <div className="cta-buttons">
                  <a
                    href="/Admissions"
                    className="btn btn-primary-invert"
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
                    Apply Now
                  </a>
                  <a
                    href="https://wa.me/919037601403"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary-invert"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
