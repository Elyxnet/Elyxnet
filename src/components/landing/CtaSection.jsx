"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

export default function CtaSection() {
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
    <section className="py-32 px-6 relative z-10 overflow-hidden bg-bg-base">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-950/20 pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2 {...anim(0)} className="text-4xl md:text-5xl font-bold tracking-[-0.02em] mb-6 text-text-primary">
          Ready to join the network?
        </motion.h2>
        <motion.p {...anim(0.1)} className="text-lg text-text-secondary mb-10">
          Connect your wallet in seconds and start monetizing your infrastructure.
        </motion.p>
        <motion.div {...anim(0.2)}>
          <Link href="/connect" className="h-14 px-10 bg-text-primary text-bg-base rounded-xl text-base font-bold inline-flex items-center justify-center hover:scale-105 transition-transform">
            Get Started for Free
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
