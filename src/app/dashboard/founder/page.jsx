'use client';

import { StatsCard } from "@/components/dashboard/StatsCard";
import { useSession } from "@/lib/auth-client";
import { Briefcase, ChartLine, Person } from "@gravity-ui/icons";
import { Spinner } from "@heroui/react";

export default function FounderDashboardHomePage() {
    const statsData = [
        { title: "Browse", description: "Find role", icon: <Briefcase /> },
        { title: "Applications", description: "Track status", icon: <ChartLine /> },
        { title: "Profile", description: "Update bio", icon: <Person /> },
    ];

    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex  items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-white text-3xl font-bold pt-6 pl-6">Welcome, <span className="text-purple-500">{session?.user?.name}</span>!</h2>
            <div className="bg-black min-h-screen p-10 flex gap-6">
                {statsData.map((item, index) => (
                    <StatsCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                    />
                ))}
            </div>
        </div>
    );
}