import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import "./globals.css"
import AppHeader from "@/components/app-header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SessionProvider from "@/providers/SessionProvider";
import { ScrollAndCursorHandler } from "@/components/ScrollAndCursor";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <SidebarProvider>
        <div className="grid grid-cols-[auto_1fr] overflow-x-hidden min-h-screen bg-background w-screen ">
            <AppSidebar />
            <div className="flex flex-col overflow-x-hidden w-full">
              <AppHeader />
              <main className="flex-1">
                <ScrollAndCursorHandler/>
                {children}</main>
            </div>
          </div>
        </SidebarProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
