"use client"
import useAuthStore from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    google?: any;
  }
}

            
export default function GoogleSignIn() {
    const router = useRouter()
    const {setUser, user} = useAuthStore()

  useEffect(() => {
    console.log(window.google)
    if (window.google) {
        console.log("true");
        
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
          document.getElementById("google-btn")!,
          { theme: "outline", size: "large" }
        );
    }
  }, []);
  const {mutate} = useMutation({
    mutationFn : async (response:any) =>{
        const {data} = await axios.post("http://localhost:5001/api/user/google-login",{ token: response.credential},
            {withCredentials: true}
        )
        console.log("User authenticated:", data);
        return data
    },
    onSuccess :(data)=>{
        router.replace("/")
            setUser(data?.user)
            localStorage.setItem("isAuthenticated","true")
    }
        
        })

  const handleCredentialResponse = async (response: any) => {
    mutate(response)
  };

  return <div id="google-btn" className="mt-4  "></div>;
}
