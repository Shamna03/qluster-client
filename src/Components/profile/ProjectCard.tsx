import { Star, GitFork, ExternalLink } from "lucide-react"
import { Badge } from "@/Components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card"

interface Project {
  _id: string
  title: string
  description: string
  image: string
  technologies: string[]
  link: string
  stars: number
  contributors: number
}

interface ProjectCardProps {
  project: Project
}

 const  ProjectCard =({ project }: ProjectCardProps)=>{
  return (
    <Card className="overflow-hidden group hover:border-primary/50 transition-all duration-300">
      <div className="relative h-40 overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{project.title}</span>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary"
          >
            <ExternalLink size={16} />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-muted-foreground pt-0">
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