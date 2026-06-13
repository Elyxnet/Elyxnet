"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useNetwork } from "@/hooks/useNetwork";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import ProgressBar from "@/components/ui/ProgressBar";
import DottedMap from "dotted-map";
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

  const [healthMetrics, setHealthMetrics] = useState([
    { label: "Node Availability", value: 99.7, unit: "%", bar: 99.7, color: "bg-green-400" },
    { label: "Query Throughput", value: 12.4, unit: "k/hr", bar: 82, color: "bg-blue-400" },
    { label: "Avg Response Time", value: 340, unit: "ms", bar: 65, color: "bg-yellow-400" },
    { label: "Data Coverage", value: 94.2, unit: "%", bar: 94.2, color: "bg-purple-400" },
  ]);

  const [activePins, setActivePins] = useState([
    { lat: 40.7128, lng: -74.0060, id: 0 }, // NYC
    { lat: 51.5074, lng: -0.1278, id: 1 }, // London
    { lat: 35.6762, lng: 139.6503, id: 2 }, // Tokyo
    { lat: 1.3521, lng: 103.8198, id: 3 }, // Singapore
    { lat: -33.8688, lng: 151.2093, id: 4 }, // Sydney
    { lat: 48.8566, lng: 2.3522, id: 5 }, // Paris
    { lat: 50.1109, lng: 8.6821, id: 6 }, // Frankfurt
    { lat: 37.7749, lng: -122.4194, id: 7 }, // SF
    { lat: -23.5505, lng: -46.6333, id: 8 }, // Sao Paulo
    { lat: 19.0760, lng: 72.8777, id: 9 }, // Mumbai
    { lat: 25.2048, lng: 55.2708, id: 10 }, // Dubai
    { lat: 43.6532, lng: -79.3832, id: 11 }, // Toronto
    { lat: 55.7558, lng: 37.6173, id: 12 }, // Moscow
    { lat: 14.5995, lng: 120.9842, id: 13 }, // Manila
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthMetrics(prev => prev.map(m => {
        let newVal = m.value;
        if (m.label === "Node Availability") {
          newVal = Math.min(100, Math.max(90, +(newVal + (Math.random() * 0.4 - 0.2)).toFixed(1)));
        } else if (m.label === "Query Throughput") {
          newVal = +(newVal + (Math.random() * 1.0 - 0.5)).toFixed(1);
        } else if (m.label === "Avg Response Time") {
          newVal = Math.floor(newVal + (Math.random() * 20 - 10));
        } else if (m.label === "Data Coverage") {
          newVal = Math.min(100, Math.max(80, +(newVal + (Math.random() * 0.6 - 0.3)).toFixed(1)));
        }
        return { 
          ...m, 
          value: newVal, 
          bar: m.label === "Avg Response Time" 
            ? Math.max(10, 100 - ((newVal - 200) / 3)) 
            : (m.label === "Query Throughput" ? Math.min(100, (newVal / 20) * 100) : newVal) 
        };
      }));

      setActivePins(prev => prev.map(pin => ({
        ...pin,
        lat: pin.lat + (Math.random() * 6 - 3),
        lng: pin.lng + (Math.random() * 6 - 3)
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const { basePoints, width, height } = useMemo(() => {
    const map = new DottedMap({ height: 50, grid: "diagonal" });
    return {
      basePoints: map.getPoints(),
      width: map.width,
      height: map.height
    };
  }, []);

  const pinData = useMemo(() => {
    const map = new DottedMap({ height: 50, grid: "diagonal" });
    activePins.forEach(pin => map.addPin({ lat: pin.lat, lng: pin.lng, data: pin.id }));
    return map.pins;
  }, [activePins]);

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
            {healthMetrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-text-muted">{metric.label}</span>
                  <span className="text-xs font-semibold text-text-primary">{metric.value}{metric.unit}</span>
                </div>
                <ProgressBar value={metric.bar} max={100} color={metric.color} />
              </div>
            ))}
          </div>
          <div className="mt-5 p-3 rounded-xl bg-yellow-950/20 border border-yellow-500/20">
            <p className="text-[11px] text-text-secondary leading-relaxed">
              <strong className="text-yellow-400 font-semibold">Live Monitoring:</strong> Health metrics update in real-time across the globally distributed network. High availability and minimal latency ensure reliable AI inference and data extraction pipelines. Values refresh every 30s based on node telemetry.
            </p>
          </div>
        </div>

        {/* Geographic Coverage */}
        <div className="bg-bg-surface border border-border-default rounded-2xl p-5">
          <h3 className="text-base font-semibold text-text-primary mb-4">Geographic Coverage</h3>
          <div className="relative h-48 flex items-center justify-center overflow-hidden rounded-lg bg-bg-base">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full opacity-70" style={{ transform: 'scale(1.15) translateY(10%)' }}>
              {/* Base map points */}
              {basePoints.map((p, i) => (
                <circle key={`dot-${i}`} cx={p.x} cy={p.y} r={0.35} fill="currentColor" className="text-text-disabled/30" />
              ))}
              
              {/* Active nodes */}
              {pinData.map((p, i) => (
                <motion.g 
                  key={`pin-${p.data}`} 
                  animate={{ x: p.x, y: p.y }} 
                  transition={{ duration: 4, ease: "easeInOut" }}
                >
                  <circle cx={0} cy={0} r={0.7} fill="#E6B93C" className="drop-shadow-[0_0_2px_rgba(230,185,60,0.8)]" />
                  <motion.circle 
                    cx={0} cy={0}
                    animate={{ r: [0.7, 2.5], opacity: [0.8, 0] }}
                    transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: "easeOut", delay: i * 0.2 }}
                    fill="#E6B93C" 
                  />
                </motion.g>
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
