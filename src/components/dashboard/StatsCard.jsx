import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@heroui/react";

export const StatsCard = ({ title, description, icon }) => {
    return (
        <Card className="w-[320px] h-40 shadow-lg">
            <CardHeader className="flex justify-center pt-6 pb-2">
                <div className="text-purple-500 flex items-center justify-center">
                    {React.cloneElement(icon, { width: 30, height: 30 })}
                </div>
            </CardHeader>
            <CardContent className="text-center pb-8">
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{description}</p>
            </CardContent>
        </Card>
    );
};