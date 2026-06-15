"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export default function Footer() {
  const shouldReduce = useReducedMotion();

  const anim = (delay) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <footer className="relative z-10 bg-[#050505] pt-24 pb-10 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-24">
          
          {/* Brand Column */}
          <motion.div {...anim(0)} className="col-span-2 md:col-span-2 pr-8">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-5 h-5 rounded-sm bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-[0_0_12px_rgba(234,179,8,0.3)] group-hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] transition-shadow duration-500" />
              <span className="text-white/90 font-medium text-xl tracking-tight">
                Elyxnet
              </span>
            </Link>
            <p className="text-[14px] text-white/40 leading-relaxed max-w-xs font-normal">
              The premium decentralized intelligence engine. Deploy, monetize, and scale global AI infrastructure.
            </p>
          </motion.div>
          
          {/* Product Links */}
          <motion.div {...anim(0.1)} className="col-span-1">
            <h4 className="text-[13px] font-semibold text-white/90 mb-6 tracking-wide">Product</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/dashboard" className="text-[14px] text-white/40 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/network" className="text-[14px] text-white/40 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  Network Stats
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div {...anim(0.2)} className="col-span-1">
            <h4 className="text-[13px] font-semibold text-white/90 mb-6 tracking-wide">Resources</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-[14px] text-white/40 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  Documentation
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Replaced 'Legal' with 'Links' (X, BscScan, etc.) */}
          <motion.div {...anim(0.3)} className="col-span-1">
            <h4 className="text-[13px] font-semibold text-white/90 mb-6 tracking-wide">Links</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/40 hover:text-yellow-400 hover:translate-x-1 inline-block transition-all duration-300">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[14px] text-white/40 hover:text-yellow-400 hover:translate-x-1 inline-block transition-all duration-300">
                  BscScan
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
        
        {/* Bottom Bar: Copyright & System Status */}
        <motion.div 
          {...anim(0.4)} 
          className="pt-8 border-t border-dashed border-white/[0.04] flex items-center justify-center gap-6"
        >
          <p className="text-[13px] text-white/30 font-medium tracking-wide">
            © {new Date().getFullYear()} Elyxnet Protocol. All rights reserved.
          </p>
        </motion.div>

      </div>
    </footer>
  );
}