"use client";

import { motion, useReducedMotion } from "motion/react";
import { RiWallet3Line, RiFlashlightLine, RiGlobalLine } from "react-icons/ri";
import Button from "@/components/ui/Button";

const stats = [
  { value: "12,847", label: "nodes" },
  { value: "$4.2M", label: "pts distributed" },
  { value: "847K", label: "queries served" },
];

export default function ConnectPage() {
  const shouldReduce = useReducedMotion();

  const anim = (delay) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay, ease: "easeOut" },
        };

  const handleConnect = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[--color-bg-base] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--color-yellow-400) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Connect card */}
      <motion.div
        {...anim(0.15)}
        className="relative w-full max-w-md rounded-2xl border border-[--color-border-default] bg-[--color-bg-raised] p-8"
      >
        {/* Logo */}
        <motion.div {...anim(0)} className="text-center mb-6">
          <h1 className="text-[--color-yellow-400] font-bold text-2xl tracking-[-0.02em]">
            ELYXNET
          </h1>
          <p className="text-[13px] text-[--color-text-muted] mt-1.5">
            Decentralized AI Infrastructure
          </p>
        </motion.div>

        {/* Network stats strip */}
        <motion.div
          {...anim(0.3)}
          className="flex items-center justify-center gap-6 mb-8 py-3 border-y border-[--color-border-default]"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-[13px] font-semibold text-[--color-text-primary]">
                {stat.value}
              </p>
              <p className="text-[10px] text-[--color-text-disabled] uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div {...anim(0.4)} className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[--color-yellow-950] border border-[--color-yellow-border] flex items-center justify-center">
              <RiFlashlightLine className="w-4 h-4 text-[--color-yellow-400]" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[--color-text-primary]">
                Earn Points Continuously
              </p>
              <p className="text-[11px] text-[--color-text-muted]">
                Based on uptime, score, and account count
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[--color-purple-950] border border-[--color-purple-950] flex items-center justify-center">
              <RiGlobalLine className="w-4 h-4 text-[--color-purple-400]" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-[--color-text-primary]">
                AI Research Engine
              </p>
              <p className="text-[11px] text-[--color-text-muted]">
                Distributed intelligence powered by real nodes
              </p>
            </div>
          </div>
        </motion.div>

        {/* Connect button */}
        <motion.div {...anim(0.5)}>
          <Button
            variant="primary"
            className="w-full h-11 text-[15px]"
            onClick={handleConnect}
          >
            <RiWallet3Line className="w-4 h-4" />
            Connect Wallet
          </Button>
        </motion.div>

        {/* Terms */}
        <motion.p
          {...anim(0.6)}
          className="text-[11px] text-[--color-text-disabled] text-center mt-4"
        >
          By connecting you agree to the network terms
        </motion.p>
      </motion.div>
    </div>
  );
}
