// src/pages/Challenges.jsx

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Filter,
  Loader2,
  MapPin,
  RefreshCw,
  Search,
  Target,
  X,
} from "lucide-react";


import "./Challenges.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [priority, setPriority] = useState("ALL");

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/challenges`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch challenges"
        );
      }

      const challengeData = Array.isArray(data)
        ? data
        : data.challenges || [];

      setChallenges(challengeData);
    } catch (err) {
      console.error("FETCH CHALLENGES ERROR:", err);

      setError(
        err.message || "Unable to load challenges"
      );
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const values = challenges
      .map((challenge) => challenge.category)
      .filter(Boolean);

    return ["ALL", ...new Set(values)];
  }, [challenges]);

  const filteredChallenges = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return challenges.filter((challenge) => {
      const title = String(
        challenge.title || challenge.name || ""
      ).toLowerCase();

      const description = String(
        challenge.description || ""
      ).toLowerCase();

      const district = String(
        challenge.district || ""
      ).toLowerCase();

      const challengeCategory = String(
        challenge.category || ""
      ).toUpperCase();

      const challengeStatus = String(
        challenge.status || "OPEN"
      ).toUpperCase();

      const challengePriority = String(
        challenge.priority || "MEDIUM"
      ).toUpperCase();

      const matchesSearch =
        !searchText ||
        title.includes(searchText) ||
        description.includes(searchText) ||
        district.includes(searchText) ||
        challengeCategory
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "ALL" ||
        challengeCategory === category;

      const matchesStatus =
        status === "ALL" ||
        challengeStatus === status;

      const matchesPriority =
        priority === "ALL" ||
        challengePriority === priority;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    challenges,
    search,
    category,
    status,
    priority,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("ALL");
    setStatus("ALL");
    setPriority("ALL");
  };

  const hasActiveFilters =
    search ||
    category !== "ALL" ||
    status !== "ALL" ||
    priority !== "ALL";

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <>


        <main className="challenges-page loading-page">
          <div className="loading-container">
            <div className="loading-icon">
              <Loader2 />
            </div>

            <h2>Loading Challenges</h2>

            <p>
              Fetching challenges from SamadhanSetu...
            </p>
          </div>
        </main>

       
      </>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <>
       

        <main className="challenges-page error-page">
          <div className="error-container">
            <div className="error-card">
              <div className="error-icon">
                <AlertCircle />
              </div>

              <h1>Unable to Load Challenges</h1>

              <p>{error}</p>

              <div className="error-actions">
                <button
                  type="button"
                  onClick={fetchChallenges}
                  className="primary-button"
                >
                  <RefreshCw />
                  Try Again
                </button>

                <Link
                  to="/"
                  className="secondary-button"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </main>

   
      </>
    );
  }

  return (
    <>
    

      <main className="challenges-page">

        {/* =========================
            HERO
        ========================= */}

        <section className="challenges-hero">
          <div className="container">

            <div className="hero-content">
              <div className="hero-badge">
                <Target />
                Community Challenges
              </div>

              <h1>
                Discover Problems.
                <span>Build Solutions.</span>
              </h1>

              <p>
                Explore real-world challenges submitted by
                communities across Jharkhand and discover
                opportunities for collaborative innovation.
              </p>
            </div>

            {/* Stats */}

            <div className="stats-grid">

              <Stat
                label="Total Challenges"
                value={challenges.length}
              />

              <Stat
                label="Showing"
                value={filteredChallenges.length}
              />

              <Stat
                label="Open Challenges"
                value={
                  challenges.filter(
                    (item) =>
                      String(
                        item.status || "OPEN"
                      ).toUpperCase() === "OPEN"
                  ).length
                }
              />

            </div>

          </div>
        </section>

        {/* =========================
            MAIN
        ========================= */}

        <section className="challenges-main container">

          {/* Search + Filters */}

          <div className="filter-box">

            <div className="search-filter-row">

              <div className="search-wrapper">
                <Search />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search challenges, districts, categories..."
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="clear-search"
                  >
                    <X />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowFilters((value) => !value)
                }
                className="mobile-filter-button"
              >
                <Filter />
                Filters
              </button>

            </div>

            {/* Filters */}

            <div
              className={`filters-grid ${
                showFilters ? "show-mobile" : ""
              }`}
            >

              <FilterSelect
                label="Category"
                value={category}
                onChange={setCategory}
                options={categories}
              />

              <FilterSelect
                label="Status"
                value={status}
                onChange={setStatus}
                options={[
                  "ALL",
                  "OPEN",
                  "ASSIGNED",
                  "IN_PROGRESS",
                  "RESOLVED",
                  "CLOSED",
                ]}
              />

              <FilterSelect
                label="Priority"
                value={priority}
                onChange={setPriority}
                options={[
                  "ALL",
                  "LOW",
                  "MEDIUM",
                  "HIGH",
                  "CRITICAL",
                ]}
              />

            </div>

            {hasActiveFilters && (
              <div className="filter-result-bar">

                <p>
                  {filteredChallenges.length} result
                  {filteredChallenges.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>

              </div>
            )}

          </div>

          {/* =========================
              RESULTS
          ========================= */}

          <div className="results-section">

            {filteredChallenges.length === 0 ? (
              <EmptyState
                hasFilters={Boolean(hasActiveFilters)}
                onClear={clearFilters}
              />
            ) : (
              <div className="challenges-grid">

                {filteredChallenges.map(
                  (challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                    />
                  )
                )}

              </div>
            )}

          </div>

        </section>

      </main>

   
   
    </>
  );
}

/* =========================================================
   CHALLENGE CARD
========================================================= */

function ChallengeCard({ challenge }) {
  const title =
    challenge.title ||
    challenge.name ||
    "Untitled Challenge";

  const description =
    challenge.description ||
    "No description available.";

  const category =
    challenge.category || "GENERAL";

  const district =
    challenge.district || "Jharkhand";

  const status = String(
    challenge.status || "OPEN"
  ).toUpperCase();

  const priority = String(
    challenge.priority || "MEDIUM"
  ).toUpperCase();

  return (
    <article className="challenge-card">

      <div className="challenge-card-top">

        <div className="card-label-row">

          <span className="category-badge">
            {category}
          </span>

          <PriorityBadge
            priority={priority}
          />

        </div>

        <h2>{title}</h2>

        <p className="challenge-description">
          {description}
        </p>

        <div className="challenge-location">
          <MapPin />
          {district}
        </div>

      </div>

      <div className="challenge-card-bottom">

        <StatusBadge status={status} />

        <Link
          to={`/challenges/${challenge.id}`}
          className="view-details"
        >
          View Details
          <ArrowRight />
        </Link>

      </div>

    </article>
  );
}

/* =========================================================
   PRIORITY BADGE
========================================================= */

function PriorityBadge({ priority }) {
  const classes = {
    LOW: "priority-low",
    MEDIUM: "priority-medium",
    HIGH: "priority-high",
    CRITICAL: "priority-critical",
  };

  return (
    <span
      className={`priority-badge ${
        classes[priority] || "priority-low"
      }`}
    >
      {priority}
    </span>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const isOpen = status === "OPEN";
  const isResolved = status === "RESOLVED";

  return (
    <span
      className={`status-badge ${
        isResolved
          ? "status-resolved"
          : isOpen
          ? "status-open"
          : "status-default"
      }`}
    >
      {isResolved ? (
        <CheckCircle2 />
      ) : (
        <Clock3 />
      )}

      {status.replaceAll("_", " ")}
    </span>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label className="filter-select">

      <span>{label}</span>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option === "ALL"
              ? `All ${label}s`
              : option.replaceAll("_", " ")}
          </option>
        ))}
      </select>

    </label>
  );
}

/* =========================================================
   STAT
========================================================= */

function Stat({ label, value }) {
  return (
    <div className="stat-card">

      <p>{label}</p>

      <strong>{value}</strong>

    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  hasFilters,
  onClear,
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        <Search />
      </div>

      <h2>No Challenges Found</h2>

      <p>
        {hasFilters
          ? "Try changing your search or filters to find more challenges."
          : "There are currently no challenges available."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="clear-filter-button"
        >
          Clear Filters
        </button>
      )}

    </div>
  );
}

export default Challenges;