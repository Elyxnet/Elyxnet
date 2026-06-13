"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RiTwitterXLine, RiDiscordLine, RiYoutubeLine, RiTelegramLine, RiRedditLine, RiLinkedinLine, RiCheckLine, RiLinkM, RiErrorWarningLine, RiUserLine } from "react-icons/ri";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";
import Button from "../ui/Button";

const platforms = [
  {
    id: "x",
    name: "X / Twitter",
    icon: RiTwitterXLine,
    iconColor: "text-text-primary",
    placeholder: "https://x.com/yourhandle",
    regex: /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/([A-Za-z0-9_]{1,15})\/?$/i,
    extractHandle: (url) => {
      const m = url.match(/(?:twitter\.com|x\.com)\/([A-Za-z0-9_]{1,15})\/?$/i);
      return m ? `@${m[1]}` : null;
    },
    validateMsg: "Enter a valid X profile URL (e.g. https://x.com/username)",
  },
  {
    id: "discord",
    name: "Discord",
    icon: RiDiscordLine,
    iconColor: "text-[#5865F2]",
    placeholder: "username or discord.gg/invite",
    regex: /^(.{2,32}(#\d{4})?|https?:\/\/(www\.)?discord\.(gg|com\/invite)\/[a-zA-Z0-9]+)$/i,
    extractHandle: (url) => {
      const m = url.match(/discord\.(?:gg|com\/invite)\/([a-zA-Z0-9]+)/i);
      if (m) return `invite/${m[1]}`;
      return url.replace(/#\d{4}$/, "");
    },
    validateMsg: "Enter a Discord username or invite link",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: RiTelegramLine,
    iconColor: "text-blue-400",
    placeholder: "https://t.me/yourhandle",
    regex: /^https?:\/\/(t\.me|telegram\.me)\/([A-Za-z0-9_]{5,32})\/?$/i,
    extractHandle: (url) => {
      const m = url.match(/(?:t\.me|telegram\.me)\/([A-Za-z0-9_]{5,32})\/?$/i);
      return m ? `@${m[1]}` : null;
    },
    validateMsg: "Enter a valid Telegram profile URL (e.g. https://t.me/username)",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: RiYoutubeLine,
    iconColor: "text-red-400",
    placeholder: "https://youtube.com/@yourchannel",
    regex: /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/((@[A-Za-z0-9._-]+)|channel\/[A-Za-z0-9_-]+|c\/[A-Za-z0-9._-]+|user\/[A-Za-z0-9._-]+)\/?$/i,
    extractHandle: (url) => {
      const m = url.match(/youtube\.com\/(@[A-Za-z0-9._-]+|channel\/[A-Za-z0-9_-]+|c\/[A-Za-z0-9._-]+|user\/[A-Za-z0-9._-]+)\/?$/i);
      return m ? m[1] : null;
    },
    validateMsg: "Enter a valid YouTube channel URL (e.g. https://youtube.com/@channel)",
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: RiRedditLine,
    iconColor: "text-[#FF5700]",
    placeholder: "https://reddit.com/user/yourname",
    regex: /^https?:\/\/(www\.|old\.)?reddit\.com\/user\/([A-Za-z0-9_-]{3,20})\/?$/i,
    extractHandle: (url) => {
      const m = url.match(/reddit\.com\/user\/([A-Za-z0-9_-]{3,20})\/?$/i);
      return m ? `u/${m[1]}` : null;
    },
    validateMsg: "Enter a valid Reddit profile URL (e.g. https://reddit.com/user/username)",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: RiLinkedinLine,
    iconColor: "text-[#0A66C2]",
    placeholder: "https://linkedin.com/in/yourprofile",
    regex: /^https?:\/\/(www\.)?linkedin\.com\/in\/([A-Za-z0-9._-]+)\/?$/i,
    extractHandle: (url) => {
      const m = url.match(/linkedin\.com\/in\/([A-Za-z0-9._-]+)\/?$/i);
      return m ? m[1] : null;
    },
    validateMsg: "Enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/name)",
  },
];

export default function SocialCard({ platform, index = 0, onLinked }) {
  const shouldReduce = useReducedMotion();
  const p = platform || platforms[0];
  const Icon = p.icon;
  const [linkInput, setLinkInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [extractedInfo, setExtractedInfo] = useState(null);

  // Get the platform definition for validation
  const platformDef = platforms.find(pd => pd.id === p.id) || platforms[0];

  const handleInputChange = (value) => {
    setLinkInput(value);
    setValidationError(null);
    setError(null);

    if (value.trim()) {
      // Real-time validation
      if (platformDef.regex.test(value.trim())) {
        const handle = platformDef.extractHandle(value.trim());
        setExtractedInfo(handle);
        setValidationError(null);
      } else if (value.length > 5) {
        setExtractedInfo(null);
        setValidationError(platformDef.validateMsg);
      }
    } else {
      setExtractedInfo(null);
    }
  };

  const handleSaveLink = async () => {
    const url = linkInput.trim();
    if (!url) return;

    // Validate before saving
    if (!platformDef.regex.test(url)) {
      setValidationError(platformDef.validateMsg);
      return;
    }

    setSaving(true);
    setError(null);
    
    try {
      const res = await fetch("/api/platforms/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: p.id, profileUrl: url }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to link");
      }

      setLinkInput("");
      setExtractedInfo(null);
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
          ? "border-border-default border-dashed"
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
            <div className="flex items-center gap-2">
              <RiUserLine className="w-3 h-3 text-text-muted" />
              <span className="text-[12px] font-mono text-text-secondary truncate max-w-[200px]">
                {p.username || p.profileUrl}
              </span>
            </div>
            <span className="text-[11px] text-text-disabled flex items-center gap-1">
              <RiCheckLine className="w-3 h-3 text-green-400" />
              Verified
            </span>
          </div>
          {p.profileUrl && (
            <p className="text-[10px] text-text-disabled truncate mb-2">
              {p.profileUrl}
            </p>
          )}
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
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={p.placeholder}
                className={`w-full h-9 pl-8 pr-3 rounded-lg bg-bg-base border text-text-primary text-[12px] placeholder:text-text-disabled focus:outline-none transition-colors ${
                  validationError 
                    ? "border-red-400 focus:border-red-400" 
                    : extractedInfo 
                      ? "border-green-400 focus:border-green-400"
                      : "border-border-default focus:border-yellow-400"
                }`}
                onKeyDown={(e) => e.key === "Enter" && handleSaveLink()}
              />
            </div>
            <Button
              onClick={handleSaveLink}
              disabled={saving || !linkInput.trim() || !!validationError}
              className="h-9 px-4 rounded-lg bg-yellow-400 text-bg-base text-[12px] font-semibold hover:bg-yellow-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {saving ? "Saving..." : "Link"}
            </Button>
          </div>

          {/* Extracted account info preview */}
          {extractedInfo && !validationError && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-green-950/20 border border-green-950">
              <RiCheckLine className="w-3 h-3 text-green-400 shrink-0" />
              <span className="text-[11px] text-green-400 font-medium">
                Detected: <span className="font-mono">{extractedInfo}</span>
              </span>
            </div>
          )}

          {/* Validation error */}
          {validationError && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-red-950/20 border border-red-950">
              <RiErrorWarningLine className="w-3 h-3 text-red-400 shrink-0" />
              <span className="text-[11px] text-red-400">{validationError}</span>
            </div>
          )}

          {/* API error */}
          {error && <p className="text-red-400 text-[11px]">{error}</p>}
        </div>
      )}
    </motion.div>
  );
}

SocialCard.platforms = platforms;
