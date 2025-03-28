"use client";
import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 bg-black px-10 transition-all duration-700 ease-in-out flex items-center ${
        isScrolled ? "h-12 py-2 w-2/3 scale-x-90 rounded-2xl border-1 border-gray-700" : "h-16 py-4 w-full rounded-none "
      }`}
    >
      {/* Logo - Moves to center smoothly */}
      <h1
        className={`text-fuchsia-400 font-extrabold text-xl transition-all duration-700 ease-in-out ${
          isScrolled ? "mx-auto" : "ml-4"
        }`}
      >
        CLUSTER
      </h1>

      {/* Navigation Links - Stays centered */}
      <div className="flex items-center space-x-16 mx-auto">
        <h1 className="text-fuchsia-400 font-serif text-lg">Projects</h1>
        <h1 className="text-fuchsia-400 font-serif text-lg">Developers</h1>
        <h1 className="text-fuchsia-400 font-serif text-lg">Home</h1>
      </div>

      {/* Profile Image - Moves to center smoothly */}
      <img
        className={`rounded-full w-10 h-10 object-cover transition-all duration-700 ease-in-out ${
          isScrolled ? "mx-auto" : "mr-4"
        }`}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIS4VuIKs3YjObiyW8M0NzDAkx8BEhLzLhEA&s"
        alt="Profile"
      />
    </div>
  );
};

export default Navbar;
