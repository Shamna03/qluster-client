"use client"

import { useState } from "react"
import { Heart, MessageSquare, Share2, Bookmark, Star, ArrowRight, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"

export default function FeaturedIdea({ idea }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(idea.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  // Format date to relative time (e.g., "2 days ago")
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
    return `${Math.floor(diffInSeconds / 31536000)} years ago`
  }

  return (
    <Card className="border-purple-200 dark:border-purple-900/50 overflow-hidden bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a0d1e]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#37113c] to-[#611f69]" />
      <CardHeader className="pb-2 flex flex-row items-center space-y-0 gap-2">
        <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-medium text-purple-800 dark:text-purple-300">Featured Idea</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Avatar className="h-8 w-8 ring-2 ring-purple-200 dark:ring-purple-900/50">
            <AvatarImage src={idea.author.avatar} alt={idea.author.name} />
            <AvatarFallback className="bg-gradient-to-br from-[#37113c] to-[#611f69] text-white">
              {idea.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{idea.author.name}</span>
            <span className="text-xs text-muted-foreground">{formatRelativeTime(idea.createdAt)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#611f69]">{idea.title}</h2>
            <p className="text-muted-foreground">{idea.description}</p>

            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Users className="h-3 w-3 text-purple-800 dark:text-purple-300" />
                  </div>
                  <span className="font-medium">Looking for:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {idea.requiredRoles.map((role, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-purple-800 dark:text-purple-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">Tech Stack:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {idea.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-[#37113c]/10 to-[#611f69]/10 rounded-lg flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-xs text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#37113c] to-[#611f69] rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Join This Project</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Be part of this innovative project and collaborate with talented developers
                  </p>
                  <Button className="bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white w-full">
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-purple-100 dark:border-purple-900/30 flex justify-between">
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLike}>
                  <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="sr-only">Like</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Like this idea</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-sm text-muted-foreground">{likeCount}</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MessageSquare className="h-4 w-4" />
                  <span className="sr-only">Comment</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comment on this idea</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-sm text-muted-foreground">{idea.comments}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-purple-200 dark:border-purple-900/50 hover:border-purple-300 dark:hover:border-purple-800"
          >
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share this idea</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSaved(!saved)}>
                  <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                  <span className="sr-only">Save</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{saved ? "Unsave" : "Save"} this idea</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  )
}
