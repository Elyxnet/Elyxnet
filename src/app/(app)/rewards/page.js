"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useCountUp } from "@/hooks/useCountUp";
import Badge from "@/components/ui/Badge";
import RewardFeed from "@/components/rewards/RewardFeed";
import RatePanel from "@/components/rewards/RatePanel";
import { useRewards } from "@/hooks/useRewards";
import { useSession } from "@/hooks/useSession";
import Skeleton from "@/components/ui/Skeleton";
import useSWR from "swr";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { RiWallet3Line, RiExternalLinkLine } from "react-icons/ri";

// 30-day chart data
const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  points: Math.floor(200 + Math.random() * 400 + i * 15),
}));

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-surface border border-border-subtle rounded-lg px-3 py-2">
        <p className="text-[11px] text-text-muted">Day {label}</p>
        <p className="text-sm font-semibold text-yellow-400">
          +{payload[0].value} pts
        </p>
      </div>
    );
  }
  return null;
}

export default function RewardsPage() {
  const shouldReduce = useReducedMotion();
  const { user } = useSession();
  const { balance, todayEarned, rate, error: rewardsError, refresh: refreshRewards } = useRewards();
  const { data: historyData } = useSWR("/api/rewards/history", (url) => fetch(url).then(r => r.json()));
  
  const totalPoints = useCountUp(balance || 0);

  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawStatus, setWithdrawStatus] = useState(null); // null | 'success' | 'error'
  const [withdrawMessage, setWithdrawMessage] = useState("");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount);
    if (!amount || amount <= 0 || amount > balance) return;

    setWithdrawing(true);
    setWithdrawStatus(null);

    try {
      const res = await fetch("/api/rewards/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Withdrawal failed");
      }

      setWithdrawStatus("success");
      setWithdrawMessage(`${amount} points queued for withdrawal to your BNB wallet`);
      setWithdrawAmount("");
      refreshRewards();
    } catch (err) {
      setWithdrawStatus("error");
      setWithdrawMessage(err.message);
    } finally {
      setWithdrawing(false);
    }
  };

  if (rewardsError) {
    return (
      <div className="p-8 text-center bg-bg-surface rounded-xl border border-red-950">
        <p className="text-red-400">Failed to load rewards data. Please try again.</p>
      </div>
    );
  }

  if (balance === undefined) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-64 h-24 rounded-xl" />
        <Skeleton className="w-full h-48 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.2, ease: "easeOut" }}
    >
      {/* Balance display */}
      <div className="mb-6">
        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-text-primary leading-[1.1] mb-4">
          Rewards
        </h2>

        <div className="bg-yellow-950/20 border border-yellow-border rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-text-disabled mb-2">
                Total points earned
              </p>
              <p className="text-[40px] font-bold text-yellow-400 tracking-[-0.02em] leading-tight">
                {totalPoints.toLocaleString()}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <Badge variant="green">+{todayEarned} today</Badge>
              </div>
            </div>

            {/* Withdraw Section */}
            <div className="flex flex-col gap-2">
              {!showWithdraw ? (
                <button
                  onClick={() => setShowWithdraw(true)}
                  className="h-11 px-6 bg-yellow-400 text-bg-base rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-yellow-200 transition-colors"
                >
                  <RiWallet3Line className="w-4 h-4" />
                  Withdraw
                </button>
              ) : (
                <div className="bg-bg-base border border-border-default rounded-xl p-4 w-72">
                  <p className="text-[11px] font-medium text-text-muted mb-2">
                    Withdraw to connected BNB wallet
                  </p>
                  {user?.walletAddress && (
                    <p className="text-[10px] font-mono text-text-disabled mb-3 truncate">
                      → {user.walletAddress}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Amount"
                      max={balance}
                      min={1}
                      className="flex-1 h-9 px-3 rounded-lg bg-bg-surface border border-border-default text-text-primary text-sm placeholder:text-text-disabled focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                    <button
                      onClick={handleWithdraw}
                      disabled={withdrawing || !withdrawAmount || parseInt(withdrawAmount) > balance}
                      className="h-9 px-4 bg-yellow-400 text-bg-base rounded-lg text-[12px] font-bold hover:bg-yellow-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {withdrawing ? "Processing..." : "Confirm"}
                    </button>
                  </div>
                  <button
                    onClick={() => { setShowWithdraw(false); setWithdrawStatus(null); }}
                    className="text-[11px] text-text-disabled hover:text-text-muted transition-colors"
                  >
                    Cancel
                  </button>
                  {withdrawStatus === "success" && (
                    <p className="text-green-400 text-[11px] mt-2">{withdrawMessage}</p>
                  )}
                  {withdrawStatus === "error" && (
                    <p className="text-red-400 text-[11px] mt-2">{withdrawMessage}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 30-day chart */}
      <div className="bg-bg-surface border border-border-default rounded-xl p-5 mb-6">
        <h3 className="text-base font-medium text-text-primary mb-1">
          30-Day Accrual
        </h3>
        <p className="text-[11px] text-text-muted mb-4">
          Points earned per day over the last month
        </p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1C1C1E"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#52525B", fontSize: 11 }}
                interval={4}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#52525B", fontSize: 11 }}
                width={35}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="points"
                stroke="#E6B93C"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#E6B93C",
                  stroke: "#2A2008",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two-column: Feed + Rate Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RewardFeed rewards={historyData?.rewards || []} />
        <RatePanel rate={rate} />
      </div>
    </motion.div>
  );
}
