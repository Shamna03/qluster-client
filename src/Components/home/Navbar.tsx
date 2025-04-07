"use client";
import { Moon, Sun } from 'lucide-react';
import React, { useState, useEffect } from "react";


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else { 
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div   
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-xs px-10  transition-all duration-200 ease-in-out flex  items-center   text-[#5e5e5e] dark:text-[#c2c2c2] font-serif   z-50 ${
        isScrolled ? "h-12 py-2 w-2/3 scale-x-90 rounded-2xl  bg-transparent shadow-sm shadow-[#621f6975]  dark:bg-transparent " : "h-16 py-4 w-full rounded-none border-none "
      }`}
    >
      {/* Logo - Moves to center smoothly */}
      <h1
        className={`font-extrabold text-xl transition-all duration-200 ease-in-out ml-32 ${
          isScrolled ? "mx-auto" : "ml-4"
        }`}
      >
        CLUSTER
      </h1>

      {/* Navigation Links - Stays centered */}
      <div className="flex items-center space-x-16 mx-auto">
        <h1 className="">Home</h1>
        <h1 className="">Projects</h1>
        <h1 className="">Developers</h1>
      </div>

      <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 rounded"
    > {theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}
    </button>


      {/* Profile Image - Moves to center smoothly */}
      <div className="flex items-center space-x-4">
              <button className="px-4 py-2   bg-[#611f69] border border-[#611f69] text-white text-[14px]  rounded-md hover:bg-[#621f69dd]" >Sign Up</button>
              <button className="px-4 py-2  border border-[#611f69] text-[14px]  text-[#611f69] bg-transparent  rounded-md hover:bg-gray-200" >Log In</button>
            </div>
      {/* <img
        className={`rounded-full w-10 h-10 object-cover transition-all duration-200 ease-in-out mr-32 ${
          isScrolled ? "mx-auto" : "mr-4"
        }`}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIS4VuIKs3YjObiyW8M0NzDAkx8BEhLzLhEA&s"
        alt="Profile"
      /> */}
    </div>
  );
};

export default Navbar;
