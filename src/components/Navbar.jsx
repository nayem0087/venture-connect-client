"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import {Star} from '@gravity-ui/icons';

export default function Navbar() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Startups", href: "/browse-startups" },
    { label: "Browse Opportunities", href: "/browse-opportunities" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg">
            <span className="text-xl font-bold text-white"><Star/></span>
          </div>
          <div className="hidden leading-none sm:block">
            <h1 className="text-3xl font-bold text-white">Venture<span className="text-violet-500">Connect</span></h1>
          </div>
        </Link>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 md:flex">
            
            {/* Nav Links */}
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Vertical Divider */}
            <div className="h-6 w-px bg-white/20" />

            {/* Auth Links */}
            <div className="flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign In
              </Link>

              <Button
                as={Link}
                href="/register"
                radius="lg"
                className="h-11 bg-white px-6 text-sm font-semibold text-black hover:bg-gray-200"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* MOBILE MENU BUTTON (Hamburger Icon Visible Only on Mobile) */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}