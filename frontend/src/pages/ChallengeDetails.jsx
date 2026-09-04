// src/pages/ChallengeDetails.jsx

import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Factory,
  Loader2,
  MapPin,
  Sparkles,
  Target,
  Users,
  AlertCircle,
} from "lucide-react";

import {
  analyzeChallenge,
  getChallengeMatching,
} from "../services/api";

import "./ChallengeDetails.css";

// =====================================================
// API BASE URL
// =====================================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

// =====================================================
// MAIN COMPONENT
// =====================================================

function ChallengeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [challenge, setChallenge] = useState(null);

  const [matching, setMatching] = useState(null);

  const [loading, setLoading] = useState(true);

  const [analysisLoading, setAnalysisLoading] =
    useState(false);

  const [matchingLoading, setMatchingLoading] =
    useState(false);

  const [error, setError] = useState("");

  const [analysisError, setAnalysisError] =
    useState("");

  const [matchingError, setMatchingError] =
    useState("");

  // =====================================================
  // FETCH CHALLENGE
  // =====================================================

  useEffect(() => {
    if (id) {
      fetchChallenge();
    }
  }, [id]);

  const fetchChallenge = async () => {
    try {
      setLoading(true);
      setError("");

      if (!id) {
        throw new Error(
          "Challenge ID is missing"
        );
      }

      const response = await fetch(
        `${API_BASE_URL}/challenges/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch challenge"
        );
      }

      const challengeData =
        data.challenge || data;

      setChallenge(challengeData);

    } catch (err) {
      console.error(
        "Challenge details error:",
        err
      );

      setError(
        err.message ||
          "Unable to load challenge details"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RUN AI ANALYSIS
  // =====================================================

  const runAnalysis = async () => {
    try {
      setAnalysisLoading(true);
      setAnalysisError("");

      if (!id) {
        throw new Error(
          "Challenge ID is missing"
        );
      }

      const data =
        await analyzeChallenge(id);

      console.log(
        "AI ANALYSIS RESULT:",
        data
      );

      if (!data?.success) {
        throw new Error(
          data?.message ||
            "AI analysis failed"
        );
      }

      // Get analysis from different possible
      // backend response structures

      const newAnalysis =
        data.aiAnalysis ||
        data.analysis ||
        data.data?.aiAnalysis ||
        data.data?.analysis ||
        null;

      if (!newAnalysis) {
        throw new Error(
          "AI analysis was completed but no analysis data was returned."
        );
      }

      // Update challenge with AI analysis

      setChallenge((prev) => ({
        ...prev,
        aiAnalysis: newAnalysis,
      }));

    } catch (err) {
      console.error(
        "AI ANALYSIS ERROR:",
        err
      );

      setAnalysisError(
        err.response?.data?.message ||
          err.message ||
          "Unable to analyze challenge"
      );
    } finally {
      setAnalysisLoading(false);
    }
  };

  // =====================================================
  // RUN AI MATCHING
  // =====================================================

  const runMatching = async () => {
    try {
      setMatchingLoading(true);
      setMatchingError("");

      if (!id) {
        throw new Error(
          "Challenge ID is missing"
        );
      }

      const data =
        await getChallengeMatching(id);

      console.log(
        "AI MATCHING RESULT:",
        data
      );

      if (!data?.success) {
        throw new Error(
          data?.message ||
            "Matching failed"
        );
      }

      setMatching(data);

    } catch (err) {
      console.error(
        "AI MATCHING ERROR:",
        err
      );

      setMatchingError(
        err.response?.data?.message ||
          err.message ||
          "Unable to find matching universities"
      );
    } finally {
      setMatchingLoading(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="challenge-page challenge-loading">
        <div className="loading-content">
          <Loader2 className="loading-spinner" />

          <p>
            Loading challenge details...
          </p>
        </div>
      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !challenge) {
    return (
      <main className="challenge-page">
        <div className="error-container">
          <div className="error-card">

            <AlertCircle className="error-icon" />

            <h1>
              Challenge Not Found
            </h1>

            <p>
              {error ||
                "The requested challenge does not exist."}
            </p>

            <div className="error-actions">

              <button
                onClick={fetchChallenge}
                className="primary-button"
              >
                Try Again
              </button>

              <button
                onClick={() =>
                  navigate("/challenges")
                }
                className="secondary-button"
              >
                Back to Challenges
              </button>

            </div>

          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // DATA
  // =====================================================

  const analysis =
    matching?.aiAnalysis ||
    challenge.aiAnalysis ||
    challenge.analysis ||
    null;

  const recommendedSkills =
    analysis?.recommendedSkills || [];

  const universities =
    matching?.universities ||
    challenge.universities ||
    challenge.recommendedUniversities ||
    [];

  const industries =
    matching?.industries ||
    challenge.industryPartners ||
    challenge.industries ||
    [];

  const priority = String(
    challenge.priority || "MEDIUM"
  ).toUpperCase();

  const status = String(
    challenge.status || "PENDING"
  ).toUpperCase();

  // =====================================================
  // CONFIDENCE
  // =====================================================

  const confidence =
    analysis?.confidence !== undefined
      ? Number(analysis.confidence)
      : null;

  const confidenceText =
    confidence !== null
      ? confidence <= 1
        ? `${Math.round(confidence * 100)}%`
        : `${Math.round(confidence)}%`
      : null;

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <main className="challenge-page">

      <div className="challenge-container">

        {/* =================================================
            BACK
        ================================================= */}

        <Link
          to="/challenges"
          className="back-link"
        >
          <ArrowLeft className="icon-sm" />
          Back to Challenges
        </Link>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="challenge-hero-card">

          <div className="challenge-hero">

            <div className="hero-inner">

              <div className="hero-tags">

                <span>
                  {challenge.category ||
                    "General"}
                </span>

                <span>
                  {status}
                </span>

                <span>
                  {priority} Priority
                </span>

              </div>

              <h1>
                {challenge.title ||
                  challenge.name ||
                  "Untitled Challenge"}
              </h1>

              <div className="hero-meta">

                {challenge.district && (
                  <div>
                    <MapPin className="icon-sm" />

                    {challenge.district}
                  </div>
                )}

                {challenge.createdAt && (
                  <div>
                    Submitted{" "}

                    {new Date(
                      challenge.createdAt
                    ).toLocaleDateString()}
                  </div>
                )}

              </div>

            </div>

          </div>

          <div className="challenge-description-grid">

            <div>

              <h2>
                Problem Description
              </h2>

              <p className="description-text">
                {challenge.description ||
                  "No description available for this challenge."}
              </p>

            </div>

            <div className="quick-stats">

              <InfoCard
                icon={Target}
                label="Priority"
                value={priority}
              />

              <InfoCard
                icon={MapPin}
                label="District"
                value={
                  challenge.district ||
                  "Not specified"
                }
              />

              <InfoCard
                icon={CheckCircle2}
                label="Status"
                value={status}
              />

            </div>

          </div>

        </section>

        {/* =================================================
            AI ANALYSIS
        ================================================= */}

        <section className="content-card ai-analysis-card">

          <div className="analysis-header">

            <div className="section-title-group">

              <div className="section-icon primary-icon">

                <Sparkles className="icon-md" />

              </div>

              <div>

                <h2>
                  AI Challenge Analysis
                </h2>

                <p>
                  AI-powered understanding
                  of this challenge
                </p>

              </div>

            </div>

            {confidenceText && (
              <div className="confidence-badge">
                Confidence: {confidenceText}
              </div>
            )}

          </div>

          {/* =================================================
              NO ANALYSIS
          ================================================= */}

          {!analysis && (

            <div className="empty-match">

              <AlertCircle className="empty-icon" />

              <p>
                Challenge has not been analyzed yet.
              </p>

              <button
                onClick={runAnalysis}
                disabled={analysisLoading}
                className="solution-button"
              >

                {analysisLoading ? (
                  <>
                    <Loader2 className="icon-sm loading-spinner" />

                    Analyzing Challenge...
                  </>
                ) : (
                  <>
                    <Sparkles className="icon-sm" />

                    Analyze Challenge
                  </>
                )}

              </button>

              {analysisError && (
                <div className="matching-error">

                  <AlertCircle className="icon-sm" />

                  <span>
                    {analysisError}
                  </span>

                </div>
              )}

            </div>

          )}

          {/* =================================================
              ANALYSIS RESULT
          ================================================= */}

          {analysis && (
            <>

              <div className="analysis-grid">

                <AnalysisCard
                  title="Category"
                  value={
                    analysis.category ||
                    challenge.category ||
                    "Not available"
                  }
                />

                <AnalysisCard
                  title="AI Priority"
                  value={
                    analysis.priority ||
                    challenge.priority ||
                    "Not available"
                  }
                />

                <AnalysisCard
                  title="Impact Score"
                  value={
                    analysis.impactScore !==
                    undefined
                      ? `${analysis.impactScore}/100`
                      : "Not available"
                  }
                />

              </div>

              {recommendedSkills.length > 0 && (

                <div className="skills-section">

                  <h3>
                    Recommended Skills
                  </h3>

                  <div className="skills-list">

                    {recommendedSkills.map(
                      (skill, index) => (

                        <span
                          key={`${skill}-${index}`}
                        >
                          {skill}
                        </span>

                      )
                    )}

                  </div>

                </div>

              )}

              <div className="matching-action">

                <button
                  onClick={runAnalysis}
                  disabled={analysisLoading}
                  className="solution-button"
                >

                  {analysisLoading ? (
                    <>
                      <Loader2 className="icon-sm loading-spinner" />

                      Re-analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="icon-sm" />

                      Re-analyze Challenge
                    </>
                  )}

                </button>

              </div>

            </>
          )}

        </section>

        {/* =================================================
            AI MATCHING
        ================================================= */}

        <section className="matching-section">

          <div className="matching-heading">

            <div className="section-icon ai-icon">

              <Sparkles className="icon-md" />

            </div>

            <div>

              <h2>
                AI-Powered Matching
              </h2>

              <p>
                Find universities and
                industry partners that
                are best suited to solve
                this challenge.
              </p>

            </div>

          </div>

          {/* =================================================
              MATCH BUTTON
          ================================================= */}

          <div className="matching-action">

            <button
              onClick={runMatching}
              disabled={
                matchingLoading ||
                !analysis
              }
              className="solution-button"
            >

              {matchingLoading ? (
                <>
                  <Loader2 className="icon-sm loading-spinner" />

                  Finding Matches...
                </>
              ) : (
                <>
                  <Sparkles className="icon-sm" />

                  {matching
                    ? "Refresh AI Matching"
                    : "Run AI Matching"}
                </>
              )}

            </button>

            {!analysis && (
              <p className="matching-note">
                Please analyze the challenge
                before running AI matching.
              </p>
            )}

          </div>

          {/* =================================================
              MATCHING ERROR
          ================================================= */}

          {matchingError && (

            <div className="matching-error">

              <AlertCircle className="icon-sm" />

              <span>
                {matchingError}
              </span>

            </div>

          )}

          {/* =================================================
              SUCCESS
          ================================================= */}

          {matching && (

            <div className="matching-success-message">

              <CheckCircle2 className="icon-sm" />

              AI matching completed
              successfully.

            </div>

          )}

          {/* =================================================
              MATCHING GRID
          ================================================= */}

          <div className="matching-grid">

            {/* =================================================
                UNIVERSITIES
            ================================================= */}

            <div className="content-card match-panel">

              <div className="panel-header">

                <div className="section-title-group">

                  <div className="section-icon primary-icon">

                    <Building2 className="icon-md" />

                  </div>

                  <div>

                    <h3>
                      Recommended Universities
                    </h3>

                    <p>
                      Based on skills,
                      research areas,
                      category and location
                    </p>

                  </div>

                </div>

                <span className="count-badge primary-count">
                  {universities.length}
                </span>

              </div>

              <div className="match-list">

                {universities.length > 0 ? (

                  universities.map(
                    (
                      university,
                      index
                    ) => (

                      <MatchCard
                        key={
                          university.id ||
                          university.universityId ||
                          index
                        }
                        item={university}
                        type="university"
                      />

                    )
                  )

                ) : (

                  <EmptyMatch
                    message={
                      matching
                        ? "No suitable university match found."
                        : "Analyze the challenge and run AI matching to find suitable universities."
                    }
                  />

                )}

              </div>

            </div>

            {/* =================================================
                INDUSTRIES
            ================================================= */}

            <div className="content-card match-panel">

              <div className="panel-header">

                <div className="section-title-group">

                  <div className="section-icon industry-icon">

                    <Factory className="icon-md" />

                  </div>

                  <div>

                    <h3>
                      Industry Partners
                    </h3>

                    <p>
                      Organizations with
                      relevant expertise
                    </p>

                  </div>

                </div>

                <span className="count-badge industry-count">
                  {industries.length}
                </span>

              </div>

              <div className="match-list">

                {industries.length > 0 ? (

                  industries.map(
                    (
                      industry,
                      index
                    ) => (

                      <MatchCard
                        key={
                          industry.id ||
                          industry.industryId ||
                          index
                        }
                        item={industry}
                        type="industry"
                      />

                    )
                  )

                ) : (

                  <EmptyMatch
                    message={
                      matching
                        ? "No suitable industry partner found."
                        : "Run AI matching to find suitable industry partners."
                    }
                  />

                )}

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            BEST UNIVERSITY
        ================================================= */}

        {matching?.bestUniversity && (

          <section className="content-card action-card">

            <div>

              <h2>
                Best University Match
              </h2>

              <p>

                {matching.bestUniversity.name}

                {" "}

                has the highest compatibility
                score for this challenge.

              </p>

            </div>

            <div className="score-box">

              <strong>

                {Math.round(
                  Number(
                    matching.bestUniversity.matchScore ||
                    0
                  )
                )}

                %

              </strong>

              <span>
                Best Match
              </span>

            </div>

          </section>

        )}

        {/* =================================================
            ACTION
        ================================================= */}

        <section className="content-card action-card">

          <div>

            <h2>
              Want to contribute a solution?
            </h2>

            <p>
              Join the collaboration network
              and help solve this challenge.
            </p>

          </div>

          <Link
            to="/solutions"
            className="solution-button"
          >

            <Users className="icon-sm" />

            Explore Solutions

          </Link>

        </section>

      </div>

    </main>
  );
}

// =====================================================
// INFO CARD
// =====================================================

function InfoCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="info-card">

      <div className="info-icon">

        <Icon className="icon-sm" />

      </div>

      <div className="info-content">

        <p>
          {label}
        </p>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}

// =====================================================
// ANALYSIS CARD
// =====================================================

function AnalysisCard({
  title,
  value,
}) {
  return (
    <div className="analysis-card">

      <p>
        {title}
      </p>

      <strong>
        {value}
      </strong>

    </div>
  );
}

// =====================================================
// MATCH CARD
// =====================================================

function MatchCard({
  item,
  type,
}) {
  const name =
    item.name ||
    item.universityName ||
    item.industryName ||
    "Unknown";

  const score =
    Number(
      item.matchScore ??
        item.score ??
        0
    ) || 0;

  const matchedSkills =
    Array.isArray(
      item.matchedSkills
    )
      ? item.matchedSkills
      : [];

  const reasons =
    Array.isArray(item.reasons)
      ? item.reasons
      : [];

  const isUniversity =
    type === "university";

  return (
    <div className="match-card">

      <div className="match-card-top">

        <div
          className={`match-type-icon ${
            isUniversity
              ? "university"
              : "industry"
          }`}
        >

          {isUniversity ? (
            <Building2 className="icon-md" />
          ) : (
            <Factory className="icon-md" />
          )}

        </div>

        <div className="match-main">

          <div className="match-name-row">

            <div>

              <h4>
                {name}
              </h4>

              {(item.district ||
                item.industry) && (

                <p>
                  {item.district ||
                    item.industry}
                </p>

              )}

            </div>

            <div className="score-box">

              <strong>
                {Math.round(score)}%
              </strong>

              <span>
                Match
              </span>

            </div>

          </div>

          {/* MATCH PROGRESS */}

          <div className="match-progress">

            <div
              style={{
                width: `${Math.min(
                  Math.max(
                    score,
                    0
                  ),
                  100
                )}%`,
              }}
            />

          </div>

          {/* MATCHED SKILLS */}

          {matchedSkills.length > 0 && (

            <div className="matched-skills">

              {matchedSkills
                .slice(0, 5)
                .map(
                  (
                    skill,
                    index
                  ) => (

                    <span
                      key={`${skill}-${index}`}
                    >
                      {skill}
                    </span>

                  )
                )}

            </div>

          )}

          {/* REASONS */}

          {reasons.length > 0 && (

            <div className="reasons-list">

              {reasons
                .slice(0, 3)
                .map(
                  (
                    reason,
                    index
                  ) => (

                    <div
                      key={`${reason}-${index}`}
                    >

                      <CheckCircle2 className="reason-icon" />

                      <span>
                        {reason}
                      </span>

                    </div>

                  )
                )}

            </div>

          )}

          {/* DESCRIPTION */}

          {item.description && (

            <p className="match-description">
              {item.description}
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

// =====================================================
// EMPTY MATCH
// =====================================================

function EmptyMatch({
  message,
}) {
  return (
    <div className="empty-match">

      <Target className="empty-icon" />

      <p>
        {message}
      </p>

    </div>
  );
}

// =====================================================
// EXPORT
// =====================================================

export default ChallengeDetails;