"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { RiArrowDownSLine } from "react-icons/ri";

// ==========================================
// FAQ Content (Adapted for Elyxnet)
// ==========================================
const faqs = [
  {
    question: "What exactly is Elyxnet?",
    answer: "Elyxnet is a unified decentralized intelligence platform that collapses data crawling, network routing, and distributed AI computation into a single protocol. Every connected social account acts as a node, aggregating real-time data into a correlated graph so developers can run complex AI agents without centralized infrastructure.",
  },
  {
    question: "Which platforms and accounts does Elyxnet support?",
    answer: "Currently, you can connect and monetize accounts from X (Twitter), Discord, Telegram, YouTube, Reddit, and LinkedIn. We are continuously adding support for more platforms based on network governance votes.",
  },
  {
    question: "How does Elyxnet handle data security and compliance?",
    answer: "All OAuth connections are secured via AES-256-GCM encryption. Your authentication tokens are encrypted at the infrastructure level and never touch the frontend. The network only crawls publicly available data permitted by your connected accounts.",
  },
  {
    question: "Do I need to keep my browser open to earn?",
    answer: "No. Once Infrastructure Mode is activated and your accounts are linked, the network handles the routing autonomously via distributed backend workers. You earn points passively based on your node's uptime.",
  },
  {
    question: "Will it integrate with our existing AI stack?",
    answer: "Yes. Elyxnet provides a comprehensive TypeScript SDK. You can query the network just like you would query OpenAI or Anthropic, and the protocol automatically handles routing the request through the decentralized node network.",
  },
  {
    question: "How are withdrawals and rewards handled?",
    answer: "Rewards are recorded on an append-only, immutable ledger. You can withdraw your accumulated points at any time directly to your connected BNB Chain wallet with minimal gas fees.",
  },
];

// ==========================================
// Precision Crosshair Utility Component
// ==========================================
const Crosshair = ({ className = "" }) => (
  <span 
    className={`absolute text-[12px] leading-none text-yellow-500/80 font-mono select-none pointer-events-none ${className}`}
    style={{ transform: "translate(-50%, -50%)" }}
  >
    +
  </span>
);

export default function FAQ() {
  const shouldReduce = useReducedMotion();
  // First item open by default, matching the reference image
  const [openIndex, setOpenIndex] = useState(0);

  const anim = (delay) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section className="py-20 px-4 sm:px-6 relative z-10 bg-[#050505] overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Schematic Grid Wrapper */}
        <motion.div 
          {...anim(0)}
          className="relative border-y border-dashed border-white/20 grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Outer Grid Crosshairs */}
          <Crosshair className="top-0 left-0" />
          <Crosshair className="top-0 left-full" />
          <Crosshair className="top-full left-0" />
          <Crosshair className="top-full left-full" />

          {/* ========================================== */}
          {/* Left Column: Title & CTA */}
          {/* ========================================== */}
          <div className="lg:col-span-5 relative border-b lg:border-b-0 lg:border-r border-dashed border-white/20 p-8 py-16 lg:p-16 lg:pr-20 flex flex-col justify-center">
            
            {/* Center Intersection Crosshairs (Desktop Only) */}
            <Crosshair className="hidden lg:block top-0 left-full" />
            <Crosshair className="hidden lg:block top-full left-full" />

            <h2 className="text-4xl md:text-[52px] font-medium tracking-tight text-text-primary leading-[1.1] mb-8">
              Frequently <br />
              asked questions
            </h2>
            
            <p className="text-[15px] text-text-secondary leading-relaxed mb-10 max-w-sm">
              Everything you need to know about deploying on Elyxnet. Can't find an answer? Our core engineering team is one message away.
            </p>
          </div>

          {/* ========================================== */}
          {/* Right Column: Accordion List */}
          {/* ========================================== */}
          <div className="lg:col-span-7 flex flex-col relative z-20">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div 
                  key={index} 
                  className="border-b border-dashed border-white/10 last:border-b-0 group"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full text-left py-8 px-6 lg:px-12 flex justify-between items-center transition-colors duration-300 hover:bg-white/[0.01]"
                  >
                    <span className={`text-[16px] font-medium transition-colors duration-300 pr-8 ${isOpen ? "text-yellow-400" : "text-white/80 group-hover:text-white"}`}>
                      {faq.question}
                    </span>
                    <motion.div 
                      animate={{ rotate: isOpen ? 180 : 0 }} 
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`shrink-0 transition-colors duration-300 ${isOpen ? "text-yellow-400" : "text-white/30 group-hover:text-white/70"}`}
                    >
                      <RiArrowDownSLine size={20} />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 lg:px-12 pb-8 text-[14px] text-white/40 leading-relaxed max-w-2xl">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}