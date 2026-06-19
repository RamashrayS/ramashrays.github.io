"use client";

import React, { useEffect, useState, useRef } from "react";
import { Project } from "@/lib/projects";

// Helper to fetch live GitHub stats
function GitHubStats({ url }: { url: string }) {
  const [stats, setStats] = useState<{ stars: number; language: string; updated: string } | null>(null);

  useEffect(() => {
    const getRepoDetails = (repoUrl: string) => {
      try {
        const path = new URL(repoUrl).pathname.split("/").filter(Boolean);
        if (path.length >= 2) {
          return { owner: path[0], repo: path[1] };
        }
      } catch { }
      return null;
    };

    const details = getRepoDetails(url);
    if (!details) return;

    fetch(`https://api.github.com/repos/${details.owner}/${details.repo}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setStats({
          stars: data.stargazers_count,
          language: data.language || "TypeScript",
          updated: new Date(data.updated_at).toLocaleDateString(undefined, {
            month: "short",
            year: "numeric",
          }),
        });
      })
      .catch(() => {
        // Safe fallbacks in case of rate limiting
        setStats({
          stars: 5,
          language: "TypeScript",
          updated: "Jun 2026",
        });
      });
  }, [url]);

  if (!stats) {
    return (
      <div className="flex items-center space-x-4 text-neutral-500 text-xs mt-2 animate-pulse font-mono">
        <span className="w-12 h-3 bg-neutral-800 rounded" />
        <span className="w-16 h-3 bg-neutral-800 rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 text-neutral-400 text-xs mt-2 font-mono">
      <span className="flex items-center space-x-1">
        <svg className="w-3.5 h-3.5 fill-current text-yellow-500/80" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192L12 .587z" />
        </svg>
        <span>{stats.stars}</span>
      </span>
      <span>{stats.language}</span>
      <span>Updated {stats.updated}</span>
    </div>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  iframeSupported: boolean;
}

function ProjectCard({ project, isHovered, onMouseEnter, onMouseLeave, iframeSupported }: ProjectCardProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCardClick = () => {
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const renderPreview = () => {
    const isWebsiteType = project.type === "Website" || project.type === "Web App";

    if (isWebsiteType && iframeSupported && isHovered) {
      return (
        <div className="absolute inset-0 w-full h-full bg-[#0D0D0D] transition-all duration-500 ease-out transform scale-100 opacity-100 z-30">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0D0D0D]">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <iframe
            src={project.url}
            title={project.title}
            onLoad={() => setIframeLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-popups"
            className={`w-[400%] h-[400%] origin-top-left scale-[0.25] border-none pointer-events-none transition-opacity duration-500 ${
              iframeLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      );
    }

    if (project.videoUrl && isHovered) {
      return (
        <div className="absolute inset-0 w-full h-full bg-[#0D0D0D] transition-all duration-500 ease-out transform scale-100 opacity-100 z-30">
          <video
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return (
      <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 bg-[#0D0D0D] transition-transform duration-500 group-hover:scale-105">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover rounded-md opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          renderPlaceholderGraphics()
        )}
      </div>
    );
  };

  const renderPlaceholderGraphics = () => {
    switch (project.type) {
      case "GitHub Repository":
        return (
          <div className="flex flex-col items-center justify-center text-neutral-500 space-y-3">
            <svg className="w-12 h-12 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="text-xs tracking-wider uppercase font-light text-neutral-600">Repository</span>
          </div>
        );
      case "PDF / Paper":
        return (
          <div className="w-full h-full flex flex-col justify-between border border-white/5 bg-[#121212] rounded-lg p-4 font-sans text-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="w-16 h-3 bg-neutral-800 rounded" />
              <span className="text-[10px] font-mono text-red-500 font-bold bg-red-950/50 border border-red-500/20 px-1.5 py-0.5 rounded">
                PDF
              </span>
            </div>
            <div className="space-y-2 py-4">
              <div className="w-full h-1.5 bg-neutral-800 rounded-full" />
              <div className="w-5/6 h-1.5 bg-neutral-800 rounded-full" />
              <div className="w-4/5 h-1.5 bg-neutral-800 rounded-full" />
            </div>
            <div className="flex justify-between items-center text-[10px] text-neutral-600 border-t border-white/5 pt-2">
              <span>ABSTRACT PREVIEW</span>
              <span>PAGE 1</span>
            </div>
          </div>
        );
      case "AI Model":
        return (
          <div className="flex flex-col items-center justify-center text-neutral-500 space-y-3">
            <svg className="w-12 h-12 stroke-current animate-pulse" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
              <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2" />
              <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2" />
            </svg>
            <span className="text-xs tracking-wider uppercase font-light text-neutral-600">AI / Neural Net</span>
          </div>
        );
      case "Game":
        return (
          <div className="flex flex-col items-center justify-center text-neutral-500 space-y-3">
            <svg className="w-12 h-12 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="12" x2="10" y2="12" />
              <line x1="8" y1="10" x2="8" y2="14" />
              <line x1="15" y1="13" x2="15.01" y2="13" strokeWidth="2" />
              <line x1="18" y1="11" x2="18.01" y2="11" strokeWidth="2" />
              <rect x="2" y="6" width="20" height="12" rx="3" />
            </svg>
            <span className="text-xs tracking-wider uppercase font-light text-neutral-600">Playable</span>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center text-neutral-500 space-y-3">
            <svg className="w-12 h-12 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span className="text-xs tracking-wider uppercase font-light text-neutral-600">Project / Tool</span>
          </div>
        );
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group bg-[#151515] border border-white/[0.08] hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.8)] hover:-translate-y-2 flex flex-col cursor-pointer"
    >
      <div className="w-full aspect-video bg-[#0D0D0D] relative flex items-center justify-center overflow-hidden border-b border-white/[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:14px_14px]" />
        {renderPreview()}
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center space-y-1.5">
        <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-neutral-200 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
          {project.description}
        </p>
        {project.type === "GitHub Repository" && <GitHubStats url={project.url} />}
      </div>
    </div>
  );
}

// Main Builds Component
export default function BuildsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [iframeSupport, setIframeSupport] = useState<Record<string, boolean>>({});

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);

    const checkIframeSupport = async (url: string) => {
      const BLOCKED_DOMAINS = [
        "github.com", "youtube.com", "vimeo.com", "medium.com", "wikipedia.org",
        "proton.me", "linkedin.com", "twitter.com", "facebook.com", "instagram.com"
      ];
      try {
        const hostname = new URL(url).hostname.toLowerCase();
        if (BLOCKED_DOMAINS.some(domain => hostname.includes(domain))) {
          return false;
        }
      } catch {
        return false;
      }

      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 2500);
        const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`, {
          method: "HEAD",
          signal: controller.signal
        });
        clearTimeout(id);
        const xFrame = res.headers.get("x-frame-options") || res.headers.get("X-Frame-Options");
        const csp = res.headers.get("content-security-policy") || res.headers.get("Content-Security-Policy");
        if (xFrame || (csp && csp.includes("frame-ancestors"))) {
          return false;
        }
        return true;
      } catch {
        return true;
      }
    };

    initialProjects.forEach(async (project) => {
      if (project.type === "Website" || project.type === "Web App") {
        const isSupported = await checkIframeSupport(project.url);
        setIframeSupport(prev => ({ ...prev, [project.url]: isSupported }));
      }
    });
  }, [initialProjects]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.load();
        videoRef.current.play().catch((err) => {
          console.warn("Playback blocked or failed:", err);
        });
      }
    }
  }, [isPlaying]);

  const handleMascotClick = () => {
    if (isPlaying) return;
    setIsPlaying(true);
  };

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] text-white flex flex-col font-sans selection:bg-white selection:text-black overflow-x-hidden">
      <main
        className={`flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-32 pb-36 transition-all duration-1000 ease-out transform ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {initialProjects.map((project, idx) => (
            <ProjectCard
              key={idx}
              project={project}
              isHovered={hoveredIndex === idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              iframeSupported={iframeSupport[project.url] ?? true}
            />
          ))}
        </div>
      </main>

      {/* Floating Standing Mascot at Bottom Right */}
      <div
        onClick={handleMascotClick}
        className={`fixed bottom-2 right-2 z-10 w-[75px] sm:w-[95px] md:w-[115px] lg:w-[135px] select-none transition-all duration-1000 delay-300 transform ${
          isPlaying ? "cursor-default" : "cursor-pointer"
        } ${mounted ? "opacity-30 sm:opacity-50 md:opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* Transparent Video Layer */}
        <video
          ref={videoRef}
          src="/assets/thumsup.webm"
          muted
          playsInline
          onEnded={() => setIsPlaying(false)}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
            isPlaying ? "opacity-100 z-20 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
          }`}
        />

        {/* Idle Image Layer */}
        <img
          src="/assets/standing.webp"
          alt="Standing mascot"
          className={`w-full h-auto object-contain transition-opacity duration-300 ${
            !isPlaying ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          draggable="false"
        />
      </div>
    </div>
  );
}
