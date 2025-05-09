// "use client"

// import { useState } from "react"
// import {
//   FileText,
//   CheckSquare,
//   LinkIcon,
//   Edit2,
//   Upload,
//   Plus,
//   Users,
//   Calendar,
//   Target,
//   Flag,
//   Moon,
//   Sun,
// } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
// import { Button } from "@/Components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
// import { useTheme } from "next-themes"

// interface TeamMember {
//   id: string
//   name: string
//   avatar: string
//   status: "online" | "offline" | "away" | "dnd"
// }

// interface ChecklistItem {
//   id: string
//   text: string
//   completed: boolean
//   assignee?: TeamMember
// }

// interface ProjectLink {
//   id: string
//   title: string
//   url: string
// }

// interface ProjectFile {
//   id: string
//   name: string
//   type: string
//   url: string
//   uploadedBy: TeamMember
//   uploadedAt: Date
// }

// const mockTeamMembers: TeamMember[] = [
//   { id: "user-1", name: "Mohd Aman", avatar: "/placeholder.svg", status: "offline" },
//   { id: "user-2", name: "Aze Azel", avatar: "/placeholder.svg", status: "online" },
//   { id: "user-3", name: "Munavvir K", avatar: "/placeholder.svg", status: "online" },
// ]

// const mockChecklist: ChecklistItem[] = [
//   { id: "check-1", text: "To-do 1 - @mention to add assignee", completed: true },
//   { id: "check-2", text: "To-do 2", completed: true },
//   { id: "check-3", text: "To-do 3", completed: true },
// ]

// const mockLinks: ProjectLink[] = [
//   { id: "link-1", title: "Effective project management", url: "https://example.com/project-management" },
//   { id: "link-2", title: "You just joined a project in Slack - now what?", url: "https://example.com/slack-guide" },
// ]

// const mockFiles: ProjectFile[] = [
//   {
//     id: "file-1",
//     name: "Project Screenshot.png",
//     type: "image/png",
//     url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-26%20at%204.45.30%E2%80%AFPM-Yf3THatK99IVPRa3BdDHlP5MEMh7CW.png",
//     uploadedBy: mockTeamMembers[0],
//     uploadedAt: new Date("2023-03-20"),
//   },
// ]

// const ProjectBrief = () => {
//   const [projectName, setProjectName] = useState("DevSync Project")
//   const [objectives, setObjectives] = useState("Build a collaborative platform for developers")
//   const [targetAudience, setTargetAudience] = useState("Software developers and engineering teams")
//   const [timeline, setTimeline] = useState("Q2 2023 - Q4 2023")
//   const [isEditing, setIsEditing] = useState(false)
//   const { theme, setTheme } = useTheme()

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light")
//   }

//   return (
//     <div className="flex h-screen bg-white dark:bg-[#200a23] text-gray-900 dark:text-white">
//       {/* Sidebar - reusing the same sidebar style */}
//       <div className="w-64 bg-gray-100 dark:bg-[#37113c] flex flex-col">
//         {/* Workspace Header */}
//         <div className="p-4 border-b border-gray-200 dark:border-[#4a1e52] flex items-center justify-between">
//           <h1 className="font-bold text-lg">DevSync</h1>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 rounded-full hover:bg-gray-200 dark:hover:bg-[#4a1e52]"
//             onClick={toggleTheme}
//           >
//             {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
//           </Button>
//         </div>

//         {/* Sidebar Navigation */}
//         <div className="flex-1 overflow-y-auto p-4">
//           <div className="space-y-1">
//             <div className="px-2 py-1.5 text-sm font-medium text-gray-900 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-[#4a1e52] cursor-pointer">
//               Messages
//             </div>
//             <div className="px-2 py-1.5 text-sm font-medium text-gray-900 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-[#4a1e52] cursor-pointer">
//               Project tracker
//             </div>
//             <div className="px-2 py-1.5 text-sm font-medium bg-gray-200 dark:bg-[#611f69] text-gray-900 dark:text-white rounded">
//               Project brief
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-4xl mx-auto p-6">
//           {/* Project Header */}
//           <div className="flex justify-between items-start mb-6">
//             {isEditing ? (
//               <input
//                 type="text"
//                 value={projectName}
//                 onChange={(e) => setProjectName(e.target.value)}
//                 className="text-3xl font-bold bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-[#611f69] dark:focus:border-[#611f69] pb-1 w-full"
//               />
//             ) : (
//               <h1 className="text-3xl font-bold">{projectName}</h1>
//             )}
//             <Button
//               variant="ghost"
//               size="sm"
//               className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
//               onClick={() => setIsEditing(!isEditing)}
//             >
//               {isEditing ? "Save" : <Edit2 className="h-4 w-4" />}
//             </Button>
//           </div>

//           {/* Project Banner */}
//           <div className="relative rounded-lg overflow-hidden mb-8 bg-gradient-to-r from-blue-500 to-purple-600 h-64">
//             <img
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-26%20at%204.45.20%E2%80%AFPM-a0d0xOV8Mf1Yknii4Zu5JHfT7bBZU3.png"
//               alt="Project Banner"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Project Details */}
//           <div className="space-y-6 mb-8">
//             <div className="flex items-start gap-2">
//               <Flag className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
//               <div className="flex-1">
//                 <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Objectives:</h3>
//                 {isEditing ? (
//                   <textarea
//                     value={objectives}
//                     onChange={(e) => setObjectives(e.target.value)}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#2d0e31] focus:outline-none focus:ring-1 focus:ring-[#611f69]"
//                     rows={2}
//                   />
//                 ) : (
//                   <p className="text-gray-900 dark:text-white">{objectives}</p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-start gap-2">
//               <Target className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
//               <div className="flex-1">
//                 <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Target audience:</h3>
//                 {isEditing ? (
//                   <textarea
//                     value={targetAudience}
//                     onChange={(e) => setTargetAudience(e.target.value)}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#2d0e31] focus:outline-none focus:ring-1 focus:ring-[#611f69]"
//                     rows={2}
//                   />
//                 ) : (
//                   <p className="text-gray-900 dark:text-white">{targetAudience}</p>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-start gap-2">
//               <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
//               <div className="flex-1">
//                 <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Timeline:</h3>
//                 {isEditing ? (
//                   <input
//                     type="text"
//                     value={timeline}
//                     onChange={(e) => setTimeline(e.target.value)}
//                     className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-[#2d0e31] focus:outline-none focus:ring-1 focus:ring-[#611f69]"
//                   />
//                 ) : (
//                   <p className="text-gray-900 dark:text-white">{timeline}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Team Section */}
//           <div className="mb-8">
//             <div className="flex items-center mb-4">
//               <Users className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
//               <h2 className="text-xl font-semibold">The team</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {mockTeamMembers.map((member) => (
//                 <div
//                   key={member.id}
//                   className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex items-center bg-white dark:bg-[#2d0e31]"
//                 >
//                   <div className="relative mr-3">
//                     <Avatar className="h-12 w-12">
//                       <AvatarImage src={member.avatar || "/placeholder.svg"} />
//                       <AvatarFallback className="bg-gray-200 dark:bg-[#4a1e52] text-gray-700 dark:text-white">
//                         {member.name.charAt(0)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <span
//                       className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-[#2d0e31] ${
//                         member.status === "online" ? "bg-green-500" : "bg-gray-400"
//                       }`}
//                     ></span>
//                   </div>
//                   <div>
//                     <p className="font-medium">{member.name}</p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{member.status}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Tabs for Files, Checklist, Links */}
//           <Tabs defaultValue="files" className="w-full">
//             <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-[#2d0e31]">
//               <TabsTrigger value="files" className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#611f69]">
//                 <FileText className="h-4 w-4 mr-2" /> Files
//               </TabsTrigger>
//               <TabsTrigger
//                 value="checklist"
//                 className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#611f69]"
//               >
//                 <CheckSquare className="h-4 w-4 mr-2" /> Checklist
//               </TabsTrigger>
//               <TabsTrigger value="links" className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#611f69]">
//                 <LinkIcon className="h-4 w-4 mr-2" /> Links
//               </TabsTrigger>
//             </TabsList>

//             {/* Files Tab */}
//             <TabsContent value="files" className="pt-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {mockFiles.map((file) => (
//                   <div
//                     key={file.id}
//                     className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-[#2d0e31]"
//                   >
//                     <div className="h-40 bg-gray-100 dark:bg-[#37113c] relative">
//                       <img
//                         src={file.url || "/placeholder.svg"}
//                         alt={file.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-3">
//                       <p className="font-medium truncate">{file.name}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         Uploaded by {file.uploadedBy.name} on {file.uploadedAt.toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Add File Button */}
//                 <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center h-40 bg-gray-50 dark:bg-[#2d0e31]/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#37113c]">
//                   <div className="text-center p-4">
//                     <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
//                     <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Add a file</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">Upload a file.</p>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             {/* Checklist Tab */}
//             <TabsContent value="checklist" className="pt-4">
//               <div className="space-y-2">
//                 {mockChecklist.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center p-3 bg-white dark:bg-[#2d0e31] rounded-lg border border-gray-200 dark:border-gray-800"
//                   >
//                     <div className="flex items-center flex-1">
//                       <input
//                         type="checkbox"
//                         checked={item.completed}
//                         className="h-4 w-4 text-[#611f69] focus:ring-[#611f69] border-gray-300 rounded"
//                         readOnly
//                       />
//                       <span
//                         className={`ml-3 ${
//                           item.completed
//                             ? "line-through text-gray-500 dark:text-gray-400"
//                             : "text-gray-900 dark:text-white"
//                         }`}
//                       >
//                         {item.text}
//                       </span>
//                     </div>
//                     {item.assignee && (
//                       <Avatar className="h-6 w-6">
//                         <AvatarImage src={item.assignee.avatar || "/placeholder.svg"} />
//                         <AvatarFallback>{item.assignee.name.charAt(0)}</AvatarFallback>
//                       </Avatar>
//                     )}
//                   </div>
//                 ))}

//                 {/* Add Checklist Item */}
//                 <div className="flex items-center p-3 bg-white dark:bg-[#2d0e31] rounded-lg border border-gray-200 dark:border-gray-800">
//                   <Plus className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-3" />
//                   <input
//                     type="text"
//                     placeholder="Add a new task..."
//                     className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
//                   />
//                 </div>
//               </div>
//             </TabsContent>

//             {/* Links Tab */}
//             <TabsContent value="links" className="pt-4">
//               <div className="space-y-2">
//                 {mockLinks.map((link) => (
//                   <a
//                     key={link.id}
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center p-3 bg-white dark:bg-[#2d0e31] rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#37113c]"
//                   >
//                     <LinkIcon className="h-4 w-4 text-blue-500 mr-3" />
//                     <span className="text-blue-500 hover:underline">{link.title}</span>
//                   </a>
//                 ))}

//                 {/* Add Link */}
//                 <div className="flex items-center p-3 bg-white dark:bg-[#2d0e31] rounded-lg border border-gray-200 dark:border-gray-800">
//                   <Plus className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-3" />
//                   <input
//                     type="text"
//                     placeholder="Add a link..."
//                     className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
//                   />
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProjectBrief
