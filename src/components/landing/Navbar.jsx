"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isConnected, setIsConnected] = useState(false);
  const [checking, setChecking] = useState(true);

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

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 bg-bg-base/80 backdrop-blur-md border-b border-border-subtle/50">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-yellow-400 font-bold text-lg tracking-[-0.02em]">
            ELYXNET
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
          <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
          <a href="#network" className="hover:text-text-primary transition-colors">Network</a>
          <a href="#agent" className="hover:text-text-primary transition-colors">AI Agent</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {checking ? (
          <div className="w-24 h-9 rounded-lg bg-bg-surface animate-pulse" />
        ) : isConnected ? (
          <Link href="/dashboard" className="h-9 px-5 bg-yellow-400 text-bg-base rounded-lg text-sm font-semibold flex items-center justify-center hover:bg-yellow-200 transition-colors gap-2">
            Open Dashboard
          </Link>
        ) : (
          <>
            <Link href="/connect" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link href="/connect" className="h-9 px-4 bg-text-primary text-bg-base rounded-lg text-sm font-semibold flex items-center justify-center hover:bg-white transition-colors">
              Connect Wallet
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
