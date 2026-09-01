import React, { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  FolderKanban,
  GraduationCap,
  Handshake,
  Lightbulb,
  Loader2,
  Plus,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import { Link } from "react-router-dom";
import API from "../../services/api";
import "./IndustryDashboard.css";

const IndustryDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // IMPORTANT:
      // Use Axios API instance instead of fetch().
      // API instance automatically sends JWT token.
      const [projectsResponse, challengesResponse] = await Promise.all([
        API.get("/projects"),
        API.get("/challenges"),
      ]);

      console.log("PROJECTS RESPONSE:", projectsResponse.data);
      console.log("CHALLENGES RESPONSE:", challengesResponse.data);

      const projectsData =
        projectsResponse.data?.projects ||
        projectsResponse.data?.data ||
        [];

      const challengesData =
        challengesResponse.data?.challenges ||
        challengesResponse.data?.data ||
        [];

      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setChallenges(Array.isArray(challengesData) ? challengesData : []);
    } catch (err) {
      console.error(
        "INDUSTRY DASHBOARD ERROR:",
        err.response?.data || err
      );

      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You do not have permission to access this dashboard.");
      } else if (err.response?.status === 404) {
        setError("Dashboard API route was not found.");
      } else {
        setError(
          err.response?.data?.message ||
            "Dashboard data load nahi ho pa raha."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // --------------------------------------------------
  // PROJECT STATISTICS
  // --------------------------------------------------

  const totalProjects = projects.length;

  const activeProjects = useMemo(() => {
    return projects.filter((project) => {
      const status = String(project.status || "").toUpperCase();

      return (
        status === "ACTIVE" ||
        status === "IN_PROGRESS" ||
        status === "ONGOING" ||
        project.progress > 0 && project.progress < 100
      );
    }).length;
  }, [projects]);

  const completedProjects = useMemo(() => {
    return projects.filter((project) => {
      const status = String(project.status || "").toUpperCase();

      return (
        status === "COMPLETED" ||
        status === "COMPLETE" ||
        Number(project.progress) >= 100
      );
    }).length;
  }, [projects]);

  const pendingProjects = useMemo(() => {
    return projects.filter((project) => {
      const status = String(project.status || "").toUpperCase();

      return (
        status === "PENDING" ||
        status === "PROPOSED" ||
        status === "NOT_STARTED" ||
        Number(project.progress || 0) === 0
      );
    }).length;
  }, [projects]);

  // --------------------------------------------------
  // CHALLENGE STATISTICS
  // --------------------------------------------------

  const assignedChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const status = String(challenge.status || "").toUpperCase();

      return (
        status === "ASSIGNED" ||
        status === "IN_PROGRESS" ||
        status === "ONGOING"
      );
    }).length;
  }, [challenges]);

  const openChallenges = useMemo(() => {
    return challenges.filter((challenge) => {
      const status = String(challenge.status || "").toUpperCase();

      return (
        status === "OPEN" ||
        status === "PENDING" ||
        status === "SUBMITTED"
      );
    }).length;
  }, [challenges]);

  // --------------------------------------------------
  // AVERAGE PROGRESS
  // --------------------------------------------------

  const averageProgress = useMemo(() => {
    if (!projects.length) return 0;

    const totalProgress = projects.reduce((total, project) => {
      const progress = Number(project.progress);

      return total + (Number.isNaN(progress) ? 0 : progress);
    }, 0);

    return Math.round(totalProgress / projects.length);
  }, [projects]);

  // --------------------------------------------------
  // RECENT PROJECTS
  // --------------------------------------------------

  const recentProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => {
        const dateA = new Date(
          a.createdAt || a.updatedAt || 0
        ).getTime();

        const dateB = new Date(
          b.createdAt || b.updatedAt || 0
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [projects]);

  // --------------------------------------------------
  // INSTITUTIONS
  // --------------------------------------------------

  const institutionsCount = useMemo(() => {
    const institutions = new Set();

    projects.forEach((project) => {
      if (project.universityId) {
        institutions.add(project.universityId);
      }

      if (project.university?.id) {
        institutions.add(project.university.id);
      }

      if (project.university?.name) {
        institutions.add(project.university.name);
      }

      if (project.institution?.id) {
        institutions.add(project.institution.id);
      }

      if (project.institution?.name) {
        institutions.add(project.institution.name);
      }
    });

    return institutions.size;
  }, [projects]);

  // --------------------------------------------------
  // HELPERS
  // --------------------------------------------------

  const getProjectName = (project) => {
    return (
      project.name ||
      project.title ||
      project.projectName ||
      "Untitled Project"
    );
  };

  const getProjectStatus = (project) => {
    if (Number(project.progress) >= 100) {
      return "COMPLETED";
    }

    return (
      project.status ||
      (Number(project.progress) > 0
        ? "IN_PROGRESS"
        : "PENDING")
    );
  };

  const getStatusClass = (status) => {
    const normalizedStatus = String(status)
      .toLowerCase()
      .replace(/\s+/g, "_");

    if (
      normalizedStatus === "completed" ||
      normalizedStatus === "complete"
    ) {
      return "status-completed";
    }

    if (
      normalizedStatus === "active" ||
      normalizedStatus === "in_progress" ||
      normalizedStatus === "ongoing"
    ) {
      return "status-active";
    }

    if (
      normalizedStatus === "pending" ||
      normalizedStatus === "proposed"
    ) {
      return "status-pending";
    }

    return "status-default";
  };

  const getProgress = (project) => {
    const progress = Number(project.progress);

    if (Number.isNaN(progress)) return 0;

    return Math.min(Math.max(progress, 0), 100);
  };

  const formatDate = (date) => {
    if (!date) return "Recently";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <main className="industry-dashboard">
        <div className="dashboard-loading">
          <Loader2 className="loading-icon" size={40} />
          <h2>Loading Industry Dashboard...</h2>
          <p>Please wait while we fetch your data.</p>
        </div>
      </main>
    );
  }

  // --------------------------------------------------
  // MAIN DASHBOARD
  // --------------------------------------------------

  return (
    <main className="industry-dashboard">
      {/* HEADER */}
      <section className="dashboard-header">
        <div>
          <div className="dashboard-title-row">
            <div className="dashboard-title-icon">
              <BriefcaseBusiness size={28} />
            </div>

            <div>
              <h1>Industry Dashboard</h1>

              <p>
                Manage collaborations, projects and challenges
                with educational institutions.
              </p>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="refresh-btn"
            onClick={fetchDashboardData}
            title="Refresh dashboard"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          <Link
            to="/industry/challenges"
            className="primary-btn"
          >
            <Plus size={18} />
            Create Challenge
          </Link>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <div className="dashboard-error">
          <XCircle size={20} />

          <div>
            <strong>Unable to load dashboard</strong>
            <p>{error}</p>
          </div>

          <button onClick={fetchDashboardData}>
            Try Again
          </button>
        </div>
      )}

      {/* STATS */}
      <section className="stats-grid">
        <StatCard
          icon={<FolderKanban size={24} />}
          title="Total Projects"
          value={totalProjects}
          subtitle="All projects"
          className="blue"
        />

        <StatCard
          icon={<TrendingUp size={24} />}
          title="Active Projects"
          value={activeProjects}
          subtitle="Currently running"
          className="green"
        />

        <StatCard
          icon={<CheckCircle2 size={24} />}
          title="Completed"
          value={completedProjects}
          subtitle="Successfully completed"
          className="purple"
        />

        <StatCard
          icon={<Clock3 size={24} />}
          title="Pending"
          value={pendingProjects}
          subtitle="Waiting to start"
          className="orange"
        />

        <StatCard
          icon={<Target size={24} />}
          title="Challenges"
          value={challenges.length}
          subtitle={`${openChallenges} open`}
          className="red"
        />

        <StatCard
          icon={<Handshake size={24} />}
          title="Assigned"
          value={assignedChallenges}
          subtitle="Assigned challenges"
          className="teal"
        />
      </section>

      {/* MAIN CONTENT */}
      <section className="dashboard-grid">
        {/* RECENT PROJECTS */}
        <div className="dashboard-card recent-projects-card">
          <div className="card-header">
            <div>
              <h2>Recent Projects</h2>
              <p>Your latest collaboration projects</p>
            </div>

            <Link
              to="/industry/projects"
              className="view-all-link"
            >
              View All
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <EmptyState
              icon={<FolderKanban size={34} />}
              title="No projects yet"
              description="Projects will appear here once collaborations are created."
              link="/industry/projects"
              linkText="View Projects"
            />
          ) : (
            <div className="project-list">
              {recentProjects.map((project, index) => {
                const progress = getProgress(project);
                const status = getProjectStatus(project);

                return (
                  <div
                    className="project-item"
                    key={
                      project.id ||
                      project._id ||
                      `project-${index}`
                    }
                  >
                    <div className="project-icon">
                      <FolderKanban size={21} />
                    </div>

                    <div className="project-info">
                      <div className="project-top">
                        <h3>{getProjectName(project)}</h3>

                        <span
                          className={`project-status ${getStatusClass(
                            status
                          )}`}
                        >
                          {String(status)
                            .replace(/_/g, " ")
                            .toLowerCase()
                            .replace(/\b\w/g, (letter) =>
                              letter.toUpperCase()
                            )}
                        </span>
                      </div>

                      <p className="project-description">
                        {project.description ||
                          "No project description available."}
                      </p>

                      <div className="project-meta">
                        <span>
                          {project.university?.name ||
                            project.institution?.name ||
                            project.universityName ||
                            "Institution not specified"}
                        </span>

                        <span>
                          {formatDate(
                            project.createdAt ||
                              project.updatedAt
                          )}
                        </span>
                      </div>

                      <div className="progress-container">
                        <div className="progress-header">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>

                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* COLLABORATION OVERVIEW */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Collaboration Overview</h2>
              <p>Current collaboration status</p>
            </div>
          </div>

          <div className="overview-list">
            <OverviewRow
              icon={<FolderKanban size={20} />}
              label="Total Projects"
              value={totalProjects}
            />

            <OverviewRow
              icon={<TrendingUp size={20} />}
              label="Active Projects"
              value={activeProjects}
            />

            <OverviewRow
              icon={<CheckCircle2 size={20} />}
              label="Completed Projects"
              value={completedProjects}
            />

            <OverviewRow
              icon={<Clock3 size={20} />}
              label="Pending Projects"
              value={pendingProjects}
            />

            <OverviewRow
              icon={<Target size={20} />}
              label="Total Challenges"
              value={challenges.length}
            />

            <OverviewRow
              icon={<Handshake size={20} />}
              label="Assigned Challenges"
              value={assignedChallenges}
            />
          </div>
        </div>
      </section>

      {/* SECOND ROW */}
      <section className="dashboard-grid">
        {/* AVERAGE PROGRESS */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Average Project Progress</h2>
              <p>Overall progress across all projects</p>
            </div>

            <TrendingUp size={22} />
          </div>

          <div className="average-progress">
            <div className="progress-circle">
              <span>{averageProgress}%</span>
            </div>

            <div className="average-progress-info">
              <h3>{averageProgress}%</h3>
              <p>Average completion</p>

              <div className="large-progress-bar">
                <div
                  className="large-progress-fill"
                  style={{
                    width: `${averageProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* IMPACT */}
        <div className="dashboard-card">
          <div className="card-header">
            <div>
              <h2>Impact</h2>
              <p>Your collaboration impact</p>
            </div>

            <Lightbulb size={22} />
          </div>

          <div className="impact-grid">
            <ImpactBox
              icon={<GraduationCap size={24} />}
              value={institutionsCount}
              label="Institutions"
            />

            <ImpactBox
              icon={<Users size={24} />}
              value={challenges.length}
              label="Challenges"
            />

            <ImpactBox
              icon={<BriefcaseBusiness size={24} />}
              value={projects.length}
              label="Projects"
            />

            <ImpactBox
              icon={<CheckCircle2 size={24} />}
              value={completedProjects}
              label="Completed"
            />
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="dashboard-card quick-actions-card">
        <div className="card-header">
          <div>
            <h2>Quick Actions</h2>
            <p>Common actions for industry partners</p>
          </div>
        </div>

        <div className="quick-actions">
          <QuickAction
            to="/industry/challenges"
            icon={<Target size={23} />}
            title="Create Challenge"
            description="Post a new real-world problem"
          />

          <QuickAction
            to="/industry/projects"
            icon={<FolderKanban size={23} />}
            title="View Projects"
            description="Track your collaboration projects"
          />

          <QuickAction
            to="/industry/partners"
            icon={<Handshake size={23} />}
            title="Collaborations"
            description="Manage your partnerships"
          />

          <QuickAction
            to="/industry/recommendations"
            icon={<Lightbulb size={23} />}
            title="Recommendations"
            description="Find suitable solutions"
          />
        </div>
      </section>
    </main>
  );
};

// ======================================================
// STAT CARD
// ======================================================

const StatCard = ({
  icon,
  title,
  value,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-icon">{icon}</div>

      <div className="stat-content">
        <span className="stat-title">{title}</span>

        <strong className="stat-value">{value}</strong>

        <span className="stat-subtitle">{subtitle}</span>
      </div>
    </div>
  );
};

// ======================================================
// OVERVIEW ROW
// ======================================================

const OverviewRow = ({ icon, label, value }) => {
  return (
    <div className="overview-row">
      <div className="overview-left">
        <div className="overview-icon">{icon}</div>

        <span>{label}</span>
      </div>

      <strong>{value}</strong>
    </div>
  );
};

// ======================================================
// IMPACT BOX
// ======================================================

const ImpactBox = ({ icon, value, label }) => {
  return (
    <div className="impact-box">
      <div className="impact-icon">{icon}</div>

      <strong>{value}</strong>

      <span>{label}</span>
    </div>
  );
};

// ======================================================
// QUICK ACTION
// ======================================================

const QuickAction = ({
  to,
  icon,
  title,
  description,
}) => {
  return (
    <Link to={to} className="quick-action">
      <div className="quick-action-icon">{icon}</div>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

// ======================================================
// EMPTY STATE
// ======================================================

const EmptyState = ({
  icon,
  title,
  description,
  link,
  linkText,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      {link && (
        <Link to={link} className="empty-link">
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default IndustryDashboard;