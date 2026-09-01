import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===============================
// Components
// ===============================
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LogoutNavbar from "./components/LogoutNavbar";
// ===============================
// Public Pages
// ===============================
import Home from "./pages/Home";
import Challenges from "./pages/Challenges";
import ChallengeDetails from "./pages/ChallengeDetails";
import SubmitChallenge from "./pages/SubmitChallenge";
import Solutions from "./pages/Solutions";
import Universities from "./pages/Universities";
import Industries from "./pages/Industries";

// ===============================
// Auth Pages
// ===============================
import Login from "./pages/Login";
import Register from "./pages/Register";

// ===============================
// Dashboard Pages
// ===============================
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import UniversityDashboard from "./pages/university/UniversityDashboard";
import ProjectWorkspace from "./pages/university/ProjectWorkspace";
import IndustryDashboard from "./pages/industry/IndustryDashboard";
import GovernmentDashboard from "./pages/government/GovernmentDashboard";

// =====================================================
// 404 PAGE
// =====================================================

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for does not exist.
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
// Navbar + Main Content + Footer
// =====================================================

function PublicLayout({ children }) {
  return (
    <div className="app-layout">
      
      {/* Navbar only for public pages */}
      <Navbar />

      {/* Main Content */}
      <main className="app-main">
        {children}
      </main>

      {/* Footer only for public pages */}
      <Footer />

    </div>
  );
}

// =====================================================
// DASHBOARD LAYOUT
// NO Navbar
// NO Footer
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
            PUBLIC ROUTES
        ================================================= */}

        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/challenges"
          element={
            <PublicLayout>
              <Challenges />
            </PublicLayout>
          }
        />

        <Route
          path="/challenges/:id"
          element={
            <PublicLayout>
              <ChallengeDetails />
            </PublicLayout>
          }
        />

        <Route
          path="/submit"
          element={
            <PublicLayout>
              <SubmitChallenge />
            </PublicLayout>
          }
        />

        <Route
          path="/solutions"
          element={
            <PublicLayout>
              <Solutions />
            </PublicLayout>
          }
        />

        <Route
          path="/universities"
          element={
            <PublicLayout>
              <Universities />
            </PublicLayout>
          }
        />

        <Route
          path="/industries"
          element={
            <PublicLayout>
              <Industries />
            </PublicLayout>
          }
        />

        {/* =================================================
            AUTH ROUTES
        ================================================= */}

        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />

        <Route
          path="/register"
          element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          }
        />

        {/* =================================================
            DASHBOARD ROUTES
            Navbar + Footer REMOVED
        ================================================= */}

        {/* Citizen Dashboard */}
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

        {/* University Dashboard */}
        <Route
          path="/dashboard/university"
          element={
            <DashboardLayout>
              <UniversityDashboard />
            </DashboardLayout>
          }
        />

        {/* Industry Dashboard */}
        <Route
          path="/dashboard/industries"
          element={
            <DashboardLayout>
              <IndustryDashboard />
            </DashboardLayout>
          }
        />

        {/* Government Dashboard */}
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
            Navbar + Footer REMOVED
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