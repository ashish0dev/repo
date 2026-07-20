import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "Google-Extended",
          "CCBot",
          "Bytespider",
          "Amazonbot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://revo.origina.in/sitemap.xml",
  };
}
