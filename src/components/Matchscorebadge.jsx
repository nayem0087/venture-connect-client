"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Sparkles, TrendingUp } from "lucide-react";

// Same backend base URL used elsewhere in the project (see startups/page.js
// and opportunities/[id]/page.js).
const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

export default function MatchScoreBadge({ startupId }) {
  const { data: session } = useSession();
  const user = session?.user;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const checkMatch = async () => {
    if (!user?.email || !startupId || loading) return;

    setLoading(true);
    setError(false);

    try {
      const res = await fetch(
        `${API_BASE}/api/ai/match-score/${startupId}?founderEmail=${encodeURIComponent(
          user.email
        )}`
      );
      const data = await res.json();

      if (data.success) {
        setMatch(data);
      } else {
        setError(true);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Non-founders (or logged-out users) never see this widget.
  if (!user || user.role !== "founder") return null;

  // Initial state: just the button, nothing fetched yet.
  if (!match && !loading && !error) {
    return (
      <button
        onClick={checkMatch}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 text-sm font-semibold text-violet-300 transition hover:bg-violet-500/20"
      >
        <Sparkles className="size-4" />
        Check AI Match
      </button>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/5 px-4 py-2.5 text-xs text-violet-300">
        <Sparkles className="size-3.5 animate-pulse" />
        Calculating AI match...
      </div>
    );
  }

  // Error state: let them retry
  if (error) {
    return (
      <button
        onClick={checkMatch}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
      >
        Couldn't check match — tap to retry
      </button>
    );
  }

  // Result state
  const score = match.score ?? 0;
  const colorClass =
    score >= 75
      ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
      : score >= 50
      ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
      : "text-gray-400 border-white/10 bg-white/5";

  return (
    <div className={`rounded-2xl border px-4 py-3 ${colorClass}`}>
      <div className="flex items-center gap-2 text-sm font-bold">
        <TrendingUp className="size-4" />
        AI Match: {score}%
      </div>
      {match.summary && (
        <p className="mt-1 text-xs opacity-90">{match.summary}</p>
      )}
      {match.reasons?.length > 0 && (
        <ul className="mt-2 list-inside list-disc space-y-1 text-xs opacity-80">
          {match.reasons.slice(0, 3).map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}