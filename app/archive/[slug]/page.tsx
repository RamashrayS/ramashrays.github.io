import React from "react";
import { getPostBySlug, getAllPosts } from "@/lib/markdown";
import { notFound } from "next/navigation";
import CommentSection from "@/components/CommentSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function ArchivePostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { metadata, contentHtml } = post;

  return (
    <div className="relative min-h-screen bg-[#1A1A1A] text-white flex flex-col font-sans selection:bg-white selection:text-black">
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 sm:px-8 pt-36 pb-36">

        {/* Header Block */}
        <header className="space-y-4 mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {metadata.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-mono">
            <span>{metadata.date}</span>
          </div>
        </header>

        {/* Subtle Horizontal Divider */}
        <div className="h-px bg-white/10 w-full mb-12" />

        {/* Rich Typography Body Wrapper */}
        <div 
          className="markdown-content text-neutral-300 leading-relaxed font-light text-base sm:text-[17px] space-y-6 select-text max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* Dynamic Comments System */}
        <CommentSection postSlug={slug} />

      </main>
    </div>
  );
}
