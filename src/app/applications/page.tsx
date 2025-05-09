"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowUpRight, CheckCircle, Clock, Filter, Search, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select"

type ApplicationStatus = "pending" | "approved" | "rejected"
type TabValue = "all" | ApplicationStatus

interface ApplicationOwner {
  name: string
  avatar: string
}

interface Application {
  id: string
  projectId: string
  projectTitle: string
  projectDescription: string
  role: string
  status: ApplicationStatus
  submittedAt: string
  category: string
  owner: ApplicationOwner
  feedback?: string
}

const MOCK_APPLICATIONS: Application[] = [
  {
    id: "a1",
    projectId: "4",
    projectTitle: "Cross-Platform Mobile Development Framework",
    projectDescription:
      "A lightweight framework for building high-performance native mobile apps from a single codebase.",
    role: "Mobile Developer",
    status: "pending",
    submittedAt: "2025-05-01T14:30:00Z",
    category: "Mobile",
    owner: {
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "a2",
    projectId: "5",
    projectTitle: "Serverless Deployment Pipeline",
    projectDescription: "An end-to-end CI/CD pipeline specifically designed for serverless applications.",
    role: "DevOps Engineer",
    status: "approved",
    submittedAt: "2025-04-25T09:15:00Z",
    category: "DevOps",
    owner: {
      name: "Jordan Lee",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "a3",
    projectId: "6",
    projectTitle: "Accessibility Testing Framework",
    projectDescription:
      "An automated testing framework for identifying and fixing accessibility issues in web applications.",
    role: "Frontend Developer",
    status: "rejected",
    submittedAt: "2025-04-20T16:45:00Z",
    category: "Web Development",
    owner: {
      name: "Taylor Morgan",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    feedback:
      "Thank you for your application. We've decided to go with a candidate who has more experience with accessibility standards and ARIA.",
  },
  {
    id: "a4",
    projectId: "7",
    projectTitle: "Real-time Data Visualization Dashboard",
    projectDescription: "A dashboard for visualizing real-time data streams with customizable widgets and alerts.",
    role: "Data Visualization Engineer",
    status: "pending",
    submittedAt: "2025-05-03T11:20:00Z",
    category: "Data Science",
    owner: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "a5",
    projectId: "8",
    projectTitle: "Blockchain-based Supply Chain Tracker",
    projectDescription: "A supply chain tracking system using blockchain technology for transparency and security.",
    role: "Blockchain Developer",
    status: "approved",
    submittedAt: "2025-04-15T13:40:00Z",
    category: "Blockchain",
    owner: {
      name: "Sophia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

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

export default function ApplicationsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [statusFilter, setStatusFilter] = useState<"all" | ApplicationStatus>("all")
  const [activeTab, setActiveTab] = useState<TabValue>("all")

  const filteredApplications = MOCK_APPLICATIONS.filter((application) => {
    const matchesSearch =
      application.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || application.status === statusFilter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && application.status === "pending") ||
      (activeTab === "approved" && application.status === "approved") ||
      (activeTab === "rejected" && application.status === "rejected")

    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusStyles = (status: ApplicationStatus): string => {
    switch (status) {
      case "pending":
        return "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
      case "approved":
        return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
      case "rejected":
        return "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300"
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
    }
  }

  const getCategoryStyles = (category: string): string => {
    return "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              My Applications
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Track and manage your project applications</p>
          </div>

          <Button
            onClick={() => router.push("/share-ideas")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-700 dark:hover:bg-indigo-600"
          >
            Explore Projects
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search applications..."
                  className="pl-10 border-slate-200 dark:border-slate-700 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={statusFilter} onValueChange={(value: "all" | ApplicationStatus) => setStatusFilter(value)}>
                <SelectTrigger className="w-[180px] border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon" className="border-slate-200 dark:border-slate-700">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Applications Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={(value: TabValue) => setActiveTab(value)} className="mb-6">
          <TabsList className="bg-slate-100 dark:bg-slate-800">
            <TabsTrigger 
              value="all" 
              className="relative data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
            >
              All Applications
              <Badge className="ml-2 bg-indigo-600 dark:bg-indigo-700">
                {MOCK_APPLICATIONS.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              className="relative data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400"
            >
              Pending
              <Badge className="ml-2 bg-amber-600 dark:bg-amber-700">
                {MOCK_APPLICATIONS.filter((a) => a.status === "pending").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="approved" 
              className="relative data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400"
            >
              Approved
              <Badge className="ml-2 bg-emerald-600 dark:bg-emerald-700">
                {MOCK_APPLICATIONS.filter((a) => a.status === "approved").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger 
              value="rejected" 
              className="relative data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-rose-600 dark:data-[state=active]:text-rose-400"
            >
              Rejected
              <Badge className="ml-2 bg-rose-600 dark:bg-rose-700">
                {MOCK_APPLICATIONS.filter((a) => a.status === "rejected").length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Applications List */}
        <div className="space-y-6">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={getStatusStyles(application.status)}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                      <Badge className={getCategoryStyles(application.category)}>
                        {application.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mt-2 text-slate-900 dark:text-white">{application.projectTitle}</CardTitle>
                    <CardDescription className="line-clamp-2 text-slate-600 dark:text-slate-400">{application.projectDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <Badge variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                            Role: {application.role}
                          </Badge>
                        </div>
                        <div className="flex items-center text-slate-500 dark:text-slate-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Applied {formatRelativeTime(application.submittedAt)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={application.owner.avatar || "/placeholder.svg"}
                            alt={application.owner.name}
                          />
                          <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                            {application.owner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Project by: </span>
                          <span className="font-medium text-slate-900 dark:text-white">{application.owner.name}</span>
                        </div>
                      </div>

                      {application.status === "rejected" && application.feedback && (
                        <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-md p-3 text-sm">
                          <div className="font-medium text-rose-800 dark:text-rose-300 mb-1">Feedback:</div>
                          <p className="text-rose-700 dark:text-rose-200">{application.feedback}</p>
                        </div>
                      )}

                      {application.status === "approved" && (
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-md p-3 text-sm flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                          <div>
                            <div className="font-medium text-emerald-800 dark:text-emerald-300">Application Approved!</div>
                            <p className="text-emerald-700 dark:text-emerald-200">
                              Congratulations! You've been accepted to join this project. Check your email for next
                              steps.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <div className="px-6 pb-6 flex justify-between">
                    <Button
                      variant="outline"
                      className="border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      onClick={() => router.push(`/projects/${application.projectId}`)}
                    >
                      View Project
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>

                    {application.status === "pending" && (
                      <Button 
                        variant="outline" 
                        className="border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Withdraw Application
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/20 p-8 mb-6 shadow-inner">
                <Search className="h-12 w-12 text-indigo-500 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-slate-900 dark:text-white">No applications found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                We couldn't find any applications matching your search criteria. Try adjusting your filters or explore
                new projects to apply to.
              </p>
              <Button
                onClick={() => router.push("/share-ideas")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-700 dark:hover:bg-indigo-600"
              >
                Explore Projects
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}