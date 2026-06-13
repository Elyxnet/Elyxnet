"use client";

import { motion, useReducedMotion } from "motion/react";
import { useNetwork } from "@/hooks/useNetwork";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import { RiGlobalLine, RiServerLine, RiFlashlightLine, RiGroupLine } from "react-icons/ri";

// Generate mock leaderboard when DB is empty
const mockLeaderboard = Array.from({ length: 15 }, (_, i) => ({
  rank: i + 1,
  walletAddress: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
  score: Math.floor(950 - i * 42 + Math.random() * 20),
  accountsCount: Math.floor(3 + Math.random() * 4),
  uptimePercent: parseFloat((99.9 - i * 0.3 + Math.random() * 0.2).toFixed(1)),
}));

export default function NetworkPage() {
  const shouldReduce = useReducedMotion();
  const { stats, leaderboard, isLoading } = useNetwork();

  const displayLeaderboard = leaderboard.length > 0 ? leaderboard : mockLeaderboard;

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
        <p className="text-sm text-text-muted mt-1">
          Global infrastructure statistics, contributor rankings, and network health monitoring
        </p>
      </div>

      {/* Global stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Total Nodes"
          value={stats.totalNodes?.toLocaleString() || "12,847"}
          subline="Distributed worldwide"
          progress={85}
          progressMax={100}
          color="yellow"
          primary
          index={0}
        />
        <StatCard
          label="Active Nodes"
          value={stats.activeNodes?.toLocaleString() || "11,293"}
          subline="Currently online"
          progress={stats.activeNodes ? Math.round((stats.activeNodes / stats.totalNodes) * 100) : 88}
          progressMax={100}
          color="green"
          index={1}
        />
        <StatCard
          label="Total Points"
          value={stats.totalPoints ? `${(stats.totalPoints / 1000000).toFixed(1)}M` : "4.2M"}
          subline="Distributed to contributors"
          progress={70}
          progressMax={100}
          color="blue"
          index={2}
        />
        <StatCard
          label="Contributors"
          value={stats.activeContributors?.toLocaleString() || "3,842"}
          subline="Active participants"
          progress={60}
          progressMax={100}
          color="purple"
          index={3}
        />
      </div>

      {/* Network Health + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Network Health */}
        <div className="bg-bg-surface border border-border-default rounded-2xl p-5">
          <h3 className="text-base font-semibold text-text-primary mb-4">Network Health</h3>
          <div className="space-y-4">
            {[
              { label: "Node Availability", value: "99.7%", bar: 99.7, color: "bg-green-400" },
              { label: "Query Throughput", value: "12.4k/hr", bar: 82, color: "bg-blue-400" },
              { label: "Avg Response Time", value: "340ms", bar: 65, color: "bg-yellow-400" },
              { label: "Data Coverage", value: "94.2%", bar: 94.2, color: "bg-purple-400" },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-text-muted">{metric.label}</span>
                  <span className="text-xs font-semibold text-text-primary">{metric.value}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${metric.color}`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${metric.bar}%` }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Coverage */}
        <div className="bg-bg-surface border border-border-default rounded-2xl p-5">
          <h3 className="text-base font-semibold text-text-primary mb-4">Geographic Coverage</h3>
          <div className="relative h-48 flex items-center justify-center overflow-hidden rounded-lg bg-bg-base">
            <svg viewBox="0 0 800 400" className="w-full h-full opacity-20" fill="none">
              {/* North America */}
              {[[150,120],[170,100],[190,130],[210,110],[230,140],[160,150],[180,160],[200,145],[140,135]].map(([cx,cy],i) => (
                <circle key={`na-${i}`} cx={cx} cy={cy} r="3" fill="currentColor" className="text-text-disabled" />
              ))}
              {/* Europe */}
              {[[380,90],[400,80],[420,95],[390,110],[410,105],[430,85],[415,120],[395,75]].map(([cx,cy],i) => (
                <circle key={`eu-${i}`} cx={cx} cy={cy} r="3" fill="currentColor" className="text-text-disabled" />
              ))}
              {/* Asia */}
              {[[520,100],[560,110],[600,90],[580,130],[540,120],[620,100],[640,120],[550,140],[610,140]].map(([cx,cy],i) => (
                <circle key={`as-${i}`} cx={cx} cy={cy} r="3" fill="currentColor" className="text-text-disabled" />
              ))}
              {/* Active nodes — yellow */}
              {[[180,130],[400,90],[560,110],[420,100],[600,100],[200,145],[390,110],[540,120],[160,120],[580,130],[230,140],[430,85],[620,100]].map(([cx,cy],i) => (
                <circle key={`active-${i}`} cx={cx} cy={cy} r="4" fill="#E6B93C" opacity="0.8" />
              ))}
            </svg>
            <div className="absolute bottom-3 left-3">
              <span className="text-[11px] text-text-disabled">
                {stats.totalNodes?.toLocaleString() || "12,847"} nodes across 42 countries
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { region: "Americas", nodes: "4,280", pct: "33%" },
              { region: "Europe", nodes: "3,855", pct: "30%" },
              { region: "Asia-Pacific", nodes: "4,712", pct: "37%" },
            ].map((r) => (
              <div key={r.region} className="text-center p-2 rounded-lg bg-bg-base border border-border-default">
                <p className="text-[10px] text-text-muted">{r.region}</p>
                <p className="text-sm font-semibold text-text-primary">{r.nodes}</p>
                <p className="text-[10px] text-text-disabled">{r.pct}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-bg-surface border border-border-default rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-text-primary">Top Contributors</h3>
          <Badge variant="yellow">{displayLeaderboard.length} nodes</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left py-2 px-3 text-xs font-medium text-text-muted">#</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-text-muted">Node</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-text-muted">Score</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-text-muted hidden sm:table-cell">Accounts</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-text-muted hidden md:table-cell">Uptime</th>
              </tr>
            </thead>
            <tbody>
              {displayLeaderboard.map((entry) => (
                <tr key={entry.rank} className="border-b border-border-default/50 hover:bg-bg-hover transition-colors">
                  <td className="py-2.5 px-3">
                    <span className={`text-xs font-semibold ${entry.rank <= 3 ? "text-yellow-400" : "text-text-muted"}`}>
                      {entry.rank}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-xs text-text-primary">
                    {entry.walletAddress}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-xs font-semibold text-text-primary">{entry.score}</span>
                  </td>
                  <td className="py-2.5 px-3 hidden sm:table-cell text-xs text-text-muted">
                    {entry.accountsCount}
                  </td>
                  <td className="py-2.5 px-3 hidden md:table-cell">
                    <span className="text-xs text-green-400 font-medium">{entry.uptimePercent}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Network Activity */}
      <div className="mt-6 bg-bg-surface border border-border-default rounded-2xl p-5">
        <h3 className="text-base font-semibold text-text-primary mb-4">Recent Network Activity</h3>
        <div className="space-y-3">
          {[
            { event: "New node joined", detail: "0x7a2f...b3c1 connected from Singapore", time: "2m ago", type: "join" },
            { event: "Infrastructure query processed", detail: "847 nodes allocated for deep analysis", time: "5m ago", type: "query" },
            { event: "Rewards distributed", detail: "12,400 pts across 842 active nodes", time: "12m ago", type: "reward" },
            { event: "Network snapshot taken", detail: "99.7% availability recorded", time: "30m ago", type: "snapshot" },
            { event: "Leaderboard updated", detail: "Top scorer: 0x3e91...f2a8 (score: 950)", time: "1h ago", type: "leaderboard" },
          ].map((activity, i) => (
            <motion.div
              key={i}
              initial={shouldReduce ? undefined : { opacity: 0, x: -8 }}
              animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
              transition={shouldReduce ? undefined : { duration: 0.3, delay: i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg bg-bg-base border border-border-default"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === "join" ? "bg-green-400" :
                  activity.type === "query" ? "bg-purple-400" :
                  activity.type === "reward" ? "bg-yellow-400" :
                  "bg-blue-400"
                }`} />
                <div>
                  <p className="text-xs font-medium text-text-primary">{activity.event}</p>
                  <p className="text-[10px] text-text-muted">{activity.detail}</p>
                </div>
              </div>
              <span className="text-[10px] text-text-disabled shrink-0">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
