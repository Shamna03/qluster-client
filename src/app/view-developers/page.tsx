// // pages/AllDevelopers.tsx

// "use client"
// import React, { useEffect, useState } from 'react';
// import DeveloperCard from '@/Components/ListUsers/developerCard';
// import axiosInstance from '@/api/axiosInstance';




// type Developer = {
//   name: string;
//   email: string;
//   // skills?: string;
//   profilePicture:string
//   profession?: string;
//   isVerified: boolean;
//   // endorsements: number;
//   location?: string;
// };


// const AllDevelopers = () => {
//   const [developers, setDevelopers] = useState<Developer[]>([]);


//   useEffect(() => {
//     const fetchDevelopers = async () => {
//       try {
//         const res = await axiosInstance.get('/user/getDevelopers'); 
//         console.log("resdata",res)
//         setDevelopers(res.data.data);
//       } catch (error) {
//         console.error('Error fetching developers:', error);
//       }
//     };

//     fetchDevelopers();
//   }, []);

//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {developers.map((dev, index) => (
//         <DeveloperCard
//           key={index}
//           name={dev.name}
//           email={dev.email}
//           // skills={dev.skills}
//           profilePicture={dev.profilePicture}
//           profession={dev.profession}
//           isVerified={dev.isVerified}
//           // endorsements={dev.endorsements}
//           location={dev.location}
//         />
//       ))}
//     </div>
//   );
// };

// export default AllDevelopers;


"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import DeveloperCard from "@/Components/ListUsers/developerCard";
import { LoaderCircle } from "lucide-react";

type Developer = {
  _id:string
  name: string;
  email: string;
  profilePicture: string;
  profession?: string;
  isVerified: boolean;
  location?: string;
};

const AllDevelopers = () => {
  const { data: developers, isLoading, isError, error, refetch, } = useQuery<Developer[]>({
    queryKey: ["developers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/user/getDevelopers");
      return res.data.data;
    },
  });

  if (isLoading)
    return ( <div className="flex justify-center items-center h-screen w-full"> <LoaderCircle className="text-purple-900 animate-spin" /> </div>
    );

  if (isError)
    return console.log(isError);
    

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {developers?.map((dev, index) => (
        <DeveloperCard
          key={index}
          _id={dev._id}
          name={dev.name}
          email={dev.email}
          profilePicture={dev.profilePicture}
          profession={dev.profession}
          isVerified={dev.isVerified}
          location={dev.location}
        />
      ))}
    </div>
  );
};

export default AllDevelopers;
