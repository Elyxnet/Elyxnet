"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCountUp } from "@/hooks/useCountUp";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import RewardFeed from "@/components/rewards/RewardFeed";
import RatePanel from "@/components/rewards/RatePanel";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// 30-day chart data
const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  points: Math.floor(200 + Math.random() * 400 + i * 15),
}));

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[--color-bg-surface] border border-[--color-border-subtle] rounded-lg px-3 py-2">
        <p className="text-[11px] text-[--color-text-muted]">Day {label}</p>
        <p className="text-sm font-semibold text-[--color-yellow-400]">
          +{payload[0].value} pts
        </p>
      </div>
    );
  }
  return null;
}

export default function RewardsPage() {
  const shouldReduce = useReducedMotion();
  const totalPoints = useCountUp(24810);

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 8 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={shouldReduce ? undefined : { duration: 0.2, ease: "easeOut" }}
    >
      {/* Balance display */}
      <div className="mb-6">
        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[--color-text-primary] leading-[1.1] mb-4">
          Rewards
        </h2>

        <div className="bg-[--color-yellow-950]/20 border border-[--color-yellow-border] rounded-xl p-6">
          <p className="text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled] mb-2">
            Total points earned
          </p>
          <p className="text-[40px] font-bold text-[--color-yellow-400] tracking-[-0.02em] leading-tight">
            {totalPoints.toLocaleString()}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <Badge variant="muted">On-chain claims coming soon</Badge>
          </div>
        </div>
      </div>

      {/* 30-day chart */}
      <div className="bg-[--color-bg-surface] border border-[--color-border-default] rounded-xl p-5 mb-6">
        <h3 className="text-base font-medium text-[--color-text-primary] mb-1">
          30-Day Accrual
        </h3>
        <p className="text-[11px] text-[--color-text-muted] mb-4">
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
        <RewardFeed />
        <RatePanel />
      </div>
    </motion.div>
  );
}
