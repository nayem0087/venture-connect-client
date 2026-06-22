"use client";

import React, { useEffect, useState, useTransition } from "react";
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
import { ArrowUpToLine, Globe, Factory, ArrowRight, Pencil, ChevronDown, TrashBin } from "@gravity-ui/icons";
import { toast } from "react-hot-toast";
import Loading from "@/components/Loading";

import { getAllStartups } from "@/lib/api/startup";
import { createStartup } from "@/lib/actions/startups";
import { updateStartup } from "@/lib/actions/update";

const textInputClass = "w-full bg-[#1c1c1e] text-white rounded-lg px-3 h-12 outline-none border border-zinc-800 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-[#1c1c1e] text-white rounded-lg px-3 h-12 flex items-center justify-between outline-none border border-zinc-800 data-[hover=true]:border-zinc-700";
const popoverClasses = "bg-[#1c1c1e] border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses = "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass = "w-full bg-[#1c1c1e] text-white rounded-lg p-3 outline-none border border-zinc-800 focus:border-zinc-700 transition resize-none";

export default function MyStartupPage() {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedStartup, setSelectedStartup] = useState(null); 
    const [previewImage, setPreviewImage] = useState("");
    const [isPending, startTransition] = useTransition();

    const fetchStartups = async () => {
        try {
            setLoading(true);
            const data = await getAllStartups();
            if (Array.isArray(data)) {
                setStartups(data);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            toast.error("Failed to load startup data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStartups();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        startTransition(async () => {
            if (selectedStartup?._id) {
                formData.append("oldLogo", selectedStartup?.logo || "");
                const res = await updateStartup(selectedStartup._id, formData);
                
                if (res.success) {
                    toast.success("Startup updated successfully!");
                    setIsEditing(false);
                    setSelectedStartup(null);
                    fetchStartups(); 
                } else {
                    toast.error(res.error || "Something went wrong!");
                }
            } else {
                // ➕ 
                const newStartupObj = {
                    name: formData.get("name"),
                    industry: formData.get("industry") || "tech",
                    funding: formData.get("funding") || "seed",
                    email: formData.get("email"),
                    description: formData.get("description"),
                    status: "pending",
                };

                const res = await createStartup(newStartupObj);
                if (res.insertedId) {
                    toast.success("Startup registered successfully!");
                    setIsEditing(false);
                    fetchStartups(); 
                } else {
                    toast.error("Failed to create startup.");
                }
            }
        });
    };

    const startRegistration = () => {
        setSelectedStartup(null);
        setPreviewImage("");
        setIsEditing(true);
    };

    const startEditing = (startupItem) => {
        setSelectedStartup(startupItem);
        setPreviewImage(startupItem.logo || "");
        setIsEditing(true);
    };

    if (loading) return <Loading />;

  
    if (startups.length === 0 && !isEditing) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="max-w-2xl w-full bg-zinc-950 border border-zinc-900 rounded-xl p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-zinc-900/50 rounded-full flex items-center justify-center mx-auto border border-zinc-800">
                        <Factory size={24} className="text-zinc-500" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold text-zinc-200">No Startup Registered Yet</h2>
                        <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                            To start creating structural job posts and tracking incoming pipelines, configure your startup workspace profile.
                        </p>
                    </div>
                    <Button 
                        onPress={startRegistration}
                        className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11 transition-all inline-flex items-center"
                    >
                        Register Startup <ArrowRight size={16} className="ml-1" />
                    </Button>
                </div>
            </div>
        );
    }

    
    if (startups.length > 0 && !isEditing) {
        return (
            <div className="p-4 md:p-10 min-h-screen w-full bg-[#0d0d0e] text-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-3xl font-bold">My Startups</h2>
                            <p className='text-gray-500 mt-1'>View and manage your startup applications.</p>
                        </div>
                        <Button 
                            onPress={startRegistration} 
                            className="bg-purple-700 hover:bg-purple-800 text-white font-medium h-10 px-4 rounded-lg"
                        >
                            + Add New
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                        {startups.map((startup) => {
                            const isStatusApproved = startup.status?.toLowerCase() === 'approved';
                            const isStatusRejected = startup.status?.toLowerCase() === 'rejected';
                            
                            return (
                                <div 
                                    key={startup._id} 
                                    className="bg-[#121214] border border-zinc-900 rounded-2xl p-6 shadow-xl hover:border-zinc-800 transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4 pb-4 border-b border-zinc-900/60">
                                        <div className="flex items-center gap-4">
                                            {startup.logo ? (
                                                <img src={startup.logo} alt={startup.name} className="w-16 h-16 rounded-xl object-contain bg-zinc-900 p-2 border border-zinc-800" />
                                            ) : (
                                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
                                                    {startup.name?.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            
                                            <div>
                                                <h3 className="text-xl font-bold text-white">{startup.name}</h3>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-2.5 py-0.5 rounded-full text-xs font-medium uppercase">{startup.industry}</span>
                                                    <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-2.5 py-0.5 rounded-full text-xs font-medium uppercase">{startup.funding}</span>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border text-center ${
                                                        isStatusApproved ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                                        isStatusRejected ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                                                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                    }`}>
                                                        {startup.status || 'Pending'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 w-full sm:w-auto">
                                            <Button 
                                                onPress={() => startEditing(startup)}
                                                variant="bordered"
                                                className="flex-1 sm:flex-initial border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-4 font-medium h-9 text-xs flex items-center gap-1.5"
                                            >
                                                <Pencil size={14} /> Edit
                                            </Button>
                                            <Button 
                                                variant="light"
                                                className="flex-1 sm:flex-initial bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 rounded-lg px-4 font-medium h-9 text-xs flex items-center gap-1.5"
                                            >
                                                <TrashBin size={14} /> Delete
                                            </Button>
                                        </div>
                                    </div>

                                    <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap bg-zinc-900/20 p-4 rounded-xl border border-zinc-900/50">
                                        {startup.description}
                                    </p>
                                    
                                    {startup.email && (
                                        <div className="mt-4 text-xs text-zinc-500 flex items-center gap-1">
                                            <Globe size={12} /> Contact Email: <span className="text-zinc-400">{startup.email}</span>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

   
    return (
        <div className="min-h-screen bg-[#0d0d0e] text-white py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-1">
                    {selectedStartup ? "Edit Startup" : "My Startup"}
                </h1>
                <p className="text-zinc-400 text-sm mb-8">
                    {selectedStartup ? "Update your startup details and assets." : "Create your startup application."}
                </p>

                <Card className="bg-[#121214] border border-zinc-900 p-8">
                    <Form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Startup Name Input */}
                        <TextField name="name" defaultValue={selectedStartup?.name || ''} className="flex flex-col gap-1">
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
                                <label className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold py-2 px-4 rounded-lg transition inline-flex items-center gap-1">
                                    <ArrowUpToLine size={14} /> Change Logo
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

                        {/* Industry & Funding Select Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Select 
                                name="industry" 
                                className={selectBoxClass}
                                defaultSelectedKeys={[selectedStartup?.industry || "tech"]}
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
                                defaultSelectedKeys={[selectedStartup?.funding || "seed"]}
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

                        {/* Founder Email Input */}
                        <TextField name="email" defaultValue={selectedStartup?.email || ''} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Founder Email *</Label>
                            <Input type="email" placeholder="founder@company.com" className={textInputClass} required />
                        </TextField>

                        {/* Description TextArea */}
                        <TextField name="description" defaultValue={selectedStartup?.description || ''} className="flex flex-col gap-1">
                            <Label className="text-zinc-400 text-sm">Description *</Label>
                            <TextArea 
                                placeholder="Describe your mission and culture..." 
                                rows={4}
                                className={textAreaClass} 
                                required 
                            />
                        </TextField>

                        {/* Form Actions Footer Controls */}
                        <div className="flex gap-4 pt-4 border-t border-zinc-900/80">
                            <Button 
                                type="button" 
                                onClick={() => {
                                    setIsEditing(false);
                                    setSelectedStartup(null);
                                }} 
                                className="w-1/2 h-12 bg-zinc-800 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                isDisabled={isPending}
                                className="w-1/2 h-12 bg-purple-700 font-semibold text-white rounded-lg hover:bg-purple-800 transition-colors"
                            >
                                {isPending ? "Saving..." : selectedStartup ? "Save Changes" : "Create Startup"}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </div>
    );
}


// import { getAllStartups } from '@/lib/api/startup';


// const MyStartupPage = async () => {
//   const startups = await getAllStartups();

//   return (
//     <div className="p-4 md:p-10 min-h-screen w-full text-white">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-3xl font-bold">My Startups</h2>
//         <p className='text-gray-500 mt-1 mb-6'>View your startup application.</p>
        
//         <div className="grid grid-cols-1 gap-6">
//           {startups.map((startup) => (
//             <div 
//               key={startup._id} 
//               className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl hover:border-gray-700 transition-all"
//             >
//               {/* Header: Logo, Title, and Action Buttons (Responsive) */}
//               <div className="flex items-start justify-center gap-6 mb-4">
//                 {/* Logo */}
//                 <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex-shrink-0" />
                
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-xl md:text-2xl font-bold truncate">{startup.name}</h3>
//                   <div className="flex flex-wrap md:gap-6 gap-4 mt-2">
//                     <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium">{startup.industry}</span>
//                     <span className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium">{startup.funding}</span>
//                     <span className="bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border text-center border-green-800">{startup.status}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Description */}
//               <p className="text-gray-400 text-sm leading-relaxed mb-4">
//                 {startup.description}
//               </p>

//               <div className="flex gap-2 w-full pt-4 border-t border-gray-800">
//                 <button className="flex-1 bg-gray-800 hover:bg-green-800 text-white py-2 rounded-lg text-sm font-semibold transition">
//                   Edit
//                 </button>
//                 <button className="flex-1 bg-red-900/20 hover:bg-red-900/40 text-red-400 py-2 rounded-lg text-sm font-semibold transition">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyStartupPage;