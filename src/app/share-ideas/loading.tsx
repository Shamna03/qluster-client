import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-[#1a0d1e]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-[#611f69] animate-spin" />
        <p className="text-lg font-medium text-[#611f69]">Loading ideas...</p>
      </div>
    </div>
  )
}
