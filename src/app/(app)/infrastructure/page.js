"use client";

import { motion, useReducedMotion } from "motion/react";
import StatCard from "@/components/ui/StatCard";
import SocialCard from "@/components/infrastructure/SocialCard";
import InfraModePanel from "@/components/infrastructure/InfraModePanel";
import Badge from "@/components/ui/Badge";
import { useInfraStats } from "@/hooks/useInfraStats";
import { useSocials } from "@/hooks/useSocials";
import Skeleton from "@/components/ui/Skeleton";
import { RiLinkM, RiShieldCheckLine, RiTimeLine } from "react-icons/ri";

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
  const linkedCount = accounts?.length || 0;

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
          <p className="text-sm text-text-muted mt-1">
            Link your social accounts and contribute to the distributed intelligence network
          </p>
        </div>
        <Badge variant={infraActive ? "yellow" : "muted"}>
          {infraActive ? "Infrastructure active" : "Inactive"}
        </Badge>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Platforms Linked"
          value={`${linkedCount} / 6`}
          subline={`${linkedCount * 100} pts earned from linking`}
          progress={linkedCount}
          progressMax={6}
          color="blue"
          index={0}
        />
        <StatCard
          label="Uptime"
          value={node.uptimePercent || 0}
          subline="Last 30 days"
          progress={node.uptimePercent || 0}
          progressMax={100}
          color="green"
          index={1}
          formatter={(v) => `${v.toFixed(1)}%`}
        />
        <StatCard
          label="Contribution Score"
          value={node.contributionScore || 0}
          subline="Top contributor tier"
          progress={node.contributionScore || 0}
          progressMax={1000}
          color="yellow"
          index={2}
        />
        <StatCard
          label="Network Rank"
          value={stats?.networkRankPercent ? `Top ${stats.networkRankPercent}%` : "N/A"}
          subline={`Among ${stats?.totalNodes || 12847} nodes`}
          progress={100 - (stats?.networkRankPercent || 100)}
          progressMax={100}
          color="purple"
          index={3}
        />
      </div>

      {/* How linking works */}
      <div className="bg-bg-surface border border-border-default rounded-2xl p-5 mb-6">
        <h3 className="text-base font-semibold text-text-primary mb-3">How Account Linking Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-base border border-border-default">
            <RiLinkM className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-text-primary">Paste your link</p>
              <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed">
                Enter your profile URL for any supported platform. We validate the format and extract your handle automatically.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-base border border-border-default">
            <RiShieldCheckLine className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-text-primary">Verified & secured</p>
              <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed">
                No OAuth or passwords needed. Your links are encrypted and stored securely. Earn 100 points per platform linked.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-base border border-border-default">
            <RiTimeLine className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-text-primary">Passive earning</p>
              <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed">
                Once linked, your accounts become distributed nodes. Earn points continuously based on uptime and contribution score.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform cards */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-text-primary">
              Your Platforms
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Paste your profile links to connect. Advanced validation ensures only correct URLs are accepted.
            </p>
          </div>
          <Badge variant="blue">{linkedCount} linked</Badge>
        </div>
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
