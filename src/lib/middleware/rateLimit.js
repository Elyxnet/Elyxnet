/**
 * Simple in-memory rate limiter for API routes.
 * Uses a token bucket algorithm per IP/wallet.
 */

const buckets = new Map();

const DEFAULT_OPTIONS = {
  maxRequests: 60,
  windowMs: 60 * 1000, // 1 minute
};

/**
 * Rate limit middleware.
 * @param {Object} options - { maxRequests, windowMs }
 */
export function rateLimit(options = {}) {
  const { maxRequests, windowMs } = { ...DEFAULT_OPTIONS, ...options };

  return (req) => {
    const identifier =
      req.user?.walletAddress ||
      req.headers.get("x-forwarded-for") ||
      "anonymous";

    const now = Date.now();
    let bucket = buckets.get(identifier);

    if (!bucket || now - bucket.windowStart > windowMs) {
      bucket = { count: 0, windowStart: now };
      buckets.set(identifier, bucket);
    }

    bucket.count++;

    if (bucket.count > maxRequests) {
      return Response.json(
        {
          error: "Rate limit exceeded",
          retryAfter: Math.ceil((bucket.windowStart + windowMs - now) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((bucket.windowStart + windowMs - now) / 1000)
            ),
          },
        }
      );
    }

    return null; // Not rate limited
  };
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > 300000) {
      buckets.delete(key);
    }
  }
}, 300000);
