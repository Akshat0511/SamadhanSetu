import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  MapPin,
  Users,
  Zap,
} from "lucide-react";

import "./Home.css";

// =====================================================
// STATS DATA
// =====================================================

const stats = [
  {
    value: 500,
    suffix: "+",
    label: "Community Challenges",
    icon: Lightbulb,
  },
  {
    value: 50,
    suffix: "+",
    label: "Universities",
    icon: Building2,
  },
  {
    value: 100,
    suffix: "+",
    label: "Industry Partners",
    icon: Users,
  },
  {
    value: 24,
    suffix: "",
    label: "Districts Covered",
    icon: MapPin,
  },
];

// =====================================================
// COUNTER COMPONENT
// =====================================================

function Counter({ value, suffix, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Agar section visible nahi hai to counter reset
    if (!start) {
      setCount(0);
      return;
    }

    let animationFrame;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easeOut * value);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [start, value]);

  return (
    <p className="stat-value">
      {count}
      {suffix}
    </p>
  );
}

// =====================================================
// PERCENTAGE COUNTER
// =====================================================

function PercentageCounter({ target, start }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Section visible nahi hai
    if (!start) {
      setPercentage(0);
      return;
    }

    let animationFrame;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easeOut * target);

      setPercentage(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setPercentage(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [start, target]);

  return percentage;
}

// =====================================================
// STEPS DATA
// =====================================================

const steps = [
  {
    number: "01",
    title: "Identify a Challenge",
    description:
      "Citizens and communities submit real problems affecting their locality.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "AI Analyses the Problem",
    description:
      "Our intelligent system analyses the challenge, category, priority and required skills.",
    icon: BrainCircuit,
  },
  {
    number: "03",
    title: "Find the Right Partners",
    description:
      "Challenges are matched with suitable universities, researchers and industry partners.",
    icon: Users,
  },
  {
    number: "04",
    title: "Build the Solution",
    description:
      "Collaborative teams work together to develop and implement practical solutions.",
    icon: Zap,
  },
];

// =====================================================
// FEATURES
// =====================================================

const features = [
  "AI-powered challenge analysis",
  "University and industry matching",
  "Transparent project tracking",
  "Collaborative solution development",
  "Impact measurement",
  "District-level problem mapping",
];

// =====================================================
// HOME COMPONENT
// =====================================================

function Home() {
  // ===================================================
  // STATS OBSERVER
  // ===================================================

  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const section = statsRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stats screen par aa gaya
          setStatsVisible(true);
        } else {
          // Screen se bahar gaya
          // Counter reset hoga
          setStatsVisible(false);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // ===================================================
  // AI SECTION OBSERVER
  // ===================================================

  const aiRef = useRef(null);
  const [aiVisible, setAiVisible] = useState(false);

  useEffect(() => {
    const section = aiRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // AI section visible
          setAiVisible(true);
        } else {
          // AI section viewport se bahar
          // Percentage reset hoga
          setAiVisible(false);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // ===================================================
  // AI SCORE
  // ===================================================

  const aiScore = PercentageCounter({
    target: 94,
    start: aiVisible,
  });

  // ===================================================
  // RETURN
  // ===================================================

  return (
    <div className="home-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">
        <div className="hero-decoration hero-decoration-left" />
        <div className="hero-decoration hero-decoration-right" />
        <div className="hero-decoration hero-decoration-center" />

        <div className="home-shell">
          <div className="hero-grid">

            {/* HERO CONTENT */}

            <div className="hero-content">

              <div className="hero-badge">
                <span className="pulse-dot" />
                JHARKHAND INNOVATION NETWORK
              </div>

              <h1 className="hero-title">
                From Community
                <span>Challenges</span>
                to Collaborative Solutions.
              </h1>

              <p className="hero-description">
                SamadhanSetu connects citizens, universities, industries and
                government to transform real-world community problems into
                practical, innovative and scalable solutions.
              </p>

              <div className="hero-actions">

                <Link to="/submit" className="btn btn-primary">
                  Submit a Challenge
                  <ArrowRight className="icon-sm" />
                </Link>

                <Link to="/challenges" className="btn btn-secondary">
                  Explore Challenges
                  <ChevronRight className="icon-sm" />
                </Link>

              </div>

              <div className="hero-points">

                <div>
                  <CheckCircle2 className="icon-sm icon-primary" />
                  Citizen-driven
                </div>

                <div>
                  <CheckCircle2 className="icon-sm icon-primary" />
                  AI-powered
                </div>

                <div>
                  <CheckCircle2 className="icon-sm icon-primary" />
                  Impact-focused
                </div>

              </div>
            </div>

            {/* HERO VISUAL */}

            <div className="hero-visual">

              <div className="challenge-card">

                <div className="card-header">

                  <div>
                    <p className="eyebrow">Live Challenge</p>
                    <h3>Rural Water Management</h3>
                  </div>

                  <span className="priority-high">
                    HIGH
                  </span>

                </div>

                <div className="location-box">

                  <div className="feature-icon">
                    <MapPin className="icon-md" />
                  </div>

                  <div>
                    <p className="item-title">
                      Gumla District
                    </p>

                    <p className="item-description">
                      Community reported water access and management problems
                      requiring an innovative solution.
                    </p>
                  </div>

                </div>

                <div className="ai-match-box">

                  <div className="match-header">

                    <div className="match-title">
                      <BrainCircuit className="icon-md" />
                      <span>AI Matching</span>
                    </div>

                    <span className="match-score">
                      94%
                    </span>

                  </div>

                  <div className="progress-track">
                    <div className="progress-fill" />
                  </div>

                  <p className="item-description">
                    Strong match with Water Technology & Rural Development
                    expertise.
                  </p>

                </div>

                <div className="partners">

                  <p className="eyebrow">
                    Recommended Partners
                  </p>

                  <div className="partner-list">

                    <div className="partner-item">

                      <div className="partner-left">

                        <div className="feature-icon small">
                          <Building2 className="icon-sm" />
                        </div>

                        <div>

                          <p className="partner-title">
                            Partner University
                          </p>

                          <p className="partner-match">
                            91% match
                          </p>

                        </div>

                      </div>

                      <ChevronRight className="icon-sm muted-icon" />

                    </div>

                    <div className="partner-item">

                      <div className="partner-left">

                        <div className="feature-icon small blue">
                          <Users className="icon-sm" />
                        </div>

                        <div>

                          <p className="partner-title">
                            Industry Partner
                          </p>

                          <p className="partner-match">
                            87% match
                          </p>

                        </div>

                      </div>

                      <ChevronRight className="icon-sm muted-icon" />

                    </div>

                  </div>
                </div>

              </div>

              <div className="floating-card">

                <div className="success-icon">
                  <CheckCircle2 className="icon-md" />
                </div>

                <div>

                  <p className="floating-label">
                    Solutions Developed
                  </p>

                  <p className="floating-value">
                    128+
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          STATS SECTION
      ===================================================== */}

      <section
        ref={statsRef}
        className={`stats-section ${
          statsVisible ? "stats-active" : ""
        }`}
      >

        <div className="home-shell stats-grid">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                className="stat-item"
                key={stat.label}
              >

                <Icon className="stat-icon" />

                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  start={statsVisible}
                />

                <p className="stat-label">
                  {stat.label}
                </p>

              </div>
            );
          })}

        </div>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how-it-works"
        className="how-section"
      >

        <div className="home-shell">

          <div className="section-heading">

            <span className="section-kicker">
              How It Works
            </span>

            <h2>
              One platform. Four steps.
            </h2>

            <p>
              From identifying a local problem to developing a solution,
              SamadhanSetu brings the complete innovation journey together.
            </p>

          </div>

          <div className="steps-grid">

            {steps.map((step) => {

              const Icon = step.icon;

              return (
                <div
                  className="step-card"
                  key={step.number}
                >

                  <div className="step-top">

                    <div className="step-icon">
                      <Icon className="icon-md" />
                    </div>

                    <span className="step-number">
                      {step.number}
                    </span>

                  </div>

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          AI SECTION
      ===================================================== */}

      <section
        id="ai"
        ref={aiRef}
        className={`ai-section ${
          aiVisible ? "ai-active" : ""
        }`}
      >

        <div className="home-shell">

          <div className="ai-grid">

            {/* AI CONTENT */}

            <div className="ai-content">

              <div className="ai-badge">
                <BrainCircuit className="icon-sm" />
                AI INTELLIGENCE
              </div>

              <h2>
                Smarter matching.
                <span>Better solutions.</span>
              </h2>

              <p className="ai-description">
                SamadhanSetu uses AI-assisted analysis to understand community
                challenges and identify the universities, skills and industry
                partners most capable of solving them.
              </p>

              <div className="features-grid">

                {features.map((feature) => (

                  <div
                    className="feature-item"
                    key={feature}
                  >

                    <CheckCircle2 className="icon-sm icon-primary" />

                    <span>
                      {feature}
                    </span>

                  </div>

                ))}

              </div>

              <Link
                to="/challenges"
                className="ai-link"
              >
                Explore AI-powered challenges
                <ArrowRight className="icon-sm" />
              </Link>

            </div>

            {/* AI CARD */}

            <div className="ai-card">

              <div className="ai-card-header">

                <div>

                  <p className="ai-eyebrow">
                    AI Recommendation
                  </p>

                  <h3>
                    Best Collaboration Match
                  </h3>

                </div>

                <div className="ai-card-icon">
                  <BrainCircuit className="icon-md" />
                </div>

              </div>

              {/* CIRCULAR SCORE */}

              <div className="score-wrapper">

                <div
                  className="score-circle"
                  style={{
                    "--score": `${aiScore * 3.6}deg`,
                  }}
                >

                  <div className="score-circle-inner">

                    <p>
                      {aiScore}%
                    </p>

                    <span>
                      Match Score
                    </span>

                  </div>

                </div>

              </div>

              {/* COMPATIBILITY */}

              <div className="compatibility-list">

                <div className="compatibility-item">

                  <span>
                    Skill Compatibility
                  </span>

                  <strong>
                    96%
                  </strong>

                </div>

                <div className="compatibility-item">

                  <span>
                    Research Compatibility
                  </span>

                  <strong>
                    92%
                  </strong>

                </div>

                <div className="compatibility-item">

                  <span>
                    Location Compatibility
                  </span>

                  <strong>
                    95%
                  </strong>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section">

        <div className="home-shell">

          <div className="cta-card">

            <div className="cta-decoration cta-decoration-right" />

            <div className="cta-decoration cta-decoration-left" />

            <div className="cta-content">

              <p className="cta-kicker">
                Be Part of the Change
              </p>

              <h2>
                Have a problem that needs a solution?
              </h2>

              <p>
                Submit your community challenge and connect with the people
                and organisations that can help solve it.
              </p>

              <div className="cta-actions">

                <Link
                  to="/submit"
                  className="btn cta-primary"
                >
                  Submit a Challenge
                  <ArrowRight className="icon-sm" />
                </Link>

                <Link
                  to="/solutions"
                  className="btn cta-secondary"
                >
                  Explore Solutions
                </Link>

              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;