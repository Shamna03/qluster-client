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
  const router = useRouter();
  const { setUser } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: async (response: any) => {
      const { data } = await axios.post(
        "http://localhost:5001/api/user/google-login",
        { token: response.credential },
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: (data) => {
      router.replace("/");
      setUser(data?.user);
      localStorage.setItem("isAuthenticated", "true");
    },
  });

  const handleCredentialResponse = (response: any) => {
    mutate(response);
  };

  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            callback: handleCredentialResponse,
            ux_mode: "popup", // Add this line

          });

          window.google.accounts.id.renderButton(
            document.getElementById("google-btn")!,
            { theme: "outline", size: "large" }
          );
        }
      };
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleScript();
    } else {
      // Already loaded
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleCredentialResponse,
        ux_mode: "popup", // Add this line

      });
      
      window.google.accounts.id.renderButton(
        document.getElementById("google-btn")!,
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return <div id="google-btn" className="mt-4" />;
}
