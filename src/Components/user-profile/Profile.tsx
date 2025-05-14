"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github,Linkedin,Globe,MapPin,Mail,Award,Code, ChevronRight,CheckCircle,PlusCircle,Edit,X,Pencil,Trash2, Users, Check,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Badge } from "@/Components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Progress } from "@/Components/ui/progress"
import ProjectCard from "../my-profile/ProjectCard"
import SkillBadge from "../my-profile/SkillBadge"
import EditProfile from "../my-profile/EditProfile"
import useAuthStore from "@/store/useAuthStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/api/axiosInstance"
import Loading from "@/app/share-ideas/loading"
import { useRouter } from "next/router"
import { useParams } from "next/navigation"

// const otherUserData = {
//   _id: "1",
//   name: "Alex Morgan",
//   email: "alex.morgan@example.com",
//   profilePicture: "",
//   coverImage: "",
//   bio: "Full-stack developer passionate about creating intuitive and efficient web applications. Specializing in React, Node.js, and modern JavaScript frameworks. Always exploring new technologies and approaches to solve complex problems.",
//   skills: [
//     "React",
//     "Next.js",
//     "TypeScript",
//     "Node.js",
//     "MongoDB",
//     "Express",
//     "GraphQL",
//     "Tailwind CSS",
//     "UI/UX Design",
//   ],
//   role: "otherUser",
//   portfolio: "https://",
//   github: "https://github.com",
//   linkedin: "https://linkedin.com",
//   location: "San Francisco, CA",
//   projectsOwned: [
//     {
//       _id: "p1",
//       title: "Quantum Task Manager",
//       description:
//         "A futuristic task management application with AI-powered prioritization and team collaboration features.",
//       image: "/placeholder.svg?height=300&width=600",
//       technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
//       link: "#",
//       stars: 48,
//       contributors: 5,
//     },
//     {
//       _id: "p2",
//       title: "Neural Code Assistant",
//       description: "AI-powered code completion and suggestion tool that integrates with popular IDEs.",
//       image: "/placeholder.svg?height=300&width=600",
//       technologies: ["Python", "TensorFlow", "VS Code API"],
//       link: "#",
//       stars: 127,
//       contributors: 12,
//     },
//   ],
//   projectsContributed: [
//     {
//       _id: "p3",
//       title: "Open Source Design System",
//       description: "A comprehensive design system with accessible components for modern web applications.",
//       technologies: ["React", "Storybook", "Figma API"],
//       link: "#",
//       stars: 342,
//       contributors: 28,
//     },
//     {
//       _id: "p4",
//       title: "Blockchain Explorer",
//       description: "A visual explorer for blockchain transactions with real-time updates and analytics.",
//       technologies: ["Vue.js", "Web3.js", "D3.js"],
//       link: "#",
//       stars: 89,
//       contributors: 7,
//     },
//   ],
//   endorsements: [
//     {
//       skill: "React",
//       endorsedBy: { _id: "u1", name: "Jamie Smith", profilePicture: "/placeholder.svg?height=50&width=50" },
//     },
//     {
//       skill: "TypeScript",
//       endorsedBy: { _id: "u2", name: "Taylor Johnson", profilePicture: "/placeholder.svg?height=50&width=50" },
//     },
//     {
//       skill: "Node.js",
//       endorsedBy: { _id: "u3", name: "Casey Williams", profilePicture: "/placeholder.svg?height=50&width=50" },
//     },
//     {
//       skill: "React",
//       endorsedBy: { _id: "u4", name: "Jordan Lee", profilePicture: "/placeholder.svg?height=50&width=50" },
//     },
//     {
//       skill: "MongoDB",
//       endorsedBy: { _id: "u5", name: "Riley Brown", profilePicture: "/placeholder.svg?height=50&width=50" },
//     },
//   ],
//   isVerified: true, //email
//   createdAt: "2023-01-15T00:00:00.000Z",
// }

const Profile= () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [imageModal,setImageModal] = useState("")
  const router = useParams()
const { id } = router

 
 const {data:otherUser,error:err,isPending,refetch}=useQuery({
    queryKey:["other-otherUser"],
    queryFn: async ()=>{
        const {data} = await axiosInstance.get(`/user/others-profile/${id}`)
        return data.data
    }
 })
 const {data:endorse,error}= useQuery({
     queryKey:["getEndorse"],
     queryFn: async ()=>{
         const {data} = await axiosInstance.get(`/endorse/endorsements/${otherUser?._id}`)
         return data
        },
        enabled: !!otherUser        
    })
    const skillEndorsements = otherUser?.skills?.map((skill:any) => {
      const count = otherUser?.endorsements.filter((e:any) => e.skill === skill).length
      return { skill, count }
    })
const {mutate} =useMutation({
    mutationFn : async (skill) =>{
        const {data} = await axiosInstance.post(`/endorse/endorse/${id}`,{skill})
        return data
    },onSuccess:(data,)=>{
        alert(data.message)
        refetch()
    },onError:(err)=>console.log(err)
})
const {mutate:removeEndorsed} =useMutation({
    mutationFn : async (skill) =>{
        const {data} = await axiosInstance.post(`/endorse/remove-endorsement/${id}`,{skill})
        return data
    },onSuccess:(data,)=>{
        alert(data.message)
        refetch()
    },onError:(err)=>console.log(err)
})

 const handleEndorse = (skill:any) =>{    
    mutate(skill)    
 }
 const handleRemoveEndorsed = (skill:any)=>{
     removeEndorsed(skill)
 }
//   console.log(skillEndorsements)
//   console.log( endorse);
//   console.log(error);
//   console.log(err,"other");

  

  if(isPending) return <Loading/>
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e] pt-20 pb-16">

      <div className="relative h-64 md:h-80 w-full overflow-hidden" onClick={()=>setImageModal("coverImage")}>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#611f69]/50 to-[#611f69]/20 z-10"></div> */}
        <img src={otherUser?.coverImage || "Screenshot (2).png"} alt="Cover" className="w-full h-full object-cover" />
      </div> 

      {imageModal=== "coverImage"&& (
        <div className="fixed inset-0 bg-black/70 dark:bg-balck-50/80 backdrop-blur-sm flex justify-center z-40 " onClick={() => setImageModal("")}>
          <div className="relative  w-full max-w-6xl h-fit   mt-20  " onClick={(e) =>e.stopPropagation()}>
            <img
              src={otherUser?.coverImage}
              alt="Cover Preview"
              className="w-full h-60 object-cover rounded"
            />
            <button
              onClick={() => setImageModal("")}
              className="absolute top-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition" >
            <X className="h-5 w-5 text-gray-800 dark:text-white" />
            </button>
          </div>
        </div>
      )}
       

      <div className="container mx-auto px-4 md:px-8 lg:px-48">
        <div className="relative z-20 -mt-20 mb-8 flex flex-col md:flex-row gap-6 items-start" >
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-card shadow-xl"  onClick={()=>setImageModal("profilePicture")}>
              <img
                src={ otherUser?.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIS4VuIKs3YjObiyW8M0NzDAkx8BEhLzLhEA&s" || "/placeholder.svg" }
                // alt={otherUser?.name}
                className="w-full h-full object-cover "
              />
                </div>
          </motion.div>

              {imageModal==="profilePicture" && (
              <div className="fixed inset-0 bg-black/70 dark:bg-balck-50/80 backdrop-blur-sm flex justify-center  z-40 " onClick={() => setImageModal("")}>
              <div className="w-1/3 h-2/4 bg-slate-100 dark:bg-gray-900   mt-24  rounded-md flex flex-col  items-center  p-5 " onClick={(e)=>e.stopPropagation()}>
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden bg-card shadow-xl border "  >
              <img
                src={
                  otherUser?.profilePicture ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIS4VuIKs3YjObiyW8M0NzDAkx8BEhLzLhEA&s" ||
                  "/placeholder.svg"
                }
                alt={otherUser?.name}
                className="w-full h-full object-cover "
              />
              </div>
                  <button
                    onClick={() => setImageModal("")}
                    className="absolute top-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                  <X className="h-5 w-5 text-gray-800 dark:text-white" />
                  </button>

               </div>
              
              </div>
            )}



          {/* otherUser Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-slate-100">{otherUser?.name }</h1>

                </div>
               { otherUser?.location && <div className="flex items-center gap-2 mt-1 text-gray-500 dark:text-gray-300">
                  <MapPin size={16}  />
                  <span>{otherUser?.location || ""}</span>
                </div>}
                <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-2 md:line-clamp-none">
                  {otherUser?.profession || ""}
                </p>
              </div>
              <div className="flex gap-2 mb-4 md:mb-0">
               
                {/* <Button size="sm" className="gap-2 bg-[#611f69] hover:bg-[#611f69]/90 text-white">
                  <PlusCircle size={16} />
                  Follow
                </Button> */}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mt-4">
              {otherUser?.github && (
                <a
                  href={otherUser?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#611f69] dark:hover:text-[#611f69] transition-colors"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
              )}
              {otherUser?.linkedin && (
                <a
                  href={otherUser?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#611f69] dark:hover:text-[#611f69] transition-colors"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              )}
              {otherUser?.portfolio && (
                <a
                  href={otherUser?.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#611f69] dark:hover:text-[#611f69] transition-colors"
                >
                  <Globe size={18} />
                  <span>Portfolio</span>
                </a>
              )}
              <a
                href={`mailto:${otherUser?.email}`}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#611f69] dark:hover:text-[#611f69] transition-colors"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <Card className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-[#611f69]/30 dark:hover:border-[#611f69]/30 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Code className="text-[#611f69]" size={18} />
                Projects Created
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-gray-800 dark:text-white">{otherUser.projectsOwned.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-[#611f69]/30 dark:hover:border-[#611f69]/30 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
              <Users className="text-[#611f69]" size={18} />
              Contributions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-gray-800 dark:text-white">
                {otherUser?.projectsContributed?.length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-[#611f69]/30 dark:hover:border-[#611f69]/30 transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="text-[#611f69]" size={18} />
                Endorsements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-gray-800 dark:text-white">{otherUser.endorsements.length}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:w-[400px] mb-8 bg-white/80 dark:bg-gray-900/50 shadow">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#611f69] data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-[#611f69] data-[state=active]:text-white">
                Projects
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-[#611f69] data-[state=active]:text-white">
                Skills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <Card className="bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800" >
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-white">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{otherUser?.bio}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 ">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-gray-800 dark:text-white">Top Skills</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-[#611f69] hover:text-[#611f69]/80 hover:bg-[#611f69]/10 "
                    onClick={()=>setActiveTab("skills")}
                  >
                    View All <ChevronRight size={16} />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 ">
                    {skillEndorsements
                      ?.sort((a:any, b:any) => b.count - a.count)
                      .slice(0, 5)
                      .map((item:any) => (
                        <SkillBadge key={item.skill} skill={item.skill} count={item.count} />
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Projects */}
              <Card className="bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-gray-800 dark:text-white">Featured Projects</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-[#611f69] hover:text-[#611f69]/80 hover:bg-[#611f69]/10"
                    onClick={() => setActiveTab("projects")}
                  >
                    View All <ChevronRight size={16} />
                  </Button>
                </CardHeader>
                {/* <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {otherUserData.projectsOwned.slice(0, 2).map((project) => (
                      <ProjectCard key={project._id} project={project}  />
                    ))}
                  </div>
                </CardContent> */}
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-8">
              {/* Projects Created */}
              <Card className="bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-white">Projects Created</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Projects that {otherUser?.name} has created
                  </CardDescription>
                </CardHeader>
                {/* <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {otherUserData.projectsOwned.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </div>
                </CardContent> */}
              </Card>

              {/* Projects Contributed */}
              {/* <Card className="bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-white">Contributions</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Projects that {otherUser?.name} has contributed to
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {otherUserData.projectsContributed.map((project) => (
                      <ProjectCard key={project._id} project={project} />
                    ))}
                  </div>
                </CardContent>
              </Card> */}
            </TabsContent>
{/* =================================================================================================================== */}
            <TabsContent value="skills" className="space-y-8">
              <Card className="bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-white">Skills & Endorsements</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Skills that {otherUser?.name} has been endorsed for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillEndorsements
                      ?.sort((a:any, b:any) => b.count - a.count)
                      .map((item:any) => (
                        <div key={item.skill} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-800 dark:text-white">{item.skill}</h3>
                              <Badge
                                variant="outline"
                                className="text-xs border-[#611f69]/30 text-[#611f69] dark:text-[#83218e]"
                              >
                                {item.count} {item.count === 1 ? "endorsement" : "endorsements"}
                              </Badge>
                            </div>
                                  {otherUser?.endorsements?.some((val:any)=> val?.endorsedBy == "67f0aaf87dc6110cdccae408"  && val.skill === item.skill)? (
                                       <Button  variant="ghost"size="sm"
                                       className="text-[#611f69] hover:text-[#611f69]/80 hover:bg-[#611f69]/10 dark:text-[#83218e]"
                                       onClick={() => handleRemoveEndorsed(item.skill)}
                                   ><Check />Endorsed</Button>
                                  ) :
                                   
                                      <Button
                                          variant="ghost"
                                          size="sm"
                                          className="text-[#611f69] hover:text-[#611f69]/80 hover:bg-[#611f69]/10 dark:text-[#83218e]"
                                          onClick={() => handleEndorse(item.skill)}
                                      >
                                          Endorse
                                      </Button>
                                   } 
                          </div>
                          <Progress value={(item.count / 10) * 100} className="h-[6px] bg-gray-200 dark:bg-gray-700">
                            <div className="h-full bg-[#611f69]" style={{ width: `${(item.count / 5) * 100}%` }}></div>
                          </Progress>

                          {/* Endorsers */}
                           {item.count > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Endorsed by:</span>
                                <div className="flex -space-x-2">
                                {endorse
                                  ?.filter((e: { skill: string, endorsers: Array<{ _id: string, name: string, profilePicture: string }> }) => e.skill === item.skill)
                                  ?.flatMap((e: { endorsers: any }) => e.endorsers)
                                  ?.slice(0, 3)
                                  .map((endorser: { _id: string, name: string, profilePicture: string }) => (
                                    <Avatar
                                      key={endorser?._id}
                                      className="h-6 w-6 border-2 border-white dark:border-gray-900"
                                    >
                                      <AvatarImage
                                        src={endorser?.profilePicture}
                                        alt={endorser?.name}
                                      />
                                      <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                                        {endorser?.name.charAt(0) }
                                      </AvatarFallback>
                                    </Avatar>
                                  ))}
                                {item.count > 3 && (
                                  <div className="h-6 w-6 rounded-full bg-[#611f69]/10 text-[#611f69] flex items-center justify-center text-xs border-2 border-white dark:border-gray-900 ml-1.5">
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
            {/* =================================================================================================================== */}


          </Tabs>
        </motion.div>
      </div>

     
    </div>
  )
}

export default Profile
