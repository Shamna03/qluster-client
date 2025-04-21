import { Badge } from "@/Components/ui/badge"

interface SkillBadgeProps {
  skill: string
  count: number
}

const SkillBadge =({ skill, count }: SkillBadgeProps) =>{
  return (
    <Badge
      variant="outline"
      className="flex items-center gap-1.5 py-1.5 px-3 border-[#611f69]/20 bg-[#611f69]/10 text-[#611f69] dark:text-[#83218e] hover:border-[#611f69]/40 transition-colors"
    >
      <span>{skill}</span>
      {count > 0 && (
        <span className="inline-flex items-center justify-center w-4 h-4 text-xs bg-[#611f69] text-white rounded-full">
          {count}
        </span>
      )}
    </Badge>
  )
}
export default SkillBadge