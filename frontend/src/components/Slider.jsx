
import React from "react";

function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  disabled = false,
  className = "",
  label,
  showValue = true,
}) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? min
  );

  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (event) => {
    const newValue = Number(event.target.value);

    if (value === undefined) {
      setInternalValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  const percentage =
    ((currentValue - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between">
          {label && (
            <label className="text-sm font-semibold text-ink">
              {label}
            </label>
          )}

          {showValue && (
            <span className="text-sm font-bold text-primary">
              {currentValue}
            </span>
          )}
        </div>
      )}

      {/* Slider */}
      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          className="
            relative
            z-10
            h-2
            w-full
            cursor-pointer
            appearance-none
            rounded-full
            bg-border
            outline-none
            disabled:cursor-not-allowed
            disabled:opacity-50

            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:size-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-primary
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer

            [&::-moz-range-thumb]:size-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-primary
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:shadow-md
            [&::-moz-range-thumb]:cursor-pointer
          "
          style={{
            background: `linear-gradient(
              to right,
              var(--primary) 0%,
              var(--primary) ${percentage}%,
              var(--border) ${percentage}%,
              var(--border) 100%
            )`,
          }}
        />
      </div>

      {/* Min / Max */}
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

export default Slider;

