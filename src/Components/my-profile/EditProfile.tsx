
"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Trash2, Plus, Save } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Badge } from "@/Components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Formik, Form, Field, ErrorMessage, type FieldProps } from "formik"
import * as Yup from "yup"
import useAuthStore from "@/store/useAuthStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/api/axiosInstance"
import { User } from "@/types"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  bio: Yup.string().max(300, "Bio must be less than 300 characters"),
  profession: Yup.string().max(50),
  portfolio: Yup.string().url("Must be a valid URL starting with http://").nullable(),
  github: Yup.string().url("Must be a valid URL starting with http:// ").nullable(),
  linkedin: Yup.string().url("Must be a valid URL starting with http://").nullable(),
})

const EditProfile = ({ isOpen, onClose, }: EditProfileModalProps) => {
  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [profileFile, setProfileFile] = useState<File | null>(null)
const [coverFile, setCoverFile] = useState<File | null>(null)

  const [newSkill, setNewSkill] = useState("")
  const { user, setUser } = useAuthStore()
  const queryClient = useQueryClient()

  const profileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const initialValues = {
    name: user?.name || "",
    location: user?.location || "",
    profession: user?.profession || "",
    bio: user?.bio || "",
    portfolio: user?.portfolio || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
    skills: [...(user?.skills || [])],
    profilePicture:user?.profilePicture || "",
    coverImage :user?.coverImage || ""
    
  }
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setProfilePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setCoverPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }
  

  const addSkill = (values: any, setFieldValue: any) => {
    if (newSkill.trim() && !values.skills.includes(newSkill.trim())) {
      setFieldValue("skills", [...values.skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string, values: any, setFieldValue: any) => {
    setFieldValue( "skills",values.skills.filter((skill: string) => skill !== skillToRemove),)
  }
  const {mutate ,isPending} = useMutation({
    mutationFn :async (value :any)=>{
      const {data} = await axiosInstance.put("/user/editprofile",value,{headers: { "Content-Type": "multipart/form-data" }})
      return data
    },
    onSuccess : (data)=>{
      queryClient.invalidateQueries({queryKey:["fetchUser"]})
      onClose()
    },
    onError : (err)=>{
      console.log(err);
    }
   })

   const handleSubmit = async (values: any) => {
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("location", values.location)
    formData.append("profession", values.profession)
    formData.append("bio", values.bio)
    formData.append("portfolio", values.portfolio)
    formData.append("github", values.github)
    formData.append("linkedin", values.linkedin)
  
    values.skills.forEach((skill: string, index: number) => {
      formData.append(`skills[${index}]`, skill)
    })
  
    if (profileFile) formData.append("profilePicture", profileFile)
    if (coverFile) formData.append("coverImage", coverFile)
  
    try {
      mutate(formData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }
  

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800"
        >
          <Formik
            initialValues ={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
              <Form>
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Edit Profile</h2>
                  <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full" type="button">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="p-6 space-y-8">
                  <div className="space-y-4">
                    <label className="text-lg font-medium text-gray-800 dark:text-white">Cover Image</label>
                    <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
                      <img
                        src={coverPreview || user?.coverImage || "/placeholder.svg?height=600&width=1200"}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded-full bg-white/90 hover:bg-white text-gray-800"
                          onClick={() => coverInputRef.current?.click()}
                          type="button"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                        {coverPreview && (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="rounded-full"
                            onClick={() => setCoverPreview(null)}
                            type="button"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        )}
                      </div>
                      <input
                        type="file"
                        ref={coverInputRef}
                        onChange={handleCoverImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Profile Picture */}
                  <div className="space-y-4">
                    <label className="text-lg font-medium text-gray-800 dark:text-white">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-900">
                          <AvatarImage
                            src={profilePreview || user?.profilePicture || "/placeholder.svg"}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-[#611f69]/10 text-[#611f69]">
                            {user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="rounded-full h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-800"
                            onClick={() => profileInputRef.current?.click()}
                            type="button"
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                        <input
                          type="file"
                          ref={profileInputRef}
                          onChange={handleProfileImageChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Upload a new profile picture. Square images work best.
                        </p>
                        {profilePreview && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => setProfilePreview(null)}
                            type="button"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800"></div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Basic Information</h3>

                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Name
                      </label>
                      <Field name="name">
                        {({ field }: FieldProps) => (
                          <input
                            {...field}
                            id="name"
                            placeholder="Your name"
                            className={`flex h-10 w-full rounded-md border ${
                              errors.name && touched.name
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-700"
                            } bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#611f69] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="name" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="profession" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                        Profession
                      </label>
                      <Field name="profession">
                        {({ field }: FieldProps) => (
                          <input
                            {...field}
                            id="profession"
                            placeholder="Your profession (e.g. Software Engineer)"
                            className={`flex h-10 w-full rounded-md border ${errors.profession && touched.profession
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-700"
                              } bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#611f69] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="profession" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="location"
                        className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Location
                      </label>
                      <Field name="location">
                        {({ field }: FieldProps) => (
                          <input
                            {...field}
                            id="location"
                            placeholder="City, Country"
                            className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#611f69] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        )}
                      </Field>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="bio"
                        className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Bio
                      </label>
                      <Field name="bio">
                        {({ field }: FieldProps) => (
                          <textarea
                            {...field}
                            id="bio"
                            placeholder="Tell us about yourself"
                            rows={4}
                            className={`flex min-h-[80px] w-full rounded-md border ${
                              errors.bio && touched.bio
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-700"
                            } bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#611f69] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <div className="flex justify-between text-xs">
                        <span className={values.bio.length > 300 ? "text-red-500" : "text-gray-500 dark:text-gray-400"}>
                          {values.bio.length}/300 characters
                        </span>
                        <ErrorMessage name="bio" component="span" className="text-red-500" />
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800"></div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Skills</h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {values.skills.map((skill: string) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="pl-3 pr-2 py-1.5 flex items-center gap-1 bg-[#611f69]/20 text-[#611f69] dark:bg-[#611f69]/20 dark:text-[#7c2685] border-none"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill, values, setFieldValue)}
                            className="ml-1 text-[#7c2685] hover:text-[#611f69] rounded-full"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#611f69] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSkill(values, setFieldValue)
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => addSkill(values, setFieldValue)}
                        size="sm"
                        className="shrink-0 bg-[#611f69] hover:bg-[#611f69]/90 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800"></div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">Social Links</h3>

                    <div className="space-y-2">
                      <label
                        htmlFor="portfolio"
                        className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Portfolio Website
                      </label>
                      <Field name="portfolio">
                        {({ field }: FieldProps) => (
                          <input
                            {...field}
                            id="portfolio"
                            placeholder="https://yourportfolio.com"
                            className={`flex h-10 w-full rounded-md border ${
                              errors.portfolio && touched.portfolio
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-700"
                            } bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#611f69] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="portfolio" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="github"
                        className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        GitHub
                      </label>
                      <Field name="github">
                        {({ field }: FieldProps) => (
                          <input
                            {...field}
                            id="github"
                            placeholder="https://github.com/yourusername"
                            className={`flex h-10 w-full rounded-md border ${
                              errors.github && touched.github
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-700"
                            } bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#611f69] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="github" component="p" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="linkedin"
                        className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        LinkedIn
                      </label>
                      <Field name="linkedin">
                        {({ field }: FieldProps) => (
                          <input
                            {...field}
                            id="linkedin"
                            placeholder="https://linkedin.com/in/yourusername"
                            className={`flex h-10 w-full rounded-md border ${
                              errors.linkedin && touched.linkedin
                                ? "border-red-500 dark:border-red-500"
                                : "border-gray-300 dark:border-gray-700"
                            } bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#611f69] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="linkedin" component="p" className="text-sm text-red-500" />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 z-10 flex justify-end gap-2 p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                    type="button"
                    className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gap-2 bg-[#611f69] hover:bg-[#611f69]/90 text-white"
                  >
                    {isPending ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default EditProfile
