"use client";

import React, { useEffect, useState } from "react";
import {
    Form,
    TextField,
    Button,
    Label,
    Input,
    Card,
    Select,
    ListBox
} from "@heroui/react";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";
import { createOpportunities } from "@/lib/actions/opportunities";
import { getAllOpportunities } from "@/lib/actions/jobs";

const FREE_LIMIT = 3;

export default function CreateOpportunitiesPage({ founder }) {
    const [isLoading, setIsLoading] = useState(true);
    const [myJobCount, setMyJobCount] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);

    // founder.isPremium বা plan চেক করে initial premium state সেট
    const isPremium = founder?.isPremium === true || founder?.plan === 'founder_premium';
    const founderEmail = founder?.email;

    useEffect(() => {
        async function init() {
            try {
                const res = await getAllOpportunities();
                if (res.success && founderEmail) {
                    const mine = res.data.filter((j) => j.founderEmail === founderEmail);
                    setMyJobCount(mine.length);
                }
            } catch {
                // silent
            } finally {
                setIsLoading(false);
            }
        }
        init();
    }, [founderEmail]);

    if (isLoading) return <Loading />;

    const isPremiumRequired = !isPremium && myJobCount >= FREE_LIMIT;

    // Stripe checkout page redirect
    const handleUpgradeRedirect = async () => {
        setIsRedirecting(true);
        try {
            window.location.href = '/plan';
        } catch {
            toast.error("Redirect failed. Try again.");
            setIsRedirecting(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isPremiumRequired) {
            toast.error("Please upgrade to post more opportunities.");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const opportunities = {
            title:        String(formData.get("title")      ?? ""),
            skills:       String(formData.get("skills")     ?? ""),
            workType:     String(formData.get("workType")   ?? ""),
            commitment:   String(formData.get("commitment") ?? ""),
            deadline:     String(formData.get("deadline")   ?? ""),
            status:       "active",
            founderEmail: founderEmail ?? "",
            founderName:  founder?.name ?? "",
        };

        try {
            const res = await createOpportunities(opportunities);
            if (res.insertedId) {
                toast.success("Opportunity posted successfully!");
                setMyJobCount((c) => c + 1);
                e.target.reset();
            } else {
                toast.error("Failed to post opportunity. Try again.");
            }
        } catch {
            toast.error("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const slotsUsed  = isPremium ? myJobCount : Math.min(myJobCount, FREE_LIMIT);
    const slotsLabel = isPremium
        ? `${myJobCount} posted (unlimited ⚡)`
        : `${slotsUsed}/${FREE_LIMIT} free slots used`;

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-1">Add Opportunity</h1>
                <p className="text-zinc-400 text-sm mb-8">
                    Post a role for your startup.{" "}
                    <span className="text-amber-500/80">({slotsLabel})</span>
                </p>

                <Card className="bg-[#121214] border border-zinc-900 p-8 max-w-2xl mx-auto">

                    {/* ── Premium gate banner ── */}
                    {isPremiumRequired && (
                        <div className="mb-6 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-3">
                            <p className="text-amber-400 text-sm font-semibold">⚡ Premium Required</p>
                            <p className="text-zinc-400 text-sm">
                                You've used all {FREE_LIMIT} free opportunity slots. Upgrade to post unlimited opportunities.
                            </p>
                            <button
                                onClick={handleUpgradeRedirect}
                                disabled={isRedirecting}
                                className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-black font-semibold text-sm px-4 py-2 rounded-lg transition"
                            >
                                {isRedirecting ? "Redirecting…" : "Upgrade — $49.99"}
                            </button>
                        </div>
                    )}

                    <Form onSubmit={handleSubmit} className="space-y-6">

                        <TextField name="title" className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Role Title *</Label>
                            <Input
                                placeholder="e.g. Senior React Developer"
                                className="bg-[#1c1c1e] text-white h-12 rounded-lg px-3 outline-none border border-zinc-800/50 focus:border-purple-600 transition"
                                required
                                disabled={isPremiumRequired}
                            />
                        </TextField>

                        <TextField name="skills" className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">
                                Required Skills *{" "}
                                <span className="text-zinc-500 text-xs">(comma-separated)</span>
                            </Label>
                            <Input
                                placeholder="e.g. React, TypeScript, Node.js"
                                className="bg-[#1c1c1e] text-white h-12 rounded-lg px-3 outline-none border border-zinc-800/50 focus:border-purple-600 transition"
                                required
                                disabled={isPremiumRequired}
                            />
                        </TextField>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select name="workType" className="w-full" isDisabled={isPremiumRequired}>
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

                            <Select name="commitment" className="w-full" isDisabled={isPremiumRequired}>
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

                        <TextField name="deadline" className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Application Deadline *</Label>
                            <Input
                                type="date"
                                className="bg-[#1c1c1e] text-white h-12 rounded-lg px-3 outline-none border border-zinc-800/50 focus:border-purple-600 transition dark:[color-scheme:dark]"
                                required
                                disabled={isPremiumRequired}
                            />
                        </TextField>

                        <Button
                            type="submit"
                            isDisabled={isPremiumRequired || isSubmitting}
                            className="w-full h-12 bg-purple-700 font-semibold rounded-lg hover:bg-purple-800 text-white flex items-center justify-center gap-2 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="text-lg">⊕</span>
                            {isSubmitting ? "Posting…" : "Post Opportunity"}
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
}