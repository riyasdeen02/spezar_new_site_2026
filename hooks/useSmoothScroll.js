import { useEffect } from "react";

/**
 * Smoothly scrolls to in-page anchor targets when a hash link is clicked,
 * accounting for the fixed 80px header. Falls back to default behavior
 * for `#` and external links.
 */
export default function useSmoothScroll(headerOffset = 80) {
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({
        top,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [headerOffset]);
}
