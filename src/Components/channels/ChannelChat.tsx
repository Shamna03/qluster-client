"use client"

import { useState, useRef, useEffect } from "react"
import {
  Send, Plus, Hash, Users, Settings, LogOut, ChevronDown, ChevronRight, Bell, Search, AtSign, Edit, Trash2, FileText, Smile, Moon, Sun, FileUp, Flag, Target, Calendar, CheckSquare, LinkIcon, Edit2,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { cn } from "@/lib/utils"
import { io } from "socket.io-client"
import { useTheme } from "next-themes"
import useAuthStore from "@/store/useAuthStore"

// Initialize socket connection
const socket = io("http://localhost:9001")

interface Message {
  id: string
  content: string
  user: {
    id: string
    name: string
    avatar: string
  }
  timestamp: Date
  attachments?: {
    type: "image" | "file"
    url: string
    name: string
  }[]
}

interface Channel {
  id: string
  name: string
  description: string
  isPrivate: boolean
  createdAt: Date
  messages: Message[]
}

interface User {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away" | "dnd"
}

interface Link {
  id: string
  title: string
  url: string
}

interface ChecklistItem {
  id: string
  text: string
  completed: boolean
}

const mockUsers: User[] = [
  { id: "user-1", name: "Alex Morgan", avatar: "/placeholder.svg", status: "online" },
  { id: "user-2", name: "Jamie Smith", avatar: "/placeholder.svg", status: "online" },
  { id: "user-3", name: "Taylor Johnson", avatar: "/placeholder.svg", status: "away" },
  { id: "user-4", name: "Jordan Lee", avatar: "/placeholder.svg", status: "offline" },
  { id: "user-5", name: "Casey Williams", avatar: "/placeholder.svg", status: "dnd" },
]

const mockChannels: Channel[] = [
  {
    id: "channel-1",
    name: "general",
    description: "General discussion for the team",
    isPrivate: false,
    createdAt: new Date("2023-01-15"),
    messages: [
      {
        id: "msg-1",
        content: "Welcome to the general channel!",
        user: mockUsers[0],
        timestamp: new Date("2023-01-15T09:00:00"),
      },
      {
        id: "msg-2",
        content: "Thanks! Excited to be here.",
        user: mockUsers[1],
        timestamp: new Date("2023-01-15T09:05:00"),
      },
    ],
  },
  {
    id: "channel-2",
    name: "project",
    description: "Discussion about our current project",
    isPrivate: false,
    createdAt: new Date("2023-01-20"),
    messages: [
      {
        id: "msg-3",
        content:
          "You created this channel on 20 March. This is the very beginning of the #project channel. This channel is for everything #project. Hold meetings, share docs and make decisions together with your team.",
        user: mockUsers[0],
        timestamp: new Date("2023-01-20T10:00:00"),
      },
      {
        id: "msg-4",
        content: "hy",
        user: mockUsers[2],
        timestamp: new Date("2023-01-20T10:30:00"),
      },
      {
        id: "msg-5",
        content: "joined #project.",
        user: mockUsers[1],
        timestamp: new Date("2023-01-20T11:51:00"),
      },
      {
        id: "msg-6",
        content: "Canvas updated",
        user: mockUsers[2],
        timestamp: new Date("2023-01-20T11:59:00"),
        attachments: [
          {
            type: "file",
            url: "#",
            name: "Project brief",
          },
        ],
      },
      {
        id: "msg-7",
        content: "hy",
        user: mockUsers[1],
        timestamp: new Date("2023-01-20T12:13:00"),
      },
      {
        id: "msg-8",
        content: "jkghjg",
        user: mockUsers[1],
        timestamp: new Date("2023-01-20T12:14:00"),
      },
      {
        id: "msg-9",
        content: "joined #project.",
        user: mockUsers[3],
        timestamp: new Date("2023-01-21T10:30:00"),
      },
    ],
  },
  {
    id: "channel-3",
    name: "backend",
    description: "Backend development discussions",
    isPrivate: true,
    createdAt: new Date("2023-02-01"),
    messages: [],
  },
  {
    id: "channel-4",
    name: "social",
    description: "Off-topic conversations",
    isPrivate: false,
    createdAt: new Date("2023-02-15"),
    messages: [],
  },
]

const mockLinks: Link[] = [
  { id: "link-1", title: "Figma Design", url: "https://www.figma.com/file/..." },
  { id: "link-2", title: "GitHub Repository", url: "https://github.com/..." },
]

const mockChecklist: ChecklistItem[] = [
  { id: "item-1", text: "Define project scope", completed: true },
  { id: "item-2", text: "Design user interface", completed: true },
  { id: "item-3", text: "Implement backend API", completed: false },
  { id: "item-4", text: "Write unit tests", completed: false },
  { id: "item-5", text: "Deploy to production", completed: false },
]

const ChannelChat = () => {
  const [channels, setChannels] = useState<Channel[]>(mockChannels)
  const [activeChannel, setActiveChannel] = useState<Channel>(mockChannels[1]) // Default to project channel
  const [input, setInput] = useState("")
  const [isAddingChannel, setIsAddingChannel] = useState(false)
  const [newChannelName, setNewChannelName] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    channels: true,
    directMessages: true,
  })
  const [activeTab, setActiveTab] = useState<"messages" | "tracker" | "brief">("messages")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const {user}=useAuthStore()

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChannel])

  // Socket.io event listeners
  useEffect(() => {
    // Listen for new messages
    socket.on("message", (data) => {
      // Handle incoming message
      const { channelId, message } = data

      setChannels((prevChannels) =>
        prevChannels.map((channel) =>
          channel.id === channelId ? { ...channel, messages: [...channel.messages, message] } : channel,
        ),
      )

      if (activeChannel.id === channelId) {
        setActiveChannel((prev) => ({
          ...prev,
          messages: [...prev.messages, message],
        }))
      }
    })

    return () => {
      socket.off("message")
    }
  }, [activeChannel])

  const handleSendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content: input,
      user: mockUsers[0], // Current user
      timestamp: new Date(),
    }

    // Update local state
    const updatedChannel = {
      ...activeChannel,
      messages: [...activeChannel.messages, newMessage],
    }

    setActiveChannel(updatedChannel)

    setChannels((prevChannels) =>
      prevChannels.map((channel) => (channel.id === activeChannel.id ? updatedChannel : channel)),
    )

    // Send to server
    socket.emit("message", {
      channelId: activeChannel.id,
      message: newMessage,
    })

    setInput("")
  }

  const handleAddChannel = () => {
    if (!newChannelName.trim()) return

    const newChannel: Channel = {
      id: `channel-${Date.now()}`,
      name: newChannelName.trim().toLowerCase().replace(/\s+/g, "-"),
      description: `Channel for ${newChannelName}`,
      isPrivate: false,
      createdAt: new Date(),
      messages: [],
    }

    setChannels([...channels, newChannel])
    setNewChannelName("")
    setIsAddingChannel(false)
  }

  const toggleSection = (section: "channels" | "directMessages") => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })
    }
  }

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {}

    messages.forEach((message) => {
      const dateKey = message.timestamp.toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(message)
    })

    return Object.entries(groups).map(([dateKey, messages]) => ({
      date: new Date(dateKey),
      messages,
    }))
  }

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "dnd":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="flex h-screen bg-white dark:bg-[#200a23] text-gray-900 dark:text-white w-full">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 dark:bg-[#37113c] flex flex-col dark:border-l">
        {/* Workspace Header */}
        {/* <div className="p-4 border-b border-gray-200 dark:border-[#4a1e52] flex items-center justify-between">
          <h1 className="font-bold text-lg">Project name</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-[#4a1e52]"
              onClick={toggleTheme}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-[#4a1e52]"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div> */}

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto max-w-sm">
          {/* Channels Section */}
          <div className="px-2 py-4">
            <div
              className="flex items-center px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              onClick={() => toggleSection("channels")}
            >
              {expandedSections.channels ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              <span className="text-xs font-semibold uppercase">Channels</span>
            </div>

            {expandedSections.channels && (
              <div className="mt-1 space-y-1">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className={cn(
                      "flex items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#4a1e52]",
                      activeChannel.id === channel.id ? "bg-gray-200 dark:bg-[#611f69]" : "",
                    )}
                    onClick={() => setActiveChannel(channel)}
                  >
                    <Hash className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    <span className="truncate">{channel.name}</span>
                  </div>
                ))}

                {isAddingChannel ? (
                  <div className="px-2 py-1">
                    <div className="flex items-center">
                      <Hash className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <input
                        type="text"
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                        placeholder="channel-name"
                        className="bg-gray-200 dark:bg-[#4a1e52] text-gray-900 dark:text-white text-sm rounded px-2 py-1 w-full focus:outline-none"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddChannel()
                          if (e.key === "Escape") setIsAddingChannel(false)
                        }}
                      />
                    </div>
                    <div className="flex justify-end mt-1 space-x-2">
                      <button
                        className="text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        onClick={() => setIsAddingChannel(false)}
                      >
                        Cancel
                      </button>
                      <button className="text-xs text-[#611f69] hover:text-[#7c3aed]" onClick={handleAddChannel}>
                        Create
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                    onClick={() => setIsAddingChannel(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <span>Add channels</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Direct Messages Section */}
          <div className="px-2 py-4">
            <div
              className="flex items-center px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              onClick={() => toggleSection("directMessages")}
            >
              {expandedSections.directMessages ? (
                <ChevronDown className="h-4 w-4 mr-1" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1" />
              )}
              <span className="text-xs font-semibold uppercase">Direct messages</span>
            </div>

            {expandedSections.directMessages && (
              <div className="mt-1 space-y-1">
                {mockUsers.slice(1).map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#4a1e52]"
                  >
                    <div className="relative mr-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          "absolute bottom-0 right-0 h-2 w-2 rounded-full border border-gray-100 dark:border-[#37113c]",
                          getStatusColor(user.status),
                        )}
                      ></span>
                    </div>
                    <span className="truncate">{user.name}</span>
                  </div>
                ))}

                <div className="flex items-center px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Invite people</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        {/* <div className="p-2 border-t border-gray-200 dark:border-[#4a1e52] bg-gray-200 dark:bg-[#2d0e31]">
          <div className="flex items-center p-2 rounded hover:bg-gray-300 dark:hover:bg-[#4a1e52] cursor-pointer">
            <div className="relative mr-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profilePicture|| "/placeholder.svg"} />
                <AvatarFallback>{mockUsers[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border border-gray-200 dark:border-[#2d0e31]"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Online</p>
            </div>
            <LogOut className="h-4 w-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white" />
          </div>
        </div> */}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col ">
        {/* Channel Header with Tabs */}
        <div className="border-b border-gray-200 dark:border-[#4a1e52] bg-white dark:bg-[#200a23] max-w-8xl">
          <div className="h-14 flex items-center px-4">
            <div className="flex-1">
              <div className="flex items-center">
                <Hash className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                <h2 className="font-semibold">{activeChannel.name}</h2>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{activeChannel.description}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-[#4a1e52]"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-[#4a1e52]"
              >
                <Users className="h-4 w-4" />
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-[#4a1e52]"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-[#4a1e52]"
              >
                <AtSign className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 dark:border-[#4a1e52]">
            <button
              className={`px-4 py-2 flex items-center text-sm font-medium ${
                activeTab === "messages"
                  ? "text-[#611f69] border-b-2 border-[#611f69]"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("messages")}
            >
              <span>Messages</span>
            </button>

            <button
              className={`px-4 py-2 flex items-center text-sm font-medium ${
                activeTab === "brief"
                  ? "text-[#611f69] border-b-2 border-[#611f69]"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("brief")}
            >
              <span>Project brief</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "messages" && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {groupMessagesByDate(activeChannel.messages).map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-4">
                <div className="flex items-center">
                  <div className="h-px flex-1 bg-gray-200 dark:bg-[#4a1e52]"></div>
                  <span className="px-2 text-xs text-gray-500 dark:text-gray-400">{formatDate(group.date)}</span>
                  <div className="h-px flex-1 bg-gray-200 dark:bg-[#4a1e52]"></div>
                </div>

                {group.messages.map((message) => (
                  <div key={message.id} className="group">
                    <div className="flex items-start group-hover:bg-gray-50 dark:group-hover:bg-[#2d0e31] px-2 py-1 rounded-md -mx-2">
                      <Avatar className="h-10 w-10 mr-3 mt-1">
                        <AvatarImage src={message.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                          {message.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline">
                          <span className="font-medium mr-2">{message.user.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{message.content}</p>

                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment, i) => (
                              <div key={i} className="flex items-center bg-gray-100 dark:bg-[#2d0e31] p-2 rounded">
                                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                                <span className="text-sm text-blue-500 hover:underline cursor-pointer">
                                  {attachment.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="hidden group-hover:flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-gray-200 dark:hover:bg-[#4a1e52]"
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-gray-200 dark:hover:bg-[#4a1e52]"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-gray-200 dark:hover:bg-[#4a1e52]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
{/* ================================================================================== */}
        {activeTab === "brief" && (
          <div className="flex-1 overflow-y-auto p-6 ">
            <div className="max-w-7xl min-w-full  mx-auto">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-2xl font-bold">Project Brief</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Project Banner */}
              <div className="relative rounded-lg overflow-hidden mb-8 bg-gradient-to-r from-blue-500 to-purple-600 h-48">
                <img
                  src="/Screenshot (2).png"
                  alt="Project Banner"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Details */}
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-2">
                  <Flag className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Objectives:</h3>
                    <p className="text-gray-900 dark:text-white">Build a collaborative platform for developers</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Target audience:</h3>
                    <p className="text-gray-900 dark:text-white">Software developers and engineering teams</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Timeline:</h3>
                    <p className="text-gray-900 dark:text-white">Q2 2023 - Q4 2023</p>
                  </div>
                </div>
              </div>

              {/* Team Section */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                  <h2 className="text-xl font-semibold">The team</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockUsers.slice(0, 3).map((member) => (
                    <div
                      key={member.id}
                      className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex items-center bg-white dark:bg-[#2d0e31]"
                    >
                      <div className="relative mr-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-gray-200 dark:bg-[#4a1e52] text-gray-700 dark:text-white">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-[#2d0e31] ${
                            member.status === "online" ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{member.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Files, Checklist, Links Sections */}
              <div className="space-y-8">
                {/* Files Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <h2 className="text-xl font-semibold">Files</h2>
                    </div>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-[#2d0e31] p-4">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-26%20at%204.45.30%E2%80%AFPM-Yf3THatK99IVPRa3BdDHlP5MEMh7CW.png"
                      alt="Project Screenshot"
                      className="w-full h-auto rounded-lg mb-3"
                    />
                    <p className="font-medium">Project Screenshot.png</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Uploaded by {mockUsers[0].name} on March 20, 2023
                    </p>
                  </div>
                </div>

                {/* Checklist Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CheckSquare className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <h2 className="text-xl font-semibold">Checklist</h2>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {mockChecklist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center p-3 bg-white dark:bg-[#2d0e31] rounded-lg border border-gray-200 dark:border-gray-800"
                      >
                        <div className="flex items-center flex-1">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            className="h-4 w-4 text-[#611f69] focus:ring-[#611f69] border-gray-300 rounded"
                            readOnly
                          />
                          <span
                            className={`ml-3 ${
                              item.completed
                                ? "line-through text-gray-500 dark:text-gray-400"
                                : "text-gray-900 dark:text-white"
                            }`}
                          >
                            {item.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <h2 className="text-xl font-semibold">Links</h2>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {mockLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-white dark:bg-[#2d0e31] rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#37113c]"
                      >
                        <LinkIcon className="h-4 w-4 text-blue-500 mr-3" />
                        <span className="text-blue-500 hover:underline">{link.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    {/* ================================================================================== */}


        {/* Message Input */}
      { activeTab === "messages" &&  <div className="p-4 border-t border-gray-200 dark:border-[#4a1e52]">
          <div className="flex items-center bg-gray-100 dark:bg-[#2d0e31] rounded-md p-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-[#4a1e52]"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message #${activeChannel.name}`}
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white px-2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-[#4a1e52]"
            >
              <FileUp className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim()}
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full",
                input.trim() ? "text-[#611f69] hover:bg-gray-200 dark:hover:bg-[#4a1e52]" : "text-gray-500",
              )}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default ChannelChat

