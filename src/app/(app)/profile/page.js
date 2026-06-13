"use client";

import { motion, useReducedMotion } from "motion/react";
import { useSession } from "@/hooks/useSession";
import { useDashboard } from "@/hooks/useDashboard";
import { useSocials } from "@/hooks/useSocials";
import Badge from "@/components/ui/Badge";
import StatCard from "@/components/ui/StatCard";
import Skeleton from "@/components/ui/Skeleton";
import { RiWallet3Line, RiTimeLine, RiShieldCheckLine, RiFlashlightLine, RiLogoutBoxRLine, RiFileCopyLine } from "react-icons/ri";
import { useState } from "react";

export default function ProfilePage() {
  const shouldReduce = useReducedMotion();
  const { user, isLoading: sessionLoading } = useSession();
  const { data: dashData, isLoading: dashLoading } = useDashboard();
  const { accounts } = useSocials();
  const [copied, setCopied] = useState(false);

  const isLoading = sessionLoading || dashLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-64 h-10" />
        <Skeleton className="h-48 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1,2,3].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
      </div>
    );
  }

  const wallet = user?.walletAddress || dashData?.user?.walletAddress || "0x...";
  const stats = dashData?.stats || {};
  const joinedDate = user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "—";

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/connect";
  };

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.2, ease: "easeOut" }}
    >
      <div className="mb-6">
        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-text-primary leading-[1.1]">
          Profile
        </h2>
        <p className="text-sm text-text-muted mt-1">
          Your account details and network identity
        </p>
      </div>

      {/* Identity Card */}
      <div className="bg-gradient-to-b from-yellow-500/10 to-yellow-500/5 border border-dashed border-yellow-500/20 rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-yellow-400 flex items-center justify-center text-bg-base text-xl font-black">
              {wallet.slice(2, 4).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm text-text-primary">
                  {wallet.slice(0, 6)}…{wallet.slice(-4)}
                </p>
                <button
                  onClick={handleCopy}
                  className="text-text-disabled hover:text-text-primary transition-colors"
                  title="Copy address"
                >
                  <RiFileCopyLine className="w-3.5 h-3.5" />
                </button>
                {copied && <span className="text-[10px] text-green-400">Copied!</span>}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="green" dot>Connected</Badge>
                <Badge variant="yellow">BNB Chain</Badge>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <RiLogoutBoxRLine className="w-4 h-4" />
            Disconnect
          </button>
        </div>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Total Points"
          value={stats.totalPoints || 0}
          subline={`+${stats.todayEarned || 0} today`}
          progress={(stats.totalPoints || 0) % 100}
          progressMax={100}
          color="yellow"
          primary
          index={0}
        />
        <StatCard
          label="Infra Score"
          value={stats.infraScore || 0}
          subline={stats.infraStatus === "active" ? "● Active" : "○ Inactive"}
          progress={stats.infraScore || 0}
          progressMax={100}
          color="yellow"
          index={1}
          formatter={(v) => v.toFixed(1)}
        />
        <StatCard
          label="Accounts Linked"
          value={`${stats.accountsLinked || 0} / 6`}
          subline="Social platforms"
          progress={stats.accountsLinked || 0}
          progressMax={6}
          color="blue"
          index={2}
        />
        <StatCard
          label="Queries Used"
          value={stats.queriesUsed || 0}
          subline={`−${(stats.queriesUsed || 0) * 10} pts`}
          progress={stats.queriesUsed || 0}
          progressMax={50}
          color="purple"
          index={3}
        />
      </div>

      {/* Account Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Wallet Info */}
        <div className="bg-bg-surface border border-border-default rounded-2xl p-5">
          <h3 className="text-base font-semibold text-text-primary mb-4">Wallet Details</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-muted">
                <RiWallet3Line className="w-4 h-4" />
                <span className="text-xs font-medium">Address</span>
              </div>
              <span className="font-mono text-xs text-text-primary">{wallet.slice(0, 10)}…{wallet.slice(-6)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-muted">
                <RiShieldCheckLine className="w-4 h-4" />
                <span className="text-xs font-medium">Network</span>
              </div>
              <span className="text-xs text-text-primary">BNB Smart Chain</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-muted">
                <RiTimeLine className="w-4 h-4" />
                <span className="text-xs font-medium">Member since</span>
              </div>
              <span className="text-xs text-text-primary">{joinedDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-text-muted">
                <RiFlashlightLine className="w-4 h-4" />
                <span className="text-xs font-medium">Infrastructure</span>
              </div>
              <Badge variant={stats.infraStatus === "active" ? "yellow" : "muted"}>
                {stats.infraStatus === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Linked Platforms */}
        <div className="bg-bg-surface border border-border-default rounded-2xl p-5">
          <h3 className="text-base font-semibold text-text-primary mb-4">Linked Platforms</h3>
          {accounts && accounts.length > 0 ? (
            <div className="space-y-3">
              {accounts.map((acc) => (
                <div key={acc.platform} className="flex items-center justify-between p-3 rounded-lg bg-bg-base border border-border-default">
                  <div>
                    <p className="text-xs font-semibold text-text-primary capitalize">{acc.platform}</p>
                    <p className="text-[10px] font-mono text-text-muted truncate max-w-[200px]">{acc.username || acc.profileUrl}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {acc.score > 0 && <span className="text-[10px] text-yellow-400 font-semibold">{acc.score}pts</span>}
                    <Badge variant="green">Linked</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-text-muted mb-1">No platforms linked yet</p>
              <p className="text-xs text-text-disabled">Go to Infrastructure to link your accounts</p>
            </div>
          )}
        </div>
      </div>

      {/* Security & Session */}
      <div className="bg-bg-surface border border-border-default rounded-2xl p-5">
        <h3 className="text-base font-semibold text-text-primary mb-4">Security</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-bg-base border border-border-default text-center">
            <p className="text-xs font-medium text-text-muted mb-1">Auth Method</p>
            <p className="text-sm font-semibold text-text-primary">Wallet Signature</p>
          </div>
          <div className="p-4 rounded-xl bg-bg-base border border-border-default text-center">
            <p className="text-xs font-medium text-text-muted mb-1">Session</p>
            <p className="text-sm font-semibold text-text-primary">JWT (7 days)</p>
          </div>
          <div className="p-4 rounded-xl bg-bg-base border border-border-default text-center">
            <p className="text-xs font-medium text-text-muted mb-1">Encryption</p>
            <p className="text-sm font-semibold text-text-primary">AES-256-GCM</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
