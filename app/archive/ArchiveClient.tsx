"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PostMetadata } from "@/lib/markdown";

interface ArchiveClientProps {
  posts: PostMetadata[];
}

export default function ArchiveClient({ posts }: ArchiveClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] text-white flex flex-col font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <main
        className={`flex-1 w-full max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 pt-36 pb-36 transition-all duration-1000 ease-out transform ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((metadata) => {
            const previewText = metadata.excerpt.endsWith("...")
              ? metadata.excerpt
              : `${metadata.excerpt}...`;

            return (
              <Link
                key={metadata.slug}
                href={`/archive/${metadata.slug}`}
                className="group bg-[#121212] border border-white/5 hover:border-white/15 rounded-2xl p-6 flex flex-col justify-between hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] hover:-translate-y-1 transition-all duration-500 cursor-pointer h-full"
              >
                <div className="space-y-4">
                  {/* Date */}
                  <div className="text-[10px] font-mono text-neutral-500">
                    {metadata.date}
                  </div>

                  {/* Title & Preview */}
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-neutral-200 transition-colors">
                      {metadata.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light line-clamp-4">
                      {previewText}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Floating Thinking Mascot at Bottom Right */}
      <div
        className={`fixed bottom-4 right-4 z-10 w-[110px] sm:w-[140px] md:w-[170px] lg:w-[210px] select-none transition-all duration-1000 delay-300 transform ${
          mounted ? "opacity-35 sm:opacity-50 md:opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } hover:scale-105 transition-transform duration-300`}
      >
        <img
          src="/assets/thinking.webp"
          alt="Thinking mascot"
          className="w-full h-auto object-contain"
          draggable="false"
        />
      </div>
    </div>
  );
}
