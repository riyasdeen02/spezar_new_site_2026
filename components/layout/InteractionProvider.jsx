"use client";

import useScrollReveal from "@/hooks/useScrollReveal";
import useSmoothScroll from "@/hooks/useSmoothScroll";

/**
 * Mounts the global client-side behaviors (scroll reveal + smooth anchor
 * scrolling) without rendering any markup. Kept separate so the page itself
 * can stay a Server Component.
 */
export default function InteractionProvider() {
  useScrollReveal();
  useSmoothScroll(80);
  return null;
}
