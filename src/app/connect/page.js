"use client";

import { useState } from "react";
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

  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      // Mock wallet address for MVP
      const walletAddress = "0x" + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
      
      // 1. Get Nonce (creates user in DB)
      const nonceRes = await fetch('/api/auth/nonce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress })
      });
      
      if (!nonceRes.ok) throw new Error("Failed to get nonce");
      const { nonce } = await nonceRes.json();
      
      // 2. Verify Signature (mock verification, sets HTTP-only cookie)
      const verifyRes = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          walletAddress, 
          signature: "0xMockSignatureForMVP", 
          nonce 
        })
      });
      
      if (!verifyRes.ok) throw new Error("Authentication failed");
      
      // Success - redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to connect wallet");
      setIsConnecting(false);
    }
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
        className="relative w-full max-w-md rounded-2xl border border-border-default bg-bg-raised p-8"
      >
        {/* Logo */}
        <motion.div {...anim(0)} className="text-center mb-6">
          <h1 className="text-yellow-400 font-bold text-2xl tracking-[-0.02em]">
            ELYXNET
          </h1>
          <p className="text-[13px] text-text-muted mt-1.5">
            Decentralized AI Infrastructure
          </p>
        </motion.div>

        {/* Network stats strip */}
        <motion.div
          {...anim(0.3)}
          className="flex items-center justify-center gap-6 mb-8 py-3 border-y border-border-default"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-[13px] font-semibold text-text-primary">
                {stat.value}
              </p>
              <p className="text-[10px] text-text-disabled uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div {...anim(0.4)} className="space-y-3 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-950 border border-yellow-border flex items-center justify-center">
              <RiFlashlightLine className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-text-primary">
                Earn Points Continuously
              </p>
              <p className="text-[11px] text-text-muted">
                Based on uptime, score, and account count
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-950 flex items-center justify-center">
              <RiGlobalLine className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-text-primary">
                AI Research Engine
              </p>
              <p className="text-[11px] text-text-muted">
                Distributed intelligence powered by real nodes
              </p>
            </div>
          </div>
        </motion.div>

        {/* Connect button */}
        <motion.div {...anim(0.5)} className="space-y-3">
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}
          <Button
            variant="primary"
            className="w-full h-11 text-[15px]"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-bg-base border-t-transparent animate-spin" />
                Connecting...
              </span>
            ) : (
              <>
                <RiWallet3Line className="w-4 h-4" />
                Connect Wallet
              </>
            )}
          </Button>
        </motion.div>

        {/* Terms */}
        <motion.p
          {...anim(0.6)}
          className="text-[11px] text-text-disabled text-center mt-4"
        >
          By connecting you agree to the network terms
        </motion.p>
      </motion.div>
    </div>
  );
}
