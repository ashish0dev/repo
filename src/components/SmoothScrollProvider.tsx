"use client";

import React, { ReactNode } from 'react';
import { ReactLenis } from 'lenis/react';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
