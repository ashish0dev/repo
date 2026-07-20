import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest stories and insights from REVO on consistency, the psychology of habits, and building community fitness visibility in Indian cities.",
  alternates: {
    canonical: "https://revo.origina.in/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return <BlogIndexClient posts={posts} />;
}
