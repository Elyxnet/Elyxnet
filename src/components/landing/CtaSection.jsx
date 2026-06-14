"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

// ==========================================
// 1. Premium ASCII Wave Canvas Background
// ==========================================
function AsciiCtaBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    // Density map of characters for a technical, matrix feel
    const chars = [" ", ".", "-", "+", "=", "%", "&", "#", "@"];

    const resize = () => {
      canvas.width = window.innerWidth;
      // Make canvas slightly taller than section to ensure smooth edge fading
      canvas.height = 600; 
    };
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const spacing = 18; // Grid spacing
      const rows = Math.ceil(canvas.height / spacing);
      const cols = Math.ceil(canvas.width / spacing);

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * spacing;
          const py = y * spacing;
          
          // 3D topological math
          const wave1 = Math.sin(x * 0.03 + time * 0.8);
          const wave2 = Math.cos(y * 0.04 + time * 0.6);
          const wave3 = Math.sin((x + y) * 0.02 - time * 0.5);
          
          const z = (wave1 + wave2 + wave3) / 3;
          const normalizedZ = (z + 1) / 2;
          
          const charIndex = Math.floor(normalizedZ * chars.length);
          const safeIndex = Math.max(0, Math.min(charIndex, chars.length - 1));
          const char = chars[safeIndex];

          if (char !== " ") {
            // Subtle Yellow theme mapping
            const opacity = Math.max(0.02, normalizedZ * 0.4);
            ctx.fillStyle = `rgba(234, 179, 8, ${opacity})`;
            ctx.fillText(char, px, py);
          }
        }
      }

      time += 0.02; // Smooth, slow ambient drift
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#030303_10%,transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
    </div>
  );
}

// ==========================================
// 2. Main CTA Component
// ==========================================
export default function CtaSection() {
  const shouldReduce = useReducedMotion();

  const anim = (delay) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section className="py-40 px-4 sm:px-6 relative z-10 overflow-hidden bg-[#050505]">
      
      <AsciiCtaBackground />

      <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        <motion.h2 
          {...anim(0)} 
          className="text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight mb-6 text-white/90 leading-[1.1]"
        >
          Scale your intelligence, <br className="hidden md:block" />
          Monetize your network
        </motion.h2>
        
        <motion.p 
          {...anim(0.1)} 
          className="text-[16px] text-white/40 mb-10 leading-relaxed max-w-xl"
        >
          Deploy decentralized AI agents and monetize your social footprint on a single, globally distributed network starting from day one.
        </motion.p>
        
        <motion.div 
          {...anim(0.2)} 
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary Yellow Button */}
          <Link 
            href="/connect" 
            className="w-full sm:w-auto h-12 px-8 bg-yellow-500 text-black rounded-lg text-[14px] font-semibold flex items-center justify-center hover:bg-yellow-400 transition-colors shadow-[0_0_24px_rgba(234,179,8,0.2)]"
          >
            Get Started
          </Link>
          
          {/* Secondary Outline Button */}
          <Link 
            href="/network" 
            className="w-full sm:w-auto h-12 px-8 bg-transparent text-white border border-white/10 rounded-lg text-[14px] font-medium flex items-center justify-center hover:bg-white/[0.04] transition-colors"
          >
            View Live Network
          </Link>
        </motion.div>

      </div>
    </section>
  );
}