"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Check } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;
const POLL_INTERVAL_MS = 30000; // 30s

export default function NotificationBell() {
    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);

    const fetchUnreadCount = async () => {
        if (!user?.email) return;
        try {
            const res = await fetch(`${API_BASE}/api/notifications/unread-count?email=${encodeURIComponent(user.email)}`);
            const data = await res.json();
            if (data.success) setUnreadCount(data.count);
        } catch (e) {
            // silent fail — badge just won't update this cycle
        }
    };

    const fetchNotifications = async () => {
        if (!user?.email) return;
        try {
            const res = await fetch(`${API_BASE}/api/notifications?email=${encodeURIComponent(user.email)}`);
            const data = await res.json();
            if (data.success) setNotifications(data.notifications);
        } catch (e) {
            // silent fail
        }
    };

    // Poll unread count periodically
    useEffect(() => {
        if (!user?.email) return;
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, POLL_INTERVAL_MS);
        return () => clearInterval(interval);
    }, [user?.email]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggle = () => {
        const next = !isOpen;
        setIsOpen(next);
        if (next) fetchNotifications();
    };

    const handleMarkAllRead = async () => {
        if (!user?.email) return;
        try {
            await fetch(`${API_BASE}/api/notifications/mark-all-read`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email }),
            });
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (e) {
            // silent fail
        }
    };

    const handleNotificationClick = async (n) => {
        if (!n.read) {
            try {
                await fetch(`${API_BASE}/api/notifications/${n._id}/read`, { method: "PATCH" });
                setNotifications((prev) => prev.map((x) => (x._id === n._id ? { ...x, read: true } : x)));
                setUnreadCount((prev) => Math.max(0, prev - 1));
            } catch (e) {
                // silent fail
            }
        }
        setIsOpen(false);
        if (n.link) router.push(n.link);
    };

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={handleToggle}
                aria-label="Notifications"
                className="relative flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-2.5 text-gray-600 dark:text-gray-300 transition hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
            >
                <Bell className="size-4" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-purple-600 px-1 text-[10px] font-bold text-white">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0B0B0F] shadow-2xl overflow-hidden z-50">
                    <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 px-4 py-3">
                        <p className="text-sm font-bold text-black dark:text-white">Notifications</p>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllRead}
                                className="flex items-center gap-1 text-xs font-medium text-purple-500 dark:text-purple-400 hover:text-purple-400 dark:hover:text-purple-300"
                            >
                                <Check className="size-3" />
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <p className="px-4 py-8 text-center text-sm text-gray-500">No notifications yet.</p>
                        ) : (
                            notifications.map((n) => (
                                <button
                                    key={n._id}
                                    onClick={() => handleNotificationClick(n)}
                                    className={`flex w-full flex-col items-start gap-0.5 border-b border-black/5 dark:border-white/5 px-4 py-3 text-left transition hover:bg-black/5 dark:hover:bg-white/5 ${
                                        !n.read ? "bg-purple-500/5" : ""
                                    }`}
                                >
                                    <div className="flex w-full items-center gap-2">
                                        {!n.read && <span className="size-1.5 shrink-0 rounded-full bg-purple-500" />}
                                        <p className="text-sm font-semibold text-black dark:text-white">{n.title}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{n.message}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-1">
                                        {new Date(n.createdAt).toLocaleString()}
                                    </p>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}