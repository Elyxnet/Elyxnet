"use client";

import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, mono = false, error, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[--color-text-secondary] mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`bg-[--color-bg-surface] border border-[--color-border-default] rounded-lg
          text-sm text-[--color-text-primary] placeholder:text-[--color-text-disabled]
          px-3 h-9 w-full outline-none
          focus:border-[--color-yellow-400] focus:ring-2 focus:ring-[--color-yellow-950]
          transition-colors duration-150
          ${mono ? "font-mono text-[12px]" : ""}
          ${error ? "border-[--color-red-400]" : ""}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="text-[11px] text-[--color-red-400] mt-1">{error}</p>
      )}
    </div>
  );
});

export default Input;
