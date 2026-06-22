"use client";

import React, { useEffect, useState } from "react";
import {
    Form,
    TextField,
    TextArea,
    Button,
    Label,
    Input,
    Card,
    Select,
    ListBox,
    toast,
    Table
} from "@heroui/react";
import { createStartup } from "@/lib/actions/startups";
import { redirect } from "next/navigation";
import Loading from "@/components/Loading";


export default function CreateStartupPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

    if(isLoading) {
       return <Loading/>
    }
    
  const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        
        const startup = {
            name: formData.get("name"),
            industry: formData.get("industry"),
            funding: formData.get("funding"),
            email: formData.get("email"),
            description: formData.get("description"),
            status: "pending",
        };

        console.log('new', startup);

        // Server action কল করুন
        const res = await createStartup(startup);
        if (res.insertedId) {
            toast.success("Job posted successfully!");
            e.target.reset();
            redirect("/dashboard/founder");
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-1">My Startup</h1>
                <p className="text-zinc-400 text-sm mb-8">Create your startup application.</p>

                    <Card className="bg-[#121214] border border-zinc-900 p-8">
                        <Form onSubmit={handleSubmit} className="space-y-6">
                            <TextField name="name" className="flex flex-col gap-1">
                                <Label className="text-zinc-400 text-sm">Startup Name</Label>
                                <Input placeholder="e.g. TechNova" className="bg-[#1c1c1e] h-12 rounded-lg px-3" required />
                            </TextField>

                            <div className="grid grid-cols-2 gap-4">
                                <Select name="industry" className="w-full">
                                    <Label className="text-zinc-400 text-sm">Industry</Label>
                                    <Select.Trigger className="bg-[#1c1c1e] h-12 rounded-lg px-3"><Select.Value /></Select.Trigger>
                                    <Select.Popover className="bg-[#1c1c1e] p-2 border border-zinc-800 rounded-lg">
                                        <ListBox>
                                            <ListBox.Item id="tech">Technology</ListBox.Item>
                                            <ListBox.Item id="e-commerce">E-commerce</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                <Select name="funding" className="w-full">
                                    <Label className="text-zinc-400 text-sm">Funding Stage</Label>
                                    <Select.Trigger className="bg-[#1c1c1e] h-12 rounded-lg px-3"><Select.Value /></Select.Trigger>
                                    <Select.Popover className="bg-[#1c1c1e] p-2 border border-zinc-800 rounded-lg">
                                        <ListBox>
                                            <ListBox.Item id="seed">Seed</ListBox.Item>
                                            <ListBox.Item id="pro-seed">Pro-seed</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <TextField name="email" className="flex flex-col gap-1">
                                <Label className="text-zinc-400 text-sm">Founder Email</Label>
                                <Input type="email" className="bg-[#1c1c1e] h-12 rounded-lg px-3" required />
                            </TextField>

                            <input type="hidden" name="status" value="pending" />

                            <TextField name="description" className="flex flex-col gap-1">
                                <Label className="text-zinc-400 text-sm">Description</Label>
                                <TextArea placeholder="Describe your mission..." className="bg-[#1c1c1e] p-3 rounded-lg" required />
                            </TextField>

                            <Button type="submit" className="w-full h-12 bg-purple-700 font-semibold rounded-lg hover:bg-purple-800">
                                Create Startup
                            </Button>
                        </Form>
                    </Card>
            </div>
        </div>
    );
}
