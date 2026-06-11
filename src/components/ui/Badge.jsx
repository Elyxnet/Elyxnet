"use client";

const presets = {
  yellow: {
    wrapper: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20 shadow-[0_1px_2px_rgba(234,179,8,0.05)]",
  },
  green: {
    wrapper: "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 shadow-[0_1px_2px_rgba(34,197,94,0.05)]",
    dot: true,
  },
  blue: {
    wrapper: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-[0_1px_2px_rgba(59,130,246,0.05)]",
  },
  purple: {
    wrapper: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 shadow-[0_1px_2px_rgba(168,85,247,0.05)]",
  },
  red: {
    wrapper: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 shadow-[0_1px_2px_rgba(239,68,68,0.05)]",
  },
  muted: {
    wrapper: "bg-gray-500/10 text-gray-500 dark:text-gray-400 border border-gray-500/20 shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
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
      className={`
        inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg 
        text-[10px] font-medium tracking-wide backdrop-blur-sm
        transition-colors duration-200 select-none
        ${preset.wrapper} 
        ${className}
      `}
    >
      {showDot && (
        <span
          className={`
            w-1.5 h-1.5 hidden rounded-full bg-current opacity-80 
            shadow-[0_0_4px_currentColor] 
            ${variant === "green" ? "animate-pulse" : ""}
          `}
        />
      )}
      {children}
    </span>
  );
}