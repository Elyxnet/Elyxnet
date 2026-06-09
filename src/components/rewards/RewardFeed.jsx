"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  RiFlashlightLine,
  RiTwitterXLine,
  RiGiftLine,
  RiRobot2Line,
  RiUserAddLine,
} from "react-icons/ri";

const iconMap = {
  infra_uptime: { icon: RiFlashlightLine, color: "text-[--color-yellow-400] bg-[--color-yellow-950]" },
  social_connect: { icon: RiTwitterXLine, color: "text-[--color-blue-400] bg-[--color-blue-950]" },
  activity_bonus: { icon: RiGiftLine, color: "text-[--color-green-400] bg-[--color-green-950]" },
  ai_query_spend: { icon: RiRobot2Line, color: "text-[--color-purple-400] bg-[--color-purple-950]" },
  referral: { icon: RiUserAddLine, color: "text-[--color-yellow-400] bg-[--color-yellow-950]" },
};

// Demo data
const rewards = [
  { type: "infra_uptime", label: "Infrastructure uptime reward", amount: 48, time: "2m ago" },
  { type: "social_connect", label: "X account connected bonus", amount: 100, time: "1h ago" },
  { type: "activity_bonus", label: "Daily activity bonus", amount: 25, time: "3h ago" },
  { type: "ai_query_spend", label: "AI query: Bitcoin sentiment", amount: -10, time: "4h ago" },
  { type: "infra_uptime", label: "Infrastructure uptime reward", amount: 48, time: "6h ago" },
  { type: "infra_uptime", label: "Infrastructure uptime reward", amount: 48, time: "12h ago" },
  { type: "activity_bonus", label: "Weekly streak bonus", amount: 150, time: "1d ago" },
  { type: "social_connect", label: "Discord connected bonus", amount: 100, time: "2d ago" },
  { type: "ai_query_spend", label: "AI query: DeFi analysis", amount: -10, time: "2d ago" },
  { type: "referral", label: "Referral reward", amount: 200, time: "3d ago" },
];

export default function RewardFeed() {
  const shouldReduce = useReducedMotion();

  return (
    <div className="bg-[--color-bg-surface] border border-[--color-border-default] rounded-xl p-5">
      <h3 className="text-base font-medium text-[--color-text-primary] mb-1">
        Reward History
      </h3>
      <p className="text-[11px] text-[--color-text-muted] mb-4">
        Your complete points ledger
      </p>

      <div className="space-y-0">
        {rewards.map((r, i) => {
          const config = iconMap[r.type] || iconMap.infra_uptime;
          const Icon = config.icon;
          const isPositive = r.amount > 0;

          return (
            <motion.div
              key={i}
              initial={shouldReduce ? undefined : { opacity: 0, x: -8 }}
              animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
              transition={
                shouldReduce
                  ? undefined
                  : { duration: 0.2, delay: i * 0.04, ease: "easeOut" }
              }
              className="flex items-center gap-3 py-3 border-b border-[--color-border-default] last:border-b-0"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[--color-text-primary] truncate">
                  {r.label}
                </p>
                <p className="text-[11px] text-[--color-text-disabled]">{r.time}</p>
              </div>
              <span
                className={`text-[12px] font-semibold shrink-0 ${
                  isPositive ? "text-[--color-yellow-400]" : "text-[--color-text-muted]"
                }`}
              >
                {isPositive ? `+${r.amount}` : r.amount} pts
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
