import projectaxiosinstance from "@/api/projectaxiosinstance";
import { create } from "zustand";
import { Project } from "@/types/project";



interface ProjectStore {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
}
const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  loading: false,
  error: null,
  fetchProjects: async () => {
 
    set({ loading: true, error: null });
    try {
      const response = await projectaxiosinstance.get("project/getAllProjects");
      
      set({ 
        projects: response.data,
        loading: false 
      });
   
    } catch (error: any) {
      console.error("Error fetching projects:", error);
      set({ 
        error: error.response?.data?.message || error.message, 
        loading: false 
      });
    }
  }
}));

export default useProjectStore;