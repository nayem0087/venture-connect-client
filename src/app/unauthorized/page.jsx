import React from 'react';
import { Button } from '@heroui/react';
import { ShieldExclamation, ArrowLeft, House } from '@gravity-ui/icons';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="w-full min-h-screen bg-[#0B0B0F] text-zinc-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      
      {/* Background Premium Aura / Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto relative z-10">
        {/* Main Glassmorphism Card */}
        <div className="relative bg-zinc-950/40 border border-red-500/20 rounded-2xl p-6 sm:p-10 text-center shadow-[0_0_60px_-15px_rgba(239,68,68,0.08)] backdrop-blur-md">
          
          {/* Animated Style Warning Icon Wrapper */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-400 mb-6 border border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.15)] animate-pulse">
            <ShieldExclamation className="w-8 h-8" />
          </div>

          {/* Error Code & Headings */}
          <span className="text-xs font-mono tracking-widest text-red-400 uppercase bg-red-500/5 border border-red-500/10 px-2.5 py-1 rounded-md">
            Error 403 : Restricted
          </span>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight mt-4">
            Access Denied
          </h1>
          
          <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
            You do not have the required permissions to view this page. Please switch to an authorized account or contact support if you believe this is a mistake.
          </p>

          <hr className="border-white/5 my-8" />

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* <Link href="/dashboard" className="block w-full">
              <Button
                className="w-full py-6 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/10"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Dashboard
              </Button>
            </Link> */}

            <Link href="/" className="block w-full">
              <Button
                variant="bordered"
                className="w-full py-6 border-zinc-800 hover:bg-white/5 text-zinc-300 hover:text-white font-medium text-sm rounded-xl transition duration-200 flex items-center justify-center gap-2"
              >
                <House className="w-4 h-4" />
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}