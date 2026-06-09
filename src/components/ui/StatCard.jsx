"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCountUp } from "@/hooks/useCountUp";
import ProgressBar from "./ProgressBar";

const colorMap = {
  yellow: "bg-[--color-yellow-400]",
  blue: "bg-[--color-blue-400]",
  purple: "bg-[--color-purple-400]",
  green: "bg-[--color-green-400]",
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
          ? "border-[--color-yellow-border] bg-[--color-yellow-950]/20"
          : "border-[--color-border-default] bg-[--color-bg-surface]"
      }`}
    >
      {/* Caption label */}
      <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled] mb-2">
        {label}
      </p>

      {/* Value */}
      <p
        className={`text-[22px] font-semibold tracking-[-0.02em] leading-tight ${
          primary ? "text-[--color-yellow-400]" : "text-[--color-text-primary]"
        }`}
      >
        {displayValue}
      </p>

      {/* Subline */}
      {subline && (
        <p className="text-[11px] text-[--color-text-muted] mt-1">{subline}</p>
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
