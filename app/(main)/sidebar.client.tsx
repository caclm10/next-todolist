"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User } from "better-auth";
import { ListIcon, UserCircleIcon } from "lucide-react";

import { $authClient } from "@/lib/auth/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
    {
        title: "Todos",
        path: "/todos",
        icon: ListIcon,
    },
    {
        title: "Profile",
        path: "/profile",
        icon: UserCircleIcon,
    },
];

export function MainSidebarMenu() {
    return (
        <SidebarMenu>
            {items.map((item) => (
                <MainSidebarMenuItem key={item.path} {...item} />
            ))}
        </SidebarMenu>
    );
}

interface MainSidebarMenuItemProps {
    title: string;
    path: string;
    icon: React.ComponentType;
}

export function MainSidebarMenuItem({
    title,
    path,
    icon: Icon,
}: MainSidebarMenuItemProps) {
    const pathname = usePathname();
    const isActive = path.startsWith(pathname);

    return (
        <SidebarMenuItem>
            <SidebarMenuButton isActive={isActive} asChild>
                <Link href={path}>
                    <Icon />
                    <span>{title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

interface MainSidebarUserAvatarProps {
    initialUser: User;
}

export function MainSidebarUserAvatar({
    initialUser,
}: MainSidebarUserAvatarProps) {
    const { data } = $authClient.useSession();

    const user = data?.user || initialUser;
    const name = user.name;

    if (!data) return null;

    return (
        <>
            <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image || ""} alt={name} />
                <AvatarFallback className="rounded-lg">
                    {name.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                    <span>{name}</span>
                </span>
                <span className="truncate text-xs">
                    <span>{user.email}</span>
                </span>
            </div>
        </>
    );
}
