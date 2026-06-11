"use client";

import { motion, useReducedMotion } from "motion/react";
import GlobalStats from "@/components/network/GlobalStats";
import Leaderboard from "@/components/network/Leaderboard";
import { useNetwork } from "@/hooks/useNetwork";
import Skeleton from "@/components/ui/Skeleton";

export default function NetworkPage() {
  const shouldReduce = useReducedMotion();
  const { stats, leaderboard, isLoading } = useNetwork();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-64 h-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.2, ease: "easeOut" }}
    >
      {/* Page heading */}
      <div className="mb-6">
        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-text-primary leading-[1.1]">
          Network
        </h2>
        <p className="text-[13px] text-text-muted mt-1">
          Global infrastructure statistics and contributor rankings
        </p>
      </div>

      {/* Global stats */}
      <div className="mb-6">
        <GlobalStats stats={stats} />
      </div>

      {/* Leaderboard */}
      <div className="mb-6">
        <Leaderboard data={leaderboard} />
      </div>

      {/* Network map placeholder */}
      <div className="bg-bg-surface border border-border-default rounded-xl p-6">
        <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-text-disabled mb-4">
          Geographic Coverage
        </p>
        <div className="relative h-48 flex items-center justify-center overflow-hidden rounded-lg bg-bg-base">
          {/* Simplified world map dots */}
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full opacity-20"
            fill="none"
          >
            {/* Continents approximation via dot clusters */}
            {/* North America */}
            {[
              [150, 120], [170, 100], [190, 130], [210, 110], [230, 140],
              [160, 150], [180, 160], [200, 145], [140, 135],
            ].map(([cx, cy], i) => (
              <circle key={`na-${i}`} cx={cx} cy={cy} r="3" fill="#1C1C1E" />
            ))}
            {/* Europe */}
            {[
              [380, 90], [400, 80], [420, 95], [390, 110], [410, 105],
              [430, 85], [415, 120], [395, 75],
            ].map(([cx, cy], i) => (
              <circle key={`eu-${i}`} cx={cx} cy={cy} r="3" fill="#1C1C1E" />
            ))}
            {/* Asia */}
            {[
              [520, 100], [560, 110], [600, 90], [580, 130], [540, 120],
              [620, 100], [640, 120], [550, 140], [610, 140],
            ].map(([cx, cy], i) => (
              <circle key={`as-${i}`} cx={cx} cy={cy} r="3" fill="#1C1C1E" />
            ))}
            {/* Active nodes — yellow */}
            {[
              [180, 130], [400, 90], [560, 110], [420, 100], [600, 100],
              [200, 145], [390, 110], [540, 120], [160, 120], [580, 130],
              [230, 140], [430, 85], [620, 100],
            ].map(([cx, cy], i) => (
              <circle key={`active-${i}`} cx={cx} cy={cy} r="4" fill="#E6B93C" opacity="0.8" />
            ))}
          </svg>

          <div className="absolute bottom-3 left-3">
            <span className="text-[11px] text-text-disabled">
              {stats?.totalNodes?.toLocaleString() || 12847} nodes across 42 countries
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
