"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/home/Navbar";
import Footer from "@/Components/home/Footer";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import useAuthStore from "@/store/useAuthStore";

  const LayoutWrapper =({ children }: { children: React.ReactNode }) =>{
  const pathname = usePathname();
  const {user,setUser} = useAuthStore()
  // const isAuthenticated = localStorage.getItem("isAuthenticated")
  const isAuthenticated = typeof window !== "undefined" ? localStorage.getItem("isAuthenticated") : null;



  const hideLayout = ["/login", "/signup","/kanbanboard","/projectdash-board"];
  const shouldHide = hideLayout.some(path => pathname.startsWith(path));
  // const shouldHide = hideLayout.includes(pathname);


  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else { 
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

 //user for kanbanboard 
 const {data:logedUser,isLoading} = useQuery({
  queryKey:["fetchUser",user?._id],
  queryFn:async ()=>{
    const {data} = await axiosInstance.get("/user/userin")      
    setUser(data.data)
    return data
  },
  enabled: !!isAuthenticated
})


  return (
    <>
    
        {!shouldHide && <Navbar />}
        {children}
        {!shouldHide && <Footer />}
      
    </>
  );
}
export default  LayoutWrapper