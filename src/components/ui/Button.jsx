"use client";

import { RiLoaderLine } from "react-icons/ri";

const variants = {
  primary: `bg-yellow-400 text-bg-base font-medium text-sm
    rounded-lg px-4 h-9 inline-flex items-center justify-center gap-2
    hover:bg-yellow-200 hover:scale-[1.01] hover:brightness-110
    active:scale-[0.98] transition-all duration-150
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`,

  secondary: `bg-bg-surface text-text-primary font-medium text-sm
    border border-border-subtle rounded-lg px-4 h-9
    inline-flex items-center justify-center gap-2
    hover:bg-bg-hover hover:scale-[1.01]
    active:scale-[0.98] transition-all duration-150
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`,

  ghost: `bg-transparent text-text-muted font-medium text-sm
    border border-border-default rounded-lg px-4 h-9
    inline-flex items-center justify-center gap-2
    hover:text-text-primary hover:border-border-subtle hover:scale-[1.01]
    active:scale-[0.98] transition-all duration-150
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`,

  danger: `bg-transparent text-red-400 font-medium text-sm
    border border-red-950 rounded-lg px-4 h-9
    inline-flex items-center justify-center gap-2
    hover:bg-red-950 hover:scale-[1.01]
    active:scale-[0.98] transition-all duration-150
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`,
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
      className={`${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <RiLoaderLine className="w-4 h-4 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
