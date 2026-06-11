"use client";

import { motion, useReducedMotion } from "motion/react";
import { RiWallet3Line, RiLinkM, RiFlashlightLine, RiCoinLine } from "react-icons/ri";

const steps = [
  {
    number: "01",
    icon: RiWallet3Line,
    title: "Connect your wallet",
    description: "Sign in with your BNB Chain wallet. Your identity is your address — no email, no password.",
    color: "text-yellow-400",
    bg: "bg-yellow-950/30",
    border: "border-yellow-border",
  },
  {
    number: "02",
    icon: RiLinkM,
    title: "Link your accounts",
    description: "Paste your X, Discord, Telegram, YouTube, or Reddit profile links. No OAuth permissions needed.",
    color: "text-blue-400",
    bg: "bg-blue-950/30",
    border: "border-blue-950",
  },
  {
    number: "03",
    icon: RiFlashlightLine,
    title: "Activate infrastructure",
    description: "Toggle Infrastructure Mode. Your linked accounts become distributed nodes that passively crawl and index data.",
    color: "text-purple-400",
    bg: "bg-purple-950/30",
    border: "border-purple-950",
  },
  {
    number: "04",
    icon: RiCoinLine,
    title: "Earn & withdraw",
    description: "Accumulate points based on uptime and contribution score. Withdraw anytime to your BNB wallet.",
    color: "text-green-400",
    bg: "bg-green-950/30",
    border: "border-green-950",
  },
];

export default function HowItWorks() {
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
    <section className="py-24 px-6 relative z-10 bg-bg-base">
      <div className="max-w-6xl mx-auto">
        <motion.div {...anim(0)} className="text-center mb-16">
          <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-yellow-400 mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] mb-4 text-text-primary">
            Four steps to distributed intelligence
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From wallet connection to earning rewards — the entire journey takes under 2 minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                {...anim(0.1 + i * 0.1)}
                className={`relative p-6 rounded-2xl border ${step.border} ${step.bg} group hover:scale-[1.02] transition-transform`}
              >
                <span className="text-[48px] font-black text-text-primary/[0.04] absolute top-3 right-4 select-none">
                  {step.number}
                </span>
                <div className={`w-10 h-10 rounded-xl bg-bg-base/50 flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${step.color}`} />
                </div>
                <h3 className="text-[15px] font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-[13px] text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
