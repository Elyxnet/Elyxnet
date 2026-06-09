"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  RiTwitterXLine,
  RiCoinLine,
  RiRobot2Line,
  RiFlashlightLine,
  RiCheckLine,
} from "react-icons/ri";

const iconMap = {
  social: RiTwitterXLine,
  reward: RiCoinLine,
  agent: RiRobot2Line,
  infra: RiFlashlightLine,
  bonus: RiCheckLine,
};

const colorMap = {
  social: "text-[--color-blue-400] bg-[--color-blue-950]",
  reward: "text-[--color-yellow-400] bg-[--color-yellow-950]",
  agent: "text-[--color-purple-400] bg-[--color-purple-950]",
  infra: "text-[--color-yellow-400] bg-[--color-yellow-950]",
  bonus: "text-[--color-green-400] bg-[--color-green-950]",
};

// Demo data
const activities = [
  {
    type: "social",
    label: "X account synced",
    time: "2m ago",
    amount: null,
  },
  {
    type: "reward",
    label: "Infrastructure uptime reward",
    time: "8m ago",
    amount: "+48 pts",
  },
  {
    type: "agent",
    label: "AI query executed",
    time: "15m ago",
    amount: "-10 pts",
  },
  {
    type: "reward",
    label: "Reward tick",
    time: "32m ago",
    amount: "+12 pts",
  },
  {
    type: "infra",
    label: "Infrastructure mode activated",
    time: "1h ago",
    amount: null,
  },
  {
    type: "bonus",
    label: "Activity bonus earned",
    time: "2h ago",
    amount: "+25 pts",
  },
];

export default function ActivityFeed() {
  const shouldReduce = useReducedMotion();

  return (
    <div className="bg-[--color-bg-surface] border border-[--color-border-default] rounded-xl p-5">
      <h3 className="text-base font-medium text-[--color-text-primary] mb-1">
        Recent Activity
      </h3>
      <p className="text-[11px] text-[--color-text-muted] mb-4">
        Your latest network events
      </p>

      <div className="space-y-0">
        {activities.map((item, i) => {
          const Icon = iconMap[item.type] || RiCheckLine;
          const colors = colorMap[item.type] || colorMap.bonus;

          return (
            <motion.div
              key={i}
              initial={
                shouldReduce ? undefined : { opacity: 0, x: -8 }
              }
              animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
              transition={
                shouldReduce
                  ? undefined
                  : { duration: 0.2, delay: i * 0.06, ease: "easeOut" }
              }
              className="flex items-center gap-3 py-3 border-b border-[--color-border-default] last:border-b-0"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${colors}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[--color-text-primary] truncate">
                  {item.label}
                </p>
                <p className="text-[11px] text-[--color-text-disabled]">
                  {item.time}
                </p>
              </div>
              {item.amount && (
                <span
                  className={`text-[12px] font-medium shrink-0 ${
                    item.amount.startsWith("+")
                      ? "text-[--color-yellow-400]"
                      : "text-[--color-text-muted]"
                  }`}
                >
                  {item.amount}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
