"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Lock } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function ProblemSection() {
  const container = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    // 1. Editorial Text Entry
    gsap.fromTo(
      ".problem-text > *",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    // 2. Map Canvas Slide-up
    gsap.fromTo(
      ".problem-map-canvas",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );

    // 3. Subtle Line Drawing Animation (Scroll Scrubbed)
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll(".spatial-path");
      
      gsap.fromTo(
        paths,
        { strokeDasharray: "1000", strokeDashoffset: "1000" },
        {
          strokeDashoffset: "0",
          scrollTrigger: {
            trigger: container.current,
            start: "top 60%",
            end: "bottom 30%",
            scrub: 1.2,
          },
        }
      );

      // Pulse the isolated user nodes
      gsap.fromTo(
        ".user-pulse",
        { scale: 0.8, opacity: 0.2 },
        {
          scale: 1.3,
          opacity: 0,
          duration: 2.5,
          repeat: -1,
          stagger: 0.5,
          ease: "sine.out",
        }
      );
    }
  }, { scope: container });

  return (
    <section
      ref={container}
      className="w-full relative bg-[#FAFBFC] py-20 sm:py-32 px-6 border-b border-gray-100 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Editorial Copy */}
        <div className="lg:col-span-5 space-y-6 problem-text text-left">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500 text-[9px] font-bold uppercase tracking-[0.25em] font-sans">
              The Tension
            </span>
          </div>

          <h2
            className="font-display font-black text-[#1F2937] leading-[1.02] tracking-tight uppercase"
            style={{ fontSize: "clamp(32px, 4.5vw, 54px)", letterSpacing: "-0.04em" }}
          >
            We share the streets, <br />
            <span className="text-gray-300">yet we run alone.</span>
          </h2>

          <p className="text-base sm:text-lg font-light text-[#4B5563] leading-relaxed max-w-md">
            Traditional fitness trackers focus on hyper-competition, leaving average movers behind. If you break your streak, you feel guilty. If you are ranked #427 in your neighbourhood, you feel demotivated.
          </p>

          <p className="text-sm font-semibold text-gray-400 leading-relaxed max-w-sm">
            Plus, broadcasting your exact running route online is a safety risk. We run in isolation, invisible to each other.
          </p>
        </div>

        {/* Right Column: Clean Architectural Spatial Diagram */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <div className="problem-map-canvas w-full max-w-[560px] aspect-[4/3] rounded-[32px] bg-white border border-gray-150 shadow-[0_4px_30px_rgba(0,0,0,0.015)] relative overflow-hidden p-8 flex items-center justify-center">
            
            {/* Grid overlay */}
            <div 
              className="absolute inset-0 opacity-[0.015] pointer-events-none" 
              style={{ 
                backgroundImage: 'linear-gradient(#1F2937 1px, transparent 1px), linear-gradient(90deg, #1F2937 1px, transparent 1px)', 
                backgroundSize: '36px 36px' 
              }} 
            />

            {/* Custom Spatial Design SVG */}
            <svg
              ref={svgRef}
              viewBox="0 0 400 300"
              className="w-full h-full relative z-10"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Minimal Coordinate Grid */}
              <g stroke="rgba(31, 41, 55, 0.03)" strokeWidth="0.8">
                <line x1="0" y1="75" x2="400" y2="75" />
                <line x1="0" y1="150" x2="400" y2="150" />
                <line x1="0" y1="225" x2="400" y2="225" />
                <line x1="100" y1="0" x2="100" y2="300" />
                <line x1="200" y1="0" x2="200" y2="300" />
                <line x1="300" y1="0" x2="300" y2="300" />
              </g>

              {/* Connected reference dot lines */}
              <g stroke="rgba(31, 41, 55, 0.05)" strokeWidth="1" strokeDasharray="4 4">
                <line x1="80" y1="90" x2="280" y2="210" />
                <line x1="280" y1="90" x2="150" y2="220" />
              </g>

              {/* Running Paths (Thin, organic grey curves drawn on scroll) */}
              <g fill="none" strokeWidth="2" strokeLinecap="round">
                {/* Loop 1 */}
                <path
                  className="spatial-path"
                  d="M 50,110 C 70,70 120,60 110,120 C 100,180 50,160 50,110"
                  stroke="rgba(31, 41, 55, 0.15)"
                />
                {/* Loop 2 */}
                <path
                  className="spatial-path"
                  d="M 250,70 C 290,40 350,70 320,120 C 290,170 230,130 250,70"
                  stroke="rgba(31, 41, 55, 0.15)"
                />
                {/* Loop 3 */}
                <path
                  className="spatial-path"
                  d="M 120,230 C 180,260 220,240 260,200"
                  stroke="rgba(31, 41, 55, 0.15)"
                />
              </g>

              {/* User Nodes (Solid nodes representing isolated movers) */}
              {/* User 1 */}
              <g>
                <circle cx="80" cy="90" r="5" fill="#4B5563" />
                <circle className="user-pulse" cx="80" cy="90" r="14" fill="none" stroke="#4B5563" strokeWidth="1" />
                <text x="80" y="74" fill="#9CA3AF" fontSize="6.5" fontFamily="monospace" letterSpacing="0.05em" textAnchor="middle">ID: 08A_SOLO</text>
              </g>

              {/* User 2 */}
              <g>
                <circle cx="280" cy="90" r="5" fill="#4B5563" />
                <circle className="user-pulse" cx="280" cy="90" r="14" fill="none" stroke="#4B5563" strokeWidth="1" />
                <text x="280" y="74" fill="#9CA3AF" fontSize="6.5" fontFamily="monospace" letterSpacing="0.05em" textAnchor="middle">ID: 14D_SOLO</text>
              </g>

              {/* User 3 */}
              <g>
                <circle cx="150" cy="220" r="5" fill="#4B5563" />
                <circle className="user-pulse" cx="150" cy="220" r="14" fill="none" stroke="#4B5563" strokeWidth="1" />
                <text x="150" y="240" fill="#9CA3AF" fontSize="6.5" fontFamily="monospace" letterSpacing="0.05em" textAnchor="middle">ID: 02C_SOLO</text>
              </g>

              {/* Tiny subtle center badge indicating unconnected grid */}
              <g transform="translate(200, 150)">
                <rect x="-42" y="-9" width="84" height="18" rx="9" fill="#FAFBFC" stroke="rgba(31, 41, 55, 0.08)" strokeWidth="1" />
                <text x="0" y="3" fill="#9CA3AF" fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">UNCONNECTED</text>
              </g>
            </svg>

          </div>
        </div>

      </div>
    </section>
  );
}
