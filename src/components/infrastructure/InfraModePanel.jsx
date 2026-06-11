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

  // Buttery smooth custom easing curve
  const smoothTransition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

  const getWrapperStyle = () => {
    if (active) {
      return "bg-gradient-to-b from-yellow-500/10 to-yellow-500/5 border-yellow-500/30 border-dashed shadow-[0_4px_12px_rgba(234,179,8,0.05),inset_0_1px_0_rgba(255,255,255,0.1)]";
    }
    return "bg-gradient-to-b from-bg-surface to-bg-surface/90 border-border-subtle shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.05)]";
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${getWrapperStyle()}`}
    >
      <AnimatePresence mode="wait">
        {enrolling ? (
          <motion.div
            key="enrolling"
            initial={shouldReduce ? undefined : { opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={shouldReduce ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={smoothTransition}
            className="flex flex-col items-center justify-center py-10 gap-5"
          >
            <div className="relative flex items-center justify-center">
              {/* Premium double-ring glowing spinner */}
              <div className="absolute w-14 h-14 rounded-full border border-yellow-400/20 shadow-[0_0_15px_rgba(234,179,8,0.2)]" />
              <div className="w-14 h-14 rounded-full border-2 border-transparent border-t-yellow-500 border-l-yellow-400 animate-[spin_1s_cubic-bezier(0.55,0.15,0.45,0.85)_infinite]" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold tracking-wide text-text-primary">
                Enrolling in Network
              </p>
              <p className="text-xs text-text-muted">Establishing secure connection...</p>
            </div>
            <div className="w-56 mt-2">
              {/* Re-uses your new premium ProgressBar */}
              <ProgressBar value={85} max={100} color="bg-yellow-400" />
            </div>
          </motion.div>
        ) : active ? (
          <motion.div
            key="active"
            initial={shouldReduce ? undefined : { opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={shouldReduce ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={smoothTransition}
          >
            <div className="flex items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={shouldReduce ? undefined : { scale: 0.5, opacity: 0 }}
                  animate={shouldReduce ? undefined : { scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]"
                >
                  <RiCheckLine className="w-4 h-4 text-green-500 drop-shadow-sm" />
                </motion.div>
                <div>
                  <p className="text-base font-semibold tracking-tight text-text-primary">
                    Infrastructure Mode Active
                  </p>
                  <p className="text-xs font-medium text-text-muted mt-0.5">
                    Your accounts are actively contributing to the network
                  </p>
                </div>
              </div>
              <Toggle active={active} onChange={handleToggle} />
            </div>

            {/* Stats Grid - Using Clerk/Vercel typography style */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
              <div className="text-center">
                <p className="text-xs font-semibold tracking-wide text-text-muted mb-1">
                  Allocated
                </p>
                <p className="text-2xl font-semibold tracking-tighter text-text-primary">847</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold tracking-wide text-text-muted mb-1">
                  Coverage
                </p>
                <p className="text-2xl font-semibold tracking-tighter text-text-primary">94%</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold tracking-wide text-text-muted mb-1">
                  Utilization
                </p>
                <p className="text-2xl font-semibold tracking-tighter text-text-primary">67%</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold tracking-wide text-text-muted mb-1">
                  Uptime
                </p>
                <p className="text-2xl font-semibold tracking-tighter text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]">14d</p>
              </div>
            </div>

            {/* Live activity bar - Upgraded to recessed physical track */}
            <div className="mt-6">
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-medium text-text-muted tracking-wide">
                  Network Activity
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_4px_rgba(34,197,94,0.8)]" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-green-500">Live</span>
                </div>
              </div>
              <div className="relative w-full h-2 rounded-full overflow-hidden bg-black/10 dark:bg-white/10 shadow-[inset_0_1px_3px_rgba(0,0,0,0.15)]">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-1px_1px_rgba(0,0,0,0.15)]"
                  animate={{ width: ["40%", "92%", "45%", "70%", "40%"] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="inactive"
            initial={shouldReduce ? undefined : { opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={shouldReduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={shouldReduce ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={smoothTransition}
          >
            <div className="flex items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-lg font-semibold tracking-tight text-text-primary">
                  Activate Infrastructure Mode
                </p>
                <p className="text-sm font-medium text-text-muted mt-1.5 leading-relaxed max-w-lg">
                  Enroll your authenticated social accounts as distributed infrastructure nodes.
                  Earn points continuously based on uptime and contribution score.
                </p>
              </div>
              <div className="shrink-0 pt-1 sm:pt-0">
                <Toggle active={active} onChange={handleToggle} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}