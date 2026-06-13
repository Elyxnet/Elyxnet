"use client";

import { motion, useReducedMotion } from "motion/react";
import { RiTimeLine } from "react-icons/ri";

export default function QueryHistory({ queries = [], onSelect }) {
  const shouldReduce = useReducedMotion();

  if (queries.length === 0) return null;

  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-text-disabled mb-3">
        Previous queries
      </p>

      <div className="space-y-2">
        {queries.map((q, i) => (
          <motion.div
            key={q.id || i}
            initial={shouldReduce ? undefined : { opacity: 0, y: 4 }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
            transition={
              shouldReduce
                ? undefined
                : { duration: 0.2, delay: i * 0.04, ease: "easeOut" }
            }
            className="bg-bg-surface border border-border-default rounded-xl overflow-hidden hover:border-border-subtle hover:scale-[1.01] transition-all duration-150"
          >
            <button
              onClick={() => onSelect?.(q)}
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-transparent"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <RiTimeLine className="w-3.5 h-3.5 text-text-disabled shrink-0" />
                <span className="text-[13px] text-text-secondary truncate">
                  {q.query}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span className="text-[11px] text-text-disabled">
                  −{q.pointsCost} pts
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
