"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Search, UserPlus, UserMinus, LoaderCircle } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import channelAxiosInstance from "@/api/channelAxiosInstance"
import useAuthStore from "@/store/useAuthStore"

interface User {
  _id: string
  name: string
  profilePicture?: string
}

interface ChannelMembersModalProps {
  isOpen: boolean
  onClose: () => void
  channelId: string
  channelName: string
  currentMembers: User[]
  availableUsers: User[]

}

const ChannelMembersModal = ({isOpen, onClose, channelId, channelName, currentMembers, availableUsers}: ChannelMembersModalProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredMembers, setFilteredMembers] = useState<User[]>(currentMembers)
  const [filteredAvailableUsers, setFilteredAvailableUsers] = useState<User[]>(availableUsers)
  const [activeTab, setActiveTab] = useState<"current" | "add">("current")
  const queryClient = useQueryClient()
const {user} = useAuthStore()

  useEffect(() => {
    if (searchQuery) {
      setFilteredMembers(
        currentMembers.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setFilteredAvailableUsers(
        availableUsers
          .filter((user) => !currentMembers.some((member) => member._id === user._id))
          .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    } else {
      setFilteredMembers(currentMembers)
      setFilteredAvailableUsers(
        availableUsers.filter((user) => !currentMembers.some((member) => member._id === user._id)),
      )
    }
  }, [searchQuery, currentMembers, availableUsers])

  const { mutate: addMember, isPending: isAddingMember } = useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await channelAxiosInstance.patch(`/addParticipant/${channelId}`, { userId })
      console.log(data);
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getChannel"] })
      
    },
    onError: (error) => {
      console.error("Failed to add member:", error)
    },
  })

  const { mutate: removeMember, isPending: isRemovingMember } = useMutation({
    mutationFn: async (userId: string) => {
      const { data } = await channelAxiosInstance.patch(`/removeParticipant/${channelId}`, { userId })
      console.log(data);      
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getChannel"] })
    },
    onError: (error) => {
      console.error("Failed to remove member:", error)
    },
  })

  if (!isOpen) return null
// console.log(filteredAvailableUsers);


  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md max-h-[90vh] overflow-hidden bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {activeTab === "current" ? `Members • #${channelName}` : `Add People • #${channelName}`}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search and Tabs */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Find members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // className="pl-10 w-full bg-gray-100 dark:bg-gray-800 border-none"
                className="pl-10 w-full h-10 rounded-md border border-input bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                variant={activeTab === "current" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("current")}
                className={activeTab === "current" ? "bg-[#611f69] text-white" : ""}
              >
                Current Members
              </Button>
              <Button
                variant={activeTab === "add" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab("add")}
                className={activeTab === "add" ? "bg-[#611f69] text-white" : ""}
              >
                Add People
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[50vh] p-4">
            {(isAddingMember || isRemovingMember) && (
              <div className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center z-10">
                <LoaderCircle className="h-8 w-8 text-[#611f69] animate-spin" />
              </div>
            )}

            {activeTab === "current" ? (
              <div className="space-y-2">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member:any) => (
                    <div
                      key={member._id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="relative mr-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.profilePicture || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{member.name}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMember(member._id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <UserMinus className="h-4 w-4 mr-1" />
                       { member._id === user?._id?"Remove":"Left"}
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">No members found</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredAvailableUsers.length > 0 ? (
                  filteredAvailableUsers.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                    >
                      <div className="flex items-center">
                        <div className="relative mr-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.profilePicture || "/placeholder.svg"} />
                            <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white">{user.name}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addMember(user._id)}
                        className="text-[#611f69] hover:text-[#611f69]/80 hover:bg-[#611f69]/10"
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">No users available to add</p>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end">
            <Button onClick={onClose} variant="outline" className="mr-2">
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default ChannelMembersModal
