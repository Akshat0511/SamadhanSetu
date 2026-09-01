import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AIInsightCard = ({
  title = "AI Insight",
  description = "Our AI has analyzed this challenge and identified the best areas of expertise for solving it.",
  skills = [],
  confidence,
  challengeId,
  actionText = "View Recommendations",
}) => {
  return (
    <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900">
              {title}
            </h3>

            <p className="text-xs text-gray-500">
              AI-powered analysis
            </p>
          </div>
        </div>

        {confidence !== undefined && confidence !== null && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {confidence}% confidence
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-6 text-gray-600">
        {description}
      </p>

      {/* Recommended Skills */}
      {skills.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
            Recommended Skills
          </h4>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-lg bg-purple-100 px-3 py-1.5 text-xs font-medium text-purple-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action */}
      {challengeId && (
        <div className="mt-5 border-t border-purple-100 pt-4">
          <Link
            to={`/challenges/${challengeId}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition-colors hover:text-purple-800"
          >
            {actionText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default AIInsightCard;