// ─── AI Chatbot route (Groq) ───────────────────────────────────────
// Paste this INSIDE run(), after your other routes (it uses the
// startupCollection / opportunitiesCollection / planCollection vars
// that are already declared in that scope).
//
// .env  ->  GROQ_API_KEY=your_key_here
// Node 18+ has global fetch, so no extra package is needed.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

// Small cache so every message doesn't hit MongoDB
let contextCache = { data: null, at: 0 };

async function buildPlatformContext() {
    if (contextCache.data && Date.now() - contextCache.at < 60_000) {
        return contextCache.data;
    }

    const [startups, opportunities, plans, startupCount, oppCount] = await Promise.all([
        startupCollection.find({}, { projection: { name: 1, industry: 1, funding: 1, description: 1 } })
            .sort({ createdAt: -1 }).limit(8).toArray(),
        opportunitiesCollection.find({}, { projection: { title: 1, workType: 1, skills: 1, company: 1 } })
            .sort({ createdAt: -1 }).limit(8).toArray(),
        planCollection.find({}).limit(5).toArray(),
        startupCollection.estimatedDocumentCount(),
        opportunitiesCollection.estimatedDocumentCount(),
    ]);

    const text = `
LIVE PLATFORM DATA (${new Date().toDateString()})
Total startups: ${startupCount} | Total opportunities: ${oppCount}

Recent startups:
${startups.map(s => `- ${s.name} (${s.industry || "n/a"}) — funding: ${s.funding || "n/a"}. ${(s.description || "").slice(0, 120)}`).join("\n") || "- none yet"}

Recent opportunities:
${opportunities.map(o => `- ${o.title} (${o.workType || "n/a"})${o.company ? " @ " + o.company : ""}`).join("\n") || "- none yet"}

Plans:
${plans.map(p => `- ${p.name || p.id}: ${p.price ?? "n/a"}`).join("\n") || "- see /pricing"}
`.trim();

    contextCache = { data: text, at: Date.now() };
    return text;
}

const SYSTEM_PROMPT = `
You are VentureBot, the assistant on VentureConnect — a platform where startup
founders, investors, and collaborators connect.

What users can do here:
- Founders: create a startup profile (/startup/create), post opportunities
  (/opportunity/post), review applications (/dashboard/applications).
- Collaborators: browse opportunities (/opportunities), apply to roles,
  keep a profile with skills and bio.
- Investors: browse startups (/startups) by industry and funding stage.
- Premium (/pricing) unlocks extra visibility and limits for both roles.

Rules:
- Answer only about VentureConnect, startups, fundraising, hiring, and applying.
  If asked anything else, say it's outside what you cover and steer back.
- Use the live data below when the user asks what's on the platform. Never
  invent a startup, role, number, or investor that isn't in that data.
- Point users to the right page path when an action is involved.
- Keep replies under 120 words, plain sentences, no markdown headings.
- Reply in the language the user writes in (English or Bangla).
- You cannot create, edit, or delete anything — you explain and guide only.
`.trim();

app.post('/api/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message || typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({ success: false, message: "Message is required." });
        }
        if (message.length > 1000) {
            return res.status(400).json({ success: false, message: "Message is too long." });
        }
        if (!process.env.GROQ_API_KEY) {
            return res.status(500).json({ success: false, message: "GROQ_API_KEY is not set." });
        }

        const platformContext = await buildPlatformContext();

        const chatMessages = [
            { role: 'system', content: `${SYSTEM_PROMPT}\n\n${platformContext}` },
            ...history
                .filter(m => m?.content && (m.role === 'user' || m.role === 'assistant'))
                .slice(-8)
                .map(m => ({ role: m.role, content: String(m.content).slice(0, 1000) })),
            { role: 'user', content: message },
        ];

        const response = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: GROQ_MODEL,
                messages: chatMessages,
                temperature: 0.6,
                max_tokens: 400,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Groq error:', data);
            return res.status(502).json({ success: false, message: "AI service failed." });
        }

        const reply = data?.choices?.[0]?.message?.content?.trim();
        if (!reply) {
            return res.status(502).json({ success: false, message: "Empty reply from AI service." });
        }

        res.json({ success: true, reply });
    } catch (error) {
        console.error('chat error:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});