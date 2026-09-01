
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileText,
  Users,
  Building2,
  ArrowRight,
  TrendingUp,
  MapPin,
  ShieldCheck,
} from "lucide-react";


import StatCard from "../../components/StatCard";
import ChallengeCard from "../../components/ChallengeCard";

import "./GovernmentDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function GovernmentDashboard() {
  const [challenges, setChallenges] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [challengeResponse, projectResponse] =
        await Promise.all([
          fetch(`${API_URL}/challenges`),
          fetch(`${API_URL}/projects`),
        ]);

      let challengeData = [];
      let projectData = [];

      if (challengeResponse.ok) {
        const data = await challengeResponse.json();

        challengeData =
          data.challenges ||
          data.data ||
          [];
      }

      if (projectResponse.ok) {
        const data = await projectResponse.json();

        projectData =
          data.projects ||
          data.data ||
          [];
      }

      setChallenges(
        Array.isArray(challengeData)
          ? challengeData
          : []
      );

      setProjects(
        Array.isArray(projectData)
          ? projectData
          : []
      );
    } catch (err) {
      console.error(
        "Government dashboard error:",
        err
      );

      setError(
        "Dashboard data load nahi ho pa raha. Please check backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     STATISTICS
  ================================= */

  const totalChallenges = challenges.length;

  const pendingChallenges = challenges.filter(
    (challenge) => {
      const status = String(
        challenge.status || ""
      ).toUpperCase();

      return (
        status === "PENDING" ||
        status === "SUBMITTED" ||
        status === "UNDER_REVIEW"
      );
    }
  ).length;

  const resolvedChallenges = challenges.filter(
    (challenge) => {
      const status = String(
        challenge.status || ""
      ).toUpperCase();

      return (
        status === "RESOLVED" ||
        status === "COMPLETED"
      );
    }
  ).length;

  const assignedChallenges = challenges.filter(
    (challenge) => {
      const status = String(
        challenge.status || ""
      ).toUpperCase();

      return (
        status === "ASSIGNED" ||
        status === "IN_PROGRESS"
      );
    }
  ).length;

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) => {
      const progress = Number(
        project.progress || 0
      );

      return progress >= 100;
    }
  ).length;

  const criticalCount = challenges.filter(
    (challenge) =>
      String(
        challenge.priority || ""
      ).toUpperCase() === "CRITICAL"
  ).length;

  const highCount = challenges.filter(
    (challenge) =>
      String(
        challenge.priority || ""
      ).toUpperCase() === "HIGH"
  ).length;

  /* ================================
     RECENT CHALLENGES
  ================================= */

  const recentChallenges = useMemo(() => {
    return [...challenges]
      .sort((a, b) => {
        const dateA = new Date(
          a.createdAt || 0
        ).getTime();

        const dateB = new Date(
          b.createdAt || 0
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [challenges]);

  /* ================================
     DISTRICTS
  ================================= */

  const districts = useMemo(() => {
    return [
      ...new Set(
        challenges
          .map(
            (challenge) =>
              challenge.district
          )
          .filter(Boolean)
      ),
    ].slice(0, 12);
  }, [challenges]);

  /* ================================
     PARTNER INSTITUTIONS
  ================================= */

  const partnerInstitutions = useMemo(() => {
    return new Set(
      projects
        .map(
          (project) =>
            project.universityId ||
            project.university?.id
        )
        .filter(Boolean)
    ).size;
  }, [projects]);

  const resolutionRate =
    totalChallenges > 0
      ? Math.round(
          (resolvedChallenges /
            totalChallenges) *
            100
        )
      : 0;

  /* ================================
     LOADING
  ================================= */

  if (loading) {
    return (
      <>
       

        <main className="government-dashboard">
          <div className="dashboard-container loading-container">
            <div className="loading-title"></div>

            <div className="loading-subtitle"></div>

            <div className="loading-stats">
              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="loading-card"
                  />
                )
              )}
            </div>

            <div className="loading-large"></div>
          </div>
        </main>

     
      </>
    );
  }

  return (
    <>
  

      <main className="government-dashboard">
        <div className="dashboard-container">

          {/* HEADER */}

          <section className="dashboard-header">
            <div className="header-content">

              <div>
                <div className="portal-badge">
                  <ShieldCheck size={15} />
                  GOVERNMENT PORTAL
                </div>

                <h1>
                  Government Dashboard
                </h1>

                <p>
                  Monitor community challenges,
                  track solution progress, and
                  coordinate innovation across
                  Jharkhand.
                </p>
              </div>

              <div className="header-actions">
                <Link
                  to="/challenges"
                  className="secondary-button"
                >
                  <FileText size={17} />
                  View Challenges
                </Link>

                <Link
                  to="/solutions"
                  className="primary-button"
                >
                  View Solutions
                  <ArrowRight size={17} />
                </Link>
              </div>

            </div>
          </section>

          {/* ERROR */}

          {error && (
            <div className="error-box">
              <AlertTriangle size={18} />

              <span>
                {error}
              </span>
            </div>
          )}

          {/* STATISTICS */}

          <section className="stats-grid">

            <StatCard
              title="Total Challenges"
              value={totalChallenges}
              icon={FileText}
            />

            <StatCard
              title="Pending Review"
              value={pendingChallenges}
              icon={Clock3}
            />

            <StatCard
              title="Active / Assigned"
              value={assignedChallenges}
              icon={TrendingUp}
            />

            <StatCard
              title="Resolved"
              value={resolvedChallenges}
              icon={CheckCircle2}
            />

          </section>

          {/* OVERVIEW */}

          <section className="overview-grid">

            {/* RECENT CHALLENGES */}

            <div className="dashboard-panel">

              <div className="panel-header">
                <div>
                  <h2>
                    Recent Challenges
                  </h2>

                  <p>
                    Latest problems submitted
                    by citizens
                  </p>
                </div>

                <Link
                  to="/challenges"
                  className="view-link"
                >
                  View all
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="challenge-list">

                {recentChallenges.length === 0 ? (
                  <div className="empty-state">
                    <FileText
                      size={42}
                    />

                    <h3>
                      No challenges found
                    </h3>

                    <p>
                      New community challenges
                      will appear here.
                    </p>
                  </div>
                ) : (
                  recentChallenges.map(
                    (challenge) => (
                      <div
                        key={challenge.id}
                        className="challenge-item"
                      >
                        <ChallengeCard
                          challenge={challenge}
                        />
                      </div>
                    )
                  )
                )}

              </div>
            </div>

            {/* PRIORITY */}

            <div className="dashboard-panel priority-panel">

              <div className="panel-title">
                <div className="panel-icon">
                  <AlertTriangle
                    size={21}
                  />
                </div>

                <div>
                  <h2>
                    Priority Overview
                  </h2>

                  <p>
                    Challenges requiring
                    attention
                  </p>
                </div>
              </div>

              <div className="priority-list">

                <div className="priority-card critical">
                  <div>
                    <strong>
                      Critical
                    </strong>

                    <span>
                      Immediate attention
                    </span>
                  </div>

                  <b>
                    {criticalCount}
                  </b>
                </div>

                <div className="priority-card high">
                  <div>
                    <strong>
                      High Priority
                    </strong>

                    <span>
                      Requires quick action
                    </span>
                  </div>

                  <b>
                    {highCount}
                  </b>
                </div>

                <div className="priority-card active">
                  <div>
                    <strong>
                      Total Active
                    </strong>

                    <span>
                      Assigned / in progress
                    </span>
                  </div>

                  <b>
                    {assignedChallenges}
                  </b>
                </div>

              </div>
            </div>

          </section>

          {/* PROJECT MONITORING */}

          <section className="dashboard-section">

            <div className="section-heading">
              <div>
                <h2>
                  Project Monitoring
                </h2>

                <p>
                  Track implementation of
                  approved solutions.
                </p>
              </div>

              <Link
                to="/solutions"
                className="view-link"
              >
                View projects
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mini-card-grid">

              <DashboardMiniCard
                icon={FileText}
                label="Total Projects"
                value={totalProjects}
              />

              <DashboardMiniCard
                icon={CheckCircle2}
                label="Completed"
                value={completedProjects}
              />

              <DashboardMiniCard
                icon={Building2}
                label="Partner Institutions"
                value={partnerInstitutions}
              />

              <DashboardMiniCard
                icon={Users}
                label="Community Impact"
                value={resolvedChallenges}
              />

            </div>

          </section>

          {/* QUICK ACTIONS */}

          <section className="actions-panel">

            <div className="section-heading">
              <div>
                <h2>
                  Government Actions
                </h2>

                <p>
                  Quickly access important
                  platform operations.
                </p>
              </div>
            </div>

            <div className="action-grid">

              <QuickAction
                to="/challenges"
                icon={FileText}
                title="Review Challenges"
                description="Evaluate citizen-submitted problems"
              />

              <QuickAction
                to="/universities"
                icon={Building2}
                title="Universities"
                description="View academic partners"
              />

              <QuickAction
                to="/industry"
                icon={Users}
                title="Industry Partners"
                description="View industry collaboration"
              />

              <QuickAction
                to="/solutions"
                icon={CheckCircle2}
                title="Track Solutions"
                description="Monitor solution implementation"
              />

            </div>

          </section>

          {/* DISTRICT + IMPACT */}

          <section className="bottom-grid">

            {/* DISTRICT */}

            <div className="dashboard-panel info-panel">

              <div className="panel-title">

                <div className="panel-icon">
                  <MapPin size={21} />
                </div>

                <div>
                  <h2>
                    District Coverage
                  </h2>

                  <p>
                    Areas represented on
                    the platform
                  </p>
                </div>

              </div>

              <div className="district-list">

                {districts.length === 0 ? (
                  <p className="empty-text">
                    District information
                    unavailable.
                  </p>
                ) : (
                  districts.map(
                    (district) => (
                      <span
                        key={district}
                        className="district-tag"
                      >
                        {district}
                      </span>
                    )
                  )
                )}

              </div>

            </div>

            {/* IMPACT */}

            <div className="dashboard-panel info-panel">

              <div className="panel-title">

                <div className="panel-icon green">
                  <TrendingUp
                    size={21}
                  />
                </div>

                <div>
                  <h2>
                    Impact Summary
                  </h2>

                  <p>
                    Current platform
                    performance
                  </p>
                </div>

              </div>

              <div className="resolution">

                <div className="resolution-heading">
                  <span>
                    Resolution Rate
                  </span>

                  <strong>
                    {resolutionRate}%
                  </strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-bar"
                    style={{
                      width:
                        `${resolutionRate}%`,
                    }}
                  />
                </div>

                <div className="impact-values">

                  <div>
                    <span>
                      Challenges
                    </span>

                    <strong>
                      {totalChallenges}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Solutions
                    </span>

                    <strong>
                      {completedProjects}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          </section>

        </div>
      </main>

     
    </>
  );
}


/* =================================
   MINI DASHBOARD CARD
================================= */

function DashboardMiniCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="mini-dashboard-card">

      <div className="mini-card-top">

        <div className="mini-icon">
          <Icon size={21} />
        </div>

        <strong>
          {value}
        </strong>

      </div>

      <p>
        {label}
      </p>

    </div>
  );
}


/* =================================
   QUICK ACTION
================================= */

function QuickAction({
  to,
  icon: Icon,
  title,
  description,
}) {
  return (
    <Link
      to={to}
      className="quick-action"
    >

      <div className="quick-action-content">

        <div className="quick-icon">
          <Icon size={21} />
        </div>

        <div>
          <h3>
            {title}
          </h3>

          <p>
            {description}
          </p>
        </div>

      </div>

      <div className="quick-open">
        Open
        <ArrowRight size={14} />
      </div>

    </Link>
  );
}

export default GovernmentDashboard;

