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

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userData: any 
  onSave: (userData: any) => void
}

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3),
  bio: Yup.string().max(300, "Bio must be less than 300 characters"),
  portfolio: Yup.string().url("Must be a valid URL starting with http://").nullable(),
  github: Yup.string().url("Must be a valid URL starting with http://").nullable(),
  linkedin: Yup.string().url("Must be a valid URL starting with http://").nullable(),
})

const  EditProfile =({ isOpen, onClose, userData, onSave }: EditProfileModalProps) =>{
  const [profilePreview, setProfilePreview] = useState<string | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [newSkill, setNewSkill] = useState("")
  const {user,setUser} = useAuthStore()  


  const profileInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const initialValues = {
    name: user?.name || "",
    location: userData.location || "",
    bio: user?.bio || "",
    portfolio: user?.portfolio || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
    skills: [...(user?.skills || [])],
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCoverPreview(reader.result as string)
      }
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
    setFieldValue( "skills",
      values.skills.filter((skill: string) => skill !== skillToRemove),
    )
  }
  const handleSubmit = async (values :any, ) => {
    try {
       const updatedUserData = {
        ...userData,
        ...values,
        profilePicture: profilePreview || userData.profilePicture,
        coverImage: coverPreview || userData.coverImage,
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onSave(updatedUserData)
      onClose()
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card rounded-lg shadow-lg border border-border"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, isSubmitting, setFieldValue }) => (
              <Form>
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-card border-b border-border">
                  <h2 className="text-2xl font-bold text-foreground">Edit Profile</h2>
                  <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full" type="button">
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="p-6 space-y-8">
                  {/* Cover Image */}
                  <div className="space-y-4">
                    <label className="text-lg font-medium">Cover Image</label>
                    <div className="relative h-48 w-full rounded-lg overflow-hidden border border-border bg-muted">
                      <img
                        src={coverPreview || user?.converImage || "/placeholder.svg?height=600&width=1200"}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="rounded-full"
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
                    <label className="text-lg font-medium">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-background">
                          <AvatarImage src={profilePreview || user?.profilePicture || "/placeholder.svg"} className="object-cover" />
                          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="rounded-full h-8 w-8 p-0"
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
                        <p className="text-sm text-muted-foreground">
                          Upload a new profile picture
                        </p>
                        {profilePreview && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-destructive hover:text-destructive/90"
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
                  <div className="h-[1px] w-full bg-border"></div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Basic Information</h3>

                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                              errors.name && touched.name ? "border-destructive" : "border-input"
                            } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="name" component="p" className="text-sm text-destructive" />
                    </div>


                    <div className="space-y-2">
                      <label
                        htmlFor="location"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Location
                      </label>
                      <Field name="location">
                        {({ field }: FieldProps) => (
                          <input
                            {...field}
                            id="location"
                            placeholder="City, Country"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        )}
                      </Field>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="bio"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                              errors.bio && touched.bio ? "border-destructive" : "border-input"
                            } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <div className="flex justify-between text-xs">
                        <span className={values.bio.length > 300 ? "text-destructive" : "text-muted-foreground"}>
                          {values.bio.length}/300 characters
                        </span>
                        <ErrorMessage name="bio" component="span" className="text-destructive" />
                      </div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-[1px] w-full bg-border"></div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Skills</h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {values.skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="pl-3 pr-2 py-1.5 flex items-center gap-1">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill, values, setFieldValue)}
                            className="ml-1 text-muted-foreground hover:text-foreground rounded-full"
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
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                        className="shrink-0"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-[1px] w-full bg-border"></div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Social Links</h3>

                    <div className="space-y-2">
                      <label
                        htmlFor="portfolio"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                              errors.portfolio && touched.portfolio ? "border-destructive" : "border-input"
                            } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="portfolio" component="p" className="text-sm text-destructive" />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="github"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                              errors.github && touched.github ? "border-destructive" : "border-input"
                            } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="github" component="p" className="text-sm text-destructive" />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="linkedin"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                              errors.linkedin && touched.linkedin ? "border-destructive" : "border-input"
                            } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        )}
                      </Field>
                      <ErrorMessage name="linkedin" component="p" className="text-sm text-destructive" />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 z-10 flex justify-end gap-2 p-6 bg-card border-t border-border">
                  <Button variant="outline" onClick={onClose} disabled={isSubmitting} type="button">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="gap-2">
                    {isSubmitting ? (
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