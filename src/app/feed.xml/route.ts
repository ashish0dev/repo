import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = getAllPosts();
  const domain = "https://revo.origina.in";

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>REVO Journal</title>
    <link>${domain}/blog</link>
    <description>Exploring the behavioral psychology of consistency, the power of visibility, and how local community connection helps exercise stick.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map((post) => {
        return `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${domain}/blog/${post.frontmatter.slug}</link>
      <guid>${domain}/blog/${post.frontmatter.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      <author>${post.frontmatter.author}</author>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
