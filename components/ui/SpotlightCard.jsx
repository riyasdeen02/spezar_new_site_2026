"use client";

import useSpotlight from "@/hooks/useSpotlight";
import Image from "next/image";
import { heroImage } from "@/data/content";
import { withBase } from "@/lib/basePath";

/**
 * Interactive card with a mouse-tracking radial glow.
 * Renders as `tag` (default div) and forwards className + children.
 */
export default function SpotlightCard({
  as: Tag = "div",
  className = "",
  image = heroImage,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  children,
  ...rest
}) {
  const { onMouseMove, onMouseLeave } = useSpotlight();

  return (
    <Tag
      className={`spotlight-card ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      {image && (
        <>
          <Image
            src={withBase(image)}
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            className="spotlight-card-image"
          />
          <span className="spotlight-card-overlay" aria-hidden="true" />
        </>
      )}
      {children}
    </Tag>
  );
}
