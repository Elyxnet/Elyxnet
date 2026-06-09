"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiDashboardLine,
  RiServerLine,
  RiRobot2Line,
  RiCoinLine,
  RiGlobalLine,
  RiSettings3Line,
} from "react-icons/ri";
import Badge from "@/components/ui/Badge";
import Toggle from "@/components/ui/Toggle";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: RiDashboardLine },
  { href: "/infrastructure", label: "Infrastructure", icon: RiServerLine },
  {
    href: "/agent",
    label: "AI Agent",
    icon: RiRobot2Line,
    accent: true,
  },
  { href: "/rewards", label: "Rewards", icon: RiCoinLine },
  { href: "/network", label: "Network", icon: RiGlobalLine },
];

export default function Sidebar({ wallet, infraActive, onInfraToggle }) {
  const pathname = usePathname();

  const truncateWallet = (addr) => {
    if (!addr) return "0x0000…0000";
    return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-56 bg-[--color-bg-raised] border-r border-[--color-border-default] z-40 hidden md:flex flex-col">
      {/* Logo */}
      <div className="px-5 h-14 flex items-center border-b border-[--color-border-default]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-[--color-yellow-400] font-bold text-[15px] tracking-[-0.01em]">
            ELYXNET
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150
                ${
                  isActive
                    ? "bg-[--color-bg-surface] text-[--color-text-primary] border border-[--color-border-subtle]"
                    : "text-[--color-text-muted] hover:text-[--color-text-primary] hover:bg-[--color-bg-hover] border border-transparent"
                }
                ${link.accent && isActive ? "text-[--color-yellow-400]" : ""}
              `}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  link.accent && isActive ? "text-[--color-yellow-400]" : ""
                }`}
              />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-3">
        {/* Infra Mode Toggle */}
        <div className="bg-[--color-yellow-950]/30 border border-[--color-yellow-border] rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-[--color-text-secondary]">
                Infra Mode
              </p>
              <p className="text-[11px] text-[--color-text-disabled]">
                {infraActive ? "Active" : "Inactive"}
              </p>
            </div>
            <Toggle active={infraActive} onChange={onInfraToggle} />
          </div>
        </div>

        {/* Wallet address */}
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-6 h-6 rounded-full bg-[--color-yellow-950] border border-[--color-yellow-border] flex items-center justify-center">
            <span className="text-[10px] text-[--color-yellow-400] font-bold">
              {wallet ? wallet.slice(2, 4).toUpperCase() : "EX"}
            </span>
          </div>
          <span className="font-mono text-[12px] text-[--color-text-secondary] truncate">
            {truncateWallet(wallet)}
          </span>
        </div>
      </div>
    </aside>
  );
}
