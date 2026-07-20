"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PhoneFrame from "@/components/PhoneFrame";
import { Footprints, Flame, Trophy } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STEPS = [
  {
    step: "1",
    title: "Show Up.",
    desc: "Import your walks or runs from any tracker. Every move counts.",
  },
  {
    step: "2",
    title: "Get Seen.",
    desc: "Every step paints your local block. Your route becomes your territory.",
  },
  {
    step: "3",
    title: "Come Back Tomorrow.",
    desc: "Hyperlocal streaks reset daily. Defend your turf, build habits.",
  },
];

export default function HowItWorks() {
  const container = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      // Set values immediately for mobile to bypass ScrollTrigger registration overhead
      gsap.set(".intvl-step-card", { opacity: 1, x: 0 });
      gsap.set(phoneRef.current, { opacity: 1, y: 0, rotate: 0 });
      return;
    }

    // 1. Stagger entry for left-side text cards
    gsap.fromTo(
      ".intvl-step-card",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // 2. Parallax float-up for the Phone mockup
    gsap.fromTo(
      phoneRef.current,
      { opacity: 0, y: 50, rotate: 1 },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: phoneRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: container });

  // Map drawing path coordinate for the phone screen
  const mapPath = "M 40 180 Q 90 80 140 120 T 240 160 T 320 220";

  return (
    <section 
      ref={container} 
      className="w-full bg-[#08110B] py-20 sm:py-28 px-6 overflow-hidden relative border-y border-[#12281a]"
    >
      {/* Background coordinate grid points with a deep green shade */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <style jsx global>{`
        @keyframes drawRoute {
          0% { stroke-dashoffset: 600; }
          70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        .anim-route-path {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: drawRoute 8s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: INTVL Style Green steps list */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div>
            <p className="text-[10px] text-[#22c55e] font-bold uppercase tracking-[0.3em] font-mono mb-3">
              THE COMPANION LAYER
            </p>
            <h2 className="font-display font-black text-white italic tracking-tight uppercase leading-[0.92] text-4xl sm:text-5xl lg:text-6xl">
              HOW THE <span className="text-[#22c55e]">GAME</span> <br /> WORKS.
            </h2>
          </div>

          <div className="space-y-4">
            {STEPS.map((s) => (
              <div 
                key={s.step}
                className="intvl-step-card flex items-start gap-4 p-5 bg-[#0e2216] border border-[#163522]/60 rounded-[20px] transition-all duration-300 hover:border-[#22c55e]/30 cursor-default"
              >
                <div className="w-8 h-8 rounded-full bg-[#22c55e] text-[#08110B] font-display font-black flex items-center justify-center shrink-0 text-sm">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-display font-black text-white text-base leading-none mb-1.5 uppercase tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: iPhone Pro Titanium Mockup displaying animated map */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <div ref={phoneRef} className="w-full max-w-[280px] sm:max-w-[310px]">
            <PhoneFrame>
              <div className="w-full h-full bg-[#FAFBFC] flex flex-col relative select-none">
                
                {/* Simulated Map Background */}
                <div className="absolute inset-0 z-10 opacity-30" style={{ backgroundImage: 'linear-gradient(#1F2937 1px, transparent 1px), linear-gradient(90deg, #1F2937 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                {/* SVG Active session path tracing */}
                <svg className="absolute inset-0 w-full h-full z-20" viewBox="0 0 300 600" fill="none">
                  {/* The running path track */}
                  <path 
                    d={mapPath} 
                    stroke="#16A34A" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    className="anim-route-path"
                  />
                  {/* Subtle grey path blueprint */}
                  <path 
                    d={mapPath} 
                    stroke="#E5E7EB" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    opacity="0.4"
                  />
                  {/* Start Point */}
                  <circle cx="40" cy="180" r="5" fill="#1F2937" stroke="#white" strokeWidth="1.5" />
                  {/* Moving Position indicator */}
                  <circle cx="320" cy="220" r="4" fill="#16A34A" stroke="#white" strokeWidth="1" />
                </svg>

                {/* Simulated App HUD top bar */}
                <div className="absolute top-[8%] left-0 right-0 z-30 px-4 flex justify-between items-center">
                  <div className="bg-white/85 backdrop-blur border border-gray-200/50 px-2.5 py-1 rounded-full text-[7.5px] font-mono font-bold text-gray-500 uppercase tracking-widest shadow-sm">
                    Shivaji Park Grid
                  </div>
                  <div className="bg-[#1F2937] text-white px-2 py-0.5 rounded text-[7.5px] font-mono font-bold uppercase tracking-wider">
                    Live
                  </div>
                </div>

                {/* Simulated App HUD bottom card */}
                <div className="absolute bottom-[6%] left-4 right-4 z-30 bg-white border border-gray-200 rounded-[20px] p-4 shadow-[0_8px_25px_rgba(0,0,0,0.06)] flex flex-col items-center">
                  <span className="text-[7.5px] text-gray-400 font-mono font-bold uppercase tracking-widest">Capture In Progress</span>
                  
                  <div className="text-2xl font-display font-black text-gray-800 tracking-tight mt-1">
                    5556 <span className="text-xs font-sans font-light text-gray-500">m²</span>
                  </div>

                  {/* Micro stats */}
                  <div className="grid grid-cols-3 gap-4 w-full border-t border-gray-100 mt-3 pt-3 text-center">
                    <div>
                      <p className="text-[6.5px] font-mono text-gray-400 font-bold uppercase">Distance</p>
                      <p className="text-[10px] font-display font-black text-gray-800">0.20 <span className="text-[7px] font-sans font-normal text-gray-500">km</span></p>
                    </div>
                    <div>
                      <p className="text-[6.5px] font-mono text-gray-400 font-bold uppercase">Duration</p>
                      <p className="text-[10px] font-display font-black text-gray-800">0:55</p>
                    </div>
                    <div>
                      <p className="text-[6.5px] font-mono text-gray-400 font-bold uppercase">Pace</p>
                      <p className="text-[10px] font-display font-black text-gray-800">4:05 <span className="text-[7px] font-sans font-normal text-gray-500">/km</span></p>
                    </div>
                  </div>
                </div>

              </div>
            </PhoneFrame>
          </div>
        </div>

      </div>
    </section>
  );
}
