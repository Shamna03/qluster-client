import { User } from "@/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated:string | null
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated:localStorage.getItem("isAuthenticated") || "",

}));

export default useAuthStore;
