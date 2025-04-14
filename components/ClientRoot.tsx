// app/ClientRoot.tsx
"use client";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import AppHeader from "@/components/app-header";
import { ScrollAndCursorHandler } from "@/components/ScrollAndCursor";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <SidebarProvider>
          <div className="grid grid-cols-[auto_1fr] overflow-x-hidden min-h-screen bg-gradient-to-r from-white to-main/50 w-screen ">
            <AppSidebar />
            <div className="flex flex-col overflow-x-hidden w-full">
              <AppHeader />
              <main className="flex-1">
                <ScrollAndCursorHandler />
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
