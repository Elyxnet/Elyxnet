"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  RiTwitterXLine,
  RiCoinLine,
  RiRobot2Line,
  RiFlashlightLine,
  RiCheckLine,
} from "react-icons/ri";
import { formatDistanceToNow } from "date-fns";

const iconMap = {
  social_connect: RiTwitterXLine,
  infra_uptime: RiCoinLine,
  ai_query_spend: RiRobot2Line,
  activity_bonus: RiCheckLine,
};

const colorMap = {
  social_connect: "text-blue-400 bg-blue-950",
  infra_uptime: "text-yellow-400 bg-yellow-950",
  ai_query_spend: "text-purple-400 bg-purple-950",
  activity_bonus: "text-green-400 bg-green-950",
};

export default function ActivityFeed({ activities = [] }) {
  const shouldReduce = useReducedMotion();

  if (activities.length === 0) {
    return (
      <div className="bg-bg-surface border border-border-default rounded-xl p-5">
        <h3 className="text-base font-medium text-text-primary mb-1">
          Recent Activity
        </h3>
        <p className="text-[11px] text-text-muted mb-4">
          Your latest network events
        </p>
        <p className="text-[13px] text-text-disabled py-4 text-center">
          No activity yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-surface border border-border-default rounded-xl p-5">
      <h3 className="text-base font-medium text-text-primary mb-1">
        Recent Activity
      </h3>
      <p className="text-[11px] text-text-muted mb-4">
        Your latest network events
      </p>

      <div className="space-y-0">
        {activities.map((item, i) => {
          const Icon = iconMap[item.type] || RiCheckLine;
          const colors = colorMap[item.type] || colorMap.activity_bonus;
          const timeAgo = formatDistanceToNow(new Date(item.time), { addSuffix: true });
          const isPositive = item.amount > 0;
          const formattedAmount = item.amount ? (isPositive ? `+${item.amount}` : item.amount) : null;

          return (
            <motion.div
              key={item.id || i}
              initial={
                shouldReduce ? undefined : { opacity: 0, x: -8 }
              }
              animate={shouldReduce ? undefined : { opacity: 1, x: 0 }}
              transition={
                shouldReduce
                  ? undefined
                  : { duration: 0.2, delay: i * 0.06, ease: "easeOut" }
              }
              className="flex items-center gap-3 py-3 border-b border-border-default last:border-b-0"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${colors}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-text-primary truncate">
                  {item.label}
                </p>
                <p className="text-[11px] text-text-disabled">
                  {timeAgo}
                </p>
              </div>
              {formattedAmount && (
                <span
                  className={`text-[12px] font-medium shrink-0 ${
                    isPositive
                      ? "text-yellow-400"
                      : "text-text-muted"
                  }`}
                >
                  {formattedAmount} pts
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
