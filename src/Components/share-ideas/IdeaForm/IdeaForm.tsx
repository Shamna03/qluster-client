"use client"

import { useState, useRef, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import {
  X,
  Plus,
  Lightbulb,
  Code,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Brain,
  Rocket,
  Layers,
  Target,
  Check,
  Laptop,
  Server,
  Palette,
  GitBranch,
  ClipboardList,
  CheckCircle,
  BarChart,
  Smartphone,
  LightbulbIcon,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent } from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import { Badge } from "@/Components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"


const categories = [
  "AI/ML",
  "Blockchain",
  "Web Development",
  "Mobile",
  "DevOps",
  "Developer Tools",
  "IoT",
  "Cybersecurity",
  "Other",
]

// Validation schemas for each step
const step1ValidationSchema = Yup.object({
  title: Yup.string().required("Title is required").max(100, "Title is too long"),
  category: Yup.string().required("Category is required"),
})

const step2ValidationSchema = Yup.object({
  description: Yup.string()
    .required("Description is required")
    .min(30, "Description is too short")
    .max(500, "Description is too long"),
  problem: Yup.string().required("Problem statement is required").min(20, "Problem statement is too short"),
  solution: Yup.string().required("Solution description is required").min(20, "Solution description is too short"),
})

const step3ValidationSchema = Yup.object({
  techStack: Yup.array().min(1, "At least one technology is required"),
  requiredRoles: Yup.array().min(1, "At least one role is required"),
})

const finalValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  techStack: Yup.array().min(1, "At least one technology is required"),
  requiredRoles: Yup.array().min(1, "At least one role is required"),
})

export default function IdeaForm({ onSubmit, onCancel }) {
  const [activeStep, setActiveStep] = useState(1)
  const [techInput, setTechInput] = useState("")
  const [roleInput, setRoleInput] = useState("")
  const [completedSteps, setCompletedSteps] = useState([])
  const formikRef = useRef(null)
  const techInputRef = useRef(null)
  const roleInputRef = useRef(null)

  // Focus the appropriate input when changing steps
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeStep === 4) {
        if (techInputRef.current) {
          techInputRef.current.focus()
        }
      }
    }, 500) // Delay to allow animation to complete

    return () => clearTimeout(timer)
  }, [activeStep])

  const steps = [
    {
      number: 1,
      title: "Basic Information",
      icon: <Lightbulb className="h-5 w-5" />,
      description: "Start with a clear title and category",
      validationSchema: step1ValidationSchema,
    },
    {
      number: 2,
      title: "Detailed Description",
      icon: <Brain className="h-5 w-5" />,
      description: "Explain your idea in detail",
      validationSchema: step2ValidationSchema,
    },
    {
      number: 3,
      title: "Tech & Team",
      icon: <Layers className="h-5 w-5" />,
      description: "Define technologies and required roles",
      validationSchema: step3ValidationSchema,
    },
    {
      number: 4,
      title: "Review & Submit",
      icon: <Rocket className="h-5 w-5" />,
      description: "Review and finalize your project idea",
      validationSchema: finalValidationSchema,
    },
  ]

  const validateCurrentStep = async () => {
    if (!formikRef.current) return false

    const currentSchema = steps.find((step) => step.number === activeStep)?.validationSchema
    if (!currentSchema) return true

    try {
      await currentSchema.validate(formikRef.current.values, { abortEarly: false })
      return true
    } catch (err) {
      // Touch all fields to show validation errors
      const touchedFields = {}
      err.inner.forEach((error) => {
        touchedFields[error.path] = true
      })
      formikRef.current.setTouched({ ...formikRef.current.touched, ...touchedFields })

      return false
    }
  }

  console.log("steps ",activeStep)
  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      // if (!completedSteps.includes(activeStep)) {
      //   setCompletedSteps([...completedSteps, activeStep])
      // }
      setActiveStep(Math.min(activeStep + 1, 4))
    }
  }

  const handleBack = () => {
    setActiveStep(Math.max(activeStep - 1, 1))
  }

  // Animations
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  }
  


  return (
    <Card className="border border-purple-200 dark:border-purple-900/50 shadow-lg overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-[#37113c] to-[#611f69] text-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-6 w-6" />
            <h2 className="text-xl font-semibold">Share Your Project Idea</h2>
          </div>

          {/* Progress indicator */}
          <div className="w-full mt-4">
            <div className="flex justify-between mb-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex flex-col items-center relative ${
                    activeStep === step.number ? "scale-110" : ""
                  } transition-all duration-300`}
                  style={{ width: `${100 / steps.length}%` }}
                >
                  {completedSteps.includes(step.number) ? (
                    <div className="rounded-full bg-green-500 h-8 w-8 flex items-center justify-center mb-1 transition-all duration-300 shadow-md">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <div
                      className={`rounded-full ${
                        activeStep === step.number ? "bg-white text-[#611f69]" : "bg-white/30 text-white"
                      } h-8 w-8 flex items-center justify-center mb-1 transition-all duration-300 ${
                        activeStep === step.number ? "shadow-md" : ""
                      }`}
                    >
                      {step.icon}
                    </div>
                  )}
                  <span
                    className={`text-xs font-medium ${
                      activeStep === step.number ? "text-white" : "text-white/70"
                    } text-center hidden md:block`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-white/20 rounded-full w-full relative">
              <motion.div
                className="h-full bg-white rounded-full absolute top-0 left-0"
                initial={{ width: `${(1 - 1) * (100 / (steps.length - 1))}%` }}
                animate={{ width: `${(activeStep - 1) * (100 / (steps.length - 1))}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        <Formik
          innerRef={formikRef}
          initialValues={{
            title: "",
            description: "",
            category: "Web Development",
            problem: "",
            solution: "",
            techStack: [],
            requiredRoles: [],
          }}
          validationSchema={finalValidationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          
            <Form className="p-6">
              <AnimatePresence mode="wait">
                {activeStep === 1 && (
                  <motion.div
                    key="step1"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="space-y-6"
                  >
                    
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300">
                        <Target className="h-5 w-5" />
                        Name Your Project Idea
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Give your project a memorable name and categorize it.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">
                          Project Title
                        </label>
                        <Field
                          as={Input}
                          id="title"
                          name="title"
                          placeholder="Enter a catchy title for your project idea"
                          className={`border-purple-200 dark:border-purple-900/50 ${
                            errors.title && touched.title
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "focus-visible:ring-[#611f69]/20"
                          }`}
                        />
                        <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-500" />
                      </div>

                      <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-1">
                          Category
                        </label>
                        <Tabs
                          value={values.category}
                          onValueChange={(value) => setFieldValue("category", value)}
                          className="w-full"
                        >
                          <TabsList className="bg-muted/50 h-9 w-full grid grid-cols-3 md:grid-cols-5">
                            {categories.map((category) => (
                              <TabsTrigger key={category} value={category} className="text-xs">
                                {category}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        </Tabs>
                        <ErrorMessage name="category" component="div" className="mt-1 text-sm text-red-500" />
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg mt-6">
                        <h4 className="text-sm font-medium text-[#611f69] dark:text-purple-300 mb-2">
                          Tips for a Great Project Title:
                        </h4>
                        <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-4">
                          <li>Keep it clear and concise (4-8 words)</li>
                          <li>Make it descriptive of what your project does</li>
                          <li>Avoid technical jargon unless necessary</li>
                          <li>Consider something memorable and unique</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    key="step2"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300">
                        <Brain className="h-5 w-5" />
                        Describe Your Project
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Explain your idea, the problem it solves, and your approach.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="problem" className="block text-sm font-medium mb-1">
                          What problem does your project solve?
                        </label>
                        <Field
                          as="textarea"
                          id="problem"
                          name="problem"
                          placeholder="Describe the problem or need your project addresses..."
                          rows={2}
                          className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                            errors.problem && touched.problem
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-purple-200 dark:border-purple-900/50 focus-visible:ring-[#611f69]/20"
                          }`}
                        />
                        <ErrorMessage name="problem" component="div" className="mt-1 text-sm text-red-500" />
                      </div>

                      <div>
                        <label htmlFor="solution" className="block text-sm font-medium mb-1">
                          How does your project solve this problem?
                        </label>
                        <Field
                          as="textarea"
                          id="solution"
                          name="solution"
                          placeholder="Explain your approach to solving the problem..."
                          rows={2}
                          className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                            errors.solution && touched.solution
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-purple-200 dark:border-purple-900/50 focus-visible:ring-[#611f69]/20"
                          }`}
                        />
                        <ErrorMessage name="solution" component="div" className="mt-1 text-sm text-red-500" />
                      </div>

                      <div>
                        <label htmlFor="description" className="block text-sm font-medium mb-1">
                          Detailed Description
                        </label>
                        <Field
                          as="textarea"
                          id="description"
                          name="description"
                          placeholder="Provide more details about your project, its features, and potential impact..."
                          rows={4}
                          className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                            errors.description && touched.description
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-purple-200 dark:border-purple-900/50 focus-visible:ring-[#611f69]/20"
                          }`}
                        />
                        <ErrorMessage name="description" component="div" className="mt-1 text-sm text-red-500" />
                        <div className="mt-1 text-xs text-muted-foreground text-right">
                          {values.description.length}/500
                        </div>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg mt-4">
                        <h4 className="text-sm font-medium text-[#611f69] dark:text-purple-300 mb-2">
                          Tips for a Great Description:
                        </h4>
                        <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-4">
                          <li>Be specific about what your project does</li>
                          <li>Explain why this project matters and to whom</li>
                          <li>Mention any unique or innovative aspects</li>
                          <li>Include potential challenges you foresee</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeStep === 3 && (
                  <motion.div
                    key="step3"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300">
                        <Layers className="h-5 w-5" />
                        Tech Stack & Team Roles
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Define the technologies and the roles you need for this project.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Tech Stack Section */}
                      <div className="bg-white dark:bg-gray-900 rounded-xl border border-purple-100 dark:border-purple-900/30 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                            <Code className="h-4 w-4 text-[#611f69] dark:text-purple-300" />
                          </div>
                          <label htmlFor="techStack" className="text-sm font-medium">
                            Tech Stack
                          </label>
                        </div>

                        <div className="relative">
                          <Input
                            id="techInput"
                            ref={techInputRef}
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            placeholder="Add technologies..."
                            className="pr-10 border-purple-200 dark:border-purple-900/50 focus-visible:ring-[#611f69]/20"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && techInput.trim()) {
                                e.preventDefault()
                                if (!values.techStack.includes(techInput.trim())) {
                                  setFieldValue("techStack", [...values.techStack, techInput.trim()])
                                }
                                setTechInput("")
                              }
                            }}
                          />
                          <Button
                            type="button"
                            size="icon"
                            className="absolute right-1 top-1 h-8 w-8 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-[#611f69] dark:text-purple-300 rounded-md"
                            onClick={() => {
                              if (techInput.trim() && !values.techStack.includes(techInput.trim())) {
                                setFieldValue("techStack", [...values.techStack, techInput.trim()])
                                setTechInput("")
                                techInputRef.current?.focus()
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <ErrorMessage name="techStack" component="div" className="mt-1 text-sm text-red-500" />

                        {/* Tech Categories */}
                        <div className="mt-4">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Popular Technologies</div>
                          <Tabs defaultValue="frontend" className="w-full">
                            <TabsList className="bg-purple-50 dark:bg-purple-900/10 h-8 w-full grid grid-cols-4">
                              <TabsTrigger value="frontend" className="text-xs">
                                Frontend
                              </TabsTrigger>
                              <TabsTrigger value="backend" className="text-xs">
                                Backend
                              </TabsTrigger>
                              <TabsTrigger value="mobile" className="text-xs">
                                Mobile
                              </TabsTrigger>
                              <TabsTrigger value="other" className="text-xs">
                                Other
                              </TabsTrigger>
                            </TabsList>
                            <div className="pt-2 pb-1">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key="frontend"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  transition={{ duration: 0.2 }}
                                  className="grid grid-cols-3 gap-1"
                                >
                                  {["React", "Vue", "Angular", "Next.js", "Tailwind CSS", "TypeScript"].map((tech) => (
                                    <Button
                                      key={tech}
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className={`text-xs h-7 justify-start ${
                                        values.techStack.includes(tech)
                                          ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        if (!values.techStack.includes(tech)) {
                                          setFieldValue("techStack", [...values.techStack, tech])
                                        } else {
                                          setFieldValue(
                                            "techStack",
                                            values.techStack.filter((t) => t !== tech),
                                          )
                                        }
                                      }}
                                    >
                                      {values.techStack.includes(tech) ? (
                                        <Check className="h-3 w-3 mr-1" />
                                      ) : (
                                        <Plus className="h-3 w-3 mr-1" />
                                      )}
                                      {tech}
                                    </Button>
                                  ))}
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </Tabs>
                        </div>

                        {/* Selected Technologies */}
                        <div className="mt-4">
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            Selected Technologies ({values.techStack.length})
                          </div>
                          <div className="min-h-[100px] bg-purple-50 dark:bg-purple-900/10 rounded-lg p-3 flex flex-wrap gap-2 content-start">
                            {values.techStack.length === 0 ? (
                              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                No technologies selected yet
                              </div>
                            ) : (
                              values.techStack.map((tech, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="flex items-center gap-1 bg-white dark:bg-gray-800 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-200 dark:border-purple-900/50 shadow-sm"
                                >
                                  {tech}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFieldValue(
                                        "techStack",
                                        values.techStack.filter((_, i) => i !== index),
                                      )
                                    }}
                                    className="ml-1 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 bg-purple-50 dark:bg-purple-900/20 rounded-full h-4 w-4 flex items-center justify-center"
                                  >
                                    <X className="h-2 w-2" />
                                  </button>
                                </motion.div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Required Roles Section */}
                      <div className="bg-white dark:bg-gray-900 rounded-xl border border-pink-100 dark:border-pink-900/30 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full">
                            <Users className="h-4 w-4 text-pink-800 dark:text-pink-300" />
                          </div>
                          <label htmlFor="requiredRoles" className="text-sm font-medium">
                            Required Roles
                          </label>
                        </div>

                        <div className="relative">
                          <Input
                            id="roleInput"
                            ref={roleInputRef}
                            value={roleInput}
                            onChange={(e) => setRoleInput(e.target.value)}
                            placeholder="Add required roles..."
                            className="pr-10 border-pink-200 dark:border-pink-900/50 focus-visible:ring-pink-500/20"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && roleInput.trim()) {
                                e.preventDefault()
                                if (!values.requiredRoles.includes(roleInput.trim())) {
                                  setFieldValue("requiredRoles", [...values.requiredRoles, roleInput.trim()])
                                }
                                setRoleInput("")
                              }
                            }}
                          />
                          <Button
                            type="button"
                            size="icon"
                            className="absolute right-1 top-1 h-8 w-8 bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-md"
                            onClick={() => {
                              if (roleInput.trim() && !values.requiredRoles.includes(roleInput.trim())) {
                                setFieldValue("requiredRoles", [...values.requiredRoles, roleInput.trim()])
                                setRoleInput("")
                                roleInputRef.current?.focus()
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <ErrorMessage name="requiredRoles" component="div" className="mt-1 text-sm text-red-500" />

                        {/* Role Categories */}
                        <div className="mt-4">
                          <div className="text-xs font-medium text-muted-foreground mb-2">Common Roles</div>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { name: "Frontend Developer", icon: <Laptop className="h-3 w-3 mr-1" /> },
                              { name: "Backend Developer", icon: <Server className="h-3 w-3 mr-1" /> },
                              { name: "UI/UX Designer", icon: <Palette className="h-3 w-3 mr-1" /> },
                              { name: "DevOps Engineer", icon: <GitBranch className="h-3 w-3 mr-1" /> },
                              { name: "Project Manager", icon: <ClipboardList className="h-3 w-3 mr-1" /> },
                              { name: "QA Engineer", icon: <CheckCircle className="h-3 w-3 mr-1" /> },
                              { name: "Data Scientist", icon: <BarChart className="h-3 w-3 mr-1" /> },
                              { name: "Mobile Developer", icon: <Smartphone className="h-3 w-3 mr-1" /> },
                            ].map((role) => (
                              <Button
                                key={role.name}
                                type="button"
                                variant="outline"
                                size="sm"
                                className={`text-xs h-8 justify-start border-pink-200 dark:border-pink-900/50 ${
                                  values.requiredRoles.includes(role.name)
                                    ? "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 border-pink-300 dark:border-pink-800/50"
                                    : ""
                                }`}
                                onClick={() => {
                                  if (!values.requiredRoles.includes(role.name)) {
                                    setFieldValue("requiredRoles", [...values.requiredRoles, role.name])
                                  } else {
                                    setFieldValue(
                                      "requiredRoles",
                                      values.requiredRoles.filter((r) => r !== role.name),
                                    )
                                  }
                                }}
                              >
                                {role.icon}
                                {role.name}
                                {values.requiredRoles.includes(role.name) && <Check className="h-3 w-3 ml-auto" />}
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Selected Roles */}
                        <div className="mt-4">
                          <div className="text-xs font-medium text-muted-foreground mb-2">
                            Selected Roles ({values.requiredRoles.length})
                          </div>
                          <div className="min-h-[100px] bg-pink-50 dark:bg-pink-900/10 rounded-lg p-3 flex flex-wrap gap-2 content-start">
                            {values.requiredRoles.length === 0 ? (
                              <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                No roles selected yet
                              </div>
                            ) : (
                              values.requiredRoles.map((role, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="flex items-center gap-1 bg-white dark:bg-gray-800 text-pink-800 dark:text-pink-300 px-2 py-1 rounded-full text-xs border border-pink-200 dark:border-pink-900/50 shadow-sm"
                                >
                                  {role}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setFieldValue(
                                        "requiredRoles",
                                        values.requiredRoles.filter((_, i) => i !== index),
                                      )
                                    }}
                                    className="ml-1 text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-200 bg-pink-50 dark:bg-pink-900/20 rounded-full h-4 w-4 flex items-center justify-center"
                                  >
                                    <X className="h-2 w-2" />
                                  </button>
                                </motion.div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tips Section */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-4 rounded-lg mt-4 border border-purple-100 dark:border-purple-900/30">
                      <h4 className="text-sm font-medium text-[#611f69] dark:text-purple-300 mb-2 flex items-center gap-2">
                        <LightbulbIcon className="h-4 w-4" />
                        Tips for Building a Great Team
                      </h4>
                      <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-4">
                        <li>Be specific about the technologies your project will use</li>
                        <li>Consider all aspects of development (frontend, backend, design, etc.)</li>
                        <li>Define clear roles to attract the right collaborators</li>
                        <li>Include any specialized skills that would benefit your project</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeStep === 4 && (
                  <motion.div
                    key="step4"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ type: "tween", duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold flex items-center gap-2 text-[#611f69] dark:text-purple-300">
                        <Rocket className="h-5 w-5" />
                        Review Your Project Idea
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Take a moment to review your project details before submitting.
                      </p>
                    </div>

                    <div className="space-y-5 bg-purple-50 dark:bg-purple-900/10 p-5 rounded-lg">
                      <div>
                        <h4 className="text-sm font-semibold text-[#611f69] dark:text-purple-300">Project Title</h4>
                        <p className="mt-1">{values.title}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#611f69] dark:text-purple-300">Category</h4>
                        <Badge className="mt-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-none">
                          {values.category}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#611f69] dark:text-purple-300">Problem Statement</h4>
                        <p className="mt-1 text-sm">{values.problem}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#611f69] dark:text-purple-300">Solution</h4>
                        <p className="mt-1 text-sm">{values.solution}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#611f69] dark:text-purple-300">
                          Detailed Description
                        </h4>
                        <p className="mt-1 text-sm">{values.description}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#611f69] dark:text-purple-300">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {values.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#611f69] dark:text-purple-300">Required Roles</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {values.requiredRoles.map((role, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Before you submit
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        By submitting this idea, you agree that it will be visible to other developers who may be
                        interested in collaborating on it. You maintain ownership of your idea.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between mt-8 pt-4 border-t border-purple-100 dark:border-purple-900/30">
                {activeStep > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="border-purple-200 dark:border-purple-900/50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="border-purple-200 dark:border-purple-900/50"
                  >
                    Cancel
                  </Button>
                )}

                {activeStep <= 3 && 
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                }
                 {activeStep === 4 && <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#37113c] to-[#611f69] hover:from-[#4a1751] hover:to-[#7a2785] text-white"
                  >
                    Submit Idea
                    <Rocket className="h-4 w-4 ml-2" />
                  </Button>
                }
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  )
}