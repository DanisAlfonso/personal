import { Header } from "../components/header";
import { Calendar, Clock, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";

export default async function Blog() {
  const posts = await getAllPosts();

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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
              >
                <Link href={`/blog/${post.slug}`} className="block p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readingTime}
                    </div>
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-muted-foreground">{post.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <div
                        key={tag}
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