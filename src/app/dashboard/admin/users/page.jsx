"use client";

import { useEffect, useState } from "react";
import { Table, Button, Chip, Spinner } from "@heroui/react";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // এখানে 5000 পোর্টটি আপনার এক্সপ্রেস সার্ভারের পোর্ট অনুযায়ী পরিবর্তন করুন
        fetch('http://localhost:5000/api/users')
            .then(res => {
                if (!res.ok) throw new Error("Network error");
                return res.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    const handleToggleBlock = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
        await fetch(`/api/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        setUsers(users.map(u => u._id === id ? { ...u, status: newStatus } : u));
    };

    if (loading) return <div className="flex justify-center p-10"><Spinner /></div>;

    return (
        <div className="p-8 bg-[#0B0B0F] text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Users management table">
                        <Table.Header>
                            <Table.Column>USER</Table.Column>
                            <Table.Column>EMAIL</Table.Column>
                            <Table.Column>ROLE</Table.Column>
                            <Table.Column>STATUS</Table.Column>
                            <Table.Column>ACTIONS</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {users.map((user) => (
                                <Table.Row key={user._id}>
                                    <Table.Cell>{user.name}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>
                                        <Chip size="sm" variant="flat">{user.role}</Chip>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Chip color={user.status === 'Active' ? 'success' : 'danger'} size="sm">
                                            {user.status}
                                        </Chip>
                                        <button size="sm" className={'bg-green-200 px-2 rounded-full text-black'}>Active</button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            size="sm"
                                            color={user.status === 'Active' ? 'danger' : 'success'}
                                            variant="flat"
                                            onPress={() => handleToggleBlock(user._id, user.status)}
                                        >
                                            {user.status === 'Active' ? 'Unblock' : 'Block'}
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
                <Table.Footer>
                    <div className="p-4 text-sm text-gray-400">
                        Total registered users: {users.length}
                    </div>
                </Table.Footer>
            </Table>
        </div>
    );
}