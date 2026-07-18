"use client";

import React, { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, touchMultiplier: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
