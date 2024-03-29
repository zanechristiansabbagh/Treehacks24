// /**
//  * This code was generated by v0 by Vercel.
//  * @see https://v0.dev/t/DdTq4OHPevP
//  */
import { LoginButton } from "@/components/ui/loginButton";
import Link from "next/link";
import Wave from "./ui/wave";
import React, { useEffect, useState } from "react";

export function HomeUnauth() {
  const [title, setTitle] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showGetStarted, setShowGetStarted] = useState(false); // State to control the visibility of the Get Started button
  const [showRectangles, setShowRectangles] = useState(false); // Initialize showRectangles state


  useEffect(() => {
    const fullTitle = "Welcome to Ta.ai";
    let currentTitle = "";

    const typingTimer = setInterval(() => {
      if (currentTitle.length < fullTitle.length) {
        currentTitle = fullTitle.substring(0, currentTitle.length + 1);
        setTitle(currentTitle);
      } else {
        clearInterval(typingTimer);
        setShowCursor(false); // Immediately hide the cursor once typing is finished
        // Wait a bit before showing the rest of the content
        setTimeout(() => {
          setShowContent(true);
          setTimeout(() => setShowGetStarted(true), 500); // Delay the appearance of the Get Started button after the content fades in
        }, 500);
      }
    }, 100); // Adjust typing speed as needed

    return () => {
      clearInterval(typingTimer);
    };
  }, []);

  useEffect(() => {
    if (showGetStarted) {
      setTimeout(() => {
        setShowRectangles(true); // New state to control the visibility of the rectangles
      }, 1000); // One second delay after the Get Started button animation
    }
  }, [showGetStarted]);

  return (
    <>
      <section className="flex items-center justify-center w-full h-screen relative overflow-hidden">
        <div className="absolute top-[-160px] left-0 w-full">
          {/* Background animations with fade-in effect */}
          <div className={`${showRectangles ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 ease-in-out`}>
            <>
              <div className="absolute top-80 left-80 w-28 h-16 bg-green-500 rounded-lg animate-fallSlow1 opacity-50"></div>
              <div className="absolute top-40 left-40 w-40 h-16 bg-orange-500 rounded-lg animate-fallSlow5 opacity-50"></div>
              <div className="absolute top-120 left-60 w-50 h-16 bg-green-500 rounded-lg animate-fallSlow3 opacity-50"></div>
              <div className="absolute top-60 left-20 w-60 h-16 bg-green-500 rounded-lg animate-fallSlow4 opacity-50"></div>
              <div className="absolute top-140 left-60 w-40 h-12 bg-orange-500 rounded-lg animate-fallSlow5 opacity-50"></div>
              <div className="absolute top-10 right-20 w-36 h-20 bg-orange-500 rounded-lg animate-fallSlow6 opacity-50"></div>
              <div className="absolute top-80 right-40 w-24 h-12 bg-orange-500 rounded-lg animate-fallSlow7 opacity-50"></div>
              <div className="absolute top-100 right-80 w-15 h-12 bg-green-500 rounded-lg animate-fallSlow8 opacity-50"></div>
              <div className="absolute top-20 right-60 w-30 h-12 bg-orange-500 rounded-lg animate-fallSlow9 opacity-50"></div>
              <div className="absolute top-0 left-50 w-25 h-16 bg-green-500 rounded-lg animate-fallSlow9 opacity-50"></div>
              <div className="absolute top-40 left-40 w-32 h-16 bg-orange-500 rounded-lg animate-fallSlow8 opacity-50"></div>
              <div className="absolute top-50 left-60 w-32 h-16 bg-green-500 rounded-lg animate-fallSlow7 opacity-50"></div>
              <div className="absolute top-50 left-20 w-30 h-16 bg-orange-500 rounded-lg animate-fallSlow6 opacity-50"></div>
              <div className="absolute top-30 left-80 w-40 h-16 bg-orange-500 rounded-lg animate-fallSlow2 opacity-50"></div>
              <div className="absolute top-70 right-20 w-40 h-12 bg-green-500 rounded-lg animate-fallSlow4 opacity-50"></div>
              <div className="absolute top-50 right-20 w-29 h-12 bg-orange-500 rounded-lg animate-fallSlow6 opacity-50"></div>
              <div className="absolute top-90 right-40 w-30 h-12 bg-green-500 rounded-lg animate-fallSlow8 opacity-50"></div>
              <div className="absolute top-50 right-60 w-36 h-12 bg-orange-500 rounded-lg animate-fallSlow9 opacity-50"></div>
              <div className="absolute top-40 right-40 w-32 h-16 bg-green-500 rounded-lg animate-fallSlow2 opacity-50"></div>
              <div className="absolute top-60 left-[50%] translate-x-[-50%] translate-y-[-50%] w-32 h-18 bg-green-500 rounded-lg animate-fallSlow2 opacity-50"></div>
              <div className="absolute top-70 left-[30%] translate-x-[-50%] translate-y-[-50%] w-20 h-16 bg-green-500 rounded-lg animate-fallSlow4 opacity-50"></div>
              <div className="absolute top-80 left-[70%] translate-x-[-50%] translate-y-[-50%] w-16 h-14 bg-green-500 rounded-lg animate-fallSlow9 opacity-50"></div>
              <div className="absolute top-90 left-[60%] translate-x-[-50%] translate-y-[-50%] w-24 h-16 bg-orange-500 rounded-lg animate-fallSlow5 opacity-50"></div>
            </>
          </div>
          <style jsx>{`

            @keyframes fallSlow1 {
              0% { transform: translateY(-0); }
              100% { transform: translateY(130vh); }
            }
            .animate-fallSlow1 {
              animation: fallSlow1 20s infinite linear;
            }
            @keyframes fallSlow2 {
              0% { transform: translateY(0); }
              100% { transform: translateY(130vh); }
            }
            .animate-fallSlow2 {
              animation: fallSlow2 22s infinite linear;
            }
            @keyframes fallSlow3 {
              0% { transform: translateY(0); }
              100% { transform: translateY(130vh); }
            }
            .animate-fallSlow3 {
              animation: fallSlow3 24s infinite linear;
            }
            @keyframes fallSlow4 {
              0% { transform: translateY(0); }
              100% { transform: translateY(130vh); }
            }
            .animate-fallSlow4 {
              animation: fallSlow4 26s infinite linear;
            }
            @keyframes fallSlow5 {
              0% { transform: translateY(0); }
              100% { transform: translateY(130vh); }
            }
            .animate-fallSlow5 {
              animation: fallSlow5 28s infinite linear;
            }
            @keyframes fallSlow6 {
              0% { transform: translateY(0); }
              100% { transform: translateY(130vh); }
            }
            .animate-fallSlow6 {
              animation: fallSlow6 30s infinite linear;
            }
            @keyframes fallSlow7 {
              0% { transform: translateY(0); }
              100% { transform: translateY(130vh); }
            }
            .animate-fallSlow7 {
              animation: fallSlow7 32s infinite linear;
            }
            @keyframes fallSlow8 {
              0% { transform: translateY(0); }
              100% { transform: translateY(110vh); }
            }
            .animate-fallSlow8 {
              animation: fallSlow8 34s infinite linear;
            }
            @keyframes fallSlow9 {
              0% { transform: translateY(0); }
              100% { transform: translateY(110vh); }
            }
            .animate-fallSlow9 {
              animation: fallSlow9 36s infinite linear;
            }
          `}</style>
        </div>
        <div className="text-center z-10 relative">
          {/* This container is for your content */}
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">
            {title}
            <span
              className={`${showCursor ? "inline" : "hidden"} cursor`}
              style={{ width: "1px" }}
            >
              |
            </span>
          </h1>
          <div className={`${showContent ? "fadeIn" : "opacity-0"}`}>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              No more knowledge gaps for your students
            </p>
            {showGetStarted && (
              <div
                className="flex flex-col items-center gap-4 mt-8 fadeIn"
              >
                <Link
                  className="inline-flex h-12 items-center justify-center rounded-md bg-orange-500 px-10 text-lg font-semibold text-white shadow transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-200 disabled:pointer-events-none disabled:opacity-50 dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus-visible:ring-orange-300"
                  href="/api/auth/login"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/api/auth/login";
                  }}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
