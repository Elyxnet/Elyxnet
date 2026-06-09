"use client";

import { motion, useReducedMotion } from "motion/react";

const leaderboardData = [
  { rank: 1, wallet: "0x7a3f...8c2d", score: 982, points: 147250, accounts: 6 },
  { rank: 2, wallet: "0x4b1e...9f7a", score: 956, points: 134100, accounts: 5 },
  { rank: 3, wallet: "0x9c2d...3e8f", score: 941, points: 128400, accounts: 6 },
  { rank: 4, wallet: "0x2f8a...6d1c", score: 923, points: 119800, accounts: 5 },
  { rank: 5, wallet: "0x6e4b...1a9d", score: 912, points: 112600, accounts: 4 },
  { rank: 6, wallet: "0x3d7c...8e2f", score: 898, points: 105200, accounts: 5 },
  { rank: 7, wallet: "0x8b1a...4f6e", score: 887, points: 98700, accounts: 4 },
  { rank: 8, wallet: "0x5c9d...2a7b", score: 871, points: 92100, accounts: 4 },
  { rank: 9, wallet: "0x1e6f...9c3a", score: 856, points: 87400, accounts: 5 },
  { rank: 10, wallet: "0x1a2b...4f9c", score: 847, points: 24810, accounts: 4, isYou: true },
  { rank: 11, wallet: "0xa4d8...7b2e", score: 834, points: 79600, accounts: 3 },
  { rank: 12, wallet: "0xf2c1...5d9a", score: 821, points: 74300, accounts: 4 },
  { rank: 13, wallet: "0xd9e3...8a1f", score: 808, points: 69100, accounts: 3 },
  { rank: 14, wallet: "0xb7a6...2c4d", score: 795, points: 64200, accounts: 3 },
  { rank: 15, wallet: "0xc3f8...6e9b", score: 782, points: 59800, accounts: 3 },
];

export default function Leaderboard() {
  const shouldReduce = useReducedMotion();

  return (
    <div className="bg-[--color-bg-surface] border border-[--color-border-default] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[--color-border-default]">
        <h3 className="text-base font-medium text-[--color-text-primary]">
          Network Leaderboard
        </h3>
        <p className="text-[11px] text-[--color-text-muted] mt-0.5">
          Top contributors ranked by infrastructure score
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[--color-border-default]">
              <th className="text-left px-5 py-3 text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled]">
                Rank
              </th>
              <th className="text-left px-5 py-3 text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled]">
                Wallet
              </th>
              <th className="text-left px-5 py-3 text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled]">
                Score
              </th>
              <th className="text-left px-5 py-3 text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled]">
                Points
              </th>
              <th className="text-left px-5 py-3 text-[11px] font-medium tracking-[0.07em] uppercase text-[--color-text-disabled]">
                Accounts
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((row, i) => (
              <motion.tr
                key={row.rank}
                initial={shouldReduce ? undefined : { opacity: 0 }}
                animate={shouldReduce ? undefined : { opacity: 1 }}
                transition={
                  shouldReduce
                    ? undefined
                    : { duration: 0.2, delay: i * 0.03, ease: "easeOut" }
                }
                className={`border-b border-[--color-border-default] last:border-b-0 transition-colors ${
                  row.isYou
                    ? "bg-[--color-yellow-950]/30"
                    : "hover:bg-[--color-bg-hover]"
                }`}
              >
                <td className="px-5 py-3">
                  <span
                    className={`text-[13px] font-semibold ${
                      row.rank <= 3
                        ? "text-[--color-yellow-400]"
                        : "text-[--color-text-primary]"
                    }`}
                  >
                    #{row.rank}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="font-mono text-[12px] text-[--color-text-secondary]">
                    {row.wallet}
                  </span>
                  {row.isYou && (
                    <span className="ml-2 text-[10px] font-medium text-[--color-yellow-400] bg-[--color-yellow-950] px-1.5 py-0.5 rounded">
                      YOU
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <span className="text-[13px] font-medium text-[--color-text-primary]">
                    {row.score}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-[13px] text-[--color-text-secondary]">
                    {row.points.toLocaleString()}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-[13px] text-[--color-text-muted]">
                    {row.accounts}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
