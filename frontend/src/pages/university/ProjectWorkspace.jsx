import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Lightbulb,
  MessageSquare,
  Plus,
  Target,
  UserPlus,
  Users,
  Building2,
  TrendingUp,
} from "lucide-react";


import "./ProjectWorkspace.css";

const projectData = {
  "project-1": {
    name: "Smart Water Management",
    description:
      "An intelligent water management solution designed to monitor water usage, detect leakage and improve water availability in rural communities.",
    challenge: "Water shortage in rural communities",
    category: "Water Management",
    district: "Ranchi",
    progress: 78,
    status: "In Progress",
    startDate: "01 Aug 2026",
    deadline: "15 Sep 2026",
    university: "BIT Mesra",
    industry: "Tata Technologies",
    impact:
      "Expected to improve water utilization and reduce water wastage in rural areas.",
  },

  "project-2": {
    name: "Rural Healthcare Connect",
    description:
      "A digital healthcare platform connecting rural communities with healthcare professionals through telemedicine and appointment services.",
    challenge: "Limited healthcare access",
    category: "Healthcare",
    district: "Dumka",
    progress: 62,
    status: "In Progress",
    startDate: "05 Aug 2026",
    deadline: "28 Sep 2026",
    university: "BIT Mesra",
    industry: "HealthTech Partner",
    impact:
      "Expected to improve access to primary healthcare services in remote communities.",
  },

  "project-3": {
    name: "AgriTech Advisory System",
    description:
      "An AI-powered agricultural advisory platform helping farmers identify crop diseases and receive personalized farming recommendations.",
    challenge: "Low agricultural productivity",
    category: "Agriculture",
    district: "Hazaribagh",
    progress: 45,
    status: "In Progress",
    startDate: "10 Aug 2026",
    deadline: "10 Oct 2026",
    university: "BIT Mesra",
    industry: "AgriTech Solutions",
    impact:
      "Expected to improve crop productivity and help farmers make better decisions.",
  },
};

const defaultProject = {
  name: "Smart Water Management",
  description:
    "An intelligent solution for solving a community water management challenge.",
  challenge: "Community water management",
  category: "Water Management",
  district: "Ranchi",
  progress: 78,
  status: "In Progress",
  startDate: "01 Aug 2026",
  deadline: "15 Sep 2026",
  university: "BIT Mesra",
  industry: "Industry Partner",
  impact: "Expected to create measurable community impact.",
};

const members = [
  {
    name: "Rahul Kumar",
    role: "Project Lead",
    department: "Computer Science",
    initials: "RK",
  },
  {
    name: "Priya Singh",
    role: "AI/ML Developer",
    department: "Computer Science",
    initials: "PS",
  },
  {
    name: "Aman Verma",
    role: "Backend Developer",
    department: "Information Technology",
    initials: "AV",
  },
  {
    name: "Sneha Kumari",
    role: "Research Lead",
    department: "Environmental Science",
    initials: "SK",
  },
  {
    name: "Aditya Raj",
    role: "Frontend Developer",
    department: "Computer Science",
    initials: "AR",
  },
];

const milestones = [
  {
    id: 1,
    title: "Problem Research",
    description:
      "Study the problem, identify requirements and collect field information.",
    progress: 100,
    status: "Completed",
    date: "05 Aug 2026",
  },
  {
    id: 2,
    title: "Requirement Analysis",
    description:
      "Analyze user requirements and finalize the technical solution.",
    progress: 100,
    status: "Completed",
    date: "10 Aug 2026",
  },
  {
    id: 3,
    title: "Prototype Development",
    description:
      "Develop the initial working prototype and core application features.",
    progress: 80,
    status: "In Progress",
    date: "25 Aug 2026",
  },
  {
    id: 4,
    title: "Field Testing",
    description:
      "Test the solution with selected communities and collect feedback.",
    progress: 30,
    status: "In Progress",
    date: "05 Sep 2026",
  },
  {
    id: 5,
    title: "Final Deployment",
    description:
      "Deploy the final solution and measure its real-world impact.",
    progress: 0,
    status: "Pending",
    date: "15 Sep 2026",
  },
];

const activities = [
  {
    text: "Prototype development milestone updated to 80%",
    time: "2 hours ago",
  },
  {
    text: "Priya Singh joined the project team",
    time: "1 day ago",
  },
  {
    text: "Industry partner submitted technical feedback",
    time: "2 days ago",
  },
  {
    text: "Requirement analysis milestone completed",
    time: "4 days ago",
  },
];

function ProjectWorkspace() {
  const { id } = useParams();

  const project = projectData[id] || defaultProject;

  return (
    <div className="project-page">
  

      <main className="project-main">

        {/* HEADER */}
        <section className="project-header">
          <div className="project-container">

            <Link
              to="/dashboard/university"
              className="back-link"
            >
              <ArrowLeft size={16} />
              Back to University Dashboard
            </Link>

            <div className="project-header-content">

              <div className="project-header-info">

                <div className="project-badges">
                  <span className="category-badge">
                    {project.category}
                  </span>

                  <span className="status-badge">
                    {project.status}
                  </span>
                </div>

                <h1>{project.name}</h1>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-meta">

                  <span>
                    <Target size={16} />
                    {project.challenge}
                  </span>

                  <span>
                    <Building2 size={16} />
                    {project.university}
                  </span>

                  <span>
                    📍 {project.district}
                  </span>

                </div>
              </div>

              <div className="header-actions">

                <button className="secondary-btn">
                  <MessageSquare size={16} />
                  Discussion
                </button>

                <button className="primary-btn">
                  <Plus size={16} />
                  Add Milestone
                </button>

              </div>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="project-content">
          <div className="project-container">

            <div className="project-grid">

              {/* LEFT COLUMN */}
              <div className="left-column">

                {/* PROJECT PROGRESS */}
                <div className="project-card progress-card">

                  <div className="progress-header">

                    <div>
                      <div className="section-title">
                        <TrendingUp size={20} />
                        <h2>Project Progress</h2>
                      </div>

                      <p>
                        Overall completion of the project.
                      </p>
                    </div>

                    <div className="progress-number">
                      {project.progress}%
                    </div>
                  </div>

                  <div className="progress-bar-large">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>

                  <div className="date-grid">

                    <div className="info-box">
                      <span>Start Date</span>
                      <strong>{project.startDate}</strong>
                    </div>

                    <div className="info-box">
                      <span>Deadline</span>
                      <strong>{project.deadline}</strong>
                    </div>

                    <div className="info-box">
                      <span>Current Status</span>
                      <strong className="primary-text">
                        {project.status}
                      </strong>
                    </div>

                  </div>
                </div>

                {/* MILESTONES */}
                <div className="project-card">

                  <div className="card-header">

                    <div>
                      <h2>Milestones</h2>
                      <p>Track important project stages.</p>
                    </div>

                    <button className="small-primary-btn">
                      <Plus size={16} />
                      Add
                    </button>

                  </div>

                  <div className="milestones">

                    {milestones.map((milestone, index) => (

                      <div
                        className="milestone"
                        key={milestone.id}
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

                          <div className="milestone-top">

                            <div>
                              <h3>{milestone.title}</h3>

                              <p>
                                {milestone.description}
                              </p>
                            </div>

                            <span
                              className={`milestone-status ${
                                milestone.status
                                  .toLowerCase()
                                  .replace(" ", "-")
                              }`}
                            >
                              {milestone.status}
                            </span>

                          </div>

                          <div className="milestone-progress">

                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{
                                  width: `${milestone.progress}%`,
                                }}
                              />
                            </div>

                            <span>
                              {milestone.progress}%
                            </span>

                          </div>

                          <div className="milestone-date">
                            <CalendarDays size={14} />
                            {milestone.date}
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CHALLENGE INFORMATION */}
                <div className="project-card">

                  <div className="section-title">
                    <Target size={20} />
                    <h2>Challenge Information</h2>
                  </div>

                  <div className="challenge-box">

                    <span>Solving Challenge</span>

                    <h3>{project.challenge}</h3>

                    <div className="challenge-details">

                      <div>
                        <small>Category</small>
                        <strong>{project.category}</strong>
                      </div>

                      <div>
                        <small>Location</small>
                        <strong>
                          {project.district}, Jharkhand
                        </strong>
                      </div>

                    </div>
                  </div>

                  <div className="impact">

                    <strong>Expected Impact</strong>

                    <p>{project.impact}</p>

                  </div>

                  <Link
                    to={`/challenges/${id || "project-1"}`}
                    className="challenge-link"
                  >
                    View Challenge Details
                    <ArrowRight size={16} />
                  </Link>

                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="right-column">

                {/* TEAM MEMBERS */}
                <div className="project-card team-card">

                  <div className="card-header">

                    <div>
                      <h2>Project Team</h2>

                      <p>
                        {members.length} members working on this project.
                      </p>
                    </div>

                    <button className="icon-btn">
                      <UserPlus size={16} />
                    </button>

                  </div>

                  <div className="team-list">

                    {members.map((member) => (

                      <div
                        className="team-member"
                        key={member.name}
                      >

                        <div className="member-avatar">
                          {member.initials}
                        </div>

                        <div className="member-info">

                          <strong>{member.name}</strong>

                          <span>{member.role}</span>

                          <small>{member.department}</small>

                        </div>

                      </div>
                    ))}
                  </div>

                  <div className="team-footer">

                    <button className="add-member-btn">
                      <UserPlus size={16} />
                      Add Team Member
                    </button>

                  </div>
                </div>

                {/* PARTNERS */}
                <div className="project-card">

                  <h2>Project Partners</h2>

                  <div className="partners">

                    <div className="partner-box">

                      <div className="partner-icon">
                        <Building2 size={20} />
                      </div>

                      <div>
                        <small>University</small>
                        <strong>{project.university}</strong>
                      </div>

                    </div>

                    <div className="partner-box">

                      <div className="partner-icon">
                        <Users size={20} />
                      </div>

                      <div>
                        <small>Industry Partner</small>
                        <strong>{project.industry}</strong>
                      </div>

                    </div>

                  </div>
                </div>

                {/* DOCUMENTS */}
                <div className="project-card">

                  <div className="card-header">

                    <div>
                      <h2>Project Documents</h2>

                      <p>Important project files.</p>
                    </div>

                    <button className="icon-btn">
                      <Plus size={16} />
                    </button>

                  </div>

                  <div className="documents">

                    <DocumentItem
                      title="Project Proposal"
                      subtitle="PDF • 2.4 MB"
                    />

                    <DocumentItem
                      title="Requirement Document"
                      subtitle="PDF • 1.8 MB"
                    />

                    <DocumentItem
                      title="Research Report"
                      subtitle="PDF • 3.1 MB"
                    />

                  </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="project-card">

                  <div className="section-title">
                    <Clock3 size={20} />
                    <h2>Recent Activity</h2>
                  </div>

                  <div className="activities">

                    {activities.map((activity, index) => (

                      <div
                        className="activity"
                        key={`${activity.text}-${index}`}
                      >

                        <div className="activity-dot" />

                        <div>
                          <p>{activity.text}</p>

                          <span>{activity.time}</span>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                {/* ACTION CARD */}
                <div className="action-card">

                  <div className="action-icon">
                    <Lightbulb size={20} />
                  </div>

                  <h2>Keep the project moving</h2>

                  <p>
                    Update milestones regularly and collaborate with your
                    industry partner to achieve maximum community impact.
                  </p>

                  <button>
                    Update Progress
                    <ArrowRight size={16} />
                  </button>

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

     
    </div>
  );
}

function DocumentItem({ title, subtitle }) {
  return (
    <button className="document-item" type="button">

      <div className="document-icon">
        <FileText size={16} />
      </div>

      <div>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>

    </button>
  );
}

export default ProjectWorkspace;