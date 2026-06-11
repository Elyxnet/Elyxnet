"use client";

import { useState, useRef } from "react";
import { RiSendPlaneLine } from "react-icons/ri";
import Button from "@/components/ui/Button";

export default function QueryInput({ onSubmit, disabled = false, pointsCost = 10 }) {
  const [query, setQuery] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (!query.trim() || disabled) return;
    onSubmit(query.trim());
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`transition-opacity duration-200 ${disabled ? "opacity-40" : ""}`}>
      <textarea
        ref={textareaRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask the network anything…"
        className="w-full min-h-[88px] resize-none bg-bg-surface border border-border-default rounded-xl
          focus:border-yellow-400 transition-colors text-sm font-normal text-text-primary
          placeholder:text-text-disabled p-4 outline-none focus:ring-2 focus:ring-yellow-950"
      />

      <div className="flex items-center justify-between mt-3">
        <span className="text-[11px] text-text-muted">
          −{pointsCost} pts per query
        </span>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!query.trim() || disabled}
        >
          <RiSendPlaneLine className="w-3.5 h-3.5" />
          Send Query
        </Button>
      </div>
    </div>
  );
}
