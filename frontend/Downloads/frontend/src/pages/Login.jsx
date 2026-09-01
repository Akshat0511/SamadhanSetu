

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    // Validation
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      const loggedInUser =
        response?.user ||
        response?.data?.user;

      // Role based redirect
      const role = String(
        loggedInUser?.role || ""
      ).toUpperCase();

      if (
        role === "UNIVERSITY" ||
        role === "UNIVERSITY_ADMIN"
      ) {
        navigate("/dashboard/university");
      } else if (
        role === "INDUSTRY" ||
        role === "INDUSTRY_ADMIN"
      ) {
        navigate("/dashboard/industry");
      } else if (
        role === "GOVERNMENT" ||
        role === "GOVERNMENT_ADMIN" ||
        role === "ADMIN"
      ) {
        navigate("/dashboard/government");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        err?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-layout">

        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="login-left">

          <div className="left-decoration">
            <div className="glow glow-one"></div>
            <div className="glow glow-two"></div>
          </div>

          <div className="left-content">

            {/* Logo */}
            <Link to="/" className="desktop-logo">
              <span>
                SAMADHAN
                <span className="logo-muted">SETU</span>
              </span>
            </Link>

            {/* Main Text */}
            <div className="hero-text">

              <div className="network-badge">
                Jharkhand Innovation Network
              </div>

              <h1>
                Turn community
                <br />
                problems into
                <br />
                <span>real solutions.</span>
              </h1>

              <p>
                Connect citizens, universities,
                industries and government to solve
                real-world challenges across
                Jharkhand.
              </p>

            </div>

            {/* Copyright */}
            <p className="copyright">
              © 2026 SamadhanSetu
            </p>

          </div>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="login-right">

          <div className="login-form-container">

            {/* Mobile Logo */}
            <Link to="/" className="mobile-logo">
              SAMADHAN
              <span>SETU</span>
            </Link>

            {/* Heading */}
            <div className="login-heading">
              <p>Welcome back</p>

              <h2>
                Sign in to SamadhanSetu
              </h2>

              <span>
                Access your dashboard and continue
                solving challenges.
              </span>
            </div>

            {/* Error */}
            {error && (
              <div className="error-message">
                <AlertCircle />

                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="login-form"
            >

              {/* Email */}
              <div className="form-group">

                <label htmlFor="email">
                  Email address
                </label>

                <div className="input-wrapper">

                  <Mail className="input-icon" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={loading}
                  />

                </div>

              </div>

              {/* Password */}
              <div className="form-group">

                <div className="password-label">

                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Password reset will be available soon."
                      )
                    }
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="input-wrapper">

                  <Lock className="input-icon" />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={loading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                  >
                    {showPassword ? (
                      <EyeOff />
                    ) : (
                      <Eye />
                    )}
                  </button>

                </div>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="sign-in-button"
              >

                {loading ? (
                  <>
                    <Loader2 className="spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight />
                  </>
                )}

              </button>

            </form>

            {/* Register */}
            <div className="register-text">
              Don't have an account?{" "}

              <Link to="/register">
                Create an account
              </Link>
            </div>

            {/* Back Home */}
            <div className="back-home">
              <Link to="/">
                ← Back to home
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;

