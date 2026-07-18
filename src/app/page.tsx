"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import WaitlistForm from "@/components/WaitlistForm";
import PhoneFrame from "@/components/PhoneFrame";
import { Flame, MapPin, Activity, Navigation, Users, Lock, Globe, Share2 } from "lucide-react";
import { WAITLIST_BASE_COUNT } from "@/lib/config";
import { track } from "@/lib/analytics";
import dynamic from "next/dynamic";

const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const ScarcityStrip = dynamic(() => import("@/components/ScarcityStrip"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const CityMap = dynamic(() => import("@/components/CityMap"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// ── DYNAMIC DATA STRUCTURES ──
const LEADERBOARD_DATA = [
  { name: "Kiran R.", days: 14, you: true },
  { name: "Anjali P.", days: 9, you: false },
  { name: "Vikram A.", days: 7, you: false },
  { name: "Meera M.", days: 5, you: false },
];

const LIVE_LEDGER = [
  { r: "Rohan S.", a: "claimed Hub Leader at", z: "Shivaji Park, Mumbai", s: "14d", t: "2m ago" },
  { r: "Neha P.", a: "completed riverfront loop", z: "Sabarmati, Ahmedabad", s: "9d", t: "15m ago" },
  { r: "Vikram A.", a: "extended streak at", z: "Lodhi Gardens, Delhi", s: "21d", t: "1h ago" },
  { r: "Priya M.", a: "created first mark at", z: "Eco Park, Kolkata", s: "1d", t: "2h ago" },
  { r: "Arjun K.", a: "secured top 3 ranking at", z: "Necklace Road, Hyderabad", s: "12d", t: "3h ago" },
  { r: "Ananya D.", a: "secured top 3 ranking at", z: "Salt Lake, Kolkata", s: "18d", t: "4h ago" },
  { r: "Kabir M.", a: "completed coastal path at", z: "Marine Drive, Kochi", s: "5d", t: "5h ago" },
];

const ROUTINES = {
  morning: {
    tag: "Morning Routine",
    title: "6am Movement.",
    cards: [
      { type: "text", time: "06:00 AM · Prep", title: "Wake Up\nThe City.", desc: "Open Revo and locate active loops near you. Before the heat rises and the streets crowd, plan your path." },
      { type: "image", time: "06:15 AM · Shivaji Park, Mumbai", desc: "A quiet mist hangs over the trails. You start your morning session and begin lighting up the city's live grid.", image: "/bengaluru_runner_sunrise.png" },
      { type: "image", time: "06:30 AM · Lodhi Gardens, Delhi", desc: "Moving past historic tomb trails. While the rest of the city sleeps, your active streak continues.", image: "/delhi_runner_morning.png" },
      { type: "text_dark", time: "07:00 AM · Effort", title: "Leave Your\nTrace.", desc: "Every step, pedal, and movement is captured, mapping your dynamic route live onto the active grid." },
      { type: "text_accent", time: "07:15 AM · Victory", title: "Claim The\nTerritory.", desc: "7 consecutive days on this loop. You are crowned the Hub Leader of Shivaji Park. Stand proud—until tomorrow." }
    ]
  },
  afternoon: {
    tag: "Mid-Day Routine",
    title: "1pm Recharge.",
    cards: [
      { type: "text", time: "01:00 PM · Prep", title: "Break The\nRoutine.", desc: "Step away from the screen. Open Revo to find a quick, active lunchtime loop in your neighborhood." },
      { type: "image", time: "01:15 PM · Marine Drive, Mumbai", desc: "Sea breeze and high sun. A brisk walk to clear your head and log active minutes on the coastal grid.", image: "/bengaluru_runner_sunrise.png" },
      { type: "image", time: "01:30 PM · Necklace Road, Hyderabad", desc: "A quick midday cycle. Join the lunch-hour rush and mark your presence on the active tracks.", image: "/delhi_runner_morning.png" },
      { type: "text_dark", time: "02:00 PM · Effort", title: "Claim Your\nMinutes.", desc: "Activity logged: 30m Active. Your lunch hour becomes a glowing dot of energy on the city map." },
      { type: "text_accent", time: "02:15 PM · Victory", title: "Beat The\nSlump.", desc: "Fresh focus achieved. Your active streak stays alive, holding your rank on the neighborhood board." }
    ]
  },
  evening: {
    tag: "Sunset Session",
    title: "6pm Heat.",
    cards: [
      { type: "text", time: "06:00 PM · Prep", title: "Join The\nRush.", desc: "As the sun sets, the city wakes up again. Locate the glowing hotspots for the evening group session." },
      { type: "image", time: "06:15 PM · Koregaon Park, Pune", desc: "Cool evening air. You join the pack, your collective trails lighting up the streets in a bright green glow.", image: "/bengaluru_runner_sunrise.png" },
      { type: "image", time: "06:30 PM · Marina Beach, Chennai", desc: "Moving along the coast as the lights turn on. The city grid comes alive with thousands of active movers.", image: "/delhi_runner_morning.png" },
      { type: "text_dark", time: "07:00 PM · Effort", title: "Light Up\nThe Grid.", desc: "Activity logged: Evening Run. Your movement helps push your neighborhood hub to the top of the city rankings." },
      { type: "text_accent", time: "07:15 PM · Victory", title: "Rule The\nSunset.", desc: "Defended your territory. You hold the crown on the evening loop. Rest up for tomorrow's battle." }
    ]
  },
  night: {
    tag: "Night Owls",
    title: "10pm Glow.",
    cards: [
      { type: "text", time: "10:00 PM · Prep", title: "Own The\nNight.", desc: "Quiet streets, cool air. Open Revo to check the late-night glowing loops in your neighborhood." },
      { type: "image", time: "10:15 PM · Salt Lake, Kolkata", desc: "Under the streetlights, you map a quiet walk. Every step glows in real-time on the dark map grid.", image: "/bengaluru_runner_sunrise.png" },
      { type: "image", time: "10:30 PM · Marine Drive, Kochi", desc: "A late-night sprint along the backwaters. While the city winds down, your active energy lights up the coast.", image: "/delhi_runner_morning.png" },
      { type: "text_dark", time: "11:00 PM · Effort", title: "Midnight\nMark.", desc: "Activity logged: Late Session. Your late-night efforts keep your streak alive and mark your turf." },
      { type: "text_accent", time: "11:15 PM · Victory", title: "Hold The\nLine.", desc: "Locked in. You secure your hub ranking overnight. The grid is yours until the sun rises." }
    ]
  }
};

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  
  // Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const heroMapRef = useRef<HTMLDivElement>(null);
  
  const showcaseRef = useRef<HTMLDivElement>(null);
  const phoneShowcaseRef = useRef<HTMLDivElement>(null);

  const galleryRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);

  // Dynamic time detection
  const [timePeriod, setTimePeriod] = React.useState<"morning" | "afternoon" | "evening" | "night">("morning");
  const [activeScreenIndex, setActiveScreenIndex] = React.useState(0);
  const [waitlistCount, setWaitlistCount] = React.useState(WAITLIST_BASE_COUNT);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setTimePeriod("morning");
    } else if (hour >= 12 && hour < 17) {
      setTimePeriod("afternoon");
    } else if (hour >= 17 && hour < 21) {
      setTimePeriod("evening");
    } else {
      setTimePeriod("night");
    }
  }, []);

  React.useEffect(() => {
    track("page_view");
    try {
      const raw = localStorage.getItem("revo_waitlist_signups");
      const signups = raw ? JSON.parse(raw) : [];
      setWaitlistCount(WAITLIST_BASE_COUNT + signups.length);
    } catch {
      // localStorage unavailable — keep the base count
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    setMounted(true);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-cycle mobile showcase screens every 2.0 seconds (resets dynamically on user manual tap)
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) return;
    const timer = setTimeout(() => {
      setActiveScreenIndex((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearTimeout(timer);
  }, [activeScreenIndex]);

  const activeRoutine = ROUTINES[timePeriod];

  useGSAP(() => {
    let mm = gsap.matchMedia(container);

    mm.add("(min-width: 1024px)", () => {
      /* ── SCENE 1: HERO — simple fade out ── */
      const tlHero = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=80%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Fade the entire hero content out as the user scrolls
      tlHero.to(".hero-content", {
        opacity: 0,
        y: -30,
        ease: "power2.in",
        duration: 1,
      }, 0);

      // Simultaneously darken the map so transition feels intentional
      tlHero.to(".hero-map-overlay", {
        opacity: 0.85,
        ease: "power2.in",
        duration: 1,
      }, 0);

      /* ── SCENE 2: APP SHOWCASE ── */
      const tlShowcase = gsap.timeline({
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // 1. Phone scales up slightly
      tlShowcase.fromTo(phoneShowcaseRef.current, { scale: 0.9, y: "5vh" }, { scale: 1, y: "0vh", duration: 1 }, 0);

      // 2. Connector lines draw out (Desktop only)
      const paths = gsap.utils.toArray(".connector-path");
      paths.forEach((path: any) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tlShowcase.to(path, { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" }, 0.2);
      });

      // 3. Tiny glowing endpoints appear
      tlShowcase.fromTo(".connector-dot", { opacity: 0, scale: 0 }, { opacity: 0.8, scale: 1, duration: 0.4, stagger: 0.1 }, 0.6);

      // 4. Cards fade in gracefully (Desktop only)
      tlShowcase.fromTo(".lg\\:block .showcase-card", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }, 0.4);

      // 5. Screen UI cycles continuously while scrolling
      const screens = gsap.utils.toArray(".showcase-screen");
      tlShowcase.to(screens[0] as Element, { opacity: 0, duration: 0.4 }, 0.5)
        .fromTo(screens[1] as Element, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "<")
        .to(screens[1] as Element, { opacity: 0, duration: 0.4 }, 1.5)
        .fromTo(screens[2] as Element, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "<")
        .to(screens[2] as Element, { opacity: 0, duration: 0.4 }, 2.5)
        .fromTo(screens[3] as Element, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "<");
    });

    /* ── SCENE 3: GALLERY ── */
    mm.add("(min-width: 1024px)", () => {
      gsap.to(".gallery-track", {
        xPercent: -65,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });
    });

    /* ── SCENE 5: LIVE LEDGER TEXT THEME SWITCH ── */
    ScrollTrigger.create({
      trigger: ledgerRef.current,
      start: "top 80px",
      end: "bottom 80px",
      onEnter: () => {
        gsap.to(".nav-brand-text", { color: "#FFFFFF", duration: 0.2 });
      },
      onLeave: () => {
        gsap.to(".nav-brand-text", { color: "#1F2937", duration: 0.2 });
      },
      onEnterBack: () => {
        gsap.to(".nav-brand-text", { color: "#FFFFFF", duration: 0.2 });
      },
      onLeaveBack: () => {
        gsap.to(".nav-brand-text", { color: "#1F2937", duration: 0.2 });
      }
    });

  }, { scope: container });

  return (
    <main ref={container} className="relative bg-[#FAFBFC] text-[#1F2937] overflow-x-hidden selection:bg-[#16A34A] selection:text-white">
      
      {/* ── NAV ────────────────────────────────────────────────────── */}
      <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-start">
          <div className="flex items-center gap-4">
            <Image src="/main-logo-transparent.png" alt="Revo Logo" width={24} height={24} priority style={{ height: "auto" }} />
            <span className="nav-brand-text font-sans font-bold tracking-[0.25em] uppercase text-base text-[#1F2937] transition-colors duration-200">Revo</span>
          </div>
        </div>
      </nav>

      {/* ── SCENE 1: THE HERO ─────────────────────────────────────── */}
      <section ref={heroRef} className="min-h-screen lg:h-screen w-full relative flex items-center justify-center overflow-y-auto bg-[#FAFBFC] py-20 lg:py-0">
        {/* Map background */}
        <div className="absolute inset-0 w-full h-full">
          {mounted && <CityMap intensity={0.75} className="w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFBFC] via-transparent to-transparent pointer-events-none" />
          {/* Radial mask to fade map details directly behind the text for maximum legibility */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,251,252,0.85)_15%,rgba(250,251,252,0.3)_60%,transparent_100%)] pointer-events-none" />
          {/* Darkening overlay that animates in during scroll */}
          <div className="hero-map-overlay absolute inset-0 bg-[#FAFBFC] opacity-0 pointer-events-none" />
        </div>

        <div className="hero-content relative z-10 flex flex-col items-center justify-center text-center px-6 mt-16 lg:mt-6 pointer-events-auto">
          
          {/* Active Grid Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16A34A]/10 border border-[#16A34A]/25 text-[#16A34A] text-[9.5px] font-black uppercase tracking-widest mb-6 lg:mb-3 animate-pulse">
            <Globe className="w-3.5 h-3.5" /> India's Live Active Grid
          </span>
          
          <h1 className="font-display font-black text-[#1F2937] leading-[0.85] tracking-tighter" style={{ fontSize: "clamp(64px, 10vw, 150px)" }}>
            Leave your<br />
            <span className="italic font-display font-normal text-[#16A34A]">mark.</span>
          </h1>
          
          <p className="mt-8 lg:mt-4 text-lg font-light max-w-sm text-[#4B5563] text-balance">
            Your walks, runs, rides, and daily workouts map live, evolving routes on your city's active grid.
          </p>

          <div id="hero-waitlist" className="mt-10 lg:mt-6 w-full max-w-sm scroll-mt-32">
            <WaitlistForm />
          </div>

          <p className="mt-5 flex items-center gap-1.5 text-[11px] font-bold text-gray-500">
            <Users className="w-3.5 h-3.5 text-[#16A34A]" />
            Join <span className="tabular-nums text-[#1F2937]">{waitlistCount.toLocaleString()}+</span> runners already on the list
          </p>
        </div>
      </section>

      {/* ── SCENE 2: APP SHOWCASE (APPLE STYLE) ───────────────────── */}
      <section ref={showcaseRef} className="w-full relative bg-[#FAFBFC] overflow-hidden flex flex-col justify-start lg:justify-between py-6 lg:py-10 lg:h-screen">
        {/* Subtle Coordinate Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1F2937 1px, transparent 1px), linear-gradient(90deg, #1F2937 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Header — in normal flex flow, never overlaps phone */}
        <div className="relative w-full px-6 flex flex-col items-center text-center z-40 pointer-events-none shrink-0">
          <h2 className="font-display font-black leading-[0.88] text-[#1F2937] tracking-tight" style={{ fontSize: "clamp(22px, 3.5vw, 64px)" }}>
            Map your motion.
          </h2>
        </div>

        {/* Bottom gradient — clips the phone cleanly so it doesn't bleed into the next section */}
        <div className="absolute bottom-0 left-0 w-full h-[12%] bg-gradient-to-t from-[#FAFBFC] to-transparent z-30 pointer-events-none" />

        {/* Center Canvas — dynamically fills the remaining space */}
        <div className="relative w-full lg:flex-1 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center z-20 min-h-0 py-4 lg:py-0">
          
          {/* SVG Connectors Canvas (Desktop Only) */}
          <svg viewBox="0 0 1200 700" className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow-dot" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connecting Lines (Phone Center is approx (600, 350)) */}
            <g stroke="#16A34A" strokeWidth="1" strokeOpacity="0.25" fill="none">
              <path className="connector-path" d="M 600,350 Q 300,180 250,180" />
              <path className="connector-path" d="M 600,350 Q 350,480 220,480" />
              <path className="connector-path" d="M 600,350 Q 800,160 920,160" />
              <path className="connector-path" d="M 600,350 Q 900,350 950,350" />
              <path className="connector-path" d="M 600,350 Q 850,560 900,560" />
            </g>

            {/* Endpoints on the cards */}
            <g fill="#16A34A" filter="url(#glow-dot)" className="hidden lg:block">
              <circle className="connector-dot" cx="250" cy="180" r="2.5" />
              <circle className="connector-dot" cx="220" cy="480" r="2.5" />
              <circle className="connector-dot" cx="920" cy="160" r="2.5" />
              <circle className="connector-dot" cx="950" cy="350" r="2.5" />
              <circle className="connector-dot" cx="900" cy="560" r="2.5" />
            </g>
          </svg>

          {/* Desktop Floating Cards */}
          <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto hidden lg:block pointer-events-none">
            {/* Top Left */}
            <div className="showcase-card absolute" style={{ top: 'calc(50% - 170px)', left: 'calc(50% - 470px)' }}>
              <div className="bg-white border border-gray-200 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-5 py-4 flex items-center gap-4 pointer-events-auto">
                <div className="w-9 h-9 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#16A34A]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1F2937] leading-none mb-1.5">Hub Domination</p>
                  <p className="text-[10px] text-gray-400 font-medium tracking-wide">Conquer local loops</p>
                </div>
              </div>
            </div>
            {/* Bottom Left */}
            <div className="showcase-card absolute" style={{ top: 'calc(50% + 130px)', left: 'calc(50% - 500px)' }}>
              <div className="bg-white border border-gray-200 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-5 py-4 flex items-center gap-4 pointer-events-auto">
                <div className="w-9 h-9 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4 text-[#16A34A]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1F2937] leading-none mb-1.5">Cooperative Glow</p>
                  <p className="text-[10px] text-gray-400 font-medium tracking-wide">Merged trails glow brighter</p>
                </div>
              </div>
            </div>
            {/* Top Right */}
            <div className="showcase-card absolute" style={{ top: 'calc(50% - 190px)', left: 'calc(50% + 320px)' }}>
              <div className="bg-white border border-gray-200 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-5 py-4 flex items-center gap-4 pointer-events-auto">
                <div className="w-9 h-9 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-[#16A34A]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1F2937] leading-none mb-1.5">Live Co-Presence</p>
                  <p className="text-[10px] text-gray-400 font-medium tracking-wide">See active movers real-time</p>
                </div>
              </div>
            </div>
            {/* Middle Right */}
            <div className="showcase-card absolute" style={{ top: 'calc(50% - 0px)', left: 'calc(50% + 350px)' }}>
              <div className="bg-white border border-gray-200 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-5 py-4 flex items-center gap-4 pointer-events-auto">
                <div className="w-9 h-9 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4 text-[#16A34A]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1F2937] leading-none mb-1.5">Territory Battles</p>
                  <p className="text-[10px] text-gray-400 font-medium tracking-wide">Defend your home turf</p>
                </div>
              </div>
            </div>
            {/* Bottom Right */}
            <div className="showcase-card absolute" style={{ top: 'calc(50% + 210px)', left: 'calc(50% + 300px)' }}>
              <div className="bg-white border border-gray-200 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] px-5 py-4 flex items-center gap-4 pointer-events-auto">
                <div className="w-9 h-9 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                  <Navigation className="w-4 h-4 text-[#16A34A]" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1F2937] leading-none mb-1.5">Dynamic Grid Impact</p>
                  <p className="text-[10px] text-gray-400 font-medium tracking-wide">Shape the city map color</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Hero Phone */}
          <div className="flex flex-col items-center w-full lg:w-auto relative z-30 max-h-full">
            <div ref={phoneShowcaseRef} className="w-[85vw] max-w-[340px] h-auto max-h-full lg:w-auto lg:h-[72vh] lg:max-h-[740px] aspect-[1/2.05] relative shrink-0">
              <PhoneFrame className="w-full h-full relative group">
                
                {/* Subtle Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 z-50 pointer-events-none mix-blend-overlay" />
                
                {/* Emerald Glow behind device */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#16A34A] rounded-[60px] blur-[80px] opacity-[0.12] -z-10 pointer-events-none" />

                {/* Screen 1: Map */}
                <div className={`showcase-screen absolute inset-0 bg-[#FAFBFC] lg:transition-opacity lg:duration-300 ${activeScreenIndex === 0 ? "block lg:block lg:opacity-100" : "hidden lg:block lg:opacity-0"}`}>
                  {(!isMobile || activeScreenIndex === 0) && (
                    <>
                      <CityMap intensity={1} />
                      
                      {/* Status Bar */}
                      <div className="absolute top-[3%] left-0 right-0 h-9 flex items-center justify-between px-6 z-40 text-gray-800 font-sans font-bold text-[8.5px] pointer-events-none">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-1.5 border border-gray-800 rounded-sm relative flex items-center px-0.5"><span className="w-full h-full bg-gray-800 rounded-2xs" /></span>
                        </div>
                      </div>

                      {/* App Search Bar overlay */}
                      <div className="absolute top-[12%] left-[5%] right-[5%] bg-white/95 backdrop-blur rounded-xl px-3 py-2.5 border border-gray-200/50 flex items-center gap-2 shadow-md shadow-black/5 z-30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse shrink-0" />
                        <span className="text-[8.5px] font-bold text-gray-400">Search active hubs in Mumbai...</span>
                      </div>

                      {/* Active Hub Card overlay */}
                      <div className="absolute bottom-[18%] left-[5%] right-[5%] bg-white rounded-2xl p-3.5 border border-gray-200/50 shadow-xl shadow-black/5 z-30 flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[11px] font-black text-[#1F2937]">Shivaji Park Hub</p>
                            <p className="text-[8px] text-[#16A34A] font-mono font-bold uppercase tracking-wider">342 active now</p>
                          </div>
                          <span className="bg-[#16A34A]/10 text-[#16A34A] text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md">Rank #1</span>
                        </div>
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                          <div className="w-[78%] h-full bg-[#16A34A] rounded-full" />
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[7.5px] text-gray-400 font-medium">Daily Target: 5.0 km</span>
                          <button className="bg-[#16A34A] hover:bg-[#15803d] text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-lg shadow-sm">Join Run</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Screen 2: Streak */}
                <div className={`showcase-screen absolute inset-0 bg-[#FAFBFC] lg:transition-opacity lg:duration-300 flex flex-col px-5 pt-[14%] pb-[18%] text-[#1F2937] ${activeScreenIndex === 1 ? "block lg:block lg:opacity-100" : "hidden lg:block lg:opacity-0"}`}>
                  {(!isMobile || activeScreenIndex === 1) && (
                    <>
                      {/* Status Bar */}
                      <div className="absolute top-[3%] left-0 right-0 h-9 flex items-center justify-between px-6 z-40 text-gray-800 font-sans font-bold text-[8.5px] pointer-events-none">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-1.5 border border-gray-800 rounded-sm relative flex items-center px-0.5"><span className="w-full h-full bg-gray-800 rounded-2xs" /></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1.5">
                          <Flame className="w-4 h-4 text-[#16A34A]" />
                          <span className="text-[#16A34A] text-[9px] font-bold uppercase tracking-widest">Active Streak</span>
                        </div>
                        <span className="text-[8px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">July 2026</span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center gap-5">
                        <div className="flex items-baseline justify-center">
                          <p className="text-[#1F2937] font-black leading-none" style={{ fontSize: "64px" }}>14</p>
                          <span className="text-[12px] font-black text-[#16A34A] ml-1">DAYS</span>
                        </div>
                        
                        <div className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between shadow-sm">
                          <div className="text-center">
                            <p className="text-[11px] font-black text-[#1F2937]">84.2</p>
                            <p className="text-[6.5px] text-gray-400 font-bold uppercase">Distance (KM)</p>
                          </div>
                          <div className="border-l border-gray-100" />
                          <div className="text-center">
                            <p className="text-[11px] font-black text-[#1F2937]">5:12</p>
                            <p className="text-[6.5px] text-gray-400 font-bold uppercase">Avg Pace</p>
                          </div>
                          <div className="border-l border-gray-100" />
                          <div className="text-center">
                            <p className="text-[11px] font-black text-[#1F2937]">7.8k</p>
                            <p className="text-[6.5px] text-gray-400 font-bold uppercase">Avg Steps</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[8px] text-gray-400 font-bold uppercase">Consistency Grid</span>
                            <span className="text-[8px] text-[#16A34A] font-bold">14/21 days active</span>
                          </div>
                          <div className="grid grid-cols-7 gap-1.5">
                            {[...Array(14)].map((_, i) => <div key={i} className="aspect-square rounded bg-[#16A34A] shadow-sm shadow-[#16A34A]/20" />)}
                            {[...Array(7)].map((_, i) => <div key={i} className="aspect-square rounded border border-gray-200 bg-gray-100/50" />)}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Screen 3: Leaderboard */}
                <div className={`showcase-screen absolute inset-0 bg-[#FAFBFC] lg:transition-opacity lg:duration-300 flex flex-col px-5 pt-[14%] pb-[18%] text-[#1F2937] ${activeScreenIndex === 2 ? "block lg:block lg:opacity-100" : "hidden lg:block lg:opacity-0"}`}>
                  {(!isMobile || activeScreenIndex === 2) && (
                    <>
                      {/* Status Bar */}
                      <div className="absolute top-[3%] left-0 right-0 h-9 flex items-center justify-between px-6 z-40 text-gray-800 font-sans font-bold text-[8.5px] pointer-events-none">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-1.5 border border-gray-800 rounded-sm relative flex items-center px-0.5"><span className="w-full h-full bg-gray-800 rounded-2xs" /></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#16A34A]" />
                          <span className="text-[#16A34A] text-[9px] font-bold uppercase tracking-widest">Shivaji Park</span>
                        </div>
                        <span className="text-[8px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">Live Rank</span>
                      </div>

                      <div className="flex-1 flex flex-col pt-3 justify-center">
                        <p className="text-[#1F2937] font-black text-lg uppercase leading-none mb-1">Hub Leaderboard</p>
                        <p className="text-gray-400 text-[8px] mb-3">Updated every 5 minutes</p>

                        <div className="space-y-2">
                          {LEADERBOARD_DATA.slice(0,3).map((r, i) => (
                            <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${r.you ? "bg-[#16A34A]/10 border border-[#16A34A]/20 shadow-sm" : "bg-white border border-gray-100 shadow-sm"}`}>
                              <div className="flex items-center gap-2.5">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black ${
                                  r.you ? "bg-[#16A34A] text-white" : i === 0 ? "bg-amber-100 text-amber-700" : i === 1 ? "bg-slate-100 text-slate-700" : "bg-orange-100 text-orange-700"
                                }`}>
                                  {r.name.split(" ").map(w => w[0]).join("")}
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-gray-800 leading-tight">{r.name}</p>
                                  <p className="text-[7.5px] text-gray-400 font-medium">Rank #{i + 1}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-black text-gray-800 leading-tight">{r.days}d</p>
                                <p className="text-[7px] text-[#16A34A] font-bold">STREAK</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Screen 4: Shareable Card */}
                <div className={`showcase-screen absolute inset-0 bg-[#FAFBFC] lg:transition-opacity lg:duration-300 flex flex-col px-5 pt-[14%] pb-[18%] text-[#1F2937] ${activeScreenIndex === 3 ? "block lg:block lg:opacity-100" : "hidden lg:block lg:opacity-0"}`}>
                  {(!isMobile || activeScreenIndex === 3) && (
                    <>
                      {/* Status Bar */}
                      <div className="absolute top-[3%] left-0 right-0 h-9 flex items-center justify-between px-6 z-40 text-gray-800 font-sans font-bold text-[8.5px] pointer-events-none">
                        <span>9:41</span>
                        <div className="flex items-center gap-1">
                          <span className="w-2.5 h-1.5 border border-gray-800 rounded-sm relative flex items-center px-0.5"><span className="w-full h-full bg-gray-800 rounded-2xs" /></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1.5">
                          <Share2 className="w-4 h-4 text-[#16A34A]" />
                          <span className="text-[#16A34A] text-[9px] font-bold uppercase tracking-widest">Weekly Recap</span>
                        </div>
                        <span className="text-[8px] font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-md">Shareable</span>
                      </div>

                      <div className="flex-1 flex flex-col justify-center">
                        <div className="bg-gradient-to-br from-[#16A34A] to-[#0f7a35] rounded-2xl p-4 shadow-lg text-white flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Shivaji Park Hub</p>
                              <p className="text-[15px] font-black leading-tight">7-Day Recap</p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
                              <Flame className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white/10 rounded-lg p-2 text-center">
                              <p className="text-[13px] font-black leading-none">32.4</p>
                              <p className="text-[6px] font-bold uppercase opacity-70 mt-1">KM Moved</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-2 text-center">
                              <p className="text-[13px] font-black leading-none">7</p>
                              <p className="text-[6px] font-bold uppercase opacity-70 mt-1">Day Streak</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-2 text-center">
                              <p className="text-[13px] font-black leading-none">#1</p>
                              <p className="text-[6px] font-bold uppercase opacity-70 mt-1">Local Rank</p>
                            </div>
                          </div>
                          <button className="w-full bg-white text-[#16A34A] text-[8.5px] font-black uppercase tracking-widest py-2 rounded-lg flex items-center justify-center gap-1.5">
                            <Share2 className="w-3 h-3" /> Share Your Card
                          </button>
                        </div>
                        <p className="text-[8.5px] text-gray-400 mt-3 text-center leading-relaxed px-2">Auto-generated after every session. Share your recap on WhatsApp or Instagram.</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Common Tab Bar (Visible on all screens) */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/90 backdrop-blur border-t border-gray-100 flex items-center justify-around px-2 z-40">
                  <div className="flex flex-col items-center gap-0.5 cursor-pointer">
                    <Navigation className="w-4 h-4 text-[#16A34A]" />
                    <span className="text-[7px] font-bold text-[#16A34A] uppercase tracking-wide">Map</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 cursor-pointer opacity-40">
                    <Flame className="w-4 h-4 text-[#1F2937]" />
                    <span className="text-[7px] font-bold text-[#1F2937] uppercase tracking-wide">Streak</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 cursor-pointer opacity-40">
                    <MapPin className="w-4 h-4 text-[#1F2937]" />
                    <span className="text-[7px] font-bold text-[#1F2937] uppercase tracking-wide">Hubs</span>
                  </div>
                  <div className="flex flex-col items-center gap-0.5 cursor-pointer opacity-40">
                    <Users className="w-4 h-4 text-[#1F2937]" />
                    <span className="text-[7px] font-bold text-[#1F2937] uppercase tracking-wide">Profile</span>
                  </div>
                </div>

              </PhoneFrame>
            </div>

            {/* Mobile Interactive Segment Tabs (Visible only on mobile/tablet) */}
            <div className="flex justify-between items-center bg-gray-100/80 backdrop-blur border border-gray-200/50 rounded-2xl p-1.5 w-full max-w-[340px] mt-6 lg:hidden z-30 shadow-sm">
              <button 
                onClick={() => setActiveScreenIndex(0)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-300 ${activeScreenIndex === 0 ? "bg-white text-[#16A34A] shadow-md shadow-black/5" : "text-gray-500 hover:text-gray-800"}`}
              >
                <Navigation className={`w-4 h-4 ${activeScreenIndex === 0 ? "text-[#16A34A]" : "text-gray-400"}`} />
                <span className="text-[9px] font-bold uppercase tracking-wide">Live Map</span>
              </button>
              <button 
                onClick={() => setActiveScreenIndex(1)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-300 ${activeScreenIndex === 1 ? "bg-white text-[#16A34A] shadow-md shadow-black/5" : "text-gray-500 hover:text-gray-800"}`}
              >
                <Flame className={`w-4 h-4 ${activeScreenIndex === 1 ? "text-[#16A34A]" : "text-gray-400"}`} />
                <span className="text-[9px] font-bold uppercase tracking-wide">My Streak</span>
              </button>
              <button
                onClick={() => setActiveScreenIndex(2)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-300 ${activeScreenIndex === 2 ? "bg-white text-[#16A34A] shadow-md shadow-black/5" : "text-gray-500 hover:text-gray-800"}`}
              >
                <MapPin className={`w-4 h-4 ${activeScreenIndex === 2 ? "text-[#16A34A]" : "text-gray-400"}`} />
                <span className="text-[9px] font-bold uppercase tracking-wide">Rankings</span>
              </button>
              <button
                onClick={() => setActiveScreenIndex(3)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-all duration-300 ${activeScreenIndex === 3 ? "bg-white text-[#16A34A] shadow-md shadow-black/5" : "text-gray-500 hover:text-gray-800"}`}
              >
                <Share2 className={`w-4 h-4 ${activeScreenIndex === 3 ? "text-[#16A34A]" : "text-gray-400"}`} />
                <span className="text-[9px] font-bold uppercase tracking-wide">Recap</span>
              </button>
            </div>

            {/* Mobile Active Tab Description Panel */}
            <div className="w-full max-w-[340px] mt-4 lg:hidden z-30 min-h-[84px]">
              <div className="bg-white border border-gray-200/50 rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300">
                {activeScreenIndex === 0 && (
                  <div className="flex items-start gap-3 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                      <Navigation className="w-3.5 h-3.5 text-[#16A34A]" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#1F2937] leading-none mb-1">Live Map Active Grid</p>
                      <p className="text-[10px] text-gray-500 font-sans leading-normal">Your runs and walks map live onto your city's active loop grid. Watch the streets glow as people move.</p>
                    </div>
                  </div>
                )}
                {activeScreenIndex === 1 && (
                  <div className="flex items-start gap-3 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                      <Flame className="w-3.5 h-3.5 text-[#16A34A]" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#1F2937] leading-none mb-1">Consistency Streak Tracker</p>
                      <p className="text-[10px] text-gray-500 font-sans leading-normal">Track your daily streaks and consistent habits. Watch your active grid fill up as your streak stays alive.</p>
                    </div>
                  </div>
                )}
                {activeScreenIndex === 2 && (
                  <div className="flex items-start gap-3 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#1F2937] leading-none mb-1">Live Local Leaderboard</p>
                      <p className="text-[10px] text-gray-500 font-sans leading-normal">Conquer loops like Shivaji Park to become the local Hub Leader. Rank updates every 5 minutes live.</p>
                    </div>
                  </div>
                )}
                {activeScreenIndex === 3 && (
                  <div className="flex items-start gap-3 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                      <Share2 className="w-3.5 h-3.5 text-[#16A34A]" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-[#1F2937] leading-none mb-1">Shareable Recap Cards</p>
                      <p className="text-[10px] text-gray-500 font-sans leading-normal">Every week your stats become a ready-to-share card — post your streak and rank straight to WhatsApp or Instagram.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── SCENE 3: MAP EXPANSION (Pure Map Moment) ─────────────── */}
      {/* <section ref={mapMomentRef} className="h-screen w-full relative bg-[#060d1a] overflow-hidden flex items-center justify-center">
        <div className="map-moment-scale absolute inset-0 w-full h-full origin-center">
          <CityMap intensity={1} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060d1a] via-transparent to-[#060d1a] opacity-80 pointer-events-none" />
        <div className="relative z-10 text-center">
          <p className="text-[10px] text-[#16A34A] font-bold uppercase tracking-[0.3em] mb-4">Nationwide Scale</p>
          <h2 className="font-display font-black text-white leading-none" style={{ fontSize: "clamp(48px, 8vw, 120px)", letterSpacing: "-0.04em" }}>
            India.<br/>Always on.
          </h2>
        </div>
      </section> */}

      {/* ── SCENE 4: HORIZONTAL EDITORIAL SPREAD ──────────────────── */}
      <section ref={galleryRef} className="w-full relative bg-[#FAFBFC] overflow-hidden flex flex-col justify-center py-12 lg:pt-28 lg:pb-16 lg:min-h-screen">
        <div className="max-w-7xl mx-auto px-6 w-full mb-6 flex justify-between items-end">
          <div>
            <p className="text-[10px] text-[#16A34A] font-bold uppercase tracking-[0.25em] mb-2">{activeRoutine.tag}</p>
            <h3 className="font-display font-black text-[#1F2937] leading-none" style={{ fontSize: "clamp(26px, 4.5vw, 44px)", letterSpacing: "-0.03em" }}>
              {activeRoutine.title}
            </h3>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hidden sm:block">Scroll to explore →</span>
        </div>

        <div className="w-full overflow-visible">
          <div className="gallery-track flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none lg:overflow-visible lg:w-[180vw] w-full px-6">
            {activeRoutine.cards.map((c: any, i) => {
              if (c.type === "text") {
                return (
                  <div key={i} className="flex-shrink-0 w-[80vw] sm:w-[300px] snap-center aspect-[4/3] bg-gradient-to-br from-[#111] to-[#042f1a] rounded-[24px] p-6 flex flex-col justify-between shadow-lg border border-white/5">
                    <span className="text-[#16A34A] text-[9px] font-bold uppercase tracking-widest">{c.time}</span>
                    <div>
                      <h4 className="font-display font-black text-white text-2xl uppercase leading-tight mb-2 whitespace-pre-line">{c.title}</h4>
                      <p className="text-gray-400 text-[11px] leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                );
              }
              if (c.type === "image") {
                return (
                  <div key={i} className="flex-shrink-0 w-[80vw] sm:w-[420px] snap-center aspect-[4/3] relative rounded-[24px] overflow-hidden shadow-md group/card border border-gray-200">
                    <Image 
                      src={c.image || "/bengaluru_runner_sunrise.png"} 
                      alt={c.location || "City Route"} 
                      fill 
                      sizes="(max-width: 768px) 80vw, 420px"
                      className="object-cover grayscale contrast-[1.1] brightness-[0.85] group-hover/card:grayscale-0 group-hover/card:brightness-[0.95] transition-all duration-700 ease-out" 
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />
                    {/* Glassmorphic box for text readability */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 pointer-events-auto">
                      <p className="text-[#34D399] text-[9px] font-mono font-bold uppercase tracking-wider mb-1">{c.time}</p>
                      <p className="text-white text-xs leading-relaxed font-sans">{c.desc}</p>
                    </div>
                  </div>
                );
              }
              if (c.type === "text_dark") {
                return (
                  <div key={i} className="flex-shrink-0 w-[80vw] sm:w-[300px] snap-center aspect-[4/3] bg-white border border-gray-200 rounded-[24px] p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
                    <span className="text-[#16A34A] text-[9px] font-bold uppercase tracking-widest">{c.time}</span>
                    <div>
                      <h4 className="font-display font-black text-[#1F2937] text-2xl uppercase leading-tight mb-2 whitespace-pre-line">{c.title}</h4>
                      <p className="text-gray-500 text-[11px] leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                );
              }
              if (c.type === "text_accent") {
                return (
                  <div key={i} className="flex-shrink-0 w-[80vw] sm:w-[300px] snap-center aspect-[4/3] bg-gradient-to-tr from-[#16A34A] to-[#34D399] rounded-[24px] p-6 flex flex-col justify-between shadow-lg text-white border border-white/10">
                    <span className="text-white/90 text-[9px] font-bold uppercase tracking-widest">{c.time}</span>
                    <div>
                      <h4 className="font-display font-black text-white text-2xl uppercase leading-tight mb-2 whitespace-pre-line">{c.title}</h4>
                      <p className="text-white/90 text-[11px] leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>

      {/* ── SCENE 5: LIVE LEDGER ────────────────────────────────────── */}
      <section ref={ledgerRef} className="bg-[#111] py-20 sm:py-28 text-white relative">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#16A34A] mb-4">Right Now</p>
            <h3 className="font-display font-black leading-[0.9]" style={{ fontSize: "clamp(36px, 5vw, 68px)", letterSpacing: "-0.04em" }}>
              India<br/>moving.
            </h3>
            <p className="text-gray-400 text-sm mt-6 max-w-sm font-sans leading-relaxed">Live check-ins from the community. All movement data is zone-anonymized to protect user privacy.</p>
          </div>
          
          <div className="lg:col-span-7 divide-y divide-white/10 border-t border-b border-white/10">
            {LIVE_LEDGER.map((log, i) => (
              <div key={i} className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-sm sm:text-base">
                  <span className="font-bold text-white mr-2">{log.r}</span>
                  <span className="text-gray-500 mr-2">{log.a}</span>
                  <span className="font-bold text-[#16A34A] uppercase tracking-wide text-xs">{log.z}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-[#16A34A]/20 text-[#16A34A] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md">{log.s} streak</span>
                  <span className="text-[9px] font-mono text-gray-500 whitespace-nowrap">{log.t}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <FAQ />

      {/* ── SCARCITY STRIP ─────────────────────────────────────────── */}
      <div className="py-6">
        <ScarcityStrip />
      </div>

      {/* ── SCENE 6: FINAL CTA (Waitlist) ─────────────────────────── */}
      <section id="waitlist" className="relative min-h-screen flex flex-col justify-center items-center bg-[#FAFBFC] overflow-hidden py-20">
        
        {/* Subtle background coordinate grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1F2937 1px, transparent 1px), linear-gradient(90deg, #1F2937 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Shifting Ambient Color Glows (Linear/Stripe style) */}
        <div className="absolute top-[20%] left-[15%] w-[45%] aspect-square bg-[#16A34A] rounded-full blur-[160px] opacity-[0.04] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[20%] right-[15%] w-[45%] aspect-square bg-[#34D399] rounded-full blur-[160px] opacity-[0.03] pointer-events-none" style={{ animationDelay: "2s" }} />

        <div className="relative z-20 w-full max-w-2xl px-6 text-center flex flex-col items-center">
          
          {/* Capsule Badge with Micro-border */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-gray-200/55 px-4 py-2 rounded-full mb-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <Lock className="w-2.5 h-2.5 text-[#16A34A]" />
            <span className="text-[#16A34A] text-[9px] font-bold uppercase tracking-[0.2em] font-sans">Founding Members Waitlist</span>
          </div>

          {/* Premium Headline with Brand Gradient */}
          <h2 className="font-display font-black text-[#1F2937] leading-[1.05] tracking-tight text-balance mb-2 uppercase" style={{ fontSize: "clamp(32px, 5.5vw, 68px)", letterSpacing: "-0.04em" }}>
            Rule your <br />
            <span className="bg-gradient-to-r from-[#16A34A] via-[#22c55e] to-[#34D399] bg-clip-text text-transparent italic font-display font-normal lowercase">streets.</span>
          </h2>
          
          <p className="text-lg font-light max-w-sm text-[#4B5563] text-balance mb-8">
            Reserve your founding handle. Claim your home loop, challenge local hubs, and light up the city grid first.
          </p>
          
          <div className="w-full max-w-sm">
            <WaitlistForm dark={false} />
            
            {/* Micro-Details */}
            <p className="text-[9px] font-bold text-gray-400 text-center mt-5 uppercase tracking-widest leading-normal">
              Reserve your handle · Active city play · Early beta access
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
            Revo © 2026 · Made in India
          </p>
          <div className="flex gap-6 text-[9px] font-bold uppercase tracking-widest text-gray-400">
            <Link href="/privacy" className="hover:text-[#16A34A] transition-colors cursor-pointer">Privacy</Link>
            <Link href="/terms" className="hover:text-[#16A34A] transition-colors cursor-pointer">Terms</Link>
            <a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">LinkedIn</a>
            <a href="#" className="hover:text-gray-900 transition-colors cursor-pointer">Instagram</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
