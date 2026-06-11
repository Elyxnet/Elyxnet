"use client";

import { motion, useReducedMotion } from "motion/react";
import { 
  RiFlashlightLine, 
  RiRobot2Line, 
  RiCoinLine,
  RiGlobalLine,
  RiLockPasswordLine
} from "react-icons/ri";

export default function FeaturesGrid() {
  const shouldReduce = useReducedMotion();

  const anim = (delay) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section id="features" className="py-24 px-6 relative z-10 border-t border-border-default bg-bg-base">
      <div className="max-w-6xl mx-auto">
        <motion.div {...anim(0)} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4 text-text-primary">
            A comprehensive toolkit for AI
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Everything you need to deploy, monetize, and scale decentralized intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <motion.div {...anim(0.1)} className="p-8 rounded-2xl border border-border-default bg-gradient-to-b from-bg-surface to-bg-base hover:border-border-strong transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-bg-raised border border-border-strong flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <RiFlashlightLine className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">Infrastructure Mode</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">
              Connect your X, Discord, and Telegram accounts. Turn them into active nodes that crawl data for the network while you sleep.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div {...anim(0.2)} className="p-8 rounded-2xl border border-border-default bg-gradient-to-b from-bg-surface to-bg-base hover:border-border-strong transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-bg-raised border border-border-strong flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <RiRobot2Line className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">Flagship AI Agent</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">
              Query the network's aggregated intelligence. Watch as your prompt routes through hundreds of nodes to synthesize a response in real-time.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div {...anim(0.3)} className="p-8 rounded-2xl border border-border-default bg-gradient-to-b from-bg-surface to-bg-base hover:border-border-strong transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-bg-raised border border-border-strong flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <RiCoinLine className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">Append-only Ledger</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">
              Earn points automatically based on uptime and contribution score. Every reward tick and query spend is recorded immutably.
            </p>
          </motion.div>
          
          {/* Feature 4 */}
          <motion.div {...anim(0.4)} className="p-8 rounded-2xl border border-border-default bg-gradient-to-b from-bg-surface to-bg-base hover:border-border-strong transition-colors group lg:col-span-2">
            <div className="w-12 h-12 rounded-xl bg-bg-raised border border-border-strong flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <RiGlobalLine className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">Global Consensus</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed max-w-xl">
              Track the pulse of the Elyxnet network. View live statistics, total points distributed, and see where you rank on the global leaderboard among thousands of active node operators.
            </p>
          </motion.div>

          {/* Feature 5 */}
          <motion.div {...anim(0.5)} className="p-8 rounded-2xl border border-border-default bg-gradient-to-b from-bg-surface to-bg-base hover:border-border-strong transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-bg-raised border border-border-strong flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <RiLockPasswordLine className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-text-primary">Bank-grade Security</h3>
            <p className="text-[14px] text-text-secondary leading-relaxed">
              All OAuth connections are secured via AES-256-GCM encryption. Your social tokens never touch the frontend.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
