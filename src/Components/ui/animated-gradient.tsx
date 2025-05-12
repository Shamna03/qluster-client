// "use client"

// import { useEffect, useRef } from "react"
// import { motion } from "framer-motion"

// export function AnimatedGradient({ className, children }) {
//   const canvasRef = useRef(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     const width = canvas.width = canvas.offsetWidth
//     const height = canvas.height = canvas.offsetHeight

//     // Set initial circle positions
//     const circles = [
//       { x: width * 0.3, y: height * 0.3, radius: width * 0.2, color: "rgba(139, 92, 246, 0.15)", speed: 0.5 },
//       { x: width * 0.7, y: height * 0.6, radius: width * 0.25, color: "rgba(236, 72, 153, 0.1)", speed: 0.7 },
//       { x: width * 0.5, y: height * 0.4, radius: width * 0.15, color: "rgba(124, 58, 237, 0.12)", speed: 0.6 },
//     ]

//     let animationFrame
//     let time = 0

//     const animate = () => {
//       time += 0.01
//       ctx.clearRect(0, 0, width, height)

//       // Update and draw circles
//       circles.forEach((circle, i) => {
//         const offsetX = Math.sin(time * circle.speed + i) * width * 0.05
//         const offsetY = Math.cos(time * circle.speed + i) * height * 0.05

//         const gradient = ctx.createRadialGradient(
//           circle.x + offsetX, 
//           circle.y + offsetY, 
//           0, 
//           circle.x + offsetX, 
//           circle.y + offsetY, 
//           circle.radius
//         )
//         gradient.addColorStop(0, circle.color)
//         gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

//         ctx.fillStyle = gradient
//         ctx.beginPath()
//         ctx.arc(circle.x + offsetX, circle.y + offsetY, circle.radius, 0, Math.PI * 2)
//         ctx.fill()
//       })

//       animationFrame = requestAnimationFrame(animate)
//     }

//     animate()

//     // Handle window resize
//     const handleResize = () => {
//       const newWidth = canvas.width = canvas.offsetWidth
//       const newHeight = canvas.height = canvas.offsetHeight
      
//       // Adjust circle positions and sizes based on new dimensions
//       circles[0].x = newWidth * 0.3
//       circles[0].y = newHeight * 0.3
//       circles[0].radius = newWidth * 0.2
      
//       circles[1].x = newWidth * 0.7
//       circles[1].y = newHeight * 0.6
//       circles[1].radius = newWidth * 0.25
      
//       circles[2].x = newWidth * 0.5
//       circles[2].y = newHeight * 0.4
//       circles[2].radius = newWidth * 0.15
//     }

//     window.addEventListener('resize', handleResize)

//     return () => {
//       cancelAnimationFrame(animationFrame)
//       window.removeEventListener('resize', handleResize)
//     }
//   }, [])

//   return (
//     <div className={`relative ${className}`}>
//       <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />
//       {children}
//     </div>
//   )
// }