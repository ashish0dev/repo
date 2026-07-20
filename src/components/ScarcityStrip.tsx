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
        <div className="scarcity-card flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#111] to-[#042f1a] rounded-[24px] px-6 sm:px-8 py-6 border border-white/5 shadow-lg">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#16A34A]/15 flex items-center justify-center shrink-0">
              <Trophy className="w-4.5 h-4.5 text-[#16A34A]" />
            </div>
            <p className="text-white text-sm sm:text-[15px] font-bold leading-snug">
              Launching first in Mumbai — early members get the{" "}
              <span className="text-[#16A34A]">Founding Runner badge</span>.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest tabular-nums">
            <Flame className="w-3 h-3 text-[#16A34A]" />
            {EARLY_ACCESS_SPOTS_TOTAL.toLocaleString()} spots left in early access
          </span>
        </div>
      </div>
    </section>
  );
}
