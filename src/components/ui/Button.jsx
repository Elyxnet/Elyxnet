"use client";

import { RiLoaderLine } from "react-icons/ri";

const variants = {
  primary: `bg-[--color-yellow-400] text-[--color-bg-base] font-medium text-sm
    rounded-lg px-4 h-9 inline-flex items-center justify-center gap-2
    hover:bg-[--color-yellow-200] hover:scale-[1.01] hover:brightness-110
    active:scale-[0.98] transition-all duration-150
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`,

  secondary: `bg-[--color-bg-surface] text-[--color-text-primary] font-medium text-sm
    border border-[--color-border-subtle] rounded-lg px-4 h-9
    inline-flex items-center justify-center gap-2
    hover:bg-[--color-bg-hover] hover:scale-[1.01]
    active:scale-[0.98] transition-all duration-150
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`,

  ghost: `bg-transparent text-[--color-text-muted] font-medium text-sm
    border border-[--color-border-default] rounded-lg px-4 h-9
    inline-flex items-center justify-center gap-2
    hover:text-[--color-text-primary] hover:border-[--color-border-subtle] hover:scale-[1.01]
    active:scale-[0.98] transition-all duration-150
    disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none`,

  danger: `bg-transparent text-[--color-red-400] font-medium text-sm
    border border-[--color-red-950] rounded-lg px-4 h-9
    inline-flex items-center justify-center gap-2
    hover:bg-[--color-red-950] hover:scale-[1.01]
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
