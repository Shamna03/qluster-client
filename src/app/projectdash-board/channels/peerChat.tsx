
"use client"
import { useState, useEffect, useRef, type FormEvent } from "react"
import { Send, Plus, FileUp, LoaderCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { cn } from "@/lib/utils"
import { io, type Socket } from "socket.io-client"
import useAuthStore from "@/store/useAuthStore"
import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/api/axiosInstance"

interface Message {
  _id: string
  sender: string,
  receiver: string,
  content: string
  createdAt: Date
}

interface DirectMessageChatProps {
  recipientId: string
  recipientName: string
  recipientImage?: string
}

const socket: Socket = io("http://localhost:5004", {
  withCredentials: true,
  transports: ["websocket"],
})

const DirectMessageChat = ({ recipientId, recipientName, recipientImage }: DirectMessageChatProps) => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isConnected, setIsConnected] = useState(socket.connected)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuthStore()
console.log(recipientImage);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (!user?._id || !recipientId) return

    socket.on("connect", () => setIsConnected(true))
    socket.on("connect_error", () => setIsConnected(false))

    socket.emit("join", { userId: user._id })
    socket.emit("load_messages", { user1: user._id, user2: recipientId })

    socket.on("previous_messages", (fetchedMessages: Message[]) => {
      setMessages(fetchedMessages)
      setIsLoading(false)
    })

    socket.on("message", (message: Message) => {
      if (
        (message.sender === user._id && message.receiver === recipientId) ||
        (message.sender === recipientId && message.receiver === user._id)
      ) {
        setMessages((prev) => [...prev, message])
      }
    })

    return () => {
      socket.off("connect")
      socket.off("connect_error")
      socket.off("previous_messages")
      socket.off("message")
    }
  }, [user?._id, recipientId])

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !user?._id || !recipientId) return
  
    const messagePayload = {
      sender: user._id,
      receiver: recipientId,
      content: input,
    }
  
    setInput("") 
    socket.emit("private_message", messagePayload) 
  }
  

  const formatTime = (date: Date) =>
    new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderCircle className="text-purple-900 animate-spin h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-[#4a1e52] bg-white dark:bg-[#200a23] h-14 flex items-center px-4">
        <Avatar className="h-8 w-8 mr-3">
          <AvatarImage src={recipientImage || "/placeholder.svg"} />
          <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
            {recipientName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h2 className="font-semibold">{recipientName}</h2>
        <span className="ml-2 text-sm text-gray-500">{isConnected ? "Connected" : "Disconnected"}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">No messages yet</div>
        ) : (
          messages.map((message) => {
            const isCurrentUser = message?.sender === user?._id
            return (
              <div key={message._id} className={`flex w-full ${isCurrentUser ? "justify-end" : "justify-start"} mb-2`}>
                <div className={`flex items-end max-w-[70%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className={`h-8 w-8 ${isCurrentUser ? "ml-2" : "mr-2"}`}>
                    <AvatarImage
                      src={ isCurrentUser ? user.profilePicture || "/placeholder.svg" : recipientImage || "/placeholder.svg" }
                    />
                    <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                      {(isCurrentUser ? user.name : recipientName)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn( "px-4 py-2 rounded-lg shadow", isCurrentUser ? "bg-[#611f69] text-white rounded-br-none" : "bg-gray-100 dark:bg-[#2d0e31] text-gray-900 dark:text-white rounded-bl-none" )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-right text-gray-300 mt-1">{formatTime(message.createdAt)}</p>
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-[#4a1e52]">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 bg-gray-100 dark:bg-[#2d0e31] rounded-full px-4 py-2"
        >
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${recipientName}`}
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage(e)
              }
            }}
          />
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
            <FileUp className="h-4 w-4" />
          </Button>
          <Button
            type="submit"
            disabled={!input.trim()}
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", input.trim() ? "text-[#611f69]" : "text-gray-500")}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default DirectMessageChat