"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Footprints, Flame, Trophy } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STEPS = [
  {
    icon: Footprints,
    step: "01",
    title: "Run or walk.",
    desc: "Open Revo and start moving — any pace, any distance. Walkers and beginners count exactly the same as runners.",
  },
  {
    icon: Flame,
    step: "02",
    title: "Your area heats up.",
    desc: "Every session adds live heat to your neighbourhood's grid. The more you and your area move, the brighter it glows.",
  },
  {
    icon: Trophy,
    step: "03",
    title: "Climb your local leaderboard.",
    desc: "Rankings are hyperlocal — your park, your block. Show up consistently and you can lead your area.",
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".how-it-works-card",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="w-full bg-[#FAFBFC] py-20 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[10px] text-[#16A34A] font-bold uppercase tracking-[0.25em] mb-3">How It Works</p>
          <h2 className="font-display font-black text-[#1F2937] leading-[0.95] tracking-tight" style={{ fontSize: "clamp(28px, 4.5vw, 52px)" }}>
            Three steps to your first mark.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="how-it-works-card bg-white border border-gray-200 rounded-[24px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-full bg-[#16A34A]/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-[#16A34A]" />
                </div>
                <span className="font-mono text-[11px] font-bold text-gray-300">{s.step}</span>
              </div>
              <div>
                <h3 className="font-display font-black text-xl text-[#1F2937] leading-tight mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
