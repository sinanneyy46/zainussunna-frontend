import React from "react";

import "../styles/Footer.scss";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-content">
              <div className="footer-content-top">
                <img src={require("../assets/logos/logo.png")} alt="Logo" />
                <h2>Zainussunna Academy</h2>
              </div>
              <div className="footer-content-bottom ">
                <p className="description">
                  Dedicated to providing structured Islamic education with
                  discipline and authentic scholarship.
                </p>
                <div className="social-icons">
                  <a
                    href="https://www.facebook.com/zainussunna"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={require("../assets/icons/facebook.svg").default}
                      alt="Facebook Icon"
                      className="social-icon"
                    />
                  </a>
                  <a
                    href="https://www.twitter.com/zainussunna"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={require("../assets/icons/x.svg").default}
                      alt="Twitter Icon"
                      className="social-icon"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/zainussunna"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={require("../assets/icons/instagram.svg").default}
                      alt="Instagram Icon"
                      className="social-icon"
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/@zainussunnamedia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={require("../assets/icons/youtube.svg").default}
                      alt="youtube Icon"
                      className="social-icon"
                    />
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/programs">Programs</a>
                </li>
                <li>
                  <a href="/faculty">Faculty</a>
                </li>
                <li>
                  <a href="/gallery">Gallery</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>

            <div className="footer-legals">
              <h4>Legals</h4>
              <ul>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms-conditions">Terms & Conditions</a>
                </li>
                <li>
                  <a href="/refund-policy">Refund Policy</a>
                </li>
                <li>
                  <a href="/shipping-policy">Shipping Policy</a>
                </li>
              </ul>
            </div>

            <div className="footer-newsletter">
              <h4>Stay Informed</h4>
              <p className="newsletter-label">
                Subscribe to receive updates and announcements.
              </p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email" required />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-bottom">
            <p>© 2025 Zainussunna Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
