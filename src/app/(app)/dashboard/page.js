"use client";

import { motion, useReducedMotion } from "motion/react";
import StatCard from "@/components/ui/StatCard";
import RewardChart from "@/components/dashboard/RewardChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import { useDashboard } from "@/hooks/useDashboard";
import Skeleton from "@/components/ui/Skeleton";
import Link from "next/link";
import { RiArrowRightLine, RiFlashlightLine, RiRobot2Line, RiServerLine, RiCoinLine, RiGlobalLine } from "react-icons/ri";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

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
          {getGreeting()},{" "}
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
          subline="Social platforms"
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

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-text-primary mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { href: "/agent", icon: RiRobot2Line, label: "Run AI Query", desc: "Analyze markets with distributed intelligence", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
            { href: "/infrastructure", icon: RiServerLine, label: "Link Accounts", desc: "Add social platforms to earn more points", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
            { href: "/rewards", icon: RiCoinLine, label: "View Rewards", desc: "Check earnings and withdraw to BNB wallet", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`flex items-center gap-3 p-4 rounded-xl ${action.bg} border border-dashed ${action.border} hover:scale-[1.01] transition-transform group`}
              >
                <Icon className={`w-5 h-5 ${action.color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary">{action.label}</p>
                  <p className="text-[10px] text-text-muted">{action.desc}</p>
                </div>
                <RiArrowRightLine className="w-4 h-4 text-text-disabled group-hover:text-text-primary transition-colors shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Infrastructure overview */}
      <div className={`border border-dashed rounded-xl p-5 mb-6 ${user.infraActive ? "bg-yellow-950/20 border-yellow-border" : "bg-bg-surface border-border-default"}`}>
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

      {/* Network Overview */}
      <div className="bg-bg-surface border border-border-default rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-text-primary">Network Overview</h3>
          <Link href="/network" className="text-xs font-medium text-text-muted hover:text-text-primary transition-colors flex items-center gap-1">
            View all <RiArrowRightLine className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Nodes", value: "12,847", icon: RiGlobalLine, color: "text-yellow-400" },
            { label: "Active Now", value: "11,293", icon: RiServerLine, color: "text-green-400" },
            { label: "Queries/hr", value: "12.4k", icon: RiRobot2Line, color: "text-purple-400" },
            { label: "Uptime", value: "99.7%", icon: RiFlashlightLine, color: "text-blue-400" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="text-center p-3 rounded-xl bg-bg-base border border-border-default">
                <Icon className={`w-4 h-4 ${item.color} mx-auto mb-2`} />
                <p className="text-lg font-semibold text-text-primary tracking-tight">{item.value}</p>
                <p className="text-[10px] text-text-muted">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Getting Started Checklist */}
      {(stats.totalPoints === 0 || stats.accountsLinked === 0) && (
        <div className="bg-bg-surface border border-border-default rounded-2xl p-5">
          <h3 className="text-base font-semibold text-text-primary mb-4">Getting Started</h3>
          <div className="space-y-3">
            {[
              { label: "Connect wallet", done: true, desc: "Authentication complete" },
              { label: "Link social accounts", done: stats.accountsLinked > 0, desc: `${stats.accountsLinked}/6 platforms linked` },
              { label: "Activate Infrastructure Mode", done: user.infraActive, desc: "Enable distributed node contribution" },
              { label: "Run your first AI query", done: stats.queriesUsed > 0, desc: "Use the Agent to analyze data" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-bg-base border border-border-default">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${step.done ? "bg-green-400" : "border border-border-default"}`}>
                  {step.done && <span className="text-bg-base text-[10px] font-bold">✓</span>}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${step.done ? "text-text-muted line-through" : "text-text-primary"}`}>{step.label}</p>
                  <p className="text-[10px] text-text-disabled">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
