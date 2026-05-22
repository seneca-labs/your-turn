"use client";
import React, { useEffect, useState } from "react";

// Lazy-load the model-viewer web component on the client.
// Once registered as <model-viewer>, render it via React.createElement
// so we avoid the JSX intrinsic-element type issues for a custom element.
export function ModelViewer({
  src,
  alt,
  className = "",
  style,
  autoRotate = true,
  cameraControls = true,
  exposure = 0.9,
  shadowIntensity = 1,
  shadowSoftness = 0.7,
  onLoad,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  autoRotate?: boolean;
  cameraControls?: boolean;
  exposure?: number;
  shadowIntensity?: number;
  shadowSoftness?: number;
  onLoad?: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={style}
      >
        <div className="font-mono text-[9px] tracking-label uppercase text-sweat opacity-60">
          Rendering...
        </div>
      </div>
    );
  }

  return React.createElement("model-viewer", {
    src,
    alt: alt || "3D model",
    "auto-rotate": autoRotate ? true : undefined,
    "rotation-per-second": "20deg",
    "camera-controls": cameraControls ? true : undefined,
    "interaction-prompt": "none",
    "shadow-intensity": shadowIntensity,
    "shadow-softness": shadowSoftness,
    exposure,
    "environment-image": "neutral",
    "touch-action": "pan-y",
    onLoad,
    style: { width: "100%", height: "100%", background: "transparent", ...style },
    className,
  });
}
