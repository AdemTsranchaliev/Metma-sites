import { blogStories } from "@/data/blog-stories";

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: BlogBlock[];
};

export const blogPosts = blogStories;

export function getBlogPost(slug: string) {
  return blogStories.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Date(date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
