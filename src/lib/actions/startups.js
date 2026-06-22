'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// নতুন ডাটা ক্রিয়েট করার জন্য
export const createStartup = async (newStartupData) => {
    const res = await fetch(`${baseUrl}/api/startups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStartupData),
    });
    return res.json();
};

// বিদ্যমান ডাটা আপডেট করার জন্য
export const updateStartup = async (id, updatedStartupData) => {
    const res = await fetch(`${baseUrl}/api/startups/${id}`, {
        method: 'PUT', // অথবা PATCH
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStartupData),
    });
    return res.json();
};