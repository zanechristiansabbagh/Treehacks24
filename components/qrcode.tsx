"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function QRCode() {
  const { user, error, isLoading } = useUser();

  const tasksQueryResult = useQuery(api.tasks.get);
  const tasksId = tasksQueryResult ? tasksQueryResult[0]?.id : "";

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
        Welcome to Ta.ai
      </h1>
      <h2 className="text-xl text-gray-500">
        Scan qr code to join your class!
      </h2>
      {/* <p className="text-lg text-white mt-4">Professor ID: {tasksId}</p> */}

      <div className="mt-8" style={{ width: "30vw", height: "30vw" }}>
        <a href={`https://yourwebsite.com/page?tasksId=${tasksId}`}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://taai-treehacks.vercel.app/joinClass/${user.name}`}
            alt="QR Code"
            style={{ width: "100%", height: "100%" }}
          />
        </a>
      </div>
    </div>
  );
}
