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

function IndustryDashboard() {
  const [projects, setProjects] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [projectsResponse, challengesResponse] = await Promise.all([
        API.get("/projects"),
        API.get("/challenges"),
      ]);

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
      console.error("Industry dashboard error:", err);

      const status = err?.response?.status;

      if (status === 401) {
        setError("Your session has expired. Please login again.");
      } else if (status === 403) {
        setError("You are not authorized to access the Industry Dashboard.");
      } else if (status === 404) {
        setError(
          "Dashboard API endpoint was not found. Please check the backend routes."
        );
      } else {
        setError(
          err?.response?.data?.message ||
            "Unable to load dashboard data. Please try again."
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getProjectStatus = (project) => {
    return String(
      project?.status ||
        project?.projectStatus ||
        project?.state ||
        "PENDING"
    ).toUpperCase();
  };

  const getProgress = (project) => {
    const value =
      project?.progress ??
      project?.completionPercentage ??
      project?.completion ??
      0;

    const number = Number(value);

    if (Number.isNaN(number)) return 0;

    return Math.min(100, Math.max(0, number));
  };

  const getProjectName = (project) => {
    return (
      project?.name ||
      project?.projectName ||
      project?.title ||
      "Untitled Project"
    );
  };

  const getStatusClass = (status) => {
    const normalized = String(status).toUpperCase();

    if (
      normalized === "COMPLETED" ||
      normalized === "COMPLETE"
    ) {
      return "status-completed";
    }

    if (
      normalized === "ACTIVE" ||
      normalized === "IN_PROGRESS" ||
      normalized === "ONGOING"
    ) {
      return "status-active";
    }

    if (
      normalized === "CANCELLED" ||
      normalized === "REJECTED"
    ) {
      return "status-cancelled";
    }

    return "status-pending";
  };

  const formatDate = (date) => {
    if (!date) return "Recently";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "Recently";
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const stats = useMemo(() => {
    const totalProjects = projects.length;

    const activeProjects = projects.filter((project) => {
      const status = getProjectStatus(project);
      const progress = getProgress(project);

      return (
        ["ACTIVE", "IN_PROGRESS", "ONGOING"].includes(status) ||
        (progress > 0 && progress < 100)
      );
    }).length;

    const completedProjects = projects.filter((project) => {
      const status = getProjectStatus(project);
      const progress = getProgress(project);

      return (
        ["COMPLETED", "COMPLETE"].includes(status) ||
        progress >= 100
      );
    }).length;

    const pendingProjects = projects.filter((project) => {
      const status = getProjectStatus(project);
      const progress = getProgress(project);

      return (
        ["PENDING", "PROPOSED", "NOT_STARTED"].includes(status) ||
        progress === 0
      );
    }).length;

    const assignedChallenges = challenges.filter((challenge) => {
      const status = String(challenge?.status || "").toUpperCase();

      return ["ASSIGNED", "IN_PROGRESS", "ONGOING"].includes(status);
    }).length;

    const openChallenges = challenges.filter((challenge) => {
      const status = String(challenge?.status || "").toUpperCase();

      return ["OPEN", "PENDING", "SUBMITTED"].includes(status);
    }).length;

    const averageProgress =
      totalProjects > 0
        ? Math.round(
            projects.reduce(
              (sum, project) => sum + getProgress(project),
              0
            ) / totalProjects
          )
        : 0;

    const institutions = new Set();

    projects.forEach((project) => {
      if (project?.universityId) {
        institutions.add(project.universityId);
      }

      if (project?.university?.id) {
        institutions.add(project.university.id);
      }

      if (project?.university?.name) {
        institutions.add(project.university.name);
      }

      if (project?.institution?.id) {
        institutions.add(project.institution.id);
      }

      if (project?.institution?.name) {
        institutions.add(project.institution.name);
      }
    });

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      pendingProjects,
      assignedChallenges,
      openChallenges,
      averageProgress,
      institutionsCount: institutions.size,
    };
  }, [projects, challenges]);

  const recentProjects = useMemo(() => {
    return [...projects]
      .sort((a, b) => {
        const dateA = new Date(
          a?.updatedAt || a?.createdAt || 0
        ).getTime();

        const dateB = new Date(
          b?.updatedAt || b?.createdAt || 0
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [projects]);

  if (loading) {
    return (
      <main className="industry-dashboard">
        <div className="dashboard-loading">
          <div className="loading-icon-wrapper">
            <Loader2 className="loading-icon" size={40} />
          </div>

          <h2>Loading Industry Dashboard...</h2>

          <p>
            Please wait while we fetch your projects and
            collaboration data.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="industry-dashboard">
      {/* HEADER */}
      <section className="dashboard-header">
        <div className="dashboard-title-row">
          <div className="dashboard-title-icon">
            <BriefcaseBusiness size={30} />
          </div>

          <div>
            <span className="dashboard-eyebrow">
              INDUSTRY PORTAL
            </span>

            <h1>Industry Dashboard</h1>

            <p>
              Manage projects, collaborate with universities and
              discover innovative solutions.
            </p>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="refresh-btn"
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
          >
            <RefreshCw
              size={17}
              className={refreshing ? "spin" : ""}
            />

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>

          <Link
            to="/challenges"
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

          <button onClick={() => fetchDashboardData()}>
            Retry
          </button>
        </div>
      )}

      {/* STATS */}
      <section className="stats-grid">
        <StatCard
          icon={<FolderKanban />}
          title="Total Projects"
          value={stats.totalProjects}
          description="All industry projects"
          className="green"
        />

        <StatCard
          icon={<TrendingUp />}
          title="Active Projects"
          value={stats.activeProjects}
          description="Currently in progress"
          className="blue"
        />

        <StatCard
          icon={<CheckCircle2 />}
          title="Completed"
          value={stats.completedProjects}
          description="Successfully completed"
          className="purple"
        />

        <StatCard
          icon={<Clock3 />}
          title="Pending"
          value={stats.pendingProjects}
          description="Awaiting progress"
          className="orange"
        />

        <StatCard
          icon={<Lightbulb />}
          title="Open Challenges"
          value={stats.openChallenges}
          description="Challenges available"
          className="teal"
        />

        <StatCard
          icon={<Handshake />}
          title="Collaborations"
          value={stats.institutionsCount}
          description="Partner institutions"
          className="indigo"
        />
      </section>

      {/* MAIN GRID */}
      <section className="dashboard-content-grid">
        {/* RECENT PROJECTS */}
        <div className="dashboard-card recent-projects-card">
          <div className="card-header">
            <div>
              <span className="card-label">PROJECT MANAGEMENT</span>
              <h2>Recent Projects</h2>
            </div>

            <Link
              to="/dashboard/industry"
              className="view-all-link"
            >
              View All
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <EmptyState
              icon={<FolderKanban size={34} />}
              title="No projects yet"
              description="Your industry projects will appear here."
            />
          ) : (
            <div className="project-list">
              {recentProjects.map((project, index) => {
                const status = getProjectStatus(project);
                const progress = getProgress(project);

                return (
                  <div
                    className="project-item"
                    key={
                      project?.id ||
                      project?._id ||
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
                          {status.replaceAll("_", " ")}
                        </span>
                      </div>

                      <p className="project-description">
                        {project?.description ||
                          "No project description available."}
                      </p>

                      <div className="project-meta">
                        <span>
                          Updated{" "}
                          {formatDate(
                            project?.updatedAt ||
                              project?.createdAt
                          )}
                        </span>

                        <span>
                          {progress}% complete
                        </span>
                      </div>

                      <div className="progress-container">
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

        {/* COLLABORATION */}
        <div className="dashboard-card collaboration-card">
          <div className="card-header">
            <div>
              <span className="card-label">COLLABORATION</span>
              <h2>Overview</h2>
            </div>

            <div className="card-header-icon">
              <Users size={21} />
            </div>
          </div>

          <div className="overview-list">
            <OverviewRow
              icon={<FolderKanban />}
              title="Total Projects"
              value={stats.totalProjects}
            />

            <OverviewRow
              icon={<TrendingUp />}
              title="Active Projects"
              value={stats.activeProjects}
            />

            <OverviewRow
              icon={<CheckCircle2 />}
              title="Completed Projects"
              value={stats.completedProjects}
            />

            <OverviewRow
              icon={<Clock3 />}
              title="Pending Projects"
              value={stats.pendingProjects}
            />

            <OverviewRow
              icon={<GraduationCap />}
              title="Partner Institutions"
              value={stats.institutionsCount}
            />
          </div>
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="analytics-grid">
        <div className="dashboard-card progress-card">
          <div className="card-header">
            <div>
              <span className="card-label">PERFORMANCE</span>
              <h2>Average Project Progress</h2>
            </div>

            <Target size={22} />
          </div>

          <div className="average-progress">
            <div className="progress-circle">
              <span>{stats.averageProgress}%</span>
              <small>Average</small>
            </div>

            <div className="average-progress-info">
              <h3>Project Completion</h3>

              <p>
                Average progress across all your industry
                projects.
              </p>

              <div className="large-progress-bar">
                <div
                  className="large-progress-fill"
                  style={{
                    width: `${stats.averageProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card impact-card">
          <div className="card-header">
            <div>
              <span className="card-label">IMPACT</span>
              <h2>Industry Impact</h2>
            </div>

            <TrendingUp size={22} />
          </div>

          <div className="impact-grid">
            <ImpactBox
              icon={<BriefcaseBusiness />}
              value={stats.totalProjects}
              label="Projects"
            />

            <ImpactBox
              icon={<GraduationCap />}
              value={stats.institutionsCount}
              label="Institutions"
            />

            <ImpactBox
              icon={<Lightbulb />}
              value={stats.openChallenges}
              label="Open Challenges"
            />

            <ImpactBox
              icon={<Handshake />}
              value={stats.assignedChallenges}
              label="Active Challenges"
            />
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="dashboard-card quick-actions-card">
        <div className="card-header">
          <div>
            <span className="card-label">SHORTCUTS</span>
            <h2>Quick Actions</h2>
          </div>
        </div>

        <div className="quick-actions">
          <QuickAction
            icon={<Lightbulb />}
            title="Explore Challenges"
            description="Find problems that need industry solutions."
            to="/challenges"
          />

          <QuickAction
            icon={<FolderKanban />}
            title="My Projects"
            description="Track and manage your active projects."
            to="/dashboard/industry"
          />

          <QuickAction
            icon={<GraduationCap />}
            title="Universities"
            description="Explore potential academic partners."
            to="/universities"
          />

          <QuickAction
            icon={<Handshake />}
            title="Solutions"
            description="Review innovative solutions."
            to="/solutions"
          />
        </div>
      </section>
    </main>
  );
}

function StatCard({
  icon,
  title,
  value,
  description,
  className = "",
}) {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-card-top">
        <div className="stat-icon">{icon}</div>
      </div>

      <div className="stat-value">{value}</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

function OverviewRow({ icon, title, value }) {
  return (
    <div className="overview-row">
      <div className="overview-left">
        <div className="overview-icon">{icon}</div>
        <span>{title}</span>
      </div>

      <strong>{value}</strong>
    </div>
  );
}

function ImpactBox({ icon, value, label }) {
  return (
    <div className="impact-box">
      <div className="impact-box-icon">{icon}</div>

      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  to,
}) {
  return (
    <Link to={to} className="quick-action">
      <div className="quick-action-icon">{icon}</div>

      <div className="quick-action-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <span className="quick-action-open">→</span>
    </Link>
  );
}

function EmptyState({
  icon,
  title,
  description,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <Link
        to="/challenges"
        className="empty-state-btn"
      >
        Explore Challenges
      </Link>
    </div>
  );
}

export default IndustryDashboard;