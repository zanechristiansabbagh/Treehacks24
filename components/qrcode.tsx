"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function QRCode() {
  const { user } = useUser();
  let email = ""
  let parsedEmail = ""
  if (user) {
    email = user.email
    console.log("EMAIL: ", email)
    parsedEmail = email.replace(/\./g, "@URAD0G@")
    console.log("PARSEDEMAIL: ", parsedEmail)
  } else {
    console.log("no user")
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
        Welcome to <span className="text-orange-500">Ta.ai</span>
      </h1>
      <h2 className="text-xl text-gray-500">
        Scan QR code to join your class!
      </h2>
      {/* <p className="text-lg text-white mt-4">Professor ID: {tasksId}</p> */}

      <div className="mt-8 bg-white p-4 border-8 border-orange-500" style={{ width: "30vw", height: "30vw" }}>
        <a href={`/joinClass/${parsedEmail}`}>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://taai-treehacks.vercel.app/joinClass/${parsedEmail}`}
            alt="QR Code"
            style={{ width: "100%", height: "100%" }}
          />
        </a>
      </div>
    </div>
  );
}
