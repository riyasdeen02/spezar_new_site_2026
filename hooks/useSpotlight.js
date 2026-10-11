import { useCallback } from "react";

/**
 * Returns a mousemove / mouseleave handler pair that drives the
 * radial spotlight glow on `.spotlight-card` elements via CSS variables.
 */
export default function useSpotlight() {
  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  const onMouseLeave = useCallback((e) => {
    e.currentTarget.style.setProperty("--mouse-x", "-200px");
    e.currentTarget.style.setProperty("--mouse-y", "-200px");
  }, []);

  return { onMouseMove, onMouseLeave };
}
