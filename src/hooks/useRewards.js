"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => {
  if (!r.ok) return null;
  return r.json();
});

/**
 * Hook for reward balance with 30s polling.
 */
export function useRewards() {
  const { data: balance, error: balanceError, mutate: refreshBalance } = useSWR(
    "/api/rewards/balance",
    fetcher,
    { refreshInterval: 30000, shouldRetryOnError: false }
  );

  const { data: rate } = useSWR("/api/rewards/rate", fetcher, { shouldRetryOnError: false });

  return {
    balance: balance?.total ?? undefined,
    todayEarned: balance?.todayEarned || 0,
    rate: rate || null,
    error: balanceError,
    refresh: refreshBalance,
  };
}
