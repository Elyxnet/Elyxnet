"use client";

"use client";

export default function RatePanel({ rate }) {
  const baseRate = rate?.baseRate || 1.0;
  const infraMultiplier = rate?.infraMultiplier || 1.0;
  const activityBonus = rate?.activityBonus || 1.0;
  const estimatedDaily = rate?.estimatedDaily || 0;

  return (
    <div className="bg-bg-surface border border-border-default rounded-xl p-5">
      <h3 className="text-base font-medium text-text-primary mb-1">
        Your Reward Rate
      </h3>
      <p className="text-[11px] text-text-muted mb-4">
        How your daily points are calculated
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-border-default">
          <span className="text-[13px] text-text-secondary">
            Accounts connected
          </span>
          <span className="text-[13px] font-medium text-text-primary">
            × {baseRate.toFixed(1)} base
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border-default">
          <span className="text-[13px] text-text-secondary">
            Infra score multiplier
          </span>
          <span className="text-[13px] font-medium text-yellow-400">
            × {infraMultiplier.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-border-default">
          <span className="text-[13px] text-text-secondary">
            Activity bonus
          </span>
          <span className="text-[13px] font-medium text-green-400">
            × {activityBonus.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border-subtle">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-text-primary">
            Estimated daily rate
          </span>
          <span className="text-lg font-bold text-yellow-400">
            ~{estimatedDaily} pts / day
          </span>
        </div>
      </div>
    </div>
  );
}
