"use client";
import React from "react";
import ReactPlayer from "react-player";

export const Landingpage = () => {
  return (
    <div className="w-full min-h-screen">
    <div className="flex flex-col text-black dark:text-white bg-white dark:bg-[#18181b] text-center items-center justify-center h-screen border-l border-r border-gray-600 bottom-corner-gradient">
      <h1 className="font-bold text-3xl">Discover and share your innovative project</h1>
      <h1 className="font-light mt-2">
        Join our vibrant community of developers and contributors to <br />
        <span>collaborate on exciting projects that shape the future.</span>
      </h1>
  
      <div className="mt-6 space-x-4">
        <button className="px-6 py-2 bg-[#611f69] text-white rounded-full hover:bg-[#621f69e9] transition">
          Explore Projects
        </button>
        <button className="px-6 py-2 bg-white text-[#611f69] border border-[#611f69] rounded-full hover:bg-slate-100 transition">
          Join Project
        </button>
      </div>
    </div>
  
    <div className="flex justify-center items-center absolute top-[750px] left-64 z-10">
      <div className="w-[90%] h-[60vh] rounded-md shadow shadow-[#621f6975] overflow-hidden">
        <ReactPlayer
          url="/videos/landing.mp4"
          width="100%"
          height="100%"
          playing
          loop
          muted
          controls
        />
      </div>
    </div>
  </div>
  );
};
