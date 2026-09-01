```jsx
import { cn } from "@/lib/utils";

export function LogoMark({ className }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-xl bg-hero-gradient shadow-soft",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
      >
        <path
          d="M2 17c3.5-8 16.5-8 20 0"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.95"
        />

        <path
          d="M2 17h20"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />

        <path
          d="M8 17v-4M12 17v-6M16 17v-4"
          stroke="white"
          strokeWidth="1.6"
          opacity="0.7"
        />

        <circle
          cx="12"
          cy="6"
          r="2.3"
          fill="white"
        />
      </svg>
    </span>
  );
}

export function Logo({ dark = false }) {
  return (
    <span className="flex items-center gap-2.5">

      {/* Logo Icon */}
      <LogoMark />

      {/* Logo Text */}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[0.98rem] font-extrabold tracking-[0.02em]",
            dark
              ? "text-primary-foreground"
              : "text-ink"
          )}
        >
          SAMADHAN
          <span className="text-primary">
            SETU
          </span>
        </span>

        {/* Tagline */}
        <span
          className={cn(
            "mt-0.5 hidden text-[0.6rem] font-semibold tracking-[0.14em] uppercase sm:block",
            dark
              ? "text-primary-foreground/60"
              : "text-muted-foreground"
          )}
        >
          Jharkhand Innovation Network
        </span>
      </span>
    </span>
  );
}
```
