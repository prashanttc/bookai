"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import AppSidebar from "@/components/app-sidebar";
import AppHeader from "@/components/app-header";
import { ScrollAndCursorHandler } from "@/components/ScrollAndCursor";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Redirect to homepage
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-4">Loading...</div>; // Optional: Add loading screen
  }

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <div className="grid grid-cols-[auto_1fr] overflow-x-hidden min-h-screen bg-main/10 w-screen ">
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
      </QueryClientProvider>
    </SessionProvider>
  );
}
