"use client";

import { motion, useReducedMotion } from "motion/react";
import { RiSearchLine, RiBarChartLine, RiPieChartLine, RiStackLine } from "react-icons/ri";

const suggestions = [
  {
    text: "Analyze Bitcoin sentiment across social media",
    icon: RiSearchLine,
  },
  {
    text: "Top AI projects trending this week",
    icon: RiBarChartLine,
  },
  {
    text: "DeFi yield farming trend report",
    icon: RiPieChartLine,
  },
  {
    text: "Layer 1 blockchain comparison analysis",
    icon: RiStackLine,
  },
];

export default function SuggestionChips({ onSelect }) {
  const shouldReduce = useReducedMotion();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {suggestions.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.button
            key={i}
            initial={shouldReduce ? undefined : { opacity: 0, scale: 0.96 }}
            animate={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
            transition={
              shouldReduce
                ? undefined
                : { duration: 0.2, delay: i * 0.08, ease: "easeOut" }
            }
            onClick={() => onSelect(s.text)}
            className="flex items-start gap-3 bg-bg-surface border border-border-default rounded-lg p-3
              hover:border-border-subtle cursor-pointer text-left transition-all duration-150
              hover:scale-[1.01] active:scale-[0.98]"
          >
            <Icon className="w-4 h-4 text-text-disabled mt-0.5 shrink-0" />
            <span className="text-[13px] text-text-secondary">
              {s.text}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
