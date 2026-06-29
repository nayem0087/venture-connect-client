"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { Button, Pagination } from '@heroui/react';

const LIMIT = 9; // per page

const OpportunitiesViewPage = () => {
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [workType, setWorkType] = useState('All');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const fetchOpportunities = async (currentPage = page) => {
        setLoading(true);
        const query = new URLSearchParams({
            search,
            workType,
            page: currentPage,
            limit: LIMIT
        }).toString();

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/opportunities?${query}`;
        

        try {
            const res = await fetch(url);
            const result = await res.json();
            console.log("API Response:", result);

            if (result?.success) {
                setOpportunities(result.data);
                setTotalPages(result.pagination?.totalPages || 1);
                setTotalItems(result.pagination?.total || 0);
            } else {
                setOpportunities([]);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        const handler = setTimeout(() => fetchOpportunities(1), 500);
        return () => clearTimeout(handler);
    }, [search, workType]);

    useEffect(() => {
        fetchOpportunities(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getPageNumbers = () => {
        const pages = [];
        pages.push(1);
        if (page > 3) pages.push("ellipsis");
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        for (let i = start; i <= end; i++) pages.push(i);
        if (page < totalPages - 2) pages.push("ellipsis");
        if (totalPages > 1) pages.push(totalPages);
        return pages;
    };

    const startItem = totalItems === 0 ? 0 : (page - 1) * LIMIT + 1;
    const endItem = Math.min(page * LIMIT, totalItems);

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-16">
            <div className="text-center pb-8">
                <h1 className="md:text-5xl text-4xl font-extrabold tracking-tight mb-4 text-white">
                    Browse Opportunities
                </h1>
                <p className="text-zinc-400 text-lg">
                    Discover handpicked projects and roles that match your technical expertise.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <input
                        type="text"
                        placeholder="Search by job title..."
                        className="bg-[#0d0d0e] border border-zinc-800 rounded-xl px-4 py-3 w-full max-w-sm outline-none focus:border-purple-500 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className="bg-[#0d0d0e] border border-zinc-800 rounded-xl px-4 py-3 outline-none"
                        onChange={(e) => setWorkType(e.target.value)}
                    >
                        <option value="All">All Types</option>
                        <option value="remote">Remote</option>
                        <option value="on-site">On-site</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center"><Loading /></div>
            ) : opportunities.length === 0 ? (
                <div className="text-center py-20 text-zinc-500">No opportunities found.</div>
            ) : (
                <>
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {opportunities.map((opp) => (
                            <motion.div
                                key={opp._id?.$oid || opp._id}
                                whileHover={{ y: -8, borderColor: "#a855f7" }}
                                className="group relative bg-[#0d0d0e] border border-zinc-800 rounded-3xl p-8"
                            >
                                <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-1">
                                    {opp.title}
                                </h2>
                                <p className="text-zinc-500 text-sm mb-6">Email: {opp.email}</p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    <h2 className="font-semibold text-sm text-gray-300">Skills:</h2>
                                    {opp.skills?.split(',').map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-zinc-900 rounded-lg text-[11px] text-zinc-400 border border-zinc-800 uppercase">
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>

                                <div className="space-y-3 border-t border-zinc-800 pt-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-500">Commitment</span>
                                        <span className="font-semibold text-zinc-200 capitalize">{opp.commitment}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-4">
                                        <span className="text-zinc-500">Work Mode</span>
                                        <span className="font-semibold text-zinc-200 capitalize">{opp.workType}</span>
                                    </div>
                                    <Link href={`/opportunities/${opp._id?.$oid || opp._id}`}>
                                        <Button className="w-full bg-purple-700 text-white">Apply now</Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ── Pagination ── */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex flex-col items-center gap-4">
                            <Pagination className="w-full">
                                <Pagination.Summary className="text-zinc-500 text-sm">
                                    Showing {startItem}–{endItem} of {totalItems} results
                                </Pagination.Summary>
                                <Pagination.Content>
                                    <Pagination.Item>
                                        <Pagination.Previous
                                            isDisabled={page === 1}
                                            onPress={() => handlePageChange(page - 1)}
                                        >
                                            <Pagination.PreviousIcon />
                                            <span>Previous</span>
                                        </Pagination.Previous>
                                    </Pagination.Item>

                                    {getPageNumbers().map((p, i) =>
                                        p === "ellipsis" ? (
                                            <Pagination.Item key={`ellipsis-${i}`}>
                                                <Pagination.Ellipsis />
                                            </Pagination.Item>
                                        ) : (
                                            <Pagination.Item key={p}>
                                                <Pagination.Link
                                                    isActive={p === page}
                                                    onPress={() => handlePageChange(p)}
                                                >
                                                    {p}
                                                </Pagination.Link>
                                            </Pagination.Item>
                                        )
                                    )}

                                    <Pagination.Item>
                                        <Pagination.Next
                                            isDisabled={page === totalPages}
                                            onPress={() => handlePageChange(page + 1)}
                                        >
                                            <span>Next</span>
                                            <Pagination.NextIcon />
                                        </Pagination.Next>
                                    </Pagination.Item>
                                </Pagination.Content>
                            </Pagination>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default OpportunitiesViewPage;










// "use client";
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Loading from '@/components/Loading';
// import Link from 'next/link';
// import { Button } from '@heroui/react';

// const OpportunitiesViewPage = () => {
//     const [opportunities, setOpportunities] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [search, setSearch] = useState('');
//     const [workType, setWorkType] = useState('All');

//     const fetchOpportunities = async () => {
//         setLoading(true);
//         const query = new URLSearchParams({ search, workType }).toString();
//         const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/opportunities?${query}`;

//         console.log("Fetching from:", url);

//         try {
//             const res = await fetch(url);
//             const result = await res.json();
//             // console.log("Response:", result); 

//             if (result?.success) {
//                 setOpportunities(result.data);
//             } else {
//                 setOpportunities([]);
//             }
//         } catch (error) {
//             console.error("Fetch Error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const handler = setTimeout(fetchOpportunities, 500);
//         return () => clearTimeout(handler);
//     }, [search, workType]);

//     return (
//         <div className="min-h-screen bg-black text-white p-6 md:p-16">
//             <div className="text-center pb-8">
//                 <div className='text-center'>
//                     <h1 className="md:text-5xl text-4xl font-extrabold tracking-tight mb-4 bg-clip-text text-white">
//                         Browse Opportunities
//                     </h1>
//                     <p className="text-zinc-400 text-lg">Discover handpicked projects and roles that match your technical expertise.</p>
//                 </div>

//                 <div className="flex flex-wrap justify-center gap-4 mt-8">
//                     <input
//                         type="text"
//                         placeholder="Search by job title..."
//                         className="bg-[#0d0d0e] border border-zinc-800 rounded-xl px-4 py-3 w-full max-w-sm outline-none focus:border-purple-500 transition-all"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                     <select
//                         className="bg-[#0d0d0e] border border-zinc-800 rounded-xl px-4 py-3 outline-none"
//                         onChange={(e) => setWorkType(e.target.value)}
//                     >
//                         <option value="All">All Types</option>
//                         <option value="remote">Remote</option>
//                         <option value="on-site">On-site</option>
//                     </select>
//                 </div>
//             </div>

//             {loading ? <div className="text-center"><Loading /></div> : (
//                 <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {opportunities.map((opp) => (
//                         <motion.div
//                             key={opp._id?.$oid || opp._id}
//                             whileHover={{ y: -8, borderColor: "#a855f7" }}
//                             className="group relative bg-[#0d0d0e] border border-zinc-800 rounded-3xl p-8"
//                         >
//                             <h2 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-1 truncate-options">
//                                 {opp.title}
//                             </h2>
//                             <p className="text-zinc-500 text-sm mb-6">Email: {opp.email}</p>


//                             <div className="flex flex-wrap gap-2 mb-8">
//                                 <h2 className='font-semibold text-sm text-gray-300'>Skills : </h2>
//                                 {opp.skills?.split(',').map((skill, i) => (
//                                     <span key={i} className="px-3 py-1 bg-zinc-900 rounded-lg text-[11px] text-zinc-400 border border-zinc-800 uppercase">
//                                         {skill.trim()}
//                                     </span>
//                                 ))}
//                             </div>


//                             <div className="space-y-3 border-t border-zinc-800 pt-6">
//                                 <div className="flex justify-between text-sm">
//                                     <span className="text-zinc-500">Commitment</span>
//                                     <span className="font-semibold text-zinc-200 capitalize">{opp.commitment}</span>
//                                 </div>
//                                 <div className="flex justify-between text-sm mb-4">
//                                     <span className="text-zinc-500">Work Mode</span>
//                                     <span className="font-semibold text-zinc-200 capitalize">{opp.workType}</span>
//                                 </div>
//                                 <Link href={`/opportunities/${opp._id?.$oid || opp._id}`}>
//                                     <Button className={'w-full bg-purple-700 text-white'}>Apply now</Button>
//                                 </Link>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             )}
//         </div>
//     );
// };

// export default OpportunitiesViewPage;
