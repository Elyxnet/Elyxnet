"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import QueryInput from "@/components/agent/QueryInput";
import ExecutionTrace from "@/components/agent/ExecutionTrace";
import ResultCard from "@/components/agent/ResultCard";
import SuggestionChips from "@/components/agent/SuggestionChips";

// Execution stages with randomized durations
const EXECUTION_STAGES = [
  { id: "alloc", label: "Allocating infrastructure nodes", baseDelay: 1000 },
  { id: "scan_x", label: "Scanning X / Twitter", baseDelay: 800 },
  { id: "scan_reddit", label: "Scanning Reddit communities", baseDelay: 700 },
  { id: "aggregate", label: "Aggregating sentiment data", baseDelay: 1500 },
  { id: "cross_ref", label: "Cross-referencing sources", baseDelay: 900 },
  { id: "generate", label: "Generating intelligence report", baseDelay: 1200 },
];

// Simulated AI response
const MOCK_RESPONSE = `<h2>Bitcoin Sentiment Analysis</h2>
<p>Based on distributed analysis across <strong>847 infrastructure nodes</strong>, here are the key findings:</p>

<h3>Overall Sentiment: Moderately Bullish (68/100)</h3>

<ul>
<li><strong>X / Twitter</strong>: High engagement around ETF inflows. Sentiment score: 72/100</li>
<li><strong>Reddit</strong>: r/bitcoin showing increased institutional discussion. Score: 65/100</li>
<li><strong>Discord</strong>: Trading communities report accumulation patterns. Score: 71/100</li>
</ul>

<h3>Key Drivers</h3>
<ol>
<li><strong>Institutional accumulation</strong> — MicroStrategy and new ETF products driving positive narratives</li>
<li><strong>On-chain metrics</strong> — Long-term holder supply at all-time highs</li>
<li><strong>Macro environment</strong> — Favorable rate expectations boosting risk assets</li>
</ol>

<h3>Risk Factors</h3>
<ul>
<li>Leverage ratios in derivatives markets elevated above historical norms</li>
<li>Potential regulatory actions in EU markets could cause short-term volatility</li>
</ul>

<p><em>Analysis completed using GPT-4o via distributed node network. Coverage: 94% of target platforms.</em></p>`;

function jitter(base) {
  return base + (Math.random() - 0.5) * 400;
}

export default function AgentPage() {
  const shouldReduce = useReducedMotion();
  const [status, setStatus] = useState("idle");
  const [stages, setStages] = useState([]);
  const [nodeCount, setNodeCount] = useState(0);
  const [result, setResult] = useState(null);
  const [currentQuery, setCurrentQuery] = useState("");
  const [duration, setDuration] = useState(null);

  const runExecution = useCallback(async (query) => {
    setCurrentQuery(query);
    setStatus("streaming");
    setResult(null);
    setDuration(null);
    setNodeCount(0);

    const startTime = Date.now();

    // Initialize all stages as pending
    const initialStages = EXECUTION_STAGES.map((s) => ({
      ...s,
      state: "pending",
    }));
    setStages(initialStages);

    // Simulate execution stages one by one
    for (let i = 0; i < EXECUTION_STAGES.length; i++) {
      const delay = jitter(EXECUTION_STAGES[i].baseDelay);
      await new Promise((r) => setTimeout(r, delay));

      setStages((prev) =>
        prev.map((s, idx) => ({
          ...s,
          state: idx < i ? "done" : idx === i ? "active" : "pending",
        }))
      );

      // Animate node count at step 0
      if (i === 0) setNodeCount(847);
    }

    // Final step — mark all done
    await new Promise((r) => setTimeout(r, 600));
    setStages((prev) => prev.map((s) => ({ ...s, state: "done" })));

    // Set result
    const elapsed = Date.now() - startTime;
    setDuration(elapsed);
    setResult({
      query,
      content: MOCK_RESPONSE,
      model: "gpt-4o",
      tokens: 1247,
      pointsCost: 10,
    });
    setStatus("completed");
  }, []);

  const handleSubmit = (query) => {
    runExecution(query);
  };

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.2, ease: "easeOut" }}
    >
      {/* Page heading */}
      <div className="mb-6">
        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[--color-text-primary] leading-[1.1]">
          AI Agent
        </h2>
        <p className="text-[13px] text-[--color-text-muted] mt-1">
          Query the distributed intelligence network
        </p>
      </div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left panel — 60% */}
        <div className="flex-1 lg:w-[60%] space-y-6">
          <QueryInput
            onSubmit={handleSubmit}
            disabled={status === "streaming"}
          />

          {/* Suggestion chips — shown when idle */}
          {status === "idle" && (
            <div>
              <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled] mb-3">
                Suggested queries
              </p>
              <SuggestionChips onSelect={handleSubmit} />
            </div>
          )}

          {/* Result */}
          {result && (
            <ResultCard
              query={result.query}
              content={result.content}
              model={result.model}
              tokens={result.tokens}
              pointsCost={result.pointsCost}
              timestamp="Just now"
            />
          )}
        </div>

        {/* Right panel — 40% */}
        <div className="lg:w-[40%]">
          <ExecutionTrace
            stages={stages}
            nodeCount={nodeCount}
            status={status}
            duration={duration}
            pointsCost={10}
            metrics={
              status !== "idle"
                ? { coverage: "94%", depth: "4 layers", utilization: "67%" }
                : {}
            }
          />
        </div>
      </div>
    </motion.div>
  );
}
