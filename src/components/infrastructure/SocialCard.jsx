"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RiTwitterXLine, RiDiscordLine, RiYoutubeLine, RiTelegramLine, RiRedditLine, RiLinkedinLine, RiCheckLine, RiLinkM } from "react-icons/ri";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

const platforms = [
  {
    id: "x",
    name: "X / Twitter",
    icon: RiTwitterXLine,
    iconColor: "text-text-primary",
    placeholder: "https://x.com/yourhandle",
    regex: /^https?:\/\/(twitter\.com|x\.com)\/\w+/i,
  },
  {
    id: "discord",
    name: "Discord",
    icon: RiDiscordLine,
    iconColor: "text-[#5865F2]",
    placeholder: "yourusername#0000 or discord.gg/invite",
    regex: /^.{2,}$/,
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: RiTelegramLine,
    iconColor: "text-blue-400",
    placeholder: "https://t.me/yourhandle",
    regex: /^https?:\/\/(t\.me|telegram\.me)\/\w+/i,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: RiYoutubeLine,
    iconColor: "text-red-400",
    placeholder: "https://youtube.com/@yourchannel",
    regex: /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/i,
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: RiRedditLine,
    iconColor: "text-[#FF5700]",
    placeholder: "https://reddit.com/user/yourname",
    regex: /^https?:\/\/(www\.)?reddit\.com\/user\/\w+/i,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: RiLinkedinLine,
    iconColor: "text-[#0A66C2]",
    placeholder: "https://linkedin.com/in/yourprofile",
    regex: /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i,
  },
];

export default function SocialCard({ platform, index = 0, onLinked }) {
  const shouldReduce = useReducedMotion();
  const p = platform || platforms[0];
  const Icon = p.icon;
  const [linkInput, setLinkInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveLink = async () => {
    if (!linkInput.trim()) return;
    
    setSaving(true);
    setError(null);
    
    try {
      const res = await fetch("/api/platforms/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: p.id, profileUrl: linkInput.trim() }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to link");
      }

      setLinkInput("");
      if (onLinked) onLinked();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={shouldReduce ? undefined : { opacity: 0, y: 12 }}
      animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
      transition={
        shouldReduce
          ? undefined
          : { duration: 0.25, delay: index * 0.06, ease: "easeOut" }
      }
      className={`bg-bg-raised border rounded-xl p-4 transition-all duration-150 ${
        p.connected
          ? "border-l-2 border-l-yellow-400 border-t border-r border-b border-t-border-default border-r-border-default border-b-border-default"
          : "border-border-default"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <Icon className={`w-5 h-5 ${p.iconColor}`} />
          <span className="text-sm font-medium text-text-primary">
            {p.name}
          </span>
        </div>
        {p.connected ? (
          <Badge variant="green" dot>
            Linked
          </Badge>
        ) : (
          <Badge variant="muted">Not linked</Badge>
        )}
      </div>

      {p.connected && (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-mono text-text-secondary truncate max-w-[200px]">
              {p.profileUrl || p.username}
            </span>
            <span className="text-[11px] text-text-disabled flex items-center gap-1">
              <RiCheckLine className="w-3 h-3 text-green-400" />
              Verified
            </span>
          </div>
          {p.score > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-text-disabled">
                Score: {p.score}
              </span>
              <ProgressBar
                value={p.score}
                max={100}
                color="bg-yellow-400"
                className="flex-1"
              />
            </div>
          )}
        </>
      )}

      {!p.connected && (
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <RiLinkM className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-disabled" />
              <input
                type="text"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder={p.placeholder}
                className="w-full h-9 pl-8 pr-3 rounded-lg bg-bg-base border border-border-default text-text-primary text-[12px] placeholder:text-text-disabled focus:outline-none focus:border-yellow-400 transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleSaveLink()}
              />
            </div>
            <button
              onClick={handleSaveLink}
              disabled={saving || !linkInput.trim()}
              className="h-9 px-4 rounded-lg bg-yellow-400 text-bg-base text-[12px] font-semibold hover:bg-yellow-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {saving ? "Saving..." : "Link"}
            </button>
          </div>
          {error && <p className="text-red-400 text-[11px]">{error}</p>}
        </div>
      )}
    </motion.div>
  );
}

SocialCard.platforms = platforms;
