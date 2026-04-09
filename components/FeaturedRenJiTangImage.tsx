"use client";

import { useCallback, useEffect, useState } from "react";

const CANDIDATE_SRCS = ["/images/renjitang1.png", "/renjitang1.png"] as const;

type Props = {
  alt: string;
  className?: string;
};

/**
 * Gewone &lt;img&gt; (geen next/image) met fallback-paden + console-debug bij laadfouten.
 */
export default function FeaturedRenJiTangImage({ alt, className }: Props) {
  const [srcIndex, setSrcIndex] = useState(0);
  const src = CANDIDATE_SRCS[srcIndex] ?? CANDIDATE_SRCS[0];

  useEffect(() => {
    console.log("[Ren Ji Tang image] active src:", src);
  }, [src]);

  const onError = useCallback(() => {
    console.warn("[Ren Ji Tang image] failed to load:", src);
    if (srcIndex + 1 < CANDIDATE_SRCS.length) {
      const next = CANDIDATE_SRCS[srcIndex + 1];
      console.log("[Ren Ji Tang image] retry with:", next);
      setSrcIndex((i) => i + 1);
    } else {
      console.error("[Ren Ji Tang image] all paths failed (check Network tab for 404):", [...CANDIDATE_SRCS]);
    }
  }, [src, srcIndex]);

  return (
    <img
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      decoding="async"
      onError={onError}
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
