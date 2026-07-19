"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sparkles, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const QUESTIONS = [
  {
    id: 1,
    question: "Aap apna walk ya run track kaise karte ho aaj kal?",
    options: [
      "Strava ya Nike Run Club (NRC)",
      "Smartwatch (Apple, Garmin, FitBit)",
      "Koi tracking nahi, just normal walk/run",
      "Pehle karta tha, ab chhod diya (Lapsed)"
    ]
  },
  {
    id: 2,
    question: "Sabse bada problem kya hai consistent rehne mein?",
    options: [
      "Akele bhagna boring lagta hai",
      "Tracking apps bahut serious/pressure wale hain",
      "Safety aur route privacy ka tension",
      "Time ki kami ya motivation nahi hai"
    ]
  },
  {
    id: 3,
    question: "Agar exact route private rahe, toh kya apni activity share karoge?",
    options: [
      "Haan, privacy-first hona bahot zaruri hai",
      "Shayad, depend karta hai kon dekh raha hai",
      "Mujhe farq nahi padta, bindass share karunga",
      "Nahi, main 100% private hi rakhta hu"
    ]
  },
  {
    id: 4,
    question: "Personal stats ke alawa kya cheez zyada motivate karegi?",
    options: [
      "Mere neighborhood ka heatmap glow hote dekhna",
      "Local café se free coffee / discounts jeetna",
      "Leaderboards par apne doston ko harana",
      "Sirf khud ka personal discipline"
    ]
  },
  {
    id: 5,
    question: "Kya aap apna existing app (Strava/Health) sync karoge Revo ke sath?",
    options: [
      "Haan, background mein sync hona best hai",
      "Nahi, mujhe ek alag hi naya app chahiye",
      "Agar mere dost bhi sync karenge toh haan",
      "Pehle app banne do, phir sochunga!"
    ]
  }
];

export default function ValidationSurvey() {
  const container = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      ".survey-box",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 95%",
          toggleActions: "play none none none",
        }
      }
    );
  }, { scope: container });

  const handleSelect = (option: string) => {
    const updated = { ...answers, [QUESTIONS[currentIdx].id]: option };
    setAnswers(updated);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCompleted(true);
      try {
        localStorage.setItem("revo_validation_survey", JSON.stringify(updated));
      } catch {}
    }
  };

  const progressPercent = ((currentIdx) / QUESTIONS.length) * 100;
  const completedPercent = completed ? 100 : progressPercent;

  return (
    <section
      ref={container}
      className="w-full relative bg-[#16A34A] py-20 lg:py-12 px-5 sm:px-6 overflow-hidden flex items-center min-h-[100dvh] lg:h-[100dvh]"
    >
      {/* Massive Black Silhouette (True Transparent PNG) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <div className="relative w-full max-w-[900px] aspect-square opacity-60">
          <Image 
            src="/real-transparent-runner.png" 
            alt="Athlete Runner Silhouette" 
            fill 
            className="object-contain object-bottom lg:object-right-bottom drop-shadow-2xl"
          />
        </div>
        {/* Gradients to add subtle depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#16A34A] via-[#16A34A]/20 to-transparent lg:w-[40%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16A34A] via-transparent to-transparent opacity-30" />
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Bold Typography */}
        {/* Left Column: Bold Typography */}
        <div className="flex flex-col items-start text-left drop-shadow-xl lg:col-span-6 lg:pr-8 z-10 relative">


          <h2 className="font-display font-black text-white leading-[0.85] tracking-tighter uppercase mb-6 lg:mb-8 text-[4rem] sm:text-7xl lg:text-[5.5rem]">
            START<br/>THE<br/><span className="text-black">REVO.</span>
          </h2>
          
          <p className="text-base sm:text-lg font-medium text-white/95 leading-relaxed max-w-md drop-shadow-md">
            Revo is dropping in select neighborhoods first. Tell us how you move, and we'll prioritize your area for early access.
          </p>
          <div className="mt-6 lg:mt-8 flex items-center justify-start gap-3">
            <div className="h-px w-8 bg-black/30"></div>
            <p className="text-sm lg:text-base font-bold text-black uppercase tracking-widest">
              5 Questions • 60 Seconds
            </p>
          </div>
        </div>

        {/* Right Column: Clean Compact White Card */}
        <div className="w-full mx-auto max-w-md lg:max-w-lg lg:ml-auto survey-box bg-white/95 backdrop-blur-2xl rounded-[24px] lg:rounded-[32px] p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden text-left flex flex-col justify-between border border-white/40 lg:col-span-6">
          
          {/* Sleek Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-black/10">
            <div 
              className="h-full bg-black transition-all duration-700 ease-out"
              style={{ width: `${completedPercent}%` }}
            />
          </div>

          {!completed ? (
            <div key={currentIdx} className="survey-content-card flex-1 flex flex-col animate-fade-in justify-center mt-4">
              
              <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-6">
                <span className="text-gray-400">Question {currentIdx + 1} of {QUESTIONS.length}</span>
                <span className="text-white bg-black px-3 py-1 rounded-full shadow-md">{Math.round(progressPercent)}% Done</span>
              </div>

              <h3 className="font-sans font-black text-black text-2xl sm:text-3xl leading-snug mb-8">
                {QUESTIONS[currentIdx].question}
              </h3>

              <div className="flex flex-col gap-3">
                {QUESTIONS[currentIdx].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="w-full text-left bg-gray-50 border border-gray-100 hover:border-black hover:bg-black px-5 py-4 rounded-xl transition-all duration-300 text-sm sm:text-base font-bold text-gray-700 hover:text-white flex justify-between items-center group/opt cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span className="transition-colors pr-4">{option}</span>
                    <div className="w-6 h-6 rounded-full bg-gray-200 group-hover/opt:bg-white flex items-center justify-center transition-colors flex-shrink-0">
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover/opt:text-black group-hover/opt:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))}
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 px-4 space-y-4 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-[#16A34A]/10 flex items-center justify-center mb-2 shadow-lg">
                <CheckCircle2 className="w-10 h-10 text-[#16A34A]" />
              </div>
              <div>
                <h3 className="font-display font-black text-black text-3xl sm:text-4xl uppercase tracking-tight">You're On The List!</h3>
                <p className="text-[10px] text-[#16A34A] font-mono font-bold tracking-[0.2em] uppercase mt-3 bg-[#16A34A]/10 inline-block px-4 py-1.5 rounded-full border border-[#16A34A]/20">
                  EARLY ACCESS SECURED
                </p>
              </div>
              <p className="text-sm sm:text-base text-gray-600 max-w-sm leading-relaxed font-sans mt-3">
                Thank you! You just helped us decide where to drop Revo first. Prepare to claim your streets and paint your city soon.
              </p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
