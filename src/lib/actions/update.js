"use server";

import { revalidatePath } from "next/cache";

export async function updateStartup(id, updateData) {
    try {
        console.log("--- SERVER ACTION HIT ---");
        console.log("Received ID:", id);
        console.log("Received Clean Data:", updateData);
        
        if (!updateData) {
            return { success: false, error: "No data provided for update." };
        }

        const response = await fetch(`http://localhost:5000/api/startups/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData), 
        });

        const responseText = await response.text();
        console.log("Raw Express Response:", responseText);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            return { success: false, error: "Backend did not return valid JSON" };
        }

        if (response.ok && (result.success || result.acknowledged || result.modifiedCount > 0)) {
            revalidatePath("/dashboard/founder/mystartup");
            return { success: true, data: result.data };
        } else {
            return { 
                success: false, 
                error: result.message || `Backend returned status ${response.status}` 
            };
        }

    } catch (error) {
        console.error("❌ CRITICAL SERVER ACTION ERROR:", error);
        return { success: false, error: error?.message || "Internal Server Error in Action" };
    }
}