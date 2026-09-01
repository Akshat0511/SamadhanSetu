
import React from "react";
import {
  ArrowDown,
  ArrowUp,
  Minus,
  TrendingUp,
} from "lucide-react";

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  trendType = "up",
  className = "",
}) {
  const isPositive = trendType === "up";
  const isNegative = trendType === "down";

  return (
    <div
      className={`
        group
        rounded-2xl
        border
        border-border
        bg-surface
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lift
        ${className}
      `}
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        {/* Title */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
            {value}
          </h3>
        </div>

        {/* Icon */}
        {Icon && (
          <div
            className="
              flex
              size-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-primary-soft
              text-primary
              transition-transform
              duration-300
              group-hover:scale-105
            "
          >
            <Icon className="size-5" />
          </div>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {/* Trend */}
      {(trend || trendValue) && (
        <div className="mt-4 flex items-center gap-2">

          {/* Trend Icon */}
          <span
            className={`
              flex
              size-6
              items-center
              justify-center
              rounded-full
              ${
                isPositive
                  ? "bg-emerald-100 text-emerald-600"
                  : isNegative
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-600"
              }
            `}
          >
            {isPositive ? (
              <ArrowUp className="size-3.5" />
            ) : isNegative ? (
              <ArrowDown className="size-3.5" />
            ) : (
              <Minus className="size-3.5" />
            )}
          </span>

          {/* Trend Value */}
          {trendValue && (
            <span
              className={`
                text-xs
                font-bold
                ${
                  isPositive
                    ? "text-emerald-600"
                    : isNegative
                    ? "text-red-600"
                    : "text-muted-foreground"
                }
              `}
            >
              {trendValue}
            </span>
          )}

          {/* Trend Text */}
          {trend && (
            <span className="text-xs text-muted-foreground">
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default StatCard;

