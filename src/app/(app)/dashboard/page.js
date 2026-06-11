"use client";

import { motion, useReducedMotion } from "motion/react";
import StatCard from "@/components/ui/StatCard";
import RewardChart from "@/components/dashboard/RewardChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import Badge from "@/components/ui/Badge";
import { useDashboard } from "@/hooks/useDashboard";
import Skeleton from "@/components/ui/Skeleton";

export default function DashboardPage() {
  const shouldReduce = useReducedMotion();
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-64 h-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-center bg-bg-surface rounded-xl border border-red-950">
        <p className="text-red-400">Failed to load dashboard data. Please try again.</p>
      </div>
    );
  }

  const { user, stats, infraDetails, recentActivity } = data;

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
        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-text-primary leading-[1.1]">
          Good evening,{" "}
          <span className="font-mono text-[22px] text-text-secondary">
            {user.walletAddress.slice(0, 6)}…{user.walletAddress.slice(-4)}
          </span>
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="green" dot>
            Online
          </Badge>
          <span className="text-[13px] text-text-muted">
            Elyxnet Network
          </span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Total Points"
          value={stats.totalPoints}
          subline={`+${stats.todayEarned} today`}
          progress={stats.totalPoints % 100}
          progressMax={100}
          color="yellow"
          primary
          index={0}
        />
        <StatCard
          label="Infra Score"
          value={stats.infraScore}
          subline={stats.infraStatus === "active" ? "● Active now" : "○ Inactive"}
          progress={stats.infraScore}
          progressMax={100}
          color="yellow"
          index={1}
          formatter={(v) => v.toFixed(1)}
        />
        <StatCard
          label="Accounts Linked"
          value={`${stats.accountsLinked} / 6`}
          subline="X · Discord · TG · YT"
          progress={stats.accountsLinked}
          progressMax={6}
          color="blue"
          index={2}
        />
        <StatCard
          label="AI Queries Used"
          value={stats.queriesUsed}
          subline={`−${stats.queriesUsed * 10} pts spent`}
          progress={stats.queriesUsed}
          progressMax={50}
          color="purple"
          index={3}
        />
      </div>

      {/* Two-column: Chart + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RewardChart />
        <ActivityFeed activities={recentActivity} />
      </div>

      {/* Infrastructure overview */}
      <div className={`border border-dashed rounded-xl p-5 ${user.infraActive ? "bg-yellow-950/20 border-yellow-border" : "bg-bg-surface border-border-default"}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-medium text-text-primary">
              Infrastructure Mode
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              {user.infraActive ? "Your accounts are enrolled as distributed infrastructure" : "Enable in Infrastructure tab to start earning"}
            </p>
          </div>
          <Badge variant={user.infraActive ? "yellow" : "muted"}>{user.infraActive ? "Infrastructure active" : "Inactive"}</Badge>
        </div>

        {user.infraActive && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="text-center py-2">
              <p className="text-xs font-semibold tracking-wide text-text-muted mb-1">
                Allocated
              </p>
              <p className="text-lg font-semibold text-text-primary">
                {infraDetails?.accountsCount || 0}
              </p>
              <p className="text-[10px] text-text-muted">accounts</p>
            </div>
            <div className="text-center py-2">
              <p className="text-xs font-semibold tracking-wide text-text-muted mb-1">
                Score
              </p>
              <p className="text-lg font-semibold text-text-primary">
                {infraDetails?.contributionScore?.toFixed(1) || 0}
              </p>
              <p className="text-[10px] text-text-muted">rating</p>
            </div>
            <div className="text-center py-2">
              <p className="text-xs font-semibold tracking-wide text-text-muted mb-1">
                Uptime
              </p>
              <p className="text-lg font-semibold text-text-primary">
                {infraDetails?.uptimePercent?.toFixed(1) || 0}%
              </p>
              <p className="text-[10px] text-text-muted">reliability</p>
            </div>
            <div className="text-center py-2">
              <p className="text-xs font-semibold tracking-wide text-text-muted mb-1">
                Streak
              </p>
              <p className="text-lg font-semibold text-green-400">
                {infraDetails?.uptimeStreak || 0}d
              </p>
              <p className="text-[10px] text-text-muted">consecutive</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
