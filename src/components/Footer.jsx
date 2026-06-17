"use client";

import Link from "next/link";
import { Envelope, Handset,Star, LogoFacebook, LogoGithub, LogoLinkedin, MapPin } from "@gravity-ui/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#07070a] text-gray-400 border-t border-white/10 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12">
          
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex md:h-12 h-8 md:w-12 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-md">
                <span className="text-base font-black text-white tracking-wider"><Star/></span>    
              </div>     
              <span className="md:text-4xl text-2xl font-bold text-white tracking-tight">
                Venture<span className="text-violet-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400/80 leading-relaxed max-w-sm">
              The platform where startup founders, premium investors, and talented collaborators build the future together.
            </p>
            <div className="flex items-center gap-4 pt-6">
              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition hover:bg-violet-600"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition hover:bg-violet-600"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition hover:bg-violet-600"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition duration-200">Home</Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-white transition duration-200">Browse Startups</Link>
              </li>
              <li>
                <Link href="/opportunities" className="hover:text-white transition duration-200">Opportunities</Link>
              </li>
              <li>
                <Link href="/auth/signin" className="hover:text-white transition duration-200">Login</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition duration-200">Register</Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              For Founders
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/startup/create" className="hover:text-white transition duration-200">Create Startup</Link>
              </li>
              <li>
                <Link href="/opportunity/post" className="hover:text-white transition duration-200">Post Opportunity</Link>
              </li>
              <li>
                <Link href="/dashboard/applications" className="hover:text-white transition duration-200">Review Applications</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition duration-200">Go Premium</Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Envelope className="h-4 w-4 text-violet-400" />
                <a href="mailto:naymk0087@gmail.com" className="hover:text-white transition duration-200">
                  naymk0087@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Handset className="h-4 w-4 text-violet-400" />
                <span className="hover:text-white transition duration-200">
                  +8801888-252746
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-violet-400" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} VentureConnect. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition duration-200">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-gray-300 transition duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}