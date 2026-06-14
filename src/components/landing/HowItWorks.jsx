"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RiArrowRightLine } from "react-icons/ri";

// ==========================================
// 1. Scaled & Enhanced ASCII Canvas Engine
// ==========================================
function AsciiVisual({ variant = "sphere" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    // Density map of characters (from empty space to heavy blocks)
    const chars = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "&", "@"];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      // High-DPI canvas scaling for razor-sharp text
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      // Use logical coordinates for drawing
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);
      
      // Increased spacing and font size for larger, more premium characters
      const spacingX = 12;
      const spacingY = 16;
      const cols = Math.floor(width / spacingX);
      const rows = Math.floor(height / spacingY);

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * spacingX + spacingX / 2;
          const py = y * spacingY + spacingY / 2;
          
          const dx = px - width / 2;
          const dy = py - height / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let z = 0;
          let shouldDraw = false;

          // Scaled up mathematical boundaries for much larger shapes
          if (variant === "sphere") {
            if (dist < 80) {
              shouldDraw = true;
              z = Math.sin(dx * 0.04 + time) * Math.cos(dy * 0.04 + time);
            }
          } else if (variant === "torus") {
            if (dist < 90 && dist > 35) {
              shouldDraw = true;
              z = Math.sin(dist * 0.08 - time * 1.5);
            }
          } else if (variant === "diamond") {
            if (Math.abs(dx) + Math.abs(dy) < 110) {
              shouldDraw = true;
              z = Math.cos((dx + dy) * 0.03 - time);
            }
          } else if (variant === "cube") {
            if (Math.abs(dx) < 65 && Math.abs(dy) < 65) {
              shouldDraw = true;
              z = Math.sin(dx * 0.05 + time) + Math.cos(dy * 0.05 + time);
            }
          }

          if (shouldDraw) {
            const normalizedZ = (z + 2) / 4; 
            const charIndex = Math.floor(normalizedZ * chars.length);
            const safeIndex = Math.max(0, Math.min(charIndex, chars.length - 1));
            const char = chars[safeIndex];

            if (char !== " ") {
              // Brighter, more luminous yellow theme
              const opacity = Math.max(0.15, normalizedZ * 1.5);
              ctx.fillStyle = `rgba(234, 179, 8, ${opacity})`;
              ctx.fillText(char, px, py);
            }
          }
        }
      }
      
      time += 0.03;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <div className="w-full h-64 relative flex items-center justify-center">
      {/* Ambient glowing backdrop that intensifies on hover */}
      <div className="absolute inset-0 bg-yellow-500/0 group-hover:bg-yellow-500/[0.04] blur-3xl transition-colors duration-700 rounded-full scale-75" />
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700 relative z-10"
      />
    </div>
  );
}

// ==========================================
// 2. Main Component
// ==========================================
const steps = [
  { 
    number: "01",
    shape: "sphere",
    title: "Connect your wallet",
    description: "Sign in with your BNB Chain wallet. Your identity is your address no email, no password.",
    label: "Identity · Vault",
  },
  {
    number: "02",
    shape: "torus",
    title: "Link your accounts",
    description: "Paste your social profile links. Zero OAuth permissions required to begin networking.",
    label: "Network · Integration",
  },
  {
    number: "03",
    shape: "diamond",
    title: "Activate infrastructure",
    description: "Toggle Infrastructure Mode. Your accounts become distributed nodes that crawl passively.",
    label: "Compute · Node",
  },
  {
    number: "04",
    shape: "cube",
    title: "Earn & withdraw",
    description: "Accumulate points based on uptime and network consensus. Withdraw directly to BNB.",
    label: "Ledger · Rewards",
  },
];

export default function HowItWorks() {
  const shouldReduce = useReducedMotion();

  // Custom ultra-smooth easing
  const customEase = [0.16, 1, 0.3, 1];

  const anim = (delay) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 30, filter: "blur(6px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 1.2, delay, ease: customEase },
        };

  return (
    <section className="py-20 px-4 sm:px-6 relative z-10 bg-[#050505] overflow-hidden selection:bg-yellow-500/30 selection:text-white">
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div {...anim(0)} className="mb-24 max-w-4xl">
          <h2 className="text-4xl md:text-[56px] font-medium tracking-tight text-white leading-[1.05] mb-8">
            One network that <span className="text-white/80">connects</span>, <br className="hidden md:block" />
            <span className="text-white/80">crawls</span>, and <span className="text-white/80">computes</span> every task
          </h2>
          <p className="text-white/40 text-lg md:text-[20px] leading-relaxed max-w-2xl font-normal">
            Elyxnet collapses your idle social accounts into a single distributed node built to crawl, route, and earn without the integration tax.
          </p>
        </motion.div>

        {/* 4-Column Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              {...anim(0.1 + i * 0.1)}
              // Outer wrapper for the chamfered border effect
              // Made slightly brighter on hover for a cleaner premium feel
              className="relative p-[1px] border bg-gradient-to-b from-[#0A0A0A] to-[#050505]  border-white/[0.05] hover:border-yellow-500/40 transition-colors duration-700 group rounded-2xl overflow-hidden"
              // style={{
              //   clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)",
              // }}
            >
              {/* Inner Card content with soft gradient */}
              <div 
                className="h-full w-full flex flex-col justify-between"
                // style={{
                //   clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)",
                // }}
              >
                
                {/* Top: Title */}
                <div className="p-8 pb-0">
                  <h3 className="text-lg font-medium text-white/90 tracking-tight group-hover:text-yellow-400 transition-colors duration-500">
                    {step.title}
                  </h3>
                </div>

                {/* Middle: Scaled Canvas Animation */}
                <div className="w-full flex-1 flex items-center justify-center">
                  <AsciiVisual variant={step.shape} />
                </div>

                {/* Bottom: Description & Footer */}
                <div className="p-8 pt-0 flex flex-col gap-6">
                  {/* Ultra-subtle dashed divider */}
                  <div className="w-full border-t border-dashed border-white/[0.08]" />
                  
                  <p className="text-[15px] text-white/40 leading-relaxed min-h-[70px]">
                    {step.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}