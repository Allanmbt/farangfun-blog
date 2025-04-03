import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { Metadata } from "next";
import { format } from "date-fns";
import { constructMetadata, generateBlogJsonLd } from "@/lib/seo";
import { Recommended } from "@/components/Recommended";
import { MDXContent } from "@/components/MDXContent";
import { AnimateIn } from "@/components/AnimateIn";
import { BlogHeader } from "@/components/BlogHeader";

interface BlogPostProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return allBlogs.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: BlogPostProps): Promise<Metadata> {
    const post = allBlogs.find((post) => post.slug === params.slug);
    if (!post) return {};

    return constructMetadata({
        title: `${post.title} | FarangFun`,
        description: post.description,
        url: `https://farangfun.com/blog/${post.slug}`,
        ogImage: post.image || "/images/og-image.jpg",
    });
}

export default function BlogPost({ params }: BlogPostProps) {
    const post = allBlogs.find((post) => post.slug === params.slug);

    if (!post) {
        notFound();
    }

    // 处理标签 - 正确处理标签的格式
    let tags: string[] = [];
    if (post.tags) {
        if (Array.isArray(post.tags)) {
            tags = post.tags;
        }
    }

    // JSON-LD - 更新以包含lastUpdated属性
    const jsonLd = generateBlogJsonLd({
        ...post,
        dateModified: post.lastUpdated || post.date
    });

    const hasUpdated = post.lastUpdated && post.lastUpdated !== post.date;

    const formattedLastUpdated = hasUpdated && post.lastUpdated
        ? format(new Date(post.lastUpdated), "MMMM d, yyyy")
        : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* 添加新的博客头部组件 */}
            <BlogHeader
                title={post.title}
                image={post.image}
                date={post.date}
                lastUpdated={post.lastUpdated || undefined}
                author={post.author || "FarangFun"}
            />

            <article className="container py-8 md:py-12 max-w-3xl mx-auto">
                {hasUpdated && (
                    <AnimateIn className="mb-6">
                        <div className="text-sm text-muted-foreground">
                            Last updated on {formattedLastUpdated}
                        </div>
                    </AnimateIn>
                )}

                <AnimateIn delay={0.1} className="prose dark:prose-invert max-w-none">
                    <MDXContent code={post.body.code} />
                </AnimateIn>

                <AnimateIn delay={0.2}>
                    <div className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-8 border-t">
                        <div className="flex items-center space-x-4">
                            <p className="text-sm text-muted-foreground">
                                Published on {format(new Date(post.date), "MMMM d, yyyy")}
                            </p>
                        </div>
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-xs rounded-md bg-muted">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </AnimateIn>

                <AnimateIn delay={0.3}>
                    <Recommended posts={allBlogs} currentPostSlug={post.slug} />
                </AnimateIn>
            </article>
        </>
    );
}