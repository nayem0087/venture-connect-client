"use client";

import React, { useState } from "react";
import { Button, Label, Link } from "@heroui/react";
import { CircleLetterG, Eye, EyeSlash, Person, Envelope, Lock, Picture, Star } from "@gravity-ui/icons";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Radio, RadioGroup } from "@heroui/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
    // States
    const [role, setRole] = useState("collaborator");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    // Handle Form Submit
    const handleSignup = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all required fields!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters!");
            return;
        }

        setIsLoading(true);



        const plan = role === 'collaborator' ? 'collaborator_free' : 'founder_free';

        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name: fullName,
                image: profileImage || undefined,
                role,
                plan
            });

            if (error) {
                toast.error(error.message || "Something went wrong!");
            } else {
                toast.success("Account created successfully! 🚀");

                // FIX: router.push() does a soft, client-side navigation —
                // the Navbar's useSession() relies on better-auth's internal
                // nanostore signal to know it should refetch, and that
                // signal isn't firing reliably after signUp.email in this
                // setup (known quirk: github.com/better-auth/better-auth/issues/858,
                // issues/1006). Rather than depend on that internal signal,
                // force a full browser navigation instead. This makes every
                // client component — including the Navbar — remount from
                // scratch on the new page, so useSession() does a fresh
                // fetch against the now-valid session cookie. No refresh
                // needed, and it isn't dependent on better-auth internals.
                window.location.href = redirectTo;
            }
        } catch (err) {
            toast.error("An unexpected error occurred.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Google sign-in failed.");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                toast.success("Profile image selected!");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B0A13] px-4 py-12 text-white selection:bg-violet-500/30">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-full max-w-[480px] rounded-2xl border border-white/5 bg-[#131224] p-8 shadow-2xl">

                {/* Brand Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-xl font-bold shadow-lg shadow-violet-600/20">
                            <Star />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Venture<span className="text-violet-500">Connect</span>
                        </h1>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">Create your account</h2>
                    <p className="mt-2 text-sm text-gray-400">Join thousands of founders and collaborators</p>
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
                <form onSubmit={handleSignup} className="space-y-5">

                    {/* Role Selection Switcher */}
                    <div className="flex flex-col gap-4">
                        <Label>Subscription plan</Label>
                        <RadioGroup defaultValue="collaborator" name="role" onChange={value => setRole(value)} orientation="horizontal">
                            <Radio value="collaborator">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Collaborator
                                </Radio.Content>
                            </Radio>
                            <Radio value="founder">
                                <Radio.Content>
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    Founder
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Full Name</label>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/5 hover:bg-white/10 focus-within:border-violet-500/50 focus-within:!bg-white/5 h-12 px-3 rounded-xl transition-all duration-150">
                            <Person className="text-gray-500 w-5 h-5 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full bg-transparent outline-none border-none text-white placeholder:text-gray-600 text-sm pl-1"
                            />
                        </div>
                    </div>

                    {/* Email */}
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

                    {/* Profile Image (Optional) */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">
                            Profile Image <span className="text-gray-500 text-xs">(optional)</span>
                        </label>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/5 overflow-hidden flex-shrink-0">
                                {profileImage ? (
                                    <img src={profileImage} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                    <Picture className="text-gray-500 h-5 w-5" />
                                )}
                            </div>
                            <label className="flex h-12 flex-1 cursor-pointer items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 font-medium text-violet-400 transition hover:bg-violet-500/10 text-sm group">
                                <span className="group-hover:scale-[0.99] transition-transform">Upload Profile Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Password</label>
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

                    {/* Confirm Password */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/5 hover:bg-white/10 focus-within:border-violet-500/50 focus-within:!bg-white/5 h-12 px-3 rounded-xl transition-all duration-150">
                            <Lock className="text-gray-500 w-5 h-5 flex-shrink-0" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-transparent outline-none border-none text-white placeholder:text-gray-600 text-sm pl-1"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        isLoading={isLoading}
                        className="h-12 bg-purple-600 font-semibold text-white hover:bg-purple-700 rounded-xl transition duration-200 mt-2 text-medium shadow-lg shadow-violet-600/10"
                    >
                        Create Account 🚀
                    </Button>

                    {/* Already have an account */}
                    <div className="text-center pt-2">
                        <p className="text-sm text-gray-400">
                            Already have an account?{" "}
                            <Link href={`/auth/signin?redirect=${redirectTo}`} className="text-violet-400 hover:underline text-sm font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
