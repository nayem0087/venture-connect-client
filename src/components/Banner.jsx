"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Magnifier, Person, Gear, Layers, ArrowUpRightFromSquare } from "@gravity-ui/icons";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    },
  };

  const graphicVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { delay: 0.4, type: "spring", stiffness: 60, damping: 15 } 
    },
  };

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-[#07070a] flex items-center justify-center pt-20 pb-16">

      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 translate-x-1/2 rounded-full bg-fuchsia-500/15 blur-[120px]" />

      <motion.div 
        className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">

          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 backdrop-blur-md">
            <Rocket className="h-4 w-4 text-violet-400" />
            <span className="text-xs font-semibold tracking-wide text-violet-200 uppercase">
              The Next-Gen Venture & Startup Hub
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-[1.1]">
            Connect Your <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Venture</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
              With Top Investors
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="max-w-2xl mx-auto lg:mx-0 text-base text-gray-400 sm:text-lg md:text-xl leading-relaxed">
            VentureConnect bridges the gap between visionary entrepreneurs and premium investors. Pitch your startup, secure funding, and scale your business with the right strategic capital — all in one unified ecosystem.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">

            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-full sm:w-auto"
            >
              <Button
                as={Link}
                href="/register"
                className="w-full sm:w-auto h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] px-8 text-sm font-bold text-white shadow-lg shadow-purple-500/20"
                radius="xl"
                endContent={<ArrowRight className="h-4 w-4" />}
              >
                Start Building <ArrowRight
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-full sm:w-auto"
            >
              <Button
                as={Link}
                href="/opportunities"
                className="w-full sm:w-auto h-12 border border-[#4c1d95]/40 bg-[#0c0a1c]/40 px-8 text-sm font-semibold text-[#a78bfa] hover:bg-[#1e1b4b]/50 backdrop-blur-md"
                radius="xl"
                variant="bordered"
                startContent={<Magnifier className="h-4 w-4 text-[#a78bfa]" />}
              >
                Browse Opportunities <ArrowUpRightFromSquare/>
              </Button>
            </motion.div>

          </motion.div>
        </div>

        <motion.div 
          className="lg:col-span-5 flex justify-center items-center relative"
          variants={graphicVariants}
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">

            <div className="absolute inset-0 rounded-full border border-dashed border-violet-500/30 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border border-double border-fuchsia-500/20 animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-violet-600/10 to-fuchsia-500/10 blur-xl" />

            <div className="relative z-10 p-5 rounded-3xl bg-gradient-to-tr from-violet-600 to-fuchsia-500 shadow-2xl shadow-violet-500/40">
              <span className="text-3xl italic font-semibold text-white tracking-wider">VC</span>
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#0F0F15] border border-white/10 p-3 rounded-2xl shadow-xl hover:border-violet-500 transition cursor-pointer">
              <Person className="h-6 w-6 text-violet-400" />
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0F0F15] border border-white/10 p-3 rounded-2xl shadow-xl hover:border-fuchsia-500 transition cursor-pointer">
              <Layers className="h-6 w-6 text-fuchsia-400" />
            </div>

            <div className="absolute left-2 top-1/3 bg-[#0F0F15] border border-white/10 p-3 rounded-2xl shadow-xl hover:border-cyan-400 transition cursor-pointer">
              <Gear className="h-6 w-6 text-cyan-400" />
            </div>

            <div className="absolute right-2 top-1/3 bg-[#0F0F15] border border-white/10 p-3 rounded-2xl shadow-xl hover:border-emerald-400 transition cursor-pointer">
              <Rocket className="h-6 w-6 text-emerald-400" />
            </div>

          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}