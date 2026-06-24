"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Loading from '@/components/Loading';

const OpportunityDetails = () => {
    const { id } = useParams();
    const [opp, setOpp] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchDetails = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/opportunities/${id}`);
                const data = await res.json();
                setOpp(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="text-white text-center mt-20"><Loading/></div>;
    if (!opp) return <div className="text-white text-center mt-20">Opportunity not found!</div>;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-16">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto"
            >
                {/* Main Card with Hover Effect */}
                <motion.div 
                    whileHover={{ borderColor: "#a855f7" }}
                    className="border border-zinc-800 rounded-3xl p-8 md:p-12 bg-[#0d0d0e] transition-colors duration-300"
                >
                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex justify-between items-start mb-6">
                            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
                                {opp.title}
                            </h1>
                            <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${opp.status === 'active' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                                {opp.status}
                            </span>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-1.5 bg-purple-900/20 text-purple-400 border border-purple-900 rounded-lg text-sm font-semibold capitalize">
                                {opp.workType} Mode
                            </span>
                            <span className="px-4 py-1.5 bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-lg text-sm font-semibold capitalize">
                                {opp.commitment}
                            </span>
                        </div>
                    </div>

                    {/* All Fields Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 border-t border-zinc-800 pt-8">
                        <div className="space-y-6">
                            <div>
                                <label className="text-zinc-500 text-xs uppercase block mb-1">HR Email</label>
                                <p className="font-medium text-lg">{opp.email}</p>
                            </div>
                            <div>
                                <label className="text-zinc-500 text-xs uppercase block mb-1">Application Deadline</label>
                                <p className="font-medium text-lg">{new Date(opp.deadline).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="text-zinc-500 text-xs uppercase block mb-1">Created At</label>
                                <p className="font-medium text-lg">{new Date(opp.createdAt?.$date || opp.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <label className="text-zinc-500 text-xs uppercase block mb-1">Skills</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {opp.skills?.split(',').map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400 uppercase">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Area */}
                    <div className="mt-10 flex gap-4">
                        <Link href={''} className="flex-1 py-2 bg-purple-700 text-white font-bold rounded-xl hover:bg-purple-800 transition-all text-center">
                            Apply Now
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default OpportunityDetails;