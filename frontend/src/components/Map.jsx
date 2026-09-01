import React, { useMemo, useState } from "react";
import { MapPin, Users, AlertTriangle } from "lucide-react";

const districts = [
  { name: "Ranchi", challenges: 28, solutions: 14 },
  { name: "Jamshedpur", challenges: 22, solutions: 12 },
  { name: "Dhanbad", challenges: 19, solutions: 9 },
  { name: "Bokaro", challenges: 16, solutions: 8 },
  { name: "Hazaribagh", challenges: 14, solutions: 7 },
  { name: "Deoghar", challenges: 12, solutions: 6 },
  { name: "Giridih", challenges: 11, solutions: 5 },
  { name: "Ramgarh", challenges: 10, solutions: 5 },
  { name: "Palamu", challenges: 9, solutions: 4 },
  { name: "Garhwa", challenges: 8, solutions: 3 },
  { name: "Chatra", challenges: 7, solutions: 3 },
  { name: "Lohardaga", challenges: 6, solutions: 3 },
  { name: "Gumla", challenges: 6, solutions: 2 },
  { name: "Simdega", challenges: 5, solutions: 2 },
  { name: "Khunti", challenges: 5, solutions: 2 },
  { name: "Latehar", challenges: 5, solutions: 2 },
  { name: "Sahibganj", challenges: 7, solutions: 3 },
  { name: "Godda", challenges: 6, solutions: 3 },
  { name: "Pakur", challenges: 5, solutions: 2 },
  { name: "Dumka", challenges: 8, solutions: 4 },
  { name: "Jamtara", challenges: 5, solutions: 2 },
  { name: "Koderma", challenges: 6, solutions: 3 },
  { name: "Seraikela-Kharsawan", challenges: 10, solutions: 5 },
  { name: "West Singhbhum", challenges: 9, solutions: 4 },
];

function getIntensity(challenges) {
  if (challenges >= 20) {
    return "bg-red-500 text-white";
  }

  if (challenges >= 12) {
    return "bg-orange-400 text-white";
  }

  if (challenges >= 8) {
    return "bg-yellow-400 text-gray-900";
  }

  return "bg-green-500 text-white";
}

function getIntensityLabel(challenges) {
  if (challenges >= 20) return "High";
  if (challenges >= 12) return "Medium";
  if (challenges >= 8) return "Low-Medium";
  return "Low";
}

export default function Map({
  data = districts,
  title = "Challenge Distribution",
  showStats = true,
}) {
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const districtData = useMemo(() => {
    return Array.isArray(data) && data.length > 0 ? data : districts;
  }, [data]);

  const totalChallenges = districtData.reduce(
    (total, district) => total + Number(district.challenges || 0),
    0
  );

  const totalSolutions = districtData.reduce(
    (total, district) => total + Number(district.solutions || 0),
    0
  );

  const selected = districtData.find(
    (district) => district.name === selectedDistrict
  );

  return (
    <div className="w-full rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <MapPin className="size-5" />
            </span>

            <div>
              <h2 className="text-lg font-bold text-ink">
                {title}
              </h2>

              <p className="text-sm text-muted-foreground">
                Community challenges across Jharkhand
              </p>
            </div>
          </div>
        </div>

        {/* Total challenges */}
        <div className="rounded-2xl bg-primary-soft px-4 py-3">
          <p className="text-xs font-medium text-muted-foreground">
            Total Challenges
          </p>

          <p className="text-xl font-extrabold text-primary">
            {totalChallenges}
          </p>
        </div>
      </div>

      {/* Stats */}
      {showStats && (
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                <AlertTriangle className="size-4" />
              </span>

              <span className="text-xs text-muted-foreground">
                Challenges
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-ink">
              {totalChallenges}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <Users className="size-4" />
              </span>

              <span className="text-xs text-muted-foreground">
                Solutions
              </span>
            </div>

            <p className="mt-2 text-2xl font-bold text-ink">
              {totalSolutions}
            </p>
          </div>
        </div>
      )}

      {/* Map-style district grid */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-soft/50 via-background to-accent p-4 sm:p-6">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 size-40 rounded-full bg-emerald-500/10 blur-2xl" />

        <div className="relative">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-ink">
                Jharkhand
              </p>

              <p className="text-xs text-muted-foreground">
                Select a district to view details
              </p>
            </div>

            <MapPin className="size-5 text-primary" />
          </div>

          {/* Districts */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {districtData.map((district) => {
              const isSelected =
                selectedDistrict === district.name;

              return (
                <button
                  key={district.name}
                  type="button"
                  onClick={() =>
                    setSelectedDistrict(
                      isSelected ? null : district.name
                    )
                  }
                  className={[
                    "group relative rounded-2xl border p-3 text-left transition-all duration-200",
                    "hover:-translate-y-1 hover:shadow-md",
                    isSelected
                      ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                      : "border-border bg-surface",
                  ].join(" ")}
                >
                  {/* District indicator */}
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className={`size-3 rounded-full ${getIntensity(
                        Number(district.challenges || 0)
                      )}`}
                    />

                    <span className="text-xs font-bold text-muted-foreground">
                      {district.challenges || 0}
                    </span>
                  </div>

                  {/* District name */}
                  <p className="line-clamp-2 min-h-[32px] text-xs font-semibold text-ink">
                    {district.name}
                  </p>

                  <p className="mt-1 text-[10px] text-muted-foreground">
                    challenges
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Challenge Intensity
        </p>

        <div className="flex flex-wrap gap-3">
          <LegendItem
            color="bg-green-500"
            label="Low"
          />

          <LegendItem
            color="bg-yellow-400"
            label="Low-Medium"
          />

          <LegendItem
            color="bg-orange-400"
            label="Medium"
          />

          <LegendItem
            color="bg-red-500"
            label="High"
          />
        </div>
      </div>

      {/* Selected District */}
      {selected && (
        <div className="mt-5 animate-rise rounded-2xl border border-primary/20 bg-primary-soft/50 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />

                <h3 className="font-bold text-ink">
                  {selected.name}
                </h3>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                Challenge intensity:{" "}
                <span className="font-semibold text-primary">
                  {getIntensityLabel(
                    Number(selected.challenges || 0)
                  )}
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <Stat
                label="Challenges"
                value={selected.challenges || 0}
              />

              <Stat
                label="Solutions"
                value={selected.solutions || 0}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`size-3 rounded-full ${color}`}
      />

      <span className="text-xs text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="min-w-[80px] rounded-xl border border-border bg-surface px-3 py-2 text-center">
      <p className="text-lg font-bold text-ink">
        {value}
      </p>

      <p className="text-[10px] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}