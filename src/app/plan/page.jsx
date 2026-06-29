'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';
// Gravity UI Icons for a polished visual identity
import {
    Check,
    CircleQuestion,
    ChevronDown,
    Person,
    Briefcase,
    Rocket,
    Compass,
    Bulb,
    Star
} from '@gravity-ui/icons';

const PricingPlans = () => {
    // State to toggle between 'collaborator' and 'founder' pricing tiers
    const [activeTab, setActiveTab] = useState('collaborator');
    // State to track opened accordion items in the FAQ section
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Organized Data Structuring maintaining your unique properties and content
    const collaboratorPlans = [
        {
            name: "Free",
            id: 'collaborator_free', 
            price: "$0",
            period: "/forever",
            description: 'Essential features for getting started and organizing your initial search tracking.',
            icon: <Person className="w-5 h-5 text-zinc-400" />,
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
            id: 'collaborator_pro',
            price: "$19",
            period: "/month",
            description: 'Our most popular option for serious active candidates looking to rapidly accelerate landing a role.',
            icon: <Star className="w-5 h-5 text-blue-400" />,
            features: [
                "Apply to up to 10 jobs per month",
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
            id: 'collaborator_premium',
            price: "$39",
            period: "/month",
            description: 'Uncapped potential and priority visibility tools tailored for elite competitive talent placement.',
            icon: <Star className="w-5 h-5 text-purple-400" />,
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

    const founderPlans = [
        {
            name: "Free",
            id: 'founder_free',
            price: "$0",
            period: "/forever",
            description: 'Ideal baseline solution matching startups launching their initial hiring infrastructure pipeline.',
            icon: <Briefcase className="w-5 h-5 text-zinc-400" />,
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
            id: 'founder_growth',
            price: "$49",
            period: "/month",
            description: 'Expanded allocation built for expanding companies with active multi-departmental team tracks.',
            icon: <Rocket className="w-5 h-5 text-blue-400" />,
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
            id: 'founder_enterprise',
            price: "$149",
            period: "/month",
            description: 'High performance structural operations for organizations with continuous large-scale talent acquisition.',
            icon: <Star className="w-5 h-5 text-purple-400" />,
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

    const faqs = [
        {
            question: 'Can I cancel my subscription at any time?',
            answer: 'Yes, absolutely. All our premium tiers operate on flexible, non-binding month-to-month subscription structures. You can easily modify, downgrade, or cancel your renewal configurations through your profile billing dashboard settings at any time with no penalties.'
        },
        {
            question: 'How do refunds work if I change my mind?',
            answer: 'We maintain a 14-day satisfaction policy. If you determine the premium features aren’t a proper fit for your current search or hiring sequence within your initial two weeks of service, reach out to support for a complete refund.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We support all major international credit/debit networks including Visa, Mastercard, American Express, and Discover. Enterprise-grade recruiters also have options to establish monthly or annual invoicing arrangements via bank wire transfers.'
        },
        {
            question: 'What happens if I decide to switch plans mid-month?',
            answer: 'If you upgrade your plan tier mid-cycle, the transition occurs immediately, and your remaining days on the old tier are applied as a pro-rated credit toward your updated invoice. Downgrades take effect starting with your subsequent billing date.'
        }
    ];

    const currentPlans = activeTab === 'collaborator' ? collaboratorPlans : founderPlans;

    return (
        <div className="w-full min-h-screen bg-[#0B0B0F] text-zinc-50 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="max-w-6xl w-full mx-auto">

                {/* Header Title Typography */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-purple-500 bg-purple-500/10 px-3 py-1 rounded-md">
                        Transparent Pricing
                    </span>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100 mt-3 tracking-tight">
                        Flexible plans tailored to your goals
                    </h1>
                    <p className="text-zinc-400 mt-3 text-sm sm:text-base leading-relaxed">
                        Whether you are an ambitious job seeker hunting for your next milestone or an expanding operation tracking down pristine talent, we have got you covered.
                    </p>
                </div>

                {/* Switch Segment Control Toggle Wrapper */}
                <div className="flex justify-center mb-16">
                    <div className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center gap-1 shadow-inner">
                        <button
                            onClick={() => setActiveTab('collaborator')}
                            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                activeTab === 'collaborator'
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                        >
                            <Person className="w-4 h-4" />
                            For Collaborator
                        </button>
                        <button
                            onClick={() => setActiveTab('founder')}
                            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                activeTab === 'founder'
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'text-zinc-400 hover:text-zinc-200'
                            }`}
                        >
                            <Briefcase className="w-4 h-4" />
                            For Founder
                        </button>
                    </div>
                </div>

                {/* 3-Tier Pricing Cards Grid Layout Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-24 w-full max-w-5xl mx-auto">
                    {currentPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl border p-6 flex flex-col justify-between min-h-[500px] transition-all duration-300 hover:-translate-y-1 ${
                                plan.isPopular
                                    ? 'bg-gradient-to-b from-purple-950/20 to-zinc-950/50 border-purple-500 shadow-[0_0_25px_-5px_rgba(147,51,234,0.2)] scale-105 z-10'
                                    : 'bg-zinc-950/40 border-white/10 hover:border-zinc-700'
                            }`}
                        >
                            {/* Popular Highlight Pill */}
                            {plan.isPopular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-[10px] font-bold uppercase px-3 py-0.5 rounded-full tracking-wider flex items-center gap-1 shadow-md">
                                    <Compass className="w-3 h-3 fill-white" /> Most Popular
                                </span>
                            )}

                            {/* Plan Name & Core Header Metadata */}
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <h3 className="text-xl font-bold text-zinc-100">{plan.name}</h3>
                                    <div className="p-2 bg-zinc-950/60 rounded-lg border border-zinc-800/80">
                                        {plan.icon}
                                    </div>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">
                                    {plan.description}
                                </p>

                                {/* Dynamic Price Indicator Text Block */}
                                <div className="my-6 flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-zinc-50 tracking-tight">{plan.price}</span>
                                    <span className="text-xs text-zinc-500 font-medium">{plan.period}</span>
                                </div>

                                <hr className="border-white/5 mb-6" />

                                {/* Interactive Checkbox Checklist Array Mapping */}
                                <ul className="space-y-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                                            <div className="w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="leading-normal">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Plan Action CTA Callout Form Point (Kept Your Original Stripe Setup intact) */}
                            <div className="mt-8">
                                <form action="/api/checkout_sessions" method="POST">
                                    <input type="hidden" name="plan_id" value={plan.id} />
                                    <Button
                                        type="submit"
                                        role="link"
                                        variant={plan.buttonVariant}
                                        className={`w-full py-2.5 rounded-xl font-bold text-xs tracking-wide transition duration-200 ${
                                            plan.isPopular
                                                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                                                : plan.buttonText === 'Current Plan'
                                                ? 'border-zinc-800 text-zinc-500 cursor-default'
                                                : 'border-white/10 hover:bg-white/5 text-zinc-200'
                                        }`}
                                    >
                                        {plan.buttonText === 'Current Plan' ? 'Current Plan' : 'Checkout'}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Accordion Section Layout Wrapper */}
                <div className="max-w-3xl mx-auto border-t border-zinc-800 pt-16 w-full">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-purple-400 mb-3">
                            <CircleQuestion className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">Frequently Asked Questions</h2>
                        <p className="text-xs text-zinc-500 mt-1">Have concerns regarding billing pipelines? Find instant clarify indicators below.</p>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={idx}
                                    className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden transition-colors duration-200"
                                >
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex items-center justify-between text-left p-4 gap-4 text-zinc-200 hover:text-white transition"
                                    >
                                        <span className="text-sm font-semibold">{faq.question}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                                                isOpen ? 'rotate-180 text-purple-400' : ''
                                            }`}
                                        />
                                    </button>

                                    {/* Collapsible Accordion Element View Body */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                            isOpen ? 'max-h-40 border-t border-zinc-800/60' : 'max-h-0'
                                        }`}
                                    >
                                        <div className="p-4 text-xs text-zinc-400 leading-relaxed bg-zinc-900/20">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Insight Hint */}
                <div className="mt-12 flex items-center justify-center">
                    <div className="flex items-center gap-2 bg-zinc-950/50 border border-white/5 px-4 py-2.5 rounded-xl text-zinc-500 text-xs max-w-md text-center">
                        <Bulb className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>All paid plan transactions are securely processed via Stripe. Cancel anytime.</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PricingPlans;