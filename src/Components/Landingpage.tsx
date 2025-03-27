import React from "react";

export const Landingpage = () => {
  return (
    <div className="bg-blue-950 w-full h-[36.1em]">
      <hr className="border-amber-50" />
      <div className="flex flex-col items-center justify-center w-full h-full bg-blue-950">
        <h1 className="font-bold text-amber-50 text-3xl">
          Discover and share your innovative project
        </h1>
        <h1 className="font-light text-amber-50 text-center mt-2">
          Join our vibrant community of developers and contributors to <br />
          <span>collaborate on exciting projects that shape the future.</span>
        </h1>

        <div className="mt-6 space-x-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Explore Projects
          </button>
          <button className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-full hover:bg-blue-100 transition">
            Join Project
          </button>
        </div>
      </div>
    </div>
  );
};
