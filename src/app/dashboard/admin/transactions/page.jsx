"use client";

import { useEffect, useState } from "react";
import { Table, Chip, Card, Spinner } from "@heroui/react";

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            // Plain client-side fetch to the Next.js Route Handler at
            // app/api/transactions/route.js — NOT the 'use server' Server
            // Action. Server Actions go through an RSC POST wire-protocol
            // call that is fragile when polled on an interval under
            // Turbopack dev hot-reload (causes "Failed to fetch").
            const res = await fetch('/api/transactions', { cache: 'no-store' });
            if (!res.ok) throw new Error(`Request failed: ${res.status}`);
            const data = await res.json();
            setTransactions(data || []);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();

        // রিয়েল-টাইম আপডেটের জন্য প্রতি ১০ সেকেন্ডে রিফ্রেশ
        const interval = setInterval(fetchTransactions, 10000);
        return () => clearInterval(interval);
    }, []);

    // টোটাল রেভিনিউ ক্যালকুলেশন
    const totalRevenue = transactions.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Transactions</h1>

            {/* রেভিনিউ কার্ড */}
            <Card className="p-6 mb-8 w-64 shadow-sm border border-gray-200 rounded-2xl bg-white">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h2 className="text-3xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</h2>
            </Card>

            {loading ? (
                <div className="flex justify-center p-10"><Spinner /></div>
            ) : (
                <Card className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
                    <Table className="shadow-none">
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Transactions table">
                                <Table.Header>
                                    <Table.Column id="user">USER</Table.Column>
                                    <Table.Column id="amount">AMOUNT</Table.Column>
                                    <Table.Column id="date">DATE</Table.Column>
                                    <Table.Column id="status">PAYMENT STATUS</Table.Column>
                                </Table.Header>
                                <Table.Body
                                    items={transactions}
                                    renderEmptyState={() => (
                                        <p className="text-center py-6 text-gray-500">No transactions to display.</p>
                                    )}
                                >
                                    {(t) => (
                                        <Table.Row id={t._id}>
                                            <Table.Cell className="text-gray-700">
                                                {t.email || t.userEmail}
                                            </Table.Cell>
                                            <Table.Cell className="font-medium text-gray-900">
                                                ${t.amount}
                                            </Table.Cell>
                                            <Table.Cell className="text-gray-500">
                                                {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A'}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Chip
                                                    color={t.status === 'failed' ? 'danger' : t.status === 'pending' ? 'warning' : 'success'}
                                                    variant="flat"
                                                    size="sm"
                                                >
                                                    {t.status || 'Completed'}
                                                </Chip>
                                            </Table.Cell>
                                        </Table.Row>
                                    )}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                </Card>
            )}
        </div>
    );
};

export default TransactionsPage;