"use server";

// parameters দুটি: id এবং formData
export async function updateStartup(id, formData) {
    try {
        console.log("--- SERVER ACTION HIT ---");
        console.log("Received ID:", id);
        
        if (!formData || typeof formData.get !== "function") {
            console.error("formData is missing or invalid!");
            return { success: false, error: "Form data format is incorrect." };
        }

        // formData থেকে ভ্যালুগুলো নেওয়া হচ্ছে
        const name = formData.get("name");
        const industry = formData.get("industry");
        const funding = formData.get("funding");
        const email = formData.get("email");
        const description = formData.get("description");

        // ব্যাকএন্ডে পাঠানোর জন্য অবজেক্ট তৈরি (কোনো ভ্যালু ফাকা থাকলে যেন ক্র্যাশ না করে)
        const updateData = {
            name: name ? String(name) : "",
            industry: industry ? String(industry) : "tech",
            funding: funding ? String(funding) : "seed",
            email: email ? String(email) : "",
            description: description ? String(description) : ""
        };

        console.log("Sending clean data to Express:", updateData);

        // আপনার এক্সপ্রেস ব্যাকএন্ডে রিকোয়েস্ট পাঠানো হচ্ছে
        const response = await fetch(`http://localhost:5000/api/startups/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        });

        // রেসপন্স টেক্সট হিসেবে নেওয়া (যাতে ব্যাকএন্ড ভুল ফরম্যাট পাঠালেও নেক্সট জেএস ক্র্যাশ না করে)
        const responseText = await response.text();
        console.log("Raw Express Response:", responseText);

        let result;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            return { success: false, error: "Backend did not return valid JSON" };
        }

        if (response.ok && result.success) {
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