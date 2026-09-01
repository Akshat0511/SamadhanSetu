import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Lightbulb,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";


import "./UniversityDashboard.css";

const stats = [
  {
    title: "Active Projects",
    value: "12",
    change: "+3 this month",
    icon: FolderKanban,
  },
  {
    title: "Team Members",
    value: "48",
    change: "+8 this month",
    icon: Users,
  },
  {
    title: "Challenges Solved",
    value: "27",
    change: "+5 this month",
    icon: CheckCircle2,
  },
  {
    title: "Impact Score",
    value: "86%",
    change: "+12% this month",
    icon: TrendingUp,
  },
];

const projects = [
  {
    id: "project-1",
    name: "Smart Water Management",
    challenge: "Water shortage in rural communities",
    progress: 78,
    status: "In Progress",
    members: 8,
    deadline: "15 Sep 2026",
  },
  {
    id: "project-2",
    name: "Rural Healthcare Connect",
    challenge: "Limited healthcare access",
    progress: 62,
    status: "In Progress",
    members: 6,
    deadline: "28 Sep 2026",
  },
  {
    id: "project-3",
    name: "AgriTech Advisory System",
    challenge: "Low agricultural productivity",
    progress: 45,
    status: "In Progress",
    members: 10,
    deadline: "10 Oct 2026",
  },
];

const recommendedChallenges = [
  {
    id: "cmthhov8h00005su8gykmwh9o",
    title: "Smart Waste Management System",
    category: "Environment",
    district: "Ranchi",
    score: 92,
    skills: ["IoT", "AI", "Web Development"],
  },
  {
    id: "challenge-2",
    title: "Digital Education for Rural Students",
    category: "Education",
    district: "Dumka",
    score: 87,
    skills: ["React", "AI", "Mobile Development"],
  },
  {
    id: "challenge-3",
    title: "Agricultural Disease Detection",
    category: "Agriculture",
    district: "Hazaribagh",
    score: 81,
    skills: ["Machine Learning", "Python", "Computer Vision"],
  },
];

const milestones = [
  {
    title: "Research & Requirement Analysis",
    project: "Smart Water Management",
    progress: 100,
    status: "Completed",
  },
  {
    title: "Prototype Development",
    project: "Smart Water Management",
    progress: 80,
    status: "In Progress",
  },
  {
    title: "Field Testing",
    project: "Rural Healthcare Connect",
    progress: 40,
    status: "In Progress",
  },
  {
    title: "Final Deployment",
    project: "AgriTech Advisory System",
    progress: 20,
    status: "Pending",
  },
];

function UniversityDashboard() {
  return (
    <div className="university-dashboard">
   
      <main className="university-main">

        {/* HERO / HEADER */}
        <section className="university-hero">
          <div className="university-container">
            <div className="hero-content">

              <div className="hero-text">
                <div className="partner-badge">
                  <Award size={16} />
                  UNIVERSITY PARTNER
                </div>

                <h1>University Dashboard</h1>

                <p>
                  Manage your university projects, discover relevant community
                  challenges, and collaborate with students, industries and
                  government organizations.
                </p>
              </div>

              <div className="hero-actions">
                <Link to="/challenges" className="primary-button">
                  Find Challenges
                  <ArrowRight size={16} />
                </Link>

                <Link to="/workspace" className="secondary-button">
                  Project Workspace
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* DASHBOARD CONTENT */}
        <section className="university-container dashboard-content">

          {/* STAT CARDS */}
          <div className="stats-grid">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div className="stat-card" key={stat.title}>
                  <div className="stat-card-content">

                    <div>
                      <p className="stat-title">{stat.title}</p>

                      <p className="stat-value">
                        {stat.value}
                      </p>

                      <p className="stat-change">
                        {stat.change}
                      </p>
                    </div>

                    <div className="stat-icon">
                      <Icon size={20} />
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* QUICK ACTIONS */}
          <section className="quick-section">

            <div className="section-heading">
              <h2>Quick Actions</h2>

              <p>
                Quickly access the most important university activities.
              </p>
            </div>

            <div className="quick-grid">

              <Link to="/challenges" className="quick-card">
                <div className="quick-icon">
                  <Target size={20} />
                </div>

                <h3>Explore Challenges</h3>

                <p>
                  Find community problems matching your university expertise.
                </p>

                <div className="card-link">
                  Explore
                  <ArrowRight size={16} />
                </div>
              </Link>

              <Link to="/workspace" className="quick-card">
                <div className="quick-icon">
                  <FolderKanban size={20} />
                </div>

                <h3>Project Workspace</h3>

                <p>
                  Track projects, milestones and student teams.
                </p>

                <div className="card-link">
                  Open Workspace
                  <ArrowRight size={16} />
                </div>
              </Link>

              <Link to="/solutions" className="quick-card">
                <div className="quick-icon">
                  <Lightbulb size={20} />
                </div>

                <h3>View Solutions</h3>

                <p>
                  Explore solutions developed by university teams.
                </p>

                <div className="card-link">
                  View Solutions
                  <ArrowRight size={16} />
                </div>
              </Link>

              <Link to="/universities" className="quick-card">
                <div className="quick-icon">
                  <Users size={20} />
                </div>

                <h3>University Network</h3>

                <p>
                  Connect and collaborate with other institutions.
                </p>

                <div className="card-link">
                  Connect
                  <ArrowRight size={16} />
                </div>
              </Link>

            </div>
          </section>

          {/* PROJECTS + MILESTONES */}
          <section className="projects-layout">

            {/* PROJECTS */}
            <div className="dashboard-panel">

              <div className="panel-header">
                <div>
                  <h2>Active Projects</h2>

                  <p>
                    Projects currently being developed by your teams.
                  </p>
                </div>

                <Link to="/workspace" className="view-all">
                  View All
                </Link>
              </div>

              <div className="projects-list">

                {projects.map((project) => (
                  <div className="project-item" key={project.id}>

                    <div className="project-top">

                      <div>
                        <Link
                          to={`/workspace/${project.id}`}
                          className="project-name"
                        >
                          {project.name}
                        </Link>

                        <p className="project-description">
                          {project.challenge}
                        </p>
                      </div>

                      <span className="project-status">
                        {project.status}
                      </span>

                    </div>

                    {/* PROGRESS */}
                    <div className="progress-section">

                      <div className="progress-label">
                        <span>Progress</span>

                        <strong>
                          {project.progress}%
                        </strong>
                      </div>

                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${project.progress}%`,
                          }}
                        />
                      </div>

                    </div>

                    <div className="project-meta">

                      <span>
                        <Users size={14} />
                        {project.members} members
                      </span>

                      <span>
                        <Clock3 size={14} />
                        Due {project.deadline}
                      </span>

                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* MILESTONES */}
            <div className="dashboard-panel">

              <div className="panel-header milestone-header">
                <div>
                  <h2>Recent Milestones</h2>

                  <p>
                    Latest project development activities.
                  </p>
                </div>
              </div>

              <div className="milestones-container">

                {milestones.map((milestone, index) => (

                  <div
                    className="milestone"
                    key={`${milestone.title}-${index}`}
                  >

                    {index !== milestones.length - 1 && (
                      <div className="milestone-line" />
                    )}

                    <div
                      className={`milestone-icon ${
                        milestone.status === "Completed"
                          ? "completed"
                          : milestone.status === "In Progress"
                          ? "in-progress"
                          : "pending"
                      }`}
                    >
                      {milestone.status === "Completed" ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <Clock3 size={16} />
                      )}
                    </div>

                    <div className="milestone-content">

                      <h3>{milestone.title}</h3>

                      <p>{milestone.project}</p>

                      <div className="milestone-progress">

                        <div className="small-progress">
                          <div
                            className="small-progress-fill"
                            style={{
                              width: `${milestone.progress}%`,
                            }}
                          />
                        </div>

                        <span>
                          {milestone.progress}%
                        </span>

                      </div>

                    </div>

                  </div>

                ))}

              </div>
            </div>

          </section>

          {/* AI RECOMMENDATIONS */}
          <section className="recommendations-section">

            <div className="recommendation-heading">

              <div>
                <div className="ai-label">
                  <Lightbulb size={16} />
                  AI MATCHING
                </div>

                <h2>Recommended Challenges</h2>

                <p>
                  Challenges selected based on your university's research
                  areas and departments.
                </p>
              </div>

              <Link
                to="/challenges"
                className="view-all recommendation-view"
              >
                View all challenges
                <ArrowRight size={16} />
              </Link>

            </div>

            <div className="recommendation-grid">

              {recommendedChallenges.map((challenge) => (

                <Link
                  key={challenge.id}
                  to={`/challenges/${challenge.id}`}
                  className="recommendation-card"
                >

                  <div className="recommendation-top">

                    <span className="category-badge">
                      {challenge.category}
                    </span>

                    <span className="match-badge">
                      <BarChart3 size={14} />
                      {challenge.score}% Match
                    </span>

                  </div>

                  <h3>
                    {challenge.title}
                  </h3>

                  <p className="district">
                    📍 {challenge.district}
                  </p>

                  <div className="skills">

                    {challenge.skills.map((skill) => (
                      <span key={skill}>
                        {skill}
                      </span>
                    ))}

                  </div>

                  <div className="recommendation-link">
                    View Challenge
                    <ArrowRight size={16} />
                  </div>

                </Link>

              ))}

            </div>
          </section>

          {/* COLLABORATION BANNER */}
          <section className="collaboration-banner">

            <div className="collaboration-content">

              <div>
                <p className="collaboration-label">
                  COLLABORATE FOR IMPACT
                </p>

                <h2>
                  Turn research into real-world solutions.
                </h2>

                <p>
                  Connect your students and researchers with real community
                  challenges and industry partners across Jharkhand.
                </p>
              </div>

              <Link
                to="/challenges"
                className="collaboration-button"
              >
                Start Collaborating
                <ArrowRight size={16} />
              </Link>

            </div>

          </section>

        </section>
      </main>

      
    </div>
  );
}

export default UniversityDashboard;