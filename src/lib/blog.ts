import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  tags: string[];
  coverImage: string;
  slug: string;
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
  toc: { level: number; text: string; id: string }[];
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function calculateReadingTime(text: string): string {
  const wordsPerMinute = 225;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

function generateTableOfContents(text: string) {
  // Simple regex to extract headings (H2 and H3 only)
  const headingRegex = /^(##|###)\s+(.*)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(text)) !== null) {
    const level = match[1].length; // 2 for H2, 3 for H3
    const headingText = match[2].replace(/[#*`]/g, "").trim();
    const id = headingText
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ level, text: headingText, id });
  }
  return headings;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const frontmatter: PostFrontmatter = {
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        updated: data.updated || data.date || "",
        author: data.author || "REVO Team",
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.coverImage || "/blog-default-cover.png",
        slug: data.slug || file.replace(/\.mdx?$/, ""),
      };

      return {
        frontmatter,
        content,
        readingTime: calculateReadingTime(content),
        toc: generateTableOfContents(content),
      };
    });

  // Sort by date descending
  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.frontmatter.slug === slug) || null;
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const allPosts = getAllPosts();
  const currentTags = currentPost.frontmatter.tags || [];

  return allPosts
    .filter((post) => post.frontmatter.slug !== currentPost.frontmatter.slug)
    .map((post) => {
      const postTags = post.frontmatter.tags || [];
      const commonTags = postTags.filter((tag) => currentTags.includes(tag)).length;
      return { post, commonTags };
    })
    .filter((item) => item.commonTags > 0)
    .sort((a, b) => b.commonTags - a.commonTags)
    .slice(0, limit)
    .map((item) => item.post);
}
