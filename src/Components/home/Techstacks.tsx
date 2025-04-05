import React from "react";

export const Techstacks = () => {
  return (
 
            <div className="flex justify-center mb-[300px]">
            <table className="w-[70em] h-[12rem] text-black border dark:text-white  ">
                <tbody>
                    <tr className="border   text-center font-bold ">
                        <td className="p-4  border ">React</td>
                        <td className="p-4  border ">Next.js</td>
                        <td className="p-4  border ">MongoDB</td>
                        <td className="p-4 border ">Express</td>
                    </tr>
                    <tr className="border text-center  font-bold">
                        <td className="p-4  border ">TypeScript</td>
                        <td className="p-4  border ">JavaScript</td>
                        <td className="p-4   border ">Tailwind</td>
                        <td className="p-4   border">Redux</td>
                    </tr>
                </tbody>
            </table>
        </div>
  );
};
