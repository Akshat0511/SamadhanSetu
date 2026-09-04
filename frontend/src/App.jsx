
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// =====================================================
// PUBLIC PAGES
// =====================================================

import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ChallengeDetails from "./pages/ChallengeDetails";
import SubmitChallenge from "./pages/SubmitChallenge";
import Solutions from "./pages/Solutions";
import Universities from "./pages/Universities";
import Industries from "./pages/Industries";

// =====================================================
// AUTH PAGES
// =====================================================

import Login from "./pages/Login";
import Register from "./pages/Register";

// =====================================================
// GOVERNMENT
// =====================================================

import GovernmentLogin from "./pages/government/GovernmentLogin";
import GovernmentRegister from "./pages/government/GovernmentRegister";
import GovernmentDashboard from "./pages/government/GovernmentDashboard";

// =====================================================
// AI MATCHING
// =====================================================

import AIMatching from "./pages/AIMatching/AIMatching";

// =====================================================
// DASHBOARDS
// =====================================================

import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import UniversityDashboard from "./pages/university/UniversityDashboard";
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import ProjectWorkspace from "./pages/university/ProjectWorkspace";

// =====================================================
// COMPONENTS
// =====================================================

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LogoutNavbar from "./components/LogoutNavbar";

// =====================================================
// 404
// =====================================================

function NotFound() {
  return (
    <div className="not-found-page">

      <div className="not-found-content">

        <h1>404</h1>

        <h2>
          Page Not Found
        </h2>

        <p>
          The page you are looking for
          does not exist.
        </p>

        <a href="/">
          Go Home
        </a>

      </div>

    </div>
  );
}

// =====================================================
// PUBLIC LAYOUT
// =====================================================

function PublicLayout({ children }) {
  return (
    <div className="app-layout">

      <Navbar />

      <main className="app-main">
        {children}
      </main>

      <Footer />

    </div>
  );
}

// =====================================================
// DASHBOARD LAYOUT
// =====================================================

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">

      <LogoutNavbar />

      <main className="dashboard-main">
        {children}
      </main>

    </div>
  );
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        {/* =================================================
            CHALLENGES LIST
        ================================================= */}

        <Route
          path="/challenges"
          element={
            <PublicLayout>
              <Challenges />
            </PublicLayout>
          }
        />

        {/* =================================================
            CHALLENGE DETAILS
        ================================================= */}

        <Route
          path="/challenges/:id"
          element={
            <PublicLayout>
              <ChallengeDetails />
            </PublicLayout>
          }
        />

        {/* =================================================
            SUBMIT CHALLENGE
        ================================================= */}

        <Route
          path="/submit"
          element={
            <DashboardLayout>
              <SubmitChallenge />
            </DashboardLayout>
          }
        />

        {/* =================================================
            SOLUTIONS
        ================================================= */}

        <Route
          path="/solutions"
          element={
            <PublicLayout>
              <Solutions />
            </PublicLayout>
          }
        />

        {/* =================================================
            UNIVERSITIES
        ================================================= */}

        <Route
          path="/universities"
          element={
            <PublicLayout>
              <Universities />
            </PublicLayout>
          }
        />

        {/* =================================================
            INDUSTRIES
        ================================================= */}

        <Route
          path="/industries"
          element={
            <PublicLayout>
              <Industries />
            </PublicLayout>
          }
        />

        {/* =================================================
            AUTH
        ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =================================================
            GOVERNMENT AUTH
        ================================================= */}

        <Route
          path="/government/login"
          element={
            <GovernmentLogin />
          }
        />

        <Route
          path="/government/register"
          element={
            <GovernmentRegister />
          }
        />

        {/* =================================================
            AI MATCHING
        ================================================= */}

        <Route
          path="/ai-matching/:challengeId"
          element={
            <DashboardLayout>
              <AIMatching />
            </DashboardLayout>
          }
        />

        {/* =================================================
            CITIZEN DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <CitizenDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard/citizen"
          element={
            <DashboardLayout>
              <CitizenDashboard />
            </DashboardLayout>
          }
        />

        {/* =================================================
            UNIVERSITY DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard/university"
          element={
            <DashboardLayout>
              <UniversityDashboard />
            </DashboardLayout>
          }
        />

        {/* =================================================
            INDUSTRY DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard/industry"
          element={
            <DashboardLayout>
              <IndustryDashboard />
            </DashboardLayout>
          }
        />

        {/* =================================================
            GOVERNMENT DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard/government"
          element={
            <DashboardLayout>
              <GovernmentDashboard />
            </DashboardLayout>
          }
        />

        {/* =================================================
            PROJECT WORKSPACE
        ================================================= */}

        <Route
          path="/workspace"
          element={
            <DashboardLayout>
              <ProjectWorkspace />
            </DashboardLayout>
          }
        />

        <Route
          path="/workspace/:projectId"
          element={
            <DashboardLayout>
              <ProjectWorkspace />
            </DashboardLayout>
          }
        />

        {/* =================================================
            404
        ================================================= */}

        <Route
          path="*"
          element={
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

