"use client";

import { motion } from "motion/react";

export default function ProgressBar({
  value = 0,
  max = 100,
  color = "bg-[--color-yellow-400]",
  className = "",
}) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={`w-full h-1 rounded-full bg-[--color-bg-active] overflow-hidden ${className}`}
    >
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: "0%" }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
    </div>
  );
}
