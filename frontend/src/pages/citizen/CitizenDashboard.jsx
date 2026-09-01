import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  Lightbulb,
  MapPin,
  Plus,
  Rocket,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";



import "./CitizenDashboard.css";

const stats = [
  {
    label: "Challenges Submitted",
    value: "12",
    icon: FileText,
    description: "+3 this month",
  },
  {
    label: "Under Review",
    value: "4",
    icon: Clock3,
    description: "Being evaluated",
  },
  {
    label: "Solutions Found",
    value: "5",
    icon: CheckCircle2,
    description: "Successfully matched",
  },
  {
    label: "Community Impact",
    value: "87%",
    icon: TrendingUp,
    description: "Positive progress",
  },
];

const challenges = [
  {
    id: "1",
    title: "Clean Drinking Water in Rural Areas",
    category: "Water Management",
    district: "Gumla",
    status: "In Review",
    statusClass: "review",
    submitted: "2 days ago",
    progress: 35,
  },
  {
    id: "2",
    title: "Smart Waste Management System",
    category: "Environment",
    district: "Ranchi",
    status: "Matched",
    statusClass: "matched",
    submitted: "6 days ago",
    progress: 65,
  },
  {
    id: "3",
    title: "Digital Education for Rural Students",
    category: "Education",
    district: "Latehar",
    status: "Solution in Progress",
    statusClass: "progress",
    submitted: "12 days ago",
    progress: 78,
  },
  {
    id: "4",
    title: "Affordable Healthcare Access",
    category: "Healthcare",
    district: "Hazaribagh",
    status: "Resolved",
    statusClass: "resolved",
    submitted: "1 month ago",
    progress: 100,
  },
];

const recommendations = [
  {
    title: "Solar Water Pumping System",
    category: "Water & Agriculture",
    location: "Khunti",
    match: "94%",
    icon: Lightbulb,
  },
  {
    title: "AI-Based Crop Disease Detection",
    category: "Agriculture",
    location: "Simdega",
    match: "91%",
    icon: Rocket,
  },
  {
    title: "Rural Telemedicine Network",
    category: "Healthcare",
    location: "West Singhbhum",
    match: "87%",
    icon: Users,
  },
];

const notifications = [
  {
    text: "Your water management challenge received a new update.",
    time: "2 hours ago",
  },
  {
    text: "A university has been matched with your challenge.",
    time: "Yesterday",
  },
  {
    text: "Your challenge has moved to solution development.",
    time: "2 days ago",
  },
];

function CitizenDashboard() {
  return (
    <div className="citizen-dashboard">
     

      <main className="citizen-main">
        <div className="citizen-container">

          {/* Header */}
          <section className="dashboard-header">
            <div className="breadcrumb">
              <span>Dashboard</span>
              <span>/</span>
              <span className="active">Citizen</span>
            </div>

            <div className="header-content">
              <div>
                <h1>Welcome back, Citizen 👋</h1>

                <p>
                  Track your submitted challenges, discover solutions and see
                  how your contributions are creating an impact.
                </p>
              </div>

              <div className="header-actions">
                <Link
                  to="/challenges"
                  className="secondary-btn"
                >
                  <Search size={17} />
                  Explore Challenges
                </Link>

                <Link
                  to="/submit"
                  className="primary-btn"
                >
                  <Plus size={17} />
                  Submit Challenge
                </Link>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="stats-grid">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div className="stat-card" key={stat.label}>
                  <div className="stat-top">
                    <div className="stat-icon">
                      <Icon size={20} />
                    </div>

                    <TrendingUp
                      size={16}
                      className="stat-trend"
                    />
                  </div>

                  <div className="stat-value">
                    {stat.value}
                  </div>

                  <div className="stat-label">
                    {stat.label}
                  </div>

                  <div className="stat-description">
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Main Grid */}
          <div className="dashboard-grid">

            {/* Left */}
            <div className="dashboard-left">

              {/* My Challenges */}
              <section className="dashboard-section">

                <div className="section-header">
                  <div>
                    <h2>My Challenges</h2>
                    <p>
                      Track the progress of challenges you submitted.
                    </p>
                  </div>

                  <Link to="/challenges" className="view-all">
                    View all
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="challenge-list">
                  {challenges.map((challenge) => (
                    <div
                      className="challenge-item"
                      key={challenge.id}
                    >
                      <div className="challenge-main">

                        <div className="challenge-content">

                          <div className="challenge-tags">
                            <span
                              className={`status-badge ${challenge.statusClass}`}
                            >
                              {challenge.status}
                            </span>

                            <span className="category-badge">
                              {challenge.category}
                            </span>
                          </div>

                          <h3>{challenge.title}</h3>

                          <div className="challenge-meta">
                            <span>
                              <MapPin size={14} />
                              {challenge.district}
                            </span>

                            <span>
                              Submitted {challenge.submitted}
                            </span>
                          </div>
                        </div>

                        <Link
                          to={`/challenges/${challenge.id}`}
                          className="details-link"
                        >
                          Details
                          <ArrowRight size={16} />
                        </Link>
                      </div>

                      {/* Progress */}
                      <div className="progress-container">
                        <div className="progress-header">
                          <span>Solution Progress</span>
                          <strong>
                            {challenge.progress}%
                          </strong>
                        </div>

                        <div className="progress-track">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${challenge.progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recommendations */}
              <section
                id="recommendations"
                className="dashboard-section"
              >
                <div className="section-header recommendation-header">
                  <div className="recommendation-title">
                    <div className="section-icon">
                      <Lightbulb size={20} />
                    </div>

                    <div>
                      <h2>Recommended Solutions</h2>

                      <p>
                        Solutions and projects relevant to your interests.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="recommendation-grid">
                  {recommendations.map((recommendation) => {
                    const Icon = recommendation.icon;

                    return (
                      <div
                        className="recommendation-card"
                        key={recommendation.title}
                      >
                        <div className="recommendation-top">
                          <div className="recommendation-icon">
                            <Icon size={19} />
                          </div>

                          <span className="match-badge">
                            {recommendation.match}
                          </span>
                        </div>

                        <h3>{recommendation.title}</h3>

                        <p>{recommendation.category}</p>

                        <div className="location">
                          <MapPin size={14} />
                          {recommendation.location}
                        </div>

                        <Link
                          to="/solutions"
                          className="solution-link"
                        >
                          View solution
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <aside className="dashboard-sidebar">

              {/* Profile */}
              <div className="sidebar-card profile-card">

                <div className="profile-info">
                  <div className="profile-avatar">
                    C
                  </div>

                  <div>
                    <h2>Citizen User</h2>
                    <p>Community Contributor</p>
                  </div>
                </div>

                <div className="contribution-box">
                  <p>Your contribution score</p>

                  <div className="score-row">
                    <strong>780</strong>
                    <span>Top 15%</span>
                  </div>

                  <div className="score-track">
                    <div className="score-progress" />
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="sidebar-card">

                <div className="sidebar-header">
                  <div className="sidebar-icon">
                    <Bell size={16} />
                  </div>

                  <div>
                    <h2>Recent Updates</h2>
                    <p>Latest activity</p>
                  </div>
                </div>

                <div className="notification-list">
                  {notifications.map((notification, index) => (
                    <div
                      className="notification"
                      key={`${notification.text}-${index}`}
                    >
                      <div className="notification-icon">
                        <Bell size={14} />
                      </div>

                      <div>
                        <p>{notification.text}</p>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="sidebar-card">

                <h2 className="quick-title">
                  Quick Actions
                </h2>

                <div className="quick-actions">

                  <Link
                    to="/submit"
                    className="quick-action primary-action"
                  >
                    <span>
                      <Plus size={16} />
                      Submit Challenge
                    </span>

                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    to="/solutions"
                    className="quick-action"
                  >
                    <span>
                      <Rocket size={16} />
                      Browse Solutions
                    </span>

                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    to="/universities"
                    className="quick-action"
                  >
                    <span>
                      <Building2 size={16} />
                      Find Universities
                    </span>

                    <ArrowRight size={16} />
                  </Link>

                </div>
              </div>

            </aside>
          </div>
        </div>
      </main>

    </div>
  );
}

export default CitizenDashboard;