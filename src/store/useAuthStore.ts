import { User } from "@/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

}));

export default useAuthStore;
