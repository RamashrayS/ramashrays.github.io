"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  // Determine active section based on the current pathname
  let activeSection = "";
  if (pathname === "/") {
    activeSection = "home";
  } else if (pathname === "/builds") {
    activeSection = "builds";
  } else if (pathname === "/archive") {
    activeSection = "archive";
  } else if (pathname === "/contact") {
    activeSection = "contact";
  }

  const navItems = [
    { name: "Home", href: "/", id: "home" },
    { name: "Builds", href: "/builds", id: "builds" },
    { name: "Archive", href: "/archive", id: "archive" },
    { name: "Contact", href: "/contact", id: "contact" }
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full px-4 flex justify-center">
      <div className="bg-[#0D0D0D]/90 backdrop-blur-md text-white rounded-full p-1.5 flex items-center justify-between shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/10 w-fit max-w-full gap-4 sm:gap-8">
        
        {/* Nav Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-[13px] font-medium text-neutral-400">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isExternal = item.href.startsWith("mailto:") || item.href.startsWith("http");
            
            const commonProps = {
              className: `h-9 px-4 sm:px-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "hover:text-white hover:bg-white/5"
              }`
            };

            if (isExternal) {
              return (
                <a key={item.id} href={item.href} {...commonProps}>
                  {item.name}
                </a>
              );
            }

            return (
              <Link key={item.id} href={item.href} {...commonProps}>
                {item.name}
              </Link>
            );
          })}
        </nav>
        {/* Socials & Contact Button */}
        <div className="hidden md:flex items-center gap-3.5 sm:gap-4 text-neutral-400">
          <a
            href="https://www.linkedin.com/in/ramashray-sahu-ba7539367/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-all duration-300 hover:scale-110 transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://github.com/RamashrayS"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-all duration-300 hover:scale-110 transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-[18px] sm:h-[18px]">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href="mailto:ramashrays@proton.me"
            className="h-9 px-4 sm:px-5 rounded-full bg-white text-black text-xs sm:text-[13px] font-medium flex items-center justify-center hover:bg-neutral-100 transition-colors duration-200 shrink-0"
          >
            <span className="hidden sm:inline">ramashrays@proton.me</span>
            <span className="sm:hidden">Email</span>
          </a>
        </div>
      </div>
    </header>
  );
}
