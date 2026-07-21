"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Flame, Trophy } from "lucide-react";
import { EARLY_ACCESS_SPOTS_TOTAL } from "@/lib/config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ScarcityStrip() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      // Set values immediately for mobile to bypass ScrollTrigger registration overhead
      gsap.set(".scarcity-card", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.fromTo(
      ".scarcity-card",
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="w-full bg-[#FAFBFC] px-6">
      <div className="max-w-4xl mx-auto">
        <div className="scarcity-card flex items-center justify-center bg-gradient-to-r from-[#111] to-[#042f1a] rounded-[24px] px-6 sm:px-8 py-5 border border-white/5 shadow-lg">
          <span className="inline-flex items-center gap-2 shrink-0 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-widest tabular-nums">
            <Flame className="w-4 h-4 text-[#16A34A]" />
            {EARLY_ACCESS_SPOTS_TOTAL.toLocaleString()} spots left in early access
          </span>
        </div>
      </div>
    </section>
  );
}
