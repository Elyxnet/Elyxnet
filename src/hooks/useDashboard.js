"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
});

export function useDashboard() {
  const { data, error, mutate } = useSWR("/api/dashboard", fetcher, { refreshInterval: 15000 });

  return {
    data,
    isLoading: !data && !error,
    isError: error,
    refresh: mutate,
  };
}
