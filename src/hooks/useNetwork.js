"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
});

export function useNetwork() {
  const { data: stats, error: statsError } = useSWR("/api/network/stats", fetcher, { refreshInterval: 60000 });
  const { data: leaderboardData, error: leaderboardError } = useSWR("/api/network/leaderboard", fetcher, { refreshInterval: 120000 });

  return {
    stats,
    leaderboard: leaderboardData?.leaderboard || [],
    isLoading: !stats && !statsError,
    isError: statsError || leaderboardError,
  };
}
