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

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={
        shouldReduce
          ? undefined
          : { duration: 0.25, delay: index * 0.06, ease: "easeOut" }
      }
      className={`rounded-xl p-5 border ${
        primary
          ? "border-yellow-border bg-yellow-950/20"
          : "border-border-default bg-bg-surface"
      }`}
    >
      {/* Caption label */}
      <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-text-disabled mb-2">
        {label}
      </p>

      {/* Value */}
      <p
        className={`text-[22px] font-semibold tracking-[-0.02em] leading-tight ${
          primary ? "text-yellow-400" : "text-text-primary"
        }`}
      >
        {displayValue}
      </p>

      {/* Subline */}
      {subline && (
        <p className="text-[11px] text-text-muted mt-1">{subline}</p>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-3">
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
