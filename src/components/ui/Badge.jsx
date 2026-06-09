"use client";

const presets = {
  yellow: {
    wrapper:
      "bg-[--color-yellow-950] text-[--color-yellow-400] border border-[--color-yellow-border]",
  },
  green: {
    wrapper:
      "bg-[--color-green-950] text-[--color-green-400] border border-[--color-green-border]",
    dot: true,
  },
  blue: {
    wrapper:
      "bg-[--color-blue-950] text-[--color-blue-400] border border-[--color-blue-950]",
  },
  purple: {
    wrapper:
      "bg-[--color-purple-950] text-[--color-purple-400] border border-[--color-purple-950]",
  },
  red: {
    wrapper:
      "bg-[--color-red-950] text-[--color-red-400] border border-[--color-red-950]",
  },
  muted: {
    wrapper:
      "bg-[--color-bg-surface] text-[--color-text-disabled] border border-[--color-border-default]",
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
