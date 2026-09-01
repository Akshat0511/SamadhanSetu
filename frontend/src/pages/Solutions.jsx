
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Users,
  Building2,
  GraduationCap,
  Lightbulb,
} from "lucide-react";



import "./Solutions.css";

const solutionsData = [
  {
    id: 1,
    title: "Smart Water Monitoring System",
    description:
      "An IoT-based solution for monitoring groundwater levels, water quality and distribution in rural communities.",
    category: "Water Management",
    location: "Ranchi",
    status: "In Progress",
    progress: 72,
    impact: "High",
    beneficiaries: "12,500+",
    university: "BIT Mesra",
    industry: "Tech Solutions Pvt. Ltd.",
    team: 8,
  },
  {
    id: 2,
    title: "AI-Based Crop Disease Detection",
    description:
      "A mobile-based AI solution that helps farmers identify crop diseases using images captured from smartphones.",
    category: "Agriculture",
    location: "Hazaribagh",
    status: "Completed",
    progress: 100,
    impact: "High",
    beneficiaries: "8,200+",
    university: "Birsa Agricultural University",
    industry: "AgriTech India",
    team: 6,
  },
  {
    id: 3,
    title: "Rural Healthcare Telemedicine",
    description:
      "Connecting rural communities with doctors through a low-bandwidth telemedicine platform.",
    category: "Healthcare",
    location: "Dumka",
    status: "In Progress",
    progress: 58,
    impact: "Very High",
    beneficiaries: "18,000+",
    university: "Sido Kanhu Murmu University",
    industry: "HealthConnect",
    team: 10,
  },
  {
    id: 4,
    title: "Waste Management & Recycling",
    description:
      "A community-driven waste segregation and recycling platform for towns and villages.",
    category: "Environment",
    location: "Jamshedpur",
    status: "Completed",
    progress: 100,
    impact: "High",
    beneficiaries: "25,000+",
    university: "NIT Jamshedpur",
    industry: "GreenTech Industries",
    team: 7,
  },
  {
    id: 5,
    title: "Digital Education for Rural Students",
    description:
      "An offline-first digital learning platform designed for students in areas with limited internet connectivity.",
    category: "Education",
    location: "Palamu",
    status: "In Progress",
    progress: 64,
    impact: "Very High",
    beneficiaries: "15,700+",
    university: "Central University of Jharkhand",
    industry: "EduTech Solutions",
    team: 9,
  },
  {
    id: 6,
    title: "Smart Traffic Management",
    description:
      "AI-powered traffic monitoring and congestion prediction system for urban areas.",
    category: "Urban Infrastructure",
    location: "Ranchi",
    status: "Planning",
    progress: 25,
    impact: "Medium",
    beneficiaries: "40,000+",
    university: "IIT (ISM) Dhanbad",
    industry: "Urban Mobility Ltd.",
    team: 5,
  },
];

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({ status }) {
  const icon =
    status === "Completed" ? (
      <CheckCircle2 size={14} />
    ) : (
      <Clock3 size={14} />
    );

  return (
    <span className={`status-badge ${status.toLowerCase().replace(" ", "-")}`}>
      {icon}
      {status}
    </span>
  );
}

/* =========================
   IMPACT BADGE
========================= */

function ImpactBadge({ impact }) {
  return (
    <span
      className={`impact-badge ${impact
        .toLowerCase()
        .replace(" ", "-")}`}
    >
      {impact} Impact
    </span>
  );
}

/* =========================
   SOLUTION CARD
========================= */

function SolutionCard({ solution }) {
  return (
    <div className="solution-card">

      {/* Top Section */}
      <div className="solution-card-top">

        <div className="solution-top-row">
          <div className="solution-icon">
            <Lightbulb size={21} />
          </div>

          <StatusBadge status={solution.status} />
        </div>

        <h2>{solution.title}</h2>

        <p className="solution-description">
          {solution.description}
        </p>

        <div className="solution-tags">

          <span className="category-tag">
            {solution.category}
          </span>

          <span className="location-tag">
            {solution.location}
          </span>

          <ImpactBadge impact={solution.impact} />

        </div>
      </div>

      {/* Progress */}
      <div className="solution-progress">

        <div className="progress-header">
          <span>Project Progress</span>

          <strong>{solution.progress}%</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-bar"
            style={{
              width: `${solution.progress}%`,
            }}
          />
        </div>

      </div>

      {/* Partners */}
      <div className="solution-partners">

        <div className="partner-row">
          <GraduationCap size={17} />

          <span>University:</span>

          <strong>{solution.university}</strong>
        </div>

        <div className="partner-row">
          <Building2 size={17} />

          <span>Industry:</span>

          <strong>{solution.industry}</strong>
        </div>

        <div className="partner-row">
          <Users size={17} />

          <span>Team:</span>

          <strong>{solution.team} members</strong>
        </div>

      </div>

      {/* Bottom */}
      <div className="solution-card-bottom">

        <div>
          <p>Beneficiaries</p>

          <strong>{solution.beneficiaries}</strong>
        </div>

        <Link
          to={`/solutions/${solution.id}`}
          className="view-solution"
        >
          View Solution
          <ArrowRight size={16} />
        </Link>

      </div>
    </div>
  );
}

/* =========================
   STAT
========================= */

function Stat({ label, value }) {
  return (
    <div className="stat-card">
      <p className="stat-value">{value}</p>

      <p className="stat-label">{label}</p>
    </div>
  );
}

/* =========================
   MAIN PAGE
========================= */

export default function Solutions() {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const categories = [
    "All",
    ...new Set(
      solutionsData.map(
        (solution) => solution.category
      )
    ),
  ];

  const statuses = [
    "All",
    "Planning",
    "In Progress",
    "Completed",
  ];

  const filteredSolutions = useMemo(() => {

    return solutionsData.filter((solution) => {

      const searchText = search.toLowerCase();

      const matchesSearch =
        solution.title
          .toLowerCase()
          .includes(searchText) ||

        solution.description
          .toLowerCase()
          .includes(searchText) ||

        solution.category
          .toLowerCase()
          .includes(searchText) ||

        solution.location
          .toLowerCase()
          .includes(searchText) ||

        solution.university
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All" ||
        solution.category === category;

      const matchesStatus =
        status === "All" ||
        solution.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });

  }, [search, category, status]);

  const completedCount = solutionsData.filter(
    (solution) => solution.status === "Completed"
  ).length;

  return (
    <div className="solutions-page">

 

      <main className="solutions-main">

        {/* =====================
            HERO
        ===================== */}

        <section className="solutions-hero">

          <div className="shell">

            <div className="hero-content">

              <span className="innovation-badge">
                <Lightbulb size={15} />
                Innovation in Action
              </span>

              <h1>
                Collaborative
                <span> Solutions</span>
              </h1>

              <p>
                Explore innovative solutions created through
                collaboration between communities, universities,
                industries and government organizations across
                Jharkhand.
              </p>

            </div>

            {/* Stats */}

            <div className="stats-grid">

              <Stat
                label="Active Solutions"
                value={solutionsData.length}
              />

              <Stat
                label="Completed"
                value={completedCount}
              />

              <Stat
                label="People Impacted"
                value="1.2L+"
              />

              <Stat
                label="Partner Institutions"
                value="48+"
              />

            </div>

          </div>

        </section>

        {/* =====================
            FILTERS
        ===================== */}

        <section className="filters-section">

          <div className="shell">

            <div className="filters-box">

              {/* Search */}

              <div className="search-wrapper">

                <Search className="search-icon" size={18} />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search solutions..."
                />

              </div>

              {/* Category */}

              <div className="select-wrapper">

                <Filter
                  className="select-icon"
                  size={17}
                />

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                >
                  {categories.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

              </div>

              {/* Status */}

              <select
                className="status-select"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                {statuses.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All"
                      ? "All Status"
                      : item}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </section>

        {/* =====================
            SOLUTIONS
        ===================== */}

        <section className="solutions-section">

          <div className="shell">

            <div className="solutions-heading">

              <div>
                <h2>Solutions</h2>

                <p>
                  Showing {filteredSolutions.length} solution
                  {filteredSolutions.length !== 1
                    ? "s"
                    : ""}
                </p>
              </div>

            </div>

            {filteredSolutions.length > 0 ? (

              <div className="solutions-grid">

                {filteredSolutions.map(
                  (solution) => (
                    <SolutionCard
                      key={solution.id}
                      solution={solution}
                    />
                  )
                )}

              </div>

            ) : (

              <div className="no-solutions">

                <Lightbulb size={42} />

                <h3>
                  No solutions found
                </h3>

                <p>
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setStatus("All");
                  }}
                >
                  Clear Filters
                </button>

              </div>

            )}

          </div>

        </section>

      </main>

      

    </div>
  );
}

