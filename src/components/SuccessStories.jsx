"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Flame, Trolley, Archive } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function SuccessStories() {
  const stories = [
    {
      id: 1,
      company: "AlphaTech AI",
      badge: "Seed Round Closed",
      story: "Connected with Peak Ventures within 3 weeks of posting their pitch. Secured $1.5M to scale their LLM infrastructure.",
      founder: "Rahat Chowdhury, Co-Founder",
      icon: <Flame className="h-5 w-5 text-orange-400" />,
    },
    {
      id: 2,
      company: "GreenDrive",
      badge: "Strategic Partnership",
      story: "Found their lead IoT hardware collaborator and a major Angel Investor simultaneously, speeding up their EV prototype by 8 months.",
      founder: "Sania Mirza, CEO",
      icon: <Trolley className="h-5 w-5 text-amber-400" />,
    },
    {
      id: 3,
      company: "HealthSync",
      badge: "Pre-A Funding Secure",
      story: "Matched with 3 healthcare-focused venture funds. Closed a $2.2M round with zero cold emails or external brokerage.",
      founder: "Dr. Asif Kamal, Founder",
      icon: <Archive className="h-5 w-5 text-cyan-400" />,
    },
  ];

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="relative w-full bg-[#07070a] py-24 overflow-hidden">
      <div className="absolute top-1/2 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3">
              <h2 className="text-xs font-bold tracking-widest text-violet-400 uppercase">
                Proven Track Record
              </h2>
              <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                Real Ventures.<br />Real Capital.
              </p>
              <p className="text-base text-gray-400">
                See how visionary founders turned bold ideas into multi-million dollar realities through VentureConnect’s ecosystem.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-violet-500/10 bg-gradient-to-br from-[#110e26]/50 to-[#07070a] backdrop-blur-md space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-300 italic">
                "VentureConnect cut down our fundraising cycle by 70%. The platform aligns perfectly with how modern venture capital should work."
              </p>
              <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs text-gray-500">
                <span>Total Startup Valuation Created</span>
                <span className="text-white font-bold text-sm">$320M+</span>
              </div>
            </div>

            <Button
              as={Link}
              href="/stories"
              className="h-11 border border-white/10 bg-white/5 px-6 text-sm font-semibold text-gray-200 hover:bg-white/10"
              radius="lg"
              variant="bordered"
              endContent={<ArrowRight className="h-4 w-4" />}
            >
              Real Life Stories
            </Button>
          </div>

          <motion.div 
            className="lg:col-span-7 relative pl-4 sm:pl-8 border-l border-white/10 space-y-8"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stories.map((story) => (
              <motion.div
                key={story.id}
                variants={itemVariants}
                whileHover={{ x: 8 }}
                className="relative p-6 rounded-2xl border border-white/5 bg-[#0d0d14]/20 backdrop-blur-md hover:bg-[#12121c]/60 hover:border-violet-500/30 transition-all duration-300 group"
              >
                <div className="absolute -left-[21px] sm:-left-[37px] top-7 flex h-3 w-3 items-center justify-center rounded-full bg-[#07070a] border-2 border-violet-500 shadow-sm shadow-violet-500/50 group-hover:scale-125 transition-transform" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-violet-500/10 transition-colors">
                      {story.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {story.company}
                    </h3>
                  </div>
                  <span className="inline-block text-xs font-medium text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full w-fit">
                    {story.badge}
                  </span>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  "{story.story}"
                </p>

                <div className="text-xs font-mono text-gray-500">
                  — <span className="text-gray-300 font-sans">{story.founder}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}