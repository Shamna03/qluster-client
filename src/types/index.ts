export interface Endorsement {
    skill: string;
    endorsedBy: string; // ID of the user who endorsed
  }
  
  export interface User {
    _id?: string;
    name: string;
    email: string;
    password?: string; 
    profilePicture?: string;
    coverImage?: string;
    bio?: string;
    skills: string[];
    role: "admin" | "user";
    portfolio?: string;
    github?: string;
    linkedin?: string;
    projectsOwned: string[]; // Array of Project IDs
    projectsContributed: string[]; // Array of Project IDs
    endorsements: Endorsement[];
    profession:string;
    isVerified: boolean;
    createdAt?: string;
    updatedAt?: string;
    location:string
  }
  