"use client";

export default function RatePanel() {
  return (
    <div className="bg-[--color-bg-surface] border border-[--color-border-default] rounded-xl p-5">
      <h3 className="text-base font-medium text-[--color-text-primary] mb-1">
        Your Reward Rate
      </h3>
      <p className="text-[11px] text-[--color-text-muted] mb-4">
        How your daily points are calculated
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-[--color-border-default]">
          <span className="text-[13px] text-[--color-text-secondary]">
            Accounts connected
          </span>
          <span className="text-[13px] font-medium text-[--color-text-primary]">
            × 1.0 base
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-[--color-border-default]">
          <span className="text-[13px] text-[--color-text-secondary]">
            Infra score multiplier
          </span>
          <span className="text-[13px] font-medium text-[--color-yellow-400]">
            × 1.42
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-[--color-border-default]">
          <span className="text-[13px] text-[--color-text-secondary]">
            Activity bonus
          </span>
          <span className="text-[13px] font-medium text-[--color-green-400]">
            × 1.1
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-[--color-border-subtle]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[--color-text-primary]">
            Estimated daily rate
          </span>
          <span className="text-lg font-bold text-[--color-yellow-400]">
            ~348 pts / day
          </span>
        </div>
      </div>
    </div>
  );
}
