"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Usage:
 * <BookmarkButton itemId={startup._id} itemType="startup" initialBookmarked={bookmarkedIds.has(startup._id)} />
 */
export default function BookmarkButton({ itemId, itemType, initialBookmarked = false, className = "", onToggled }) {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();

    const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user?.email) {
            toast.error("Please sign in to save items.");
            router.push("/auth/signin");
            return;
        }
        if (isLoading) return;

        setIsLoading(true);
        const nextState = !isBookmarked;
        setIsBookmarked(nextState); // optimistic update

        try {
            const res = await fetch(`${API_BASE}/api/bookmarks`, {
                method: nextState ? "POST" : "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userEmail: user.email, itemId, itemType }),
            });
            const data = await res.json();

            if (!data.success) {
                setIsBookmarked(!nextState); // revert on failure
                toast.error("Couldn't update saved items.");
            } else {
                onToggled?.(nextState);
            }
        } catch (err) {
            setIsBookmarked(!nextState); // revert on failure
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            aria-label={isBookmarked ? "Remove from saved items" : "Save this item"}
            className={`flex items-center justify-center rounded-full border p-2 transition disabled:opacity-60 ${
                isBookmarked
                    ? "border-purple-500/40 bg-purple-500/10 text-purple-400"
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-purple-400 hover:border-purple-500/30"
            } ${className}`}
        >
            <Heart className={`size-4 ${isBookmarked ? "fill-purple-400" : ""}`} />
        </button>
    );
}