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
      // Set values immediately for mobile to bypass ScrollTrigger registration overhead
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

  const progressPercent = ((currentIdx) / QUESTIONS.length) * 100;
  const completedPercent = completed ? 100 : progressPercent;

  return (
    <section
      id="survey"
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
            sizes="(max-width: 1024px) 100vw, 900px"
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
            START<br />THE<br /><span className="text-black">REVO.</span>
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
                <h3 className="font-display font-black text-black text-3xl sm:text-4xl uppercase tracking-tight">Feedback Received!</h3>
                <p className="text-[10px] text-[#16A34A] font-mono font-bold tracking-[0.2em] uppercase mt-3 bg-[#16A34A]/10 inline-block px-4 py-1.5 rounded-full border border-[#16A34A]/20">
                  Survey Completed
                </p>
              </div>
              <p className="text-sm sm:text-base text-gray-600 max-w-sm leading-relaxed font-sans mt-3">
                Thank you! You just helped us decide where to drop Revo first. Now, claim your unique runner handle and secure your spot on the waitlist!
              </p>
              <div className="pt-2 w-full">
                <a 
                  href="#waitlist"
                  className="w-full inline-flex items-center justify-center bg-black hover:bg-neutral-800 text-white font-sans font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl transition duration-200 cursor-pointer shadow-lg active:scale-[0.98]"
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
