import React from "react";


export const Landingpage = () => {
  return (
    <div className=" w-full min-h-screen border-amber-50 border-t-1"> 
      <div className="flex flex-col items-center justify-center w-full h-96 bg-[#000000]">
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
      <div className="flex flex-row  w-[68em] ml-32 h- bg-[#8d1387]  p-9 justify-around ">
        <div className="bg-amber-950 w-80 h-72 rounded-2xl ">
          <div className="p-5">
            <div className=" w-56 h-36 rounded-2xl ">
              {" "}
              <img
                className="rounded-2xl"
                src="https://www.theforage.com/blog/wp-content/uploads/2023/12/coding-vs-programming.jpg"
                alt=""
              />{" "}
            </div>
            <div className="font-bold text-white p-2 mt-2">Project alpha</div>
            <div className="p-2 text-white ">
              an innotive ai-driven platform for smarter decision making
            </div>
          </div>
        </div>
        <div className="bg-amber-950 w-80 h-72 rounded-2xl ">
          <div className="p-5">
            <div className=" w-56 h-36 rounded-2xl ">
              {" "}
              <img
                className="rounded-2xl"
                src="https://www.theforage.com/blog/wp-content/uploads/2023/12/coding-vs-programming.jpg"
                alt=""
              />{" "}
            </div>
            <div className="font-bold text-white p-2 mt-2">Project alpha</div>
            <div className="p-2 text-white ">
              an innotive ai-driven platform for smarter decision making
            </div>
          </div>
        </div>
        <div className="bg-amber-950 w-80 h-72 rounded-2xl ">
          <div className="p-5">
            <div className=" w-56 h-36 rounded-2xl ">
              {" "}
              <img 
                className="rounded-2xl"
                src="https://www.theforage.com/blog/wp-content/uploads/2023/12/coding-vs-programming.jpg"
                alt=""
              />{" "}
            </div>
            <div className="font-bold text-white p-2 mt-2">Project alpha</div>
            <div className="p-2 text-white ">
              an innotive ai-driven platform for smarter decision making
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
