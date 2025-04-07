"use client"
import { motion } from "framer-motion"
import { Code, Users, Zap, Globe, Shield, GitBranch } from "lucide-react"

export const FeaturesSection = () => {
  const features = [
    {
      title: "Real-time Collaboration",
      description:
        "Experience real-time assistance. Ask your AI Agent to coordinate tasks, answer questions, and maintain team alignment.",
      icon: <Users className="w-10 h-10 text-primary" />,
      delay: 0.1,
    },
    {
      title: "Smart Code Sharing",
      description:
        "Share code snippets, get feedback, and collaborate on solutions with developers from around the world.",
      icon: <Code className="w-10 h-10 text-primary" />,
      delay: 0.2,
    },
    {
      title: "Lightning Fast Deployment",
      description: "Deploy your projects with ease using our integrated CI/CD pipeline and cloud infrastructure.",
      icon: <Zap className="w-10 h-10 text-primary" />,
      delay: 0.3,
    },
    {
      title: "Global Developer Network",
      description: "Connect with developers from around the world and build your professional network.",
      icon: <Globe className="w-10 h-10 text-primary" />,
      delay: 0.4,
    },
    {
      title: "Secure Project Management",
      description:
        "Manage your projects with enterprise-grade security and access controls to protect your intellectual property.",
      icon: <Shield className="w-10 h-10 text-primary" />,
      delay: 0.5,
    },
    {
      title: "Version Control Integration",
      description:
        "Seamlessly integrate with popular version control systems like Git to track changes and manage contributions.",
      icon: <GitBranch className="w-10 h-10 text-primary" />,
      delay: 0.6,
    },
  ]

  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-primary"
          >
            Powerful Features for Developers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything you need to build, collaborate, and deploy amazing projects
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg border border-border hover:shadow-lg transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

