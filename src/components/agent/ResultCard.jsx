"use client";

import { motion, useReducedMotion } from "motion/react";
import ReactMarkdown from "react-markdown";

export default function ResultCard({ query, content, model, tokens, pointsCost, timestamp, isStreaming }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.25, ease: "easeOut" }}
      className="bg-bg-surface border border-border-default rounded-xl p-5"
    >
      {/* Header */}
      {query && (
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-border-default">
          <p className="text-[13px] text-text-muted truncate max-w-[70%]">
            {query}
          </p>
          <span className="text-[11px] text-text-disabled shrink-0">
            {timestamp || "Just now"}
          </span>
        </div>
      )}

      {/* Content — rendered markdown */}
      <div className="prose-agent text-[13px] text-text-primary leading-relaxed">
        {content ? (
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-lg font-bold text-text-primary mb-3 mt-4 first:mt-0">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-base font-semibold text-text-primary mb-2 mt-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm font-semibold text-text-primary mb-2 mt-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-[13px] text-text-secondary leading-relaxed mb-3">{children}</p>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-text-primary">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-text-secondary italic">{children}</em>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-5 space-y-1.5 mb-3 text-text-secondary">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 space-y-1.5 mb-3 text-text-secondary">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-[13px] text-text-secondary leading-relaxed">{children}</li>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code className="bg-bg-active px-1.5 py-0.5 rounded text-[12px] font-mono text-yellow-400">{children}</code>
                ) : (
                  <pre className="bg-bg-base border border-border-default rounded-lg p-4 overflow-x-auto mb-3">
                    <code className="text-[12px] font-mono text-text-primary">{children}</code>
                  </pre>
                ),
              pre: ({ children }) => <>{children}</>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-yellow-400 pl-4 my-3 text-text-muted italic">{children}</blockquote>
              ),
              hr: () => <hr className="border-border-default my-4" />,
              table: ({ children }) => (
                <div className="overflow-x-auto mb-3">
                  <table className="w-full text-[12px] border border-border-default rounded-lg overflow-hidden">{children}</table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-bg-base text-text-muted">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="px-3 py-2 text-left font-medium border-b border-border-default">{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-3 py-2 border-b border-border-default text-text-secondary">{children}</td>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <p className="text-text-disabled italic">
            {isStreaming ? "Generating response…" : "Waiting for response…"}
          </p>
        )}

        {isStreaming && content && (
          <span className="inline-block w-2 h-4 bg-yellow-400 animate-pulse ml-0.5 rounded-sm" />
        )}
      </div>

      {/* Footer */}
      {(model || tokens || pointsCost) && (
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
      )}
    </motion.div>
  );
}
