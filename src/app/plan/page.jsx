'use client';
import React, { useState } from 'react';
import { Button } from '@heroui/react';
import { Compass, Check, Bulb } from '@gravity-ui/icons';

const PricingPlans = () => {
    // 'collaborator' (Job Seekers) অথবা 'founder' (Recruiters) সুইচ করার স্টেট
    const [activeTab, setActiveTab] = useState('collaborator');

    // Job Seekers (Collaborator) প্ল্যান ডাটা
    const collaboratorPlans = [
        {
            name: "Free",
            price: "$0",
            period: "/forever",
            features: [
                "Browse & save up to 10 jobs",
                "Apply to up to 3 jobs per month",
                "Basic profile creation",
                "Email alerts for new openings"
            ],
            isPopular: false,
            buttonText: "Current Plan",
            buttonVariant: "bordered"
        },
        {
            name: "Pro",
            price: "$19",
            period: "/month",
            features: [
                "Apply to up to 30 jobs per month",
                "Unlimited saved jobs",
                "Real-time application tracking",
                "Salary & industry insights"
            ],
            isPopular: true,
            buttonText: "Upgrade to Pro",
            buttonVariant: "solid"
        },
        {
            name: "Premium",
            price: "$39",
            period: "/month",
            features: [
                "Everything in Pro plan",
                "Unlimited job applications",
                "Profile boost to top recruiters",
                "Early access to new premium jobs",
                "Priority 24/7 customer support"
            ],
            isPopular: false,
            buttonText: "Go Premium",
            buttonVariant: "solid"
        }
    ];

    // Recruiters (Founder) প্ল্যান ডাটা
    const founderPlans = [
        {
            name: "Free",
            price: "$0",
            period: "/forever",
            features: [
                "Up to 3 active job posts",
                "Basic applicant management",
                "Standard listing visibility",
                "Great for company's first year"
            ],
            isPopular: false,
            buttonText: "Get Started",
            buttonVariant: "bordered"
        },
        {
            name: "Growth",
            price: "$49",
            period: "/month",
            features: [
                "Up to 10 active job posts",
                "Advanced applicant tracking",
                "Basic talent analytics dashboard",
                "Standard email support"
            ],
            isPopular: true,
            buttonText: "Choose Growth",
            buttonVariant: "solid"
        },
        {
            name: "Enterprise",
            price: "$149",
            period: "/month",
            features: [
                "Up to 50 active job posts",
                "Advanced analytics dashboard",
                "Featured job listings at top",
                "Team collaboration & accounts",
                "Custom branding & priority support"
            ],
            isPopular: false,
            buttonText: "Contact Enterprise",
            buttonVariant: "solid"
        }
    ];

    // একটি নির্দিষ্ট ভেরিয়েবলে বর্তমান অ্যাক্টিভ প্ল্যানগুলো রাখা হচ্ছে
    const currentPlans = activeTab === 'collaborator' ? collaboratorPlans : founderPlans;

    return (
        <div className="min-h-screen bg-[#0B0B0F] text-white py-16 px-4 flex flex-col items-center justify-center">
            
            {/* Header Title */}
            <div className="text-center max-w-xl mx-auto mb-12">
                <span className="text-xs font-semibold text-purple-500 uppercase tracking-widest bg-purple-500/10 px-3 py-1 rounded-md">
                    Pricing Plans
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
                    Upgrade Your Network Power
                </h1>
                <p className="text-zinc-400 text-sm mt-2">
                    Choose the perfect plan tailored to your career growth or hiring demands.
                </p>
            </div>

            {/* Toggle Tab Button */}
            <div className="flex bg-zinc-900 border border-zinc-800 p-1.5 rounded-xl mb-12 w-full max-w-xs justify-between shadow-inner">
                <button
                    onClick={() => setActiveTab('collaborator')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition duration-200 ${
                        activeTab === 'collaborator'
                            ? 'bg-purple-600 text-white shadow'
                            : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                    For Collaborator
                </button>
                <button
                    onClick={() => setActiveTab('founder')}
                    className={`flex-1 py-2 text-xs font-semibold rounded-lg transition duration-200 ${
                        activeTab === 'founder'
                            ? 'bg-purple-600 text-white shadow'
                            : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                >
                    For Founder
                </button>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {currentPlans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                            plan.isPopular
                                ? 'bg-gradient-to-b from-purple-950/20 to-zinc-950/50 border-purple-500 shadow-[0_0_25px_-5px_rgba(147,51,234,0.2)] scale-105 z-10'
                                : 'bg-zinc-950/40 border-white/10 hover:border-zinc-700'
                        }`}
                    >
                        {/* Popular Tag */}
                        {plan.isPopular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase px-3 py-0.5 rounded-full tracking-wider flex items-center gap-1">
                                <Compass className="w-3 h-3 fill-white" /> Most Popular
                            </span>
                        )}

                        {/* Top Content */}
                        <div>
                            <h3 className="text-lg font-bold text-zinc-100 mb-2 capitalize">
                                {plan.name}
                            </h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-extrabold tracking-tight">
                                    {plan.price}
                                </span>
                                <span className="text-xs text-zinc-500 font-medium">
                                    {plan.period}
                                </span>
                            </div>

                            <hr className="border-white/5 mb-6" />

                            {/* Features List */}
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed">
                                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${plan.isPopular ? 'text-purple-400' : 'text-zinc-500'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Button */}
                        <Button
                            variant={plan.buttonVariant}
                            className={`w-full py-2.5 rounded-xl font-bold text-xs tracking-wide transition duration-200 ${
                                plan.isPopular
                                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                                    : plan.buttonText === 'Current Plan'
                                    ? 'border-zinc-800 text-zinc-500 cursor-default'
                                    : 'border-white/10 hover:bg-white/5 text-zinc-200'
                            }`}
                        >
                            {plan.buttonText}
                        </Button>
                    </div>
                ))}
            </div>

            {/* Bottom Insight Hint */}
            <div className="mt-12 flex items-center gap-2 bg-zinc-950/50 border border-white/5 px-4 py-2.5 rounded-xl text-zinc-500 text-xs max-w-md text-center">
                <Bulb className="w-4 h-4 text-purple-400 shrink-0" />
                <span>All paid plan transactions are securely processed via Stripe. Cancel anytime.</span>
            </div>
        </div>
    );
};

export default PricingPlans;