"use client";

import { motion } from "motion/react";

export default function Toggle({ active = false, onChange, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      disabled={disabled}
      onClick={() => onChange?.(!active)}
      className={`
        group relative flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-[2px]
        transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] outline-none select-none
        focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
          active
            ? "bg-yellow-400 shadow-[inset_0_2px_5px_rgba(0,0,0,0.2)]"
            : "bg-black/10 dark:bg-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15)]"
        }
      `}
      style={{
        justifyContent: active ? "flex-end" : "flex-start",
      }}
    >
      <motion.span
        layout
        // Tuned for a buttery, fluid glide rather than a harsh snap
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 24, 
          mass: 0.8 
        }}
        className={`
          flex h-5 w-5 rounded-full items-center justify-center
          bg-gradient-to-b from-white to-gray-50 dark:from-white dark:to-gray-200
          shadow-[0_1px_2px_rgba(0,0,0,0.2),0_2px_5px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.1)]
        `}
      />
    </button>
  );
}