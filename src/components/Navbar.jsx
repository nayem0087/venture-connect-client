"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Spinner } from "@heroui/react";
import { Star } from '@gravity-ui/icons';
import { signOut, useSession } from "@/lib/auth-client";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  // console.log('session', session, 'is pending, isPending');

  const user = session?.user;

  const handleSignOut = async () => {
    // FIX: Call signOut via the authClient instance
    await signOut();
  };

  // Nav links configured using the dynamic route parameters
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
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-600/20">
            <span className="text-xl font-bold text-white"><Star /></span>
          </div>
          <div className="hidden leading-none sm:block">
            <h1 className="text-3xl font-bold text-white">
              Venture<span className="text-purple-500">Connect</span>
            </h1>
          </div>
        </Link>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-6 md:flex">

            {/* Nav Links Container */}
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

            {/* Vertical Separation Token Line */}
            <div className="h-6 w-px bg-white/20" />

            {/* Desktop Authentication Mapping Pipeline */}
            <div className="flex items-center gap-4">
              {isPending ? (
                <div className="flex  items-center justify-center min-h-screen">
                  <Spinner />
                </div>

              ) : user ? (
                <>
                  <span className="text-sm font-medium text-gray-300">
                    Hi, <span className="text-violet-400">{user.name ? user.name.split(" ")[0] : "User"}</span>!
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="flat"
                    size="sm"
                    className="border border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl text-xs font-semibold"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                  >
                    Sign In
                  </Link>

                  <Button
                    as={Link}
                    href="/signup"
                    radius="lg"
                    className="h-11 bg-purple-500 px-6 text-sm font-semibold text-black hover:bg-purple-600 transition-colors"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* MOBILE NAVIGATION HAMBURGER CONTROLLER */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* RESPONSIVE MOBILE NAVIGATION EXPANSION DRAWER */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0B0B0F] md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="space-y-3 px-4 py-6">

            {/* Nav Menu Lists */}
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Conditional Mobile Footer Area */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex flex-col gap-3">
                {isPending ? (
                  <div className="text-center py-2 text-gray-500 text-sm">Loading session layer...</div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="px-4 text-sm font-medium text-gray-400">
                      Signed in as: <span className="text-white font-semibold">{user.name}</span>
                    </div>
                    <Button
                      fullWidth
                      onClick={handleSignOut}
                      variant="flat"
                      className="h-12 border border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-xl font-medium"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/auth/signin"
                      className="rounded-xl px-4 py-3 text-base font-medium text-violet-400 transition hover:bg-white/5 text-center border border-violet-500/10 bg-violet-500/5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>

                    <Button
                      as={Link}
                      href="/signup"
                      className="h-12 bg-white font-semibold text-black hover:bg-gray-200 transition-colors"
                      radius="lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}