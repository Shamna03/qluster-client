export interface Project {
    content: string,
    _id: string
    title: string
    description: string
    techStack: string[]
    problem: string
    solution: string
    category: string[]
    requiredRoles: string[]
    createdby: string // or `User` if you have a user interface
    likes: number
    comments: number
    featured: boolean
    progress: number
    status: "Planning" | "In Progress" | "Completed" | "On Hold" | "Recruiting"
    author: {
      name: string
      avatar: string
      title: string
      company: string
      github: string
      website: string
    }
    team: {
      name: string
      avatar: string
      role: string
    }[]
    updates: {
      date: string // or Date
      content: string
    }[]
    resources: {
      type: "document" | "repository" | "link"
      name: string
      url: string
    }[]
    createdAt: string
    updatedAt: string
  }
  
  export interface IdeaFormValues {
    title: string
    description: string
    techStack: string[]
    problem: string
    solution: string
    category: string[]
    requiredRoles: string[]
    status?: "Planning" | "In Progress" | "Completed" | "On Hold"
  }
  