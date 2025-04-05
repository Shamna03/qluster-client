"use client";
import React from "react";
import ReactPlayer from "react-player";
import HeroVideoDialog from "../magicui/hero-video-dialog";

type HeroVideoProps = {
  videoSrc: string;
  thumbnailSrc: string;
}
export const Landingpage = () => {
  return (
    <div className="w-full min-h-screen">
    <div className="flex flex-col text-black dark:text-white bg-white dark:bg-[#18181b] text-center items-center rounded-bl-3xl  rounded-br-3xl justify-center h-screen border-l border-r border-gray-600 bottom-corner-gradient">
      <h1 className="font-bold text-4xl">Discover and share your innovative project</h1>
      <h1 className="font-light mt-2">
        Join our vibrant community of developers and contributors to <br />
        <span>collaborate on exciting projects that shape the future.</span>
      </h1>
  
      <div className="mt-6 space-x-4">
        <button className="px-6 py-2 bg-[#611f69] text-white rounded-full hover:bg-[#621f69e9] transition cursor-pointer">
          Explore Projects
        </button>
        <button className="px-6 py-2 bg-white text-[#611f69] border border-[#611f69] rounded-full hover:bg-slate-100 transition cursor-pointer">
          Join Project
        </button>
      </div>
    </div>

<HeroVideoDialog  className=" relative bottom-70"
  videoSrc="/videos/landing.mp4"
  thumbnailSrc="/images/thumbnail.jpg" 
/>

  </div>
  );
};
