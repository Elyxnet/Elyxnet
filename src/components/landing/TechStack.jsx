"use client";

import { motion, useReducedMotion } from "motion/react";
import { RiShieldCheckLine, RiCodeSSlashLine, RiDatabase2Line, RiLockPasswordLine, RiBrainLine, RiGlobalLine } from "react-icons/ri";

const techItems = [
  { icon: RiCodeSSlashLine, label: "Next.js 16", desc: "App Router with React 19" },
  { icon: RiDatabase2Line, label: "MongoDB Atlas", desc: "Globally distributed data" },
  { icon: RiLockPasswordLine, label: "AES-256-GCM", desc: "Military-grade encryption" },
  { icon: RiBrainLine, label: "OpenRouter AI", desc: "Multi-model intelligence" },
  { icon: RiShieldCheckLine, label: "JWT Sessions", desc: "Stateless authentication" },
  { icon: RiGlobalLine, label: "BNB Chain", desc: "Fast & low-cost withdrawals" },
];

export default function TechStack() {
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
    <section className="py-24 px-6 relative z-10 border-t border-border-default bg-bg-base">
      <div className="max-w-6xl mx-auto">
        <motion.div {...anim(0)} className="text-center mb-12">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-text-muted mb-3">
            Built with
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4 text-text-primary">
            Enterprise-grade infrastructure
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                {...anim(0.05 + i * 0.05)}
                className="flex flex-col items-center text-center p-5 rounded-xl border border-border-default bg-bg-surface hover:border-border-strong transition-colors group"
              >
                <Icon className="w-6 h-6 text-text-muted group-hover:text-text-primary transition-colors mb-3" />
                <p className="text-[13px] font-semibold text-text-primary mb-1">{item.label}</p>
                <p className="text-[10px] text-text-muted">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
