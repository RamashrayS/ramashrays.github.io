import React from "react";
import { getAllPosts } from "@/lib/markdown";
import ArchiveClient from "./ArchiveClient";

export default function ArchivePage() {
  const posts = getAllPosts();
  return <ArchiveClient posts={posts} />;
}
