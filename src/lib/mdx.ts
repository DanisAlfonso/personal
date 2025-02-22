import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type Post = {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  language: "en" | "de";
  category: "tech" | "philosophy" | "other";
  slug: string;
  content: string;
};

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      ...(data as Omit<Post, "content" | "slug">),
      slug,
      content,
    };
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const slugs = fs
      .readdirSync(postsDirectory)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));

    const posts = await Promise.all(
      slugs.map(async (slug) => {
        const post = await getPost(slug);
        return post;
      })
    );

    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1));
  } catch (error) {
    console.error("Error getting all posts:", error);
    return [];
  }
}

export function getLanguageName(language: Post["language"]): string {
  const languages = {
    en: "English",
    de: "Deutsch",
  };
  return languages[language];
}

export function getCategoryName(category: Post["category"]): string {
  const categories = {
    tech: "Technology",
    philosophy: "Philosophy",
    other: "Other",
  };
  return categories[category];
} 