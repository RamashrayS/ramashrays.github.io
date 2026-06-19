"use client";

import React, { useEffect, useRef, useState } from "react";

// Asset paths - easily adjustable here
const ASSETS = {
  introVideo: "/assets/start.webm",
  sparkleVideo: "/assets/sparkle.webm",
  winkVideo: "/assets/wink.webm",
  idleImage: "/assets/static.webp",
};

export default function HeroCharacter() {
  const [activeVideo, setActiveVideo] = useState<"intro" | "sparkle" | "wink">("intro");
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Synchronize video elements when source state changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlayingVideo) {
        videoRef.current.play().catch((err) => {
          console.warn("Playback blocked or failed:", err);
        });
      }
    }
  }, [activeVideo, isPlayingVideo]);

  const handleVideoEnded = () => {
    setIsPlayingVideo(false);
  };

  const handleCharacterClick = () => {
    // If a video is already playing, prevent click resetting
    if (isPlayingVideo) return;

    // 75% sparkle, 25% wink
    const rand = Math.random();
    if (rand < 0.75) {
      setActiveVideo("sparkle");
    } else {
      setActiveVideo("wink");
    }
    setIsPlayingVideo(true);
  };

  return (
    <div
      onClick={handleCharacterClick}
      className={`relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[450px] aspect-square mx-auto select-none transition-transform duration-500 ${isPlayingVideo ? "cursor-default" : "cursor-pointer"
        }`}
    >
      {/* Dynamic Video Layer - renders with native alpha transparency */}
      <video
        ref={videoRef}
        src={
          activeVideo === "intro"
            ? ASSETS.introVideo
            : activeVideo === "sparkle"
              ? ASSETS.sparkleVideo
              : ASSETS.winkVideo
        }
        muted
        playsInline
        onEnded={handleVideoEnded}
        className={`absolute inset-0 w-full h-full object-contain ${isPlayingVideo ? "opacity-100 z-20 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
          }`}
      />

      {/* Idle Mascot Layer (Only visible when no video is playing to prevent overlay ghosting) */}
      <div
        className={`absolute inset-0 w-full h-full ${!isPlayingVideo ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
          }`}
      >
        {/* Base Character Body */}
        <img
          src={ASSETS.idleImage}
          alt="Mascot base"
          className="absolute inset-0 w-full h-full object-contain"
          draggable="false"
        />
      </div>
    </div>
  );
}
