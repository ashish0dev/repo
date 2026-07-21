"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const QUESTIONS = [
  {
    id: 1,
    question: "How do you usually track your fitness activities?",
    options: [
      "Using a fitness app (e.g., Strava, Nike Run Club)",
      "Using a smartwatch (Apple Watch, Garmin, Fitbit, etc.)",
      "I used to track them, but not anymore",
      "I don't track my activities"
    ]
  },
  {
    id: 2,
    question: "What is the biggest challenge that prevents you from staying consistent with your workouts?",
    options: [
      "Working out alone feels boring",
      "Fitness tracking apps feel too competitive or overwhelming",
      "I'm concerned about privacy when sharing my activities",
      "Lack of time or motivation"
    ]
  },
  {
    id: 3,
    question: "How comfortable are you with sharing your fitness activities?",
    options: [
      "Only if I have full control over who can see them",
      "I'm comfortable sharing with friends or followers",
      "I'm comfortable sharing publicly",
      "I prefer to keep all my activities private"
    ]
  },
  {
    id: 4,
    question: "Which of the following would motivate you the most to stay consistent with your fitness journey?",
    options: [
      "Tracking my personal goals and progress",
      "Competing with friends and climbing leaderboards",
      "Earning rewards and exclusive offers from local businesses",
      "Joining fun fitness challenges and community events"
    ]
  },
  {
    id: 5,
    question: "If a new fitness app made staying active feel more fun, social, and rewarding, would you consider switching?",
    options: [
      "Yes, I'd switch",
      "I'd try it alongside my current app",
      "Maybe, depending on the features",
      "No, I'm happy with my current app"
    ]
  }
];

export default function ValidationSurvey() {
  const container = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#survey") {
      const timer = setTimeout(() => {
        container.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  useGSAP(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      gsap.set(".survey-box", { opacity: 1, y: 0 });
      return;
    }

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

  const handleSelect = async (option: string) => {
    const updated = { ...answers, [QUESTIONS[currentIdx].id]: option };
    setAnswers(updated);

    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCompleted(true);
      try {
        localStorage.setItem("revo_validation_survey", JSON.stringify(updated));
      } catch {
        // localStorage full/unavailable
      }

      // Send responses to the API route to save in CSV/Google Sheet
      try {
        await fetch("/api/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: updated }),
        });
      } catch (err) {
        console.error("Failed to submit survey to server:", err);
      }
    }
  };

  return (
    <section
      id="survey"
      ref={container}
      className="w-full relative bg-[#09140D] text-white py-20 lg:py-24 px-5 sm:px-6 overflow-hidden flex items-center min-h-[100dvh] border-y border-white/10"
    >
      {/* Background Radial Glow & Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#16A34A 1px, transparent 1px), linear-gradient(90deg, #16A34A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#16A34A] rounded-full blur-[180px] opacity-15 pointer-events-none" />

      {/* Silhouette Watermark */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-25">
        <div className="relative w-full max-w-[850px] aspect-square">
          <Image
            src="/real-transparent-runner.png"
            alt="Athlete Runner Silhouette"
            fill
            sizes="(max-width: 1024px) 100vw, 850px"
            className="object-contain object-bottom lg:object-right-bottom filter invert brightness-200"
          />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">

        {/* Left Column: Clear Senior UI/UX Narrative */}
        <div className="flex flex-col items-start text-left lg:col-span-6 lg:pr-6 z-10 relative">
          <h2 className="font-display font-black text-white leading-[0.9] tracking-tighter uppercase mb-6 text-[3.2rem] sm:text-6xl lg:text-[5.2rem]">
            HELP BUILD<br />THE REVO<br /><span className="bg-gradient-to-r from-[#22C55E] via-[#4ADE80] to-[#86EFAC] bg-clip-text text-transparent">EXPERIENCE.</span>
          </h2>

          <p className="text-base sm:text-lg font-light text-gray-300 leading-relaxed max-w-md">
            Tell us how you move, what holds you back, and how you track your routine. Your feedback directly shapes our launch features & neighborhood priority queue.
          </p>
        </div>

        {/* Right Column: Interactive Console Card */}
        <div className="w-full mx-auto max-w-md lg:max-w-xl lg:ml-auto survey-box bg-white rounded-[28px] lg:rounded-[36px] p-6 sm:p-9 shadow-[0_25px_70px_rgba(0,0,0,0.5)] relative overflow-hidden text-left flex flex-col justify-between border border-white/20 lg:col-span-6">

          {!completed ? (
            <div key={currentIdx} className="survey-content-card flex-1 flex flex-col animate-fade-in justify-center">

              {/* 5-Segmented Bar Progress UX */}
              <div className="grid grid-cols-5 gap-1.5 mb-6">
                {QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx <= currentIdx ? "bg-[#16A34A]" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Question Header */}
              <div className="flex justify-end items-center text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-4 text-gray-400">
                <span>Question {currentIdx + 1} of {QUESTIONS.length}</span>
              </div>

              {/* Question Text */}
              <h3 className="font-sans font-black text-[#1F2937] text-xl sm:text-2xl leading-snug mb-6">
                {QUESTIONS[currentIdx].question}
              </h3>

              {/* Options UX */}
              <div className="flex flex-col gap-3">
                {QUESTIONS[currentIdx].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(option)}
                    className="w-full text-left bg-gray-50/80 border border-gray-200/80 hover:border-[#16A34A] hover:bg-[#09140D] px-4 py-3.5 rounded-2xl transition-all duration-200 text-xs sm:text-sm font-bold text-gray-800 hover:text-white flex items-center justify-between group/opt cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3.5 pr-2">
                      <span className="w-7 h-7 rounded-xl bg-gray-200/80 group-hover/opt:bg-[#16A34A] text-gray-700 group-hover/opt:text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0 transition-colors">
                        0{index + 1}
                      </span>
                      <span className="transition-colors leading-snug">{option}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover/opt:text-[#22C55E] group-hover/opt:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8 px-4 space-y-5 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/20 flex items-center justify-center mb-1 shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#16A34A]" />
              </div>
              <div>
                <span className="text-[10px] text-[#16A34A] font-mono font-bold tracking-[0.25em] uppercase bg-[#16A34A]/10 px-4 py-1.5 rounded-full border border-[#16A34A]/20">
                  RESPONSES RECORDED
                </span>
                <h3 className="font-display font-black text-[#1F2937] text-3xl sm:text-4xl uppercase tracking-tight mt-4">
                  THANK YOU FOR<br />BUILDING REVO.
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 max-w-sm leading-relaxed font-sans">
                Your feedback is locked in and will directly shape our launch features. Now, claim your unique founding handle and join the waitlist!
              </p>
              <div className="pt-2 w-full">
                <a 
                  href="#waitlist"
                  className="w-full inline-flex items-center justify-center bg-[#16A34A] hover:bg-[#15803D] text-white font-sans font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-2xl transition duration-200 cursor-pointer shadow-lg active:scale-[0.98]"
                >
                  Join Waitlist & Claim Handle
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
