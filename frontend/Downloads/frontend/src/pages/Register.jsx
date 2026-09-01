
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  GraduationCap,
  Factory,
  Landmark,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import "./Register.css";

const roles = [
  {
    value: "CITIZEN",
    label: "Citizen",
    description: "Submit and track community challenges",
    icon: User,
  },
  {
    value: "UNIVERSITY",
    label: "University",
    description: "Collaborate on research and projects",
    icon: GraduationCap,
  },
  {
    value: "INDUSTRY",
    label: "Industry",
    description: "Provide expertise and technology",
    icon: Factory,
  },
  {
    value: "GOVERNMENT",
    label: "Government",
    description: "Manage and resolve public challenges",
    icon: Landmark,
  },
];

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "CITIZEN",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =========================
     VALIDATE FORM
  ========================= */

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!name) {
      return "Please enter your full name.";
    }

    if (name.length < 2) {
      return "Name must contain at least 2 characters.";
    }

    if (!email) {
      return "Please enter your email address.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (!phone) {
      return "Please enter your phone number.";
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return "Please enter a valid 10-digit phone number.";
    }

    if (!formData.password) {
      return "Please create a password.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    if (!formData.role) {
      return "Please select your role.";
    }

    return null;
  };

  /* =========================
     HANDLE REGISTER
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        role: formData.role,
      };

      const response = await register(payload);

      setSuccess(
        response?.message || "Registration successful!"
      );

      /* Backend automatically logged in */
      if (response?.token || response?.data?.token) {
        const role = String(
          response?.user?.role ||
            response?.data?.user?.role ||
            formData.role
        ).toUpperCase();

        setTimeout(() => {
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
        }, 700);

        return;
      }

      /* Otherwise send user to login */
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error("REGISTER ERROR:", err);

      setError(
        err?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-layout">

        {/* =========================
            LEFT PANEL
        ========================= */}

        <div className="register-left">

          <div className="left-decoration">
            <div className="decoration-circle circle-one"></div>
            <div className="decoration-circle circle-two"></div>
          </div>

          <div className="left-content">

            <Link to="/" className="brand-logo left-logo">
              SAMADHAN
              <span>SETU</span>
            </Link>

            <div className="left-main-content">

              <div className="network-badge">
                Jharkhand Innovation Network
              </div>

              <h1>
                Join the network.
                <br />
                <span>Solve real problems.</span>
              </h1>

              <p>
                Become part of a collaborative ecosystem
                connecting citizens, universities, industries
                and government.
              </p>

              <div className="features">

                <Feature
                  title="Report Problems"
                  text="Bring real community challenges to the platform."
                />

                <Feature
                  title="Find Expertise"
                  text="Connect challenges with the right people and institutions."
                />

                <Feature
                  title="Build Solutions"
                  text="Collaborate and turn ideas into measurable impact."
                />

              </div>

            </div>

            <p className="copyright">
              © 2026 SamadhanSetu
            </p>

          </div>
        </div>

        {/* =========================
            RIGHT PANEL
        ========================= */}

        <div className="register-right">

          <div className="register-form-container">

            {/* Mobile Logo */}

            <Link
              to="/"
              className="brand-logo mobile-logo"
            >
              SAMADHAN
              <span>SETU</span>
            </Link>

            {/* Heading */}

            <div className="register-heading">

              <p>Get started</p>

              <h2>Create your account</h2>

              <span>
                Join SamadhanSetu and help solve challenges
                across Jharkhand.
              </span>

            </div>

            {/* Error */}

            {error && (
              <div className="message error-message">
                <AlertCircle size={17} />
                <span>{error}</span>
              </div>
            )}

            {/* Success */}

            {success && (
              <div className="message success-message">
                <CheckCircle2 size={17} />
                <span>{success}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="register-form"
            >

              {/* Name + Phone */}

              <div className="form-row">

                <InputField
                  id="name"
                  name="name"
                  label="Full name"
                  placeholder="Akshat Patel"
                  icon={User}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                />

                <InputField
                  id="phone"
                  name="phone"
                  label="Phone number"
                  placeholder="9876543210"
                  icon={Phone}
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  maxLength={10}
                />

              </div>

              {/* Email */}

              <InputField
                id="email"
                name="email"
                type="email"
                label="Email address"
                placeholder="you@example.com"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />

              {/* Passwords */}

              <div className="form-row">

                <PasswordField
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  disabled={loading}
                />

                <PasswordField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                  disabled={loading}
                />

              </div>

              {/* Role */}

              <div className="role-section">

                <label>I am joining as</label>

                <div className="roles-grid">

                  {roles.map((role) => {

                    const Icon = role.icon;

                    const selected =
                      formData.role === role.value;

                    return (
                      <button
                        key={role.value}
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          setFormData((previous) => ({
                            ...previous,
                            role: role.value,
                          }))
                        }
                        className={`role-card ${
                          selected ? "selected" : ""
                        } ${
                          loading ? "disabled" : ""
                        }`}
                      >

                        <span
                          className={`role-icon ${
                            selected ? "selected" : ""
                          }`}
                        >
                          <Icon size={17} />
                        </span>

                        <span className="role-text">

                          <span className="role-title">
                            {role.label}
                          </span>

                          <span className="role-description">
                            {role.description}
                          </span>

                        </span>

                        {selected && (
                          <CheckCircle2
                            className="role-check"
                            size={17}
                          />
                        )}

                      </button>
                    );
                  })}

                </div>
              </div>

              {/* Terms */}

              <p className="terms">
                By creating an account, you agree to use
                SamadhanSetu responsibly and provide accurate
                information.
              </p>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >

                {loading ? (
                  <>
                    <Loader2
                      className="loading-icon"
                      size={17}
                    />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={17} />
                  </>
                )}

              </button>

            </form>

            {/* Login */}

            <div className="login-link">
              Already have an account?{" "}
              <Link to="/login">
                Sign in
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

/* =========================
   INPUT FIELD
========================= */

function InputField({
  id,
  name,
  label,
  placeholder,
  icon: Icon,
  value,
  onChange,
  disabled,
  type = "text",
  maxLength,
}) {
  return (
    <div className="input-field">

      <label htmlFor={id}>
        {label}
      </label>

      <div className="input-wrapper">

        <Icon className="input-icon" size={17} />

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
        />

      </div>
    </div>
  );
}

/* =========================
   PASSWORD FIELD
========================= */

function PasswordField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  setShowPassword,
  disabled,
}) {
  return (
    <div className="input-field">

      <label htmlFor={id}>
        {label}
      </label>

      <div className="input-wrapper">

        <Lock className="input-icon" size={17} />

        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />

        <button
          type="button"
          disabled={disabled}
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
          onClick={() =>
            setShowPassword(
              (previous) => !previous
            )
          }
          className="password-toggle"
        >
          {showPassword ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>

      </div>
    </div>
  );
}

/* =========================
   FEATURE
========================= */

function Feature({ title, text }) {
  return (
    <div className="feature">

      <CheckCircle2
        className="feature-icon"
        size={20}
      />

      <div>
        <p className="feature-title">
          {title}
        </p>

        <p className="feature-text">
          {text}
        </p>
      </div>

    </div>
  );
}

export default Register;

