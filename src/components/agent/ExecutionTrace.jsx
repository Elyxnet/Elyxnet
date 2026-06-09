"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCountUp } from "@/hooks/useCountUp";
import ProgressBar from "@/components/ui/ProgressBar";

const stageStates = {
  pending: "w-1.5 h-1.5 rounded-full bg-[--color-bg-active]",
  active: "w-1.5 h-1.5 rounded-full bg-[--color-yellow-400] animate-pulse",
  done: "w-1.5 h-1.5 rounded-full bg-[--color-green-400]",
};

export default function ExecutionTrace({
  stages = [],
  nodeCount = 0,
  metrics = {},
  status = "idle",
  duration = null,
  pointsCost = 10,
}) {
  const shouldReduce = useReducedMotion();
  const animatedNodes = useCountUp(nodeCount, 1200);

  if (status === "idle") return null;

  return (
    <motion.div
      initial={shouldReduce ? undefined : { x: 24, opacity: 0 }}
      animate={shouldReduce ? undefined : { x: 0, opacity: 1 }}
      transition={shouldReduce ? undefined : { duration: 0.3, ease: "easeOut" }}
      className="bg-[--color-bg-raised] border border-[--color-border-default] rounded-xl p-5 sticky top-20"
    >
      {/* Header */}
      <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled] mb-4">
        Execution trace
      </p>

      {/* Node allocation */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[12px] text-[--color-text-muted]">Nodes allocated</span>
          <span className="text-sm font-semibold text-[--color-text-primary]">
            {animatedNodes.toLocaleString()}
          </span>
        </div>
        <ProgressBar
          value={nodeCount}
          max={1200}
          color="bg-[--color-yellow-400]"
        />
      </div>

      {/* Stage list */}
      <div className="space-y-2.5 mb-4">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.id}
            initial={shouldReduce ? undefined : { opacity: 0, x: -6 }}
            animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
            transition={
              shouldReduce
                ? undefined
                : { duration: 0.2, delay: i * 0.1, ease: "easeOut" }
            }
            className="flex items-center gap-2.5"
          >
            <span className={stageStates[stage.state] || stageStates.pending} />
            <span
              className={`text-[13px] ${
                stage.state === "done"
                  ? "text-[--color-text-primary]"
                  : stage.state === "active"
                  ? "text-[--color-yellow-400]"
                  : "text-[--color-text-disabled]"
              }`}
            >
              {stage.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Metrics */}
      {(metrics.coverage || metrics.depth || metrics.utilization) && (
        <div className="flex items-center gap-4 mb-4 pt-3 border-t border-[--color-border-default]">
          {metrics.coverage && (
            <div>
              <p className="text-[10px] text-[--color-text-disabled] uppercase tracking-wider">
                Coverage
              </p>
              <p className="text-[13px] font-medium text-[--color-text-primary]">
                {metrics.coverage}
              </p>
            </div>
          )}
          {metrics.depth && (
            <div>
              <p className="text-[10px] text-[--color-text-disabled] uppercase tracking-wider">
                Depth
              </p>
              <p className="text-[13px] font-medium text-[--color-text-primary]">
                {metrics.depth}
              </p>
            </div>
          )}
          {metrics.utilization && (
            <div>
              <p className="text-[10px] text-[--color-text-disabled] uppercase tracking-wider">
                Utilization
              </p>
              <p className="text-[13px] font-medium text-[--color-text-primary]">
                {metrics.utilization}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[--color-border-default]">
        <span className="text-[11px] text-[--color-text-muted]">
          −{pointsCost} pts
        </span>
        {status === "streaming" ? (
          <span className="text-[11px] font-medium text-[--color-yellow-400] animate-pulse">
            Streaming…
          </span>
        ) : status === "completed" && duration ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-medium text-[--color-green-400]"
          >
            Completed in {(duration / 1000).toFixed(1)}s
          </motion.span>
        ) : (
          <span className="text-[11px] text-[--color-text-disabled]">
            Waiting…
          </span>
        )}
      </div>
    </motion.div>
  );
}
