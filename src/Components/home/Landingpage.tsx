"use client"
import { Button } from "@/Components/ui/button"
import HeroVideoDialog from "../magicui/hero-video-dialog"
import { ArrowRight, Code, Users } from "lucide-react"
import Link from "next/link"

export const Landingpage = () => {
  return (
    <div className="w-full h-full ">
      <div className="flex flex-col text-foreground bg-background text-center items-center justify-center  px-4 relative bottom-corner-gradient pb-32 h-full">
        {/* Content */}
        <div className="relative z-10 max-w-4xl pt-56">
          <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-6 text-primary ">
            Discover and Share Innovative Projects
          </h1>
          <p className="font-light text-lg md:text-xl mb-8 text-muted-foreground">
            Join our vibrant community of developers and contributors to <br />
            <span className="font-medium">collaborate on exciting projects that shape the future.</span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link href="/share-ideas" >
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 rounded-full flex items-center gap-2 text-base">
              Explore Projects
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            </Link>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-6 rounded-full flex items-center gap-2 text-base"
            >
              <Users className="w-5 h-5" />
              Join Project
            </Button>
          </div>

          <div className="relative w-full max-w-3xl  mx-auto pt-20">
            <HeroVideoDialog
              videoSrc="/videos/landing.mp4"
              thumbnailSrc="/placeholder.svg?height=600&width=1000"
              className="w-full rounded-lg shadow-xl border-2 border-primary/20"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

