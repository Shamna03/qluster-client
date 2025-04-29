"use client"

import { useState, useEffect, FormEvent } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  ArrowLeft,
  Users,
  Code,
  Calendar,
  Clock,
  LinkIcon,
  Github,
  Globe,
  Send,
  ChevronDown,
  ChevronUp,
  Star,
  UserPlus,
  Lightbulb,
  Rocket,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card"
import { Progress } from "@/Components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import Link from 'next/link'

interface Author {
  name: string
  avatar: string
  title: string
  company: string
  github?: string
  website?: string
}

interface TeamMember {
  name: string
  avatar: string
  role: string
}

interface Update {
  date: string
  content: string
}

interface Resource {
  type: string
  name: string
  url: string
}

interface Idea {
  id: string
  title: string
  description: string
  problem: string
  solution: string
  techStack: string[]
  category: string
  requiredRoles: string[]
  author: Author
  likes: number
  comments: number
  createdAt: string
  featured: boolean
  progress: number
  status: string
  team: TeamMember[]
  updates: Update[]
  resources: Resource[]
}

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  createdAt: string
  likes: number
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

const MOCK_IDEAS: Idea[] = [
  {
    id: "1",
    title: "AI-Powered Code Review Assistant",
    description:
      "An AI tool that automatically reviews code, suggests improvements, and identifies potential bugs before deployment. The system learns from previous reviews and adapts to team coding standards over time.",
    problem:
      "Manual code reviews are time-consuming and can miss subtle issues. Developers need a way to get instant feedback on their code quality and potential bugs.",
    solution:
      "Our AI-powered assistant analyzes code against best practices, team standards, and common bug patterns to provide instant, actionable feedback.",
    techStack: ["Python", "TensorFlow", "React", "Node.js", "Docker", "AWS"],
    category: "AI/ML",
    requiredRoles: ["ML Engineer", "Full Stack Developer", "DevOps", "UI/UX Designer"],
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Senior AI Engineer",
      company: "TechInnovate",
      github: "alexj",
      website: "alexjohnson.dev",
    },
    likes: 42,
    comments: 15,
    createdAt: "2025-04-05T10:30:00Z",
    featured: true,
    progress: 25,
    status: "Planning",
    team: [
      { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40", role: "ML Engineer" },
      { name: "Michael Rodriguez", avatar: "/placeholder.svg?height=40&width=40", role: "Full Stack Developer" },
    ],
    updates: [
      { date: "2025-04-10", content: "Project kickoff meeting scheduled for next week" },
      { date: "2025-04-07", content: "Added initial project requirements document" },
      { date: "2025-04-05", content: "Project idea published" },
    ],
    resources: [
      { type: "document", name: "Project Requirements", url: "#" },
      { type: "repository", name: "Initial Prototype", url: "#" },
    ],
  },
  {
    id: "2",
    title: "Decentralized Developer Marketplace",
    description:
      "A blockchain-based platform connecting developers with clients, featuring smart contracts for secure payments and project delivery. Includes reputation system and dispute resolution.",
    problem:
      "Traditional freelance platforms charge high fees and don't provide adequate security for both clients and developers.",
    solution:
      "Our decentralized marketplace uses blockchain technology and smart contracts to ensure secure, transparent transactions with lower fees.",
    techStack: ["Solidity", "Ethereum", "React", "GraphQL", "IPFS", "Web3.js"],
    category: "Blockchain",
    requiredRoles: ["Blockchain Developer", "Frontend Developer", "Smart Contract Auditor", "UX Researcher"],
    author: {
      name: "Sophia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Blockchain Architect",
      company: "DAppWorks",
      github: "sophiac",
      website: "sophiachen.io",
    },
    likes: 38,
    comments: 21,
    createdAt: "2025-04-03T14:15:00Z",
    featured: false,
    progress: 15,
    status: "Recruiting",
    team: [{ name: "James Wilson", avatar: "/placeholder.svg?height=40&width=40", role: "Smart Contract Developer" }],
    updates: [
      { date: "2025-04-08", content: "Published initial smart contract design" },
      { date: "2025-04-03", content: "Project idea published" },
    ],
    resources: [{ type: "document", name: "Smart Contract Architecture", url: "#" }],
  },
]

const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: {
      name: "Emily Parker",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "This is a fantastic idea! I've been thinking about something similar. Have you considered integrating with existing CI/CD pipelines?",
    createdAt: "2025-04-07T15:30:00Z",
    likes: 8,
  },
  {
    id: "c2",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "I'd be interested in contributing to this project. I have experience with TensorFlow and building ML models for code analysis.",
    createdAt: "2025-04-06T09:45:00Z",
    likes: 5,
  },
  {
    id: "c3",
    author: {
      name: "Rachel Singh",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Have you looked at GitHub Copilot? How would this be different or better?",
    createdAt: "2025-04-06T11:20:00Z",
    likes: 3,
  },
]

const ProjectDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [idea, setIdea] = useState<Idea | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState<string>("")
  const [liked, setLiked] = useState<boolean>(false)
  const [saved, setSaved] = useState<boolean>(false)
  const [showAllUpdates, setShowAllUpdates] = useState<boolean>(false)
  const [showTeamSection, setShowTeamSection] = useState<boolean>(true)

  useEffect(() => {
    const fetchIdea = async () => {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const foundIdea = MOCK_IDEAS.find((idea) => idea.id === params.id)
        if (foundIdea) {
          setIdea(foundIdea)
          setComments(MOCK_COMMENTS)
        } else {
          router.push("/share-ideas")
        }
      } catch (error) {
        console.error("Error fetching idea:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchIdea()
    }
  }, [params.id, router])

  const handleLike = () => {
    setLiked(!liked)
    if (idea) {
      setIdea({
        ...idea,
        likes: liked ? idea.likes - 1 : idea.likes + 1,
      })
    }
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  const handleSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: `c${comments.length + 1}`,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")

    if (idea) {
      setIdea({
        ...idea,
        comments: idea.comments + 1,
      })
    }
  }

  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
    return `${Math.floor(diffInSeconds / 31536000)} years ago`
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-[#611f69]">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#611f69] mb-4">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button
            onClick={() => router.push("/share-ideas")}
            className="bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e] ">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-purple-100/40 to-transparent dark:from-purple-900/20 rounded-bl-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-100/40 to-transparent dark:from-purple-900/20 rounded-tr-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 py-8 max-w-7xl pt-30">
        <Button
          variant="ghost"
          className="mb-6 text-[#611f69] dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20"
          onClick={() => router.push("/share-ideas")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>

        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl blur-xl -z-10 transform rotate-1"></div>
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 dark:border-purple-900/50 shadow-lg">
            <div className="flex flex-col md:flex-row gap-6 justify-between">
              <div className="space-y-4 flex-1">
                {idea.featured && (
                  <div className="flex items-center gap-2 w-fit bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium text-purple-800 dark:text-purple-300">Featured Project</span>
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#37113c] to-[#611f69] bg-clip-text text-transparent">
                  {idea.title}
                </h1>

                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-purple-200 dark:ring-purple-900/50">
                    <AvatarImage src={idea.author.avatar || "/placeholder.svg"} alt={idea.author.name} />
                    <AvatarFallback className="bg-gradient-to-br from-[#37113c] to-[#611f69] text-white">
                      {idea.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{idea.author.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {idea.author.title} at {idea.author.company}
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    {idea.author.github && (
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                    {idea.author.website && (
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                        <Globe className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-none">
                    {idea.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(idea.createdAt)}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatRelativeTime(idea.createdAt)}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
                  <div className="text-sm font-medium mb-2">Project Status</div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      className={`
                      ${idea.status === "Planning" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" : ""}
                      ${idea.status === "Recruiting" ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300" : ""}
                      ${idea.status === "In Progress" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" : ""}
                      ${idea.status === "Completed" ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300" : ""}
                      border-none
                    `}
                    >
                      {idea.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{idea.progress}%</span>
                    </div>
                    <Progress value={idea.progress} className="h-2" />
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Join This Project
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={handleLike}>
                    <Heart className={`mr-2 h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                    {idea.likes}
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleSave}>
                    <Bookmark className={`mr-2 h-4 w-4 ${saved ? "fill-current" : ""}`} />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-white/50 dark:bg-gray-900/50 p-1 rounded-lg">
                <TabsTrigger value="overview" className="rounded-md">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="updates" className="rounded-md">
                  Updates
                </TabsTrigger>
                <TabsTrigger value="team" className="rounded-md">
                  Team
                </TabsTrigger>
                <TabsTrigger value="comments" className="rounded-md">
                  Comments ({idea.comments})
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300 mb-2">
                            <Lightbulb className="h-5 w-5" />
                            Project Description
                          </h3>
                          <p className="text-muted-foreground">{idea.description}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300 mb-2">
                              <AlertCircle className="h-5 w-5" />
                              Problem
                            </h3>
                            <p className="text-muted-foreground">{idea.problem}</p>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300 mb-2">
                              <Rocket className="h-5 w-5" />
                              Solution
                            </h3>
                            <p className="text-muted-foreground">{idea.solution}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300 mb-2">
                            <Code className="h-5 w-5" />
                            Tech Stack
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {idea.techStack.map((tech, index) => (
                              <Badge
                                key={index}
                                className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-none px-3 py-1"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300 mb-2">
                            <Users className="h-5 w-5" />
                            Roles Needed
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {idea.requiredRoles.map((role, index) => (
                              <Badge
                                key={index}
                                className="bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 border-none px-3 py-1"
                              >
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {idea.resources && idea.resources.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300 mb-2">
                              <LinkIcon className="h-5 w-5" />
                              Resources
                            </h3>
                            <div className="space-y-2">
                              {idea.resources.map((resource, index) => (
                                <a
                                  key={index}
                                  href={resource.url}
                                  className="flex items-center gap-2 text-[#611f69] dark:text-purple-300 hover:underline"
                                >
                                  {resource.type === "document" ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : (
                                    <Github className="h-4 w-4" />
                                  )}
                                  {resource.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="updates" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300">
                        <Sparkles className="h-5 w-5" />
                        Project Updates
                      </CardTitle>
                      <CardDescription>Follow the latest developments and progress on this project</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(showAllUpdates ? idea.updates : idea.updates.slice(0, 3)).map((update, index) => (
                          <div key={index} className="relative pl-6 pb-4">
                            {index !== idea.updates.length - 1 && (
                              <div className="absolute left-2.5 top-2.5 w-0.5 h-full bg-purple-200 dark:bg-purple-900/50"></div>
                            )}
                            <div className="absolute left-0 top-2 h-5 w-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400"></div>
                            </div>
                            <div className="text-xs text-muted-foreground mb-1">{formatDate(update.date)}</div>
                            <p className="text-sm">{update.content}</p>
                          </div>
                        ))}

                        {idea.updates.length > 3 && (
                          <Button
                            variant="ghost"
                            className="w-full text-[#611f69] dark:text-purple-300"
                            onClick={() => setShowAllUpdates(!showAllUpdates)}
                          >
                            {showAllUpdates ? (
                              <>
                                Show Less <ChevronUp className="ml-2 h-4 w-4" />
                              </>
                            ) : (
                              <>
                                Show All Updates <ChevronDown className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="team" className="space-y-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300">
                          <Users className="h-5 w-5" />
                          Project Team
                        </CardTitle>
                        <CardDescription>Meet the people working on this project</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        className="text-[#611f69] dark:text-purple-300"
                        onClick={() => setShowTeamSection(!showTeamSection)}
                      >
                        {showTeamSection ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CardHeader>

                    <AnimatePresence>
                      {showTeamSection && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 ring-2 ring-purple-200 dark:ring-purple-900/50">
                                  <AvatarImage src={idea.author.avatar || "/placeholder.svg"} alt={idea.author.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-[#37113c] to-[#611f69] text-white">
                                    {idea.author.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{idea.author.name}</div>
                                  <div className="text-sm text-muted-foreground">Project Lead</div>
                                </div>
                              </div>

                              <div className="h-[1px] w-full bg-border shrink-0"></div>

                              {idea.team.length > 0 ? (
                                <div className="space-y-3">
                                  {idea.team.map((member, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                      <Avatar className="h-10 w-10 ring-2 ring-purple-200 dark:ring-purple-900/50">
                                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                        <AvatarFallback className="bg-gradient-to-br from-[#37113c] to-[#611f69] text-white">
                                          {member.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <div className="font-medium">{member.name}</div>
                                        <div className="text-sm text-muted-foreground">{member.role}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-6">
                                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                                  <h3 className="text-lg font-medium mb-1">Team is forming</h3>
                                  <p className="text-sm text-muted-foreground mb-4">
                                    Be the first to join this exciting project!
                                  </p>
                                  <Button className="bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Join Team
                                  </Button>
                                </div>
                              )}

                              <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-[#611f69] dark:text-purple-300 mb-2 flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4" />
                                  Roles Still Needed
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {idea.requiredRoles
                                    .filter((role) => !idea.team.some((member) => member.role === role))
                                    .map((role, index) => (
                                      <Badge
                                        key={index}
                                        className="bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 border-none"
                                      >
                                        {role}
                                      </Badge>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </TabsContent>

                <TabsContent value="comments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300">
                        <MessageSquare className="h-5 w-5" />
                        Discussion
                      </CardTitle>
                      <CardDescription>Share your thoughts and feedback on this project idea</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitComment} className="mb-6">
                        <div className="flex gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
                            <AvatarFallback className="bg-gradient-to-br from-[#37113c] to-[#611f69] text-white">
                              Y
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex gap-2">
                            <Textarea
                              placeholder="Add a comment..."
                              className="flex-1 min-h-[80px] border-purple-200 dark:border-purple-900/50 focus-visible:ring-[#611f69]/20"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button
                              type="submit"
                              className="bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white self-end"
                              disabled={!newComment.trim()}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </form>

                      <div className="space-y-6">
                        {comments.length > 0 ? (
                          comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={comment.author.avatar || "/placeholder.svg"}
                                  alt={comment.author.name}
                                />
                                <AvatarFallback className="bg-gradient-to-br from-[#37113c] to-[#611f69] text-white">
                                  {comment.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium">{comment.author.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {formatRelativeTime(comment.createdAt)}
                                  </span>
                                </div>
                                <p className="text-sm mb-2">{comment.content}</p>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" className="h-7 px-2">
                                    <Heart className="h-3 w-3 mr-1" />
                                    <span className="text-xs">{comment.likes}</span>
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-7 px-2">
                                    <MessageSquare className="h-3 w-3 mr-1" />
                                    <span className="text-xs">Reply</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                            <h3 className="text-lg font-medium mb-1">No comments yet</h3>
                            <p className="text-sm text-muted-foreground">Be the first to share your thoughts!</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-[#1a0d1e] border-purple-200 dark:border-purple-900/50 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#37113c] to-[#611f69]" />
              <CardHeader>
                <Link href="/join">
                  <CardTitle className="text-lg font-semibold text-[#611f69] dark:text-purple-300 cursor-pointer">
                    Join This Project
                  </CardTitle>
                </Link>
                <CardDescription>Collaborate with talented developers and bring this idea to life</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-[#611f69] dark:text-purple-300" />
                    <span className="font-medium text-sm">Team Size</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current members</span>
                    <span className="font-medium">{idea.team.length + 1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Roles needed</span>
                    <span className="font-medium">{idea.requiredRoles.length}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-[#611f69] dark:text-purple-300" />
                    <span className="font-medium text-sm">Timeline</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="text-sm">{formatDate(idea.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last update</span>
                    <span className="text-sm">
                      {idea.updates.length > 0 ? formatDate(idea.updates[0].date) : "N/A"}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Apply to Join
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-[#611f69] dark:text-purple-300">
                  Similar Projects
                </CardTitle>
                <CardDescription>Explore other projects in {idea.category}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {MOCK_IDEAS.filter((i) => i.id !== idea.id && i.category === idea.category).map((similarIdea) => (
                  <div
                    key={similarIdea.id}
                    className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/share-ideas/${similarIdea.id}`)}
                  >
                    <h4 className="font-medium text-[#611f69] dark:text-purple-300 mb-1">{similarIdea.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{similarIdea.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{formatRelativeTime(similarIdea.createdAt)}</span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {similarIdea.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {similarIdea.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  View More Projects
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailPage