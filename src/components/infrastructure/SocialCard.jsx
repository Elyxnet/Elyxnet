"use client";

import { motion, useReducedMotion } from "motion/react";
import { RiTwitterXLine, RiDiscordLine, RiYoutubeLine, RiTelegramLine, RiRedditLine, RiLinkedinLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

const platforms = [
  {
    id: "x",
    name: "X / Twitter",
    icon: RiTwitterXLine,
    iconColor: "text-[--color-text-primary]",
    connected: true,
    username: "@elyxnet_user",
    lastSync: "2m ago",
    score: 85,
  },
  {
    id: "discord",
    name: "Discord",
    icon: RiDiscordLine,
    iconColor: "text-[#5865F2]",
    connected: true,
    username: "elyxnet#4291",
    lastSync: "5m ago",
    score: 72,
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: RiTelegramLine,
    iconColor: "text-[--color-blue-400]",
    connected: true,
    username: "@elyx_tg",
    lastSync: "12m ago",
    score: 68,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: RiYoutubeLine,
    iconColor: "text-[--color-red-400]",
    connected: true,
    username: "Elyxnet Channel",
    lastSync: "1h ago",
    score: 45,
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: RiRedditLine,
    iconColor: "text-[--color-text-muted]",
    connected: false,
    comingSoon: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: RiLinkedinLine,
    iconColor: "text-[--color-text-muted]",
    connected: false,
    comingSoon: true,
  },
];

export default function SocialCard({ platform, index = 0 }) {
  const shouldReduce = useReducedMotion();
  const p = platform || platforms[0];
  const Icon = p.icon;

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={
        shouldReduce
          ? undefined
          : { duration: 0.25, delay: index * 0.06, ease: "easeOut" }
      }
      className={`bg-[--color-bg-raised] border rounded-xl p-4 transition-all duration-150 ${
        p.connected
          ? "border-l-2 border-l-[--color-yellow-400] border-t border-r border-b border-t-[--color-border-default] border-r-[--color-border-default] border-b-[--color-border-default]"
          : "border-[--color-border-default]"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <Icon className={`w-5 h-5 ${p.iconColor}`} />
          <span className="text-sm font-medium text-[--color-text-primary]">
            {p.name}
          </span>
        </div>
        {p.connected ? (
          <Badge variant="green" dot>
            Connected
          </Badge>
        ) : p.comingSoon ? (
          <Badge variant="muted">Coming soon</Badge>
        ) : (
          <Badge variant="muted">Not connected</Badge>
        )}
      </div>

      {p.connected && (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-mono text-[--color-text-secondary]">
              {p.username}
            </span>
            <span className="text-[11px] text-[--color-text-disabled]">
              Last synced: {p.lastSync}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[--color-text-disabled]">
              Score: {p.score}
            </span>
            <ProgressBar
              value={p.score}
              max={100}
              color="bg-[--color-yellow-400]"
              className="flex-1"
            />
          </div>
        </>
      )}

      {!p.connected && !p.comingSoon && (
        <Button variant="ghost" className="w-full mt-2 text-[12px]">
          Connect {p.name}
        </Button>
      )}

      {p.comingSoon && (
        <p className="text-[11px] text-[--color-text-disabled] mt-2">
          This platform will be available in a future update.
        </p>
      )}
    </motion.div>
  );
}

SocialCard.platforms = platforms;
