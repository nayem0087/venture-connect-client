'use client';
import React, { useState } from 'react';
// Hero UI Components (v3.1.0 atomic anatomy)
import { Form, Button, TextField, Label, Input, Description, FieldError } from '@heroui/react';
// Gravity UI Icons for a polished look
import { ArrowRight, Link, FileText, LayoutHeaderCells } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';

const JobApply = ({ opportunity, user }) => {
    const [formData, setFormData] = useState({
        resumeLink: '',
        portfolioLink: '',
        additionalNotes: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    if (!opportunity) {
        return <p className=""><Loading /></p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.resumeLink.trim()) {
            return toast.error("Please provide your resume link!");
        }

        setIsLoading(true);

        const applicationData = {
            opportunityId: opportunity?._id,
            opportunityTitle: opportunity?.title,
            industry: opportunity?.industry,
            companyEmail: opportunity?.email,
            applicantName: user?.name,
            applicantEmail: user?.email,
            applicantImage: user?.image,
            coverLetter: formData.additionalNotes,
            portfolioUrl: formData.portfolioLink,
            resumeUrl: formData.resumeLink,
            appliedAt: new Date()
        };

        console.log('Submitting Application:', applicationData);

        try {
            const res = await fetch('http://localhost:5000/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(applicationData),
            });

            if (res.ok) {
                toast.success("Application submitted successfully!");
                setFormData({ resumeLink: '', portfolioLink: '', additionalNotes: '' });
                router.push('/dashboard/collaborator/opportunities');
            } else {
                toast.error("Failed to submit application. Try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Something went wrong with the server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
            {/* Header Section */}
            <div className="mb-6">
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    Application Form
                </span>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
                    Apply for {opportunity?.title || 'this position'}
                </h2>
                {user?.name && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        Applying as: <span className="font-medium text-zinc-700 dark:text-zinc-300">{user.name}</span> ({user.email})
                    </p>
                )}
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800 mb-6" />

            {/* Hero UI Form wrapper */}
            <Form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">

                {/* 1. Resume Link (Required) */}
                <TextField isRequired name="resumeLink" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1.5">
                        <FileText className="w-4 h-4 text-zinc-400" />
                        Resume Link
                    </Label>
                    <Input
                        type="url"
                        placeholder="https://drive.google.com/... or dropbox.com/..."
                        value={formData.resumeLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition"
                    />
                    <Description className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                        Provide a public link to your resume (Google Drive, Notion, Dropbox, etc.)
                    </Description>
                    <FieldError className="text-xs text-red-500 mt-1" />
                </TextField>

                {/* 2. Portfolio Link (Optional) */}
                <TextField name="portfolioLink" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1.5">
                        <Link className="w-4 h-4 text-zinc-400" />
                        Portfolio / Website <span className="text-xs text-zinc-400 font-normal">(Optional)</span>
                    </Label>
                    <Input
                        type="url"
                        placeholder="https://yourportfolio.com"
                        value={formData.portfolioLink}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition"
                    />
                    <Description className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                        Link to your GitHub, Behance, or personal website.
                    </Description>
                </TextField>

                {/* 3. Additional Notes / Cover Letter (Optional) */}
                <TextField name="additionalNotes" className="w-full">
                    <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 mb-1.5">
                        <LayoutHeaderCells className="w-4 h-4 text-zinc-400" />
                        Short Message / Notes <span className="text-xs text-zinc-400 font-normal">(Optional)</span>
                    </Label>
                    <textarea
                        name="additionalNotes"
                        rows={4}
                        placeholder="Anything else you'd like to share with the hiring team..."
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition resize-none"
                    />
                </TextField>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                    <Button
                        type="reset"
                        isDisabled={isLoading}
                        onClick={() => setFormData({ resumeLink: '', portfolioLink: '', additionalNotes: '' })}
                        className="px-4 py-2 text-sm font-medium text-white rounded-lg transition"
                    >
                        Clear Form
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="px-5 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 rounded-lg shadow-sm flex items-center gap-2 transition"
                    >
                        {isLoading ? "Submitting..." : "Submit Application"}
                        {!isLoading && <ArrowRight className="w-4 h-4" />}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default JobApply;