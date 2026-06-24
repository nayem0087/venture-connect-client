"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Loading from '@/components/Loading';

const Page = () => {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [industry, setIndustry] = useState('All');

    const fetchStartups = async () => {
        setLoading(true);
        const query = new URLSearchParams({ search, industry }).toString();
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/startups?${query}`;
        
        try {
            const res = await fetch(url);
            const data = await res.json();
            setStartups(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch Error:", error);
            setStartups([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(fetchStartups, 500);
        return () => clearTimeout(handler);
    }, [search, industry]);

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-16">
            <div className="text-center pb-8">
                <h1 className="md:text-5xl text-4xl font-extrabold tracking-tight mb-4 text-white">
                    All Startups
                </h1>
                <p className="text-zinc-400 text-lg">Connecting with all innovative teams scaling their vision.</p>

                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <input 
                        type="text" 
                        placeholder="Search by name or description..." 
                        className="bg-[#0d0d0e] border border-zinc-800 rounded-xl px-4 py-3 w-full max-w-sm outline-none focus:border-purple-500 transition-all"
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select 
                        className="bg-[#0d0d0e] border border-zinc-800 rounded-xl px-4 py-3 outline-none"
                        onChange={(e) => setIndustry(e.target.value)}
                    >
                        <option value="All">All Industries</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Fintech">Fintech</option>
                        <option value="SaaS">SaaS</option>
                    </select>
                </div>
            </div>

            {loading ? <div className="text-center"><Loading /></div> : (
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {startups.map((startup) => (
                        <motion.div
                            key={startup._id.$oid || startup._id}
                            whileHover={{ y: -8, borderColor: "#a855f7" }}
                            className="bg-[#0d0d0e] border border-zinc-800 rounded-3xl p-8"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <img src={startup.logo} alt={startup.name} className="w-14 h-14 rounded-xl object-cover bg-zinc-900 border border-zinc-800" />
                                <div>
                                    <h2 className="text-xl font-bold">{startup.name}</h2>
                                    <p className="text-xs text-zinc-500 font-mono">{startup.email}</p>
                                </div>
                            </div>
                            <p className="text-zinc-400 text-sm mb-6 line-clamp-3">{startup.description}</p>
                            <div className="pt-4 border-t border-zinc-800 flex gap-2">
                                <span className="px-3 py-1 bg-zinc-900 rounded-lg text-[11px] text-zinc-400 border border-zinc-800 uppercase">{startup.industry}</span>
                                <span className="px-3 py-1 bg-purple-950/20 rounded-lg text-[11px] text-purple-400 border border-purple-900/30 uppercase">{startup.funding}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Page;







// "use client";

// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Loading from '@/components/Loading';


// const Page = () => {
//     const [startups, setStartups] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchAllStartups = async () => {
//             try {
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/startups`);
//                 const data = await res.json();
//                 setStartups(data);
//             } catch (error) {
//                 console.error("Error fetching all:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAllStartups();
//     }, []);

//     if (loading) return <div className="text-white p-10 text-center"><Loading/></div>;

//     return (
//         <div className="p-6 md:p-12 bg-black min-h-screen">
//             <div className='text-center pb-10'>
//                 <h1 className="md:text-5xl text-3xl font-bold text-white mb-2">All Startups</h1>
//                 <p className="text-zinc-500">Connecting with all innovative teams scaling their vision.</p>
//             </div>

//             <motion.div
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5 }}
//             >
//                 {startups.map((startup, index) => (
//                     <motion.div
//                         key={startup._id.$oid || startup._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                         whileHover={{ y: -8 }}
//                         className="bg-[#121214] border border-zinc-800 rounded-2xl p-6 cursor-pointer hover:border-purple-500/50 transition-colors shadow-lg"
//                     >
//                         <div className="flex items-start gap-4 mb-4">
//                             <motion.img
//                                 whileHover={{ scale: 1.05 }}
//                                 src={startup.logo}
//                                 alt={startup.name}
//                                 className="w-14 h-14 rounded-xl object-cover bg-zinc-900 border border-zinc-800"
//                             />
//                             <div>
//                                 <h2 className="text-lg font-bold text-white">{startup.name}</h2>
//                                 <p className="text-xs text-zinc-500 font-mono">{startup.email}</p>
//                             </div>
//                         </div>

//                         <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-3">
//                             {startup.description}
//                         </p>

//                         <div className="flex gap-2 pt-4 border-t border-zinc-900">
//                             <span className="bg-zinc-900/50 text-zinc-300 text-[11px] px-3 py-1 rounded-md border border-zinc-800 font-medium tracking-wide">
//                                 {startup.industry}
//                             </span>
//                             <span className="bg-purple-950/20 text-purple-400 text-[11px] px-3 py-1 rounded-md border border-purple-900/30 font-medium tracking-wide">
//                                 {startup.funding}
//                             </span>
//                         </div>
//                     </motion.div>
//                 ))}
//             </motion.div>
//         </div>
//     );
// };

// export default Page;