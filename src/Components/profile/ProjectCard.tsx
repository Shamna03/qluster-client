import { Star, GitFork, ExternalLink } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  link: string
  stars: number
  contributors: number
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard =({ project }: ProjectCardProps)=> {
  return (
    <Card className="overflow-hidden group hover:border-[#611f69]/30 transition-all duration-300 bg-white/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center text-gray-800 dark:text-white">
          <span>{project.title}</span>
          {/* <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-[#611f69] dark:hover:text-[#611f69]"
          >
            <ExternalLink size={16} />
          </a> */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs bg-[#611f69]/10 text-[#611f69] dark:bg-[#611f69]/10 dark:text-[#83218e] border-none"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-0">
        <div className="flex items-center gap-1">
          <Star size={14} className="text-amber-500" />
          <span>{project.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork size={14} />
          <span>{project.contributors} contributors</span>
        </div>
      </CardFooter>
    </Card>
  )
}
export default ProjectCard