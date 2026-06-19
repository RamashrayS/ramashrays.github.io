"use client";

import React, { useEffect, useState } from "react";
import HeroCharacter from "@/components/HeroCharacter";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [typedHeadline, setTypedHeadline] = useState("");
  const [typedParagraph, setTypedParagraph] = useState("");
  const [currentStage, setCurrentStage] = useState<"typing-headline" | "typing-paragraph" | "done">("typing-headline");

  const headlineText = "Hey, Ramashray here.";
  const paragraphText =
    "I'm a science student, builder, and curious problem solver. I enjoy exploring new ideas and questions we don't yet have answers to. Most of my time is spent learning, experimenting, and doing whatever I find exciting.\n\nThanks for stopping by!";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (currentStage === "typing-headline") {
      let i = 0;
      const interval = setInterval(() => {
        setTypedHeadline(headlineText.slice(0, i + 1));
        i++;
        if (i >= headlineText.length) {
          clearInterval(interval);
          setCurrentStage("typing-paragraph");
        }
      }, 50); // Typing speed for headline
      return () => clearInterval(interval);
    }

    if (currentStage === "typing-paragraph") {
      let i = 0;
      const interval = setInterval(() => {
        setTypedParagraph(paragraphText.slice(0, i + 1));
        i++;
        if (i >= paragraphText.length) {
          clearInterval(interval);
          setCurrentStage("done");
        }
      }, 15); // Typing speed for paragraph
      return () => clearInterval(interval);
    }
  }, [mounted, currentStage]);

  return (
    <div id="home" className="relative min-h-screen bg-[#1A1A1A] text-white flex flex-col font-sans selection:bg-white selection:text-black overflow-x-hidden">



      {/* Hero Section Container */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-16 py-28 lg:py-0 min-h-screen">
        <div
          className={`w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-all duration-1000 ease-out transform ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          {/* Left Side: Editorial Portfolio Text */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight min-h-[1.2em]">
              {typedHeadline}
              {currentStage === "typing-headline" && (
                <span className="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white ml-2 align-middle animate-cursor-blink" />
              )}
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#D9D9D9] leading-relaxed max-w-xl font-normal min-h-[8.5em] sm:min-h-[7em] lg:min-h-[6em]">
              {typedParagraph}
              {(currentStage === "typing-paragraph" || currentStage === "done") && (
                <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white ml-1.5 align-middle animate-cursor-blink" />
              )}
            </p>
          </div>
          {/* Right Side: Reusable Mascot Character */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <HeroCharacter />
          </div>
        </div>
      </main>
    </div>
  );
}
