"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Post } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";

interface BlogIndexClientProps {
  posts: Post[];
}

const POSTS_PER_PAGE = 3;

export default function BlogIndexClient({ posts }: BlogIndexClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.frontmatter.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [posts]);

  // Filter posts by search query and tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.frontmatter.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag ? post.frontmatter.tags.includes(selectedTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // Paginated posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag]);

  // Breadcrumb schema
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
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white text-[#1F2937] font-sans selection:bg-[#2E7D5B]/20 selection:text-[#2E7D5B] py-16 sm:py-24 px-6">
      <JsonLd schema={breadcrumbSchema} />
      
      <div className="max-w-6xl mx-auto">
        {/* Navigation back */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#2E7D5B] transition-colors mb-16">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>

        {/* Header */}
        <div className="border-b border-gray-100 pb-12 mb-12">
          <p className="text-[10px] text-[#2E7D5B] font-bold uppercase tracking-[0.25em] mb-4">REVO Editorial</p>
          <h1 className="font-display font-black text-[#1F2937] leading-[1.05] tracking-tight uppercase mb-6 text-4xl sm:text-5xl lg:text-7xl">
            THE REVO <br className="hidden sm:block" />
            <span className="italic font-display font-normal text-[#2E7D5B] lowercase font-sans">journal.</span>
          </h1>
          <p className="text-sm sm:text-base font-light text-gray-500 leading-relaxed max-w-xl">
            Exploring the behavioral psychology of consistency, the power of visibility, and how local community connection helps exercise stick.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12">
          {/* Tag Pills */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 border ${
                selectedTag === null
                  ? "bg-[#2E7D5B] border-[#2E7D5B] text-white"
                  : "bg-gray-50 border-gray-200 text-gray-400 hover:border-[#2E7D5B] hover:text-[#2E7D5B]"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 border ${
                  selectedTag === tag
                    ? "bg-[#2E7D5B] border-[#2E7D5B] text-white"
                    : "bg-gray-50 border-gray-200 text-gray-400 hover:border-[#2E7D5B] hover:text-[#2E7D5B]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs order-1 md:order-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-xs bg-gray-50/50 text-[#1F2937] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2E7D5B] focus:border-[#2E7D5B] transition-all"
            />
          </div>
        </div>

        {/* Blog Post Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPosts.map((post) => (
              <article key={post.frontmatter.slug} className="flex flex-col group border border-gray-100 rounded-3xl overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)] transition-all duration-300 bg-white">
                <div className="aspect-[1.91/1] relative overflow-hidden bg-gray-50">
                  <Image
                    src={post.frontmatter.coverImage}
                    alt={post.frontmatter.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">
                    <span>{new Date(post.frontmatter.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5 text-gray-400" /> {post.readingTime}</span>
                  </div>
                  
                  <h2 className="font-display font-black text-xl text-[#1F2937] leading-snug mb-3 uppercase tracking-tight group-hover:text-[#2E7D5B] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.frontmatter.slug}`}>
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light mb-6 line-clamp-3">
                    {post.frontmatter.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-mono font-medium">{post.frontmatter.author}</span>
                    <Link href={`/blog/${post.frontmatter.slug}`} className="text-xs font-bold uppercase tracking-wider text-[#2E7D5B] hover:text-gray-900 transition-colors inline-flex items-center gap-1">
                      Read Post <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-100 rounded-3xl">
            <p className="text-gray-400 text-sm">No articles found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16 border-t border-gray-100 pt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-full hover:border-[#2E7D5B] hover:text-[#2E7D5B] disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-colors"
              aria-label="Previous page"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-200 rounded-full hover:border-[#2E7D5B] hover:text-[#2E7D5B] disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-colors"
              aria-label="Next page"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
