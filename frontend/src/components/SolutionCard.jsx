
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

function SolutionCard({
  solution,
  id,
  title,
  description,
  category,
  status = "In Progress",
  university,
  industry,
  teamSize,
  progress = 0,
}) {
  // Support both:
  // <SolutionCard solution={solution} />
  // and direct props
  const data = solution || {
    id,
    title,
    description,
    category,
    status,
    university,
    industry,
    teamSize,
    progress,
  };

  const solutionId = data.id || data.solutionId;

  const statusStyles = {
    Completed:
      "bg-emerald-100 text-emerald-700 border-emerald-200",

    "In Progress":
      "bg-blue-100 text-blue-700 border-blue-200",

    Proposed:
      "bg-purple-100 text-purple-700 border-purple-200",

    Pending:
      "bg-amber-100 text-amber-700 border-amber-200",

    Rejected:
      "bg-red-100 text-red-700 border-red-200",
  };

  const currentStatus = data.status || "In Progress";

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-border
        bg-surface
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lift
      "
    >
      {/* Top Section */}
      <div className="p-5">

        {/* Category + Status */}
        <div className="mb-4 flex items-center justify-between gap-3">

          {data.category ? (
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
              {data.category}
            </span>
          ) : (
            <span />
          )}

          <span
            className={`
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-semibold
              ${statusStyles[currentStatus] || statusStyles["In Progress"]}
            `}
          >
            {currentStatus}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold leading-snug text-ink transition-colors group-hover:text-primary">
          {data.title || "Untitled Solution"}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {data.description ||
            "A collaborative solution designed to address a community challenge."}
        </p>

        {/* Partners */}
        <div className="mt-5 grid gap-3">

          {/* University */}
          {data.university && (
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <Building2 className="size-4" />
              </span>

              <div className="min-w-0">
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground">
                  University
                </p>

                <p className="truncate text-sm font-semibold text-ink">
                  {data.university}
                </p>
              </div>
            </div>
          )}

          {/* Industry */}
          {data.industry && (
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <Users className="size-4" />
              </span>

              <div className="min-w-0">
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground">
                  Industry Partner
                </p>

                <p className="truncate text-sm font-semibold text-ink">
                  {data.industry}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        {data.progress !== undefined && data.progress !== null && (
          <div className="mt-5">

            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                Solution Progress
              </span>

              <span className="text-xs font-bold text-primary">
                {data.progress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, Number(data.progress) || 0)
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Team + Time */}
        <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">

          {data.teamSize && (
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              {data.teamSize} members
            </span>
          )}

          {currentStatus === "In Progress" && (
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-4" />
              Active project
            </span>
          )}

          {currentStatus === "Completed" && (
            <span className="flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="size-4" />
              Successfully completed
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-accent/30 px-5 py-3">

        {solutionId ? (
          <Link
            to={`/solutions/${solutionId}`}
            className="
              flex
              items-center
              justify-between
              text-sm
              font-bold
              text-primary
              transition-all
              group-hover:gap-2
            "
          >
            <span>View Solution</span>

            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div className="flex items-center justify-between text-sm font-bold text-primary">
            <span>Solution Details</span>
            <ArrowRight className="size-4" />
          </div>
        )}
      </div>
    </article>
  );
}

export default SolutionCard;

