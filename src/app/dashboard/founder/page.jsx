'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from "@/lib/auth-client";
import { Briefcase, Persons, Check } from "@gravity-ui/icons";
import { Spinner } from "@heroui/react";
import { getAllApplications, getAllOpportunities } from '@/lib/actions/jobs';

export default function FounderDashboardHomePage() {
    const { data: session, isPending } = useSession();
    const [counts, setCounts] = useState({ opportunities: 0, applications: 0, accepted: 0 });
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        async function fetchDashboardStats() {
            if (!session?.user?.email) return;

            try {
                const [oppsRes, appsRes] = await Promise.all([
                    getAllOpportunities(),
                    getAllApplications()
                ]);

                const founderEmail = session.user.email;

                const myOpps = oppsRes?.success
                    ? oppsRes.data.filter(o => o.founderEmail === founderEmail)
                    : [];

                const myJobIds = new Set(myOpps.map(o => String(o._id)));

                const myApps = appsRes?.success
                    ? appsRes.data.filter(a => myJobIds.has(String(a.opportunityId)))
                    : [];

                const acceptedCount = myApps.filter(app => app.status?.toLowerCase() === 'accepted').length;

                setCounts({
                    opportunities: myOpps.length,
                    applications: myApps.length,
                    accepted: acceptedCount
                });
            } catch (error) {
                console.error("Failed to load dashboard statistics", error);
            } finally {
                setIsLoadingData(false);
            }
        }

        if (session) {
            fetchDashboardStats();
        }
    }, [session]);

    if (isPending || isLoadingData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0d0d0e]">
                <Spinner color="purple" size="lg" />
            </div>
        );
    }

    const maxVal = Math.max(counts.opportunities, counts.applications, counts.accepted, 1);

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white p-4 sm:p-6 space-y-5 sm:space-y-6">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Welcome back, {session?.user?.name || "Founder"} 👋
                </h2>
                <p className="text-zinc-500 text-sm mt-1">Here's an overview of your startup activity.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                <div className="bg-[#121214] border border-zinc-900/80 rounded-xl p-4 sm:p-6 flex items-center gap-4 transition hover:border-zinc-800">
                    <div className="p-3 bg-purple-950/40 border border-purple-900/50 rounded-xl text-purple-400 flex-shrink-0">
                        <Briefcase size={22} />
                    </div>
                    <div>
                        <span className="text-2xl sm:text-3xl font-bold tracking-tight">{counts.opportunities}</span>
                        <p className="text-zinc-500 text-xs mt-0.5 font-medium">Total Opportunities</p>
                    </div>
                </div>

                <div className="bg-[#121214] border border-zinc-900/80 rounded-xl p-4 sm:p-6 flex items-center gap-4 transition hover:border-zinc-800">
                    <div className="p-3 bg-indigo-950/40 border border-indigo-900/50 rounded-xl text-indigo-400 flex-shrink-0">
                        <Persons size={22} />
                    </div>
                    <div>
                        <span className="text-2xl sm:text-3xl font-bold tracking-tight">{counts.applications}</span>
                        <p className="text-zinc-500 text-xs mt-0.5 font-medium">Total Applications</p>
                    </div>
                </div>

                <div className="bg-[#121214] border border-zinc-900/80 rounded-xl p-4 sm:p-6 flex items-center gap-4 transition hover:border-zinc-800">
                    <div className="p-3 bg-emerald-950/40 border border-emerald-900/50 rounded-xl text-emerald-400 flex-shrink-0">
                        <Check size={22} />
                    </div>
                    <div>
                        <span className="text-2xl sm:text-3xl font-bold tracking-tight">{counts.accepted}</span>
                        <p className="text-zinc-500 text-xs mt-0.5 font-medium">Accepted Members</p>
                    </div>
                </div>
            </div>

            {/* Activity Chart Section */}
            <div className="bg-[#121214] border border-zinc-900/80 rounded-xl p-4 sm:p-6 space-y-5 sm:space-y-6">
                <h3 className="text-base font-semibold text-zinc-300">Activity Overview</h3>
                <div className="flex h-48 sm:h-64 items-end gap-2 sm:gap-6 border-b border-zinc-800/60 pb-2 pl-8 sm:pl-4 pr-2 sm:px-4 relative">
                    <div className="absolute left-0 bottom-2 top-0 flex flex-col justify-between text-[9px] sm:text-[10px] text-zinc-600 pointer-events-none select-none">
                        <span>{maxVal}</span>
                        <span>{Math.round(maxVal * 0.75)}</span>
                        <span>{Math.round(maxVal * 0.5)}</span>
                        <span>{Math.round(maxVal * 0.25)}</span>
                        <span>0</span>
                    </div>

                    {[
                        { val: counts.opportunities, label: "Opportunities", color: "from-indigo-600 to-purple-500", text: "text-purple-400" },
                        { val: counts.applications, label: "Applications", color: "from-indigo-600 to-purple-500", text: "text-purple-400" },
                        { val: counts.accepted, label: "Accepted", color: "from-emerald-600 to-teal-500", text: "text-emerald-400" }
                    ].map((item, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group ml-2 sm:ml-6 min-w-0">
                            <div
                                style={{ height: `${(item.val / maxVal) * 100}%` }}
                                className={`w-full max-w-[80px] sm:max-w-[120px] bg-gradient-to-t ${item.color} rounded-t-lg transition-all duration-500 hover:opacity-80 relative`}
                            >
                                <span className={`absolute -top-10 sm:-top-20 left-1/2 -translate-x-1/2 text-3xl sm:text-7xl font-extrabold ${item.text} opacity-0 group-hover:opacity-100 transition`}>
                                    {item.val}
                                </span>
                            </div>
                            <span className="text-[10px] sm:text-xs text-zinc-500 font-medium text-center px-1">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}