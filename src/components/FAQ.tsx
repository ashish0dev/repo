"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Is Revo free?",
    a: "Yes. Revo is free to join and free to use. Founding members get early access and a permanent badge, but there's no paywall to run, walk, or show up on your local grid.",
  },
  {
    q: "When does it launch?",
    a: "We're rolling out first in Mumbai, starting with our founding waitlist members. Join now to get an early invite as we open up neighbourhood by neighbourhood.",
  },
  {
    q: "Do walkers count?",
    a: "Yes — walkers count exactly the same as runners. Revo rewards showing up and staying consistent, not pace. Beginners are first-class citizens on the grid.",
  },
  {
    q: "Is my exact route public?",
    a: "No. Your precise route stays private. Revo only shows area-level activity — your neighbourhood's heatmap and leaderboard — never your exact path or live location.",
  },
  {
    q: "Which areas are supported at launch?",
    a: "We're starting with Shivaji Park, Bandra, Powai, Marine Drive, and Juhu, with more Mumbai neighbourhoods added right after launch based on waitlist demand.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#FAFBFC] py-20 sm:py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] text-[#16A34A] font-bold uppercase tracking-[0.25em] mb-3">FAQ</p>
          <h2 className="font-display font-black text-[#1F2937] leading-[0.95] tracking-tight" style={{ fontSize: "clamp(28px, 4.5vw, 44px)" }}>
            Questions, answered.
          </h2>
        </div>

        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
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
