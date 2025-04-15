import { Badge } from "@/Components/ui/badge"

interface SkillBadgeProps {
  skill: string
  count: number
}

 const SkillBadge =({ skill, count }: SkillBadgeProps) =>{
  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1.5 py-1.5 px-3 border-primary/20 hover:border-primary/50 transition-colors"
    >
      <span>{skill}</span>
      {count > 0 && (
        <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-primary text-primary-foreground rounded-full">
          {count}
        </span>
      )}
    </Badge>
  )
}
export default  SkillBadge
