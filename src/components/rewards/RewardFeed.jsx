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
  infra_uptime: { icon: RiFlashlightLine, color: "text-yellow-400 bg-yellow-950" },
  social_connect: { icon: RiTwitterXLine, color: "text-blue-400 bg-blue-950" },
  activity_bonus: { icon: RiGiftLine, color: "text-green-400 bg-green-950" },
  ai_query_spend: { icon: RiRobot2Line, color: "text-purple-400 bg-purple-950" },
  referral: { icon: RiUserAddLine, color: "text-yellow-400 bg-yellow-950" },
};

import { formatDistanceToNow } from "date-fns";

export default function RewardFeed({ rewards = [] }) {
  const shouldReduce = useReducedMotion();

  if (rewards.length === 0) {
    return (
      <div className="bg-bg-surface border border-border-default rounded-xl p-5">
        <h3 className="text-base font-medium text-text-primary mb-1">
          Reward History
        </h3>
        <p className="text-[11px] text-text-muted mb-4">
          Your complete points ledger
        </p>
        <p className="text-[13px] text-text-disabled py-4 text-center">
          No rewards history available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-surface border border-border-default rounded-xl p-5">
      <h3 className="text-base font-medium text-text-primary mb-1">
        Reward History
      </h3>
      <p className="text-[11px] text-text-muted mb-4">
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
              className="flex items-center gap-3 py-3 border-b border-border-default last:border-b-0"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${config.color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-text-primary truncate">
                  {r.description || r.label}
                </p>
                <p className="text-[11px] text-text-disabled">{r.createdAt ? formatDistanceToNow(new Date(r.createdAt), { addSuffix: true }) : (r.time || "Just now")}</p>
              </div>
              <span
                className={`text-[12px] font-semibold shrink-0 ${
                  isPositive ? "text-yellow-400" : "text-text-muted"
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
