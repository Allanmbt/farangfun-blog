// app/page.tsx
import { HeroSection } from "@/components/HeroSection";
import { AnimateIn } from "@/components/AnimateIn";
import Link from "next/link";
import { compareDesc } from "date-fns";
import { allBlogs } from "contentlayer/generated";
import { BlogCard } from "@/components/BlogCard";

export default function Home() {
  const posts = allBlogs.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="flex flex-col">
      {/* 使用客户端组件处理英雄区域 */}
      <HeroSection />

      {/* 博客文章部分 */}
      <div className="container py-16 md:py-24">
        <AnimateIn className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Articles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our guides and tips for the best Bangkok experience.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1} className="mb-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                slug={post.slug}
                image={post.image}
              />
            ))}
          </div>
          {posts.length > 6 && (
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-8 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-brand-light"
              >
                View All Articles
              </Link>
            </div>
          )}
        </AnimateIn>
      </div>
    </div>
  );
}