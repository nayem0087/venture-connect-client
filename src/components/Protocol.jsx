"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Rocket, Person, Target, ShieldCheck, ArrowRight } from "@gravity-ui/icons";
import { gsap } from "gsap";

export default function Protocol() {
  const [activeTab, setActiveTab] = useState("founders");
  const [displayedTab, setDisplayedTab] = useState("founders"); // lags behind activeTab during the fade-out
  const showcaseRef = useRef(null);

  const ecosystemData = {
    founders: {
      title: "Launch Your Vision",
      badge: "For Founders",
      description: "Transform your raw idea into an investor-ready powerhouse. Build an optimized profile, secure smart-vetted connections, and streamline your entire seed funding round seamlessly.",
      ctaText: "Pitch Your Startup",
      href: "/register",
      icon: <Rocket className="h-5 w-5 text-violet-400" />,
      accentColor: "from-violet-600 to-indigo-600",
      glowColor: "bg-violet-500/10",
      previewCard: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full font-medium">Pitch Deck Verified</span>
            <span className="text-xs text-gray-500">Active Stage</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm font-semibold text-white">Seed Allocation Secured</span>
            <span className="text-sm font-mono font-bold text-white">$1.2M / $1.5M</span>
          </div>
        </div>
      )
    },
    investors: {
      title: "Discover Hidden Unicorns",
      badge: "For Capital Allocators",
      description: "Gain institutional-grade access to thoroughly vetted tech companies. Skip untargeted cold applications and utilize predictive algorithms to discover teams matching your criteria.",
      ctaText: "Request Allocation",
      href: "/opportunities",
      icon: <Target className="h-5 w-5 text-fuchsia-400" />,
      accentColor: "from-fuchsia-600 to-pink-600",
      glowColor: "bg-fuchsia-500/10",
      previewCard: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">Institutional Dealflow</span>
          </div>
          <h4 className="text-base font-bold text-white">Match Accuracy Score: 98.4%</h4>
          <p className="text-xs text-gray-400">Aligned with Fintech infrastructure, Series-A readiness, and European market strategies.</p>
        </div>
      )
    },
    collaborators: {
      title: "Join High-Growth Pods",
      badge: "For Operators & Talents",
      description: "Align your professional expertise with pre-vetted founding entities. Secure equity stakes, work on groundbreaking solutions, and become an integral core team member from day one.",
      ctaText: "Browse Opportunities",
      href: "/opportunities",
      icon: <Person className="h-5 w-5 text-cyan-400" />,
      accentColor: "from-cyan-600 to-blue-600",
      glowColor: "bg-cyan-500/10",
      previewCard: (
        <div className="flex items-center justify-between p-1">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Open Position Allocation</span>
            <h5 className="text-sm font-bold text-white">Lead AI Infrastructure Engineer</h5>
            <p className="text-xs text-cyan-400">0.5% - 1.5% Equity + Competitive Base</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
            +8
          </div>
        </div>
      )
    }
  };

  const tabKeys = Object.keys(ecosystemData);

  // Auto-switch tabs every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabKeys.indexOf(prev);
        const nextIndex = (currentIndex + 1) % tabKeys.length;
        return tabKeys[nextIndex];
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [activeTab]);

  // Smooth crossfade: fade the current card out, swap its content, then fade the new one in.
  useEffect(() => {
    if (!showcaseRef.current) return;
    if (activeTab === displayedTab) return;

    const el = showcaseRef.current;
    const tl = gsap.timeline();

    tl.to(el, {
      opacity: 0,
      y: -12,
      scale: 0.97,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setDisplayedTab(activeTab),
    }).fromTo(
      el,
      { opacity: 0, y: 12, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
    );

    return () => tl.kill();
  }, [activeTab]);

  return (
    <section className="w-full bg-[#07070a] pb-24 md:pt-10 pt-4 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial glow matching brand colors */}
      <div className="absolute top-1/2 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-600/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Structure */}
        <div className="max-w-3xl space-y-4 mb-6">
          <h2 className="text-xs font-bold tracking-widest text-violet-400 uppercase">
            Unified Network Engine
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.1]">
            One Core Protocol.<br />Three Powerful Ecosystems.
          </p>
        </div>

        {/* Asymmetric Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Custom Interactive Tab Controllers */}
          <div className="lg:col-span-5 space-y-4">
            {tabKeys.map((key) => {
              const item = ecosystemData[key];
              const isSelected = activeTab === key;

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-5 relative group overflow-hidden ${
                    isSelected
                      ? "bg-[#0d0d14]/80 border-violet-500/30 shadow-xl shadow-purple-950/20"
                      : "bg-transparent border-white/5 hover:border-white/10 hover:bg-[#0d0d14]/30"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent pointer-events-none" />
                  )}

                  <div className={`p-3 rounded-xl transition-transform duration-300 ${
                    isSelected ? item.glowColor + " scale-105" : "bg-white/5 group-hover:scale-105"
                  }`}>
                    {item.icon}
                  </div>

                  <div className="space-y-0.5">
                    <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                      isSelected ? "text-violet-400" : "text-gray-500"
                    }`}>
                      {item.badge}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Dynamic Showcase Display */}
          <div className="lg:col-span-7 h-[420px] relative flex items-center justify-center">

            <div className="absolute inset-0 border border-dashed border-white/5 rounded-[2.5rem] p-4 flex items-center justify-center">
              <div className="absolute inset-4 border border-white/5 rounded-[2rem] bg-[#09090f]/50 backdrop-blur-xl" />
            </div>

            {/* Note: no `key` here — same DOM node stays mounted so GSAP can crossfade it smoothly. */}
            <div
              ref={showcaseRef}
              className="w-full max-w-lg p-8 space-y-6 relative z-10 text-left"
            >
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none -z-10 bg-gradient-to-br ${ecosystemData[displayedTab].accentColor}`} />

              <div className="space-y-3">
                <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {ecosystemData[displayedTab].title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {ecosystemData[displayedTab].description}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-[#0d0d14]/90 shadow-2xl backdrop-blur-md">
                {ecosystemData[displayedTab].previewCard}
              </div>

              {/* Primary Integrated Action Button With Next.js Link */}
              <div className="pt-2">
                <Button
                  as={Link}
                  href={ecosystemData[displayedTab].href}
                  size="lg"
                  className={`h-11 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r shadow-lg shadow-purple-500/10 ${ecosystemData[displayedTab].accentColor}`}
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  {ecosystemData[displayedTab].ctaText}
                </Button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}