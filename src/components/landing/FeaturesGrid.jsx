"use client";

import { motion, useReducedMotion } from "motion/react";
import { 
  RiFlashlightLine, 
  RiRobot2Line, 
  RiDatabase2Line,
  RiGlobalLine,
  RiLockPasswordLine,
  RiTwitterXFill,
  RiDiscordFill,
  RiTelegramFill,
  RiCpuLine
} from "react-icons/ri";

export default function FeaturesGrid() {
  const shouldReduce = useReducedMotion();

  // Ultra-smooth easing curve used by Apple/Linear
  const customEase = [0.16, 1, 0.3, 1];

  const anim = (delay) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(4px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 1, delay, ease: customEase },
        };

  return (
    <section id="features" className="py-32 px-4 sm:px-6 relative z-10 bg-[#050505] overflow-hidden selection:bg-yellow-500/30">
      
      {/* Subdued ambient background lighting (No harsh shadows) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-yellow-500-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div {...anim(0)} className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-[56px] font-medium tracking-tight text-white/90 leading-[1.05]">
              A comprehensive toolkit <br className="hidden md:block" />
              <span className="text-white/40">for decentralized AI.</span>
            </h2>
          </div>
          <p className="text-white/50 text-[15px] max-w-sm leading-relaxed">
            Everything you need to deploy, monetize, and scale decentralized intelligence across a global network.
          </p>
        </motion.div>

        {/* 
          Pixel-Perfect Bento Grid 
          Uses tight gaps (gap-5) and exact auto-rows (320px) to form a flawless block
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[320px]">
          
          {/* 1. Infrastructure Mode (Tall Card - Col 1, Row 1 & 2) */}
          <motion.div 
            {...anim(0.1)} 
            className="group md:col-span-1 md:row-span-2 relative rounded-[32px] bg-[#0A0A0A] border border-white/[0.04] overflow-hidden flex flex-col hover:border-white/[0.08] transition-colors duration-700"
          >
            {/* Visual Arena */}
            <div className="relative flex-1 bg-[#080808] border-b border-white/[0.02] overflow-hidden p-8 flex flex-col items-center justify-center min-h-[300px]">
              {/* Minimal Dot Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] mask-image-[radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
              
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-16 group-hover:bg-white/[0.04] transition-colors duration-700">
                <RiCpuLine className="w-7 h-7 text-white/70" />
                
                {/* Ultra-subtle connecting lines */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-white/[0.08] to-transparent" />
                <div className="absolute top-[calc(100%+32px)] w-[120px] h-px left-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
              </div>

              {/* Connected Nodes */}
              <div className="relative z-10 flex items-center justify-center gap-6 w-full">
                <div className="w-10 h-10 rounded-full bg-[#050505] border border-white/[0.06] flex items-center justify-center text-white/50 group-hover:text-white/90 group-hover:-translate-y-1 transition-all duration-700 ease-out"><RiTwitterXFill size={16} /></div>
                <div className="w-10 h-10 rounded-full bg-[#050505] border border-white/[0.06] flex items-center justify-center text-white/50 group-hover:text-[#5865F2] group-hover:-translate-y-1 transition-all duration-700 delay-75 ease-out"><RiDiscordFill size={16} /></div>
                <div className="w-10 h-10 rounded-full bg-[#050505] border border-white/[0.06] flex items-center justify-center text-white/50 group-hover:text-[#229ED9] group-hover:-translate-y-1 transition-all duration-700 delay-150 ease-out"><RiTelegramFill size={16} /></div>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="p-8 shrink-0 bg-[#0A0A0A]">
              <div className="flex items-center gap-3 mb-4">
                <RiFlashlightLine className="w-5 h-5 text-yellow-500/80" />
                <h3 className="text-lg font-medium text-white/90 tracking-tight">Infrastructure Mode</h3>
              </div>
              <p className="text-[14px] text-white/40 leading-relaxed font-normal">
                Connect your social accounts. Turn them into active nodes that crawl data for the network autonomously.
              </p>
            </div>
          </motion.div>

          {/* 2. Flagship AI Agent (Wide Top Card - Col 2 & 3, Row 1) */}
          <motion.div 
            {...anim(0.2)} 
            className="group md:col-span-2 md:row-span-1 relative rounded-[32px] bg-[#0A0A0A] border border-white/[0.04] overflow-hidden flex flex-col md:flex-row hover:border-white/[0.08] transition-colors duration-700"
          >
            <div className="p-8 md:p-10 md:w-[45%] shrink-0 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <RiRobot2Line className="w-5 h-5 text-yellow-500/80" />
                <h3 className="text-lg font-medium text-white/90 tracking-tight">Flagship AI Agent</h3>
              </div>
              <p className="text-[14px] text-white/40 leading-relaxed">
                Query the network's aggregated intelligence. Your prompt routes through hundreds of nodes in real-time.
              </p>
            </div>

            {/* Visual Area - UI Chat Mockup */}
            <div className="relative w-full h-full flex-1 bg-[#080808] border-l border-white/[0.02] p-8 flex flex-col justify-center overflow-hidden mask-image-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
              
              <div className="w-full max-w-[300px] ml-auto space-y-4 group-hover:scale-[1.02] transition-transform duration-700 ease-out origin-right">
                
                {/* User Bubble */}
                <div className="ml-auto w-[80%] bg-white/[0.03] border border-white/[0.05] rounded-2xl rounded-tr-sm p-4">
                  <div className="h-1.5 w-full bg-white/[0.08] rounded-full mb-2" />
                  <div className="h-1.5 w-[60%] bg-white/[0.08] rounded-full" />
                </div>
                
                {/* AI Bubble */}
                <div className="mr-auto w-[90%] bg-gradient-to-br from-yellow-500/[0.03] to-transparent border border-white/[0.05] rounded-2xl rounded-tl-sm p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest text-yellow-500/50 font-medium">Synthesizing</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                      <div className="h-full w-[20%] bg-yellow-500/20 rounded-full group-hover:w-full transition-all duration-1000 ease-out" />
                    </div>
                    <div className="h-1.5 w-[75%] bg-white/[0.04] rounded-full overflow-hidden">
                      <div className="h-full w-[0%] bg-yellow-500/20 rounded-full group-hover:w-full transition-all duration-1000 delay-150 ease-out" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. Append-only Ledger (Square Card - Col 2, Row 2) */}
          <motion.div 
            {...anim(0.3)} 
            className="group md:col-span-1 md:row-span-1 relative rounded-[32px] bg-[#0A0A0A] border border-white/[0.04] overflow-hidden flex flex-col hover:border-white/[0.08] transition-colors duration-700"
          >
            <div className="relative h-[160px] w-full bg-[#080808] border-b border-white/[0.02] overflow-hidden p-6 flex flex-col justify-center">
              {/* Soft vertical fade mask */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-[#080808] z-10 pointer-events-none" />
              
              <div className="flex flex-col gap-3 font-mono text-[10px] group-hover:-translate-y-6 transition-transform duration-[1200ms] ease-out text-white/30">
                <div className="flex justify-between items-center opacity-40"><span>0x4f...a29</span><span>Log block</span></div>
                <div className="flex justify-between items-center opacity-60"><span>0x1c...7b4</span><span>+2.5 ELYX</span></div>
                
                {/* Active Highlighted Row */}
                <div className="flex justify-between items-center px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-md text-white/80 group-hover:border-yellow-500/20 group-hover:bg-yellow-500/5 transition-colors duration-700">
                  <span>0x7d...1f8</span>
                  <span className="text-yellow-500/80">+45.2 ELYX</span>
                </div>
                
                <div className="flex justify-between items-center opacity-60"><span>0x2a...9c4</span><span>+8.0 ELYX</span></div>
                <div className="flex justify-between items-center opacity-40"><span>0x9e...4d2</span><span>-1.0 ELYX</span></div>
              </div>
            </div>

            <div className="p-8 shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <RiDatabase2Line className="w-5 h-5 text-yellow-500/80" />
                <h3 className="text-lg font-medium text-white/90 tracking-tight">Immutable Ledger</h3>
              </div>
              <p className="text-[14px] text-white/40 leading-relaxed">
                Earn points automatically. Every reward tick and query spend is recorded immutably.
              </p>
            </div>
          </motion.div>

          {/* 4. Bank-grade Security (Square Card - Col 3, Row 2) */}
          <motion.div 
            {...anim(0.4)} 
            className="group md:col-span-1 md:row-span-1 relative rounded-[32px] bg-[#0A0A0A] border border-white/[0.04] overflow-hidden flex flex-col hover:border-white/[0.08] transition-colors duration-700"
          >
            <div className="relative h-[160px] w-full bg-[#080808] border-b border-white/[0.02] overflow-hidden flex items-center justify-center">
               <div className="relative w-24 h-24 rounded-full border border-white/[0.04] flex items-center justify-center bg-[#050505]">
                 {/* Super minimal concentric rings */}
                 <div className="absolute inset-2 rounded-full border-t border-white/[0.08] group-hover:rotate-180 transition-transform duration-[1500ms] ease-out" />
                 <div className="absolute inset-4 rounded-full border-b border-white/[0.04] group-hover:-rotate-90 transition-transform duration-[1500ms] ease-out" />
                 
                 <RiLockPasswordLine className="w-6 h-6 text-white/40 group-hover:text-white/80 transition-colors duration-700" />
               </div>
            </div>

            <div className="p-8 shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <RiLockPasswordLine className="w-5 h-5 text-yellow-500/80" />
                <h3 className="text-lg font-medium text-white/90 tracking-tight">Bank-grade Security</h3>
              </div>
              <p className="text-[14px] text-white/40 leading-relaxed">
                Secured via AES-256-GCM. Your social auth tokens never touch the frontend.
              </p>
            </div>
          </motion.div>
          
          {/* 5. Global Consensus (Full Width Bottom Card - Col 1, 2 & 3, Row 3) */}
          <motion.div 
            {...anim(0.5)} 
            className="group md:col-span-3 md:row-span-1 relative rounded-[32px] bg-[#0A0A0A] border border-white/[0.04] overflow-hidden flex flex-col md:flex-row items-center hover:border-white/[0.08] transition-colors duration-700 min-h-[280px]"
          >
            <div className="p-8 md:p-10 md:w-[40%] shrink-0">
              <div className="flex items-center gap-3 mb-4">
                <RiGlobalLine className="w-6 h-6 text-yellow-500/80" />
                <h3 className="text-2xl font-medium text-white/90 tracking-tight">Global Consensus</h3>
              </div>
              <p className="text-[15px] text-white/40 leading-relaxed max-w-sm">
                Track the pulse of Elyxnet. View live statistics, total points distributed, and your global rank among operators.
              </p>
            </div>
            
            {/* Visual Area - Ultra Minimal Map */}
            <div className="relative w-full h-64 md:h-full flex-1 overflow-hidden bg-[#080808] border-t md:border-t-0 md:border-l border-white/[0.02]">
              {/* Very faint, clean dot pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:12px_12px] mask-image-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
              
              {/* Soft sweeping ambient light instead of harsh scanner lines */}
              <div className="absolute top-0 bottom-0 left-0 w-[300px] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[sweep_6s_linear_infinite] pointer-events-none" />
              
              {/* Clean, soft pulses */}
              <div className="absolute top-[35%] left-[25%] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <div className="absolute w-6 h-6 border border-white/10 rounded-full scale-50 opacity-0 group-hover:animate-ping-slow" />
              </div>
              
              <div className="absolute top-[60%] left-[45%] flex items-center justify-center">
                <div className="w-1 h-1 bg-white/30 rounded-full" />
                <div className="absolute w-8 h-8 border border-white/5 rounded-full scale-50 opacity-0 group-hover:animate-ping-slow" style={{ animationDelay: '1s' }} />
              </div>
              
              <div className="absolute top-[40%] left-[75%] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-yellow-500/60 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.3)]" />
                <div className="absolute w-10 h-10 border border-yellow-500/20 rounded-full scale-50 opacity-0 group-hover:animate-ping-slow" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Inline styles for the soft custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes ping-slow {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}} />
    </section>
  );
}