"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  ArrowRight, 
  Magnifier, 
  Person, 
  Gear, 
  Layers, 
  ArrowUpRightFromSquare, 
  ChartLine, 
  ShieldCheck, 
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Check
} from "@gravity-ui/icons";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // DESIGN 1: Core Venture Connect Brand
    {
      id: 0,
      badge: "The Next-Gen Venture & Startup Hub",
      badgeIcon: Rocket,
      badgeColor: "border-violet-500/30 bg-violet-500/10 text-violet-200 text-violet-400",
      titleLine1: "Connect Your",
      titleHighlight1: "Venture",
      titleLine2: "With Top Investors",
      gradientText: "from-violet-400 via-fuchsia-400 to-indigo-400",
      description: "VentureConnect bridges the gap between visionary entrepreneurs and premium investors. Pitch your startup, secure funding, and scale with strategic capital.",
      btnPrimaryText: "Start Building",
      btnPrimaryLink: "/register",
      btnSecondaryText: "Browse Opportunities",
      btnSecondaryLink: "/opportunities",
      accentBg: "from-violet-600/20 to-fuchsia-500/15",
      badgeTitle: "VC Platform",
      graphicType: "vc-badge",
    },
    // DESIGN 2: Live Metrics & Traction Focus
    {
      id: 1,
      badge: "Real-time Deal Analytics & Traction",
      badgeIcon: ChartLine,
      badgeColor: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200 text-cyan-400",
      titleLine1: "Data-Driven",
      titleHighlight1: "Fundraising",
      titleLine2: "For Modern Founders",
      gradientText: "from-cyan-400 via-teal-300 to-blue-500",
      description: "Track pitch deck views, investor engagement scores, and secure capital 3x faster with our proprietary AI-assisted match algorithm.",
      btnPrimaryText: "View Live Deals",
      btnPrimaryLink: "/deals",
      btnSecondaryText: "Analytics Dashboard",
      btnSecondaryLink: "/analytics",
      accentBg: "from-cyan-600/20 to-blue-500/15",
      badgeTitle: "Live Metrics",
      graphicType: "analytics-card",
    },
    // DESIGN 3: VC & Syndicate Network
    {
      id: 2,
      badge: "Institutional & Angel Capital",
      badgeIcon: Briefcase,
      badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200 text-emerald-400",
      titleLine1: "Access 500+",
      titleHighlight1: "Verified VCs",
      titleLine2: "& Angel Syndicates",
      gradientText: "from-emerald-400 via-green-300 to-teal-400",
      description: "Direct access to top Tier-1 VC funds, syndicate leads, and angel networks actively looking for Seed to Series A tech startups.",
      btnPrimaryText: "Join Investor Network",
      btnPrimaryLink: "/investors",
      btnSecondaryText: "Pitch Your Deck",
      btnSecondaryLink: "/pitch",
      accentBg: "from-emerald-600/20 to-teal-500/15",
      badgeTitle: "VC Network",
      graphicType: "network-card",
    },
    // DESIGN 4: Trust, Security & Smart Contracts
    {
      id: 3,
      badge: "Encrypted & Secure Pitching",
      badgeIcon: ShieldCheck,
      badgeColor: "border-rose-500/30 bg-rose-500/10 text-rose-200 text-rose-400",
      titleLine1: "Institutional",
      titleHighlight1: "Security",
      titleLine2: "& Automated Escrow",
      gradientText: "from-rose-400 via-pink-400 to-orange-400",
      description: "Protect your intellectual property with NDA-backed pitch views, watermarked decks, and smart-contract funding escrow execution.",
      btnPrimaryText: "Explore Safe Pitches",
      btnPrimaryLink: "/security",
      btnSecondaryText: "Learn Security",
      btnSecondaryLink: "/about-security",
      accentBg: "from-rose-600/20 to-orange-500/15",
      badgeTitle: "Safe Escrow",
      graphicType: "security-card",
    },
  ];

  // Auto-switch slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-[#07070a] flex flex-col justify-between pt-16 pb-8">

      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-screen pointer-events-none transition-all duration-700"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      {/* Dynamic Background Ambient Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className={`h-[400px] w-[400px] rounded-full bg-gradient-to-tr ${slide.accentBg} blur-[130px] transition-all duration-1000`} />
      </div>

      {/* Main Slide Content */}
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-auto relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Column: Dynamic Banner Text */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">

              {/* Dynamic Badge */}
              <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 backdrop-blur-md ${slide.badgeColor}`}>
                <slide.badgeIcon className="h-3.5 w-3.5" />
                <span className="text-[11px] font-semibold tracking-wide uppercase">
                  {slide.badge}
                </span>
              </div>

              {/* Dynamic Heading */}
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-[1.1]">
                {slide.titleLine1}{" "}
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  {slide.titleHighlight1}
                </span>
                <br />
                <span className={`bg-gradient-to-r ${slide.gradientText} bg-clip-text text-transparent`}>
                  {slide.titleLine2}
                </span>
              </h1>

              {/* Dynamic Description */}
              <p className="max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base text-gray-400 leading-relaxed">
                {slide.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Button
                    as={Link}
                    href={slide.btnPrimaryLink}
                    className="w-full sm:w-auto h-11 bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-7 text-xs font-bold text-white shadow-lg shadow-purple-500/20"
                    radius="xl"
                    endContent={<ArrowRight className="h-3.5 w-3.5" />}
                  >
                    {slide.btnPrimaryText}
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                  <Button
                    as={Link}
                    href={slide.btnSecondaryLink}
                    className="w-full sm:w-auto h-11 border border-[#4c1d95]/40 bg-[#0c0a1c]/40 px-7 text-xs font-semibold text-[#a78bfa] hover:bg-[#1e1b4b]/50 backdrop-blur-md"
                    radius="xl"
                    variant="bordered"
                    startContent={<Magnifier className="h-3.5 w-3.5 text-[#a78bfa]" />}
                  >
                    {slide.btnSecondaryText} <ArrowUpRightFromSquare className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Redesigned Premium Glowing Orbit Rings */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">

                {/* 1. Outer Primary Glowing Ring */}
                <div className="absolute inset-0 rounded-full border border-violet-500/25 shadow-[0_0_25px_rgba(139,92,246,0.12)] animate-[spin_60s_linear_infinite]" />

                {/* 2. Middle Dashed Ring */}
                <div className="absolute inset-5 sm:inset-6 rounded-full border border-dashed border-white/20 animate-[spin_40s_linear_infinite_reverse]" />

                {/* 3. Inner Accent Soft Ring */}
                <div className="absolute inset-10 sm:inset-12 rounded-full border border-indigo-500/20 shadow-[inset_0_0_15px_rgba(99,102,241,0.08)]" />

                {/* 4. Orbiting Glowing Pulse Dots */}
                <div className="absolute inset-0 rounded-full animate-[spin_35s_linear_infinite] pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_#a78bfa]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                </div>

                {/* Center Compact Card Container */}
                <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 flex items-center justify-center">
                  
                  {/* SLIDE 0: Venture Connect Hub Card */}
                  {slide.graphicType === "vc-badge" && (
                    <div className="p-3.5 sm:p-4 rounded-2xl border border-violet-500/30 bg-[#130b2b]/95 shadow-2xl shadow-violet-500/25 flex flex-col justify-between backdrop-blur-xl w-full h-full text-left">
                      <div className="flex items-center justify-between border-b border-violet-500/20 pb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="p-1 rounded-lg bg-violet-500/20 text-violet-400">
                            <Rocket className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-[10px] sm:text-xs font-semibold text-violet-200">Venture Connect</span>
                        </div>
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-bold">HUB</span>
                      </div>

                      <div>
                        <p className="text-[9px] text-gray-400 uppercase tracking-wider">Connected Startups</p>
                        <p className="text-lg sm:text-xl font-extrabold text-white mt-0.5">1,250+ Deals</p>
                      </div>

                      <div className="flex items-center gap-1 bg-violet-950/40 p-1.5 rounded-lg border border-violet-500/20">
                        <Check className="h-3 w-3 text-violet-400" />
                        <span className="text-[9px] sm:text-[10px] text-violet-200 font-medium">AI Smart Engine</span>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 1: Analytics Card */}
                  {slide.graphicType === "analytics-card" && (
                    <div className="p-3.5 sm:p-4 rounded-2xl border border-cyan-500/30 bg-[#0d1527]/95 shadow-2xl shadow-cyan-500/25 flex flex-col justify-between backdrop-blur-xl w-full h-full text-left">
                      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400">
                            <ChartLine className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-[10px] sm:text-xs font-semibold text-cyan-200">Analytics</span>
                        </div>
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">LIVE</span>
                      </div>

                      <div>
                        <p className="text-[9px] text-gray-400 uppercase tracking-wider">Capital Raised</p>
                        <p className="text-lg sm:text-xl font-extrabold text-white mt-0.5">$5.4M+</p>
                      </div>

                      <div className="flex items-center gap-1 bg-cyan-950/40 p-1.5 rounded-lg border border-cyan-500/20">
                        <Check className="h-3 w-3 text-cyan-400" />
                        <span className="text-[9px] sm:text-[10px] text-cyan-200 font-medium">98% Match Rate</span>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 2: Network Card */}
                  {slide.graphicType === "network-card" && (
                    <div className="p-3.5 sm:p-4 rounded-2xl border border-emerald-500/30 bg-[#091e17]/95 shadow-2xl shadow-emerald-500/25 flex flex-col justify-between backdrop-blur-xl w-full h-full text-left">
                      <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-1.5">
                        <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                          <Briefcase className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">VC Network</h4>
                        </div>
                      </div>

                      <div>
                        <p className="text-[9px] text-gray-400 uppercase tracking-wider">Active Syndicates</p>
                        <p className="text-lg sm:text-xl font-extrabold text-white mt-0.5">500+ VC Funds</p>
                      </div>

                      <div className="flex items-center gap-1 bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-500/20">
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-[9px] sm:text-[10px] text-emerald-200 font-medium">Instant Matching</span>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 3: Security Card */}
                  {slide.graphicType === "security-card" && (
                    <div className="p-3.5 sm:p-4 rounded-2xl border border-rose-500/30 bg-[#1f0b13]/95 shadow-2xl shadow-rose-500/25 flex flex-col justify-between backdrop-blur-xl w-full h-full text-left">
                      <div className="flex items-center justify-between border-b border-rose-500/20 pb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="p-1 rounded-lg bg-rose-500/20 text-rose-400">
                            <ShieldCheck className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-[10px] sm:text-xs font-semibold text-rose-200">Security</span>
                        </div>
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">SAFE</span>
                      </div>

                      <div>
                        <p className="text-[9px] text-gray-400 uppercase tracking-wider">Protection Level</p>
                        <p className="text-lg sm:text-xl font-extrabold text-white mt-0.5">100% Escrow</p>
                      </div>

                      <div className="flex items-center gap-1 bg-rose-950/40 p-1.5 rounded-lg border border-rose-500/20">
                        <Check className="h-3 w-3 text-rose-400" />
                        <span className="text-[9px] sm:text-[10px] text-rose-200 font-medium">Encrypted Pitch</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Orbiting Icons */}
                <motion.div 
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                    <div className="bg-[#0F0F15]/90 border border-violet-500/40 p-2 sm:p-2.5 rounded-xl backdrop-blur-md shadow-lg shadow-violet-500/10">
                      <Person className="h-4 w-4 text-violet-400" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-auto">
                    <div className="bg-[#0F0F15]/90 border border-fuchsia-500/40 p-2 sm:p-2.5 rounded-xl backdrop-blur-md shadow-lg shadow-fuchsia-500/10">
                      <Layers className="h-4 w-4 text-fuchsia-400" />
                    </div>
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                    <div className="bg-[#0F0F15]/90 border border-cyan-500/40 p-2 sm:p-2.5 rounded-xl backdrop-blur-md shadow-lg shadow-cyan-500/10">
                      <Gear className="h-4 w-4 text-cyan-400" />
                    </div>
                  </div>
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                    <div className="bg-[#0F0F15]/90 border border-emerald-500/40 p-2 sm:p-2.5 rounded-xl backdrop-blur-md shadow-lg shadow-emerald-500/10">
                      <Rocket className="h-4 w-4 text-emerald-400" />
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-20 border-t border-white/5">
        
        {/* Clickable Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {slides.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentSlide(idx)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                currentSlide === idx 
                  ? "bg-white/10 text-white border border-white/20 shadow-md backdrop-blur-md" 
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${currentSlide === idx ? "bg-violet-400" : "bg-gray-600"}`} />
              {item.badgeTitle}
            </button>
          ))}
        </div>

        {/* Manual Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          
          <span className="text-[11px] font-mono text-gray-400 px-1">
            0{currentSlide + 1} / 0{slides.length}
          </span>

          <button
            onClick={handleNext}
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition"
            aria-label="Next Slide"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

    </section>
  );
}