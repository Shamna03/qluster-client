// pages/AllDevelopers.tsx

"use client"
import React, { useEffect, useState } from 'react';
import DeveloperCard from '@/Components/ListUsers/developerCard';
import axios from 'axios';




type Developer = {
  name: string;
  email: string;
  // skills?: string;
  profilePicture:string
  profession?: string;
  isVerified: boolean;
  // endorsements: number;
  location?: string;
};


const AllDevelopers = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);


  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/user/getDevelopers'); // change to your actual API
        console.log("resdata",res)
        setDevelopers(res.data.data);
      } catch (error) {
        console.error('Error fetching developers:', error);
      }
    };

    fetchDevelopers();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {developers.map((dev, index) => (
        <DeveloperCard
          key={index}
          name={dev.name}
          email={dev.email}
          // skills={dev.skills}
          profilePicture={dev.profilePicture}
          profession={dev.profession}
          isVerified={dev.isVerified}
          // endorsements={dev.endorsements}
          location={dev.location}
        />
      ))}
    </div>
  );
};

export default AllDevelopers;
