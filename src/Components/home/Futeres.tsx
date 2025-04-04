import React from "react";
import { IconCloudDemo } from "./Icon-cloud";

export const Feturescard = () => {
  return (
    <div className=" flex justify-center">
      <div className="flex flex-wrap w-[80em]">
        <div className="h- w-1/2 border border-gray-800">
          <img
            className=" mb-4 p-5 ml-9"
            src="/Screenshot 2025-03-29 204602.png"
            alt=""
          />
          <h1 className="text-amber-50 p-4 mt-[20em">
            Real-time AI Collaboration Experience real-time assistance. Ask your
            AI Agent to coordinate tasks, answer questions, and maintain team
            alignment.
          </h1>
        </div>
        <div className="h-[34em] w-1/2 border border-gray-800">
        <IconCloudDemo/>
          <h1 className="text-amber-50 p-4 mt-[2em] ">
            Real-time AI Collaboration Experience real-time assistance. Ask your
            AI Agent to coordinate tasks, answer questions, and maintain team
            alignment.
          </h1>
        </div>
        <div className="h-[34em] w-1/2 border border-gray-800">
          <h1 className="text-amber-50 p-4 mt-[28em] ">
            Real-time AI Collaboration Experience real-time assistance. Ask your
            AI Agent to coordinate tasks, answer questions, and maintain team
            alignment.
          </h1>
        </div>
        <div className="h-[34em] w-1/2 border border-gray-800">
          <h1 className="text-amber-50 p-4 mt-[28em] ">
            Real-time AI Collaboration Experience real-time assistance. Ask your
            AI Agent to coordinate tasks, answer questions, and maintain team
            alignment.
          </h1>
        </div>
      </div>
    </div>
  );
};
