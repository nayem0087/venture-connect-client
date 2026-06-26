"use client";

import { useEffect, useState } from "react";
import { Card, Button, Avatar, Chip, Spinner } from "@heroui/react";

const ManageStartupsPage = () => {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStartups = () => {
        fetch(`http://localhost:5000/api/startups`)
            .then(res => res.json())
            .then(data => {
                setStartups(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStartups();
    }, []);

    const handleAction = async (id, actionType) => {
        if (actionType === 'Approved') {
            await fetch(`http://localhost:5000/api/startups/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Approved' })
            });
            fetchStartups();
        } 
        else if (actionType === 'Rejected') {
            await fetch(`http://localhost:5000/api/startups/${id}`, {
                method: 'DELETE'
            });
            setStartups(startups.filter(s => s._id !== id));
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Manage Startups</h1>
            <p className="text-gray-500 mb-6">{startups.length} startups found</p>

            {loading ? (
                <div className="flex justify-center p-10"><Spinner /></div>
            ) : (
                <div className="flex flex-col gap-4">
                    {startups.map((s) => (
                        <Card key={s._id} className="w-full p-4 border shadow-none">
                            <div className="flex flex-row items-center justify-between w-full">
                                
                                <Card.Header className="flex flex-row items-center gap-4 w-auto">
                                    <Avatar src={s.logo} size="lg" radius="md" />
                                    <div className="flex flex-col">
                                        <Card.Title className="text-lg font-bold">{s.name}</Card.Title>
                                        <div className="flex gap-2 items-center mt-1">
                                            <Chip size="sm" variant="flat" color="secondary">{s.industry}</Chip>
                                            <Chip size="sm" variant="flat" color="default">{s.funding}</Chip>
                                            <span className="text-gray-500 text-sm ml-2">Email: {s.email}</span>
                                        </div>
                                    </div>
                                </Card.Header>

                                <Card.Footer className="flex flex-row gap-2 w-auto justify-end">
                                    {s.status === 'Approved' ? (
                                        <Chip className="px-2 py-1 bg-green-700 text-white" color="success" variant="flat" size="sm">
                                            Approved
                                        </Chip>
                                    ) : (
                                        <>
                                            <Button 
                                                className="bg-green-500 text-white" 
                                                size="sm" 
                                                onPress={() => handleAction(s._id, 'Approved')}
                                            >
                                                Approve
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                onPress={() => handleAction(s._id, 'Rejected')}
                                            >
                                                Reject
                                            </Button>
                                        </>
                                    )}
                                </Card.Footer>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageStartupsPage;