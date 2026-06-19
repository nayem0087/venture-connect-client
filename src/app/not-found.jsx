"use client";

import Link from 'next/link';
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-6 overflow-hidden">
      
      {/* 404 Animated Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative"
      >
        <h1 className="text-[150px] md:text-[220px] font-black text-gray-700 leading-none select-none">
          404
        </h1>
        
        {/* Floating Animation for the Title */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Page Not Found
          </h2>
        </motion.div>
      </motion.div>

      {/* Description with Fade In */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-gray-400 max-w-md text-lg"
      >
        Looks like you've wandered into the digital void. Let's get you back on track.
      </motion.p>

      {/* Animated Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-10 flex gap-4"
      >
        <Link href="/">
          <Button size="lg" className="px-8 bg-purple-700 font-semibold hover:scale-105 transition-transform">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}