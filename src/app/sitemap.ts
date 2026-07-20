import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://revo.origina.in";

  // Static routes
  const routes = ["", "/privacy", "/terms", "/blog"].map((route) => ({
    url: `${domain}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/blog" ? 0.8 : 0.5,
  }));

  // Dynamic blog routes
  const posts = getAllPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${domain}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.updated || post.frontmatter.date)
      .toISOString()
      .split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
