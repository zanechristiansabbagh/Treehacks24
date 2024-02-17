"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Component() {
  const [tasksId, setTasksId] = useState("");
  
  const getQuery = useQuery(api.tasks.get);

  



  const navigateToStudentForm = () => {
    const firstItem = getQuery[0].id
    console.log(firstItem);
  }
  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full min-h-screen bg-black">
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-[-1]">
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "20%",
            top: "10%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "70%",
            top: "30%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "40%",
            top: "50%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "90%",
            top: "70%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "10%",
            top: "20%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "50%",
            top: "80%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "80%",
            top: "40%",
          }}
        />
        <div
          className="absolute w-12 h-12 bg-opacity-20 bg-gray-500 rounded-full"
          style={{
            left: "30%",
            top: "60%",
          }}
        />
      </div>
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl text-white">
        Welcome to TAAI
      </h1>
      <h2 className="text-lg text-gray-500">
        Have your students scan your qr code to join your class
      </h2>
      <p className="text-lg text-white mt-4">Professor ID: {tasksId}</p>

      <button onClick={navigateToStudentForm} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
        Go to Student Form
      </button>

      <div className="mt-8">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${tasksId}-${Math.random()
            .toString(36)
            .substr(2, 9)}`}
          alt="QR Code"
        />
      </div>
    </div>
  );
}
