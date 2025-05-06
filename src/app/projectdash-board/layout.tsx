"use client";
import ChatBot from "@/Components/chatBot/ChatBot";
import useAuthStore from "@/store/useAuthStore";
import { ChevronDown, ChevronRight, ClipboardList, Headphones, House, MessageSquare } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import type React from "react"
import { useState } from "react"

export default function ChannelsLayout({children,}: { children: React.ReactNode }) {
 
    const pathName = usePathname()
    const {user}=useAuthStore()

  
  return( 
   <div className="flex min-h-screen dark:bg-[#200a23] text-white bg-white dark:text-black">
  {/* Sidebar */}
  <div className="w-64 min-w-64 bg-[#37113c]   flex flex-col h-screen justify-between">
        <div className="p-6 ">
        <h2 className="text-2xl font-bold mb-8 text-white ">Qluster</h2>
        <nav className="flex flex-col gap-4 text-sm">
          <Link href="/projectdash-board"className="hover:text-[#c084fc] flex items-center gap-2   text-white dark:hover:text-[#7c3aed]">
            <House className="h-4 w-4" /> Dashboard
          </Link>
          <Link href="/projectdash-board/kanban" className="hover:text-[#c084fc] flex items-center gap-2   text-white dark:hover:text-[#7c3aed]">
            <ClipboardList className="h-4 w-4" /> My Boards
          </Link>
          <Link href="/projectdash-board/channels" className="hover:text-[#c084fc] flex items-center gap-2   text-white dark:hover:text-[#7c3aed]">
            <MessageSquare className="h-4 w-4" /> Channels{pathName ==="/projectdash-board/channels" ?  <ChevronRight className="h-4 w-4 mr-1  "/>:<ChevronDown className="h-4 w-4 mr-1 "/> }
          </Link>
          <Link href="/projectdash-board/huddles" className="hover:text-[#c084fc] flex items-center gap-2   text-white dark:hover:text-[#7c3aed]">
            <Headphones className="h-4 w-4" /> Huddles
          </Link>
          <a href="#" className="hover:text-[#c084fc] flex items-center gap-2   text-white dark:hover:text-[#7c3aed]">
            <ClipboardList className="h-4 w-4" /> Settings 
          </a>
        </nav>
        </div>
              {/* User Profile */}
        <div className="p-2 border-t border-[#4a1e52] bg-[#2d0e31] ">
          <div className="flex items-center p-2 rounded hover:bg-[#4a1e52] cursor-pointer space-x-3 ">
            <div className="relative">
              <img  src={user?.profilePicture || "/placeholder.svg"} className="h-10 w-10 rounded-full"/>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border border-white dark:border-[#2d0e31]"></span>
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-white truncate">{user?.name || "Username"}</p>
              <p className="text-xs text-gray-400 truncate">Online</p>
            </div>
          </div>
        </div>
      </div>
           <ChatBot/>
        {children}
        </div>
  )
}
