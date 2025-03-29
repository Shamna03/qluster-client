import React from "react";
import { IconCloudDemo } from "./Icon-cloud";

export const Feturescard = () => {
  return (
    <div className="w-[80em] ml-[42px]">
      <div className="flex flex-wrap">
        <div className="h-[34em] w-1/2 border border-gray-600">
          <img
            className="w-96-96 mb-4 p-5 ml-9"
            src="/Screenshot 2025-03-29 204602.png"
            alt=""
          />
          <h1 className="text-amber-50 p-4 mt-[20em">
            Real-time AI Collaboration Experience real-time assistance. Ask your
            AI Agent to coordinate tasks, answer questions, and maintain team
            alignment.
          </h1>
        </div>
        <div className="h-[34em] w-1/2 border border-gray-600">
        <IconCloudDemo/>
          <h1 className="text-amber-50 p-4 mt-[2em] ">
            Real-time AI Collaboration Experience real-time assistance. Ask your
            AI Agent to coordinate tasks, answer questions, and maintain team
            alignment.
          </h1>
        </div>
        <div className="h-[34em] w-1/2 border border-gray-600">
          <h1 className="text-amber-50 p-4 mt-[28em] ">
            Real-time AI Collaboration Experience real-time assistance. Ask your
            AI Agent to coordinate tasks, answer questions, and maintain team
            alignment.
          </h1>
        </div>
        <div className="h-[34em] w-1/2 border border-gray-600">
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
