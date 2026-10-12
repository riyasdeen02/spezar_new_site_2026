"use client";

// Client-only wrapper for the three.js scene. Nothing 3D is downloaded or built until the section
// is about to scroll into view, so the page start stays light; until then (and while the chunk
// loads) the empty stage with the same glow background is shown, so nothing flashes.
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Stage = () => <div className="capability-scene" aria-hidden="true" />;
const CapabilitiesExploded = dynamic(() => import("./CapabilitiesExploded"), { ssr: false, loading: Stage });

export default function CapabilitiesScene() {
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "150px 0px" } // start just before it scrolls into view
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return near ? <CapabilitiesExploded /> : <div ref={ref} className="capability-scene" aria-hidden="true" />;
}
