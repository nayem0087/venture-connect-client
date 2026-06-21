"use client";

import React, { useState } from "react";
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
    toast
} from "@heroui/react";
import { createStartup } from "@/lib/actions/startups";
import { redirect } from "next/navigation";


export default function CreateStartupPage() {
    
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
                <h1 className="text-2xl font-semibold mb-1">My Startup</h1>
                <p className="text-zinc-400 text-sm mb-8">Manage your startup profile.</p>

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
                                            <ListBox.Item id="fintech">Fintech</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>

                                <Select name="funding" className="w-full">
                                    <Label className="text-zinc-400 text-sm">Funding Stage</Label>
                                    <Select.Trigger className="bg-[#1c1c1e] h-12 rounded-lg px-3"><Select.Value /></Select.Trigger>
                                    <Select.Popover className="bg-[#1c1c1e] p-2 border border-zinc-800 rounded-lg">
                                        <ListBox>
                                            <ListBox.Item id="seed">Seed</ListBox.Item>
                                            <ListBox.Item id="series-a">Series A</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <TextField name="email" className="flex flex-col gap-1">
                                <Label className="text-zinc-400 text-sm">Founder Email</Label>
                                <Input type="email" className="bg-[#1c1c1e] h-12 rounded-lg px-3" required />
                            </TextField>

                            <TextField name="description" className="flex flex-col gap-1">
                                <Label className="text-zinc-400 text-sm">Description</Label>
                                <TextArea placeholder="Describe your mission..." className="bg-[#1c1c1e] p-3 rounded-lg" required />
                            </TextField>

                            <Button type="submit" className="w-full h-12 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200">
                                Create Startup
                            </Button>
                        </Form>
                    </Card>
            </div>
        </div>
    );
}













// "use client";

// import React, { useState } from "react";
// import { Card, Button, Input, Chip } from "@heroui/react";
// import { PencilToSquare, TrashBin } from "@gravity-ui/icons";
// import StartupManager from "@/components/StartupManager";

// export default function MyStartupPage() {
//     const [startup, setStartup] = useState({
//         name: "AI Core",
//         industry: "AI/ML",
//         stage: "Seed",
//         status: "Approved",
//         description: "AI Core is building a decentralized model hosting platform for high-performance AI inference and serverless training workflows."
//     });

//     return (
//         <div className="p-10 min-h-screen text-white">
//             <div className="max-w-4xl mx-auto">

//                 {/* Header Section with Edit/Delete */}
//                 <div className="flex justify-between items-center mb-6">
//                     <div>
//                         <h1 className="text-3xl font-bold">My <span className="text-purple-500">Startup</span></h1>
//                         <p className="text-gray-400 pt-1">
//                             Create and edit your startup profile at any time.
//                         </p>
//                     </div>
//                     <div className="flex gap-4">
//                         <Button className={'bg-purple-500'} variant="outline"><PencilToSquare /> Edit</Button>
//                         <Button variant="danger-soft"><TrashBin /> Delete</Button>
//                     </div>
//                 </div>

//                 <StartupManager/>

              
//                 <Card className="mb-10 border-gray-800">
//                     <Card.Header className="flex flex-row items-center gap-4 pb-4">
//                         <div className="size-16 bg-purple-900 rounded-xl flex items-center justify-center">Logo</div>
//                         <div>
//                             <Card.Title className="text-2xl font-bold">{startup.name}</Card.Title>
//                             <div className="flex gap-2 mt-2">
//                                 <Chip size="sm" color="secondary">{startup.industry}</Chip>
//                                 <Chip size="sm" variant="flat">{startup.stage}</Chip>
//                                 <Chip size="sm" color="success" variant="flat">{startup.status}</Chip>
//                             </div>
//                         </div>
//                     </Card.Header>
//                     <Card.Content className="px-6 pb-6 text-gray-400">
//                         {startup.description}
//                     </Card.Content>
//                     <Card.Footer />
//                 </Card>
//             </div>
//         </div>
//     );
// }