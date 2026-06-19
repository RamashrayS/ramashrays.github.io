import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "content/scribbles");

export interface PostMetadata {
  slug: string;
  title: string;
  type: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface Post {
  metadata: PostMetadata;
  contentHtml: string;
}

// Configures marked for secure rendering of markdown to HTML
marked.setOptions({
  gfm: true,
  breaks: true,
});

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        type: data.type || "Blog",
        date: data.date || "",
        excerpt: data.excerpt || "",
        tags: data.tags || [],
      } as PostMetadata;
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Convert markdown content to HTML string
    const contentHtml = await marked.parse(content);

    return {
      metadata: {
        slug,
        title: data.title || "",
        type: data.type || "Blog",
        date: data.date || "",
        excerpt: data.excerpt || "",
        tags: data.tags || [],
      } as PostMetadata,
      contentHtml,
    };
  } catch (e) {
    return null;
  }
}
