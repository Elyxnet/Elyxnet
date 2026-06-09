"use client";

import { useEffect, useState } from "react";

/**
 * Animated number counter with easeOutCubic interpolation.
 * @param {number} target - Target value to count up to
 * @param {number} duration - Animation duration in ms (default 800)
 * @returns {number} Current animated value
 */
export function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setValue(0);
      return;
    }

    let start = null;
    let animationId;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (progress < 1) {
        animationId = requestAnimationFrame(step);
      }
    };

    animationId = requestAnimationFrame(step);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [target, duration]);

  return value;
}
