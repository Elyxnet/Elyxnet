"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

/**
 * Hook for reward balance with 30s polling.
 */
export function useRewards() {
  const { data: balance, error: balanceError, mutate: refreshBalance } = useSWR(
    "/api/rewards/balance",
    fetcher,
    { refreshInterval: 30000 }
  );

  const { data: rate } = useSWR("/api/rewards/rate", fetcher);

  return {
    balance: balance?.total || 0,
    todayEarned: balance?.todayEarned || 0,
    rate: rate || null,
    error: balanceError,
    refresh: refreshBalance,
  };
}
