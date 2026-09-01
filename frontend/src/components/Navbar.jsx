import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // ==========================================
  // NAVIGATION LINKS
  // ==========================================

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Challenges",
      path: "/challenges",
    },
    {
      name: "Solutions",
      path: "/solutions",
    },
    {
      name: "Universities",
      path: "/universities",
    },
    {
      name: "Industries",
      path: "/industries",
    },
  ];

  // ==========================================
  // ACTIVE LINK
  // ==========================================

  const isActive = (path) => {
    return location.pathname === path;
  };

  // ==========================================
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* ======================================
            LOGO
        ====================================== */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <img
            src="/samadhan-setu-logo.png"
            alt="SamadhanSetu"
            className="navbar-logo-image"
          />
        </Link>

        {/* ======================================
            DESKTOP + MOBILE NAVIGATION
        ====================================== */}

        <div
          className={`navbar-links ${
            menuOpen ? "open" : ""
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${
                isActive(link.path) ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              {link.name}
            </Link>
          ))}

          {/* ====================================
              MOBILE ACTIONS
          ==================================== */}

          <div className="mobile-actions">

            <Link
              to="/login"
              className="mobile-login"
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              to="/register"
              className="mobile-register"
              onClick={closeMenu}
            >
              Get Started
            </Link>

          </div>
        </div>

        {/* ======================================
            DESKTOP ACTIONS
        ====================================== */}

        <div className="navbar-actions">

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="get-started-btn"
          >
            Get Started
          </Link>

        </div>

        {/* ======================================
            MOBILE MENU BUTTON
        ====================================== */}

        <button
          type="button"
          className={`menu-btn ${
            menuOpen ? "open" : ""
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;