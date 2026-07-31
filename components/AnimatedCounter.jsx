"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Replicates animateCounter() / animateSingleCounter() from main.js:
 * counts up from 0 to `target` once the element scrolls into view,
 * with an ease-out cubic curve. Handles decimals (e.g. 5.0) the
 * same way the original code did.
 *
 * Usage:
 *   <AnimatedCounter target={200} suffix="+" />
 *   <AnimatedCounter target={5.0} />
 */
export default function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1500,
  className,
}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);

    function animate() {
      const start = performance.now();
      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = ease * target;
        setValue(currentVal);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  const display =
    target % 1 !== 0
      ? value.toFixed(1)
      : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
