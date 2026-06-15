"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { 
  RiArrowRightLine, 
  RiRobot2Line, 
  RiTerminalBoxLine, 
  RiCpuLine,
  RiTwitterXFill,
  RiDiscordFill,
  RiTelegramFill,
  RiYoutubeFill,
  RiRedditFill,
  RiLinkedinFill
} from "react-icons/ri";

// ==========================================
// 1. Premium ASCII Wave Canvas Background
// ==========================================
function AsciiWaveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    // The density of characters from lightest to heaviest
    const chars = [" ", ".", "-", "+", "=", "%", "@", "#"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const spacing = 16; // Grid spacing
      const rows = Math.ceil(canvas.height / spacing);
      const cols = Math.ceil(canvas.width / spacing);

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Create a fluid ASCII landscape effect using overlapping sine waves
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * spacing;
          const py = y * spacing;
          
          // Complex math to simulate topological contour lines
          const wave1 = Math.sin(x * 0.06 + time * 0.001);
          const wave2 = Math.cos(y * 0.05 + time * 0.0008);
          // Add a diagonal drift to make it feel alive
          const wave3 = Math.sin((x + y) * 0.03 - time * 0.0015);
          
          const z = (wave1 + wave2 + wave3) / 3; // Value roughly between -1 and 1
          
          // Normalize z to 0 -> 1
          const normalizedZ = (z + 1) / 2;
          
          // Map to character index
          const charIndex = Math.floor(normalizedZ * chars.length);
          const safeIndex = Math.max(0, Math.min(charIndex, chars.length - 1));
          const char = chars[safeIndex];

          if (char !== " ") {
            // Yellow theme mapping: Brighter yellow for denser characters
            // Opacity is tied to the elevation (z)
            const opacity = Math.max(0.05, normalizedZ * 0.6);
            
            // Core yellow theme: rgba(234, 179, 8) is Tailwind's yellow-500
            ctx.fillStyle = `rgba(234, 179, 8, ${opacity})`;
            ctx.fillText(char, px, py);
          }
        }
      }
      
      // Radial gradient to fade out edges perfectly into the dark background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 0, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.2
      );
      gradient.addColorStop(0, "rgba(5, 5, 5, 0)");
      gradient.addColorStop(1, "rgba(5, 5, 5, 1)");
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 16;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
      style={{ background: "#050505" }}
    />
  );
}

// ==========================================
// 2. Main Hero Section
// ==========================================
export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  const anim = (delay, y = 20) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center pt-32 pb-20 selection:bg-yellow-400/30 selection:text-yellow-200">
      <AsciiWaveBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Title */}
        <motion.h1 {...anim(0.1)} className="text-5xl sm:text-6xl md:text-[80px] font-medium tracking-tight text-white leading-[1.05] mb-6 max-w-4xl drop-shadow-sm">
          Complete AI <br className="hidden md:block" />
          Infrastructure
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...anim(0.2)} className="text-lg md:text-[20px] text-gray-400 max-w-[680px] mx-auto mb-10 leading-relaxed font-normal">
          More than just an agent. Elyxnet is a comprehensive, decentralized network that transforms your idle social accounts into globally distributed AI compute nodes.
        </motion.p>

        {/* Buttons */}
        <motion.div {...anim(0.3)} className="flex flex-row items-center gap-4 w-full justify-center">
          <Link href="/connect" className="cta scale-110">
            Connect Platforms
          </Link>
          <Link href="/network" className="h-10 px-6 bg-[#111] text-white border border-white/10 rounded-md text-[14px] font-medium flex items-center justify-center hover:bg-[#1a1a1a] transition-colors hover:border-white/20">
            View Live Network
          </Link>
        </motion.div>

        {/* App Mockup Window (Yellow Theme) */}
        <motion.div {...anim(0.5)} className="mt-20 w-full max-w-[1000px] mx-auto relative group text-left">
          {/* Glowing ambient shadow behind mockup */}
          <div className="absolute -inset-4 bg-gradient-to-b from-yellow-500/10 to-transparent opacity-30 blur-3xl rounded-[32px] pointer-events-none" />
          
          <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden flex flex-col">
            
            {/* macOS Window Header */}
            <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#0F0F0F]">
              <div className="flex gap-2 w-20">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <p className="text-[12px] font-medium text-gray-400">Elyxnet Workspace</p>
              <div className="w-20" />
            </div>

            {/* Split View UI */}
            <div className="flex flex-col md:flex-row h-auto md:h-[400px]">
              
              {/* Left sidebar / Code block (Updated syntax colors to warm/yellow tones) */}
              <div className="w-full md:w-[45%] border-r border-white/5 bg-[#0A0A0A] p-6 flex flex-col justify-center">
                <div className="font-mono text-[13px] leading-[1.8] text-gray-400">
                  <span className="text-orange-400">import</span> {"{ ElyxnetAgent }"} <span className="text-orange-400">from</span> <span className="text-yellow-400">'@elyxnet/sdk'</span>;<br/><br/>
                  <span className="text-orange-400">const</span> agent = <span className="text-orange-400">new</span> <span className="text-white">ElyxnetAgent</span>({"{"}<br/>
                  &nbsp;&nbsp;network: <span className="text-yellow-400">'mainnet'</span>,<br/>
                  &nbsp;&nbsp;nodes: <span className="text-amber-200">12847</span>,<br/>
                  {"}"});<br/><br/>
                  <span className="text-orange-400">const</span> result = <span className="text-orange-400">await</span> agent.<span className="text-white">query</span>(<br/>
                  &nbsp;&nbsp;<span className="text-yellow-400">'Analyze network sentiment'</span><br/>
                  );
                </div>
              </div>

              {/* Right Data Preview */}
              <div className="w-full md:w-[55%] bg-[#050505] p-8 flex flex-col justify-center gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-2 text-gray-500">
                      <RiCpuLine size={16} /> <span className="text-[11px] uppercase tracking-wider font-semibold">Active Nodes</span>
                    </div>
                    <p className="text-3xl font-medium text-white tracking-tight">12,847 <span className="text-sm text-yellow-500 font-normal">↑ 14.2%</span></p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-2 mb-2 text-gray-500">
                      <RiTerminalBoxLine size={16} /> <span className="text-[11px] uppercase tracking-wider font-semibold">Avg Response</span>
                    </div>
                    <p className="text-3xl font-medium text-white tracking-tight">1.2s <span className="text-sm text-yellow-400 font-normal">Optimal</span></p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-yellow-500/10 bg-yellow-500/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-yellow-400/30 bg-yellow-400/10 flex items-center justify-center">
                      <RiRobot2Line className="text-yellow-400 w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-white">Agent Executing...</p>
                      <p className="text-[12px] text-gray-400">Aggregating distributed compute</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                    <span className="text-[12px] text-yellow-400 font-mono">Live</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* Crosshair Branded Logo Ticker (Real Social Platforms) */}
        <motion.div {...anim(0.6)} className="mt-24 w-full max-w-[1000px] mx-auto relative group">
          {/* Border lines with Crosshairs (+) */}
          <div className="absolute -left-1 top-[-10px] text-yellow-500 text-sm">+</div>
          <div className="absolute -right-1 top-[-10px] text-yellow-500 text-sm">+</div>
          <div className="absolute -left-1 bottom-[-10px] text-yellow-500 text-sm">+</div>
          <div className="absolute -right-1 bottom-[-10px] text-yellow-500 text-sm">+</div>
          
          <div className="border border-white/5 py-8 flex flex-col md:flex-row items-center justify-between px-6 gap-6 md:gap-0">
            <p className="text-[12px] text-gray-500 font-medium uppercase tracking-widest">Supported Platforms</p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
              
              <div className="flex items-center gap-2 text-white hover:text-white transition-colors cursor-pointer">
                <RiTwitterXFill size={20} />
                <span className="font-semibold text-sm tracking-tight hidden sm:block">X</span>
              </div>
              
              <div className="flex items-center gap-2 text-white hover:text-[#5865F2] transition-colors cursor-pointer">
                <RiDiscordFill size={22} />
                <span className="font-semibold text-sm tracking-tight hidden sm:block">Discord</span>
              </div>
              
              <div className="flex items-center gap-2 text-white hover:text-[#229ED9] transition-colors cursor-pointer">
                <RiTelegramFill size={22} />
                <span className="font-semibold text-sm tracking-tight hidden sm:block">Telegram</span>
              </div>
              
              <div className="flex items-center gap-2 text-white hover:text-[#FF0000] transition-colors cursor-pointer">
                <RiYoutubeFill size={24} />
                <span className="font-semibold text-sm tracking-tight hidden sm:block">YouTube</span>
              </div>
              
              <div className="flex items-center gap-2 text-white hover:text-[#FF4500] transition-colors cursor-pointer">
                <RiRedditFill size={24} />
                <span className="font-semibold text-sm tracking-tight hidden sm:block">Reddit</span>
              </div>
            </div>

            <p className="text-[12px] text-gray-500 font-medium hidden md:block uppercase tracking-widest">Connect to earn</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}