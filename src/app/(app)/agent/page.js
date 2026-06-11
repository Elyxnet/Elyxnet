"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RiBrainLine } from "react-icons/ri";
import QueryInput from "@/components/agent/QueryInput";
import SuggestionChips from "@/components/agent/SuggestionChips";
import ExecutionTrace from "@/components/agent/ExecutionTrace";
import ResultCard from "@/components/agent/ResultCard";
import QueryHistory from "@/components/agent/QueryHistory";
import Badge from "@/components/ui/Badge";
import { useAgent } from "@/hooks/useAgent";
import useSWR from "swr";

export default function AgentPage() {
  const shouldReduce = useReducedMotion();
  const { status, stages, content, duration, error, submitQuery, reset } = useAgent();
  const resultRef = useRef(null);

  const { data: historyData, mutate: refreshHistory } = useSWR("/api/agent/history", (url) => fetch(url).then(r => r.json()));

  useEffect(() => {
    if (status === "completed" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      refreshHistory();
    }
  }, [status, refreshHistory]);

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      {/* Left Column: Input & Context */}
      <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col gap-6">
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, x: -16 }}
          animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
          transition={
            shouldReduce ? undefined : { duration: 0.3, ease: "easeOut" }
          }
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center border border-purple-900">
              <RiBrainLine className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-text-primary leading-tight tracking-[-0.02em]">
                Elyxnet Agent
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="purple" dot>
                  v1.2.0 Active
                </Badge>
              </div>
            </div>
          </div>

          <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
            Leverage the distributed intelligence of the Elyxnet network. Queries cost 10 points and utilize active infrastructure nodes to crawl, aggregate, and synthesize data.
          </p>

          <QueryInput onSubmit={submitQuery} isStreaming={status === "streaming"} />
          <SuggestionChips onSelect={submitQuery} disabled={status === "streaming"} />
        </motion.div>

        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, x: -16 }}
          animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
          transition={
            shouldReduce
              ? undefined
              : { duration: 0.3, delay: 0.1, ease: "easeOut" }
          }
          className="flex-1 overflow-y-auto"
        >
          <QueryHistory queries={historyData?.history || []} />
        </motion.div>
      </div>

      {/* Right Column: Execution & Results */}
      <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col gap-6 min-h-[500px]">
        {status === "idle" ? (
          <motion.div
            initial={shouldReduce ? undefined : { opacity: 0 }}
            animate={shouldReduce ? undefined : { opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-border-strong rounded-2xl bg-bg-surface/50"
          >
            <div className="w-16 h-16 rounded-2xl bg-bg-raised flex items-center justify-center mb-4 border border-border-default">
              <RiBrainLine className="w-8 h-8 text-text-disabled" />
            </div>
            <h3 className="text-[16px] font-medium text-text-secondary mb-2">
              Agent Standby
            </h3>
            <p className="text-[13px] text-text-muted max-w-sm">
              Enter a query to initiate distributed data collection and analysis.
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6" ref={resultRef}>
            {(status === "streaming" || stages.length > 0) && (
              <ExecutionTrace
                stages={stages}
                isComplete={status === "completed" || status === "error"}
                duration={duration}
              />
            )}

            {(content || status === "completed") && (
              <ResultCard content={content} isStreaming={status === "streaming"} />
            )}

            {status === "error" && (
              <div className="p-4 bg-red-950/30 border border-red-950 rounded-xl text-[13px] text-red-400">
                {error || "An error occurred during execution. Points have been refunded."}
                <button
                  onClick={reset}
                  className="mt-3 px-4 py-2 bg-red-950 text-red-400 font-medium rounded-lg hover:bg-red-900 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
