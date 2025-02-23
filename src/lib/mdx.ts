import 'server-only';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';

// Ensure we're using server-only code
export const dynamic = 'force-dynamic';

const postsDirectory = join(process.cwd(), 'content/posts');

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: "tech" | "philosophy" | "other";
  language: "en" | "de";
  tags: string[];
  content: string;
};

export function getLanguageName(lang: Post['language']) {
  const names = {
    en: 'English',
    de: 'Deutsch',
  };
  return names[lang];
}

export function getCategoryName(category: Post['category']) {
  const names = {
    tech: 'Technology',
    philosophy: 'Philosophy',
    other: 'Other',
  };
  return names[category];
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const fullPath = join(postsDirectory, `${slug}.mdx`);
    const fileContents = await readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title,
      description: data.description,
      date: data.date,
      readingTime: data.readingTime,
      category: data.category,
      language: data.language,
      tags: data.tags || [],
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const files = await readdir(postsDirectory);
    const slugs = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''));

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
    console.error('Error getting all posts:', error);
    return [];
  }
} 