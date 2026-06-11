"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Toggle from "@/components/ui/Toggle";
import ProgressBar from "@/components/ui/ProgressBar";
import { RiCheckLine } from "react-icons/ri";

export default function InfraModePanel({ active, onToggle }) {
  const shouldReduce = useReducedMotion();
  const [enrolling, setEnrolling] = useState(false);

  const handleToggle = async (val) => {
    if (val) {
      setEnrolling(true);
      // Fake enrollment animation — 1.8s
      await new Promise((r) => setTimeout(r, 1800));
      setEnrolling(false);
    }
    onToggle?.(val);
  };

  return (
    <div
      className={`rounded-xl p-5 border transition-all duration-300 ${
        active
          ? "bg-yellow-950/20 border-yellow-border"
          : "bg-bg-surface border-border-default"
      }`}
    >
      <AnimatePresence mode="wait">
        {enrolling ? (
          <motion.div
            key="enrolling"
            initial={shouldReduce ? undefined : { opacity: 0 }}
            animate={shouldReduce ? undefined : { opacity: 1 }}
            exit={shouldReduce ? undefined : { opacity: 0 }}
            className="flex flex-col items-center justify-center py-8 gap-4"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-yellow-400/30 border-t-yellow-400 animate-spin" />
            </div>
            <p className="text-sm font-medium text-text-primary">
              Enrolling in network…
            </p>
            <div className="w-48">
              <ProgressBar value={85} max={100} color="bg-yellow-400" />
            </div>
          </motion.div>
        ) : active ? (
          <motion.div
            key="active"
            initial={shouldReduce ? undefined : { opacity: 0 }}
            animate={shouldReduce ? undefined : { opacity: 1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <motion.div
                  initial={shouldReduce ? undefined : { scale: 0 }}
                  animate={shouldReduce ? undefined : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center"
                >
                  <RiCheckLine className="w-3.5 h-3.5 text-bg-base" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Infrastructure Mode Active
                  </p>
                  <p className="text-[11px] text-text-muted">
                    Your accounts are contributing to the network
                  </p>
                </div>
              </div>
              <Toggle active={active} onChange={handleToggle} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="text-center py-2">
                <p className="text-[11px] text-text-disabled uppercase tracking-wider mb-1">
                  Allocated
                </p>
                <p className="text-lg font-semibold text-text-primary">847</p>
              </div>
              <div className="text-center py-2">
                <p className="text-[11px] text-text-disabled uppercase tracking-wider mb-1">
                  Coverage
                </p>
                <p className="text-lg font-semibold text-text-primary">94%</p>
              </div>
              <div className="text-center py-2">
                <p className="text-[11px] text-text-disabled uppercase tracking-wider mb-1">
                  Utilization
                </p>
                <p className="text-lg font-semibold text-text-primary">67%</p>
              </div>
              <div className="text-center py-2">
                <p className="text-[11px] text-text-disabled uppercase tracking-wider mb-1">
                  Uptime
                </p>
                <p className="text-lg font-semibold text-green-400">14d</p>
              </div>
            </div>

            {/* Live activity bar */}
            <div className="mt-4">
              <p className="text-[11px] text-text-disabled mb-1.5">
                Network activity
              </p>
              <div className="w-full h-1 rounded-full bg-bg-active overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-yellow-400"
                  animate={{ width: ["60%", "92%", "60%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="inactive"
            initial={shouldReduce ? undefined : { opacity: 0 }}
            animate={shouldReduce ? undefined : { opacity: 1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-medium text-text-primary">
                  Activate Infrastructure Mode
                </p>
                <p className="text-[13px] text-text-muted mt-1 max-w-md">
                  Enroll your authenticated social accounts as distributed infrastructure nodes.
                  Earn points continuously based on uptime and contribution score.
                </p>
              </div>
              <Toggle active={active} onChange={handleToggle} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
