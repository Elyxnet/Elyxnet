"use client";

import { motion, useReducedMotion } from "motion/react";
import StatCard from "@/components/ui/StatCard";
import SocialCard from "@/components/infrastructure/SocialCard";
import InfraModePanel from "@/components/infrastructure/InfraModePanel";
import Badge from "@/components/ui/Badge";
import { useInfraStats } from "@/hooks/useInfraStats";
import { useSocials } from "@/hooks/useSocials";
import Skeleton from "@/components/ui/Skeleton";

export default function InfrastructurePage() {
  const shouldReduce = useReducedMotion();
  
  const { stats, isLoading: infraLoading } = useInfraStats();
  const { accounts, isLoading: socialsLoading, refresh: refreshSocials } = useSocials();

  if (infraLoading || socialsLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-64 h-10" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1,2,3].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  const infraActive = stats?.node?.status === "active";
  const node = stats?.node || {};

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.2, ease: "easeOut" }}
    >
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[28px] font-bold tracking-[-0.03em] text-text-primary leading-[1.1]">
            Infrastructure
          </h2>
          <p className="text-[13px] text-text-muted mt-1">
            Link your social accounts and contribute to the distributed network
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
          value={node.uptimePercent || 0}
          subline="Last 30 days"
          progress={node.uptimePercent || 0}
          progressMax={100}
          color="green"
          index={0}
          formatter={(v) => `${v.toFixed(1)}%`}
        />
        <StatCard
          label="Contribution Score"
          value={node.contributionScore || 0}
          subline="Top contributor tier"
          progress={node.contributionScore || 0}
          progressMax={1000}
          color="yellow"
          index={1}
        />
        <StatCard
          label="Network Rank"
          value={stats?.networkRankPercent ? `Top ${stats.networkRankPercent}%` : "N/A"}
          subline={`Among ${stats?.totalNodes || 0} nodes`}
          progress={100 - (stats?.networkRankPercent || 100)}
          progressMax={100}
          color="purple"
          index={2}
        />
      </div>

      {/* Platform cards */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-text-primary mb-1">
          Your Platforms
        </h3>
        <p className="text-[11px] text-text-muted mb-3">
          Paste your profile links to connect accounts to the network. No OAuth needed.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SocialCard.platforms.map((platformDef, i) => {
            const connectedAccount = accounts?.find(a => a.platform === platformDef.id);
            const enrichedPlatform = {
              ...platformDef,
              connected: !!connectedAccount,
              username: connectedAccount?.username || "",
              profileUrl: connectedAccount?.profileUrl || "",
              lastSync: connectedAccount?.lastSyncedAt || null,
              score: connectedAccount?.score || 0
            };
            
            return (
              <SocialCard
                key={platformDef.id}
                platform={enrichedPlatform}
                index={i}
                onLinked={refreshSocials}
              />
            );
          })}
        </div>
      </div>

      {/* Infra Mode Panel */}
      <InfraModePanel
        active={infraActive}
        onToggle={async (val) => {
          if (val) {
            await fetch('/api/infra/activate', { method: 'POST' });
          } else {
            await fetch('/api/infra/deactivate', { method: 'POST' });
          }
        }}
      />
    </motion.div>
  );
}
