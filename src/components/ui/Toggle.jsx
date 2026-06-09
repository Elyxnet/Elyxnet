"use client";

import { motion } from "motion/react";

export default function Toggle({ active = false, onChange, disabled = false }) {
  return (
    <button
      role="switch"
      aria-checked={active}
      disabled={disabled}
      onClick={() => onChange?.(!active)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-150 cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${active ? "bg-[--color-yellow-400]" : "bg-[--color-bg-active]"}`}
    >
      <motion.span
        className="absolute top-0.5 w-5 h-5 rounded-full bg-[--color-bg-base] shadow-sm"
        animate={{ x: active ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
