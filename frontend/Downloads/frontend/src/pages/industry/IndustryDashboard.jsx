import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Handshake,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Building2,
  AlertCircle,
} from "lucide-react";


import StatCard from "../../components/StatCard";

import "./IndustryDashboard.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function IndustryDashboard() {
  const [projects, setProjects] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const [projectsResponse, challengesResponse] =
        await Promise.all([
          fetch(`${API_URL}/projects`),
          fetch(`${API_URL}/challenges`),
        ]);

      let projectsData = [];
      let challengesData = [];

      if (projectsResponse.ok) {
        const data = await projectsResponse.json();

        projectsData =
          data.projects ||
          data.data ||
          [];
      }

      if (challengesResponse.ok) {
        const data = await challengesResponse.json();

        challengesData =
          data.challenges ||
          data.data ||
          [];
      }

      setProjects(
        Array.isArray(projectsData)
          ? projectsData
          : []
      );

      setChallenges(
        Array.isArray(challengesData)
          ? challengesData
          : []
      );
    } catch (err) {
      console.error(
        "INDUSTRY DASHBOARD ERROR:",
        err
      );

      setError(
        "Dashboard data load nahi ho pa raha. Please check backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Statistics
  ========================= */

  const totalProjects = projects.length;

  const activeProjects = projects.filter((project) => {
    const progress = Number(project.progress || 0);

    return progress > 0 && progress < 100;
  }).length;

  const completedProjects = projects.filter((project) => {
    const progress = Number(project.progress || 0);

    return progress >= 100;
  }).length;

  const pendingProjects = projects.filter((project) => {
    const progress = Number(project.progress || 0);

    return progress === 0;
  }).length;

  const assignedChallenges = challenges.filter((challenge) => {
    const status = String(
      challenge.status || ""
    ).toUpperCase();

    return (
      status === "ASSIGNED" ||
      status === "IN_PROGRESS"
    );
  }).length;

  /* =========================
     Average Progress
  ========================= */

  const averageProgress = useMemo(() => {
    if (projects.length === 0) {
      return 0;
    }

    const total = projects.reduce(
      (sum, project) =>
        sum + Number(project.progress || 0),
      0
    );

    return Math.round(
      total / projects.length
    );
  }, [projects]);

  /* =========================
     Recent Projects
  ========================= */

  const recentProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => {
        const dateA = new Date(
          a.createdAt || 0
        ).getTime();

        const dateB = new Date(
          b.createdAt || 0
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 6);
  }, [projects]);

  /* =========================
     Institutions
  ========================= */

  const institutionsCount = useMemo(() => {
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

  /* =========================
     Loading
  ========================= */

  if (loading) {
    return (
      <>
       

        <main className="industry-page">
          <div className="industry-container">

            <div className="industry-loading">

              <div className="loading-title"></div>

              <div className="loading-subtitle"></div>

              <div className="loading-stats">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="loading-card"
                  ></div>
                ))}
              </div>

              <div className="loading-large"></div>

            </div>
          </div>
        </main>

      
      </>
    );
  }

  return (
    <>
    

      <main className="industry-page">

        <div className="industry-container">

          {/* HEADER */}

          <section className="industry-header">

            <div className="industry-header-content">

              <div>

                <div className="industry-badge">
                  <BriefcaseBusiness size={15} />
                  INDUSTRY PORTAL
                </div>

                <h1>
                  Industry Dashboard
                </h1>

                <p>
                  Collaborate with universities and
                  communities to turn real-world
                  challenges into scalable solutions.
                </p>

              </div>

              <div className="industry-actions">

                <Link
                  to="/challenges"
                  className="industry-outline-button"
                >
                  <Target size={16} />
                  Explore Challenges
                </Link>

                <Link
                  to="/solutions"
                  className="industry-primary-button"
                >
                  View Solutions
                  <ArrowRight size={16} />
                </Link>

              </div>

            </div>

          </section>

          {/* ERROR */}

          {error && (
            <div className="industry-error">

              <AlertCircle size={18} />

              <span>{error}</span>

            </div>
          )}

          {/* STAT CARDS */}

          <section className="industry-stats">

            <StatCard
              title="Total Projects"
              value={totalProjects}
              icon={BriefcaseBusiness}
            />

            <StatCard
              title="Active Projects"
              value={activeProjects}
              icon={TrendingUp}
            />

            <StatCard
              title="Completed"
              value={completedProjects}
              icon={CheckCircle2}
            />

            <StatCard
              title="Pending"
              value={pendingProjects}
              icon={Clock3}
            />

          </section>

          {/* MAIN CONTENT */}

          <section className="industry-main-grid">

            {/* RECENT PROJECTS */}

            <div className="industry-panel">

              <div className="panel-header">

                <div>

                  <h2>
                    Recent Projects
                  </h2>

                  <p>
                    Latest projects involving
                    industry collaboration
                  </p>

                </div>

                <Link
                  to="/solutions"
                  className="view-all"
                >
                  View all
                  <ArrowRight size={16} />
                </Link>

              </div>

              <div className="projects-list">

                {recentProjects.length === 0 ? (

                  <div className="empty-projects">

                    <BriefcaseBusiness
                      size={45}
                    />

                    <h3>
                      No projects found
                    </h3>

                    <p>
                      Industry projects will appear
                      here once assigned.
                    </p>

                  </div>

                ) : (

                  recentProjects.map((project) => {

                    const progress = Math.min(
                      100,
                      Math.max(
                        0,
                        Number(
                          project.progress || 0
                        )
                      )
                    );

                    return (
                      <div
                        key={project.id}
                        className="project-item"
                      >

                        <div className="project-top">

                          <div className="project-info">

                            <h3>
                              {project.name ||
                                "Untitled Project"}
                            </h3>

                            <p>
                              {project.description ||
                                "No project description available."}
                            </p>

                            <div className="project-tags">

                              {project.university?.name && (
                                <span className="university-tag">

                                  <Building2 size={13} />

                                  {project.university.name}

                                </span>
                              )}

                              {project.industry?.name && (
                                <span className="industry-tag">

                                  <BriefcaseBusiness size={13} />

                                  {project.industry.name}

                                </span>
                              )}

                            </div>

                          </div>

                          <span className="progress-badge">
                            {progress}% complete
                          </span>

                        </div>

                        <div className="progress-section">

                          <div className="progress-label">

                            <span>
                              Project Progress
                            </span>

                            <strong>
                              {progress}%
                            </strong>

                          </div>

                          <div className="progress-track">

                            <div
                              className="progress-fill"
                              style={{
                                width: `${progress}%`,
                              }}
                            />

                          </div>

                        </div>

                      </div>
                    );
                  })

                )}

              </div>

            </div>

            {/* COLLABORATION */}

            <div className="industry-panel collaboration-panel">

              <div className="section-icon-title">

                <div className="industry-icon">
                  <Handshake size={20} />
                </div>

                <div>

                  <h2>
                    Collaboration Overview
                  </h2>

                  <p>
                    Your current platform activity
                  </p>

                </div>

              </div>

              <div className="overview-list">

                <OverviewRow
                  icon={BriefcaseBusiness}
                  label="Total Projects"
                  value={totalProjects}
                />

                <OverviewRow
                  icon={TrendingUp}
                  label="Active Projects"
                  value={activeProjects}
                />

                <OverviewRow
                  icon={CheckCircle2}
                  label="Completed Projects"
                  value={completedProjects}
                />

                <OverviewRow
                  icon={Target}
                  label="Assigned Challenges"
                  value={assignedChallenges}
                />

              </div>

            </div>

          </section>

          {/* PROGRESS + IMPACT */}

          <section className="industry-bottom-grid">

            {/* AVERAGE PROGRESS */}

            <div className="industry-panel">

              <div className="section-icon-title">

                <div className="industry-icon">
                  <TrendingUp size={20} />
                </div>

                <div>

                  <h2>
                    Average Project Progress
                  </h2>

                  <p>
                    Overall implementation progress
                  </p>

                </div>

              </div>

              <div className="average-progress">

                <div className="average-number-row">

                  <span className="average-number">
                    {averageProgress}%
                  </span>

                  <span className="average-description">
                    across {totalProjects} projects
                  </span>

                </div>

                <div className="average-track">

                  <div
                    className="average-fill"
                    style={{
                      width: `${averageProgress}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* INDUSTRY IMPACT */}

            <div className="industry-panel">

              <div className="section-icon-title">

                <div className="impact-icon">
                  <Lightbulb size={20} />
                </div>

                <div>

                  <h2>
                    Industry Impact
                  </h2>

                  <p>
                    Contribution towards solving
                    challenges
                  </p>

                </div>

              </div>

              <div className="impact-grid">

                <ImpactBox
                  icon={Users}
                  label="Projects"
                  value={totalProjects}
                />

                <ImpactBox
                  icon={CheckCircle2}
                  label="Solutions"
                  value={completedProjects}
                />

                <ImpactBox
                  icon={Building2}
                  label="Institutions"
                  value={institutionsCount}
                />

                <ImpactBox
                  icon={Target}
                  label="Challenges"
                  value={assignedChallenges}
                />

              </div>

            </div>

          </section>

          {/* QUICK ACTIONS */}

          <section className="industry-panel quick-actions-panel">

            <div className="quick-actions-header">

              <h2>
                Industry Actions
              </h2>

              <p>
                Access challenges and collaboration
                tools.
              </p>

            </div>

            <div className="quick-actions-grid">

              <QuickAction
                to="/challenges"
                icon={Target}
                title="Find Challenges"
                description="Discover problems that match your expertise"
              />

              <QuickAction
                to="/solutions"
                icon={Lightbulb}
                title="Explore Solutions"
                description="Review solutions developed on the platform"
              />

              <QuickAction
                to="/universities"
                icon={Building2}
                title="University Partners"
                description="Connect with academic institutions"
              />

              <QuickAction
                to="/solutions"
                icon={Handshake}
                title="Collaborate"
                description="Work with teams on active projects"
              />

            </div>

          </section>

        </div>

      </main>

   
    </>
  );
}

/* =========================
   Overview Row
========================= */

function OverviewRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="overview-row">

      <div className="overview-left">

        <div className="overview-icon">
          <Icon size={16} />
        </div>

        <span>
          {label}
        </span>

      </div>

      <strong>
        {value}
      </strong>

    </div>
  );
}

/* =========================
   Impact Box
========================= */

function ImpactBox({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="impact-box">

      <div className="impact-box-top">

        <div className="impact-box-icon">
          <Icon size={16} />
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

/* =========================
   Quick Action
========================= */

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

        <div className="quick-action-icon">
          <Icon size={20} />
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

      <div className="quick-action-open">

        Open

        <ArrowRight size={13} />

      </div>

    </Link>
  );
}

export default IndustryDashboard;