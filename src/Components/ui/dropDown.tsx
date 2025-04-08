import axiosInstance from "@/api/axiosInstance";
import useAuthStore from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

const DropDown = () => {
  const queryClient =useQueryClient()
  const {setUser, user} = useAuthStore()
  const router = useRouter()


  const {mutate} = useMutation({
    mutationFn : async()=>{
      const {data} =  await axiosInstance.post("/user/logout")
      return data
    },
    onSuccess:(data)=>{
      console.log("logged Out");
      localStorage.setItem("isAuthenticated","false")
      setUser(null)
      localStorage.clear()
      router.push("/")

    }
  })
  const handleLogout = ()=>{
    mutate()
    queryClient.clear()



  }
  return (
    <div className="relative inline-block text-base leading-relaxed text-black font-sans mr-1 ">
      <div className="relative group inline-block">
        <a
          href="#"
          className="relative flex items-center justify-center gap-3 px-2 py-1 rounded-2xl overflow-hidden transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:text-white"
        >
             <img
                  className={`rounded-full w-10 h-10 object-cover transition-all duration-200 ease-in-out mr-24
                    
                    // isScrolled ? "mx-auto" : "mr-4"`}
                    src={user?.profilePicture ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIS4VuIKs3YjObiyW8M0NzDAkx8BEhLzLhEA&s"}
                  // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIS4VuIKs3YjObiyW8M0NzDAkx8BEhLzLhEA&s"
                  alt="Profile"
                /> 
          <svg
            viewBox="0 0 360 360"
            xmlSpace="preserve"
            className="w-[14px] h-[14px] fill-black transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:fill-white group-hover:rotate-180"
          >

          </svg>
          <span className="absolute inset-0 bg-[#611f69] scale-x-0 group-hover:scale-x-100 transition-transform duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] origin-left z-[-1] rounded-2xl"></span>
        </a>

        {/* Submenu */}
          <div
          className="absolute left-0 top-full w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-[-12px] group-hover:translate-y-0 transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] border border-[#611f69] border-t-transparent rounded-b-2xl overflow-hidden z-10 pointer-events-none group-hover:pointer-events-auto bg-white"
        >
          {["Logout", "Settings"].map((item) => (
            <div key={item} className="w-full transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#621f6933]  cursor-pointer" onClick={()=>{
              if(item === "Logout"){
                handleLogout()
              }
            }}>
              <a
                
                className="relative block text-center px-6 py-3 transition-all duration-[480ms] ease-[cubic-bezier(0.23,1,0.32,1)] bg-transparent"
              >
                <span className="absolute inset-0scale-x-0 hover:scale-x-100 transition-transform duration-[480ms]  ease-[cubic-bezier(0.23,1,0.32,1)] origin-left z-[-1]"></span>
                {item}
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DropDown;
