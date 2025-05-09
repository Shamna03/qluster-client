"use client"

import { Bell, BellDot, ChevronDown, Moon, Sun } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import useAuthStore from "@/store/useAuthStore"
import DropDown from "./dropDown"
import { usePathname } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/api/axiosInstance"
import { Badge } from "@/Components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, setUser } = useAuthStore()
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [theme, setTheme] = useState("light")

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Application Approved",
      message: "Your application for 'AI Code Assistant' was approved!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "New Message",
      message: "You received a new message from Sarah about the project",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Project Update",
      message: "The 'Blockchain Marketplace' project has been updated",
      time: "Yesterday",
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("isAuthenticated"))
    
    const savedTheme = localStorage.getItem("theme") || "light"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const { data: logedUser, isLoading } = useQuery({
    queryKey: ["fetchUser", user?._id],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/user/userin")
      setUser(data.data)
      return data
    },
    enabled: !!isAuthenticated,
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showNotifications && !(event.target as HTMLElement).closest(".notifications-container")) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showNotifications])

  return (
    <div
      className={`fixed h-14 top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-md pl-6 pr-4 transition-all duration-400 ease-in-out flex items-center text-[#5e5e5e] dark:text-[#c2c2c2] z-50 ${
        isScrolled
          ? "py-2 w-[85%] scale-x-95 rounded-2xl bg-background/80 shadow-md shadow-[#621f6930] border border-purple-100/30 dark:border-purple-900/30 dark:shadow-none dark:bg-background/80"
          : "h-16 py-4 w-[90%] rounded-xl border border-transparent"
      }`}
    >
      <Link href="/" className="flex items-center">
        <h1
          className={`font-extrabold text-xl transition-all duration-300 ease-in-out bg-gradient-to-r from-[#37113c] to-[#611f69] bg-clip-text text-transparent ${isScrolled ? "mx-auto" : "ml-2"}`}
        >
          QLUSTER
        </h1>
      </Link>

      <div className="flex items-center space-x-8 mx-auto">
        <div className="flex items-center cursor-pointer group relative">
          <h1 className="group-hover:text-primary transition-colors text-sm font-medium">Use cases</h1>
          <ChevronDown className="ml-1 w-4 h-4 group-hover:text-primary transition-colors" />
        </div>

        <Link href="/share-ideas">
          <h1 className={`cursor-pointer hover:text-primary transition-colors text-sm font-medium ${pathname?.includes("/share-ideas") ? "text-primary font-semibold" : ""}`}>
            Projects
          </h1>
        </Link>

        <Link href="/applications">
          <h1 className={`cursor-pointer hover:text-primary transition-colors text-sm font-medium ${pathname?.includes("/applications") ? "text-primary font-semibold" : ""}`}>
            Applications
          </h1>
        </Link>

        <Link href="/dashboard">
          <h1 className={`cursor-pointer hover:text-primary transition-colors text-sm font-medium ${pathname?.includes("/dashboard") ? "text-primary font-semibold" : ""}`}>
            Dashboard
          </h1>
        </Link>

        <Link href="/contact">
          <h1 className={`cursor-pointer hover:text-primary transition-colors text-sm font-medium ${pathname?.includes("/contact") ? "text-primary font-semibold" : ""}`}>
            Contact
          </h1>
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        {isAuthenticated && (
          <div className="relative notifications-container">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-full transition-colors relative ${showNotifications ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
            >
              {/* Use BellDot when there are unread notifications */}
              {unreadCount > 0 ? (
                <BellDot className="w-5 h-5" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
              
              {/* Notification badge */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                >
                  
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    <button className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
                      Mark all as read
                    </button>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 ${!notification.read ? "bg-purple-50 dark:bg-purple-900/10" : ""}`}
                      >
                        <div className="flex gap-3">
                          <div className="mt-0.5">
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400"></div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{notification.message}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
                    <Link href="/notifications" className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {!isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <Link href="/login">
              <button className="px-3 py-1.5 text-[13px] border border-[#611f69] text-[#611f69] dark:text-purple-300 dark:border-purple-700 bg-white/50 dark:bg-gray-800/50 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                Log In
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-3 py-1.5 text-[13px] bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white rounded-md transition-colors">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <DropDown isScrolled={isScrolled} />
        )}
      </div>
    </div>
  )
}

export default Navbar