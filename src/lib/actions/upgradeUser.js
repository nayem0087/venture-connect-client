// lib/actions/upgradeUser.js
'use server'

import { revalidatePath } from "next/cache";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function upgradeUserToPremium(email) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/users/upgrade`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
            revalidatePath("/dashboard/founder/opportunities");
            return { success: true };
        }

        return { success: false, error: data.message };
    } catch (error) {
        return { success: false, error: "Network error during upgrade" };
    }
}