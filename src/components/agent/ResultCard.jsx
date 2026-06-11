"use client";

import { motion, useReducedMotion } from "motion/react";

export default function ResultCard({ query, content, model, tokens, pointsCost, timestamp }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.25, ease: "easeOut" }}
      className="bg-bg-surface border border-border-default rounded-xl p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border-default">
        <p className="text-[13px] text-text-muted truncate max-w-[70%]">
          {query}
        </p>
        <span className="text-[11px] text-text-disabled shrink-0">
          {timestamp || "Just now"}
        </span>
      </div>

      {/* Content — rendered markdown */}
      <div className="prose-sm text-[13px] text-text-primary leading-relaxed space-y-3 [&_h1]:text-lg [&_h1]:font-semibold [&_h1]:text-text-primary [&_h2]:text-base [&_h2]:font-medium [&_h2]:text-text-primary [&_h3]:text-sm [&_h3]:font-medium [&_h3]:text-text-primary [&_strong]:text-text-primary [&_em]:text-text-secondary [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:text-text-secondary [&_code]:bg-bg-active [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[12px] [&_code]:font-mono [&_code]:text-yellow-400">
        {content ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          <p className="text-text-disabled italic">
            Waiting for response…
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border-default">
        {model && (
          <span className="text-[11px] text-text-disabled font-mono">
            {model}
          </span>
        )}
        {tokens && (
          <span className="text-[11px] text-text-disabled">
            {tokens} tokens
          </span>
        )}
        {pointsCost && (
          <span className="text-[11px] text-text-muted ml-auto">
            −{pointsCost} pts
          </span>
        )}
      </div>
    </motion.div>
  );
}
