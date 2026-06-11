"use client";

import { RiLoaderLine } from "react-icons/ri";

const variants = {
  // Primary (Yellow) - Retains original theme but adds a subtle gold/yellow 3D bevel
  primary: `bg-gradient-to-b from-yellow-300 to-yellow-400 text-bg-base font-medium text-sm
    border border-yellow-500/80
    shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(202,138,4,0.4)]
    hover:from-yellow-200 hover:to-yellow-400 hover:border-yellow-400
    active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)]
    focus-visible:ring-yellow-400`,

  // Brand (Purple) - Exact match to your image with a minimal, physical 3D lip
  brand: `bg-gradient-to-b from-[#8B5CF6] to-[#7C3AED] text-white font-medium text-sm
    border border-[#6D28D9]
    shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.2)]
    hover:from-[#9366F8] hover:to-[#8346EF] hover:border-[#7C3AED]
    active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
    focus-visible:ring-[#8B5CF6]`,

  // Secondary (Surface) - Machined, tactile surface feel
  secondary: `bg-gradient-to-b from-bg-surface to-bg-surface/90 text-text-primary font-medium text-sm
    border border-border-subtle
    shadow-[0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.1)]
    hover:bg-bg-hover hover:border-border-default
    active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]
    focus-visible:ring-border-subtle`,

  // Ghost - Ultra minimal, only reveals its bounds on hover
  ghost: `bg-transparent text-text-muted font-medium text-sm
    border border-transparent shadow-none
    hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-primary hover:border-border-subtle
    active:translate-y-[1px] active:bg-black/10 dark:active:bg-white/10
    focus-visible:ring-border-subtle`,

  // Danger (Red) - Dark and moody danger state with crisp edges
  danger: `bg-gradient-to-b from-red-500/10 to-red-500/20 text-red-400 font-medium text-sm
    border border-red-950
    shadow-[0_1px_2px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.05),inset_0_-1px_0_rgba(0,0,0,0.3)]
    hover:from-red-500/20 hover:to-red-500/30 hover:text-red-300 hover:border-red-900
    active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
    focus-visible:ring-red-900`,
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        relative inline-flex items-center justify-center gap-2 px-4 h-9 rounded-lg
        overflow-hidden select-none outline-none
        transition-all duration-150 ease-out
        focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:transform-none disabled:shadow-none
        ${variants[variant]} 
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {/* 
        Optional: A subtle noise texture overlay can be added here for even more physical realism, 
        but leaving it clean keeps it strictly modern. 
      */}
      
      {loading && (
        <RiLoaderLine className="w-4 h-4 animate-spin text-inherit shrink-0" />
      )}
      
      <span className={`flex items-center gap-2 ${loading ? 'opacity-80 scale-95' : 'opacity-100 scale-100'} transition-all duration-200`}>
        {children}
      </span>
    </button>
  );
}