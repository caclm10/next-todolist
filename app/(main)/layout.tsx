import { Card, CardHeader } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MainSidebar } from "@/app/(main)/sidebar";

export default function MainLayout({ children }: React.PropsWithChildren) {
    return (
        <SidebarProvider>
            <MainSidebar />

            <div className="container py-6">
                <header>
                    <Card>
                        <CardHeader>
                            <SidebarTrigger />
                        </CardHeader>
                    </Card>
                </header>

                <main className="mt-8">{children}</main>
            </div>
        </SidebarProvider>
    );
}
