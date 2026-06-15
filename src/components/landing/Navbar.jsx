"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RiArrowRightLine } from "react-icons/ri";
import Image from "next/image";

export default function Navbar() {
  const [isConnected, setIsConnected] = useState(false);
  const [checking, setChecking] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Check auth session
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        setIsConnected(!!data?.user);
      })
      .catch(() => setIsConnected(false))
      .finally(() => setChecking(false));
  }, []);

  // Detect scroll for dynamic bottom border and deeper blur
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.04] shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <Image 
            src="/logo.png"
            alt="Elyxnet Logo"
            width={140}
            height={80}
          />
        </Link>

        {/* Center Links (Floating Pill Style) */}
        <div className="hidden md:flex items-center gap-8 px-8 py-2.5 rounded-full bg-white/[0.02] border border-white/[0.04] backdrop-blur-md">
          <a href="#features" className="text-[13px] font-medium text-white/50 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300">
            Features
          </a>
          <a href="#network" className="text-[13px] font-medium text-white/50 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300">
            Network
          </a>
          <a href="#agent" className="text-[13px] font-medium text-white/50 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300">
            AI Agent
          </a>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-4 shrink-0">
          {checking ? (
            // Premium Loading Skeleton
            <div className="w-[140px] h-10 rounded-lg bg-white/[0.03] border border-white/[0.05] relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
            </div>
          ) : isConnected ? (
            // Connected State
            <Link 
              href="/dashboard" 
              className="group h-10 px-5 bg-yellow-500 text-black rounded-lg text-[13px] font-semibold flex items-center justify-center hover:bg-yellow-400 transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] gap-2"
            >
              Open Dashboard
              <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </Link>
          ) : (
            // Disconnected State
            <>
              <Link 
                href="/connect" 
                className="text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-300 hidden sm:block px-2"
              >
                Sign In
              </Link>
              <Link 
                href="/connect" 
                className="h-10 px-6 bg-white text-black rounded-lg text-[13px] font-semibold flex items-center justify-center hover:bg-gray-100 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                Connect Wallet
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}