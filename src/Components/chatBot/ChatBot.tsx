"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, X, Maximize2, Minimize2, ChevronDown, ChevronUp, Loader2, Ellipsis } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { cn } from "@/lib/utils"
import { io } from "socket.io-client"
import useAuthStore from "@/store/useAuthStore"

const socket = io("http://localhost:5005",{
  withCredentials:true
})

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Qluster AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const {user }= useAuthStore()
  

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Socket.io event listeners
  useEffect(() => {
    if(!socket.connected){
      console.log("🧪 socket connected?", socket.connected)

    }

    // Listen for replies from the AI
    socket.on("reply", (data) => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        content: data,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    })

    // Cleanup on unmount
    return () => {
      socket.off("reply")
    }
  }, [])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Send message to server via socket
    socket.emit("message", input)

    // Clear input and show typing indicator
    setInput("")
    setIsTyping(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
    if (!isChatOpen) {
      setIsMinimized(false)
    }
  }

  return (
    <>
      {/* Chat button */}
      {!isChatOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={toggleChat}
            className="h-14 w-14 rounded-full bg-[#611f69] hover:bg-[#611f69]/90 text-white shadow-lg animate-bounce"
          >
            <Bot size={24}  className="animate-pulse"/>
          </Button>
        </motion.div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : isExpanded ? "90vh" : "500px",
              width: isExpanded ? "90vw" : "380px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn("fixed z-50 overflow-hidden", isExpanded ? "top-[5vh] left-[5vw]" : "bottom-6 right-6")}
          >
            <Card className="flex flex-col h-full border-[#611f69]/20 shadow-xl bg-white dark:bg-gray-900">
              {/* Header */}
              <CardHeader className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-[#611f69]/10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                      <Bot size={16} />
                    </AvatarFallback>
                  </Avatar>
                    {!isMinimized && (
                      <p className="bg-green-700 h-[10px] w-[10px] mt-6 ml-6 rounded-full absolute "></p>
                    )}
                  <div>
                    <CardTitle className="text-base text-gray-800 dark:text-white">Qluster AI</CardTitle>
                    {/* {!isMinimized && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none"
                      >
                        Online
                      </Badge>
                    )} */}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!isMinimized && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={toggleChat}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </CardHeader>

              {/* Chat content */}
              {!isMinimized && (
                <>
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                      >
                        <div className="flex gap-2 max-w-[80%]">
                          {message.role === "assistant" && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                                <Bot size={16} />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <div
                              className={cn(
                                "rounded-lg p-3",
                                message.role === "user"
                                  ? "bg-[#611f69] text-white"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
                              )}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 ml-1">{formatTime(message.timestamp)}</p>
                          </div>
                          {message.role === "user" && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                               {user?.profilePicture ?<img src={user?.profilePicture}/>: <User size={16} />}
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex gap-2 max-w-[80%]">
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                              <Bot size={16} />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="rounded-lg p-3 bg-transparent">
                              <div className="flex items-center gap-1">
                             < Ellipsis className=" animate-pulse"/>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 ml-1">Qluster is typing...</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </CardContent>

                  {/* Input area */}
                  <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex w-full gap-2">
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything..."
                        className={cn("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            "min-h-[40px] resize-none focus-visible:ring-[#611f69] ")}                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isTyping}
                        className="bg-[#611f69] hover:bg-[#611f69]/90 text-white"
                      >
                        {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
