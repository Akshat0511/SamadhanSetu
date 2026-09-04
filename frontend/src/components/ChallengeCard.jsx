
import React from "react";
import { Link } from "react-router-dom";

import {
  MapPin,
  Clock3,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

function ChallengeCard({ challenge }) {
  if (!challenge) {
    return null;
  }

  const {
    id,
    title,
    name,
    description,
    category,
    district,
    priority,
    status,
    createdAt,
    deadline,
    images,
    challengeImages,
  } = challenge;

  const challengeTitle =
    title || name || "Untitled Challenge";

  const challengeDescription =
    description || "No description available.";

  const challengeCategory =
    category || "GENERAL";

  const challengeDistrict =
    district || "Jharkhand";

  const challengePriority =
    String(priority || "MEDIUM").toUpperCase();

  const challengeStatus =
    String(status || "PENDING").toUpperCase();

  // =====================================================
  // GET IMAGES
  // =====================================================

  const imageList = Array.isArray(images)
    ? images
    : Array.isArray(challengeImages)
    ? challengeImages
    : [];

  const firstImage =
    imageList.length > 0
      ? imageList[0]
      : null;

  const imageUrl =
    firstImage?.imageUrl ||
    firstImage?.url ||
    firstImage?.secure_url ||
    null;

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // PRIORITY CLASSES
  // =====================================================

  const priorityClassMap = {
    LOW: "priority-low",
    MEDIUM: "priority-medium",
    HIGH: "priority-high",
    CRITICAL: "priority-critical",
  };

  // =====================================================
  // STATUS CLASSES
  // =====================================================

  const statusClassMap = {
    PENDING: "status-pending",
    UNDER_REVIEW: "status-under-review",
    VERIFIED: "status-verified",
    ASSIGNED: "status-assigned",
    IN_PROGRESS: "status-in-progress",
    COMPLETED: "status-completed",
    REJECTED: "status-rejected",
    OPEN: "status-open",
    RESOLVED: "status-resolved",
  };

  const priorityClass =
    priorityClassMap[challengePriority] ||
    "priority-medium";

  const statusClass =
    statusClassMap[challengeStatus] ||
    "status-default";

  const isCompleted =
    challengeStatus === "COMPLETED" ||
    challengeStatus === "RESOLVED";

  // =====================================================
  // CARD
  // =====================================================

  return (
    <article className="challenge-card">

      {/* =================================================
          IMAGE
      ================================================= */}

      <Link
        to={`/challenges/${id}`}
        className="challenge-card-image"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={challengeTitle}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display =
                "none";

              const fallback =
                event.currentTarget.parentElement?.querySelector(
                  ".no-image-placeholder"
                );

              if (fallback) {
                fallback.style.display = "flex";
              }
            }}
          />
        ) : null}

        <div
          className="no-image-placeholder"
          style={{
            display: imageUrl
              ? "none"
              : "flex",
          }}
        >
          <ImageIcon size={40} />

          <span>
            No Image Available
          </span>
        </div>

        <div className="image-overlay" />

        <div className="image-badges">

          <span className="category-badge">
            {challengeCategory}
          </span>

          <span
            className={`priority-badge ${priorityClass}`}
          >
            {challengePriority}
          </span>

        </div>
      </Link>

      {/* =================================================
          CARD CONTENT
      ================================================= */}

      <div className="challenge-card-content">

        <Link
          to={`/challenges/${id}`}
          className="challenge-title-link"
        >
          <h2>
            {challengeTitle}
          </h2>
        </Link>

        <p className="challenge-description">
          {challengeDescription}
        </p>

        {/* LOCATION */}

        <div className="challenge-location">

          <MapPin size={17} />

          <span>
            {challengeDistrict}
          </span>

        </div>

        {/* DEADLINE */}

        {deadline && (
          <div className="challenge-location">

            <Clock3 size={17} />

            <span>
              Deadline:{" "}
              {formatDate(deadline)}
            </span>

          </div>
        )}

        {/* CREATED DATE */}

        {createdAt && (
          <div className="challenge-created">
            Submitted{" "}
            {formatDate(createdAt)}
          </div>
        )}

      </div>

      {/* =================================================
          CARD FOOTER
      ================================================= */}

      <div className="challenge-card-bottom">

        <span
          className={`status-badge ${statusClass}`}
        >

          {isCompleted ? (
            <CheckCircle2 size={16} />
          ) : (
            <AlertCircle size={16} />
          )}

          {challengeStatus.replaceAll(
            "_",
            " "
          )}

        </span>

        <Link
          to={`/challenges/${id}`}
          className="view-details"
        >
          View Details

          <ArrowRight
            size={18}
            className="view-arrow"
          />
        </Link>

      </div>

    </article>
  );
}

export default ChallengeCard;
