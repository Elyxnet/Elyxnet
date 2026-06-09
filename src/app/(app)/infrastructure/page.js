"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import StatCard from "@/components/ui/StatCard";
import SocialCard from "@/components/infrastructure/SocialCard";
import InfraModePanel from "@/components/infrastructure/InfraModePanel";
import Badge from "@/components/ui/Badge";

export default function InfrastructurePage() {
  const shouldReduce = useReducedMotion();
  const [infraActive, setInfraActive] = useState(true);

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.2, ease: "easeOut" }}
    >
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[--color-text-primary] leading-[1.1]">
            Infrastructure
          </h2>
          <p className="text-[13px] text-[--color-text-muted] mt-1">
            Manage your infrastructure contribution and connected accounts
          </p>
        </div>
        <Badge variant={infraActive ? "yellow" : "muted"}>
          {infraActive ? "Infrastructure active" : "Inactive"}
        </Badge>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <StatCard
          label="Uptime"
          value={99.7}
          subline="Last 30 days"
          progress={99.7}
          progressMax={100}
          color="green"
          index={0}
          formatter={(v) => `${v.toFixed(1)}%`}
        />
        <StatCard
          label="Contribution Score"
          value={847}
          subline="Top contributor tier"
          progress={847}
          progressMax={1000}
          color="yellow"
          index={1}
        />
        <StatCard
          label="Network Rank"
          value="Top 12%"
          subline="Among 12,847 nodes"
          progress={88}
          progressMax={100}
          color="purple"
          index={2}
        />
      </div>

      {/* Platform cards */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-[--color-text-primary] mb-3">
          Connected Platforms
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SocialCard.platforms.map((platform, i) => (
            <SocialCard key={platform.id} platform={platform} index={i} />
          ))}
        </div>
      </div>

      {/* Infra Mode Panel */}
      <InfraModePanel
        active={infraActive}
        onToggle={setInfraActive}
      />
    </motion.div>
  );
}
