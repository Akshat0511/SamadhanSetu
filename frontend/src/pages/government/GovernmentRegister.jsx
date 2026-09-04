import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Building2,
  BadgeCheck,
  ArrowRight,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./GovernmentRegister.css";

const GovernmentRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      return "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      return "Government email is required.";
    }

    if (!formData.email.includes("@")) {
      return "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      return "Phone number is required.";
    }

    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      return "Phone number must contain exactly 10 digits.";
    }

    if (!formData.department.trim()) {
      return "Please enter your department.";
    }

    if (!formData.designation.trim()) {
      return "Please enter your designation.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const response = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,

        // Government role is fixed.
        // User cannot select another role.
        role: "GOVERNMENT",

        department: formData.department.trim(),
        designation: formData.designation.trim(),
      });

      const token = response?.token || response?.data?.token;

      if (token) {
        navigate("/dashboard/government");
      } else {
        navigate("/government/login");
      }
    } catch (err) {
      console.error("Government registration error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Government registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="government-register-page">
      {/* =====================================
          LEFT SECTION
      ===================================== */}
      <div className="government-register-left">
        <div className="government-register-brand">
          <div className="government-register-logo">
            <ShieldCheck size={31} />
          </div>

          <div>
            <h2>SamadhanSetu</h2>
            <p>Government Portal</p>
          </div>
        </div>

        <div className="government-register-intro">
          <span className="government-register-badge">
            OFFICIAL GOVERNMENT PORTAL
          </span>

          <h1>
            Join the
            <span> Government Network</span>
          </h1>

          <p>
            Create an authorized government account to monitor
            community challenges, coordinate solutions and track
            development across Jharkhand.
          </p>

          <div className="government-register-points">
            <div className="government-register-point">
              <BadgeCheck size={21} />
              <span>Official government access</span>
            </div>

            <div className="government-register-point">
              <BadgeCheck size={21} />
              <span>Monitor public challenges</span>
            </div>

            <div className="government-register-point">
              <BadgeCheck size={21} />
              <span>Coordinate with universities and industry</span>
            </div>

            <div className="government-register-point">
              <BadgeCheck size={21} />
              <span>Track solution implementation</span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          RIGHT SECTION
      ===================================== */}
      <div className="government-register-right">
        <div className="government-register-card">
          <div className="government-register-header">
            <div className="government-register-header-icon">
              <ShieldCheck size={27} />
            </div>

            <h2>Government Registration</h2>

            <p>
              Register your official government account
            </p>
          </div>

          {error && (
            <div className="government-register-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* NAME */}
            <div className="government-register-input-group">
              <label htmlFor="name">Full Name</label>

              <div className="government-register-input-wrapper">
                <User size={18} />

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="government-register-input-group">
              <label htmlFor="email">Government Email</label>

              <div className="government-register-input-wrapper">
                <Mail size={18} />

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

            {/* PHONE */}
            <div className="government-register-input-group">
              <label htmlFor="phone">Phone Number</label>

              <div className="government-register-input-wrapper">
                <Phone size={18} />

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="10 digit mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  inputMode="numeric"
                  autoComplete="tel"
                />
              </div>
            </div>

            {/* DEPARTMENT + DESIGNATION */}
            <div className="government-register-two-column">
              <div className="government-register-input-group">
                <label htmlFor="department">Department</label>

                <div className="government-register-input-wrapper">
                  <Building2 size={18} />

                  <input
                    id="department"
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="government-register-input-group">
                <label htmlFor="designation">Designation</label>

                <div className="government-register-input-wrapper">
                  <BadgeCheck size={18} />

                  <input
                    id="designation"
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="government-register-input-group">
              <label htmlFor="password">Password</label>

              <div className="government-register-input-wrapper">
                <Lock size={18} />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="government-register-password-toggle"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="government-register-input-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="government-register-input-wrapper">
                <Lock size={18} />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword ? "text" : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="government-register-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* NOTICE */}
            <div className="government-register-notice">
              <ShieldCheck size={18} />

              <p>
                Government accounts are restricted to authorized
                officials. Your account may require verification
                before accessing the Government Portal.
              </p>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="government-register-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2
                    size={20}
                    className="government-register-spinner"
                  />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Government Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="government-register-login-section">
            <p>Already have a government account?</p>

            <Link
              to="/government/login"
              className="government-register-login-link"
            >
              Government Login
              <ArrowRight size={17} />
            </Link>
          </div>

          <Link
            to="/login"
            className="government-register-normal-link"
          >
            ← Back to normal registration
          </Link>

          <Link
            to="/"
            className="government-register-home-link"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GovernmentRegister;