'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@heroui/react';
import { toast } from 'react-hot-toast';
import { Check, CircleXmark, Envelope, Calendar, ArrowUpRight } from '@gravity-ui/icons';
import { getAllApplications, updateApplicationStatus } from '@/lib/actions/jobs';
import Loading from "@/components/Loading";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadApplications() {
            try {
                const res = await getAllApplications();
                if (res && res.success) {
                    setApplications(res.data || []);
                } else {
                    toast.error("Failed to load applications");
                }
            } catch (err) {
                toast.error("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        }
        loadApplications();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await updateApplicationStatus(id, newStatus);
            if (res && res.success) {
                setApplications(prev => 
                    prev.map(app => app._id === id ? { ...app, status: newStatus } : app)
                );
                toast.success(`Application ${newStatus === 'accepted' ? 'Accepted' : 'Rejected'}!`);
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted':
                return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50';
            case 'rejected':
                return 'bg-rose-950/40 text-rose-400 border-rose-900/50';
            default:
                return 'bg-amber-950/40 text-amber-400 border-amber-900/50';
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="max-w-5xl mx-auto my-8 px-4 space-y-6">
            <div className="border-b border-zinc-900 pb-5">
                <h1 className="text-2xl font-bold text-white tracking-tight">Applications</h1>
                <p className="text-zinc-500 text-sm mt-1">{applications.length} application(s) received.</p>
            </div>

            <div className="space-y-4">
                {applications.length === 0 ? (
                    <div className="text-center py-12 bg-zinc-950 border border-zinc-900 rounded-xl text-zinc-500">
                        No applications received yet.
                    </div>
                ) : (
                    applications.map((item) => (
                        <div 
                            key={item._id} 
                            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start gap-4 transition-all hover:border-zinc-800"
                        >
                            <div className="space-y-4 w-full md:max-w-[70%]">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-lg font-semibold text-white tracking-wide">{item.title || item.jobTitle}</h3>
                                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium capitalize ${getStatusStyle(item.status)}`}>
                                        {item.status || 'pending'}
                                    </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500">
                                    <div className="flex items-center gap-1.5">
                                        <Envelope size={13} className="text-zinc-600" />
                                        <span>{item.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={13} className="text-zinc-600" />
                                        <span>Applied: {item.appliedDate || item.deadline || 'N/A'}</span>
                                    </div>
                                </div>

                                {item.portfolioUrl && (
                                    <a 
                                        href={item.portfolioUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="inline-flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition"
                                    >
                                        <span>View Portfolio</span>
                                        <ArrowUpRight size={12} />
                                    </a>
                                )}

                                {item.motivation && (
                                    <div className="space-y-1 pt-1">
                                        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-600 block">Motivation</span>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{item.motivation}</p>
                                    </div>
                                )}
                                <div className='text-gray-500'>
                                    <h2>Skills</h2>
                                    <p className='text-xs'>{item.skills}</p>
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col items-center gap-4 w-full md:w-auto justify-end md:justify-center pt-3 md:pt-0 border-t md:border-t-0 border-zinc-900">
                                <Button
                                    size="sm"
                                    className="bg-emerald-950/30 border border-emerald-900/60 text-emerald-400 hover:bg-emerald-900/40 rounded-lg px-4 font-medium flex items-center gap-1 w-full md:w-[100px]"
                                    disabled={item.status === 'accepted'}
                                    onPress={() => handleStatusUpdate(item._id, 'accepted')}
                                >
                                    <Check size={14} /> Accept
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-rose-950/30 border border-rose-900/60 text-rose-400 hover:bg-rose-900/40 rounded-lg px-4 font-medium flex items-center gap-1 w-full md:w-[100px]"
                                    disabled={item.status === 'rejected'}
                                    onPress={() => handleStatusUpdate(item._id, 'rejected')}
                                >
                                    <CircleXmark size={14} /> Reject
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}