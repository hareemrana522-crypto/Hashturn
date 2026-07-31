"use client";

import { useEffect } from "react";

/**
 * Re-implements the scroll-reveal behavior from the original main.js:
 * every element with class="reveal" fades/slides into view once it
 * crosses into the viewport, staggered by its position among sibling
 * .reveal elements that share the same parent.
 *
 * Runs once, site-wide, after every route change (App Router remounts
 * this on navigation because it lives in the root layout).
 */
export default function ScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal:not(.visible)");

    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = [
              ...entry.target.parentElement.querySelectorAll(
                ".reveal:not(.visible)"
              ),
            ];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, idx * 80);
            revealIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => revealIO.observe(el));

    return () => revealIO.disconnect();
  }, []);

  return null;
}
