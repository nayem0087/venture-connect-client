// lib/actions/opportunities.js
'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createOpportunities = async (newOpportunitiesData) => {
    const res = await fetch(`${baseUrl}/api/opportunities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOpportunitiesData),
    });
    return res.json();
};