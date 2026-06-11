"use client";

import { motion, useReducedMotion } from "motion/react";
import StatCard from "@/components/ui/StatCard";

const globalStats = [
  { label: "Total Nodes", value: 12847, color: "yellow" },
  { label: "Points Distributed", value: 4200000, color: "yellow", formatter: (v) => `$${(v / 1000000).toFixed(1)}M` },
  { label: "Queries Served", value: 847000, color: "purple", formatter: (v) => `${(v / 1000).toFixed(0)}K` },
  { label: "Active Contributors", value: 3842, color: "green" },
];

export default function GlobalStats({ stats }) {
  const shouldReduce = useReducedMotion();

  const dynamicStats = [
    { label: "Total Nodes", value: stats?.totalNodes || 12847, color: "yellow" },
    { label: "Points Distributed", value: stats?.totalPoints || 4200000, color: "yellow", formatter: (v) => `$${(v / 1000000).toFixed(1)}M` },
    { label: "Queries Served", value: stats?.totalQueries || 847000, color: "purple", formatter: (v) => `${(v / 1000).toFixed(0)}K` },
    { label: "Active Contributors", value: stats?.activeContributors || 3842, color: "green" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {dynamicStats.map((stat, i) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          color={stat.color}
          index={i}
          progress={70 + i * 5}
          formatter={stat.formatter}
        />
      ))}
    </div>
  );
}
