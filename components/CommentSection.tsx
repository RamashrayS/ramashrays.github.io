"use client";

import React, { useEffect, useRef } from "react";

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear the container first to prevent duplicate elements on route transitions
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";

    // Giscus configuration parameters matching GitHub Discussions backend.
    // Repo and Repo-ID are successfully resolved for your repository: RamashrayS/ramashrays.github.io
    script.setAttribute("data-repo", "RamashrayS/ramashrays.github.io");
    script.setAttribute("data-repo-id", "R_kgDOS-RFUQ");
    script.setAttribute("data-category", "Comments");
    // Note: After enabling Discussions, get the exact category ID from giscus.app and replace it below:
    script.setAttribute("data-category-id", "DIC_kwDOS-RFUc4C_eZm");

    // Mapping strategy: using URL pathname ensures each post gets its own discussion thread automatically
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "0");        // Disabled to maintain a distraction-free, reading-focused layout
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "transparent_dark");     // Blends natively with the portfolio's #1A1A1A background
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    containerRef.current.appendChild(script);
  }, [postSlug]);

  return (
    <section className="mt-16 pt-12 border-t border-white/10 max-w-2xl mx-auto space-y-6">
      {/* Discussion Header */}
      <div className="space-y-1.5 pb-2">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          Discussion
        </h3>
        <p className="text-[11px] font-mono text-neutral-500">
          Powered by GitHub Discussions. A GitHub account is required to participate.
        </p>
      </div>

      {/* Embedded Giscus Frame */}
      <div ref={containerRef} className="giscus-container w-full" />
    </section>
  );
}
