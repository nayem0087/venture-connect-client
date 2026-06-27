import React from 'react';
import Link from 'next/link';
import { Briefcase, TrendingUp, User } from 'lucide-react'; 

const DashboardPage = () => {
    const cards = [
        {
            title: "Browse Opportunities",
            description: "Find your perfect startup role",
            icon: <Briefcase className="w-8 h-8 text-purple-400" />,
            href: "/opportunities"
        },
        {
            title: "My Applications",
            description: "Track your application status",
            icon: <TrendingUp className="w-8 h-8 text-green-400" />,
            href: "/dashboard/collaborator/applications"
        },
        {
            title: "Update Profile",
            description: "Showcase your skills and bio",
            icon: <User className="w-8 h-8 text-purple-400" />,
            href: "/dashboard/collaborator/profile"
        }
    ];

    return (
        <div className="min-h-screen bg-black p-8 text-white">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10">
                <h1 className="text-3xl font-bold mb-2">Welcome, Nell 👋</h1>
                <p className="text-gray-400">Discover opportunities and track your applications.</p>
            </div>

            {/* Cards Section */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                    <Link 
                        key={index} 
                        href={card.href}
                        className="bg-[#131224] p-8 rounded-2xl border border-white/10 hover:border-violet-500/50 transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                    >
                        <div className="p-3 bg-white/5 rounded-full">
                            {card.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{card.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;