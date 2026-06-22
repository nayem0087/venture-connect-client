"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { updateStartup } from "@/lib/actions/update"; 
import Loading from "@/components/Loading";
import { toast } from "react-hot-toast";
import { getAllStartups } from "@/lib/api/startup";

export default function EditStartupPage({ params: paramsPromise }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    
    const [startup, setStartup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [previewImage, setPreviewImage] = useState("");
    const [startupId, setStartupId] = useState("");

    useEffect(() => {
        async function fetchStartupData() {
            try {
                const resolvedParams = await paramsPromise;
                const currentId = resolvedParams?.id;

                console.log("Extracted ID from URL:", currentId);

                if (!currentId) {
                    toast.error("URL-This id is not found!");
                    setLoading(false);
                    return;
                }

                setStartupId(currentId);

               
                const startups = await getAllStartups();
                console.log("All Startups fetched:", startups);
                
                if (Array.isArray(startups)) {
                    
                    const singleStartup = startups.find(
                        item => String(item._id).trim() === String(currentId).trim()
                    );
                    
                    if (singleStartup) {
                        setStartup(singleStartup);
                        setPreviewImage(singleStartup.logo || "");
                        console.log("✅ Match Found Successfully:", singleStartup);
                    } else {
                        toast.error("This id is not found!");
                    }
                } else {
                    toast.error("Startup data format is not found!");
                }
            } catch (err) {
                console.error("Fetch Error:", err);
                toast.error("something went rong");
            } finally {
                setLoading(false);
            }
        }
        
        fetchStartupData();
    }, [paramsPromise]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

   const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!startupId) {
            toast.error("Startup id missing!");
            return;
        }

        const data = new FormData(e.currentTarget);

        startTransition(async () => {
            data.append("oldLogo", startup?.logo || "");

            const res = await updateStartup(startupId, data);
            
            if (res.success) {
                toast.success("Startup updated successfully!");
                router.push("/dashboard/founder"); 
                router.refresh(); 
            } else {
                toast.error(res.error || "Something went wrong!");
            }
        });
    };

    if (loading) {
        return <Loading />;
    }

    if (!startup) {
        return (
            <div className="min-h-screen bg-[#0d0d0e] text-white flex items-center justify-center">
                <p className="text-zinc-400">No startup data found to edit.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-1">Edit Startup</h1>
                <p className="text-zinc-400 text-sm mb-8">Update your startup details and assets.</p>

                <Card className="bg-[#121214] border border-zinc-900 p-8">
                    <Form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Startup Name */}
                        <TextField name="name" defaultValue={startup.name} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Startup Name *</Label>
                            <Input placeholder="e.g. TechNova" className="bg-[#1c1c1e] h-12 rounded-lg px-3" required />
                        </TextField>

                        {/* Image Upload */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-zinc-400 text-sm">Logo Image</Label>
                            <div className="flex items-center gap-4 p-4 bg-[#1c1c1e] rounded-lg border border-zinc-800">
                                {previewImage ? (
                                    <img 
                                        src={previewImage} 
                                        alt="Logo Preview" 
                                        className="w-16 h-16 object-cover rounded-lg bg-zinc-800"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center text-xs text-zinc-500">
                                        No Logo
                                    </div>
                                )}
                                <label className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold py-2 px-4 rounded transition">
                                    Change Logo
                                    <input 
                                        type="file" 
                                        name="logo" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Industry & Funding */}
                        <div className="grid grid-cols-2 gap-4">
                            <Select 
                                name="industry" 
                                defaultSelectedKeys={[startup.industry || "tech"]} 
                                className="w-full"
                            >
                                <Label className="text-zinc-400 text-sm">Industry *</Label>
                                <Select.Trigger className="bg-[#1c1c1e] h-12 rounded-lg px-3">
                                    <Select.Value />
                                </Select.Trigger>
                                <Select.Popover className="bg-[#1c1c1e] p-2 border border-zinc-800 rounded-lg">
                                    <ListBox>
                                        <ListBox.Item id="tech">Technology</ListBox.Item>
                                        <ListBox.Item id="e-commerce">E-commerce</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <Select 
                                name="funding" 
                                defaultSelectedKeys={[startup.funding || "seed"]} 
                                className="w-full"
                            >
                                <Label className="text-zinc-400 text-sm">Funding Stage *</Label>
                                <Select.Trigger className="bg-[#1c1c1e] h-12 rounded-lg px-3">
                                    <Select.Value />
                                </Select.Trigger>
                                <Select.Popover className="bg-[#1c1c1e] p-2 border border-zinc-800 rounded-lg">
                                    <ListBox>
                                        <ListBox.Item id="seed">Seed</ListBox.Item>
                                        <ListBox.Item id="pro-seed">Pro-seed</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        {/* Founder Email */}
                        <TextField name="email" defaultValue={startup.email} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Founder Email *</Label>
                            <Input type="email" className="bg-[#1c1c1e] h-12 rounded-lg px-3" required />
                        </TextField>

                        {/* Description */}
                        <TextField name="description" defaultValue={startup.description} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Description *</Label>
                            <TextArea placeholder="Describe your mission..." className="bg-[#1c1c1e] p-3 rounded-lg" required />
                        </TextField>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Button 
                                type="button" 
                                onClick={() => router.push("/dashboard/founder")} 
                                className="w-1/2 h-12 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                isDisabled={isPending}
                                className="w-1/2 h-12 bg-purple-700 font-semibold rounded-lg hover:bg-purple-800 text-white"
                            >
                                {isPending ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}