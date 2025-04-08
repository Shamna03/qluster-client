"use client";
import { ChevronDown, Moon, Sun } from 'lucide-react';
import React, { useState, useEffect } from "react";
import Link from "next/link"
import useAuthStore from '@/store/useAuthStore';
import DropDown from '../ui/dropDown';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/api/axiosInstance';



const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {user,setUser} = useAuthStore()
  console.log(user);
  
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  


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

  const {data:logedUser,isLoading} = useQuery({
    queryKey:["fetchUser",user?._id],
    queryFn:async ()=>{
      const {data} = await axiosInstance.get ("/user/userin")      
      setUser(data.data)
      return data
    },
    enabled: !!isAuthenticated
  })
  return (
    <div   
      className={`fixed h-14 top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-xs pl-10  transition-all duration-200 ease-in-out flex  items-center    text-[#5e5e5e] dark:text-[#c2c2c2]    z-50 ${
        isScrolled ? " py-2   w-3/4 scale-x-90 rounded-2xl  bg-background/40 shadow-sm shadow-[#621f6975]    dark:shadow-none dark:border dark:bg-background/40" : "h-16 py-4 w-3/4 rounded-none border-none "
      }`}
    >
      <Link href="/" className="flex items-center">
        <h1 className={`font-extrabold text-xl transition-all duration-300 ease-in-out ${isScrolled ? "mx-auto" : "ml-4"}`} >
          QLUSTER</h1>
      </Link>

      {/* Navigation Links - Stays centered */}
      <div className="flex items-center space-x-16 mx-auto">
        <div className="flex items-center cursor-pointer group">
          <h1 className="group-hover:text-primary transition-colors">Use cases</h1>
          <ChevronDown className="ml-1 w-4 h-4 group-hover:text-primary transition-colors" />
        </div>
        <h1 className="cursor-pointer hover:text-primary transition-colors">Projects</h1>
        <h1 className="cursor-pointer hover:text-primary transition-colors">Developers</h1>
        <h1 className="cursor-pointer hover:text-primary transition-colors">Contact Us</h1>
      </div>

      <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="px-4 py-2 rounded cursor-pointer"
    > {theme === 'dark' ? <Sun size={20}/> : <Moon size={20}/>}
    </button>


      {/* Profile Image - Moves to center smoothly */}
      {!isAuthenticated ? 
        <div className="flex items-center space-x-4 mr-2">
            <Link href='/signup'>
            <button className="px-4 py-2   bg-[#611f69] border border-[#611f69] text-white text-[14px]  rounded-md hover:bg-[#621f69dd] cursor-pointer" >Sign Up</button>
            </Link>  
            <Link href='/login'>
              <button className="px-4 py-2  border border-[#611f69] text-[14px]  text-[#611f69] bg-white/50  rounded-md hover:bg-gray-200 cursor-pointer" >Log In</button>
            </Link>

            </div>:
       <DropDown/>}
    </div>
  );
};

export default Navbar;
