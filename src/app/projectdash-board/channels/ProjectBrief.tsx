"use client"

import { Button } from '@/Components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Calendar, CheckSquare, Edit2, FileText, Flag, LinkIcon, Target, Users } from 'lucide-react'
import React from 'react'

interface User {
    _id: string;
    name: string;
    profilePicture?: string;
  }
  
  interface Link {
    id: string;
    title: string;
    url: string;
  }
  interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
  }
const mockUsers: User[] = [
    { _id: "user-1", name: "Alex Morgan", profilePicture: "/placeholder.svg",},
    { _id: "user-2", name: "Jamie Smith", profilePicture: "/placeholder.svg",  },
    { _id: "user-3", name: "Taylor Johnson", profilePicture: "/placeholder.svg", },
    { _id: "user-4", name: "Jordan Lee", profilePicture: "/placeholder.svg", },
    { _id: "user-5", name: "Casey Williams", profilePicture: "/placeholder.svg", },
  ];
  
  const mockLinks: Link[] = [
    { id: "link-1", title: "Figma Design", url: "https://www.figma.com/file/..." },
    { id: "link-2", title: "GitHub Repository", url: "https://github.com/..." },
  ];
  const mockChecklist: ChecklistItem[] = [
    { id: "item-1", text: "Define project scope", completed: true },
    { id: "item-2", text: "Design user interface", completed: true },
    { id: "item-3", text: "Implement backend API", completed: false },
    { id: "item-4", text: "Write unit tests", completed: false },
    { id: "item-5", text: "Deploy to production", completed: false },
  ];
const ProjectBrief = () => {
  return (
    
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl min-w-full mx-auto">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-2xl font-bold">Project Brief</h1>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative rounded-lg overflow-hidden mb-8 bg-gradient-to-r from-blue-500 to-purple-600 h-48">
              <img
                src="/Screenshot (2).png"
                alt="Project Banner"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-2">
                <Flag className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Objectives:
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    Build a collaborative platform for developers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Target className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Target audience:
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    Software developers and engineering teams
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Timeline:
                  </h3>
                  <p className="text-gray-900 dark:text-white">Q2 2023 - Q4 2023</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <h2 className="text-xl font-semibold">The team</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockUsers.slice(0, 3).map((member) => (
                  <div
                    key={member._id}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 flex items-center bg-white dark:bg-[#2d0e31]"
                  >
                    <div className="relative mr-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.profilePicture || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-200 dark:bg-[#4a1e52] text-gray-700 dark:text-white">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
              
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <h2 className="text-xl font-semibold">Files</h2>
                  </div>
                </div>
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-[#2d0e31] p-4">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-26%20at%204.45.30%E2%80%AFPM-Yf3THatK99IVPRa3BdDHlP5MEMh7CW.png"
                    alt="Project Screenshot"
                    className="w-full h-auto rounded-lg mb-3"
                  />
                  <p className="font-medium">Project Screenshot.png</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Uploaded by {mockUsers[0].name} on March 20, 2023
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CheckSquare className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <h2 className="text-xl font-semibold">Checklist</h2>
                  </div>
                </div>
                <div className="space-y-2">
                  {mockChecklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center p-3 bg-white dark:bg-[#2d0e31] rounded-lg border border-gray-200 dark:border-gray-800"
                    >
                      <div className="flex items-center flex-1">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          className="h-4 w-4 text-[#611f69] focus:ring-[#611f69] border-gray-300 rounded"
                          readOnly
                        />
                        <span
                          className={`ml-3 ${
                            item.completed
                              ? "line-through text-gray-500 dark:text-gray-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {item.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <LinkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <h2 className="text-xl font-semibold">Links</h2>
                  </div>
                </div>
                <div className="space-y-2">
                  {mockLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-white dark:bg-[#2d0e31] rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#37113c]"
                    >
                      <LinkIcon className="h-4 w-4 text-blue-500 mr-3" />
                      <span className="text-blue-500 hover:underline">{link.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      
  )
}

export default ProjectBrief