"use client"

import { useState } from "react"
import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal, ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/Components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import { useRouter } from "next/navigation"

export default function IdeaCard({ idea }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(idea.likes)
  const router = useRouter()

  const handleLike = (e) => {
    e.stopPropagation() 
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleSave = (e) => {
    e.stopPropagation() 
    setSaved(!saved)
  }

  const handleShare = (e) => {
    e.stopPropagation() 
    
  }

  const handleComment = (e) => {
    e.stopPropagation() 
    router.push(`/share-ideas/${idea.id}#comments`)
  }

  const handleCardClick = () => {
    router.push(`/share-ideas/${idea.id}`)
  }

 
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
    <Card
      className="h-full flex flex-col border-purple-100 dark:border-purple-900/50 hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2 flex flex-row items-center space-y-0 gap-2">
        <Avatar className="h-8 w-8 ring-2 ring-purple-100 dark:ring-purple-900/50">
          <AvatarImage src={idea.author.avatar || "/placeholder.svg"} alt={idea.author.name} />
          <AvatarFallback className="bg-gradient-to-br from-[#37113c] to-[#611f69] text-white">
            {idea.author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{idea.author.name}</span>
          <span className="text-xs text-muted-foreground">{formatRelativeTime(idea.createdAt)}</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 ml-auto"
          onClick={(e) => e.stopPropagation()} 
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[#611f69] transition-colors duration-200">
              {idea.title}
            </h3>
            <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 mt-1">
              {idea.category}
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-3">{idea.description}</p>

          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium">Tech Stack:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {idea.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium">Looking for:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {idea.requiredRoles.map((role, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-purple-100 dark:border-purple-900/30">
        <div className="flex items-center justify-between w-full">
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
            <span className="text-xs text-muted-foreground">{likeCount}</span>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleComment}>
                    <MessageSquare className="h-4 w-4" />
                    <span className="sr-only">Comment</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Comment on this idea</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-xs text-muted-foreground">{idea.comments}</span>
          </div>

          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
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
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSave}>
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
        </div>
      </CardFooter>

      {/* Hover overlay with action button */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#37113c]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6 pointer-events-none">
        <Button className="bg-white text-[#611f69] hover:bg-white/90 pointer-events-auto mb-4 shadow-lg">
          View Details <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
