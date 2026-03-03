import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { api } from "../services/api";
import "../styles/Faculty.scss";

function Faculty() {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const data = await api.getFaculty();
        if (data.results) {
          setFacultyList(data.results);
        } else if (Array.isArray(data)) {
          setFacultyList(data);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching faculty:", err);
        setError("Failed to load faculty. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading faculty...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="faculty-section">
        <div className="container">
          {/* HEADER */}
          <div className="breadcrumbs">
            <a href="/">
              <img
                src={require("../assets/icons/arrow-ac.svg").default}
                alt="Home"
              />
              Home
            </a>
          </div>
          <div className="faculty-header">
            <span className="overline">Our Faculty</span>
            <h2>Qualified and Responsible Educators</h2>
            <p>
              Our faculty members are committed to disciplined teaching,
              conceptual clarity, and student mentorship.
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          {/* GRID */}
          <div className="faculty-grid">
            {facultyList.length > 0 ? (
              facultyList.map((faculty, index) => (
                <div key={faculty.id || index} className="faculty-card">
                  <div className="photo">
                    <img
                      src={
                        faculty.photo || require("../assets/images/nasar.png")
                      }
                      alt={faculty.name}
                    />
                  </div>

                  <div className="info">
                    <h3>{faculty.name}</h3>
                    <p className="role">{faculty.role}</p>
                    <p className="specialization">{faculty.qualification}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">
                <p>No faculty members to display.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Faculty;
