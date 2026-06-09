"use client";

import { motion, useReducedMotion } from "motion/react";
import StatCard from "@/components/ui/StatCard";
import RewardChart from "@/components/dashboard/RewardChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import Badge from "@/components/ui/Badge";

export default function DashboardPage() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={
        shouldReduce ? undefined : { duration: 0.2, ease: "easeOut" }
      }
    >
      {/* Welcome section */}
      <div className="mb-6">
        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[--color-text-primary] leading-[1.1]">
          Good evening,{" "}
          <span className="font-mono text-[22px] text-[--color-text-secondary]">
            0x1a2b…4f9c
          </span>
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="green" dot>
            Online
          </Badge>
          <span className="text-[13px] text-[--color-text-muted]">
            Elyxnet Network — 12,847 nodes active
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Total Points"
          value={24810}
          subline="+348 today"
          progress={72}
          color="yellow"
          primary
          index={0}
        />
        <StatCard
          label="Infra Score"
          value={92.4}
          subline="● Active now"
          progress={92}
          progressMax={100}
          color="yellow"
          index={1}
          formatter={(v) => v.toFixed(1)}
        />
        <StatCard
          label="Accounts Linked"
          value="4 / 6"
          subline="X · Discord · TG · YT"
          progress={4}
          progressMax={6}
          color="blue"
          index={2}
        />
        <StatCard
          label="AI Queries Used"
          value={17}
          subline="−170 pts spent"
          progress={17}
          progressMax={50}
          color="purple"
          index={3}
        />
      </div>

      {/* Two-column: Chart + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RewardChart />
        <ActivityFeed />
      </div>

      {/* Infrastructure overview */}
      <div className="bg-[--color-yellow-950]/20 border border-[--color-yellow-border] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-medium text-[--color-text-primary]">
              Infrastructure Mode
            </h3>
            <p className="text-[11px] text-[--color-text-muted] mt-0.5">
              Your accounts are enrolled as distributed infrastructure
            </p>
          </div>
          <Badge variant="yellow">Infrastructure active</Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center py-2">
            <p className="text-[11px] text-[--color-text-disabled] uppercase tracking-wider mb-1">
              Allocated
            </p>
            <p className="text-lg font-semibold text-[--color-text-primary]">
              847
            </p>
            <p className="text-[10px] text-[--color-text-muted]">nodes</p>
          </div>
          <div className="text-center py-2">
            <p className="text-[11px] text-[--color-text-disabled] uppercase tracking-wider mb-1">
              Coverage
            </p>
            <p className="text-lg font-semibold text-[--color-text-primary]">
              94%
            </p>
            <p className="text-[10px] text-[--color-text-muted]">network</p>
          </div>
          <div className="text-center py-2">
            <p className="text-[11px] text-[--color-text-disabled] uppercase tracking-wider mb-1">
              Utilization
            </p>
            <p className="text-lg font-semibold text-[--color-text-primary]">
              67%
            </p>
            <p className="text-[10px] text-[--color-text-muted]">capacity</p>
          </div>
          <div className="text-center py-2">
            <p className="text-[11px] text-[--color-text-disabled] uppercase tracking-wider mb-1">
              Uptime
            </p>
            <p className="text-lg font-semibold text-[--color-green-400]">
              14d
            </p>
            <p className="text-[10px] text-[--color-text-muted]">streak</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
