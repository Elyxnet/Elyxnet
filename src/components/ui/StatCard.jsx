"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCountUp } from "@/hooks/useCountUp";
import ProgressBar from "./ProgressBar";

const colorMap = {
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
  purple: "bg-purple-400",
  green: "bg-green-400",
};

export default function StatCard({
  label,
  value,
  subline,
  progress,
  progressMax = 100,
  color = "yellow",
  primary = false,
  dashed = false,
  index = 0,
  formatter,
}) {
  const shouldReduce = useReducedMotion();
  const animatedValue = useCountUp(typeof value === "number" ? value : 0);

  const displayValue = formatter
    ? formatter(animatedValue)
    : typeof value === "number"
    ? animatedValue.toLocaleString()
    : value;

  // Determine the premium card styling based on props
  const getCardStyle = () => {
    if (dashed) {
      return "bg-transparent border border-dashed border-border-default hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-300";
    }
    if (primary) {
      return "bg-gradient-to-b from-yellow-500/10 to-yellow-500/5 border border-dashed border-yellow-500/20 ";
    }
    return "bg-gradient-to-b from-bg-surface to-bg-surface/90 border border-border-subtle shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.05)]";
  };

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={
        shouldReduce
          ? undefined
          : { 
              duration: 0.7, 
              delay: index * 0.08, 
              ease: [0.22, 1, 0.36, 1] // Ultra-smooth custom easing curve
            }
      }
      className={`relative flex flex-col rounded-2xl p-5 overflow-hidden ${getCardStyle()}`}
    >
      {/* Optional: Subtle top highlight line for extra depth on non-dashed cards */}
      {!dashed && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

      {/* Caption label - Clean, modern, slightly spaced */}
      <p className="text-xs font-medium tracking-wide text-text-muted mb-3">
        {label}
      </p>

      {/* Value - Large, tight tracking for premium typographic feel */}
      <div className="flex items-baseline gap-2">
        <p
          className={`text-3xl font-semibold tracking-tighter leading-none ${
            primary ? "text-yellow-500 dark:text-yellow-400" : "text-text-primary"
          }`}
        >
          {displayValue}
        </p>
      </div>

      {/* Subline - Slightly softer text for context */}
      {subline && (
        <p className="text-sm font-medium text-text-disabled mt-2">
          {subline}
        </p>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-auto pt-5">
          <ProgressBar
            value={progress}
            max={progressMax}
            color={colorMap[color] || colorMap.yellow}
          />
        </div>
      )}
    </motion.div>
  );
}