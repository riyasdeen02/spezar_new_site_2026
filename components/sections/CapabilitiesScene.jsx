"use client";

// Client-only wrapper: the three.js scene needs the browser, so it's loaded without SSR.
// Until it mounts, the stage (same glow background) is rendered so nothing flashes.
import dynamic from "next/dynamic";

const CapabilitiesExploded = dynamic(() => import("./CapabilitiesExploded"), {
  ssr: false,
  loading: () => <div className="capability-scene" aria-hidden="true" />,
});

export default function CapabilitiesScene() {
  return <CapabilitiesExploded />;
}
