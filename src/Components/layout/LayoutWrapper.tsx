"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/home/Navbar";
import Footer from "@/Components/home/Footer";

  const LayoutWrapper =({ children }: { children: React.ReactNode }) =>{
  const pathname = usePathname();

  const hideLayout = ["/login", "/signup","/kanbanboard"];

  const shouldHide = hideLayout.includes(pathname);

  return (
    <>
      {!shouldHide && <Navbar />}
      {children}
      {!shouldHide && <Footer />}
    </>
  );
}
export default  LayoutWrapper