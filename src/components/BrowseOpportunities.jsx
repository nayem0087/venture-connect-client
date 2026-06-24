"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllOpportunities } from '@/lib/actions/jobs';

const BrowseOpportunitiesPage = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            const result = await getAllOpportunities();
            if (result?.success) {
                setOpportunities(result.data);
            }
            setLoading(false);
        };
        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-16">
            <div className='text-center md:pb-10 pb-4'>
                <h1 className="md:text-5xl text-4xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                    Open Opportunities
                </h1>
                <p className="text-zinc-400 text-lg">Discover handpicked projects and roles that match your technical expertise.</p>
            </div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? [...Array(6)].map((_, i) => <div key={i} className="h-64 bg-zinc-900/30 rounded-3xl animate-pulse" />)
                : (opportunities.slice(0, 6).map((opp) => (
                    <motion.div 
                        key={opp._id?.$oid || opp._id}
                        whileHover={{ y: -8 }}
                        className="group relative bg-[#0d0d0e] border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-all duration-300 shadow-xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{opp.title}</h2>
                            <p className="text-zinc-500 text-sm mb-6">Email : {opp.email}</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {opp.skills?.split(',').map((skill, i) => (
                                    <span key={`${opp._id?.$oid || opp._id}-skill-${i}`} className="px-3 py-1 bg-zinc-900 rounded-lg text-[11px] font-medium text-zinc-400 border border-zinc-800 uppercase tracking-wider">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                            <div className="space-y-3 border-t border-zinc-800 pt-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Commitment</span>
                                    <span className="font-semibold text-zinc-200 capitalize">{opp.commitment}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Work Mode</span>
                                    <span className="font-semibold text-zinc-200 capitalize">{opp.workType}</span>
                                </div>
                            </div>
                            <p className='text-gray-500 text-center pt-4'>Only collaborators can apply</p>
                        </div>
                    </motion.div>
                )))}
            </motion.div>

            <div className="mt-12 text-center">
                <Link href="/opportunities">
                    <button className="flex items-center gap-2 mx-auto px-6 py-3 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white hover:border-zinc-600 transition-all font-medium">
                        View All Opportunities →
                    </button>
                </Link>
            </div>
        </div>
    );
};
export default BrowseOpportunitiesPage;