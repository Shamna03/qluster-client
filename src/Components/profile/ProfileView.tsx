"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Github,
  Linkedin,
  Globe,
  MapPin,
  Mail,
  Award,
  Code,
  ChevronRight,
  Users,
  CheckCircle,
  PlusCircle,
  Edit,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Badge } from "@/Components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Progress } from "@/Components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip"
import ProjectCard from "../profile/ProjectCard"
import SkillBadge from "../profile/SkillBadge"

// Mock data - in a real app, this would come from your API
const userData = {
  _id: "1",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  profilePicture: "",
  coverImage: "",
  bio: "Full-stack developer passionate about creating intuitive and efficient web applications. Specializing in React, Node.js, and modern JavaScript frameworks. Always exploring new technologies and approaches to solve complex problems.",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "Express",
    "GraphQL",
    "Tailwind CSS",
    "UI/UX Design",
  ],
  role: "user",
  portfolio: "https://",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  location: "San Francisco, CA",
  projectsOwned: [
    {
      _id: "p1",
      title: "Quantum Task Manager",
      description:
        "A futuristic task management application with AI-powered prioritization and team collaboration features.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      link: "#",
      stars: 48,
      contributors: 5,
    },
    {
      _id: "p2",
      title: "Neural Code Assistant",
      description: "AI-powered code completion and suggestion tool that integrates with popular IDEs.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Python", "TensorFlow", "VS Code API"],
      link: "#",
      stars: 127,
      contributors: 12,
    },
  ],
  projectsContributed: [
    {
      _id: "p3",
      title: "Open Source Design System",
      description: "A comprehensive design system with accessible components for modern web applications.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["React", "Storybook", "Figma API"],
      link: "#",
      stars: 342,
      contributors: 28,
    },
    {
      _id: "p4",
      title: "Blockchain Explorer",
      description: "A visual explorer for blockchain transactions with real-time updates and analytics.",
      image: "/placeholder.svg?height=300&width=600",
      technologies: ["Vue.js", "Web3.js", "D3.js"],
      link: "#",
      stars: 89,
      contributors: 7,
    },
  ],
  endorsements: [
    {
      skill: "React",
      endorsedBy: { _id: "u1", name: "Jamie Smith", profilePicture: "/placeholder.svg?height=50&width=50" },
    },
    {
      skill: "TypeScript",
      endorsedBy: { _id: "u2", name: "Taylor Johnson", profilePicture: "/placeholder.svg?height=50&width=50" },
    },
    {
      skill: "Node.js",
      endorsedBy: { _id: "u3", name: "Casey Williams", profilePicture: "/placeholder.svg?height=50&width=50" },
    },
    {
      skill: "React",
      endorsedBy: { _id: "u4", name: "Jordan Lee", profilePicture: "/placeholder.svg?height=50&width=50" },
    },
    {
      skill: "MongoDB",
      endorsedBy: { _id: "u5", name: "Riley Brown", profilePicture: "/placeholder.svg?height=50&width=50" },
    },
  ],
  isVerified: true,//email
  createdAt: "2023-01-15T00:00:00.000Z",
}

 const  ProfileView =()=> {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Calculate skill endorsement counts
  const skillEndorsements = userData.skills.map((skill) => {
    const count = userData.endorsements.filter((e) => e.skill === skill).length
    return { skill, count }
  })

  return (
    <div className="min-h-screen bg-background ptt-20 pb-16 ">
      {/* Cover Image with Gradient Overlay */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 z-10"></div>
        <img src={userData.coverImage || "Screenshot (2).png"} 
        alt="Cover" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-48">
        {/* Profile Header */}
        <div className="relative z-20 -mt-20 mb-8 flex flex-col md:flex-row gap-6 items-start">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4e border-backgroundw overflow-hidden bg-card shadow-xl">
              <img
                src={userData.profilePicture ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIS4VuIKs3YjObiyW8M0NzDAkx8BEhLzLhEA&s"}
                alt={userData.name}
                className="w-full h-full object-cover"
              />
              {/* {userData.isVerified && (
                <div className="absolute bottom-1 right-1 bg-primary text-primary-foreground rounded-full p-1">
                  <CheckCircle size={16} />
                </div>
              )} */}
            </div>
          </motion.div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
                  {/* {userData.isVerified && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <CheckCircle size={20} className="text-primary" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Verified Developer</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )} */}
                </div>
                <div className="flex items-center gap-2 mt-1 text-amber-50">
                  <MapPin size={16} />
                  <span>{userData.location}</span>
                </div>
                <p className="mt-8 text-muted-foreground line-clamp-2 md:line-clamp-none">{userData.bio}</p>
              </div>
              <div className="flex gap-2 mb-14">
                <Button variant="outline" size="sm" className="gap-2 dark:bg-gray-200 dark:text-black">
                  <Edit size={16} />
                  Edit Profile
                </Button>
                <Button size="sm" className="gap-2 ">
                  <PlusCircle size={16} />
                  Follow
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mt-4">
              {userData.github && (
                <a
                  href={userData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
              )}
              {userData.linkedin && (
                <a
                  href={userData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              )}
              {userData.portfolio && (
                <a
                  href={userData.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe size={18} />
                  <span>Portfolio</span>
                </a>
              )}
              <a
                href={`mailto:${userData.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 "
        >
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="text-primary" size={18} />
                Projects Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{userData.projectsOwned.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="text-primary" size={18} />
                Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{userData.projectsContributed.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="text-primary" size={18} />
                Endorsements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">{userData.endorsements.length}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 md:w-[400px] mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{userData.bio}</p>
                </CardContent>
              </Card>

              {/* Top Skills */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Top Skills</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("skills")}>
                    View All <ChevronRight size={16} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillEndorsements
                      .sort((a, b) => b.count - a.count)
                      .slice(0, 5)
                      .map((item) => (
                        <SkillBadge key={item.skill} skill={item.skill} count={item.count} />
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Projects */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Featured Projects</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("projects")}>
                    View All <ChevronRight size={16} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.projectsOwned.slice(0, 2).map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-8">
              {/* Projects Created */}
              <Card>
                <CardHeader>
                  <CardTitle>Projects Created</CardTitle>
                  <CardDescription>Projects that {userData.name} has created</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.projectsOwned.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Projects Contributed */}
              <Card>
                <CardHeader>
                  <CardTitle>Contributions</CardTitle>
                  <CardDescription>Projects that {userData.name} has contributed to</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.projectsContributed.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Endorsements</CardTitle>
                  <CardDescription>Skills that {userData.name} has been endorsed for</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillEndorsements
                      .sort((a, b) => b.count - a.count)
                      .map((item) => (
                        <div key={item.skill} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{item.skill}</h3>
                              <Badge variant="outline" className="text-xs">
                                {item.count} {item.count === 1 ? "endorsement" : "endorsements"}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="sm">
                              Endorse
                            </Button>
                          </div>
                          <Progress value={(item.count / 5) * 100} className="h-2" />

                          {/* Endorsers */}
                          {item.count > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-muted-foreground">Endorsed by:</span>
                              <div className="flex -space-x-2">
                                {userData.endorsements
                                  .filter((e) => e.skill === item.skill)
                                  .slice(0, 3)
                                  .map((endorsement) => (
                                    <Avatar
                                      key={endorsement.endorsedBy._id}
                                      className="h-6 w-6 border-2 border-background"
                                    >
                                      <AvatarImage
                                        src={endorsement.endorsedBy.profilePicture}
                                        alt={endorsement.endorsedBy.name}
                                      />
                                      <AvatarFallback>{endorsement.endorsedBy.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                  ))}
                                {item.count > 3 && (
                                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                                    +{item.count - 3}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
export default ProfileView
