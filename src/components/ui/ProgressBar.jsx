"use client";

import { motion } from "motion/react";

export default function ProgressBar({
  value = 0,
  max = 100,
  color = "bg-yellow-400",
  className = "",
}) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={`
        relative w-full h-2 rounded-full overflow-hidden
        bg-black/10 dark:bg-white/10 
        shadow-[inset_0_1px_3px_rgba(0,0,0,0.15)]
        ${className}
      `}
    >
      <motion.div
        className={`
          absolute top-0 left-0 h-full rounded-full 
          ${color}
          shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.15)]
        `}
        initial={{ width: "0%" }}
        animate={{ width: `${percent}%` }}
        // Using the same buttery custom easing curve for brand consistency
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Optional: Subtle sweeping light glare for that 100x premium feel */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
      </motion.div>
    </div>
  );
}