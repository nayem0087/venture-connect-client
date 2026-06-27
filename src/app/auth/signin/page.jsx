"use client";

import React, { useState } from "react";
import { Button, Link } from "@heroui/react"; 
import { CircleLetterG, Eye, EyeSlash, Envelope, Lock, Star } from "@gravity-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import { authClient, signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    // Handle Sign In Submit
    const handleSignIn = async (e) => {
        e.preventDefault();

        // Validations
        if (!email || !password) {
            toast.error("Please fill in all required fields!");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await signIn.email({
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "Invalid email or password!");
            } else {
                toast.success("Welcome back! Loading dashboard... 🚀");
                router.push(redirectTo);
            }
        } catch (err) {
            toast.error("An unexpected error occurred.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // Google Sign-In Handle
    const handleGoogleSignIn = async () => {
        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Google sign-in failed.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B0A13] px-4 py-12 text-white selection:bg-violet-500/30">
            {/* React Hot Toast Container */}
            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-full max-w-[480px] rounded-2xl border border-white/5 bg-[#131224] p-8 shadow-2xl">

                {/* Brand Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-xl font-bold shadow-lg shadow-violet-600/20">
                           <Star/>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Venture<span className="text-violet-500">Connect</span>
                        </h1>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
                </div>

                {/* Social Auth */}
                <div className="mt-6">
                    <Button
                        onPress={handleGoogleSignIn}
                        fullWidth
                        variant="bordered"
                        className="border-white/10 text-white bg-white/5 hover:bg-white/10 h-12 text-medium font-medium rounded-xl transition-all duration-200"
                        startContent={<CircleLetterG className="w-5 h-5 text-red-500" />}
                    >
                        Continue with Google
                    </Button>
                </div>

                {/* Divider */}
                <div className="relative my-6 flex items-center justify-center">
                    <div className="absolute w-full border-t border-white/5"></div>
                    <span className="relative bg-[#131224] px-3 text-xs text-gray-500 uppercase tracking-wider">or</span>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSignIn} className="space-y-5">

                    {/* Email Input Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Email</label>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/5 hover:bg-white/10 focus-within:border-violet-500/50 focus-within:!bg-white/5 h-12 px-3 rounded-xl transition-all duration-150">
                            <Envelope className="text-gray-500 w-5 h-5 flex-shrink-0" />
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent outline-none border-none text-white placeholder:text-gray-600 text-sm pl-1"
                            />
                        </div>
                    </div>

                    {/* Password Input Field */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-300">Password</label>
                        </div>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/5 hover:bg-white/10 focus-within:border-violet-500/50 focus-within:!bg-white/5 h-12 px-3 rounded-xl transition-all duration-150">
                            <Lock className="text-gray-500 w-5 h-5 flex-shrink-0" />
                            <input
                                type={isVisible ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent outline-none border-none text-white placeholder:text-gray-600 text-sm pl-1"
                            />
                            <button 
                                className="focus:outline-none p-1 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center" 
                                type="button" 
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeSlash className="text-gray-500 h-5 w-5" />
                                ) : (
                                    <Eye className="text-gray-500 h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        isLoading={isLoading}
                        className="h-12 bg-purple-600 font-semibold text-white hover:bg-purple-700 rounded-xl transition duration-200 mt-4 text-medium shadow-lg shadow-violet-600/10"
                    >
                        Sign In
                    </Button>

                    {/* Don't have an account redirect link */}
                    <div className="text-center pt-2">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{" "}
                            <Link href={`/auth/signup?redirect=${redirectTo}`} className="text-violet-400 hover:underline text-sm font-semibold">
                                Sign up free
                            </Link>
                        </p>
                    </div>

                </form>
            </div>
        </div>
    );
}