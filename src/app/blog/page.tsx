import { Header } from "../components/header";
import { getAllPosts } from "@/lib/mdx";
import { BlogPosts } from "./blog-posts";
import { Suspense } from "react";

// Force dynamic rendering for the page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
          
          <Suspense fallback={<div>Loading posts...</div>}>
            <BlogPosts initialPosts={posts} />
          </Suspense>
        </div>
      </main>
    </div>
  );
} 