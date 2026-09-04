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
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./GovernmentLogin.css";

const GovernmentLogin = () => {
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

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim()) {
      setError("Government email is required.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.password) {
      setError("Password is required.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      const loggedInUser =
        response?.user || response?.data?.user;

      const role = String(loggedInUser?.role || "").toUpperCase();

      // Only Government/Admin users can enter this portal
      if (
        role !== "GOVERNMENT" &&
        role !== "GOVERNMENT_ADMIN" &&
        role !== "ADMIN"
      ) {
        setError(
          "Access denied. This account is not authorized for the Government Portal."
        );
        return;
      }

      navigate("/dashboard/government");
    } catch (err) {
      console.error("Government login error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Invalid government credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="government-login-page">
      {/* Left Section */}
      <div className="government-login-left">
        <div className="government-brand">
          <div className="government-logo">
            <ShieldCheck size={32} />
          </div>

          <div>
            <h2>SamadhanSetu</h2>
            <p>Government Portal</p>
          </div>
        </div>

        <div className="government-login-content">
          <span className="government-badge">
            GOVERNMENT ACCESS
          </span>

          <h1>
            Welcome to the
            <span> Government Portal</span>
          </h1>

          <p>
            Securely access the government dashboard to monitor,
            evaluate and resolve community challenges across
            Jharkhand.
          </p>

          <div className="government-features">
            <div className="government-feature">
              <ShieldCheck size={20} />
              <div>
                <strong>Secure Access</strong>
                <span>Authorized government officials only</span>
              </div>
            </div>

            <div className="government-feature">
              <ShieldCheck size={20} />
              <div>
                <strong>Challenge Monitoring</strong>
                <span>Track public problems and solutions</span>
              </div>
            </div>

            <div className="government-feature">
              <ShieldCheck size={20} />
              <div>
                <strong>District-wide Impact</strong>
                <span>Monitor progress across Jharkhand</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="government-login-right">
        <div className="government-login-card">
          <div className="government-card-header">
            <div className="government-card-icon">
              <ShieldCheck size={28} />
            </div>

            <h2>Government Login</h2>

            <p>
              Sign in with your authorized government account
            </p>
          </div>

          {error && (
            <div className="government-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="government-input-group">
              <label htmlFor="email">Government Email</label>

              <div className="government-input-wrapper">
                <Mail size={19} />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="official@gov.in"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="government-input-group">
              <label htmlFor="password">Password</label>

              <div className="government-input-wrapper">
                <Lock size={19} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="government-password-toggle"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="government-login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="government-spinner"
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in to Government Portal
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="government-divider">
            <span>Government officials</span>
          </div>

          <p className="government-register-text">
            Don't have a government account?
          </p>

          <Link
            to="/government/register"
            className="government-register-link"
          >
            Government Registration
            <ArrowRight size={17} />
          </Link>

          <Link
            to="/login"
            className="government-normal-login"
          >
            ← Back to normal login
          </Link>

          <Link
            to="/"
            className="government-home-link"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GovernmentLogin;