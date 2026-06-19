'use client';


import { useSession } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";
import { Card, CardHeader, CardContent } from "@heroui/react";
import { Briefcase, ChartLine, Person } from "@gravity-ui/icons";
import React from "react";


const CollaboratorDashboardHomePage = () => {

    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div className="flex  items-center justify-center min-h-screen">
            <Spinner />
        </div>
    }

    const user = session?.user;
    // console.log("User session data:", session);

    const cardData = [
        {
            title: "Browse Opportunities",
            description: "Find your perfect startup role",
            icon: <Briefcase size={28} />,
        },
        {
            title: "My Applications",
            description: "Track your application status",
            icon: <ChartLine size={28} />,
        },
        {
            title: "Update Profile",
            description: "Showcase your skills and bio",
            icon: <Person size={28} />,
        },
    ];

    return (
        <div>
            <h3 className="text-3xl font-semibold p-4">Welcome back, <span className="text-purple-500">{user?.name}</span>!</h3>
            <p>Discover opportunities and track your progress.</p>
            <div className=" min-h-screen p-10 flex flex-wrap gap-6">
                {cardData.map((item, index) => (
                    <Card key={index} className="flex flex-col items-center w-[320px] h-[200] shadow-lg">
                        <CardHeader className="flex justify-center pt-6 pb-2">
                            <div className="text-purple-500 flex items-center justify-center">
                                {React.cloneElement(item.icon, { width: 30, height: 30 })}
                            </div>
                        </CardHeader>
                        <CardContent className="text-center pb-8">
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-gray-500 text-sm">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CollaboratorDashboardHomePage;