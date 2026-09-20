"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Form,
    TextField,
    TextArea,
    Label,
    Input,
    Select,
    ListBox,
    Button,
    Card
} from "@heroui/react";
import { ArrowUpToLine, ChevronDown } from "@gravity-ui/icons";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";

import { getAllStartups } from "@/lib/api/startup";
import { updateStartup } from "@/lib/actions/update";

const textInputClass = "w-full bg-[#1c1c1e] text-white rounded-lg px-3 h-12 outline-none border border-zinc-800 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-[#1c1c1e] text-white rounded-lg px-3 h-12 flex items-center justify-between outline-none border border-zinc-800 data-[hover=true]:border-zinc-700";
const popoverClasses = "bg-[#1c1c1e] border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass = "w-full bg-[#1c1c1e] text-white rounded-lg p-3 outline-none border border-zinc-800 focus:border-zinc-700 transition resize-none";

export default function EditStartupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const startupId = searchParams.get("id");

    const [startup, setStartup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPending, startTransition] = useTransition();

    const [previewImage, setPreviewImage] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const [selectedIndustry, setSelectedIndustry] = useState("tech");
    const [selectedFunding, setSelectedFunding] = useState("seed");

    useEffect(() => {
        const loadStartup = async () => {
            if (!startupId) {
                toast.error("No startup selected to edit.");
                setLoading(false);
                return;
            }
            try {
                const data = await getAllStartups();
                const found = Array.isArray(data)
                    ? data.find((s) => String(s._id) === String(startupId))
                    : null;

                if (!found) {
                    toast.error("Startup not found.");
                } else {
                    setStartup(found);
                    setPreviewImage(found.logo || "");
                    setLogoUrl(found.logo || "");
                    setSelectedIndustry(found.industry || "tech");
                    setSelectedFunding(found.funding || "seed");
                }
            } catch (err) {
                console.error("Load startup error:", err);
                toast.error("Failed to load startup.");
            } finally {
                setLoading(false);
            }
        };
        loadStartup();
    }, [startupId]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB limit");
            return;
        }

        setPreviewImage(URL.createObjectURL(file));
        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            if (!IMGBB_API_KEY) {
                throw new Error("ImgBB API key is missing in environment variables.");
            }

            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                setLogoUrl(data.data.url);
                toast.success("Logo uploaded successfully!");
            } else {
                toast.error("ImgBB upload failed. Try again.");
            }
        } catch (err) {
            console.error("Upload Error:", err);
            toast.error("Network error during logo upload");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startup?._id) return;

        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const updateData = {
                name: formData.get("name") ? String(formData.get("name")) : "",
                industry: String(selectedIndustry),
                funding: String(selectedFunding),
                email: formData.get("email") ? String(formData.get("email")) : "",
                logo: logoUrl || startup?.logo || "",
                description: formData.get("description") ? String(formData.get("description")) : "",
            };

            const res = await updateStartup(startup._id, updateData);

            if (res && res.success) {
                toast.success("Startup updated successfully!");
                router.push("/dashboard/founder/mystartup");
            } else {
                toast.error(res?.error || "Something went wrong during update!");
            }
        });
    };

    if (loading) return <Loading />;

    if (!startup) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-zinc-400">
                Startup not found.
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

                        <TextField name="name" defaultValue={startup?.name || ""} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Startup Name *</Label>
                            <Input placeholder="e.g. TechNova" className={textInputClass} required />
                        </TextField>

                        <div className="flex flex-col gap-2">
                            <Label className="text-zinc-400 text-sm">Logo Image</Label>
                            <div className="flex items-center gap-4 p-4 bg-[#1c1c1e] rounded-lg border border-zinc-800">
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Logo Preview"
                                        className="w-16 h-16 object-cover rounded-lg bg-zinc-800 border border-zinc-700"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center text-[10px] text-zinc-500 border border-zinc-700">
                                        No Logo
                                    </div>
                                )}
                                <label className={`cursor-pointer bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold py-2 px-4 rounded-lg transition inline-flex items-center gap-1 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <ArrowUpToLine size={14} /> {isUploading ? "Uploading..." : "Update Logo"}
                                    <input
                                        type="file"
                                        name="logo"
                                        accept="image/*"
                                        className="hidden"
                                        disabled={isUploading}
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <Select
                                name="industry"
                                className={selectBoxClass}
                                selectedKeys={[selectedIndustry]}
                                onSelectionChange={(keys) => setSelectedIndustry(Array.from(keys)[0])}
                            >
                                <Label className="text-zinc-400 text-sm mb-1 block">Industry *</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value className="text-white" />
                                    <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="tech" className={listItemClasses} textValue="Technology">Technology</ListBox.Item>
                                        <ListBox.Item id="e-commerce" className={listItemClasses} textValue="E-commerce">E-commerce</ListBox.Item>
                                        <ListBox.Item id="marketing" className={listItemClasses} textValue="Marketing">Marketing</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <Select
                                name="funding"
                                className={selectBoxClass}
                                selectedKeys={[selectedFunding]}
                                onSelectionChange={(keys) => setSelectedFunding(Array.from(keys)[0])}
                            >
                                <Label className="text-zinc-400 text-sm mb-1 block">Funding Stage *</Label>
                                <Select.Trigger className={triggerClasses}>
                                    <Select.Value className="text-white" />
                                    <Select.Indicator><ChevronDown size={16} className="text-zinc-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className={popoverClasses}>
                                    <ListBox className="outline-none">
                                        <ListBox.Item id="seed" className={listItemClasses} textValue="Seed">Seed</ListBox.Item>
                                        <ListBox.Item id="pro-seed" className={listItemClasses} textValue="Pro-seed">Pro-seed</ListBox.Item>
                                        <ListBox.Item id="series-a" className={listItemClasses} textValue="Series A">Series A</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <TextField name="email" defaultValue={startup?.email || ""} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Founder Email *</Label>
                            <Input type="email" placeholder="founder@company.com" className={textInputClass} required />
                        </TextField>

                        <TextField name="description" defaultValue={startup?.description || ""} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Description *</Label>
                            <TextArea
                                placeholder="Describe your mission and culture..."
                                rows={4}
                                className={textAreaClass}
                                required
                            />
                        </TextField>

                        <div className="flex gap-4 pt-4 border-t border-zinc-900/80">
                            <Button
                                type="button"
                                onClick={() => router.push("/dashboard/founder/mystartup")}
                                className="w-1/2 h-12 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isDisabled={isPending || isUploading}
                                className="w-1/2 h-12 bg-purple-700 font-semibold text-white rounded-lg hover:bg-purple-800 transition-colors"
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