"use client";

import { RiMenuLine } from "react-icons/ri";
import Badge from "@/components/ui/Badge";

export default function Topbar({ title, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 h-14 bg-bg-raised/80 backdrop-blur-sm border-b border-border-default flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-text-muted hover:text-text-primary transition-colors p-1 -ml-1"
        >
          <RiMenuLine className="w-5 h-5" />
        </button>

        <h1 className="text-base font-medium text-text-primary">
          {title}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Badge variant="green" dot>
          Live
        </Badge>
      </div>
    </header>
  );
}
