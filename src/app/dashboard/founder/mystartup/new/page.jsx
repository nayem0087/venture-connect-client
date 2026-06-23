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
    ListBox
} from "@heroui/react";
import { toast } from "react-hot-toast"; // আপনার প্রজেক্ট অনুযায়ী react-hot-toast ব্যবহার করা হয়েছে
import { redirect } from "next/navigation";
import Loading from "@/components/Loading";
import { createOpportunities } from "@/lib/actions/opportunities";

export default function CreateOpportunitiesPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const opportunities = {
            title: formData.get("title") ? String(formData.get("title")) : "",
            email: formData.get("email") ? String(formData.get("email")) : "", // নতুন ইমেইল ফিল্ড
            skills: formData.get("skills") ? String(formData.get("skills")) : "",
            workType: formData.get("workType") ? String(formData.get("workType")) : "",
            commitment: formData.get("commitment") ? String(formData.get("commitment")) : "",
            deadline: formData.get("deadline") ? String(formData.get("deadline")) : "",
            status: "active", 
        };

        console.log('new', opportunities);

        const res = await createOpportunities(opportunities);
        if (res.insertedId) {
            toast.success("Job posted successfully!");
            e.target.reset();
            redirect("/dashboard/founder/mystartup/new/opportunities");
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-1">My Opportunities</h1>
                <p className="text-zinc-400 text-sm mb-8">Create your opportunities application.</p>

                <Card className="bg-[#121214] border border-zinc-900 p-8 max-w-2xl mx-auto">
                    
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-white">Add Opportunity</h2>
                        <p className="text-zinc-500 text-xs mt-1">
                            Post a role for your startup. <span className="text-amber-500/80">(2/3 free slots used)</span>
                        </p>
                    </div>

                    <Form onSubmit={handleSubmit} className="space-y-6">
                        {/* ১. Role Title */}
                        <TextField name="title" className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Role Title *</Label>
                            <Input
                                placeholder="e.g. Senior React Developer"
                                className="bg-[#1c1c1e] text-white h-12 rounded-lg px-3 outline-none border border-zinc-800/50 focus:border-purple-600 transition"
                                required
                            />
                        </TextField>

                        {/* ২. Contact/Founder Email (নতুন যুক্ত করা হয়েছে) */}
                        <TextField name="email" className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Contact Email *</Label>
                            <Input
                                type="email"
                                placeholder="e.g. founder@startup.com"
                                className="bg-[#1c1c1e] text-white h-12 rounded-lg px-3 outline-none border border-zinc-800/50 focus:border-purple-600 transition"
                                required
                            />
                        </TextField>

                        {/* ৩. Required Skills */}
                        <TextField name="skills" className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Required Skills * <span className="text-zinc-500 text-xs">(comma-separated)</span></Label>
                            <Input
                                placeholder="e.g. React, TypeScript, Node.js"
                                className="bg-[#1c1c1e] text-white h-12 rounded-lg px-3 outline-none border border-zinc-800/50 focus:border-purple-600 transition"
                                required
                            />
                        </TextField>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Work Type */}
                            <Select name="workType" className="w-full">
                                <Label className="text-zinc-400 text-sm">Work Type *</Label>
                                <Select.Trigger className="bg-[#1c1c1e] text-white h-12 rounded-lg px-3 border border-zinc-800/50 flex items-center justify-between">
                                    <Select.Value placeholder="Select type" />
                                </Select.Trigger>
                                <Select.Popover className="bg-[#1c1c1e] p-2 border border-zinc-800 rounded-lg text-white">
                                    <ListBox>
                                        <ListBox.Item id="remote">Remote</ListBox.Item>
                                        <ListBox.Item id="on-site">On-site</ListBox.Item>
                                        <ListBox.Item id="hybrid">Hybrid</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            {/* Commitment Level */}
                            <Select name="commitment" className="w-full">
                                <Label className="text-zinc-400 text-sm">Commitment Level *</Label>
                                <Select.Trigger className="bg-[#1c1c1e] text-white h-12 rounded-lg px-3 border border-zinc-800/50 flex items-center justify-between">
                                    <Select.Value placeholder="Select level" />
                                </Select.Trigger>
                                <Select.Popover className="bg-[#1c1c1e] p-2 border border-zinc-800 rounded-lg text-white">
                                    <ListBox>
                                        <ListBox.Item id="full-time">Full-time</ListBox.Item>
                                        <ListBox.Item id="part-time">Part-time</ListBox.Item>
                                        <ListBox.Item id="contract">Contract</ListBox.Item>
                                        <ListBox.Item id="internship">Internship</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* ৫. Application Deadline */}
                        <TextField name="deadline" className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Application Deadline *</Label>
                            <Input
                                type="date"
                                className="bg-[#1c1c1e] text-white h-12 rounded-lg px-3 outline-none border border-zinc-800/50 focus:border-purple-600 transition dark:[color-scheme:dark]"
                                required
                            />
                        </TextField>

                        <input type="hidden" name="status" value="active" />

                        <Button type="submit" className="w-full h-12 bg-purple-700 font-semibold rounded-lg hover:bg-purple-800 text-white flex items-center justify-center gap-2 transition-all mt-2">
                            <span className="text-lg">⊕</span> Post Opportunity
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
}