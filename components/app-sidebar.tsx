'use client'
import { BookOpen, Home, Search, Bookmark, Clock, Settings, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"

export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r ">
      <SidebarHeader className="flex h-16 items-start bg-main/5 overflow-hidden">
        <div className="flex  gap-5 font-semibold cursor-pointer">
          <BookOpen className="h-6 w-6" />
          <span>BookVerse</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-main/5 gap-5">
        <SidebarMenu>
          <SidebarMenuItem className="hover:bg-none">
            <SidebarMenuButton asChild tooltip="Home" isActive={true} className="hover:bg-none">
              <Link className="cursor-pointer" href={'/home'}>
                <Home className="h-10 w-10" />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Explore">
              <Link className="cursor-pointer" href={'/explore'}>
                <Search className="h-10 w-10" />
                <span>Explore</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="My Books">
              <Link className="cursor-pointer" href={'/my-books'}>
                <BookOpen className="h-10 w-10" />
                <span>My Books</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Bookmarks">
              <Link className="cursor-pointer" href={'/bookmarks'}>
                <Bookmark className="h-10 w-10" />
                <span>Bookmarks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link className="cursor-pointer" href={'/setting'}>
                <Settings className="h-10 w-10" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator/>
        <div className="flex mb-5 gap-5 rounded-2xl w-1/2 bg-white text-black" onClick={()=>signOut}>
          <LogOut/>
          logout
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
