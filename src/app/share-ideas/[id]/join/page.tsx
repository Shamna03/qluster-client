"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle2,
  Code,
  Github,
  Globe,
  User,
  Calendar,
  Send,
  ChevronRight,
  ChevronLeft,
  X,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Card, CardContent } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"

// Types
interface Idea {
  id: string
  title: string
  category: string
  description: string
  techStack: string[]
  requiredRoles: string[]
  author: {
    name: string
    avatar: string
  }
}

interface FormData {
  name: string
  email?: string 
  role: string
  experience: string
  portfolio: string
  github: string
  website: string
  motivation: string
  timeCommitment: string
  skills: Skill[]
  availability: {
    [key: string]: boolean
  }
}

interface Skill {
  name: string
  level: string
}

interface ErrorState {
  [key: string]: string | null
}

// Mock data
const MOCK_IDEAS: Idea[] = [
  {
    id: "1",
    title: "AI-Powered Code Review Assistant",
    description: "An AI tool that automatically reviews code, suggests improvements, and identifies potential bugs.",
    techStack: ["Python", "TensorFlow", "React", "Node.js"],
    category: "AI/ML",
    requiredRoles: ["ML Engineer", "Full Stack Developer", "DevOps"],
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    title: "Decentralized Developer Marketplace",
    description: "A blockchain-based platform connecting developers with clients.",
    techStack: ["Solidity", "Ethereum", "React", "GraphQL"],
    category: "Blockchain",
    requiredRoles: ["Blockchain Developer", "Frontend Developer", "Smart Contract Auditor"],
    author: {
      name: "Sophia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  },
]

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"]
const TIME_COMMITMENTS = [
  { value: "5-", label: "Less than 5 hours/week" },
  { value: "5-10", label: "5-10 hours/week" },
  { value: "10-20", label: "10-20 hours/week" },
  { value: "20+", label: "20+ hours/week" },
]

export default function JoinProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [idea, setIdea] = useState<Idea | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    experience: "",
    portfolio: "",
    github: "",
    website: "",
    motivation: "",
    timeCommitment: "",
    skills: [],
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<ErrorState>({})

  useEffect(() => {
    const fetchIdea = async () => {
      setLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const foundIdea = MOCK_IDEAS.find((idea) => idea.id === params.id)
        if (foundIdea) {
          setIdea(foundIdea)
        } else {
          router.push("/share-ideas")
        }
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchIdea()
    }
  }, [params.id, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) setErrors({ ...errors, [name]: null })
  }

  const handleAvailabilityChange = (day: string) => {
    setFormData({
      ...formData,
      availability: {
        ...formData.availability,
        [day]: !formData.availability[day],
      },
    })
  }

  const handleSkillSelect = (skill: string, level: string) => {
    const existingIndex = formData.skills.findIndex((s) => s.name === skill)

    if (existingIndex >= 0) {
      const updatedSkills = [...formData.skills]
      updatedSkills[existingIndex] = { name: skill, level }
      setFormData({ ...formData, skills: updatedSkills })
    } else {
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: skill, level }],
      })
    }
  }

  const removeSkill = (skillName: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill.name !== skillName),
    })
  }

  // Update the validation function to remove email validation
  const validateStep = (): boolean => {
    const newErrors: ErrorState = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.role) newErrors.role = "Please select a role"
    } else if (currentStep === 2) {
      if (formData.skills.length === 0) newErrors.skills = "Please select at least one skill"
      if (!formData.experience.trim()) newErrors.experience = "Please share your experience"
    } else if (currentStep === 3) {
      if (!formData.motivation.trim()) newErrors.motivation = "Please share your motivation"
      if (!formData.timeCommitment) newErrors.timeCommitment = "Please select your time commitment"
      const anyDaySelected = Object.values(formData.availability).some((day) => day)
      if (!anyDaySelected) newErrors.availability = "Please select at least one day you're available"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateStep()) {
      setSubmitting(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        console.log("Application submitted:", formData)
        setSubmitted(true)
      } finally {
        setSubmitting(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e]">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!idea) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#611f69] mb-4">Project Not Found</h2>
          <Button
            onClick={() => router.push("/share-ideas")}
            className="bg-gradient-to-r from-[#37113c] to-[#611f69] text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e] py-12 pt-30">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-[#611f69] dark:text-purple-300 mb-4">Application Submitted!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for applying to join "{idea.title}". The project owner will review your application soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push(`/share-ideas/${idea.id}`)}
              variant="outline"
              className="border-purple-200 dark:border-purple-900/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Button>
            <Button
              onClick={() => router.push("/share-ideas")}
              className="bg-gradient-to-r from-[#37113c] to-[#611f69] text-white"
            >
              Explore More Projects
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e] py-12 pt-30">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" className="mb-6 text-[#611f69]" onClick={() => router.push(`/share-ideas/${idea.id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Project
        </Button>

        <div className="text-center mb-8">
          <Badge className="mb-4 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-none px-3 py-1">
            {idea.category}
          </Badge>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#37113c] to-[#611f69] bg-clip-text text-transparent mb-4">
            Join "{idea.title}"
          </h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`relative flex flex-col items-center ${
                  currentStep === step ? "scale-110" : ""
                } transition-all duration-300`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step < currentStep
                      ? "bg-green-500 text-white"
                      : step === currentStep
                        ? "bg-gradient-to-r from-[#37113c] to-[#611f69] text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                  }`}
                >
                  {step < currentStep ? <CheckCircle2 className="h-5 w-5" /> : <span>{step}</span>}
                </div>
                <span className="text-xs mt-2 font-medium">
                  {step === 1 ? "Basic Info" : step === 2 ? "Skills" : "Availability"}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#37113c] to-[#611f69]"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <Card className="border-purple-200 dark:border-purple-900/50 shadow-lg overflow-hidden mb-8">
          <div className="h-2 bg-gradient-to-r from-[#37113c] to-[#611f69]"></div>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {/* Remove the email field from the UI in step 1 */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                      <User className="h-5 w-5 text-[#611f69]" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#611f69]">Basic Information</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Which role are you applying for?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {idea.requiredRoles.map((role, index) => (
                          <div
                            key={index}
                            className={`border rounded-lg p-4 cursor-pointer ${
                              formData.role === role
                                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                            onClick={() => {
                              setFormData({ ...formData, role })
                              if (errors.role) setErrors({ ...errors, role: null })
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  formData.role === role ? "border-purple-500 bg-purple-500" : "border-gray-300"
                                }`}
                              >
                                {formData.role === role && <CheckCircle2 className="h-3 w-3 text-white" />}
                              </div>
                              <span>{role}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                      <Code className="h-5 w-5 text-[#611f69]" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#611f69]">Skills & Experience</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select your skills and proficiency level</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {idea.techStack.map((tech, index) => (
                          <div key={index} className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-medium">{tech}</span>
                              <Badge
                                className={
                                  formData.skills.find((s) => s.name === tech)
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }
                              >
                                {formData.skills.find((s) => s.name === tech)?.level || "Not Selected"}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {SKILL_LEVELS.map((level) => (
                                <button
                                  key={level}
                                  type="button"
                                  className={`px-3 py-1 text-xs rounded-full ${
                                    formData.skills.find((s) => s.name === tech && s.level === level)
                                      ? "bg-purple-500 text-white"
                                      : "bg-purple-100 text-purple-800"
                                  }`}
                                  onClick={() => handleSkillSelect(tech, level)}
                                >
                                  {level}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg">
                      <h3 className="font-medium text-[#611f69] mb-2">Selected Skills</h3>
                      <div className="flex flex-wrap gap-2 min-h-[40px]">
                        {formData.skills.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No skills selected yet</p>
                        ) : (
                          formData.skills.map((skill, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm border"
                            >
                              <span className="font-medium">{skill.name}</span>
                              <span className="text-xs text-muted-foreground">({skill.level})</span>
                              <button
                                type="button"
                                onClick={() => removeSkill(skill.name)}
                                className="ml-1 text-gray-500 hover:text-red-500"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="experience" className="text-sm font-medium">
                        Relevant Experience
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        rows={4}
                        value={formData.experience}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border px-3 py-2 text-sm ${
                          errors.experience ? "border-red-500" : ""
                        }`}
                        placeholder="Describe your relevant experience..."
                      ></textarea>
                      {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label htmlFor="github" className="text-sm font-medium">
                          GitHub Profile (Optional)
                        </label>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="github"
                            name="github"
                            placeholder="github.com/username"
                            value={formData.github}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="website" className="text-sm font-medium">
                          Portfolio/Website (Optional)
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="website"
                            name="website"
                            placeholder="yourwebsite.com"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-[#611f69]" />
                    </div>
                    <h2 className="text-xl font-semibold text-[#611f69]">Availability & Motivation</h2>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time Commitment</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {TIME_COMMITMENTS.map((option) => (
                          <div
                            key={option.value}
                            className={`border rounded-lg p-4 cursor-pointer ${
                              formData.timeCommitment === option.value
                                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                            onClick={() => {
                              setFormData({ ...formData, timeCommitment: option.value })
                              if (errors.timeCommitment) setErrors({ ...errors, timeCommitment: null })
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  formData.timeCommitment === option.value
                                    ? "border-purple-500 bg-purple-500"
                                    : "border-gray-300"
                                }`}
                              >
                                {formData.timeCommitment === option.value && (
                                  <CheckCircle2 className="h-3 w-3 text-white" />
                                )}
                              </div>
                              <span>{option.label}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.timeCommitment && <p className="text-red-500 text-xs mt-1">{errors.timeCommitment}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Weekly Availability</label>
                      <div className="grid grid-cols-7 gap-2">
                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                          <div
                            key={day}
                            className={`aspect-square flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${
                              formData.availability[day] ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                            }`}
                            onClick={() => handleAvailabilityChange(day)}
                          >
                            <span className="text-xs font-medium">{day.charAt(0).toUpperCase()}</span>
                            {formData.availability[day] && <CheckCircle2 className="h-3 w-3 mt-1" />}
                          </div>
                        ))}
                      </div>
                      {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="motivation" className="text-sm font-medium">
                        Why do you want to join this project?
                      </label>
                      <textarea
                        id="motivation"
                        name="motivation"
                        rows={4}
                        value={formData.motivation}
                        onChange={handleInputChange}
                        className={`w-full rounded-md border px-3 py-2 text-sm ${
                          errors.motivation ? "border-red-500" : ""
                        }`}
                        placeholder="Share your motivation for joining this project..."
                      ></textarea>
                      {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <Button variant="outline" onClick={() => router.push(`/share-ideas/${idea.id}`)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}

          {currentStep < 3 ? (
            <Button onClick={handleNext} className="bg-gradient-to-r from-[#37113c] to-[#611f69] text-white">
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-gradient-to-r from-[#37113c] to-[#611f69] text-white min-w-[120px]"
            >
              {submitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
