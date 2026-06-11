"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiCloseLine, RiDashboardLine, RiServerLine, RiRobot2Line, RiCoinLine, RiGlobalLine } from "react-icons/ri";
import Toggle from "@/components/ui/Toggle";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: RiDashboardLine },
  { href: "/infrastructure", label: "Infrastructure", icon: RiServerLine },
  { href: "/agent", label: "AI Agent", icon: RiRobot2Line, accent: true },
  { href: "/rewards", label: "Rewards", icon: RiCoinLine },
  { href: "/network", label: "Network", icon: RiGlobalLine },
];

export default function MobileDrawer({ open, onClose, wallet, infraActive, onInfraToggle }) {
  const pathname = usePathname();

  const truncateWallet = (addr) => {
    if (!addr) return "0x0000…0000";
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 z-50 md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: -224 }}
            animate={{ x: 0 }}
            exit={{ x: -224 }}
            transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-0 top-0 bottom-0 w-56 bg-bg-raised border-r border-border-default z-50 flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="px-5 h-14 flex items-center justify-between border-b border-border-default">
              <span className="text-yellow-400 font-bold text-[15px] tracking-[-0.01em]">
                ELYXNET
              </span>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-text-primary transition-colors p-1"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150
                      ${
                        isActive
                          ? "bg-bg-surface text-text-primary border border-border-subtle"
                          : "text-text-muted hover:text-text-primary hover:bg-bg-hover border border-transparent"
                      }
                      ${link.accent && isActive ? "text-yellow-400" : ""}
                    `}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${link.accent && isActive ? "text-yellow-400" : ""}`} />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="px-3 pb-4 space-y-3">
              <div className="bg-yellow-950/30 border border-yellow-border rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-medium text-text-secondary">Infra Mode</p>
                    <p className="text-[11px] text-text-disabled">{infraActive ? "Active" : "Inactive"}</p>
                  </div>
                  <Toggle active={infraActive} onChange={onInfraToggle} />
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-yellow-950 border border-yellow-border flex items-center justify-center">
                  <span className="text-[10px] text-yellow-400 font-bold">
                    {wallet ? wallet.slice(2, 4).toUpperCase() : "EX"}
                  </span>
                </div>
                <span className="font-mono text-[12px] text-text-secondary truncate">
                  {truncateWallet(wallet)}
                </span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
