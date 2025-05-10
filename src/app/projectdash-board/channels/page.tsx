"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Plus, Hash, Users, ChevronDown, ChevronRight, Trash2, Moon, Sun, FileUp, LoaderCircle, MessageSquare, } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { cn } from "@/lib/utils"
import { io, type Socket } from "socket.io-client"
import { useTheme } from "next-themes"
import useAuthStore from "@/store/useAuthStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import channelAxiosInstance from "@/api/channelAxiosInstance"
import ChannelMembersModal from "./ChannelMembersModal"
import axiosInstance from "@/api/axiosInstance"
import axios from "axios"
import { useRouter } from "next/navigation"
import DirectMessageChat from "./peerChat"
import NotePad from "./notePad"

const socket: Socket = io("http://localhost:5004", {
  withCredentials: true,
  transports: ["websocket"],
})

interface Message {
  _id: string
  chat: string
  sender: { _id: string; name: string; profilePicture?: string }
  channel: { _id: string; channelName: string }
  createdAt: Date
  media?: string
}

interface Channel {
  _id: string
  channelName: string
  projectId: string
  participants: any[]
}

interface User {
  _id: string
  name: string
  profilePicture?: string
  status?: "online" | "offline" | "away" | "dnd"
}

const ChannelChatpage = () => {
  const [channels, setChannels] = useState<Channel[]>([])
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isAddingChannel, setIsAddingChannel] = useState(false)
  const [newChannelName, setNewChannelName] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    channels: true,
    directMessages: true,
  })
  const [activeTab, setActiveTab] = useState<"messages" | "notes">("messages")
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false)
  const [activeView, setActiveView] = useState<"channel" | "direct">("channel")
  const [activeDirectMessage, setActiveDirectMessage] = useState<User | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const { user } = useAuthStore()
  const projectId = "680cc17c99cae0e58aab2e08"
  const queryClient = useQueryClient()
  const router = useRouter()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (socket.connected) {
      setIsConnected(true)
    }

    socket.on("connect", () => {
      setIsConnected(true)
      setErrorMessage(null)
    })

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message)
      setIsConnected(false)
      setErrorMessage("Failed to connect to chat server")
    })

    socket.on("error", (data) => {
      console.error("Server error:", data.message)
      setErrorMessage(data.message)
    })

    socket.on("previousMessages", (fetchedMessages: Message[]) => {
      if (activeChannel) {
        setMessages(fetchedMessages)
      }
    })

    socket.on("receiveMessage", (message: Message) => {
      if (activeChannel && message.channel._id === activeChannel._id) {
        setMessages((prev) => [...prev, message])
      }
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
      setErrorMessage("Disconnected from chat server")
    })

    return () => {
      socket.off("connect")
      socket.off("connect_error")
      socket.off("error")
      socket.off("previousMessages")
      socket.off("receiveMessage")
      socket.off("disconnect")
    }
  }, [activeChannel])

  const handleSendMessage = () => {
    if (!input.trim() || !activeChannel || !user) {
      console.error("Send message failed:", { input, activeChannel, user })
      setErrorMessage("Please provide message, select a channel, and log in")
      return
    }

    const messagePayload = {
      groupId: activeChannel._id,
      senderId: user._id,
      chat: input,
    }
    socket.emit("sendMessage", messagePayload, (response: any) => {
      if (response.error) {
        setErrorMessage(`Failed to send message: ${response.error}`)
      } else {
        setErrorMessage(null)
      }
    })
    setInput("")
  }

  interface ChannelPayload {
    channelName: string
    projectId: string
  }

  const { mutate: createChannel } = useMutation({
    mutationFn: async (payload: ChannelPayload) => {
      const { channelName, projectId } = payload
      const { data } = await channelAxiosInstance.post("/createchannel", { channelName, projectId })
      return data.data
    },
    onSuccess: (newChannel) => {
      queryClient.invalidateQueries({ queryKey: ["getChannel"] })
      setChannels((prev) => [...prev, newChannel])
    },
    onError: (err) => {
      console.error("Create channel error:", err)
      setErrorMessage("Failed to create channel")
    },
  })

  const handleAddChannel = () => {
    if (!newChannelName.trim()) {
      setErrorMessage("Channel name required")
      return
    }
    createChannel({ channelName: newChannelName, projectId })
    setNewChannelName("")
    setIsAddingChannel(false)
  }

  const handleChannelClick = (channel: Channel) => {
    setActiveView("channel")
    setActiveChannel(channel)
    setActiveDirectMessage(null)
    setMessages([])
    socket.emit("joinChannel", channel._id)
  }

  const handleUserClick = (user: User) => {
    setActiveView("direct")
    setActiveDirectMessage(user)
    setActiveChannel(null)
  }

  const toggleSection = (section: "channels" | "directMessages") => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    date = new Date(date)
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
      const dateKey = new Date(message.createdAt).toDateString()
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
  // //get notePad
  // const {data:note} =useQuery ( {
  //   queryKey: ["notepad",activeChannel?._id],
  //   queryFn :async()=>{
  //   const {data} = await axios.get(`http://localhost:5004/api/notepad/getnotepad/${activeChannel?._id}`)
  //   return data.data?.content
  //   },
  //   enabled: !!activeChannel?._id,
  // })
  // // console.log(note,"=====================note");
  

  // Channel participants detail
  const participantIds = activeChannel?.participants || []
  const { data: users, error: err, isLoading, } = useQuery({
    queryKey: ["other-users", participantIds],
    queryFn: async () => {
      const userPromises = participantIds.map((params) =>
        axiosInstance.get(`/user/others-profile/${params}`).then((res) => res.data.data),
      )
      return Promise.all(userPromises)
    },
    enabled: participantIds.length > 0,
  })

  const { data: channelsData, error, isPending,isLoading:load } = useQuery({
    queryKey: ["getChannel"],
    queryFn: async () => {
      const { data } = await channelAxiosInstance.get(`/getchannel/${projectId}`)
      const channels = data.data
      setChannels(channels)
      if (!activeChannel && channels.length > 0) {
        setActiveChannel(channels[0])
        socket.emit("joinChannel", channels[0]._id)
      }
      return channels
    },
  })

  const { data: project, error: errr, isPending: pending, } = useQuery({
    queryKey: ["getSpecificProject"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5002/api/project/getProject/${projectId}`)
      return data
    },
    enabled: !!projectId,
  })

  // Contributors detail
  const isValidMongoId = (id: string) => /^[a-f\d]{24}$/i.test(id)
  const projectContributorsId = project?.contributors || []
  const { data: contributors, error: contributorsErr, refetch, } = useQuery({
    queryKey: ["other-users", projectContributorsId],
    queryFn: async () => {
      const contributorPromises = projectContributorsId
        .filter((id: string) => isValidMongoId(id))
        .map(async (id: string) => {
          try {
            const res = await axiosInstance.get(`/user/others-profile/${id}`)
            return res.data.data
          } catch (err) {
            console.warn(`User not found: ${id}`)
            return null
          }
        })

      const results = await Promise.all(contributorPromises)
      return results.filter(Boolean)
    },
    enabled: projectContributorsId.length > 0,
  })


  if (isPending || isLoading || pending || load) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <LoaderCircle className="text-purple-900 animate-spin" />
      </div>
    )
  }

  if (error || err || errr) {
    return <div>Error loading channels: {error?.message || err?.message || errr?.message}</div>
  }

  return (
    <div className="flex h-screen bg-white dark:bg-[#200a23] text-gray-900 dark:text-white w-full">
      <div className="w-64 bg-gray-100 dark:bg-[#37113c] flex flex-col dark:border-l">
        <div className="flex-1 overflow-y-auto max-w-sm">
          <div className="px-2 py-4">
            <div
              className="flex items-center px-2 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
              onClick={() => toggleSection("channels")}
            >
              {expandedSections.channels ? ( <ChevronDown className="h-4 w-4 mr-1" /> ) : ( <ChevronRight className="h-4 w-4 mr-1" /> )}
              <span className="text-xs font-semibold uppercase">Channels</span>
            </div>

            {expandedSections.channels && (
              <div className="mt-1 space-y-1">
                {channels.map((channel) => (
                  <div
                    key={channel._id}
                    className={cn(
                      "flex items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#4a1e52]",
                      activeView === "channel" && activeChannel?._id === channel._id ? "bg-gray-200 dark:bg-[#611f69]" : "", )}
                    onClick={() => handleChannelClick(channel)}
                  >
                    <Hash className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    <span className="truncate">{channel.channelName}</span>
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
                        onClick={() => setIsAddingChannel(false)} > Cancel
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
                {contributors?.filter((item)=>item._id !== user?._id)?.map((contributor) => (
                  <div
                    key={contributor?._id}
                    className={cn(
                      "flex items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[#4a1e52]",
                      activeView === "direct" && activeDirectMessage?._id === contributor?._id
                        ? "bg-gray-200 dark:bg-[#611f69]"
                        : "",
                    )}
                    onClick={() => handleUserClick(contributor)}
                  >
                    <div className="relative mr-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={contributor?.profilePicture || "/placeholder.svg"} />
                        <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                          {contributor?.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="truncate">{contributor?.name}</span>
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
        {errorMessage && <div className="text-red-500 text-sm mb-2 px-4">{errorMessage}</div>}
      </div>

      <div className="flex-1 flex flex-col">
        {activeView === "channel" && activeChannel ? (
          <>
            <div className="border-b border-gray-200 dark:border-[#4a1e52] bg-white dark:bg-[#200a23]">
              <div className="h-14 flex items-center px-4">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Hash className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <h2 className="font-semibold">{activeChannel.channelName}</h2>
                    <span className="ml-2 text-sm text-gray-500">{isConnected ? "Connected" : "Disconnected"}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-[#4a1e52]"
                    onClick={() => setIsMembersModalOpen(true)}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </div>

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
                    activeTab === "notes"
                      ? "text-[#611f69] border-b-2 border-[#611f69]"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" }`}
                  onClick={() => setActiveTab("notes")}
                >
                  <span>Note</span>
                </button>
              </div>
            </div>

            {activeTab === "messages" && (
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400">No messages yet</div>
                )}
                {groupMessagesByDate(messages).map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-px flex-1 bg-gray-200 dark:bg-[#4a1e52]"></div>
                      <span className="px-2 text-xs text-gray-500 dark:text-gray-400">{formatDate(group.date)}</span>
                      <div className="h-px flex-1 bg-gray-200 dark:bg-[#4a1e52]"></div>
                    </div>

                    {group.messages.map((message) => (
                      <div key={message._id} className="group">
                        <div className="flex items-start group-hover:bg-gray-50 dark:group-hover:bg-[#2d0e31] px-2 py-1 rounded-md -mx-2">
                          <Avatar className="h-10 w-10 mr-3 mt-1">
                            <AvatarImage src={message.sender.profilePicture || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                              {message.sender.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline">
                              <span className="font-medium mr-2">{message.sender.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(message.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{message.chat}</p>
                            {message.media && (
                              <div className="mt-2">
                                <a href={message.media}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline" >
                                  View Media
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="hidden group-hover:flex items-center space-x-1">
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
            {activeTab === "notes" && <NotePad  channelId={activeChannel._id}/>}

            {activeTab === "messages" && (
              <div className="p-4 border-t border-gray-200 dark:border-[#4a1e52]">
                <div className="flex items-center bg-gray-100 dark:bg-[#2d0e31] rounded-md p-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-[#4a1e52]"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <input type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Message #${activeChannel.channelName}`}
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
                  <Button onClick={handleSendMessage}
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
              </div>
            )}
          </>
        ) : activeView === "direct" && activeDirectMessage ? (
          <DirectMessageChat
            recipientId={activeDirectMessage._id}
            recipientName={activeDirectMessage.name}
            recipientImage={activeDirectMessage.profilePicture}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
              <p className="max-w-md">Select a channel or direct message from the sidebar to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Channel Members Modal */}
      {activeChannel && (
        <ChannelMembersModal
          isOpen={isMembersModalOpen}
          onClose={() => setIsMembersModalOpen(false)}
          channelId={activeChannel._id}
          channelName={activeChannel.channelName}
          currentMembers={users ?? []}
          availableUsers={contributors ?? []}
        />
      )}
    </div>
  )
}

export default ChannelChatpage
