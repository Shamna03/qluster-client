"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Plus,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  Zap,
  Lightbulb,
  DoorClosedIcon as CloseIcon,
} from "lucide-react"
import IdeaForm from "@/Components/share-ideas/IdeaForm"
import IdeaCard from "@/Components/share-ideas/IdeaCard"
import FeaturedIdea from "@/Components/share-ideas/FeaturedIdea"
import { Button } from "@/Components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Input } from "@/Components/ui/input"
import { Badge } from "@/Components/ui/badge"

// Mock data (same as before)
const MOCK_IDEAS = [
  {
    id: "1",
    title: "AI-Powered Code Review Assistant",
    description:
      "An AI tool that automatically reviews code, suggests improvements, and identifies potential bugs before deployment. The system learns from previous reviews and adapts to team coding standards over time.",
    techStack: ["Python", "TensorFlow", "React", "Node.js"],
    category: "AI/ML",
    requiredRoles: ["ML Engineer", "Full Stack Developer", "DevOps"],
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 42,
    comments: 15,
    createdAt: "2025-04-05T10:30:00Z",
    featured: true,
  },
  {
    id: "2",
    title: "Decentralized Developer Marketplace",
    description:
      "A blockchain-based platform connecting developers with clients, featuring smart contracts for secure payments and project delivery. Includes reputation system and dispute resolution.",
    techStack: ["Solidity", "Ethereum", "React", "GraphQL"],
    category: "Blockchain",
    requiredRoles: ["Blockchain Developer", "Frontend Developer", "Smart Contract Auditor"],
    author: {
      name: "Sophia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 38,
    comments: 21,
    createdAt: "2025-04-03T14:15:00Z",
  },
  {
    id: "3",
    title: "Collaborative Coding Environment",
    description:
      "Real-time collaborative code editor with integrated video chat, version control, and AI-assisted pair programming features. Supports multiple programming languages and frameworks.",
    techStack: ["WebRTC", "Socket.io", "TypeScript", "MongoDB"],
    category: "Developer Tools",
    requiredRoles: ["Backend Developer", "Frontend Developer", "UX Designer"],
    author: {
      name: "Marcus Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 56,
    comments: 32,
    createdAt: "2025-04-01T09:45:00Z",
  },
  {
    id: "4",
    title: "Cross-Platform Mobile Development Framework",
    description:
      "A lightweight framework for building high-performance native mobile apps from a single codebase. Focuses on developer experience and runtime performance.",
    techStack: ["Rust", "WebAssembly", "Kotlin", "Swift"],
    category: "Mobile",
    requiredRoles: ["Mobile Developer", "Systems Programmer", "UI Designer"],
    author: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 29,
    comments: 18,
    createdAt: "2025-03-28T16:20:00Z",
  },
  {
    id: "5",
    title: "Serverless Deployment Pipeline",
    description:
      "An end-to-end CI/CD pipeline specifically designed for serverless applications. Includes testing, security scanning, and gradual rollout capabilities.",
    techStack: ["AWS Lambda", "GitHub Actions", "Terraform", "Python"],
    category: "DevOps",
    requiredRoles: ["DevOps Engineer", "Cloud Architect", "Backend Developer"],
    author: {
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 34,
    comments: 12,
    createdAt: "2025-03-25T11:10:00Z",
  },
  {
    id: "6",
    title: "Accessibility Testing Framework",
    description:
      "An automated testing framework for identifying and fixing accessibility issues in web applications. Provides detailed reports and suggestions for improvements.",
    techStack: ["JavaScript", "Puppeteer", "ARIA", "HTML"],
    category: "Web Development",
    requiredRoles: ["Frontend Developer", "Accessibility Specialist", "QA Engineer"],
    author: {
      name: "Taylor Morgan",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    likes: 47,
    comments: 23,
    createdAt: "2025-03-22T08:45:00Z",
  },
]

const categories = [
  "All",
  "AI/ML",
  "Blockchain",
  "Web Development",
  "Mobile",
  "DevOps",
  "Developer Tools",
  "IoT",
  "Cybersecurity",
]

const sortOptions = [
  { value: "trending", label: "Trending", icon: <TrendingUp className="h-4 w-4" /> },
  { value: "newest", label: "Newest", icon: <Clock className="h-4 w-4" /> },
  { value: "popular", label: "Most Popular", icon: <Users className="h-4 w-4" /> },
]

export default function ShareIdeasPage() {
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("trending")
  const [ideas, setIdeas] = useState(MOCK_IDEAS)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const filteredIdeas = ideas.filter(
    (idea) =>
      (selectedCategory === "All" || idea.category === selectedCategory) &&
      (idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        idea.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === "popular") {
      return b.likes - a.likes
    } else {
      // Trending - combination of recency and popularity
      const recencyA = new Date(a.createdAt).getTime()
      const recencyB = new Date(b.createdAt).getTime()
      const popularityA = a.likes + a.comments * 2
      const popularityB = b.likes + b.comments * 2

      const scoreA = popularityA * 0.7 + recencyA * 0.3
      const scoreB = popularityB * 0.7 + recencyB * 0.3

      return scoreB - scoreA
    }
  })

  const featuredIdea = ideas.find((idea) => idea.featured)
  const regularIdeas = sortedIdeas.filter((idea) => !idea.featured)

  const handleAddIdea = (newIdea) => {
    setIdeas([
      {
        id: (ideas.length + 1).toString(),
        ...newIdea,
        likes: 0,
        comments: 0,
        createdAt: new Date().toISOString(),
        author: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
        },
      },
      ...ideas,
    ])
    setShowForm(false)
  }

  const motivationalPhrases = [
    "Build together, grow together",
    "From idea to reality",
    "Connect. Collaborate. Create.",
    "Turn your vision into code",
  ]

  const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e] mt-30">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-purple-100/40 to-transparent dark:from-purple-900/20 rounded-bl-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-100/40 to-transparent dark:from-purple-900/20 rounded-tr-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 py-12 max-w-7xl relative">
        <div className="flex flex-col gap-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl blur-xl -z-10 transform rotate-1"></div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 dark:border-purple-900/50 shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-br from-[#37113c] to-[#611f69] p-3 rounded-xl shadow-lg">
                      <Lightbulb className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#37113c] to-[#611f69] bg-clip-text text-transparent">
                      Project Ideas Hub
                    </h1>
                  </div>
                  <p className="text-muted-foreground mt-3 max-w-2xl">
                    <span className="font-medium text-[#611f69] dark:text-purple-300">{randomPhrase}</span> – Share
                    innovative project ideas and discover exciting collaboration opportunities with talented developers
                    worldwide.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge
                      variant="outline"
                      className="bg-purple-100/80 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/50"
                    >
                      {ideas.length} Ideas Shared
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-green-100/80 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800/50"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      120+ Active Collaborators
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/50"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Featured Projects
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={() => setShowForm(!showForm)}
                  className={`relative group overflow-hidden bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white shadow-md hover:shadow-lg transition-all duration-300 px-6 py-6 rounded-xl`}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-lg group-hover:opacity-75 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    {showForm ? "Cancel" : "Share Your Idea"}
                    {showForm ? <CloseIcon className="ml-2 h-4 w-4" /> : <Plus className="ml-2 h-4 w-4" />}
                  </span>
                </Button>
              </div>

              {/* Idea Submission Form */}
              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8"
                  >
                    <IdeaForm onSubmit={handleAddIdea} onCancel={() => setShowForm(false)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Featured Idea */}
          {featuredIdea && !showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#37113c]/20 to-[#611f69]/20 rounded-2xl blur-xl -z-10"></div>
                <FeaturedIdea idea={featuredIdea} />
              </div>
            </motion.div>
          )}

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`sticky top-16 z-10 backdrop-blur-md py-5 px-6 rounded-xl transition-all duration-300 ${
              isScrolled
                ? "bg-white/90 dark:bg-gray-900/90 shadow-lg border border-purple-100 dark:border-purple-900/30"
                : "bg-white/70 dark:bg-gray-900/70 border border-transparent"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 dark:text-purple-400 h-4 w-4" />
                <Input
                  placeholder="Search project ideas..."
                  className="pl-10 bg-white/80 dark:bg-gray-800/80 border-purple-200 dark:border-purple-900/50 focus-visible:ring-[#611f69]/20 rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="text-purple-500 dark:text-purple-400 h-4 w-4" />
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <div className="relative">
                    <Tabs
                      defaultValue="All"
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                      className="w-full md:w-auto"
                    >
                      <TabsList className="bg-white/50 dark:bg-gray-800/50 h-9 overflow-x-auto flex-nowrap">
                        {categories.slice(0, 4).map((category) => (
                          <TabsTrigger key={category} value={category} className="text-xs whitespace-nowrap rounded-md">
                            {category}
                          </TabsTrigger>
                        ))}
                        <TabsTrigger
                          value="more"
                          className="text-xs rounded-md"
                          onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                        >
                          More...
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    {/* Dropdown for additional categories */}
                    <AnimatePresence>
                      {showCategoryMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-purple-100 dark:border-purple-900/50 p-2 z-20"
                        >
                          <div className="grid grid-cols-2 gap-1">
                            {categories.slice(4).map((category) => (
                              <Button
                                key={category}
                                variant="ghost"
                                size="sm"
                                className="text-xs justify-start"
                                onClick={() => {
                                  setSelectedCategory(category)
                                  setShowCategoryMenu(false)
                                }}
                              >
                                {category}
                              </Button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort:</span>
                  <Tabs defaultValue="trending" value={sortBy} onValueChange={setSortBy} className="w-full md:w-auto">
                    <TabsList className="bg-white/50 dark:bg-gray-800/50 h-9">
                      {sortOptions.map((option) => (
                        <TabsTrigger
                          key={option.value}
                          value={option.value}
                          className="text-xs flex items-center gap-1"
                        >
                          {option.icon}
                          {option.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Active filters */}
            <AnimatePresence>
              {(selectedCategory !== "All" || searchQuery) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 mt-3"
                >
                  <span className="text-xs text-muted-foreground">Active filters:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategory !== "All" && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/50"
                        >
                          {selectedCategory}
                          <button
                            className="ml-1 hover:text-purple-900 dark:hover:text-purple-100"
                            onClick={() => setSelectedCategory("All")}
                          >
                            ×
                          </button>
                        </Badge>
                      </motion.div>
                    )}
                    {searchQuery && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/50"
                        >
                          "{searchQuery}"
                          <button
                            className="ml-1 hover:text-purple-900 dark:hover:text-purple-100"
                            onClick={() => setSearchQuery("")}
                          >
                            ×
                          </button>
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Ideas Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {regularIdeas.length > 0 ? (
              regularIdeas.map((idea, index) => (
                <motion.div key={idea.id} variants={itemVariants} className="h-full">
                  <div className="h-full transform transition-transform duration-300 hover:scale-[1.02] hover:-rotate-1">
                    <IdeaCard idea={idea} />
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={itemVariants}
                className="col-span-full flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-8 mb-6 shadow-inner">
                  <Search className="h-12 w-12 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">No ideas found</h3>
                <p className="text-muted-foreground mb-8 max-w-md">
                  We couldn't find any project ideas matching your search criteria. Try adjusting your filters or be the
                  first to share an idea!
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white px-6 py-6 rounded-xl"
                >
                  Share Your Idea <Plus className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Explore More */}
          {regularIdeas.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center mt-12"
            >
              <Button
                variant="outline"
                className="relative group overflow-hidden border-purple-200 dark:border-purple-900/50 hover:border-purple-300 dark:hover:border-purple-800 px-6 py-6 rounded-xl"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/10 transition-all duration-500"></span>
                <span className="relative flex items-center">
                  Explore More Ideas
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          )}

          {/* Footer section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16 pt-8 border-t border-purple-100 dark:border-purple-900/30 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Join our community of innovative developers and bring your ideas to life
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="ghost" size="sm" className="text-purple-600 dark:text-purple-400">
                About
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-600 dark:text-purple-400">
                Guidelines
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-600 dark:text-purple-400">
                FAQ
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-600 dark:text-purple-400">
                Contact
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
