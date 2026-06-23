'use client';

import React, { useEffect, useState } from 'react';
import { Form, TextField, Button, Label, Input, Select, ListBox, toast } from '@heroui/react';
import { Pencil, TrashBin, Globe, Clock, Calendar, ChevronDown, HardDrive } from '@gravity-ui/icons';
import { getAllOpportunities, updateOpportunity, deleteOpportunity } from '@/lib/actions/jobs';
import Loading from "@/components/Loading";

// Layout Shared Style Constants
const textInputClass = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition text-sm";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses = "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700 h-9 text-sm";
const popoverClasses = "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[180px]";
const listItemClasses = "text-zinc-300 px-3 py-1.5 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900 text-sm";

export default function OpportunitiesPage() {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingId, setEditingId] = useState(null); 

    useEffect(() => {
        async function loadJobs() {
            const res = await getAllOpportunities();
            if (res.success) {
                setJobs(res.data);
            } else {
                toast.error("Failed to load data");
            }
            setIsLoading(false);
        }
        loadJobs();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this?")) return;
        
        try {
            const res = await deleteOpportunity(id);
            if (res.success) {
                setJobs(prev => prev.filter(job => job._id !== id));
                toast.success("Deleted successfully!");
            } else {
                toast.error("Failed to delete");
            }
        } catch (error) {
            toast.error("An error occurred while deleting");
        }
    };

    const handleUpdateSubmit = async (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        const updatedPayload = {
            title: String(formData.get("title")),
            skills: String(formData.get("skills")),
            workType: formData.get("workType") || "remote",
            commitment: formData.get("commitment") || "full-time",
            deadline: String(formData.get("deadline")),
        };

        try {
            const res = await updateOpportunity(id, updatedPayload);
            if (res.success) {
                setJobs(prev => prev.map(job => job._id === id ? { ...job, ...updatedPayload } : job));
                setEditingId(null); 
                toast.success("Updated successfully!");
            } else {
                toast.error("Update failed");
            }
        } catch (error) {
            toast.error("An error occurred while updating");
        }
    };

    if (isLoading) return <Loading />;

    return (
        <div className="max-w-5xl mx-auto my-8 px-4 space-y-6">
            <div className="border-b border-zinc-900 pb-5">
                <h1 className="text-2xl font-bold text-white tracking-tight">Manage Opportunities</h1>
                <p className="text-zinc-500 text-sm mt-1">{jobs.length} opportunity(s) posted.</p>
            </div>

            <div className="space-y-4">
                {jobs.length === 0 ? (
                    <div className="text-center py-12 bg-zinc-950 border border-zinc-900 rounded-xl text-zinc-500">
                        No opportunities found.
                    </div>
                ) : (
                    jobs.map((item) => {
                        const isEditing = editingId === item._id;
                        const skillsArray = item.skills ? item.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

                        if (isEditing) {
                            return (
                                <div key={item._id} className="w-full bg-zinc-950 border border-purple-900/40 rounded-xl p-5 transition-all">
                                    <Form onSubmit={(e) => handleUpdateSubmit(e, item._id)} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <TextField name="title" defaultValue={item.title} className="flex flex-col gap-1">
                                                <Label className="text-zinc-400 text-xs font-medium">Role Title</Label>
                                                <Input className={textInputClass} required />
                                            </TextField>
                                            
                                            <TextField name="skills" defaultValue={item.skills} className="flex flex-col gap-1">
                                                <Label className="text-zinc-400 text-xs font-medium">Skills (comma-separated)</Label>
                                                <Input className={textInputClass} required />
                                            </TextField>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <Select className={selectBoxClass} name="workType" defaultSelectedKeys={[item.workType || "remote"]}>
                                                <Label className="text-zinc-400 text-xs font-medium mb-1">Work Type</Label>
                                                <Select.Trigger className={triggerClasses}>
                                                    <Select.Value className="text-white" />
                                                    <Select.Indicator><ChevronDown size={14} className="text-zinc-500" /></Select.Indicator>
                                                </Select.Trigger>
                                                <Select.Popover className={popoverClasses}>
                                                    <ListBox className="outline-none">
                                                        <ListBox.Item id="remote" className={listItemClasses} textValue="Remote">Remote</ListBox.Item>
                                                        <ListBox.Item id="on-site" className={listItemClasses} textValue="On-site">On-site</ListBox.Item>
                                                        <ListBox.Item id="hybrid" className={listItemClasses} textValue="Hybrid">Hybrid</ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>

                                            <Select className={selectBoxClass} name="commitment" defaultSelectedKeys={[item.commitment || "full-time"]}>
                                                <Label className="text-zinc-400 text-xs font-medium mb-1">Commitment</Label>
                                                <Select.Trigger className={triggerClasses}>
                                                    <Select.Value className="text-white" />
                                                    <Select.Indicator><ChevronDown size={14} className="text-zinc-500" /></Select.Indicator>
                                                </Select.Trigger>
                                                <Select.Popover className={popoverClasses}>
                                                    <ListBox className="outline-none">
                                                        <ListBox.Item id="full-time" className={listItemClasses} textValue="Full-time">Full-time</ListBox.Item>
                                                        <ListBox.Item id="part-time" className={listItemClasses} textValue="Part-time">Part-time</ListBox.Item>
                                                        <ListBox.Item id="contract" className={listItemClasses} textValue="Contract">Contract</ListBox.Item>
                                                        <ListBox.Item id="internship" className={listItemClasses} textValue="Internship">Internship</ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>

                                            <TextField name="deadline" defaultValue={item.deadline} className="flex flex-col gap-1">
                                                <Label className="text-zinc-400 text-xs font-medium">Deadline</Label>
                                                <Input type="date" className={`${textInputClass} dark:[color-scheme:dark]`} required />
                                            </TextField>
                                        </div>

                                        <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
                                            <Button size="sm" variant="bordered" className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 rounded-lg" onPress={() => setEditingId(null)}>
                                                Cancel
                                            </Button>
                                            <Button size="sm" type="submit" className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg flex items-center gap-1.5">
                                                <HardDrive size={14} /> Save
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            );
                        }

                        return (
                            <div key={item._id} className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:border-zinc-800">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-white tracking-wide">{item.title}</h3>
                                    {skillsArray.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {skillsArray.map((skill, idx) => (
                                                <span key={idx} className="bg-purple-950/40 text-purple-300 border border-purple-900/50 text-xs px-2.5 py-1 rounded-md font-medium">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500">
                                        <div className="flex items-center gap-1.5 capitalize">
                                            <Globe size={13} className="text-zinc-600" />
                                            <span>{item.workType}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 capitalize">
                                            <Clock size={13} className="text-zinc-600" />
                                            <span>{item.commitment?.replace('-', ' ')}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={13} className="text-zinc-600" />
                                            <span>Deadline: {item.deadline}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-zinc-900 pt-3 sm:pt-0">
                                    <Button isIconOnly variant="bordered" className="border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-lg h-9 w-9 min-w-0" onPress={() => setEditingId(item._id)}>
                                        <Pencil size={15} />
                                    </Button>
                                    <Button isIconOnly variant="bordered" className="border-zinc-800/80 text-rose-400 hover:bg-rose-950/20 hover:border-rose-900/50 rounded-lg h-9 w-9 min-w-0" onPress={() => handleDelete(item._id)}>
                                        <TrashBin size={15} />
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}