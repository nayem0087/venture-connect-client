import { getUserSession } from "@/lib/core/session";
import { LayoutSideContent, EyeDashed, Briefcase, CirclePlus, WeightHanging, LogoTelegram } from "@gravity-ui/icons";
import { LayoutHeaderCellsLarge, Paperclip, ListUl, Person } from '@gravity-ui/icons';

import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {
    // const startupId = params?.id || "";

    const user = await getUserSession();

    const FounderNavLinks = [
        { icon: EyeDashed, href: '/dashboard/founder', label: "Overview" },
        { icon: Briefcase, href: '/dashboard/founder/mystartup', label: "My Startup" },
        { icon: CirclePlus, href: '/dashboard/founder/mystartup/new', label: "Add Opportunity" },
        { icon: WeightHanging, href: '/dashboard/founder/mystartup/new/opportunities', label: "Manage Opportunities" },
        { icon: LogoTelegram, href: '/dashboard/founder/mystartup/new/applications', label: "Applications" },
    ];

    const CollaboratorNavLinks = [
    { 
        icon: LayoutHeaderCellsLarge, href: '/dashboard/collaborator', label: "Overview" 
    },
    { 
        icon: Paperclip, href: '/dashboard/collaborator/applications',label: "My Opportunities" 
    },
    { 
        icon: ListUl, href: '/opportunities', label: "Browse Opportunities" 
    },
    { 
        icon: Person, href: '/dashboard/collaborator/profile', label: "Profile" 
    }
];

    const navLinksMap = {
        collaborator : CollaboratorNavLinks,
        founder : FounderNavLinks,
    }

    const navItems = navLinksMap[user?.role || 'collaborator'];

    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

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