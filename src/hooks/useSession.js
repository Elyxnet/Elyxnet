"use client";

import useSWR from "swr";

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) return null;
    return res.json();
  });

/**
 * Client-side session hook. Checks /api/auth/session for JWT cookie.
 * Returns user data if authenticated, null otherwise.
 */
export function useSession() {
  const { data, error, mutate, isLoading } = useSWR("/api/auth/session", fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    user: data?.user || null,
    isAuthenticated: !!data?.user,
    isLoading,
    error,
    refresh: mutate,
  };
}
