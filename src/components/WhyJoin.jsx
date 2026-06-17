"use client";

import { motion } from "framer-motion";
import { ArrowRight, Thunderbolt, ShieldCheck, Target, Globe } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function WhyJoin() {
  const benefits = [
    {
      id: 1,
      title: "Vetted Investors Network",
      description: "Skip the cold emails. Get direct access to verified angel investors, venture capitalists, and strategic partners ready to fuel your vision.",
      icon: <ShieldCheck className="h-6 w-6 text-violet-400" />,
      tag: "Secure"
    },
    {
      id: 2,
      title: "Smart Matching AI",
      description: "Our intelligent ecosystem aligns your startup's niche, stage, and industry with investors who share your exact strategic goals.",
      icon: <Target className="h-6 w-6 text-fuchsia-400" />,
      tag: "Precision"
    },
    {
      id: 3,
      title: "Accelerated Fundraising",
      description: "Streamline your pitch process. Create high-impact startup profiles, share pitch decks securely, and close your funding rounds faster.",
      icon: <Thunderbolt className="h-6 w-6 text-amber-400" />,
      tag: "Speed"
    },
    {
      id: 4,
      title: "Global Ecosystem",
      description: "Break geographical barriers. Connect with cross-border opportunities, international co-founders, and borderless venture capital.",
      icon: <Globe className="h-6 w-6 text-cyan-400" />,
      tag: "Global"
    }
  ];

  // Framer Motion Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 }
    }
  };

  return (
    <section className="relative w-full bg-[#07070a] py-24 overflow-hidden">
      
      <div className="absolute -top-12 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-fuchsia-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-12 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-violet-600/5 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3 text-left">
            <h2 className="text-xs font-bold tracking-widest text-violet-400 uppercase">
              Value Proposition
            </h2>
            <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Why Choose VentureConnect?
            </p>
            <p className="text-base text-gray-400">
              We don't just list startups; we forge meaningful capital relationships and strategic alliances that drive global growth.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button
              as={Link}
              href="/register"
              variant="light"
              className="text-violet-400 hover:text-violet-300 font-semibold text-sm group"
              endContent={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            >
              Learn more about our ecosystem
            </Button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="relative flex flex-col justify-between p-6 rounded-2xl border border-white/5 bg-[#0d0d14]/30 backdrop-blur-md hover:bg-[#12121c]/50 hover:border-violet-500/20 transition-all duration-300 group"
            >
              <div>

                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:bg-violet-500/10 group-hover:scale-110 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest bg-white/5 border border-white/5 px-2.5 py-1 rounded-full text-gray-400 font-medium">
                    {benefit.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-gradient-to-r from-violet-500/20 to-fuchsia-500/20 -z-10" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}