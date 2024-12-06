import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
    ChevronsUpDownIcon,
    ListIcon,
    LogOutIcon,
    UserCircleIcon,
} from "lucide-react";

import { $auth, getAuthed } from "@/lib/auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    MainSidebarMenu,
    MainSidebarUserAvatar,
} from "@/app/(main)/sidebar.client";

export async function MainSidebar() {
    const { user } = await getAuthed();

    return (
        <>
            <form
                id="logoutForm"
                action={async () => {
                    "use server";

                    await $auth.api.signOut({
                        headers: headers(),
                    });

                    redirect("/login");
                }}
            ></form>

            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <MainSidebarMenu />
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <MainSidebarUserAvatar
                                            initialUser={user}
                                        />
                                        <ChevronsUpDownIcon className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <MainSidebarUserAvatar
                                                initialUser={user}
                                            />
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <UserCircleIcon />
                                            Account
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <button
                                            form="logoutForm"
                                            className="w-full"
                                        >
                                            <LogOutIcon />
                                            Log out
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>

                <SidebarRail />
            </Sidebar>
        </>
    );
}
