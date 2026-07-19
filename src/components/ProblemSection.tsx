"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { EyeOff, Activity, MapPin, Flame } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ProblemSection() {
  const container = useRef<HTMLDivElement>(null);
  const textWrapper = useRef<HTMLDivElement>(null);
  const visualWrapper = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // 1. Text Reveal Animation
    gsap.fromTo(
      ".problem-text-reveal > *",
      { opacity: 0, y: 40, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // 2. Visual Side Reveal
    gsap.fromTo(
      visualWrapper.current,
      { opacity: 0, x: 50, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // 3. Image Parallax
    gsap.fromTo(
      imageRef.current,
      { scale: 1.1, y: -20 },
      {
        scale: 1,
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

  }, { scope: container });

  return (
    <section
      ref={container}
      className="w-full relative bg-[#FAFBFC] pt-0 lg:pt-36 pb-20 lg:pb-40 border-b border-gray-100 overflow-hidden"
    >
      <div className="w-full lg:max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-12 items-center relative z-10">
        
        {/* IMAGE (Top on Mobile, Right on Desktop) */}
        <div ref={visualWrapper} className="order-1 lg:order-2 w-full lg:w-auto relative aspect-[4/3] lg:aspect-square lg:rounded-3xl overflow-hidden lg:shadow-[0_20px_50px_rgba(0,0,0,0.08)] lg:bg-white lg:border lg:border-gray-100 lg:p-4">
           <div className="relative w-full h-full lg:rounded-2xl overflow-hidden bg-gray-100">
             <Image
               ref={imageRef}
               src="/theme-cartoon.jpg"
               alt="Premium 3D rendering showing a runner isolated with their phone in a vibrant city"
               fill
               className="object-cover opacity-95"
               priority
             />
             
             {/* Desktop Edge fade */}
             <div className="hidden lg:block absolute inset-0 shadow-[inset_0_0_40px_rgba(255,255,255,1)] pointer-events-none rounded-2xl" />
             {/* Mobile Bottom Fade to blend seamlessly with overlapping text card */}
             <div className="block lg:hidden absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FAFBFC] via-[#FAFBFC]/90 to-transparent pointer-events-none" />
           </div>
        </div>

        {/* TEXT OVERLAP CARD (Bottom on Mobile, Left on Desktop) */}
        <div ref={textWrapper} className="order-2 lg:order-1 problem-text-reveal flex flex-col items-start w-full lg:max-w-2xl relative z-20 -mt-16 lg:mt-0">
          
          {/* Premium Mobile Card: Solid white, rounded top, shadow, centered text */}
          <div className="w-full relative bg-white lg:bg-transparent pt-10 pb-12 px-6 sm:px-12 lg:px-0 lg:pt-0 lg:pb-0 rounded-t-[40px] lg:rounded-none shadow-[0_-15px_40px_rgba(0,0,0,0.06)] lg:shadow-none flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Minimal Label */}


            {/* Powerful Headline */}
            <h2
              className="font-display font-black text-[#1F2937] leading-[1.05] tracking-tight uppercase mb-6"
              style={{ fontSize: "clamp(38px, 9vw, 68px)" }}
            >
              YOUR PHONE KNOWS. <br />
              <span className="text-[#16A34A]">THE CITY DOESN'T.</span>
            </h2>

            {/* Minimal Subtext */}
            <p className="text-base sm:text-xl font-medium text-gray-500 leading-relaxed mb-10 max-w-lg">
              You crush your PRs. You hit your daily goals.<br className="hidden sm:block" />
              But the moment you look up from your screen, your effort vanishes.<br className="hidden sm:block" />
              Your hard work leaves <strong className="text-gray-900 font-bold">zero trace</strong> in the real world.
            </p>

            {/* Insight */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-10 border-t border-gray-100 pt-8 w-full lg:w-auto">
               <div className="flex flex-col items-center lg:items-start gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-[#16A34A] uppercase tracking-widest font-mono">Digital Record</span>
                    <span className="text-2xl font-black text-[#16A34A]">✓</span>
                  </div>
               </div>
               <div className="w-full h-[1px] sm:w-[1px] sm:h-10 bg-gray-100" />
               <div className="flex flex-col items-center lg:items-start gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-mono">Physical Mark</span>
                    <span className="text-2xl font-black text-gray-400">✕</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
