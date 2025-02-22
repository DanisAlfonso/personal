import { notFound } from "next/navigation";
import { Header } from "@/app/components/header";
import { getPost } from "@/lib/mdx";
import { Calendar, Clock, Tag } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const { content: mdxContent } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight, rehypeSlug],
      },
    },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <article className="container py-12">
          <div className="mx-auto max-w-3xl">
            <header className="mb-8 text-center">
              <h1 className="h1 mb-4">{post.title}</h1>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
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
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
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
            </header>

            <div className="prose prose-lg dark:prose-invert mx-auto">
              {mdxContent}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
} 