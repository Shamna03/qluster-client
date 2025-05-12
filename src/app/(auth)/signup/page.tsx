"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, User, ChevronRight, LoaderCircle } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../../../api/axiosInstance"
import { useRouter } from "next/navigation"
import GoogleSignIn from "@/Components/googleButton/GoogleButton"

// Validation schema
const SignupSchema = Yup.object({
  name: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmPassword: Yup.string() .oneOf([Yup.ref('password')], 'Passwords must match').required('Required')
})

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export default function Page() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const router = useRouter()

  const {mutate }=useMutation({
    mutationFn  :async (values:{name:string,email:string,password:string,confirmPassword:string}) =>{
        const {data} = await axiosInstance.post("/user/signup",values)
        return data
    },
    onSuccess:(data)=>{
        console.log( data);
        router.replace("/login")

    },onError:(err:any)=>{
      alert(err.response?.data?.message)
    } 
  })

  // Handle mouse movement for interactive background effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleSubmit = async (values: typeof initialValues) => {
      setIsLoading(true)
      console.log(values);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    mutate(values)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Dynamic background with parallax effect */}
      <div
        className="absolute inset-0 bg-[#611f69]"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #7a2d85 0%, #611f69 30%, #4a1850 100%)`,
        }}
      > 
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-pulse"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 8 + 2}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#9d3ba9]/10 rounded-bl-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#4a1850]/20 rounded-tr-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXotMiAyaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6bTItMmgxdjFoLTF2LTF6bS0yIDJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      </div>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 z-10">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 text-white space-y-8 text-center lg:text-left">
            <div className="relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Join QLUSTER</span>
              </h1>
            </div>

            <p className="text-2xl md:text-3xl font-light opacity-90 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Create your workspace.
              </span>
            </p>

            <div className="relative">
              <p className="text-white/70 max-w-md text-lg">
                Join thousands of teams who use Qluster to collaborate, create, and innovate together.
              </p>
            </div>
          </div>

          {/* Right side - Signup form */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative h-16 bg-gradient-to-r from-[#7a2d85]/30 to-[#4a1850]/30 flex items-center px-6">
                <h2 className="text-xl font-semibold text-white">Create your account</h2>
              </div>

              <div className="p-6 md:p-8">
                <Formik
                  initialValues={initialValues}
                  validationSchema={SignupSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="space-y-5">
                      {/* Name field */}
                      <div className="space-y-2">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-white/50" />
                          </div>
                          <Field
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            className={`block w-full pl-10 pr-3 py-2.5 bg-white/10 border ${
                              errors.name && touched.name ? 'border-red-400/50' : 'border-white/20'
                            } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all`}
                            placeholder="Full name"
                          />
                        </div>
                        <ErrorMessage name="name" component="div" className="text-red-400 text-xs" />
                      </div>

                      {/* Email field */}
                      <div className="space-y-2">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-white/50" />
                          </div>
                          <Field id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className={`block w-full pl-10 pr-3 py-2.5 bg-white/10 border ${
                              errors.email && touched.email ? 'border-red-400/50' : 'border-white/20'
                            } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all`}
                            placeholder="name@example.com"
                          />
                        </div>
                        <ErrorMessage name="email" component="div" className="text-red-400 text-xs" />
                      </div>

                      {/* Password field */}
                      <div className="space-y-2">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-white/50" />
                          </div>
                          <Field
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            className={`block w-full pl-10 pr-10 py-2.5 bg-white/10 border ${
                              errors.password && touched.password ? 'border-red-400/50' : 'border-white/20'
                            } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-red-400 text-xs" />
                      </div>

                      {/* Confirm Password field */}
                      <div className="space-y-2 ">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-white/50" />
                          </div>
                          <Field id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            className={`block w-full pl-10 pr-10 py-2.5 bg-white/10 border ${
                              errors.confirmPassword && touched.confirmPassword ? 'border-red-400/50' : 'border-white/20'
                            } rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all`}
                            placeholder="Confirm password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/50 hover:text-white/80 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-xs  min-h-[20px]" />
                      </div>

                      {/* Submit button */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-white hover:bg-white/90 text-[#611f69] font-semibold py-2.5 rounded-lg transition-all shadow-lg shadow-white/10 hover:shadow-white/20"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center">
                              <LoaderCircle className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#611f69]" />
                              Creating account...
                            </div>
                          ) : ( <div className="flex items-center justify-center"> Create account <ChevronRight className="ml-1 h-4 w-4" /> </div> )}
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>

                {/* Divider */}
                <div className="mt-8 flex items-center">
                  <div className="flex-grow h-px bg-white/10"></div>
                  <span className="px-3 text-sm text-white/50">or sign up with</span>
                  <div className="flex-grow h-px bg-white/10"></div>
                </div>

                {/* Social login buttons */}
               
                <GoogleSignIn />
              </div>

              {/* Card footer */}
              <div className="px-6 py-4 bg-white/5 text-center">
                <p className="text-sm text-white/70">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-white hover:text-white/90 underline underline-offset-2"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}