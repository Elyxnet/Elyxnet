"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { RiArrowDownSLine, RiTimeLine } from "react-icons/ri";

export default function QueryHistory({ queries = [] }) {
  const shouldReduce = useReducedMotion();
  const [expandedId, setExpandedId] = useState(null);

  if (queries.length === 0) return null;

  return (
    <div>
      <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled] mb-3">
        Previous queries
      </p>

      <div className="space-y-2">
        {queries.map((q, i) => {
          const isExpanded = expandedId === q.id;

          return (
            <motion.div
              key={q.id || i}
              initial={shouldReduce ? undefined : { opacity: 0, y: 4 }}
              animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
              transition={
                shouldReduce
                  ? undefined
                  : { duration: 0.2, delay: i * 0.04, ease: "easeOut" }
              }
              className="bg-[--color-bg-surface] border border-[--color-border-default] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : q.id || i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[--color-bg-hover] transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <RiTimeLine className="w-3.5 h-3.5 text-[--color-text-disabled] shrink-0" />
                  <span className="text-[13px] text-[--color-text-secondary] truncate">
                    {q.query}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[11px] text-[--color-text-disabled]">
                    −{q.pointsCost} pts
                  </span>
                  <RiArrowDownSLine
                    className={`w-4 h-4 text-[--color-text-disabled] transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t border-[--color-border-default]">
                      <div className="pt-3 text-[13px] text-[--color-text-primary] leading-relaxed whitespace-pre-wrap">
                        {q.result || "No result available"}
                      </div>
                      <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[--color-border-default]">
                        {q.model && (
                          <span className="text-[11px] text-[--color-text-disabled] font-mono">
                            {q.model}
                          </span>
                        )}
                        {q.durationMs && (
                          <span className="text-[11px] text-[--color-text-disabled]">
                            {(q.durationMs / 1000).toFixed(1)}s
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
