import { NextResponse } from "next/server";

// This route simply forwards chat requests to the Express backend, which
// already has the full Groq + MongoDB-context chat implementation in
// routes/chat.js. Keeping the AI logic in one place (the backend) avoids
// duplicating database access inside the Next.js app.

export async function POST(request) {
    try {
        const body = await request.json();

        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await backendRes.json();

        return NextResponse.json(data, { status: backendRes.status });
    } catch (error) {
        console.error("Chat proxy error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to reach the chat service." },
            { status: 500 }
        );
    }
}