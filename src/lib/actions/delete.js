"use server";

import { revalidatePath } from "next/cache";

export async function deleteStartup(id) {
    try {
        console.log("--- SERVER ACTION DELETE HIT ---");
        console.log("Received ID for Delete:", id);
        
        if (!id) {
            return { success: false, error: "Missing startup ID." };
        }

        const response = await fetch(`http://localhost:5000/api/startups/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const responseText = await response.text();
        console.log("Raw Express Delete Response:", responseText);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            return { success: false, error: "Backend did not return valid JSON" };
        }

        if (response.ok && result.success) {
            // ক্যাশ ক্লিয়ার করা যেন ফ্রন্টএন্ডে সাথে সাথে আপডেট দেখা যায়
            revalidatePath("/dashboard/founder/mystartup");
            return { success: true, message: result.message };
        } else {
            return { 
                success: false, 
                error: result.message || `Backend returned status ${response.status}` 
            };
        }

    } catch (error) {
        console.error("❌ CRITICAL SERVER ACTION DELETE ERROR:", error);
        return { success: false, error: error?.message || "Internal Server Error in Delete Action" };
    }
}