import React from "react";
import { getAllPosts } from "@/lib/markdown";
import ScribblesClient from "./ScribblesClient";

export default function ScribblesPage() {
  const posts = getAllPosts();
  return <ScribblesClient posts={posts} />;
}
