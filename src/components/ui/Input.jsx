"use client";

import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, mono = false, error, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`bg-bg-surface border border-border-default rounded-lg
          text-sm text-text-primary placeholder:text-text-disabled
          px-3 h-9 w-full outline-none
          focus:border-yellow-400 focus:ring-2 focus:ring-yellow-950
          transition-colors duration-150
          ${mono ? "font-mono text-[12px]" : ""}
          ${error ? "border-red-400" : ""}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="text-[11px] text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
});

export default Input;
