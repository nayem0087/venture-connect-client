"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import Loading from '@/components/Loading';
import BookmarkButton from '@/components/BookmarkButton';

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

export default function SavedStartupsPage() {
    const { data: session } = useSession();
    const user = session?.user;

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSaved = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/bookmarks?email=${encodeURIComponent(user.email)}`);
            const data = await res.json();
            if (data.success) {
                setItems(data.items.filter((item) => item.itemType === 'startup'));
            }
        } catch (e) {
            console.error("Failed to load saved startups:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSaved();
    }, [user?.email]);

    const handleRemoved = (id) => {
        setItems((prev) => prev.filter((item) => String(item._id) !== String(id)));
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-16">
            <div className="pb-8">
                <div className="flex gap-3 mb-4">
                    <Link href="/dashboard/saved/startups" className="px-4 py-2 rounded-full bg-purple-600 text-white text-sm font-semibold">
                        Startups
                    </Link>
                    <Link href="/dashboard/saved/opportunities" className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-semibold hover:text-white transition-colors">
                        Opportunities
                    </Link>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Saved Startups</h1>
                <p className="text-zinc-400">Startups you've bookmarked for later.</p>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-16 bg-zinc-950 border border-zinc-900 rounded-xl text-zinc-500">
                    Nothing saved yet — tap the heart icon on any startup to save it here.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="relative bg-[#0d0d0e] border border-zinc-800 rounded-3xl p-6 hover:border-purple-500/40 transition-colors"
                        >
                            <div className="absolute top-5 right-5">
                                <BookmarkButton
                                    itemId={item._id}
                                    itemType="startup"
                                    initialBookmarked={true}
                                    onToggled={(isNowBookmarked) => {
                                        if (!isNowBookmarked) handleRemoved(item._id);
                                    }}
                                />
                            </div>

                            <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border border-purple-500/30 text-purple-400 bg-purple-500/10">
                                Startup
                            </span>

                            <Link href="/startups">
                                <h2 className="text-lg font-bold text-white pr-8 hover:text-purple-400 transition-colors">
                                    {item.name}
                                </h2>
                            </Link>

                            <p className="text-zinc-400 text-sm mt-2 line-clamp-3">
                                {item.description}
                            </p>

                            <div className="mt-4 pt-4 border-t border-zinc-900 text-xs text-zinc-500">
                                {item.industry || 'N/A'} · {item.funding || 'N/A'}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}