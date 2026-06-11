"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { RiBrainLine, RiFlashlightLine, RiToggleLine, RiToggleFill } from "react-icons/ri";
import QueryInput from "@/components/agent/QueryInput";
import SuggestionChips from "@/components/agent/SuggestionChips";
import ResultCard from "@/components/agent/ResultCard";
import QueryHistory from "@/components/agent/QueryHistory";
import Badge from "@/components/ui/Badge";
import { useAgent } from "@/hooks/useAgent";
import useSWR from "swr";

function InfraStageCard({ stage, index, shouldReduce }) {
  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, x: -12 }}
      animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
      className="flex items-center gap-3 p-3 rounded-lg bg-bg-base border border-border-default"
    >
      <div className={`w-2 h-2 rounded-full shrink-0 ${
        stage.state === "done" ? "bg-green-400" : 
        stage.state === "active" ? "bg-yellow-400 animate-pulse" : "bg-bg-active"
      }`} />
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium text-text-primary truncate">{stage.label}</p>
        {stage.detail && (
          <p className="text-[10px] text-text-muted mt-0.5">{stage.detail}</p>
        )}
      </div>
      {stage.state === "done" && stage.duration && (
        <span className="text-[10px] text-text-disabled font-mono shrink-0">
          {stage.duration}ms
        </span>
      )}
      {stage.state === "active" && (
        <span className="text-[10px] text-yellow-400 font-mono shrink-0 animate-pulse">
          running
        </span>
      )}
    </motion.div>
  );
}

function InfraMetricsBar({ metrics, shouldReduce }) {
  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.3, delay: 0.2 }}
      className="grid grid-cols-4 gap-2 p-3 rounded-lg bg-bg-base border border-border-default"
    >
      {[
        { label: "Nodes", value: metrics.nodes || "—", color: "text-yellow-400" },
        { label: "Coverage", value: metrics.coverage || "—", color: "text-blue-400" },
        { label: "Latency", value: metrics.latency || "—", color: "text-green-400" },
        { label: "Cost", value: metrics.cost || "—", color: "text-red-400" },
      ].map((m) => (
        <div key={m.label} className="text-center">
          <p className="text-[10px] text-text-disabled uppercase tracking-wider">{m.label}</p>
          <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default function AgentPage() {
  const shouldReduce = useReducedMotion();
  const { status, stages, content, duration, error, submitQuery, reset } = useAgent();
  const resultRef = useRef(null);
  const [infraMode, setInfraMode] = useState(false);

  const { data: historyData, mutate: refreshHistory } = useSWR("/api/agent/history", (url) => fetch(url).then(r => r.json()));

  useEffect(() => {
    if (status === "completed" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      refreshHistory();
    }
  }, [status, refreshHistory]);

  const handleSubmit = (query) => {
    submitQuery(query, infraMode);
  };

  const pointsCost = infraMode ? 25 : 10;

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      {/* Left Column: Input & Context */}
      <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col gap-6">
        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, x: -16 }}
          animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
          transition={shouldReduce ? undefined : { duration: 0.3, ease: "easeOut" }}
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

          <p className="text-[14px] text-text-secondary leading-relaxed mb-4">
            Leverage the distributed intelligence of the Elyxnet network. Queries are processed through active infrastructure nodes to crawl, aggregate, and synthesize data.
          </p>

          {/* Infrastructure Mode Toggle */}
          <div className={`rounded-xl p-4 mb-4 border transition-colors ${
            infraMode 
              ? "bg-yellow-950/30 border-yellow-border" 
              : "bg-bg-surface border-border-default"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RiFlashlightLine className={`w-4 h-4 ${infraMode ? "text-yellow-400" : "text-text-muted"}`} />
                <div>
                  <p className="text-[13px] font-medium text-text-primary">Infrastructure Mode</p>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {infraMode 
                      ? "Deep analysis: 25 pts per query • Extended node allocation" 
                      : "Standard mode: 10 pts per query"
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={() => setInfraMode(!infraMode)}
                disabled={status === "streaming"}
                className="transition-all disabled:opacity-40"
              >
                {infraMode ? (
                  <RiToggleFill className="w-8 h-8 text-yellow-400" />
                ) : (
                  <RiToggleLine className="w-8 h-8 text-text-disabled" />
                )}
              </button>
            </div>
          </div>

          <QueryInput onSubmit={handleSubmit} isStreaming={status === "streaming"} />
          <SuggestionChips onSelect={handleSubmit} disabled={status === "streaming"} />

          {/* Cost indicator */}
          <div className="flex items-center justify-between mt-3 px-1">
            <span className="text-[11px] text-text-disabled">Query cost</span>
            <span className={`text-[11px] font-semibold ${infraMode ? "text-yellow-400" : "text-text-muted"}`}>
              −{pointsCost} points
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduce ? undefined : { opacity: 0, x: -16 }}
          animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
          transition={shouldReduce ? undefined : { duration: 0.3, delay: 0.1, ease: "easeOut" }}
          className="flex-1 overflow-y-auto"
        >
          <QueryHistory queries={historyData?.history || []} />
        </motion.div>
      </div>

      {/* Right Column: Execution & Results */}
      <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col gap-4 min-h-[500px]">
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
            <p className="text-[13px] text-text-muted max-w-sm mb-4">
              Enter a query to initiate distributed data collection and analysis.
            </p>
            {infraMode && (
              <Badge variant="yellow">Infrastructure Mode enabled — Deep analysis active</Badge>
            )}
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4" ref={resultRef}>
            {/* Execution Pipeline Header */}
            <div className="bg-bg-raised border border-border-default rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-text-disabled">
                  Execution Pipeline
                </p>
                <div className="flex items-center gap-2">
                  {infraMode && <Badge variant="yellow">Infra Mode</Badge>}
                  {status === "streaming" ? (
                    <span className="text-[11px] font-medium text-yellow-400 animate-pulse">Processing…</span>
                  ) : status === "completed" && duration ? (
                    <span className="text-[11px] font-medium text-green-400">
                      Done in {(duration / 1000).toFixed(1)}s
                    </span>
                  ) : status === "error" ? (
                    <span className="text-[11px] font-medium text-red-400">Failed</span>
                  ) : null}
                </div>
              </div>

              {/* Live Infrastructure Metrics */}
              <InfraMetricsBar
                metrics={{
                  nodes: stages.length > 2 ? (infraMode ? "847" : "312") : "—",
                  coverage: stages.length > 3 ? (infraMode ? "94%" : "72%") : "—",
                  latency: duration ? `${(duration / 1000).toFixed(1)}s` : "—",
                  cost: `${pointsCost}pts`,
                }}
                shouldReduce={shouldReduce}
              />

              {/* Stage Pipeline */}
              <div className="space-y-2 mt-3">
                <AnimatePresence>
                  {stages.map((stage, i) => (
                    <InfraStageCard
                      key={stage.id}
                      stage={stage}
                      index={i}
                      shouldReduce={shouldReduce}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-border-default">
                <span className="text-[11px] text-text-muted">
                  −{pointsCost} pts deducted
                </span>
                <span className="text-[11px] text-text-disabled">
                  {stages.length} / {infraMode ? 8 : 6} stages
                </span>
              </div>
            </div>

            {/* Result */}
            {(content || status === "completed") && (
              <ResultCard content={content} isStreaming={status === "streaming"} />
            )}

            {/* Error */}
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
