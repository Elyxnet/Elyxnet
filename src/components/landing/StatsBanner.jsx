"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { 
  RiTwitterXFill, 
  RiDiscordFill, 
  RiTelegramFill, 
  RiYoutubeFill 
} from "react-icons/ri";

// ==========================================
// 1. Premium ASCII Pixel-Reader Canvas
// ==========================================
function AsciiPlatformLogos() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;
    
    // Platforms to cycle through
    const platforms = ["X", "DC", "TG", "YT"];
    let currentPlatformIndex = 0;
    
    // Character set for the matrix
    const operators = ["@", "#", "&", "%", "+", "=", "*", ":", "-", "."];

    // Offscreen canvas to render text and extract pixel data
    const offscreenCanvas = document.createElement("canvas");
    const offCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true });
    
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      offscreenCanvas.width = 64; // Low res for pixelation effect
      offscreenCanvas.height = 64;
    };
    
    window.addEventListener("resize", resize);
    resize();

    // Change platform every 3 seconds
    const intervalId = setInterval(() => {
      currentPlatformIndex = (currentPlatformIndex + 1) % platforms.length;
    }, 3000);

    const draw = () => {
      // 1. Draw the current text to the offscreen canvas
      offCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
      offCtx.fillStyle = "white";
      offCtx.font = "bold 40px sans-serif";
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";
      offCtx.fillText(platforms[currentPlatformIndex], offscreenCanvas.width / 2, offscreenCanvas.height / 2);
      
      const imgData = offCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height).data;

      // 2. Draw the ASCII grid to the main canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const spacing = 12; // Distance between characters
      const cols = Math.floor(canvas.width / spacing);
      const rows = Math.floor(canvas.height / spacing);

      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * spacing + spacing / 2;
          const py = y * spacing + spacing / 2;
          
          // Map main canvas coordinates to offscreen canvas (0 to 64)
          const offX = Math.floor((x / cols) * offscreenCanvas.width);
          const offY = Math.floor((y / rows) * offscreenCanvas.height);
          
          // Get alpha channel of the pixel (Red, Green, Blue, Alpha)
          const pixelIndex = (offY * offscreenCanvas.width + offX) * 4 + 3;
          const alpha = imgData[pixelIndex];

          // Noise calculation to make the background feel "alive"
          const noise = Math.sin(x * 0.5 + time) * Math.cos(y * 0.5 + time);
          
          // Randomly select an operator
          const char = operators[Math.floor(Math.random() * operators.length)];

          if (alpha > 128) {
            // It's part of the Logo: Draw bright glowing yellow
            ctx.fillStyle = `rgba(234, 179, 8, ${0.8 + noise * 0.2})`; // yellow-500
            ctx.fillText(char, px, py);
          } else {
            // It's background: Draw very dim, sparse characters
            if (Math.random() > 0.6) {
              ctx.fillStyle = `rgba(255, 255, 255, ${0.05 + noise * 0.05})`;
              ctx.fillText(char, px, py);
            }
          }
        }
      }

      time += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(intervalId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-56 rounded-2xl border border-white/[0.04] bg-[#080808] relative flex items-center justify-center overflow-hidden group mt-8">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-700"
      />
      {/* Soft overlay gradient to blend edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#080808_100%)] pointer-events-none" />
    </div>
  );
}

// ==========================================
// 2. Main Stats Banner Component
// ==========================================
export default function StatsBanner() {
  const shouldReduce = useReducedMotion();

  const anim = (delay) =>
    shouldReduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: "blur(4px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "-100px" },
          transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section className="py-20 px-4 sm:px-6 relative z-10 bg-[#050505] overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Content & Canvas */}
        <motion.div {...anim(0)} className="flex flex-col">
          <h2 className="text-4xl md:text-[52px] font-medium tracking-tight text-text-primary leading-[1.1] mb-6">
            Real outcomes from <br />
            teams running <span className="text-text-primary font-semibold">Elyxnet</span>
          </h2>
          <p className="text-text-secondary text-[15px] leading-relaxed max-w-md">
            From faster data aggregation to a massive decentralized compute layer, operators cut the noise and scale intelligence the moment their node goes live.
          </p>
          
          {/* The ASCII Canvas perfectly integrated below the text */}
          <AsciiPlatformLogos />
        </motion.div>

        {/* Right Side: Premium Stacked Stats (Bento Style) */}
        <motion.div {...anim(0.2)} className="w-full">
          {/* Unified Container matching the requested "Card Style" */}
          <div className="flex flex-col rounded-[32px] bg-[#0A0A0A] border border-white/[0.04] shadow-2xl overflow-hidden">
            
            {/* Stat Row 1 */}
            <div className="group flex items-center justify-between p-8 md:p-10 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-500">
              <div>
                <p className="text-[56px] font-medium tracking-tight text-white leading-none mb-2 group-hover:text-yellow-400 transition-colors duration-500">
                  12k+
                </p>
                <p className="text-[13px] text-white/40 font-medium">
                  Active Global Nodes
                </p>
              </div>
              <div className="flex items-center gap-2 text-white/20 group-hover:text-white/80 transition-colors duration-500">
                <RiTwitterXFill size={28} />
              </div>
            </div>

            {/* Stat Row 2 */}
            <div className="group flex items-center justify-between p-8 md:p-10 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-500">
              <div>
                <p className="text-[56px] font-medium tracking-tight text-white leading-none mb-2 group-hover:text-yellow-400 transition-colors duration-500">
                  4.2M
                </p>
                <p className="text-[13px] text-white/40 font-medium">
                  Points Distributed
                </p>
              </div>
              <div className="flex items-center gap-2 text-white/20 group-hover:text-[#5865F2] transition-colors duration-500">
                <RiDiscordFill size={32} />
              </div>
            </div>

            {/* Stat Row 3 */}
            <div className="group flex items-center justify-between p-8 md:p-10 hover:bg-white/[0.02] transition-colors duration-500">
              <div>
                <p className="text-[56px] font-medium tracking-tight text-white leading-none mb-2 group-hover:text-yellow-400 transition-colors duration-500">
                  847k
                </p>
                <p className="text-[13px] text-white/40 font-medium">
                  Queries Served
                </p>
              </div>
              <div className="flex items-center gap-2 text-white/20 group-hover:text-[#FF0000] transition-colors duration-500">
                <RiYoutubeFill size={32} />
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}