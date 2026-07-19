"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is Revo free?",
    a: "Yes. Revo is free to join and free to use. Founding members get early access and a permanent badge, but there's no paywall to run, walk, or show up on your local grid.",
  },
  {
    q: "What makes REVO different from other fitness apps?",
    a: "Most fitness apps only track your workouts. REVO makes every activity visible, recognized, and connected to your local community, turning consistency into something rewarding.",
  },
  {
    q: "Which activities can I track?",
    a: "Whether you run, walk, cycle, work out, hike, or play sports, every movement contributes to your progress and your city's active map.",
  },
  {
    q: "Is my exact location shared?",
    a: "Never. Your precise location and routes stay private. REVO only displays community-level activity while keeping your personal data secure.",
  },
  {
    q: "Do I need a smartwatch to use REVO?",
    a: "No. REVO works with your smartphone, and support for popular smartwatches and fitness devices will be available as we expand.",
  },
  {
    q: "When will REVO be available?",
    a: "We're currently building REVO and rolling out access in phases. Join the waitlist to get early access and help shape the future of the platform.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full relative bg-[#FAFBFC] py-16 sm:py-24 px-6 overflow-hidden">
      
      {/* Abstract background blur orbs for FAQ */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#16A34A]/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-200/50 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start relative z-10">
        
        {/* Left Column: Text Area (Sticky) */}
        <div className="flex flex-col items-start text-left lg:sticky lg:top-32">
          <p className="text-[10px] text-[#16A34A] font-bold uppercase tracking-[0.25em] mb-4">FAQ</p>
          <h2 className="font-display font-black text-[#1F2937] leading-[1.05] tracking-tight uppercase mb-6 text-4xl sm:text-5xl lg:text-6xl">
            Questions, <br className="hidden lg:block" />answered.
          </h2>
          <p className="text-sm sm:text-base font-light text-gray-500 leading-relaxed max-w-xs">
            Everything you need to know about the product, the rollout plan, and how to get involved.
          </p>
        </div>

        {/* Right Column: Floating FAQ Card */}
        <div className="bg-white border border-gray-200 shadow-[0_20px_60px_rgba(0,0,0,0.04)] rounded-[32px] p-6 sm:p-10 divide-y divide-gray-100 relative overflow-hidden w-full">
          {FAQS.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]/40 rounded-lg"
                >
                  <span className="font-display font-bold text-base sm:text-lg text-[#1F2937]">{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#16A34A] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div 
                  className={`grid transition-all duration-300 ease-out overflow-hidden ${
                    isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <p className="text-sm text-gray-500 leading-relaxed pr-8">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
