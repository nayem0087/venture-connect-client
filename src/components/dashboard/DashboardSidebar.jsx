"use client"; // Next.js-এ usePathname ব্যবহার করার জন্য এটি ক্লায়েন্ট কম্পোনেন্ট হতে হবে

import { LayoutSideContent, EyeDashed, Briefcase, CirclePlus, WeightHanging, LogoTelegram } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
    const pathname = usePathname();

    // 🎯 ইউআরএল (URL) থেকে ডাইনামিক আইডি বের করার লজিক
    const segments = pathname.split("/");
    const mystartupIndex = segments.indexOf("mystartup");
    
    // 'mystartup' এর ঠিক পরের অংশটিই যদি মঙ্গোডিবি আইডি হয়, তবে সেটি নিবে
    const dynamicId = mystartupIndex !== -1 && segments[mystartupIndex + 1] 
        ? segments[mystartupIndex + 1] 
        : "";

    // নিশ্চিত হওয়া যে 'new' লেখাটিকে যেন আইডি মনে না করে
    const isValidId = dynamicId && dynamicId !== "new";

    const navItems = [
        { icon: EyeDashed, href: '/dashboard/founder', label: "Overview" },
        { icon: Briefcase, href: '/dashboard/founder/mystartup', label: "My Startup" },
        { icon: CirclePlus, href: '/dashboard/founder/mystartup/new', label: "Add Opportunity" },
        
        // 🎯 এখন আইডিটি সম্পূর্ণ ডাইনামিক। আইডি থাকলে ওই নির্দিষ্ট লিংকে যাবে, না থাকলে মেইন পেজে রাখবে
        { 
            icon: WeightHanging, 
            href: isValidId 
                ? `/dashboard/founder/mystartup/${dynamicId}/edit` 
                : '/dashboard/founder/mystartup', 
            label: "Manage Opportunities" 
        },
        
        { icon: LogoTelegram, href: '/', label: "Applications" },
    ];

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
                // একটিভ লিংক হাইলাইট করার জন্য (ঐচ্ছিক কিন্তু ইউজার এক্সপেরিয়েন্সের জন্য দারুণ)
                const isActive = pathname === item.href;
                
                return (
                    <Link
                        key={item.label}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                            isActive 
                                ? "bg-purple-700/10 text-purple-500 font-medium" 
                                : "text-foreground hover:bg-default"
                        }`}
                        href={item.href}
                    >
                        <item.icon className={`size-5 ${isActive ? "text-purple-500" : "text-muted"}`} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            <aside className="hidden w-64 shrink-0 flex-col border-r border-default p-4 lg:block">
                {navContent}
            </aside>
            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContent />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}