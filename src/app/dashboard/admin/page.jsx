"use client";

import { useEffect, useState } from "react";
import { Card, Spinner } from "@heroui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const AdminDashboardHomePage = () => {
    const [stats, setStats] = useState({ users: 0, startups: 0, opportunities: 0, revenue: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, startupsRes, oppsRes, paymentsRes] = await Promise.all([
                    fetch("http://localhost:5000/api/users"),
                    fetch("http://localhost:5000/api/startups"),
                    fetch("http://localhost:5000/api/opportunities"),
                    fetch("http://localhost:5000/api/payments"),
                ]);

                const users = await usersRes.json();
                const startups = await startupsRes.json();
                const opportunities = await oppsRes.json();
                const payments = await paymentsRes.json();
                
                const oppCount = opportunities?.pagination?.total
                    ?? (Array.isArray(opportunities?.data) ? opportunities.data.length : 0);

                const totalRevenue = Array.isArray(payments)
                    ? payments.reduce((sum, p) => sum + Number(p.amount || 0), 0)
                    : 0;

                setStats({
                    users: Array.isArray(users) ? users.length : 0,
                    startups: Array.isArray(startups) ? startups.length : 0,
                    opportunities: oppCount,
                    revenue: totalRevenue.toFixed(2),
                });
            } catch (err) {
                console.error("Dashboard Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const data = [
        { name: "Users", value: stats.users },
        { name: "Startups", value: stats.startups },
        { name: "Opportunities", value: stats.opportunities },
    ];

    const COLORS = ["#3B82F6", "#8B5CF6", "#10B981"];

    if (loading) return <div className="flex justify-center p-20"><Spinner size="lg" /></div>;

    return (
        <div className="p-8 bg-[#0B0B0F] text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Total Users", val: stats.users },
                    { label: "Total Startups", val: stats.startups },
                    { label: "Opportunities", val: stats.opportunities },
                    { label: "Total Revenue", val: `$${stats.revenue}` },
                ].map((item, idx) => (
                    <Card key={idx} className="p-6 border border-zinc-800 bg-zinc-900">
                        <p className="text-gray-400 text-sm uppercase">{item.label}</p>
                        <h2 className="text-3xl font-bold mt-2">{item.val}</h2>
                    </Card>
                ))}
            </div>

            <Card className="p-8 border border-zinc-800 bg-zinc-900">
                <h3 className="text-xl font-bold mb-6">Platform Distribution</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={data} innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value" cornerRadius={10}>
                                {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboardHomePage;