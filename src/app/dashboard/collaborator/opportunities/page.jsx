import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Button, Chip } from '@heroui/react';
import { Paperclip, Briefcase, Calendar, ChevronRight, Compass } from '@gravity-ui/icons';
import { getUserSession } from '@/lib/core/session';
import { getApplicationsByApplicant } from '@/lib/api/applications';

const ApplyOpportunitiesPage = async () => {

    const user = await getUserSession();
    if (!user) {
        redirect('/auth/signin?redirect=/dashboard/collaborator/applications');
    }

    if (user.role !== 'collaborator') {
        redirect('/unauthorized');
    }

    let applications = [];
    try {
        const data = await getApplicationsByApplicant(user.email);
        if (Array.isArray(data)) {
            applications = data;
        }
    } catch (error) {
        console.error("Error fetching collaborator applications:", error);
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted': return 'success';
            case 'rejected': return 'danger';
            default: return 'warning'; // 'pending'
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#0B0B0F] text-zinc-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/60 pb-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2.5">
                            <Paperclip className="w-7 h-7 text-purple-500" /> My Applied Opportunities
                        </h1>
                        <p className="text-zinc-400 text-sm">
                            Track the status and details of all the roles you have applied for.
                        </p>
                    </div>
                    <Link href="/opportunities">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold rounded-xl px-4 py-5 shadow-lg shadow-purple-600/10 transition flex items-center gap-1.5">
                            <Compass className="w-4 h-4" /> Explore More
                        </Button>
                    </Link>
                </div>

                {/* Applications Content */}
                {applications.length === 0 ? (
                    /* Empty State UI */
                    <div className="border border-dashed border-zinc-800 bg-zinc-950/20 rounded-2xl p-12 text-center max-w-md mx-auto mt-12 space-y-4">
                        <div className="inline-flex p-4 bg-zinc-900/60 rounded-full border border-zinc-800 text-zinc-500">
                            <Briefcase className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-base font-bold text-zinc-200">No applications found</h3>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                                You haven't applied to any opportunities yet. Once you apply, they will appear here.
                            </p>
                        </div>
                        <Link href="/opportunities" className="inline-block pt-2">
                            <Button size="sm" variant="flat" className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium rounded-lg px-4 text-xs border border-zinc-800">
                                Find Opportunities
                            </Button>
                        </Link>
                    </div>
                ) : (
                    /* Applications Table/List UI */
                    <div className="grid gap-4">
                        {applications.map((app) => (
                            <div 
                                key={app._id} 
                                className="group relative bg-zinc-950/40 border border-zinc-800/80 hover:border-purple-500/30 rounded-xl p-5 transition duration-200 shadow-md backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                {/* Left Side: Details */}
                                <div className="space-y-3 max-w-xl w-full">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Chip 
                                            size="sm" 
                                            variant="flat" 
                                            color={getStatusColor(app.status)} 
                                            className="capitalize font-semibold tracking-wide text-[11px] px-2 py-0.5 rounded-md"
                                        >
                                            {app.status || 'Pending'}
                                        </Chip>
                                        <span className="text-xs text-zinc-600 flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" /> 
                                            {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-base font-bold text-zinc-100 group-hover:text-purple-400 transition flex items-center gap-1.5 break-all">
                                            ID: <span className="text-zinc-400 font-mono text-sm">{app.opportunityId || app.jobId || "N/A"}</span>
                                        </h3>
                                        <p className="text-xs text-zinc-500 mt-0.5">
                                            Applicant: <span className="text-zinc-400 font-medium">{app.applicantEmail}</span>
                                        </p>
                                    </div>

                                    {/* Motivation Message (If exists) */}
                                    {app.motivationMessage && (
                                        <div className="bg-zinc-900/30 border border-zinc-900 text-xs text-zinc-400 p-3 rounded-lg leading-relaxed italic line-clamp-2">
                                            {app.motivationMessage}
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Actions & Portfolio */}
                                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t border-zinc-900 pt-4 md:border-none md:pt-0 shrink-0">
                                    {app.portfolioLink && (
                                        <a 
                                            href={app.portfolioLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="text-xs text-purple-400 hover:text-purple-300 underline font-medium tracking-wide transition"
                                        >
                                            View Submitted Portfolio
                                        </a>
                                    )}
                                    <Link href={`/opportunities/${app.opportunityId || app.jobId}`}>
                                        <Button 
                                            size="sm" 
                                            variant="bordered" 
                                            className="border-zinc-800 hover:bg-zinc-900 text-zinc-300 hover:text-white font-medium text-xs rounded-lg px-3 flex items-center gap-1 transition"
                                        >
                                            View Details <ChevronRight className="w-3.5 h-3.5" />
                                        </Button>
                                    </Link>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ApplyOpportunitiesPage;