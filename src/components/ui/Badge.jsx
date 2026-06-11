"use client";

const presets = {
  yellow: {
    wrapper:
      "bg-yellow-950 text-yellow-400 border border-yellow-border",
  },
  green: {
    wrapper:
      "bg-green-950 text-green-400 border border-green-border",
    dot: true,
  },
  blue: {
    wrapper:
      "bg-blue-950 text-blue-400 border border-blue-950",
  },
  purple: {
    wrapper:
      "bg-purple-950 text-purple-400 border border-purple-950",
  },
  red: {
    wrapper:
      "bg-red-950 text-red-400 border border-red-950",
  },
  muted: {
    wrapper:
      "bg-bg-surface text-text-disabled border border-border-default",
  },
};

export default function Badge({
  children,
  variant = "yellow",
  dot = false,
  className = "",
}) {
  const preset = presets[variant] || presets.muted;
  const showDot = dot || preset.dot;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${preset.wrapper} ${className}`}
    >
      {showDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full bg-current ${
            variant === "green" ? "animate-pulse" : ""
          }`}
        />
      )}
      {children}
    </span>
  );
}
