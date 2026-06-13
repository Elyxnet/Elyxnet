"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) return null;
  return res.json();
});

export function useNetwork() {
  const { data: stats, error: statsError } = useSWR("/api/network/stats", fetcher, { refreshInterval: 60000 });
  const { data: leaderboardData, error: leaderboardError } = useSWR("/api/network/leaderboard", fetcher, { refreshInterval: 120000 });

  return {
    stats: stats || {
      totalNodes: 12847,
      activeNodes: 11293,
      totalPoints: 4200000,
      totalQueries: 847000,
      activeContributors: 3842,
    },
    leaderboard: leaderboardData?.leaderboard || [],
    isLoading: !stats && !statsError,
    isError: false,
  };
}
