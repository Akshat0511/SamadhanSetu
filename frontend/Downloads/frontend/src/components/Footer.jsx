import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="logo-icon">S</div>
            <span>Samadhan<span>Setu</span></span>
          </div>

          <p>
            Connecting citizens, universities, industries and government
            to transform real-world problems into innovative solutions.
          </p>

          <div className="social-links">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="Instagram">◎</a>
          </div>
        </div>

        {/* Platform */}
        <div className="footer-column">
          <h3>Platform</h3>
          <a href="/challenges">Challenges</a>
          <a href="/solutions">Solutions</a>
          <a href="/projects">Projects</a>
          <a href="/universities">Universities</a>
          <a href="/industries">Industries</a>
        </div>

        {/* Resources */}
        <div className="footer-column">
          <h3>Resources</h3>
          <a href="/how-it-works">How It Works</a>
          <a href="/guidelines">Guidelines</a>
          <a href="/faq">FAQs</a>
          <a href="/help">Help Center</a>
          <a href="/contact">Contact Us</a>
        </div>

        {/* For Users */}
        <div className="footer-column">
          <h3>For Users</h3>
          <a href="/citizen">Citizens</a>
          <a href="/university">Universities</a>
          <a href="/industry">Industries</a>
          <a href="/government">Government</a>
          <a href="/submit-challenge">Submit a Challenge</a>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">

          <p>
            © {new Date().getFullYear()} ProblemSolver. All rights reserved.
          </p>

          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/accessibility">Accessibility</a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;