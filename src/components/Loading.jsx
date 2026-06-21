"use client";

import { motion } from "framer-motion";
import {ChatLoader} from "@heroui-pro/react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      {/* Animated Pulse Ring */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-16 w-16 rounded-full border-4 border-violet-500 border-t-transparent"
      />
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-gray-400 font-medium tracking-widest uppercase text-sm"
      >
        <ChatLoader.Spinner />
      </motion.p>
    </div>
  );
}