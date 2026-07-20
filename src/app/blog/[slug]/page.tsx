import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, BookOpen, Calendar, ChevronRight } from "lucide-react";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { marked } from "marked";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

function addHeadingIds(html: string): string {
  return html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, text) => {
    if (attrs.includes("id=")) return match;
    const cleanText = text.replace(/<[^>]+>/g, "");
    const id = cleanText
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return `<${tag} id="${id}"${attrs}>${text}</${tag}>`;
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `https://revo.origina.in/blog/${slug}`,
    },
    openGraph: {
      title: `${post.frontmatter.title} | REVO`,
      description: post.frontmatter.description,
      url: `https://revo.origina.in/blog/${slug}`,
      type: "article",
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated || post.frontmatter.date,
      authors: [post.frontmatter.author],
      images: [
        {
          url: `https://revo.origina.in${post.frontmatter.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [`https://revo.origina.in${post.frontmatter.coverImage}`],
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const rawHtml = await marked.parse(post.content);
  const contentHtml = addHeadingIds(rawHtml);
  const relatedPosts = getRelatedPosts(post, 3);

  // FAQ Schema extraction (automatically create from post FAQ sections if any)
  const faqQuestions = [
    {
      q: "Why do people quit running?",
      a: "Most people quit running because their effort is invisible. Without external social reinforcement or community connection, the mental cost of physical exertion overrides the abstract desire for long-term health metrics."
    },
    {
      q: "Are fitness tracking apps bad for mental health?",
      a: "Hyper-focusing on data like pace and heart rate can lead to anxiety and burnout. When exercise is reduced to scores and compared on competitive leaderboards, it often strips away the intrinsic joy of movement."
    },
    {
      q: "How does community help in building exercise habits?",
      a: "Communities provide social proof and accountability. Seeing others active in your local area normalizes the behavior, making it easier to integrate running or walking into your daily routine."
    }
  ];

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.frontmatter.title,
    "description": post.frontmatter.description,
    "datePublished": post.frontmatter.date,
    "dateModified": post.frontmatter.updated || post.frontmatter.date,
    "image": `https://revo.origina.in${post.frontmatter.coverImage}`,
    "author": {
      "@type": "Person",
      "name": post.frontmatter.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "REVO",
      "logo": {
        "@type": "ImageObject",
        "url": "https://revo.origina.in/main-logo-transparent.png",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://revo.origina.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://revo.origina.in/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.frontmatter.title,
        "item": `https://revo.origina.in/blog/${post.frontmatter.slug}`
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqQuestions.map((q) => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    }))
  };

  return (
    <main className="min-h-screen bg-white text-[#1F2937] font-sans selection:bg-[#2E7D5B]/20 selection:text-[#2E7D5B] py-16 sm:py-24 px-6">
      <JsonLd schema={blogPostingSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      
      {/* Editorial Custom Styling Block */}
      <style dangerouslySetInnerHTML={{ __html: `
        .blog-content h2 {
          font-family: var(--font-space-grotesk), sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          color: #1F2937;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          font-size: 1.75rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        .blog-content h3 {
          font-family: var(--font-space-grotesk), sans-serif;
          font-weight: 700;
          color: #374151;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.25rem;
          line-height: 1.3;
        }
        .blog-content p {
          color: #4B5563;
          line-height: 1.8;
          margin-bottom: 1.5rem;
          font-size: 1rem;
          font-weight: 300;
        }
        .blog-content a {
          color: #2E7D5B;
          text-decoration: underline;
          font-weight: 500;
          transition: color 0.2s;
        }
        .blog-content a:hover {
          color: #1F2937;
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: #4B5563;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
          font-weight: 300;
        }
        .blog-content blockquote {
          border-left: 4px solid #2E7D5B;
          padding-left: 1.5rem;
          font-style: italic;
          color: #374151;
          margin: 2rem 0;
        }
        .blog-content hr {
          border: 0;
          border-top: 1px solid #E5E7EB;
          margin: 3rem 0;
        }
      `}} />

      <div className="max-w-6xl mx-auto">
        {/* Navigation back to blog */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-12">
          <Link href="/blog" className="hover:text-[#2E7D5B] transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-gray-500 truncate max-w-xs">{post.frontmatter.title}</span>
        </div>

        {/* Article Header */}
        <header className="max-w-3xl mb-12">
          <h1 className="font-display font-black text-[#1F2937] leading-[1.05] tracking-tight uppercase mb-6 text-3xl sm:text-5xl lg:text-6xl">
            {post.frontmatter.title}
          </h1>
          <p className="text-lg font-light text-gray-500 leading-relaxed mb-8">
            {post.frontmatter.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-[10px] text-gray-400 font-bold uppercase tracking-wider border-y border-gray-100 py-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#2E7D5B]" />
              <span>{new Date(post.frontmatter.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#2E7D5B]" />
              <span>{post.readingTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#2E7D5B]" />
              <span>By {post.frontmatter.author}</span>
            </div>
          </div>
        </header>

        {/* Feature Image */}
        <div className="w-full aspect-[21/9] relative rounded-3xl overflow-hidden mb-16 bg-gray-50 border border-gray-100">
          <Image
            src={post.frontmatter.coverImage}
            alt={post.frontmatter.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>

        {/* Layout with Article Content & Sidebar Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Content */}
          <article className="lg:col-span-8 blog-content max-w-2xl font-sans">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 bg-gray-50/50 border border-gray-100 rounded-3xl p-6 sm:p-8">
            {post.toc.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-200/50">
                  On this page
                </h2>
                <nav className="flex flex-col gap-3">
                  {post.toc.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`text-xs text-gray-500 hover:text-[#2E7D5B] transition-colors leading-relaxed ${
                        heading.level === 3 ? "pl-4 text-gray-400" : "font-medium"
                      }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-200/50">
                Share this story
              </h2>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/?text=Check out: ${post.frontmatter.title} at https://revo.origina.in/blog/${post.frontmatter.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-200 rounded-full text-xs font-medium text-gray-500 hover:border-[#2E7D5B] hover:text-[#2E7D5B] transition-colors cursor-pointer"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${post.frontmatter.title}&url=https://revo.origina.in/blog/${post.frontmatter.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-200 rounded-full text-xs font-medium text-gray-500 hover:border-[#2E7D5B] hover:text-[#2E7D5B] transition-colors cursor-pointer"
                >
                  Twitter
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-gray-100">
            <h2 className="font-display font-black text-2xl text-[#1F2937] uppercase tracking-tight mb-8">
              Read next
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <div key={related.frontmatter.slug} className="flex flex-col group">
                  <div className="aspect-[1.91/1] relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 mb-4">
                    <Image
                      src={related.frontmatter.coverImage}
                      alt={related.frontmatter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                    <span>{new Date(related.frontmatter.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <h3 className="font-display font-black text-lg text-[#1F2937] uppercase leading-tight group-hover:text-[#2E7D5B] transition-colors line-clamp-2">
                    <Link href={`/blog/${related.frontmatter.slug}`}>
                      {related.frontmatter.title}
                    </Link>
                  </h3>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
