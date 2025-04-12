import { BookOpen, Home, Search, Bookmark, Clock, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r bg-sidebar">
      <SidebarHeader className="flex h-16 items-start   overflow-hidden">
        <div className="flex  gap-5 font-semibold cursor-pointer">
          <BookOpen className="h-6 w-6" />
          <span>BookVerse</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Home" isActive={true}>
              <Link className="cursor-pointer" href={'/home'}>
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Explore">
              <Link className="cursor-pointer" href={'/explore'}>
                <Search className="h-5 w-5" />
                <span>Explore</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="My Books">
              <Link className="cursor-pointer" href={'/my-books'}>
                <BookOpen className="h-5 w-5" />
                <span>My Books</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Recent">
              <Link className="cursor-pointer" href={'/recent'}>
                <Clock className="h-5 w-5" />
                <span>Recent</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Bookmarks">
              <Link className="cursor-pointer" href={'/bookmarks'}>
                <Bookmark className="h-5 w-5" />
                <span>Bookmarks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link className="cursor-pointer" href={'/setting'}>
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
