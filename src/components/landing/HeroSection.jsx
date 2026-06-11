"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { RiArrowRightLine, RiRobot2Line } from "react-icons/ri";

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  const anim = (delay, y = 16) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section className="relative z-10 pt-40 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
      <motion.div {...anim(0)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-950/30 border border-yellow-border mb-8">
        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        <span className="text-xs font-medium text-yellow-400 tracking-wide">
          Elyxnet V1 — The Distributed Intelligence Engine
        </span>
      </motion.div>

      <motion.h1 {...anim(0.1)} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] leading-[1.05] mb-6 max-w-4xl text-text-primary">
        Complete AI <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-text-muted">
          Infrastructure.
        </span>
      </motion.h1>

      <motion.p {...anim(0.2)} className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
        More than just an agent. Elyxnet is a comprehensive, decentralized network that transforms your idle social accounts into globally distributed AI compute nodes.
      </motion.p>

      <motion.div {...anim(0.3)} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link href="/connect" className="w-full sm:w-auto h-12 px-8 bg-yellow-400 text-bg-base rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 hover:bg-yellow-200 transition-colors shadow-[0_0_24px_rgba(230,185,60,0.2)]">
          Connect Wallet
          <RiArrowRightLine className="w-4 h-4" />
        </Link>
        <Link href="/network" className="w-full sm:w-auto h-12 px-8 bg-transparent text-text-primary border border-border-strong rounded-xl text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-bg-hover transition-colors">
          View Live Network
        </Link>
      </motion.div>

      {/* Hero Code Snippet / Mockup */}
      <motion.div {...anim(0.5, 40)} className="mt-20 w-full max-w-5xl mx-auto relative group text-left">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-border-strong to-transparent opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-500" />
        <div className="relative rounded-2xl border border-border-default bg-bg-raised overflow-hidden shadow-2xl flex flex-col md:flex-row">
          
          {/* Left: Code Editor */}
          <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-border-default bg-[#0d0d0d]">
            <div className="h-12 border-b border-[#1c1c1e] flex items-center px-4 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="ml-4 px-3 py-1 rounded bg-[#1c1c1e] text-[11px] text-[#888] font-mono">
                Agent.js
              </div>
            </div>
            <div className="p-6 font-mono text-[13px] leading-loose overflow-x-auto">
              <span className="text-[#c678dd]">import</span> {"{ ElyxnetAgent }"} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'@elyxnet/sdk'</span>;<br/><br/>
              <span className="text-[#c678dd]">const</span> agent = <span className="text-[#c678dd]">new</span> <span className="text-[#e5c07b]">ElyxnetAgent</span>({"{"}<br/>
              &nbsp;&nbsp;network: <span className="text-[#98c379]">'mainnet'</span>,<br/>
              &nbsp;&nbsp;nodes: <span className="text-[#d19a66]">12847</span>,<br/>
              {"}"});<br/><br/>
              <span className="text-[#c678dd]">const</span> result = <span className="text-[#c678dd]">await</span> agent.<span className="text-[#61afef]">query</span>(<br/>
              &nbsp;&nbsp;<span className="text-[#98c379]">'Analyze BTC sentiment across X'</span><br/>
              );<br/><br/>
              <span className="text-[#5c6370]">// Automatically routed through 800+</span><br/>
              <span className="text-[#5c6370]">// decentralized infrastructure nodes</span>
            </div>
          </div>

          {/* Right: UI Preview */}
          <div className="w-full md:w-1/2 bg-bg-surface p-6 flex flex-col justify-center">
             <div className="space-y-4">
               <div className="flex items-center justify-between p-4 rounded-xl border border-border-default bg-bg-base">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-purple-950 flex items-center justify-center">
                     <RiRobot2Line className="text-purple-400 w-4 h-4" />
                   </div>
                   <div>
                     <p className="text-[13px] font-medium text-text-primary">Agent Executing</p>
                     <p className="text-[11px] text-text-muted">Aggregating from 847 nodes</p>
                   </div>
                 </div>
                 <span className="text-[12px] text-purple-400 font-mono">Streaming...</span>
               </div>
               
               <div className="p-4 rounded-xl border border-border-default bg-bg-base space-y-3">
                 <div className="h-2 w-full bg-border-strong rounded" />
                 <div className="h-2 w-[80%] bg-border-strong rounded" />
                 <div className="h-2 w-[90%] bg-border-strong rounded" />
               </div>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
