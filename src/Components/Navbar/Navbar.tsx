import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-blue-950 w-full h-14 px-4">
      <h1 className="text-fuchsia-400 font-extrabold">CLUSTER</h1>
      <div className="flex justify-between space-x-6">
        <h1 className="text-fuchsia-400 font-serif">projects</h1>
        <h1 className="text-fuchsia-400 font-serif">Developers</h1>
        <img
          className="rounded-full w-10 h-10 object-fill"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIS4VuIKs3YjObiyW8M0NzDAkx8BEhLzLhEA&s"
          alt=""
        />
      </div>
      
    </div>
  );
};

export default Navbar;
