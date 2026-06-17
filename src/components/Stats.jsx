"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ChartLine, Person, ArrowChevronUp } from "@gravity-ui/icons";

export default function Stats() {
  const statsData = [
    {
      id: 1,
      metric: "$45M+",
      label: "Total Capital Raised",
      desc: "Secured funding for next-gen ventures.",
      icon: <ArrowChevronUp className="h-6 w-6 text-emerald-400" />,
      borderColor: "hover:border-emerald-500/40",
      glowColor: "bg-emerald-500/10",
    },
    {
      id: 2,
      metric: "1,200+",
      label: "Startups Connected",
      desc: "Active tech & business projects.",
      icon: <ChartLine className="h-6 w-6 text-violet-400" />,
      borderColor: "hover:border-violet-500/40",
      glowColor: "bg-violet-500/10",
    },
    {
      id: 3,
      metric: "350+",
      label: "Premium Investors",
      desc: "Vetted VCs and Angel investors.",
      icon: <Person className="h-6 w-6 text-fuchsia-400" />,
      borderColor: "hover:border-fuchsia-500/40",
      glowColor: "bg-fuchsia-500/10",
    },
    {
      id: 4,
      metric: "94%",
      label: "Success Match Rate",
      desc: "Accurate founder-to-investor matching.",
      icon: <ShieldCheck className="h-6 w-6 text-cyan-400" />,
      borderColor: "hover:border-cyan-500/40",
      glowColor: "bg-cyan-500/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  };

  return (
    <section className="relative w-full bg-[#07070a] md:py-24 py-16 overflow-hidden">

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-bold tracking-widest text-violet-400 uppercase">
            Platform Metrics
          </h2>
          <p className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Empowering Startups Globally
          </p>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            VentureConnect by the numbers. Real-time ecosystem statistics showing how we accelerate funding and fuel collaborative innovation.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} 
        >
          {statsData.map((stat) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`relative group p-6 rounded-2xl border border-white/5 bg-[#0d0d14]/40 backdrop-blur-md transition-all duration-300 ${stat.borderColor}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-xl ${stat.glowColor} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>

                <span className="text-xs font-mono font-bold text-gray-700 select-none group-hover:text-violet-500/30 transition-colors">
                  0{stat.id}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-3xl font-black tracking-tight text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                  {stat.metric}
                </h3>
                <p className="text-sm font-semibold text-gray-200">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed pt-1">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}