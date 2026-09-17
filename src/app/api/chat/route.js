import { NextResponse } from "next/server";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are VentureConnect AI, the friendly in-app assistant for VentureConnect — a platform that connects startup founders with premium investors and skilled collaborators.

What you help with:
- Explaining how VentureConnect works (founders pitch startups, investors browse and fund them, collaborators/operators join opportunities)
- Guiding users to the right page: Browse Startups (/startups), Browse Opportunities (/opportunities), Create a Startup (/startup/create), Post an Opportunity (/opportunity/post), Pricing (/pricing), Sign in (/auth/signin), Register (/register)
- Tips on writing a strong pitch, what investors look for, or how to stand out as a collaborator
- General encouragement and clear, concise answers

Keep replies short (2-5 sentences unless asked for detail), friendly, and confident. If asked something totally unrelated to startups/investing/the platform, answer briefly but gently steer back to how VentureConnect can help. Never invent specific statistics, user names, or funding amounts beyond what's publicly known about the platform.`;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured on the server" },
        { status: 500 }
      );
    }

    const groqRes = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
        temperature: 0.6,
        max_tokens: 600,
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error("Groq API error:", errText);
      return NextResponse.json(
        { error: "Failed to get a response from the AI service" },
        { status: 502 }
      );
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}