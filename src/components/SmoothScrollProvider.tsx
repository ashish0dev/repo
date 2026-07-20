"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Disable smooth scroll on mobile / touch devices for maximum performance (native scrolling is better)
    const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    setIsMobile(isTouch);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
