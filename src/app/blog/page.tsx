import { Header } from "../components/header";
import { Calendar, Clock, Tag, Globe2, BookOpen } from "lucide-react";
import { getAllPosts, getLanguageName, getCategoryName } from "@/lib/mdx";
import Link from "next/link";

export default async function Blog() {
  const posts = await getAllPosts();

  // Get unique categories and languages
  const categories = Array.from(new Set(posts.map((post) => post.category)));
  const languages = Array.from(new Set(posts.map((post) => post.language)));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12">
          <div className="mb-12 text-center">
            <h1 className="h1 mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Thoughts on software development, philosophy, and everything in between.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={`category-${category}`}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
              >
                <BookOpen className="h-4 w-4" />
                {getCategoryName(category)}
              </button>
            ))}
            {languages.map((language) => (
              <button
                key={`language-${language}`}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/80"
              >
                <Globe2 className="h-4 w-4" />
                {getLanguageName(language)}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
              >
                <Link href={`/blog/${post.slug}`} className="block p-6">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readingTime}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Globe2 className="h-4 w-4" />
                      {getLanguageName(post.language)}
                    </div>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-muted-foreground">{post.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div
                      className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      <BookOpen className="h-3 w-3" />
                      {getCategoryName(post.category)}
                    </div>
                    {post.tags.map((tag) => (
                      <div
                        key={`${post.slug}-${tag}`}
                        className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 