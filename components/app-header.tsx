"use client";

import { Bell, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function AppHeader() {
  const { data: session ,status } = useSession();
  const user = session?.user;
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim().length < 3) {
        toast.error("Please enter at least 3 characters to search.");
        return;
      }
      router.push(`/explore?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6">
      <SidebarTrigger />

      <div className="flex items-center justify-center flex-1">
        <div className="relative  max-w-md flex items-center   ">
          <Search className="absolute left-2.5 top-2.6 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search your feeling..."
            className="w-full border-[0.7px] border-black/30  pl-8 md:w-[300px] lg:w-[400px] rounded-full  outline-none ring-0 focus:outline-none focus:border-none focus:ring-0 focus-visible:ring-0 shadow-none"
            value={query}
            onKeyDown={handleKeyDown}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                2
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-2">
              <p className="font-medium">Notifications</p>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Clear notifications</span>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="border-t">
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div>
                  <p className="font-medium">New book available</p>
                  <p className="text-sm text-muted-foreground">
                    "The Midnight Library" by Matt Haig is now available
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    2 hours ago
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 cursor-pointer">
                <div>
                  <p className="font-medium">Reading goal achieved</p>
                  <p className="text-sm text-muted-foreground">
                    You've reached your weekly reading goal of 3 books!
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Yesterday
                  </p>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {user && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage
                src={user.image || "/placeholder.img"}
                alt={user.name || "User"}
              />
              <AvatarFallback>
                {user.name?.slice(0, 2).toUpperCase() || "US"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium md:inline-block">
              {user.name}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
