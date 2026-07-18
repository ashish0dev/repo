"use client";

import React from "react";

export default function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        aspectRatio: "9 / 19.5",
        boxShadow: "0 30px 60px -15px rgba(15, 23, 42, 0.25), 0 12px 24px -10px rgba(15, 23, 42, 0.15)"
      }}
    >
      {/* Outer Phone Body (Natural Titanium gradient) */}
      <div className="absolute inset-0 rounded-[13%/6%] bg-gradient-to-b from-[#e5e7eb] via-[#f3f4f6] to-[#c7cbd1] border border-[#bdc2ca] overflow-hidden shadow-[inset_0_0_8px_rgba(0,0,0,0.12)]">
        
        {/* Subtle Metallic Chamfer/Highlight edge */}
        <div className="absolute inset-[1px] rounded-[13%/6%] border border-white/60 bg-transparent pointer-events-none z-10" />

        {/* Antenna Bands (Precise iPhone-style details) */}
        <div className="absolute left-0 top-[12%] w-[1.5px] h-[1.5%] bg-[#a1a8b3]" />
        <div className="absolute right-0 top-[12%] w-[1.5px] h-[1.5%] bg-[#a1a8b3]" />
        <div className="absolute left-0 bottom-[12%] w-[1.5px] h-[1.5%] bg-[#a1a8b3]" />
        <div className="absolute right-0 bottom-[12%] w-[1.5px] h-[1.5%] bg-[#a1a8b3]" />

        {/* Side buttons (Metallic depth) */}
        {/* Ring/Silent Button */}
        <div className="absolute left-[-1.5px] top-[18%] w-[2.5px] h-[3%] bg-gradient-to-b from-[#d1d5db] to-[#9ca3af] rounded-r border-y border-r border-[#bdc2ca]" />
        {/* Volume Up */}
        <div className="absolute left-[-1.5px] top-[26%] w-[2.5px] h-[7%] bg-gradient-to-b from-[#d1d5db] to-[#9ca3af] rounded-r border-y border-r border-[#bdc2ca]" />
        {/* Volume Down */}
        <div className="absolute left-[-1.5px] top-[35%] w-[2.5px] h-[7%] bg-gradient-to-b from-[#d1d5db] to-[#9ca3af] rounded-r border-y border-r border-[#bdc2ca]" />
        {/* Power Button */}
        <div className="absolute right-[-1.5px] top-[29%] w-[2.5px] h-[10%] bg-gradient-to-b from-[#d1d5db] to-[#9ca3af] rounded-l border-y border-l border-[#bdc2ca]" />
        
        {/* Screen Bezel (Ultra-thin polished black edge) */}
        <div className="absolute inset-[1.5%] rounded-[11.8%/5.4%] bg-black overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.15)] border border-black/80">
          
          {/* Dynamic Island (Precise sensor details) */}
          <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[28%] h-[3.4%] bg-[#08080c] rounded-full z-50 flex items-center justify-center gap-1 shadow-inner">
            <div className="w-[18%] h-[55%] rounded-full bg-[#101018] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />
            <div className="w-[30%] h-[55%] rounded-full bg-[#0a0a0f] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />
          </div>
          
          {/* Screen Content */}
          <div className="absolute inset-0 bg-[#FAFBFC] overflow-hidden select-none">
            {children}
          </div>
          
          {/* iOS Home Indicator */}
          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[28%] h-[0.7%] bg-black/15 rounded-full z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
