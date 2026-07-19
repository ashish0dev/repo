"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { Sparkles, User, Award, TrendingUp, Users, Activity, Map, Trophy, Globe, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function WhyRevoWorks() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text animations
    gsap.fromTo(
      ".why-revo-text > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 2. Card animations (Premium one-by-one sequential reveal)
    gsap.fromTo(
      ".flow-step",
      { opacity: 0, y: 60, scale: 0.85, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.25, // Pronounced one-by-one delay
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ".flow-diagram-container",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, { scope: container });

  return (
    <section
      ref={container}
      className="w-full relative bg-[#FAFBFC] py-12 sm:py-16 px-6 border-b border-gray-150 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Header Block */}
        <div className="why-revo-text space-y-4 max-w-2xl mb-8 sm:mb-10">


          <h2
            className="font-display font-black text-[#1F2937] leading-[1.05] tracking-tight uppercase"
            style={{ fontSize: "clamp(32px, 5vw, 54px)", letterSpacing: "-0.04em" }}
          >
            The Consistency Loop.
          </h2>

          <p className="text-base sm:text-lg font-light text-[#4B5563] leading-relaxed">
            Most apps measure your fitness. Revo builds your habit. By transforming your daily 
            movement into local milestones, we replace athletic guilt with community pride.
          </p>
        </div>

        {/* CRAZY PREMIUM: Expanding Cards Layout (Desktop) & Snap Carousel (Mobile) */}
        <div className="flow-diagram-container w-full max-w-6xl relative mt-0 lg:mt-0">
          
          {/* Animated Background Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#16A34A]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none md:flex-row gap-4 md:gap-5 pb-10 md:pb-0 px-6 md:px-0 -mx-6 md:mx-0 relative z-10 md:h-[340px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            
            {/* Card 1 */}
            <div className="flow-step group w-[85vw] sm:w-[320px] md:w-auto flex-shrink-0 snap-center md:flex-1 md:hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-white border border-gray-200/80 rounded-[32px] p-8 flex flex-col justify-between text-left shadow-[0_8px_30px_rgba(0,0,0,0.02)] md:shadow-none hover:shadow-[0_20px_60px_rgba(22,163,74,0.06)] relative overflow-hidden h-[300px] md:h-full cursor-pointer">
              {/* Giant Background Cartoon */}
              <div className="absolute -left-16 top-4 w-72 h-72 mix-blend-multiply opacity-15 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
                <Image src="/card1.jpg" alt="You" fill sizes="(max-width: 768px) 288px, 288px" className="object-contain" />
              </div>
              
              <span className="absolute -bottom-2 right-0 text-[120px] font-display font-black text-gray-100 leading-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-2">1</span>
              <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 relative z-10">
                <User className="w-5 h-5 text-[#16A34A]" />
              </div>
              {/* Fixed width container prevents text cramping */}
              <div className="mt-auto relative z-10 w-[260px]">
                <span className="text-[#16A34A] text-[10px] font-mono font-bold uppercase tracking-widest block mb-2 opacity-0 -translate-y-4 transition-all duration-500 delay-100 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:hidden block">Step 01</span>
                <h4 className="font-display font-black text-[#1F2937] text-2xl md:text-3xl uppercase leading-none mb-3 whitespace-normal overflow-visible">Your<br/>Movement</h4>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-150">Every step counts. Connect your tracker and let your daily walks or runs fuel your journey.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flow-step group w-[85vw] sm:w-[320px] md:w-auto flex-shrink-0 snap-center md:flex-1 md:hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-gradient-to-br from-[#111] to-[#042f1a] border border-white/10 rounded-[32px] p-8 flex flex-col justify-between text-left shadow-xl h-[300px] md:h-full cursor-pointer relative overflow-hidden">
              {/* Giant Background Cartoon */}
              <div className="absolute -left-16 top-4 w-72 h-72 mix-blend-screen invert opacity-15 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
                <Image src="/card2.jpg" alt="Recognition" fill sizes="(max-width: 768px) 288px, 288px" className="object-contain" />
              </div>
              
              <span className="absolute -bottom-2 right-0 text-[120px] font-display font-black text-white/5 leading-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-2">2</span>
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/5 flex items-center justify-center backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 relative z-10">
                <Award className="w-5 h-5 text-[#34D399]" />
              </div>
              <div className="mt-auto relative z-10 w-[260px]">
                <span className="text-[#34D399] text-[10px] font-mono font-bold uppercase tracking-widest block mb-2 opacity-0 -translate-y-4 transition-all duration-500 delay-100 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:hidden block">Step 02</span>
                <h4 className="font-display font-black text-white text-2xl md:text-3xl uppercase leading-none mb-3 whitespace-normal overflow-visible">Rule Your<br/>Streets</h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-150">Stop grinding in secret. Your sweat now paints the map. Claim your neighborhood.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flow-step group w-[85vw] sm:w-[320px] md:w-auto flex-shrink-0 snap-center md:flex-1 md:hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-gradient-to-tr from-[#16A34A] to-[#22c55e] border border-white/20 rounded-[32px] p-8 flex flex-col justify-between text-left shadow-xl h-[300px] md:h-full cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay" />
              
              {/* Giant Background Cartoon */}
              <div className="absolute -left-16 top-4 w-72 h-72 mix-blend-multiply opacity-20 transition-transform duration-700 group-hover:scale-110 pointer-events-none grayscale">
                <Image src="/card3.jpg" alt="Progress" fill sizes="(max-width: 768px) 288px, 288px" className="object-contain" />
              </div>
              
              <span className="absolute -bottom-2 right-0 text-[120px] font-display font-black text-black/10 leading-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-2">3</span>
              <div className="w-12 h-12 rounded-full bg-white/20 border border-white/10 flex items-center justify-center backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 relative z-10">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="mt-auto relative z-10 text-white w-[260px]">
                <span className="text-white/80 text-[10px] font-mono font-bold uppercase tracking-widest block mb-2 opacity-0 -translate-y-4 transition-all duration-500 delay-100 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:hidden block">Step 03</span>
                <h4 className="font-display font-black text-white text-2xl md:text-3xl uppercase leading-none mb-3 whitespace-normal overflow-visible">Level Up<br/>Daily</h4>
                <p className="text-white/90 text-xs md:text-sm leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-150">Build unbreakable habits, hit daily streaks, and secure your spot on local leaderboards.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flow-step group w-[85vw] sm:w-[320px] md:w-auto flex-shrink-0 snap-center md:flex-1 md:hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-white border border-gray-200/80 rounded-[32px] p-8 flex flex-col justify-between text-left shadow-[0_8px_30px_rgba(0,0,0,0.02)] md:shadow-none hover:shadow-[0_20px_60px_rgba(22,163,74,0.06)] relative overflow-hidden h-[300px] md:h-full cursor-pointer">
              {/* Giant Background Cartoon */}
              <div className="absolute -left-16 top-4 w-72 h-72 mix-blend-multiply opacity-15 transition-transform duration-700 group-hover:scale-110 pointer-events-none">
                <Image src="/card4.jpg" alt="Community" fill sizes="(max-width: 768px) 288px, 288px" className="object-contain" />
              </div>
              
              <span className="absolute -bottom-2 right-0 text-[120px] font-display font-black text-gray-100 leading-none select-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-2">4</span>
              <div className="w-12 h-12 rounded-full bg-[#16A34A]/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 relative z-10">
                <Users className="w-5 h-5 text-[#16A34A]" />
              </div>
              <div className="mt-auto relative z-10 w-[260px]">
                <span className="text-[#16A34A] text-[10px] font-mono font-bold uppercase tracking-widest block mb-2 opacity-0 -translate-y-4 transition-all duration-500 delay-100 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:hidden block">Step 04</span>
                <h4 className="font-display font-black text-[#1F2937] text-2xl md:text-3xl uppercase leading-none mb-3 whitespace-normal overflow-visible">Build Your<br/>Squad</h4>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-150">You're never running alone. Watch your local streets glow as your squad's energy builds.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
