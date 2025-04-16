"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/home/Navbar";
import Footer from "@/Components/home/Footer";
import { useEffect, useState } from "react";

  const LayoutWrapper =({ children }: { children: React.ReactNode }) =>{
  const pathname = usePathname();

  const hideLayout = ["/login", "/signup","/kanbanboard",];
  const shouldHide = hideLayout.includes(pathname);


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
    <>
    
        {!shouldHide && <Navbar />}
        {children}
        {!shouldHide && <Footer />}
      
    </>
  );
}
export default  LayoutWrapper