import { getUserSession } from '@/lib/core/session';
import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';
import { Compass } from '@gravity-ui/icons'; 
import { getPlanById } from '@/lib/api/plan';


const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();
    if (!user) {
        redirect(`/auth/signin?redirect=/opportunities/${id}/apply`);
    }

    // শুধুমাত্র Collaborator-দের অ্যাপ্লাই করার পারমিশন
    if (user.role !== 'collaborator') {
        return (
            <div className="flex min-h-[60vh] items-center justify-center bg-[#0B0B0F] px-4">
                <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-2">Access Restricted</h3>
                    <p className="text-sm text-zinc-400 mb-5">
                        Only <span className="text-purple-400 font-semibold">Collaborators</span> can apply. Your current role is <span className="text-amber-400 capitalize">{user.role || 'user'}</span>.
                    </p>
                    <Link 
                        href="/opportunities"
                        className="bg-purple-600 text-white font-medium rounded-xl px-5 py-2 text-sm hover:bg-purple-700 transition inline-block"
                    >
                        Back to Explore
                    </Link>
                </div>
            </div>
        );
    }

    let opportunity = null;
    let totalAppliedCount = 0;
    let maxAllowedApplications = 3; // কোনো প্ল্যান না পাওয়া গেলে ৩ ডিফল্ট থাকবে

    try {
        // ১. অপরচুনিটি ডেটা ফেচ করা
        const res = await fetch(`http://localhost:5000/api/opportunities/${id}`, {
            cache: 'no-store' 
        });

        if (res.status === 404) {
            notFound(); 
        }

        if (res.ok) {
            opportunity = await res.json();
        }

        // ২. ইউজার এ পর্যন্ত কতটি অ্যাপ্লাই করেছে তা বের করা
        const appsRes = await fetch(`http://localhost:5000/api/applications?applicantEmail=${user.email}`, {
            cache: 'no-store'
        });
        if (appsRes.ok) {
            const appsData = await appsRes.json();
            if (Array.isArray(appsData)) {
                totalAppliedCount = appsData.length;
            }
        }

        // ৩. ডাইনামিক প্ল্যান লিমিট ফেচ করা
        // ইউজারের সেশনে থাকা plan_id অথবা ডিফল্ট হিসেবে 'collaborator_free' ব্যবহার করা হচ্ছে
        const userPlanId = user.plan_id || user.plan || 'collaborator_free';
        const planData = await getPlanById(userPlanId);
        
        if (planData && planData.maxOpportunitiesPerMonth) {
            if (planData.maxOpportunitiesPerMonth === 'unlimited') {
                maxAllowedApplications = Infinity; // আনলিমিটেড হলে ইনফিনিটি সেট হবে
            } else {
                maxAllowedApplications = parseInt(planData.maxOpportunitiesPerMonth, 10);
            }
        }

    } catch (error) {
        console.error("Error fetching data from backend:", error);
    }

    // ইউজার সিঙ্ক এপিআই কল
    try {
        await fetch('http://localhost:5000/api/user', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: user.name,
                email: user.email,
                image: user.image,
                appliedFor: id 
            }),
        });
    } catch (error) {
        console.error("Error syncing user with backend:", error);
    }

    // ডাইনামিক লিমিট কন্ডিশন চেক
    const isLimitExceeded = totalAppliedCount >= maxAllowedApplications;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0B0F] text-white p-4">
            <div className="w-full max-w-xl p-8 rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
                
                {/* Main Application Status */}
                <div className="text-center bg-zinc-900/40 border border-zinc-800 p-6 rounded-xl mb-6">
                    <h1 className="text-xl font-bold mb-2">Application Portal Active</h1>
                    <p className="text-gray-400 text-sm">
                        Welcome, <span className="text-purple-400 font-semibold">{user.name}</span>! Review the details below and proceed with your application.
                    </p>
                    <div className="text-xs text-zinc-500 mt-2">
                        Used Slot: <span className="text-zinc-300 font-medium">{totalAppliedCount}</span> / {maxAllowedApplications === Infinity ? 'Unlimited' : maxAllowedApplications}
                    </div>
                </div>

                {isLimitExceeded ? (
                    <div className="space-y-6">
                        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-950/20 to-zinc-950 text-left shadow-lg">
                            <div className="space-y-1">
                                <h4 className="text-base font-bold text-amber-500 flex items-center gap-1.5">
                                    <Compass className="w-4 h-4 fill-amber-500" /> Upgrade Your Plan
                                </h4>
                                <p className="text-xs text-zinc-400 tracking-wide">
                                    You've reached the maximum limit of {maxAllowedApplications} applications for your current plan.
                                </p>
                            </div>
                            <Link href={'/plan'} className="w-full sm:w-auto px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs rounded-lg shadow-md transition duration-200 shrink-0 whitespace-nowrap">
                                View Premium Plans
                            </Link>
                        </div>

                        <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/20 text-center">
                            <p className="text-sm text-zinc-400">
                                Application form is locked. Please upgrade your account to unlock more opportunity applications.
                            </p>
                        </div>
                    </div>
                ) : (
                    <JobApply opportunity={opportunity} user={user} />
                )}

            </div>
        </div>
    );
};

export default ApplyPage;