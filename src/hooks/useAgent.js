"use client";

import { useState, useCallback } from "react";

/**
 * Hook for AI Agent query submission and SSE stream parsing.
 * Supports infraMode for deep analysis (more stages, higher cost).
 */
export function useAgent() {
  const [status, setStatus] = useState("idle"); // idle | streaming | completed | error
  const [stages, setStages] = useState([]);
  const [content, setContent] = useState("");
  const [duration, setDuration] = useState(null);
  const [error, setError] = useState(null);

  const submitQuery = useCallback(async (query, infraMode = false) => {
    setStatus("streaming");
    setStages([]);
    setContent("");
    setDuration(null);
    setError(null);

    try {
      const res = await fetch("/api/agent/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, infraMode }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit query");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));

            switch (data.type) {
              case "stage":
                setStages((prev) => {
                  // Mark previous active stages as done
                  const updated = prev.map(s => 
                    s.state === "active" ? { ...s, state: "done", duration: data.elapsed } : s
                  );
                  return [
                    ...updated,
                    { 
                      id: data.stage, 
                      label: data.label, 
                      state: "active",
                      detail: data.detail || null,
                    },
                  ];
                });
                break;
              case "stage_done":
                setStages((prev) =>
                  prev.map(s => s.id === data.stage ? { ...s, state: "done", duration: data.elapsed } : s)
                );
                break;
              case "token":
                setContent((prev) => prev + data.content);
                break;
              case "done":
                // Mark all remaining stages as done
                setStages((prev) => prev.map(s => ({ ...s, state: "done" })));
                setDuration(data.durationMs);
                setStatus("completed");
                break;
              case "error":
                setError(data.message);
                setStatus("error");
                break;
            }
          } catch {}
        }
      }

      // Fallback if no "done" event received
      setStatus((prev) => prev === "streaming" ? "completed" : prev);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setStages([]);
    setContent("");
    setDuration(null);
    setError(null);
  }, []);

  return {
    status,
    stages,
    content,
    duration,
    error,
    submitQuery,
    reset,
  };
}
