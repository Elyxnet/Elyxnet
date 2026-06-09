"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

/**
 * Hook for infrastructure stats with 30s polling.
 */
export function useInfraStats() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/infra/stats",
    fetcher,
    { refreshInterval: 30000 }
  );

  return {
    stats: data,
    error,
    isLoading,
    refresh: mutate,
  };
}
