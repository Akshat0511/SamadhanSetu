import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

function ChallengeCard({ challenge }) {
  if (!challenge) {
    return null;
  }

  const {
    id,
    title,
    description,
    category,
    district,
    priority,
    status,
    createdAt,
    deadline,
  } = challenge;

  // Priority styling
  const priorityStyles = {
    CRITICAL: "bg-red-100 text-red-700 border-red-200",
    HIGH: "bg-orange-100 text-orange-700 border-orange-200",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-200",
    LOW: "bg-green-100 text-green-700 border-green-200",
  };

  // Status styling
  const statusStyles = {
    OPEN: "bg-blue-100 text-blue-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    ASSIGNED: "bg-purple-100 text-purple-700",
    IN_PROGRESS: "bg-indigo-100 text-indigo-700",
    RESOLVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  const priorityClass =
    priorityStyles[String(priority).toUpperCase()] ||
    "bg-gray-100 text-gray-700 border-gray-200";

  const statusClass =
    statusStyles[String(status).toUpperCase()] ||
    "bg-gray-100 text-gray-700";

  // Format date
  const formatDate = (date) => {
    if (!date) return null;

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      
      {/* ================= HEADER ================= */}
      <div className="border-b border-gray-100 p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          
          {/* Category */}
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {category || "General"}
          </span>

          {/* Priority */}
          {priority && (
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${priorityClass}`}
            >
              {priority}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
          {title || "Untitled Challenge"}
        </h3>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Description */}
        <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-600">
          {description || "No description available for this challenge."}
        </p>

        {/* Location */}
        {district && (
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 shrink-0 text-blue-600" />
            <span>{district}, Jharkhand</span>
          </div>
        )}

        {/* Deadline */}
        {deadline && (
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 shrink-0 text-orange-500" />
            <span>Deadline: {formatDate(deadline)}</span>
          </div>
        )}

        {/* Created Date */}
        {createdAt && (
          <div className="mb-4 text-xs text-gray-400">
            Submitted {formatDate(createdAt)}
          </div>
        )}

        {/* Status */}
        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
          
          <div className="flex items-center gap-2">
            {String(status).toUpperCase() === "RESOLVED" ||
            String(status).toUpperCase() === "COMPLETED" ? (
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-blue-600" />
            )}

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
            >
              {status || "OPEN"}
            </span>
          </div>

          {/* View Button */}
          {id && (
            <Link
              to={`/challenges/${id}`}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-50"
            >
              View
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;