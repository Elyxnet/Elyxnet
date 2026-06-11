"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
});

export function useSocials() {
  const { data, error, mutate } = useSWR("/api/social/list", fetcher);

  return {
    accounts: data?.accounts || [],
    isLoading: !data && !error,
    isError: error,
    refresh: mutate,
  };
}
