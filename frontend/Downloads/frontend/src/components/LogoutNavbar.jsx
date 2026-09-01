import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LogoutNavbar.css";

function LogoutNavbar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className="logout-navbar">
      <div className="logout-navbar-container">

        {/* ================================
            LOGO
        ================================= */}

        <div
          className="logout-navbar-logo"
          onClick={() => navigate("/")}
        >
          <div className="logout-logo-icon">
            S
          </div>

          <div className="logout-logo-text">
            <span className="logout-logo-title">
              SamadhanSetu
            </span>

            <span className="logout-logo-subtitle">
              Problem • Solution • Impact
            </span>
          </div>
        </div>

        {/* ================================
            RIGHT SECTION
        ================================= */}

        <div className="logout-navbar-right">

          {/* User Information */}

          {user && (
            <div className="dashboard-user">

              <div className="user-avatar">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div className="user-info">
                <span className="user-name">
                  {user.name || "User"}
                </span>

                <span className="user-role">
                  {user.role || "CITIZEN"}
                </span>
              </div>

            </div>
          )}

          {/* Dashboard Label */}

          <div className="dashboard-label">
            <span className="dashboard-dot"></span>
            Dashboard
          </div>

          {/* Logout Button */}

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />

              <polyline points="16 17 21 12 16 7" />

              <line
                x1="21"
                y1="12"
                x2="9"
                y2="12"
              />
            </svg>

            <span>Logout</span>
          </button>

        </div>

      </div>
    </nav>
  );
}

export default LogoutNavbar;