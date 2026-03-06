import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Gallery.scss";
import api from "../services/api";

const PER_PAGE = 12;

function Gallery() {
  const [page, setPage] = useState(1);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  // Animation refs for CTA section

  // Calculate category counts dynamically from gallery items
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return galleryItems.length;
    return galleryItems.filter((item) => {
      // Use backend category field if available, otherwise fall back to text search
      if (item.category) {
        return item.category.toLowerCase() === categoryId;
      }
      // Fallback for items without category field
      const title = (item.title || "").toLowerCase();
      const caption = (item.caption || "").toLowerCase();
      const searchText = `${title} ${caption}`;

      switch (categoryId) {
        case "campus":
          return (
            searchText.includes("campus") ||
            searchText.includes("building") ||
            searchText.includes("facility")
          );
        case "classroom":
          return (
            searchText.includes("class") ||
            searchText.includes("study") ||
            searchText.includes("learning")
          );
        case "events":
          return (
            searchText.includes("event") ||
            searchText.includes("program") ||
            searchText.includes("ceremony")
          );
        case "graduation":
          return (
            searchText.includes("graduation") ||
            searchText.includes("graduate") ||
            searchText.includes("completion")
          );
        default:
          return false;
      }
    }).length;
  };

  const categories = [
    { id: "all", label: "All Photos", getCount: () => galleryItems.length },
    {
      id: "campus",
      label: "Campus",
      getCount: () => getCategoryCount("campus"),
    },
    {
      id: "classroom",
      label: "Classroom",
      getCount: () => getCategoryCount("classroom"),
    },
    {
      id: "events",
      label: "Events",
      getCount: () => getCategoryCount("events"),
    },
    {
      id: "graduation",
      label: "Graduation",
      getCount: () => getCategoryCount("graduation"),
    },
  ];

  // Filter items by category
  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => {
          if (item.category) {
            return item.category.toLowerCase() === activeCategory;
          }
          // Fallback for items without category field - use text search
          const title = (item.title || "").toLowerCase();
          const caption = (item.caption || "").toLowerCase();
          const searchText = `${title} ${caption}`;

          switch (activeCategory) {
            case "campus":
              return (
                searchText.includes("campus") ||
                searchText.includes("building") ||
                searchText.includes("facility")
              );
            case "classroom":
              return (
                searchText.includes("class") ||
                searchText.includes("study") ||
                searchText.includes("learning")
              );
            case "events":
              return (
                searchText.includes("event") ||
                searchText.includes("program") ||
                searchText.includes("ceremony")
              );
            case "graduation":
              return (
                searchText.includes("graduation") ||
                searchText.includes("graduate") ||
                searchText.includes("completion")
              );
            default:
              return true;
          }
        });

  const filteredTotalPages =
    filteredItems.length > 0 ? Math.ceil(filteredItems.length / PER_PAGE) : 1;
  const start = (page - 1) * PER_PAGE;
  const items = filteredItems.slice(start, start + PER_PAGE);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await api.getGalleryItems();
        if (data.results) {
          setGalleryItems(data.results);
        } else if (Array.isArray(data)) {
          setGalleryItems(data);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Reset page when category changes or new data is fetched
  useEffect(() => {
    setPage(1);
  }, [activeCategory, galleryItems]);

  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading gallery...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="gallery-hero" data-reveal>
        <div className="container">
          <section className="gallery-header" data-reveal>
            <div className="hero-content">
              <div className="breadcrumbs">
                <a href="/">Home</a> <span>/ Gallery</span>
              </div>
              <h1>Photo Gallery</h1>
              <p>
                Capturing moments of learning, growth, and celebration at
                Zainussunna Academy
              </p>
            </div>
            <div className="hero-pattern"></div>
          </section>

          {/* Category Filter */}
          <section className="category-section" data-reveal>
            <div className="container">
              <div className="category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`category-btn ${activeCategory === cat.id ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span className="cat-label">{cat.label}</span>
                    <span className="cat-count">{cat.getCount()}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Masonry Gallery Grid */}
          <section className="gallery-content" data-reveal>
            <div className="container">
              <div className="gallery-grid">
                {items.map((item, i) => (
                  <div key={item.id || i} className="gallery-item" data-reveal>
                    <div className="item-wrapper">
                      <img
                        src={item.image}
                        alt={item.title || "Gallery item"}
                      />
                      <div className="item-overlay">
                        <div className="overlay-content">
                          <span className="view-icon">🔍</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="no-data">
                    <img
                      src={require("../assets/icons/search-pr.png")}
                      alt=""
                    />
                    <p>No gallery items to display.</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredItems.length > PER_PAGE && (
                <div className="pagination">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="page-btn"
                  >
                    ← Previous
                  </button>

                  <div className="page-numbers">
                    {Array.from({ length: filteredTotalPages }).map((_, i) => (
                      <button
                        key={i}
                        className={
                          page === i + 1 ? "paginator-button active" : ""
                        }
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={page === filteredTotalPages}
                    onClick={() => setPage(page + 1)}
                    className="page-btn"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Featured Video Section */}
          <section className="video-section" data-reveal>
            <div className="container">
              <div className="section-header">
                <h2>Campus Life in Motion</h2>
                <p>Experience the vibrant atmosphere of Zainussunna Academy</p>
              </div>
              <div className="video-grid">
                <div className="video-card main">
                  <div className="video-thumbnail">
                    <img
                      src={require("../assets/images/IMG_0727.jpeg")}
                      alt="Campus Tour"
                    />
                    <div className="play-btn">
                      <div className="play-icon">▶</div>
                    </div>
                  </div>
                  <div className="video-info">
                    <h3>Virtual Campus Tour</h3>
                    <p>Take a walk through our facilities and classrooms</p>
                  </div>
                </div>
                <div className="video-card">
                  <div className="video-thumbnail">
                    <img
                      src={require("../assets/images/dars.jpg")}
                      alt="Graduation"
                    />
                    <div className="play-btn small">
                      <div className="play-icon">▶</div>
                    </div>
                  </div>
                  <div className="video-info">
                    <h3>Graduation Ceremony 2024</h3>
                    <p>Celebrating our graduates</p>
                  </div>
                </div>
                <div className="video-card">
                  <div className="video-thumbnail">
                    <img
                      src={require("../assets/images/hifl.jpg")}
                      alt="Daily Life"
                    />
                    <div className="play-btn small">
                      <div className="play-icon">▶</div>
                    </div>
                  </div>
                  <div className="video-info">
                    <h3>A Day at the Academy</h3>
                    <p>See our daily routines</p>
                  </div>
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

export default Gallery;
